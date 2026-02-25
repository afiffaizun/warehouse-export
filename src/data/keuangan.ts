import type { Invoice, InvoiceStatus, Payment, PaymentStatus } from '@/types/keuangan'

export const invoiceStatusOptions: { value: InvoiceStatus; label: string; color: string }[] = [
  { value: 'draft', label: 'Draft', color: 'gray' },
  { value: 'sent', label: 'Sent', color: 'blue' },
  { value: 'paid', label: 'Paid', color: 'emerald' },
  { value: 'overdue', label: 'Overdue', color: 'red' },
  { value: 'cancelled', label: 'Cancelled', color: 'slate' }
]

export const paymentStatusOptions: { value: PaymentStatus; label: string; color: string }[] = [
  { value: 'unpaid', label: 'Unpaid', color: 'red' },
  { value: 'partial', label: 'Partial', color: 'amber' },
  { value: 'paid', label: 'Paid', color: 'emerald' }
]

export const paymentMethods: { value: string; label: string }[] = [
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash', label: 'Cash' },
  { value: 'credit', label: 'Credit' },
  { value: 'other', label: 'Other' }
]

const mockInvoiceItems1 = [
  { id: 1, description: 'Premium Coffee Beans Grade A', quantity: 1000, unit: 'kg', unitPrice: 12.50, totalPrice: 12500 },
  { id: 2, description: 'Premium Coffee Beans Grade B', quantity: 500, unit: 'kg', unitPrice: 8.75, totalPrice: 4375 },
  { id: 3, description: 'Packaging - 500g bags', quantity: 1500, unit: 'pcs', unitPrice: 0.75, totalPrice: 1125 }
]

const mockInvoiceItems2 = [
  { id: 1, description: 'Organic Black Tea', quantity: 2000, unit: 'kg', unitPrice: 8.00, totalPrice: 16000 },
  { id: 2, description: 'Green Tea Premium', quantity: 1000, unit: 'kg', unitPrice: 15.00, totalPrice: 15000 }
]

const mockInvoiceItems3 = [
  { id: 1, description: 'Palm Oil - Crude', quantity: 50000, unit: 'kg', unitPrice: 0.85, totalPrice: 42500 }
]

const mockInvoiceItems4 = [
  { id: 1, description: 'Cocoa Beans - Premium', quantity: 3000, unit: 'kg', unitPrice: 3.20, totalPrice: 9600 },
  { id: 2, description: 'Cocoa Butter', quantity: 500, unit: 'kg', unitPrice: 8.50, totalPrice: 4250 }
]

const mockInvoiceItems5 = [
  { id: 1, description: 'Vanilla Beans - Grade A', quantity: 200, unit: 'kg', unitPrice: 150.00, totalPrice: 30000 },
  { id: 2, description: 'Vanilla Beans - Grade B', quantity: 100, unit: 'kg', unitPrice: 80.00, totalPrice: 8000 }
]

const mockInvoiceItems6 = [
  { id: 1, description: 'Cinnamon Sticks', quantity: 5000, unit: 'kg', unitPrice: 4.50, totalPrice: 22500 },
  { id: 2, description: 'Ground Cinnamon', quantity: 1000, unit: 'kg', unitPrice: 6.00, totalPrice: 6000 }
]

