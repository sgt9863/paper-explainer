---
title: HPLC-DAD＋二次校正（ATLD／ATLD-MCR）による漢方方剤「温清飲」中5成分の同時定量
slug: wqy-hplc-dad-atld-mcr-secondorder
source_pdf: chemosensors-10-00238-v2.pdf
doi: https://doi.org/10.3390/chemosensors10070238
citations: 6
drive_file_id: 1u0VZvzHz0NJB2cdD1X9ufgZbQvtZvtuQ
drive_url: https://drive.google.com/file/d/1u0VZvzHz0NJB2cdD1X9ufgZbQvtZvtuQ/view
level: practitioner
date: 2026-07-07
published: 2022
tags: [方剤・中成薬, QC・品質評価, HPLC・UPLC, ケモメトリクス, 多成分定量]
digest_tagline: 温清飲（黄連解毒湯＋四物湯）の指標5成分を、クロマトで完全に分けきらないまま「数学的に分離」して10分で同時定量する。共溶出・溶媒ピーク・保持時間のズレがあっても二次校正（ATLD／ATLD-MCR）で各成分を解ける
digest_stats: [IF|約3.5（Chemosensors・MDPI／JCR目安）, 対象|温清飲(WQY)＝黄連解毒湯＋四物湯, 定量成分|5種（HMF・ペオニフロリン・フェルラ酸・バイカリン・ベルベリン）, 分析時間|10分（アイソクラティック溶出）, 検量線の相関r|0.9969–0.9996, 回収率|ATLD 91.8–112.5%／ATLD-MCR 88.6–101.6%, 市販品|3社（台湾）]
digest_points: [温清飲の指標5成分を、クロマトで完全分離せずに二次校正で「数学的に分離」して10分で同時定量する。HMFとペオニフロリン、フェルラ酸とバイカリンが共溶出し、溶媒ピークや未知妨害が重なっても、各成分の純クロマトグラム・純スペクトル・濃度を復元できる（＝二次の利点）, ベースラインのずれや軽い保持時間シフトはATLDが「妨害因子」として吸収する。最後に溶出するベルベリンで生じた深刻な保持時間シフトはATLD-MCRが解決し、ベルベリンの日間再現性RSDが40.8%から0.9%へ改善した, 予測濃度は標準と一致（対応のあるt検定でHMF・ペオニフロリン・フェルラ酸・バイカリンは有意差なし）。時間シフトが軽ければATLD、深刻ならATLD-MCRと使い分ければ、煩雑な前処理や長い分離時間なしで方剤の品質モニタリングに使える]
digest_chart_label: 日間再現性 RSD%（ATLD法・Table 2／低いほど安定）
digest_chart: [HMF|12.5, ペオニフロリン|2.7, フェルラ酸|4.5, バイカリン|3.2, ベルベリン|40.8]
summary: 中国・湖南大学のケモメトリクス研究室が、漢方方剤「温清飲（Wen-Qing-Yin, 黄連解毒湯＋四物湯）」中の指標5成分（5-ヒドロキシメチルフルフラール, ペオニフロリン, フェルラ酸, バイカリン, ベルベリン）を、HPLC-DAD（10分アイソクラティック）と二次校正アルゴリズム（ATLD／ATLD-MCR）を組み合わせて同時定量した研究（Chemosensors 2022）の全訳。ピークを完全分離せずとも「二次の利点」で数学的に分離できる原理、時間シフトへの対処、性能指標（LOD/LOQ/SEN/SEL）、2手法の比較を扱う。数値・図は原文どおり。
---

<!-- 方針: ほぼ全訳＋必要に応じた補足。原文構成に沿って訳出。「> 補足:」は訳者注。 -->

## 書誌情報

- 原題: High-Performance Liquid Chromatography–Diode Array Detection Combined with Chemometrics for Simultaneous Quantitative Analysis of Five Active Constituents in a Chinese Medicine Formula Wen-Qing-Yin
- 著者: Jun-Chen Chen, Hai-Long Wu（責任著者）, Tong Wang（責任著者）, Ming-Yue Dong, Yue Chen, Ru-Qin Yu（湖南大学 化学化工学院・化学/生物センシングとケモメトリクス国家重点実験室、中国・長沙）
- 掲載: *Chemosensors* 10 (2022) 238（Article, オープンアクセス CC BY 4.0）. https://doi.org/10.3390/chemosensors10070238
- インパクトファクター: **約3.5**（*Chemosensors*, MDPI／JCR目安。分析化学・センサー分野）
- 受理経過: 受領 2022-05-24 / 受理 2022-06-21 / 公開 2022-06-23
- 資金: 中国国家自然科学基金（No. 22174036, 21775039, 21575039）

