#!/usr/bin/env python3
"""論文解説サイトのビルドスクリプト（依存ライブラリなし）。

content/papers/*.md（front matter 付き Markdown）を読み込み、
docs/ 以下に GitHub Pages 用の静的 HTML（一覧 + 各論文ページ）を生成する。

使い方:
    python3 scripts/build_site.py

設計方針:
- 夜間クラウドセッションという ephemeral 環境で確実に動くよう、
  標準ライブラリのみで完結させる（pip install 不要）。
- 解説本文の Markdown は、論文解説で使う構文（見出し・段落・強調・
  箇条書き・番号付きリスト・引用・表・水平線・リンク・インラインコード）を
  カバーする自前コンバータで HTML 化する。
"""
from __future__ import annotations

import html
import json
import os
import re
import shutil
import sys
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(ROOT, "content", "papers")
CONFIG_PATH = os.path.join(ROOT, "config.json")


# --------------------------------------------------------------------------- #
# Front matter のパース
# --------------------------------------------------------------------------- #
def parse_front_matter(text: str):
    """`---` で囲まれた簡易 YAML front matter と本文を分離して返す。"""
    if not text.startswith("---"):
        return {}, text
    parts = text.split("\n")
    if parts[0].strip() != "---":
        return {}, text
    meta_lines = []
    body_start = None
    for i in range(1, len(parts)):
        if parts[i].strip() == "---":
            body_start = i + 1
            break
        meta_lines.append(parts[i])
    if body_start is None:
        return {}, text
    meta = {}
    for line in meta_lines:
        if not line.strip() or ":" not in line:
            continue
        key, _, value = line.partition(":")
        key = key.strip()
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1].strip()
            items = [v.strip().strip("'\"") for v in inner.split(",") if v.strip()]
            meta[key] = items
        else:
            meta[key] = value.strip("'\"")
    body = "\n".join(parts[body_start:])
    return meta, body


# --------------------------------------------------------------------------- #
# 最小限の Markdown -> HTML コンバータ
# --------------------------------------------------------------------------- #
def _inline(text: str) -> str:
    """インライン要素（コード・強調・リンク）を HTML 化する。"""
    # まずコードスパンを退避（中身をエスケープしてプレースホルダ化）
    codes = []

    def stash_code(m):
        codes.append(html.escape(m.group(1)))
        return f"\x00CODE{len(codes) - 1}\x00"

    text = re.sub(r"`([^`]+)`", stash_code, text)

    # 残りをエスケープ
    text = html.escape(text)

    # 画像 ![alt](src) … リンクより先に処理（src はローカル相対パスも許可）
    text = re.sub(
        r"!\[([^\]]*)\]\(([^\s)]+)\)",
        r'<img src="\2" alt="\1" loading="lazy">',
        text,
    )
    # リンク [text](url)
    text = re.sub(
        r"\[([^\]]+)\]\((https?://[^\s)]+)\)",
        r'<a href="\2" target="_blank" rel="noopener">\1</a>',
        text,
    )
    # 太字 **...**
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    # 斜体 *...*
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)

    # コードスパンを復元
    def restore_code(m):
        return f"<code>{codes[int(m.group(1))]}</code>"

    text = re.sub(r"\x00CODE(\d+)\x00", restore_code, text)
    return text


def _render_table(rows):
    """パイプ区切りの表（rows: 行テキストのリスト）を HTML table に変換。"""
    cells = [[c.strip() for c in re.split(r"(?<!\\)\|", r.strip().strip("|"))] for r in rows]
    out = ['<table>']
    out.append("<thead><tr>" + "".join(f"<th>{_inline(c)}</th>" for c in cells[0]) + "</tr></thead>")
    body = cells[2:] if len(cells) > 1 and set("".join(cells[1]).replace("|", "")) <= set("-: ") else cells[1:]
    out.append("<tbody>")
    for row in body:
        out.append("<tr>" + "".join(f"<td>{_inline(c)}</td>" for c in row) + "</tr>")
    out.append("</tbody></table>")
    return "\n".join(out)


