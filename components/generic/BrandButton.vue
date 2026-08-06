<script setup lang="ts">
  import { computed } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import { CALENDLY_URL } from "~/constants/siteLinks"
  import type { I18nString } from "~/types/util/I18nString"

  const p = withDefaults(
    defineProps<{
      label: I18nString
      href?: string
      variant?: "primary" | "secondary"
    }>(),
    { variant: "primary", href: CALENDLY_URL },
  )

  const t = useTranslate()

  const isExternal = computed(
    () =>
      p.href.startsWith("http://") ||
      p.href.startsWith("https://") ||
      p.href.startsWith("mailto:"),
  )
</script>

<template>
  <a
    :href="p.href"
    class="inline-flex max-w-full items-center justify-center rounded-[30px] px-6 py-3.5 text-center font-sans text-[16px] font-medium leading-tight transition-colors sm:px-14 sm:py-4"
    :class="
      p.variant === 'primary'
        ? 'bg-brand-orange text-white hover:bg-brand-yellow'
        : 'bg-brand-green text-white hover:bg-brand-darkgreen'
    "
    :target="isExternal && !p.href.startsWith('mailto:') ? '_blank' : undefined"
    :rel="
      isExternal && !p.href.startsWith('mailto:')
        ? 'noopener noreferrer'
        : undefined
    "
  >
    {{ t(p.label) }}
  </a>
</template>
