<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    subtitle: I18nString
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 pb-16 pt-0 lg:px-[120px]">
    <div class="mx-auto max-w-[1034px] space-y-6 text-center">
      <h1
        class="font-sans text-[32px] font-bold leading-tight text-black lg:text-[44px]"
      >
        {{ t(p.title) }}
      </h1>
      <p
        class="font-sans text-[20px] font-semibold leading-tight text-black lg:text-[24px]"
      >
        {{ t(p.subtitle) }}
      </p>
    </div>
  </section>
</template>
