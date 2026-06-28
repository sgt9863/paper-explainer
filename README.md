# paper-explainer

Google Drive に集めた漢方・生薬QC論文を、**夜間クラウドセッション（無人）** で日本語解説に変換し、
**GitHub Pages で公開**＋**メール通知**する自動パイプライン。

```
DLした論文PDF
  → ① Claude に渡す → Google Drive「論文」フォルダへアップロード
  → ② 夜間クラウドセッションが起動（不在の時間帯）
  → ③ PDF解析 → 日本語解説を生成（レベル調整）→ セルフレビュー
  → ④ 配信： GitHub Pages 公開 ＋ メール通知（sugita_shinpei@mail.tsumura.co.jp）
```

## 配信方針

**GitHub Pages 公開のみ** を採用しています（メール通知は無効）。

- **GitHub Pages（アーカイブ）**: 解説の全文を公開。検索・見返し・リンク共有ができる資産として蓄積。
- 各論文ページには内容を質問できる **AI質問サイドバー** が付きます（下記参照）。

> メール通知は既定で **無効**（`config.json` の `email.enabled: false`）。必要になったら `true` にし、
> `mode` を `draft`（下書き）/ `send`（自動送信）で切り替えれば、新着の要約＋Pagesリンクを送れます（手順は `runbook/nightly.md` ステップ7）。

## ディレクトリ構成

```
config.json              設定（配信先・レベル定義・DriveフォルダID・メール）
runbook/nightly.md       夜間セッションが従う実行手順書
content/papers/*.md      解説の一次ソース（Markdown）。_TEMPLATE.md は雛形
scripts/build_site.py    Markdown → docs/ 静的サイト生成（依存ライブラリなし）
state/processed.json     処理済みPDFの記録
docs/                    GitHub Pages 公開ディレクトリ（生成物）
.github/workflows/       サイトビルドの検証CI
```

詳しい設計・コマンドは `CLAUDE.md` を参照。

## セットアップ

### 1. 解説レベルの既定値

`config.json` の `default_level` を設定（既定: `practitioner` 実務者向け）。
`beginner`（入門）/ `practitioner`（実務者）/ `researcher`（研究者）から選択。

### 2. GitHub Pages を有効化

リポジトリの **Settings → Pages** で:

- **Source**: Deploy from a branch
- **Branch**: `claude/pdf-paper-analysis-workflow-xiw34s`（またはマージ先の `main`） / フォルダ `/docs`

公開URLは概ね `https://sgt9863.github.io/paper-explainer/` になります。
URLが確定したら、メール本文用に控えておいてください（`runbook/nightly.md` 参照）。

### 3. 夜間クラウドセッションのスケジュール

Claude Code on the web で **スケジュール済みセッション** を作成し、起動プロンプトを次にします:

> `runbook/nightly.md` の手順に従って、論文フォルダの新着PDFを処理してください。

セッションには Google Drive・Gmail・GitHub の各 MCP 接続が必要です。
（参考: https://code.claude.com/docs/en/claude-code-on-the-web ）

## 各論文ページのAI質問サイドバー

公開した各論文ページには、その論文についてAIに質問できるサイドバーが付きます。
静的サイトのままブラウザから直接 Anthropic API を呼ぶ方式です。

- 初回に右上の ⚙ から **Anthropic APIキー** を入力（**このブラウザの localStorage にのみ保存**。GitHubには含まれません）。
- モデルは既定 **Sonnet 4.6**（⚙で Opus 4.8 / Haiku 4.5 に切替可）。
- 論文本文をコンテキストとして送るので、その論文の内容に基づいて日本語で回答します。
- 設定は `config.json` の `chat`（`enabled` / `default_model` / `models` / `max_tokens`）。

## 手元での確認

```bash
python3 scripts/build_site.py                       # サイト生成
python3 -m http.server 8000 --directory docs        # http://localhost:8000 で確認
```

## 運用フロー

1. 論文PDFを Google Drive「論文」フォルダに入れる。
2. 夜間セッションが新着を検出し、解説を生成・公開・通知。
3. 朝、メールのリンクから Pages の解説を読む。

> 状態管理は `state/processed.json`。一度処理したPDFは再処理されません。
> 解説を直したいときは `docs/` ではなく `content/papers/<slug>.md` を編集して再ビルドしてください。
