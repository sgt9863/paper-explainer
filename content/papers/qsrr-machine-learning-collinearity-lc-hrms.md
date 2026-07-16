---
title: 機械学習によるLC-HRMS保持予測のためのQSRRモデリング — 4アルゴリズムの比較と「共線性」の影響評価
slug: qsrr-machine-learning-collinearity-lc-hrms
source_pdf: 1s2.0S1570023222000368main.pdf
doi: https://doi.org/10.1016/j.jchromb.2022.123132
drive_url: (未アップロード：ユーザー返却PDF)
level: researcher
date: 2026-07-08
published: true
tags: [メソッド開発・QbD, 機械学習・データ処理, 質量分析]
digest_tagline: 分子記述子×4つの機械学習で保持時間を予測し、「特徴量どうしの高相関（共線性）」が予測精度に効くのかを初めて体系検証
digest_stats: [IF|2.97（J. Chromatogr. B・JCR2024・Q2）, 手法|QSRR＋機械学習4種（BRidgeR／SVRl／SVRnl／XGBR）, データ|自家7＋外部5＝12データセット・計約1300化合物, 記述子|RDKitで200個算出, 検証|入れ子10分割CV・144組合せ]
digest_points: [高相関特徴量（共線性）を段階的に除去しても82.6%のケースで予測性能に統計的有意差なし＝選んだ回帰法は共線性に頑健, どのアルゴリズムも全データセットで一貫して最良にはならず「データごとに最適法を選べ」が結論, XGBRは自家データで好成績だが大規模外部データ（METLIN SMRT）ではむしろ最下位で挙動が不安定]
digest_chart_label: 外部データセットSMRT_100のMedAE（秒・CC=0.90構成）
digest_chart: [BRidgeR|79.8, SVRl|89.0, SVRnl|85.4, XGBR|107.4]
summary: 分子記述子と4種の機械学習回帰（ベイズリッジ・XGBoost・線形/非線形SVR）でLC-HRMSの保持時間を予測するQSRRモデルを構築し、12のLCデータセットで比較。特徴量間の「共線性（高相関）」を段階除去してもほとんどのケースで性能に有意差はなく、選んだ回帰法が共線性に頑健であること、そして万能の最良アルゴリズムは存在せずデータごとに選ぶべきことを示した。
---

<!--
Liapikos et al., J. Chromatogr. B 1191 (2022) 123132 の全訳密度日本語版。
機械学習・統計手法が中心のため researcher レベル。表2（MedAE性能）は全数値を表で保持。
図（Fig.1–3）とSI（ST1–4, SF1–14）は原文参照。
-->

## 書誌情報

- 標題（原題）: Quantitative structure retention relationship (QSRR) modelling for Analytes' retention prediction in LC-HRMS by applying different Machine Learning algorithms and evaluating their performance
- 著者: T. Liapikos, C. Zisi, D. Kodra, K. Kademoglou, D. Diamantidou, O. Begou, A. Pappa-Louisi, G. Theodoridis（責任著者 T. Liapikos）
- 所属: アリストテレス大学テッサロニキ校 化学科（ギリシャ）／ Biomic_AUTh, 学際研究イノベーションセンター（CIRI-AUTH）
- 掲載誌・巻号・DOI: Journal of Chromatography B, 1191 (2022) 123132. DOI: 10.1016/j.jchromb.2022.123132
- インパクトファクター: 2.97（Journal of Chromatography B, JCR 2024 / Clarivate。Q2）
- 受理経過: 2021年9月22日受領／2022年1月12日改訂／1月16日受理／1月19日オンライン公開。© 2022 Elsevier B.V.
- コード・データ公開: GitHub（https://github.com/TheoLiapikos/QSRR_prediction_models_JCB）

> 補足: 本論文は生薬QCそのものではないが、「化合物の構造・物性から保持時間を予測する（QSRR＝定量的構造保持相関）」手法と、機械学習の使い分け・共線性の扱いという方法論を扱う。多成分HPLC/LC-MSの条件設計やピーク帰属に応用できる基礎技術であり、メタボロミクスでの物質同定の信頼性向上を狙う。

## 要旨（Abstract）

メタボロミクスでは、アナライトの構造的・物理化学的特性に基づく保持予測法が開発されてきた。こうした手法は、実験的に得た保持時間（*t*<sub>R</sub>）と種々の構造的・物理化学的記述子とを対応づける回帰モデル（＝定量的構造保持相関, QSRR モデル）を、機械学習アルゴリズムを活用して構築する。

本研究では、4つの機械学習回帰アルゴリズム、すなわち Bayesian Ridge Regression（BRidgeR）、Extreme Gradient Boosting Regression（XGBR）、および線形・非線形カーネルの双方を用いた Support Vector Regression（SVR）を適用して QSRR モデルを構築した。これらは、分子の物理・化学・構造特性を記述する「分子記述子（Molecular Descriptors）」を用い、実験的に得たクロマトグラフィーデータと公開データの双方に対する保持予測能を検証・比較した。利用可能なデータセットについて、含まれる高相関特徴量の水準（データセットの任意の特徴量ペア間で計算されるピアソン相関係数の絶対値の最大値と定義）の観点から様々な構成（configurations）を並行して解析した。

我々の知る限り、これは共線性（collinearity）が QSRR 予測モデルの性能に及ぼす影響を検討した初の研究である。研究した大半のケースで、指定したデータセット構成間で生成された QSRR 予測モデルの性能に統計的有意差はなく、選択した回帰アルゴリズムが共線性を効果的に扱える能力を示唆した。個々の回帰アルゴリズムの性能に関しては、研究データセット全体を通じて、あるアルゴリズム（またはアルゴリズム群）が他より有意に突出するというパターンは見られなかった。

## 1. 序論（Introduction）

液体クロマトグラフィー（LC）と質量分析（MS）の連結は、アナライトの同定・アノテーションに非常に重要な情報を提供するが、非標的分析で複雑試料を分析する場合、確実性を与えるとは限らない。アナライトの同定は時間と資源を消費し、メタボロミクスの主要なボトルネックとなる。このため、過去数十年間、保持モデリングと保持予測が研究者の関心を集めてきた。保持モデルを適応・適用することで、MSデータと直交する（orthogonal）クロマトグラフィー保持情報を代謝物同定・報告に活用でき、同定の信頼性を高められると期待される。この保持情報は、これまでMSデータと比べてはるかに限定的にしか使われてこなかった。

保持モデリングには様々な方法論が開発されてきた。定量的構造保持相関（QSRR）は、(a) 保持予測と溶質のアノテーション、(b) 構造的分子記述子の予測、(c) 分離機構の理解、という複数用途を持つためクロマトグラフィー分析における強力なツールである。QSRRモデルは、溶質の保持時間（*t*<sub>R</sub>）と分子の物理化学的特性の関係を記述する数理モデルであるため、既知の化学構造を要する。分子の物理化学的特性は、分子記述子によって定量値として表現される。分子記述子は、0D（化学式由来）、1D（部分構造記述子）、2D（トポロジカル記述子）、3D（幾何学的記述子）、4D（立体電子記述子）に分類できる。2Dと3Dが QSRR モデルで最も頻繁に使われるとされる。

