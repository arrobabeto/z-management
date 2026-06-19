<script setup lang="ts">
  import { ref, computed } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type Quote = { text: I18nString; name: string; role: I18nString }

  const p = defineProps<{
    title: I18nString
    titleAccent?: I18nString
    quotes?: Quote[]
  }>()

  const t = useTranslate()
  const index = ref(0)

  const quotes = computed(() => p.quotes ?? [])
  const hasMultiple = computed(() => quotes.value.length > 1)

  function prev() {
    if (!hasMultiple.value) return
    index.value = (index.value - 1 + quotes.value.length) % quotes.value.length
  }

  function next() {
    if (!hasMultiple.value) return
    index.value = (index.value + 1) % quotes.value.length
  }

  function goTo(i: number) {
    index.value = i
  }

  const current = computed(() => quotes.value[index.value])
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

      <div v-if="current" class="mt-16 flex flex-col items-center gap-16">
        <div
          class="flex w-full max-w-[1140px] items-center justify-between gap-6"
        >
          <button
            v-if="hasMultiple"
            type="button"
            class="flex h-11 w-[110px] shrink-0 items-center justify-center rounded-[60px] border border-white text-white transition-colors hover:bg-white/10"
            :aria-label="t({ de: 'Vorheriges Zitat', en: 'Previous quote' })"
            @click="prev"
          >
            ←
          </button>
          <div v-else class="w-[110px] shrink-0" aria-hidden="true" />

          <Transition name="quote-fade" mode="out-in">
            <blockquote
              :key="index"
              class="max-w-[655px] text-center font-sans text-[24px] font-normal leading-tight text-white lg:text-[36px]"
            >
              {{ t(current.text) }}
            </blockquote>
          </Transition>

          <button
            v-if="hasMultiple"
            type="button"
            class="flex h-11 w-[110px] shrink-0 items-center justify-center rounded-[60px] bg-white text-brand-darkgreen transition-colors hover:bg-brand-offwhite"
            :aria-label="t({ de: 'Nächstes Zitat', en: 'Next quote' })"
            @click="next"
          >
            →
          </button>
          <div v-else class="w-[110px] shrink-0" aria-hidden="true" />
        </div>

        <Transition name="quote-fade" mode="out-in">
          <figcaption :key="`author-${index}`" class="text-center text-white">
            <p class="font-sans text-[24px] font-semibold">
              {{ current.name }}
            </p>
            <p class="mt-2 font-sans text-[18px] font-medium text-white/80">
              {{ t(current.role) }}
            </p>
          </figcaption>
        </Transition>

        <nav
          v-if="hasMultiple"
          class="quote-dots flex items-center justify-center gap-4"
          :aria-label="t({ de: 'Zitat auswählen', en: 'Select quote' })"
        >
          <button
            v-for="(_, i) of quotes"
            :key="i"
            type="button"
            class="size-[21px] shrink-0 rounded-full transition-colors"
            :class="i === index ? 'bg-white' : 'bg-white/30'"
            :aria-label="t({ de: `Zitat ${i + 1}`, en: `Quote ${i + 1}` })"
            :aria-current="i === index ? 'page' : undefined"
            @click="goTo(i)"
          />
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .quote-fade-enter-active,
  .quote-fade-leave-active {
    transition: opacity 0.25s ease;
  }

  .quote-fade-enter-from,
  .quote-fade-leave-to {
    opacity: 0;
  }

  .quote-dots button {
    width: 21px;
    flex: none;
  }
</style>
