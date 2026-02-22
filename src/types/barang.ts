export type ProductStatus = 'aktif' | 'nonaktif' | 'discontinue'

export type ProductCategory = 
  | 'batik'
  | 'kopi'
  | 'minyak-kelapa'
  | 'karet'
  | 'rempah'
  | 'tekstil'
  | 'kerajinan'
  | 'lainnya'

export interface ProductImage {
  id: number
  url: string
  isPrimary: boolean
}

export interface Product {
  id: number
  name: string
  sku: string
  category: ProductCategory
  unit: string
  description: string
  hsCode: string
  priceIdr: number
  priceUsd: number
  images: ProductImage[]
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

export interface ProductFormData {
  name: string
  sku: string
  category: ProductCategory
  unit: string
  description: string
  hsCode: string
  priceIdr: number
  priceUsd: number
  status: ProductStatus
}