分子記述子の計算には複数のソフトウェア（Dragon, VolSurf+, RDKit, RCDK, Padel, Mordred, ChemoPy）が利用可能だが、いずれも分子の化学構造からSMILESやInChIキーといった分子表現を、PubChem・ChemAxon・ChemSpiderといったオープンアクセスデータベースを通じて決定しておく必要があり、任意で最適化（HyperChem, ChemAxon）すべきである。膨大な数の分子記述子（特徴量）は扱いが困難なため、特徴量のフィルタリングが適用されることがある。あるいは、QSRRモデルのための分子記述子の事前選択が好まれる。QSRRは線形溶媒強度モデル（LSS）と組み合わせたり、あるいは同一溶出条件下で第2のクロマトグラフィーカラムで得たアナライトの *t*<sub>R</sub> を追加項としてモデルに加えるよう修正したりでき、これがモデルの精度と予測能の向上につながる。さらにQSRRモデルを適用することでカラム分類も達成できる。

QSRRモデル開発には、機械学習アルゴリズム（重回帰、Lasso回帰、Ridge回帰、ランダムフォレスト回帰、サポートベクター回帰、部分最小二乗回帰）を採用して予測能を比較できる。重回帰（MLR）は最も単純で最も頻繁に適用されるが、多数の特徴量を用いる場合、特にデータセットのサンプル数を超える場合には不適切である。加えてMLRは高相関特徴量（共線性）の存在に非常に敏感で、モデルへの小さな変化にも不安定になる。共線性に対処しモデルの性能と頑健性を高めるため、LassoやRidgeなどいくつかの線形アルゴリズムが開発されてきた。

データセットの共線性を扱う最も一般的な手法は、特徴量に対する特徴量エンジニアリング（Feature Engineering）技術の実装である。これには、特徴量間の相関（ピアソン相関係数）や分散拡大係数（VIF）の計算に基づいて適切なフィルタリング手順を実装し、データセットの全利用可能特徴量から適切な部分集合を選ぶ「特徴量選択（Feature Selection）」技術が含まれる。同じカテゴリーには、主成分分析などの次元削減技術を含む「特徴量抽出（Feature Extraction）」技術も入り、元の特徴量集合を適切に互いに組み合わせて、少数の無相関特徴量から成る、データセットをより効果的に記述する新しい集合を生成する。モデルの性能は、平均絶対誤差（MAE）や二乗平均平方根誤差（RMSE）といった異なる統計的基準で評価できる。

本研究では、4つの機械学習回帰アルゴリズム（Bayesian Ridge Regression、Extreme Gradient Boosting Regression、線形・非線形カーネルの双方を用いた Support Vector Regression）を適用して QSRR モデルを構築し、実験クロマトグラフィーデータに対する保持予測能を検証・比較した。各アナライトデータセットの各分子について、RDKitライブラリ（オープンソースのケモインフォマティクスソフト）を用いて計200個の分子記述子を計算した。一連の適切なフィルタリング手順を適用して各データセットの初期特徴量集合を決定した。

本研究の重要な対象は、解析データ中の高相関特徴量（共線性）の存在である。これらはMLRのようなアルゴリズムの性能に大きく影響し、冗長な情報を運ぶことでモデルの複雑さを不当に増大させる。共線性が選択したアルゴリズムの性能に及ぼす影響を研究するため、各データセットについてその特徴量（分子記述子）の3つの異なる部分集合を研究した。すなわち、上述の初期特徴量集合と、ピアソン相関係数の閾値としてそれぞれ 0.96 と 0.90 を用いて高相関特徴量を異なる程度で除去した2つの追加集合である。

## 2. 材料と方法（Materials and methods）

### 2.1 材料 — Merck MSMLS プレートとアナライト

LC-MS分析グレードのメタノールとアセトニトリルは VWR Chemicals（ドイツ・ダルムシュタット）から供給。ギ酸アンモニウム（>98–100%）は Sigma-Aldrich（Merck）から購入。超純水は Milli-Q 精製システムで 18.2 MΩ·cm（25℃）で供給。標準物質ライブラリ MSMLS（Mass Spectrometry Metabolite Library of Standards）、BACSMLS（胆汁酸/カルニチン/ステロール）、FAMLS（脂肪酸）は Merck（ドイツ）から入手。

全アナライトは Sigma（高純度 >95%）から入手し、逆相カラム Supelco Ascentis® Express AQ-C18（100×2.1 mm, 2.7 μm）と AQ-C8（100×2.1 mm, 2.7 μm）で正・負イオン化モードで分析した。

### 2.2 装置分析とLC-MSによるデータ取得

自家データセットについては、Elute LC システム（Bruker, ドイツ）を用いた逆相LCで実験 *t*<sub>R</sub> を取得。カラムは AQ-C18 または AQ-C8（同上）。移動相は溶媒A（0.01% v/v ギ酸含有超純水）、溶媒B（0.01% v/v ギ酸含有アセトニトリル）。勾配溶出は以下の通り: 0–1分 99%A；1–3分 99→85%A；3–6分 85→50%A；6–9分 50→5%A；9–10分 5%A。各注入前にカラムの平衡化時間4分を固定。流速 0.5 mL/min、注入量 5 μL、オートサンプラー温度 10℃。

データ取得は四重極 timsTOF 質量分析計（Bruker timsTOF, ドイツ・ブレーメン）で、bbCID モードで動作するESIソースを装備して実施。分析は正・負イオン化モードで m/z 50〜1000 の範囲で達成。ESI+/ESI− ソースパラメータ: キャピラリー電圧 3.5 kV/3.0 kV；噴霧ガス圧 2.0 Bar；乾燥ガス温度 300℃；乾燥ガス流量 12.0 L/min；Funnel 1RF 200 Vpp；transfer time 50.0 μs/60.0 μs；pre-pulse storage 5.0 μs/8.0 μs。外部校正は、分析前にギ酸ナトリウム 0.1 M 溶液を注入する高精度校正（HPC）モードで実施。データ取得と装置制御は Compass HyStar 5.1、ピークの手動・目視検査と各アナライトへの *t*<sub>R</sub>・スペクトル情報（モノアイソトピック・副次イオン・フラグメント）の割り当ては Data Analysis v5.3（Bruker Daltonik）で実施。

加えて、生成した QSRR 予測モデルの予測能を確認するため、METLIN の SMRT データセットに基づく複数の外部データセットを使用。この大規模データセットは約80,000化合物から成り、すべて Zorbax Extend-C18 逆相カラム（2.1×50 mm, 1.8 μm, Agilent）で逆相LCにより分析されたもの。

### 2.3 機械学習アルゴリズム

含まれるサンプル数の観点で様々なサイズを持ち、様々な化学カテゴリーを網羅する選択データセットを用いて、信頼性が高く正確な *t*<sub>R</sub> 予測モデルを生成する能力について、4つの機械学習回帰アルゴリズムを検討・評価した。これらのアルゴリズムの選択は、基礎的な機構（線形・非線形）の差異と、メタボロームデータセットでしばしば観測される2つの最重要問題を扱う能力に基づいた。すなわち、(1) 記述する特徴量数に比してサンプル数が少ないこと（回帰モデルの過学習を招きうる）、(2) 特徴量間の高相関（共線性）の発生（特徴量が多くサンプルが少ないことで統計的に助長される）。もう一つの重要な選択基準は、様々なQSRR予測モデルにおける性能に関する既刊の参照データの利用可能性であった。

選んだ回帰アルゴリズムのうち2つは線形で、サンプルの特徴量と目的変数の間に線形関係を仮定する。重回帰（MLR）は最も単純・高速な線形アルゴリズムで、損失関数として線形最小二乗を用いる。過学習には頑健だが高相関特徴量の存在に非常に敏感で、モデルに小さな変化を導入すると係数の推定値やその符号にまで劇的な変化を生じさせ、各特徴量の効果の解釈を困難にする。この問題に対処するため、正則化（regularization）を用いて性能と頑健性を高める線形アルゴリズムが開発されてきた。この技術は全特徴量を用いてモデルを当てはめるが、推定係数は最小二乗推定に比べてゼロに向けて縮小（shrink）され、モデルの複雑さと分散が低減する。

