<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    tagline: I18nString
    title: I18nString
    content: I18nString
    items: I18nString[]
    image: string
    imagePosition?: "left" | "right"
    listIcon?: string
  }>()

  const t = useTranslate()

  const listIconSrc =
    p.listIcon ?? "/lieferantenmanagement/icon-list-bullet.svg"
</script>

<template>
  <section class="bg-white px-6 py-[60px] lg:px-[122px]">
    <div
      class="mx-auto flex max-w-[1280px] flex-col items-center gap-12 lg:gap-20"
      :class="
        p.imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
      "
    >
      <div class="w-full shrink-0 lg:w-1/2">
        <NuxtImg
          :src="p.image"
          alt=""
          class="aspect-[600/640] w-full rounded-[20px] object-cover"
          width="600"
          height="640"
        />
      </div>

      <div class="w-full space-y-8 lg:w-1/2">
        <div class="space-y-4">
          <p
            class="font-sans text-[16px] font-medium text-brand-orange lg:text-[18px]"
          >
            {{ t(p.tagline) }}
          </p>
          <h2
            class="font-sans text-[32px] font-bold leading-tight text-brand-green lg:text-[44px]"
          >
            {{ t(p.title) }}
          </h2>
          <div
            class="font-sans text-[18px] font-medium leading-[1.26] text-black"
          >
            <SafeHtml :html="t(p.content)" />
          </div>
        </div>

        <ul class="space-y-4">
          <li
            v-for="(item, i) of p.items"
            :key="i"
            class="flex items-start gap-4 font-sans text-[18px] font-medium leading-[1.26] text-black"
          >
            <NuxtImg
              :src="listIconSrc"
              alt=""
              class="mt-0.5 size-[22px] shrink-0"
              width="22"
              height="22"
            />
            <span>{{ t(item) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
