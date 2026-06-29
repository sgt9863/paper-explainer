/* 一覧ページの絞り込み（依存なし）。左サイドバーの各フィルタを合成して適用する。
   - キーワード検索: タイトル・要約・タグ・ファイル名を部分一致（AND: スペース区切りで複数語）。
   - ステータス: すべて / 未読 / 読み途中 / 既読（read.js / localStorage）。単一選択。
   - お気に入り: ★のみ（fav.js / localStorage）。
   - カテゴリ（タグ）: クリックでトグル。複数選択は OR。検索・ステータス・★とは AND。 */
(function () {
  "use strict";
  var search = document.getElementById("indexSearch");
  var list = document.getElementById("indexList");
  if (!search || !list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll(".index-item"));
  var tagButtons = Array.prototype.slice.call(document.querySelectorAll(".tagfilter"));
  var statusRadios = Array.prototype.slice.call(document.querySelectorAll('input[name="statusf"]'));
  var favOnly = document.getElementById("favOnly");
  var noResult = document.getElementById("noResult");
  var shownCount = document.getElementById("shownCount");
  var readCount = document.getElementById("readCount");
  var readingCount = document.getElementById("readingCount");
  var favCount = document.getElementById("favCount");
  var activeTags = [];

  function statusOf(slug) {
    return (window.PaperRead && slug) ? window.PaperRead.getStatus(slug) : "unread";
  }
  function isFav(slug) {
    return !!(window.PaperFav && slug && window.PaperFav.isFav(slug));
  }
  function selectedStatus() {
    for (var i = 0; i < statusRadios.length; i++) {
      if (statusRadios[i].checked) return statusRadios[i].value;
    }
    return "all";
  }

  function apply() {
    var terms = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    var wantStatus = selectedStatus();
    var onlyFav = favOnly && favOnly.checked;
    var shown = 0;
    items.forEach(function (li) {
      var blob = li.getAttribute("data-search") || "";
      var slug = li.getAttribute("data-slug") || "";
      var tags = (li.getAttribute("data-tags") || "").split(",").filter(Boolean);
      var okText = terms.every(function (t) { return blob.indexOf(t) !== -1; });
      var okTags = activeTags.length === 0 || activeTags.some(function (t) { return tags.indexOf(t) !== -1; });
      var okStatus = wantStatus === "all" || statusOf(slug) === wantStatus;
      var okFav = !onlyFav || isFav(slug);
      var show = okText && okTags && okStatus && okFav;
      li.hidden = !show;
      if (show) shown++;
    });
    if (shownCount) shownCount.textContent = shown;
    if (noResult) noResult.hidden = shown !== 0;
  }

  function updateCounts() {
    if (window.PaperRead) {
      if (readCount) readCount.textContent = window.PaperRead.count("read");
      if (readingCount) readingCount.textContent = window.PaperRead.count("reading");
    }
    if (favCount && window.PaperFav) favCount.textContent = window.PaperFav.count();
  }

  search.addEventListener("input", apply);
  if (favOnly) favOnly.addEventListener("change", apply);
  statusRadios.forEach(function (r) { r.addEventListener("change", apply); });
  tagButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tag = btn.getAttribute("data-tag");
      var i = activeTags.indexOf(tag);
      if (i === -1) { activeTags.push(tag); btn.classList.add("active"); }
      else { activeTags.splice(i, 1); btn.classList.remove("active"); }
      apply();
    });
  });

  // ステータス/お気に入りの変更に追従（件数更新＋絞り込み中は再フィルタ）
  document.addEventListener("statuschange", function () { updateCounts(); apply(); });
  document.addEventListener("favchange", function () { updateCounts(); apply(); });

  updateCounts();
  apply();
})();
