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

    <div>
      <p class="mb-1 text-sm font-semibold">File management</p>

      <div v-if="fileData" class="flex items-center truncate">
        <i class="pi pi-file-pdf mr-1"></i>
        <p>{{ fileData.customer_filename }}</p>
      </div>
      <template v-else>
        <p class="text-sm mb-3">
          Uploading a testing file using the predefined URL
        </p>

        <Button type="button" @click="uploadFile"> Upload file </Button>
      </template>
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
  fileData,
} = storeToRefs(productStore)
const { uploadFile } = productStore
</script>
