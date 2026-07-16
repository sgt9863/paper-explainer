---
title: QbD主導のTCM製造プロセス — 小柴胡湯（ショウサイコトウ）カプセルの流動層造粒・乾燥プロセスの開発と最適化
slug: xiaochaihu-qbd-fluid-bed-granulation-dsd
source_pdf: s1224902302663z.pdf
doi: https://doi.org/10.1208/s12249-023-02663-z
drive_url: (未アップロード：ユーザー返却PDF)
level: practitioner
date: 2026-07-08
published: true
tags: [方剤・中成薬, メソッド開発・QbD, 製造法, HPLC・UPLC]
digest_tagline: 85%エタノールを水に替え、造粒と乾燥を流動層1工程に統合——決定的スクリーニング設計（DSD）で小柴胡湯カプセルを最適化
digest_stats: [IF|4.0（AAPS PharmSciTech・JCR2024・Q1）, 方剤|小柴胡湯（7生薬）カプセル, 手法|流動層造粒（FBG）＋乾燥＋DSD（6因子19実験）, 品質達成|収率>90%・原料利用率>90%・水分<4%, API|バイカリン含量31.81-34.10 mg/g（薬典5 mg/g以上）]
digest_points: [従来の湿式造粒＋オーブン乾燥＋篩過を流動層1工程に統合し結合剤を85%エタノールから水に替えてコスト・安全・環境を改善, 決定的スクリーニング設計（DSD）で6因子（噴霧温度・霧化圧・結合剤噴霧速度など）をわずか19実験で交絡なく評価しCPPを特定, モンテカルロ法で「収率>90%・原料利用率>90%・水分<4%」を90%以上の確率で満たす設計空間を構築し検証実験で妥当性を確認]
digest_chart_label: DSDで得た主要CQAの回帰モデル決定係数（R²）
digest_chart: [収率Y1|0.9334, 水分Y3|0.9359, 原料利用率Y2|0.8757]
summary: 漢方方剤「小柴胡湯（7生薬）」カプセルの製造を、QbD（Quality by Design）の考え方で近代化。従来の湿式造粒＋オーブン乾燥＋篩過を流動層造粒（FBG）1工程に統合し、結合剤を85%エタノールから水に置換。決定的スクリーニング設計（DSD）で6つの重要工程パラメータを19実験で評価し、収率>90%・原料利用率>90%・水分<4%を満たす設計空間（MODR）を構築・検証した。
---

<!--
Teng et al., AAPS PharmSciTech (2023) 24:210 の全訳密度日本語版。
漢方カプセル製造工程のQbD最適化の実験論文。practitioner レベル。
表I（因子水準）・表II（DSD実験）・表III（回帰係数）を保持。回帰式（Eq.3-8）は本文の通り。図（Fig.1-8）は原文参照。
-->

## 書誌情報

- 標題（原題）: QbD-Guided Traditional Chinese Medicine Manufacturing Process: Development and Optimization of Fluid-Bed Granulation and Drying Processes for Xiaochaihu Capsules
- 著者: Kaixuan Teng, Hao Fu, Gelin Wu, Ping Gong, Yongjian Xie, Peng Zhou, Xingchu Gong, Haibin Qu（責任著者）
- 所属: 浙江大学 薬学院 製薬情報学研究所／浙江大学 医療AI革新研究所／浙江プラライフ製薬
- 掲載誌・巻号・DOI: AAPS PharmSciTech, 2023;24:210. DOI: 10.1208/s12249-023-02663-z
- インパクトファクター: 4.0（AAPS PharmSciTech, JCR 2024 / Clarivate。Q1）
- 受理経過: 2023年6月28日受領／9月19日受理／10月11日オンライン公開。© American Association of Pharmaceutical Scientists 2023
- 資金: 国家中医薬管理局 革新チーム・人材育成プログラム（ZYYCXTD-D-202002）

