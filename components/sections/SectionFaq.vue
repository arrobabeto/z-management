<script setup lang="ts">
  import { ref } from "vue"
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type FaqItem = { question: I18nString; answer: I18nString }

  const p = defineProps<{
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
  <section id="faq" class="bg-white px-6 py-16 lg:px-[230px] lg:py-20">
    <div class="mx-auto max-w-[1053px]">
      <div class="mx-auto max-w-[840px] text-center">
        <p
          v-if="p.eyebrow"
          class="font-sans text-[14px] font-extrabold uppercase tracking-[0.08em] text-[#121311]"
        >
          {{ t(p.eyebrow) }}
        </p>
        <h2
          class="mt-8 font-sans text-[32px] font-bold leading-tight text-black lg:text-[44px]"
        >
          {{ t(p.title) }}
        </h2>
      </div>

      <div class="mt-16 flex flex-col gap-6">
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
                class="mt-4 font-sans text-[18px] font-medium leading-relaxed text-black"
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
