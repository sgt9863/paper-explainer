---
title: 総ポリフェノール量を測る「標準化されていない」Folin-Ciocalteu法の包括的・批判的レビュー — 実験因子と方法バリデーションの難問
slug: folin-ciocalteu-total-polyphenols-critical-review
source_pdf: 1s2.0S0039914024001504main.pdf
doi: https://doi.org/10.1016/j.talanta.2024.125771
drive_url: (未アップロード：ユーザー返却PDF)
level: practitioner
date: 2026-07-08
published: true
tags: [QC・品質評価, 分光法, レビュー]
digest_tagline: 世界で最も使われる総ポリフェノール定量法なのに「標準化されていない」——15の実験因子とバリデーション不備を総点検
digest_stats: [IF|6.7（Talanta・JCR2024・Q1）, 種別|批判的レビュー・比色定量法, 対象論文|50件（うちバリデーション実施は16件のみ）, 実験因子|15項目（試料量・試薬濃度・波長・温度・時間・標準品ほか）, 推奨|室温・反応30-60分・765nm付近・最も多い成分を標準品に]
digest_points: [Folin-Ciocalteu法は安価・簡便で世界標準だが試料量・試薬濃度・塩基・波長・反応時間・標準品など15因子が各研究でバラバラで結果が比較不能, ポリフェノールに非特異的で糖・アスコルビン酸・タンパク質・アミノ酸など多くの還元性物質と反応する（＝「還元能」を測っている）, 50論文中バリデーション実施は16件のみでガイドラインの明記も乏しく直線性・精度・真度は実験因子に依存して大きく変動する]
digest_chart_label: レビュー対象論文のうちバリデーション実施の割合
digest_chart: [バリデーション実施|16, 未実施|34]
summary: 総ポリフェノール量（TPC）を測る世界標準の比色法「Folin-Ciocalteu法」を50論文から批判的にレビュー。安価・簡便だが標準化されておらず、試料量・試薬濃度・塩基媒体・添加順序・波長・温度・反応時間・標準品など15の実験因子が研究ごとに大きく異なり結果が比較不能。しかもポリフェノールに非特異的で糖・アスコルビン酸・タンパク質など多くの還元性物質と反応する。50論文中バリデーション実施は16件のみという現状を指摘し、適切な実務指針を示す。
---

<!--
Raposo, Borja, Gutiérrez-González, Talanta 272 (2024) 125771 の全訳密度日本語版。
比色定量法（Folin-Ciocalteu）の批判的レビュー。practitioner レベル。
15の実験因子（2.1-2.15）とバリデーション（3.1-3.6）を網羅。表1・2・3は原文PDFを画像化して
目視転記した全53行／16行／16行のデータをそのままパイプ表で再現（要約ではなく原文の表そのもの）。
原文PDFに本文図は無し（1ページ目のElsevier/Talantaロゴ画像3点のみで、いずれも面積<120000px²の
出版社ロゴ・アイコンであり内容図ではない。PyMuPDFで確認済み・図の抽出は対象外）。
-->

## 書誌情報

- 標題（原題）: A comprehensive and critical review of the unstandardized Folin-Ciocalteu assay to determine the total content of polyphenols: The conundrum of the experimental factors and method validation
- 著者: Francisco Raposo（責任著者）, Rafael Borja, Julio A. Gutiérrez-González
- 所属: Instituto de la Grasa, スペイン国立研究評議会（IG-CSIC）（スペイン・セビリア）
- 掲載誌・巻号・DOI: Talanta, 272 (2024) 125771. DOI: 10.1016/j.talanta.2024.125771
- インパクトファクター: 6.7（Talanta, JCR 2024 / Clarivate。Q1）
- 受理経過: 2023年11月15日受領／2024年1月29日改訂／2月7日受理／2月15日オンライン公開。© 2024 Elsevier B.V.
- 資金: スペイン科学革新省（PID2020-114975RB-I00）

> 補足: Folin-Ciocalteu（FC）法は「総ポリフェノール量（TPC）」を測る世界で最も普及した比色定量法で、生薬・漢方・食品・ワイン・茶など天然物のポリフェノール評価に日常的に使われる。本レビューの警鐘は明快で、**これほど普及しているのに標準化されておらず、実験条件（15因子）が研究ごとにバラバラで結果が比較できない**という現状を50論文から批判的に検証したもの。生薬エキスの品質指標として「総ポリフェノール量」を報告する際の落とし穴を知るのに必須の一本。本文にツムラ（Tsumura And Co.）のダウンロード記録はないが、天然物分析の基礎法として漢方QCにも直結する。

## 要旨（Abstract）

Folin-Ciocalteu法は総ポリフェノール量の定量で世界中の研究室で最も広く使われる方法とみなせる。このアッセイには多くの異なる変種が科学文献で報告されてきた。本レビューでは、Folin-Ciocalteuアッセイに影響する全実験条件を比較的に評価・議論した。さらに、方法バリデーションに関するわずかな研究を、選択性・直線性・精度・真度・検出限界・定量限界・堅牢性の結果に従って評価した。一般に、レビューした文献から導かれる結果は、選択した実験因子と報告された性能パラメータの双方に応じて広く変動し、公表された全体結果の比較を困難にしている。

**キーワード**: 実験因子、Folin-Ciocalteu、方法バリデーション、フェノール化合物、ポリフェノール、総ポリフェノール量

## 1. 序論（Introduction）

ポリフェノール（PPs）という用語は、最も単純なものから最も複雑な構造まで、数千の異なるフェノール化合物が記述されていることを考えると、大きな分子群を含む。化学的観点から、PPsは1つ以上の水酸基を持つ芳香環を少なくとも1つ含む分子。PPsは主に植物の二次代謝産物として生じ、必須の生物活性に関与する。その物理化学的性質により抗酸化性に応じて代謝レドックス反応に参加でき、多くの研究がPPsのヒト健康への正の効果（特に抗酸化による心血管系）を明らかにした。ヒト健康への影響で最も重要な特性はバイオアベイラビリティだが、食品や関連試料での総ポリフェノール量（TPC）とその役割を評価することが非常に重要。

クロマトグラフィーがPPsの定量測定の最も重要な分析ツールとみなされる。しかしTPCの定量には、PPsと比色試薬の反応に基づき反応終点で色の強度に応じて可視域で分光測定する分析法がいくつか利用可能。TPC定量法のうち、**Folin-Ciocalteu（FC）法**は比較的速く・安価で、洗練された装置・試薬を要さず実行が容易なため、世界で最も広く使われるとみなせる。

現在、FC法はPPsが塩基性pHでFCフェノール試薬（FCR）と反応する事実に基づく。しかし元来の目的はチロシン・トリプトファンの2芳香族アミノ酸と、間接的に総タンパク質量の定量だった。当初はFolin-Denisフェノール試薬が使われたが、レドックス反応の感度を上げ沈殿形成を避けるため化学修飾された。化学的にFCRは2つのナトリウム塩（モリブデン酸・タングステン酸）・2つの無機酸（塩酸・リン酸）・硫酸リチウム・水の混合物。リンモリブデン酸/リンタングステン酸複合体は酸化型で黄色、フェノラートイオンで還元されると強い青色を呈する。発色は酸複合体を還元してより低い原子価の金属を持つクロモゲンを形成する電子移動に基づく。

