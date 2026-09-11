<script setup lang="ts">
  import sanitizeHtml from "sanitize-html"

  const p = defineProps<{
    html: string
  }>()

  const sanitized = sanitizeHtml(p.html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "h1",
      "h2",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "blockquote",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan", "scope"],
    },
  })
</script>

<template>
  <!--eslint-disable vue/no-v-html-->
  <div v-html="sanitized" />
</template>