def markdown_to_html(md: str) -> str:
    lines = md.split("\n")
    html_parts = []
    i = 0
    n = len(lines)

    def is_table_sep(s: str) -> bool:
        return bool(re.match(r"^\s*\|?[\s:|-]+\|?\s*$", s)) and "-" in s

    while i < n:
        line = lines[i]
        stripped = line.strip()

        # 空行
        if not stripped:
            i += 1
            continue

        # 水平線
        if re.match(r"^(\*\s*){3,}$|^(-\s*){3,}$|^(_\s*){3,}$", stripped):
            html_parts.append("<hr>")
            i += 1
            continue

        # 単独行の画像 → figure（alt をキャプションに）
        m_img = re.match(r"^!\[([^\]]*)\]\(([^\s)]+)\)$", stripped)
        if m_img:
            alt, src = m_img.group(1), m_img.group(2)
            cap = f"<figcaption>{_inline(alt)}</figcaption>" if alt else ""
            html_parts.append(
                f'<figure><img src="{html.escape(src)}" alt="{html.escape(alt)}" loading="lazy">{cap}</figure>'
            )
            i += 1
            continue

        # 見出し
        m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if m:
            level = len(m.group(1))
            html_parts.append(f"<h{level}>{_inline(m.group(2).strip())}</h{level}>")
            i += 1
            continue

        # 表（次行が区切り行）
        if "|" in stripped and i + 1 < n and is_table_sep(lines[i + 1]):
            rows = [lines[i], lines[i + 1]]
            j = i + 2
            while j < n and "|" in lines[j] and lines[j].strip():
                rows.append(lines[j])
                j += 1
            html_parts.append(_render_table(rows))
            i = j
            continue

        # 引用
        if stripped.startswith(">"):
            quote = []
            while i < n and lines[i].strip().startswith(">"):
                quote.append(lines[i].strip()[1:].strip())
                i += 1
            html_parts.append(f"<blockquote>{_inline(' '.join(quote))}</blockquote>")
            continue

        # 箇条書き / 番号付きリスト
        if re.match(r"^\s*[-*+]\s+", line) or re.match(r"^\s*\d+\.\s+", line):
            ordered = bool(re.match(r"^\s*\d+\.\s+", line))
            tag = "ol" if ordered else "ul"
            items = []
            pat = r"^\s*\d+\.\s+(.*)$" if ordered else r"^\s*[-*+]\s+(.*)$"
            while i < n and re.match(pat, lines[i]):
                items.append(re.match(pat, lines[i]).group(1).strip())
                i += 1
            inner = "".join(f"<li>{_inline(it)}</li>" for it in items)
            html_parts.append(f"<{tag}>{inner}</{tag}>")
            continue

        # 段落（空行 or 構造行まで連結）
        para = [stripped]
        i += 1
        while i < n and lines[i].strip() and not re.match(
            r"^(#{1,6}\s|>\s?|\s*[-*+]\s+|\s*\d+\.\s+)", lines[i]
        ) and not (("|" in lines[i]) and i + 1 < n and is_table_sep(lines[i + 1])):
            para.append(lines[i].strip())
            i += 1
        html_parts.append(f"<p>{_inline(' '.join(para))}</p>")

    return "\n".join(html_parts)


# --------------------------------------------------------------------------- #
# HTML テンプレート
# --------------------------------------------------------------------------- #
def chat_panel_html() -> str:
    """論文ページ右側に差し込むAIチャットパネル（ブラウザ直叩き方式）。"""
    return """
<aside class="chat" id="chatPanel" aria-label="この論文へのAI質問">
  <div class="chat-head">
    <span class="chat-title">この論文にAIで質問</span>
    <button type="button" id="chatGear" class="chat-gear" title="設定" aria-label="設定">&#9881;</button>
    <button type="button" id="chatClose" class="chat-close" title="閉じる" aria-label="閉じる">&times;</button>
  </div>
  <div class="chat-settings" id="chatSettings" hidden>
    <label>Anthropic APIキー
      <input type="password" id="chatApiKey" placeholder="sk-ant-..." autocomplete="off">
    </label>
    <label>モデル
      <select id="chatModel"></select>
    </label>
    <button type="button" id="chatSave" class="chat-save">保存</button>
    <p class="chat-hint">キーはこのブラウザ(localStorage)にのみ保存され、送信先はAnthropic APIだけです。GitHubには保存されません。</p>
  </div>
  <div class="chat-messages" id="chatMessages">
    <div class="chat-msg chat-assistant">この論文の内容について日本語で質問できます。例：「この分析法のLOQは？」「40℃にした理由は？」</div>
  </div>
  <form class="chat-input" id="chatForm">
    <textarea id="chatText" rows="2" placeholder="質問を入力（Enterで送信 / Shift+Enterで改行）"></textarea>
    <button type="submit" id="chatSend">送信</button>
  </form>
</aside>
<button type="button" id="chatFab" class="chat-fab" title="AIに質問">&#128172;</button>
"""


