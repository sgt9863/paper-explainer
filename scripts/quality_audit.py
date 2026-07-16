#!/usr/bin/env python3
"""全論文ページの品質監査（4基準）。夜間セッションが毎回実行し、要対応ページを洗い出す。

チェックする4基準（runbook/nightly.md の品質基準に対応）:
  ① 全訳密度      … 本文（参考文献を除く）の日本語文字数。原文と比べて要約止まりでないか。
                     ここでは機械的にCJK文字数を数え、閾値未満を「要確認」として挙げる
                     （最終判断は原文と突き合わせて夜間セッションが行う。一律字数では判定しない）。
  ② 図の抽出      … 本文に原文図の埋め込み（![...](assets/<slug>/...)）が1枚以上あるか。
                     0枚なら「要確認」（原文に図があるのに未抽出＝原文参照の可能性）。
  ③ 引用文献      … 「## 参考文献 / 引用文献 / References」見出しがあるか。
  ④ ヒーロー画像  … assets/<slug>/ai-infographic.{webp,png,jpg} が存在するか（gpt-image生成物）。

付随チェック:
  - 壊れた画像リンク（本文が参照する画像ファイルが実在しない）
  - 参考文献ありなのに本文に [N] があってリンク解決しない可能性（build後にbuild_site側で最終確認）

依存ライブラリなし（標準ライブラリのみ）。build_site.py と同じ方針。

使い方:
  python3 scripts/quality_audit.py            # 人間向けレポート（要対応ページ一覧）
  python3 scripts/quality_audit.py --json      # 機械可読JSON（夜間セッションのパース用）
  python3 scripts/quality_audit.py --all       # 合格ページも含め全件表示
  python3 scripts/quality_audit.py --density N # 密度の「要確認」閾値（CJK文字数, 既定5000）
"""
import os
import re
import sys
import json
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAPERS_DIR = os.path.join(ROOT, "content", "papers")
ASSETS_DIR = os.path.join(PAPERS_DIR, "assets")

DENSITY_THRESHOLD = 5000  # CJK文字数。未満は「要確認」（原文と比較して密度不足の疑い）
REF_HEADING = re.compile(r"^#{1,6}\s*(参考文献|引用文献|References)\b", re.M)
HERO_EXTS = ("ai-infographic.webp", "ai-infographic.png", "ai-infographic.jpg")


def split_body(md: str):
    """front matter を除いた本文を返す。"""
    parts = md.split("---", 2)
    return parts[2] if len(parts) > 2 else md


def cjk_count(text: str) -> int:
    return len(re.findall(r"[぀-ヿ一-鿿]", text))


def figure_embeds(md: str, slug: str):
    """本文中の図埋め込み（ヒーロー/スライドを除く）の (alt, src) を返す。"""
    out = []
    for m in re.finditer(r"!\[([^\]]*)\]\((assets/" + re.escape(slug) + r"/[^)]+)\)", md):
        src = m.group(2)
        if "ai-infographic" in src or src.endswith("slide.png"):
            continue
        out.append((m.group(1), src))
    return out


def audit_paper(path: str):
    slug = os.path.basename(path)[:-3]
    md = open(path, encoding="utf-8").read()
    body = split_body(md)
    trans = re.split(r"^#{1,6}\s*(?:参考文献|引用文献|References)\b", body, maxsplit=1, flags=re.M)[0]

    density = cjk_count(trans)
    figs = figure_embeds(md, slug)
    has_refs = bool(REF_HEADING.search(body))
    hero = any(os.path.isfile(os.path.join(ASSETS_DIR, slug, e)) for e in HERO_EXTS)

    # 壊れた画像リンク（実在しないファイルを参照）
    broken = []
    for alt, src in figure_embeds(md, slug):
        if not os.path.isfile(os.path.join(PAPERS_DIR, src)):
            broken.append(src)

    issues = []
    if density < DENSITY_THRESHOLD:
        issues.append(f"①密度: {density}字（<{DENSITY_THRESHOLD} 要確認: 原文と比較し全訳密度か）")
    if len(figs) == 0:
        issues.append("②図: 0枚（原文に図があれば PyMuPDF で抽出・埋め込み）")
    if not has_refs:
        issues.append("③引用文献: 見出しなし（原文の参考文献リストを付与）")
    if not hero:
        issues.append("④ヒーロー: ai-infographic 画像なし（make_infographic_ai.py で生成）")
    if broken:
        issues.append(f"⚠ 壊れた画像リンク: {', '.join(broken)}")

    return {
        "slug": slug,
        "density_cjk": density,
        "figures": len(figs),
        "has_refs": has_refs,
        "hero": hero,
        "broken_images": broken,
        "issues": issues,
        "ok": len(issues) == 0,
    }


def main():
    args = sys.argv[1:]
    as_json = "--json" in args
    show_all = "--all" in args
    global DENSITY_THRESHOLD
    if "--density" in args:
        try:
            DENSITY_THRESHOLD = int(args[args.index("--density") + 1])
        except (IndexError, ValueError):
            pass

    paths = sorted(p for p in glob.glob(os.path.join(PAPERS_DIR, "*.md"))
                   if not os.path.basename(p).startswith("_"))
    results = [audit_paper(p) for p in paths]
    n = len(results)
    ok = sum(1 for r in results if r["ok"])
    c1 = sum(1 for r in results if r["density_cjk"] >= DENSITY_THRESHOLD)
    c2 = sum(1 for r in results if r["figures"] >= 1)
    c3 = sum(1 for r in results if r["has_refs"])
    c4 = sum(1 for r in results if r["hero"])
    broken_pages = [r["slug"] for r in results if r["broken_images"]]

    if as_json:
        print(json.dumps({
            "total": n, "all_ok": ok,
            "criteria": {"density": c1, "figures": c2, "refs": c3, "hero": c4},
            "threshold_density_cjk": DENSITY_THRESHOLD,
            "papers": results,
        }, ensure_ascii=False, indent=2))
        return 0 if ok == n else 1

    print(f"品質監査: 全 {n} 論文")
    print(f"  4基準すべて充足: {ok}/{n}")
    print(f"  ① 全訳密度(≥{DENSITY_THRESHOLD}字): {c1}/{n}")
    print(f"  ② 図あり(≥1枚):     {c2}/{n}")
    print(f"  ③ 引用文献あり:      {c3}/{n}")
    print(f"  ④ ヒーロー画像:      {c4}/{n}")
    if broken_pages:
        print(f"  ⚠ 壊れた画像リンクあり: {len(broken_pages)} 件")
    print()
    flagged = [r for r in results if not r["ok"]]
    if not flagged and not show_all:
        print("✅ 要対応ページなし。全ページが4基準を満たしています。")
        return 0
    print("=== 要対応ページ（夜間セッションが原文を取得して修正する） ===")
    for r in sorted(flagged, key=lambda r: r["density_cjk"]):
        print(f"\n▼ {r['slug']}  [密度{r['density_cjk']}字 図{r['figures']}枚 "
              f"文献{'○' if r['has_refs'] else '×'} ヒーロー{'○' if r['hero'] else '×'}]")
        for iss in r["issues"]:
            print(f"    - {iss}")
    if show_all:
        print("\n=== 合格ページ ===")
        for r in results:
            if r["ok"]:
                print(f"  ✓ {r['slug']}  [密度{r['density_cjk']}字 図{r['figures']}枚]")
    print(f"\n要対応: {len(flagged)} 論文")
    return 1


if __name__ == "__main__":
    sys.exit(main())