**Ridge回帰（RidgeR）** は l2 正則化を用い、係数の大きさの二乗（l2ノルム）に等しい l2 ペナルティを損失関数に加える。これにより比較的小さなバイアスの導入と引き換えにデータの複雑さを効果的に低減する。高相関特徴量を扱う際、RidgeR はそれらの係数を互いに近づける。本研究では RidgeR のベイズ版である **Bayesian Ridge Regression（BRidgeR）** を研究した。これは回帰問題の確率モデルを推定し、正規尤度とパラメータへの正規事前分布を仮定する。**Support Vector Regression（SVR）** は線形カーネル使用時（SVRl）、コスト関数が一定マージン内の予測誤差を示すサンプルを無視するため、元の訓練データの部分集合に基づく線形回帰モデルを構築する、サポートベクターマシンの回帰問題への適応である。

他の2つの回帰アルゴリズムは非線形で、特徴量と目的変数の間のより複雑な相関を探索・適用する。**SVRnl** は RBF（放射基底関数）カーネルを適用するSVRの非線形版。**Extreme Gradient Boosting Regression（XGBR）** はアンサンブルモデルの一員で、複数の弱い予測モデルを1つの強いモデルに結合し、性能（より良い予測）と頑健性（予測のばらつきの低減）を改善する。ブースティングは多数の決定木を強分類器に結合する広く使われるアンサンブル法。各決定木は反復的に生成され、その出力は予測誤差に応じて重み付けされる。各反復で、前の反復で大きな誤差を持つサンプルに優先度を与え（より大きな重みを付け）、目的関数の最小化を目指す。XGBRは勾配降下を用いて新しい決定木を生成する勾配ブースティングアルゴリズムの一員。

### 2.4 データセット

補足表 ST1 に全データセットの化合物の詳細を掲載。最初の7つは小規模な自家（in-house）データセット（名称に "IH_" を冠す）で、Merck（ドイツ）から入手し材料と方法（2.1節）の通り分析した代謝物から成る。計305化合物（うち150がユニーク）を含み、質量は 102.133 Da 〜 776.872 Da と広範囲で、胆汁酸（"IH_BA_C8", "IH_BA_C18"）・脂肪酸（"IH_FA_C8", "IH_FA_C18"）・脂肪酸とカルニチンの組み合わせ（"IH_FC_C8"）・脂質様化合物（"IH_LLC_C8", "IH_LLC_C18"）といった様々な化学カテゴリーに属する。

加えて、5つの外部データセット（名称に "SMRT_" を冠す）を使用。これらは METLIN Small Molecule Retention Time（SMRT）データセット（計80,038化合物・無料公開）の一部である。これらの小分子から、実験 *t*<sub>R</sub> 値が5分未満（非保持分子）のものを除外。残る77,898分子から、75〜350個をランダムに選んで外部データセットを構成。計1,000分子（うち994がユニーク）を選び、質量範囲は 231.255 Da 〜 705.647 Da。

使用前に、各データセットの化合物に基本フィルタリングを適用し、InChI/SMILES表現または算出した分子記述子値ベクトルに基づいて重複を除去。加えて、実験 *t*<sub>R</sub> 値が1分未満（非保持分子）の全化合物を自家データセットから除外。補足表 ST2 に各データセットの基本フィルタリング前後の化合物数を掲載。

### 2.5 分子記述子（特徴量）

各回帰アルゴリズムが各化合物を対応する実験 *t*<sub>R</sub> 値と相関づけられるよう、分子記述子集合を化合物の特徴量として用いた。分子記述子は、分子と構造に関する複雑な化学情報を、機械学習アルゴリズムに入力する解釈しやすいデータ構造（数値ベクトル）に変換する。特定のアルゴリズムで計算される分子の性質の数値表現と定義できる。

**2.5.1 計算**: 各自家データセットについて、自家Pythonスクリプトを用いてPubChemデータベース上で自動オンライン検索を実施し、含まれる化合物の必要なInChI表現を取得。外部データセットの化合物のInChI表現は METLIN SMRT から既に利用可能。専用オンラインツールで各化合物のInChI表現を対応するSMILES表現に一括変換。最終的にRDKitライブラリで各化合物あたり計200個の分子記述子（特徴量）を計算。

**2.5.2 基本フィルタリング手順**: 使用前に、各データセットの分子記述子に一連のフィルターを適用。この手順で、重複する・データセット化合物全体で一定値または低変動（var < 0.01）を示す・欠損値を含む・出力変数との絶対ピアソン相関係数が低い（r² < 0.1）全特徴量を除去。これにより各データセットで選択機械学習アルゴリズムの訓練に用いる基本分子記述子集合を得た（補足表 ST2）。

**2.5.3 高相関特徴量の除去**: 最後に、高相関特徴量の存在が選択機械学習アルゴリズムによるデータセット解析の性能に及ぼす影響を調べるため、含まれる特徴量の数と種類が互いに異なる4つのデータセット構成を計算・使用。第1構成は基本フィルタリング（2.5.2節）から生じる全特徴量を含む。残る3構成は、互いに高相関な特徴量（ピアソン相関係数が特定閾値、すなわち 0.96・0.90・0.80 を超える）を段階的に除去して得た。各ケースで全特徴量の対分析を実施し、各高相関特徴量ペアについて、出力変数との相関がより低い方の特徴量を除去。

### 2.6 評価指標

平均絶対誤差（MAE）を全回帰モデルの当てはめ時の主指標とした（式1）:

$$\mathrm{MAE} = \frac{\sum_{i=1}^{n} |y_i - \hat{y}_i|}{n} \tag{1}$$

MAEは良い性能指標だが外れ値に敏感なのが主な欠点。このため、MAEに密接に関連し、より頑健で外れ値の影響を受けない中央絶対誤差（MedAE）を計算し、結果表示の主指標として用いた（式2）:

$$\mathrm{MedAE} = \mathrm{median}(|y_i - \hat{y}_i|) \tag{2}$$

最後に、含まれる化合物の実験 *t*<sub>R</sub> 値の範囲が異なりうる異なるデータセット間で予測誤差を比較可能にするため、各化合物の絶対予測誤差を対応する実測 *t*<sub>R</sub> 値で割って値を正規化。%MedAE（*t*<sub>R</sub> にスケールしたMedAE）を計算（式3）:

$$\%\mathrm{MedAE} = \mathrm{median}\left(\frac{100 \cdot |y_i - \hat{y}_i|}{y_i}\right) \tag{3}$$

### 2.7 基本モデル評価

各データセットでの選択機械学習回帰アルゴリズムの性能評価には、10分割交差検証（10CV）を用いた。データセット化合物を等サイズの10部分にランダム分割。9部分を訓練セット、残り1部分をテストセットとし、各部分が正確に1回テストセットとなるよう計10回繰り返した（Fig.1に各データセット解析の全般的方法論を図示）。

**2.7.1 データスケーリング**: 使用前に各データセットの各特徴量値を、分布の平均0・標準偏差1になるよう適切にスケーリング。スケーラーは各訓練セットで先に当てはめ、訓練・対応テストセットの双方に適用。

**2.7.2 ハイパーパラメータ調整**: ハイパーパラメータは機械学習アルゴリズムの重要構成要素で、結果モデルの構造と複雑さを定める鍵となる。各回帰アルゴリズムのハイパーパラメータ最適化のため、各訓練セットに二次的10CV（入れ子CV, nested CV）を適用。各ケースでMAEを指標に計200組のランダム選択ハイパーパラメータ値を評価し、全体で最良の組を最終モデルの当てはめに使用（Table 1に各回帰アルゴリズムの最重要最適化ハイパーパラメータと検討値域を掲載）。