def page_template(title, body, site_title, rel_root=".", chat=None, extra_scripts=""):
    """chat = {"config": <chat config dict>, "paper": {title, content, slug}} を渡すと
    AIチャットサイドバー付きの2カラムレイアウトで出力する。"""
    head_extra = ""
    chat_aside = ""
    chat_scripts = ""
    main_open, main_close = "<main class=\"container\">", "</main>"
    if chat:
        main_open = '<div class="layout"><main class="container">'
        chat_aside = chat_panel_html()
        main_close = "</main>" + chat_aside + "</div>"
        # </script> 等でスクリプトタグを抜けられないよう "</" をエスケープ
        paper_json = json.dumps(chat["paper"], ensure_ascii=False).replace("</", "<\\/")
        config_json = json.dumps(chat["config"], ensure_ascii=False).replace("</", "<\\/")
        chat_scripts = (
            f'<script type="application/json" id="paper-data">{paper_json}</script>\n'
            f'<script type="application/json" id="chat-config">{config_json}</script>\n'
            f'<script src="{rel_root}/assets/chat.js" defer></script>'
        )
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<link rel="stylesheet" href="{rel_root}/assets/style.css">{head_extra}
</head>
<body>
<header class="site-header">
  <a class="site-title" href="{rel_root}/index.html">{html.escape(site_title)}</a>
</header>
{main_open}
{body}
{main_close}
<footer class="site-footer">
  <p>自動生成: paper-explainer パイプライン</p>
