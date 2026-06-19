# Z-Management

Corporate marketing website for **Z-Management AG** — bilingual (German default, English under `/en`), CMS-driven pages, blog, SEO metadata, and OG images. Built with Nuxt 3 and deployed on Vercel. Content is stored in PostgreSQL and managed through [Orbitype](https://www.orbitype.com).

## Tech stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Framework  | Nuxt 3 (SSR), Vue 3, TypeScript                   |
| Styling    | Tailwind CSS                                      |
| i18n       | `@nuxtjs/i18n` — `de` unprefixed, `en` at `/en/*` |
| Images     | `@nuxt/image`                                     |
| CMS / data | Orbitype (PostgreSQL via SQL API)                 |
| Hosting    | Vercel                                            |
| Quality    | ESLint, Prettier, Husky, Playwright e2e           |

**Requirements:** Node `>=20.13` (see [.nvmrc](.nvmrc)), npm `>=10.8`.

## Quick start

```bash
npm ci
cp .env.example .env   # adjust variables
npm run setup
npm run dev
```

Open:

- `http://localhost:3000/` — German (default locale)
- `http://localhost:3000/en` — English

### CMS modes

**Mock mode** — frontend work without a live CMS connection:

```bash
ORBITYPE_MOCK=true npm run dev
```

Serves the built-in welcome/onboarding page from `server/api/pages/index.get.ts`.

**Live CMS** — set in `.env`:

```bash
ORBITYPE_MOCK=false
ORBITYPE_API_SQL_URL="https://core.orbitype.com/api/sql/v1"
ORBITYPE_API_SQL_KEY="your-api-key"
NUXT_PUBLIC_SITE_URL="http://localhost:3000"
```

See [.env.example](.env.example) for all public branding and optional GTM settings.

## Repository structure

```
pages/                  Nuxt routes (CMS catch-all, blog, 404)
components/sections/    CMS sections (Section*.vue → AnySection.vue)
layouts/                Shell (Navigation, Footer, CookieBanner)
composables/            useTranslate, useLocalePaths, useCanonicalLinks
server/api/             BFF to Orbitype (pages, posts, comments…)
server/routes/          sitemaps, robots.txt, llms.txt
_scripts/               setup, seeds, blog upsert helpers
.cursor/skills/         new-blog, update-blog (CMS content workflows)
docs/                   Orbitype / MCP documentation
types/dto/              IPost, IPage, IComment…
public/                 Static assets (blog heroes, brand, page images)
```

### Main routes

| Route                            | File                                                           | Data source        |
| -------------------------------- | -------------------------------------------------------------- | ------------------ |
| `/`, `/lieferantenmanagement`, … | [pages/[[slug]].vue](pages/[[slug]].vue)                       | `server/api/pages` |
| `/posts`                         | [pages/posts/index.vue](pages/posts/index.vue)                 | `server/api/posts` |
| `/posts/:id/:slug`               | [pages/posts/[id]/[[slug]].vue](pages/posts/[id]/[[slug]].vue) | posts + related    |

## Developer guide

### Conventions

- **Composition API** with explicit imports from `#app` (auto-imports disabled)
- **i18n:** localized fields use `{ de, en }` and `useTranslate()`
- **CMS sections:** `_orbi.component` must match the Vue file name (e.g. `SectionHero.vue` → `"SectionHero"`)
- **Page-local components:** underscore prefix (e.g. `_BlogArticle.vue`)
- **Navigation:** use `navigateTo` from `#app`, not `router.push`
- **Route params:** bracket notation — `route.params["id"]`

### Common tasks

**Add a page section**

1. Create `components/sections/SectionX.vue` (see existing sections for `I18nString` props and `SafeHtml`).
2. Publish matching JSON to the CMS — see [docs/orbitype-cms-mcp.md](docs/orbitype-cms-mcp.md).

**Add or update a blog post**

Use Cursor skills [`.cursor/skills/new-blog`](.cursor/skills/new-blog/SKILL.md) or [`.cursor/skills/update-blog`](.cursor/skills/update-blog/SKILL.md). Place hero images in `public/blog/`. Posts render at `pages/posts/[id]/[[slug]].vue`.

**Seed CMS content**

Run scripts in `_scripts/` (e.g. `seed-erfolgsgeschichten.mjs`, `seed-lieferantenmanagement.mjs`). Blog upsert: `.cursor/skills/update-blog/scripts/update-blog.mjs`.

**i18n and canonical URLs**

German is the default locale (no prefix). English lives under `/en/*`. Legacy `/de/*` paths redirect via [middleware/de-prefix-redirect.global.ts](middleware/de-prefix-redirect.global.ts). Canonical links: [composables/useLocalePaths.ts](composables/useLocalePaths.ts), [composables/useCanonicalLinks.ts](composables/useCanonicalLinks.ts).

**Edit shell / branding first**

- [layouts/components/Navigation.vue](layouts/components/Navigation.vue)
- [layouts/components/Footer.vue](layouts/components/Footer.vue)
- [assets/css/style.css](assets/css/style.css)

## npm scripts

| Script               | Description                      |
| -------------------- | -------------------------------- |
| `npm run dev`        | Start dev server (opens browser) |
| `npm run build`      | Production build                 |
| `npm run preview`    | Preview production build         |
| `npm run setup`      | First-time project setup + Husky |
| `npm run eslint`     | Lint all JS/TS/Vue files         |
| `npm run typecheck`  | Nuxt TypeScript check            |
| `npm run test:e2e`   | Playwright smoke tests           |
| `npm run mcp:env`    | Print MCP env export commands    |
| `npm run mcp:verify` | Verify Orbitype MCP connectivity |

## Environment variables

Copy [.env.example](.env.example) to `.env`. Key groups:

- **Orbitype:** `ORBITYPE_MOCK`, `ORBITYPE_API_SQL_URL`, `ORBITYPE_API_SQL_KEY`
- **Branding / SEO:** `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_SITE_NAME`, `NUXT_PUBLIC_ORGANIZATION_NAME`, …
- **Optional:** `NUXT_PUBLIC_GTM_ID`, `NUXT_PUBLIC_COMMENTS_ENABLED`

Set production values in **Vercel → Project Settings → Environment Variables**. Use your deployment URL for `NUXT_PUBLIC_SITE_URL`, not `localhost`.

## Testing and quality

Pre-commit (Husky): Prettier on staged files, ESLint, TypeScript check.

**E2E tests** (first run: `npx playwright install`):

```bash
npm run test:e2e
```

Optional custom base URL: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npm run test:e2e`

### Common issues

- **Home page shows welcome screen instead of CMS content** — check `ORBITYPE_API_SQL_URL` / `ORBITYPE_API_SQL_KEY`, or set `ORBITYPE_MOCK=true` for local-only work.
- **Unexpected locale content** — default locale is `de`; English uses `/en` prefix. `/de/*` redirects to unprefixed paths.
- **Port 3000 in use** — `npx nuxi dev --port 3001`
- **Playwright browser missing** — `npx playwright install`

## Git workflow

- **`develop`** — day-to-day development
- **`main`** — production (merge via pull request)

## Content and CMS (Orbitype)

Page and blog content lives in PostgreSQL. At runtime, Nuxt reads it through `server/api/*` handlers that call the Orbitype SQL API. During development, use **Cursor MCP** to edit sections and posts without leaving the IDE.

For full CMS documentation — request flow, MCP setup, section JSON, SQL examples, and pitfalls — see:

- [docs/orbitype-cms-mcp.md](docs/orbitype-cms-mcp.md)
- [`.cursor/rules/10-architecture/03-orbitype-cms.mdc`](.cursor/rules/10-architecture/03-orbitype-cms.mdc) (agent reference)
- [Orbitype API docs](https://www.orbitype.com/docs/oQSPNY)
