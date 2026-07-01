---
title: 生薬・ハーブ医薬品の品質管理におけるマーカーとしてのフラボノイド — 現在のトレンドと分析的展望（総説）
slug: flavonoids-hm-qc-review
doi: https://doi.org/10.3390/separations12110289
source_pdf: separations-12-00289.pdf
drive_file_id: 16-XjxAlqE1vmKSPUtqxg5OqUST0KkAY3
drive_url: https://drive.google.com/file/d/16-XjxAlqE1vmKSPUtqxg5OqUST0KkAY3/view
level: practitioner
date: 2026-06-28
published: 2025
tags: [生薬, QC・品質評価, 指紋分析, Q-marker, 質量分析, レビュー]
digest_tagline: フラボノイドをマーカーとするHM品質管理の戦略・技術・データ解析を俯瞰した総説
digest_stats: [IF（2024）|2.7, 種別|総説, 対象期間|2017–2024, 戦略|4種, 技術|HPTLC／LC-MS]
digest_points: [戦略は指紋／メタボロミクス／ネットワーク薬理／Q-markerの4本柱, ルーチンはHPTLC＋HPLC-DADが基盤, 化学的類似≠効力同等のため多マーカー＋活性で裏取り]
summary: フラボノイドを品質マーカーとする生薬・ハーブ医薬品(HM)の品質管理について、戦略（指紋・メタボロミクス・ネットワーク薬理・Q-marker）、分析技術（HPTLC・LC）、データ解析（ケモメトリクス・分子ネットワーク）を総括した総説の全訳（＋訳者補足）。薬局方の収載例も網羅。
---

<!-- 方針: ほぼ全訳＋必要に応じた補足。原文構成に沿って訳出。「> 補足:」は訳者注。 -->

## 書誌情報

- 原題: Flavonoids as Markers in Herbal Medicine Quality Control: Current Trends and Analytical Perspective
- 著者: Julia Morais Fernandes, Charlotte Silvestre, Silvana M. Zucolotto, Julien Antih, Fabrice Vaillant, Aude Echallier, Patrick Poucheret（Qualisud, モンペリエ大学ほか, フランス／リオグランデ・ド・ノルテ連邦大学, ブラジル）
- 掲載: *Separations* 2025, 12, 289. https://doi.org/10.3390/separations12110289（総説, オープンアクセス CC BY 4.0）
- インパクトファクター: **2.7**（*Separations*, JCR 2024 / Clarivate）
- 受領 2025-08-18 / 改訂 2025-10-19 / 採録 2025-10-20 / 公開 2025-10-23

> 補足: 本論文は **総説（レビュー）**。HM = Herbal Medicine（生薬・ハーブ医薬品）、TCM = 伝統中国医学、Q-marker = 品質マーカー（quality marker）。対象期間は2017–2024年の研究。

## 要旨（Abstract）

植物二次代謝産物の普遍的な一群であるフラボノイドは、生薬・ハーブ医薬品（HM）の品質・安全性・有効性を担保する化学マーカーとしてますます重要になっている。広い分布・生物活性・検出容易性が、その役割に理想的である。本総説は、HM の品質管理におけるフラボノイドの現在のトレンドと分析的展望を批判的に検討する。まず単一成分定量を超える先進的な品質管理戦略——化学指紋・メタボロミクス・ネットワーク薬理・革新的概念である Q-marker——を概観する。次に、ルーチンの HPTLC・HPLC-UV から UHPLC-QTOF-MS のような先進的ハイフネーテッド系まで、フラボノイド分析の中心的分析技術を、真正性確認・標準化・混入検出への応用とともに詳述する。さらに、複雑なデータセットの解釈と頑健で生物活性に関連したマーカー同定のための、ケモメトリクスと分子ネットワークの統合を中心とする現代的データ解析ワークフローの重要性を強調する。近年の研究（2017–2024）を統合し、本研究は全体的・多マーカー的アプローチとデータ駆動型方法論へのパラダイムシフトを明らかにする。先進的分析技術と高度なデータモデリングの相乗的適用が HM 品質管理の将来に不可欠であると結論する。

## 1. 序論（Introduction）

伝統的な生薬は数千年にわたり疾病の予防・治療に用いられ、多くの開発途上国で第一選択の医療であり続ける。先進国でも植物由来健康製品の販売が増加している。HM（生薬・素材・調製品・最終製品を含む）は世界の医療システムでますます重要になっているが、多くの原料は未試験・未監視で、安全性・有効性データが規制当局の基準に照らして不十分とされ、一部の国では完全には受容されていない。