</footer>
{chat_scripts}
{extra_scripts}
</body>
</html>
"""


def slugify(meta, fallback):
    if meta.get("slug"):
        return meta["slug"]
    base = meta.get("source_pdf") or meta.get("title") or fallback
    base = os.path.splitext(base)[0]
    slug = re.sub(r"[^\w\-]+", "-", base, flags=re.UNICODE).strip("-")
    return slug or fallback


# --------------------------------------------------------------------------- #
# メイン
# --------------------------------------------------------------------------- #
def main():
    with open(CONFIG_PATH, encoding="utf-8") as f:
        config = json.load(f)

    site_title = config.get("site_title", "論文解説")
    levels = config.get("levels", {})
    out_dir = os.path.join(ROOT, config.get("publish", {}).get("output_dir", "docs"))
    papers_out = os.path.join(out_dir, "papers")
    os.makedirs(papers_out, exist_ok=True)

    # 生成済みページをクリアし、削除/改名された解説の取り残しを防ぐ
    for old in os.listdir(papers_out):
        if old.endswith(".html"):
            os.remove(os.path.join(papers_out, old))

    # 図表などの画像アセットを content/papers/assets → docs/papers/assets に複製。
    # md からは相対パス `assets/<slug>/<file>` で参照する（各論文ページは docs/papers/ 直下）。
    assets_src = os.path.join(CONTENT_DIR, "assets")
    assets_dst = os.path.join(papers_out, "assets")
    if os.path.isdir(assets_dst):
        shutil.rmtree(assets_dst)
    if os.path.isdir(assets_src):
        shutil.copytree(assets_src, assets_dst)

    papers = []
    if os.path.isdir(CONTENT_DIR):
        for fname in sorted(os.listdir(CONTENT_DIR)):
            if not fname.endswith(".md") or fname.startswith("_"):
                continue
            with open(os.path.join(CONTENT_DIR, fname), encoding="utf-8") as f:
                meta, body = parse_front_matter(f.read())
            slug = slugify(meta, os.path.splitext(fname)[0])
            meta["slug"] = slug
            meta["_body_html"] = markdown_to_html(body)
            meta["_body_raw"] = body
            papers.append(meta)

    # 日付降順（新しい順）
    def sort_key(p):
        try:
            return datetime.strptime(p.get("date", "1970-01-01"), "%Y-%m-%d")
        except ValueError:
            return datetime(1970, 1, 1)

    papers.sort(key=sort_key, reverse=True)

    # 各論文ページ
    for p in papers:
        level_key = p.get("level", config.get("default_level", "practitioner"))
        level_label = levels.get(level_key, {}).get("label", level_key)
        tags = p.get("tags", [])
        tags_html = " ".join(f'<span class="tag">{html.escape(t)}</span>' for t in tags) if tags else ""
        meta_html = (
            f'<div class="paper-meta">'
            f'<span class="badge">レベル: {html.escape(level_label)}</span> '
            f'<span class="date">{html.escape(p.get("date", ""))}</span> '
            f'{tags_html}'
        )
        if p.get("drive_url"):
            meta_html += f' &middot; <a href="{html.escape(p["drive_url"])}" target="_blank" rel="noopener">元PDF (Drive)</a>'
        if p.get("source_pdf"):
            meta_html += f' &middot; <span class="src">{html.escape(p["source_pdf"])}</span>'
        meta_html += "</div>"

        body = (
            f'<article class="paper">'
            f'<h1>{html.escape(p.get("title", p["slug"]))}</h1>'
            f'{meta_html}'
            f'<hr>'
            f'{p["_body_html"]}'
            f'<p class="back"><a href="../index.html">&larr; 一覧へ戻る</a></p>'
            f'</article>'
        )
        chat_cfg = config.get("chat", {})
        chat = None
        if chat_cfg.get("enabled"):
            chat = {
                "config": {
                    "default_model": chat_cfg.get("default_model", "claude-sonnet-4-6"),
                    "models": chat_cfg.get("models", []),
                    "max_tokens": chat_cfg.get("max_tokens", 1024),
                },
                "paper": {
                    "title": p.get("title", p["slug"]),
                    "slug": p["slug"],
                    "content": p["_body_raw"],
                },
            }
        out_path = os.path.join(papers_out, f'{p["slug"]}.html')
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(page_template(p.get("title", p["slug"]), body, site_title, rel_root="..", chat=chat))

    # 一覧ページ
    index_scripts = ""
    if papers:
        # 全タグを出現順に収集（絞り込みチップ用）
        all_tags = []
        for p in papers:
            for t in p.get("tags", []):
                if t not in all_tags:
                    all_tags.append(t)

        items = []
        for p in papers:
            level_key = p.get("level", config.get("default_level", "practitioner"))
            level_label = levels.get(level_key, {}).get("label", level_key)
            summary = p.get("summary", "")
            tags = p.get("tags", [])
            src = p.get("source_pdf", "")
            tag_chips = "".join(f'<span class="tag">{html.escape(t)}</span>' for t in tags)
            blob = " ".join([p.get("title", ""), summary, " ".join(tags), src]).lower()
            meta = (
                f'<div class="index-meta"><span class="date">{html.escape(p.get("date", ""))}</span> '
                f'<span class="badge">{html.escape(level_label)}</span>'
                + (f' <span class="src">{html.escape(src)}</span>' if src else "")
                + "</div>"
            )
            items.append(
                f'<li class="index-item" data-search="{html.escape(blob)}" '
                f'data-tags="{html.escape(",".join(tags))}" data-level="{html.escape(level_key)}">'
                f'<a class="index-link" href="papers/{p["slug"]}.html">{html.escape(p.get("title", p["slug"]))}</a>'
                f'{meta}'
                + (f'<p class="index-summary">{html.escape(summary)}</p>' if summary else "")
                + (f'<div class="index-tags">{tag_chips}</div>' if tags else "")
                + "</li>"
            )

        tagfilters = "".join(
            f'<button type="button" class="tagfilter" data-tag="{html.escape(t)}">{html.escape(t)}</button>'
            for t in all_tags
        )
        controls = (
            '<div class="index-controls">'
            '<input type="search" id="indexSearch" placeholder="キーワードで絞り込み（タイトル・要約・タグ・ファイル名）" aria-label="検索">'
            + (f'<div class="tagfilters" id="tagFilters">{tagfilters}</div>' if all_tags else "")
            + "</div>"
        )
        list_html = (
            controls
            + '<ul class="index-list" id="indexList">' + "".join(items) + "</ul>"
            + '<p class="noresult" id="noResult" hidden>該当する解説がありません。</p>'
        )
        index_scripts = f'<script src="{"."}/assets/index.js" defer></script>'
    else:
        list_html = '<p class="empty">まだ解説はありません。夜間パイプラインが新着PDFを処理すると、ここに一覧が表示されます。</p>'

    index_body = (
        f'<h1>{html.escape(site_title)}</h1>'
        f'<p class="lead">{html.escape(config.get("site_description", ""))}</p>'
        f'<p class="count"><span id="shownCount">{len(papers)}</span> / {len(papers)} 件の解説</p>'
        f'{list_html}'
    )
    with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(page_template(site_title, index_body, site_title, rel_root=".", extra_scripts=index_scripts))

    # GitHub Pages の Jekyll 処理を無効化（_ で始まるファイルもそのまま配信）
    open(os.path.join(out_dir, ".nojekyll"), "w").close()

    print(f"ビルド完了: {len(papers)} 件の論文ページを {out_dir}/ に生成しました。")


if __name__ == "__main__":
    sys.exit(main())