> 補足（この解説の位置づけ）: 本研究の主役は分離カラムではなく**アルゴリズム**です。従来のHPLCが「物理的にピークを完全に分けきる」ことを目指すのに対し、本研究は**わざと分けきらず、重なったデータを数学（二次校正）で解く**という発想を採ります。当サイトの他の解説で扱う PLS・MCR・多変量校正の、クロマトグラフィーへの具体的応用例です。

## この論文が解く問題

漢方（伝統中国医薬, TCM）は多成分の集合体で、有効成分の含量が品質と効果を左右します。したがって有効成分の含量をモニタリングする方法が重要です。ところが従来のHPLCで多成分を「きれいに」定量しようとすると、次の壁にぶつかります。

- **完全分離のための煩雑な前処理**と、**長い溶出時間**（既報では1回の分析に30分超[30,31]）。
- 実試料ごとに変わる**未知の妨害（バックグラウンド）**。
- **ベースラインのずれ（baseline shift）**と**保持時間のずれ（time shift）**が定量精度を損なう。

本研究は、HPLC-DAD（ダイオードアレイ検出）で得られる情報豊富なデータに、**二次校正（second-order calibration）**という手法を組み合わせ、これらの問題を「数学的分離」で回避します。狙いは、**完全分離に頼らず・短時間で・妨害があっても**、方剤中の5成分を正確に同時定量することです。

## 対象：温清飲（Wen-Qing-Yin, WQY）と指標5成分

温清飲は、**黄連解毒湯（Huang-Lian-Jie-Du-Tang）**と**四物湯（Si-Wu-Tang）**を合わせた方剤で、当帰・白芍・熟地黄・川芎・黄連・黄芩・黄柏・山梔子から構成されます。主要成分はアルカロイド・フラボノイド・テルペン配糖体・イリドイド配糖体で[1,2]、抗酸化[3–5]・抗潰瘍[6–8]・抗炎症[9–12]・抗菌[13–15]・抗がん[16–18]活性が報告され、婦人科出血性疾患・皮膚疾患・再発性アフタ性潰瘍などに用いられます[19]。HMF・PAE・FER・BAI・BERの5つはWQYの指標成分であり[3,25–29]、多成分を同時定量する方法はUHPLC・HPLC・キャピラリー電気泳動とMS/DAD/UV等の組み合わせで多数開発されてきました[20–24]。

本研究が定量する指標成分は次の5つ（略号は原文どおり）:

| 略号 | 成分名（日本語） | 由来・分類 |
|---|---|---|
| HMF | 5-ヒドロキシメチルフルフラール | 加工・加熱で生成する糖分解物（血虚関連の指標） |
| PAE | ペオニフロリン（芍薬苷） | 白芍由来のモノテルペン配糖体 |
| FER | フェルラ酸 | 当帰・川芎由来のフェノール酸 |
| BAI | バイカリン（黄芩苷） | 黄芩由来のフラボノイド配糖体 |
| BER | ベルベリン（小檗鹼） | 黄連・黄柏由来のアルカロイド |

> 補足: 各成分の物理化学情報は原文の補足資料 Table S1 に、5成分は「多様な化学クラス（フェノール酸・配糖体・アルカロイド）」にまたがるため、1回の分析で同時に測るのは本来難しい対象です。

## 方法

### 試薬・標準品

5-ヒドロキシメチルフルフラール・ペオニフロリン・フェルラ酸・バイカリン・ベルベリンの標準品（純度 **≥98.0%**）は Macklin社（上海、中国）から購入した。超純水（18.2 MΩ・cm）は Milli-Q水精製システム（Millipore, Bedford, MA, USA）で調製した。HPLCグレードのアセトニトリル・メタノールは Sigma-Aldrich社（St. Louis, MO, USA）、HPLCグレードのギ酸は Thermo Fisher Scientific社（Waltham, MA, USA）から入手した。

標準品を適量メタノールに溶解してストック溶液を調製し、使用時にメタノールで希釈して**最終濃度 0.4–2.0 µg/mL** の標準作業溶液を新たに調製した。すべてのストック溶液は使用するまで**4℃**の冷蔵庫で保存した。

### クロマトグラフィー条件

- 装置: 島津 LC-20AT（ダイオードアレイ検出器・四元ポンプ・20 µL ループ）
- カラム: WondaSil™ C18（5 µm, 200 mm × 4.6 mm）、カラム温度 30 ℃、カラム圧 6.7 MPa
- 流速: 1.00 mL/min、注入量 20 µL
- 移動相: 0.1% ギ酸水溶液（A）／アセトニトリル（B）。**30% B のアイソクラティック（等組成）溶出**で、全成分が**10分以内**に溶出。ギ酸（最適 1.0 mL/L）を水相に加え分離能とピーク対称性を改善。

