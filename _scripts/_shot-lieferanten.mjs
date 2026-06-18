import { chromium } from "playwright"

const url =
  process.env.SHOT_URL ||
  "http://localhost:3000/de/ganzheitliches-lieferantenmanagement"
const out = process.env.SHOT_OUT || "/tmp/lieferanten-full.png"
const width = Number(process.env.SHOT_W || 1512)

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width, height: 1000 },
  deviceScaleFactor: 2,
})
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 })
await page.waitForTimeout(1200)

await page.screenshot({ path: out, fullPage: true })
console.log(`saved ${out}`)

const sections = page.locator("main section")
const count = await sections.count()
console.log(`sections: ${count}`)

const crops = [
  ["intro", 0],
  ["system-blocks", 1],
  ["feature-1", 2],
  ["quote", 7],
  ["solution", 8],
  ["zamenta-cta", 9],
]

for (const [name, idx] of crops) {
  if (idx < count) {
    await sections.nth(idx).screenshot({ path: `/tmp/lieferanten-${name}.png` })
    console.log(`saved /tmp/lieferanten-${name}.png`)
  }
}

await browser.close()
