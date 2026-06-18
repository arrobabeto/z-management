<script setup lang="ts">
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    content: I18nString
    ctaLabel?: I18nString
    ctaUrl?: string
    backgroundImage?: string
    logoImage?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px]">
    <div class="relative mx-auto max-w-[1284px] overflow-hidden rounded-[40px]">
      <NuxtImg
        :src="p.backgroundImage || '/lieferantenmanagement/zamenta-cta-bg.jpg'"
        alt=""
        class="absolute inset-0 size-full object-cover"
        width="1284"
        height="568"
      />
      <div class="absolute inset-0 bg-black/60" />

      <div
        class="relative flex flex-col items-center gap-8 px-6 py-20 text-center lg:py-24"
      >
        <NuxtImg
          :src="p.logoImage || '/lieferantenmanagement/zamenta-logo-white.png'"
          alt="ZAMENTA"
          class="h-9 w-auto lg:h-[47px]"
          width="388"
          height="47"
        />
        <h2
          class="max-w-[982px] font-sans text-[32px] font-bold leading-tight text-white lg:text-[44px]"
        >
          {{ t(p.title) }}
        </h2>
        <p
          class="max-w-[768px] font-sans text-[18px] font-medium leading-[1.26] text-white"
        >
          {{ t(p.content) }}
        </p>
        <BrandButton
          :label="
            p.ctaLabel || {
              de: 'Zum kostenlosen Beratungsgespräch',
              en: 'Free consultation',
            }
          "
          :href="p.ctaUrl || 'mailto:info@z-management.ch'"
        />
      </div>
    </div>
  </section>
</template>
