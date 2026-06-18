import fs from "node:fs"
import path from "node:path"

const envPath = path.resolve(process.cwd(), ".env")

function readEnvValue(name) {
  if (!fs.existsSync(envPath)) return ""
  const match = fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith(`${name}=`) && !line.startsWith("#"))

  if (!match) return ""
  return match.slice(name.length + 1).replace(/^["']|["']$/g, "")
}

const sqlWebsiteKey = readEnvValue("ORBITYPE_API_SQL_KEY")
const sqlMarketingKey =
  readEnvValue("ORBITYPE_API_SQL_KEY_MARKETING") || sqlWebsiteKey
const s3Key = readEnvValue("ORBITYPE_API_S3_KEY")
const figmaApiKey = readEnvValue("FIGMA_API_KEY")

console.log(
  "# Add these exports to ~/.zshrc (or Cursor's environment), then restart Cursor.",
)
console.log("# Do not commit API keys to git.\n")

if (sqlWebsiteKey) {
  console.log(`export ORBITYPE_SQL_API_KEY_PROD_WEBSITE="${sqlWebsiteKey}"`)
} else {
  console.log('# export ORBITYPE_SQL_API_KEY_PROD_WEBSITE="<your-sql-api-key>"')
  console.log("# Missing ORBITYPE_API_SQL_KEY in .env")
}

if (sqlMarketingKey) {
  console.log(`export ORBITYPE_SQL_API_KEY_PROD_MARKETING="${sqlMarketingKey}"`)
} else {
  console.log(
    '# export ORBITYPE_SQL_API_KEY_PROD_MARKETING="<your-marketing-sql-api-key>"',
  )
  console.log(
    "# Optional: set ORBITYPE_API_SQL_KEY_MARKETING in .env for a second connector",
  )
}

if (s3Key) {
  console.log(`export ORBITYPE_S3_PUBLIC_API_KEY_PROD="${s3Key}"`)
} else {
  console.log('# export ORBITYPE_S3_PUBLIC_API_KEY_PROD="<your-s3-api-key>"')
  console.log(
    "# Create an S3 API key at https://app.orbitype.com/settings/api-keys and add ORBITYPE_API_S3_KEY to .env",
  )
}

console.log("")

if (figmaApiKey) {
  console.log(`export FIGMA_API_KEY="${figmaApiKey}"`)
} else {
  console.log('# export FIGMA_API_KEY="figd_your_token_here"')
  console.log(
    "# Optional: Figma personal access token — https://www.figma.com/settings",
  )
}
