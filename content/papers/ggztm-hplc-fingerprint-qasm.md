---
title: HPLC化学指紋＋QASM(一マーカー多成分定量)による葛根止痛合剤(GGZTM)の品質評価
slug: ggztm-hplc-fingerprint-qasm
source_pdf: Separation_Science_Plus_2024_Xin_Gegen_Zhitong_Mixture.pdf
drive_file_id: 12FnCfsks2pqHbE6M-OhJ40TTN-dL5KHn
drive_url: https://drive.google.com/file/d/12FnCfsks2pqHbE6M-OhJ40TTN-dL5KHn/view
doi: https://doi.org/10.1002/sscp.202400184
level: practitioner
date: 2026-07-01
published: 2025
tags: [生薬, QC・品質評価, 指紋分析, 多成分定量, QAMS, HPLC・UPLC]
digest_tagline: HPLC化学指紋(14共通ピーク)とQASMを初めて組み合わせ、葛根止痛合剤(GGZTM)を単一指標から総合的品質評価へ
digest_stats: [IF|約1.6（2024集計・後述）, 定量法|HPLC指紋＋QASM, 共通ピーク|14, 定量3成分|プエラリン／ペオニフロリン／フェルラ酸, 試料|市販3＋自家製10＝13]
digest_points: [HPLC指紋で14共通ピークを確認し R1／R2／R3 をプエラリン・ペオニフロリン・フェルラ酸と同定（UPLC-QTOF-MS併用）, QASMはプエラリンを内部標準に3成分を同時定量し外標準法(ESM)と有意差なし（p>0.5）でコスト削減, 市販3＋自家製10バッチの指紋類似度は0.996〜1・相関>0.962 含量はプエラリン>ペオニフロリン>フェルラ酸]
summary: 武漢市第一医院が開発した12種生薬からなる漢方製剤「葛根止痛合剤(GGZTM)」について、従来のプエラリン単一指標に代えて、HPLC化学指紋(14共通ピーク)とQASM(一マーカー多成分定量)を初めて組み合わせ、プエラリン・ペオニフロリン・フェルラ酸の3成分同時定量と市販／自家製バッチの類似度・クラスター比較で総合的な品質評価法を構築した研究の全訳（＋訳者補足）。
---

<!-- 方針: ほぼ全訳＋必要に応じた補足。原文構成に沿って訳出。「> 補足:」は訳者注。数値・条件は原文どおり。詳細数表(Table S1〜S12)・補足図(Figure S1〜S3)は補足資料にあり本文には無いため「原文参照」とする。 -->

## 書誌情報

- 原題: Quality Assessment of Gegen Zhitong Mixture Based on Chemical Fingerprints Combined with Quantitative Analysis of Multi-Components with a Single-Marker
- 著者: Hu Xin, Hu Zhiqiang, Cheng Lu, Xu Hongfeng（武漢市第一医院 薬学部 製剤センター／湖北中医薬大学 薬学部, 中国・武漢）
- 掲載: *Separation Science Plus* 2025; 8(1): e202400184（Wiley-VCH）. 受理 2024-11-30. https://doi.org/10.1002/sscp.202400184
- インパクトファクター: **約1.6**（*Separation Science Plus*, Resurchify 等の第三者集計 2024 値）。**Clarivate JCR の公式IFは本稿では未確認**（捏造を避け「要確認」とする）。
- キーワード: クロマトグラフ指紋 / HPLC / 品質評価 / QASM / 類似度

> 補足: GGZTM = 葛根止痛合剤（Gegen Zhitong mixture、武漢市第一医院の院内製剤）。CMP = 中薬製剤。QASM = 一マーカー多成分定量（quantitative analysis of multi-components with a single-marker。1つの標準品＝内部参照で複数成分を定量する手法。QAMS とも）。ESM = 外標準法。RCF = 相対補正因子。RRT/RPA = 相対保持時間／相対ピーク面積。MI = マトリックス干渉。本論文は分析法開発・バリデーション＋指紋／ケモメトリクスの研究論文。

## 要旨（Abstract）

中薬（TCM）処方は中薬における最も重要な宝物の一つである。葛根止痛合剤（GGZTM）は、武漢市第一医院がTCM処方に基づいて開発した中薬製剤（CMP）である。医療目的での安全かつ効果的な使用を確保するには、CMPの包括的な品質評価が必要である。しかし従来のGGZTMの品質評価は単一指標成分の含量測定に限定されており、その全体的な品質を完全に監視することは困難であった。そこで本研究では、高速液体クロマトグラフィー（HPLC）に基づきGGZTMの包括的な化学的プロファイルを記述する手法を初めて開発し、GGZTMの特徴的な共通ピークを同定した。第二に、一マーカー多成分定量（QASM）法を開発し、GGZTM中の3成分の含量を同時に測定するために用いた。最後に、当研究室で処方組成に従って自家製GGZTM（SMGGZTM）を調製し、化学指紋および固有の指標成分の含量に基づく類似度解析および階層的クラスター解析を通じてGGZTMと系統的に比較した。結論として、開発した方法は正確かつ安定であり、GGZTMの製造プロセスの品質管理に適用できる。

## 1. 序論（Introduction）

中薬（TCM）は、さまざまな疾患の予防・治療のため中国で何世紀にもわたって利用されてきた。近年は世界中の患者・医師から注目を集めている。西暦25〜220年に書かれた『神農本草経』は、中国の薬用植物・処方・効能・理論に関する最も古い体系的モノグラフである [1, 2]。TCM処方の大部分は2種以上の生薬で構成され、臨床で有効性が実証されてきた。現在、薬局方や規制基準におけるTCMの品質評価は、主に外観・顕微鏡検査、および特定の指標化合物の定量分析に依存する [3]。しかし個人の経験による感覚検査への依存は、定性評価に主観差を生じうる [4]。さらに単一指標化合物の測定は、多成分系に存在する多数の未知成分を無視することになり、TCMの分析・品質管理に大きな課題をもたらす [5, 6]。加えて安全性・有効性の評価データは現代の規制基準を裏付けるには不十分で、これがTCMの広範な応用を強く制限している [7, 8]。

