// Upsert a blog post in the Orbitype `posts` table from a JSON payload.
// Updates when a post with the same German title (or explicit id) exists;
// otherwise inserts a new post.
//
// Usage:
//   node .cursor/skills/update-blog/scripts/update-blog.mjs <payload.json>

import { readFileSync } from "node:fs"
import { resolve } from "node:path"

function readEnvFile() {
  const env = {}
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env"), "utf8")
    for (const line of raw.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (!match) continue
      let value = match[2].trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      env[match[1]] = value
    }
  } catch {
    // no .env file — rely on process.env
  }
  return env
}

const fileEnv = readEnvFile()
const API = process.env.ORBITYPE_API_SQL_URL || fileEnv.ORBITYPE_API_SQL_URL
const KEY = process.env.ORBITYPE_API_SQL_KEY || fileEnv.ORBITYPE_API_SQL_KEY

if (!API || !KEY) {
  console.error(
    "Missing ORBITYPE_API_SQL_URL / ORBITYPE_API_SQL_KEY (env or .env).",
  )
  process.exit(1)
}

const payloadPath = process.argv[2]
if (!payloadPath) {
  console.error("Usage: node update-blog.mjs <payload.json>")
  process.exit(1)
}

const payload = JSON.parse(readFileSync(resolve(payloadPath), "utf8"))

function assertI18n(field, name) {
  if (!field || typeof field.de !== "string" || typeof field.en !== "string") {
    console.error(`Payload "${name}" must be an object with "de" and "en".`)
    process.exit(1)
  }
}

assertI18n(payload.title, "title")
assertI18n(payload.lead, "lead")

if (!payload.img) {
  console.error('Payload "img" is required (e.g. "/blog/my-hero.jpg").')
  process.exit(1)
}

const status = {
  options: ["draft", "review", "published"],
  value: payload.status || "published",
}

async function runSql(sql, bindings) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "X-API-KEY": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, bindings }),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`SQL ${res.status}: ${text}`)
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function slugFromTitle(enTitle) {
  return String(enTitle)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function findExistingPost() {
  if (payload.id) {
    const rows = await runSql("SELECT id, title FROM posts WHERE id = :id", {
      id: payload.id,
    })
    return rows?.[0] ?? null
  }

  const rows = await runSql(
    "SELECT id, title FROM posts WHERE title->>'de' = :titleDe ORDER BY created_at DESC LIMIT 1",
    { titleDe: payload.title.de },
  )
  if (rows?.[0]) return rows[0]

  const fuzzy = await runSql(
    "SELECT id, title FROM posts WHERE title->>'de' ILIKE :pattern ORDER BY created_at DESC LIMIT 1",
    { pattern: `%${payload.title.de.slice(0, 48)}%` },
  )
  return fuzzy?.[0] ?? null
}

const bindings = {
  title: JSON.stringify(payload.title),
  lead: JSON.stringify(payload.lead),
  img: payload.img,
  status: JSON.stringify(status),
  keywords: JSON.stringify(payload.keywords || []),
}

const existing = await findExistingPost()
const slug = slugFromTitle(payload.title.en)

if (existing) {
  await runSql(
    `UPDATE posts SET
      title = :title::json,
      lead = :lead::json,
      img = :img,
      status = :status::json,
      keywords = :keywords::json,
      updated_at = CURRENT_TIMESTAMP
      WHERE id = :id`,
    { ...bindings, id: existing.id },
  )

  console.log("Updated post:")
  console.log("  id:     ", existing.id)
  console.log("  was:    ", existing.title?.de)
  console.log("  now:    ", payload.title.de)
  console.log("  status: ", status.value)
  console.log("  url:    ", `/posts/${existing.id}/${slug}`)
} else {
  await runSql(
    "INSERT INTO posts (title, lead, img, status, keywords) " +
      "VALUES (:title::json, :lead::json, :img, :status::json, :keywords::json)",
    bindings,
  )

  const rows = await runSql(
    "SELECT id FROM posts WHERE title->>'de' = :titleDe ORDER BY created_at DESC LIMIT 1",
    { titleDe: payload.title.de },
  )
  const id = rows?.[0]?.id

  console.log("Created post:")
  console.log("  id:     ", id || "(insert ok, id lookup failed)")
  console.log("  status: ", status.value)
  if (id) {
    console.log("  url:    ", `/posts/${id}/${slug}`)
  }
}
