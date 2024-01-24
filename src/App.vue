<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from '@/components/generic/TheHeader.vue'
import TheFooter from '@/components/generic/TheFooter.vue'
</script>
