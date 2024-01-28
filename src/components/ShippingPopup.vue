<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    header="Get available shippings"
    :style="{ width: '40rem' }"
    class="relative"
  >
    <div v-if="isLoading" class="">
      <ProgressBar mode="indeterminate" style="height: 4px" />
    </div>
    <div v-else-if="shippingOptions">
      <h2 class="text-md font-semibold mb-2">Select shipping option</h2>

      <!-- Shipping Options -->
      <div
        v-for="option in shippingOptions"
        :key="option.service_code"
        class="mb-6 flex items-center"
      >
        <RadioButton
          :id="option.service_code"
          v-model="selectedShippingOption"
          name="shipping"
          :value="option"
          :input-id="`id-${option.service_code}`"
          class="mr-2"
          @change="isVisible = false"
        />
        <label
          :for="`id-${option.service_code}`"
          class="text-gray-700 w-full flex justify-between"
        >
          <span>{{ option.service_name }}</span>
          <span class="font-semibold">{{
            toCurrency(option.service_price)
          }}</span>
        </label>
      </div>
    </div>
    <template v-else>
      <div class="flex justify-between items-center mb-4 pt-1">
        <span class="p-text-secondary block">
          Enter your delivery address:
        </span>

        <div class="flex items-center">
          <label class="text-sm mr-3" for="useDefault">
            Use default address
          </label>
          <Checkbox v-model="isUsedDefault" binary input-id="useDefault" />
        </div>
      </div>

      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div>
          <label for="address" class="font-semibold w-6rem">Address</label>
          <InputText
            id="address"
            v-model="formData.address"
            class="w-full block"
            autocomplete="off"
            :readonly="isUsedDefault"
          />
        </div>
        <div>
          <label for="address2" class="font-semibold w-6rem">
            Address (additional line)
          </label>
          <InputText
            id="address2"
            v-model="formData.address2"
            class="w-full block"
            autocomplete="off"
            :readonly="isUsedDefault"
          />
        </div>
        <div>
          <label for="city" class="font-semibold w-6rem">City</label>
          <InputText
            id="city"
            v-model="formData.city"
            class="w-full block"
            autocomplete="off"
            :readonly="isUsedDefault"
          />
        </div>
        <div>
          <label for="state" class="font-semibold w-6rem">State</label>
          <InputText
            id="state"
            v-model="formData.state"
            class="w-full block"
            autocomplete="off"
            :readonly="isUsedDefault"
          />
        </div>
        <div>
          <label for="country" class="font-semibold w-6rem">Country</label>
          <InputText
            id="country"
            v-model="formData.country"
            class="w-full block"
            autocomplete="off"
            :readonly="isUsedDefault"
          />
        </div>
        <div>
          <label for="zipcode" class="font-semibold w-6rem">Zipcode</label>
          <InputText
            id="zipcode"
            v-model="formData.zipcode"
            class="w-full block"
            autocomplete="off"
            :readonly="isUsedDefault"
          />
        </div>
      </div>
      <div class="flex justify-content-end gap-2 mt-8">
        <Button type="button" @click="getShippings">Get shippings</Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, useModel } from 'vue'
import { storeToRefs } from 'pinia'
import { DEFAULT_ADDRESS } from '@/utils/constants'
import { useProductStore } from '@/store/product'
import { toCurrency } from '@/utils/functions'

const productStore = useProductStore()

const { shippingOptions, selectedShippingOption } = storeToRefs(productStore)
const { createShippingQuote } = productStore

const props = defineProps<{
  modelValue: boolean
}>()

const getDefaultFormData = () => ({
  address: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  zipcode: '',
})

const isVisible = useModel(props, 'modelValue')
const formData = ref(getDefaultFormData())

const isUsedDefault = ref(false)
const isLoading = ref(false)

async function getShippings() {
  isLoading.value = true
  await createShippingQuote(formData.value)
  isLoading.value = false
}

watch(
  () => isUsedDefault.value,
  (val) => {
    if (val) {
      Object.assign(formData.value, DEFAULT_ADDRESS)
    }
  },
)
</script>
