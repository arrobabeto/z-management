<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import { fn } from "~/functions/fn"
  import type { IPost } from "~/types/dto/IPost"
  import BlogCard from "~/pages/posts/_BlogCard.vue"

  const p = defineProps<{ posts: IPost[] }>()

  const t = useTranslate()

  function excerpt(post: IPost) {
    return fn.truncateText(fn.removeHtml(t(post.lead)), 160)
  }
</script>

<template>
  <section v-if="p.posts.length" class="bg-white px-6 py-16 lg:px-[120px]">
    <div class="mx-auto max-w-[1273px]">
      <hr class="border-brand-darkgreen/20" />

      <h2
        class="mt-16 font-sans text-[28px] font-bold text-brand-darkgreen sm:text-[36px]"
      >
        {{ t({ de: "Neueste Beiträge", en: "Latest posts" }) }}
      </h2>

      <div class="mt-16 grid gap-16 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-16">
        <BlogCard
          v-for="r of p.posts"
          :key="r.id"
          :post="r"
          :excerpt="excerpt(r)"
        />
      </div>
    </div>
  </section>
</template>
