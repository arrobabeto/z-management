import { createError, defineEventHandler, readBody } from "h3"
import { getOrbitypeConfig, orbitypeSqlHeaders } from "~/server/utils/orbitype"

export default defineEventHandler(async (event) => {
  const bindings = await readBody(event)
  await validate(bindings)
  const orbitype = getOrbitypeConfig(event)

  let sql = "INSERT INTO comments (text, post_id)"
  sql += " VALUES (:text, :post_id) RETURNING *"

  const rows: any[] = await $fetch(orbitype.sqlUrl, {
    method: "POST",
    headers: orbitypeSqlHeaders(orbitype),
    body: { sql, bindings },
  })
  return rows[0]
})

async function validate(bindings) {
  if (!bindings.text || !bindings.post_id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid",
    })
  }
}