HM の品質は栽培条件・収穫時期・収穫後処理（乾燥・抽出法・溶媒選択・保存条件）に左右され、化学組成と安定性の変動、ロット間差、治療効果の変動を生む。品質管理は安全性・有効性確保に不可欠な工程である。

既存の規制・薬局方では、定量的品質評価は通常少数の固有マーカー化合物の測定に基づく。フラボノイドは植物に広く分布する重要な生物活性物質群で、多くの HM の品質管理マーカーに広く用いられる。例:
- イチョウ（*Ginkgo biloba*）標準化抽出物 **EGb 761** は、マーカーとして **24% のフラボン配糖体**（主にケルセチン・ケンペロール・イソラムネチン）と **6% のテルペンラクトン**（ギンコライド A/B/C 2.8–3.4%、ビロバライド 2.6–3.2%）を含む。
- **トケイソウ（*Passiflora incarnata*）**の葉は **1.5% のフラボノイド**（ビテキシン換算）を含む。

フラボノイドはアグリコンまたは配糖体として存在し、メチル化・プレニル化などの置換パターンが構造の複雑性・多様性を生む。UV 系で容易に検出できマーカーに適し、炎症関連慢性疾患などへの治療的有用性も示されている。本総説は HM の品質管理における関心分子としてのフラボノイドの役割に焦点を当てる。

文献検索（Figure 1）は PubMed・ScienceDirect・Web of Science で「flavonoids」を「chromatography」「herbal medicine quality control」「marker」と組み合わせて実施。選択基準は (i) フラボノイド濃縮抽出物・画分の分析/定量にクロマト分析を用いる、(ii) 2017年1月–2024年10月の最近の研究論文、(iii) 得られた結果の影響・貢献の提示と考察。本総説は (i) 品質管理戦略のトレンド、(ii) 分析技術と HM 品質管理での重要性、(iii) 多変量解析の貢献に焦点を当てたデータ解析のトレンド、の3副題に分かれる。

![Figure 1（上）. 文献検索: PubMed/Scopus/Web of Science →「Flavonoids」×「chromatography」「Herbal medicine quality control」「marker」→ 包含基準。](assets/flavonoids-hm-qc-review/fig1-top.png)

![Figure 1（下）. 文献検索・選択プロセスの概念枠組み（包含基準と選別の続き）。](assets/flavonoids-hm-qc-review/fig1-bottom.png)

## 2. 品質管理戦略のトレンド

フラボノイドに焦点を当てた HM 品質管理の代表的な4戦略を以下に述べ、Table 1 にまとめる: (a) 指紋（fingerprints）、(b) メタボロミクス、(c) ネットワーク薬理、(d) Q-marker。

**Table 1. 生薬・ハーブ医薬品の品質管理戦略**

| 戦略 | 原理 | 限界 |
| --- | --- | --- |
| 指紋（Fingerprints） | 複数の化学マーカー | 特異性 |
| メタボロミクス | ターゲット／ノンターゲット | 明確な同定・再現性・データ処理 |
| ネットワーク薬理 | 計算＋実験的手法、複数化合物の相互作用 | データベース依存（正確性・完全性） |
| Q-markers | 計算＋実験的手法。spider-web（迅速スクリーニング）/ radar chart（詳細スクリーニングと構造解析） | 測定可能性と移植性（transferability） |

### 2.1 指紋（Fingerprint）

通常、定量的品質評価はマーカー化合物の測定に基づくが、多成分の相乗効果を無視する。薬局方では同定（定性）と定量の2試験が求められ、定性には TLC/HPLC で1–3マーカーのクロマトプロファイル、定量には最低1マーカーの定量が推奨される。単一マーカーで抽出物の化学的複雑性を考慮せず治療効果を保証できるかが課題。

ノンターゲット手法による全体的品質評価＝**化学指紋（chemical fingerprint）**が提案された。これは試料中の複数マーカーの存在を示す固有パターンで、HM 品質管理の強力な手法。**WHO** と各国規制当局（中国 SFDA、米 FDA、欧 EMA、韓国 MFDS）が指紋の概念を受容している。ただしクロマト指紋で化学的類似度が高くても効力が同等とは限らない。

