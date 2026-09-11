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
        class="relative flex aspect-[1024/393] w-full flex-col justify-end overflow-hidden rounded-[35px] px-6 pb-12 pt-24 sm:px-11 sm:pb-16 sm:pt-32 lg:pb-[72px]"
      >
        <NuxtImg
          :src="p.image || '/blog/hero-bg.jpg'"
          alt=""
          fit="cover"
          class="absolute inset-0 size-full object-cover object-center"
          style="object-fit: cover; object-position: center center"
          width="1024"
          height="393"
          sizes="(max-width: 1273px) 100vw, 1273px"
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
