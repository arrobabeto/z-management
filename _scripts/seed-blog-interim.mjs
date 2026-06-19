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
const POST_ID = env.POST_ID || "NgfAQL"

if (!KEY) {
  console.error("Missing ORBITYPE_API_SQL_KEY in .env")
  process.exit(1)
}

const title = {
  de: "Interim Management Einkauf: Wenn Erfahrung, Flexibilität und Wirkung zählen",
  en: "Interim procurement management: When experience, flexibility and impact matter",
}

const lead = {
  de: `
<h2>Einleitung: Einkauf braucht Stabilität – auch in Veränderungsphasen</h2>
<p>In vielen Unternehmen ist der Einkauf ein strategisch wichtiger, aber personell oft knapp besetzter Bereich. Wenn Führungskräfte kurzfristig ausfallen, grosse Projekte starten oder Transformationen anstehen, kann Interim Management im Einkauf die entscheidende Brücke schlagen – kompetent, zielgerichtet und sofort einsatzbereit. Die Z-Management AG bietet genau diese Unterstützung: erfahrene Einkaufsprofis, die auf Zeit Verantwortung übernehmen, Strukturen stabilisieren und nachhaltige Ergebnisse erzielen.</p>
<h2>Was ist Interim Management im Einkauf?</h2>
<p>Interim Management im Einkauf bedeutet, dass ein externer Experte für einen festgelegten Zeitraum operative oder strategische Aufgaben übernimmt. Dabei geht es nicht um Beratung „von aussen“, sondern um aktives Management „auf Zeit“ – mit Verantwortung, Umsetzungskraft und unmittelbarer Wirkung. Typische Einsatzbereiche:</p>
<ul>
<li><strong>Vakanzüberbrückung (z. B. bei Kündigung oder Krankheit)</strong></li>
<li><strong>Projektmanagement (z. B. ERP-Einführung, Warengruppenstrategie)</strong></li>
<li><strong>Restrukturierung und Transformation</strong></li>
<li><strong>Performance- und Prozessverbesserung</strong></li>
<li><strong>Know-how-Transfer und Coaching</strong></li>
</ul>
<h2>Wann Interim Management im Einkauf besonders sinnvoll ist</h2>
<h3>1. Personalengpässe</h3>
<p>Ein plötzlicher Weggang in der Einkaufsleitung, eine längere Krankheit oder eine unbesetzte Stelle können Prozesse ins Stocken bringen. Interim Manager schliessen diese Lücken schnell – ohne lange Einarbeitungszeit.</p>
<h3>2. Projektspitzen</h3>
<p>Grossprojekte wie ERP-Rollouts, Digitalisierungsinitiativen oder strategische Sourcing-Projekte erfordern zusätzliches Know-how und Managementkapazität. Ein erfahrener Interim Manager bringt die nötige Steuerungskompetenz mit.</p>
<h3>3. Organisationsveränderungen</h3>
<p>Bei Fusionen, Reorganisationen oder Prozessumbauten sorgt Interim Management für Stabilität und Tempo – als temporäre Führungskraft oder Change-Treiber.</p>
<h3>4. Professionalisierung und Digitalisierung</h3>
<p>Viele Unternehmen möchten ihren Einkauf weiterentwickeln. Ein Interim Manager kann hier als Impulsgeber, Projektleiter oder Umsetzungspartner agieren – zum Beispiel bei der Einführung von Tools wie ZAMENTA, der digitalen Lösung für Lieferanten- und Risikomanagement.</p>
<h2>Vorteile von Interim Management im Einkauf</h2>
<ul>
<li><strong>Schneller Einsatz:</strong> Verfügbarkeit meist innerhalb weniger Tage</li>
<li><strong>Hohe Kompetenz:</strong> Praxisbewährtes Einkaufs-Know-how</li>
<li><strong>Flexibilität:</strong> Einsatzdauer je nach Bedarf</li>
<li><strong>Umsetzungskraft:</strong> Verantwortung für konkrete Resultate</li>
<li><strong>Neutralität:</strong> Unabhängiger Blick auf Organisation und Prozesse</li>
<li><strong>Know-how-Transfer:</strong> Schulung und Coaching der Mitarbeitenden</li>
</ul>
<p>Bei Z-Management sind alle Interim Manager zugleich erfahrene Berater mit hoher Methodenkompetenz. Das sorgt nicht nur für Stabilität, sondern auch für Weiterentwicklung.</p>
<h2>Unser Vorgehen – so läuft ein Interim-Einsatz mit Z-Management ab</h2>
<h3>1. Bedarfsklärung</h3>
<p>In einem unverbindlichen Erstgespräch analysieren wir Ihre Situation, Ziele und Rahmenbedingungen.</p>
<h3>2. Besetzung</h3>
<p>Sie erhalten ein passendes Kandidatenprofil – in der Regel innerhalb weniger Tage. Alle Interim Manager sind erprobt, verlässlich und referenzierbar.</p>
<h3>3. Start und Integration</h3>
<p>Der Einstieg erfolgt strukturiert und abgestimmt mit Ihrer Organisation. Klare Rollen, Ziele und Berichtslinien sichern einen reibungslosen Start.</p>
<h3>4. Steuerung und Qualitätssicherung</h3>
<p>Während des Einsatzes begleiten wir auf Wunsch mit Supervision, Sparring oder Projekt-Controlling – für Transparenz und bestmögliche Wirkung.</p>
<h3>5. Abschluss und Übergabe</h3>
<p>Am Ende erfolgt eine strukturierte Übergabe an die interne Organisation – auf Wunsch mit Handlungsempfehlungen oder weiterem Coaching.</p>
<h2>Weiterführende Themen rund um Einkaufsperformance und Projektsteuerung</h2>
<h3>1. Warengruppenmanagement – Struktur schaffen, Wirkung erzielen</h3>
<p>Wie Interim Manager Strategien erfolgreich umsetzen.</p>
<h3>2. Prozessoptimierung im Einkauf – Effizienz durch externe Perspektive</h3>
<p>Projekte gezielt anschieben und voranbringen.</p>
<h3>3. ZAMENTA – Einkauf digitalisieren mit System</h3>
<p>Wie Interim Manager digitale Transformation unterstützen.</p>
<h3>4. Lieferantenmanagement – Prozesse stärken und strukturieren</h3>
<p>Kontinuität sichern, auch in Veränderungsphasen.</p>
<h3>5. Strategischer Einkauf – Zeitgewinn für Führung und Planung</h3>
<p>Interim Management als Entlastung für die Linienfunktion.</p>
<h2>Fazit: Interim Management – Investition in Stabilität und Zukunft</h2>
<p>Wenn es schnell gehen muss, aber nachhaltig wirken soll, ist Interim Management im Einkauf eine wirksame Lösung. Ob zur Überbrückung, Professionalisierung oder Projektunterstützung – mit der Z-Management AG gewinnen Sie sofort verfügbare Kompetenz mit nachhaltigem Nutzen.</p>
<h2>Jetzt Einkaufsengpässe überbrücken</h2>
<p>Sichern Sie Ihre Einkaufsleistung mit professionellem Interim Management – zielgerichtet, flexibel und auf Augenhöhe.</p>
`.trim(),
  en: `
<h2>Introduction: Procurement needs stability – even during change</h2>
<p>In many companies, procurement is strategically important but often understaffed. When managers drop out at short notice, large projects start or transformations are due, interim management in procurement can bridge the gap – competent, focused and immediately operational. Z-Management AG offers exactly this support: experienced procurement professionals who take on responsibility for a defined period, stabilise structures and achieve sustainable results.</p>
<h2>What is interim management in procurement?</h2>
<p>Interim management in procurement means that an external expert takes on operational or strategic tasks for a defined period. This is not consulting "from the outside", but active management "on time" – with responsibility, implementation power and immediate impact. Typical areas of use:</p>
<ul>
<li><strong>Bridging vacancies (e.g. resignation or illness)</strong></li>
<li><strong>Project management (e.g. ERP rollout, commodity group strategy)</strong></li>
<li><strong>Restructuring and transformation</strong></li>
<li><strong>Performance and process improvement</strong></li>
<li><strong>Know-how transfer and coaching</strong></li>
</ul>
<h2>When interim management in procurement is particularly useful</h2>
<h3>1. Staff shortages</h3>
<p>A sudden departure in procurement leadership, a long illness or an unfilled position can stall processes. Interim managers close these gaps quickly – without lengthy onboarding.</p>
<h3>2. Project peaks</h3>
<p>Major projects such as ERP rollouts, digitalisation initiatives or strategic sourcing projects require additional know-how and management capacity. An experienced interim manager brings the necessary steering competence.</p>
<h3>3. Organisational change</h3>
<p>During mergers, reorganisations or process redesigns, interim management ensures stability and pace – as a temporary executive or change driver.</p>
<h3>4. Professionalisation and digitalisation</h3>
<p>Many companies want to develop their procurement. An interim manager can act as an impulse generator, project lead or implementation partner – for example when introducing tools like ZAMENTA, the digital solution for supplier and risk management.</p>
<h2>Benefits of interim management in procurement</h2>
<ul>
<li><strong>Fast deployment:</strong> availability usually within a few days</li>
<li><strong>High competence:</strong> proven procurement know-how</li>
<li><strong>Flexibility:</strong> duration as needed</li>
<li><strong>Implementation power:</strong> responsibility for concrete results</li>
<li><strong>Neutrality:</strong> an independent view of organisation and processes</li>
<li><strong>Know-how transfer:</strong> training and coaching of employees</li>
</ul>
<p>At Z-Management, all interim managers are also experienced consultants with strong methodological competence. This ensures not only stability, but also development.</p>
<h2>Our approach – how an interim assignment with Z-Management works</h2>
<h3>1. Needs assessment</h3>
<p>In a non-binding initial meeting, we analyse your situation, goals and conditions.</p>
<h3>2. Staffing</h3>
<p>You receive a suitable candidate profile – usually within a few days. All interim managers are proven, reliable and referenceable.</p>
<h3>3. Start and integration</h3>
<p>Onboarding is structured and coordinated with your organisation. Clear roles, goals and reporting lines ensure a smooth start.</p>
<h3>4. Steering and quality assurance</h3>
<p>During the assignment we accompany you on request with supervision, sparring or project controlling – for transparency and the best possible impact.</p>
<h3>5. Conclusion and handover</h3>
<p>At the end, a structured handover to the internal organisation takes place – on request with recommendations or further coaching.</p>
<h2>Related topics around procurement performance and project steering</h2>
<h3>1. Commodity group management – create structure, achieve impact</h3>
<p>How interim managers implement strategies successfully.</p>
<h3>2. Process optimisation in procurement – efficiency through an external perspective</h3>
<p>Get projects moving in a targeted way.</p>
<h3>3. ZAMENTA – digitalise procurement systematically</h3>
<p>How interim managers support digital transformation.</p>
<h3>4. Supplier management – strengthen and structure processes</h3>
<p>Ensure continuity, even during change.</p>
<h3>5. Strategic procurement – time gained for leadership and planning</h3>
<p>Interim management as relief for the line function.</p>
<h2>Conclusion: Interim management – an investment in stability and the future</h2>
<p>When it has to be fast but should have a lasting effect, interim management in procurement is an effective solution. Whether for bridging, professionalisation or project support – with Z-Management AG you gain immediately available competence with lasting value.</p>
<h2>Bridge procurement gaps now</h2>
<p>Secure your procurement performance with professional interim management – focused, flexible and on equal terms.</p>
`.trim(),
}

const keywords = [
  "interim management",
  "einkauf",
  "beschaffung",
  "vakanzüberbrückung",
  "z-management",
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
  sql: "SELECT id, title FROM posts WHERE id = :id",
  bindings: { id: POST_ID },
})

if (!rows?.[0]) {
  console.error(`Post ${POST_ID} not found`)
  process.exit(1)
}

console.log("Updating existing post:", rows[0].title?.de)

await sql({
  sql: `UPDATE posts SET
    title = :title::json,
    lead = :lead::json,
    img = :img,
    keywords = :keywords::json,
    updated_at = CURRENT_TIMESTAMP
    WHERE id = :id`,
  bindings: {
    id: POST_ID,
    title: JSON.stringify(title),
    lead: JSON.stringify(lead),
    img: "/blog/interim-hero.png",
    keywords: JSON.stringify(keywords),
  },
})

console.log(`Updated post ${POST_ID}: ${title.de}`)
