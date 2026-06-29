/* 一覧ページの検索＋タグ絞り込み＋既読フィルタ（依存なし）。
   - 検索ボックス: タイトル・要約・タグ・ファイル名を部分一致（AND: スペース区切りで複数語）。
   - タグチップ: クリックでトグル。複数選択は OR（いずれかのタグを含む）。検索語とは AND。
   - 未読のみ表示: 既読（read.js / localStorage）を除外。既読件数も表示。 */
(function () {
  "use strict";
  var search = document.getElementById("indexSearch");
  var list = document.getElementById("indexList");
  if (!search || !list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll(".index-item"));
  var tagButtons = Array.prototype.slice.call(document.querySelectorAll(".tagfilter"));
  var noResult = document.getElementById("noResult");
  var shownCount = document.getElementById("shownCount");
  var readCount = document.getElementById("readCount");
  var unreadOnly = document.getElementById("unreadOnly");
  var activeTags = [];

  function isRead(slug) {
    return !!(window.PaperRead && slug && window.PaperRead.isRead(slug));
  }

  function apply() {
    var terms = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    var onlyUnread = unreadOnly && unreadOnly.checked;
    var shown = 0;
    items.forEach(function (li) {
      var blob = li.getAttribute("data-search") || "";
      var slug = li.getAttribute("data-slug") || "";
      var tags = (li.getAttribute("data-tags") || "").split(",").filter(Boolean);
      var okText = terms.every(function (t) { return blob.indexOf(t) !== -1; });
      var okTags = activeTags.length === 0 || activeTags.some(function (t) { return tags.indexOf(t) !== -1; });
      var okRead = !onlyUnread || !isRead(slug);
      var show = okText && okTags && okRead;
      li.hidden = !show;
      if (show) shown++;
    });
    if (shownCount) shownCount.textContent = shown;
    if (noResult) noResult.hidden = shown !== 0;
  }

  function updateReadCount() {
    if (readCount && window.PaperRead) readCount.textContent = window.PaperRead.count();
  }

  search.addEventListener("input", apply);
  if (unreadOnly) unreadOnly.addEventListener("change", apply);
  tagButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tag = btn.getAttribute("data-tag");
      var i = activeTags.indexOf(tag);
      if (i === -1) { activeTags.push(tag); btn.classList.add("active"); }
      else { activeTags.splice(i, 1); btn.classList.remove("active"); }
      apply();
    });
  });

  // 既読トグルの変更に追従（件数更新＋未読のみ時は再フィルタ）
  document.addEventListener("readchange", function () {
    updateReadCount();
    apply();
  });

  updateReadCount();
  apply();
})();
