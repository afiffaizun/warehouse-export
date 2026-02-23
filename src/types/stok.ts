export type MutationType = 'penerimaan' | 'pengeluaran' | 'transfer' | 'adjustment'
export type MutationStatus = 'pending' | 'completed' | 'cancelled'

export interface Warehouse {
  id: number
  code: string
  name: string
  location: string
}

export interface StockItem {
  id: number
  productId: number
  productName: string
  productSku: string
  warehouseId: number
  warehouseName: string
  quantity: number
  minStock: number
  maxStock: number
  unit: string
  batchNumber?: string
  expiredDate?: string
}

export interface StockMutation {
  id: number
  type: MutationType
  referenceNumber: string
  productId: number
  productName: string
  productSku: string
  warehouseFrom?: number
  warehouseTo?: number
  warehouseNameFrom?: string
  warehouseNameTo?: string
  quantity: number
  unit: string
  status: MutationStatus
  notes: string
  createdBy: string
  createdAt: string
}

export interface StockFormData {
  productId: number
  warehouseId: number
  quantity: number
  notes: string
  batchNumber?: string
  expiredDate?: string
}

export interface TransferFormData {
  productId: number
  warehouseFrom: number
  warehouseTo: number
  quantity: number
  notes: string
}
