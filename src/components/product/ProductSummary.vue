<template>
  <div
    v-if="productBasePrice"
    class="fixed bottom-0 w-full left-0 px-8 py-6 border-t bg-white flex items-center justify-between"
  >
    <div class="flex">
      <div class="mr-4">
        <p class="text mr-3">Base price:</p>
        <p class="font-semibold text">
          {{ toCurrency(productBasePrice.product_baseprice) }}
        </p>
      </div>
      <div v-if="productOptionPrice">
        <p class="text mr-3">Options price:</p>
        <p class="font-semibold text">
          {{ toCurrency(productOptionPrice) }}
        </p>
      </div>
      <div v-if="selectedShippingOption">
        <p class="text mr-3">Shipping cost:</p>
        <p class="font-semibold text">
          {{ toCurrency(selectedShippingOption.service_price) }}
        </p>
      </div>
    </div>

    <div class="flex gap-x-4 items-center">
      <div class="flex">
        <p class="text-xl mr-3">Total price:</p>
        <p class="font-semibold text-xl">
          {{ totalPrice }}
        </p>
      </div>
      <Button
        outlined
        :disabled="!calculatedTurnAroundTime"
        @click="$emit('on-get-shippings')"
      >
        Get shippings
      </Button>
      <Button outlined @click="onCreateRequirements">
        Create requirements
      </Button>
      <Button @click="createOrder">Submit order</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'
import { toCurrency } from '@/utils/functions'

const emit = defineEmits<{
  (e: 'on-get-shippings'): void
  (e: 'on-create-requirements'): void
}>()

const productStore = useProductStore()
const {
  productBasePrice,
  productOptionPrice,
  selectedShippingOption,
  calculatedTurnAroundTime,
  totalPrice,
} = storeToRefs(productStore)
const { createRequirements, createOrder } = productStore

function onCreateRequirements() {
  emit('on-create-requirements')
  createRequirements()
}
</script>
