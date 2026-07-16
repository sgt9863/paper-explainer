---
title: 生薬の一標準多成分定量（SSDMC/QAMS）における相対応答係数（RRF）のためのUV波長と標準液濃度の設計——虎杖（Polygonum cuspidatum）への応用
slug: ssdmc-rrf-uv-wavelength-concentration-polygonum-cuspidatum
source_pdf: daf20216-1s2.0S0731708515300091main.pdf
doi: https://doi.org/10.1016/j.jpba.2015.05.028
drive_url: (未アップロード：ユーザー返却PDF)
level: researcher
date: 2026-07-08
published: true
tags: [生薬, QC・品質評価, 多成分定量, HPLC・UPLC, メソッド開発・QbD]
digest_tagline: 一標準多成分定量（QAMS/SSDMC）の要である相対応答係数RRFの装置間再現性を、UV波長選択（ODWP法）と標準液濃度の2つで安定化
digest_stats: [IF|3.1（J. Pharm. Biomed. Anal.・JCR2024・Q2）, 生薬|虎杖（こじょう・Polygonum cuspidatum）, 手法|SSDMC/QAMS＋相対応答係数RRF, 装置|5台のHPLC-UVで再現性検証, 試料|虎杖10バッチ・外標準法との偏差<0.2%]
digest_points: [一標準多成分定量（SSDMC＝QAMS）は標準品1つで複数成分を定量する安価な生薬QC法だが装置間の相対応答係数RRFの不一致が課題――本研究はUV波長と標準液濃度の2因子でRRFを安定化, 内標準/被験物質のピーク面積比を波長に対してプロットしスペクトルの平坦部を検出波長に選ぶODWP法を提案――最適化300nmはエモジン/エモジン配糖体でRSD0.38%（最大吸収290nmの2.80%より大幅改善）, 単一点法（OSP）は低濃度で応答係数RFが不安定（切片b＝ノイズの寄与）――濃度が49b/k（エモジンで約7μg/mL）超なら安定と理論・実験で示し虎杖10バッチで外標準法と偏差<0.2%を達成]
digest_chart_label: RRFの装置間再現性（RSD%）——検出波長の選び方
digest_chart: [最大吸収290nm（従来）|2.80, ODWP最適化300nm（平坦部）|0.38]
summary: 一標準多成分定量（single standard to determine multi-components, SSDMC。QAMS＝quantitative analysis of multi-components by single-marker とも呼ぶ）は、市販の標準品1つを基準に複数成分を同時定量する、生薬品質管理の実用的で安価な手法である。しかしその要である相対応答係数（relative response factor, RRF）が装置間で一致しないことが課題となる。本研究は、RRFの再現性を左右する2つの鍵——UV検出波長と標準液濃度——の影響を、虎杖（Polygonum cuspidatum）の4成分（エモジン・レスベラトロール・エモジン-8-O-β-D-グルコピラノシド・ポリダチン）を対象に検討した。内標準と被験物質のピーク面積比を波長に対してプロットし、曲線の平坦部を検出波長に選ぶ最適検出波長予測（ODWP）法を提案。最適化した300nmはエモジン/エモジン配糖体でRSD 0.38%（最大吸収290nmの2.80%より大幅に良好）を5台の装置で達成した。また単一点法（OSP）では低濃度で応答係数が不安定になり、切片b（システムノイズ）の影響が無視できる濃度49b/k（エモジンで理論上約7μg/mL）超で安定化することを示した。虎杖10バッチで外標準法と偏差0.2%未満の一致を得た。
---

<!--
Yang TW, Zhao C, Fan Y, Qi LW, Li P. Design of ultraviolet wavelength and standard
solution concentrations in relative response factors for simultaneous determination of
multi-components with single reference standard in herbal medicines.
J Pharm Biomed Anal 114 (2015) 280-287. doi:10.1016/j.jpba.2015.05.028 の全訳密度日本語版。
-->

