<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    content: I18nString
    ctaLabel?: I18nString
    ctaUrl?: string
    roundedClass?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px] lg:py-[64px]">
    <div
      class="mx-auto flex max-w-[1273px] flex-col items-center gap-6 px-6 py-16 text-center lg:px-5 lg:py-[60px]"
      :class="p.roundedClass || 'rounded-[40px]'"
      style="
        background:
          linear-gradient(90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
          linear-gradient(
            90deg,
            #002a35 1.92%,
            #00586a 37.98%,
            #ff6700 73.56%,
            #ff8a00 100%
          );
      "
    >
      <h2
        class="max-w-4xl font-sans text-[28px] font-bold leading-tight text-white lg:text-[36px]"
      >
        {{ t(p.title) }}
      </h2>
      <div
        class="max-w-[906px] font-sans text-[18px] font-medium leading-[1.26] text-white"
      >
        <SafeHtml :html="t(p.content)" />
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
