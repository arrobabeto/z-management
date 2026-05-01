# Orbitype Headless CMS Template

Production-ready Nuxt starter for Orbitype-powered websites with section-driven pages, i18n (`en` + `de`), and server-rendered SEO metadata.

## 3-minute start

```bash
npm ci
npm run setup
npm run dev
```

Open:

- `http://localhost:3000/`
- `http://localhost:3000/de`

## Local CMS modes

Use one of these modes depending on your goal:

### Mock mode (frontend work, no CMS dependency)

```bash
ORBITYPE_MOCK=true npm run dev
```

When `ORBITYPE_MOCK=true`, the app always serves the built-in welcome page from `server/api/pages/index.get.ts`.

### Live Orbitype mode

Set environment variables in `.env`:

```bash
ORBITYPE_API_SQL_URL="https://core.orbitype.com/api/sql/v1"
ORBITYPE_API_SQL_KEY="your-api-key"
NUXT_PUBLIC_SITE_URL="https://your-client-domain.com"
NUXT_PUBLIC_GTM_ID=""
```

Then run:

```bash
npm run dev
```

## What to edit first

1. **Branding and shell layout**
   - `layouts/components/Navigation.vue`
   - `layouts/components/Footer.vue`
   - `app.vue`
2. **Welcome/fallback content**
   - `server/api/pages/index.get.ts`
   - `components/sections/SectionWelcome.vue`
3. **Page rendering**
   - `pages/[[slug]].vue`
   - `components/sections/AnySection.vue`
4. **Styles**
   - `assets/css/style.css`

## End-to-end smoke checks

First-time Playwright browser install:

```bash
npx playwright install
```

Run smoke tests:

```bash
npm run test:e2e
```

Optional custom base URL:

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npm run test:e2e
```

Current smoke coverage:

- homepage render on `/`
- locale route render on `/de`
- first welcome step expand/collapse behavior

## Common issues

- **Home page does not load CMS content**
  - Check `.env` values for `ORBITYPE_API_SQL_URL` and `ORBITYPE_API_SQL_KEY`.
  - Ensure the SQL connector/project is enabled on the Orbitype side for this key.
  - If you want local-only mode, set `ORBITYPE_MOCK=true`.
- **`/de` shows unexpected content**
  - Verify `@nuxtjs/i18n` is enabled in `nuxt.config.ts`.
  - Ensure route resolution is handled through `pages/[[slug]].vue`.
- **Playwright test fails because browser is missing**
  - Run `npx playwright install` once.
- **Port 3000 is already taken**
  - Start on another port: `npx nuxi dev --port 3001`.
# orbitype-cms-template
