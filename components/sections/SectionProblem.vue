<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    highlight?: I18nString
    content: I18nString
    ctaLabel?: I18nString
    ctaUrl?: string
    thumbImage?: string
    illustrationImage?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px] lg:py-[64px]">
    <div
      class="mx-auto flex max-w-[1273px] flex-col items-center gap-10 lg:flex-row lg:gap-11"
    >
      <NuxtImg
        :src="p.thumbImage || '/homepage/problem-thumb.jpg'"
        alt=""
        class="h-[196px] w-[204px] shrink-0 rounded-[20px] object-cover"
        width="204"
        height="196"
      />

      <div class="w-full max-w-[503px]">
        <h2
          class="font-sans text-[28px] font-semibold leading-tight text-brand-darkgreen lg:text-[36px]"
        >
          {{ t(p.title) }}
        </h2>
        <p
          v-if="p.highlight"
          class="mt-5 font-sans text-[24px] font-semibold leading-tight text-brand-darkgreen"
        >
          {{ t(p.highlight) }}
        </p>
        <div
          class="mt-5 font-sans text-[18px] font-medium leading-relaxed text-brand-darkgreen"
        >
          <SafeHtml :html="t(p.content)" />
        </div>
        <div class="mt-6">
          <BrandButton
            :label="
              p.ctaLabel || {
                de: 'Kostenloses Erstgespräch',
                en: 'Free initial consultation',
              }
            "
            :href="p.ctaUrl || '#faq'"
          />
        </div>
      </div>

      <NuxtImg
        :src="p.illustrationImage || '/homepage/problem-illustration.png'"
        alt=""
        class="w-full max-w-[472px] shrink-0"
        width="472"
        height="350"
      />
    </div>
  </section>
</template>
