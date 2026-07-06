/* クラウド同期（Supabase）。ログインすると メモ / 読書ステータス / お気に入り を
   全端末で共有する。未ログイン or 未設定なら localStorage のみで従来どおり動作。

   仕組み:
   - 認証はメールのマジックリンク（Supabase Auth。追加プロバイダ設定不要）。
   - ログインUIはヘッダー内のインライン・パネル（prompt はモバイルでブロックされるため使わない）。
   - ユーザーごとに1行の JSONB（public.user_data）へ {notes,status,fav} を保存。RLSで own-row のみ。
   - ログイン時: remote と local を union マージ（衝突は remote 優先）→ local へ反映＆remoteへ push。
   - 以降のローカル変更(noteschange/statuschange/favchange の origin=local)はデバウンスで push。
   - Realtime で他端末の更新を受けて pull。

   依存: window.PaperNotes / PaperRead / PaperFav（getAll/replaceAll を持つ）。 */
(function () {
  "use strict";
  var cfg = window.PAPER_SYNC_CONFIG || {};
  var authBtn = document.getElementById("authBtn");
  if (!cfg.url || !cfg.anonKey) {
    if (authBtn) authBtn.hidden = true; // 未設定: localStorage 運用
    return;
  }

  var sb = null;
  var user = null;
  var pushTimer = null;
  var applyingRemote = false;
  var panel = null;
  var msgEl = null;
  var emailInput = null;

  function localState() {
    return {
      notes: (window.PaperNotes && window.PaperNotes.getAll()) || {},
      status: (window.PaperRead && window.PaperRead.getAll()) || {},
      fav: (window.PaperFav && window.PaperFav.getAll()) || {}
    };
  }

  function mergeMap(local, remote) {
    var out = {}, k;
    for (k in (local || {})) if (local[k]) out[k] = local[k];
    for (k in (remote || {})) if (remote[k]) out[k] = remote[k];
    return out;
  }
  function mergeState(local, remote) {
    remote = remote || {};
    return {
      notes: mergeMap(local.notes, remote.notes),
      status: mergeMap(local.status, remote.status),
      fav: mergeMap(local.fav, remote.fav)
    };
  }

  function applyState(state) {
    applyingRemote = true;
    try {
      if (window.PaperNotes) window.PaperNotes.replaceAll(state.notes || {});
      if (window.PaperRead) window.PaperRead.replaceAll(state.status || {});
      if (window.PaperFav) window.PaperFav.replaceAll(state.fav || {});
    } finally {
      applyingRemote = false;
    }
  }

  function setBtn(label, title) {
    if (!authBtn) return;
    authBtn.hidden = false;
    authBtn.textContent = label;
    authBtn.title = title || "";
  }
  function setMsg(text) { if (msgEl) msgEl.textContent = text || ""; }
  function openPanel(open) {
    if (!panel) return;
    panel.hidden = !open;
    if (open && emailInput) { try { emailInput.focus(); } catch (e) {} }
  }

  // ヘッダー内にログイン用のインライン・パネルを生成
  function buildPanel() {
    if (!authBtn || !authBtn.parentNode) return;
    panel = document.createElement("div");
    panel.className = "auth-panel";
    panel.hidden = true;
    var googleHtml = cfg.google
      ? '<button type="button" class="auth-google">Googleでログイン</button>' +
        '<div class="auth-or">または</div>'
      : "";
    panel.innerHTML =
      googleHtml +
      '<p class="auth-title">メールでログイン</p>' +
      '<input type="email" class="auth-email" placeholder="you@example.com" ' +
      'autocomplete="email" inputmode="email">' +
      '<button type="button" class="auth-send">ログインリンクを送る</button>' +
      '<p class="auth-msg" aria-live="polite"></p>';
    authBtn.parentNode.appendChild(panel);
    msgEl = panel.querySelector(".auth-msg");
    emailInput = panel.querySelector(".auth-email");
    var sendBtn = panel.querySelector(".auth-send");
    sendBtn.addEventListener("click", sendLink);
    emailInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") sendLink();
    });
    var gBtn = panel.querySelector(".auth-google");
    if (gBtn) gBtn.addEventListener("click", signInWithGoogle);
  }

  async function signInWithGoogle() {
    setMsg("Googleへ移動します…");
    try {
      var res = await sb.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: location.href }
      });
      if (res.error) setMsg("Googleログイン失敗: " + res.error.message);
    } catch (e) {
      setMsg("Googleログイン失敗: " + (e && e.message ? e.message : e));
    }
  }

  async function sendLink() {
    var email = (emailInput && emailInput.value || "").trim();
    if (!email || email.indexOf("@") === -1) { setMsg("メールアドレスを入力してください。"); return; }
    setMsg("送信中…");
    try {
      var res = await sb.auth.signInWithOtp({
        email: email,
        options: { emailRedirectTo: location.href }
      });
      if (res.error) { setMsg("送信に失敗: " + res.error.message); return; }
      setMsg("送信しました。メール内のリンクをタップしてください。");
    } catch (e) {
      setMsg("送信に失敗: " + (e && e.message ? e.message : e));
    }
  }

  async function pull() {
    var res = await sb.from("user_data").select("data").eq("user_id", user.id).maybeSingle();
    if (res.error) { console.warn("[sync] pull error", res.error.message); setMsg("同期エラー: " + res.error.message); return null; }
    return (res.data && res.data.data) || {};
  }
  async function push(state) {
    var res = await sb.from("user_data").upsert(
      { user_id: user.id, data: state, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );
    if (res.error) { console.warn("[sync] push error", res.error.message); setMsg("保存エラー: " + res.error.message); }
  }
  function schedulePush() {
    if (!user || applyingRemote) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { push(localState()); }, 600);
  }

  var loggedIn = false;   // onLogin の二重実行防止
  var channel = null;

  function shortEmail(e) {
    if (!e) return "";
    return e.length > 22 ? e.slice(0, 20) + "…" : e;
  }

  async function onLogin() {
    if (loggedIn) return;          // getSession と onAuthStateChange の二重発火を防ぐ
    loggedIn = true;
    openPanel(false);              // メールフォームを閉じる
    setMsg("");
    setBtn("同期中…", user.email || "");
    var remote = await pull();
    var merged = mergeState(localState(), remote || {});
    applyState(merged);
    await push(merged);
    // ログイン中であることを明示（ボタン＝ログアウト操作、メール併記）
    setBtn("ログアウト（" + shortEmail(user.email) + "）", (user.email || "") + " でログイン中。クリックでログアウト");
    if (!channel) {
      channel = sb.channel("user_data_" + user.id)
        .on("postgres_changes",
          { event: "*", schema: "public", table: "user_data", filter: "user_id=eq." + user.id },
          function (payload) { if (payload.new && payload.new.data) applyState(payload.new.data); })
        .subscribe();
    }
  }
  function onLogout() {
    loggedIn = false;
    user = null;
    if (channel) { try { sb.removeChannel(channel); } catch (e) {} channel = null; }
    openPanel(false);
    setMsg("");
    setBtn("ログイン", "メールでログインして全端末同期");
  }

  async function init() {
    buildPanel();
    setBtn("読み込み中…");
    var mod;
    try {
      mod = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
    } catch (e) {
      console.warn("[sync] Supabase 読み込み失敗", e);
      setBtn("ログイン(不可)", "同期ライブラリの読み込みに失敗しました");
      return;
    }
    sb = mod.createClient(cfg.url, cfg.anonKey);
    setBtn("ログイン", "メールでログインして全端末同期");
    authBtn.addEventListener("click", function () {
      if (user) { sb.auth.signOut(); openPanel(false); }
      else { openPanel(panel.hidden); }
    });

    ["noteschange", "statuschange", "favchange"].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (e.detail && e.detail.origin === "remote") return;
        schedulePush();
      });
    });

    sb.auth.onAuthStateChange(function (_event, session) {
      if (session && session.user) {
        var wasLoggedOut = !user;
        user = session.user;
        if (wasLoggedOut) onLogin();
      } else {
        onLogout();
      }
    });
    var got = await sb.auth.getSession();
    if (got.data && got.data.session) {
      user = got.data.session.user;
      onLogin();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
