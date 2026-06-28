/* この論文にAIで質問するサイドバー（ブラウザから直接 Anthropic API を呼ぶ）。
   - APIキーはこのブラウザの localStorage にのみ保存（GitHubには含めない）。
   - 論文本文をシステムプロンプトに含め、その内容に基づいて日本語で回答させる。 */
(function () {
  "use strict";

  var paperEl = document.getElementById("paper-data");
  var cfgEl = document.getElementById("chat-config");
  if (!paperEl || !cfgEl) return;

  var paper = JSON.parse(paperEl.textContent);
  var cfg = JSON.parse(cfgEl.textContent);

  var LS_KEY = "paperExplainer.apiKey";
  var LS_MODEL = "paperExplainer.model";

  var panel = document.getElementById("chatPanel");
  var fab = document.getElementById("chatFab");
  var closeBtn = document.getElementById("chatClose");
  var gear = document.getElementById("chatGear");
  var settings = document.getElementById("chatSettings");
  var apiKeyInput = document.getElementById("chatApiKey");
  var modelSelect = document.getElementById("chatModel");
  var saveBtn = document.getElementById("chatSave");
  var messagesEl = document.getElementById("chatMessages");
  var form = document.getElementById("chatForm");
  var textInput = document.getElementById("chatText");
  var sendBtn = document.getElementById("chatSend");

  // 会話履歴（API送信用。systemは別途付与）
  var history = [];

  // --- モデル選択肢を構築 ---
  (cfg.models || []).forEach(function (m) {
    var opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.label || m.id;
    modelSelect.appendChild(opt);
  });
  modelSelect.value = localStorage.getItem(LS_MODEL) || cfg.default_model;
  apiKeyInput.value = localStorage.getItem(LS_KEY) || "";

  // キー未設定なら最初に設定を開く
  if (!localStorage.getItem(LS_KEY)) settings.hidden = false;

  // --- 開閉（モバイル/サイドバー） ---
  function openPanel() { panel.classList.add("open"); }
  function closePanel() { panel.classList.remove("open"); }
  if (fab) fab.addEventListener("click", openPanel);
  if (closeBtn) closeBtn.addEventListener("click", closePanel);
  if (gear) gear.addEventListener("click", function () { settings.hidden = !settings.hidden; });

  saveBtn.addEventListener("click", function () {
    localStorage.setItem(LS_KEY, apiKeyInput.value.trim());
    localStorage.setItem(LS_MODEL, modelSelect.value);
    settings.hidden = true;
    addMessage("assistant", "設定を保存しました。質問をどうぞ。");
  });
  modelSelect.addEventListener("change", function () {
    localStorage.setItem(LS_MODEL, modelSelect.value);
  });

  // --- メッセージ描画（簡易：改行のみ反映、テキストはエスケープ） ---
  function addMessage(role, text) {
    var div = document.createElement("div");
    div.className = "chat-msg chat-" + role;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function systemPrompt() {
    return (
      "あなたは学術論文の内容を案内する日本語アシスタントです。" +
      "以下の論文の内容だけに基づいて、日本語で簡潔かつ正確に答えてください。" +
      "原文に書かれていないことは推測で補わず、その旨を伝えてください。" +
      "数値や条件を答えるときは論文中の値をそのまま用いてください。\n\n" +
      "【論文タイトル】" + paper.title + "\n\n" +
      "【論文本文（Markdown）】\n" + paper.content
    );
  }

  // --- API 呼び出し ---
  function ask(userText) {
    var apiKey = localStorage.getItem(LS_KEY);
    if (!apiKey) {
      settings.hidden = false;
      addMessage("assistant", "先に Anthropic APIキーを設定してください（⚙ボタン）。");
      return;
    }
    history.push({ role: "user", content: userText });

    var pending = addMessage("assistant", "考え中…");
    sendBtn.disabled = true;

    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: modelSelect.value || cfg.default_model,
        max_tokens: cfg.max_tokens || 1024,
        system: systemPrompt(),
        messages: history
      })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, status: res.status, data: data };
        });
      })
      .then(function (r) {
        if (!r.ok) {
          var msg = (r.data && r.data.error && r.data.error.message) || ("HTTP " + r.status);
          pending.textContent = "エラー: " + msg;
          pending.classList.add("chat-error");
          history.pop(); // 失敗したuserターンは履歴から戻す
          return;
        }
        var text = (r.data.content || [])
          .filter(function (b) { return b.type === "text"; })
          .map(function (b) { return b.text; })
          .join("");
        pending.textContent = text || "(空の応答)";
        history.push({ role: "assistant", content: text });
      })
      .catch(function (e) {
        pending.textContent = "通信エラー: " + e.message;
        pending.classList.add("chat-error");
        history.pop();
      })
      .finally(function () {
        sendBtn.disabled = false;
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = textInput.value.trim();
    if (!t) return;
    addMessage("user", t);
    textInput.value = "";
    ask(t);
  });

  // Enterで送信、Shift+Enterで改行
  textInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
})();