葛根止痛合剤（GGZTM）は武漢市第一医院が研究開発したTCM製剤で、Puerariae Lobatae Radix（葛根）、Paeoniae Radix Alba（白芍）、Glycyrrhizae Radix et Rhizoma（甘草）など12種類の中薬で構成される（図1）。GGZTMは臨床で「痺証（ひしょう）」の治療に用いられる。TCMにおいて「痺証」は風・寒・湿の複合的侵襲によって生じ、閉塞をきたすものとされ [9]、この概念は古典『黄帝内経』に初めて登場する。さらに近年、160名の臨床患者を対象としたランダム化比較試験が実施され、GGZTMが神経根型頸椎症の治療に有効であることが示された [10]。ただしGGZTMは複数の生薬からなり、その治療効果は複数成分の相乗効果に基づく。例えば葛根から単離されるイソフラボンのプエラリンは心筋虚血再灌流傷害を防ぎ [11]、抗神経炎症作用を示す [12]。白芍については、ペオニフロリンが抗炎症活性 [13, 14] と肝細胞癌抑制効果 [15] を発揮することが報告されている。したがって、品質・有効性に影響する多くの要因があるため、GGZTMの品質評価を包括的に理解することが重要である。しかしこれまで製造工程でのGGZTMの品質管理法としては、HPLCによるプエラリン定量のみが唯一の方法として開発されていた。TCMの観点では、葛根と白芍はGGZTMの中核的な薬対（君薬と臣薬）であり、プエラリン [16] とペオニフロリン [17] はそれぞれの主要有効成分である。またフェルラ酸は本処方中の多くの生薬（Angelicae Sinensis Radix＝当帰、Clematidis Radix et Rhizoma＝威霊仙、Chuanxiong Rhizoma＝川芎）の有効成分である [18–20]。そこで本研究は、これら3成分のGGZTM品質管理への応用に焦点を当てる。GGZTMの品質を監視するには、実用的・効率的・包括的な品質評価システムの確立が不可欠である。

![図1. 葛根止痛合剤(GGZTM)を製造するための12種類の中薬飲片。](assets/ggztm-hplc-fingerprint-qasm/fig1-herbs.jpeg)

> 補足（生薬名対照）: Puerariae Lobatae Radix＝葛根 / Paeoniae Radix Alba＝白芍 / Glycyrrhizae Radix et Rhizoma＝甘草 / Angelicae Sinensis Radix＝当帰 / Clematidis Radix et Rhizoma＝威霊仙 / Chuanxiong Rhizoma＝川芎。puerarin＝プエラリン、paeoniflorin＝ペオニフロリン、ferulic acid＝フェルラ酸。君薬＝主薬、臣薬＝補助薬。残る生薬の詳細は原文の補足資料 Table S1 参照。

化学指紋法（ケミカルフィンガープリント）は、TCMの包括的な化学的記述を描くために設計された非標的的手法に基づく全体的品質評価技術として受け入れられている。異なるバッチのクロマトグラフプロファイルの類似性を通じて製品の比較可能性に焦点を当てる手法である [21]。現在、TCMの品質管理に用いる化学指紋法は、CFDA・（米国）FDA・欧州医薬品庁（EMA）を含め公式に認められている [22, 23]。近年、HPLCに基づく指紋同定技術は、複雑なマトリックスの全体的化学的特徴付けを達成する効率的ツールとして、TCMおよび中薬製剤（CMP）の品質管理で受け入れられている [24–27]。さらに複数成分に基づく正確な定量分析は、CMPの全体的品質評価により有益である。ただしTCMの化学標準物質の分離・供給の困難さや高価格などの要因は、実験コストを増加させる。Wangら [28] は、一マーカー多成分定量（QASM）を用いたTCMの品質評価法を提案した。この手法は安定・信頼性が高く、複数の研究で報告・確認されている [29–32]。

本研究では、最適化したHPLC分析法でGGZTMの化学指紋を構築し、14個の共通クロマトグラフィーピークを確認した。また指標成分の含量測定において、QASMと外標準法（ESM）に有意差がないことを示した。試料中の3つの主要薬効成分はUPLC-MSおよび標準物質に基づいて同定し、プエラリンを用いてGGZTM中の3成分を同時定量する可能性も検討した。最後に本法で複数のGGZTMおよび自家製GGZTM（SMGGZTM）試料を分析し、各試料の化学組成の類似性を比較した。本研究が提案する分析法はGGZTMの品質管理において高い選択性・特異性・感度を有し、その結果はGGZTMの臨床応用の基盤を提供する。

## 2. 実験（Experimental）

### 2.1 材料と試薬

GGZTM 3バッチは武漢市第一医院製剤センターより提供された。SMGGZTM用の12種類の原料生薬は湖北天済中薬飲片有限公司より提供され（図1）、詳細情報は Table S1 に示される（原文の補足資料 Table S1 参照）。すべての生薬原料は薬剤師 Hu Zhiqiang により同定・鑑定され、証拠標本は武漢市第一医院薬学部（中国・湖北省・武漢）に保管された。

標準物質は、プエラリン（バッチ番号 110752–201514）、ペオニフロリン（バッチ番号 110736–202246）、フェルラ酸（バッチ番号 110773–200611）を中国食品薬品検定研究院（北京）から入手した。クロマトグラフィーグレードのメタノールは国薬集団化学試薬有限公司（上海）から購入し、脱イオン水は ULUPURE UPT 純水製造装置（成都）で調製した。その他の有機試薬は分析グレードであった。

### 2.2 装置およびクロマトグラフィー条件

HPLC分析は島津製作所 Essentia LC-16 システムで、Elite SinoChrom ODS-BP（C18）カラム（250 × 4.6 mm, 5 µm）を用いて実施した。システムには SPD-16 UV-可視二波長検出器、SIL-16 オートサンプラー、CTO-16L 温度制御システム、LabSolution データワークステーションを備える。流速 1.0 mL/min、注入量 20 µL、カラム温度 35 ℃、検出波長 270 nm。二液グラジエントは 0.2%(v/v) リン酸水溶液（A）とメタノール（B）から構成し、線形グラジエントプログラムは以下のとおり:

| ステップ | 時間(min) | B濃度(v/v) |
|---|---|---|
| I | 0–10 | 25% |
| II | 10–15 | 25%→32% |
| III | 15–25 | 32%→39% |
| IV | 25–28 | 39% |
| V | 28–33 | 39%→42% |
| VI | 33–40 | 42%→46% |
| VII | 40–46 | 46%→54% |
| VIII | 46–56 | 54%→62% |
| IX | 56–63 | 62%→95% |
| X | 63–70 | 95% |

各注入の終了時にカラムを純メタノールで15分間洗浄し、初期移動相で10分間再平衡化した。

### 2.3 標準液の調製

3つの標準物質を精密に秤量し、70%(v/v) メタノール水溶液に5分間の超音波処理で溶解させ、プエラリン 1.0220 mg/mL、ペオニフロリン 0.1141 mg/mL、フェルラ酸 0.5400 mg/mL を含む混合原液を得た。HPLC分析の前に、原液を70%メタノールで2〜32倍に希釈し、異なる濃度の実用標準液5点を調製した。

### 2.4 試料溶液の調製

SMGGZTM試料は GGZTM の処方量に従って調製した。全材料をその重量の8倍量の精製水で30分間浸漬し、1時間ずつ3回煮沸し、3抽出液を合わせて真空濃縮して1000 mLとした。GGZTMおよびSMGGZTM試料 20 mL に70%メタノールを加えて 50 mL とし、30分間超音波抽出した。その後 3000 × g で5分間遠心分離（Centrifuge 5424 R; Eppendorf, ドイツ）し、上清を 0.45 µm フィルター膜でろ過して指紋分析に供した。同一手順で、定量分析用には GGZTM・SMGGZTM 試料を70%メタノールで10倍希釈した。

