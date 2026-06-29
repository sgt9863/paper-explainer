/* 読書ステータス管理（localStorage・依存なし）。一覧ページと各論文ページで共有。
   - ステータスは 未読(unread) / 読み途中(reading) / 既読(read) の3状態。
   - .status-select（<select>）で手動設定（ページを開いても自動では既読にしない）。
   - 状態は window.PaperRead 経由で index.js（ステータス絞り込み・件数）から参照される。
   - statuschange イベントを発火して各ページのUIを同期する。 */
(function () {
  "use strict";
  var KEY = "paperExplainer.status.v1";
  var OLD_KEY = "paperExplainer.read.v1"; // 旧: boolean 既読フラグ
  var VALID = { reading: 1, read: 1 };

  function save(map) {
    try { localStorage.setItem(KEY, JSON.stringify(map)); } catch (e) {}
  }
  function load() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) {}
    if (raw) {
      try { return JSON.parse(raw) || {}; } catch (e) { return {}; }
    }
    // 旧フォーマット（{slug:true}）からの移行: すべて「既読」とみなす
    var map = {};
    try {
      var old = JSON.parse(localStorage.getItem(OLD_KEY));
      if (old && typeof old === "object") {
        Object.keys(old).forEach(function (s) { if (old[s]) map[s] = "read"; });
      }
    } catch (e) {}
    save(map);
    return map;
  }

  var store = load();

  var api = {
    getStatus: function (slug) { return (slug && store[slug]) || "unread"; },
    setStatus: function (slug, status) {
      if (!slug) return;
      if (VALID[status]) { store[slug] = status; } else { delete store[slug]; }
      save(store);
      document.dispatchEvent(new CustomEvent("statuschange", {
        detail: { slug: slug, status: api.getStatus(slug) }
      }));
    },
    count: function (status) {
      return Object.keys(store).filter(function (s) { return store[s] === status; }).length;
    }
  };
  window.PaperRead = api;

  function syncControl(el) {
    var slug = el.getAttribute("data-slug");
    if (!slug) return;
    var status = api.getStatus(slug);
    if (el.value !== status) el.value = status;
    var item = el.closest(".index-item");
    if (item) {
      item.classList.remove("status-unread", "status-reading", "status-read");
      item.classList.add("status-" + status);
    }
  }

  function wire() {
    var sels = document.querySelectorAll(".status-select");
    Array.prototype.forEach.call(sels, function (el) {
      syncControl(el);
      el.addEventListener("change", function () {
        api.setStatus(el.getAttribute("data-slug"), el.value);
      });
    });
  }

  document.addEventListener("statuschange", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".status-select"), syncControl);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
