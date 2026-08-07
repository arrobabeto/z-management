<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type PainPoint = { text: I18nString; italic?: boolean }

  const p = defineProps<{
    title: I18nString
    points: PainPoint[]
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-4 py-16 sm:px-6 lg:px-[120px] lg:py-[64px]">
    <div
      class="mx-auto flex max-w-[1273px] flex-col items-center gap-8 sm:gap-10"
    >
      <h2
        class="max-w-[906px] text-center font-sans text-[24px] font-semibold leading-tight text-brand-darkgreen sm:text-[28px] lg:text-[36px]"
      >
        {{ t(p.title) }}
      </h2>

      <div
        class="flex w-full max-w-[1273px] flex-col items-center justify-center gap-5 rounded-[24px] px-6 py-12 text-center sm:gap-7 sm:rounded-[40px] sm:px-10 sm:py-16 lg:px-[120px] lg:py-20"
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
        <p
          v-for="(point, i) of p.points"
          :key="i"
          class="max-w-[906px] font-sans text-[20px] leading-tight text-white sm:text-[28px] lg:text-[36px]"
          :class="
            point.italic || i === p.points.length - 1
              ? 'font-medium italic'
              : 'font-bold'
          "
        >
          {{ t(point.text) }}
        </p>
      </div>
    </div>
  </section>
</template>