**Table 1. 各予測回帰アルゴリズムで最適化したハイパーパラメータと検討値域**

| 回帰アルゴリズム | ハイパーパラメータ | 検討値 |
|---|---|---|
| Bayesian Ridge Regression | n_iter | randint(200, 800) |
| | alpha_1 | uniform(1e-7, 1e-3) |
| | lambda_1 | uniform(1e-7, 1e-3) |
| Support Vector Regression | C | uniform(0.01, 200.0) |
| | epsilon | uniform(0.01, 300.0) |
| | gamma | [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1.0, 10.0, 100.0] |
| | kernel | 'linear'（線形版）／'rbf'（非線形版） |
| Extreme Gradient Boosting Regression | n_estimators | randint(10, 200) |
| | max_depth | randint(1, 12) |
| | learning_rate | uniform(0.01, 0.25) |
| | gamma | uniform(0.0, 10.0) |
| | reg_alpha | uniform(0.0, 10.0) |
| | reg_lambda | uniform(0.0, 10.0) |

（`[ ]`＝括弧内の値から一様ランダム選択、`uniform()`＝括弧内範囲から浮動小数を一様ランダム選択、`randint()`＝括弧内範囲から整数を一様ランダム選択）

### 2.8 統計解析

2群以上の独立した実験測定群の中央値を比較するため、非パラメトリックな Kruskal-Wallis H検定を用いた（帰無仮説：それらが等しい、有意水準 α = 0.01）。この検定は群を全体として扱うため、どの群が互いに異なるかは判定できない。Kruskal-Wallis H検定が統計的差異を検出した場合、追加で Dunn検定を実施し、独立群間の対比較を行いどの群ペアが統計的有意に異なるかを正確に判定した。各ケースで有意水準 α = 0.01 を用い、多重比較で得たp値に Bonferroni 補正を適用。

### 2.9 コード開発

プログラミングは Linux デスクトップPC（Ubuntu 20.04.2, カーネル v5.11.0, AMD Ryzen 5 3600 CPU, 64 GB RAM）上で JupyterLab を用いて実装。Python（v3.8.10）と以下のライブラリを使用: ipython v7.19.0, jupyterlab v3.0.12, matplotlib v3.3.2, numpy v1.18.5, pandas v1.1.5, rdkit v2019.09.1, scikit-learn v0.23.2, scikit-posthocs v0.6.7, scipy v1.5.4, xgboost v1.4.0。コードとLCデータセットは GitHub（TheoLiapikos/QSRR_prediction_models_JCB）で公開。

## 3. 結果と考察（Results and discussion）

線形・非線形双方の計4つの回帰アルゴリズム的アプローチを、互いに異なる特性を持つ12のLCデータセットを用いて QSRR 予測モデル生成能について評価した。入れ子10CVを用いた各データセットでの各 QSRR 予測モデルの汎化性能を、回帰誤差推定指標として MedAE・MAE・%MedAE を用いて Table 2・補足表 ST3・ST4 に示す。結果は高相関特徴量除去の程度に関する4つのデータセット構成に対応する。各回帰アルゴリズムについて各データセット構成の解析を10回繰り返し、外れ値の影響を避けるため個々の性能結果の中央値を掲載。

### 3.1 QSRR予測モデルの性能

補足図 SF1〜SF4 に回帰プロット（実測 vs 予測 *t*<sub>R</sub>）を図示。各図は高相関特徴量除去水準に関する異なるデータセット構成に対応し、各評価指標に1つずつ計3つの部分図を含む。自家データセットに限ると、一部（"IH_BA_C8", "IH_BA_C18", "IH_FA_C8", "IH_FC_C8"）では基準線周りに点が狭く分布する一方、残りではばらつきが大きく、一部データセットの小ささで部分的に説明できる。外部データセットは基準線周りに満足のいく分布を示すが、不均一分散（heteroscedasticity）を呈し、予測値が小から大に移るにつれ点のばらつきが大きくなる。補足図 SF5〜SF8 に残差プロットを図示。条件によらず一部の自家データセット（"IH_BA_C8", "IH_FC_C8", "IH_LLC_C8"）で外れ値点の存在を観測。これらは、外れ値サンプルの除去や外部データセットの不均一分散の低減（従属変数の変換など）により、予測回帰モデルの全体性能をさらに改善する余地があることを示唆する。

**Table 2. 全データセットに適用したQSRR予測モデルの性能（回帰誤差, 秒）**（指標：MedAE。構成1＝基本フィルタリングのみ、構成2〜4＝ピアソン相関係数閾値 CC=0.96／0.90／0.80 で高相関特徴量を追加除去。各値は10回反復の中央値）

| データセット | \[基本\]BRidgeR | SVRl | SVRnl | XGBR | \[0.96\]BRidgeR | SVRl | SVRnl | XGBR | \[0.90\]BRidgeR | SVRl | SVRnl | XGBR | \[0.80\]BRidgeR | SVRl | SVRnl | XGBR |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| IH_BA_C18 | 17.5 | 22.8 | 24.2 | 19.2 | 17.3 | 22.2 | 21.8 | 17.3 | 17.0 | 22.0 | 24.2 | 15.9 | 18.2 | 19.1 | 23.4 | 17.4 |
| IH_BA_C8 | 19.1 | 24.4 | 18.7 | 20.3 | 18.4 | 23.4 | 21.3 | 17.2 | 17.6 | 20.1 | 19.4 | 19.9 | 20.2 | 19.7 | 20.3 | 19.0 |
| IH_FA_C18 | 41.7 | 43.3 | 30.5 | 33.0 | 43.2 | 44.7 | 39.1 | 32.2 | 40.4 | 42.9 | 42.1 | 32.0 | 40.6 | 42.2 | 44.0 | 36.7 |
| IH_FA_C8 | 40.2 | 34.8 | 20.9 | 30.6 | 40.0 | 36.2 | 26.4 | 29.3 | 39.4 | 35.2 | 30.4 | 25.4 | 38.7 | 34.9 | 32.3 | 17.6 |
| IH_FC_C8 | 33.4 | 29.5 | 15.8 | 21.5 | 34.6 | 28.9 | 18.7 | 20.8 | 35.0 | 29.7 | 24.4 | 20.9 | 36.3 | 36.9 | 32.4 | 19.9 |
| IH_LLC_C18 | 55.9 | 62.6 | 48.7 | 54.8 | 57.6 | 58.6 | 56.9 | 58.2 | 59.5 | 57.4 | 46.7 | 54.7 | 55.9 | 49.4 | 64.5 | 61.3 |
| IH_LLC_C8 | 55.8 | 63.0 | 45.4 | 42.8 | 53.7 | 67.7 | 52.7 | 44.9 | 54.4 | 65.3 | 54.6 | 40.3 | 52.1 | 57.5 | 58.6 | 40.0 |
| SMRT_75 | 85.4 | 92.9 | 76.9 | 90.1 | 87.5 | 95.0 | 81.9 | 88.0 | 87.3 | 94.3 | 79.7 | 96.0 | 88.1 | 91.3 | 82.6 | 101.3 |
| SMRT_100 | 78.6 | 84.2 | 88.4 | 105.0 | 79.8 | 89.0 | 85.4 | 107.4 | 81.9 | 85.9 | 87.6 | 110.5 | 82.3 | 86.6 | 90.8 | 97.4 |
| SMRT_200 | 86.0 | 78.0 | 80.1 | 96.2 | 86.0 | 78.5 | 79.5 | 95.6 | 86.1 | 77.0 | 79.7 | 97.6 | 90.0 | 78.3 | 80.2 | 95.4 |
| SMRT_275 | 73.0 | 71.6 | 73.0 | 75.1 | 71.9 | 74.8 | 72.9 | 79.6 | 74.3 | 72.5 | 72.4 | 76.9 | 73.7 | 75.2 | 73.6 | 76.2 |
| SMRT_350 | 79.3 | 76.9 | 77.0 | 90.1 | 78.8 | 76.2 | 75.7 | 91.8 | 78.4 | 76.5 | 76.5 | 89.9 | 79.9 | 77.6 | 78.4 | 91.0 |

