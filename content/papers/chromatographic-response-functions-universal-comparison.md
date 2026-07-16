---
title: クロマトグラフィー応答関数（CRF）の網羅的比較研究——自動メソッド開発のための「分離の良さ」を1つの数値で表す指標
slug: chromatographic-response-functions-universal-comparison
source_pdf: dbac7497-1s2.0S0021967314012448main.pdf
doi: https://doi.org/10.1016/j.chroma.2014.08.014
drive_url: (未アップロード：ユーザー返却PDF)
level: researcher
date: 2026-07-08
published: true
tags: [メソッド開発・QbD, ケモメトリクス, 機械学習・データ処理, HPLC・UPLC, レビュー]
digest_tagline: 文献＋新規の50超のCRF（分離の良さを1数値化する指標）をin silicoで大規模比較――観測ピーク数とともに単調増加するCRFが有意に優れると結論
digest_stats: [IF|3.8（J. Chromatogr. A・JCR2024・Q1）, 主題|クロマトグラフィー応答関数（CRF）の網羅比較, 手法|LSSモデル＋EMGでin silicoクロマトグラム生成, 試料|5/10/15成分×10サブカテゴリ×各10試料, 探索|37×37グラジエント格子の総当たり]
digest_points: [自動メソッド開発を最適解へ導くには「分離の良さ」を1数値化するCRFが必要――1975年Morgan-Deming以来50超が提案され本研究はin silico（計算機模擬）で大規模比較, CRFを時間最適化なし/あり（カテゴリI/II）と観測ピーク数nobsとともに単調増加する/しない（サブカテゴリB/A）に分類しAのCRFをnobs加算でB化した新規CRFも提案, 成分数未知・1次データ（単一検出器）という難条件で観測ピーク数とともに単調増加するB型CRFがA型より有意に優れ・判別因子d0やピーク谷比f/gはピーク非対称性にSnyder Rsより強いがノイズが増すと優位を失うと結論]
digest_chart_label: サブカテゴリ別のCRF性能（観測ピーク数との単調性）
digest_chart: [観測ピーク数と単調増加しないA型|1, 観測ピーク数と単調増加するB型（有意に優秀）|2]
summary: クロマトグラフィーの自動メソッド開発（Drylab・Simplex・遺伝的アルゴリズム等）を最適解へ効率的に導くには、分離全体の良さを1つの数値で表す「クロマトグラフィー応答関数（CRF）」が不可欠である。1975年のMorgan-Deming以来50を超えるCRFが提案され、どれが最適かの論争が続いている。本研究は、線形溶媒強度（LSS）モデルと指数修飾ガウス（EMG）で計算機模擬（in silico）した多数のクロマトグラム（5・10・15成分×10サブカテゴリ×各10試料）を用い、文献既存＋新規の50超のCRFを大規模に総当たり比較した。とくに①試料の成分数が事前に未知、②スペクトル情報のない1次データ（単一波長UV等）という難しい条件に焦点を当てる。結論として、観測ピーク数nobsとともに単調増加するCRF（サブカテゴリB）が、そうでないもの（A）より有意に優れる。判別因子d0やKaiserのピーク谷比f/gに基づくCRFはピーク非対称性にSnyder分離度Rsより強いが、ノイズが有意になると優位を失う。多くのCRFは、試料をベースライン分離するのにちょうど必要な（あるいはやや不足する）効率のカラムで探索するとき最も良く機能し、観測成分数を優先してから分離度・分析時間で条件を順位づけるCRFが全効率範囲で最良の結果を与えた。
---

<!--
Tyteca E, Desmet G. A universal comparison study of chromatographic response functions.
J Chromatogr A 1361 (2014) 178-190. doi:10.1016/j.chroma.2014.08.014 の全訳密度日本語版。
-->

> **補足（本サイトでの位置づけ）:** 本論文は生薬そのものを扱う研究ではなく、**クロマトグラフィーの自動メソッド開発（automated method development）で「分離条件の良し悪し」を1つの数値でスコア化する指標——クロマトグラフィー応答関数（CRF）——を50種以上、計算機模擬で徹底比較した基盤研究** である。当サイトが扱う生薬・漢方の指紋分析や多成分定量メソッドは、いずれも「多数のピークをいかに分離するか」という共通課題を抱えており、その最適化を自動化・数値化するには CRF のような客観的スコアが要る。本論文の核心的な教訓——「観測できたピーク数とともに単調に増える CRF でないと、成分数が事前にわからない試料（＝生薬エキスのような複雑試料の典型）では最適化が迷走する」——は、生薬の未知多成分プロファイルを扱う分析法開発にそのまま効く。当サイトで既に扱った「in silico HPLC のML保持予測」「望ましさ関数による多応答最適化」の議論と地続きの、メソッド開発を自動化・客観化するための理論的裏付けとして読める。やや専門性が高いが、生薬指紋分析の「なぜこの分離条件を選ぶのか」を根本から支える文献である。

---

# 書誌情報

