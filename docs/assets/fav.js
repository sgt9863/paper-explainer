/* お気に入り管理（localStorage・依存なし）。一覧ページと各論文ページで共有。
   - .fav-toggle（★/☆）ボタンで手動トグル（既読と違い自動では付かない）。
   - 状態は window.PaperFav 経由で index.js（お気に入りのみ絞り込み・件数）から参照される。
   - favchange イベントを発火して各ページのUIを同期する。 */
(function () {
  "use strict";
  var KEY = "paperExplainer.fav.v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(map) {
    try { localStorage.setItem(KEY, JSON.stringify(map)); } catch (e) {}
  }

  var store = load();

  var api = {
    isFav: function (slug) { return !!store[slug]; },
    set: function (slug, val) {
      if (!slug) return;
      if (val) { store[slug] = Date.now(); } else { delete store[slug]; }
      save(store);
      document.dispatchEvent(new CustomEvent("favchange", { detail: { slug: slug, fav: !!val } }));
    },
    toggle: function (slug) { this.set(slug, !this.isFav(slug)); return this.isFav(slug); },
    count: function () { return Object.keys(store).length; }
  };
  window.PaperFav = api;

  function syncToggle(btn) {
    var slug = btn.getAttribute("data-slug");
    if (!slug) return;
    var fav = api.isFav(slug);
    btn.setAttribute("aria-pressed", fav ? "true" : "false");
    btn.classList.toggle("is-fav", fav);
    btn.textContent = fav ? "★" : "☆";
    var item = btn.closest(".index-item");
    if (item) item.classList.toggle("is-fav", fav);
  }

  function wireToggles() {
    var toggles = document.querySelectorAll(".fav-toggle");
    Array.prototype.forEach.call(toggles, function (btn) {
      syncToggle(btn);
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        api.toggle(btn.getAttribute("data-slug"));
      });
    });
  }

  document.addEventListener("favchange", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".fav-toggle"), syncToggle);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireToggles);
  } else {
    wireToggles();
  }
})();