Fig.2 は CC=0.90 閾値で高相関特徴量を除去した際の各データセットでのMedAE性能を図示（対応数値は Table 2 の該当列）。

自家データセットに限りアルゴリズムの全体性能で見ると、まず強調できる点は、非線形アルゴリズム群が概して対応する線形アルゴリズムより良い性能を示す傾向であり、特徴量と目的変数の間の非線形関係の存在を示唆する。この差異は、基礎解析機構が同じでカーネルの性質（線形か非線形か）だけが異なるSVRの2変種で特に強調される。したがって指標によらず、大半のケースで SVRnl は SVRl より良い性能を示し、残りのケースでは同程度。非線形アルゴリズム同士を比べると、XGBR は大半のケースで SVRnl より良いか少なくとも同程度。これは XGBR が幅広いLCデータセットで信頼性・精度の高い QSRR 予測モデルを生成する能力を示した最近の研究と一致する。ただし特定のデータセット（"IH_BA_C8", "IH_BA_C18"）では線形アルゴリズムが非線形より良いか少なくとも同程度。これはこれらのデータセットが小規模でサンプル数が使用特徴量数より少なく、含まれる化合物が特定の化学カテゴリーに属することによる可能性がある。

対照的に外部データセットは大規模で、使用特徴量より多くのサンプルを含み、化合物は様々な化学カテゴリーを網羅する。これら特定データセットでの一般パターンは異なって見え、2つのアルゴリズム群の間に顕著で反復的な差異はない。各アルゴリズムの個別性能に注目すると、これら特定データセットでは XGBR が一貫して他の全アルゴリズムを下回るのが注目される。他の3アルゴリズムは全体として同様の性能を示し、いずれも他から突出できない。

研究全データセットにわたるアルゴリズムの全体的性能パターンを勘案すると、他の全てより一貫して良い性能を示す単一の最良アルゴリズムやアルゴリズムカテゴリーは存在しない、という結論が導ける。したがって解析すべき各候補データセットについて、QSRR予測モデル生成に参加させる最も効果的なものを選ぶ前に、まず全利用可能回帰アルゴリズムの性能を検証すべきである。

### 3.2 共線性がQSRR予測モデル性能に及ぼす影響

本研究の主目的は、データセットの特徴量間に生じる相関の水準が、特定の機械学習回帰アルゴリズムで生成した QSRR 予測モデルの性能に及ぼす影響を明らかにすることであった。相関水準は、データセットの任意の特徴量ペア間で計算されるピアソン相関係数の絶対値の最大値と定義され、高相関特徴量は、指定閾値を超えるピアソン相関係数を示すデータセットの全特徴量ペアである。

Table 2・補足表 ST3・ST4 に、考慮したデータセットの全可能構成における QSRR 予測モデルの全必要性能データを、様々な回帰誤差推定指標を用いて掲載。これらの表は、利用可能なデータセット・回帰アルゴリズム・評価指標の計144の異なる組み合わせを含み、各組み合わせについて特定データセットの4構成それぞれの性能結果を提示。各データセット構成での QSRR 予測モデルの性能値は、各回帰アルゴリズムによる特定データセット構成解析の10回独立反復の中央性能値に対応。補足図 SF13 に外部データセット "SMRT_75" に関する代表的箱ひげ図を掲載。

高相関特徴量除去のアルゴリズム性能への影響を検証するため、上記144組み合わせ（データセット-アルゴリズム-指標）それぞれについて、算出した性能値の4つの独立集合に統計解析を実施。非パラメトリック Kruskal-Wallis H検定を用い、Fig.3 に144全ケースのp値結果をヒートマップで図示。計32ケースで4データセット構成の値集合間に統計的有意差を発見。各ケースで追加の Dunn検定を実施し、独立群間の対比較でどの群ペアが統計的有意に異なるかを正確に判定（各ケースで多重比較のp値に Bonferroni 補正を適用）。

関心対象は、全特徴量で解析したデータセット構成群と、高相関特徴量を段階除去した他構成群との比較であった。補足図 SF14 に Dunn検定のp値結果をヒートマップで図示。検討した32ケースのうち、関心対象の群ペアで統計的有意差が同定されたのは25ケース（Kruskal-Wallis H検定で解析した全ケースの17.4%）のみで、一部は実際には限界的（marginal）であった。**大半のケース（82.6%）で、データセットからの高相関特徴量の段階除去は、全特徴量でデータセットを解析した場合と比べ、生成した QSRR 予測モデルの性能に統計的有意差をもたらさなかった。**

統計的有意差が生じた特定ケース（Fig.3で緑枠強調）を調べると、その大半は3〜4の特定データセットに集中し、それらは自家データセットに属する。対照的に外部データセット群では、高相関特徴量の段階除去が生成 QSRR モデルの性能に統計的有意変化をもたらしたケースは1つも観測されなかった。2カテゴリー間で同定できる主な量的・質的差異は、主に含まれる化合物の数と種類に関わる。自家データセットは比較的小規模で26〜最大65化合物を含み、その結果、大半の構成で化合物数が使用特徴量数より少なく（補足表 ST2）、生成 QSRR モデルが過学習となる。これらのモデルでは、高相関特徴量が除去され特徴量数が化合物数に近づくか下回るにつれて性能変化が観測されると期待される。化合物種類については、各自家データセットは同一化学カテゴリーの化合物を含み、分子記述子が符号化する物理・化学・構造特性の変動が小さいと期待される。対照的に外部データセットは大幅に大規模（75〜350化合物）で、対応特徴量数は一貫して少なく（"SMRT_75" の一部構成を除く）、由来元の METLIN SMRT が様々な化学カテゴリーの化合物から成るため、ランダムに選ばれた本研究データセットも同様と期待される。

我々の知る限り、これは高相関特徴量の異なる水準が QSRR 予測モデル性能に及ぼす影響を比較検討した初の試みである。上記結果は、QSRR予測モデルの基礎とした特定回帰アルゴリズムが頑健で柔軟性が高く、大半のケースで解析データセットの高相関特徴量の存在を効率的に扱えることを示す。これらの結果は、異なるサイズのより多くのデータセットや他の回帰アルゴリズムに基づくQSRRモデルを含む追加研究で確認される必要がある。共線性を扱う通常の手法は、ピアソン相関係数について様々な閾値を用いて任意に事前定義した水準で高相関特徴量を除去することである。もし上記結果が有効と証明されれば、実験データセットの扱いにおいて高相関特徴量への対処のストレスを取り除き、また実際の高相関特徴量水準の観点で異なる条件下で行われた類似研究の結果を比較する能力の双方で、柔軟性が高まる。とはいえ、限定的にでも高相関特徴量を除去することは、回帰モデル使用時に通常最も安全であり、モデルの複雑さ低減に加え、高相関特徴量を扱う能力が低いアルゴリズムの使用可能性も提供する。

### 3.3 アルゴリズム実行の所要時間

