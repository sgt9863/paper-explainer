#!/usr/bin/env python3
"""論文ダイジェストから AI 画像生成でインフォグラフィックを作る（OpenAI 画像API）。

各論文の front matter（title / digest_*）からプロンプトを組み立て、OpenAI の画像生成
API（gpt-image 系）を呼んで content/papers/assets/<slug>/ai-infographic.png を保存する。

⚠ 重要な前提（このリポジトリの実行環境では未充足のため、ここでは動かない）:
  1. 環境変数 OPENAI_API_KEY が必要。
  2. ネットワークが api.openai.com へ到達できること（環境の Network access を Custom/Full にして
     api.openai.com を許可する）。既定ポリシーでは 403 で遮断される。
⚠ 品質の注意: 画像生成モデルは日本語の文字・数値を正確に描けない（誤字・別数字になりやすい）。
  本プロジェクトの「原文に無い数値を作らない」原則と相反するため、データの正確さが要る用途では
  scripts/make_slide.py（決定論レンダリング）を使うこと。本スクリプトは雰囲気重視の用途向け。

使い方:
    OPENAI_API_KEY=sk-... python3 scripts/make_infographic_ai.py [slug ...]
    # モデル/サイズ/品質は環境変数で上書き可:
    #   OPENAI_IMAGE_MODEL（既定 gpt-image-1。アクセスがあれば gpt-image-2 等を指定）
    #   OPENAI_IMAGE_SIZE （既定 1024x1536 / 縦長ポスター）
    #   OPENAI_IMAGE_QUALITY（既定 high）
"""
from __future__ import annotations

import base64
import json
import os
import sys
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(ROOT, "content", "papers")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_site import parse_front_matter, slugify  # noqa: E402

API_URL = "https://api.openai.com/v1/images/generations"
MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-1")
SIZE = os.environ.get("OPENAI_IMAGE_SIZE", "1024x1536")
QUALITY = os.environ.get("OPENAI_IMAGE_QUALITY", "high")


def _aslist(v):
    return [v] if isinstance(v, str) else (v or [])


def build_prompt(meta):
    """ダイジェストデータから、インフォグラフィック生成用プロンプトを組む。"""
    title = meta.get("title", meta.get("slug", ""))
    tagline = meta.get("digest_tagline", "")
    stats = _aslist(meta.get("digest_stats", []))
    points = _aslist(meta.get("digest_points", []))
    chart_label = meta.get("digest_chart_label", "")
    chart = _aslist(meta.get("digest_chart", []))

    lines = [
        "日本語の学術論文ダイジェストを、モダンで読みやすい『縦長インフォグラフィック・ポスター』として描いてください。",
        "デザイン要件: 深い緑（#0a5c4a）を基調にした上品な配色、十分な余白、角丸カード、フラットなアイコン、",
        "明確な視覚階層。上部にタイトル帯、その下に大きな数字のスタットカード群、要点の箇条書き、データの棒グラフ。",
        "文字は日本語で正確に。数値は与えた値を改変しないこと。装飾過多にしない。",
        "",
        f"■タイトル: {title}",
    ]
    if tagline:
        lines.append(f"■サブタイトル: {tagline}")
    if stats:
        lines.append("■数字でみる（ラベル: 値）:")
        for s in stats:
            lines.append(f"  - {s.replace('|', ': ')}")
    if points:
        lines.append("■要点:")
        for p in points:
            lines.append(f"  - {p}")
    if chart:
        lines.append(f"■棒グラフ『{chart_label}』（ラベル: 数値）:")
        for c in chart:
            lines.append(f"  - {c.replace('|', ': ')}")
    lines.append("")
    lines.append("出力は1枚のポスター画像。実在しない数値・項目を足さないこと。")
    return "\n".join(lines)


def generate(prompt, api_key):
    payload = {"model": MODEL, "prompt": prompt, "size": SIZE, "n": 1}
    if MODEL.startswith("gpt-image"):
        payload["quality"] = QUALITY
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    item = data["data"][0]
    if item.get("b64_json"):
        return base64.b64decode(item["b64_json"])
    # URL 形式で返るモデルの場合
    if item.get("url"):
        with urllib.request.urlopen(item["url"], timeout=180) as r:
            return r.read()
    raise RuntimeError("画像データが応答に含まれていません: " + json.dumps(item)[:200])


def main(argv):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("エラー: 環境変数 OPENAI_API_KEY が未設定です。", file=sys.stderr)
        print("  この環境では api.openai.com も既定で遮断されています（網開放が必要）。", file=sys.stderr)
        return 2

    targets = set(argv)
    n = 0
    for fname in sorted(os.listdir(CONTENT_DIR)):
        if not fname.endswith(".md") or fname.startswith("_"):
            continue
        with open(os.path.join(CONTENT_DIR, fname), encoding="utf-8") as f:
            meta, _ = parse_front_matter(f.read())
        meta["slug"] = slugify(meta, os.path.splitext(fname)[0])
        if targets and meta["slug"] not in targets:
            continue

        prompt = build_prompt(meta)
        try:
            png = generate(prompt, api_key)
        except urllib.error.HTTPError as e:
            print(f"[{meta['slug']}] APIエラー {e.code}: {e.read().decode('utf-8', 'ignore')[:300]}", file=sys.stderr)
            continue
        except Exception as e:  # noqa: BLE001
            print(f"[{meta['slug']}] 失敗: {e}", file=sys.stderr)
            continue

        out_dir = os.path.join(CONTENT_DIR, "assets", meta["slug"])
        os.makedirs(out_dir, exist_ok=True)
        out = os.path.join(out_dir, "ai-infographic.png")
        with open(out, "wb") as f:
            f.write(png)
        print("生成:", os.path.relpath(out, ROOT))
        n += 1

    print(f"完了: {n} 件（model={MODEL}, size={SIZE}）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