> **補足（本サイトでの位置づけ）:** 本論文は、当サイトが繰り返し扱う **一標準多成分定量（QAMS＝quantitative analysis of multi-components by single-marker、本論文では SSDMC と呼称）** の「実務的な落とし穴」を正面から扱った研究である。QAMS/SSDMC は、高価で入手困難な標準品を1つだけ用意し、他成分は **相対応答係数（RRF）** で換算して定量する——という、生薬 QC のコストを劇的に下げる手法で、中国薬典にも採用されている。しかしその弱点は「RRF が装置ごとにばらつく」こと。本論文は、そのばらつきの2大要因が **①UV検出波長の選び方、②標準液濃度** であることを突き止め、①には「内標準/被験物質のピーク面積比を波長に対してプロットして平坦部を選ぶ」という直感的で実装しやすい **最適検出波長予測（ODWP）法**、②には「単一点法では 49b/k を超える濃度を使え」という定量的な指針を与える。題材の虎杖（こじょう・Polygonum cuspidatum・Hu Zhang）は中国薬典収載の生薬で、含有するエモジン（大黄などにも含まれるアントラキノン）やレスベラトロール・ポリダチンは薬理活性でも注目される。当サイトの QAMS 論文群（三黄瀉心湯・黄芪など）の「RRF をどう安定させるか」という共通課題への、方法論的な回答として読める。

---

# 書誌情報

- **原題:** Design of ultraviolet wavelength and standard solution concentrations in relative response factors for simultaneous determination of multi-components with single reference standard in herbal medicines
- **和題（本稿）:** 生薬の一標準多成分定量（SSDMC）における相対応答係数（RRF）のためのUV波長と標準液濃度の設計
- **著者:** Ting-Wen Yang, Chao Zhao, Yong Fan, Lian-Wen Qi（責任著者）, Ping Li（責任著者）
- **所属:** 天然薬物国家重点実験室、中国薬科大学（China Pharmaceutical University, 南京 210009, 中国）
- **責任著者:** L.-W. Qi（Qilw@cpu.edu.cn）, P. Li（Liping2004@126.com）
- **掲載誌:** Journal of Pharmaceutical and Biomedical Analysis 114 (2015) 280–287
- **DOI:** 10.1016/j.jpba.2015.05.028
- **受理経緯:** 2015年2月25日受付 / 2015年5月21日改訂受付 / 2015年5月28日受理 / 2015年6月3日オンライン公開
- **© 2015 Elsevier B.V.**
- **キーワード:** 一標準多成分定量（SSDMC）／相対応答係数（RRF）／紫外検出波長／標準液濃度／虎杖（Polygonum cuspidatum）
- **雑誌インパクトファクター:** 3.1（Journal of Pharmaceutical and Biomedical Analysis・JCR2024・Q2。出典により3.4とも記載）

---

# 要旨（Abstract）

一標準多成分定量（single standard to determine multi-components, SSDMC）は、生薬（herbal medicines, HMs）の品質評価に実用的なパターンである。しかし、異なる装置における相対応答係数（relative response factor, RRF）の潜在的不一致のため、依然として難しい課題を抱える。本研究では、RRF の再現性に対する2つの鍵、すなわち **UV波長** と **標準液濃度** の影響を調べた。

RRF 再現性に対する UV 波長の影響は、ピーク面積比（内標準 vs 被験物質）と波長の関係をプロットして検討した。**好ましい波長は曲線の平坦部に設定すべき** である。最適化した 300 nm は、5台の装置でエモジン/エモジン-8-O-β-D-グルコピラノシドについて **RSD 0.38%** を生じ、最大吸収波長 290 nm で得た 2.80% よりはるかに低かった。

次に、エモジンの標準液濃度がその応答係数（RF）に及ぼす影響を調べた。単一点法（one single point, OSP）では、**49b/k 未満の低濃度** が RF に有意な変動をもたらした。エモジンでは、濃度が 7.00 µg/mL より高いとき低い標準偏差（SD）0.13、7.00 µg/mL 未満では高い SD 3.71 が得られた。

開発した SSDMC 法を虎杖（Polygonum cuspidatum）10試料の標的成分決定に適用し、従来の検量線法と比べて **偏差1%未満** の同等な真度を示した。

---

# 1. 序論（Introduction）

