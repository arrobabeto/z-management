# Orbitype Marketing CMS — MCP Setup

This guide explains how CMS content flows in this project, how to set up Orbitype MCP in Cursor, and how to add or update sections safely.

Official Orbitype API + MCP docs: [Orbitype Docs — API Authentication](https://www.orbitype.com/docs/oQSPNY)

---

## 1) Big picture

This repository is a Nuxt marketing frontend that reads page content from PostgreSQL through internal API routes.

### Request flow

1. User opens a URL (for example `/`, `/platform`, `/docs/...`).
2. Nuxt page file in `pages/*` handles the route.
3. Page calls an internal endpoint in `server/api/*`.
4. Endpoint executes SQL via Orbitype (`ORBITYPE_API_SQL_URL` + `ORBITYPE_API_SQL_KEY` in `.env`).
5. Database row is returned with a `sections` JSON array.
6. `components/sections/AnySection.vue` renders each section.

### Cursor MCP vs Nuxt runtime

| Layer                                  | Purpose                                           |
| -------------------------------------- | ------------------------------------------------- |
| **Orbitype MCP** (`.cursor/mcp.json`)  | Lets Cursor read/write CMS data while you develop |
| **Nuxt app** (`.env` + `server/api/*`) | Serves the website at runtime                     |

MCP does **not** replace the Nuxt app. It replaces manual Orbitype UI edits and ad-hoc SQL during development.

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

---

## 4) Figma + Orbitype MCP together

1. Design a section in Figma (Figma MCP)
2. Implement `SectionX.vue` in code
3. Insert matching JSON via Orbitype MCP (`sql_crud_execute`)
4. Verify at `http://localhost:3000/`

---

## References

- [Orbitype Docs — API Authentication](https://www.orbitype.com/docs/oQSPNY)
- [Orbitype API keys settings](https://app.orbitype.com/settings/api-keys)
- Agent rule: [`.cursor/rules/10-architecture/03-orbitype-cms.mdc`](../.cursor/rules/10-architecture/03-orbitype-cms.mdc)
