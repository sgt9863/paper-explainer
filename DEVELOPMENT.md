# 開発記録

## 2026-09-27 hplc-py論文ページと取得不能の再試行方針

- 目的: ユーザー提供のDrive内 `joss.06270.pdf`（DOI 10.21105/joss.06270）を日本語ページ化し、別途選択済みの「取得不能は月1回再試行」を反映。
- 最新のorigin/main（2675654）から専用ブランチを作成。既存の未追跡バックアップ2件は変更しない。
- 初稿: Antigravity CLI `gemini-3.8-flash-high`。公式モデル情報と `agy models` で利用可能性を確認。Codexが原PDF全文・画像を照合し、根拠のない一般化を削除、lineshape誤訳を修正。式(1)、全3図、図2Dの3行の数値、図2Eの8濃度、全11参考文献を保持した。
- 原文の誤記: 図3キャプションのC/DとE/Fを、実図・本文のC/E（波形）、D/F（濃度）に対応付け、変更を明記。図2(E)を検量線として引用する本文箇所も注記した。現在のソフト機能と2024年の著者主張を区別。
- 図はpopplerで270 dpiの領域描画を行い、全3枚を目視確認。PyMuPDFをサイトビルド依存に追加していない。
- ヒーローは組み込み画像生成ツールで生成・確認し、ai-infographic.pngへ保存。APIキー・OpenAI API直接呼出しは未使用。プロンプト: runbook/hplc-py-hero-prompt.txt。模式図であり実測データではない。
- OpenAlex W4391885430: 2026-09-27取得で11引用。IFはJCR値未確認として空値扱い（0や推測値を入れない）。原論文と図はCC BY 4.0、訳・切り出し・追加図を明記。
- ビルド: 134ページ。ブラウザでKaTeXエラー0、式1、表2、図3、文献11、メモ欄を確認。本文4937 CJK字付近で字数監査は要確認になるが、7頁の短いソフトウェア論文として原文全節と照合し、density_ok_below_heuristicへ理由を登録。水増しは行わない。
- natural-japaneseのlintはsudachipy不在で動作せず、付属の手動チェックリストで通読。表記・長い修飾・重複語を修正。原文由来の主張と専門語は意味保持を優先した。
- 月1回方針: runbook 8.3とエラー時方針を整合。state/quality_audit.jsonにretry_scheduleを追加し、既存の理由を維持。日付のない記録は移行日を基準に翌月へ設定（実試行と偽らない）。xecqは記録上2026-09-26の試行→2026-10-26以降。待機のみで同一履歴の追記・コミットをしない。
- スケジューラーの起動頻度自体は変更せず、毎晩の監査と新着処理は継続する。再アップロード・認証復旧等の確認または明示指示時は期限前の再試行を許可。
- 変更対象: 新規論文・資産・生成HTML・処理記録・監査記録・runbook。公開状態はPRのマージ結果を参照。

### 確認した一次情報

- https://joss.theoj.org/papers/10.21105/joss.06270 （書誌・CC BY 4.0）
- https://joss.theoj.org/about （IFの確定値を確認できず）
- https://api.openalex.org/works/https://doi.org/10.21105/joss.06270 （被引用数）
- https://ai.google.dev/gemini-api/docs/latest-model?hl=en （Gemini 3.8 Flash、CLI一覧とも照合）

## 2026-10-01 hplc-pyヒーローの既存スタイルへの統一

- ユーザー指定により、EURACHEMの3規則・実験計画法の既存画像をスタイル見本に使用。紺・深緑、細い枠、目的→手法→結果→意義の4列に揃える。
- 組み込み画像生成のみを使用。前回は利用上限で生成できず、今回再試行した。APIへ切り替えていない。
- 初回生成結果に「微分などを用いてピークを検出」とあったため不採用。原文に合わせ「ピークの突出度を基準に検出し、重なりを含む時間領域に分割する。」へ限定修正。
- プロンプト: runbook/hplc-py-hero-restyle-prompt.txt。論文本文や元図の内容は変更しない。
- 修正版を目視確認して採用。生成元とdocs側の画像一致、134ページのビルド成功を確認。既存の本文・原図・メモ機能は変更なし。

## 2026-10-09 — Domain-wide DADS alignment

The user requested a consistent sgt9863.com design based on the Digital Agency Design System and the previously selected textbook layout. Work is isolated in `projects/paper-dads`, branch `codex/dads-paper`, from `origin/main` (`cae443e`). The original checkout and its untracked state backups are untouched.

- Canonical visual overrides live in `assets/dads.css`. `scripts/build_site.py` copies them into the configured output directory and generates the stylesheet link, domain-home link, and keyboard skip link for every page. Existing application scripts and paper Markdown remain unchanged.
- Adopted white surfaces, blue `#0031d8` links/actions, text `#1a1a1c`, muted `#525258`, pale `#f3f6ff`, 16px body text at 1.8 line height, restrained borders, underlined links, 44px primary controls and black/yellow focus indicators. Read/favorite state retains textual/symbolic cues. The old green accent is superseded.
- Reference pages checked: https://design.digital.go.jp/dads/foundations/color/ ; https://design.digital.go.jp/dads/foundations/typography/ ; https://design.digital.go.jp/dads/foundations/layout/ ; https://design.digital.go.jp/dads/foundations/link-text/ ; https://design.digital.go.jp/dads/components/button/ . This adopts their principles; it does not assert official certification.
- Rebuilt 134 articles with the standard-library generator. Chrome/Playwright verified index and representative article at 1440px and 390px, search, favorites, reading status after reload, notes after reload, keyboard skip link, no uncaught JavaScript errors. Corrected narrow-screen list sizing and wide-table overflow. Screenshot inspection confirmed readable index/article layouts.
- No AI API requests, email, login, sync writes or paper-content changes were made. External authenticated services are unverified; their scripts and configuration are unchanged. Real device and assistive-technology testing remains outside this smoke test.
- Final 134-article narrow-screen scan: all pages fit 390px. Eight long inline-equation cases were corrected with local equation scrolling and a positioned table container; no article text was changed.
