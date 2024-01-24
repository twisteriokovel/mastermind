<template>
  <div>
    {{ app }}
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const app = ref('Hahah')
</script>

<style scoped></style>
