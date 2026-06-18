<script setup lang="ts">
  import { useTranslate } from "~/composables/useTranslate"
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

  const social = [
    {
      name: "Facebook",
      url: "#",
      highlight: true,
      path: "M14 8.5h2V5.7c-.35-.05-1.54-.15-2.92-.15-2.9 0-4.88 1.78-4.88 5.04V13H5.6v3.13h2.6V24h3.2v-7.87h2.5l.4-3.13h-2.9v-2.3c0-.9.25-1.5 1.5-1.5z",
    },
    {
      name: "YouTube",
      url: "#",
      highlight: false,
      path: "M23.5 8.2a3 3 0 0 0-2.1-2.1C19.5 5.6 12 5.6 12 5.6s-7.5 0-9.4.5A3 3 0 0 0 .5 8.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 3.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-3.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
    },
    {
      name: "X",
      url: "#",
      highlight: false,
      path: "M18.2 3h3.3l-7.2 8.2L22.8 21h-6.6l-5.2-6.8L5.1 21H1.8l7.7-8.8L1.5 3h6.8l4.7 6.2L18.2 3zm-1.2 16h1.8L7.1 4.8H5.2L17 19z",
    },
    {
      name: "Instagram",
      url: "#",
      highlight: false,
      path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.2.96.48 1.38.9.42.42.7.82.9 1.38.17.42.36 1.06.42 2.23.06 1.25.07 1.62.07 4.8s0 3.55-.07 4.8c-.06 1.17-.25 1.8-.42 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.7-1.38.9-.42.17-1.06.36-2.23.42-1.25.06-1.62.07-4.85.07s-3.6 0-4.85-.07c-1.17-.06-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.36-1.06-.42-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.55.07-4.8c.06-1.17.25-1.8.42-2.23.2-.56.48-.96.9-1.38.42-.42.82-.7 1.38-.9.42-.17 1.06-.36 2.23-.42C8.45 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.85-11.2a1.54 1.54 0 1 1-3.08 0 1.54 1.54 0 0 1 3.08 0z",
    },
  ]
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
              aria-label="Subscribe"
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
        <p>{{ t({ en: "Z-Management", de: "Z-Managment" }) }} © {{ year }}</p>
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