- **原題:** A universal comparison study of chromatographic response functions
- **和題（本稿）:** クロマトグラフィー応答関数（CRF）の網羅的比較研究
- **著者:** Eva Tyteca（責任著者）, Gert Desmet
- **所属:** ブリュッセル自由大学（Vrije Universiteit Brussel）化学工学科（CHIS-IR）, B-1050 Elsene, ベルギー
- **責任著者:** E. Tyteca（eva.tyteca@vub.ac.be）
- **掲載誌:** Journal of Chromatography A, 1361 (2014) 178–190
- **DOI:** 10.1016/j.chroma.2014.08.014
- **受理経緯:** 2014年7月4日受付 / 2014年8月4日改訂受付 / 2014年8月5日受理 / 2014年8月13日オンライン公開
- **© 2014 Elsevier B.V.**
- **キーワード:** クロマトグラフィー応答関数（CRF）／自動メソッド開発／クロマトグラム模擬（simulation）
- **雑誌インパクトファクター:** 3.8（Journal of Chromatography A・JCR2024・Q1）

---

# 要旨（Abstract）

いわゆる **クロマトグラフィー応答関数（chromatographic response functions, CRF）** の大規模な計算機模擬（in silico）比較研究を報告する。CRF は分離の質を1つの数値で表す記述子であり、クロマトグラフィー分離の探索ベース最適化を導くのに用いられる。文献既存＋新規の包括的な CRF 群を、**1次クロマトグラフィーデータ**（＝スペクトル情報がない）に基づく探索を導く能力、および **試料成分数が事前に未知** の場合について比較した。結果は利用可能な分離能（separation power）に基づいて論じる。

主要な発見：
- **観測ピーク数とともに単調に増加する CRF は、この性質をもたない CRF より有意に優れて機能する。**
- **判別因子（discrimination factor）やピーク谷比（peak-to-valley ratio）に基づく CRF は、Snyder 分離度 Rs に基づく CRF よりピーク非対称性にうまく対処できる。** ただし、ノイズ水準が有意になると、前者はその優位を失う。
- ほとんどの CRF は、試料をベースライン分離するのに **ちょうど必要な（あるいはやや不足する）効率** を提供するカラムで探索するとき最良に機能する。
- 可能な全効率範囲で最良の結果は、**観測化合物数を優先し、その後に達成分離度や必要分析時間で条件を順位づける CRF** で得られる。
- カラム効率が不十分な状態で探索すると、最良の CRF でさえ試料に関する不完全な情報に悩まされ、試料のスペクトル情報に頼らない限り探索の逸脱は避けられない。

---

# 1. 序論（Introduction）

クロマトグラフィーのメソッド開発（method development, MD）は、調整可能なパラメータが多く（有機修飾剤・固定相の種類、温度、グラジエントプロファイル、pH、イオン強度など）、ピーク重なりの確率が高いため、通常は多くの試行錯誤を伴う[1]。この探索を促進するため、過去に多様な自動 MD 戦略が提案されてきた。自動 MD 戦略は、**保持モデルベース**（Drylab, Chromsword）、**探索ベース**（Simplex, 遺伝的アルゴリズム GA）、または両者の組合せ（実験計画法 DoE, 予測溶出窓シフト・ストレッチ PEWS²）に分けられる[2–9]。

変数の数が多すぎて全設計パラメータを単純に走査できない複雑な設計問題では、分離全体の質を1つの数値で記述する数値基準が、自動 MD 戦略を可能な限り効率的に最適解へ導くために必要となる。文献ではこの品質基準を一般に **クロマトグラフィー応答関数（CRF）** と呼ぶ。この概念は 1975年に Morgan と Deming が導入した[10]。以来、多様な CRF が提案され、どの CRF が最も適切かの論争が今なお続いている[11–26]。良い CRF を設計することは、**試料中の成分数が未知の場合、または二次目標（例：分析時間も最小化）を満たす必要がある場合** にとくに難しい。

本研究では、文献で最も広く使われる CRF と、いくつかの新規提案の CRF をグローバルに比較した。結論を、組成が大きく異なる十分多数の試料に基づかせるため、**in silico 試料**（＝計算機模擬。ただし現実的な入力パラメータを用いる）を使った数値研究で比較を行う。この手法には、**最良解が常に既知** であるため、その解を見つける能力を明確に判定できる利点もある。

**成分数が未知の場合** に重点を置く（全成分既知の場合よりも一般的かつ難しい問題のため）。同じ理由で、**1次クロマトグラフィーデータ**[27, 28]（単一検出器信号のみ、例：単一波長 UV/vis トレース）の場合に焦点を当てる。これは、完全に重なったピークの出現が検出できず、部分的に重なったピークの分離度が定量できないことを仮定する。全ピークが常に見える（スペクトル検出やモデリング等のケモメトリクス技術[29, 30]による）なら、最も臨界なピーク対の分離度やピーク純度が常に最も直接的で正しい基準となるため、CRF 選択問題は自明になり興味を失う[24, 31]。