> 補足: 小柴胡湯（しょうさいことう、Xiaochaihu [XCH]）は張仲景が創方した古典的漢方方剤で、柴胡・（生姜・ミョウバンで加工した）半夏・黄芩・党参（人参の代用）・甘草・生姜・大棗の7味から成る。日本でもツムラなどが医療用漢方製剤として製造する著名方剤。本論文は「化学（成分）」ではなく「製造工程」のQbD論文で、小柴胡湯カプセルの造粒・乾燥をいかに効率的・環境配慮的に近代化するかを扱う。従来の湿式造粒＋オーブン乾燥を流動層1工程に統合し、結合剤の85%エタノールを水に替えた点が要。日本の漢方エキス製剤の造粒工程管理にも直結する内容で、本文にツムラ（Tsumura And Co.）のダウンロード記録はないが浙江大学＋製薬企業の産学連携研究。

## 要旨（Abstract）

伝統中医薬（TCM）である小柴胡湯（XCH）カプセルの従来の製造法は、時間・コスト・労力がかかり、TCMの近代化に不利である。この課題に対処するため、本研究ではQuality by Design（QbD）の原則に導かれ、水を結合剤とする新しい流動層造粒・乾燥プロセスを開発・最適化した。石川図（Ishikawa diagram）で予備的リスク評価を行い、続いてQbD統計ツールとしての6因子の決定的スクリーニング設計（DSD）で新プロセスを開発・最適化した。DSDを用いて少数の実験で複数の潜在因子と交互作用を研究した。本研究は重要工程パラメータ（CPP）を特定し、DSD枠組み内でCPP-重要品質特性（CQA）の関係を明らかにする二次回帰モデルを確立し、信頼できる設計空間を定義した。設計空間内のパラメータ組み合わせで実施したプロセスは、生産収率・原料利用率が90%超、水分含量4%未満の適格な顆粒を製造した。さらに全顆粒のバイカリンの定量分析が、有効成分（API）の適格な含量を保証した。新たに開発した小柴胡湯カプセルのプロセスは、短時間・環境親和性・低コストの利点を持ち、TCM製造プロセスの近代化におけるQbDと実験計画（DoE）手法の効果的応用を例示する。

**キーワード**: 決定的スクリーニング設計（DSD）、流動層造粒（FBG）、Quality by Design（QbD）、伝統中医薬（TCM）、小柴胡湯（XCH）

## 序論（Introduction）

小柴胡湯（XCH）方剤は張仲景が創方した古典的TCM方剤で、柴胡・（生姜とミョウバンで加工した）半夏（姜半夏）・黄芩・党参・甘草・生姜・大棗から成り、発汗解熱・疏肝・和胃の作用を持つ。多数の研究がXCH方剤の抗炎症・肝保護・免疫調節・抗アレルギー・抗腫瘍効果を強調してきた。当初XCHの剤形は煎じ液で、吸収しやすく効果の速さ・強さを調整できるが、保存期間が短い・量が多い・その都度煎じる必要・苦味・患者コンプライアンス不良などの欠点がある。

最新版の中国薬典にはXCHの4剤形（錠剤・発泡錠・顆粒・カプセル）が収載される。うちシェル付きXCHカプセルは外観が滑らかで清潔で服用に便利、コンプライアンスを高める。保存・輸送の利便性から広く採用され、成熟した商業薬として広く使われる。薬典の調製ではXCHエキス粉末を85%エタノールと混合して顆粒にする。所望のXCH顆粒を得るには、製薬業界で湿式造粒・オーブン乾燥・篩過の従来法が一般に使われる。この調製過程は乾燥・篩過の前に溶媒調製・移送ステップを要し時間・労力がかかる。さらに移送中の非密閉操作が粉塵を生じ、粉塵汚染・不利な生産環境・医薬品汚染の可能性を招く。したがってXCH生産の近代化には、時間・労力を減らし・コストを下げ・効率を高める変更が不可欠である。

流動層造粒（FBG）は、混合・凝集・乾燥を1ステップに統合する製薬生産で広く使われるプロセスで、労力コスト・移送損失・時間を節約し、良好な流動性・圧縮性の顆粒を製造する。しかし気-液-固三相系の熱・物質移動の複雑さと、給気温度・霧化圧・結合剤噴霧速度・給気流量・給気湿度など造粒過程と最終顆粒特性に影響する複数の工程パラメータが、全過程を複雑にする。したがって新FBG過程の開発ではFBG製品・過程の理解が必要だが困難である。