生薬製品への世界的な市場需要の増加に伴い、品質管理は重要な課題となった。単一実体の化学薬品と異なり、生薬は多様な植物化学成分からなる。多くの場合、生薬はマルチ成分の相乗作用から薬効を生じる。過去数十年、単一マーカー化合物の定量から複数成分の定量へという明確な傾向がある[1–4]。生薬製品中でできるだけ多くの化合物を定量する多数の方法が開発された[5]が、大半の標準化合物の商業的入手困難性と高コストのため、依然として実験室段階に留まっている。

**一標準多成分定量（SSDMC）** は、1つの標準品を基準に多数の成分を同時定量する代替法である[6]。研究機関や薬局方で複雑な植物製品の品質管理に頻繁に適用される[4, 7–12]。この方法は **複数成分の同時定量（SDMC）** や **単一マーカーによる多成分定量分析（QAMS）** とも呼ばれる[9, 10]。SSDMC は生薬製品の品質を包括的に管理する便利で安価な方法だが、異なる装置での RRF の潜在的不一致のため依然として課題を抱える。

**RRF は SSDMC 法の礎石** であり、基準化合物の応答係数（RF）と被験物質の RF の比として計算される。HPLC-UV アッセイで、薬物自身の応答に対して関連化合物を定量するのに広く用いられる。多くの薬物不純物は薬物自身の誘導体で UV スペクトルが非常に類似する。注目すべきは、**生薬製品中の二次代謝産物は、同じ骨格をもっていても、その精巧な化学構造のため UV スペクトルが異なる** こと。この問題への注意不足が、生薬分析での SSDMC 法使用に偏差をもたらしうる。

RRF の安定性に影響しうる因子（環境パラメータ・操作パラメータ・ピーク測定パラメータ）が調べられ[6]、RRF は **UV 検出器に最も敏感** であることが観察された。しかし UV 検出波長の最適化は強調されず、多くの場合、検出波長は内標準の最大 UV 吸収波長に基づいて選ばれた。これは精度評価で必ずしもうまくいかない。SSDMC で RRF の精度・真度を高める好ましい UV 波長の選び方は未解決だった。もう一つの注目因子は標準液濃度の選択で、単一点法（OSP）で RRF を計算する際、RRF は低濃度より高濃度でより安定と思われた。

本研究は、RRF の変動に対する2つの鍵——UV 波長と標準液濃度——の影響を調べることを目的とした。エモジンとレスベラトロールを内標準に用い、それぞれエモジン-8-O-β-D-グルコピラノシドとポリダチンの濃度を計算。この4化合物は虎杖の主要成分である[13]。

---

# 2. 実験（Experimental）

## 2.1. 化学物質と材料
エモジン、レスベラトロール、エモジン-8-O-β-D-グルコピラノシド、ポリダチン、バイカリン、バイカレイン（原著 Fig. 1）は中国薬品生物製品検定所（北京）から入手（純度 >98%）。エタノール・メタノール（分析グレード）は Sinopharm（上海）、アセトニトリル・ギ酸（HPLC グレード）は TEDIA（米国）、精製水は Millipore 精製システムで調製。虎杖の代表10バッチを四川・江蘇・湖北・安徽・江西省から採集し、Lian-Wen Qi 教授が同定。証拠標本は中国薬科大学に保管。

## 2.2. 装置（5台の HPLC-UV）
- **装置1:** Shimadzu LC-20AT（四元送液＋ダイオードアレイ検出器 DAD）
- **装置2:** Shimadzu LC-20AT（四元送液＋可変波長検出器 VWD）
- **装置3:** Agilent 1260（二元送液＋VWD）
- **装置4:** Waters 2996（四元送液＋VWD）
- **装置5:** Thermo Ultimate 3000（VWD）

各装置はオンライン脱気装置とオートサンプラーを装備。試料は3バッチの Agilent Eclipse Plus-C18 カラム（3.5 µm, 4.6 mm×100 mm）で分離。

## 2.3. クロマトグラフィー条件
移動相：0.05% ギ酸水（A）とアセトニトリル（B）。グラジエント：0–2 min 5→15% B、2–11 min 15→32% B、11–15 min 32→58% B、15–22 min 58% B、22–23 min 58→100% B、23–24 min 100→5% B、24–30 min 5% B。流速 1.0 mL/min、注入量 10 µL、**UV波長 300 nm**、カラム温度 30 ℃。

