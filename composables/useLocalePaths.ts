import { useRoute } from "#app"
import { useI18n } from "#i18n"

export const DEFAULT_LOCALE = "de"
export const PREFIX_LOCALE = "en"

function normalizePath(path: string): string {
  if (!path) return "/"
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1)
  }
  return withLeadingSlash
}

/** Strip `/en` prefix; legacy `/de` prefix is handled by redirect middleware. */
export function stripLocalePrefix(path: string): string {
  const normalized = normalizePath(path)
  if (normalized === "/en") return "/"
  if (normalized.startsWith("/en/")) return normalized.slice(3) || "/"
  if (normalized === "/de") return "/"
  if (normalized.startsWith("/de/")) return normalized.slice(3) || "/"
  return normalized
}

export function toDePath(path: string): string {
  return stripLocalePrefix(path)
}

export function toEnPath(path: string): string {
  const neutral = stripLocalePrefix(path)
  if (neutral === "/") return "/en"
  return `/en${neutral}`
}

export function useLocalePaths(basePath?: string) {
  const route = useRoute()
  const { locale } = useI18n()

  const neutralPath = normalizePath(basePath ?? stripLocalePrefix(route.path))
  const dePath = toDePath(neutralPath)
  const enPath = toEnPath(neutralPath)
  const canonicalPath = locale.value === DEFAULT_LOCALE ? dePath : enPath

  return {
    neutralPath,
    dePath,
    enPath,
    canonicalPath,
    isDefaultLocale: locale.value === DEFAULT_LOCALE,
  }
}