古典的な一因子ずつ（one-variable-at-a-time）法や試行錯誤法は、しばしば不完全な製品・過程理解を招き、再現性の欠如・高コストなどの問題で、固定的・硬直的な製造過程に至る。これを克服するため、QbDアプローチの信頼できる統計要素である実験計画（DoE）が導入された。QbDは「事前定義された目標から始まり、健全な科学と品質リスク管理に基づいて製品・過程理解と過程管理を強調する体系的開発アプローチ」と定義される。製薬QbDは製品・製造過程の設計・開発とCQA・CPPの同定を導く。DoEを統計ツールとして、複数のCPPを同時に考慮しCQAへの効果を調べられる。スクリーニング・最適化・堅牢性がDoEの基本目標。CQAとCPPの多次元的組み合わせ・交互作用を含む設計空間（DS）を決定し最終顆粒の品質を保証する。

FBG過程は通常、水分含量・密度・Hausner指数・安息角・生産収率などの生産特性で評価される。Box-Behnken設計（BBD）・分数要因設計・決定的スクリーニング設計（DSD）などのDoE法が先行研究で使われ、パラメータの生産特性・交互作用への効果を明らかにしてきた。うちDSDはJonesとNachtsheimが提唱した新規で高効率な小型3水準実験設計技術で、交絡バイアスなく因子の主効果と2因子交互作用を評価する能力が高く、因子の純二次効果の推定も提供する。DSDは複数因子考慮時に必要な実験ランが少なく、製薬開発の時間・資源・コストを大幅に削減する点で魅力的。

先行研究はDoEで過程の顆粒品質への効果を理解してきたが、DoEをTCM FBG過程の開発・最適化に応用することはほとんど未探索だった。XCH生産の既存課題に関し、本研究の目的はDSDを用いてXCHカプセルの従来の湿式造粒・オーブン乾燥に代わる高効率で安全なFBG・乾燥過程を開発することである。生産収率・原料利用率・生産水分含量で開発過程を評価。信頼できる数理モデルと設計空間を得て検証した。開発過程では**水を85%エタノールの代わりに結合剤とする**（結合剤コスト削減・過程安全性向上のため）。新過程は流動層内で造粒・乾燥を達成し、移送ステップ・処理時間を減らし生産効率を大幅に高める。密閉流動層装置内で行うため移送ステップが減り粉塵汚染の可能性を最小化——新過程の環境親和性を示す。

## 材料と方法（Materials and Methods）

### 試薬と材料

バイカリン標準品（94.2%, 中国食品薬品検定研究院）、リン酸（85%, 国薬）、メタノール（HPLCグレード, Merck）、エタノール（分析グレード）、原料（小柴胡湯エキス粉末, 浙江プラライフ製薬提供）、XCH顆粒試料（FBG・乾燥過程で製造）。

### トップスプレー流動層造粒

多機能ラボ流動層造粒機（FLZB-3.0, HANSE Technology）で全実験。各バッチはXCHエキス粉末559 gを固体粉末、脱イオン水115.4 gを結合剤とした。予熱した製品容器に固体粉末を投入し、30秒後に結合剤をポンプ注入。流動化空気流量を調整し過流動化・脱流動化のリスクを回避。全液量を使い切ると乾燥過程を開始し、給気温度を指定乾燥温度に速やかに調整し所定時間持続。乾燥終了時にハロゲン迅速水分計（HE-83, Mettler-Toledo）で水分測定後、流動化を停止。振動フィルターバッグを振って付着粒子を回収、篩過（850 μm）前に総質量測定。

### 工程評価指標（CQA）の同定

製薬業界の製造経験とXCHカプセル製造過程の目標に従いCQAを同定:
- **生産収率 Y1**: 篩分析（0〜850 μm範囲の顆粒の総質量に対する質量分率）。
- **原料利用率 Y2**: 0〜850 μm範囲の顆粒の原料質量に対する質量分率。高いほど同一生産コストでより多くの製品＝利益増。
- **生産水分含量 Y3**: ハロゲン迅速水分計（105℃）で測定。製造要求により4%を超えるべきでない。