## 2.4. 溶液の調製
- **標準溶液:** エモジン・レスベラトロール・エモジン配糖体・ポリダチンを正確に秤量し 10 mL 褐色メスフラスコでメタノールに溶解・定容。混合ストックをメタノールで段階希釈して検量線用標準溶液を調製。
- **試料溶液:** 虎杖粉末 400 mg を 100 mL 三角フラスコに入れ、65% エタノール 40 mL を加えて50分間超音波処理、50 mL 褐色メスフラスコにろ過。

## 2.5. RRF の計算
RRF は基準物質と被験物質の RF の比（RF_RS/RF_A）。ストック溶液を適切な濃度に希釈して検量線を作り RF（線形回帰式の傾き）を計算。4基準物質の検量線から RF を得、エモジン/エモジン配糖体、レスベラトロール/ポリダチンの傾きの比として RRF を算出。

## 2.6. RRF の頑健性・堅牢性
頑健性（ruggedness）は併行精度・異なる操作者・異なるバッチのカラム・日間・日内・異なる装置で試験。堅牢性（robustness）は流速とカラム温度の影響を検討。

## 2.7. UV 波長選択（4ステップ）
1. エモジン（E）・レスベラトロール（R）・エモジン配糖体（EG）・ポリダチン（P）を含む混合標準溶液を HPLC-UV で 200–400 nm 分析。
2. 200–400 nm の2 nm ごとに AE/AEG と AR/AP のピーク面積比を計算。
3. AE/AEG・AR/AP と UV 波長の関係を、比を y 軸、波長を x 軸にプロット。
4. **比較的高い UV 吸収をもつ平坦部** を好ましい検出波長に選ぶ。

## 2.8. 分析法バリデーション
SSDMC 法を選択性・LOD・LOQ・真度・直線性・精度（日内/日間、異なる操作者・装置・カラムバッチ）・安定性で検証し、伝統的外標準法の結果と比較。

---

# 3. 結果と考察（Results and discussion）

## 3.1. UV 波長選択

内標準と被験物質のスペクトルに応じ、波長のわずかなシフトが RRF を日ごと・装置ごとに変動させうる。通常、UV 波長精度の規格は ±2.0 nm。RRF が検出波長に敏感なら、波長のわずかなシフトが応答に明白な変化をもたらし、装置間の RRF の再現性を悪化させる。

RRF が公称波長付近の検出波長のわずかな変動に敏感かは、公称波長の両側の狭い波長範囲で RRF を比較して予測できる。内標準と被験物質の UV スペクトルの検討でも予測可能。多くの化合物のスペクトルは狭い波長範囲で線形近似できる〔式(1) A = Sλ + I〕。公称検出波長 λ0 を横軸のゼロとすると、公称波長での応答比 R0 と 1 nm 大きい R0+1 は式(2)(3)で計算できる：

$$
A = S\lambda + I \tag{1}
$$
$$
R_0 = \frac{I_{RS}}{I_A} \tag{2}
$$
$$
R_{0+1} = \frac{S_{RS} + I_{RS}}{S_A + I_A} \tag{3}
$$

S_RS・I_RS は基準物質スペクトルの傾きと切片、S_A・I_A は被験物質スペクトルの対応値。1 nm 変化の効果は式(4)：

$$
\text{1 nm 変化の効果} = \frac{R_{0+1}}{R_0} = \frac{S_{RS} + I_{RS}}{S_A + I_A} \times \frac{I_A}{I_{RS}} \tag{4}
$$

$$
RRF_{RS/A} = \frac{RF_{RS}}{RF_A} = \frac{A_{RS}/C_{RS}}{A_A/C_A} = \frac{A_{RS}}{A_A} \times \frac{C_A}{C_{RS}} \tag{5}
$$

式(4)から、小さな波長変化に対する応答頑健性へのスペクトルの影響について一般的結論が得られる：
1. **基準物質と被験物質のスペクトルの傾きが低い（対象範囲で平坦）なら、1 nm 変化の効果は1に近づき、結果は再現的。**
2. 同方向の類似した傾きなら、結果はより再現的。
3. **反対符号の傾きでは再現性が悪い。**

