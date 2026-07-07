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

  // メモパネルの幅をドラッグで調整（保存して全論文ページで共有）
  function setupResize(panel) {
    var WKEY = "paperExplainer.notesWidth.v1";
    var handle = document.getElementById("notesResize");
    var MIN = 300, MAX = Math.min(1000, Math.round(window.innerWidth * 0.75));

    function applyWidth(w) {
      w = Math.max(MIN, Math.min(MAX, w));
      panel.style.flex = "0 0 " + w + "px";
    }
    var saved = parseInt(localStorage.getItem(WKEY), 10);
    if (saved) applyWidth(saved);

    if (!handle) return;
    var dragging = false;

    function onMove(e) {
      if (!dragging) return;
      var x = (e.touches ? e.touches[0].clientX : e.clientX);
      var right = panel.getBoundingClientRect().right;
      applyWidth(right - x);
      e.preventDefault();
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove("notes-resizing");
      var w = Math.round(panel.getBoundingClientRect().width);
      try { localStorage.setItem(WKEY, String(w)); } catch (e) {}
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    }
    function onDown(e) {
      dragging = true;
      panel.classList.add("notes-resizing");
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onUp);
      e.preventDefault();
    }
    handle.addEventListener("mousedown", onDown);
    handle.addEventListener("touchstart", onDown, { passive: false });
    // キーボードでも微調整（左右矢印）
    handle.addEventListener("keydown", function (e) {
      var cur = panel.getBoundingClientRect().width;
      if (e.key === "ArrowLeft") { applyWidth(cur + 20); }
      else if (e.key === "ArrowRight") { applyWidth(cur - 20); }
      else return;
      try { localStorage.setItem(WKEY, String(Math.round(panel.getBoundingClientRect().width))); } catch (ex) {}
      e.preventDefault();
    });
    // ダブルクリックで既定幅に戻す
    handle.addEventListener("dblclick", function () {
      panel.style.flex = "";
      try { localStorage.removeItem(WKEY); } catch (e) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
