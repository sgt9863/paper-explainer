/* 一覧ページの検索＋タグ絞り込み（依存なし）。
   - 検索ボックス: タイトル・要約・タグ・ファイル名を部分一致（AND: スペース区切りで複数語）。
   - タグチップ: クリックでトグル。複数選択は OR（いずれかのタグを含む）。検索語とは AND。 */
(function () {
  "use strict";
  var search = document.getElementById("indexSearch");
  var list = document.getElementById("indexList");
  if (!search || !list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll(".index-item"));
  var tagButtons = Array.prototype.slice.call(document.querySelectorAll(".tagfilter"));
  var noResult = document.getElementById("noResult");
  var shownCount = document.getElementById("shownCount");
  var activeTags = [];

  function apply() {
    var terms = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    items.forEach(function (li) {
      var blob = li.getAttribute("data-search") || "";
      var tags = (li.getAttribute("data-tags") || "").split(",").filter(Boolean);
      var okText = terms.every(function (t) { return blob.indexOf(t) !== -1; });
      var okTags = activeTags.length === 0 || activeTags.some(function (t) { return tags.indexOf(t) !== -1; });
      var show = okText && okTags;
      li.hidden = !show;
      if (show) shown++;
    });
    if (shownCount) shownCount.textContent = shown;
    if (noResult) noResult.hidden = shown !== 0;
  }

  search.addEventListener("input", apply);
  tagButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tag = btn.getAttribute("data-tag");
      var i = activeTags.indexOf(tag);
      if (i === -1) { activeTags.push(tag); btn.classList.add("active"); }
      else { activeTags.splice(i, 1); btn.classList.remove("active"); }
      apply();
    });
  });
})();
