<script setup lang="ts">
  import { ref } from "vue"
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type FaqItem = { question: I18nString; answer: I18nString }

  const p = defineProps<{
    /** Optional CMS field — no longer shown in the UI. */
    eyebrow?: I18nString
    title: I18nString
    items: FaqItem[]
  }>()

  const t = useTranslate()
  const openIndex = ref(0)

  function toggle(i: number) {
    openIndex.value = openIndex.value === i ? -1 : i
  }
</script>

<template>
  <section
    id="faq"
    class="bg-white px-6 pb-16 pt-8 sm:pt-12 lg:px-[230px] lg:py-20"
  >
    <div class="mx-auto max-w-[1053px]">
      <div class="mx-auto max-w-[840px] text-center">
        <h2
          class="font-sans text-[26px] font-bold leading-tight text-black sm:text-[32px] lg:text-[44px]"
        >
          {{ t(p.title) }}
        </h2>
      </div>

      <div class="mt-10 flex flex-col gap-6 sm:mt-16">
        <article
          v-for="(item, i) of p.items"
          :key="i"
          class="rounded-lg bg-white p-6 shadow-[0_4px_9px_rgba(0,0,0,0.17)]"
        >
          <button
            type="button"
            class="flex w-full items-start gap-4 text-left"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            <span
              class="mt-1 inline-block h-0.5 w-6 shrink-0 bg-brand-orange"
            />
            <div class="flex-1">
              <p
                class="font-sans text-[18px] font-bold leading-relaxed text-black"
              >
                {{ t(item.question) }}
              </p>
              <div
                v-if="openIndex === i"
                class="mt-4 font-sans text-[18px] font-medium leading-relaxed text-black [&_li]:my-0.5 [&_p+p]:mt-5 [&_p:has(+ul)]:pb-[10px] [&_ul+p]:mt-5 [&_ul]:my-0 [&_ul]:list-disc [&_ul]:pl-6"
              >
                <SafeHtml :html="t(item.answer)" />
              </div>
            </div>
          </button>
        </article>
      </div>
    </div>
  </section>
</template>
