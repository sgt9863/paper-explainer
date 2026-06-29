/* 既読管理（localStorage・依存なし）。一覧ページと各論文ページで共有。
   - 論文ページを開くと自動で既読化する。
   - .read-toggle ボタンで既読/未読を手動トグル。
   - 状態は window.PaperRead 経由で index.js（未読のみ絞り込み・既読件数）から参照される。
   - readchange イベントを発火して各ページのUIを同期する。 */
(function () {
  "use strict";
  var KEY = "paperExplainer.read.v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(map) {
    try { localStorage.setItem(KEY, JSON.stringify(map)); } catch (e) {}
  }

  var store = load();

  var api = {
    isRead: function (slug) { return !!store[slug]; },
    set: function (slug, val) {
      if (!slug) return;
      if (val) { store[slug] = Date.now(); } else { delete store[slug]; }
      save(store);
      document.dispatchEvent(new CustomEvent("readchange", { detail: { slug: slug, read: !!val } }));
    },
    toggle: function (slug) { this.set(slug, !this.isRead(slug)); return this.isRead(slug); },
    count: function () { return Object.keys(store).length; }
  };
  window.PaperRead = api;

  function syncToggle(btn) {
    var slug = btn.getAttribute("data-slug");
    if (!slug) return;
    var read = api.isRead(slug);
    btn.setAttribute("aria-pressed", read ? "true" : "false");
    btn.classList.toggle("is-read", read);
    btn.textContent = read ? "✓ 既読" : "既読にする";
    var item = btn.closest(".index-item");
    if (item) item.classList.toggle("is-read", read);
  }

  function wireToggles() {
    var toggles = document.querySelectorAll(".read-toggle");
    Array.prototype.forEach.call(toggles, function (btn) {
      syncToggle(btn);
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        api.toggle(btn.getAttribute("data-slug"));
      });
    });
  }

  function init() {
    // 論文ページ: 開いた時点で既読にする
    var article = document.querySelector("article.paper[data-slug]");
    if (article) {
      var slug = article.getAttribute("data-slug");
      if (!api.isRead(slug)) api.set(slug, true);
    }
    wireToggles();
  }

  // 別タブでの変更や readchange を受けてトグル表示を更新
  document.addEventListener("readchange", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".read-toggle"), syncToggle);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
