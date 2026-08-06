<script setup lang="ts">
  import SafeHtml from "~/components/common/SafeHtml.vue"
  import { computed } from "vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  type Block = {
    number: number
    title: I18nString
    description: I18nString
    side: "left" | "right"
  }

  const p = defineProps<{
    title: I18nString
    content: I18nString
    blocks: Block[]
  }>()

  const t = useTranslate()

  const leftBlocks = computed(() => p.blocks.filter((b) => b.side === "left"))
  const rightBlocks = computed(() => p.blocks.filter((b) => b.side === "right"))
</script>

<template>
  <section class="bg-white px-4 py-16 sm:px-6 lg:px-[120px]">
    <div
      class="mx-auto flex max-w-[1272px] flex-col gap-16 rounded-[32px] px-5 py-16 sm:rounded-[70px] sm:px-8 lg:gap-[124px] lg:px-[100px] lg:py-20"
      style="
        background:
          linear-gradient(90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
          linear-gradient(
            90deg,
            #002a35 1.92%,
            #00586a 37.98%,
            #ff6700 73.56%,
            #ff8a00 100%
          );
      "
    >
      <div class="max-w-[945px] space-y-6 text-white">
        <h2
          class="font-sans text-[24px] font-semibold leading-[1.2] sm:text-[28px] lg:text-[36px]"
        >
          {{ t(p.title) }}
        </h2>
        <div
          class="font-sans text-[16px] font-medium leading-[1.26] lg:text-[18px]"
        >
          <SafeHtml :html="t(p.content)" />
        </div>
      </div>

      <div
        class="grid gap-8 xl:grid-cols-[1fr_auto_1fr] xl:items-center xl:gap-8"
      >
        <div
          class="flex min-w-0 flex-col gap-12 text-left text-white lg:gap-[185px] xl:text-right"
        >
          <div v-for="b of leftBlocks" :key="b.number" class="space-y-2">
            <p
              class="break-words font-sans text-[24px] font-normal leading-tight sm:text-[28px] lg:text-[36px]"
            >
              <span class="text-[30px] font-bold sm:text-[40px] lg:text-[44px]">
                {{ b.number }}
              </span>
              {{ t(b.title) }}
            </p>
            <p
              class="max-w-[428px] font-sans text-[16px] font-medium leading-[1.26] lg:text-[18px] xl:ml-auto"
            >
              {{ t(b.description) }}
            </p>
          </div>
        </div>

        <div class="hidden flex-col items-center gap-4 xl:flex">
          <div
            v-for="b of p.blocks"
            :key="`dot-${b.number}`"
            class="flex flex-col items-center"
          >
            <span class="size-[15px] rounded-full bg-white" />
            <span
              v-if="b.number < p.blocks.length"
              class="my-1 h-[136px] w-[3px] bg-white"
            />
          </div>
        </div>

        <div
          class="flex min-w-0 flex-col gap-12 text-left text-white lg:gap-[201px]"
        >
          <div v-for="b of rightBlocks" :key="b.number" class="space-y-2">
            <p
              class="break-words font-sans text-[24px] font-normal leading-tight sm:text-[28px] lg:text-[36px]"
            >
              <span class="text-[30px] font-bold sm:text-[40px] lg:text-[44px]">
                {{ b.number }}
              </span>
              {{ t(b.title) }}
            </p>
            <p
              class="max-w-[507px] font-sans text-[16px] font-medium leading-[1.26] lg:text-[18px]"
            >
              {{ t(b.description) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
