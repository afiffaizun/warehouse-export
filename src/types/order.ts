export type OrderStatus = 'draft' | 'confirmed' | 'packing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'

export type PaymentStatus = 'unpaid' | 'partial' | 'paid'

export type Incoterms = 'fob' | 'cif' | 'exw' | 'dap' | 'ddp' | 'cfr'

export interface OrderItem {
  id: number
  productId: number
  productName: string
  productSku: string
  quantity: number
  unit: string
  priceUsd: number
  totalUsd: number
}

export interface Order {
  id: number
  orderNumber: string
  buyerId: number
  buyerName: string
  buyerCountry: string
  items: OrderItem[]
  subtotalUsd: number
  shippingCostUsd: number
  taxUsd: number
  totalUsd: number
  incoterms: Incoterms
  status: OrderStatus
  paymentStatus: PaymentStatus
  notes: string
  createdAt: string
  updatedAt: string
  confirmedAt?: string
  shippedAt?: string
  deliveredAt?: string
}

export interface OrderFormData {
  buyerId: number
  items: {
    productId: number
    quantity: number
  }[]
  incoterms: Incoterms
  shippingCostUsd: number
  taxUsd: number
  notes: string
}
