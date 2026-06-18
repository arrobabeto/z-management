import { defineEventHandler, getQuery } from "h3"
import { getOrbitypeConfig, orbitypeSqlHeaders } from "~/server/utils/orbitype"

export default defineEventHandler(async (event) => {
  const bindings = getQuery(event)
  const orbitype = getOrbitypeConfig(event)

  const sql = "SELECT data FROM settings WHERE id = :id"

  const rows: any = await $fetch(orbitype.sqlUrl, {
    method: "POST",
    headers: orbitypeSqlHeaders(orbitype),
    body: { sql, bindings },
  })
  return rows[0].data
})