### 工程のリスク評価

石川図（Ishikawa diagram）で予備リスク評価（Fig.1）。環境・人員・方法・材料・装置の因子を図式化。予備実験と文献調査に基づき、噴霧・乾燥の2段階の6パラメータ——噴霧給気温度(X1)・霧化圧(X2)・結合剤噴霧速度(X3)・結合剤温度(X4)・乾燥給気温度(X5)・乾燥時間(X6)——を潜在的CPPと同定（Table I）。

**Table I. DSDの独立変数と水準**

| 独立変数 | 最小(−1) | 中央(0) | 最大(+1) |
|---|---|---|---|
| X1: 噴霧給気温度(℃) | 50 | 60 | 70 |
| X2: 霧化圧(bar) | 1 | 1.5 | 2 |
| X3: 結合剤噴霧速度(r/min) | 5 | 12.5 | 20 |
| X4: 結合剤温度(℃) | 25 | 40 | 55 |
| X5: 乾燥給気温度(℃) | 60 | 65 | 70 |
| X6: 乾燥時間(min) | 5 | 17.5 | 30 |

### DSDの実装

DSDで6因子の効果を調査。二次回帰（式1）で造粒・乾燥過程への効果を計算:

$$Y = b_0 + \sum b_i X_i + \sum\sum b_{ik} X_i X_k + \sum b_{ii} X_i^2 \tag{1}$$

異なる次元の影響を除くため、ゼロ平均正規化で[−1, 1]に変換（式2）:

$$x_i = \frac{X_i - X_{i,0}}{\Delta X_i} \tag{2}$$

Design Expert 11.0で2つの追加仮想因子を用いたDSDにより、ランダム順の3中心点を含む19実験を設計。

### 設計空間の計算

標準到達確率（網羅的探索——モンテカルロ法）で設計空間を計算。3次元プロットで図示。許容確率90%。MATLAB R2021bで計算。

### API定量

過程の信頼性評価のためAPI含量を検出。中国薬典によればバイカリン含量がXCHカプセルの品質管理基準。Agilent 1260でHPLC定量。試料を70%エタノールに懸濁し30分超音波、0.22 μm濾過。Zorbax SB-C18（4.6×250 mm, 5 µm, 30℃）。移動相メタノール:水:リン酸（47:53:0.2, V/V）、流速0.7 mL/min、注入量10 µL、検出315 nm。直線性（14.15–566.14 µg/mL）・精度・正確性・安定性（48時間）を検証。

## 結果と考察（Results and Discussion）

### モデルへのデータ適合

Table IIIに生産収率・原料利用率・生産水分含量の6因子・交互作用モデルのANOVA結果をまとめる。p値前進回帰で非有意項を除去（有意水準0.1）。回帰モデル（式3-8）は良好に機能し、決定係数R²は0.87超（Table III）。予測R²（>0.5）は調整R²（>0.8）とよく一致し、新観測への良好な予測とデータ適合を示す。

**Table II. DSD実験計画と応答（抜粋）**

| Run | X1 | X2 | X3 | X4 | X5 | X6 | Y1(収率%) | Y2(利用率%) | Y3(水分%) |
|---|---|---|---|---|---|---|---|---|---|
| 2 | 70 | 2 | 5 | 25 | 65 | 30 | 99.76 | 90.04 | 0.98 |
| 6 | 50 | 1 | 20 | 25 | 70 | 30 | 73.43 | 71.65 | 4.47 |
| 7 | 60 | 2 | 20 | 55 | 70 | 30 | 99.41 | 97.03 | 1.46 |
| 9 | 50 | 1 | 20 | 55 | 65 | 5 | 65.68 | 64.97 | 4.02 |
| 14 | 70 | 2 | 5 | 55 | 60 | 5 | 99.91 | 94.79 | 1.34 |
| 17 | 60 | 1.5 | 12.5 | 40 | 65 | 17.5 | 99.74 | 95.90 | 2.09 |

**Table III. 回帰係数とp値（R²）**

