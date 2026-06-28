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
   - 採用したレベルの `guidance` と、全レベル共通の `global_guidance` に従う。
3. `content/papers/_TEMPLATE.md` の構成に沿って **日本語の解説 Markdown** を作成する。
   - front matter（title / slug / source_pdf / drive_file_id / drive_url / level / date / tags / summary）を必ず埋める。
   - `date` は実行日（JST）。`slug` は英数字・ハイフンのみ（日本語不可）。
   - **出力の基本形は「ほぼ全訳＋必要に応じた補足」（`global_guidance`）。** 独自に章立てを作り直さず、
     **原文の構成・節立てに沿って忠実に日本語訳**する（Abstract→Introduction→Results & Discussion→
     Materials & Methods→Conclusions 等）。
   - **最優先: 原文の情報量を落とさない。** 各成分の検量線・LOD/LOQ・保持時間・検出波長、ロット別含量、
     回収率・精度・安定性・システム適合性の数値、装置/カラム/移動相/前処理などの条件は、原文が表なら **表で網羅** する。
   - 補足（訳者注）は必要なときだけ、`> 補足:` 等で原文と区別して加える。憶測で数値・結論を本文に混ぜない。
     読めない/曖昧な箇所のみ「原文参照」と明記する。
   - 実務的示唆を入れる場合も、原文に無い主張は補足として明示する（訳と混在させない）。
4. **図（Figure）の取り込み**（本文中の図がある場合）:
   - Drive MCP の `download_file_content` で PDF を base64 取得（巨大なら結果はファイル保存される）。
     base64 をデコードして PDF を一時保存し、**PyMuPDF** で図を抽出する:
     `pip install pymupdf` →
     `import fitz; doc=fitz.open(pdf); page.get_images(full=True); doc.extract_image(xref)`。
     `page.get_image_rects(xref)` の y 座標で上下（A/B など）の並び順を判定できる。
   - 抽出画像は `content/papers/assets/<slug>/<name>.png` に保存し、md からは
     `![Figure N. キャプション和訳](assets/<slug>/<name>.png)` で参照する（単独行に置くと figure 化される）。
   - `build_site.py` が `content/papers/assets/` を `docs/papers/assets/` に複製し、各論文ページから相対参照できる。
   - 補足資料(S1〜)は本体PDFに無いことが多い。無い図は「原文参照」とし、無理に作らない。

## ステップ 3: レビュー（自己点検）

生成した各解説を、配信前に次の観点でセルフレビューし、必要なら修正する:

- [ ] 原文に無い数値・結論を捏造していないか（ハルシネーション）
- [ ] **原文の定量値・分析条件・結果を取りこぼしていないか（情報量の維持。`global_guidance`）**
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