これらは本研究提案の **最適検出波長予測（optimum detection wavelength prediction, ODWP）法** の結果とよく合う。RRF が波長で変動するのは基準物質と被験物質の応答が異なるため〔式(5)〕、すなわち RRF の波長変化は A_RS/A_A の波長変化で表せる。

原著 Fig. 2 は AE/AEG と AR/AP の波長変化を示す。**AR/AP はほぼ平坦**（レスベラトロールとポリダチンのスペクトルがほぼ同じ）。**AE/AEG には4つの平坦部**（エモジンとエモジン配糖体のスペクトルがこれら4部分で類似傾向）：
1. 212–228 nm は末端吸収に近く深刻な干渉。
2. レスベラトロールは虎杖で比較的低含量で 246–250 nm・272–276 nm の吸収が低く、最適でない。
3. 294–302 nm はエモジンとエモジン配糖体の最大吸収ではないが、試料中で比較的高含量のため検出感度に影響せず。

最終的に **300 nm を検出波長に選定**。エモジン/エモジン配糖体の RRF 安定性を 300 nm と 290 nm（基準物質エモジンの最大吸収）で異なる装置で比較したところ、前者がより安定（原著 Table 1）。最適化300 nm は5台で **RSD 0.38%**、一般に使われる最大波長 290 nm の 2.80% よりはるかに低い。レスベラトロール/ポリダチンは UV 吸収の類似性から波長シフトの有意な影響なし。

**単一標準としてエモジン(E)のみで4成分を定量** した場合、300 nm で E/R・E/P は5台で RSD 4.32%・5.11%（Table S1）と不満足。これは主にエモジンとレスベラトロール、またはエモジンとポリダチンの UV スペクトルの劇的な違いによる。**ODWP 法で平坦部が予測されないとき SSDMC は好ましくない。**

さらに2つの典型化合物 **バイカリン(B)・バイカレイン(BE)** で予測戦略を検証。AB/ABE は 262–278 nm に平坦部（Fig. S1）。4波長（最大吸収244・276・316 nm、平坦部264 nm）を比較すると、244・316 nm は RSD 3.14%・3.10% だが、平坦部の 264–276 nm は 0.62%・0.59% とはるかに低い（Table S2）。RRF 安定性と検出波長付近の UV 吸収の類似性の相関が証明され、ODWP 法が適切な検出波長選択に有用と示唆。

## 3.2. 標準液濃度が応答係数に及ぼす影響

生薬で RRF を計算する2手法：**LRE 法（線形回帰式 line regression equation）** と **OSP 法（単一点 one single point）**。Gao ら[9]は LRE 法でアロエエモジン/エモジンの RRF を、Hou ら[6]は OSP 法でタンシノン I・クリプトタンシノン/タンシノン IIA の RRF を計算し、標準液濃度が RRF 安定性に影響することを観察した。

RRF は基準物質と被験物質の RF の比で、その一貫性は RF の一貫性に依存する。OSP 法では RF はピーク面積 vs 濃度の平均比〔式(6)〕、LRE 法では RF は線形回帰式の傾き〔式(7)〕。式(6)は式(8)に変換でき、切片 b は分析システムのノイズを表す。濃度 C 増加で b/C は0に近づき、OSP 法の RF は LRE 法と等しくなる〔式(9)〕：

$$
RF = \frac{A}{C} \tag{6}
$$
$$
A = kC + b \tag{7}
$$
$$
RF = \frac{kC + b}{C} = k + \frac{b}{C} \tag{8}
$$
$$
RF = k + \frac{b}{C} \approx k \quad (b \ll C) \tag{9}
$$

LRE 法の RF は直線範囲で安定だが、OSP 法の RF は直線範囲内で基準標準液濃度が閾値以上のときのみ安定。中国「薬品生産品質管理規範（GMP）」ガイダンス（2010年版）は、HPLC-UV アッセイの線形回帰の切片が表示量濃度の応答の2%未満であることを要求〔式(10)(11)〕[14]。これは表示量濃度が **49b/k より高い** ことを要求〔式(12)〕：