### 試料

- 実試料: 市販の温清飲3社品（いずれも台湾。Sun Ten・Kaiser・Sheng Chang を Q01〜Q03 と表記）。粉末1.00 gをメタノール10 mLに溶かし、30分超音波抽出→12時間静置→0.22 µm ナイロンフィルターで濾過。
- 検量線試料（C01〜C08）: 作業標準液をメタノールで希釈。共線性（成分間の相関）を減らすため**均一計画 U8\*(8⁵)** で濃度を設計。
- 添加回収試料（P01〜P06）: 実試料に既知量を添加。実試料中のBAI・BERはHMF・PAE・FERよりずっと高濃度のため、HMF/PAE/FER検出用は20倍希釈（P01–03）、BAI/BER検出用は50倍希釈（P04–06）と2段階で調製。

### 理論：三線成分モデルと「三次元データ」

各試料からは、**溶出時間 I 点 × 波長 J 点**の2次元データ行列が得られます。全 K 試料（検量線試料・添加回収試料・実試料を含む）を同条件で測り、試料方向に積み重ねると、**三次元配列 X（I × J × K）**になります。これは次式で表せます。

$$
x_{ijk} = \sum_{n=1}^{N} a_{in}\, b_{jn}\, c_{kn} + e_{ijk} \qquad (i=1,\dots,I;\ j=1,\dots,J;\ k=1,\dots,K) \tag{1}
$$

- $N$ は因子（factor）の総数＝目的成分＋共溶出する妨害＋バックグラウンド＋ベースラインのずれ＋ノイズ。
- $x_{ijk}$ は三次元配列 **X**（I×J×K）の要素で、試料 k・溶出時間 i・波長チャンネル j における応答値。
- $a_{in}$・$b_{jn}$・$c_{kn}$・$e_{ijk}$ はそれぞれ正規化クロマトグラム行列 **A**（I×N）・正規化UVスペクトル行列 **B**（J×N）・相対濃度行列 **C**（K×N）・三次元残差配列 **E**（I×J×K）の要素。

> 補足（なぜ「三次元」だと強いのか＝二次の利点）: 各成分は「固有のクロマト形状（溶出プロファイル）」と「固有のUVスペクトル」という**2つの指紋**を持ちます。データを時間×波長×試料の三次元にすると、この2指紋の組み合わせが各成分ごとに一意になり、**未知の妨害が混ざっていても目的成分だけを抜き出せます**。これが「二次校正（second-order calibration）」がもつ **二次の利点（second-order advantage）**[32]で、著者らはこれを「数学的分離（mathematical separation）」と呼びます。物理的に分けきれなくても、計算で分けられる、というわけです。

### アルゴリズム① ATLD（交替三線分解）

ATLD（alternating trilinear decomposition, Wu ら 1996/1998[33]）は、**推定因子数に鈍感**で**収束が速い**アルゴリズムです（スライス行列の三線構造を使う）。HPLC-DAD・LC-MS・液体クロマト蛍光検出など大規模データの処理に向きます。特長として、

- **因子数を増やすことでバックグラウンドを近似**でき、ベースラインのずれを「妨害の一部」として除去できる[34]。
- **軽い保持時間シフトは許容**できる（ただし深刻なシフトには不向き）。

ATLDは、特異値分解に基づくMoore–Penrose一般化逆行列を用いて、次の3つの目的関数を交互に最小化し、定性行列（**A**・**B**）と相対濃度行列（**C**）を求めます。

$$
\sigma(\mathbf{A}) = \sum_{i=1}^{I} \left\| \mathbf{X}_{i \cdot \cdot} - \mathbf{B}\,\mathrm{diag}\big(\mathbf{a}(i)\big)\,\mathbf{C}^{T} \right\|_F^2 \tag{2}
$$

$$
\sigma(\mathbf{B}) = \sum_{j=1}^{J} \left\| \mathbf{X}_{\cdot j \cdot} - \mathbf{C}\,\mathrm{diag}\big(\mathbf{b}(j)\big)\,\mathbf{A}^{T} \right\|_F^2 \tag{3}
$$

$$
\sigma(\mathbf{C}) = \sum_{k=1}^{K} \left\| \mathbf{X}_{\cdot \cdot k} - \mathbf{A}\,\mathrm{diag}\big(\mathbf{c}(k)\big)\,\mathbf{B}^{T} \right\|_F^2 \tag{4}
$$