Singletonらの伝統的研究が広く引用され、ワイン製品や植物抽出物のガイドライン（ISO 14502、欧州薬局方）でTPC日常測定の基礎とされてきた。しかしFC法には多くの変種が記述され、主要実験因子——①試料量（原液または希釈）②FCR ③試料とFCRの混合時間 ④塩基媒体（BM）⑤温度 ⑥測定読取時間 ⑦吸光度測定波長 ⑧結果表現の化学参照標準——で有意に異なる多数の組み合わせが記述されている。加えてFCアッセイの日常的な広い使用のため、しばしば体系的な方法バリデーション（MV）や標準化手順を欠く多くの制御されない変動にさらされてきた。MVは分析手順を意図する目的で受け入れる文書的証拠を確立する基本ステップで、確立された規格・品質要件内で信頼できる結果を得るために重要。

本レビューは2つの主目的で実施: (1) 従来報告された分析方法論を集めアッセイに影響する全実験因子を評価、(2) MVを達成したわずかな研究の性能パラメータを要約。

## 2. Folin-Ciocalteuアッセイに影響する実験因子の評価

計50研究をこの批判的レビューに含めた（FC・PPs・フェノールを検索語に）。表1は文献で報告されたFC法の実験条件一覧（原著Table 1、文献[5,7,9–56]）。Singletonらの最適化条件: まず試料1 mL（水で少なくとも60 mLに希釈）と2 M FCR 5 mLを約1〜8分混合。次に20%(w/v) Na2CO3溶液15 mLを加え水で総量100 mLに調整。室温で保持し1 cmキュベットで765 nmで吸光度測定。没食子酸（GA）を参照標準に選択。この伝統的方法は総量20 mLに5倍スケールダウン提案（試料2 mL＋希釈FCR 10 mL＋7.5% Na2CO3 8 mL）。以下、FC法に影響する15の実験因子を個別に評価。

**表1. FCアッセイに関する実験因子の一覧**（原著Table 1を全行転記。VSAM=試料量、DW=希釈水、FCR=Folin-Ciocalteu試薬、TIME I=試料・FCR混合時間、BM-vol=塩基媒体量、BM-co=塩基媒体濃度、BM-tot=反応総量中の塩基%、VTOT=反応総量、VRAT=試料/総量比、TEMP=温度、TIME II=測定読取までの反応時間、ABS=吸光度測定波長、RANGE=検量範囲、SOLVENT=標準溶解溶媒。「—」は原文で空欄＝未報告。(DIL)=希釈試料、(B)/(A)/(E)=DWをFCR前/後/測定直前に添加、*No=没食子酸を標準品としていない、MPR=マイクロプレートリーダー使用、MET=メタノール、ET=エタノール）