$$
b \le A_\text{labelled} \times 2\% = (kC_\text{labelled} + b) \times 2\% \tag{11}
$$
$$
C_\text{labelled} \ge \frac{49b}{k} \tag{12}
$$

すなわち濃度が 49b/k より高いとき b/C は無視できる。エモジンでは OSP 法の RF は濃度が理論上 **7 µg/mL 超** で安定化。原著 Table 2 の実測データと一致。

被験物質濃度がこの限界より低い場合、正確な結果を得るには試料を濃縮すべき。

### 原著 Table 1：異なる装置での 300 nm・290 nm における RRF 安定性

**300 nm 検出**（RF＝応答係数、RRF＝相対応答係数）：

| 成分 | 装置1 | 装置2 | 装置3 | 装置4 | 装置5 | RSD(%) |
|---|---|---|---|---|---|---|
| RF: E | 27.39 | 29.25 | 26.94 | 27.82 | – | 0.49 |
| RF: R | 78.83 | 76.66 | 70.91 | 71.56 | – | 1.28 |
| RF: EG | 15.54 | 16.67 | 15.30 | 15.91 | – | 0.28 |
| RF: P | 44.96 | 43.00 | 39.68 | 40.00 | – | 0.71 |
| RRF: E/EG | 1.76 | 1.75 | 1.76 | 1.75 | 1.77 | **0.38** |
| RRF: R/P | 1.75 | 1.78 | 1.79 | 1.79 | 1.79 | 0.84 |

**290 nm 検出**（エモジンの最大吸収）：

| 成分 | 装置1 | 装置2 | 装置3 | 装置4 | 装置5 | RSD(%) |
|---|---|---|---|---|---|---|
| RF: E | 41.09 | 42.28 | 40.04 | 40.50 | – | 0.72 |
| RF: R | 62.14 | 60.91 | 57.21 | 58.07 | – | 1.06 |
| RF: EG | 26.26 | 27.33 | 25.65 | 26.86 | – | 0.44 |
| RF: P | 35.42 | 33.95 | 31.98 | 32.36 | – | 0.59 |
| RRF: E/EG | 1.56 | 1.55 | 1.56 | 1.51 | 1.63 | **2.80** |
| RRF: R/P | 1.75 | 1.79 | 1.79 | 1.79 | 1.79 | 0.97 |

（E: エモジン、R: レスベラトロール、EG: エモジン-8-O-β-D-グルコピラノシド、P: ポリダチン。E/EG の RRF は 300 nm で 0.38%、290 nm で 2.80% と、平坦部選択の効果が明瞭。）

### 原著 Table 2：OSP 法と LRE 法によるエモジンの応答係数

濃度を 241.56 µg/mL から 0.09 µg/mL まで下げると、OSP 法の RF は高濃度域で ~30.0 と安定だが、**7 µg/mL 未満で不安定化**（6.59 µg/mL で 30.41、0.11 µg/mL で 37.04、0.09 µg/mL で 41.97 と上昇）。広範囲平均 RF は OSP 法で 31.60 ± 2.90、7 µg/mL 未満に限ると 33.45 ± 3.71（SD 大）。一方 LRE 法（広範囲）は Y=30.02X+4.320（R²=1）で RF≈30.02 と安定。**LRE 法は直線範囲全体で安定、OSP 法は閾値7 µg/mL 以上でのみ安定** という結論を裏づける。

## 3.3. RRF の頑健性・堅牢性

RRF の頑健性・堅牢性試験を実施（Table S3-1〜S3-7）。併行精度（n=6）は RSD 0.07%（エモジン配糖体）・0.20%（ポリダチン）と小変動。中間精度は異なる分析者（n=3）・カラムバッチ（n=3）・カラム温度（28/30/32 ℃）・日内（n=3）・日間（n=3）・流速（0.8/1.0/1.2 mL/min）で試験し、いずれも **RSD 1%未満** の良好な精度。

## 3.4. 実生薬試料への SSDMC 適用