採用した探索法は単純な総当たり探索（探索格子の全点走査）である。既存の多くの「賢い」探索法（Simplex, GA, PEWS²）ではなく総当たりを選んだのは、研究結果が探索アルゴリズムの特異な性質に依存しないようにするためである。

> **訳者補足（CRF とは何か）:** クロマトグラムには通常たくさんのピークがあり、「どの分離条件が一番良いか」を機械（自動最適化）に判断させるには、クロマトグラム全体を1つのスコアに要約する関数が要る。それが CRF（クロマトグラフィー応答関数）である。たとえば「全ピークの分離度を足し合わせる」「見えたピークの数を加える」「分析時間が長いほど減点する」といった式を組み合わせて、良い分離ほど大きな（または小さな）値になるよう設計する。本論文の問いは「そういう式が何十種類も提案されているが、実際どれが一番うまく最適条件へ導くのか？」である。

---

# 2. 理論と採用した数値手順

## 2.1. クロマトグラム模擬（Chromatogram simulation）

簡単のため、試料成分の保持特性の実装には **線形溶媒強度（linear solvent strength, LSS）モデル**[32, 33]を採用した：

$$
\ln(k) = \ln(k_w) - S \cdot \varphi \tag{1}
$$

kw＝φ=0（純水）での k の外挿値、S＝溶媒強度パラメータ（与えられたカラム・化合物・有機溶媒で一定）、φ＝有機修飾剤の分率。

クロマトグラムは異なる試料カテゴリ（それぞれ 5・10・15成分＝nc = 5, 10, 15）で生成した。各試料は、規定区間から LSS モデルの kw・S 値の nc 通りの組合せを Matlab の rand 関数でランダムに選んで作成。十分な変動性を得るため、異なる kw・S 範囲および濃度比をもつ **10のサブカテゴリ**（Table 2 参照）を考え、各サブカテゴリで10試料を選んだ。

ランダムに選んだ kw・S 値を、カラム体積 V0・カラム効率 N・グラジエントパラメータ φ0（初期移動相濃度）・βt0（グラジエント勾配 β=(φe−φ0)·t0/tG、φe＝終了時有機分率、t0＝カラム死時間）とともに用い、期待されるピークプロファイルを Matlab プログラムで模擬した。ピークプロファイルは、**完全ガウスピーク** と **歪んだ（skewed）ピーク** の両方を考えた。

純ガウスピーク[34]：

$$
c\left(\frac{t}{t_0}\right) = c_0 \cdot \frac{\sqrt{N}}{(1+k_e)\cdot G}\exp\!\left[-N\frac{((t/t_0)-1-k)^2}{2(1+k_e)^2 G^2}\right], \quad c_0 = \frac{M}{\sqrt{2\pi}\,V_0} \tag{2}
$$

t＝時間、c0＝注入濃度、ke＝溶出時（カラム末端）の保持係数、k＝有効保持係数（k=(tR−t0)/t0）、G＝グラジエント圧縮係数[35]、M＝注入質量、V0＝カラム死体積。ke・k は φ0・βt0 と既知の kw・S から、Schoenmakers らの線形グラジエント式[36]で計算した。

歪んだピークには、確立された **指数修飾ガウス（exponentially modified Gaussian, EMG）関数**[38]を用いた（多項式修飾ガウスの方が正確だが、EMG の方が広く知られ多くの読者に良い参照となるため）。EMG ピークは緩和時間パラメータ τ を含む式(3)で模擬。2種の EMG ピークを考えた：**EMG1 型**（0.5 ≤ τ ≤ 1.5）と **EMG2 型**（0.5 ≤ τ ≤ 2.5、より強く歪む）。

### 原著 Table 2：10サブカテゴリを定義する kw・S・c0 範囲

| カテゴリ | kw | S | c0 |
|---|---|---|---|
| 1 | [200,1000] | [8,15] | [1,10] |
| 2 | [500,1000] | [10,20] | [1,10] |
| 3 | [1000,2000] | [5,15] | [1,100] |
| 4 | [200,1000] | [15,20] | [1,100] |
| 5 | [10,2000] | [5,10] | [1,100] |
| 6 | [200,1000] | [8,15] | [1,50] |
| 7 | [500,2500] | [10,20] | [1,10] |
| 8 | [1000,3000] | [5,15] | [1,100] |
| 9 | [200,700] | [15,25] | [1,100] |
| 10 | [1000,2000] | [5,20] | [1,10] |

## 2.2. クロマトグラムの読み取り（Read-out）

模擬クロマトグラムは、各ピーク（またはピークショルダー）の開始・終了・最大の水平/垂直位置を決定する自作 Matlab ルーチンで読み取った。この情報から、各ピーク対 i（ピーク i と i+1）の分離度、El Fallah・Martin の **判別因子（discrimination factor）d0,i**[39, 40]、Kaiser の **ピーク谷比（peak-to-valley ratio）fi/gi**[41–43]を計算：

$$
R_{s,i} = \frac{t_{R,i+1} - t_{R,i}}{\frac{1}{2}(w_{p,i+1} + w_{p,i})} \tag{4}
$$

