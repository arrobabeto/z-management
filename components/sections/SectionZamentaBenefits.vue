<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    subtitle?: I18nString
    content: I18nString
    ctaLabel?: I18nString
    ctaUrl?: string
    caption?: I18nString
  }>()

  const t = useTranslate()
</script>

<template>
  <section class="bg-white px-6 py-16 lg:px-[120px] lg:py-[64px]">
    <div class="mx-auto max-w-[1273px]">
      <div
        class="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[77px]"
      >
        <div class="w-full max-w-[837px]">
          <h2
            class="font-sans text-[28px] font-bold leading-tight text-brand-darkgreen lg:text-[36px]"
          >
            {{ t(p.title) }}
          </h2>
          <p
            v-if="p.subtitle"
            class="mt-1 font-sans text-[28px] font-medium leading-tight text-brand-darkgreen lg:text-[36px]"
          >
            {{ t(p.subtitle) }}
          </p>
          <div
            class="mt-6 font-sans text-[18px] font-medium leading-relaxed text-black"
          >
            <SafeHtml :html="t(p.content)" />
          </div>
        </div>

        <div class="relative h-[360px] w-[354px] shrink-0" aria-hidden="true">
          <div
            class="absolute left-0 top-0 size-[156px] rotate-45 bg-brand-orange"
          />
          <div
            class="absolute bottom-[86px] right-0 size-[95px] rotate-45 bg-brand-yellow"
          />
          <div
            class="absolute bottom-0 left-[96px] size-[95px] rotate-45 bg-brand-yellow"
          />
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center gap-6">
        <BrandButton
          :label="
            p.ctaLabel || {
              de: 'Kostenloses Erstgespräch',
              en: 'Free initial consultation',
            }
          "
          :href="p.ctaUrl || '#faq'"
        />
        <p
          v-if="p.caption"
          class="max-w-[382px] text-center font-sans text-[16px] font-medium text-black"
        >
          {{ t(p.caption) }}
        </p>
      </div>
    </div>
  </section>
</template>
