<script setup lang="ts">
  import { useHead } from "#imports"
  import { useTranslate } from "~/composables/useTranslate"

  const t = useTranslate()

  useHead({
    title: t("page_not_found"),
    meta: [
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  })
</script>

<template>
  <main
    class="grid min-h-screen place-content-center overflow-hidden bg-white font-sans text-brand-darkgreen antialiased"
  >
    <div class="space-y-4 text-center">
      <p class="text-2xl font-semibold">{{ t("page_not_found") }}</p>
      <p class="text-sm opacity-80">
        {{
          t({
            de: "Die angeforderte Seite existiert nicht.",
            en: "The page you requested does not exist.",
          })
        }}
      </p>
      <NuxtLinkLocale to="/" class="underline">
        {{ t("homepage") }}
      </NuxtLinkLocale>
    </div>
  </main>
</template>
