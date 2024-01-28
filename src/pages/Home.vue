<template>
  <div>
    <h1 class="text-xl font-bold">Testing the 4over API</h1>
    <h2 class="mb-8">
      Check
      <a class="text-primary-500" link href="https://api-users.4over.com">
        https://api-users.4over.com/
      </a>
      for more details
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white p-4 shadow-md rounded-md">
        <h2 class="text-xl font-bold mb-2">Get testing product</h2>
        <p class="text-gray-700 mb-4">Capture product and options</p>
        <Button @click="fetchTestingProduct"> Get product </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PRODUCT_UUID } from '@/env.const'
import { useRouter } from 'vue-router'

const router = useRouter()

function fetchTestingProduct() {
  router.push(`/product/${PRODUCT_UUID}`)
}
</script>

<script lang="ts">
export default {
  name: 'HomePage',
}
</script>