$$
d_{0,i} = 1 - \frac{h_{valley}}{h_{peak,min}}, \qquad \frac{f_i}{g_i} = 1 - \frac{h_{valley}}{\frac{1}{2}(h_{peak,min} + h_{peak,max})} \tag{5}
$$

**Rs は水平方向、d0 と f/g は垂直方向に読み取る** 点が主な違い。後者はベースラインノイズ関連の誤差を受けやすい。もう一つの違いは、Rs はピークが分離するほど増え続けるが、d0・f/g は2ピークが完全分離すると **限界値1に達する** こと。これは、必要最小分離度 Rs,req を超える無駄な分離度が品質数値に含まれない利点をもつ。分離度で同様の効果を得るため、一部の著者[11]は **Rs*** を導入した：

$$
R_s^* = R_s \ (R_s < R_{s,req}) \quad \text{または} \quad R_s^* = R_{s,req} \ (R_s \ge R_{s,req}) \tag{6}
$$

全研究を通じ Rs,req = 1.6 を用いた。d0・f/g ベースの CRF には2つの読み取りモードを考えた：①常に真値を与える（絶対分離度 ~1×10⁻⁵ で決定可能）、②実務的にずっと重要な、値を最大 **0.99** に制限するモード。後者はベースラインノイズの発生を模す（d0・f/g が1に近づくとき有効数字を区別できないのがノイズの主問題）。判別因子 d0 は、ピーク高さが大きく変動するとき f/g より読み取り誤差が小さいと期待される[40]。

さらに、新規 CRF の一部を if 関数で拡張し（CRF50–CRF53）、連続する2つの完全分離ピーク間の距離も含めた。頂点間距離 D1・ピーク裾-ピーク前縁間距離 D2 から、無次元距離指標 δ1,i・δ2,i を定義（式7, 8。kav＝2ピークの平均保持係数）。

## 2.3. CRF 比較手順

与えられた CRF が最良グラジエントプログラムの探索をどれだけうまく導けるかを評価するには、まずこの最良プログラムを不偏に決定する必要がある。これは、各グラジエント条件で臨界対の d0 = 0.9999 を達成するのに必要な **最小理論段数（Nreq,min）** または **最小保持時間（treq,min）** を決定して行った。φ0（0.025〜0.975 を等間隔）と βt0（10⁻³〜1 を対数等間隔）の **37×37 格子** の各条件で、二分探索法により（初期下限 N=2×10⁴・上限 N=2×10⁷）目標 d0=0.9999 に収束させた。

これにより「絶対真実（absolute truth）」等高線プロット（原著 Fig.2a・3a）が得られる。Nreq・treq が最小のグラジエント条件領域を濃赤（白矢印）で示す。青領域は N=2×10⁷ 段でも完全分離に不十分な条件、白領域は有効保持係数の上限（kupper=25）までに最終成分を溶出できない条件。この上限設定は MD で一般的（過大な保持へ探索を広げるより別感度のカラムに切り替える方が現実的）で、kupper の値や上限の有無は主結論に影響しないことを検証済み。

単一最良解だけでなく、確立した絶対真実プロット上で **上位 x%（通常 x=2 または 10）** の φ0・βt0 の組合せ領域を決定した。上位 x% に注目する方が比較が滑らか（格子粗さへの依存が小さい）で、実務的にも妥当（MD では通常「唯一の」最良条件ではなく、許容範囲で試料が完全分離すれば満足するため）。

---

# 3. CRF の分類と定義（Table 1）

CRF は、**理論段数の最小化を目指すもの（カテゴリ I）** と **分析時間の最小化を目指すもの（カテゴリ II）** に区別される。さらにサブカテゴリ **A・B** を導入し、**観測化合物数 nobs とともに単調増加しないもの（A）** と **する（B）** を区別する。文献 CRF の大半はカテゴリ A に属するが、成分数が未知の探索では成分数への依存性が本質的と予想されるため、多くの文献 A 型 CRF を、元の CRF 式を正規化して **観測ピーク数を加算** することで B 型 CRF に変換した（新規 CRF 群、3.1節）。

**主な CRF の例（Table 1 より抜粋）:**

- **カテゴリ I-A（時間最適化なし・非単調）:**
  - CRF1 = Σ Rs,i*（分離度の和）[11]
  - CRF2 = nobs·x + Σ Rs,i*[11]
  - CRF3 = Σ log(fi/gi) または Σ ln(fi/gi)[10, 13]
  - CRF4 = Π (Rs,i/Rs,req)ⁿ / (1+(Rs,i/Rs,req)ⁿ)[14]
  - CRF5 = Π (fi/gi)[15]
  - CRF6 = nobs + Rs,crit/Rs,req
- **カテゴリ II-A（時間最適化あり・非単調）:**
  - CRF11 = nobs·x + Σ Rs,i* − a|tmax−tR,last| + b(tmin−tR,first)[11]
  - CRF12 = Σ Rs,i*·Pen（Pen＝時間ペナルティ係数）[16]
  - CRF13 = Σ ln(fi/gi) − α·tlast[13]
  - CRF16 = [Σ(1−e^(a(Rs,opt−Rs,i)))²+1]·(1+tR,last/tmax)[17]
  - CRF18 = Σ [a·ln(Rs,i/Rs,req)+b·(tmax−tR,last)][19]
  - CRF19 = tR,n/tR,opt + Σ e^(−Rs,i/Rs,req)[20]
