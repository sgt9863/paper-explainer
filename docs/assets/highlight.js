/* 論文本文のマーカー（ハイライト）。localStorage 保存・依存なし。各論文ページで動作。
   - 本文をドラッグ選択すると色パレットが出て、選んだ色でマークを付ける。
   - マークをタップすると削除ボタンが出る。
   - 保存は「本文ブロック index ＋ ブロック内の文字オフセット(start,end)」でアンカーする
     （strong/em/リンク等のインライン構造は壊さず、テキストノードだけを <mark> で囲む）。
   - window.PaperHighlights（getAll/get/replaceAll）と highlightschange イベント(origin付き)を公開し
     sync.js がクラウド同期する。localStorage キー: paperExplainer.highlights.v1。 */
(function () {
  "use strict";
  var KEY = "paperExplainer.highlights.v1";
  var COLORS = ["#ffd54f", "#a5d6a7", "#f48fb1", "#90caf9"]; // 黄・緑・桃・青
  var BLOCK_SEL = "p, li, blockquote, h1, h2, h3, h4, h5, td, th, figcaption, dd, dt";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(map) { try { localStorage.setItem(KEY, JSON.stringify(map)); } catch (e) {} }

  var store = load();
  var article = null, slug = "", blocks = [], toolbar = null, delPop = null;

  function emit(origin) {
    document.dispatchEvent(new CustomEvent("highlightschange", { detail: { slug: slug, origin: origin || "local" } }));
  }

  var api = {
    getAll: function () { return store; },
    get: function (s) { return (s && store[s]) || []; },
    replaceAll: function (map) {           // クラウド同期が一括反映
      store = map || {};
      save(store);
      renderAll();
      emit("remote");
    }
  };
  window.PaperHighlights = api;

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  // ---- オフセット計算 ----
  function charIndex(block, node, off) {
    if (!block.contains(node) && node !== block) return null;
    var r = document.createRange();
    r.selectNodeContents(block);
    try { r.setEnd(node, off); } catch (e) { return null; }
    return r.toString().length;
  }

  // ---- マークの適用/解除 ----
  function clearBlock(block) {
    var marks = block.querySelectorAll("mark.hl");
    Array.prototype.forEach.call(marks, function (m) {
      var p = m.parentNode;
      while (m.firstChild) p.insertBefore(m.firstChild, m);
      p.removeChild(m);
    });
    block.normalize();
  }

  function applyRange(block, s, e, id, color) {
    if (e <= s) return;
    var nodes = [];
    var w = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, null);
    var n; while ((n = w.nextNode())) nodes.push(n);
    var acc = 0;
    for (var i = 0; i < nodes.length; i++) {
      var tn = nodes[i], len = tn.data.length, ns = acc, ne = acc + len;
      acc = ne;
      var os = Math.max(s, ns), oe = Math.min(e, ne);
      if (oe <= os) continue;
      var ls = os - ns, le = oe - ns, mid = tn;
      if (ls > 0) mid = tn.splitText(ls);
      if (le - ls < mid.data.length) mid.splitText(le - ls);
      var mark = document.createElement("mark");
      mark.className = "hl";
      mark.setAttribute("data-hlid", id);
      if (color) mark.style.background = color;
      mid.parentNode.insertBefore(mark, mid);
      mark.appendChild(mid);
    }
  }

  function renderAll() {
    if (!article) return;
    blocks.forEach(clearBlock);
    var list = store[slug] || [];
    // ブロックごと・開始位置昇順で適用
    list.slice().sort(function (a, b) { return a.b - b.b || a.s - b.s; }).forEach(function (h) {
      var block = blocks[h.b];
      if (block) applyRange(block, h.s, h.e, h.id, h.c || COLORS[0]);
    });
  }

  // ---- 選択からハイライト作成 ----
  function currentSelectionRecords() {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null;
    var range = sel.getRangeAt(0);
    if (!article.contains(range.commonAncestorContainer)) return null;
    var recs = [];
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      var intersects = range.intersectsNode ? range.intersectsNode(block) : true;
      if (!intersects) continue;
      var full = block.textContent.length;
      var startIn = block.contains(range.startContainer);
      var endIn = block.contains(range.endContainer);
      if (!startIn && !endIn) {
        // ブロックが選択に完全に含まれるか（前後関係で判定）
        if (!(range.comparePoint && range.comparePoint(block, 0) <= 0)) { /* fallthrough */ }
      }
      var s = startIn ? charIndex(block, range.startContainer, range.startOffset) : 0;
      var e = endIn ? charIndex(block, range.endContainer, range.endOffset) : full;
      if (s === null) s = 0;
      if (e === null) e = full;
      if (e > s) recs.push({ b: i, s: s, e: e, t: block.textContent.slice(s, e).slice(0, 120) });
    }
    return recs.length ? recs : null;
  }

  function addHighlight(color) {
    var recs = currentSelectionRecords();
    if (!recs) return;
    var gid = uid();
    var list = store[slug] || (store[slug] = []);
    recs.forEach(function (r) {
      list.push({ id: gid, b: r.b, s: r.s, e: r.e, t: r.t, c: color });
    });
    save(store);
    renderAll();
    emit("local");
    var sel = window.getSelection(); if (sel) sel.removeAllRanges();
    hideToolbar();
  }

  function removeHighlight(id) {
    var list = store[slug] || [];
    store[slug] = list.filter(function (h) { return h.id !== id; });
    if (!store[slug].length) delete store[slug];
    save(store);
    renderAll();
    emit("local");
    hideDelPop();
  }

  // ---- UI: 色パレット ----
  function buildToolbar() {
    toolbar = document.createElement("div");
    toolbar.className = "hl-toolbar";
    toolbar.hidden = true;
    COLORS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "hl-swatch"; b.style.background = c;
      b.setAttribute("aria-label", "この色でマーカー");
      b.addEventListener("mousedown", function (e) { e.preventDefault(); });
      b.addEventListener("click", function () { addHighlight(c); });
      toolbar.appendChild(b);
    });
    document.body.appendChild(toolbar);
  }
  function showToolbar() {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) { hideToolbar(); return; }
    var range = sel.getRangeAt(0);
    if (!article.contains(range.commonAncestorContainer)) { hideToolbar(); return; }
    var rect = range.getBoundingClientRect();
    if (!rect || (!rect.width && !rect.height)) { hideToolbar(); return; }
    toolbar.hidden = false;
    var top = window.scrollY + rect.top - toolbar.offsetHeight - 8;
    if (top < window.scrollY + 4) top = window.scrollY + rect.bottom + 8;
    var left = window.scrollX + rect.left + rect.width / 2 - toolbar.offsetWidth / 2;
    left = Math.max(8, Math.min(left, window.scrollX + document.documentElement.clientWidth - toolbar.offsetWidth - 8));
    toolbar.style.top = top + "px";
    toolbar.style.left = left + "px";
  }
  function hideToolbar() { if (toolbar) toolbar.hidden = true; }

  // ---- UI: 削除ポップ ----
  function buildDelPop() {
    delPop = document.createElement("div");
    delPop.className = "hl-delpop";
    delPop.hidden = true;
    var b = document.createElement("button");
    b.type = "button"; b.className = "hl-del"; b.textContent = "マーカー削除";
    delPop.appendChild(b);
    document.body.appendChild(delPop);
    delPop._btn = b;
  }
  function showDelPop(mark) {
    var id = mark.getAttribute("data-hlid");
    var rect = mark.getBoundingClientRect();
    delPop.hidden = false;
    delPop._btn.onclick = function () { removeHighlight(id); };
    var top = window.scrollY + rect.bottom + 6;
    var left = window.scrollX + rect.left;
    left = Math.max(8, Math.min(left, window.scrollX + document.documentElement.clientWidth - delPop.offsetWidth - 8));
    delPop.style.top = top + "px";
    delPop.style.left = left + "px";
  }
  function hideDelPop() { if (delPop) delPop.hidden = true; }

  function init() {
    article = document.querySelector("article.paper[data-slug]");
    if (!article) return;                 // 論文ページ以外は何もしない（APIだけ公開）
    slug = article.getAttribute("data-slug");
    blocks = Array.prototype.filter.call(article.querySelectorAll(BLOCK_SEL), function (el) {
      return (el.textContent || "").trim().length > 0 && !el.closest(".hl-toolbar");
    });
    buildToolbar();
    buildDelPop();
    renderAll();

    document.addEventListener("mouseup", function () { setTimeout(showToolbar, 0); });
    document.addEventListener("touchend", function () { setTimeout(showToolbar, 0); });

    document.addEventListener("mousedown", function (e) {
      if (toolbar && !toolbar.contains(e.target)) hideToolbar();
      if (delPop && !delPop.contains(e.target)) {
        if (!(e.target && e.target.closest && e.target.closest("mark.hl"))) hideDelPop();
      }
    });

    article.addEventListener("click", function (e) {
      var m = e.target && e.target.closest ? e.target.closest("mark.hl") : null;
      if (m) { e.preventDefault(); showDelPop(m); }
    });

    window.addEventListener("scroll", function () { hideToolbar(); hideDelPop(); }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
