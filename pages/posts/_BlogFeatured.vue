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
    class="bg-white px-6 pb-16 pt-16 lg:px-[120px] lg:pb-[64px] lg:pt-[64px]"
  >
    <div
      class="mx-auto flex max-w-[1273px] flex-col items-center gap-8 lg:flex-row lg:gap-[35px]"
    >
      <div class="flex w-full flex-col gap-6 lg:w-[606px] lg:gap-[25px]">
        <div class="space-y-2">
          <time class="block font-sans text-[16px] text-[#032934]">
            {{ dt.toBlogDate(p.post.created_at) }}
          </time>
          <h2
            class="font-sans text-[32px] font-bold leading-tight text-brand-darkgreen sm:text-[40px] lg:text-[50px]"
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
          class="inline-flex w-fit items-center justify-center rounded-[30px] bg-brand-orange px-14 py-4 font-sans text-[16px] font-semibold text-white transition-colors hover:bg-brand-yellow"
        >
          {{ t("learn_more") }}
        </NuxtLinkLocale>
      </div>

      <NuxtLinkLocale :to="postUrl" class="block w-full shrink-0 lg:w-[631px]">
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