export const mockInvoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-001',
    orderId: 2,
    orderNumber: 'SO-2024-002',
    buyerName: 'Global Trading Pte Ltd',
    buyerAddress: '123 Trade Avenue, Singapore 018956',
    issueDate: '2024-01-15',
    dueDate: '2024-02-14',
    status: 'paid',
    paymentStatus: 'paid',
    items: mockInvoiceItems1,
    subtotal: 18000,
    tax: 1800,
    taxRate: 10,
    total: 19800,
    currency: 'USD',
    notes: 'Payment received via bank transfer',
    paidAmount: 19800,
    paidDate: '2024-02-10',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-10T14:00:00Z'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-002',
    orderId: 3,
    orderNumber: 'SO-2024-003',
    buyerName: 'Tokyo Imports Co',
    buyerAddress: '456 Import Street, Tokyo 100-0001, Japan',
    issueDate: '2024-01-20',
    dueDate: '2024-02-19',
    status: 'sent',
    paymentStatus: 'unpaid',
    items: mockInvoiceItems2,
    subtotal: 31000,
    tax: 3100,
    taxRate: 10,
    total: 34100,
    currency: 'USD',
    notes: 'Shipment in transit',
    paidAmount: 0,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 3,
    invoiceNumber: 'INV-2024-003',
    orderId: 4,
    orderNumber: 'SO-2024-004',
    buyerName: 'Seoul Distributors Inc',
    buyerAddress: '789 Distribution Road, Seoul 06234, South Korea',
    issueDate: '2024-01-25',
    dueDate: '2024-02-24',
    status: 'sent',
    paymentStatus: 'partial',
    items: mockInvoiceItems3,
    subtotal: 42500,
    tax: 4250,
    taxRate: 10,
    total: 46750,
    currency: 'USD',
    notes: 'Partial payment received',
    paidAmount: 20000,
    paidDate: '2024-02-05',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-02-05T14:00:00Z'
  },
  {
    id: 4,
    invoiceNumber: 'INV-2024-004',
    orderId: 6,
    orderNumber: 'SO-2024-006',
    buyerName: 'Sydney Merchants Pty',
    buyerAddress: '321 Merchant Blvd, Sydney NSW 2000, Australia',
    issueDate: '2024-01-10',
    dueDate: '2024-02-09',
    status: 'overdue',
    paymentStatus: 'unpaid',
    items: mockInvoiceItems4,
    subtotal: 13850,
    tax: 1385,
    taxRate: 10,
    total: 15235,
    currency: 'USD',
    notes: 'Payment overdue - reminder sent',
    paidAmount: 0,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-02-10T09:00:00Z'
  },
  {
    id: 5,
    invoiceNumber: 'INV-2024-005',
    orderId: 1,
    orderNumber: 'SO-2024-001',
    buyerName: 'ABC Corporation',
    buyerAddress: '555 Business Park, New York, NY 10001, USA',
    issueDate: '2024-01-05',
    dueDate: '2024-02-04',
    status: 'paid',
    paymentStatus: 'paid',
    items: mockInvoiceItems5,
    subtotal: 38000,
    tax: 3800,
    taxRate: 10,
    total: 41800,
    currency: 'USD',
    notes: 'Full payment received',
    paidAmount: 41800,
    paidDate: '2024-01-25',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-25T11:00:00Z'
  },
  {
    id: 6,
    invoiceNumber: 'INV-2024-006',
    orderId: 8,
    orderNumber: 'SO-2024-008',
    buyerName: 'ABC Corporation',
    buyerAddress: '555 Business Park, Los Angeles, CA 90001, USA',
    issueDate: '2024-02-01',
    dueDate: '2024-03-02',
    status: 'draft',
    paymentStatus: 'unpaid',
    items: mockInvoiceItems6,
    subtotal: 28500,
    tax: 2850,
    taxRate: 10,
    total: 31350,
    currency: 'USD',
    notes: 'Draft invoice - awaiting approval',
    paidAmount: 0,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  }
]

export const mockPayments: Payment[] = [
  {
    id: 1,
    paymentNumber: 'PAY-2024-001',
    invoiceId: 1,
    invoiceNumber: 'INV-2024-001',
    orderId: 2,
    orderNumber: 'SO-2024-002',
    buyerName: 'Global Trading Pte Ltd',
    amount: 19800,
    paymentMethod: 'bank_transfer',
    paymentDate: '2024-02-10',
    referenceNumber: 'TRF-20240210-001',
    notes: 'Full payment received',
    createdAt: '2024-02-10T14:00:00Z'
  },
  {
    id: 2,
    paymentNumber: 'PAY-2024-002',
    invoiceId: 3,
    invoiceNumber: 'INV-2024-003',
    orderId: 4,
    orderNumber: 'SO-2024-004',
    buyerName: 'Seoul Distributors Inc',
    amount: 20000,
    paymentMethod: 'bank_transfer',
    paymentDate: '2024-02-05',
    referenceNumber: 'TRF-20240205-002',
    notes: 'First installment payment',
    createdAt: '2024-02-05T14:00:00Z'
  },
  {
    id: 3,
    paymentNumber: 'PAY-2024-003',
    invoiceId: 5,
    invoiceNumber: 'INV-2024-005',
    orderId: 1,
    orderNumber: 'SO-2024-001',
    buyerName: 'ABC Corporation',
    amount: 41800,
    paymentMethod: 'bank_transfer',
    paymentDate: '2024-01-25',
    referenceNumber: 'TRF-20240125-003',
    notes: 'Full payment received',
    createdAt: '2024-01-25T11:00:00Z'
  }
]

export const getInvoiceById = (id: number): Invoice | undefined => {
  return mockInvoices.find(i => i.id === id)
}

export const getInvoiceStatusInfo = (status: InvoiceStatus) => {
  const found = invoiceStatusOptions.find(s => s.value === status)
  return found || { value: status, label: status, color: 'gray' }
}

export const getPaymentStatusInfo = (status: PaymentStatus) => {
  const found = paymentStatusOptions.find(s => s.value === status)
  return found || { value: status, label: status, color: 'gray' }
}

export const getPaymentMethodLabel = (method: string) => {
  const found = paymentMethods.find(m => m.value === method)
  return found ? found.label : method
}

export const getTotalReceivable = (): number => {
  return mockInvoices
    .filter(i => i.paymentStatus !== 'paid')
    .reduce((sum, i) => sum + (i.total - i.paidAmount), 0)
}

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export const getTotalPaid = (): number => {
  return mockInvoices.reduce((sum, i) => sum + i.paidAmount, 0)
}
