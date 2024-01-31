<template>
  <div>
    <div v-if="orderData">
      <div class="mb-4">
        <p class="font-semibold text-md">Order Status:</p>
        <p class="text-gray-700">{{ orderData.order_status }}</p>
      </div>
      <div class="mb-4">
        <p class="font-semibold text-md">Customer order id:</p>
        <p class="text-gray-700">
          {{ orderData.customer_order_id }}
        </p>
      </div>

      <JobItem v-for="(_, key) in orderData.job_ids" :key="key" :job-id="key" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/store/order'
import JobItem from '@/components/order/JobItem.vue'

const { orderData } = storeToRefs(useOrderStore())
</script>

<script lang="ts">
export default {
  name: 'OrderPage',
}
</script>