### 2.5 分析物の同定（UPLC-QTOF-MS）

GGZTM試料および実用標準液中のプエラリン・ペオニフロリン・フェルラ酸の同定は、エレクトロスプレーイオン化（ESI）インターフェースを備えた四重極飛行時間型タンデム質量分析計（X500R QTOF）に接続した島津 LC-20A で行った。分離は Waters ACQUITY UPLC BEH C18（1.7 µm, 2.1 × 100 mm）で、0.1%(v/v) 酢酸水溶液（A）と 0.1%(v/v) ギ酸アセトニトリル（B）のグラジエント移動相を用いた:

| ステップ | 時間(min) | B濃度(v/v) |
|---|---|---|
| I | 0–3 | 20% |
| II | 3–6 | 20%→25% |
| III | 6–9 | 25%→40% |
| IV | 9–15 | 40%→95% |
| V | 15–18 | 95% |
| VI | 18–18.1 | 95%→20% |
| VII | 20–22 | 20% |

流速 0.2 mL/min、注入量 5 µL、カラム温度 40 ℃。MS分析は陰イオン化モード（ESI−）で、イオンスプレー電圧 −5500 V、ターボスプレー温度 550 ℃、ネブライザーガス・ヒーターガス 55 psi、カーテンガス 35 psi。QTOF/MS と QTOF/MS-MS はともに m/z 50〜1000 でスキャンし、デクラスタリングポテンシャル 80 V、蓄積時間はそれぞれ 150 ms・50 ms、衝突エネルギーはそれぞれ 10 V・30 V とした。プリカーサーイオンおよびフラグメントイオンの正確な質量・組成は Analyst TF ソフトウェア（ver. 1.6）で解析した。

### 2.6 HPLC法のバリデーション

- **特異性・精度・再現性・安定性**: 特異性は混合標準液・試料溶液・ブランク溶液（70%メタノール）のクロマトグラム比較で検証。装置精度は同一試料溶液の6回連続分析で判定。再現性は同一バッチから抽出した6つの独立試料溶液の分析で評価。安定性は調製後 0・2・4・8・12・24 時間で同一バッチ試料溶液を注入して推定。試料は GGZTM（バッチ番号 23051700）を用いた。
- **検量線**: 原液および 2.3 の実用標準液5点を含む異なる濃度の溶液で、ピーク面積を濃度に対してプロットし、最小二乗法で評価した。
- **LOD・LOQ**: 3成分を含む原液を段階希釈し、S/N比 3 および 10 に相当する濃度をそれぞれ LOD・LOQ とした。
- **回収率試験・マトリックス干渉(MI)評価**: 回収率試験は6つの独立した GGZTM 試料（バッチ番号 23051700）に標準物質を添加し、抽出前に70%メタノールで 50 mL とした。全分析成分の RSD% を算出。MI評価では、2.4 の手順で調製した GGZTM 抽出液に等体積の標準液を加えた混合マトリックス溶液を分析し、混合溶液中の各成分のUV応答シグナルの、抽出液と標準液の応答シグナル和の半値に対する割合を計算した。

### 2.7 標準指紋クロマトグラムの生成

HPLC分析の前に、2.4 に従い SMGGZTM 10バッチと GGZTM 3バッチを調製した。13バッチに基づく標準指紋クロマトグラムの生成には、専門ソフト「中薬クロマト指紋類似度評価システム（Similarity Evaluation System for Chromatographic Fingerprint of TCM）」（2012版）を用い、各バッチのHPLCクロマトグラムと標準指紋クロマトグラムの類似度を評価した。

### 2.8 一マーカー多成分定量（QASM）

QASMでは、混合原液を 2.5・5.0・10.0・15.0・20.0 µL でそれぞれHPLCに注入した（代表クロマトグラムは図2C）。プエラリン（図2C の R1）に対するペオニフロリン（R2）・フェルラ酸（R3）の相対補正因子（RCF）を、実用標準液5点の各成分のピーク面積と濃度から算出した。GGZTM試料中のペオニフロリン・フェルラ酸の含量は RCF を介して間接的に計算した。あわせて各試料の3化合物の含量を ESM（外標準法）でも計算し、2法の結果に有意差があるかを t検定で評価した。

### 2.9 統計解析

相関分析マップは R ソフト（ver. 4.2.1）の corrplot・ggplot2 パッケージで描画し、ピアソン相関係数を各試料の共通ピーク面積から計算した。t検定は GraphPad Prism（ver. 8.0.2）で計算し、p < 0.05 を統計的に有意とした。階層的クラスター解析は TBtools（ver. 2.026）で実施した。

## 3. 結果と考察（Results and Discussion）

### 3.1 クロマトグラフィー条件の最適化

カラム温度（30・35・40 ℃）のピーク分離への影響を調べた。各温度でのクロマトグラムは非常に類似したが、35 ℃で全体の分離度がより良好であったため 35 ℃ を採用した。同様に検出波長（230・250・270 nm）を検討し、270 nm でピーク数が多く各ピーク高が比較的調和していたため 270 nm を選択した。最適化条件下での混合標準物質・GGZTM抽出液・SMGGZTM・ブランク溶液のHPLCクロマトグラムを図2に示す。

![図2. 最適化条件下での、混合標準物質(A)・GGZTM試料抽出液(B)・自家製GGZTM(SMGGZTM)試料(C)・ブランク溶液(D)の代表的HPLCクロマトグラムの比較。R1・R2・R3 はそれぞれプエラリン・ペオニフロリン・フェルラ酸の標準化合物。](assets/ggztm-hplc-fingerprint-qasm/fig2-hplc-chromatograms.png)

### 3.2 方法のバリデーション

#### 3.2.1 定性分析

プエラリン・ペオニフロリン・フェルラ酸は GGZTM の品質管理成分となる3つの分析対象である。GGZTM中の存在を確認するため、混合標準物質および GGZTM 試料の QTOF-MS・QTOF-MS/MS スペクトルを取得して同定した（関連結果は Table S2・Figures S1–S3。原文の補足資料参照）。プエラリンと GGZTM 試料の両QTOF-MSスペクトル（保持時間 RT = 1.742 分）で m/z 415.1 の [M−H]⁻ が観測され、MS/MSスペクトルも極めて類似し、ともに m/z 325・295・267 にフラグメントイオンを有した（原文の補足資料 Figure S1 参照）。よって GGZTM 中の成分（RT = 1.742 分）をプエラリンと同定した。分析成分（RT = 2.668 分）は m/z 479.1 にプリカーサーイオン、m/z 525.1 に [M+HCOOH−H]⁻ を示し、MS/MSスペクトルがペオニフロリンと一致したため、この化合物をペオニフロリンと同定した（原文の補足資料 Figure S2 参照）。同様に RT・MS/MS の比較により化合物（RT = 3.841 分）をフェルラ酸と同定した（原文の補足資料 Figure S3 参照）。

#### 3.2.2 特異性・精度・再現性・安定性

