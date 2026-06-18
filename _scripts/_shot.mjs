import { chromium } from "playwright"

const url = process.env.SHOT_URL || "http://localhost:3000/de/posts"
const out = process.env.SHOT_OUT || "/tmp/blog-full.png"
const width = Number(process.env.SHOT_W || 1512)

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width, height: 1000 },
  deviceScaleFactor: 2,
})
await page.goto(url, { waitUntil: "networkidle" })

await page.screenshot({ path: out, fullPage: true })
console.log(`saved ${out}`)

const hero = page.locator("section").first()
await hero.screenshot({ path: "/tmp/blog-hero.png" })
console.log("saved /tmp/blog-hero.png")

const featured = page.locator("section").nth(1)
await featured.screenshot({ path: "/tmp/blog-featured.png" })
console.log("saved /tmp/blog-featured.png")

await browser.close()
