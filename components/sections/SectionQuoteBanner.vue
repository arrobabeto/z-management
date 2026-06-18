<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{ quote: I18nString }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px]">
    <div
      class="mx-auto flex max-w-[1284px] flex-col items-center gap-10 rounded-[62px] bg-[#032934] px-8 py-16 text-center lg:px-16 lg:py-20"
    >
      <blockquote
        class="max-w-[742px] font-sans text-[20px] font-semibold leading-tight text-white lg:text-[24px]"
      >
        {{ t(p.quote) }}
      </blockquote>
      <div class="h-[61px] w-px bg-white/40" />
    </div>
  </section>
</template>