- **カテゴリ I-B（時間最適化なし・単調＝nobs 加算型・多くが新規）:**
  - CRF23 = Nreq（if nobs=max(nobs)）または nobs + 1/Nreq
  - CRF24 = nobs + Σ Rs,i* / (1.6·(nobs−1))
  - CRF26 = nobs + Π (fi/gi)
  - CRF31 = nobs + d0,min（最小判別因子）
  - CRF32 = nobs + Rs,min*
- **カテゴリ II-B（時間最適化あり・単調）:**
  - CRF34 = treq（if nobs=max(nobs)）または nobs + 1/treq
  - CRF35 = nobs + Σ (fi/gi) − (tR,last−t0)/tR,last[22]
  - CRF40 = nobs + (1/tR,last)·Π (fi/gi)
  - CRF43 = nobs + Rs,min*/(2·tR,last)
  - CRF50–53 = 完全分離ピーク間距離（δ1/δ2）も考慮する if 関数拡張型

（凡例：nobs＝観測ピーク数、Rs,crit＝臨界対の分離度、Rs,req=1.6＝必要最小分離度、Pen＝時間ペナルティ、tR,opt=15 min＝最適滞留時間、tmin/tmax=0/25 min、Nreq/treq＝必要理論段数/必要分析時間。）

---

# 4. 結果と考察

## 4.1 比較手順――「絶対的真値」との距離で採点する

ある CRF が「最良のグラジエントプログラム」の探索をどれだけうまく導けるかを評価するには、まずその **最良解を偏りなく決めておく** 必要がある。著者らは、**37×37 の格子** 上の各グラジエント条件について、臨界対（最も分離が悪いピーク対）を **d0=0.9999** まで分離するのに必要な最小理論段数 Nreq,min（または最小分析時間 treq,min）を二分法探索で求めた。格子は、初期有機修飾剤分率 φ0 を 0.025〜0.975 の等間隔 37 点、勾配急峻さ βt0 を 10⁻³〜1 の対数等間隔 37 点で張る。各条件の Nreq,min を色で描いた **「絶対的真値（absolute truth）」の等高線図**（原著 Fig.2a／Fig.3a）では、必要 N が最小＝最良の領域が濃赤で、N=2×10⁷ でも分離しきれない領域が青、有効保持係数の上限 kupper=25 までに最終成分が溶出しない領域が白で示される（kupper の値や上限の有無は結論に影響しないことを確認済み）。

各試料について、単一の最良点ではなく **上位 x%（通常 x=2 または 10）の良好領域** を「正解ゾーン」と定義する。実務では「唯一最良の条件」ではなく「許容時間内に完全分離できる条件」であれば十分なこと、格子の粗さへの依存が減り比較が滑らかになることから、この top-x% 方式を採る。次に、各 CRF が最良と判定した条件（原著の等高線図で白矢印）が、この正解ゾーンからどれだけ離れているかを **δ（デルタ）誤差**（正規化した距離、スケールバー0.1単位）で測り、全試料で平均して CRF を順位づける。

## 4.2 実験設定――10 サブカテゴリ×ノイズ・非対称性の掛け合わせ

各試料の 37×37=1369 本のクロマトグラムを、条件を変えて **計8回** 生成した。これにより、(1) **試料組成の 10 サブカテゴリ**（原著 Table 2 の kw・S・c0 範囲＝§2.1 参照。極性幅・成分数の異なる 5/10/15 成分試料×各10試料）、(2) **ピーク非対称性**（完全ガウス τ=0 → 指数修飾ガウス EMG1〔0.5≤τ≤1.5〕→ EMG2〔0.5≤τ≤2.5〕）、(3) **ベースラインノイズ水準** の掛け合わせで CRF の頑健性を評価した。読み取り（read-out）は、垂直方向の判別因子 d0 やピーク谷比 f/g を使う場合とそうでない場合を比較し、現実的モードでは値を **上限0.99** で頭打ちにしてノイズの影響を抑えた（§2.2）。

## 4.3 主要な知見

