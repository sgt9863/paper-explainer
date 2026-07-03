/* クラウド同期（Supabase）。ログインすると メモ / 読書ステータス / お気に入り を
   全端末で共有する。未ログイン or 未設定なら localStorage のみで従来どおり動作。

   仕組み:
   - 認証はメールのマジックリンク（Supabase Auth。追加プロバイダ設定不要）。
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
    // 未設定: ログインUIは隠したまま（localStorage 運用）
    if (authBtn) authBtn.hidden = true;
    return;
  }

  var sb = null;         // Supabase クライアント
  var user = null;       // ログイン中ユーザー
  var pushTimer = null;
  var applyingRemote = false;  // remote 反映中は push を抑止

  function localState() {
    return {
      notes: (window.PaperNotes && window.PaperNotes.getAll()) || {},
      status: (window.PaperRead && window.PaperRead.getAll()) || {},
      fav: (window.PaperFav && window.PaperFav.getAll()) || {}
    };
  }

  // union マージ（衝突は remote 優先）。空値は削除扱い。
  function mergeMap(local, remote) {
    var out = {};
    var k;
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
    if (title) authBtn.title = title;
  }

  async function pull() {
    var res = await sb.from("user_data").select("data").eq("user_id", user.id).maybeSingle();
    if (res.error) { console.warn("[sync] pull error", res.error.message); return null; }
    return (res.data && res.data.data) || {};
  }

  async function push(state) {
    var res = await sb.from("user_data").upsert(
      { user_id: user.id, data: state, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );
    if (res.error) console.warn("[sync] push error", res.error.message);
  }

  function schedulePush() {
    if (!user || applyingRemote) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { push(localState()); }, 600);
  }

  async function onLogin() {
    setBtn("同期中…");
    var remote = await pull();
    var merged = mergeState(localState(), remote || {});
    applyState(merged);      // local を更新（UIも反映）
    await push(merged);      // remote に local 由来の追加分を反映
    setBtn("ログアウト", user.email || "");
    // 他端末の更新を受信
    sb.channel("user_data_" + user.id)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "user_data", filter: "user_id=eq." + user.id },
        function (payload) {
          if (payload.new && payload.new.data) applyState(payload.new.data);
        })
      .subscribe();
  }

  function onLogout() {
    user = null;
    setBtn("ログイン", "メールでログインして全端末同期");
  }

  async function doLoginPrompt() {
    var email = window.prompt("ログイン用のメールアドレスを入力してください。\nログインリンクが届きます（初回はそのメールでアカウント作成されます）。");
    if (!email) return;
    var res = await sb.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: location.href }
    });
    if (res.error) { alert("送信に失敗しました: " + res.error.message); return; }
    alert("ログインリンクを送信しました。メールを開いてリンクをタップしてください。");
  }

  async function init() {
    var mod;
    try {
      mod = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
    } catch (e) {
      console.warn("[sync] Supabase 読み込み失敗", e);
      if (authBtn) authBtn.hidden = true;
      return;
    }
    sb = mod.createClient(cfg.url, cfg.anonKey);
    setBtn("ログイン", "メールでログインして全端末同期");
    if (authBtn) {
      authBtn.addEventListener("click", function () {
        if (user) { sb.auth.signOut(); } else { doLoginPrompt(); }
      });
    }
    // ローカル変更を push（remote 反映由来は無視）
    ["noteschange", "statuschange", "favchange"].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (e.detail && e.detail.origin === "remote") return;
        schedulePush();
      });
    });
    // 認証状態
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
