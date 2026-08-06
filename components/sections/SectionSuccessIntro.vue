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
  <section class="bg-white px-6 pb-8 pt-[30px] lg:px-[120px] lg:pb-10 lg:pt-0">
    <div class="mx-auto flex max-w-[1280px] flex-col gap-6">
      <h1
        class="break-words font-sans text-[26px] font-bold leading-tight text-brand-darkgreen sm:text-[32px] lg:text-[44px]"
      >
        {{ t(p.title) }}
      </h1>
      <h2
        class="max-w-[858px] break-words font-sans text-[24px] font-semibold leading-[1.2] text-brand-darkgreen sm:text-[28px] lg:text-[36px]"
      >
        {{ t(p.subtitle) }}
      </h2>
      <div
        class="max-w-[888px] break-words font-sans text-[18px] font-medium leading-[1.26] text-black"
      >
        <SafeHtml :html="t(p.content)" />
      </div>
    </div>
  </section>
</template>