- **単調性（サブカテゴリ B）が決定的:** 観測ピーク数 nobs とともに単調増加する CRF（B 型）は、そうでない A 型より **有意に優れて** 探索を最適解へ導く。成分数が未知の1次データ探索では、まず「見えたピークの数」を最優先し、その後に分離度・分析時間で微調整する構造が本質的だからである。等高線図の比較（原著 Fig.2）でも、A 型 CRF（CRF1 の分離度和、CRF3 の log(f/g) 和など）は最良ゾーンを外す一方、**CRF23（nobs 最大のとき Nreq 最小化）や CRF28（nobs＋観測成分の平均・最小 d0 の重み付け）は真値ゾーンをよく捉える**。観測成分数を最優先してから分離度／分析時間で順位づける CRF が、**可能な全効率範囲で最良** の結果を与えた。
- **d0・f/g（垂直読み取り）vs Rs（水平読み取り）:** 判別因子 d0 や Kaiser のピーク谷比 f/g に基づく CRF は、ピーク非対称性（テーリング）に Snyder 分離度 Rs ベースの CRF より **うまく対処** する。Rs はピーク幅（水平方向）で分離を測るため、EMG で歪んだ（テーリングした）ピークでは実際の谷の深さと乖離するのに対し、d0・f/g は谷と頂点の高さ比（垂直方向）で測るため歪みに強い。しかし d0・f/g は垂直方向読み取りゆえ **ベースラインノイズに弱く**、ノイズ水準が有意になると（0.99 で頭打ちにした現実的モードでも）その優位を失う。
- **カラム効率との関係:** ほとんどの CRF は、試料をベースライン分離するのに **ちょうど必要な、あるいはやや不足する効率**（N≈Nreq,min）のカラムで探索するとき最良に機能する。過剰な効率のカラムでは、必要以上の分離度が品質数値を歪めうる（Rs* や f/g を限界値1で頭打ちにすることで緩和されるが完全ではない）。逆に、ちょうど足りない効率で探索すると、CRF は「ぎりぎり分離できる条件」に集中しやすく、実務的にも望ましい。
- **効率不足時の限界:** カラム効率が不十分な状態で探索すると、最良の CRF でさえ試料に関する情報が不完全（重なったピークがそもそも見えない＝nobs が真の成分数に届かない）なため探索が逸脱し、これは **スペクトル情報（多波長・MS 等）に頼らない限り回避できない**。これは1次データ（単一検出器信号）の本質的限界であり、CRF の設計ではどうにもならない。

> **訳者補足（生薬指紋分析への含意）:** 生薬エキスは成分数が事前にわからず、単一波長 UV 等の1次データで指紋を取ることが多い。本研究の結論は「そういう状況では、見えたピーク数を最優先に評価する CRF を使い、かつ試料を分離しきれる（ちょうど十分な）効率のカラム/条件で最適化せよ」という実務指針になる。効率が足りないと『そもそも見えていないピーク』が最適化を狂わせるため、条件探索の前にカラム効率の底上げ（UPLC 化・カラム長延長など）が重要という示唆でもある。

---

# 5. 結論（Conclusions）

CRF の大規模 in silico 比較により、以下が明らかになった：

1. **観測ピーク数とともに単調増加する CRF（B 型）が、そうでないもの（A 型）より有意に優れる。** 成分数未知・1次データという一般的かつ困難な条件で、これは決定的である。
2. **判別因子 d0・ピーク谷比 f/g ベースの CRF はピーク非対称性に強い** が、ノイズが有意になると Snyder Rs ベースに対する優位を失う。
3. ほとんどの CRF は、ベースライン分離にちょうど足りる（かやや不足する）効率のカラムで探索するとき最良。
4. 全効率範囲で最良なのは、**観測化合物数を優先してから分離度・分析時間で順位づける CRF**。
5. 効率不足のカラムでの探索では、最良の CRF でも不完全情報に悩み、スペクトル情報なしには逸脱を避けられない。

これらの結論は、自動メソッド開発における CRF 選択の実務的指針を提供する。

---

# 主要記号・パラメータ

- **k**＝有効保持係数（k=(tR−t0)/t0）、**ke**＝溶出時保持係数、**kw**＝純水での外挿保持係数、**S**＝溶媒強度パラメータ
- **φ0**＝初期有機修飾剤分率、**βt0**＝グラジエント勾配、**N**＝理論段数、**V0**＝カラム死体積、**G**＝グラジエント圧縮係数
- **Rs**＝分離度、**Rs***＝上限 Rs,req で頭打ちにした分離度、**Rs,req=1.6**＝必要最小分離度、**Rs,crit**＝臨界対分離度
- **d0**＝判別因子（1−hvalley/hpeak,min）、**f/g**＝Kaiser のピーク谷比、**nobs**＝観測ピーク数
- **Nreq/treq**＝必要理論段数/必要分析時間、**tR,opt=15 min**＝最適滞留時間、**kupper=25**＝有効保持係数上限
- **EMG**＝指数修飾ガウス（τ＝緩和時間パラメータ。EMG1: 0.5≤τ≤1.5、EMG2: 0.5≤τ≤2.5）

---

# 主要参考文献（抜粋）

- [10] Morgan SL, Deming SN.（1975）CRF 概念の原典。
- [11] 分離度 Rs* と nobs 重み付け CRF（CRF1, 2, 11）。
- [13] ln(f/g) ベースの時間最適化 CRF（CRF13, 14, 15）。
- [17] 指数型分離度 CRF（CRF16）。
- [32, 33] 線形溶媒強度（LSS）モデル。
- [36] Schoenmakers et al. 線形グラジエント保持式。
- [38] 指数修飾ガウス（EMG）関数。
- [39, 40] El Fallah, Martin 判別因子 d0。
- [41–43] Kaiser ピーク谷比 f/g。

