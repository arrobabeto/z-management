<script setup lang="ts">
  import { ref, computed } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type Quote = { text: I18nString; name: string; role: I18nString }

  const p = defineProps<{
    title: I18nString
    titleAccent?: I18nString
    quotes: Quote[]
  }>()

  const t = useTranslate()
  const index = ref(0)

  function prev() {
    index.value = (index.value - 1 + p.quotes.length) % p.quotes.length
  }

  function next() {
    index.value = (index.value + 1) % p.quotes.length
  }

  const current = computed(() => p.quotes[index.value])
</script>

<template>
  <section
    id="referenzen"
    class="bg-white px-6 py-16 lg:px-[120px] lg:py-[64px]"
  >
    <div
      class="mx-auto max-w-[1273px] rounded-[60px] bg-brand-darkgreen px-6 py-14 lg:px-16 lg:py-[60px]"
    >
      <h2
        class="mx-auto max-w-[758px] text-center font-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-white lg:text-[44px]"
      >
        {{ t(p.title) }}
        <br />
        <span v-if="p.titleAccent" class="text-brand-orange">
          {{ t(p.titleAccent) }}
        </span>
      </h2>

      <div class="mt-16 flex flex-col items-center gap-16">
        <div
          class="flex w-full max-w-[1140px] items-center justify-between gap-6"
        >
          <button
            type="button"
            class="flex h-11 w-[110px] shrink-0 items-center justify-center rounded-[60px] border border-white text-white transition-colors hover:bg-white/10"
            aria-label="Previous quote"
            @click="prev"
          >
            ←
          </button>

          <blockquote
            class="max-w-[655px] text-center font-sans text-[24px] font-normal leading-tight text-white lg:text-[36px]"
          >
            {{ t(current.text) }}
          </blockquote>

          <button
            type="button"
            class="flex h-11 w-[110px] shrink-0 items-center justify-center rounded-[60px] bg-white text-brand-darkgreen transition-colors hover:bg-brand-offwhite"
            aria-label="Next quote"
            @click="next"
          >
            →
          </button>
        </div>

        <figcaption class="text-center text-white">
          <p class="font-sans text-[24px] font-semibold">
            {{ current.name }}
          </p>
          <p class="mt-2 font-sans text-[18px] font-medium text-white/80">
            {{ t(current.role) }}
          </p>
        </figcaption>
      </div>
    </div>
  </section>
</template>
