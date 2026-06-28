# 夜間パイプライン 実行手順書（Runbook）

このファイルは **夜間クラウドセッション（無人）が実行する手順** を定義する。
スケジュール実行されたセッションは、このファイルの手順を上から順に実行すること。

> 起動プロンプト例:
> 「`runbook/nightly.md` の手順に従って、論文フォルダの新着PDFを処理してください。」

---

## 前提

- 作業ブランチ: `claude/pdf-paper-analysis-workflow-xiw34s`（指示が無ければこのブランチで作業しコミット/プッシュ）
- 設定ファイル: `config.json`（配信先・レベル定義・Drive フォルダIDなど）
- 処理状態: `state/processed.json`（処理済みPDFの記録）
- 解説の保存先: `content/papers/<slug>.md`（Markdown が一次ソース。HTMLはここから生成）

---

## ステップ 1: 新着PDFの検出

1. `config.json` の `drive.folder_id` を読む（論文フォルダ）。
2. Google Drive MCP で、そのフォルダ直下の PDF を一覧する。
   - クエリ例: `parentId = '<folder_id>' and mimeType = 'application/pdf'`
3. `state/processed.json` の `processed` に **既に存在する Drive file id は除外** する。
4. 残った（未処理の）PDFが今回の対象。0件なら **何もせず終了**（コミットも配信も不要）。

## ステップ 2: PDF解析と日本語解説の生成

各対象PDFについて:

1. Google Drive MCP（`download_file_content` / `read_file_content`）で本文を取得する。
2. `config.json` の `levels` から **対象レベル** を選ぶ。
   - デフォルトは `default_level`（= `practitioner` 実務者向け）。
   - PDFのファイル名や内容から明らかに別レベルが適切なら調整してよいが、原則デフォルト。
   - 採用したレベルの `guidance` に従って書きぶりを調整する。
3. `content/papers/_TEMPLATE.md` の構成に沿って **日本語の解説 Markdown** を作成する。
   - front matter（title / slug / source_pdf / drive_file_id / drive_url / level / date / tags / summary）を必ず埋める。
   - `date` は実行日（JST）。`slug` は英数字・ハイフンのみ（日本語不可）。
   - 図表・数値は要点のみ。憶測で数値を作らない。読めない箇所は「原文参照」と明記する。
   - **漢方・生薬QCの実務的示唆**（規格設定・分析法・品質管理への応用）を必ず1節入れる。

## ステップ 3: レビュー（自己点検）

生成した各解説を、配信前に次の観点でセルフレビューし、必要なら修正する:

- [ ] 原文に無い数値・結論を捏造していないか（ハルシネーション）
- [ ] レベル（実務者向け）に対して専門的すぎ／易しすぎないか
- [ ] front matter が揃い、`slug` が一意か（既存ファイルと衝突しないか）
- [ ] 実務への示唆・限界の節が具体的か
- [ ] 誤訳・専門用語の取り違えがないか

## ステップ 4: サイト生成

```bash
python3 scripts/build_site.py
```

- `docs/` 以下に一覧ページと各論文ページが再生成される（依存ライブラリ不要）。
- エラーが出たら front matter / Markdown を修正して再実行。

## ステップ 5: 状態の更新

`state/processed.json` の `processed` に、今回処理した各PDFを追記する:

```json
"<drive_file_id>": {
  "slug": "<slug>",
  "title": "<title>",
  "source_pdf": "<filename.pdf>",
  "date": "YYYY-MM-DD"
}
```

## ステップ 6: コミット & プッシュ（GitHub Pages 公開）

```bash
git add content/papers state/processed.json docs
git commit -m "Add explanations for N new paper(s)"
git push -u origin claude/pdf-paper-analysis-workflow-xiw34s
```

- GitHub Pages が有効なら、プッシュ後に公開サイトが更新される（設定は README 参照）。

## ステップ 7: メール通知（任意 / config で制御）

`config.json` の `email.enabled` が `true` のとき:

1. 今回追加した論文の **タイトル・1〜2文要約・Pagesリンク** をまとめた本文を作る。
   - 全文はメールに入れない。「詳細はこちら」で Pages の各ページへ誘導する。
2. 件名: `email.subject_prefix` + 日付 + 「新着N件」。
3. `email.mode`:
   - `draft` … Gmail MCP で **下書きを作成**（人が確認してから送信）。← 既定・推奨
   - `send` … そのまま送信。
4. 宛先: `email.to`（= sugita_shinpei@mail.tsumura.co.jp）。

> メール本文に Pages の URL を載せるため、初回はリポジトリの Pages URL を README に控えておくこと。

---

## エラー時の方針

- PDFが読めない/破損 → その1件はスキップし、`state` には記録せず（次回再試行）、他は続行。最後に未処理として要約に記す。
- Drive/Gmail/GitHub いずれかが失敗 → リトライ（指数バックオフ）。それでも失敗なら、処理済みの分だけコミットし、失敗内容を残して終了。
- 1件も処理できなかった場合はコミットも配信もしない。