虎杖の乾燥根は中国薬典に収載され世界に広く分布[12]。近年の薬理・臨床研究で高血圧・高脂血症・心血管・神経変性疾患への効果が示されている[15]。エモジン・レスベラトロール・エモジン配糖体・ポリダチンが4主要成分で品質管理の化学マーカーに使える[13]。実試料適用では、SSDMC 法でエモジン配糖体・ポリダチンの濃度を、それぞれエモジン・レスベラトロールから計算した RRF で測定し、真正標準品とも比較。

原著 Fig. 4 は標準溶液と虎杖エキスの HPLC プロファイル。最適化条件下で4成分は干渉なくベースライン分離。バリデーション（Table S4）：直線性 r²>0.999、LOD 7.9–28.86 ng/mL、LOQ 27.65–115.44 ng/mL、回収率 97.62–99.37%、併行精度 RSD 0.40–1.77%、安定性 RSD 0.16–0.25%、サンプリング精度 RSD 0.05–0.26%。10バッチを SSDMC と検量線法の両方で分析（原著 Table 3）、両法のエモジン配糖体・ポリダチン含量の偏差は **0.2%未満**。

### 原著 Table 3：SSDMC 法と外標準法の再現性（10バッチ・抜粋）

偏差 |(A−B)|/(A+B)（%）。例：試料1 ポリダチン 1.389%（SSDMC）vs 1.388%（外標準）偏差0.036、エモジン配糖体 0.870 vs 0.871 偏差0.057。試料6 ポリダチン 2.640 vs 2.638 偏差0.038、エモジン配糖体 1.697 vs 1.700 偏差0.088。全10バッチで偏差はいずれも0.11%未満で、SSDMC 法が外標準法と同等の真度をもつことを実証。

---

# 4. 結論（Conclusion）

市販標準化合物の相対応答係数に対して複数成分を定量することは、生薬品質管理の一般的戦略である。本研究では、UV 波長と標準液濃度の選択が RRF の良好な頑健性を得る鍵となった。

- 内標準と関与化合物のスペクトルに応じ、波長のわずかなシフトが RRF の変動を引き起こしうる。**ピーク面積比（内標準 vs 被験物質）と UV 波長の関係をプロットすること（ODWP 法）** が、応答頑健性への波長の影響を予測する方法として提案された。
- RRF を決定する基準標準液の濃度は、OSP 法使用時、**直線範囲内であるだけでなく適切な量（49b/k）以上** であるべき。

本研究の知見は、波長と標準液濃度の頑健性が再現性問題を呈しうる状況への指針として一般化される。

---

# 謝辞

本研究は中国国家自然科学基金（No. 81222052, 81173497, 81421005）と江蘇省傑出青年科学基金（BK20130025）の一部支援を受けた。原稿編集について中国薬科大学の Raphael N Alolga に感謝する。

---

# 主要参考文献（抜粋）

- [1] Li SP, Zhao J, Yang B. Strategies for quality control of Chinese medicines. J Pharm Biomed Anal. 2011;55:802–809.
- [6] Hou JJ, et al. Ruggedness and robustness of conversion factors in method of simultaneous determination of multi-components with single reference standard. J Chromatogr A. 2011;1218:5618–5627.
- [9] Gao XY, Jiang Y, Lu JQ, Tu PF. One single standard substance for the determination of multiple anthraquinone derivatives in rhubarb using HPLC-DAD. J Chromatogr A. 2009;1216:2118–2123.
- [10] Wang ZM, et al. Multi-components quantitation by one marker new method for quality evaluation of Chinese herbal medicine. Chin J Chin Mater Med. 2006;31:1925–1928.（QAMS の原典的文献）
- [11] United States Pharmacopeia 35-NF 30, 2011, p. 1271.
- [12] Pharmacopoeia of People's Republic of China, vol. I, 2010.（虎杖収載）
- [13] Qi H, Zhang M, Wang ZT. Simultaneous determination of 4 components in Polygonum cuspidatum by HPLC. Chin J Chin Mater Med. 2006;31:2003–2005.
- [14] China FDA, Guidance of Good Manufacturing Practices for Drug, 2010, p. 140.
- [15] Zhang H, et al. A review of the pharmacological effects of the dried root of Polygonum cuspidatum. Evid Based Complement Alternat Med. 2013.

## 参考文献

