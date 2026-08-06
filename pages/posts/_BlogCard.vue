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
  <article class="flex flex-col gap-3.5">
    <NuxtLinkLocale :to="postUrl" class="block overflow-hidden rounded-[20px]">
      <NuxtImg
        :src="p.post.img"
        :alt="t(p.post.title as any)"
        class="aspect-[408/228] w-full object-cover"
        width="408"
        height="228"
      />
    </NuxtLinkLocale>

    <time class="font-sans text-[16px] text-[#032934]">
      {{ dt.toBlogDate(p.post.created_at) }}
    </time>

    <h3
      class="break-words font-sans text-[18px] font-bold leading-snug text-[#032934] sm:text-[22px]"
    >
      <NuxtLinkLocale :to="postUrl" class="hover:text-brand-green">
        {{ t(p.post.title as any) }}
      </NuxtLinkLocale>
    </h3>

    <p
      class="max-w-[381px] font-sans text-[16px] leading-normal text-[#032934]"
    >
      {{ p.excerpt }}
    </p>

    <NuxtLinkLocale
      :to="postUrl"
      class="inline-flex w-fit max-w-full items-center justify-center rounded-[30px] bg-brand-orange px-6 py-3.5 text-center font-sans text-[16px] font-semibold leading-tight text-white transition-colors hover:bg-brand-yellow sm:px-14 sm:py-4"
    >
      {{ t("learn_more") }}
    </NuxtLinkLocale>
  </article>
</template>
