<script setup lang="ts">
  import BrandButton from "~/components/generic/BrandButton.vue"
  import { CALENDLY_URL, CONTACT_MAILTO } from "~/constants/siteLinks"
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
</script>

<template>
  <section id="risikomanagement" class="bg-white px-6 pb-8 pt-0 lg:px-[120px]">
    <div class="relative mx-auto max-w-[1273px]">
      <div
        class="relative h-[420px] overflow-hidden rounded-[30px] sm:h-[520px] lg:h-[633px]"
      >
        <!-- Mobile-only crop: factory close-up, centered. -->
        <NuxtImg
          :src="'/homepage/hero-bg-mobile.png'"
          alt=""
          class="absolute inset-0 size-full object-cover object-center lg:hidden"
          style="object-fit: cover; object-position: center center"
          width="722"
          height="611"
        />
        <!-- Desktop hero with baked-in contact-card notch. -->
        <NuxtImg
          :src="p.heroImage || '/homepage/hero-bg.jpg'"
          alt=""
          class="absolute inset-0 hidden size-full object-cover object-center lg:block"
          width="1273"
          height="633"
        />
        <!-- Top gradient only: keeps the headline legible while leaving the
             baked-in white card notch (bottom-left of the photo) white. -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent"
        />

        <div
          class="absolute inset-x-0 top-0 flex h-full flex-col items-center justify-center gap-4 px-6 text-center sm:gap-5 lg:inset-x-0 lg:top-[134px] lg:h-auto lg:justify-start lg:gap-9"
        >
          <NuxtImg
            :src="p.logoImage || '/homepage/zamenta-logo-white.png'"
            alt="ZAMENTA"
            class="h-9 w-auto lg:h-[47px]"
            width="388"
            height="47"
          />
          <h1
            class="max-w-[747px] font-sans text-[26px] font-bold leading-tight text-white sm:text-[32px] lg:text-[44px]"
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
            :href="p.ctaUrl || CALENDLY_URL"
          />
        </div>
      </div>

      <!-- Contact card + lead: stacked below the image on mobile, anchored to the
           image corners on desktop (card in a white notch, lead bottom-right). -->
      <div
        class="mt-4 flex flex-col gap-5 lg:pointer-events-none lg:absolute lg:left-0 lg:top-0 lg:mt-0 lg:block lg:h-[633px] lg:w-full"
      >
        <!-- Contact card: flush in the bottom-left corner, sitting in the
             white notch that is baked into the hero image. -->
        <div
          class="lg:pointer-events-auto lg:absolute lg:bottom-0 lg:left-0 lg:p-3.5"
        >
          <div
            class="flex w-full flex-col items-center rounded-[30px] bg-brand-green p-5 text-center lg:w-[481px] lg:items-start lg:text-left"
          >
            <p
              class="font-sans text-[22px] font-semibold leading-tight text-brand-offwhite sm:text-[24px]"
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
              class="mt-2 font-sans text-[16px] font-medium leading-relaxed text-[#d4d4d4] sm:text-[18px]"
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
              :href="p.contactUrl || CONTACT_MAILTO"
              class="mt-4 inline-flex items-center justify-center rounded-xl bg-brand-offwhite py-3 pl-3 pr-5 font-dm text-[16px] text-[#242424] transition-colors hover:bg-white sm:text-[18px]"
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
        </div>

        <!-- Lead paragraph: below image on mobile, bottom-right on desktop -->
        <p
          v-if="p.lead"
          class="font-sans text-[16px] font-medium leading-relaxed text-brand-darkgreen sm:text-[18px] lg:pointer-events-auto lg:absolute lg:bottom-[48px] lg:right-[7%] lg:max-w-[624px] lg:text-left lg:text-[18px] lg:text-white"
        >
          {{ t(p.lead) }}
        </p>
      </div>
    </div>
  </section>
</template>
