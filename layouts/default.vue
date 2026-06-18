<script setup lang="ts">
  import Navigation from "~/layouts/components/Navigation.vue"
  import Footer from "~/layouts/components/Footer.vue"
</script>

<template>
  <div class="flex min-h-[100dvh] flex-col bg-white text-brand-darkgreen">
    <Navigation />
    <div class="flex-grow">
      <slot />
    </div>
    <Footer />
  </div>
</template>
