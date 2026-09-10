<script setup lang="ts">
  import { ref } from "vue"
  import SafeHtml from "~/components/common/SafeHtml.vue"
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
  const isExpanded = ref(false)

  function toggleDetails() {
    isExpanded.value = !isExpanded.value
  }
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
        <div class="flex h-full min-h-0 flex-col lg:flex-row">
          <div
            class="relative h-[360px] w-full shrink-0 overflow-hidden bg-brand-green lg:h-auto lg:min-h-[520px] lg:w-1/2 lg:max-w-[648px] lg:self-stretch"
          >
            <NuxtImg
              :src="p.story.photo || '/erfolgsgeschichten/adrian-balz.jpg'"
              :alt="p.story.name"
              class="absolute left-[1.8%] top-[11.7%] h-[88.3%] w-[98.2%] object-cover object-top"
              width="648"
              height="650"
            />
          </div>

          <div
            class="flex w-full min-w-0 flex-1 flex-col items-center justify-center bg-[#f6f4f3] px-6 py-12 lg:px-9 lg:py-16"
          >
            <div class="flex max-w-[534px] flex-col items-center gap-12">
              <NuxtImg
                v-if="p.story.logo"
                :src="p.story.logo"
                alt=""
                class="h-9 w-auto max-w-[200px] object-contain object-center"
                width="254"
                height="55"
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
        class="story-flip__face story-flip__face--back hidden bg-white lg:block"
      >
        <div
          class="flex h-full min-w-0 flex-col gap-[38px] px-6 py-10 sm:px-12 lg:px-12 lg:py-[60px] xl:px-20"
        >
          <div class="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-[46px]">
            <div class="flex min-w-0 flex-col gap-3">
              <h3
                class="font-sans text-[20px] font-semibold text-brand-green sm:text-[28px]"
              >
                {{ t(p.story.back.beforeTitle) }}
              </h3>
              <p
                class="font-sans text-[14px] font-normal leading-[1.26] text-black sm:text-[16px]"
              >
                {{ t(p.story.back.beforeText) }}
              </p>
            </div>

            <div class="flex min-w-0 flex-col gap-3">
              <h3
                class="font-sans text-[20px] font-semibold text-brand-green sm:text-[28px]"
              >
                {{ t(p.story.back.approachTitle) }}
              </h3>
              <div
                class="font-sans text-[14px] font-normal leading-[1.26] text-black sm:text-[16px] [&_li]:my-1 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
              >
                <SafeHtml :html="t(p.story.back.approachText)" />
              </div>
            </div>
          </div>

          <hr class="border-0 border-t-2 border-brand-green" />

          <div
            class="mx-auto flex w-full min-w-0 max-w-full flex-col items-center gap-[19px]"
          >
            <h3
              class="text-center font-sans text-[20px] font-semibold text-brand-green sm:text-[28px]"
            >
              {{ t(p.story.back.resultTitle) }}
            </h3>
            <ul
              class="mx-auto w-fit max-w-full list-disc space-y-2 pl-5 text-left lg:whitespace-nowrap"
            >
              <li
                v-for="(item, i) of p.story.back.results"
                :key="i"
                class="font-sans text-[14px] font-normal leading-[1.6] text-black sm:text-[16px]"
              >
                {{ t(item) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="p.story.back" class="lg:hidden">
      <button
        type="button"
        class="flex w-full items-center justify-center gap-2 bg-[#f6f4f3] px-6 py-4 font-sans text-[16px] font-semibold text-brand-green transition-colors hover:bg-[#ebe8e6]"
        :aria-expanded="isExpanded"
        @click="toggleDetails"
      >
        {{
          isExpanded
            ? t({ de: "Details ausblenden", en: "Hide details" })
            : t({ de: "Details anzeigen", en: "Show details" })
        }}
      </button>

      <div
        v-if="isExpanded"
        class="flex flex-col gap-[38px] bg-white px-6 py-10 sm:px-12"
      >
        <div class="grid gap-8">
          <div class="flex flex-col gap-3">
            <h3
              class="font-sans text-[20px] font-semibold text-brand-green sm:text-[28px]"
            >
              {{ t(p.story.back.beforeTitle) }}
            </h3>
            <p
              class="font-sans text-[14px] font-normal leading-[1.26] text-black sm:text-[16px]"
            >
              {{ t(p.story.back.beforeText) }}
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <h3
              class="font-sans text-[20px] font-semibold text-brand-green sm:text-[28px]"
            >
              {{ t(p.story.back.approachTitle) }}
            </h3>
            <div
              class="font-sans text-[14px] font-normal leading-[1.26] text-black sm:text-[16px] [&_li]:my-1 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
            >
              <SafeHtml :html="t(p.story.back.approachText)" />
            </div>
          </div>
        </div>

        <hr class="border-0 border-t-2 border-brand-green" />

        <div
          class="mx-auto flex max-w-[723px] flex-col items-center gap-[19px]"
        >
          <h3
            class="text-center font-sans text-[20px] font-semibold text-brand-green sm:text-[28px]"
          >
            {{ t(p.story.back.resultTitle) }}
          </h3>
          <ul class="mx-auto w-fit list-disc space-y-2 pl-5 text-left">
            <li
              v-for="(item, i) of p.story.back.results"
              :key="i"
              class="font-sans text-[14px] font-normal leading-[1.6] text-black sm:text-[16px]"
            >
              {{ t(item) }}
            </li>
          </ul>
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
  }

  .story-flip__face--front {
    position: relative;
    z-index: 2;
  }

  @media (min-width: 1024px) {
    /* Both faces share one grid cell so height grows to the taller content. */
    .story-flip__inner {
      display: grid;
      transform-style: preserve-3d;
      transition: transform 0.6s ease;
    }

    .story-flip:hover .story-flip__inner,
    .story-flip:focus-within .story-flip__inner {
      transform: rotateY(180deg);
    }

    .story-flip__face {
      grid-area: 1 / 1;
      height: 100%;
      min-height: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    .story-flip__face--back {
      position: relative;
      inset: auto;
      transform: rotateY(180deg);
      z-index: 1;
    }
  }

  @media (min-width: 1024px) and (prefers-reduced-motion: reduce) {
    .story-flip__inner {
      transition: none;
      transform: none !important;
    }

    .story-flip:hover .story-flip__face--back,
    .story-flip:focus-within .story-flip__face--back {
      transform: none;
    }

    .story-flip:hover .story-flip__face--front,
    .story-flip:focus-within .story-flip__face--front {
      display: none;
    }

    .story-flip__face--back {
      transform: none;
      display: none;
    }

    .story-flip:hover .story-flip__face--back,
    .story-flip:focus-within .story-flip__face--back {
      display: block;
    }
  }
</style>