（全44文献。詳細は原著参照。）

## 参考文献

1. J.M. Giddings, J.C. Davis, Statistical method for estimation of number of components from single complex chromatograms: theory, computer-based testing, and analysis of errors, Anal. Chem. 57 (1985) 2168–2177.

2. J.C. Berridge, Simplex optimization of high-performance liquid chromatographic separations, J. Chromatogr. 485 (1989) 3–14.

3. I.J. Molnar, Computerized design of separation strategies by reversed-phase liquid chromatography: development of DryLab software, J. Chromatogr. A 965 (2002) 175–194.

4. E.F. Hewitt, P. Lukulay, S. Galushko, Implementation of a rapid and automated high performance liquid chromatography method development strategy for pharmaceutical drug candidates, J. Chromatogr. A 1107 (2006) 79–87.

5. M. Beer, F. Lynen, K. Chen, P. Ferguson, M. Hanna-Brown, P. Sandra, Stationaryphase optimized selectivity liquid chromatography: development of a linear gradient prediction algorithm, Anal. Chem. 82 (2010) 1733–1743.

6. S. Goga, S. Heinisch, J.L. Rocca, Retention and column efficiency in reversed phase liquid chromatography as a function of pH for optimization purposes, Chromatographia 48 (1998) 237–244.

7. Y. Dharmadi, R. Gonzalez, A better global resolution function and a novel iterative stochastic search method for optimization of high-performance liquid chromatographic separation, J. Chromatogr. A 1070 (2005) 89–101.

8. G. Vivó-Truyols, J.R. Torres-Lapasió, M.C. Garcia-Alvarez-Coque, A hybrid genetic algorithm with local search: I. Discrete variables: optimisation of complementary mobile phases, Chem. Intel. Lab. Syst. 59 (2001) 89–106.

9. E. Tyteca, A. Liekens, D. Clicq, A. Fanigliulo, B. Debrus, S. Rudaz, D. Guillarme, G. Desmet, Predictive elution window shifting and stretching as a generic search strategy for automated method development for liquid chromatography, Anal. Chem. 84 (2012) 7823–7830.

10. S.L. Morgan, S.N. Deming, Optimization strategies for the development of gas–liquid chromatographic methods, J. Chromatogr. 112 (1975) 267–285.

11. M.W. Watson, P.W. Carr, Simplex algorithm for the optimization of gradient elution high-performance liquid chromatography, Anal. Chem. 51 (1979) 1835–1842.

12. J.L. Glajch, J.J. Kirkland, K.M. Squire, J.M. Minor, Optimization of solvent strength and selectivity for reversed-phase liquid chromatography using an interactive mixture-design statistical technique, J. Chromatogr. 199 (1980) 57–79.

13. J.C. Berridge, Unattended optimisation of reversed-phase high-performance liquid chromatographic separations using the modified simplex algorithm, J. Chromatogr. 244 (1982) 1–14.

14. J.C. Berridge, E.G. Morrisey, Automated optimisation of reversed-phase highperformance liquid chromatography separations: an improved method using the sequential simplex procedure, J. Chromatogr. 316 (1984) 69–79.

15. E.V. Dose, Off-line optimization of gas chromatographic temperature programs, Anal. Chem. 59 (1987) 2420–2423. 190 E. Tyteca, G. Desmet / J. Chromatogr. A 1361 (2014) 178–190

16. T.D. Schlabach, J.L. Excoffier, Multi-variate ranking function for optimizing separations, J. Chromatogr. 439 (1988) 173–184.

17. N.M. Djordevic, F. Erni, B. Schreiber, E.P. Lankmayr, W. Wegscheider, L. Jaufman, Fully automatic high-performance liquid chromatographic optimization, J. Chromatogr. 550 (1991) 27–37.

18. J.-L. Martinez-Vidal, P. Parrilla, A.R. Fernandez-Alba, R. Carreno, F. Herrera, A new sequential procedure for the efficient and automated location of optimum conditions in high performance liquid chromatography (HPLC), J. Liq. Chromatogr. 18 (1995) 2969–2989.

19. V.M. Morris, J.G. Hughes, P.J. Marriott, Examination of a new chromatographic function, based on an exponential resolution term, for use in optimization strategies: application to capillary gas chromatography separation of phenols, J. Chromatogr. A 755 (1996) 235–243.

20. G. Vivó-Truyols, J.R. Torres-Lapasió, M.C. Garcia-Alvarez-Coque, Complementary mobile-phase optimisation for resolution enhancement in highperformance liquid chromatography, J. Chromatogr. A 876 (2000) 17–35.

21. U.D. Neue, H.-J. Kuss, Improved reversed-phase gradient retention modeling, J. Chromatogr. A 1217 (2010) 3794–3803.

22. R.M.B.O. Duarte, A.C. Duarte, A new chromatographic response function for use in size-exclusion chromatography optimization strategies: application to complex organic mixtures, J. Chromatogr. A 1217 (2010) 7556–7663.

