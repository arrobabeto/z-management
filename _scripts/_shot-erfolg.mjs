import { chromium } from "playwright"

const url =
  process.env.SHOT_URL || "http://localhost:3000/de/erfolgsgeschichten"
const out = process.env.SHOT_OUT || "/tmp/erfolg-full.png"
const width = Number(process.env.SHOT_W || 1512)

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width, height: 1000 },
  deviceScaleFactor: 2,
})
await page.goto(url, { waitUntil: "networkidle" })

await page.screenshot({ path: out, fullPage: true })
console.log(`saved ${out}`)

const sections = page.locator("main section")
await sections.nth(0).screenshot({ path: "/tmp/erfolg-intro.png" })
await sections.nth(1).screenshot({ path: "/tmp/erfolg-stories.png" })
await sections.nth(2).screenshot({ path: "/tmp/erfolg-cta.png" })
console.log("saved section crops")

await browser.close()