ここで $\mathbf{X}_{i\cdot\cdot}$・$\mathbf{X}_{\cdot j\cdot}$・$\mathbf{X}_{\cdot\cdot k}$ は三次元配列 **X** を各次元でスライスした行列、$\mathrm{diag}(\cdot)$ はベクトルの各成分を対角要素とする行列、$\|\cdot\|_F$ はフロベニウスノルム。詳細な理論は原著[33]を参照。

### アルゴリズム② ATLD-MCR

ATLD-MCR（Wang ら 2019[35]）は、**液体クロマトデータの保持時間シフト問題を解ける**新しいアルゴリズムです。手順は、(1) まずATLDでシフトのあるデータを近似し、初期スペクトル行列 $\mathbf{B}^{(\mathrm{ini})}$ を得る、(2) MCR（多変量曲線分解）戦略で各試料の保持時間プロファイル行列 $\mathbf{A}_k$ を最小二乗計算で求める（$\mathbf{X}_{\cdot\cdot k}$ は各試料のスライス行列）、(3) 定性情報（$\mathbf{A}_k$・**B**）と定量情報（**C**）を得る、という3段階です。

$$
\mathbf{A}_k = \mathbf{X}_{\cdot\cdot k} \left(\mathbf{D}_k \mathbf{B}^{T}\right)^{+} \qquad (k=1,2,\dots,K) \tag{5}
$$

$$
\mathbf{B} = \left[\sum_{k=1}^{K} \mathbf{X}_{\cdot\cdot k}^{T}\, \mathbf{A}_k \mathbf{D}_k \right] \left[\sum_{k=1}^{K} \mathbf{D}_k \mathbf{A}_k^{T} \mathbf{A}_k \mathbf{D}_k \right]^{-1} \tag{6}
$$

$$
\mathbf{c}(k) = \left[ (\mathbf{B}^{T}\mathbf{B}) \times (\mathbf{A}_k^{T}\mathbf{A}_k) \right]^{-1} \mathrm{diag}\!\left[\mathbf{A}_k^{T}\mathbf{X}_{\cdot\cdot k}\mathbf{B}\right]^{T} \qquad (k=1,2,\dots,K) \tag{7}
$$

ここで $+$ はMoore–Penrose一般化逆行列、$\times$ はアダマール積（要素ごとの積）、$^{-1}$ は行列の逆行列、$\mathrm{diag}(\cdot)$ は角行列の対角要素を取り出して列ベクトル化する操作。

> 補足: $\mathbf{D}_k$（式5・6中の重み行列）について、原文はこの記号を式中で導入していますが、その定義式は本文には明記されておらず、ATLDで得た初期近似（保持時間プロファイルに関する重み付け）に基づくと推察されます。正確な定義が必要な場合は原著[35]（J. Chromatogr. A 1605, 2019, 360360）を参照してください。要するに、ATLD-MCRは**試料ごとに少しずつずれるピーク位置を個別に合わせ込みつつ、二次の利点を保つ**手法です。

## 結果と考察

### なぜ従来分離では難しいか（Figure 1）

![Figure 1. (a) 混合標準液（C06）の2次元等高線プロファイル、(b) 8つの検量線試料の260 nm溶出プロファイル、(c) 混合標準液の多波長クロマトグラム、(d) 6つの予測試料の260 nm溶出プロファイル。HMFとPAEは急速溶出時に激しく重なり（見かけ上1本のピーク・溶媒ピークの影響大）、FERとBAIも共溶出する。実試料では未知成分が目的ピークに重なる。](assets/wqy-hplc-dad-atld-mcr-secondorder/fig1-2dcontour-chromatograms.png)

5成分は10分以内に溶出し各ピークは鋭いものの、**HMFとPAEは急速溶出時に激しく重なり**（見かけ上1本のピークにしか見えず、溶媒ピークの影響も大）、**FERとBAIも共溶出**します。実試料（d）では未知成分・妨害が目的ピークに重なります。つまり**古典的HPLCだけでは満足な普遍的分離は難しい**——ここで HPLC-DAD ＋ 二次校正の出番になります。なお同日測定では明瞭なピークずれ・深刻な時間シフトは見られませんでした（b）。

分析では、無効な情報を除き分解能を上げるため、溶出時間で**2つの部分領域**に分割しています。第1領域にHMF・PAE、第2領域にBAI・FER・BERを置き、各領域で推定因子数 N（目的成分＋妨害信号の数）を設定しました（詳細は補足 Table S3）。

### 2手法による成分の分離復元（Figure 2・3）

![Figure 2. ATLDアルゴリズムが2つの三次元部分配列から復元した、正規化クロマトグラム（a1, a2）・正規化スペクトル（b1, b2）・相対濃度プロファイル（c1, c2）。](assets/wqy-hplc-dad-atld-mcr-secondorder/fig2-atld-resolved.png)

