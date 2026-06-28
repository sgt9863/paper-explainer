#!/usr/bin/env python3
"""論文ダイジェストを「スライド一枚絵」(PNG, 16:9) に書き出す。

front matter の digest_*（tagline / stats / points）と title / date / source_pdf から
HTML スライドを組み、Chromium でスクリーンショットして
content/papers/assets/<slug>/slide.png を生成する。

依存: playwright（解析セッション側のツール。build_site.py は依存ゼロのまま）。
Chromium は実行環境にプリインストール済みのものを使う。

使い方:
    python3 scripts/make_slide.py            # content/papers/*.md 全件
    python3 scripts/make_slide.py <slug> ... # 指定slugのみ
"""
from __future__ import annotations

import glob
import html
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(ROOT, "content", "papers")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_site import parse_front_matter, slugify  # noqa: E402

W, H = 1200, 675


def _chromium_path():
    cands = sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome"))
    return cands[-1] if cands else None


def _aslist(v):
    if isinstance(v, str):
        return [v]
    return v or []


def _pairs(items):
    out = []
    for s in items:
        label, sep, value = s.partition("|")
        out.append((label.strip(), value.strip()) if sep else ("", s.strip()))
    return out


def bar_chart_svg(title, data):
    """ラベル|数値 の横棒グラフを SVG で返す（実データのみ。値は原文どおり）。"""
    if not data:
        return ""
    parsed = []
    for lab, val in data:
        try:
            parsed.append((lab, float(val)))
        except ValueError:
            pass
    if not parsed:
        return ""
    width = 540
    label_w = 168
    bar_h, gap = 30, 14
    maxv = max(v for _, v in parsed) or 1
    bar_area = width - label_w - 64
    rows = ""
    for i, (lab, val) in enumerate(parsed):
        y = i * (bar_h + gap)
        w = max(2, bar_area * val / maxv)
        valtxt = ("%g" % val)
        rows += (
            f'<text x="{label_w - 8}" y="{y + bar_h * 0.7:.0f}" font-size="16" '
            f'text-anchor="end" fill="#1f2328">{html.escape(lab)}</text>'
            f'<rect x="{label_w}" y="{y}" width="{w:.0f}" height="{bar_h}" rx="4" fill="#0a5c4a"/>'
            f'<text x="{label_w + w + 6:.0f}" y="{y + bar_h * 0.7:.0f}" font-size="15" '
            f'fill="#57606a">{valtxt}</text>'
        )
    ch = len(parsed) * (bar_h + gap)
    return (
        f'<svg class="chart" width="{width}" viewBox="0 -34 {width} {ch + 40}" '
        f'xmlns="http://www.w3.org/2000/svg" font-family="IPAGothic,sans-serif">'
        f'<text x="0" y="-12" font-size="17" font-weight="bold" fill="#0a5c4a">{html.escape(title)}</text>'
        f"{rows}</svg>"
    )