類似度解析で試料間の類似/相違度を判定する。例: *Scutellaria baicalensis*（黄芩）の49バッチ、*Sophora japonica*（槐花）の57バッチを「中薬色譜指紋類似度評価システム」で自動マッチング。FTIR・UV・DSC 指紋（Keteling カプセル）、三次元量子指紋（QFP）等の手法もある。指紋‐効果相関解析（fingerprint-efficacy relationship）は、化学組成・生物活性の微差を示す試料で健康関連バイオマーカーを同定する有用な戦略。

限界として、この手法では HM 抽出物の全体像を網羅的に特徴づけるには特異性が制約となる。例: *Apocynum venetum*（羅布麻）葉ではフラボノイド含量が2倍差・RSD 最大75%。指紋は代表性を高めるが、標準化された予測的 QC ツールになるにはさらなる精緻化が必要。

### 2.2 メタボロミクス

メタボロミクスは生物学・分析化学・統計・生化学を統合する学際分野で、代謝産物量の質的・量的変化を理解する。**ターゲット**（少数の代謝物）と**ノンターゲット**（全メタボローム）の2アプローチがある。HM 品質管理では、産地・収穫期・生育期による化学組成の特徴づけ、生／加工品の判別マーカー同定、混入調査に応用。

例: UPLC-QTOF-MS で *Citrus reticulata*「陳皮（Chachi）」と保存年数の判別、*Eucommia ulmoides*（杜仲）関連製品の真正性確認、*Gleditsia sinensis*（皀莢）由来3生薬の完全判別。*Sophora flavescens*（苦参）では統合ワークフローで6主要フラボノイド（kurarinone, norkurarinone, kuraridin, kushenol N, trifolirhizin, genistein）を品質マーカーとして同定。課題は代謝物の明確な同定・データ再現性・データ処理。複雑なマトリックス・高価な装置・標準化パイプラインの欠如がルーチン適用を制限。

### 2.3 ネットワーク薬理（Network Pharmacology）

