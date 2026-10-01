import type { I18nString } from "~/types/util/I18nString"

export interface IBlogFaqItem {
  question: I18nString
  answer: I18nString
}

export interface IBlogHowToStep {
  name: I18nString
  text: I18nString
}

export interface IBlogHowTo {
  name: I18nString
  steps: IBlogHowToStep[]
}

/** SEO + FAQ + HowTo payload stored in `posts.sections` (no SQL migration). */
export interface IBlogSeoSection {
  metaDescription?: I18nString
  faq?: IBlogFaqItem[]
  howTo?: IBlogHowTo
  _orbi?: { component: "BlogSeo" }
}

export interface IPost {
  id: string
  title: I18nString
  /** Rich HTML article body, stored per locale. */
  lead: I18nString
  img: string
  published: boolean
  /** Optional CMS sections; BlogSeo carries metaDescription + FAQ for JSON-LD. */
  sections?: IBlogSeoSection[]
  keywords?: string[]
  created_at: string
  updated_at: string
}