| 応答 | R² | 調整R² | 予測R² |
|---|---|---|---|
| Y1: 生産収率 | 0.9334 | 0.8911 | 0.7020 |
| Y2: 原料利用率 | 0.8757 | 0.8135 | 0.5526 |
| Y3: 生産水分含量 | 0.9359 | 0.8952 | 0.7527 |

### 生産収率への因子の効果

生産収率は65〜99.9%で変動。回帰式（正規化式3、復元式4）:

$$Y_1 = 98.01 + 3.39x_1 + 4.89x_2 - 5.40x_3 - 2.27x_1x_2 + 2.89x_1x_3 + 4.73x_2x_3 - 3.28x_3^2 \tag{3}$$

主要パラメータは噴霧給気温度(X1)・霧化圧(X2)・結合剤噴霧速度(X3)。影響順は **X3>X2>X1**、因子間に交互作用。交互作用項（X1X2, X1X3, X2X3）と二次項（X3²）が寄与。X3の主項・二次項とも収率に負の影響（X3増で収率減）、X1・X2増で収率増。低温はより大きくふわふわで密な顆粒、高給気温度は結合剤の急速蒸発で小さく脆い顆粒を生む。低霧化圧・高噴霧速度で大きな噴霧液滴が生じ固体粉末と衝突して過大粒子を形成——規格外で収率低下。低噴霧速度・高霧化圧では微細液滴が生じ、高霧化圧の剪断力が小さな湿潤域とより多くの微粉を生み流動空気で吹き飛ばされ収率低下。実生産では霧化圧を過度に高くしなかった。

### 原料利用率への因子の効果

回帰式（正規化式5、復元式6）:

$$Y_2 = 91.37 + 3.53x_1 + 3.65x_2 - 3.36x_3 - 2.58x_1x_2 + 2.89x_1x_3 + 4.96x_2x_3 \tag{5}$$

主要パラメータはX1・X2・X3で効果係数は類似。**交互作用項X2X3が正に最も有意**。X3増で明確に低下、X1・X2増で上昇。高X2・低X3では小さな液滴・活性湿潤域で凝集が少なく微粉が多く利用率が低下、逆に低X2・高X3では反対。高噴霧給気温度が他因子のどの水準でも利用率向上に寄与。

### 生産水分含量への因子の効果

回帰式（正規化式7、復元式8）:

$$Y_3 = 2.25 - 0.47x_1 - 0.42x_2 + 0.60x_3 - 0.13x_4 - 0.26x_6 + 0.15x_1x_3 - 0.25x_2x_3 \tag{7}$$

主要パラメータはX1・X2・X3・X4・X6。影響順は **X3>X1>X2>X6>X4**。X1・X2・X4・X6が負、X3が正の効果。高噴霧速度・低霧化圧で大液滴・遅い蒸発が粒子内の水蓄積を招く。乾燥時間が水分に影響するが、乾燥給気温度(X5)は有意な効果なし（設定範囲が狭くバイカリン安定性確保のため低温維持）。噴霧・乾燥終了時の材料温度差は噴霧終了時17.08℃から乾燥終了時10.66℃に縮小し、温度の水分への影響を弱めた。

### 設計空間の開発と検証

設計空間はDoEデータ解析の直接的成果で品質を保証し、設計空間内のパラメータ移動は届出対象の変更とみなされない。生産収率・原料利用率の下限を90%、水分含量の上限を4%に設定（Table IV）。設計空間計算法で、標準到達確率90%超のパラメータ組み合わせを設計空間内で達成（Fig.6、不規則形状）。

検証実験3件（設計空間内2・外1、Table V）。平均絶対誤差（MAE, 式9）で実験値と予測値の偏差を表現。実験値(y)と予測値(ŷ)は概ね一致（Table VI）——モデルの予測性能が良好。**設計空間外の検証点は規格を満たさず、設計空間内の点は適格製品を製造**。ただし高霧化圧・高噴霧速度などの極端条件は乱流・過湿潤を招き堅牢性を保証できないため、実応用では設計空間内のパラメータ選択時に過程堅牢性を考慮すべき。

### APIの定量

