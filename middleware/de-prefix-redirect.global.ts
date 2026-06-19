import { defineNuxtRouteMiddleware, navigateTo } from "#app"

/** Legacy URLs from when English was the default locale (`/de/...`). */
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/de") return navigateTo("/", { redirectCode: 301 })
  if (to.path.startsWith("/de/")) {
    const target = to.path.slice(3) || "/"
    return navigateTo(target, { redirectCode: 301 })
  }
})