共通ピークの相対保持時間（RRT）・相対ピーク面積（RPA）の RSD が、精度・再現性・安定性を特徴づける重要パラメータである。特異性評価にはブランク試料のクロマトグラフ挙動を用い、RT = 20.04 分のピーク R1（プエラリン）を参照ピークとした（図2A）。精度・再現性・安定性の結果はそれぞれ Table S3〜S5 にある（原文の補足資料参照）。

- **精度**: 6試料の14共通ピークの RRT・RPA の RSD は、それぞれ **0.06%未満・0.83%未満**（Table S3）。
- **再現性**: RRT・RPA の RSD はそれぞれ **0.05%未満・3.71%未満**（Table S4）。
- **安定性**: RRT・RPA の RSD はそれぞれ **0.08%未満・3.88%未満**（Table S5）。

これらより、最適化法は精密・正確・安定で、指紋構築と特徴成分の含量測定に適することが示された。ブランク試料のクロマトグラム（図2D）では、全共通ピークに対応する時間帯に妨害ピークが現れず、良好な特異性が示された。

#### 3.2.3 直線性・LOD・LOQ

検量線は一連の濃度の標準液を分析してプロットした。回帰式は y = ax + b の形式で、x・y はそれぞれ標準液濃度・対応ピーク面積である。プエラリン・ペオニフロリン・フェルラ酸は、それぞれ **31.93–1021.85・3.57–114.11・16.87–540 µg/mL** の範囲で、相関係数 **0.9994 以上**の良好な線形回帰を示した（Table S6）。3成分の LOD・LOQ はそれぞれ **12.06–14.55 ng/mL・40.19–105.02 ng/mL** の範囲であった（Table S6）。以上より本法は GGZTM 中3化合物の同時定量に対し正確かつ高感度である。

#### 3.2.4 回収率試験・MI評価

3対象成分の平均回収率は **101.13%〜110.05%**、RSD は **1.0%未満**であった（Table S7）。3成分の平均マトリックス干渉（MI）値は **102.11%〜106.12%**（Table S8）で、GGZTM試料の複雑な中薬マトリックスが3化合物の含量検出にほとんど干渉しないことが示された。

### 3.3 共通ピークの同定と類似度解析

GGZTM 3バッチと SMGGZTM 10バッチのHPLC指紋を適合させ、「中薬クロマト指紋類似度評価システム」で標準指紋クロマトグラム R を生成し、**14個の共通ピーク**を見出した（図3）。うち3ピーク（R1・R2・R3）は、確立したHPLC法で RT を標準物質と比較し、それぞれプエラリン・ペオニフロリン・フェルラ酸と同定した（図3）。

![図3. GGZTM および自家製GGZTM(SMGGZTM)試料で構築したHPLC指紋図譜。R は14共通ピーク(ピーク1〜11 と R1〜R3)を含む標準指紋クロマトグラム。](assets/ggztm-hplc-fingerprint-qasm/fig3-fingerprint.png)

これら14共存ピークの RRT・RPA を取得した（結果は Table S9）。RRT の RSD は **0.2%未満**、RPA の RSD は **4.76%〜61.24%**であった。各バッチで共通ピークの RT は一貫していたが、成分含量には差があった。13試料の指紋の類似度解析（Table S10）では類似度 **0.996〜1**。あわせて R ソフト（corrplot・ggplot2）で相関分析マップを描き（図4）、14共存ピーク面積からピアソン相関係数を算出した。図4左下の数値が相関係数、右上の円グラフがその図示（青＝正相関、赤＝負相関）。研究試料間の相関係数はすべて **0.962 を超え**、HPLC指紋の類似度法が製造における GGZTM の品質管理指標として使えることが示された。

![図4. GGZTM および自家製GGZTM(SMGGZTM)試料の相関ヒートマップ。ピアソン相関係数は各試料の14共通ピーク面積に基づく。相関の高低を色(低=赤〜高=青)で表示。](assets/ggztm-hplc-fingerprint-qasm/fig4-correlation-heatmap.png)

### 3.4 QASMによる定量測定と解析

最適化HPLC法を13種の試料の3成分同時定量に適用した。HPLCプロファイル中の化合物はオンラインUVスペクトルと RT を標準物質と比較して同定した（クロマトグラムは図2、13試料の3化合物含量は図5）。各分析成分の含量は試料ごとに変動し、**プエラリンが全試料で最も高く、次いでペオニフロリン、フェルラ酸が最も低かった**。GGZTM 3バッチのうち **GGZTM-23051700** が3標準物質すべての含量で最も高かった。これは各バッチの生薬原料の産地・生育年数・栽培法の違いに起因しうる。含量変化は臨床的有効性・安全性の変化につながるため、栽培・製造・試験を含む全工程を標準化することが望ましい。

![図5. HPLCで検出した、GGZTM および自家製GGZTM(SMGGZTM)試料中のプエラリン・ペオニフロリン・フェルラ酸の含量。](assets/ggztm-hplc-fingerprint-qasm/fig5-contents.png)

QASMは1成分を内部参照として複数指標成分を同時測定できる。本研究ではプエラリンを内部参照化合物とし、5段階の注入量の原液からペオニフロリン・フェルラ酸の RCF を算出した（Table S11）。13試料の3化合物の検出結果を比較すると（Table S12）、**ESM（外標準法）と QASM に有意差はなかった（p > 0.5）**。よってプエラリンを基準成分として複数化合物の含量を測定することは実行可能で、本法は実験コストを削減し分析効率も向上させた。

### 3.5 階層的クラスター解析

13試料（GGZTM・SMGGZTM）のクラスター解析を図6に示す。14共通ピーク面積の log2 で構築し、変換後のピーク面積は **14〜28** に分布した。成分含量の観点では、GGZTM-22080300 と GGZTM-22100800 が、他より SMGGZTM01・SMGGZTM09・SMGGZTM10 と高い類似性を示した。SMGGZTM08 は共通成分のピーク面積が他より大きく、別枝に分離した。この差は生薬原料の品質のばらつきに起因する可能性が高い。これらの結果は、CMPの製造工程でバッチ間の品質差を最小化するため、各生薬原料の供給元の安定性を確保することの重要性を一層強調する。

![図6. GGZTM および自家製GGZTM(SMGGZTM)試料の階層的クラスターヒートマップ。14共通ピーク面積の log2 で構築(値域14〜28)。面積の高低を色(低=白〜高=青または赤)で表示。](assets/ggztm-hplc-fingerprint-qasm/fig6-hca-heatmap.png)

## 4. 結論（Conclusion）

本研究では、HPLC指紋と QASM を組み合わせた、GGZTM の類似度評価・品質評価のための2段階アプローチを確立した。最適化HPLC法は良好な安定性・精度・再現性を示し、GGZTMの指紋図譜構築に用いた。14共存指紋ピークが GGZTM の化学組成情報を正確に特徴づけ、類似度評価の重要な基盤となることが示された。さらに3主要成分を同時測定できる QASM 法は信頼できることが証明され、検出の正確性を確保しつつ効率も向上させた。総じて本研究は GGZTM の製造工程の品質管理に強固な基盤を築き、医薬品使用の安全に資する。