![Figure 3. ATLD-MCRアルゴリズムが復元した、正規化クロマトグラム（a1, a2）・正規化スペクトル（b1, b2）・相対濃度プロファイル（c1, c2）。](assets/wqy-hplc-dad-atld-mcr-secondorder/fig3-atldmcr-resolved.png)

ATLD・ATLD-MCRのいずれでも、**溶媒ピーク・ピーク重なり・未知成分の共溶出があっても**、情報豊富なHPLC-DADデータ配列から各成分の純クロマトグラム・純スペクトルをうまく抽出でき、復元プロファイルは実際のプロファイルとよく一致しました。特に、保持時間が近く溶媒ピークの妨害を受けるHMFとPAEでも満足な定性結果が得られています。

### 正確さと精度（Table 1）

相対濃度 C を実濃度に対して回帰する（擬一変量検量線）ことで、未知試料中の絶対濃度が求まります。

**Table 1. 添加予測試料（P01–06）での5成分の正確さ（ATLD／ATLD-MCR）**

| | HMF | PAE | FER | BAI | BER |
|---|---|---|---|---|---|
| **ATLD** 相関 r | 0.9991 | 0.9993 | 0.9996 | 0.9969 | 0.9978 |
| 平均回収率±SD (%) | 94.7±2.5 | 91.8±5.0 | 93.9±3.5 | 104.3±9.7 | 112.5±5.1 |
| RMSEP (µg/mL) | 0.20 | 2.07 | 0.38 | 3.94 | 4.05 |
| **ATLD-MCR** 相関 r | 0.9992 | 0.9995 | 0.9993 | 0.9985 | 0.9973 |
| 平均回収率±SD (%) | 93.3±1.4 | 92.4±5.7 | 88.6±3.5 | 101.6±9.9 | 96.8±10.3 |
| RMSEP (µg/mL) | 0.30 | 1.85 | 0.69 | 3.04 | 1.53 |

（r＝相関係数、AVG±SD＝平均添加回収率±標準偏差、RMSEP＝予測の相対二乗平均平方根誤差）

ATLDでは回収率91.8–112.5%（SD<9.7%）、r 0.9969–0.9993、RMSEP<4.05。ATLD-MCRでは r 0.9973–0.9995、RMSEP<3.04、回収率88.6–101.6%（SD<10.3%）。両者は近い結果ですが、**ATLD-MCRのRMSEPは小さく**、いずれの回収率も許容範囲でした。

### 再現性（Table 2）と性能指標

同一バッチの実試料を同日3回・連続3日で測り、日内・日間精度（RSD%）を求めました。**日間再現性はATLD-MCRがATLDより良好**でした。とりわけ**ベルベリン（BER）は、ATLDでの日間RSDが40.8%**と大きく悪化——これは連続日測定で生じた深刻な保持時間シフトのためです（補足 Figure S1）。最初の4成分は急速溶出のため軽い時間ドリフトはATLDが妨害として除去できましたが、**最後に溶出するBERのシフトは別アルゴリズム（ATLD-MCR）で解く必要**がありました。ATLD-MCRではBERの日間RSDは0.9%まで改善しています。日内RSDは総じて日間RSDより小さい値でした。

性能を評価する指標として、選択性(SEL)・感度(SEN)・検出限界(LOD)・定量限界(LOQ)を算出し、精度(RSD%)と併せてTable 2にまとめました。これらの数理的定義（$SEL_n$・$SEN_n$・$LOD_n$・$LOQ_n$の算出式。正規化行列 **A**・**B**、対象成分nの全応答信号$l_n$、未知試料中の予測濃度の標準偏差$\sigma_x$、ブランク試料でのレバレッジ$h_0$等を用いる）は既報[36]で詳しく論じられているため、ここでは繰り返しません。

**Table 2. 温清飲実試料における5成分の性能指標と精度（ATLD／ATLD-MCR、n=3）**