化学と薬理を結び、(i) 公開データベース等に基づく薬物標的予測モデルの構築、(ii) ハイスループットスクリーニングとバイオインフォマティクスによる「薬物‐標的‐疾患」ネットワーク予測モデルの再構築、を可能にし、HM 品質管理のバイオマーカー同定を支援する。例: *Murraya exotica*/*paniculata* の判別マーカー（7-メトキシクマリン vs ポリメトキシフラボノイド）が共通標的・経路を介し類似薬理を示唆。*Lonicera rupicola* のフラボノイドと潰瘍性大腸炎の標的予測。Shenxian-Shengmai 製剤で26抗不整脈候補、Tangshen 方剤で糖尿病性腎症関連13フラボノイド（naringin, daidzein, genistein 等）。限界は計算予測・不均質なDB依存、実験的検証不足、標準化ワークフロー欠如、生物学的利用能・薬物動態考慮の不足で、ルーチン/規制 QC には不向き。

### 2.4 Q-marker（品質マーカー）

Q-marker は Changxiao Liu が初めて明確化した新概念。**5要件**——追跡可能性・移行性（traceability/transitivity）、測定可能性、有効性、特異性、処方適合性（prescription compatibility）——を満たす化学成分と定義され、有効性・安全性に関連する。製薬工程の化学変化を特徴づけ、対応する Q-marker の測定で全製造工程を監視できる。メタボロミクス＋システム薬理で生／加工 TCM の判別に有用。

多次元「radar chart」モード（処方適合性寄与・含量・生物活性・予測生物学的利用能・ネットワーク薬理度に基づく）や、「Spider-web」モード（「含量‐安定性‐薬物動態‐薬理」を統合）が提案され、例: Mailuoshutong 丸（9生薬）で「含量‐薬物動態‐薬理」多次元戦略によりフラボノイドを Q-marker として同定。フラボノイドは分布の広さと薬理的関連性から最も研究された Q-marker の一つ（イチョウ、淫羊藿 *Herba epimedii* 等）。ただし抽出法・保存条件・マトリックス効果に敏感で再現性・標準化を損ねやすく、単一マーカーでは多成分・多標的性を反映しにくい。指紋やバイオアッセイ、調和されたバリデーションとの併用が必要。

## 3. 分析技術とHM品質管理での重要性

分析装置（特に分光・クロマト法）は HM の品質管理・標準化に重要。頑健・高精度・低コストで規制適合のクロマトプロトコル開発が求められる。TLC（高性能版 HPTLC）と HPLC（超高速版 UPLC/UHPLC）が、UV 等の分光法と組み合わせて、マーカー探索や薬局方モノグラフで広く用いられる。Table 2/3 にブラジル薬局方第6版・欧州薬局方第11版のフラボノイドマーカー収載例を示す。

**Table 2. ブラジル薬局方 第6版（Ph. Br.）でのフラボノイドマーカー収載例**

| 植物種 | 部位 | TLC | UV | HPLC |
| --- | --- | --- | --- | --- |
| Calendula officinalis（キンセンカ） | 花 | rutin | 総フラボノイド0.4%（hyperoside換算） | - |
| Matricaria chamomilla（カモミール） | 頭花 | - | - | apigenin-7-O-glucoside 0.025% |
| Echinodorus grandiflorus | 葉 | isoorientin, swertiajaponin | - | - |
| Crataegus monogyna / rhipidophylla（サンザシ）他 | 開花枝 | hyperoside | 総フラボノイド1.5%（hyperoside換算） | - |
| Achyrocline satureioides | 花序 | quercetin, luteolin, 3-O-methylquercetin | 総フラボノイド3.0%（quercetin換算） | 3-O-methylquercetin 0.6% |
| Passiflora edulis | — | isovitexin と isoorientin による定性プロファイル | | |
| Citrus aurantium subsp. aurantium（ダイダイ） | 葉 | isoorientin, isovitexin | 総フラボノイド1.0%（apigenin換算） | - |
| 〃 | 果皮（外果皮） | naringin | - | naringin 0.25% |
| Hypericum perforatum（セイヨウオトギリソウ） | 開花頂部 | Ph. Br. に未収載 | | |
| Ginkgo biloba（イチョウ） | 葉 | Ph. Br. に未収載 | | |
| Sambucus nigra（セイヨウニワトコ） | 花 | hyperoside, rutin | 総フラボノイド≥1.5%（quercetin換算） | rutin ≥1.0% |
| Styphnolobium japonicum（= Sophora japonica, エンジュ） | 開花 | Ph. Br. に未収載 | | |

**Table 3. 欧州薬局方 第11版（Ph. Eur.）でのフラボノイドマーカー収載例**（\* は HPTLC による同定）

| 植物種 | 部位 | TLC | UV/HPLC |
| --- | --- | --- | --- |
| Calendula officinalis | 花 | isorhamnetin-3-O-rutinoside, hyperoside\* | 総フラボノイド0.4%（hyperoside換算） |
| Matricaria chamomilla | 頭花 | - | apigenin-7-O-glucoside 0.025%（HPLC） |
| Crataegus monogyna 他 | — | — | vitexin-2′′-O-rhamnoside 誘導体 最低0.2%（vitexin-2′′-O-rhamnoside換算） |
| Passiflora incarnata | 開花枝 | hyperoside, vitexin-2′′-O-rhamnoside\* | 総フラボノイド1.0%（isovitexin換算。isovitexin/orientin/homoorientin を参照） |
| Citrus aurantium subsp. aurantium | 葉 | vitexin, isovitexin, orientin, homoorientin\* | - |
| 〃 | 果皮 | naringenin | - |
| Hypericum perforatum | 開花頂部 | hyperoside, rutin\* | - |
| Ginkgo biloba | 葉 | rutin（quercetin を参照） | フラボノイド0.5%（フラボン配糖体換算, HPLC） |
| Sambucus nigra | 花 | hyperoside, rutin | フラボノイド最低0.80%（isoquercitrin換算） |
| Styphnolobium japonicum（= Sophora japonica） | 開花 | rutin 最低6.0%（apigenin 7-glucoside を参照）。総フラボノイド最低8.0%（rutin換算）も | |

### 3.1 高性能薄層クロマトグラフィー（HPTLC）

TLC は植物化学成分分離に最も広く用いられ、低コスト・簡便で全薬局方試験に必須。HPTLC は感度・分解能・再現性・スループットで TLC に優り、混入検出に頑健。原料取得・製品開発・中間工程管理・規制適合の情報を提供。低い理論段数・短い展開距離という限界はあるが、簡便さで価値が高い。

例: *Terminalia bellirica*/*chebula* のマーカー同定で HPTLC が国際ガイドラインに適合し、HPLC・LC-MS・GC-MS の代替に。12種の *Passiflora* で C-配糖体（isoorientin, orientin, vitexin, isovitexin）を参照し種特異プロファイルを確立。クルクミンとガランギン（フラボノイド）の同時定量、インド産プロポリスの複数マーカー、St. John's wort 製品の真正/非真正の混入識別、*Setaria italica* のケンペロール・ケルセチン定量など。バイオオートグラフィー（DPPH 抗酸化、アセチルコリンエステラーゼ阻害）にも応用。定量精度は試料アプリケーション・溶媒組成・デンシトメトリ較正に依存し、絶対定量には LC/MS に劣るが、アクセス性・スループットで優れる。

