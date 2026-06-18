import { useRuntimeConfig } from "#imports"
import type { H3Event } from "h3"

export type OrbitypeConfig = {
  mock: boolean
  sqlUrl: string
  sqlKey: string
}

function isTruthyEnv(value: unknown) {
  if (value === true) return true
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
  return normalized === "true" || normalized === "1" || normalized === "yes"
}

export function getOrbitypeConfig(event?: H3Event): OrbitypeConfig {
  const config = useRuntimeConfig(event)

  return {
    mock: isTruthyEnv(config.orbitypeMock),
    sqlUrl: String(config.orbitypeApiSqlUrl ?? "").trim(),
    sqlKey: String(config.orbitypeApiSqlKey ?? "").trim(),
  }
}

export function hasOrbitypeSqlConfigured(orbitype: OrbitypeConfig) {
  if (!orbitype.sqlUrl || !orbitype.sqlKey) return false
  if (orbitype.sqlKey.toLowerCase() === "your-api-key") return false
  return true
}

export function orbitypeSqlHeaders(orbitype: OrbitypeConfig) {
  return { "X-API-KEY": orbitype.sqlKey }
}
