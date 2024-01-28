<template>
  <div class="w-80">
    <p class="font-semibold text-md mb-8">Selected product configuration</p>

    <ul class="mb-8">
      <li
        v-for="group in mappedProductGroups"
        :key="group.product_option_group_uuid"
        class="mb-2"
      >
        <p class="text-sm">{{ group.product_option_group_name }}:</p>
        <p class="text-sm font-semibold text-gray-700">
          {{
            selectedConfiguration[group.product_option_group_uuid]?.option_name
          }}
        </p>
      </li>
    </ul>

    <div v-if="runsizeOptionsGroup" class="mb-6">
      <p class="mb-1 text-sm font-semibold">
        {{ runsizeOptionsGroup.product_option_group_name }}
      </p>
      <Dropdown
        v-model="selectedRunsize"
        input-id="base-price"
        :options="runsizeOptionsGroup.options"
        option-label="option_name"
        class="w-full"
        placeholder="Select runsize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'

const productStore = useProductStore()
const {
  mappedProductGroups,
  selectedConfiguration,
  runsizeOptionsGroup,
  selectedRunsize,
} = storeToRefs(productStore)
</script>
