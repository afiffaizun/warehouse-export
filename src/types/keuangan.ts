export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

export type PaymentStatus = 'unpaid' | 'partial' | 'paid'

export interface InvoiceItem {
  id: number
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
}

export interface Invoice {
  id: number
  invoiceNumber: string
  orderId: number
  orderNumber: string
  buyerName: string
  buyerAddress: string
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  paymentStatus: PaymentStatus
  items: InvoiceItem[]
  subtotal: number
  tax: number
  taxRate: number
  total: number
  currency: string
  notes: string
  paidAmount: number
  paidDate?: string
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: number
  paymentNumber: string
  invoiceId: number
  invoiceNumber: string
  orderId: number
  orderNumber: string
  buyerName: string
  amount: number
  paymentMethod: 'bank_transfer' | 'cash' | 'credit' | 'other'
  paymentDate: string
  referenceNumber: string
  notes: string
  createdAt: string
}
