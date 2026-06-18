<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    subtitle: I18nString
    content: I18nString
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 pb-16 pt-0 lg:px-[120px]">
    <div class="mx-auto flex max-w-[1280px] flex-col gap-6">
      <h1
        class="font-sans text-[32px] font-bold leading-tight text-brand-darkgreen lg:text-[44px]"
      >
        {{ t(p.title) }}
      </h1>
      <h2
        class="max-w-[858px] font-sans text-[28px] font-semibold leading-[1.2] text-brand-darkgreen lg:text-[36px]"
      >
        {{ t(p.subtitle) }}
      </h2>
      <div
        class="max-w-[888px] font-sans text-[18px] font-medium leading-[1.26] text-black"
      >
        <SafeHtml :html="t(p.content)" />
      </div>
    </div>
  </section>
</template>