バイカリン含量をHPLC分析。検量線R²>0.9998（14.15–566.14 µg/mL）で優れた直線性。精度・試料安定性のRSD<1%。バイカリン平均回収率98.04±3.34%（RSD 3.41%）で良好な正確性。DSD・検証実験で製造した顆粒のバイカリン含量は**31.81〜34.10 mg/g（平均32.94 mg/g）**。原料のバイカリン含量に対し偏差1.35 mg/gは許容範囲——造粒・乾燥過程での有効成分の安定性を実証。全試料が薬典基準（下限5 mg/g）のバイカリン含量を満たし、開発過程の製品が薬典の品質要求を満たすことを示した。

## 結論（Conclusions）

本ケーススタディはQbD主導のTCM製造過程の開発・最適化を提示する。TCMエキス粉末を固体粉末、水を85%エタノールの代わりに結合剤とし、小柴胡湯カプセルの安全で実現可能なFBG・乾燥過程を成功裏に開発・最適化。造粒・乾燥をFBG過程に統合することで、より安全・高効率な新結合剤・新過程を確立。生産環境の改善・結合剤コスト削減・乾燥時間短縮による過程時間節約・移送ステップ削減が、従来法に対する明確な利点。DSDを統計ツールとして、CPP（噴霧給気温度・霧化圧・結合剤噴霧速度・結合剤温度・乾燥給気温度・乾燥時間）のCQA（生産収率・原料利用率・生産水分含量）への効果を、最小限の実験ランと高い統計効率で研究。数理モデルとモデル主導設計空間の精度・信頼性を実験で検証。本研究はTCM製造過程の開発・最適化にQbDを活用する概念を例示し、DoEアプローチの大きな潜在力を強調し、商業製造の継続的改善支援に価値あるツールを提供する。

## 参考文献

1. The Chinese Pharmacopoeia. Commission CP, editor. Beijing, China: China Medical Science Press;

2. Zheng C. The effects of the Xiaochaihu capsule on immunoglobulin A nephropathy. Clin J Chin Med. 2020;12(26):63–4.

3. Wu L, Geng B, Zhang R, Yong D, Xu J. Study on antibacterial and liver protective effects of Xiaochaihu capsule. Pharmacol Clin Chin Materia Med. 1999;06:3–5.

4. Zhang Y, Zhou X, Shao Q, Ze F, Wang S. Anti-inflammatory effect of Xiaochaihutang in rats with collagen-induced arthritis and the mechanism. Immunol J. 2015;31(09):781–5.

5. Liu J, Sun R. Protective effect of Xiaochaihu decoction on nonalcoholic steatohepatitis model mice. Chin Tradit Herb Drugs. 2020;51(14):3708–16.

6. Li L, Zhang Y, Wang X. Anti-tumor effect of Bupleuri Radix, Scutellariae Radix and Xiaochaihu capsule. Tradit Chin Med Res. 2013;26(08):79–80.

7. Su Z. Investigation and influencing factors analysis of Chinese medicine decoction taking compliance. J Tradit Chin Med Manag. 2022;30(13):35–7.

8. Fries L, Antonyuk S, Heinrich S, Dopfer D, Palzer S. Collision dynamics in fluidised bed granulators: a DEM-CFD study. Chem Eng Sci. 2013;86:108–23.

9. Morin G, Briens L. A comparison of granules produced by highshear and fluidized-bed granulation methods. AAPS PharmSciTech. 2014;15(4):1039–48.

10. Kwon HJ, Heo E-J, Kim Y-H, Kim S, Hwang Y-H, Byun J-M, et al. Development and evaluation of poorly water-soluble celecoxib as solid dispersions containing nonionic surfactants using fluidized-bed granulation. Pharmaceutics. 2019;11(3):136.

11. Goracinova K, Klisarova L, Simov A, Fredro-Kumbaradzi E, Petrusevska-Tozi L. Characterization of fluid bed prepared granulates with verapamil hydrochloride as active substance. Acta Pharmaceutica (Zagreb). 1996;46(2):147–53.

12. Consiglieri V, Rivas P, Lopez P, Sampaio M, Spricigo R, Mourao S, et al. Developments of fluconazole granulation by fluid bed for capsules and tablets manufacturing. Latin Am J Pharm. 2007;26(1):20–5.

