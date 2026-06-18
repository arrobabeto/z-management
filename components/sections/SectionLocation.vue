<script setup lang="ts">
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    content: I18nString
    ctaLabel?: I18nString
    ctaUrl?: string
    mapImage?: string
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

      <div class="w-full max-w-[1045px] overflow-hidden rounded-[73px]">
        <NuxtImg
          :src="p.mapImage || '/blog/map.jpg'"
          alt=""
          class="aspect-[1045/380] w-full object-cover"
          width="1045"
          height="380"
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