### 3.2 液体クロマトグラフィー（LC）

LC（UPLC・UHPLC・HPLC）は各種検出器（UV・DAD・PDA・MS）と組み合わせ、フラボノイド定量に必須。規制ガイドラインでバリデーション可能なため薬局方モノグラフに頻用。DAD は多波長同時検出、MS は低存在量・弱スペクトルのフラボノイド検出に有利で、LC-DAD/LC-MS/LC-DAD-MS は未知フラボノイドの同定・サブクラス特徴づけに有用。

例: HPLC-DAD で *Lippia alba* の季節変動（tricin-7-O-diglucuronide が夏に高い）、11種 *Hypericum* で5フラボノイドの分類学的価値、*Agastache rugosa* の生育段階別マーカー（tilianin 群）、2種 *Jatropha* の C-配糖体による判別。真正/混入識別では *Verbena officinalis* と混入種 *Aloysia citriodora* の判別など。LC-MS/MS（特に MRM モード）は弱UV吸収・低濃度・夾雑物に隠れる成分の品質評価に好適。OLE（オンライン抽出）-HPLC-DAD-QTOF-MS/MS、分取 HPLC＋「knock-out」戦略（紅花のフラボノイド配糖体 C7-OH をマーカーに）など新技術も。例: Gungha-tang（韓国伝統湯液）の9マーカー法で liquiritin apioside・naringin・hesperidin を ng レベル・回収率89–118%で検出。LC は広範な前処理・条件最適化・マトリックス別バリデーションを要し、ルーチン使用には簡便な補完的スクリーニングとの併用が有用。

> 補足: 本節では NMR・IR（NIR/FT-IR）・電気化学指紋・「プール QC 試料」なども言及。例: ¹H-NMR で *Hibiscus sabdariffa* の抽出法比較（冷浸がアントシアニン保持に最適）、¹³C-NMR メタボリックフィンガープリント、HPTLC＋NMR による *Glycyrrhiza*（甘草）種の判別。

## 4. データ解析のトレンド: 多変量解析の貢献

分析法が生むデータは適切な処理を要する。過去5年で多変量解析（情報マイニング）と分子ネットワーク（データ可視化）が大きく進展。HM 産業のルーチン QC ではまだ一般的でないが、複雑なデータセット解析と、より適切なマーカーの同定・検証に重要。

### 4.1 ケモメトリクスと分子ネットワークの貢献

収集・前処理後、分子ネットワーク（MN）で特徴抽出・構造解明・パターン認識を行い、並行/後続で多変量解析（SVM・GRA・PLSR・ANN・PCA・HCA・MCR-ALS 等）を適用。MN は構造類似性で分子を整理し、ケモメトリクスで(1) 複雑性低減（PCA・クラスタリング）、(2) クラス予測（混入試料の同定: SVM・ANN・PLS）、(3) 類似/外れ値の同定（GRA）、(4) MN との統合（化合物クラスタ‐生物活性の関係定量）を実現。例: *Epimedium koreanum*（4地域）の判別、*Chrysanthemum* で1万超の特徴から21品質マーカー、*Cudrania tricuspidata* のケルセチン/ケンペロール抱合体マッピング。計算負荷・スペクトルライブラリ・標準化ワークフローへの依存が課題で、従来法を置換せず補完する。

### 4.2 分子ネットワーク（Molecular Networking）