13. Thapa P, Tripathi J, Jeong SH. Recent trends and future perspective of pharmaceutical wet granulation for better process understanding and product development. Powder Technol. 2019;344:864–82.

14. Tamrakar A, Ramachandran R. CFD–DEM–PBM coupled model development and validation of a 3D top-spray fluidized bed wet granulation process. Comput Chem Eng. 2019;125:249–70.

15. Menon A, Dhodi N, Mandella W, Chakrabarti S. Identifying fluid-bed parameters affecting product variability. Int J Pharm. 1996;140(2):207–18.

16. Liu H, Wang K, Schlindwein W, Li M. Using the Box–Behnken experimental design to optimise operating parameters in pulsed spray fluidised bed granulation. Int J Pharm. 2013;448(2):329–38.

17. Lipsanen T, Antikainen O, Räikkönen H, Airaksinen S, Yliruusi J. Novel description of a design space for fluidised bed granulation. Int J Pharm. 2007;345(1):101–7.

18. Debevec V, Srcic S, Horvat M. Scientific, statistical, practical, and regulatory considerations in design space development. Drug Dev Ind Pharm. 2018;44(3):349–64.

19. Dhoot AS, Fernandes GJ, Naha A, Rathnanand M, Kumar L. Design of experiments in pharmaceutical development. Pharm Chem J. 2019;53(8):730–5.

20. ICH Q8 (R2)

21. Yu LX. Pharmaceutical quality by design: product and process development, understanding, and control. Pharm Res. 2008;25(4):781–91.

22. Jelena D, Djordje M, Marko K, Ivana V, Ivana M, Svetlana I. Design space approach in optimization of fluid bed granulation and tablets compression process. Sci World J. 2012;2012:185085.

23. Närvänen T, Antikainen O, Yliruusi J. Predicting particle size during fluid bed granulation using process measurement data. AAPS PharmSciTech. 2009;10(4):1268–75.

24. Lourenço V, Lochmann D, Reich G, Menezes JC, Herdling T, Schewitz J. A quality by design study applied to an industrial pharmaceutical fluid bed granulation. Eur J Pharm Biopharm. 2012;81(2):438–47.

25. Rambali B, Baert L, Massart DL. Using experimental design to optimize the process parameters in fluidized bed granulation on a semi-full scale. Int J Pharm. 2001;220(1):149–60.

26. Dacanal GC, Menegalli FC. Selection of operational parameters for the production of instant soy protein isolate by pulsed fluid bed agglomeration. Powder Technol. 2010;203(3):565–73.

27. Zhao J, Li W, Qu H, Tian G, Wei Y. Application of definitive screening design to quantify the effects of process parameters on key granule characteristics and optimize operating parameters in pulsed-spray fluid-bed granulation. Particuology. 2018;43:56–65.

28. Rambali B, Baert L, Thoné D, Massart DL. Using experimental design to optimize the process parameters in fluidized bed granulation. Drug Dev Ind Pharm. 2001;27(1):47–55.

29. Jiang S, Yang L, Wei X. Preparation process study of ibuprofen arginine granules based on quality by design approach. Chin J Pharm. 2022;53(10):1446–52.

30. Meshali M, El-Banna HM, El-Sabbagh H. Use of a fractional factorial design to evaluate granulations prepared in a fluidized bed. Die Pharmazie. 1983;38(5):323–5.

31. Lipps DM, Sakr AM. Characterization of Wet Granulation process parameters using response surface methodology. 1 Top-spray fluidized bed. J Pharm Sci. 1994;83(7):937–47.

32. Jones B, Nachtsheim CJ. A class of three-level designs for definitive screening in the presence of second-order effects. J Qual Technol. 2011;43(1):1–15.

33. Erler A, de Mas N, Ramsey P, Henderson G. Efficient biological process characterization by definitive-screening designs: the formaldehyde treatment of a therapeutic protein as a case study. Biotechnol Lett. 2013;35(3):323–9.

