export type BuyerSegment = 'vip' | 'regular' | 'new'
export type BuyerStatus = 'aktif' | 'nonaktif'

export interface BuyerDocument {
  id: number
  type: 'npwp' | 'nik' | 'kontrak' | 'lainnya'
  name: string
  url: string
  uploadedAt: string
}

export interface Buyer {
  id: number
  companyName: string
  address: string
  country: string
  city: string
  postalCode: string
  contactPerson: string
  email: string
  phone: string
  website?: string
  segment: BuyerSegment
  status: BuyerStatus
  creditLimit: number
  paymentTerms: string
  npwp?: string
  nik?: string
  notes?: string
  documents: BuyerDocument[]
  totalOrders: number
  totalSpent: number
  createdAt: string
  updatedAt: string
}

export interface BuyerFormData {
  companyName: string
  address: string
  country: string
  city: string
  postalCode: string
  contactPerson: string
  email: string
  phone: string
  website?: string
  segment: BuyerSegment
  status: BuyerStatus
  creditLimit: number
  paymentTerms: string
  npwp?: string
  nik?: string
  notes?: string
}