LC-MS の大規模データから、MN は MS/MS データ処理の強力ツール。「類似構造の化合物は類似のフラグメントを生む」前提で **GNPS プラットフォーム**上で自動クラスタリングし、多変量統計で偽陽性を回避。例: *Cassia angustifolia*/*acutifolia* の色違い品種、*Cuscuta chinensis*（菟絲子）種子の2D-LC/IM-QTOF-MS 統合、*Glycyrrhiza uralensis*（甘草）の根・茎・葉・種子の網羅的特徴づけ、*Crescentia cujete* 果肉で15フラボノイド同定。Feature-based MN は近縁異性体の分解能を高める。*Paris polyphylla* で222化合物（新規4フラボノイド含む）、10生薬 TCM 方剤の判別など。曲線化されたスペクトルライブラリ・高品質フラグメントデータと専門家の監督に依存。

### 4.3 ケモメトリクス手法

定性には類似度解析・探索学習・分類アルゴリズム、定量には多変量較正。手法は PCA・PLS・OPLS-DA・SVM・GRA・SA・HCA・ヒートマップ等。例: Senna の品質等級（緑/黄/病害）でフラボノイド濃度が品質低下とともに増加、甘草の年数・収穫期・産地別の7フラボノイド指標、*Lantana camara* の luteolin-7,4′-O-diglucoside、硫黄燻蒸 *Smilax glabra*（土茯苓）の astilbin と新生含硫化合物の判別。指紋‐生物活性の関係構築にも有用。過適合防止のため統計的管理・前処理が必要で、クロマト/分光解析との併用が最も効果的。

## 5. 結論（Conclusions）

本総説は HM 品質管理におけるフラボノイドの多用途で信頼できるマーカーとしての中心的役割を強調する。古典的薬局方技術（HPTLC・HPLC-DAD）は頑健性・アクセス性・再現性・規制受容性からルーチン分析の基盤であり続けるが、多成分相互作用への洞察は限定的。品質評価のパラダイムは、全植物化学マトリックスと生物学的関連性を捉える全体的・システムレベルのアプローチ（化学指紋・メタボロミクス・ネットワーク薬理・Q-marker）へ決定的に移行している。

UHPLC-HRMS は広範なフラボノイド代謝物を高感度に同定し、ハイフネーテッド技術（HPLC-DAD-MS, HPLC-NMR）は多次元的洞察を与える。ケモメトリクスと分子ネットワークは大規模データの隠れた関係を可視化し、真正性確認・混入検出・化学指紋と生物活性の連結・新規マーカー発見に有用。

一方、ルーチン産業 QC への普及には課題が残る: 適切なマーカー選択の文脈依存性、高価な高分解能装置・専門的バイオインフォマティクス、標準参照物質・曲線化スペクトルライブラリの欠如、非標準化データ処理による再現性問題、規制枠組みがアルゴリズム駆動解析を未だ十分認知していないこと。将来は、(1) 簡素・小型・グリーン・低コストなワークフロー、(2) AI/機械学習によるデータ処理・バイオマーカー発見の自動化、(3) マルチオミクス統合、(4) 検証・適用の国際的合意（オープンアクセススペクトルDB・標準化プロトコル・規制受容のガイドライン）に注力すべき。古典的化学分析の信頼性と計算・メタボロミクス的アプローチの解釈深度を、生物学的関連性に基づいて統合することが最も有望な道である。

---

## 訳者補足（実務向けメモ）

> 以下は原文には無い、QC実務向けの整理（訳者注）。

- **全体像のマップとして有用**。フラボノイドQCの「戦略（指紋/メタボロミクス/ネットワーク薬理/Q-marker）×技術（HPTLC/LC-DAD/LC-MS）×データ解析（ケモメトリクス/分子ネットワーク）」の三層を俯瞰でき、自社のQC設計の位置づけ確認に使える。
- **ルーチンの現実解は HPTLC＋HPLC-DAD**。規制受容・低コスト・再現性で依然ベースライン。先進手法（UHPLC-HRMS, 分子ネットワーク, ケモメトリクス）は**マーカー探索・混入検出・真正性確認の強化**として併用する位置づけ。
- **薬局方の具体例（Table 2/3）が実務に直結**。例: イチョウ葉=フラボン配糖体0.5%（Ph.Eur.）、エンジュ（槐花）=rutin 6.0%以上、カモミール=apigenin-7-O-glucoside 0.025% など、換算基準成分と規格値の決め方の前例として参照価値が高い。
- **限界の共通項＝「化学的類似≠効力同等」**。指紋の類似度が高くても薬効が同じとは限らない。フラボノイドは抽出・保存・マトリックスに敏感で、単一マーカー依存は避け、複数マーカー＋（可能なら）生物活性アッセイで裏取りするのが安全。
- 本論文は**総説**なので、引用された個別手法・事例は一次文献（原文の参考文献）にあたって詳細条件を確認するのが望ましい。Figure 1 は文献選定フロー、Table 1 は戦略比較の早見表。
