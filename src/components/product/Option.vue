<template>
  <li>
    <RadioButton
      v-model="selectedConfiguration[groupUuid]"
      :input-id="elementId"
      :name="groupUuid"
      :value="option"
      @change="getOptionPrices"
    />
    <label :for="elementId" class="ml-2">{{ option.option_name }}</label>
  </li>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'
import type { ProductOption } from '@/models'

const productStore = useProductStore()
const { selectedConfiguration } = storeToRefs(productStore)
const { fetchProductOptionPrices } = productStore

const props = defineProps<{
  option: ProductOption
  groupUuid: string
}>()

const route = useRoute()

const productId = computed(() => route.params.id as string)

const elementId = computed(() => getCurrentInstance()?.uid.toString())

function getOptionPrices() {
  const payload = {
    groupUuid: props.groupUuid,
    optionUuid: props.option.option_uuid,
    productUuid: productId.value,
  }
  fetchProductOptionPrices(payload)
}
</script>

<script lang="ts">
export default {
  name: 'ProductOption',
}
</script>

<style scoped></style>
