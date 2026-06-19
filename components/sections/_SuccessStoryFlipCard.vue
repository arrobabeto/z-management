<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  export type StoryBack = {
    beforeTitle: I18nString
    beforeText: I18nString
    approachTitle: I18nString
    approachText: I18nString
    resultTitle: I18nString
    results: I18nString[]
  }

  export type Story = {
    quote: I18nString
    name: string
    role: I18nString
    photo?: string
    logo?: string
    back?: StoryBack
  }

  const p = defineProps<{ story: Story }>()

  const t = useTranslate()
</script>

<template>
  <div
    class="story-flip group w-full outline-none"
    tabindex="0"
    :aria-label="
      t({
        de: `Erfolgsgeschichte von ${p.story.name}. Mit Mauszeiger darüber bewegen für Details.`,
        en: `Success story by ${p.story.name}. Hover for details.`,
      })
    "
  >
    <div class="story-flip__inner">
      <div class="story-flip__face story-flip__face--front">
        <div class="flex h-full flex-col lg:flex-row">
          <div
            class="relative h-[360px] w-full shrink-0 overflow-hidden bg-brand-green lg:h-[650px] lg:w-[648px]"
          >
            <NuxtImg
              :src="p.story.photo || '/erfolgsgeschichten/adrian-balz.jpg'"
              :alt="p.story.name"
              class="absolute left-[1.8%] top-[11.7%] h-[88.3%] w-[98.2%] max-w-none object-cover"
              width="648"
              height="650"
            />
          </div>

          <div
            class="flex w-full flex-1 flex-col items-center justify-center bg-[#f6f4f3] px-6 py-12 lg:w-[624px] lg:px-9 lg:py-[137px]"
          >
            <div class="flex max-w-[534px] flex-col items-center gap-12">
              <NuxtImg
                v-if="p.story.logo"
                :src="p.story.logo"
                alt=""
                class="h-9 w-auto"
                width="130"
                height="36"
              />

              <blockquote
                class="text-center font-sans text-[20px] font-medium leading-[1.26] text-black sm:text-[24px]"
              >
                {{ t(p.story.quote) }}
              </blockquote>

              <figcaption class="text-center text-brand-green">
                <p class="font-sans text-[20px] font-semibold sm:text-[24px]">
                  {{ p.story.name }}
                </p>
                <p
                  class="mt-1 font-sans text-[18px] font-semibold sm:text-[20px]"
                >
                  {{ t(p.story.role) }}
                </p>
              </figcaption>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="p.story.back"
        class="story-flip__face story-flip__face--back bg-white"
      >
        <div
          class="flex h-full flex-col gap-[38px] overflow-y-auto px-6 py-10 sm:px-12 lg:px-20 lg:py-[60px]"
        >
          <div class="grid gap-8 lg:grid-cols-2 lg:gap-[46px]">
            <div class="flex flex-col gap-3">
              <h3
                class="font-sans text-[24px] font-semibold text-brand-green sm:text-[32px]"
              >
                {{ t(p.story.back.beforeTitle) }}
              </h3>
              <p
                class="font-sans text-[18px] font-normal leading-[1.26] text-black sm:text-[20px]"
              >
                {{ t(p.story.back.beforeText) }}
              </p>
            </div>

            <div class="flex flex-col gap-3">
              <h3
                class="font-sans text-[24px] font-semibold text-brand-green sm:text-[32px]"
              >
                {{ t(p.story.back.approachTitle) }}
              </h3>
              <p
                class="font-sans text-[18px] font-normal leading-[1.26] text-black sm:text-[20px]"
              >
                {{ t(p.story.back.approachText) }}
              </p>
            </div>
          </div>

          <hr class="border-0 border-t-2 border-brand-green" />

          <div
            class="mx-auto flex max-w-[723px] flex-col items-center gap-[19px]"
          >
            <h3
              class="text-center font-sans text-[24px] font-semibold text-brand-green sm:text-[32px]"
            >
              {{ t(p.story.back.resultTitle) }}
            </h3>
            <ul class="space-y-2 text-center">
              <li
                v-for="(item, i) of p.story.back.results"
                :key="i"
                class="font-sans text-[18px] font-normal leading-[1.6] text-black sm:text-[20px]"
              >
                {{ t(item) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .story-flip {
    perspective: 1600px;
  }

  .story-flip__inner {
    position: relative;
    min-height: 360px;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
  }

  .story-flip:hover .story-flip__inner,
  .story-flip:focus-within .story-flip__inner {
    transform: rotateY(180deg);
  }

  .story-flip__face {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .story-flip__face--front {
    position: relative;
    z-index: 2;
  }

  .story-flip__face--back {
    position: absolute;
    inset: 0;
    transform: rotateY(180deg);
    z-index: 1;
  }

  @media (min-width: 1024px) {
    .story-flip__inner {
      min-height: 650px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .story-flip__inner {
      transition: none;
      transform: none !important;
    }

    .story-flip:hover .story-flip__face--back,
    .story-flip:focus-within .story-flip__face--back {
      position: relative;
      inset: auto;
      transform: none;
    }

    .story-flip:hover .story-flip__face--front,
    .story-flip:focus-within .story-flip__face--front {
      display: none;
    }

    .story-flip__face--back {
      position: relative;
      inset: auto;
      transform: none;
      display: none;
    }

    .story-flip:hover .story-flip__face--back,
    .story-flip:focus-within .story-flip__face--back {
      display: block;
    }
  }
</style>
