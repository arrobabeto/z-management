<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    subtitle: I18nString
    image?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 pb-[50px] lg:px-[120px]">
    <div class="relative mx-auto max-w-[1273px]">
      <div
        class="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[35px] px-6 pb-16 pt-48 sm:min-h-[420px] sm:px-11 sm:pb-[94px] sm:pt-[289px] lg:min-h-[489px]"
      >
        <NuxtImg
          :src="p.image || '/blog/hero-bg.jpg'"
          alt=""
          class="absolute inset-0 size-full object-cover object-bottom"
          width="1273"
          height="489"
        />
        <div
          class="absolute inset-0 rounded-[35px]"
          style="
            background: linear-gradient(
              86.95deg,
              rgba(58, 58, 58, 0) 26.13%,
              rgba(3, 41, 52, 0.8) 92.05%
            );
          "
        />
        <div class="relative z-10 max-w-[748px] space-y-5">
          <h1
            class="font-sans text-[32px] font-bold leading-tight text-[#fefcfa] sm:text-[40px] lg:text-[50px]"
          >
            {{ t(p.title) }}
          </h1>
          <p
            class="font-sans text-[16px] font-normal text-white sm:text-[18px]"
          >
            {{ t(p.subtitle) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