23. B. Jancic-Stojanovíc, T. Rakic, N. Kostic, A. Vemic, A. Malenovic, D. Ivanovic, M. Medenica, Advancement in optimization tactic achieved by newly developed chromatographic response function: application to LC separation of raloxifene and its impurities, Talanta 85 (2011) 1453–1460.

24. A. Ortín, J.R. Torres-Lapasio, M.C. Garcia-Alvarez-Coque, A complementary mobile phase approach based on the peak count concept oriented to the full resolution of complex mixtures, J. Chromatogr. A 1218 (2011) 5829–5836.

25. W. Nowik, S. Héron, B. Myriam, A. Tchapla, Separation system suitability (3S): a new criterion of chromatogram classification in HPLC based on cross-evaluation of separation capacity/peak symmetry and its application to complex mixtures of anthraquinones, Analyst 138 (2013) 2810–5801.

26. M.C. Garcia-Alvarez-Coque, J.R. TorresLapasio, J.J. Baeza-Baeza, Models and objective functions for the optimisation of selectivity in reversed-phase liquid chromatography, Anal. Chim. Acta 579 (2006) 125–145.

27. K.S. Booksh, B.R. Kowalski, Theory of analytical chemistry, Anal. Chem. 66 (1994) 782A.

28. M. Lopatka, G. Vivo-Truyols, M.J. Sjerps, Probabilistic peak detection for firstorder chromatographic data, Anal. Chim. Acta 817 (2014) 9–16.

29. P. Nikitas, A. Pappa-Louisi, A. Papageorgiou, On the equations describing chromatographic peaks and the problem of the deconvolution of overlapped peaks, J. Chromatogr. A 912 (2001) 13–29.

30. J.R. Torres-Lapasió, J.J. Baeza-Baeza, M.C. Garcia-Alvarez-Coque, A model for the description, simulation, and deconvolution of skewed chromatographic peaks, Anal. Chem. 69 (1977) 3822–3831.

31. G. Vivo-Truyols, J.R. Torres-Lapasio, M.C. Garcia-Alvarez-Coque, Net analyte signal as a deconvolution-oriented resolution criterion in the optimisation of chromatographic techniques, J. Chromatogr. A 991 (2003) 47–59.

32. L.R. Snyder, Linear elution adsorption chromatography: VII. Gradient elution theory, J. Chromatogr. 11 (1964) 415–434.

33. L.R. Snyder, J.W. Dolan, High-Performance Gradient Elution: The Practical Application of the Linear Solvent Strength Model, Willey Interscience, Hoboken, NJ, 2007.

34. G. Guiochon, S.G. Shirazi, A.M. Katti, Fundamentals of Preparative and Nonlinear Chromatography, Academic press, Boston, 1994.

35. U.D. Neue, D.H. Marchand, L.R. Snyder, Peak compression in reversed-phase gradient elution, J. Chromatogr. A 1111 (2006) 32–39.

36. P.J. Schoenmakers, H.A.H. Billiet, R. Tijssen, L.J. De Galan, Gradient selection in reversed-phase liquid chromatography, J. Chromatogr. 149 (1978) 519–537.

37. J.J. Baeza-Baeza, C. Ortiz-Bolsico, M.C. García-Álvarez-Coque, New approaches based on modified Gaussian models for the prediction of chromatographic peaks, Anal. Chim. Acta 758 (2013) 36–44.

38. Y. Kalambet, Y. Kozmin, K. Mikhailova, I. Nagaev, P. Tikhonov, Reconstruction of chromatographic peaks using the exponentially modified Gaussian function, J. Chemometr. 25 (2011) 352–356.

39. M.Z. El Fallah, M. Martin, Influence of the peak height distribution on separation performances: discrimination factor and effective peak capacity, Chromatographia 24 (1987) 115–122.

40. U.D. Neue, HPLC Columns: Theory, Technology and Practice, Willey-VCH, New York, 1997.

41. R.E. Kaiser, Gas Chromatograohie, Geest & Portig, Leipzig, 1960, pp. 33.

42. W. Wegscheider, E.P. Lankmayr, K.W. Budna, A chromatographic response function for automated optimization of separations, Chromatographia 15 (1982) 498–504.

43. E. Haghedooren, T. Németh, S. Dragovic, B. Noszál, J. Hoogmartens, E. Adams, Comparison of two column characterization systems based on pharmaceutical applications, J. Chromatogr. A 1189 (2008) 59–71.

44. S.J. López-Grío, G. Vivó-Truyols, J.R. Torres-Lapasió, M.C. García-Alvarez-Coque, Resolution assessment and performance of several organic modifiers in hybrid micellar liquid chromatography, Anal. Chim. Acta 433 (2001) 187–198.

45. B. Debrus, P. Lebrun, E. Rozet, T. Schofield, J.K. Mbinze, R.D. Marini, S. Rudaz, B. Boulanger, P. Hubert, A new method for quality by design robust method optimization in liquid chromatography, LC–GC Eur. 26 (2013) 370–375.

