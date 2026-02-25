export type ShipmentStatus = 'created' | 'in_transit' | 'arrived' | 'customs' | 'delivered'

export type TransportMode = 'sea' | 'air' | 'land'

export interface ShipmentDocument {
  id: number
  type: 'bl' | 'awb' | 'peb' | 'coo' | 'health_cert' | 'invoice' | 'packing_list'
  name: string
  url: string
  uploadedAt: string
}

export interface Shipment {
  id: number
  shipmentNumber: string
  orderId: number
  orderNumber: string
  buyerName: string
  destinationCountry: string
  destinationPort: string
  transportMode: TransportMode
  carrierName: string
  voyageNumber?: string
  flightNumber?: string
  containerNumber?: string
  blNumber?: string
  awbNumber?: string
  etd: string
  eta: string
  status: ShipmentStatus
  documents: ShipmentDocument[]
  notes: string
  createdAt: string
  updatedAt: string
}
