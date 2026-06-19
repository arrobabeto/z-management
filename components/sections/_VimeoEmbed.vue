<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from "vue"

  const p = defineProps<{
    url: string
    title?: string
  }>()

  const root = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  function parseVimeoId(url: string): string | null {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    return match?.[1] ?? null
  }

  const videoId = computed(() => parseVimeoId(p.url))

  const embedSrc = computed(() => {
    if (!videoId.value) return ""
    const params = new URLSearchParams({
      autoplay: "0",
      title: "0",
      byline: "0",
      portrait: "0",
    })
    return `https://player.vimeo.com/video/${videoId.value}?${params}`
  })

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!root.value || !videoId.value) return

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          isVisible.value = true
          observer?.disconnect()
          observer = null
        }
      },
      { rootMargin: "120px" },
    )
    observer.observe(root.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
</script>

<template>
  <div
    ref="root"
    class="aspect-[472/350] w-full max-w-[472px] shrink-0 overflow-hidden rounded-[20px] bg-brand-darkgreen/10"
  >
    <iframe
      v-if="isVisible && embedSrc"
      :src="embedSrc"
      :title="p.title || 'Video'"
      class="size-full border-0"
      allow="fullscreen; picture-in-picture"
      loading="lazy"
    />
  </div>
</template>
