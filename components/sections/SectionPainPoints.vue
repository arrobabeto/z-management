<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type PainPoint = { text: I18nString }

  const p = defineProps<{
    title: I18nString
    logoImage?: string
    iconImage?: string
    points: PainPoint[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px] lg:py-[64px]">
    <div
      class="mx-auto flex max-w-[1273px] flex-col items-center gap-10 rounded-[40px] px-6 py-12 lg:flex-row lg:gap-[113px] lg:px-[120px] lg:py-20"
      style="
        background:
          linear-gradient(90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
          linear-gradient(
            90deg,
            #002a35 1.92%,
            #00586a 37.98%,
            #ff6700 73.56%,
            #ff8a00 100%
          );
      "
    >
      <div class="w-full max-w-[451px]">
        <NuxtImg
          :src="p.logoImage || '/homepage/zamenta-logo-white.png'"
          alt="ZAMENTA"
          class="h-9 w-auto lg:h-[47px]"
          width="388"
          height="47"
        />
        <h2
          class="mt-8 font-sans text-[28px] font-semibold leading-tight text-white lg:text-[36px]"
        >
          {{ t(p.title) }}
        </h2>
      </div>

      <div class="flex w-full max-w-[474px] flex-col items-center gap-7">
        <div
          class="flex size-[60px] items-center justify-center rounded-2xl bg-white/15 p-2"
        >
          <NuxtImg
            :src="p.iconImage || '/homepage/settings-icon.png'"
            alt=""
            class="size-11"
            width="44"
            height="44"
          />
        </div>
        <div class="flex w-full flex-col gap-7 text-center">
          <p
            v-for="(point, i) of p.points"
            :key="i"
            class="font-sans text-[28px] font-bold leading-tight text-white lg:text-[36px]"
          >
            {{ t(point.text) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
