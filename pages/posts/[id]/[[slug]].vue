<script setup lang="ts">
  import { showError, useSeoMeta } from "#app"
  import { useHead, useI18n, useRoute, useRuntimeConfig } from "#imports"
  import { useTranslate } from "~/composables/useTranslate"
  import { useCanonicalLinks } from "~/composables/useCanonicalLinks"
  import { useLocalePaths } from "~/composables/useLocalePaths"
  import { fn } from "~/functions/fn"
  import type { IPost } from "~/types/dto/IPost"
  import type { IComment } from "~/types/dto/IComment"
  import InputV from "~/components/common/InputV.vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import { reactive } from "vue"
  import BlogDetailHero from "./_BlogDetailHero.vue"
  import BlogArticle from "./_BlogArticle.vue"
  import BlogRelated from "./_BlogRelated.vue"
  import BlogNewsletterCta from "~/pages/posts/_BlogNewsletterCta.vue"
  import { generateOGImageUrl } from "~/utils/ogImageGenerator"

  const t = useTranslate()
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const route = useRoute()
  const id = String(route.params["id"])
  const commentsEnabled = config.public.commentsEnabled

  const post: IPost = await $fetch("/api/posts", { query: { id } })
  if (!post)
    throw showError({
      statusCode: 404,
      statusMessage: "Beitrag nicht gefunden",
    })
  const localizedLead = t(post.lead)
  const plainLead = fn.removeHtml(localizedLead)

  const relatedRows = await $fetch<IPost[]>("/api/posts", {
    query: {
      status: "published",
      limit: 4,
      orderBy: "created_at",
      desc: true,
    },
  })
  const related = relatedRows.filter((r) => r.id !== post.id).slice(0, 3)

  const comments = reactive<IComment[]>([])
  if (commentsEnabled) {
    const rows = await $fetch<IComment[]>("/api/comments", {
      query: { post_id: id },
    })
    comments.push(...rows)
  }

  const newComment = reactive<Partial<IComment>>({
    text: "",
    post_id: id,
  })

  async function onSubmit() {
    if (!commentsEnabled) return

    try {
      const resp: IComment = await $fetch("/api/comments", {
        method: "POST",
        body: newComment,
      })
      newComment.text = ""
      comments.unshift(resp)
    } catch (e) {
      alert(e)
    }
  }

  const { dePath, enPath, canonicalPath } = useLocalePaths()
  const canonicalUrl = `${config.public.siteUrl}${canonicalPath}`
  const title = t(post.title)
  const description = fn.truncateText(plainLead, 160)
  const ogImage = config.public.ogImageEnabled
    ? generateOGImageUrl({
        title,
        description: plainLead,
        image: post.img,
        type: "post",
      })
    : post.img

  useSeoMeta({
    title,
    description,
    author: config.public.organizationName,
    ogTitle: title,
    ogDescription: description,
    ogType: "article",
    ogImage,
    ogUrl: canonicalUrl,
    ogSiteName: config.public.siteName,
    ogLocale: locale.value === "de" ? "de_DE" : "en_US",
    articlePublishedTime: post.created_at,
    articleModifiedTime: post.updated_at,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterSite: config.public.twitterSite,
    twitterCreator: config.public.twitterCreator,
  })

  useHead({
    link: useCanonicalLinks({
      canonicalPath,
      enPath,
      dePath,
    }),
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          datePublished: post.created_at,
          dateModified: post.updated_at,
          inLanguage: locale.value === "de" ? "de" : "en",
          url: canonicalUrl,
          image: {
            "@type": "ImageObject",
            url: ogImage,
            width: "1200",
            height: "630",
          },
          author: {
            "@type": "Organization",
            name: config.public.organizationName,
          },
          publisher: {
            "@type": "Organization",
            name: config.public.organizationName,
            logo: {
              "@type": "ImageObject",
              url: config.public.organizationLogo,
            },
          },
          mainEntityOfPage: canonicalUrl,
        }),
      },
    ],
  })
</script>

<template>
  <main class="bg-white">
    <BlogDetailHero :title="post.title" :image="post.img" />

    <BlogArticle :html="localizedLead" />

    <BlogRelated :posts="related" />

    <BlogNewsletterCta
      gradient
      :title="{
        de: 'Sie möchten keine Insights verpassen?',
        en: 'Don\'t want to miss any insights?',
      }"
      :cta-label="{
        de: 'Newsletter abonnieren',
        en: 'Subscribe to newsletter',
      }"
      cta-url="#newsletter"
    />

    <section v-if="commentsEnabled" class="bg-white px-6 pb-16 lg:px-[120px]">
      <div class="mx-auto max-w-[852px] space-y-4">
        <ul class="space-y-2">
          <li v-for="c of comments" :key="c.id">
            <p class="text-[16px] text-brand-darkgreen">{{ c.text }}</p>
          </li>
        </ul>

        <form @submit.prevent="onSubmit" class="flex gap-2">
          <InputV
            v-model="newComment.text"
            placeholder="Neuer Kommentar"
            required
            class="grow"
          />
          <ButtonV submit>{{ t("send") }}</ButtonV>
        </form>
      </div>
    </section>
  </main>
</template>
