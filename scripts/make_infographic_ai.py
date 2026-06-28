#!/usr/bin/env python3
"""論文ダイジェストから AI 画像生成でインフォグラフィックを作る（OpenAI 画像API）。

各論文の front matter（title / digest_*）からプロンプトを組み立て、OpenAI の画像生成
API（gpt-image 系）を呼んで content/papers/assets/<slug>/ai-infographic.png を保存する。

⚠ 前提:
  1. 環境変数 OPENAI_API_KEY が必要。
  2. ネットワークが api.openai.com へ到達できること（環境の Network access が許可されていること）。
     プロキシ経由だと約2MBの base64 応答が途中で切れることがあるため、本スクリプトは
     チャンク読み＋指数バックオフ再試行（OPENAI_IMAGE_RETRIES、既定4）で読み切る。
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
import http.client
import json
import os
import sys
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(ROOT, "content", "papers")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_site import parse_front_matter, slugify  # noqa: E402

API_URL = "https://api.openai.com/v1/images/generations"
MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-1")
SIZE = os.environ.get("OPENAI_IMAGE_SIZE", "1536x1024")  # 横長（landscape）
QUALITY = os.environ.get("OPENAI_IMAGE_QUALITY", "high")
RETRIES = int(os.environ.get("OPENAI_IMAGE_RETRIES", "4"))
# 出力フォーマット。PNG の base64 応答は約2MBになり、プロキシ経由だと途中で切れる
# （body サイズ上限に当たる）ため、既定は圧縮の効く webp にして body を小さく保つ。
FORMAT = os.environ.get("OPENAI_IMAGE_FORMAT", "webp").lower()
COMPRESSION = int(os.environ.get("OPENAI_IMAGE_COMPRESSION", "85"))
_EXT = {"webp": "webp", "jpeg": "jpg", "jpg": "jpg", "png": "png"}


def _aslist(v):
    return [v] if isinstance(v, str) else (v or [])


def build_prompt(meta):
    """論文のダイジェストデータから、画像生成用プロンプトを組む。

    方針: 決まったカード型レイアウトの再現ではなく、『この1枚を見れば研究の概要が
    直感的にわかる』横長インフォグラフィックを gpt-image-2 に自由に発想させる。
    レイアウト・図解の見せ方はモデルに委ね、与えた事実（タイトル・数値・要点）は
    正確に描かせる（原文に無い数値・結論は作らせない＝リポジトリの原則）。
    """
    title = meta.get("title", meta.get("slug", ""))
    tagline = meta.get("digest_tagline", "")
    stats = _aslist(meta.get("digest_stats", []))
    points = _aslist(meta.get("digest_points", []))
    chart_label = meta.get("digest_chart_label", "")
    chart = _aslist(meta.get("digest_chart", []))

    lines = [
        "あなたは一流のサイエンス・インフォグラフィック・デザイナーです。",
        "下記の学術論文（漢方・生薬の品質管理分野）について、"
        "『この1枚を見れば研究の概要が直感的につかめる』横長(landscape, 16:9)の"
        "インフォグラフィックを1枚デザインしてください。",
        "構図・レイアウト・図解の表現は自由に発想してよい。研究の目的→手法→結果→意義の"
        "流れや関係が一目で伝わるよう、フロー図・模式図・アイコン・チャート・対象の図解などを"
        "適宜組み合わせて、物語性のある1枚にまとめてください（定型のスタットカードの羅列に縛られない）。",
        "デザイン: 学術的で洗練された清潔感、明確な視覚階層、たっぷりの余白、"
        "読みやすい日本語タイポグラフィ。色数は抑えめでよい。装飾過多にしない。",
        "厳守事項: 画面内の文字はすべて自然で正確な日本語にする。"
        "下に与えた数値・固有名詞・専門用語は改変せず正確に描く。"
        "与えていない数値・結論・データを新たに作り出さない（捏造禁止）。"
        "意味不明な疑似文字・ダミーテキストを入れない。",
        "",
        f"【論文タイトル】{title}",
    ]
    if tagline:
        lines.append(f"【一言サマリ】{tagline}")
    if stats:
        lines.append("【正確に反映すべき重要な事実・数値（ラベル: 値）】")
        for s in stats:
            lines.append(f"  - {s.replace('|', ': ')}")
    if points:
        lines.append("【研究の要点（盛り込む内容）】")
        for p in points:
            lines.append(f"  - {p}")
    if chart:
        lines.append(f"【数値データ（必要なら図表化。{chart_label}）（ラベル: 数値）】")
        for c in chart:
            lines.append(f"  - {c.replace('|', ': ')}")
    lines.append("")
    lines.append("成果物: 横長1枚のインフォグラフィック画像（説明文の出力は不要、画像のみ）。")
    return "\n".join(lines)


def _read_all(resp) -> bytes:
    """Content-Length 付きの大きな応答を、途中切断に強く全量読み切る。

    画像API応答は base64 で約2MB になり、プロキシ経由だと一度の read() が
    IncompleteRead で落ちることがある。チャンク読みして部分データを連結し、
    末尾の IncompleteRead でも既読分を活かして全長まで読む。
    """
    expected = resp.getheader("Content-Length")
    expected = int(expected) if expected and expected.isdigit() else None
    chunks = []
    got = 0
    while True:
        try:
            chunk = resp.read(65536)
        except http.client.IncompleteRead as e:
            if e.partial:
                chunks.append(e.partial)
                got += len(e.partial)
            break
        if not chunk:
            break
        chunks.append(chunk)
        got += len(chunk)
    if expected is not None and got < expected:
        raise http.client.IncompleteRead(b"".join(chunks), expected - got)
    return b"".join(chunks)


def _call_api(prompt, api_key):
    payload = {"model": MODEL, "prompt": prompt, "size": SIZE, "n": 1}
    if MODEL.startswith("gpt-image"):
        payload["quality"] = QUALITY
        payload["output_format"] = FORMAT
        if FORMAT in ("webp", "jpeg", "jpg"):
            payload["output_compression"] = COMPRESSION
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        data = json.loads(_read_all(resp).decode("utf-8"))
    item = data["data"][0]
    if item.get("b64_json"):
        return base64.b64decode(item["b64_json"])
    # URL 形式で返るモデルの場合
    if item.get("url"):
        with urllib.request.urlopen(item["url"], timeout=300) as r:
            return _read_all(r)
    raise RuntimeError("画像データが応答に含まれていません: " + json.dumps(item)[:200])


def generate(prompt, api_key):
    """大きな応答の途中切断（IncompleteRead）に備え、指数バックオフで再試行する。"""
    last = None
    for attempt in range(1, RETRIES + 1):
        try:
            return _call_api(prompt, api_key)
        except (http.client.IncompleteRead, urllib.error.URLError, TimeoutError) as e:
            last = e
            if attempt < RETRIES:
                wait = 2 ** attempt
                print(f"  読み込み失敗（{type(e).__name__}）。{wait}s 後に再試行 {attempt}/{RETRIES - 1}…",
                      file=sys.stderr)
                time.sleep(wait)
    raise last


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
        # フォーマット切替時に古い別拡張子が残らないよう掃除
        for ext in ("png", "webp", "jpg"):
            old = os.path.join(out_dir, f"ai-infographic.{ext}")
            if os.path.exists(old):
                os.remove(old)
        out = os.path.join(out_dir, f"ai-infographic.{_EXT.get(FORMAT, 'png')}")
        with open(out, "wb") as f:
            f.write(png)
        print("生成:", os.path.relpath(out, ROOT))
        n += 1

    print(f"完了: {n} 件（model={MODEL}, size={SIZE}）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
