# paper-explainer — 開発者/エージェント向けガイド

Google Drive の「論文」フォルダに集めた漢方・生薬QC論文を、夜間クラウドセッションで
日本語解説に変換し、**GitHub Pages で公開**＋**メールで通知**する自動パイプライン。

## アーキテクチャ

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

- **解析の知能部分**（PDF読解・日本語化）は Claude セッションが担う（LLM＋Drive/Gmail MCP）。
- **決定論的な部分**（HTML生成・一覧構築）は `scripts/build_site.py`（標準ライブラリのみ）。

## 主要ファイル

| パス | 役割 |
| --- | --- |
| `config.json` | 配信先・レベル定義・DriveフォルダID・メール設定 |
| `runbook/nightly.md` | 夜間セッションが従う実行手順書 |
| `content/papers/*.md` | 解説の一次ソース（front matter 付き Markdown）。`_` 始まりはビルド対象外 |
| `content/papers/_TEMPLATE.md` | 解説Markdownの雛形 |
| `scripts/build_site.py` | Markdown → `docs/` 静的サイト生成（依存なし） |
| `state/processed.json` | 処理済みPDFの記録（Drive file id → メタ） |
| `docs/` | GitHub Pages 公開ディレクトリ（生成物） |

## よく使うコマンド

```bash
# サイト生成（content/papers/*.md → docs/）
python3 scripts/build_site.py

# ローカル確認（http://localhost:8000）
python3 -m http.server 8000 --directory docs
```

## 解説レベルの変更

`config.json` の `default_level` を `beginner` / `practitioner` / `researcher` から選ぶ。
各レベルの書きぶりは同ファイルの `levels.*.guidance` で定義。

## 注意

- `docs/` は生成物。手で編集せず `content/papers/*.md` を編集して再ビルドする。
- `slug` は英数字・ハイフンのみ（日本語不可、一意であること）。
- 原文に無い数値・結論を作らない（ハルシネーション防止）。
