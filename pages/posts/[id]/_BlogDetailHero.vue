<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    image?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 pb-8 lg:px-[120px]">
    <div class="mx-auto flex max-w-[1273px] flex-col gap-6">
      <NuxtImg
        :src="p.image || '/blog/hero-bg.jpg'"
        :alt="t(p.title)"
        class="aspect-[1276/489] w-full rounded-[30px] object-cover"
        width="1276"
        height="489"
      />
      <h1
        class="max-w-[852px] font-sans text-[32px] font-bold leading-tight text-brand-darkgreen sm:text-[40px] lg:text-[50px]"
      >
        {{ t(p.title) }}
      </h1>
    </div>
  </section>
</template>
