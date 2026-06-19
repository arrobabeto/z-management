import { defineEventHandler, getQuery } from "h3"
import {
  getOrbitypeConfig,
  hasOrbitypeSqlConfigured,
  orbitypeSqlHeaders,
} from "~/server/utils/orbitype"

export default defineEventHandler(async (event) => {
  const bindings = getQuery(event)
  const orbitype = getOrbitypeConfig(event)
  const orderBy = String(bindings.orderBy ?? "created_at")
  const allowedOrderBy = new Set(["created_at", "updated_at", "id"])
  const safeOrderBy = allowedOrderBy.has(orderBy) ? orderBy : "created_at"
  const desc = bindings.desc === "true"
  const sortDirection = desc ? "DESC" : "ASC"

  let sql = "SELECT * FROM posts"
  const where: string[] = []
  if (bindings.id) where.push("id = :id")
  if (bindings.status) where.push(`"status"->>'value' = :status`)
  if (where.length > 0) sql += ` WHERE ${where.join(" AND ")}`

  sql += ` ORDER BY ${safeOrderBy} ${sortDirection}, id ${sortDirection}`
  if (bindings.limit) sql += " LIMIT :limit"
  if (bindings.offset) sql += " OFFSET :offset"

  if (!hasOrbitypeSqlConfigured(orbitype)) {
    return bindings.id ? null : []
  }

  try {
    const rows: any = await $fetch(orbitype.sqlUrl, {
      method: "POST",
      headers: orbitypeSqlHeaders(orbitype),
      body: { sql, bindings },
    })
    return bindings.id ? rows[0] : rows
  } catch {
    return bindings.id ? null : []
  }
})
