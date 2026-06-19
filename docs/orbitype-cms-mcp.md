# Orbitype CMS — MCP and content guide

How CMS content flows in the Z-Management project, how to set up Orbitype MCP in Cursor, and how to add or update sections and posts safely.

Official Orbitype API + MCP docs: [Orbitype Docs — API Authentication](https://www.orbitype.com/docs/oQSPNY)

---

## 1) Big picture

This repository is a Nuxt marketing frontend that reads page content from PostgreSQL through internal API routes.

### Request flow

1. User opens a URL (for example `/`, `/lieferantenmanagement`, `/posts/...`).
2. A Nuxt page in `pages/*` handles the route.
3. The page calls an internal endpoint in `server/api/*`.
4. The endpoint posts SQL to `ORBITYPE_API_SQL_URL` with `X-API-KEY: ORBITYPE_API_SQL_KEY`.
5. The database row is returned (pages include a `sections` JSON array; posts include `title`, `lead`, `img`, …).
6. `components/sections/AnySection.vue` renders each section on CMS pages.

### Cursor MCP vs Nuxt runtime

| Layer                                  | Purpose                                           |
| -------------------------------------- | ------------------------------------------------- |
| **Orbitype MCP** (`.cursor/mcp.json`)  | Lets Cursor read/write CMS data while you develop |
| **Nuxt app** (`.env` + `server/api/*`) | Serves the website at runtime                     |

MCP does **not** replace the Nuxt app. It replaces manual Orbitype UI edits and ad-hoc SQL during development.

### Multiple websites in one setup

Orbitype supports multiple sites via separate connector-scoped API keys:

- One API key is scoped to one connector.
- Each connector can point to a different database/schema or content scope.
- In Cursor, define multiple MCP servers in `.cursor/mcp.json` (production site, marketing site, local, and so on).

Same section system and rendering code; different data per connector/key.

### Important files

| Area              | Path                                                      |
| ----------------- | --------------------------------------------------------- |
| CMS pages         | `pages/[[slug]].vue` → `server/api/pages/index.get.ts`    |
| Blog list         | `pages/posts/index.vue` → `server/api/posts/index.get.ts` |
| Blog detail       | `pages/posts/[id]/[[slug]].vue`                           |
| API handlers      | `server/api/*`                                            |
| Section renderer  | `components/sections/AnySection.vue`                      |
| Section type      | `types/util/Section.d.ts`                                 |
| Welcome fallback  | `server/api/pages/index.get.ts`                           |
| Blog upsert skill | `.cursor/skills/update-blog/scripts/update-blog.mjs`      |
| SQL schemas       | `_scripts/sql/*.sql`                                      |

---

## 2) MCP setup in this project

### Step 1 — API keys in Orbitype

Create keys at [Orbitype API keys](https://app.orbitype.com/settings/api-keys):

| Key                                 | Used by       | Env var (Nuxt `.env`)            | Env var (Cursor MCP)                  |
| ----------------------------------- | ------------- | -------------------------------- | ------------------------------------- |
| SQL connector (website)             | Nuxt + MCP    | `ORBITYPE_API_SQL_KEY`           | `ORBITYPE_SQL_API_KEY_PROD_WEBSITE`   |
| SQL connector (marketing, optional) | MCP           | `ORBITYPE_API_SQL_KEY_MARKETING` | `ORBITYPE_SQL_API_KEY_PROD_MARKETING` |
| S3 connector (optional)             | MCP for media | `ORBITYPE_API_S3_KEY`            | `ORBITYPE_S3_PUBLIC_API_KEY_PROD`     |

Each key is scoped to **one connector**. Use separate MCP entries if you manage multiple websites.

### Step 2 — Add keys to `.env`

```bash
ORBITYPE_API_SQL_URL=https://core.orbitype.com/api/sql/v1
ORBITYPE_API_SQL_KEY=your-sql-api-key

# Optional second connector for marketing site:
# ORBITYPE_API_SQL_KEY_MARKETING=your-marketing-sql-api-key

ORBITYPE_API_S3_URL=https://core.orbitype.com/api/s3/v1
ORBITYPE_API_S3_KEY=your-s3-api-key
```

### Step 3 — Export MCP env vars for Cursor

MCP reads `${env:...}` from **Cursor's environment**, not from Nuxt's `.env` automatically.

Print export commands from your local `.env`:

```bash
npm run mcp:env
```

Copy the output into `~/.zshrc`, then restart Cursor (or reload MCP in **Cursor Settings → MCP**).

### Step 4 — MCP config

Already configured in [`.cursor/mcp.json`](../.cursor/mcp.json):

- `orbitype-sql-prod-website` — primary database read/write
- `orbitype-sql-prod-marketing` — second website connector (optional)
- `orbitype-s3-public-prod` — file storage (enable after creating S3 key)

Example structure:

```json
{
  "mcpServers": {
    "orbitype-sql-prod-website": {
      "url": "https://core.orbitype.com/api/mcp/v1",
      "headers": {
        "X-API-KEY": "${env:ORBITYPE_SQL_API_KEY_PROD_WEBSITE}"
      }
    }
  }
}
```

### Step 5 — Verify

```bash
npm run mcp:verify
```

In a new Cursor chat:

1. Call `orbitype_get_context` — confirms project/connector scope
2. Call `sql_readonly_query` with `SELECT id, slug FROM pages LIMIT 5`

---

## 3) Recommended MCP workflow

Every session:

1. `orbitype_get_context`
2. `sql_readonly_query` for reads/analysis
3. `sql_crud_execute` for inserts/updates/deletes

### Safe content workflow

1. Read current data with `sql_readonly_query`.
2. Save a backup copy of the current `sections` or row JSON.
3. Apply updates with `sql_crud_execute`.
4. Re-read the row and verify JSON.
5. Open the target URL and confirm rendering and SEO.

### Figma + Orbitype MCP together

1. Design a section in Figma (Figma MCP)
2. Implement `SectionX.vue` in code
3. Insert matching JSON via Orbitype MCP (`sql_crud_execute`)
4. Verify at `http://localhost:3000/`

Full agent reference: [`.cursor/rules/10-architecture/03-orbitype-cms.mdc`](../.cursor/rules/10-architecture/03-orbitype-cms.mdc)

---

## 4) Sections system

Each page row includes metadata (`title`, `lead`, `keywords`, …) and `sections` (JSON array). Every section must include `_orbi.component` and should follow **key order for the CMS admin UI**:

1. **First key** — human-readable (`title`, `name`, `label`, …). The CMS uses this as the list label. Do not use `img` first (URLs are hard to skim).
2. **Middle keys** — section props (`content`, `variant`, …).
3. **Last key** — `_orbi` (component binding).

```json
{
  "title": { "en": "Feature callout", "de": "Feature-Highlight" },
  "content": { "en": "<p>...</p>", "de": "<p>...</p>" },
  "_orbi": { "component": "SectionFeatureCallout" }
}
```

`AnySection.vue` auto-loads all `components/sections/*.vue`. `_orbi.component` must match the Vue file name (for example `SectionFeatureCallout.vue` → `"SectionFeatureCallout"`). No registration file is needed.

Localized fields use `en` and `de` keys with `useTranslate()`.

### Example: add a new section

**1. Create** `components/sections/SectionFeatureCallout.vue` (see existing sections for `I18nString` props and `SafeHtml` usage).

**2. Append to a page** (for example `home`):

```sql
UPDATE pages
SET sections = (
  COALESCE(sections, '[]'::json)::jsonb
  || jsonb_build_array(
    jsonb_build_object(
      'title', jsonb_build_object(
        'en', '<p>Why teams switch to Orbitype</p>',
        'de', '<p>Warum Teams zu Orbitype wechseln</p>'
      ),
      'content', jsonb_build_object(
        'en', '<p>Run CRM, outreach, and automation in one place.</p>',
        'de', '<p>CRM, Outreach und Automatisierung an einem Ort.</p>'
      ),
      'variant', 'highlight',
      '_orbi', jsonb_build_object('component', 'SectionFeatureCallout')
    )
  )
)::json
WHERE slug = 'home';
```

**3. Verify**

```sql
SELECT slug, sections FROM pages WHERE slug = 'home';
```

Open `/` and confirm the section appears.

**Insert at a specific position** (second section, index `1`):

```sql
UPDATE pages
SET sections = jsonb_insert(
  COALESCE(sections, '[]'::json)::jsonb,
  '{1}',
  jsonb_build_object(
    'title', jsonb_build_object('en', 'Inserted section', 'de', 'Eingefuegter Abschnitt'),
    'content', jsonb_build_object('en', '<p>Inserted by SQL.</p>', 'de', '<p>Per SQL eingefuegt.</p>'),
    '_orbi', jsonb_build_object('component', 'SectionFeatureCallout')
  ),
  false
)::json
WHERE slug = 'home';
```

### Common pitfalls

- `_orbi` not last, or no human-readable first key (CMS list becomes hard to scan).
- Component name mismatch between `_orbi.component` and the `.vue` file name.
- Missing required section props.
- Invalid `sections` shape (must stay an array of objects).
- Missing `en` / `de` on localized fields.
- Editing the wrong connector — run `orbitype_get_context` first.

### Quick SQL snippets

```sql
SELECT id, slug, updated_at FROM pages ORDER BY updated_at DESC;

SELECT section->'_orbi'->>'component' AS component_name
FROM pages, json_array_elements(sections) AS section
WHERE slug = 'home';

SELECT p.slug
FROM pages p, json_array_elements(p.sections) AS section
WHERE section->'_orbi'->>'component' = 'SectionFeatureCallout';

SELECT id, title FROM posts ORDER BY created_at DESC;
```

---

## 5) Blog posts

Blog posts live in the `posts` table. Use Cursor skills for upserts:

- **Create:** [`.cursor/skills/new-blog`](../.cursor/skills/new-blog/SKILL.md)
- **Update:** [`.cursor/skills/update-blog`](../.cursor/skills/update-blog/SKILL.md)

Hero images go in `public/blog/` and are referenced as `/blog/filename.png` in the payload.

---

## References

- [Orbitype Docs — API Authentication](https://www.orbitype.com/docs/oQSPNY)
- [Orbitype API keys settings](https://app.orbitype.com/settings/api-keys)
- Agent rule: [`.cursor/rules/10-architecture/03-orbitype-cms.mdc`](../.cursor/rules/10-architecture/03-orbitype-cms.mdc)
- Project README: [README.md](../README.md)
