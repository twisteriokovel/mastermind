import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios'
import { API_BASE_URL, API_PUBLIC_KEY, API_PRIVATE_KEY } from '@/env.const'
import sha256 from 'crypto-js/sha256'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import type {
  ProductOptionPricePayload,
  ShippingQuotePayload,
  RequirementsPayload,
  OrderPayload,
} from '@/models'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

function generateSignature(
  httpMethod: string | undefined,
  key: string,
): string {
  if (!httpMethod) {
    return ''
  }
  const hashedKey = sha256(key).toString()
  return hmacSHA256(httpMethod.toUpperCase(), hashedKey).toString()
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const signature = generateSignature(config.method, API_PRIVATE_KEY)

    if (config.method === 'get' || config.method === 'delete') {
      config.params = {
        ...config.params,
        apikey: API_PUBLIC_KEY,
        signature,
      }
    } else {
      ;(config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${API_PUBLIC_KEY}:${signature}`,
      )
    }

    return config
  },
  (error) => Promise.reject(error),
)

export const ApiService = {
  async get(url: string, options?: AxiosRequestConfig) {
    return axiosInstance.get(url, options)
  },

  post(url: string, data?: unknown, options?: AxiosRequestConfig) {
    return axiosInstance.post(url, data, options)
  },

  patch(url: string, data?: unknown, options?: AxiosRequestConfig) {
    return axiosInstance.patch(url, data, options)
  },

  put(url: string, data?: unknown, options?: AxiosRequestConfig) {
    return axiosInstance.put(url, data, options)
  },

  delete(url: string) {
    return axiosInstance.delete(url)
  },
}

const getProduct = (id: string) =>
  ApiService.get(`/printproducts/products/${id}`)

const getProductBasePrices = (id: string) =>
  ApiService.get(`/printproducts/products/${id}/baseprices`)

const getProductOptionPrices = ({
  productUuid,
  groupUuid,
  optionUuid,
}: ProductOptionPricePayload) =>
  ApiService.get(
    `/printproducts/products/${productUuid}/optiongroups/${groupUuid}/options/${optionUuid}/prices`,
  )

const createShippingQuote = (payload: ShippingQuotePayload) =>
  ApiService.post('/shippingquote', payload)

const createRequirements = (payload: RequirementsPayload) =>
  ApiService.post('/requirements/products', payload)

const createOrder = (payload: OrderPayload) =>
  ApiService.post('/orders ', payload)

export {
  getProduct,
  getProductBasePrices,
  getProductOptionPrices,
  createShippingQuote,
  createRequirements,
  createOrder,
}
