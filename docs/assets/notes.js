/* 論文ごとのメモ（localStorage・依存なし）。各論文ページの右サイドバーに表示。
   - 入力は自動保存（デバウンス）。状態表示あり。
   - window.PaperNotes を公開し、将来のクラウド同期モジュール（ログイン）が
     replaceAll() で他端末のメモを流し込み、noteschange を購読して push できるようにする。 */
(function () {
  "use strict";
  var KEY = "paperExplainer.notes.v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(map) {
    try { localStorage.setItem(KEY, JSON.stringify(map)); } catch (e) {}
  }

  var store = load();

  var api = {
    get: function (slug) { return (slug && store[slug]) || ""; },
    // origin: "local"（ユーザー入力）/ "remote"（同期による反映）
    set: function (slug, text, origin) {
      if (!slug) return;
      if (text) { store[slug] = text; } else { delete store[slug]; }
      save(store);
      document.dispatchEvent(new CustomEvent("noteschange", {
        detail: { slug: slug, text: text || "", origin: origin || "local" }
      }));
    },
    getAll: function () { return store; },
    // クラウド同期がまとめて上書きするための入口（UIも更新される）
    replaceAll: function (map) {
      store = map || {};
      save(store);
      document.dispatchEvent(new CustomEvent("noteschange", {
        detail: { slug: null, text: "", origin: "remote" }
      }));
    }
  };
  window.PaperNotes = api;

  function init() {
    var panel = document.getElementById("notesPanel");
    var textarea = document.getElementById("notesText");
    if (!panel || !textarea) return;
    var slug = panel.getAttribute("data-slug");
    var status = document.getElementById("notesStatus");
    var fab = document.getElementById("notesFab");
    var timer = null;

    function setStatus(msg) { if (status) status.textContent = msg; }

    // 初期表示
    textarea.value = api.get(slug);

    textarea.addEventListener("input", function () {
      setStatus("保存中…");
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        api.set(slug, textarea.value, "local");
        setStatus("保存しました");
        setTimeout(function () { setStatus(""); }, 1500);
      }, 400);
    });

    // 他端末同期や別タブの変更を反映（自分の入力中は上書きしない）
    document.addEventListener("noteschange", function (e) {
      var d = e.detail || {};
      if (d.origin === "remote" && document.activeElement !== textarea) {
        var v = api.get(slug);
        if (textarea.value !== v) textarea.value = v;
      }
    });

    // モバイル: FAB でメモ欄を開閉
    if (fab) {
      fab.addEventListener("click", function () {
        panel.classList.toggle("notes-open");
        if (panel.classList.contains("notes-open")) textarea.focus();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
