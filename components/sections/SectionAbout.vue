<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const p = defineProps<{
    title: I18nString
    content: I18nString
    founderName?: string
    founderRole?: I18nString
    founderImage?: string
    logoImage?: string
  }>()

  const t = useTranslate()
</script>

<template>
  <section
    id="ueber-uns"
    class="bg-white px-6 py-16 lg:px-[120px] lg:py-[64px]"
  >
    <div
      class="mx-auto flex max-w-[1273px] flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-[155px]"
    >
      <div class="w-full max-w-[562px]">
        <h2
          class="max-w-[516px] whitespace-pre-line font-sans text-[32px] font-bold leading-tight text-brand-darkgreen lg:text-[44px]"
        >
          {{ t(p.title) }}
        </h2>
        <NuxtImg
          :src="p.logoImage || '/brand/logo-dark.svg'"
          alt="Z-Management"
          class="mt-9 h-10 w-auto"
          width="240"
          height="53"
        />
        <div
          class="mt-9 font-sans text-[18px] font-medium leading-relaxed text-black"
        >
          <SafeHtml :html="t(p.content)" />
        </div>
      </div>

      <div class="relative w-full max-w-[453px] shrink-0">
        <NuxtImg
          :src="p.founderImage || '/homepage/founder.jpg'"
          alt=""
          class="h-[554px] w-full rounded-[32px] object-cover"
          width="453"
          height="554"
        />
        <div
          class="absolute bottom-10 left-1/2 flex min-w-[211px] -translate-x-1/2 items-center justify-center rounded-[60px] bg-white px-4 py-3 text-center shadow-lg"
        >
          <div>
            <p class="font-sans text-[16px] text-black">
              {{ p.founderName || "Christian Züger" }}
            </p>
            <p class="font-sans text-[13px] font-light text-black">
              {{
                t(
                  p.founderRole || {
                    de: "Gründer & Geschäftsführer",
                    en: "Founder & CEO",
                  },
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