| 指標 | 手法 | HMF | ペオニフロリン | フェルラ酸 | バイカリン | ベルベリン |
|---|---|---|---|---|---|---|
| SEL（選択性） | ATLD | 0.49 | 0.52 | 0.56 | 0.43 | 0.20 |
| SEL（選択性） | ATLD-MCR | 0.15 | 0.23 | 0.35 | 0.13 | 0.19 |
| SEN（感度, mAU·mL/µg） | ATLD | 8.46×10⁴ | 1.04×10⁴ | 1.24×10⁵ | 3.00×10⁴ | 2.46×10⁴ |
| SEN（感度, mAU·mL/µg） | ATLD-MCR | 3.09×10⁴ | 7.74×10³ | 7.93×10⁴ | 9.11×10³ | 2.24×10⁴ |
| LOD（µg/mL） | ATLD | 0.95 | 1.84 | 0.07 | 4.94 | 11.67 |
| LOD（µg/mL） | ATLD-MCR | 0.22 | 1.12 | 0.17 | 4.53 | 0.84 |
| LOQ（µg/mL） | ATLD | 2.85 | 5.59 | 0.22 | 14.98 | 35.37 |
| LOQ（µg/mL） | ATLD-MCR | 0.65 | 3.40 | 0.51 | 13.72 | 2.54 |
| 日内RSD%（n=3） | ATLD | 9.65 | 3.24 | 0.67 | 2.12 | 5.22 |
| 日内RSD%（n=3） | ATLD-MCR | 3.04 | 1.12 | 1.33 | 1.83 | 0.36 |
| 日間RSD%（n=3） | ATLD | 12.47 | 2.72 | 4.47 | 3.16 | 40.82 |
| 日間RSD%（n=3） | ATLD-MCR | 2.90 | 1.64 | 2.65 | 2.14 | 0.92 |

SELはATLDで0.20–0.56、ATLD-MCRで0.13–0.35といずれも低めの値でした。これはピーク重なりと未知妨害の影響が大きいためです。SENはATLDで1.04×10⁴〜1.24×10⁵、ATLD-MCRで7.74×10³〜7.93×10⁴（mAU·mL/µg）でした。LODはATLDで0.07–11.67、ATLD-MCRで0.22–4.53（µg/mL）で、**ATLDのBERのLODは検量線最低濃度を下回っており**（時間シフトの影響）、その点でもATLD-MCRの結果の方が妥当でした。

### 2手法の統計的比較

対応のある両側t検定では、HMF・PAE・FER・BAIの p 値は 0.358・0.258・0.063・0.332で**有意差なし**。一方 BER は p=0.001 で、保持時間シフトの影響により有意差が出ました。結論として——**溶出時間が十分短く保持時間シフトが軽微なら ATLD を直接使え**、良好な再現性が得られます。**保持時間シフトが深刻なら ATLD-MCR** がその影響をうまく処理し、HPLC-DADによる主要有効成分の正確な定量を助けます。実際、他の2社の市販温清飲品にはATLD-MCRを適用しています（補足 Table S6）。

## 結論

HPLC-DAD と二次校正を組み合わせることで、温清飲中の5成分を**同時・迅速**に定量できました。全成分が検量線範囲で良好な直線性を示し、軽い時間シフトを含むデータには高感度・省時間で対応、深刻な時間シフトには ATLD-MCR が適切に対処しました。温清飲を例に、本戦略が**方剤（漢方）の有効成分定量と品質モニタリングの信頼できるツール**になりうることが示されました。

## 参考文献

