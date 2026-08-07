<script setup lang="ts">
  import { computed } from "vue"
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type FeatureItem = I18nString | { text: I18nString; icon?: string }

  const p = defineProps<{
    tagline: I18nString
    title: I18nString
    content: I18nString
    items: FeatureItem[]
    image: string
    imagePosition?: "left" | "right"
    listIcon?: string
    /** Keep title on one line and reduce font size by 6px. */
    titleSingleLine?: boolean
  }>()

  const t = useTranslate()

  const defaultIcon =
    p.listIcon ?? "/lieferantenmanagement/icon-list-bullet.svg"

  const titleClass = computed(() =>
    p.titleSingleLine
      ? "whitespace-nowrap font-sans text-[20px] font-bold leading-tight text-brand-green sm:text-[26px] lg:text-[38px]"
      : "break-words font-sans text-[26px] font-bold leading-tight text-brand-green sm:text-[32px] lg:text-[44px]",
  )

  const listItems = computed(() =>
    p.items.map((item) => {
      if (item && typeof item === "object" && "text" in item) {
        return {
          text: item.text,
          icon: item.icon || defaultIcon,
        }
      }
      return { text: item as I18nString, icon: defaultIcon }
    }),
  )
</script>

<template>
  <section class="bg-white px-6 py-[60px] lg:px-[122px]">
    <div
      class="mx-auto flex max-w-[1280px] flex-col items-center gap-12 lg:gap-20"
      :class="
        p.imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
      "
    >
      <div class="w-full min-w-0 shrink-0 lg:w-1/2">
        <NuxtImg
          :src="p.image"
          alt=""
          class="aspect-[600/640] w-full rounded-[20px] object-cover"
          width="600"
          height="640"
        />
      </div>

      <div class="w-full min-w-0 space-y-8 lg:w-1/2">
        <div class="space-y-4">
          <p
            class="font-sans text-[16px] font-medium text-brand-orange lg:text-[18px]"
          >
            {{ t(p.tagline) }}
          </p>
          <h2 :class="titleClass">
            {{ t(p.title) }}
          </h2>
          <div
            class="break-words font-sans text-[18px] font-medium leading-[1.26] text-black"
          >
            <SafeHtml :html="t(p.content)" />
          </div>
        </div>

        <ul class="space-y-4">
          <li
            v-for="(item, i) of listItems"
            :key="i"
            class="flex items-start gap-4 font-sans text-[18px] font-medium leading-[1.26] text-black"
          >
            <NuxtImg
              :src="item.icon"
              alt=""
              class="mt-0.5 size-4 shrink-0"
              width="16"
              height="16"
            />
            <span class="min-w-0 break-words">{{ t(item.text) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
