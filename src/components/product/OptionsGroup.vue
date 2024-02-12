<template>
  <div
    class="p-4 shadow-md rounded-md max-w-md"
    :class="[
      group.product_option_group_name === 'Colorspec'
        ? 'order-1 bg-red-50'
        : 'order-2 bg-white',
    ]"
  >
    <h2 class="text-md font-bold mb-2">
      {{ group.product_option_group_name }}
    </h2>

    <ul class="flex flex-col gap-y-1">
      <Option
        v-for="option in preparedOptionsList"
        :key="option.option_uuid"
        :option="option"
        :group-uuid="group.product_option_group_uuid"
      />
    </ul>

    <div v-if="isAvailableShowMoreBtn" class="text-center mt-4">
      <Button size="small" text @click="isShownFullList = !isShownFullList">
        Show {{ isShownFullList ? 'less' : 'more' }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Option from './Option.vue'
import type { ProductOptionGroup } from '@/models'

const DEFAULT_SHOWN_ITEMS_AMOUNT = 5

const props = defineProps<{
  group: ProductOptionGroup
}>()

const isShownFullList = ref(false)

const isAvailableShowMoreBtn = computed(
  () => props.group.options.length > DEFAULT_SHOWN_ITEMS_AMOUNT,
)

const preparedOptionsList = computed(() =>
  isShownFullList.value
    ? props.group.options
    : props.group.options?.slice(0, DEFAULT_SHOWN_ITEMS_AMOUNT),
)
</script>
