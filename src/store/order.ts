import { defineStore } from 'pinia'
import { useProductStore } from './product'
import { createOrder, getPaymentProfiles } from '@/services/api'
import type { OrderPayload, PaymentProfile, OrderResponse } from '@/models'
import { SHIP_TO, SHIP_FROM, SHIPPER } from '@/utils/constants'

interface OrderStore {
  paymentProfile: PaymentProfile | null
  orderData: OrderResponse | null
  isProcessingOrder: boolean
}

export const useOrderStore = defineStore('order', {
  state: (): OrderStore => ({
    paymentProfile: null,
    orderData: null,
    isProcessingOrder: false,
  }),

  getters: {},

  actions: {
    async fetchPaymentProfiles() {
      try {
        const { data } = await getPaymentProfiles()
        this.paymentProfile = data.entities[0]
      } catch (error) {
        console.error(error)
      }
    },
    async createOrder() {
      this.isProcessingOrder = true

      const {
        productId,
        selectedRunsize,
        calculatedTurnAroundTime,
        selectedColorspec,
        payloadSelectedOptions,
      } = useProductStore()
      await this.fetchPaymentProfiles()

      try {
        const printJob = {
          product_uuid: productId,
          runsize_uuid: selectedRunsize?.option_uuid ?? '',
          turnaround_uuid: calculatedTurnAroundTime?.option_uuid ?? '',
          colorspec_uuid: selectedColorspec?.option_uuid ?? '',
          option_uuids: payloadSelectedOptions,
          dropship: true,
          skip_files: true,
          ship_to: SHIP_TO,
          ship_from: SHIP_FROM,
          shipper: SHIPPER,
          job_name: 'job001-001',
        }
        const payload: OrderPayload = {
          order_id: 'test001',
          is_test_order: true,
          jobs: [printJob],
          skip_conformation: false,
          payment: {
            profile_token: this.paymentProfile?.profile_token ?? '',
          },
        }
        const { data } = await createOrder(payload)
        this.orderData = data
        this.router.push(`/order/${data.customer_order_id}}`)
      } catch (error) {
        console.error(error)
      } finally {
        this.isProcessingOrder = false
      }
    },
  },
})
