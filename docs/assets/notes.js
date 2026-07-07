/* 論文ごとのメモ（リッチテキスト・localStorage・依存なし）。各論文ページ右サイドバー。
   - contenteditable ＋ ツールバー（太字・斜体・下線・取消線・マーカー・箇条書き・番号付き・見出し・書式クリア）。
   - 内容は HTML 文字列として保存。入力は自動保存（デバウンス）。
   - window.PaperNotes（get/set/getAll/replaceAll）と noteschange イベントを公開し、
     クラウド同期（sync.js）が replaceAll で他端末の内容を流し込み、noteschange を購読して push する。 */
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
    set: function (slug, html, origin) {
      if (!slug) return;
      if (html) { store[slug] = html; } else { delete store[slug]; }
      save(store);
      document.dispatchEvent(new CustomEvent("noteschange", {
        detail: { slug: slug, text: html || "", origin: origin || "local" }
      }));
    },
    getAll: function () { return store; },
    replaceAll: function (map) {
      store = map || {};
      save(store);
      document.dispatchEvent(new CustomEvent("noteschange", {
        detail: { slug: null, text: "", origin: "remote" }
      }));
    }
  };
  window.PaperNotes = api;

  // --- 安全化: 保存/受信したHTMLから script/iframe やイベント属性を除去 ---
  function sanitize(htmlStr) {
    if (!htmlStr) return "";
    var tpl = document.createElement("div");
    tpl.innerHTML = htmlStr;
    var els = tpl.querySelectorAll("*");
    Array.prototype.forEach.call(els, function (el) {
      var tag = el.tagName.toLowerCase();
      if (tag === "script" || tag === "iframe" || tag === "object" || tag === "embed" || tag === "style" || tag === "link") {
        el.parentNode && el.parentNode.removeChild(el);
        return;
      }
      Array.prototype.slice.call(el.attributes).forEach(function (a) {
        var n = a.name.toLowerCase();
        if (n.indexOf("on") === 0) el.removeAttribute(a.name);
        if ((n === "href" || n === "src") && /^\s*javascript:/i.test(a.value)) el.removeAttribute(a.name);
      });
    });
    return tpl.innerHTML;
  }

  // 旧データ（プレーンテキスト）互換: タグが無ければ改行を<br>にしてエスケープ
  function toHtml(value) {
    if (!value) return "";
    if (/<[a-z][\s\S]*>/i.test(value)) return sanitize(value);
    var esc = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc.replace(/\n/g, "<br>");
  }

  function init() {
    var panel = document.getElementById("notesPanel");
    var editor = document.getElementById("notesText");
    if (!panel || !editor) return;
    var slug = panel.getAttribute("data-slug");
    var status = document.getElementById("notesStatus");
    var toolbar = document.getElementById("notesToolbar");
    var fab = document.getElementById("notesFab");
    var timer = null;

    function setStatus(msg) { if (status) status.textContent = msg; }
    function updatePlaceholder() {
      editor.classList.toggle("is-empty", editor.textContent.trim() === "" && !editor.querySelector("img,li"));
    }
    try { document.execCommand("styleWithCSS", false, true); } catch (e) {}

    editor.innerHTML = toHtml(api.get(slug));
    updatePlaceholder();

    function saveNow() {
      var htmlStr = editor.innerHTML;
      if (editor.textContent.trim() === "" && !editor.querySelector("img,li")) htmlStr = "";
      api.set(slug, htmlStr, "local");
      setStatus("保存しました");
      setTimeout(function () { setStatus(""); }, 1200);
    }
    editor.addEventListener("input", function () {
      updatePlaceholder();
      setStatus("保存中…");
      if (timer) clearTimeout(timer);
      timer = setTimeout(saveNow, 400);
    });

    // ツールバー
    function exec(cmd) {
      editor.focus();
      if (cmd === "marker") {
        // マーカー（背景色）。hiliteColor が使えなければ backColor
        if (!document.execCommand("hiliteColor", false, "#fff3a3")) {
          document.execCommand("backColor", false, "#fff3a3");
        }
      } else if (cmd.indexOf("formatBlock:") === 0) {
        document.execCommand("formatBlock", false, cmd.split(":")[1]);
      } else {
        document.execCommand(cmd, false, null);
      }
      updatePlaceholder();
      if (timer) clearTimeout(timer);
      timer = setTimeout(saveNow, 250);
    }
    if (toolbar) {
      toolbar.addEventListener("mousedown", function (e) {
        var btn = e.target.closest(".nt-btn");
        if (!btn) return;
        e.preventDefault();   // 選択を保持したままコマンド実行
        exec(btn.getAttribute("data-cmd"));
      });
    }

    // 他端末同期/別タブの反映（入力中は上書きしない）
    document.addEventListener("noteschange", function (e) {
      var d = e.detail || {};
      if (d.origin === "remote" && document.activeElement !== editor) {
        var v = toHtml(api.get(slug));
        if (editor.innerHTML !== v) { editor.innerHTML = v; updatePlaceholder(); }
      }
    });

    if (fab) {
      fab.addEventListener("click", function () {
        panel.classList.toggle("notes-open");
        if (panel.classList.contains("notes-open")) editor.focus();
      });
    }

    setupResize(panel);
  }

  // メモパネルの幅・高さをドラッグで調整（保存して全論文ページで共有）
  function setupResize(panel) {
    var WKEY = "paperExplainer.notesWidth.v1";
    var HKEY = "paperExplainer.notesHeight.v1";
    var wHandle = document.getElementById("notesResize");
    var hHandle = document.getElementById("notesResizeV");
    var WMIN = 300, WMAX = Math.min(1000, Math.round(window.innerWidth * 0.75));
    var HMIN = 180, HMAX = window.innerHeight - 32;

    function applyWidth(w) {
      w = Math.max(WMIN, Math.min(WMAX, w));
      panel.style.flex = "0 0 " + w + "px";
    }
    function applyHeight(h) {
      h = Math.max(HMIN, Math.min(window.innerHeight - 32, h));
      panel.style.maxHeight = "none";
      panel.style.height = h + "px";
    }
    var savedW = parseInt(localStorage.getItem(WKEY), 10);
    if (savedW) applyWidth(savedW);
    var savedH = parseInt(localStorage.getItem(HKEY), 10);
    if (savedH) applyHeight(savedH);

    // 汎用ドラッグ（vertical=true なら高さ、false なら幅）
    function makeDrag(handle, vertical) {
      if (!handle) return;
      var cls = vertical ? "notes-resizing-v" : "notes-resizing";
      var key = vertical ? HKEY : WKEY;
      var dragging = false;
      function move(e) {
        if (!dragging) return;
        var pt = e.touches ? e.touches[0] : e;
        var r = panel.getBoundingClientRect();
        if (vertical) applyHeight(pt.clientY - r.top);
        else applyWidth(r.right - pt.clientX);
        e.preventDefault();
      }
      function up() {
        if (!dragging) return;
        dragging = false;
        panel.classList.remove(cls);
        var r = panel.getBoundingClientRect();
        try { localStorage.setItem(key, String(Math.round(vertical ? r.height : r.width))); } catch (e) {}
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", up);
      }
      function down(e) {
        dragging = true;
        panel.classList.add(cls);
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
        document.addEventListener("touchmove", move, { passive: false });
        document.addEventListener("touchend", up);
        e.preventDefault();
      }
      handle.addEventListener("mousedown", down);
      handle.addEventListener("touchstart", down, { passive: false });
      handle.addEventListener("keydown", function (e) {
        var r = panel.getBoundingClientRect();
        if (vertical) {
          if (e.key === "ArrowUp") applyHeight(r.height - 20);
          else if (e.key === "ArrowDown") applyHeight(r.height + 20);
          else return;
        } else {
          if (e.key === "ArrowLeft") applyWidth(r.width + 20);
          else if (e.key === "ArrowRight") applyWidth(r.width - 20);
          else return;
        }
        var nr = panel.getBoundingClientRect();
        try { localStorage.setItem(key, String(Math.round(vertical ? nr.height : nr.width))); } catch (ex) {}
        e.preventDefault();
      });
      handle.addEventListener("dblclick", function () {
        if (vertical) { panel.style.height = ""; panel.style.maxHeight = ""; }
        else { panel.style.flex = ""; }
        try { localStorage.removeItem(key); } catch (e) {}
      });
    }

    makeDrag(wHandle, false);
    makeDrag(hHandle, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
