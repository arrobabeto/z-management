<script setup lang="ts">
  import { ref, computed } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"
  import SuccessStoryFlipCard, { type Story } from "./_SuccessStoryFlipCard.vue"

  const p = defineProps<{ stories: Story[] }>()

  const t = useTranslate()
  const index = ref(0)

  function goTo(i: number) {
    index.value = i
  }

  const current = computed(() => p.stories[index.value])
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px]">
    <div class="mx-auto max-w-[1280px]">
      <Transition name="story-slide" mode="out-in">
        <div
          :key="index"
          class="overflow-hidden rounded-[76px] shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
        >
          <SuccessStoryFlipCard :story="current" />
        </div>
      </Transition>

      <nav
        v-if="p.stories.length > 1"
        class="story-dots relative z-10 mt-10 flex items-center justify-center gap-4"
        :aria-label="
          t({ de: 'Erfolgsgeschichten auswählen', en: 'Select success story' })
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
</style>