SVRl と XGBR がデータセット解析で最も時間を要するアルゴリズムであった。予想通り所要時間は解析対象データセットの化合物数と特徴量数に直接依存し、最悪でも SVRl で14分、XGBR で6.5分を超えず、日常使用に懸念を生じない程度に十分速い。他の回帰アルゴリズムは数秒で実行を完了した。

## 4. 結論（Conclusions）

異なる機械学習回帰アルゴリズム（線形・非線形）に基づく4つの異なる QSRR 予測モデルを構築し、様々な化学カテゴリーの化合物から成る、異なるサイズの自家・外部の多様なLCデータセットで評価した。回帰アルゴリズムは、類似モデルでの実証済み有効性と、データセット中の高相関特徴量を効率的に扱う能力に基づいて選択。RDKitで計算した選択的分子記述子集合を用いて参加化合物の物理・化学・構造特性を符号化。全データセットにフィルタリング手順を適用し、全特徴量を含む構成と、ピアソン相関係数の特定閾値で高相関特徴量を異なる水準で除去した他3構成を生成。各データセットの4構成を全選択機械学習回帰アルゴリズムで並行解析し、結果 QSRR 予測モデルの性能を様々な回帰誤差推定指標で計算。

一つの問いは、QSRRモデルがモデル化・予測実装すると期待される問題が線形か非線形かである。本研究の結果は明確な答えを与えない。大半のデータセットで性能面で明確に突出する回帰アルゴリズムやアルゴリズム群がないように見えるためである。典型例が XGBR で、様々なLCデータセットで多数の他クラスのアルゴリズム中最良の性能を示した最近の刊行研究を受け、QSRR予測モデル開発でますます人気を得ているアルゴリズムだが、本研究データセットでは XGBR ベースの QSRR 予測モデルの性能は曖昧であった。自家データセットでは一貫して非常に良く、多くのケースで特に線形アルゴリズムと特徴的な差を示したが、外部データセットではほぼ全ケースで最悪であった。SVRnl は研究の異なるデータセット間でより信頼できる性能パターンを持つように見え、XGBRの変動を示さないが、それでも対応する線形アルゴリズムから自らを区別できない。

QSRR予測モデルの性能と並んで、データセットのサイズに直接依存する解析完了所要時間も同等に重要。研究データセット、特に全特徴量での "SMRT_350" 解析という極端なケースでは、BRidgeR の数秒から SVRl の約14分まで、アルゴリズム実行時間に大きな変動を観測。これらの変動は大きく見えるが、特に現代の効率的計算システムを利用できる場合、日常使用のアルゴリズム選択で禁止的とは決してみなせない。したがって比較アルゴリズムに基づく QSRR 予測モデル性能について導ける安全な結論は、全てまたは少なくとも大半のケースで他を上回る単一の回帰アルゴリズムは存在しないということである。これは、特定のLCデータセットを解析する必要が生じるたびに、予測精度と処理時間の観点で最も効率的なものを選ぶため、異なるカテゴリーの幅広い利用可能回帰アルゴリズムを考慮すべきことを意味する。

本研究で取り組んだ主目的は、データセットの高相関特徴量の水準（データセットの任意の特徴量ペアで検出されるピアソン相関係数の絶対値の最大値と定義）が、結果 QSRR 予測モデルの性能に及ぼす潜在的影響の調査であった。計144の異なるケースを研究し、各ケースで4つの異なるデータセット構成にわたり生成 QSRR 予測モデルの性能を比較。結果の統計解析は、大半（82.6%）のケースで、高相関特徴量の段階除去が QSRR 予測モデル性能に統計的有意差をもたらさなかったことを実証した。統計的有意差が観測された少数のケースは、特定の量的（特徴量に比して含有化合物数が少ない）・質的（特定化学カテゴリーの化合物）特性を持つ特定データセットに関わり、これが差異を生じた可能性がある。個別回帰アルゴリズムの性能と同様、結果はデータセット依存に見える。

我々の知る限り、高相関特徴量の水準が QSRR 予測モデル性能に及ぼす影響の体系的研究はこれまでなく、類似ケースでの通常の手法はそれらを任意定義の特定閾値までデータセットから除去することであった。本研究の結果は、選択した特定回帰アルゴリズムが線形・非線形双方で、QSRR予測モデル構築に用いる際にLCデータセットの共線性を効果的に扱えるという強い証拠を提供する。これらは、様々なサイズ・化学カテゴリーのより多くのLCデータセット、そして確実により多くの利用可能機械学習回帰アルゴリズムを用いた、この問題のより広範な調査への誘因となる。結論が確認されれば、これら特定応用でのデータセットの扱いに柔軟性の向上を提供するだろう。

## 参考文献

1. H. Gika, C. Virgiliou, G. Theodoridis, R.S. Plumb, I.D. Wilson, Untargeted LC/MSbased metabolic phenotyping (metabonomics/metabolomics): The state of the art, J. Chromatogr. B 1117 (Jun. 2019) 136–147, https://doi.org/10.1016/j. jchromb.2019.04.009.

2. H. Gika, G. Theodoridis, F. Mattivi, U. Vrhovsek, A. Pappa-Louisi, Retention prediction of a set of amino acids under gradient elution conditions in hydrophilic interaction liquid chromatography, J. Sep. Sci. 35 (3) (2012) 376–383, https://doi. org/10.1002/jssc.201100795.

3. F. Gritti, Perspective on the Future Approaches to Predict Retention in Liquid Chromatography, Anal. Chem. 93 (14) (2021) 5653–5664, https://doi.org/ 10.1021/acs.analchem.0c0507810.1021/acs.analchem.0c05078.s001.

4. M.O. Besenhard, A. Tsatse, L. Mazzei, E. Sorensen, Recent advances in modelling and control of liquid chromatography, Curr. Opin. Chem. Eng. 32 (2021) 100685, https://doi.org/10.1016/j.coche.2021.100685.

5. T. Bączek, R. Kaliszan, Predictions of peptides’ retention times in reversed-phase liquid chromatography as a new supportive tool to improve protein identification in proteomics, Proteomics 9 (4) (Feb. 2009) 835–847, https://doi.org/10.1002/ pmic.200800544.

6. G. Sagandykova, B. Buszewski, Perspectives and recent advances in quantitative structure-retention relationships for high performance liquid chromatography. How far are we? TrAC Trends Anal. Chem. 141 (2021) 116294, https://doi.org/ 10.1016/j.trac.2021.116294.

7. R. Put, C. Perrin, F. Questier, D. Coomans, D.L. Massart, Y. Vander Heyden, Classification and regression tree analysis for molecular descriptor selection and retention prediction in chromatographic quantitative structure–retention relationship studies, J. Chromatogr. A 988 (2) (2003) 261–276.

8. K. Bodzioch, A. Durand, R. Kaliszan, T. Bączek, Y. Vander Heyden, Advanced QSRR modeling of peptides behavior in RPLC, Talanta 81 (4-5) (2010) 1711–1718.

9. A. Mauri, V. Consonni, M. Pavan, R. Todeschini, DRAGON software: An easy approach to molecular descriptor calculations, MATCH Commun. Math. Comput. Chem. 56 (Jan. 2006) 237–248.

10. A.A. D’Archivio, M.A. Maggi, F. Ruggieri, Cross-column prediction of gaschromatographic retention indices of saturated esters, J. Chromatogr. A 1355 (Aug. 2014) 269–277, https://doi.org/10.1016/j.chroma.2014.06.002.

11. “RDKit: Open-Source Cheminformatics Software.” https://www.rdkit.org/ (accessed Aug. 17, 2021).

