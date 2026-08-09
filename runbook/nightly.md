# 夜間パイプライン 実行手順書（Runbook）

このファイルは **夜間クラウドセッション（無人）が実行する手順** を定義する。
スケジュール実行されたセッションは、このファイルの手順を上から順に実行すること。

> 起動プロンプト例:
> 「`runbook/nightly.md` の手順に従って、論文フォルダの新着PDFを処理してください。」

> **毎晩の流れ**: ステップ1〜7 で新着PDFを処理したあと、**新着の有無にかかわらず必ずステップ8（全ページ品質監査ルーチン）を実行**し、既存ページの4基準を点検・是正する。新着PDFが0件でも、ステップ8で是正すべきページがあればコミット/プッシュする。

---

## 前提

- 作業ブランチ: `claude/pdf-paper-analysis-workflow-xiw34s`（指示が無ければこのブランチで作業しコミット/プッシュ）
- 設定ファイル: `config.json`（配信先・レベル定義・Drive フォルダIDなど）
- 処理状態: `state/processed.json`（処理済みPDFの記録）
- 解説の保存先: `content/papers/<slug>.md`（Markdown が一次ソース。HTMLはここから生成）

---

## ★★ 全訳密度（このプロジェクトの絶対的な品質基準）★★

**「処理する」＝「全訳密度で解説を作る」** という意味である。要約・ダイジェストではない。
過去に「要約になっていた（＝全訳密度になっていない）」というやり直しが繰り返し発生したため、
ここに定義を固定する。**新着処理・再処理を問わず、常にこの密度を満たすこと。**

**全訳密度の定義**:

1. **原文の全セクションを、原文の順序・節立てのまま日本語化する**
   （Abstract → Introduction → （Results & Discussion / Experimental）→ Conclusions →
   必要なら References の要点）。章を独自に再構成して要約しない。
2. **原文にある数値・条件・結果は1つも落とさない。** 具体的には:
   - 各成分の検量線（回帰式・r²・直線範囲）・LOD・LOQ・保持時間・検出波長
   - ロット/産地/バッチ別の含量、回収率・併行/室内再現精度(RSD)・安定性・システム適合性の実数
   - 装置・カラム（品名・寸法・粒径）・移動相組成・グラジエントの時間表・流速・カラム温度・注入量・前処理手順
   - 数式は式番号ごと（式(1)(2)…）に、記号定義も含めて記載する
   - **原文が表で示すデータは、必ず表（パイプ表）で再現する**（値を本文に溶かして省略しない）。
3. **要約してよいのは「言い回し・冗長な文章表現」だけ。「数値・条件・結果そのもの」は要約対象外。**
4. 補足（訳者注）は必要なときだけ `> 補足:` で原文と明確に区別して足す。原文に無い数値・結論を混ぜない。
   読めない箇所のみ「原文参照」と明記し、**捏造しない**。
5. **分量の目安**: 原著（実験論文・総説）は**おおむね 30,000〜70,000 文字**の解説になる。
   1万数千文字で「できた」としたら、ほぼ確実に密度不足＝やり直し（過去の Talanta 論文の失敗例）。
   短いレター/規制コメンタリはこの限りではないが、その場合も上記1〜4は満たす。

> セルフレビュー（ステップ3）で「原文の表・数式・定量値をすべて拾えたか」を必ず確認する。
> 一覧で見て他の既存論文ページ（例: `huzhang-ssdmc-rrf-uv-wavelength` / `doe-desirability-multiresponse-optimization`）
> と同等の密度・長さになっているかを基準にする。

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
   - **ダイジェスト**: `digest_tagline` / `digest_stats`（`ラベル|値`配列・先頭に雑誌IF）/ `digest_points` を埋める。
     ページ冒頭にインフォグラフとして表示される。各項目に ASCII カンマは使わない（読点「、」「／」はOK）。
   - **雑誌のインパクトファクター(IF)** を `digest_stats` 先頭と「書誌情報」の両方に記す。**正確な値を確認**し
     （不明なら WebSearch 等で調べる）、出典・年（例: JCR 2024 / Clarivate）を併記する。確認できなければ「要確認」とし**捏造しない**。
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
5. **ダイジェスト用データ**（front matter）を埋める。ページ冒頭の「スライド一枚絵」になる:
   - `digest_tagline` / `digest_stats`（先頭に IF）/ `digest_points` は必須。
   - **実験論文は `digest_chart`（`ラベル|数値`配列・数値は原文どおり）と `digest_chart_label` を入れる**
     （例: 実試料中の含量 mg/g、由来別の成分数 など）。横棒グラフになり「ぱっと分かる」図になる。
     値は**原文の実数**のみ。レビューで数値が無ければ chart は省略してよい。

