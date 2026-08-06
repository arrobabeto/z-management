import { defineEventHandler, sendRedirect } from "h3"

// attention: order matters as it is startsWith with!
const redirects = [
  {
    from: "/sitemap.xml",
    to: "/sitemaps.xml",
  },
  {
    from: "/blog",
    to: "/posts",
  },
  {
    from: "/blogs",
    to: "/posts",
  },
  {
    from: "/imprint",
    to: "https://www.z-management.ch/impressum/",
  },
  {
    from: "/privacy",
    to: "https://www.z-management.ch/datenschutzerklarung/",
  },
  {
    from: "/terms",
    to: "https://www.z-management.ch/agb/",
  },
]

export default defineEventHandler((event) => {
  const requestUrlString = event.req.url || "" // Ensure url is defined
  const host = event.req.headers.host || "" // Ensure host is defined
  const requestUrl = new URL(requestUrlString, `http://${host}`)
  const pathWithoutQuery = requestUrl.pathname

  // Find the corresponding redirect
  const redirect = redirects.find(
    (r) =>
      pathWithoutQuery === r.from || pathWithoutQuery.startsWith(`${r.from}/`),
  )

  if (redirect) {
    return sendRedirect(event, redirect.to, 301)
  }
})
