# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Google Drive の「論文」フォルダに集めた漢方・生薬QC論文を、夜間クラウドセッションで
日本語解説に変換し、**GitHub Pages で公開**＋**メールで通知**する自動パイプライン。

## アーキテクチャ（big picture）

```
Drive「論文」フォルダ(PDF)
   └─[夜間セッション]── runbook/nightly.md の手順を実行
         ├─ Drive MCP で新着PDFを検出（state/processed.json と差分）
         ├─ PDF解析 → 日本語解説(Markdown)を生成（レベル調整: 既定=実務者向け）
         ├─ セルフレビュー
         ├─ content/papers/<slug>.md として保存
         ├─ scripts/build_site.py で docs/ サイト再生成
         ├─ commit & push（→ GitHub Pages 公開）
         └─ Gmail MCP で通知メール（要約＋リンク）
```

このリポジトリは2層に分かれている。理解にはこの分担を押さえることが重要:

- **知能部分**（PDF読解・日本語化・レビュー）は Claude セッションが担う（LLM＋Drive/Gmail MCP）。
  コードではなく `runbook/nightly.md` の手順として記述されている。スケジュール実行された
  無人セッションがこの手順書を読んで実行する、という設計。
- **決定論的部分**（Markdown→HTML、一覧構築）だけが `scripts/build_site.py`。

## データの流れと状態（重要）

- **一次ソースは `content/papers/*.md`**（front matter 付き Markdown）。`docs/` は完全な派生物。
  `build_site.py` は実行のたびに `docs/papers/*.html` を**全削除してから再生成**するので、
  content の md を消して再ビルドすれば対応ページも消える（冪等）。`docs/` を手編集しない。
- **状態ストアは2つあり、runbook が同期させる責務を持つ**:
  1. `content/papers/<slug>.md` … 解説本体（slug が一意キー）
  2. `state/processed.json` の `processed` … `Drive file id → {slug,title,...}`。
     新着判定に使う。処理済みPDFを再処理しないための記録。
  解説を追加したら必ず両方を更新する（runbook ステップ5/6）。

## よく使うコマンド

```bash
# サイト生成（content/papers/*.md → docs/）。テストの代わりにこれで検証する
python3 scripts/build_site.py

# ローカル確認（http://localhost:8000）
python3 -m http.server 8000 --directory docs
```

テストスイートは無い。CI（`.github/workflows/build.yml`）は `build_site.py` を実行して
`docs/index.html` が生成されることを確認するだけ。Markdown を変更したらビルドを通すこと。

## build_site.py の実装上の制約

- **依存ライブラリなし**（標準ライブラリのみ）。ephemeral な夜間セッションで確実に動かすため、
  pip install を増やさないこと。
- front matter パーサは**簡易YAMLサブセット**（`key: value` と `[a, b]` 配列のみ）。ネストや複数行値は非対応。
- 本文の Markdown→HTML も**自前のサブセット変換**（見出し/段落/強調/箇条書き/番号付き/引用/
  パイプ表/水平線/リンク/インラインコード/画像）。これ以外の構文は素通しになるので、解説はこの範囲で書く。
- 図は `![キャプション](assets/<slug>/<file>)` を**単独行**に置くと `<figure>+<figcaption>` 化される。
  画像は `content/papers/assets/<slug>/` に置けば、ビルド時に `docs/papers/assets/<slug>/` へ複製される。
  PDF からの図抽出は PyMuPDF を使う（解析セッション側の作業。build_site.py 自体は依存ゼロのまま）。
- `_` で始まる md（例 `_TEMPLATE.md`）はビルド対象外。
- 各論文ページ冒頭に **ダイジェスト・インフォグラフ**（`render_digest`）を出す。front matter の
  `digest_tagline` / `digest_stats`（`ラベル|値`配列・先頭に雑誌IF）/ `digest_points` から生成。
  配列項目に ASCII カンマは使わない（front matter 配列の区切りのため。読点「、」「／」はOK）。
- `level` は解説レベルの**指示用メタ**（書きぶり調整）であり、ページ・一覧には**表示しない**。
- front matter の `doi`（`https://doi.org/...` 推奨）を各論文ページの **原文リンク**（「原文 (DOI)」）として表示する。
- 各論文に **読書ステータス**（`docs/assets/read.js`。未読 / 読み途中 / 既読 の3状態を `<select class="status-select">` で手動設定）と
  **お気に入り★トグル**（`docs/assets/fav.js`）が付く。状態はブラウザの localStorage 保存（リポジトリには持たない。どちらも手動。
  ページを開いても自動では既読にしない）。一覧は **左サイドバー**（`index.js`）でカテゴリ（タグ）・ステータス（すべて/未読/読み途中/既読）・
  ★お気に入りのみ・キーワード検索を合成して絞り込み、既読/読み途中/★の件数を表示する。各項目・論文ページの
  `data-slug` と `.status-select` / `.fav-toggle` を各スクリプトが拾う仕組み。read.js は旧 `read.v1`(boolean) を `read` として移行する。
- 各論文ページには **AI質問サイドバー**（`docs/assets/chat.js`）が付く。論文本文を JSON で埋め込み、
  ブラウザから直接 Anthropic API を呼ぶ（APIキーは利用者の localStorage 保存・リポジトリには持たない）。
  挙動は `config.json` の `chat`（`enabled`/`default_model`/`models`/`max_tokens`）で制御。一覧ページには付けない。

## 解説レベルの変更

`config.json` の `default_level` を `beginner` / `practitioner` / `researcher` から選ぶ。
各レベルの書きぶり指示は同ファイルの `levels.*.guidance`。配信先・メール設定（draft/send/無効）も `config.json`。

## 規約

- `slug` は英数字・ハイフンのみ（日本語不可、一意）。
- 原文に無い数値・結論を作らない（ハルシネーション防止）。読めない箇所は「原文参照」と明記。
- 開発ブランチ: `claude/pdf-paper-analysis-workflow-xiw34s`。

## ユーザーについて

ユーザーは**非エンジニア**。専門用語は必要に応じてかみ砕いて補足し、コマンドやコード提示時は
「何をするものか」を一言添える。git / GitHub / クラウド操作は具体的な手順を省略しない。
ただし冗長になりすぎないこと（簡単な確認には短く答えてよい）。

## Antigravity サブエージェント連携（コスト最適化）

Gemini（Antigravity CLI / `agy`）をサブエージェントとして使い、Claude のトークンコストを削減できる。
判断・設計は Claude、ファイル生成・テスト・スキャフォールディング・ウェブ検索は Gemini に委譲する。

| コマンド | 用途 |
|---------|------|
| `/antigravity:setup` | AGY のインストール・認証確認 |
| `/antigravity:delegate` | タスクを AGY に委譲 |
| `/antigravity:review` | AGY によるクロスモデルレビュー |
| `/antigravity:research` | AGY による深層調査（ウェブ検索） |
| `/antigravity:cloud-run-debug` | Cloud Run ログ診断 |

スクリプトは `.claude/scripts/antigravity/` に配置。利用には `agy` の導入が必要:
`npm install -g @google/antigravity` → `agy auth login`。