12. R. Guha, Chemical Informatics Functionality in R, J. Stat. Softw. 18 (Jan. 2007), https://doi.org/10.18637/jss.v018.i05.

13. C.W. Yap, PaDEL-descriptor: An open source software to calculate molecular descriptors and fingerprints, J. Comput. Chem. 32 (7) (2011) 1466–1474, https:// doi.org/10.1002/jcc.21707.

14. H. Moriwaki, Y.-S. Tian, N. Kawashita, T. Takagi, Mordred: a molecular descriptor calculator, J. Cheminformatics 10 (1) (Dec. 2018) 4, https://doi.org/10.1186/ s13321-018-0258-y.

15. D.-S. Cao, Q.-S. Xu, Q.-N. Hu, Y.-Z. Liang, ChemoPy: freely available python package for computational biology and chemoinformatics, Bioinformatics 29 (8) (Apr. 2013) 1092–1094, https://doi.org/10.1093/bioinformatics/btt105.

16. R. Put, Y. Vander Heyden, The evaluation of two-step multivariate adaptive regression splines for chromatographic retention prediction of peptides, Proteomics 7 (10) (2007) 1664–1677.

17. R. Kaliszan, T. B??czek, A. Buci´nski, B. Buszewski, M. Sztupecka, Prediction of gradient retention from the linear solvent strength (LSS) model, quantitative structure-retention relationships (QSRR), and artificial neural networks (ANN), J. Sep. Sci. 26 (3-4) (2003) 271–282, https://doi.org/10.1002/jssc.200390033.

18. J. Walczak-Skierska, M. Szultka-Mły´nska, K. Pauter, B. Buszewski, Study of chromatographic behavior of antibiotic drugs and their metabolites based on quantitative structure-retention relationships with the use of HPLC-DAD, J. Pharm. Biomed. Anal. 184 (2020) 113187, https://doi.org/10.1016/j.jpba.2020.113187.

19. P. Kawczak, M. Belka, J. Slawinski, T. Baczek, QSRR Evaluation of the New Anticancer Sulfonamides in View of the cis-trans Isomerism, Curr. Pharm. Anal. 14 (1) (2017) Dec, https://doi.org/10.2174/1573412913666170102155122.

20. R. Bouwmeester, L. Martens, S. Degroeve, Comprehensive and Empirical Evaluation of Machine Learning Algorithms for Small Molecule LC Retention Time Prediction, Anal. Chem. 91 (5) (2019) 3694–3703, https://doi.org/10.1021/acs. analchem.8b0582010.1021/acs.analchem.8b05820.s001.

21. M. Kaczmarek, A. Buci´nski, M.P. Marszałł, A. Badura, R. Kaliszan, Thermodynamic and QSRR Modeling of HPLC Retention on Modern Stationary Phases, J. Liq. Chromatogr. Relat. Technol. 38 (1) (Jan. 2015) 62–67, https://doi.org/10.1080/ 10826076.2014.883532.

22. A.A. D’Archivio, M.A. Maggi, F. Ruggieri, Artificial neural network prediction of multilinear gradient retention in reversed-phase HPLC: comprehensive QSRRbased models combining categorical or structural solute descriptors and gradient profile parameters, Anal. Bioanal. Chem. 407 (4) (Feb. 2015) 1181–1190, https:// doi.org/10.1007/s00216-014-8317-3.

23. T. Baczek, R. Kaliszan, Combination of linear solvent strength model and quantitative structure–retention relationships as a comprehensive procedure of approximate prediction of retention in gradient liquid chromatography, J. Chromatogr. A 962 (1-2) (2002) 41–55.

24. T. Bączek, K. Bodzioch, E. Michalska, R. Kaliszan, Predictions of Reversed-Phase Gradient Elution LC Separations Supported by QSRR, Chromatographia 68 (3–4) (Aug. 2008) 161–166, https://doi.org/10.1365/s10337-008-0674-7.

25. C. Zisi, I. Sampsonidis, S. Fasoula, K. Papachristos, M. Witting, H. Gika, P. Nikitas, A. Pappa-Louisi, QSRR Modeling for Metabolite Standards Analyzed by Two Different Chromatographic Columns Using Multiple Linear Regression, Metabolites 7 (1) (Feb. 2017) 7, https://doi.org/10.3390/metabo7010007.

26. T. Bączek, R. Kaliszan, K. Novotn´a, P. Jandera, Comparative characteristics of HPLC columns based on quantitative structure–retention relationships (QSRR) and hydrophobic-subtraction model, J. Chromatogr. A 1075 (1–2) (May 2005) 109–115, https://doi.org/10.1016/j.chroma.2005.03.117.

27. A. Plenis, I. Olędzka, T. Bączek, Classification of LC columns based on the QSRR method and selectivity toward moclobemide and its metabolites, J. Pharm. Biomed. Anal. 78–79 (May 2013) 161–169, https://doi.org/10.1016/j. jpba.2013.02.020.

28. J. Krmar, M. Vuki´cevi´c, A. Kovaˇcevi´c, A. Proti´c, M. Zeˇcevi´c, B. Otaˇsevi´c, Performance comparison of nonlinear and linear regression algorithms coupled with different attribute selection methods for quantitative structure - retention relationships modelling in micellar liquid chromatography, J. Chromatogr. A 1623 (2020) 461146, https://doi.org/10.1016/j.chroma.2020.461146.

29. T. Hancock, R. Put, D. Coomans, Y. Vander Heyden, Y. Everingham, A performance comparison of modern statistical techniques for molecular descriptor selection and retention prediction in chromatographic QSRR studies, Chemometrics and Intelligent Laboratory Systems 76 (2) (2005) 185–196.

30. P.R. Haddad, M. Taraji, R. Szücs, Prediction of Analyte Retention Time in Liquid Chromatography, Anal. Chem. 93 (1) (Jan. 2021) 228–256, https://doi.org/ 10.1021/acs.analchem.0c04190.

31. P.J. Eugster, J. Boccard, B. Debrus, L. Br´eant, J.-L. Wolfender, S. Martel, P.- A. Carrupt, Retention time prediction for dereplication of natural products (CxHyOz) in LC–MS metabolite profiling, Phytochemistry 108 (2014) 196–207, https://doi.org/10.1016/j.phytochem.2014.10.005.

32. S.H. Park, P.R. Haddad, R.I.J. Amos, M. Talebi, R. Szucs, C.A. Pohl, J.W. Dolan, Towards a chromatographic similarity index to establish localised Quantitative Structure-Retention Relationships for retention prediction. III Combination of Tanimoto similarity index, log P, and retention factor ratio to identify optimal analyte training sets for ion chromatography, J. Chromatogr. A 1520 (2017) 107–116, https://doi.org/10.1016/j.chroma.2017.09.016.

33. M. Taraji, P.R. Haddad, R.I.J. Amos, M. Talebi, R. Szucs, J.W. Dolan, C.A. Pohl, Prediction of retention in hydrophilic interaction liquid chromatography using solute molecular descriptors based on chemical structures, J. Chromatogr. A 1486 (2017) 59–67, https://doi.org/10.1016/j.chroma.2016.12.025.

34. T. Bruderer, E. Varesio, G. Hopfgartner, The use of LC predicted retention times to extend metabolites identification with SWATH data acquisition, J. Chromatogr. B 1071 (Dec. 2017) 3–10, https://doi.org/10.1016/j.jchromb.2017.07.016.

35. M. Skoczylas, S. Bocian, B. Buszewski, Quantitative structure – retention relationships of amino acids on the amino acidand peptide-silica stationary phases for liquid chromatography, J. Chromatogr. A 1609 (2020) 460514, https:// doi.org/10.1016/j.chroma.2019.460514.