1. S.P. Li, J. Zhao, B. Yang, Strategies for quality control of Chinese medicines, J. Pharm. Biomed. Anal. 55 (2011) 802–809.

2. J.J. Hou, W.Y. Wu, J. Liang, Z. Yang, H.L. Long, L.Y. Cai, L. Fang, D.D. Wang, S. Yao, X. Liu, B.H. Jiang, D.A. Guo, A single, multi-faceted, enhanced strategy to quantify the chromatographically diverse constituents in the roots of Euphorbia kansui, J. Pharm. Biomed. Anal. 88 (2014) 321–330.

3. M. Kong, H.H. Liu, J. Xu, C.R. Wang, M. Lu, X.N. Wang, Y.B. Li, S.L. Li, Quantitative evaluation of Radix Paeoniae Alba sulfur-fumigated with different durations and purchased from herbal markets: simultaneous determination of twelve components belonging to three chemical types by improved high performance liquid chromatography-diode array detector, J. Pharm. Biomed. Anal. 98 (2014) 424–433.

4. S.P. Li, C.F. Qiao, Y.W. Chen, J. Zhao, X.M. Cui, Q.W. Zhang, X.M. Liu, D.J. Hu, A novel strategy with standardized reference extract qualification and single compound quantitative evaluation for quality control of Panax notoginseng used as a functional food, J. Chromatogr. A 1313 (2013) 302–307.

5. L.W. Qi, C.Z. Wang, C.S. Yuan, Isolation and analysis of ginseng: advances and challenges, Nat. Prod. Rep. 28 (2011) 467–495.

6. J.J. Hou, W.Y. Wu, J. Da, S. Yao, H.L. Long, Z. Yang, L.Y. Cai, M. Yang, X. Liu, B.H. Jiang, D.A. Guo, Ruggedness and robustness of conversion factors in method of simultaneous determination of multi-components with single reference standard, J. Chromatogr. A 1218 (2011) 5618–5627.

7. W.Y. Lu, Y.G. Niu, H.S. Yang, Y. Sheng, H.M. Shi, L.L. (Lucy) Yu, Simultaneous HPLC quantification of five major triterpene alcohol and sterol ferulates in rice bran oil using a single reference standard, Food Chem. 148 (2014) 329–334.

8. J. Sun, Z.Z. Jiang, R.Q. Yan, O. Olaleye, X.L. Zhang, X. Chai, Y.F. Wang, Quality evaluation of astragali radix products by quantitative analysis of multi-components by single marker, Chin. Herb. Med. 5 (2013) 272–279.

9. X.Y. Gao, Y. Jiang, J.Q. Lu, P.F. Tu, One single standard substance for the determination of multiple anthraquinone derivatives in rhubarb using high-performance liquid chromatography-diode array detection, J. Chromatogr. A 1216 (2009) 2118–2123.

10. Z.M. Wang, H.M. Gao, X.T. Fu, W.H. Wang, Multi-components quantitation by one marker new method for quality evaluation of Chinese herbal medicine, Chin. J. Chin. Mater. Med. 31 (2006) 1925–1928.

11. United States Pharmacopeia 35-NF 30, US Pharmacopoeial Convention, Rockville, MD, vol. I, 2011, p. 1271.

12. National Commission of Chinese Pharmacopoeia, Pharmacopoeia of People’s Republic of China, vol. I, China Medical Science Press, Beijing, 2010. T.-W. Yang et al. / Journal of Pharmaceutical and Biomedical Analysis 114 (2015) 280–287 287

13. H. Qi, M. Zhang, Z.T. Wang, Simultaneous determination of 4 components in Polygonum cuspidatum (Hu Zhang) by HPLC, Chin. J. Chin. Mater. Med. 31 (2006) 2003–2005.

14. China Food and Drug Administration, Guidance of Good Manufacturing Practices for Drug, vol. Quality Control Laboratories and Materials Management, China Medical Science Press, Beijing, 2010, p. 140.

15. H. Zhang, C. Li, S.T. Kwok, Q.W. Zhang, S.W. Chan, A review of the pharmacological effects of the dried root of Polygonum cuspidatum (Hu Zhang) and its constituents, Evid. Based. Complement. Alternat. Med. 2013 (208) (2013) 349–208362.