## ステップ 3: レビュー（自己点検）

生成した各解説を、配信前に次の観点でセルフレビューし、必要なら修正する:

- [ ] 原文に無い数値・結論を捏造していないか（ハルシネーション）
- [ ] **原文の定量値・分析条件・結果を取りこぼしていないか（情報量の維持。`global_guidance`）**
- [ ] レベル（実務者向け）に対して専門的すぎ／易しすぎないか
- [ ] front matter が揃い、`slug` が一意か（既存ファイルと衝突しないか）
- [ ] 実務への示唆・限界の節が具体的か
- [ ] 誤訳・専門用語の取り違えがないか

## ステップ 4: スライド画像とサイト生成

```bash
# 1) ダイジェストを「スライド一枚絵」(PNG)に書き出す（新規slugのみでも可）
python3 scripts/make_slide.py <slug> ...   # 引数省略で全件
# 1b) （任意）OpenAIで「1枚で研究概要がわかる」横長インフォグラフィックを生成
OPENAI_API_KEY=sk-... python3 scripts/make_infographic_ai.py <slug> ...  # 引数省略で全件
# 2) サイト再生成（ヒーロー画像＋OGP画像化）
python3 scripts/build_site.py
```

- `make_slide.py` は playwright＋プリインストール Chromium を使う（`pip install playwright`。
  ブラウザは `/opt/pw-browsers/chromium-*/chrome-linux/chrome` を自動検出）。日本語は IPAGothic で描画。
- `make_infographic_ai.py` は OpenAI 画像API（既定 gpt-image-2・横長 1536x1024・webp）で、front matter の
  事実（タイトル・数値・要点）を正確に反映しつつ研究概要を1枚に描かせる。要 `OPENAI_API_KEY`＋
  api.openai.com への到達。応答は webp 圧縮で取得し途中切断に再試行する（環境変数で上書き可。スクリプト冒頭参照）。
  - **失敗したら原因を切り分けてから諦めること**（2026-08-09 に実際に踏んだ2つ）:
    1. `URLError ... CERTIFICATE_VERIFY_FAILED` → **Python の CA バンドル不在**（macOS の python3.14 等）。
       `SSL_CERT_FILE=/etc/ssl/cert.pem` を付けて再実行すれば通る。**APIキーの問題ではない。**
    2. `429 insufficient_quota / credit_balance_exhausted` → **OpenAI アカウントのクレジット切れ**。
       コードでは解決できないのでユーザーに課金残高の追加を依頼し、④は「未達」として報告する。
       切り分け: `curl -s -o /dev/null -w '%{http_code}' https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"`
       が **200 ならキーは有効**（＝クレジットの問題）、401 ならキーの問題。
- **ヒーロー画像の優先順位**（`build_site.py`）: `ai-infographic.{webp,png,jpg}` → `slide.png` → HTMLダイジェストカード。
  いずれも生成に失敗しても `build_site.py` は動く（順にフォールバック）。
- `docs/` 以下に一覧ページと各論文ページが再生成される（build_site 自体は依存ライブラリ不要）。
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

## ステップ 8: 全ページ品質監査ルーチン（4基準）★毎晩必ず実行★

新着処理の有無にかかわらず、**既存の全論文ページ**を4基準で点検し、不足を是正する。ユーザー指示（2026-07）で常設化した夜間ルーチン。

### 8.1 監査を実行して要対応ページを洗い出す

```bash
python3 scripts/quality_audit.py          # 人間向けレポート（要対応ページ一覧）
python3 scripts/quality_audit.py --json    # 機械可読（パースして自動処理したいとき）
```

出力される4基準と対応関係:

