export interface Product {
  product_code: string
  product_description: string
  product_option_groups: ProductOptionGroup[]
  product_uuid?: string
}

export interface ProductOptionGroup {
  maxoccurs: string
  minoccurs: string
  options: ProductOption[]
  product_option_group_name: string
  product_option_group_uuid: string
  validator: null
}

export interface ProductOption {
  capi_description?: string
  capi_name?: string
  colorspec?: string
  colorspec_uuid?: string
  runsize?: string
  runsize_uuid?: string
  option_constraints: null
  option_description: string
  option_name: string
  option_prices: string
  option_uuid: string
}

export interface ProductBasePrices {
  currentPage: number
  maximumPages: number
  totalResults: number
  entities: BasePrice[]
}

export interface BasePrice {
  base_price_uuid: string
  can_group_ship: boolean
  colorspec: string
  colorspec_uuid: string
  product_baseprice: string
  product_uuid: string
  runsize: string
  runsize_uuid: string
}

export interface OptionPrice {
  endqty: number
  is_flat_fee: boolean
  is_percentage: boolean | null
  option_name: number
  option_price_uuid: number
  price: number
  price_per_qty: string | null
  qty: string | null
  startqty: number
}

export interface ProductOptionPricePayload {
  productUuid: string
  groupUuid: string
  optionUuid: string
}

export interface Address {
  address: string
  address2: string
  city: string
  state: string
  country: string
  zipcode: string
}

export interface UserOrderDetails extends Address {
  company?: string
  firstname?: string
  lastname?: string
  email: string
  phone: string
}

export interface ShippingQuotePayload {
  product_info: {
    product_uuid: string
    runsize_uuid: string
    turnaround_uuid: string
    colorspec_uuid: string
    option_uuids: string[]
    sets?: number
  }
  shipping_address: Address
}

export interface RequirementsPayload {
  products: {
    product_uuid: string
    option_uuids: string[]
  }[]
}

export interface PrintJob {
  product_uuid: string
  runsize_uuid: string
  colorspec_uuid: string
  option_uuids: string[]
  turnaroundtime_uuid?: string
  dropship: boolean
  skip_files?: boolean
  ship_to: UserOrderDetails
  ship_from: UserOrderDetails
}

export interface OrderPayload {
  order_id: string
  is_test_order?: boolean
  coupon_code?: string
  skip_conformation?: boolean
  jobs: PrintJob[]
  payment: {
    profile_token: string
  }
}

export interface ShippingOption {
  service_code: string
  service_name: string
  service_price: string
  in_hand_delivery: string
  shipping_time: number
}

export interface PaymentProfile {
  profile_token: string
  last_four: string
  type: string
}

export interface PaymentProvider {
  payment_provider_uuid: string
  payment_provider: string
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export interface Currency {
  currency_code: string
  currency: string
  currency_number: string
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export interface User {
  user_uuid: string
  first_name: string
  last_name: string
  email: string
  user_notes: string
  created_at: string
  updated_at: string
  deleted_at: string
  organizations: string
  logins: string
  token: string
  timestamp: string
  current_organization_uuid: string
}

export interface Organization {
  organization_uuid: string
  organization_name: string
  organization_description: string
  job_code_prefix: string
  is_public_organization: boolean
  primary_contact_user: User | string
}

export interface PaymentResponse {
  payment_uuid: string
  payment_provider: PaymentProvider
  requested_amount: string
  requested_refund_amount: string | null
  requested_currency: Currency
  request_transaction_code: string | null
  request_data: string
  requested_at: string
  response_transaction_code: string
  response_data: string | null
  responded_at: string
  authorization_code: string | null
  authorized_at: string
  authorized_payment_amount: string
  authorized_refund_amount: number
  authorized_currency: Currency
  paying_organization: Organization
  paying_user: User
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export interface JobDetails {
  customer_job_id: string
  status: number
  messages: string[]
}

export interface OrderResponse {
  order_status: string
  customer_order_id: string
  job_ids: Record<string, JobDetails>
  payment_response: PaymentResponse
  payment_type: string
  errors: string[]
}

export interface JobStatus {
  status_code_uuid: string
  status: string
  date_set: string
}

export interface FileUploadPayload {
  path: string[]
  preflight: boolean
}
