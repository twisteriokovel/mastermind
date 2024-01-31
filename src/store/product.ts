import { defineStore } from 'pinia'
import {
  getProduct,
  getProductBasePrices,
  getProductOptionPrices,
  createShippingQuote,
  createRequirements,
  createFile,
} from '@/services/api'
import type {
  Product,
  BasePrice,
  ProductBasePrices,
  ProductOption,
  ProductOptionGroup,
  ProductOptionPricePayload,
  RequirementsPayload,
  OptionPrice,
  ShippingOption,
  Address,
} from '@/models'
import {
  RUNSIZE_GROUP,
  TURN_AROUND_TIME_GROUP,
  COLORSPEC_GROUP,
  TEST_FILE_URL,
} from '@/utils/constants'
import { isRunsizeInRange, toCurrency } from '@/utils/functions'

interface ProductStore {
  productId: string
  productDetails: Product | null
  productBasePrices: ProductBasePrices | null
  selectedConfiguration: Record<string, ProductOption>
  additionalOptionPrices: Record<string, OptionPrice[]>
  selectedRunsize: ProductOption | null
  shippingOptions: ShippingOption[] | null
  selectedShippingOption: ShippingOption | null
  fileRequirements: Record<string, string>[]
  fileData: Record<string, string> | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductStore => ({
    productId: '',
    productDetails: null,
    productBasePrices: null,
    selectedConfiguration: {},
    additionalOptionPrices: {},
    selectedRunsize: null,
    shippingOptions: null,
    selectedShippingOption: null,
    fileRequirements: [],
    fileData: null,
  }),

  getters: {
    optionsGroupsList(): ProductOptionGroup[] {
      return (
        this.productDetails?.product_option_groups.filter(
          ({ product_option_group_name }) =>
            product_option_group_name !== RUNSIZE_GROUP &&
            product_option_group_name !== TURN_AROUND_TIME_GROUP,
        ) ?? []
      )
    },
    runsizeOptionsGroup(): ProductOptionGroup | null {
      return (
        this.productDetails?.product_option_groups.find(
          ({ product_option_group_name }) =>
            product_option_group_name === RUNSIZE_GROUP,
        ) ?? null
      )
    },
    colorspecOptionsGroup(): ProductOptionGroup | null {
      return (
        this.productDetails?.product_option_groups.find(
          ({ product_option_group_name }) =>
            product_option_group_name === COLORSPEC_GROUP,
        ) ?? null
      )
    },
    trunAroundTimeOptionsGroup(): ProductOptionGroup | null {
      return (
        this.productDetails?.product_option_groups.find(
          ({ product_option_group_name }) =>
            product_option_group_name === TURN_AROUND_TIME_GROUP,
        ) ?? null
      )
    },
    selectedColorspec(): ProductOption | null {
      return (
        this.colorspecOptionsGroup &&
        this.selectedConfiguration[
          this.colorspecOptionsGroup?.product_option_group_uuid
        ]
      )
    },
    calculatedTurnAroundTime(): ProductOption | undefined {
      if (!this.trunAroundTimeOptionsGroup) {
        return
      }

      return this.trunAroundTimeOptionsGroup.options.find(
        ({ colorspec_uuid, runsize_uuid }) =>
          colorspec_uuid === this.selectedColorspec?.option_uuid &&
          runsize_uuid === this.selectedRunsize?.option_uuid,
      )
    },
    productBasePrice(): BasePrice | undefined {
      if (!this.selectedRunsize && !this.selectedColorspec) {
        return
      }

      return this.productBasePrices?.entities.find(
        ({ colorspec_uuid, runsize_uuid }) =>
          colorspec_uuid === this.selectedColorspec?.option_uuid &&
          runsize_uuid === this.selectedRunsize?.option_uuid,
      )
    },
    productOptionPrice(): number {
      if (!this.selectedRunsize) {
        return 0
      }

      return Object.keys(this.additionalOptionPrices).reduce((acc, item) => {
        const prices = this.additionalOptionPrices[item]
        if (!prices.length) {
          return acc
        }

        const priceItem = prices.find(({ startqty, endqty }) =>
          isRunsizeInRange(
            this.selectedRunsize?.option_name ?? '',
            startqty,
            endqty,
          ),
        )
        return acc + Number(priceItem?.price)
      }, 0)
    },
    totalPrice(): string {
      if (!this.productBasePrice) {
        return ''
      }

      const total =
        Number(this.productBasePrice?.product_baseprice ?? 0) +
        this.productOptionPrice +
        Number(this.selectedShippingOption?.service_price ?? 0)
      return toCurrency(total)
    },
    mappedProductGroups(): Record<string, ProductOptionGroup> {
      return (
        this.productDetails?.product_option_groups.reduce<
          Record<string, ProductOptionGroup>
        >((acc, el) => {
          acc[el.product_option_group_uuid] = el
          return acc
        }, {}) ?? {}
      )
    },
    payloadSelectedOptions(): string[] {
      const selectedOptions = Object.values(this.selectedConfiguration).map(
        ({ option_uuid }) => option_uuid,
      )

      return [...selectedOptions, this.selectedRunsize?.option_uuid ?? '']
    },
  },

  actions: {
    async uploadFile() {
      try {
        const payload = {
          path: [TEST_FILE_URL],
          preflight: true,
        }
        const { data } = await createFile(payload)
        this.fileData = data.files[0]
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProductDetails(id: string) {
      this.productId = id
      try {
        const { data } = await getProduct(id)
        this.productDetails = data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProductBasePrices(id: string) {
      try {
        const { data } = await getProductBasePrices(id)
        this.productBasePrices = data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchProductOptionPrices(payload: ProductOptionPricePayload) {
      try {
        const { data } = await getProductOptionPrices(payload)
        this.additionalOptionPrices[payload.groupUuid] = data.entities
      } catch (error) {
        console.error(error)
      }
    },
    async createRequirements() {
      try {
        const payload: RequirementsPayload = {
          products: [
            {
              product_uuid: this.productId,
              option_uuids: this.payloadSelectedOptions,
            },
          ],
        }
        const { data } = await createRequirements(payload)
        this.fileRequirements = data.entities[0].file_requirements
      } catch (error) {
        console.error(error)
      }
    },
    async createShippingQuote(shipping_address: Address) {
      try {
        const payload = {
          product_info: {
            product_uuid: this.productId,
            runsize_uuid: this.selectedRunsize?.option_uuid ?? '',
            turnaround_uuid: this.calculatedTurnAroundTime?.option_uuid ?? '',
            colorspec_uuid: this.selectedColorspec?.option_uuid ?? '',
            option_uuids: this.payloadSelectedOptions,
          },
          shipping_address,
        }
        const { data } = await createShippingQuote(payload)
        this.shippingOptions = data.job.facilities[0].shipping_options
      } catch (error) {
        console.error(error)
      }
    },
  },
})
