<script setup lang="ts">
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    ctaLabel: I18nString
    ctaUrl?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px]">
    <div
      class="mx-auto flex max-w-[1273px] flex-col items-center gap-10 rounded-[80px] bg-brand-darkgreen px-6 py-16 text-center lg:py-[70px]"
    >
      <h2 class="font-sans text-[28px] font-semibold text-white sm:text-[36px]">
        {{ t(p.title) }}
      </h2>
      <BrandButton :label="p.ctaLabel" :href="p.ctaUrl || '#newsletter'" />
    </div>
  </section>
</template>
