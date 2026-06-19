import fs from "node:fs"
import path from "node:path"

function loadEnv() {
  const envPath = path.resolve(".env")
  if (!fs.existsSync(envPath)) return process.env
  const parsed = Object.fromEntries(
    fs
      .readFileSync(envPath, "utf8")
      .split("\n")
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const i = l.indexOf("=")
        let v = l.slice(i + 1).trim()
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        )
          v = v.slice(1, -1)
        return [l.slice(0, i), v]
      }),
  )
  return { ...parsed, ...process.env }
}

const env = loadEnv()
const API = env.ORBITYPE_API_SQL_URL || "https://core.orbitype.com/api/sql/v1"
const KEY = env.ORBITYPE_API_SQL_KEY

if (!KEY) {
  console.error("Missing ORBITYPE_API_SQL_KEY in .env")
  process.exit(1)
}

const VIDEO_URL = "https://vimeo.com/1038878336"

const quotes = [
  {
    text: {
      de: "Durch die strukturierte Analyse und gezielte Anpassung bestehender Abläufe konnten Prozessschritte vereinfacht, Risiken minimiert und potenzielle Ausfälle verhindert werden.",
      en: "Through structured analysis and targeted adjustment of existing processes, process steps could be simplified, risks minimized, and potential failures prevented.",
    },
    name: "Sibylle Fleck",
    role: { de: "Procurement Manager", en: "Procurement Manager" },
  },
  {
    text: {
      de: "Durch die zielorientierte Arbeitsweise wurden die Vereinbarten Fristen jederzeit eingehalten.",
      en: "Through the goal-oriented approach, the agreed deadlines were always met.",
    },
    name: "Markus Küpper",
    role: {
      de: "Head of SCM, Swissoptic AG",
      en: "Head of SCM, Swissoptic AG",
    },
  },
  {
    text: {
      de: "Durch die erhaltenen Tools sind wir nun in der Lage, unsere Lieferanten auch zukünftig systematisch zu bewerten.",
      en: "With the tools we received, we are now able to evaluate our suppliers systematically in the future.",
    },
    name: "Adrian Balz",
    role: { de: "Axetris AG, Head of SCM", en: "Axetris AG, Head of SCM" },
  },
]

async function sql(body) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "X-API-KEY": KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${res.status}: ${text}`)
  return text ? JSON.parse(text) : null
}

const rows = await sql({
  sql: "SELECT sections FROM pages WHERE slug = 'home'",
})
const sections = rows[0].sections

let updated = 0
for (const section of sections) {
  const component = section._orbi?.component
  if (component === "SectionProblem") {
    section.videoUrl = VIDEO_URL
    updated++
    console.log("Updated SectionProblem.videoUrl")
  }
  if (component === "SectionQuoteCarousel") {
    section.quotes = quotes
    updated++
    console.log("Updated SectionQuoteCarousel.quotes (3 items)")
  }
}

if (updated === 0) {
  console.error("No matching sections found on home page")
  process.exit(1)
}

await sql({
  sql: "UPDATE pages SET sections = :sections::json, updated_at = CURRENT_TIMESTAMP WHERE slug = 'home'",
  bindings: { sections: JSON.stringify(sections) },
})

console.log("Home page media seed complete.")
