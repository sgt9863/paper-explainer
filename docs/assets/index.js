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
  var sortSelect = document.getElementById("sortSelect");
  var activeTags = [];

  // 並び替え: data-added（追加日 YYYY-MM-DD）・data-published（発行年）・data-if（IF）・data-title。
  // 値が無い項目（IF/発行年 未設定）は常に末尾へ。
  function numAttr(li, name) {
    var v = li.getAttribute(name);
    if (v === null || v === "") return null;
    var n = parseFloat(v);
    return isNaN(n) ? null : n;
  }
  function sortItems() {
    if (!sortSelect) return;
    var mode = sortSelect.value;
    var arr = items.slice();
    arr.sort(function (a, b) {
      switch (mode) {
        case "added-asc":
          return cmpStr(a.getAttribute("data-added"), b.getAttribute("data-added"));
        case "added-desc":
          return cmpStr(b.getAttribute("data-added"), a.getAttribute("data-added"));
        case "published-asc":
          return cmpNum(numAttr(a, "data-published"), numAttr(b, "data-published"), 1);
        case "published-desc":
          return cmpNum(numAttr(a, "data-published"), numAttr(b, "data-published"), -1);
        case "if-asc":
          return cmpNum(numAttr(a, "data-if"), numAttr(b, "data-if"), 1);
        case "if-desc":
          return cmpNum(numAttr(a, "data-if"), numAttr(b, "data-if"), -1);
        case "title-asc":
          return (a.getAttribute("data-title") || "").localeCompare(
            b.getAttribute("data-title") || "", "ja");
        default:
          return 0;
      }
    });
    arr.forEach(function (li) { list.appendChild(li); });
  }
  function cmpStr(x, y) { x = x || ""; y = y || ""; return x < y ? -1 : x > y ? 1 : 0; }
  // 欠損値(null)は dir に関わらず末尾へ。dir=1 昇順 / -1 降順。
  function cmpNum(x, y, dir) {
    if (x === null && y === null) return 0;
    if (x === null) return 1;
    if (y === null) return -1;
    return (x - y) * dir;
  }

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

  if (sortSelect) sortSelect.addEventListener("change", function () { sortItems(); apply(); });
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
  sortItems();
  apply();
})();
