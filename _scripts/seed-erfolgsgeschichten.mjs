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

const stories = [
  {
    quote: {
      de: "„Unsere Erwartungen wurden in jeglicher Hinsicht übertroffen. Durch die erhaltenen Tools sind wir nun in der Lage, unsere Lieferanten auch zukünftig systematisch zu bewerten.“",
      en: '"Our expectations were exceeded in every respect. With the tools we received, we are now able to evaluate our suppliers systematically in the future."',
    },
    name: "Adrian Balz",
    role: { de: "Head of SCM, Axetris AG", en: "Head of SCM, Axetris AG" },
    photo: "/erfolgsgeschichten/adrian-balz.jpg",
    logo: "/erfolgsgeschichten/axetris-logo.svg",
    back: {
      beforeTitle: {
        de: "Vor der Zusammenarbeit",
        en: "Before our collaboration",
      },
      beforeText: {
        de: "Die globale Materialverfügbarkeit und externe Einflussfaktoren führten regelmässig zu Lieferausfällen und grossen Herausforderungen im Einkauf. Es fehlte ein strukturiertes Risikomanagement, um kritische Lieferanten systematisch zu bewerten und Ausfälle frühzeitig zu verhindern.",
        en: "Global material availability and external factors regularly led to supply failures and major procurement challenges. Structured risk management was lacking to systematically evaluate critical suppliers and prevent failures early.",
      },
      approachTitle: { de: "Vorgehen", en: "Approach" },
      approachText: {
        de: "Mit der Expertise von Z-Management wurden die Einkaufsprozesse neu aufgesetzt, Lieferanten klassifiziert, Risiken identifiziert und kategorisch bewertet. Darauf aufbauend wurden Massnahmen zur Risikoreduktion erarbeitet und eine Software eingeführt, mit denen Lieferanten künftig kontinuierlich bewertet werden können.",
        en: "With Z-Management's expertise, procurement processes were redesigned, suppliers classified, risks identified and categorically assessed. Building on this, risk reduction measures were developed and software introduced to continuously evaluate suppliers going forward.",
      },
      resultTitle: { de: "Ergebnis", en: "Result" },
      results: [
        {
          de: "Besserer Überblick: Risiken und Einflussfaktoren sind klar sichtbar",
          en: "Better overview: risks and influencing factors are clearly visible",
        },
        {
          de: "Bessere Entscheidungen: Maßnahmen können gezielt priorisiert werden",
          en: "Better decisions: measures can be prioritised effectively",
        },
        {
          de: "Langfristige Strategie: Lieferkette ist langfristig resilienter",
          en: "Long-term strategy: the supply chain is more resilient in the long run",
        },
      ],
    },
  },
  {
    quote: {
      de: "„Durch die zielorientierte Arbeitsweise wurden die vereinbarten Fristen jederzeit eingehalten.“",
      en: '"Through the goal-oriented approach, the agreed deadlines were always met."',
    },
    name: "Markus Küpper",
    role: {
      de: "Head of SCM, Swissoptic AG",
      en: "Head of SCM, Swissoptic AG",
    },
    photo: "/erfolgsgeschichten/markus-kuepper.jpg",
    back: {
      beforeTitle: {
        de: "Vor der Zusammenarbeit",
        en: "Before our collaboration",
      },
      beforeText: {
        de: "Bei Swissoptic standen anspruchsvolle Projekte mit engen Zeitplänen im Vordergrund. Gleichzeitig mussten Lieferantenrisiken transparent gemacht und Entscheidungen unter Zeitdruck getroffen werden.",
        en: "At Swissoptic, demanding projects with tight schedules were a priority. Supplier risks also had to be made transparent and decisions taken under time pressure.",
      },
      approachTitle: { de: "Vorgehen", en: "Approach" },
      approachText: {
        de: "Z-Management unterstützte mit einer zielorientierten Arbeitsweise, klaren Meilensteinen und strukturierter Risikoanalyse. Prozesse wurden pragmatisch angepasst, Verantwortlichkeiten geschärft und Fortschritt laufend nachverfolgt.",
        en: "Z-Management supported with a goal-oriented approach, clear milestones and structured risk analysis. Processes were pragmatically adjusted, responsibilities clarified and progress tracked continuously.",
      },
      resultTitle: { de: "Ergebnis", en: "Result" },
      results: [
        {
          de: "Termintreue: Vereinbarte Fristen wurden jederzeit eingehalten",
          en: "On schedule: agreed deadlines were always met",
        },
        {
          de: "Klare Steuerung: Projekte blieben auch unter Druck beherrschbar",
          en: "Clear control: projects remained manageable even under pressure",
        },
        {
          de: "Nachhaltiger Nutzen: Strukturen für künftige Lieferantenbewertung geschaffen",
          en: "Lasting benefit: structures created for future supplier evaluation",
        },
      ],
    },
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
  sql: "SELECT sections FROM pages WHERE slug = 'erfolgsgeschichten'",
})
const sections = rows[0].sections

let updated = false
for (const section of sections) {
  if (section._orbi?.component === "SectionSuccessStories") {
    section.stories = stories
    updated = true
    console.log("Updated SectionSuccessStories.stories (2 flip cards)")
  }
}

if (!updated) {
  console.error("SectionSuccessStories not found on erfolgsgeschichten page")
  process.exit(1)
}

await sql({
  sql: "UPDATE pages SET sections = :sections::json, updated_at = CURRENT_TIMESTAMP WHERE slug = 'erfolgsgeschichten'",
  bindings: { sections: JSON.stringify(sections) },
})

console.log("Erfolgsgeschichten stories seed complete.")
