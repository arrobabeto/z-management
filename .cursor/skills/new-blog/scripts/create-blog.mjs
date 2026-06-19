// Inserts a blog post into the Orbitype `posts` table from a JSON payload.
//
// Usage:
//   node .cursor/skills/new-blog/scripts/create-blog.mjs <payload.json>
//
// Reads ORBITYPE_API_SQL_URL / ORBITYPE_API_SQL_KEY from the environment,
// falling back to the project `.env` file.

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
  console.error("Usage: node create-blog.mjs <payload.json>")
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

const insertSql =
  "INSERT INTO posts (title, lead, img, status, keywords) " +
  "VALUES (:title::json, :lead::json, :img, :status::json, :keywords::json)"

await runSql(insertSql, {
  title: JSON.stringify(payload.title),
  lead: JSON.stringify(payload.lead),
  img: payload.img || "/blog/hero-bg.jpg",
  status: JSON.stringify(status),
  keywords: JSON.stringify(payload.keywords || []),
})

const rows = await runSql(
  "SELECT id, created_at FROM posts WHERE title->>'de' = :titleDe " +
    "ORDER BY created_at DESC LIMIT 1",
  { titleDe: payload.title.de },
)

const id = Array.isArray(rows) && rows[0] ? rows[0].id : null
const slug = String(payload.title.en)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "")

console.log("Created post:")
console.log("  id:    ", id || "(insert ok, id lookup failed)")
console.log("  status:", status.value)
if (id) {
  console.log("  url:   ", `/posts/${id}/${slug}`)
  console.log("  de url:", `/de/posts/${id}/${slug}`)
}
