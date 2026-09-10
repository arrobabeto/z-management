/** Shared public site URLs for nav, footer, and CTAs. */

export const CALENDLY_URL =
  "https://calendly.com/zmanagement-ch/30-minuten-zoom-call-kennenlerngespraech"

export const CONTACT_MAILTO = "mailto:info@z-management.ch"

/** Consultation CTAs book via Calendly even if CMS still stores a mailto. */
export function bookingHref(url?: string) {
  if (!url || url.startsWith("mailto:")) return CALENDLY_URL
  return url
}

export const LINKEDIN_URL = "https://www.linkedin.com/company/z-management-ag/"

export type SiteNavLink = {
  label: { de: string; en: string }
  url: string
  /** Use a plain <a> for absolute/external URLs instead of NuxtLinkLocale. */
  external?: boolean
}

/** Header + footer main navigation (matches live z-management.ch). */
export const mainNavLinks: SiteNavLink[] = [
  {
    label: {
      en: "Risk management in one click",
      de: "Risikomanagement mit einem Klick",
    },
    url: "/#risikomanagement",
  },
  {
    label: { en: "How we work", de: "Ablauf der Zusammenarbeit" },
    url: "/#ablauf-der-zusammenarbeit",
  },
  { label: { en: "About us", de: "Über uns" }, url: "/#uber-uns" },
  {
    label: { en: "Einkauf", de: "Einkauf" },
    url: "/ganzheitliches-lieferantenmanagement",
  },
  { label: { en: "Blogs", de: "Blogs" }, url: "/posts" },
  {
    label: { en: "Testimonials", de: "Das sagen unsere Kunden" },
    url: "/erfolgsgeschichten",
  },
  { label: { en: "FAQ", de: "FAQ" }, url: "/#faq" },
]

/**
 * Legal links. CMS pages are not seeded yet, so these point at the live
 * WordPress URLs until impressum / datenschutz / agb exist in Orbitype.
 */
export const legalLinks: SiteNavLink[] = [
  {
    label: { en: "Imprint", de: "Impressum" },
    url: "https://www.z-management.ch/impressum/",
    external: true,
  },
  {
    label: { en: "Privacy", de: "Datenschutz" },
    url: "https://www.z-management.ch/datenschutzerklarung/",
    external: true,
  },
  {
    label: { en: "Terms", de: "AGB" },
    url: "https://www.z-management.ch/agb/",
    external: true,
  },
]
