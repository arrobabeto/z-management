<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type Card = {
    title: I18nString
    variant: "green" | "orange"
  }

  const p = defineProps<{
    title: I18nString
    content: I18nString
    cards: Card[]
  }>()

  const t = useTranslate()

  const cardIcons = [
    "/lieferantenmanagement/icon-workspaces.svg",
    "/lieferantenmanagement/icon-sync-problem.svg",
    "/lieferantenmanagement/icon-dataset-linked.svg",
  ]
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px]">
    <div class="mx-auto flex max-w-[1284px] flex-col gap-10">
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-20">
        <h2
          class="flex-1 font-sans text-[28px] font-semibold leading-[1.2] text-black lg:text-[36px]"
        >
          {{ t(p.title) }}
        </h2>
        <div
          class="flex-1 font-sans text-[18px] font-medium leading-[1.26] text-black"
        >
          <SafeHtml :html="t(p.content)" />
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <div
          v-for="(c, i) of p.cards"
          :key="i"
          class="flex min-h-[239px] flex-col items-center justify-center gap-6 rounded-[32px] px-8 py-10 text-center"
          :class="
            c.variant === 'orange'
              ? 'bg-brand-orange text-brand-darkgreen'
              : 'bg-brand-green text-white'
          "
        >
          <NuxtImg
            :src="cardIcons[i]"
            alt=""
            class="size-12"
            width="48"
            height="48"
          />
          <p
            class="font-sans text-[20px] font-semibold leading-tight lg:text-[24px]"
          >
            {{ t(c.title) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
