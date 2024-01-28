<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="relative container py-8 px-4 flex-1 mx-auto">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/generic/TheHeader.vue'
import TheFooter from '@/components/generic/TheFooter.vue'
</script>