| 基準 | 監査の見方 | 是正アクション |
|---|---|---|
| **① 全訳密度** | 本文（参考文献除く）のCJK文字数が閾値未満なら「要確認」。**一律字数では判定せず、原文と突き合わせて要約止まりかを判断**（`--density N` で閾値変更可・既定5000） | 原文を取得し、**全セクション・全数値・全表・全数式を落とさず全訳し直す**（要約ではない）。目安の密度は既存の充実ページ（例 `mlstp` / `fcg` / `cqcqd` / `doe-desirability`）に合わせる |
| **② 図の抽出** | 本文の図埋め込み（`![...](assets/<slug>/...)`）が0枚なら「要確認」 | 原文PDFに図があれば **PyMuPDF で抽出**（`page.get_images(full=True)`→`fitz.Pixmap`、面積>~120000で絞る）。**抽出画像を必ずRead（目視）して中身を確認**し、原文のFig番号・キャプションに対応させて本文の該当箇所へ単独行で埋め込む。文字だけのレビュー（図が元々無い）は対象外 |
| **③ 引用文献** | 「## 参考文献」等の見出しが無ければ不足 | 原文の参考文献リストを抽出して `## 参考文献` を **`## 訳者補足` の直前**に挿入。原文が `[N]` 番号式なら本文の `[N]` が自動でリンク化される（`build_site.py` の `_linkify_citations`）。**空行区切りの番号付きリストでも明示番号で採番される**（既知バグ修正済み） |
| **④ ヒーロー画像** | `assets/<slug>/ai-infographic.{webp,png,jpg}` が無ければ不足 | `OPENAI_API_KEY=... python3 scripts/make_infographic_ai.py <slug>` で gpt-image 生成（ステップ4参照） |
| ⚠ 壊れ画像リンク | 参照先の画像ファイルが実在しない | 拡張子違い等を修正、または画像を抽出して配置 |

**③に関する落とし穴（実際に踏んだもの・2026-08-09）**

- **引用番号は必ず半角 `[N]` で書く。** 全角の `［N］` は `_linkify_citations` の正規表現（`\[(\d+...)\]`）に一致せず、
  **リンクが1つも生成されないまま気づきにくい**。原文が `[5, Appendix A]` のように番号＋補足なら
  `[5]（Appendix A）` と**番号だけを角括弧に入れて分ける**。範囲のダッシュは `–`（en dash）か `-`。
  U+2212（`−`）は正規表現の文字クラスに無いため一致しない。
  検査: `grep -c 'class="cite"' docs/papers/<slug>.html` が0なら未リンク。
- **図キャプションに半角 `[` `]` を入れない。** 画像の正規表現は `!\[([^\]]*)\]\(...\)` なので、
  キャプション中の `]` でマッチが切れ、**その図だけ `<figure>` にならず生テキストとして出る**。
  原文キャプションに文献番号があれば `（文献5）` のように書き換える。
  検査: `grep -c '<figure' docs/papers/<slug>.html` が本文の図数と一致するか。
- **本文中の相対リンクは `.html` を必ず付ける。** `[表示文字](slug)` のように拡張子が無いと
  リンク化されず角括弧のまま表示される（`_inline` は絶対URLと `*.html` のみ変換）。

### 8.2 是正の進め方（要対応ページごと）

1. front matter の `drive_file_id`（無ければ `source_pdf` で Drive をタイトル検索）から**原本PDFを取得**。
   - `read_file_content` は2段組みの参考文献が混線しやすい。**図の抽出や高密度な全訳には `download_file_content`（バイナリ）＋PyMuPDF** を優先（10MB以下）。
2. 不足している基準だけを埋める（既に満たす基準は触らない）。①②が同時に不足なら全訳し直しの中で図も入れる。
3. `python3 scripts/build_site.py` で再生成し、`quality_audit.py` を再実行して当該ページが解消したか確認。
4. **原本が取得できない/捏造になる場合は無理に埋めない**。`state/quality_audit.json` に理由を記録してスキップ（下記8.3）。原文に無い数値・図・文献を作らないことが最優先。

### 8.3 取得不可ページの記録（捏造しないための除外リスト）

原本がDriveに無い・10MB超でバイナリ取得不可・OCR劣化で正確に読めない等で是正できないページは、`state/quality_audit.json` に slug と理由を記録し、毎晩の監査で**同じ調査を繰り返さない**。ユーザーが該当PDFを再アップロードしたら除外を解除して再挑戦する。

### 8.4 コミット

是正したページがあれば `content/papers` と `docs`（＋追加した `assets`）をコミットしてプッシュ（ステップ6と同じ）。是正0件なら何もしない。

---

## エラー時の方針

- PDFが読めない/破損 → その1件はスキップし、`state` には記録せず（次回再試行）、他は続行。最後に未処理として要約に記す。
- Drive/Gmail/GitHub いずれかが失敗 → リトライ（指数バックオフ）。それでも失敗なら、処理済みの分だけコミットし、失敗内容を残して終了。
- 1件も処理できなかった場合はコミットも配信もしない。
