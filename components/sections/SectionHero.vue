<script setup lang="ts">
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    lead?: I18nString
    contactTitle?: I18nString
    contactLead?: I18nString
    contactCta?: I18nString
    ctaLabel?: I18nString
    ctaUrl?: string
    contactUrl?: string
    heroImage?: string
    logoImage?: string
  }>()

  const t = useTranslate()

  const social = [
    { name: "Facebook", url: "#", highlight: true },
    { name: "YouTube", url: "#", highlight: false },
    { name: "X", url: "#", highlight: false },
    { name: "Instagram", url: "#", highlight: false },
  ]
</script>

<template>
  <section id="risikomanagement" class="bg-white px-6 pb-8 pt-0 lg:px-[120px]">
    <div class="relative mx-auto max-w-[1273px]">
      <div class="relative overflow-hidden rounded-[30px]">
        <NuxtImg
          :src="p.heroImage || '/homepage/hero-bg.jpg'"
          alt=""
          class="h-[420px] w-full object-cover lg:h-[633px]"
          width="1273"
          height="633"
        />
        <div class="absolute inset-0 bg-black/25" />

        <div
          class="absolute inset-x-0 top-[90px] flex flex-col items-center gap-9 px-6 text-center lg:top-[134px]"
        >
          <NuxtImg
            :src="p.logoImage || '/homepage/zamenta-logo-white.png'"
            alt="ZAMENTA"
            class="h-9 w-auto lg:h-[47px]"
            width="388"
            height="47"
          />
          <h1
            class="max-w-[747px] font-sans text-[32px] font-bold leading-tight text-white lg:text-[44px]"
          >
            {{ t(p.title) }}
          </h1>
          <BrandButton
            :label="
              p.ctaLabel || {
                de: 'Kostenloses Erstgespräch',
                en: 'Free initial consultation',
              }
            "
            :href="p.ctaUrl || '#faq'"
          />
        </div>

        <div
          class="absolute bottom-6 left-6 right-6 flex flex-col gap-6 lg:bottom-10 lg:left-10 lg:right-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div
            class="w-full max-w-[481px] rounded-[30px] bg-brand-green p-5 lg:p-6"
          >
            <p
              class="font-sans text-[24px] font-semibold leading-tight text-brand-offwhite"
            >
              {{
                t(
                  p.contactTitle || {
                    de: "Haben Sie Fragen?",
                    en: "Have questions?",
                  },
                )
              }}
            </p>
            <p
              class="mt-2 font-sans text-[18px] font-medium leading-relaxed text-[#d4d4d4]"
            >
              {{
                t(
                  p.contactLead || {
                    de: "Unser Team ist für Sie da.",
                    en: "Our team is here for you.",
                  },
                )
              }}
            </p>
            <a
              :href="p.contactUrl || 'mailto:info@z-management.ch'"
              class="mt-4 inline-flex items-center justify-center rounded-xl bg-brand-offwhite px-5 py-3 font-dm text-[18px] text-[#242424] transition-colors hover:bg-white"
            >
              {{
                t(
                  p.contactCta || {
                    de: "Kontaktieren Sie uns",
                    en: "Contact us",
                  },
                )
              }}
            </a>
          </div>

          <p
            v-if="p.lead"
            class="max-w-[624px] font-sans text-[18px] font-medium leading-relaxed text-white lg:text-left"
          >
            {{ t(p.lead) }}
          </p>
        </div>
      </div>

      <div class="mt-5 flex justify-end gap-3">
        <a
          v-for="s of social"
          :key="s.name"
          :href="s.url"
          :aria-label="s.name"
          class="flex size-[42px] items-center justify-center rounded-[10px] text-brand-darkgreen transition-colors"
          :class="
            s.highlight
              ? 'bg-brand-orange text-white'
              : 'hover:text-brand-orange'
          "
        >
          <span class="text-xs font-bold">{{ s.name[0] }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
