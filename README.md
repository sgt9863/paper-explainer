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

## 配信方針（推奨構成）

**GitHub Pages を主、メールを従** にした併用構成を採用しています。

- **GitHub Pages（主・アーカイブ）**: 解説の全文を公開。検索・見返し・リンク共有ができる資産として蓄積。
- **メール（従・通知）**: 新着の「タイトル＋要約＋Pagesリンク」だけを送り、見落としを防ぐリマインド。全文は載せない。

メールは `config.json` で `draft`（下書き作成・人が確認して送信）/ `send`（自動送信）/ 無効 を切り替え可能。
既定は安全側の **`draft`** です。

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
