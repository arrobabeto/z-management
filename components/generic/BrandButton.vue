<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = withDefaults(
    defineProps<{
      label: I18nString
      href?: string
      variant?: "primary" | "secondary"
    }>(),
    { variant: "primary", href: "#faq" },
  )

  const t = useTranslate()
</script>

<template>
  <a
    :href="p.href"
    class="inline-flex items-center justify-center rounded-[30px] px-14 py-4 font-sans text-[16px] font-medium leading-none transition-colors"
    :class="
      p.variant === 'primary'
        ? 'bg-brand-orange text-white hover:bg-brand-yellow'
        : 'bg-brand-green text-white hover:bg-brand-darkgreen'
    "
  >
    {{ t(p.label) }}
  </a>
</template>