36. K. Bodzioch, B. Dejaegher, T. Baczek, R. Kaliszan, Y. Vander Heyden, Evaluation of a generalized use of the log Sum(k+1) AA descriptor in a QSRR model to predict peptide retention on RPLC systems, J. Sep. Sci. 32 (12) (2009) 2075–2083.

37. A.A. D’Archivio, A. Incani, F. Ruggieri, Cross-column prediction of gaschromatographic retention of polychlorinated biphenyls by artificial neural networks, J. Chromatogr. A 1218 (48) (Dec. 2011) 8679–8690, https://doi.org/ 10.1016/j.chroma.2011.09.071.

38. R.I.J. Amos, P.R. Haddad, R. Szucs, J.W. Dolan, C.A. Pohl, Molecular modeling and prediction accuracy in Quantitative Structure-Retention Relationship calculations for chromatography, TrAC Trends Anal. Chem. 105 (Aug. 2018) 352–359, https:// doi.org/10.1016/j.trac.2018.05.019.

39. M. Kuhn, K. Johnson, Feature engineering and selection: a practical approach for predictive models, CRC Press, Taylor & Francis Group, Boca Raton London New York, 2020.

40. Z.Y. Algamal, A new method for choosing the biasing parameter in ridge estimator for generalized linear model, Chemom. Intell. Lab. Syst. 183 (Dec. 2018) 96–101, https://doi.org/10.1016/j.chemolab.2018.10.014.

41. S. Kovaˇcevi´c, M.K. Banjac, N. Miloˇsevi´c, J. ´Curˇci´c, D. Marjanovi´c, N. Todorovi´c, J. Krmar, S. Podunavac-Kuzmanovi´c, N. Banjac, G. Uˇs´cumli´c, Comparative chemometric and quantitative structure-retention relationship analysis of anisotropic lipophilicity of 1-arylsuccinimide derivatives determined in highperformance thin-layer chromatography system with aprotic solvents, J. Chromatogr. A 1628 (2020) 461439, https://doi.org/10.1016/j. chroma.2020.461439. T. Liapikos et al. Journal of Chromatography B 1191 (2022) 123132 10

42. T. Naes, B.-H. Mevik, Understanding the collinearity problem in regression and discriminant analysis: COLLINEARITY PROBLEM IN REGRESSION AND DISCRIMINANT ANALYSIS, J. Chemom. 15 (4) (May 2001) 413–426, https://doi. org/10.1002/cem.676.

43. M. Taraji, P.R. Haddad, R.I.J. Amos, M. Talebi, R. Szucs, J.W. Dolan, C.A. Pohl, Error measures in quantitative structure-retention relationships studies, J. Chromatogr. A 1524 (2017) 298–302, https://doi.org/10.1016/j. chroma.2017.09.050.

44. E.J. Want, I.D. Wilson, H. Gika, G. Theodoridis, R.S. Plumb, J. Shockcor, E. Holmes, J.K. Nicholson, Global metabolic profiling procedures for urine using UPLC–MS, Nat. Protoc. 5 (6) (2010) 1005–1018, https://doi.org/10.1038/ nprot.2010.50.

45. X. Domingo-Almenara, et al., The METLIN small molecule dataset for machine learning-based retention time prediction, Nat. Commun. 10 (1) (Dec. 2019) 5811, https://doi.org/10.1038/s41467-019-13680-7.

46. M. Pavlou, G. Ambler, S. Seaman, M. De Iorio, R.Z. Omar, Review and evaluation of penalised regression methods for risk prediction in low-dimensional data with few events, Stat. Med. 35 (7) (2016) 1159–1177, https://doi.org/10.1002/sim.6782.

47. R. M. Rifkin and R. A. Lippert, “Notes on Regularized Least Squares,” May 2007, Accessed: Aug. 17, 2021. [Online]. Available: https://dspace.mit.edu/handle/ 1721.1/37318.

48. C. Cortes, V. Vapnik, Support-vector networks, Mach. Learn. 20 (3) (Sep. 1995) 273–297, https://doi.org/10.1007/BF00994018.

49. Y. Freund, R.E. Schapire, A Decision-Theoretic Generalization of On-Line Learning and an Application to Boosting, J. Comput. Syst. Sci. 55 (1) (Aug. 1997) 119–139, https://doi.org/10.1006/jcss.1997.1504.

50. T. Hastie, R. Tibshirani, and J. Friedman, “Boosting and Additive Trees,” in The Elements of Statistical Learning, New York, NY: Springer New York, 2009, pp. 337–387. doi: 10.1007/978-0-387-84858-7_10.

51. L. Mason, J. Baxter, P. Bartlett, M. Frean, Boosting Algorithms as Gradient Descent. (1999) 512–518.

52. T. Chen and C. Guestrin, “XGBoost: A Scalable Tree Boosting System,” in Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, San Francisco California USA, Aug. 2016, pp. 785–794. doi: 10.1145/2939672.2939785.

53. PubChem, “PubChem.” https://pubchem.ncbi.nlm.nih.gov/ (accessed Aug. 17, 2021).

54. “InChI Web Service.” https://www.chemspider.com/InChI.asmx? op=InChIToSMILES (accessed Aug. 17, 2021).

55. T. Haslwanter, An Introduction to Statistics with Python, Springer International Publishing, Cham, 2016.

56. O.J. Dunn, Multiple Comparisons Using Rank Sums, Technometrics 6 (3) (Aug. 1964) 241–252, https://doi.org/10.1080/00401706.1964.10490181.

57. T. Hastie, R. Tibshirani, J.H. Friedman, The elements of statistical learning: data mining, inference, and prediction, 2nd ed., Springer, New York, NY, 2009. T. Liapikos et al.

## 訳者補足

- **QSRRとは**: 化合物の「構造・物性（分子記述子で数値化）」から「クロマトの保持時間」を予測する回帰モデル。MSデータと直交する（独立した）情報源として、代謝物や未知ピークの同定の信頼性を高めるのに使う。本論文は特に、200個の分子記述子をRDKitで自動計算し、4種の機械学習に食わせて比較した。

- **「共線性（collinearity）」問題の核心**: 分子記述子どうしは互いに強く相関しがち（例：分子量と原子数）。素朴な重回帰（MLR）はこの高相関に極端に弱く、係数が不安定になる。従来は「相関が高いペアの片方を捨てる」のが定石だったが、本論文の新規性は「その捨てる作業が本当に必要か？」を144通りで統計検定し、**選んだ4手法（BRidgeR/SVR/XGBR）ではほとんど（82.6%）性能に差が出ない＝これらは共線性に元々頑健**、と示した点にある。つまり正則化やSVM/勾配ブースティングを使うなら、特徴量除去に神経質にならなくてよい。

- **実務的教訓**: 「万能の最良アルゴリズムはない」。人気のXGBoostも自家（小規模・単一化学カテゴリー）データでは強かったが、大規模で多様な外部データ（METLIN SMRT）ではむしろ最下位だった。新しいデータセットを扱うたびに複数の回帰法を試して選ぶべき、というのが著者の結論。漢方の多成分LC-MSでピーク保持を予測したい場合も、この「まず複数試す」姿勢が重要。

- **限界（本文より）**: 自家データセットは化合物数（26〜65）が特徴量数より少なく過学習気味で、有意差が出たケースはここに集中した。結論の一般化には、より多様・大規模なデータセットと、より多くのアルゴリズムでの追試が必要。

- 図（Fig.1〜3）と補足資料（ST1〜4, SF1〜14）の詳細は原文・SIを参照。コードとデータは著者GitHub（TheoLiapikos/QSRR_prediction_models_JCB）で公開。