| 文献 | VSAM(mL) | DW(mL) | FCR(mL) | TIME I(分) | BM-vol(mL) | BM-co(%w/v) | BM-tot(%w/v) | VTOT(mL) | VRAT(%v/v) | TEMP(℃) | TIME II(分) | ABS(nm) | RANGE(mg/L) | SOLVENT |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [5] | 1 | 60・19(A) | 5 | 1–8 | 15 | 20 | 3 | 100 | 1 | RT | 120 | 765 | 0–5 | — |
| [7] | 1(DIL) | 1:100 | 5(10%) | 3–8 | 4 | 7.5 | 3 | 10 | 10 | RT | 60 | 765 | 10–50 | Water |
| [9] | 10 | — | 0.5 | — | 1.5 | 20 | 2.5 | 12 | 83 | 20 | 60 | 750 | 0–1 | — |
| [10] | 0.050 | — | 0.050(20%) | — | 0.100 | 6 | 3 | 0.200 | 25 | 25 | 120 | 760-MPR | 2.5–25 | Water |
| [11] | 0.020 | — | 0.100 | 5 | 0.080 | 7.5 | 3 | 0.200 | 10 | 25 | 120 | 750-MPR | 0-100*No | Water |
| [12] | 0.100 | — | 0.200(10%) | — | 0.800 | 7.42 | 5.4 | 1.1 | 9.1 | RT | 120 | 765-MPR | 0–425 | MET(40%) |
| [13] | 0.100 | — | 0.100 | 2 | 0.800 | 5 | 4 | 1 | 10 | 40 | 20 | 740 | 0-80*No | MET(100%) |
| [14] | 0.015 | 0.170・0.073(E) | 0.012 | — | 0.030 | 20 | 2 | 0.300 | 5 | RT | 60 | 765 | 1–8 | Water |
| [15] | 0.020 | 1.58 | 0.100 | 5 | 0.300 | 20 | 3 | 2 | 1 | 45 | 30 | 765 | — | Water & ET |
| [16] | 0.050 | — | 0.050(20%) | — | 0.100 | NaOH | — | 0.200 | 25 | RT | 3 | 760 | 2.5–37.5 | Water |
| [17] | 0.020 | 0.188・0.050(E) | 0.012 | — | 0.030 | 20 | 2 | 0.300 | 6.7 | RT | 60 | 765-MPR | 0.25–10 | — |
| [18]a | 0.500 | — | 5(10%) | — | 4 | 10.6 | 4.46 | 9.5 | 5.3 | — | — | 630 & 765 | 7.5–960*No | — |
| [18]b | 0.010 | — | 0.100(10%) | — | 0.080 | 10.6 | 4.46 | 0.190 | 5.3 | — | — | 630-MPR | 7.5–960*No | — |
| [19] | 2 | 10 | 1 | — | 12 | 10.75 | 5.16 | 25 | 8 | — | 30 | 760 | 6.4–26.9*No | — |
| [20] | 0.020 | 1.58 | 0.100 | 1–8 | 0.300 | 20 | 3 | 2 | 0.1 | RT | 120 | 765 | 50–500 | ET(10%) |
| [21] | 0.250 | 19.75(A) | 1.25 | — | 3.75 | 20 | 3 | 25 | 1 | — | 120 | 765 | — | — |
| [22] | 0.020 | — | 0.100(25%) | 4 | 0.075 | 10 | 3.85 | 0.195 | 10.3 | RT | 120 | 750-MPR | 10–200 | — |
| [23] | 0.025(DIL) | 0.200 | 0.025(33%) | 5 | 0.025 | 10.6 | 0.96 | 0.275 | 9* | 25 | 60 | 725-MPR | 0–180 | — |
| [24] | 0.050 | — | 0.250(10%) | 3 | 0.100 | 7.5 | 1.88 | 0.400 | 12.5 | 50 | 15 | 760-MPR | — | — |
| [25] | 0.012 | 0.050(B)・0.100(A) | 0.013 | — | 0.125 | 7 | 2.92 | 0.300 | 4 | — | 90 | 750-MPR | 1.25–120 | — |
| [26] | 0.100 | — | 5(10%) | — | 3.5 | 11.5 | 4.68 | 8.6 | 1.2 | 40 | 60 | 600–800 | 0–500 | — |
| [27] | 0.300 | — | 1.5 | 3 | 1.2 | 7.5 | 3 | 3 | 10 | RT(27) | 60 | 765 | 0.5–9 | — |
| [28] | 0.250 | — | 1(10%) | 5 | 1 | 10 | 4.44 | 2.25 | 11.1 | RT | 30-60-120 | 765 | 15–100 | Water |
| [29] | 2(DIL) | 10 | 1 | — | 12 | 29 | — | 25 | 1.6* | — | 30 | 760 | 2–8 | Water |
| [30] | 1 | 15 | 1 | 6 | 3 | 20 | 3 | 20 | 5 | 30–40 | 120 | 765 | 40–200 | Water |
| [31] | 1(1:10)DIL | 19(B&A) | 1 | 4 | 4 | 10 | 1.6 | 25 | 0.4* | RT | 90 | 750 | 0–250 | — |
| [32] | 0.100 | — | 0.100(50%) | — | 0.800 | 5 | 4 | 1 | 10 | 40 | 20 | 760 | 2.5–50 | Water; ET & MET(40%) |
| [33] | 0.100 | — | 1(50%) | — | 3 | 20 | 14.63 | 4.1 | 2.4 | RT | 30 | 765 | 0–100 | MET |
| [34] | 1 | — | 2.5(10%) | 5 | 2 | 7.5 | 2.73 | 5.5 | 18.2 | 50 | 10 | 765 | 100–500 | — |
| [35] | 1 | — | 10(10%) | — | 8 | 7.5 | 3.16 | 19 | 5.3 | 45 | 30 | 761 | 0–120 | — |
| [36] | 0.100(DIL) | 1.5(B) | 0.100 | — | 0.3 | 20 | 3 | 2 | 5 | RT | 60-90-120 | 760 | 20–150 | Water |
| [37] | 0.050 | 0.450(B) | 1.25(10%) | — | 1 | 7.5 | 2.73 | 2.75 | 1.8 | RT | 120 | 765 | 43–500 | Water |
| [38] | 0.500 | 5.1(A) | 0.400 | 5–8 | 4 | 7 | 2.8 | 10 | 5 | — | 120 | 765 | — | — |
| [39] | 0.400 | 4(B)・3.4(A) | 0.600 | 5 | 1.6 | 20 | 3.2 | 10 | 4 | — | 30 | 760 | 0–100 | MET |
| [40] | 0.015 | 0.200 | 0.015 | — | 0.020 | 7 | 0.56 | 0.250 | 6 | RT | 60 | 765-MPR | — | — |
| [41] | 0.020(DIL) | 0.050 | 0.100(10%) | — | 0.030 | 7.42 | 1.11 | 0.200 | 10 | RT | 120 | 766-MPR | 17–510 | ET(40%) |
| [42] | 1 | — | 1(10%) | — | 2 | 3.5 | 1.75 | 4 | 25 | — | 90 | 765 | — | — |
| [43] | 0.020 | 3(B)・0.98(A) | 0.250 | 8 | 0.750 | 7.5 | 1.13 | 5 | 0.4 | RT | 120 | 765 | — | — |
| [44] | 0.400 | 2 | 0.200 | — | 2.4 | 10.75 | 5.16 | 5 | 8 | — | 30 | 765 | 25–150 | — |
| [45] | 0.020 | 0.100(B)・1.58(A) | 0.100 | 3 | 0.200 | 7.5 | 0.75 | 2 | 1 | — | 30 | 765 | — | — |
| [46] | 0.100 | — | 0.100 | — | 0.800 | 5 | 4 | 1 | 10 | RT | 20 & 90(20) | 750 & 760(750) | 50–250 | Water & ET(40%) |
| [47]a | 0.400 | — | 2(10%) | 10 | 2 | 7.5 | 3.41 | 4.4 | 9.1 | 40 | 30 | 750 & 760 | 10–100 | — |
| [47]b | 0.020 | — | 0.100(10%) | 10 | 0.100 | 7.5 | 3.41 | 0.220 | 9.1 | RT | 10 | 750-MPR | 10–100 | — |
| [48] | 0.200 | 2.3(B)・1.75(A) | 0.250 | 3 | 0.500 | 10 | 1 | 5 | 4 | RT | 120 | 740 | 0.4–6 | — |
| [49] | 1 | — | 5 | — | 4 | N.R | — | 10 | 10 | — | 120 | 765 | 0–1 | — |
| [50] | 0.500 | — | 2.5(10%) | 5 | 2 | 7.5 | 3 | 5 | 10 | 40 | 15 | 760 | 10–70 | — |
| [51] | 0.100 | 6(B)・1.9(A) | 0.500 | 4 | 1.5 | 7.5 | 1.13 | 10 | 1 | RT | 120 | 750 | 250–1250 | Water |
| [52] | 0.500 | — | 2.5(10%) | 0.5–8 | 2 | 7.5 | 3 | 5 | 10 | 24 | 150 | 765 | 0–100 | Water |
| [53] | 6.5(DIL) | — | 0.5(50%) | — | 3 | 20 | 6 | 10 | 65(13) | RT | 30 | 725 | 0–10 | — |
| [54] | 0.200 | — | 1(3.3%) | 5 | 0.800 | 0.75；0.94；7.5 | 0.30；0.38；3 | 2 | 10 | — | 120 & 180 | 760 | 10–100 | Water |
| [55] | 1 | — | 2.5(10%) | 5 | 1 | 7.5；20；35 | 1.67；4.44；7.78 | 4.5 | 22.2 | — | 120 | 725 & 765 | 8.5–102 | — |
| [56]a | 0.100 | 3.8(A) | 0.100 | 5 | 1 | 7 | 1.4 | 5 | 2 | — | 120 | 750 | 10–60 | — |
| [56]b | 0.020 | 0.010(A) | 0.020 | 6 | 0.200 | 7 | 5.6 | 0.250 | 8 | — | 120 | 750-MPR | 10–60 | — |

> 補足: 表1は原著論文の図版（画像化された表）をPyMuPDFでページ描画しレンダリング画像として目視転記したもの（原文が本文テキストとして抽出困難な組版のため）。50論文のうち3論文（[18][47][56]）は2条件を報告しているため実データは53行。

### 2.1 吸光度測定システム: 分光光度計 vs マイクロプレートリーダー

分光光度計とマイクロプレートリーダー（MPR）のどちらを使うか。MPRの欠点は容量の精度と測定担当者の熟練が必要な点。利点は①高速で一度に多数の試料をスクリーニング②少量の試料・試薬③廃棄物少。MPRの吸光度はプレートウェルの短い光路長のため分光光度計の約半分だが、TPC定量上は両者に有意差なし。効率・試薬コスト・緑色化の観点から**MPRベースのTPC法を支持**。

### 2.2 試料量（VSAM）

試料量は稀な場合を除き無視できない。VSAMは同時試験できる試料数に反比例し、吸光度測定システムに関連。伝統法ではワイン試料1 mL。文献では10 μL〜2 mLと広範囲。試料量/総量の比も重要で、元の研究では1%だが、大半は高い比（最大25% v/v）を報告。

### 2.3 希釈水（DW）— 量と添加タイミング