## 訳者補足（実務的示唆）

> 以下は原文の主張ではなく、実務者向けの整理（訳者注）。

- **単一指標→総合評価への移行例**: 従来「プエラリン1成分のHPLC定量」だけだった院内製剤の規格を、①14共通ピークの指紋（プロファイル一致性の担保）と②QASMによる3成分同時定量、の二本立てに拡張した実例。院内製剤・自家製剤の品質規格を高度化する際の設計テンプレートとして参照しやすい。
- **QASM(QAMS)の利点**: 高価・入手困難な標準品を減らせるのが実務上の要点。プエラリン1点を内部参照にペオニフロリン・フェルラ酸を RCF 換算で定量し、外標準法と有意差なし（p>0.5）を確認しているため、日常試験のコスト・工数削減の裏付けになる。ただし RCF はカラム・装置間で変動しうるため、装置移管時は RCF の再検証が望ましい（原文は単一条件での検証）。
- **数値の所在**: 検量線の回帰式・RCF実測値・各バッチの実含量(mg/mL 等)・類似度／相関の個票は本文になく補足資料（Table S1〜S12・Figure S1〜S3）にある。規格化の根拠数値が要る場合は原文の Supporting Information を参照のこと。
- **IFの扱い**: 掲載誌 *Separation Science Plus* の IF は第三者集計で約1.6（2024）。Clarivate JCR の公式収載・公式IFは本稿では未確認。引用時は一次情報での確認を推奨。

## 参考文献

> 原論文の参考文献。番号は本文の引用 [N] に対応（クリックで該当文献へジャンプ）。各文献はDOIまたはGoogle Scholar検索へのリンク。

