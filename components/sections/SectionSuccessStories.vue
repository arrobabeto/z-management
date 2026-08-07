<script setup lang="ts">
  import { ref, computed } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import SuccessStoryFlipCard, { type Story } from "./_SuccessStoryFlipCard.vue"

  const p = defineProps<{ stories: Story[] }>()

  const t = useTranslate()
  const index = ref(0)

  const hasMultiple = computed(() => p.stories.length > 1)

  function goTo(i: number) {
    index.value = i
  }

  function prev() {
    if (!hasMultiple.value) return
    index.value = (index.value - 1 + p.stories.length) % p.stories.length
  }

  function next() {
    if (!hasMultiple.value) return
    index.value = (index.value + 1) % p.stories.length
  }

  const current = computed(() => p.stories[index.value])
</script>

<template>
  <section class="bg-white px-6 pb-16 pt-6 lg:px-[120px] lg:py-16">
    <div
      class="mx-auto flex max-w-[1400px] items-center gap-3 sm:gap-4 lg:gap-6"
    >
      <button
        v-if="hasMultiple"
        type="button"
        class="story-nav-btn"
        :aria-label="
          t({
            de: 'Vorherige Erfolgsgeschichte',
            en: 'Previous success story',
          })
        "
        @click="prev"
      >
        <svg
          class="size-5 sm:size-6"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14.5 6.5 9 12l5.5 5.5"
            stroke="currentColor"
            stroke-width="2.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div v-else class="story-nav-spacer" aria-hidden="true" />

      <div class="min-w-0 flex-1">
        <div class="mx-auto max-w-[1280px]">
          <Transition name="story-slide" mode="out-in">
            <div
              :key="index"
              class="overflow-hidden rounded-[32px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] sm:rounded-[76px]"
            >
              <SuccessStoryFlipCard :story="current" />
            </div>
          </Transition>

          <nav
            v-if="hasMultiple"
            class="story-dots relative z-10 mt-10 flex items-center justify-center gap-4"
            :aria-label="
              t({
                de: 'Erfolgsgeschichten auswählen',
                en: 'Select success story',
              })
            "
          >
            <button
              v-for="(_, i) of p.stories"
              :key="i"
              type="button"
              class="size-[21px] shrink-0 rounded-full transition-colors"
              :class="i === index ? 'bg-brand-darkgreen' : 'bg-[#d9d9d9]'"
              :aria-label="
                t({
                  de: `Erfolgsgeschichte ${i + 1}`,
                  en: `Success story ${i + 1}`,
                })
              "
              :aria-current="i === index ? 'page' : undefined"
              @click="goTo(i)"
            />
          </nav>
        </div>
      </div>

      <button
        v-if="hasMultiple"
        type="button"
        class="story-nav-btn"
        :aria-label="
          t({ de: 'Nächste Erfolgsgeschichte', en: 'Next success story' })
        "
        @click="next"
      >
        <svg
          class="size-5 sm:size-6"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9.5 6.5 15 12l-5.5 5.5"
            stroke="currentColor"
            stroke-width="2.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div v-else class="story-nav-spacer" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
  .story-slide-enter-active,
  .story-slide-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .story-slide-enter-from {
    opacity: 0;
    transform: translateX(12px);
  }

  .story-slide-leave-to {
    opacity: 0;
    transform: translateX(-12px);
  }

  @media (prefers-reduced-motion: reduce) {
    .story-slide-enter-active,
    .story-slide-leave-active {
      transition: opacity 0.2s ease;
    }

    .story-slide-enter-from,
    .story-slide-leave-to {
      transform: none;
    }
  }

  .story-dots button {
    width: 21px;
    flex: none;
  }

  /* Override global `button { width: 100%; flex-basis: max-content }` */
  .story-nav-btn {
    box-sizing: border-box;
    display: inline-flex;
    height: 44px;
    width: 44px;
    min-width: 44px;
    flex: 0 0 44px;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    padding: 0;
    background: #e5e5e5;
    color: #fff;
    transition: background-color 0.15s ease;
  }

  .story-nav-btn:hover {
    background: #d6d6d6;
  }

  @media (min-width: 640px) {
    .story-nav-btn {
      height: 56px;
      width: 56px;
      min-width: 56px;
      flex-basis: 56px;
    }
  }

  .story-nav-spacer {
    flex: 0 0 44px;
    width: 44px;
    min-width: 44px;
  }

  @media (min-width: 640px) {
    .story-nav-spacer {
      flex-basis: 56px;
      width: 56px;
      min-width: 56px;
    }
  }
</style>
