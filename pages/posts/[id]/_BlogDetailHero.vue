<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import { dt } from "~/functions/dt"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    image?: string
    date?: string
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
      <div class="flex max-w-[852px] flex-col gap-3">
        <h1
          class="break-words font-sans text-[26px] font-bold leading-tight text-brand-darkgreen sm:text-[36px] lg:text-[44px]"
        >
          {{ t(p.title) }}
        </h1>
        <time
          v-if="p.date"
          class="font-sans text-[16px] text-[#032934] sm:text-[18px]"
          :datetime="p.date"
        >
          {{ dt.toBlogDate(p.date) }}
        </time>
      </div>
    </div>
  </section>
</template>