1. Zhou, F.; Li, J.; He, Y.; Mu, R.; Fu, C. Simultaneous determination of eight components in Siwu decoction by HPLC and analysis of transmitting of the components in water extraction and ethanol precipitation process. Chin. J. Pharm. Anal. 2019, 39, 983–991.
2. Qi, Y.; Zhang, Q.; Zhu, H. Huang-Lian Jie-Du decoction: A review on phytochemical, pharmacological and pharmacokinetic investigations. Chin. Med. 2019, 14, 57.
3. Xu, Z.F.; Feng, W.; Shen, Q.; et al. Rhizoma Coptidis and Berberine as a Natural Drug to Combat Aging and Aging-Related Diseases via Anti-Oxidation and AMPK Activation. Aging Dis. 2017, 8, 760–777.
4. Zdunska, K.; Dana, A.; Kolodziejczak, A.; Rotsztejn, H. Antioxidant properties of ferulic acid and its possible application. Ski. Pharmacol. Physiol. 2018, 31, 332–336.
5. Grzegorczyk-Karolak, I.; Golab, K.; Gburek, J.; Wysokinska, H.; Matkowski, A. Inhibition of advanced glycation end-product formation and antioxidant activity by extracts and polyphenols from Scutellaria alpina L. and S. altissima L. Molecules 2016, 21, 739.
6. Sun, Y.; Lenon, G.B.; Yang, A.W.H. Phellodendri cortex: A phytochemical, pharmacological, and pharmacokinetic review. Evid. Based Complement. Altern. Med. 2019, 2019, 7621929.
7. Yuan, Z.W.; Yang, L.H.; Zhang, X.S.; et al. Mechanism of Huang-lian-Jie-du decoction and its effective fraction in alleviating acute ulcerative colitis in mice. J. Ethnopharmacol. 2020, 259, 112872.
8. Zheng, Y.H.; You, X.R.; Guan, S.Y.; et al. Poly (ferulic acid) with an anticancer effect as a drug nanocarrier for enhanced colon cancer therapy. Adv. Funct. Mater. 2019, 29, 1808646.
9. Kim, K.S.; Rhee, H.I.; Park, E.K.; et al. Anti-inflammatory effects of Radix Gentianae Macrophyllae (Qinjiao), Rhizoma Coptidis (Huanglian) and Citri Unshiu Pericarpium in animal models. Chin. Med. 2008, 3, 1–7.
10. Meng, F.C.; Wu, Z.F.; Yin, Z.Q.; Lin, L.G.; Wang, R.; Zhang, Q.W. Coptidis rhizoma and its main bioactive components: Recent advances in chemical investigation, quality evaluation and pharmacological activity. Chin. Med. 2018, 13, 1–18.
11. Kang, O.H.; Chae, H.S.; Oh, Y.C.; et al. Anti-nociceptive and anti-inflammatory effects of Angelicae dahuricae radix through inhibition of iNOS expression and NO production. Am. J. Chin. Med. 2008, 36, 913–928.
12. Liao, H.F.; Ye, J.; Gao, L.L.; Liu, Y.L. The main bioactive compounds of Scutellaria baicalensis Georgi. for alleviation of inflammatory cytokines: A comprehensive review. Biomed. Pharmacother. 2021, 133, 110917.
13. Lu, Y.J.; Joerger, R.; Wu, C.Q. Study of the chemical composition and antimicrobial activities of ethanolic extracts from roots of Scutellaria baicalensis Georgi. J. Agric. Food Chem. 2011, 59, 10934–10942.
14. Qian, W.; Zhang, J.; Wang, W.; et al. Antimicrobial and antibiofilm activities of paeoniflorin against carbapenem-resistant Klebsiella pneumoniae. J. Appl. Microbiol. 2020, 128, 401–413.
15. Lin, S.J.; Chen, C.S.; Lin, S.S.; et al. In vitro anti-microbial and in vivo cytokine modulating effects of different prepared Chinese herbal medicines. Food Chem. Toxicol. 2006, 44, 2078–2085.
16. Wang, H.; Chan, Y.L.; Li, T.L.; Wu, C.J. Improving cachectic symptoms and immune strength of tumour-bearing mice in chemotherapy by a combination of Scutellaria baicalensis and Qing-Shu-Yi-Qi-Tang. Eur. J. Cancer 2012, 48, 1074–1084.
17. Chen, Z.; Liu, W.M.; Qin, Z.G.; Liang, X.T.; Tian, G.R. Geniposide exhibits anticancer activity to medulloblastoma cells by downregulating microRNA-373. J. Biochem. Mol. Toxicol. 2020, 34, e22471.
18. Ma, Z.; Otsuyama, K.; Liu, S.Q.; et al. Baicalein, a component of Scutellaria radix from Huang-Lian-Jie-Du-Tang (HLJDT), leads to suppression of proliferation and induction of apoptosis in human myeloma cells. Blood 2005, 105, 3312–3318.
19. Koda, A.; Ono, Y.; Nishiyori, T.; et al. Immunopharmacological studies of Wen-Qing-Yin, a chinese blended medicine: Effects of type IV allergic reactions and humoral antibody production. Int. J. Immunopharmacol. 1987, 9, 289–295.
20. Zheng, Z.J.; Zhao, X.E.; Zhu, S.Y.; et al. Simultaneous determination of oleanolic acid and ursolic acid by in vivo microdialysis via UHPLC-MS/MS. J. Agric. Food Chem. 2018, 66, 3975–3982.
21. Liu, Y.K.; Zhou, W.; Mao, Z.K.; Liao, X.Y.; Chen, Z.L. Analysis of six active components in Radix tinosporae by nonaqueous capillary electrophoresis with mass spectrometry. J. Sep. Sci. 2017, 40, 4628–4635.
22. Zhang, Y.; Zou, Z.Z.; Chou, G.X. Fast simultaneous detection of three diterpenoids in Herba Siegesbeckiae using solid phase extraction followed by HPLC-UV with a core-shell particle column. Anal. Methods 2018, 10, 1325–1330.
23. Li, Y.Y.; Guo, M.Q.; Li, X.M.; Yang, X.W. Simultaneous qualitative and quantitative evaluation of the Coptidis Rhizoma and Euodiae Fructus herbal pair by using UHPLC-ESI-QTOF-MS and UHPLC-DAD. Molecules 2020, 25, 4782.
24. Fu, S.; Cheng, R.R.; Xiang, Z.L.; Deng, Z.X.; Liu, T.G. Rapid profiling of chemical constituents in Qingfei Paidu granules using HPLC coupled with Q exactive mass spectrometry. Chromatographia 2021, 84, 1035–1048.
25. Committee, N.P. Pharmacopoeia of the People's Republic of China 2020; China Medical Science Press: Beijing, China, 2020.
26. Zhang, W.S.; Cui, N.; Su, F.Z.; et al. Comprehensive Metabolomics and Network Pharmacology to Explore the Mechanism of 5-Hydroxymethyl Furfural in the Treatment of Blood Deficiency Syndrome. Front. Pharmacol. 2022, 12, 811331.
27. Huang, T.; Liu, Y.A.; Zhang, C.L. Pharmacokinetics and Bioavailability Enhancement of Baicalin: A Review. Eur. J. Drug Metab. Pharmacokinet. 2019, 44, 159–168.
28. Wang, J.; Yuan, Z.; Zhao, H.P.; et al. Ferulic acid promotes endothelial cells proliferation through up-regulating cyclin D1 and VEGF. J. Ethnopharmacol. 2011, 137, 992–997.
29. Jiao, F.; Varghese, K.; Wang, S.; et al. Recent Insights Into the Protective Mechanisms of Paeoniflorin in Neurological, Cardiovascular, and Renal Diseases. J. Cardiovasc. Pharmacol. 2021, 77, 728–734.
30. Yeh, C.C.; Huang, S.S.; Liu, P.Y.; et al. Simultaneous quantification of six indicator compounds in Wen-Qing-Yin by high-performance liquid chromatography-diode array detection. J. Food Drug Anal. 2019, 27, 749–757.
31. Chang, Y.X.; Ge, A.H.; Yu, X.A.; et al. Simultaneous determination of four phenolic acids and seven alkaloids in rat plasma after oral administration of Jinqi Jiangtang Tablet by LC-ESI–MS/MS. J. Pharm. Biomed. Anal. 2016, 117, 1–10.
32. Wu, H.L.; Nie, J.F.; Yu, Y.J.; Yu, R.Q. Multi-way chemometric methodologies and applications: A central summary of our research work. Anal. Chim. Acta 2009, 650, 131–142.
33. Wu, H.L.; Shibukawa, M.; Oguma, K. An alternating trilinear decomposition algorithm with application to calibration of HPLC–DAD for simultaneous determination of overlapped chlorinated aromatic hydrocarbons. J. Chemom. 1998, 12, 1–26.
34. Zhang, Y.; Wu, H.L.; Xia, A.L.; Hu, L.H.; Zou, H.F.; Yu, R.Q. Trilinear decomposition method applied to removal of three-dimensional background drift in comprehensive two-dimensional separation data. J. Chromatogr. A 2007, 1167, 178–183.
35. Wang, T.; Wu, H.L.; Yu, Y.J.; et al. A simple method for direct modeling of second-order liquid chromatographic data with retention time shifts and holding the second-order advantage. J. Chromatogr. A 2019, 1605, 360360.
36. Olivieri, A.C. Analytical figures of merit: From univariate to multiway calibration. Chem. Rev. 2014, 114, 5358–5378.

