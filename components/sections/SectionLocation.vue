<script setup lang="ts">
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const defaultMapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2709.067757402173!2d8.9282663!3d47.2348205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ac85ceb6bdc87%3A0x2c138acc17c11cba!2sAlte%20Schmerikonerstrasse%205%2C%208733%20Eschenbach%2C%20Switzerland!5e0!3m2!1sen!2smx!4v1781852228341!5m2!1sen!2smx"

  const p = defineProps<{
    title: I18nString
    content: I18nString
    ctaLabel?: I18nString
    ctaUrl?: string
    mapEmbedUrl?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px]">
    <div
      class="mx-auto flex max-w-[1280px] flex-col items-center gap-12 rounded-[80px] bg-brand-green px-6 py-16 text-center lg:gap-[49px] lg:py-[70px]"
    >
      <h2 class="font-sans text-[28px] font-bold text-white sm:text-[36px]">
        {{ t(p.title) }}
      </h2>

      <p
        class="max-w-[702px] font-sans text-[16px] font-medium leading-normal text-white sm:text-[18px]"
      >
        {{ t(p.content) }}
      </p>

      <div
        class="relative aspect-[1045/380] w-full max-w-[1045px] overflow-hidden rounded-[73px]"
      >
        <iframe
          :src="p.mapEmbedUrl || defaultMapEmbedUrl"
          title="Z-Management Standort Eschenbach"
          class="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        />
      </div>

      <BrandButton
        :label="
          p.ctaLabel || {
            de: 'Kostenloses Erstgespräch',
            en: 'Free initial consultation',
          }
        "
        :href="p.ctaUrl || 'mailto:info@z-management.ch'"
      />
    </div>
  </section>
</template>
