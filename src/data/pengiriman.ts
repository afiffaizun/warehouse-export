import type { Shipment, ShipmentStatus, TransportMode } from '@/types/pengiriman'

export const transportModes: { value: TransportMode; label: string }[] = [
  { value: 'sea', label: 'Sea Freight' },
  { value: 'air', label: 'Air Freight' },
  { value: 'land', label: 'Land Freight' }
]

export const statusOptions: { value: ShipmentStatus; label: string; color: string }[] = [
  { value: 'created', label: 'Created', color: 'gray' },
  { value: 'in_transit', label: 'In Transit', color: 'cyan' },
  { value: 'arrived', label: 'Arrived', color: 'amber' },
  { value: 'customs', label: 'Customs Clearance', color: 'violet' },
  { value: 'delivered', label: 'Delivered', color: 'emerald' }
]

export const mockShipments: Shipment[] = [
  {
    id: 1,
    shipmentNumber: 'SHP-2024-001',
    orderId: 2,
    orderNumber: 'SO-2024-002',
    buyerName: 'Global Trading Pte Ltd',
    destinationCountry: 'Singapore',
    destinationPort: 'Port of Singapore',
    transportMode: 'sea',
    carrierName: 'Maersk Line',
    voyageNumber: 'MAERSK-8847',
    containerNumber: 'MSKU-123456-7',
    blNumber: 'BL-SIN-2024-001',
    etd: '2024-02-15',
    eta: '2024-02-22',
    status: 'delivered',
    documents: [
      { id: 1, type: 'bl', name: 'Bill of Lading', url: '#', uploadedAt: '2024-02-14T10:00:00Z' },
      { id: 2, type: 'peb', name: 'PEB Export', url: '#', uploadedAt: '2024-02-14T10:00:00Z' }
    ],
    notes: 'Container arrived safely',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-22T14:00:00Z'
  },
  {
    id: 2,
    shipmentNumber: 'SHP-2024-002',
    orderId: 3,
    orderNumber: 'SO-2024-003',
    buyerName: 'Tokyo Imports Co',
    destinationCountry: 'Japan',
    destinationPort: 'Port of Tokyo',
    transportMode: 'sea',
    carrierName: 'NYK Line',
    voyageNumber: 'NYK-2024-0156',
    containerNumber: 'NYKU-789012-3',
    blNumber: 'BL-TKY-2024-002',
    etd: '2024-02-18',
    eta: '2024-02-25',
    status: 'in_transit',
    documents: [
      { id: 1, type: 'bl', name: 'Bill of Lading', url: '#', uploadedAt: '2024-02-17T10:00:00Z' }
    ],
    notes: 'In transit to Tokyo',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-19T08:00:00Z'
  },
  {
    id: 3,
    shipmentNumber: 'SHP-2024-003',
    orderId: 4,
    orderNumber: 'SO-2024-004',
    buyerName: 'Seoul Distributors Inc',
    destinationCountry: 'South Korea',
    destinationPort: 'Port of Busan',
    transportMode: 'sea',
    carrierName: 'Evergreen Marine',
    voyageNumber: 'EGL-2024-0089',
    containerNumber: 'EGLV-234567-8',
    etd: '2024-02-20',
    eta: '2024-02-27',
    status: 'created',
    documents: [],
    notes: 'Awaiting container loading',
    createdAt: '2024-02-18T10:00:00Z',
    updatedAt: '2024-02-18T10:00:00Z'
  },
  {
    id: 4,
    shipmentNumber: 'SHP-2024-004',
    orderId: 6,
    orderNumber: 'SO-2024-006',
    buyerName: 'Sydney Merchants Pty',
    destinationCountry: 'Australia',
    destinationPort: 'Port of Sydney',
    transportMode: 'air',
    carrierName: 'Qantas Freight',
    flightNumber: 'QF-2024-156',
    awbNumber: 'AWB-SYD-2024-004',
    etd: '2024-01-28',
    eta: '2024-01-30',
    status: 'delivered',
    documents: [
      { id: 1, type: 'awb', name: 'Air Waybill', url: '#', uploadedAt: '2024-01-27T10:00:00Z' },
      { id: 2, type: 'health_cert', name: 'Health Certificate', url: '#', uploadedAt: '2024-01-27T10:00:00Z' }
    ],
    notes: 'Delivered successfully - fragile item',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-30T16:00:00Z'
  },
  {
    id: 5,
    shipmentNumber: 'SHP-2024-005',
    orderId: 1,
    orderNumber: 'SO-2024-001',
    buyerName: 'ABC Corporation',
    destinationCountry: 'United States',
    destinationPort: 'Port of New York',
    transportMode: 'sea',
    carrierName: 'COSCO Shipping',
    voyageNumber: 'COSCO-2024-0234',
    containerNumber: 'COSU-345678-9',
    blNumber: 'BL-NYC-2024-003',
    etd: '2024-01-25',
    eta: '2024-02-15',
    status: 'customs',
    documents: [
      { id: 1, type: 'bl', name: 'Bill of Lading', url: '#', uploadedAt: '2024-01-24T10:00:00Z' },
      { id: 2, type: 'coo', name: 'Certificate of Origin', url: '#', uploadedAt: '2024-01-24T10:00:00Z' },
      { id: 3, type: 'invoice', name: 'Commercial Invoice', url: '#', uploadedAt: '2024-01-24T10:00:00Z' }
    ],
    notes: 'At customs clearance',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-02-10T12:00:00Z'
  },
  {
    id: 6,
    shipmentNumber: 'SHP-2024-006',
    orderId: 8,
    orderNumber: 'SO-2024-008',
    buyerName: 'ABC Corporation',
    destinationCountry: 'United States',
    destinationPort: 'Port of Los Angeles',
    transportMode: 'sea',
    carrierName: 'Hapag-Lloyd',
    voyageNumber: 'HL-2024-0189',
    etd: '2024-02-25',
    eta: '2024-03-10',
    status: 'created',
    documents: [],
    notes: 'Scheduled for next week',
    createdAt: '2024-02-18T10:00:00Z',
    updatedAt: '2024-02-18T10:00:00Z'
  }
]

export const getShipmentById = (id: number): Shipment | undefined => {
  return mockShipments.find(s => s.id === id)
}

export const getStatusInfo = (status: ShipmentStatus) => {
  const found = statusOptions.find(s => s.value === status)
  return found || { value: status, label: status, color: 'gray' }
}

export const getTransportModeLabel = (mode: TransportMode): string => {
  const found = transportModes.find(t => t.value === mode)
  return found ? found.label : mode
}
