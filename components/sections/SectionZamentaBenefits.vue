<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { CALENDLY_URL } from "~/constants/siteLinks"
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
  <section
    class="overflow-x-clip bg-white px-6 py-16 lg:px-[120px] lg:py-[64px]"
  >
    <div class="mx-auto max-w-[1273px]">
      <div
        class="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-[77px]"
      >
        <div class="w-full max-w-[837px]">
          <h2
            class="font-sans text-[24px] font-bold leading-tight text-brand-darkgreen sm:text-[28px] lg:text-[36px]"
          >
            {{ t(p.title) }}
          </h2>
          <p
            v-if="p.subtitle"
            class="mt-1 font-sans text-[24px] font-medium leading-tight text-brand-darkgreen sm:text-[28px] lg:text-[36px]"
          >
            {{ t(p.subtitle) }}
          </p>
          <div
            class="mt-6 font-sans text-[18px] font-medium leading-relaxed text-black"
          >
            <SafeHtml :html="t(p.content)" />
          </div>
        </div>

        <!-- Decorative diamonds: hide on mobile — they create a large empty gap. -->
        <div
          class="relative mx-auto hidden aspect-[354/360] w-full max-w-[354px] shrink-0 lg:block"
          aria-hidden="true"
        >
          <div
            class="aspect-square absolute left-0 top-0 w-[44.07%] rotate-45 bg-brand-orange"
          />
          <div
            class="aspect-square absolute bottom-[23.9%] right-0 w-[26.84%] rotate-45 bg-brand-yellow"
          />
          <div
            class="aspect-square absolute bottom-0 left-[27.1%] w-[26.84%] rotate-45 bg-brand-yellow"
          />
        </div>
      </div>

      <div class="mt-8 flex flex-col items-center gap-4 lg:mt-10 lg:gap-6">
        <BrandButton
          :label="
            p.ctaLabel || {
              de: 'Kostenloses Erstgespräch',
              en: 'Free initial consultation',
            }
          "
          :href="p.ctaUrl || CALENDLY_URL"
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
