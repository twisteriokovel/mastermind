<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    header="File requirements"
    :style="{ width: '50rem' }"
    class="relative"
  >
    <div>
      <div
        v-for="item in fileRequirements"
        :key="item.file_reason_code_uuid"
        class="mb-6 flex bg-white p-4 shadow-md rounded-md"
      >
        <pre>{{ item }}</pre>
      </div>
    </div>
    <div class="flex justify-content-end gap-2 mt-8">
      <Button
        type="button"
        outlined
        severity="secondary"
        @click="isVisible = false"
      >
        Close
      </Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useModel } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'

const productStore = useProductStore()
const { fileRequirements } = storeToRefs(productStore)

const props = defineProps<{
  modelValue: boolean
}>()

const isVisible = useModel(props, 'modelValue')
</script>
