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
      class="mx-auto max-w-[1273px] rounded-[32px] bg-brand-darkgreen px-6 py-14 sm:rounded-[60px] lg:px-16 lg:py-[60px]"
    >
      <h2
        class="mx-auto max-w-[758px] text-center font-sans text-[26px] font-semibold leading-[1.16] tracking-[-0.02em] text-white sm:text-[32px] lg:text-[44px]"
      >
        {{ t(p.title) }}
        <br />
        <span v-if="p.titleAccent" class="text-brand-orange">
          {{ t(p.titleAccent) }}
        </span>
      </h2>

      <div v-if="current" class="mt-16 flex flex-col items-center gap-16">
        <div
          class="flex w-full max-w-[1140px] items-center justify-center gap-6 lg:justify-between"
        >
          <button
            v-if="hasMultiple"
            type="button"
            class="quote-nav-btn quote-nav-btn--prev"
            :aria-label="t({ de: 'Vorheriges Zitat', en: 'Previous quote' })"
            @click="prev"
          >
            <svg
              class="size-6"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14.5 6.5 9 12l5.5 5.5"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div v-else class="quote-nav-spacer" aria-hidden="true" />

          <Transition name="quote-fade" mode="out-in">
            <blockquote
              :key="index"
              class="max-w-[655px] text-center font-sans text-[20px] font-normal leading-tight text-white sm:text-[24px] lg:text-[36px]"
            >
              {{ t(current.text) }}
            </blockquote>
          </Transition>

          <button
            v-if="hasMultiple"
            type="button"
            class="quote-nav-btn quote-nav-btn--next"
            :aria-label="t({ de: 'Nächstes Zitat', en: 'Next quote' })"
            @click="next"
          >
            <svg
              class="size-6"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9.5 6.5 15 12l-5.5 5.5"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div v-else class="quote-nav-spacer" aria-hidden="true" />
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
            type="button"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white text-white transition-colors hover:bg-white/10 lg:hidden"
            :aria-label="t({ de: 'Vorheriges Zitat', en: 'Previous quote' })"
            @click="prev"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14.5 6.5 9 12l5.5 5.5"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            v-for="(_, i) of quotes"
            :key="i"
            type="button"
            class="quote-dot size-[21px] shrink-0 rounded-full transition-colors"
            :class="i === index ? 'bg-white' : 'bg-white/30'"
            :aria-label="t({ de: `Zitat ${i + 1}`, en: `Quote ${i + 1}` })"
            :aria-current="i === index ? 'page' : undefined"
            @click="goTo(i)"
          />
          <button
            type="button"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-darkgreen transition-colors hover:bg-brand-offwhite lg:hidden"
            :aria-label="t({ de: 'Nächstes Zitat', en: 'Next quote' })"
            @click="next"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9.5 6.5 15 12l-5.5 5.5"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
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

  .quote-dots .quote-dot {
    width: 21px;
    flex: none;
  }

  /* Override global `button { width: 100%; flex-basis: max-content }` so the
     pills stay elongated like the Figma referenzen controls. */
  .quote-nav-btn {
    box-sizing: border-box;
    display: none;
    height: 44px;
    width: 110px;
    min-width: 110px;
    flex: 0 0 110px;
    align-items: center;
    justify-content: center;
    border-radius: 60px;
    padding: 0 15px;
    text-align: center;
    font-size: 18px;
    line-height: 1;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;
  }

  @media (min-width: 1024px) {
    .quote-nav-btn {
      display: inline-flex;
    }
  }

  .quote-nav-btn--prev {
    border: 1px solid #fff;
    background: transparent;
    color: #fff;
  }

  .quote-nav-btn--prev:hover {
    background: rgb(255 255 255 / 0.1);
  }

  .quote-nav-btn--next {
    border: 1px solid transparent;
    background: #fff;
    color: #002a35;
  }

  .quote-nav-btn--next:hover {
    background: #fdfdfd;
  }

  .quote-nav-spacer {
    display: none;
    flex: 0 0 110px;
    width: 110px;
    min-width: 110px;
  }

  @media (min-width: 1024px) {
    .quote-nav-spacer {
      display: block;
    }
  }
</style>
