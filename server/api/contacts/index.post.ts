import { defineEventHandler, readBody } from "h3"
import { getOrbitypeConfig, orbitypeSqlHeaders } from "~/server/utils/orbitype"

export default defineEventHandler(async (event) => {
  const bindings = await readBody(event)
  const orbitype = getOrbitypeConfig(event)

  let sql = "INSERT INTO contacts (first_name, last_name, email, phone)"
  sql += " VALUES (:first_name, :last_name, :email, :phone) RETURNING *"

  const rows: any[] = await $fetch(orbitype.sqlUrl, {
    method: "POST",
    headers: orbitypeSqlHeaders(orbitype),
    body: { sql, bindings },
  })
  return rows[0]
})