1. D. X. Kong, X. J. Li, and H. Y. Zhang, “Where Is the Hope for Drug Discovery? Let History Tell the Future,” Drug Discovery Today 14 (2009): 115–119 — [Google Scholarで探す](https://scholar.google.com/scholar?q=D.%20X.%20Kong%2C%20X.%20J.%20Li%2C%20and%20H.%20Y.%20Zhang%2C%20%E2%80%9CWhere%20Is%20the%20Hope%20for%20Drug%20Discovery%3F%20Let%20History%20Tell%20the%20Future%2C%E2%80%9D%20Drug%20Discovery%20Today%2014%20%282009%29%3A%20115%E2%80%93119)
2. Y. Li, Y. Shen, C. L. Yao, and D. A. Guo, “Quality Assessment of Herbal Medicines Based on Chemical Fingerprints Combined With Chemometrics Approach: A Review,” Journal of Pharmaceutical and Biomedical Analysis 185 (2020): 113215 — [Google Scholarで探す](https://scholar.google.com/scholar?q=Y.%20Li%2C%20Y.%20Shen%2C%20C.%20L.%20Yao%2C%20and%20D.%20A.%20Guo%2C%20%E2%80%9CQuality%20Assessment%20of%20Herbal%20Medicines%20Based%20on%20Chemical%20Fingerprints%20Combined%20With%20Chemometrics%20Approach%3A%20A%20Review%2C%E2%80%9D%20Journal%20of%20Pharmaceutical%20and%20Biomedical%20Analysis%20185%20%282020%29%3A%20113215)
3. K. Liu, J. W. Zhang, X. G. Liu, et al., “Correlation Between Macroscopic Characteristics and Tissue-specific Chemical Profiling of the Root of Salvia Miltiorrhiza,” Phytomedicine 51 (2018): 104–111 — [Google Scholarで探す](https://scholar.google.com/scholar?q=K.%20Liu%2C%20J.%20W.%20Zhang%2C%20X.%20G.%20Liu%2C%20et%20al.%2C%20%E2%80%9CCorrelation%20Between%20Macroscopic%20Characteristics%20and%20Tissue-specific%20Chemical%20Profiling%20of%20the%20Root%20of%20Salvia%20Miltiorrhiza%2C%E2%80%9D%20Phytomedicine%2051%20%282018%29%3A%20104%E2%80%93111)
4. C. Tistaert, B. Dejaegher, and H. Y. Vander, “Chromatographic Separa- tion Techniques and Data Handling Methods for Herbal Fingerprints: A Review,” Analytica Chimica Acta 690 (2011): 148–161 — [Google Scholarで探す](https://scholar.google.com/scholar?q=C.%20Tistaert%2C%20B.%20Dejaegher%2C%20and%20H.%20Y.%20Vander%2C%20%E2%80%9CChromatographic%20Separa-%20tion%20Techniques%20and%20Data%20Handling%20Methods%20for%20Herbal%20Fingerprints%3A%20A%20Review%2C%E2%80%9D%20Analytica%20Chimica%20Acta%20690%20%282011%29%3A%20148%E2%80%93161)
5. Y. Huang, Z. Wu, R. Su, G. Ruan, F. Du, and G. Li, “Current Application of Chemometrics in Traditional Chinese Herbal Medicine Research,” Journal of Chromatography. B, Analytical Technologies in the Biomedical and Life Sciences 1026 (2016): 27–35 — [Google Scholarで探す](https://scholar.google.com/scholar?q=Y.%20Huang%2C%20Z.%20Wu%2C%20R.%20Su%2C%20G.%20Ruan%2C%20F.%20Du%2C%20and%20G.%20Li%2C%20%E2%80%9CCurrent%20Application%20of%20Chemometrics%20in%20Traditional%20Chinese%20Herbal%20Medicine%20Research%2C%E2%80%9D%20Journal%20of%20Chromatography.%20B%2C%20Analytical%20Technologies%20in%20the%20Biomedical%20and%20Life%20Sciences%201026%20%282016%29%3A%2027%E2%80%9335)
6. Y. Jiang, B. David, P. Tu, and Y. Barbin, “Recent Analytical Approaches in Quality Control of Traditional Chinese Medicines-A Review,” Analyt- ica Chimica Acta 657 (2010): 9–18 — [Google Scholarで探す](https://scholar.google.com/scholar?q=Y.%20Jiang%2C%20B.%20David%2C%20P.%20Tu%2C%20and%20Y.%20Barbin%2C%20%E2%80%9CRecent%20Analytical%20Approaches%20in%20Quality%20Control%20of%20Traditional%20Chinese%20Medicines-A%20Review%2C%E2%80%9D%20Analyt-%20ica%20Chimica%20Acta%20657%20%282010%29%3A%209%E2%80%9318)
7. M. Goodarzi, P. J. Russell, and H. Y. Vander, “Similarity Analyses of Chromatographic Herbal Fingerprints: A Review,” Analytica Chimica Acta 804 (2013): 16–28 — [Google Scholarで探す](https://scholar.google.com/scholar?q=M.%20Goodarzi%2C%20P.%20J.%20Russell%2C%20and%20H.%20Y.%20Vander%2C%20%E2%80%9CSimilarity%20Analyses%20of%20Chromatographic%20Herbal%20Fingerprints%3A%20A%20Review%2C%E2%80%9D%20Analytica%20Chimica%20Acta%20804%20%282013%29%3A%2016%E2%80%9328)
8. A. Bansal, V. Chhabra, R. K. Rawal, and S. Sharma, “Chemomet- rics: A New Scenario in Herbal Drug Standardization,” Journal of Pharmaceutical Analysis 4 (2014): 223–233 — [Google Scholarで探す](https://scholar.google.com/scholar?q=A.%20Bansal%2C%20V.%20Chhabra%2C%20R.%20K.%20Rawal%2C%20and%20S.%20Sharma%2C%20%E2%80%9CChemomet-%20rics%3A%20A%20New%20Scenario%20in%20Herbal%20Drug%20Standardization%2C%E2%80%9D%20Journal%20of%20Pharmaceutical%20Analysis%204%20%282014%29%3A%20223%E2%80%93233)
9. M. Ni, The Yellow Emperor’s Classic of Medicine: A New Transla- tion of the Neijing Suwen With Commentary. (Boulder, CO: Shambhala Publications, 2015) — [Google Scholarで探す](https://scholar.google.com/scholar?q=M.%20Ni%2C%20The%20Yellow%20Emperor%E2%80%99s%20Classic%20of%20Medicine%3A%20A%20New%20Transla-%20tion%20of%20the%20Neijing%20Suwen%20With%20Commentary.%20%28Boulder%2C%20CO%3A%20Shambhala%20Publications%2C%202015%29)
10. M. Liu, Q. W. Yang, N. C. Yu, and G. Zhang, “Clinical Observa- tion on Treatment of Cervical Radiculopathy With Gentong Mixture,” HubeiJTCMJAN 40 (2018): 46–48 — [Google Scholarで探す](https://scholar.google.com/scholar?q=M.%20Liu%2C%20Q.%20W.%20Yang%2C%20N.%20C.%20Yu%2C%20and%20G.%20Zhang%2C%20%E2%80%9CClinical%20Observa-%20tion%20on%20Treatment%20of%20Cervical%20Radiculopathy%20With%20Gentong%20Mixture%2C%E2%80%9D%20HubeiJTCMJAN%2040%20%282018%29%3A%2046%E2%80%9348)
11. Y. Ding, W. Li, S. Peng, et al., “Puerarin Protects Against Myocardial Ischemia/Reperfusion Injury by Inhibiting Ferroptosis,” Biological and Pharmaceutical Bulletin 46 (2023): 524–532 — [Google Scholarで探す](https://scholar.google.com/scholar?q=Y.%20Ding%2C%20W.%20Li%2C%20S.%20Peng%2C%20et%20al.%2C%20%E2%80%9CPuerarin%20Protects%20Against%20Myocardial%20Ischemia/Reperfusion%20Injury%20by%20Inhibiting%20Ferroptosis%2C%E2%80%9D%20Biological%20and%20Pharmaceutical%20Bulletin%2046%20%282023%29%3A%20524%E2%80%93532)
12. S. P. Lin, L. Zhu, H. Shi, et al., “Puerarin Prevents Sepsis-associated Encephalopathy by Regulating the AKT1 Pathway in Microglia,” Phy- tomedicine 121 (2023): 155119 — [Google Scholarで探す](https://scholar.google.com/scholar?q=S.%20P.%20Lin%2C%20L.%20Zhu%2C%20H.%20Shi%2C%20et%20al.%2C%20%E2%80%9CPuerarin%20Prevents%20Sepsis-associated%20Encephalopathy%20by%20Regulating%20the%20AKT1%20Pathway%20in%20Microglia%2C%E2%80%9D%20Phy-%20tomedicine%20121%20%282023%29%3A%20155119)
13. Y. Ma, X. Lang, Q. Yang, et al., “Paeoniflorin Promotes Intestinal Stem Cell-mediated Epithelial Regeneration and Repair via PI3K-AKT-mTOR Signalling in Ulcerative Colitis,” International Immunopharmacology 119 (2023): 110247 — [Google Scholarで探す](https://scholar.google.com/scholar?q=Y.%20Ma%2C%20X.%20Lang%2C%20Q.%20Yang%2C%20et%20al.%2C%20%E2%80%9CPaeoniflorin%20Promotes%20Intestinal%20Stem%20Cell-mediated%20Epithelial%20Regeneration%20and%20Repair%20via%20PI3K-AKT-mTOR%20Signalling%20in%20Ulcerative%20Colitis%2C%E2%80%9D%20International%20Immunopharmacology%20119%20%282023%29%3A%20110247)
14. M. Y. Zhang, L. J. Ma, L. Jiang, et al., “Paeoniflorin Protects Against Cisplatin-induced Acute Kidney Injury Through Targeting Hsp90AA1- Akt Protein-protein Interaction,” Journal of Ethnopharmacology 310 (2023): 116422 — [Google Scholarで探す](https://scholar.google.com/scholar?q=M.%20Y.%20Zhang%2C%20L.%20J.%20Ma%2C%20L.%20Jiang%2C%20et%20al.%2C%20%E2%80%9CPaeoniflorin%20Protects%20Against%20Cisplatin-induced%20Acute%20Kidney%20Injury%20Through%20Targeting%20Hsp90AA1-%20Akt%20Protein-protein%20Interaction%2C%E2%80%9D%20Journal%20of%20Ethnopharmacology%20310%20%282023%29%3A%20116422)
15. M. Gao, D. Zhang, C. Jiang, Q. Jin, and J. Zhang, “Paeoniflorin Inhibits Hepatocellular Carcinoma Growth by Reducing PD-L1 Expression,” Biomedicine and Pharmacotherapy 166 (2023): 115317 — [Google Scholarで探す](https://scholar.google.com/scholar?q=M.%20Gao%2C%20D.%20Zhang%2C%20C.%20Jiang%2C%20Q.%20Jin%2C%20and%20J.%20Zhang%2C%20%E2%80%9CPaeoniflorin%20Inhibits%20Hepatocellular%20Carcinoma%20Growth%20by%20Reducing%20PD-L1%20Expression%2C%E2%80%9D%20Biomedicine%20and%20Pharmacotherapy%20166%20%282023%29%3A%20115317)
16. D. Wang, T. Bu, Y. Q. Li, Y. Y. He, F. Yang, and L. Zou, “Pharma- cological Activity, Pharmacokinetics, and Clinical Research Progress of Puerarin,” Antioxidants 11 (2022): 2121 — [Google Scholarで探す](https://scholar.google.com/scholar?q=D.%20Wang%2C%20T.%20Bu%2C%20Y.%20Q.%20Li%2C%20Y.%20Y.%20He%2C%20F.%20Yang%2C%20and%20L.%20Zou%2C%20%E2%80%9CPharma-%20cological%20Activity%2C%20Pharmacokinetics%2C%20and%20Clinical%20Research%20Progress%20of%20Puerarin%2C%E2%80%9D%20Antioxidants%2011%20%282022%29%3A%202121)
17. W. J. Ma, H. S. Ren, X. Meng, et al., “A Review of the Ethnophar- macology, Phytochemistry, Pharmacology, Pharmacokinetics and Quality Control of Paeonia Lactiflora Pall,” Journal of Ethnopharmacology 335 (2024): 118616 — [Google Scholarで探す](https://scholar.google.com/scholar?q=W.%20J.%20Ma%2C%20H.%20S.%20Ren%2C%20X.%20Meng%2C%20et%20al.%2C%20%E2%80%9CA%20Review%20of%20the%20Ethnophar-%20macology%2C%20Phytochemistry%2C%20Pharmacology%2C%20Pharmacokinetics%20and%20Quality%20Control%20of%20Paeonia%20Lactiflora%20Pall%2C%E2%80%9D%20Journal%20of%20Ethnopharmacology%20335%20%282024%29%3A%20118616)
18. M. L. Li, X. W. Cui, L. Jin, M. F. Li, and J. H. Wei, “Bolting Reduces Ferulic Acid and Flavonoid Biosynthesis and Induces Root Lignification in Angelica sinensis,” Plant Physiology and Biochemistry 170 (2022): 171– 179 — [Google Scholarで探す](https://scholar.google.com/scholar?q=M.%20L.%20Li%2C%20X.%20W.%20Cui%2C%20L.%20Jin%2C%20M.%20F.%20Li%2C%20and%20J.%20H.%20Wei%2C%20%E2%80%9CBolting%20Reduces%20Ferulic%20Acid%20and%20Flavonoid%20Biosynthesis%20and%20Induces%20Root%20Lignification%20in%20Angelica%20sinensis%2C%E2%80%9D%20Plant%20Physiology%20and%20Biochemistry%20170%20%282022%29%3A%20171%E2%80%93%20179)
19. Y. Y. Shi, L. Shi, Q. Liu, W. B. Wang, and Y. J. Liu, “Molecular Mechanism and Research Progress on Pharmacology of Ferulic Acid in Liver Diseases,” Frontiers in Pharmacology 14 (2023): 1207999 — [Google Scholarで探す](https://scholar.google.com/scholar?q=Y.%20Y.%20Shi%2C%20L.%20Shi%2C%20Q.%20Liu%2C%20W.%20B.%20Wang%2C%20and%20Y.%20J.%20Liu%2C%20%E2%80%9CMolecular%20Mechanism%20and%20Research%20Progress%20on%20Pharmacology%20of%20Ferulic%20Acid%20in%20Liver%20Diseases%2C%E2%80%9D%20Frontiers%20in%20Pharmacology%2014%20%282023%29%3A%201207999)
20. T. F. Lin, L. Wang, Y. Zhang, et al., “Uses, Chemical Composi- tions, Pharmacological Activities and Toxicology of Clematidis Radix Et Rhizome – A Review,” Journal of Ethnopharmacology 24 (2021): 113831. 9 of 10 25731815, 2025, 1, — [Google Scholarで探す](https://scholar.google.com/scholar?q=T.%20F.%20Lin%2C%20L.%20Wang%2C%20Y.%20Zhang%2C%20et%20al.%2C%20%E2%80%9CUses%2C%20Chemical%20Composi-%20tions%2C%20Pharmacological%20Activities%20and%20Toxicology%20of%20Clematidis%20Radix%20Et%20Rhizome%20%E2%80%93%20A%20Review%2C%E2%80%9D%20Journal%20of%20Ethnopharmacology%2024%20%282021%29%3A%20113831.%209%20of%2010%2025731815%2C%202025%2C%201%2C)
21. C. M. Fu, G. H. Lu, O. J. Schmitz, Z. W. Li, and K. S. Y. Leung, “Improved Chromatographic Fingerprints for Facile Differentiation of Two Ganoderma Spp,” Biomedical Chromatography 23 (2009): 280–288 — [Google Scholarで探す](https://scholar.google.com/scholar?q=C.%20M.%20Fu%2C%20G.%20H.%20Lu%2C%20O.%20J.%20Schmitz%2C%20Z.%20W.%20Li%2C%20and%20K.%20S.%20Y.%20Leung%2C%20%E2%80%9CImproved%20Chromatographic%20Fingerprints%20for%20Facile%20Differentiation%20of%20Two%20Ganoderma%20Spp%2C%E2%80%9D%20Biomedical%20Chromatography%2023%20%282009%29%3A%20280%E2%80%93288)
22. M. Gu, F. Ouyang, and Z. Su, “Comparison of High-speed Counter- current Chromatography and High-performance Liquid Chromatography on Fingerprinting of Chinese Traditional Medicine,” Journal of Chro- matography A 1022 (2004): 139–144 — [Google Scholarで探す](https://scholar.google.com/scholar?q=M.%20Gu%2C%20F.%20Ouyang%2C%20and%20Z.%20Su%2C%20%E2%80%9CComparison%20of%20High-speed%20Counter-%20current%20Chromatography%20and%20High-performance%20Liquid%20Chromatography%20on%20Fingerprinting%20of%20Chinese%20Traditional%20Medicine%2C%E2%80%9D%20Journal%20of%20Chro-%20matography%20A%201022%20%282004%29%3A%20139%E2%80%93144)
23. X. Y. Song, Y. D. Li, Y. P. Shi, L. Jin, and J. Chen, “Quality Control of Traditional Chinese Medicines: A Review,” Chinese Journal of Natural Medicines 11 (2013): 596–607 — [Google Scholarで探す](https://scholar.google.com/scholar?q=X.%20Y.%20Song%2C%20Y.%20D.%20Li%2C%20Y.%20P.%20Shi%2C%20L.%20Jin%2C%20and%20J.%20Chen%2C%20%E2%80%9CQuality%20Control%20of%20Traditional%20Chinese%20Medicines%3A%20A%20Review%2C%E2%80%9D%20Chinese%20Journal%20of%20Natural%20Medicines%2011%20%282013%29%3A%20596%E2%80%93607)
24. L. Zhu, L. Fang, Z. Li, X. Xie, and L. Zhang, “A HPLC Fingerprint Study on Chaenomelis Fructus,” BMC Chemistry 13 (2019): 7 — [Google Scholarで探す](https://scholar.google.com/scholar?q=L.%20Zhu%2C%20L.%20Fang%2C%20Z.%20Li%2C%20X.%20Xie%2C%20and%20L.%20Zhang%2C%20%E2%80%9CA%20HPLC%20Fingerprint%20Study%20on%20Chaenomelis%20Fructus%2C%E2%80%9D%20BMC%20Chemistry%2013%20%282019%29%3A%207)
25. G. Yang, S. Li, X. Sun, Y. Lv, and H. Huang, “Quality Monitoring of Shenmai Injection by HPLC Pharmacodynamic Fingerprinting,” BMC Chemistry 17 (2023): 28 — [Google Scholarで探す](https://scholar.google.com/scholar?q=G.%20Yang%2C%20S.%20Li%2C%20X.%20Sun%2C%20Y.%20Lv%2C%20and%20H.%20Huang%2C%20%E2%80%9CQuality%20Monitoring%20of%20Shenmai%20Injection%20by%20HPLC%20Pharmacodynamic%20Fingerprinting%2C%E2%80%9D%20BMC%20Chemistry%2017%20%282023%29%3A%2028)
26. S. Liu, G. Zhang, Y. Qiu, et al., “Quality Evaluation of Shenmaidihuang Pills Based on the Chromatographic Fingerprints and Simultaneous Determination of Seven Bioactive Constituents,” Journal of Separation Science 39 (2016): 4557–4567 — [Google Scholarで探す](https://scholar.google.com/scholar?q=S.%20Liu%2C%20G.%20Zhang%2C%20Y.%20Qiu%2C%20et%20al.%2C%20%E2%80%9CQuality%20Evaluation%20of%20Shenmaidihuang%20Pills%20Based%20on%20the%20Chromatographic%20Fingerprints%20and%20Simultaneous%20Determination%20of%20Seven%20Bioactive%20Constituents%2C%E2%80%9D%20Journal%20of%20Separation%20Science%2039%20%282016%29%3A%204557%E2%80%934567)
27. E. Lai, J. Ning, Y. Liu, et al., “The Chemical Profile and the Quan- tification of the Traditional Chinese Medicine Formula Granules Erchen Decoction Analyzed by Ultra-High Performance Liquid Chromatography- Q-Exactive Orbitrap Tandem Mass Spectrometry Method,” Separation Science Plus (2024): e202400142 — [Google Scholarで探す](https://scholar.google.com/scholar?q=E.%20Lai%2C%20J.%20Ning%2C%20Y.%20Liu%2C%20et%20al.%2C%20%E2%80%9CThe%20Chemical%20Profile%20and%20the%20Quan-%20tification%20of%20the%20Traditional%20Chinese%20Medicine%20Formula%20Granules%20Erchen%20Decoction%20Analyzed%20by%20Ultra-High%20Performance%20Liquid%20Chromatography-%20Q-Exactive%20Orbitrap%20Tandem%20Mass%20Spectromet)
28. Z. M. Wang, H. M. Gao, X. T. Fu, and W. H. Wang, “Multi-components Quantitation by One Marker New Method for Quality Evaluation of Chinese Herbal Medicine,” Zhongguo Zhong Yao Za Zhi 31 (2006): 1925–1928 — [Google Scholarで探す](https://scholar.google.com/scholar?q=Z.%20M.%20Wang%2C%20H.%20M.%20Gao%2C%20X.%20T.%20Fu%2C%20and%20W.%20H.%20Wang%2C%20%E2%80%9CMulti-components%20Quantitation%20by%20One%20Marker%20New%20Method%20for%20Quality%20Evaluation%20of%20Chinese%20Herbal%20Medicine%2C%E2%80%9D%20Zhongguo%20Zhong%20Yao%20Za%20Zhi%2031%20%282006%29%3A%201925%E2%80%931928)
29. A. Stavrianidi, E. Stekolshchikova, A. Porotova, I. Rodin, and O. Shpigun, “Combination of HPLC-MS and QAMS as a New Analytical Approach for Determination of Saponins in Ginseng Containing Prod- ucts,” Journal of Pharmaceutical and Biomedical Analysis 132 (2017): 87–92 — [Google Scholarで探す](https://scholar.google.com/scholar?q=A.%20Stavrianidi%2C%20E.%20Stekolshchikova%2C%20A.%20Porotova%2C%20I.%20Rodin%2C%20and%20O.%20Shpigun%2C%20%E2%80%9CCombination%20of%20HPLC-MS%20and%20QAMS%20as%20a%20New%20Analytical%20Approach%20for%20Determination%20of%20Saponins%20in%20Ginseng%20Containing%20Prod-%20ucts%2C%E2%80%9D%20Journal%20of%20Pharmaceutical%20and%20Biomedical%20Analysi)
30. Z. Yang, J. Zhu, H. Zhang, and X. Fan, “Investigating Chemical Features of Panax notoginseng Based on Integrating HPLC Fingerprinting and Determination of Multiconstituents by Single Reference Standard,” Journal of Ginseng Research 42 (2018): 334–342 — [Google Scholarで探す](https://scholar.google.com/scholar?q=Z.%20Yang%2C%20J.%20Zhu%2C%20H.%20Zhang%2C%20and%20X.%20Fan%2C%20%E2%80%9CInvestigating%20Chemical%20Features%20of%20Panax%20notoginseng%20Based%20on%20Integrating%20HPLC%20Fingerprinting%20and%20Determination%20of%20Multiconstituents%20by%20Single%20Reference%20Standard%2C%E2%80%9D%20Journal%20of%20Ginseng%20Research%2042%20%282018%29%3A%20334%E2%80%93342)
31. J. Luo, W. G. Cao, B. Yu, et al., “Quality Evaluation of Hawk Tea From Different Months and Regions Based on Quantitative Analysis of Multiple Components With a Single Marker (QAMS) Combined With HPLC Fingerprint,” Phytochemical Analysis 34 (2023): 884–897 — [Google Scholarで探す](https://scholar.google.com/scholar?q=J.%20Luo%2C%20W.%20G.%20Cao%2C%20B.%20Yu%2C%20et%20al.%2C%20%E2%80%9CQuality%20Evaluation%20of%20Hawk%20Tea%20From%20Different%20Months%20and%20Regions%20Based%20on%20Quantitative%20Analysis%20of%20Multiple%20Components%20With%20a%20Single%20Marker%20%28QAMS%29%20Combined%20With%20HPLC%20Fingerprint%2C%E2%80%9D%20Phytochemical%20Analysis%2034%20%282023%29%3A%208)
32. W. Shi, Z. Wu, J. Wu, et al., “A Comprehensive Quality Control Evaluation for Standard Decoction of Smilax glabra Roxb Based on HPLC-MS-UV/CAD Methods Combined With Chemometrics Analysis and Network Pharmacology,” Food Chemistry 410 (2023): 135371. Supporting Information Additional supporting information can be found online in the Supporting Information section. 10 of 10 Separation Science Plus, 2025 25731815, 2025, 1, — [Google Scholarで探す](https://scholar.google.com/scholar?q=W.%20Shi%2C%20Z.%20Wu%2C%20J.%20Wu%2C%20et%20al.%2C%20%E2%80%9CA%20Comprehensive%20Quality%20Control%20Evaluation%20for%20Standard%20Decoction%20of%20Smilax%20glabra%20Roxb%20Based%20on%20HPLC-MS-UV/CAD%20Methods%20Combined%20With%20Chemometrics%20Analysis%20and%20Network%20Pharmacology%2C%E2%80%9D%20Food%20Chemistry%20410%20%282023%29%3A%20135371.%20S)
