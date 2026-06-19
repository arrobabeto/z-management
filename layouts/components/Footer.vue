<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
  import { socialLinks } from "~/constants/socialLinks"
  import type { I18nString } from "~/types/util/I18nString"

  type NavLink = { label: I18nString; url: string }

  const t = useTranslate()
  const year = new Date().getFullYear()

  const links: NavLink[] = [
    {
      label: {
        en: "Risk management in one click",
        de: "Risikomanagement mit einem Klick",
      },
      url: "/#risikomanagement",
    },
    {
      label: { en: "Holistic procurement", de: "Ganzheitlicher Einkauf" },
      url: "/ganzheitliches-lieferantenmanagement",
    },
    {
      label: { en: "How we work", de: "Ablauf der Zusammenarbeit" },
      url: "/#ablauf",
    },
    { label: { en: "About us", de: "Über uns" }, url: "/#ueber-uns" },
    {
      label: { en: "Testimonials", de: "Das sagen unsere Kunden" },
      url: "/erfolgsgeschichten",
    },
    { label: { en: "Blog", de: "Blog" }, url: "/posts" },
    { label: { en: "FAQ", de: "FAQ" }, url: "/#faq" },
  ]

  const legal: NavLink[] = [
    { label: { en: "Imprint", de: "Impressum" }, url: "/imprint" },
    { label: { en: "Privacy", de: "Datenschutz" }, url: "/privacy" },
    { label: { en: "Terms", de: "AGB" }, url: "/terms" },
  ]

  const social = socialLinks
</script>

<template>
  <footer class="w-full bg-brand-darkgreen text-white">
    <div
      class="mx-auto flex max-w-[1512px] flex-col items-center gap-[34px] px-6 py-16 lg:px-[120px] lg:py-[80px]"
    >
      <!-- Logo + tagline -->
      <div class="flex w-full max-w-[510px] flex-col items-center gap-7">
        <NuxtImg
          src="/brand/logo-light.svg"
          alt="Z-Management Business Solutions"
          class="h-[44px] w-auto"
          width="241"
          height="51"
        />
        <p
          class="text-center font-sans text-[28px] font-normal leading-tight text-brand-offwhite sm:text-[36px]"
        >
          {{
            t({
              en: "Detect risks. Secure decisions.",
              de: "Risiken erkennen. Entscheidungen sichern.",
            })
          }}
        </p>
      </div>

      <div class="h-px w-full bg-white/15" />

      <!-- Content row -->
      <div
        class="flex w-full flex-col items-start justify-between gap-10 lg:flex-row"
      >
        <!-- Newsletter -->
        <div class="flex w-full max-w-[452px] flex-col gap-3">
          <p
            class="font-sans text-[24px] font-semibold leading-tight text-white"
          >
            {{
              t({
                en: "Want to receive our articles?",
                de: "Möchten Sie unsere Beiträge erhalten?",
              })
            }}
          </p>
          <p
            class="font-sans text-[16px] font-medium leading-relaxed text-white"
          >
            {{
              t({
                en: "Articles, analyses and best practices for secure risk management.",
                de: "Artikel, Analysen und Best Practices für ein sicheres Risikomanagement.",
              })
            }}
          </p>
          <form
            class="mt-1 flex w-full max-w-[406px] items-center justify-between gap-2 rounded-2xl bg-brand-offwhite py-2 pl-4 pr-2"
            @submit.prevent
          >
            <input
              type="email"
              :placeholder="t({ en: 'Subscribe now', de: 'Jetzt abonnieren' })"
              class="w-full bg-transparent font-dm text-[16px] text-brand-muted outline-none placeholder:text-brand-muted"
            />
            <button
              type="submit"
              class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-green text-white transition-colors hover:bg-brand-orange"
              aria-label="Abonnieren"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </button>
          </form>
        </div>

        <!-- Nav links -->
        <div
          class="flex flex-col gap-6 font-sans text-[16px] font-medium text-white"
        >
          <NuxtLinkLocale
            v-for="l of links"
            :key="l.url"
            :to="l.url"
            class="whitespace-nowrap transition-colors hover:text-brand-orange"
          >
            {{ t(l.label) }}
          </NuxtLinkLocale>
        </div>

        <!-- Contact -->
        <div class="flex w-full max-w-[245px] flex-col gap-6">
          <p
            class="font-epilogue text-[20px] font-medium leading-tight text-brand-offwhite"
          >
            {{ t({ en: "Contact us", de: "Kontaktieren Sie uns" }) }}
          </p>
          <div class="flex flex-col gap-2 text-[16px] text-white">
            <div class="font-sans font-medium leading-relaxed">
              <p>Z-Management AG</p>
              <p>Alte Schmerikonerstrasse 5</p>
              <p>CH-8733 Eschenbach SG</p>
            </div>
            <a
              href="tel:+41552822012"
              class="font-dm transition-colors hover:text-brand-orange"
            >
              +41 55 282 20 12
            </a>
            <a
              href="mailto:info@z-management.ch"
              class="font-dm underline transition-colors hover:text-brand-orange"
            >
              info@z-management.ch
            </a>
          </div>
          <div class="flex items-center gap-2">
            <a
              v-for="s of social"
              :key="s.name"
              :href="s.url"
              :aria-label="s.name"
              class="flex size-[42px] items-center justify-center rounded-[10px] text-white transition-colors"
              :class="
                s.highlight
                  ? 'bg-brand-orange hover:bg-brand-yellow'
                  : 'hover:text-brand-orange'
              "
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path :d="s.path" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="h-px w-full bg-white/15" />

      <!-- Bottom bar -->
      <div
        class="flex w-full flex-col items-center justify-between gap-3 font-sans text-[14px] text-white sm:flex-row"
      >
        <p>{{ t({ en: "Z-Management", de: "Z-Management" }) }} © {{ year }}</p>
        <div class="flex items-center gap-2">
          <template v-for="(l, i) of legal" :key="l.url">
            <NuxtLinkLocale
              :to="l.url"
              class="transition-colors hover:text-brand-orange"
            >
              {{ t(l.label) }}
            </NuxtLinkLocale>
            <span v-if="i < legal.length - 1" class="opacity-60">|</span>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>