34. Takagaki K, Ito T, Arai H, Obata Y, Takayama K, Onuki Y. The usefulness of definitive screening design for a quality by design approach as demonstrated by a pharmaceutical study of orally disintegrating tablet. Chem Pharm Bull. 2019;67(10):1144–51.

35. Tian G, Wei Y, Zhao J, Li W, Qu H. Application of near-infrared spectroscopy combined with design of experiments for process development of the pulsed spray fluid bed granulation process. Powder Technol. 2018;339:521–33.

36. Benjasirimongkol P, Piriyaprasarth S, Moribe K, Sriamornsak P. Use of Risk Assessment and Plackett-Burman design for developing resveratrol spray-dried emulsions: a quality-by-design approach. AAPS PharmSciTech. 2018;20(1):14.

37. Gao JZH, Jain A, Motheram R, Gray DB, Hussain MA. Fluid bed granulation of a poorly water soluble, low density, micronized drug: comparison with high shear granulation. Int J Pharm. 2002;237(1):1–14.

38. Shao J, Qu H, Gong X. Comparison of two algorithms for development of design space-overlapping method and probability-based method. China J Chin Materia Med. 2018;43(10):2074–80.

39. Chordiya M, Gangurde H, Sancheti V. Quality by design: a roadmap for quality pharmaceutical products. J Rep Pharma Sci. 2019;8(2):289. 40 Fukuda IM, Pinto CFF, Moreira CdS, Saviano AM, Lourenço FR. Design of experiments (DoE) applied to pharmaceutical and analytical quality by design (QbD). Braz J Pharm Sci. 2018;54:e01006. AAPS PharmSciTech (2023) 24:210 1 3 210 Page 14 of 14

## 訳者補足

- **この論文は「成分」でなく「製造」のQbD**: 本サイトの他のQbD論文（イチジク・黄連など）が「分析法」や「成分」を対象にするのに対し、本論文は**製造工程（造粒・乾燥）**をQbDで最適化する。小柴胡湯エキス粉末を顆粒（カプセル用）にする工程で、①従来バラバラだった湿式造粒＋オーブン乾燥＋篩過を**流動層1工程に統合**、②結合剤を**85%エタノールから水に置換**（防爆・コスト・環境）。この2つが実務的な改善の柱。日本の漢方エキス製剤メーカーの造粒工程にも通じる。

- **DSD（決定的スクリーニング設計）の利点**: 6因子を普通にBox-Behnkenで調べると実験数が膨大になる。DSDは「主効果＋2因子交互作用＋純二次効果」を**交絡なく・わずか19実験で**評価できる新しい実験計画法。「因子が多いけど実験回数は절約したい」製造現場に向く。本研究はこれで「収率にはX3（噴霧速度）が最も効き、増やすと収率が下がる」等の関係を効率的に突き止めた。

- **設計空間（MODR）の意味**: 「収率>90%・原料利用率>90%・水分<4%」を90%以上の確率で満たすパラメータの組み合わせ範囲を、モンテカルロ法で3次元的に描いた。この範囲内なら多少パラメータがずれても品質が保てる＝規制上「届出不要の変更」にできる。検証実験で、設計空間内は適格・外は不適格と確認され、モデルの実用性が裏付けられた。前掲のイチジク・黄連論文のMODRと同じ考え方を「製造工程」に適用した例。

- **バイカリンで品質確認**: 小柴胡湯の薬典品質管理指標はバイカリン（黄芩由来のフラボノイド配糖体、下限5 mg/g）。新工程で造った顆粒も31.81〜34.10 mg/gと十分で、造粒・乾燥中に有効成分が壊れないことを確認。乾燥温度を低く抑えた（X5の範囲を狭く）のもバイカリンの熱安定性に配慮したため。

- **小柴胡湯（ショウサイコトウ）とは**: 柴胡・半夏・黄芩・党参（人参）・甘草・生姜・大棗の7味から成る張仲景の古典方剤で、少陽病（往来寒熱など）に用いる代表的な和解剤。日本でも医療用漢方として広く使われる。

- 図（Fig.1 石川図、Fig.2-4 応答等高線、Fig.6 設計空間、Fig.7-8 HPLC・含量）と検証データ（Table V-VII）の詳細は原文参照。