希釈水（make-up water）は適切な吸光度測定のため試料を希釈する水（蒸留・脱イオン水）。DW量は重要因子で希釈率が結果に強く影響。伝統法ではFCR添加前に蒸留水60 mLに希釈。DW添加のタイミングも論争的（FCR前/後、2段階など）。多くの方法論でDW添加が報告されていないのが驚き。**FCR前に1段階でDW添加を推奨**。

### 2.4 FCR — 濃度と量

市販FCRは水酸化ナトリウム滴定で2 M。しばしば固定体積比で水希釈が提案され（3.3〜50% v/v、最多は10%）。市販試薬1 mLを水で総量10 mLにする（またはその倍数）。ただし試薬ボトルが新しくなるたびに結果を確認し、供給試薬の適合性や応答の変化がないかチェックすることが重要。加えてFCR濃度が45〜55%(v/v)の範囲でわずかに変動しても吸光度値に影響しないことが報告されている[32]。

反応に用いるFCR量について、伝統法ではTPC検出用に約5 mLのFCRが選ばれた[5]。報告された方法論はFCR量（未希釈または希釈）を12 μL[14,17]〜10 mL[35]と広範囲に変動させている。加えてGalvaoらは要因計画で2種類の体積（1 mLと3 mL）を評価し、より少ないFCR量でより良い結果を報告した[29]。結論として、より少ない体積や希釈溶液を用いてFCRを節約することは、経済的なラボ運営の観点からも考慮すべきである。

### 2.5 反応時間I — 試料とFCRの混合

伝統法では試料とFCRの反応時間1〜8分。多くの研究がこの情報を欠き、試料と試薬（FCRとアルカリ）を同時混合と誤解されうる。

### 2.6 塩基媒体（BM）: 化学試薬・濃度・量

BMがヘイズやCO2気泡でTPC比色測定に悪影響しないことを確保。伝統法ではNa2CO3をpH上昇の支持アルカリ媒体に（他にNaOH・NaCN・NaHCO3も）。元来15 mLの20%(w/v)溶液（縮小版8 mLの7.5%）で総反応量中約3%(w/v)のBMを得る。文献では極端に0.3%〜14.6%(w/v)まで。7.5%が多くの出発点。BM濃度は論争的でCarmona-Hernándezらは3.5%を最適とし、Lawagらは蜂蜜の還元糖干渉を減らすため希薄溶液（0.75% vs 7.5%）を推奨。**総反応量中約3%(w/v)のNa2CO3維持を提案**（逸脱は詳細な正当化が必要）。

### 2.7 試薬の添加順序

このアッセイは極めて敏感で試薬添加を一定順序で行う。文献は論争的。BoxはアルカリをFCR前後どちらに加えても感度損失なしと報告（アルカリ先добを選好）。一方、希釈条件で試料とFCRを混ぜ最後に炭酸塩水溶液を加えるのが必須。フェノールの空気酸化を避けるためアルカリ前にFCR添加が重要ステップと強調。**このFCR先添の方法論に同意**。

### 2.8 総量（VTOT）

反応の総容量（VTOT）は試料・FCR・BMの3固定量＋任意のDWで決まる。文献で報告されたVTOTは広く変動。一般的なFCプロトコルは試料あたりVTOT 100 mLを提案。代替として20 mLへの縮小も、比較可能な結果を得つつ試薬節約・廃棄コスト減のため提案された[5]。この範囲（20〜25 mL）で実施された研究もある。いずれにせよ適切な実験機器を用いればさらなる縮小も可能。この観点から、反応混合物の総容量はミニスケール化され1〜12 mLの範囲に収まり、VTOT 2・5・10 mLが広く報告された。さらに近年の実験研究では反応容量を190〜400 μL（マイクロスケール）へ縮小することが提案され、VTOT 200・300 μLが最も多く報告された。例外的にAinsworthらはミニスケール（1.1 mL）で反応を行った後、0.200 mLの試料を個別のウェルプレートへ移した[12]。このマイクロスケール容量に関わらず、吸光度測定にはMPRの使用が必須だった。

FCアッセイのVTOTとスケールダウンの各種手法に関して、残念ながら多くの場合、元来の実験条件である試料に対する比率（VRAT）1%が満たされていない点を強調しておきたい。具体的にはSariらは2つのスケール（5 mLと250 μL）を比較し、それぞれVRAT 2%と8%(v/v)を用いた[56]。

FCRと同様、総容量はラボの財務面にも大きく影響する。この観点からTatzberらは試薬・試料量を90%節約するマイクロスケール法を評価した[41]。我々の経験からは、吸光度測定をMPRで行う場合の主な利点を踏まえ、可能な限りマイクロスケールの総容量でTPCを定量することを推奨する。

### 2.9 波長

Singletonの元研究ではヘテロポリ青色複合体が765 nm中心の広い吸収範囲。文献では725〜765 nm。欧州薬局方は760 nm。630 nmという稀な報告も。750と760 nmの吸光度に有意差なしとの報告。

### 2.10 温度

元来、室温（RT）で発色。温度は反応速度に関連し測定読取時間と連動（高温ほどインキュベーション時間短縮）。温度効果を扱う研究は少ない。Pereiraらは25/30/40℃で青色複合体の形成速度・安定性に効果なしと報告。Carmona-Hernándezらは17℃で36℃より最適TPC値。**RTをTPC測定の出発温度とすべき**。

### 2.11 反応時間II — 測定読取

多くの研究がその効果を評価した基本因子。PPs含量・FCR量・BM/アルカリ性・温度が最大発色到達時間に影響する経験的動力学研究で評価すべき。元来120分で反応終点（Lawagらは120分が蜂蜜の還元糖干渉を避けると報告）。この長さは日常分析に不便。60/90/120分で有意差なし（60分推奨）、30/60/90分で有意差なしとの報告。30〜35分区間を超えると吸光度が漸近曲線で緩やか増加後ほぼ安定。**試料マトリックスに応じ反応時間30〜60分を提案**。

### 2.12 化学標準

理論上、校正標準は実試料の分析対象化合物と同一であるべき。しかしTPC定量は結果表現・比較のための適切な標準選択の問題を持つ。元のFC法・ワイン茶ガイドラインでは最も広く使われる標準は**没食子酸（GA）**（満足な溶解性・乾燥形での安定性・比較的安価）。欧州薬局方はタンニン豊富な抽出物にピロガロールを選択。他にカテキン・カテコール・クロロゲン酸・フェルラ酸・タンニン酸なども。Bastolaらは5単一フェノールと7混合を評価しGAを最良の個別標準、5 PPsの混合を複数標準の選択肢とした[26]。Luacesらはオリーブ果実の主要PPsファミリーを代表する化合物としてオレウロペイン・ルチン・シアニジン-ルチノシドを選択した[43]。同様にPlatzerらは多様な参照化合物（5つの異なるPPsサブグループを代表）がTPC結果に与える影響を検討し、大半の化合物で有意差が確認された（例外は少数）——**このアッセイはTPCでなく還元能を測っている**ことが裏付けられた[45]。

多様な試験由来の結果比較は容易ではない。各還元性物質の感度はその化学物質固有のものであり、異なるフェノールは異なる程度で反応するため、結果を単一の数値として表現することは本質的に恣意的である[53]。さらにFCRで得られる吸光度値を標準化しようとする試みは、フェノール性物質が時間経過とともに質的・量的に変化しうるため、常に困難を伴う[9]。したがってPPsの多様性・不均一性を考慮すると、**試料中で最も豊富な成分を（市販入手可能なら）化学標準に選ぶのが最良**という結論に至った[35,44]。

