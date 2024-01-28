<template>
  <div class="pb-10">
    <h2 class="text-xl font-bold mb-8">Product Details</h2>

    <p v-if="isLoading">
      Loading...
      <ProgressBar mode="indeterminate" style="height: 4px"></ProgressBar>
    </p>
    <div v-else-if="productDetails && !isLoading">
      <div class="mb-4">
        <p class="font-semibold text-md">Name:</p>
        <p class="text-gray-700">{{ productDetails.product_code }}</p>
      </div>
      <div class="mb-4">
        <p class="font-semibold text-md">Description:</p>
        <p class="text-gray-700">
          {{ productDetails.product_description }}
        </p>
      </div>

      <div class="grid grid-flow-col gap-8">
        <div v-if="optionsGroupsList.length" class="grid grid-cols-4 gap-3">
          <OptionsGroup
            v-for="group in optionsGroupsList"
            :key="group.product_option_group_uuid"
            :group="group"
          />
        </div>

        <SelectedConfiguration />
      </div>
    </div>
    <div v-else>No results</div>

    <ProductSummary
      @on-get-shippings="toggleShippingPopup(true)"
      @on-create-requirements="toggleRequirementsPopup(true)"
    />
    <ShippingPopup v-model="isVisibleShippingPopup" />
    <RequirementsPopup v-model="isVisibleRequirementsPopup" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import OptionsGroup from '@/components/product/OptionsGroup.vue'
import SelectedConfiguration from '@/components/product/SelectedConfiguration.vue'
import ProductSummary from '@/components/product/ProductSummary.vue'
import ShippingPopup from '@/components/ShippingPopup.vue'
import RequirementsPopup from '@/components/RequirementsPopup.vue'
import { useProductStore } from '@/store/product'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useProductStore()
const { productDetails, optionsGroupsList } = storeToRefs(store)
const { fetchProductBasePrices, fetchProductDetails } = store

const productId = computed(() => route.params.id as string)

const isLoading = ref(false)

const isVisibleShippingPopup = ref(false)
const isVisibleRequirementsPopup = ref(false)

function toggleShippingPopup(value: boolean) {
  isVisibleShippingPopup.value = value
}

function toggleRequirementsPopup(value: boolean) {
  isVisibleRequirementsPopup.value = value
}

onBeforeMount(async () => {
  isLoading.value = true
  await Promise.allSettled([
    fetchProductBasePrices(productId.value),
    fetchProductDetails(productId.value),
  ])
  isLoading.value = false
})
</script>

<script lang="ts">
export default {
  name: 'ProductPage',
}
</script>
