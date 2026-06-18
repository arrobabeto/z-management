<script setup lang="ts">
  import { ref, computed } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type Story = {
    quote: I18nString
    name: string
    role: I18nString
    photo?: string
    logo?: string
  }

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
      <div
        class="flex flex-col overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.05)] lg:flex-row"
      >
        <div
          class="relative h-[360px] w-full shrink-0 overflow-hidden rounded-t-[76px] bg-brand-green lg:h-[650px] lg:w-[648px] lg:rounded-bl-[76px] lg:rounded-tl-[76px] lg:rounded-tr-none"
        >
          <NuxtImg
            :src="current.photo || '/erfolgsgeschichten/adrian-balz.jpg'"
            :alt="current.name"
            class="absolute left-[1.8%] top-[11.7%] h-[88.3%] w-[98.2%] max-w-none object-cover"
            width="648"
            height="650"
          />
        </div>

        <div
          class="flex w-full flex-col items-center justify-center rounded-b-[76px] bg-[#f6f4f3] px-6 py-12 lg:w-[624px] lg:rounded-br-[76px] lg:rounded-tr-[76px] lg:px-9 lg:py-[137px]"
        >
          <div class="flex max-w-[534px] flex-col items-center gap-12">
            <NuxtImg
              v-if="current.logo"
              :src="current.logo"
              alt=""
              class="h-9 w-auto"
              width="130"
              height="36"
            />

            <blockquote
              class="text-center font-sans text-[20px] font-medium italic leading-tight text-black sm:text-[24px]"
            >
              {{ t(current.quote) }}
            </blockquote>

            <figcaption class="text-center text-brand-green">
              <p class="font-sans text-[20px] font-semibold sm:text-[24px]">
                {{ current.name }}
              </p>
              <p
                class="mt-1 font-sans text-[18px] font-semibold sm:text-[20px]"
              >
                {{ t(current.role) }}
              </p>
            </figcaption>
          </div>
        </div>
      </div>

      <div
        v-if="p.stories.length > 1"
        class="mt-10 flex items-center justify-center gap-4"
      >
        <button
          v-for="(_, i) of p.stories"
          :key="i"
          type="button"
          class="h-[21px] w-[21px] rounded-full transition-colors"
          :class="i === index ? 'bg-brand-darkgreen' : 'bg-[#d9d9d9]'"
          :aria-label="`Story ${i + 1}`"
          @click="goTo(i)"
        />
      </div>
    </div>
  </section>
</template>
