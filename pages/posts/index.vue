<script setup lang="ts">
  import { useHead } from "#imports"
  import { useTranslate } from "~/composables/useTranslate"
  import { fn } from "~/functions/fn"
  import type { IPost } from "~/types/dto/IPost"
  import BlogHero from "./_BlogHero.vue"
  import BlogFeatured from "./_BlogFeatured.vue"
  import BlogCard from "./_BlogCard.vue"
  import BlogNewsletterCta from "./_BlogNewsletterCta.vue"
  import BlogLocation from "./_BlogLocation.vue"

  const t = useTranslate()

  const rows = await $fetch<IPost[]>("/api/posts", {
    query: {
      status: "published",
      limit: 7,
      orderBy: "created_at",
      desc: true,
    },
  })

  const featured = rows[0]
  const latest = rows.slice(1)

  function excerpt(post: IPost) {
    return fn.removeHtml(t(post.lead as any))
  }

  useHead({
    title: t({
      de: "Blog – Insights für nachhaltigen Erfolg",
      en: "Blog – Insights for sustainable success",
    }),
  })
</script>

<template>
  <main v-if="featured" class="bg-white">
    <BlogHero
      :title="{
        de: 'Insights für nachhaltigen Erfolg',
        en: 'Insights for sustainable success',
      }"
      :subtitle="{
        de: 'Strategien, Perspektiven und Tools für Unternehmerinnen und Unternehmer.',
        en: 'Strategies, perspectives and tools for entrepreneurs.',
      }"
    />

    <BlogFeatured :post="featured" :excerpt="excerpt(featured)" />

    <div class="mx-auto max-w-[1273px] px-6 py-16 lg:px-[120px]">
      <hr class="border-[#032934]/20" />
    </div>

    <section class="bg-white px-6 py-16 lg:px-[120px]">
      <div class="mx-auto max-w-[1273px]">
        <h2
          class="font-sans text-[28px] font-bold text-brand-darkgreen sm:text-[36px]"
        >
          {{ t({ de: "Neueste Beiträge", en: "Latest posts" }) }}
        </h2>

        <div class="mt-16 grid gap-16 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-16">
          <BlogCard
            v-for="p of latest"
            :key="p.id"
            :post="p"
            :excerpt="excerpt(p)"
          />
        </div>
      </div>
    </section>

    <BlogNewsletterCta
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

    <BlogLocation
      :title="{
        de: 'Aus der Schweiz für die ganze Welt',
        en: 'From Switzerland to the world',
      }"
      :content="{
        de: 'Unser Hauptsitz befindet sich im idyllischen Eschenbach – circa 40 Minuten von Zürich entfernt. Allerdings haben wir unsere Prozesse so digitalisiert, dass wir die komplette Zusammenarbeit per Telefon und Video-Konferenz abwickeln können. Ein persönliches Treffen vor Ort ist möglich, aber nicht notwendig. So können wir unsere Kunden aus der Schweiz heraus global betreuen.',
        en: 'Our headquarters are in idyllic Eschenbach – about 40 minutes from Zurich. We have digitised our processes so that we can handle all collaboration by phone and video conference. An in-person meeting is possible but not necessary. This allows us to support our clients globally from Switzerland.',
      }"
      cta-url="mailto:info@z-management.ch"
    />
  </main>
</template>