### 2.13 校正標準の溶媒

溶媒はPPs抽出の観点で評価されてきた（極性・PPs溶解能）が、校正標準調製の溶媒もMVに直結するため考慮すべき。UV-Vis適合溶媒中のアナライト溶液が必要。校正標準は通常、試料調製に使った同じ溶媒（＝試料抽出物）でストックを希釈して調製。報告時の溶媒は水・エタノール・メタノールまたはそれらの混合。Pereiraらは水/40%エタノール水/40%メタノール水を評価し、純水は応答を減らし水-有機混合は影響なしと報告。

### 2.14 校正範囲

校正範囲は実証された正確性で決定できるアナライトの下限・上限濃度の区間。直線範囲（信号が濃度に正比例）が望ましい。GAを標準とするTPC校正では非常に広範囲（最大1250 mg/L、逆に0〜1 mg/Lも）。**試料抽出物の予想濃度に応じた校正範囲選択を提案**。

### 2.15 干渉

FCアッセイはPPsに非特異的で慎重な解釈が必要。元来の目的はチロシン・トリプトファン測定なので両者は干渉種。長年、FCRがPPs以外の抗酸化分子とも反応することが示された。Everetteらは80化合物でFCRの反応性を試験し、多くの非フェノール化合物（還元性を持つ芳香族・脂肪族有機・無機化合物）が相当な反応性を示した。その後、RoverとBrownは陰性対照（糖類）と陽性対照（フェノール化合物）による干渉を評価し、陰性対照の中ではフルクトースとグルコースが最も高い応答を示した[20]。意外なことにPicoらは、エンジオール（enediols）と還元糖の存在により小麦粉試料の75%で干渉が生じたと報告した[40]。加えてFCRはアスコルビン酸[5,12,26]・酢酸およびギ酸[26]、タンパク質（本法の元来の目的）[53]、還元性多糖[54]といった干渉性化合物とも反応することが報告されている。**したがってFCアッセイは実際には実験条件下で容易に酸化されるすべての成分を測定しており、フェノールでない物質、あるいはフェノールとはまれにしか考えられない物質も含んでいる**[3]。

## 3. Folin-Ciocalteuアッセイのバリデーション

分析校正は実験信号とアナライト濃度の関係を確立する共通の必須ステップ。**残念ながら50論文中バリデーション（MV）を扱ったのはGAを標準とした16件のみ**。TPC定量のバリデート法の情報を集めた体系的レビューはこれまでない。MVには多くのガイドラインがあるが命名法・手順・実装指針に有意な差がある。収集研究でMV評価基準のガイドライン明記は稀（例外: Anvisa・AOAC・Eurachem・ICH〔最多引用〕・ISO 5725-2・USFDA）。以下、選択性・直線性・精度・真度・LOD・LOQ・堅牢性でまとめる。

### 3.1 選択性

分析法は目的アナライトのみを干渉なく測るとき選択的。大半の論文でこのパラメータは評価されず（FCが非選択的と既知のため）。Sánchez-Rangelらは抽出物のアスコルビン酸含量でTPC値を補正することを提案。Kupinaらは糖（フルクトース・グルコース・スクロース）で正の効果なしと報告。

### 3.2 以降 直線性・精度・真度・LOD・LOQ・堅牢性

（Table 2・3にまとめ）代表例: 校正範囲は0〜1 mg/Lから43〜500 mg/Lまで様々、直線点数4〜9水準、反復2〜6。堅牢性は主にブランク（10）や校正曲線・マトリックス効果・機器・照度で評価。LOD/LOQも0.006/0.019 mg/Lから14.2/42.9 mg/Lまで実験因子に依存して大きく変動。**全体として、報告された性能パラメータは選択した実験因子に強く連動して広く変動する**。

## 4. 結論（Conclusions）

一方で、FCアッセイは世界中で異なる実験因子で行われ結果に影響してきた。選択性を欠くにもかかわらず、様々なマトリックスのTPC定量に有用な比色法である。文献で最も一般的な変種は: ①総量②吸光度測定システム③試薬添加順序④波長⑤反応時間⑥温度⑦参照標準。マイクロスケール化（高速・低試薬消費・廃棄物減）を推奨。FC反応の結果は試薬添加順序に強く依存。765 nm付近のわずかに異なる波長は比較可能な結果を生む可能性。温度と時間の複合効果はTPC測定で有意——**RTと反応時間30〜60分がFC法に適切**。化学標準の選択が最も重要で、異なるPPs構造は異なる強度で光を吸収するため吸収値は必ずしも試料濃度を再現しない。**試料中で最も豊富な化学成分を標準に選ぶべき**。

他方、選択した実験条件によらず、FC法は少なくとも直線性・正確性（精度・真度）でバリデートされねばならない。しかし大半のFC研究でMV不備が認められ、MVガイドラインの記載は乏しく、性能パラメータは広く変動し実験因子に連動していた。適切なMVには水や水-有機混合に溶かした純化学品でなく**native試料（実試料）を使うことが不可欠**。試料マトリックスを常に考慮して信頼できる定量TPC結果を得る。

**最終結論**: FC実験因子が同一でない、かつ/または未知試料分析前にMVが行われていない場合、文献で公表された全体TPC結果の比較は疑わしいとみなせる。

## 参考文献

1. H. Cory, S. Passarelli, J. Szeto, M. Tamez, J. Mattei, The role of polyphenols in human health and food systems: a mini-review, Front, Nutr. 5 (2018) 1–9, https:// doi.org/10.3389/fnut.2018.00087.

