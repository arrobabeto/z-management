<script setup lang="ts">
  import { ref } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type NavLink = { label: I18nString; url: string }

  const t = useTranslate()
  const isOpen = ref(false)

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
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b border-black/5 bg-white">
    <div
      class="mx-auto flex max-w-[1512px] items-center justify-between gap-8 px-6 py-6 lg:px-[120px] lg:py-[34px]"
    >
      <NuxtLinkLocale to="/" class="shrink-0" aria-label="Z-Management">
        <NuxtImg
          src="/brand/logo-dark.svg"
          alt="Z-Management Business Solutions"
          class="h-9 w-auto lg:h-[44px]"
          width="241"
          height="54"
        />
      </NuxtLinkLocale>

      <div
        class="hidden items-center gap-4 font-sans text-[16px] font-medium text-brand-darkblue lg:flex xl:gap-5"
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

      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-lg text-brand-darkgreen lg:hidden"
        :aria-expanded="isOpen"
        aria-label="Menu"
        @click="isOpen = !isOpen"
      >
        <svg
          v-if="!isOpen"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="border-t border-black/5 bg-white px-6 py-4 lg:hidden"
    >
      <div
        class="flex flex-col gap-3 font-sans text-[16px] font-medium text-brand-darkblue"
      >
        <NuxtLinkLocale
          v-for="l of links"
          :key="l.url"
          :to="l.url"
          class="py-1 transition-colors hover:text-brand-orange"
          @click="isOpen = false"
        >
          {{ t(l.label) }}
        </NuxtLinkLocale>
      </div>
    </div>
  </nav>
</template>
