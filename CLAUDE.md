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

## 解説レベルの変更

`config.json` の `default_level` を `beginner` / `practitioner` / `researcher` から選ぶ。
各レベルの書きぶり指示は同ファイルの `levels.*.guidance`。配信先・メール設定（draft/send/無効）も `config.json`。

## 規約

- `slug` は英数字・ハイフンのみ（日本語不可、一意）。
- 原文に無い数値・結論を作らない（ハルシネーション防止）。読めない箇所は「原文参照」と明記。
- 開発ブランチ: `claude/pdf-paper-analysis-workflow-xiw34s`。
