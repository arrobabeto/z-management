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
      de: "„Durch die strukturierte Analyse und gezielte Anpassung bestehender Abläufe konnten Prozessschritte vereinfacht, Risiken minimiert und potenzielle Ausfälle verhindert werden.“",
      en: '"Through structured analysis and targeted adjustment of existing processes, process steps could be simplified, risks minimized and potential failures prevented."',
    },
    name: "Sibylle Fleck",
    role: {
      de: "Procurement Manager",
      en: "Procurement Manager",
    },
    photo: "/erfolgsgeschichten/sibylle-fleck.jpg",
    logo: "/erfolgsgeschichten/dyconex-logo.png",
    back: {
      beforeTitle: {
        de: "Vor der Zusammenarbeit",
        en: "Before our collaboration",
      },
      beforeText: {
        de: "Materialengpässe führten immer wieder zu Versorgungsschwierigkeiten und verzögerten Bestellabläufen. Die Einkaufsprozesse waren nicht durchgehend standardisiert, wodurch es immer wieder zu Lieferproblemen kam. Zudem war der Einkauf in Investitionsbeschaffungen nicht frühzeitig eingebunden, was zu erhöhtem Aufwand und Risiken in Bezug auf Kosten und Lieferfähigkeit führte. Insgesamt fehlte es an klaren Verantwortlichkeiten und abgestimmten Prozessen zwischen den beteiligten Bereichen.",
        en: "Material shortages repeatedly led to supply difficulties and delayed ordering processes. Procurement processes were not consistently standardized, which repeatedly caused delivery problems. In addition, procurement was not involved early in investment purchasing, which led to increased effort and risks regarding costs and delivery capability. Overall, clear responsibilities and coordinated processes between the areas involved were missing.",
      },
      approachTitle: { de: "Vorgehen", en: "Approach" },
      approachText: {
        de: "Das operative Beschaffungswesen wurde umfassend analysiert und ein standardisierter Bestellprozess entwickelt und eingeführt. Im Bereich der Investitionsbeschaffung wurden interne Abläufe überprüft, relevante Stakeholder einbezogen und ein neues Vorgehen mit unterstützenden Checklisten etabliert. Für kritische Bauteile und Warengruppen wurde die Lieferantenbasis gezielt diversifiziert, um Abhängigkeiten zu reduzieren und Versorgungssicherheit zu erhöhen.",
        en: "Operational procurement was comprehensively analyzed and a standardized ordering process was developed and introduced. In investment purchasing, internal workflows were reviewed, relevant stakeholders involved and a new approach with supporting checklists established. For critical components and commodity groups, the supplier base was deliberately diversified to reduce dependencies and increase supply security.",
      },
      resultTitle: { de: "Ergebnis", en: "Result" },
      results: [
        {
          de: "Besserer Überblick: Klare Verantwortlichkeiten im gesamten Investitionsprozess schaffen Transparenz und Effizienz.",
          en: "Better overview: Clear responsibilities across the entire investment process create transparency and efficiency.",
        },
        {
          de: "Frühzeitige Einbindung: Der Einkauf wird frühzeitig in Investitionsprojekte eingebunden, was Kosten- und Terminrisiken reduziert.",
          en: "Early involvement: Procurement is involved early in investment projects, which reduces cost and schedule risks.",
        },
        {
          de: "Mehr Sicherheit: Durch die Diversifizierung der Lieferantenbasis wurde die Versorgungssicherheit nachhaltig verbessert.",
          en: "More security: Diversifying the supplier base sustainably improved supply security.",
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
