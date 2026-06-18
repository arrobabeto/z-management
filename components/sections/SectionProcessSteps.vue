<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type Step = {
    title: I18nString
    text: I18nString
    variant?: "green" | "white"
  }

  const p = defineProps<{
    title: I18nString
    logoImage?: string
    backgroundImage?: string
    steps: Step[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section id="ablauf" class="bg-white px-6 py-16 lg:px-[120px] lg:py-[64px]">
    <div
      class="relative mx-auto max-w-[1273px] overflow-hidden rounded-[40px] px-6 pb-24 pt-28 lg:px-[84px] lg:pb-[114px] lg:pt-[148px]"
    >
      <NuxtImg
        :src="p.backgroundImage || '/homepage/process-bg.jpg'"
        alt=""
        class="absolute inset-0 size-full object-cover"
        width="1273"
        height="1006"
      />
      <div class="absolute inset-0 bg-black/20" />

      <div class="relative flex flex-col gap-24 lg:gap-40">
        <div class="max-w-[640px]">
          <h2
            class="font-sans text-[32px] font-bold leading-tight text-white lg:text-[44px]"
          >
            {{ t(p.title) }}
          </h2>
          <NuxtImg
            :src="p.logoImage || '/homepage/zamenta-logo-white-2.png'"
            alt="ZAMENTA"
            class="mt-4 h-9 w-auto lg:h-[47px]"
            width="388"
            height="47"
          />
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <article
            v-for="(s, i) of p.steps"
            :key="i"
            class="flex min-h-[356px] flex-col gap-2 rounded-2xl p-5"
            :class="
              (s.variant || (i % 2 === 0 ? 'green' : 'white')) === 'green'
                ? 'bg-brand-green text-white'
                : 'bg-brand-offwhite text-[#242424]'
            "
          >
            <p
              class="font-sans text-[64px] font-bold leading-none"
              :class="
                (s.variant || (i % 2 === 0 ? 'green' : 'white')) === 'green'
                  ? 'text-brand-offwhite'
                  : 'text-[#242424]'
              "
            >
              {{ i + 1 }}
            </p>
            <h3
              class="font-sans text-[24px] font-semibold leading-tight"
              :class="
                (s.variant || (i % 2 === 0 ? 'green' : 'white')) === 'green'
                  ? 'text-brand-offwhite'
                  : 'text-[#242424]'
              "
            >
              {{ t(s.title) }}
            </h3>
            <p
              class="font-sans text-[16px] font-medium leading-relaxed"
              :class="
                (s.variant || (i % 2 === 0 ? 'green' : 'white')) === 'green'
                  ? 'text-white'
                  : 'text-brand-muted'
              "
            >
              {{ t(s.text) }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