## 訳者補足（要点と漢方QCへの示唆）

- **「分離を計算に肩代わりさせる」発想**: 本研究の核心は、クロマトで**完全分離せず**（10分アイソクラティック）に、重なったデータを**二次校正で数学的に分離**する点です。前処理と分離時間を削れるので、多成分の方剤を数を絞らずに素早く測りたい品質モニタリング用途と相性が良い。当サイトで扱う QAMS（1標準で多成分定量）とは別方向の「省力化」アプローチとして対比すると理解しやすい。
- **ATLD と ATLD-MCR の使い分け**が実務メッセージ: 保持時間のずれが軽ければ ATLD（速い・因子数に鈍感）、深刻なら ATLD-MCR（試料ごとにピーク位置を合わせ込む）。**最後に溶出する成分ほど時間シフトの影響を受けやすい**（本例のベルベリン）ため、遅く出る成分がある系では ATLD-MCR を選ぶ、という指針になる。
- **統計の読みどころ**: 相関係数 r で直線性、回収率±SD で正確さと分散、RMSEP で予測誤差、LOD/LOQ で検出・定量の下限、SEN/SEL で感度・選択性、RSD% で再現性、対応のあるt検定で2手法の差——と、多変量校正の性能を評価する一式が揃っています。統計検定2級からの橋渡しとしては「単回帰（検量線）＋分散の指標（SD/RSD）＋2群の差の検定（対応のあるt検定）」に、多変量特有の SEN/SEL/二次の利点が乗った構成、と捉えると読みやすい。
- **数値の扱い**: 本文・Table 1／2 の値は原文どおり転記。補足資料（Table S1〜S6, Figure S1）は本体PDFに含まれないため、詳細は原文（Supporting Information）参照。
