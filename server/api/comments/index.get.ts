import { defineEventHandler, getQuery } from "h3"
import { getOrbitypeConfig, orbitypeSqlHeaders } from "~/server/utils/orbitype"

export default defineEventHandler(async (event) => {
  const bindings = getQuery(event)
  const orbitype = getOrbitypeConfig(event)

  let sql = "SELECT * FROM comments"
  if (bindings.post_id) sql += " WHERE post_id = :post_id"
  sql += " ORDER BY created_at DESC"

  return await $fetch(orbitype.sqlUrl, {
    method: "POST",
    headers: orbitypeSqlHeaders(orbitype),
    body: { sql, bindings },
  })
})
