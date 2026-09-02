<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import PreferredSourceButton from "~/components/PreferredSourceButton.vue"
  import BlogContactLinks from "./_BlogContactLinks.vue"

  const p = defineProps<{ html: string }>()
</script>

<template>
  <section class="bg-white px-6 pb-10 lg:px-[120px] lg:pb-12">
    <div class="mx-auto max-w-[1273px]">
      <SafeHtml :html="p.html" class="blog-article max-w-[852px]" />
      <BlogContactLinks class="max-w-[852px]" />
      <PreferredSourceButton class="mt-8 max-w-[852px]" />
    </div>
  </section>
</template>

<style scoped>
  .blog-article {
    color: #1a1a1a;
    font-size: 16px;
    line-height: 1.55;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .blog-article :deep(h2) {
    margin-top: 32px;
    margin-bottom: 12px;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.3;
    color: #002a35;
  }

  .blog-article :deep(h2:first-child) {
    margin-top: 0;
  }

  .blog-article :deep(h3) {
    margin-top: 22px;
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    color: #002a35;
  }

  @media (min-width: 640px) {
    .blog-article :deep(h2) {
      font-size: 24px;
    }

    .blog-article :deep(h3) {
      font-size: 18px;
    }
  }

  .blog-article :deep(p) {
    margin-bottom: 16px;
  }

  .blog-article :deep(ul),
  .blog-article :deep(ol) {
    margin-bottom: 16px;
    padding-left: 24px;
  }

  .blog-article :deep(ul) {
    list-style: disc;
  }

  .blog-article :deep(ol) {
    list-style: decimal;
  }

  .blog-article :deep(li) {
    margin-bottom: 6px;
  }

  .blog-article :deep(strong) {
    font-weight: 700;
  }

  .blog-article :deep(a) {
    color: #ff6700;
    text-decoration: underline;
  }

  .blog-article :deep(img) {
    max-width: 100%;
    height: auto;
  }

  .blog-article :deep(pre) {
    overflow-x: auto;
  }

  .blog-article :deep(table) {
    display: block;
    max-width: 100%;
    overflow-x: auto;
  }
</style>