2. M.J. Motilva, A. Serra, A. Maci`a, Analysis of food polyphenols by ultra highperformance liquid chromatography coupled to mass spectrometry: an overview, J. Chromatogr. A. 1292 (2013) 66–82, https://doi.org/10.1016/j. chroma.2013.01.012.

3. R.L. Prior, X. Wu, K. Schaich, Standardized methods for the determination of antioxidant capacity and phenolics in foods and dietary supplements, J. Agric. Food Chem. 53 (2005) 4290–4302, https://doi.org/10.1021/jf0502698.

4. O. Folin, V. Ciocalteu, On tyrosine and Tryptophane determinations in proteins, J. Biol. Chem. 73 (1927) 627–650, https://doi.org/10.1016/s0021-9258(18) 84277-6.

5. V.L. Singleton, J.A. Rossi Jr., Colorimetry of total phenolics with phosphomolybdic-phosphotungtic acid reagents, Am. J. Enol. Vitic. 16 (1965) 144–158, https://doi.org/10.5344/ajev.1965.16.3.144.

6. International Organization of Vine & Wine (OIV), Compendium of International Methods of Wine and Must Analysis. Method OIV-MA-AS2-10, Folin-Ciocalteu Index, 1990.

7. International Organization for Standardization (ISO), ISO 14502 Determination of Substances Characteristic of Green and Black Tea — Part 1: Content of Total Polyphenols in Tea — Colorimetric Method Using Folin-Ciocalteu Reagent, 2005.

8. European Pharmacopoeia, Determination of Tannins in Herbal Drugs, Council of Europe, Strasbourg, France, 2005 (Chapter 2).8.14.

9. J.D. Box, Investigation of the Folin-Ciocalteau phenol reagent for the determination of polyphenolic substances in natural waters, Water Res. 17 (1983) 511–525, https://doi.org/10.1016/0043-1354(83)90111-2.

10. L.M. Magalh˜aes, M.A. Segundo, S. Reis, J.L.F.C. Lima, A.O.S.S. Rangel, Automatic method for the determination of Folin-Ciocalteu reducing capacity in food products, J. Agric. Food Chem. 54 (2006) 5241–5246, https://doi.org/10.1021/ jf060324s.

11. Q. Zhang, J. Zhang, J. Shen, A. Silva, D.A. Dennis, C.J. Barrow, A simple 96-well microplate method for estimation of total polyphenol content in seaweeds, J. Appl. Phycol. 18 (2006) 445–450, https://doi.org/10.1007/s10811-006-9048-4.

12. E.A. Ainsworth, K.M. Gillespie, Estimation of total phenolic content and other oxidation substrates in plant tissues using Folin-Ciocalteu reagent, Nat. Protoc. 2 (2007) 875–877, https://doi.org/10.1038/nprot.2007.102.

13. N. Cicco, M.T. Lanorte, M. Paraggio, M. Viggiano, V. Lattanzio, A reproducible, rapid and inexpensive Folin-Ciocalteu micro-method in determining phenolics of plant methanol extracts, Microchem. J. 91 (2009) 107–110, https://doi.org/ 10.1016/j.microc.2008.08.011.

14. A. Medina-Rem´on, A. Barrionuevo-Gonz´alez, R. Zamora-Ros, C. Andres-Lacueva, R. Estruch, M.´A. Martínez-Gonz´alez, J. Diez-Espino, R.M. Lamuela-Raventos, Rapid Folin-Ciocalteu method using microtiter 96-well plate cartridges for solid phase extraction to assess urinary total phenolic compounds, as a biomarker of total polyphenols intake, Anal. Chim. Acta 634 (2009) 54–60, https://doi.org/10.1016/ j.aca.2008.12.012.

15. J.D. Everette, Q.M. Bryant, A.M. Green, Y.A. Abbey, G.W. Wangila, R.B. Walker, Thorough study of reactivity of various compound classes toward the FolinCiocalteu reagent, J. Agric. Food Chem. 58 (2010) 8139–8144, https://doi.org/ 10.1021/jf1005935.

16. L.M. Magalh˜aes, F. Santos, M.A. Segundo, S. Reis, J.L.F.C. Lima, Rapid microplate high-throughput methodology for assessment of Folin-Ciocalteu reducing capacity, Talanta 83 (2010) 441–447, https://doi.org/10.1016/j.talanta.2010.09.042.

17. A. Vallverdú-Queralt, A. Medina-Rem´on, M. Martínez-Hu´elamo, O. J´auregui, C. Andres-Lacueva, R.M. Lamuela-Raventos, Phenolic profile and hydrophilic antioxidant capacity as chemotaxonomic markers of tomato varieties, J. Agric. Food Chem. 59 (2011) 3994–4001, https://doi.org/10.1021/jf104400g.

18. E. Attard, A rapid microtitre plate Folin-Ciocalteu method for the assessment of polyphenols, Cent. Eur. J. Biol. 8 (2013) 48–53, https://doi.org/10.2478/s11535012-0107-3.

19. A. Blainski, G.C. Lopes, J.C.P. De Mello, Application and analysis of the folin ciocalteu method for the determination of the total phenolic content from limonium brasiliense L, Molecules 18 (2013) 6852–6865, https://doi.org/ 10.3390/molecules18066852.

20. M.R. Rover, R.C. Brown, Quantification of total phenols in bio-oil using the FolinCiocalteu method, J. Anal. Appl. Pyrolysis 104 (2013) 366–371, https://doi.org/ 10.1016/j.jaap.2013.06.011.

21. M.J. Jara-Palacios, D. Hernanz, S. Gonz´alez-Manzano, C. Santos-Buelga, M. L. Escudero-Gilete, F.J. Heredia, Detailed phenolic composition of white grape byproducts by RRLC/MS and measurement of the antioxidant activity, Talanta 125 (2014) 51–57, https://doi.org/10.1016/j.talanta.2014.02.065.

22. G. Bobo-García, G. Davidov-Pardo, C. Arroqui, P. Vírseda, M.R. Marín-Arroyo, M. Navarro, Intra-laboratory validation of microplate methods for total phenolic content and antioxidant activity on polyphenolic extracts, and comparison with conventional spectrophotometric methods, J. Sci. Food Agric. 95 (2015) 204–209, https://doi.org/10.1002/jsfa.6706.

23. T. Margraf, A.R. Karnopp, N.D. Rosso, D. Granato, Comparison between folinciocalteu and Prussian blue assays to estimate the total phenolic content of Juices and teas using 96-well microplates, J. Food Sci. 80 (2015) C2397–C2403, https:// doi.org/10.1111/1750-3841.13077.

24. J.O. Moreno-Escamilla, L.A. de la Rosa, J.A. L´opez-Díaz, J. Rodrigo-García, J. A. Nú˜nez-Gast´elum, E. Alvarez-Parrilla, Effect of the smoking process and firewood type in the phytochemical content and antioxidant capacity of red Jalape˜no pepper F. Raposo et al. Talanta 272 (2024) 125771 10 during its transformation to chipotle pepper, Food Res. Int. 76 (2015) 654–660, https://doi.org/10.1016/j.foodres.2015.07.031.

25. C.V. V´azquez, M.G.V. Rojas, C.A. Ramírez, J.L. Ch´avez-Servín, T. García-Gasca, R. A. Ferriz Martínez, O.P. García, J.L. Rosado, C.M. L´opez-Sabater, A.I. Castellote, H. M.A. Montemayor, K. De La Torre Carbot, Total phenolic compounds in milk from different species. Design of an extraction technique for quantification using the Folin-Ciocalteu method, Food Chem. 176 (2015) 480–486, https://doi.org/ 10.1016/j.foodchem.2014.12.050.

26. K.P. Bastola, Y.N. Guragain, V. Bhadriraju, P.V. Vadlani, Evaluation of standards and interfering compounds in the determination of phenolics by folin-ciocalteu assay method for effective Bioprocessing of Biomass, Am. J. Anal. Chem. 8 (2017) 416–431, https://doi.org/10.4236/ajac.2017.86032.

27. Mashuni, N.A. Yanti, M. Jahiding, M. Edihar, Validation of UV-vis spectrophotometric method for determination of bio oil total phenolic content from Pyrolisis of Cashew Nut Shell, Res. J. Pharm. Biol. Chem. Sci. 8 (2017) 1745–1752.

28. M. Musci, S. Yao, Optimization and validation of Folin–Ciocalteu method for the determination of total polyphenol content of Pu-erh tea, Int. J. Food Sci. Nutr. 68 (2017) 913–918, https://doi.org/10.1080/09637486.2017.1311844.

29. M.A.M. Galv˜ao, A.O. de Arruda, I.C.F. Bezerra, M.R.A. Ferreira, L.A.L. Soares, Evaluation of the folin-ciocalteu method and quantification of total tannins in Stem Barks and Pods from Libidibia ferrea (Mart. Ex Tul) L. P. Queiroz, Brazilian Arch. Biol. Technol. 61 (2018) 1–20, https://doi.org/10.1590/1678-4324-2018170586.

30. S. Kupina, C. Fields, M.C. Roman, S.L. Brunelle, Determination of total phenolic content using the Folin-C assay: single-laboratory validation, first action 2017.13, J. AOAC Int. 102 (2018) 320–321, https://doi.org/10.5740/jaoacint.2017.13.

31. R. L´opez-Froil´an, B. Hern´andez-Ledesma, M. C´amara, M.L. P´erez-Rodríguez, Evaluation of the antioxidant potential of mixed fruit-based Beverages: a new Insight on the folin-ciocalteu method, Food Anal. Methods 11 (2018) 2897–2906, https://doi.org/10.1007/s12161-018-1259-1.

32. G.A. Pereira, H.S. Arruda, G.M. Pastore, Modification and validation of FolinCiocalteu assay for faster and safer analysis of total phenolic content in food samples, Brazilian J. Food Res. 9 (2018) 125, https://doi.org/10.3895/rebrapa. v9n1.6062.

33. B. Poniedziałek, P. Rzymski, M. Pięt, M. Gąsecka, A. Stroi´nska, P. Niedzielski, M. Mleczek, P. Rzymski, M. Wilczak, Relation between polyphenols, malondialdehyde, antioxidant capacity, lactate dehydrogenase and toxic elements in human colostrum milk, Chemosphere 191 (2018) 548–554, https://doi.org/ 10.1016/j.chemosphere.2017.10.098.

34. S. Aryal, M.K. Baniya, K. Danekhu, P. Kunwar, R. Gurung, N. Koirala, Total Phenolic content, Flavonoid content and antioxidant potential of wild vegetables from western Nepal, Plants 8 (2019), https://doi.org/10.3390/plants8040096.

35. M.R. Gao, Q. Da Xu, Q. He, Q. Sun, W.C. Zeng, A theoretical and experimental study: the influence of different standards on the determination of total phenol content in the Folin–Ciocalteu assay, J. Food Meas. Charact. 13 (2019) 1349–1356, https://doi.org/10.1007/s11694-019-00050-6.

36. N. Hudz, O. Yezerska, M. Shanaida, V.H. Sedl´aˇckov´a, P.P. Wieczorek, Application of the Folin-Ciocalteu method to the evaluation of Salvia sclarea extracts, Pharmacia 66 (2019) 209–215, https://doi.org/10.3897/pharmacia.66.e38976.

37. S. Ma, C. Kim, A.P. Neilson, L.E. Griffin, G.M. Peck, S.F. O’Keefe, A.C. Stewart, Comparison of common analytical methods for the quantification of total polyphenols and Flavanols in fruit Juices and Ciders, J. Food Sci. 84 (2019) 2147–2158, https://doi.org/10.1111/1750-3841.14713.

38. Y. Martono, F.F. Yanuarsih, N.R. Aminu, J. Muninggar, Fractionation and determination of phenolic and flavonoid compound from Moringa oleifera leaves, J. Phys. Conf. Ser. 1307 (2019), https://doi.org/10.1088/1742-6596/1307/1/ 012014.

39. G. Parmar, K. Pundarikakshudu, Determination and validation assay for total phenolic content in two Euphorbiaceous plants by folin ciocalteu method, Int. J. Pharm. Res. 12 (2020) 608–612, https://doi.org/10.31838/ijpr/2020.SP1.101.

40. J. Pico, R.Y. Pismag, M. Laudouze, M.M. Martinez, Systematic evaluation of the Folin-Ciocalteu and Fast Blue BB reactions during the analysis of total phenolics in legumes, nuts and plant seeds, Food Funct. 11 (2020) 9868–9880, https://doi.org/ 10.1039/d0fo01857k.

41. F. Tatzber, W. Wonisch, S. Lackner, M. Lindschinger, W. Pursch, U. Resch, C. Trummer, M. Murkovic, S. Zelzer, S. Holasek, G. Cvirn, A micromethod for polyphenol high-throughput screening saves 90 percent reagents and sample volume, Antioxidants 9 (2020), https://doi.org/10.3390/antiox9010011.

42. J.C. Carmona-Hernandez, G. Taborda-Ocampo, C.H. Gonz´alez-Correa, FolinCiocalteu reaction alternatives for higher polyphenol quantitation in Colombian passion fruits, Int. J. Food Sci. 2021 (2021), https://doi.org/10.1155/2021/ 8871301.

43. P. Luaces, M. Pascual, A.G. P´erez, C. Sanz, An easy-to-use procedure for the measurement of total phenolic compounds in olive fruit, Antioxidants 10 (2021), https://doi.org/10.3390/antiox10111656.

44. G.R. Martins, A.F. Monteiro, F.R.L. do Amaral, A.S. da Silva, A validated FolinCiocalteu method for total phenolics quantification of condensed tannin-rich açaí (Euterpe oleracea Mart.) seeds extract, J. Food Sci. Technol. 58 (2021) 4693–4702, https://doi.org/10.1007/s13197-020-04959-5.

45. M. Platzer, S. Kiese, T. Herfellner, U. Schweiggert-Weisz, P. Eisner, How does the phenol structure influence the results of the folin-ciocalteu assay? Antioxidants 10 (2021) 1–13, https://doi.org/10.3390/antiox10050811.

46. J. George, D. Edwards, S. Pun, D. Williams, Evaluation of antioxidant capacity (ABTS and CUPRAC) and total phenolic content (Folin-Ciocalteu) assays of selected fruit, vegetables, and Spices, Int. J. Food Sci. 2022 (2022), https://doi.org/ 10.1155/2022/2581470.

47. J.B. Johnson, J.S. Mani, M. Naiker, Development and validation of a 96-well microplate assay for the measurement of total phenolic content in Ginger extracts, Food Anal. Methods 15 (2022) 413–420, https://doi.org/10.1007/s12161-02102127-9.

48. D.A. Klari´c, A. Mornar, J. Kovaˇci´c, M.L. Jeliˇci´c, E. Brusaˇc, I. Brleti´c, I. Klari´c, Polyphenol content and antioxidant activity of phytoestrogen containing food and dietary supplements: DPPH free radical scavenging activity by HPLC, Acta Pharm. 72 (2022) 375–388, https://doi.org/10.2478/acph-2022-0031.

49. H.S. Pandhyta Kuntari, Method validation and estimation of measurement Uncertainty in the determination of total polyphenols content in Land Spinach by UV-vis Spectrophotometry, J. Akad. Kim. 11 (2022) 176–182. https://jurnal.fkip. untad.ac.id/index.php/jak/article/view/2273.

50. B.N. Lucas, F.M. Dalla Nora, C.P. Boeira, S. Verruck, C.S. Da Rosa, Determination of total phenolic compounds in plant extracts via Folin-Ciocalteu’s method adapted to the usage of digital images, Food Sci. Technol. 42 (2022) 1–6, https://doi.org/ 10.1590/fst.35122.

51. D. Michiu, M.I. Socaciu, M. Fogarasi, A.M. Jimborean, F. Ranga, V. Mures¸an, C. A. Semeniuc, Implementation of an analytical method for spectrophotometric evaluation of total phenolic content in essential oils, Molecules 27 (2022), https:// doi.org/10.3390/molecules27041345.

52. L. Rickards, A. Lynn, M.E. Barker, M. Russell, M.K. Ranchordas, Comparison of the polyphenol content and in vitro antioxidant capacity of fruit-based nutritional supplements commonly consumed by athletic and recreationally active populations, J. Int. Soc. Sports Nutr. 19 (2022) 336–348, https://doi.org/10.1080/ 15502783.2022.2091412.

53. M. Samara, A. Nasser, U. Mingelgrin, Critical Examination of the suitability of the folin-ciocalteu reagent assay for quantitative analysis of polyphenols—the case of olive-Mill Wastewater, Am. J. Anal. Chem. 13 (2022) 476–493, https://doi.org/ 10.4236/ajac.2022.1311032.

54. I.L. Lawag, E.S. Nolden, A.A.M. Schaper, L.Y. Lim, C. Locher, A modified folinciocalteu assay for the determination of total phenolics content in honey, Appl. Sci. 13 (2023), https://doi.org/10.3390/app13042135.

55. N.B. Rizvi, A. Fatima, R. Busquets, M.R. Khan, S. Ashraf, M.S. Khan, F. Oz, Effect of the media in the folin-ciocalteu assay for the analysis of the total phenolic content of olive products, Food Anal. Methods (2023), https://doi.org/10.1007/s12161023-02527-z.

56. K.R.P. Sari, Z. Ikawati, R. Danarti, T. Hertiani, Micro-titer plate assay for measurement of total phenolic and total flavonoid contents in medicinal plant extracts, Arab. J. Chem. 16 (2023), https://doi.org/10.1016/j. arabjc.2023.105003.

57. F. Raposo, Evaluation of analytical calibration based on least-squares linear regression for instrumental techniques: a tutorial review, TrAC - Trends Anal. Chem. 77 (2016) 167–185, https://doi.org/10.1016/j.trac.2015.12.006.

58. F. Raposo, C. Ibelli-Bianco, Performance parameters for analytical method validation: Controversies and discrepancies among numerous guidelines, TrAC - Trends Anal. Chem. 129 (2020), https://doi.org/10.1016/j.trac.2020.115913.

59. Brazilian Sanitary Surveillance Agency (ANVISA), Resolution - RE N. 899, of May 29, 2003. Guide for Validation of Analytical and Bioanalytical Methods, Official Diary of the Union, 2003.

60. Association of Analytical Communities (AOAC), AOAC guidelines for single laboratory validation of chemical methods for dietary supplements and Botanicals. https://doi.org/10.1063/1.4915424, 2002.

61. B. Magnusson, U. ¨Ornemark (Eds.), Eurachem Guide. The Fitness for Purpose of Analytical Methods: A Laboratory Guide to Method Validation and Related Topics, second ed., 2014, https://doi.org/10.1016/S0014-2999(99)00500-2.

62. International Conference on Harmonisation (ICH) of technical requirements for registration of pharmaceuticals for human use. ICH harmonised tripartite guideline. Validation of analytical procedures: Text and Methodology Q2(R1). https://doi.org/10.1590/S1984-82502011000100012, 2005.

63. International Organization for Standardization (ISO), ISO 5725. Accuracy (Trueness and Precision) of Measurement Methods and Results-Part 2: Basic Method for the Determination of Repeatability and Reproducibility of a Standard Measurement Method, 1994, pp. 1–41.

64. U.S. Food and Drug Administration/Foods and Veterinary Medicine (FDA/FVM), Guidelines for the Validation of Chemical Methods for the FDA Foods Program, third ed., 2019.

65. J.C. S´anchez-Rangel, J. Benavides, J.B. Heredia, L. Cisneros-Ceballos, D.A. JacoboVelazquez, The Folin-Ciocalteu assay revisited: improvements of its specificity for total phenolic content determination, Anal. Methods5 (2013) 5990–5999, https:// doi.org/10.1039/c3ay4125g.

66. J.M. Jurado, A. Alc´azar, R. Mu˜niz-Valencia, S.G. Ceballos-Maga˜na, F. Raposo, Some practical considerations for linearity assessment of calibration curves as function of concentration levels according to the fitness-for-purpose approach, Talanta 172 (2017) 221–229, https://doi.org/10.1016/j.talanta.2017.05.049.

67. W.J. Youden, E.H. Steiner, Statistical Manual of the Association of Official Analytical Chemists, 1975. F. Raposo et al.

## 訳者補足

- **本レビューが突く問題**: Folin-Ciocalteu法は「総ポリフェノール量（TPC）」を測る定番の比色法で、生薬エキス・食品・お茶の品質指標として論文に山ほど出てくる。しかし本レビューの警告は「**これほど普及しているのに標準化されていない**」——試料量・試薬濃度・塩基・添加順序・波長・温度・反応時間・標準品という15の条件が研究ごとにバラバラで、**別々の論文のTPC値を比べても意味がない**、というもの。「〇〇のポリフェノールは△△ mg/g」という数字を鵜呑みにする前に、どの条件で測ったかを確認せよという教訓。

- **「TPCではなく還元能を測っている」**: FC試薬は元々チロシン・トリプトファン（アミノ酸）を測るために作られたもので、ポリフェノールに特異的ではない。糖（フルクトース・グルコース）・アスコルビン酸（ビタミンC）・タンパク質・還元性多糖など、還元性を持つ物質なら何でも反応してしまう。つまりFC法が測っているのは厳密には「総ポリフェノール量」ではなく「試料の還元能（reducing capacity）」。生薬・蜂蜜など糖の多いマトリックスでは過大評価に注意（本レビューは蜂蜜で還元糖の干渉例を挙げる）。

- **標準品の落とし穴**: TPC値は「没食子酸（GA）換算 mg/g」などと表現されるが、ポリフェノールの種類ごとに吸光度が違うので、GA換算値は本当の濃度を反映しない。本レビューは「試料中で最も多い成分を標準品に選ぶべき」と提言。生薬なら、その生薬の主要ポリフェノール（例: 黄芩ならバイカリン、丹参ならサルビアノール酸）を標準にする方が実態に近い。

- **実務的な推奨条件（著者の見解）**: 室温・反応30〜60分・765 nm付近・Na2CO3を総量中約3%・FCR先添（アルカリは後）・マイクロプレート化・そして必ず実試料（native sample）でバリデーション。これらを守れば少なくとも自分の研究内での再現性は確保できる。

- **生薬QCとの関わり**: 漢方・生薬エキスの品質評価で「総ポリフェノール量」を指標にする場合、本レビューの15因子を固定し・実試料でバリデーションしないと、バッチ間比較や他施設との比較が成り立たない。本サイトのイチジク・鵝不食草論文などポリフェノールを扱う研究の背景知識として重要。

- 表1（50論文の実験条件一覧）・表2/3（16論文のバリデーション性能）の詳細数値は原文を参照。
