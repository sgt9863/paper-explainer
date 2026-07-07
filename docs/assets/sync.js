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
      fav: (window.PaperFav && window.PaperFav.getAll()) || {},
      highlights: (window.PaperHighlights && window.PaperHighlights.getAll()) || {}
    };
  }

  function mergeMap(local, remote) {
    var out = {}, k;
    for (k in (local || {})) if (local[k]) out[k] = local[k];
    for (k in (remote || {})) if (remote[k]) out[k] = remote[k];
    return out;
  }
  // ハイライトは slug -> 配列。id で和集合マージ（重複除去）。
  function mergeHighlights(local, remote) {
    local = local || {}; remote = remote || {};
    var out = {}, k, seen, arr;
    var slugs = {};
    for (k in local) slugs[k] = 1;
    for (k in remote) slugs[k] = 1;
    for (k in slugs) {
      seen = {}; arr = [];
      (local[k] || []).concat(remote[k] || []).forEach(function (h) {
        if (h && h.id && !seen[h.id]) { seen[h.id] = 1; arr.push(h); }
      });
      if (arr.length) out[k] = arr;
    }
    return out;
  }
  function mergeState(local, remote) {
    remote = remote || {};
    return {
      notes: mergeMap(local.notes, remote.notes),
      status: mergeMap(local.status, remote.status),
      fav: mergeMap(local.fav, remote.fav),
      highlights: mergeHighlights(local.highlights, remote.highlights)
    };
  }

  function applyState(state) {
    applyingRemote = true;
    try {
      if (window.PaperNotes) window.PaperNotes.replaceAll(state.notes || {});
      if (window.PaperRead) window.PaperRead.replaceAll(state.status || {});
      if (window.PaperFav) window.PaperFav.replaceAll(state.fav || {});
      if (window.PaperHighlights) window.PaperHighlights.replaceAll(state.highlights || {});
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

  // 戻り先はハッシュ/クエリを除いた素のページURL。location.href を使うと
  // 既存の #access_token が積み重なり URL が壊れる（トークン継ぎ足し・古いerror残留）。
  function redirectTarget() {
    return location.origin + location.pathname;
  }

  async function signInWithGoogle() {
    setMsg("Googleへ移動します…");
    try {
      var res = await sb.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectTarget() }
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
        options: { emailRedirectTo: redirectTarget() }
      });
      if (res.error) { setMsg("送信に失敗: " + res.error.message); return; }
      setMsg("送信しました。メール内のリンクをタップしてください。");
    } catch (e) {
      setMsg("送信に失敗: " + (e && e.message ? e.message : e));
    }
  }

  // 成否を呼び出し元に返す（エラーは握りつぶさず onLogin で画面表示する）。
  async function pull() {
    var res = await sb.from("user_data").select("data").eq("user_id", user.id).maybeSingle();
    if (res.error) { console.warn("[sync] pull error", res.error.message); return { error: res.error.message }; }
    return { data: (res.data && res.data.data) || {} };
  }
  async function push(state) {
    var res = await sb.from("user_data").upsert(
      { user_id: user.id, data: state, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );
    if (res.error) { console.warn("[sync] push error", res.error.message); return res.error.message; }
    return null;
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
    // 戻りURLのトークン(＋古いerror)をアドレスバーから消す。残すと次回ログインで積み重なる。
    try {
      if (location.hash || location.search) {
        history.replaceState(null, "", location.origin + location.pathname);
      }
    } catch (e) {}
    // まずログイン状態を即表示（同期の成否に依存させない）
    setBtn("ログアウト（" + shortEmail(user.email) + "）", (user.email || "") + " でログイン中。クリックでログアウト");
    // 他端末の更新を受信
    if (!channel) {
      try {
        channel = sb.channel("user_data_" + user.id)
          .on("postgres_changes",
            { event: "*", schema: "public", table: "user_data", filter: "user_id=eq." + user.id },
            function (payload) { if (payload.new && payload.new.data) applyState(payload.new.data); })
          .subscribe();
      } catch (e) { console.warn("[sync] realtime 失敗", e); }
    }
    // 同期は裏で実行。失敗してもログイン表示は保つが、エラーは必ず画面に出す。
    setMsg("同期中…");
    var pr = await pull();
    if (pr.error) {
      openPanel(true);
      setMsg("同期エラー(読込): " + pr.error + " — Supabaseの user_data テーブル/RLS を確認してください");
      return;
    }
    var merged = mergeState(localState(), pr.data || {});
    applyState(merged);
    var perr = await push(merged);
    if (perr) {
      openPanel(true);
      setMsg("同期エラー(保存): " + perr + " — Supabaseの user_data テーブル/RLS を確認してください");
      return;
    }
    // 成功: 件数を出してから消す
    var n = Object.keys((merged && merged.notes) || {}).length;
    setMsg("同期しました（メモ " + n + " 件）");
    setTimeout(function () { if (loggedIn) setMsg(""); }, 2500);
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
    // 戻りURL(ハッシュ/クエリ)を supabase が消す前に退避（診断＋手動セッション確立に使う）
    var initialHash = location.hash || "";
    var initialSearch = location.search || "";
    var lastErr = "";
    var _rawUrl = initialHash + "&" + initialSearch;
    // 値は & と # の両方で区切る（壊れたURLでは #access_token が # で連結されるため）。
    // 同名が複数あるとき最後（＝最新の戻り）の値を返す。
    function lastParam(name) {
      var re = new RegExp("[#&?]" + name + "=([^&#]+)", "g"), m, v = "";
      while ((m = re.exec(_rawUrl)) !== null) v = m[1];
      return v ? decodeURIComponent(v.replace(/\+/g, " ")) : "";
    }
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
    // flowType: "implicit" … OAuth 戻りをハッシュ(#access_token)方式にする。
    // 静的サイト(GitHub Pages)では PKCE(?code) のコード交換が失敗しやすく、
    // 「Supabase側にユーザーは作られるがブラウザはログインにならない」症状が出るため、
    // メールのマジックリンクと同じハッシュ方式に統一して確実にセッションを確立する。
    sb = mod.createClient(cfg.url, cfg.anonKey, {
      auth: {
        flowType: "implicit",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      }
    });
    setBtn("ログイン", "メールでログインして全端末同期");

    // 戻りURLの最新トークン（壊れて積み重なっていても最後のものを採用）
    var urlAccessToken = lastParam("access_token");
    var urlRefreshToken = lastParam("refresh_token");
    // ログイン戻りURLにエラーがあれば表示。ただし有効トークンがあれば無視して確立を優先。
    var authErr = urlAuthError();
    if (authErr && !urlAccessToken) { openPanel(true); setMsg("ログイン失敗: " + authErr); }
    // 戻りURLに認証パラメータがあるのに一定時間ログインできなければ知らせる
    var hadAuthParams = /[?#&](code|access_token|error)=/.test(location.href);

    // 戻りURLにトークンがあれば、detectSessionInUrl を待たず即セッション確立を試みる。
    async function establishFromUrl() {
      if (loggedIn || !urlAccessToken) return;
      try {
        var sres = await sb.auth.setSession({ access_token: urlAccessToken, refresh_token: urlRefreshToken });
        if (sres.data && sres.data.session && sres.data.session.user) {
          user = sres.data.session.user;
          onLogin();   // onLogin が URL を掃除する
        } else if (sres.error) {
          lastErr = "setSession: " + sres.error.message;
        }
      } catch (e) { lastErr = "setSession例外: " + (e && e.message ? e.message : e); }
    }
    await establishFromUrl();

    authBtn.addEventListener("click", async function () {
      if (user) {
        setBtn("ログアウト中…");
        try { await sb.auth.signOut({ scope: "local" }); }
        catch (e) { try { await sb.auth.signOut(); } catch (e2) {} }
        onLogout();   // onAuthStateChange の発火を待たず確実にUIを更新
      } else {
        openPanel(panel.hidden);
      }
    });

    ["noteschange", "statuschange", "favchange", "highlightschange"].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (e.detail && e.detail.origin === "remote") return;
        schedulePush();
      });
    });

    // onAuthStateChange は購読時に INITIAL_SESSION も発火するので、初期状態もここで拾える
    // （別途 getSession() で onLogin を呼ぶとログアウト直後に再ログインする競合が起きるため呼ばない）
    sb.auth.onAuthStateChange(function (event, session) {
      if (event === "SIGNED_OUT") { onLogout(); return; }
      if (session && session.user) {
        user = session.user;
        onLogin();   // onLogin 内の loggedIn ガードで二重実行を防止
      } else {
        onLogout();
      }
    });

    // フォールバック: INITIAL_SESSION を取りこぼしても既存セッションを反映（loggedIn ガードで二重実行なし）
    // OAuth 戻り直後はセッション確立が少し遅れることがあるため数回リトライ
    for (var attempt = 0; attempt < 6 && !loggedIn; attempt++) {
      try {
        var got = await sb.auth.getSession();
        if (got.data && got.data.session && got.data.session.user) {
          user = got.data.session.user;
          onLogin();
          break;
        }
      } catch (e) { lastErr = "getSession: " + (e && e.message ? e.message : e); console.warn("[sync] getSession 失敗", e); }
      if (!hadAuthParams) break;              // 認証戻りでなければ待つ意味がない
      await new Promise(function (r) { setTimeout(r, 800); });
    }

    // まだ確立できていなければ、退避したトークンでもう一度だけ試す。
    await establishFromUrl();

    // 認証パラメータ付きで戻ったのに数秒経ってもログインできない＝失敗を通知（原因を画面に出す）
    if (hadAuthParams) {
      setTimeout(function () {
        if (loggedIn) return;
        openPanel(true);
        var d = [];
        if (urlAccessToken) d.push("戻りURL: #access_token あり(implicit)");
        else if (/[?&]code=/.test(initialSearch)) d.push("戻りURL: ?code あり(古いJSがキャッシュ？スーパーリロードを)");
        else d.push("戻りURL: トークンなし(Site URL/Redirect設定を確認)");
        if (authErr) d.push("Supabaseからのエラー: " + authErr);
        if (lastErr) d.push("詳細: " + lastErr);
        setMsg("ログイン未確立 — " + d.join(" / "));
      }, 4000);
    }
  }

  // 戻りURL(ハッシュ/クエリ)から OAuth エラー文言を取り出す
  function urlAuthError() {
    var raw = (location.hash.replace(/^#/, "") + "&" + location.search.replace(/^\?/, ""));
    var m = /error_description=([^&]+)/.exec(raw) || /error_code=([^&]+)/.exec(raw) || /[?#&]error=([^&]+)/.exec(raw);
    if (!m) return null;
    try { return decodeURIComponent(m[1].replace(/\+/g, " ")); } catch (e) { return m[1]; }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
