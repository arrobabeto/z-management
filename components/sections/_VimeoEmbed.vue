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
  <!--
    Padding-bottom aspect lock: reliable inside flex rows where aspect-video
    can collapse short/wide and leave gray pillarboxing beside the video.
  -->
  <div ref="root" class="w-full max-w-[472px] shrink-0">
    <div
      class="relative w-full overflow-hidden rounded-[20px] bg-brand-darkgreen/10 pt-[56.25%]"
    >
      <iframe
        v-if="isVisible && embedSrc"
        :src="embedSrc"
        :title="p.title || 'Video'"
        class="absolute inset-0 size-full border-0"
        allow="fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  </div>
</template>