def slide_html(meta):
    title = html.escape(meta.get("title", meta.get("slug", "")))
    tagline = html.escape(meta.get("digest_tagline", ""))
    date = html.escape(meta.get("date", ""))
    src = html.escape(meta.get("source_pdf", ""))

    stat_cells = ""
    for label, value in _pairs(_aslist(meta.get("digest_stats", []))[:6]):
        stat_cells += (
            f'<div class="stat"><div class="v">{html.escape(value)}</div>'
            f'<div class="l">{html.escape(label)}</div></div>'
        )

    chart = bar_chart_svg(
        meta.get("digest_chart_label", ""), _pairs(_aslist(meta.get("digest_chart", [])))
    )
    n_points = 4 if chart else 4
    point_lis = "".join(
        f"<li>{html.escape(p)}</li>" for p in _aslist(meta.get("digest_points", []))[:n_points]
    )

    cols = (
        f'<div class="cols"><ul class="points">{point_lis}</ul>'
        f'<div class="chartbox">{chart}</div></div>'
        if chart
        else f'<ul class="points wide">{point_lis}</ul>'
    )

    return f"""<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  html,body {{ width:{W}px; height:{H}px; }}
  body {{ font-family:"IPAGothic","IPAPGothic",sans-serif; color:#1f2328; background:#fff; }}
  .slide {{ width:{W}px; height:{H}px; display:flex; flex-direction:column; overflow:hidden; }}
  .bar {{ background:#0a5c4a; color:#fff; height:80px; display:flex; align-items:center;
         justify-content:space-between; padding:0 44px; flex:0 0 auto; }}
  .bar .k {{ font-size:22px; font-weight:bold; letter-spacing:.06em; }}
  .bar .d {{ font-size:20px; opacity:.85; }}
  .body {{ flex:1; padding:26px 44px 0; display:flex; flex-direction:column; min-height:0; }}
  .title {{ font-size:34px; font-weight:bold; line-height:1.3;
            display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }}
  .tagline {{ font-size:21px; color:#0a5c4a; margin-top:8px; line-height:1.45;
              display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }}
  .stats {{ display:flex; gap:12px; margin-top:18px; }}
  .stat {{ flex:1; background:#f3f8f6; border:1px solid #d0d7de; border-radius:10px;
           padding:12px 10px; text-align:center; }}
  .stat .v {{ font-size:24px; font-weight:bold; color:#0a5c4a; line-height:1.2; word-break:break-all; }}
  .stat .l {{ font-size:14px; color:#57606a; margin-top:5px; }}
  .cols {{ display:flex; gap:28px; margin-top:20px; flex:1; min-height:0; }}
  .points {{ list-style:none; flex:1; }}
  .points.wide {{ margin-top:22px; }}
  .points li {{ font-size:21px; line-height:1.5; margin:9px 0; padding-left:28px; position:relative; }}
  .points li::before {{ content:"\\25B8"; position:absolute; left:4px; color:#0a5c4a; }}
  .chartbox {{ flex:0 0 540px; }}
  .chart {{ max-height:300px; }}
  .foot {{ height:46px; border-top:1px solid #d0d7de; display:flex; align-items:center;
           justify-content:space-between; padding:0 44px; color:#57606a; font-size:15px; flex:0 0 auto; }}
</style></head><body>
<div class="slide">
  <div class="bar"><span class="k">論文ダイジェスト</span><span class="d">{date}</span></div>
  <div class="body">
    <div class="title">{title}</div>
    {f'<div class="tagline">{tagline}</div>' if tagline else ''}
    {f'<div class="stats">{stat_cells}</div>' if stat_cells else ''}
    {cols}
  </div>
  <div class="foot"><span>漢方・生薬QC 論文解説</span><span>{src}</span></div>
</div></body></html>"""


def main(argv):
    targets = set(argv)
    metas = []
    for fname in sorted(os.listdir(CONTENT_DIR)):
        if not fname.endswith(".md") or fname.startswith("_"):
            continue
        with open(os.path.join(CONTENT_DIR, fname), encoding="utf-8") as f:
            meta, _ = parse_front_matter(f.read())
        meta["slug"] = slugify(meta, os.path.splitext(fname)[0])
        if targets and meta["slug"] not in targets:
            continue
        metas.append(meta)

    if not metas:
        print("対象なし")
        return 0

    from playwright.sync_api import sync_playwright

    exe = _chromium_path()
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=exe) if exe else pw.chromium.launch()
        for meta in metas:
            slug = meta["slug"]
            out_dir = os.path.join(CONTENT_DIR, "assets", slug)
            os.makedirs(out_dir, exist_ok=True)
            out = os.path.join(out_dir, "slide.png")
            page = browser.new_page(viewport={"width": W, "height": H}, device_scale_factor=2)
            page.set_content(slide_html(meta), wait_until="networkidle")
            page.screenshot(path=out, clip={"x": 0, "y": 0, "width": W, "height": H})
            page.close()
            print("生成:", os.path.relpath(out, ROOT))
        browser.close()
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
