---
name: new-blog
description: Create and publish a Z-Management blog post in the Orbitype CMS from a title and a content doc. Use when the user asks to write, draft, create, or publish a new blog post / blog article, or runs /new-blog.
disable-model-invocation: true
---

# New Blog Post

Create a bilingual (de + en) blog post and insert it into the Orbitype `posts`
table. The post is rendered by the Blog Detail template
(`pages/posts/[id]/[[slug]].vue` + `_BlogArticle.vue`) and listed on
`pages/posts/index.vue`.

## Minimum input

1. **Title** (required) — the blog title. If given in one language, translate to
   the other (de + en are both required).
2. **Content doc** (required) — a file path or pasted text describing the blog's
   information and content. This is the source for the article body.

If either is missing, ask for it before continuing. Everything else (image,
keywords, status) has sensible defaults.

## Workflow

```
- [ ] 1. Read the content doc + confirm the title
- [ ] 2. Draft title + lead as I18nString (de + en) HTML
- [ ] 3. Write the payload JSON
- [ ] 4. Run the insert script
- [ ] 5. Verify the rendered post
```

### Step 1 — Read the source

Read the provided doc (use the Read tool for a file, or use the pasted text).
Extract the structure: intro, sections, sub-points, lists, conclusion.

### Step 2 — Draft `title` and `lead`

Produce a JSON object with two I18nString fields. Write natural, fluent copy in
**both** `de` and `en` (do not leave one as a placeholder).

`lead` is the full **article body as HTML**. It is sanitized before rendering,
so use ONLY these tags (others are stripped):

| Tag                      | Use for                                               |
| ------------------------ | ----------------------------------------------------- |
| `<h2>`                   | Section headings (renders 24px bold)                  |
| `<h3>`                   | Sub-headings / numbered steps (renders 18px semibold) |
| `<p>`                    | Paragraphs (16px)                                     |
| `<ul>` / `<ol>` + `<li>` | Bullet / numbered lists                               |
| `<strong>`               | Bold emphasis (e.g. bold list items)                  |
| `<em>`                   | Italic emphasis                                       |
| `<a href="…">`           | Links (rendered in brand orange)                      |
| `<br>`                   | Line break within an item                             |

Rules:

- Start the body with an `<h2>` intro heading, not an `<h1>` (the page already
  renders the title as the `<h1>` hero).
- Keep paragraphs in `<p>`; never rely on blank lines for spacing.
- Do not include `<style>`, `<script>`, `<img>`, `class`, or inline styles.

### Step 3 — Write the payload

Use this shape (see `payload.example.json`):

```json
{
  "title": { "de": "…", "en": "…" },
  "lead": { "de": "<h2>…</h2><p>…</p>", "en": "<h2>…</h2><p>…</p>" },
  "img": "/blog/your-image.jpg",
  "keywords": ["einkauf", "..."],
  "status": "published"
}
```

- `img` (optional): path under `public/blog/` for the hero + card image. Defaults
  to `/blog/hero-bg.jpg`. Use a clean **landscape** photo **without baked-in
  text** (the template overlays the title). Place new images in `public/blog/`.
- `keywords` (optional): array of strings for SEO.
- `status` (optional): `"published"` (default), `"review"`, or `"draft"`. Only
  `published` posts appear in listings.

Write the payload to a temp file, e.g. `/tmp/new-blog.json`.

### Step 4 — Insert

```bash
node .cursor/skills/new-blog/scripts/create-blog.mjs /tmp/new-blog.json
```

The script reads `ORBITYPE_API_SQL_URL` / `ORBITYPE_API_SQL_KEY` from the
environment or the project `.env`, inserts the post, and prints the new post id
and URL (`/de/posts/<id>/<slug>`).

### Step 5 — Verify

If the dev server is running, open the printed `de url` (or screenshot it with
`SHOT_URL="http://localhost:3000/de/posts/<id>" node _scripts/_shot.mjs`) and
confirm the hero, article body, related posts, and newsletter CTA render
correctly.

## Notes

- The blog list excerpt is derived automatically from the first text of `lead` —
  no separate excerpt field is needed.
- Posts have no `slug` column; the URL slug is generated from the English title.
- To **update** an existing post (or upsert by title), use
  [update-blog](../update-blog/SKILL.md) or `/update-blog`.
