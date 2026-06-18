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
  <section class="bg-white px-6 py-16 lg:px-[120px]">
    <div
      class="mx-auto flex max-w-[1272px] flex-col gap-16 rounded-[70px] px-8 py-16 lg:gap-[124px] lg:px-[100px] lg:py-20"
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
          class="font-sans text-[28px] font-semibold leading-[1.2] lg:text-[36px]"
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
        class="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8"
      >
        <div class="flex flex-col gap-12 text-right text-white lg:gap-[185px]">
          <div v-for="b of leftBlocks" :key="b.number" class="space-y-2">
            <p
              class="font-sans text-[28px] font-normal leading-tight lg:text-[36px]"
            >
              <span class="text-[40px] font-bold lg:text-[44px]">
                {{ b.number }}
              </span>
              {{ t(b.title) }}
            </p>
            <p
              class="ml-auto max-w-[428px] font-sans text-[16px] font-medium leading-[1.26] lg:text-[18px]"
            >
              {{ t(b.description) }}
            </p>
          </div>
        </div>

        <div class="hidden flex-col items-center gap-4 lg:flex">
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

        <div class="flex flex-col gap-12 text-left text-white lg:gap-[201px]">
          <div v-for="b of rightBlocks" :key="b.number" class="space-y-2">
            <p
              class="font-sans text-[28px] font-normal leading-tight lg:text-[36px]"
            >
              <span class="text-[40px] font-bold lg:text-[44px]">
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
