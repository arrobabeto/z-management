<script setup lang="ts">
  import { computed } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import { dt } from "~/functions/dt"
  import type { IPost } from "~/types/dto/IPost"
  import slug from "slug"

  const p = defineProps<{ post: IPost; excerpt: string }>()

  const t = useTranslate()

  const postUrl = computed(
    () => `/posts/${p.post.id}/${slug(t(p.post.title as any))}`,
  )
</script>

<template>
  <section
    class="bg-white px-6 pb-8 pt-8 lg:px-[120px] lg:pb-[64px] lg:pt-[64px]"
  >
    <div
      class="mx-auto flex max-w-[1273px] flex-col items-center gap-8 lg:flex-row lg:gap-[35px]"
    >
      <div class="flex w-full min-w-0 flex-col gap-6 lg:w-1/2 lg:gap-[25px]">
        <div class="space-y-2">
          <time class="block font-sans text-[16px] text-[#032934]">
            {{ dt.toBlogDate(p.post.created_at) }}
          </time>
          <h2
            class="font-sans text-[26px] font-bold leading-tight text-brand-darkgreen sm:text-[34px] lg:text-[40px]"
          >
            {{ t(p.post.title as any) }}
          </h2>
        </div>

        <p
          class="font-sans text-[16px] leading-normal text-[#032934] sm:text-[18px]"
        >
          {{ p.excerpt }}
        </p>

        <NuxtLinkLocale
          :to="postUrl"
          class="inline-flex w-fit max-w-full items-center justify-center rounded-[30px] bg-brand-orange px-6 py-3.5 text-center font-sans text-[16px] font-semibold leading-tight text-white transition-colors hover:bg-brand-yellow sm:px-14 sm:py-4"
        >
          {{ t("learn_more") }}
        </NuxtLinkLocale>
      </div>

      <NuxtLinkLocale
        :to="postUrl"
        class="block w-full min-w-0 shrink-0 lg:w-1/2"
      >
        <NuxtImg
          :src="p.post.img"
          :alt="t(p.post.title as any)"
          class="aspect-[631/462] w-full rounded-[30px] object-cover"
          width="631"
          height="462"
        />
      </NuxtLinkLocale>
    </div>
  </section>
</template>
