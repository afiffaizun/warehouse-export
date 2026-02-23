import type { Warehouse, StockItem, StockMutation } from '@/types/stok'

export const warehouses: Warehouse[] = [
  { id: 1, code: 'GUD-JKT', name: 'Gudang Jakarta', location: 'Jakarta Utara' },
  { id: 2, code: 'GUD-SUB', name: 'Gudang Surabaya', location: 'Surabaya' },
  { id: 3, code: 'GUD-TNG', name: 'Gudang Tangeran', location: 'Tangerang' }
]

export const mockStockItems: StockItem[] = [
  {
    id: 1,
    productId: 1,
    productName: 'Batik Premium Motif Parang',
    productSku: 'BAT-PAR-001',
    warehouseId: 1,
    warehouseName: 'Gudang Jakarta',
    quantity: 150,
    minStock: 50,
    maxStock: 500,
    unit: 'PCS',
    batchNumber: 'BATCH-2024-001',
    expiredDate: '2025-12-31'
  },
  {
    id: 2,
    productId: 2,
    productName: 'Kopi Luwak Grade A',
    productSku: 'KOP-LUW-001',
    warehouseId: 1,
    warehouseName: 'Gudang Jakarta',
    quantity: 85,
    minStock: 100,
    maxStock: 500,
    unit: 'KG'
  },
  {
    id: 3,
    productId: 3,
    productName: 'Palm Oil CPO Grade A',
    productSku: 'PAL-CPO-001',
    warehouseId: 2,
    warehouseName: 'Gudang Surabaya',
    quantity: 250,
    minStock: 100,
    maxStock: 1000,
    unit: 'TON'
  },
  {
    id: 4,
    productId: 4,
    productName: 'Rubber Sheet RSS-3',
    productSku: 'RUB-RSS-001',
    warehouseId: 2,
    warehouseName: 'Gudang Surabaya',
    quantity: 320,
    minStock: 150,
    maxStock: 1000,
    unit: 'KG'
  },
  {
    id: 5,
    productId: 5,
    productName: 'Lada Hitam Muntok',
    productSku: 'REM-LAD-001',
    warehouseId: 3,
    warehouseName: 'Gudang Tangeran',
    quantity: 45,
    minStock: 50,
    maxStock: 300,
    unit: 'KG'
  },
  {
    id: 6,
    productId: 6,
    productName: 'Batik Mega Mendung',
    productSku: 'BAT-MEG-001',
    warehouseId: 1,
    warehouseName: 'Gudang Jakarta',
    quantity: 28,
    minStock: 30,
    maxStock: 200,
    unit: 'PCS',
    batchNumber: 'BATCH-2024-002'
  },
  {
    id: 7,
    productId: 8,
    productName: 'VCO (Virgin Coconut Oil)',
    productSku: 'MIN-VCO-001',
    warehouseId: 3,
    warehouseName: 'Gudang Tangeran',
    quantity: 120,
    minStock: 50,
    maxStock: 300,
    unit: 'LITER'
  },
  {
    id: 8,
    productId: 10,
    productName: 'Keris Akik Puyang',
    productSku: 'KER-AKI-001',
    warehouseId: 1,
    warehouseName: 'Gudang Jakarta',
    quantity: 5,
    minStock: 2,
    maxStock: 20,
    unit: 'PCS'
  }
]

export const mockStockMutations: StockMutation[] = [
  {
    id: 1,
    type: 'penerimaan',
    referenceNumber: 'GR-2024-001',
    productId: 1,
    productName: 'Batik Premium Motif Parang',
    productSku: 'BAT-PAR-001',
    warehouseTo: 1,
    warehouseNameTo: 'Gudang Jakarta',
    quantity: 200,
    unit: 'PCS',
    status: 'completed',
    notes: 'Penerimaan dari supplier lokal',
    createdBy: 'Admin Gudang',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    type: 'pengeluaran',
    referenceNumber: 'GI-2024-001',
    productId: 1,
    productName: 'Batik Premium Motif Parang',
    productSku: 'BAT-PAR-001',
    warehouseFrom: 1,
    warehouseNameFrom: 'Gudang Jakarta',
    quantity: 50,
    unit: 'PCS',
    status: 'completed',
    notes: 'Pengiriman ke buyer ABC Corp',
    createdBy: 'Admin Gudang',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 3,
    type: 'transfer',
    referenceNumber: 'TF-2024-001',
    productId: 3,
    productName: 'Palm Oil CPO Grade A',
    productSku: 'PAL-CPO-001',
    warehouseFrom: 2,
    warehouseNameFrom: 'Gudang Surabaya',
    warehouseTo: 1,
    warehouseNameTo: 'Gudang Jakarta',
    quantity: 100,
    unit: 'TON',
    status: 'completed',
    notes: 'Transfer antar gudang untuk memenuhi order',
    createdBy: 'Manager Gudang',
    createdAt: '2024-01-25T09:00:00Z'
  },
  {
    id: 4,
    type: 'penerimaan',
    referenceNumber: 'GR-2024-002',
    productId: 2,
    productName: 'Kopi Luwak Grade A',
    productSku: 'KOP-LUW-001',
    warehouseTo: 1,
    warehouseNameTo: 'Gudang Jakarta',
    quantity: 150,
    unit: 'KG',
    status: 'completed',
    notes: 'Penerimaan batch baru',
    createdBy: 'Admin Gudang',
    createdAt: '2024-02-01T11:00:00Z'
  },
  {
    id: 5,
    type: 'adjustment',
    referenceNumber: 'ADJ-2024-001',
    productId: 6,
    productName: 'Batik Mega Mendung',
    productSku: 'BAT-MEG-001',
    warehouseFrom: 1,
    warehouseNameFrom: 'Gudang Jakarta',
    quantity: -2,
    unit: 'PCS',
    status: 'completed',
    notes: 'Adjustments due to damaged items',
    createdBy: 'Admin Gudang',
    createdAt: '2024-02-10T16:00:00Z'
  },
  {
    id: 6,
    type: 'pengeluaran',
    referenceNumber: 'GI-2024-002',
    productId: 5,
    productName: 'Lada Hitam Muntok',
    productSku: 'REM-LAD-001',
    warehouseFrom: 3,
    warehouseNameFrom: 'Gudang Tangeran',
    quantity: 30,
    unit: 'KG',
    status: 'pending',
    notes: 'Menunggu approval',
    createdBy: 'Admin Gudang',
    createdAt: '2024-02-15T10:00:00Z'
  }
]

export const getWarehouseById = (id: number): Warehouse | undefined => {
  return warehouses.find(w => w.id === id)
}

export const getStockByWarehouse = (warehouseId: number): StockItem[] => {
  return mockStockItems.filter(s => s.warehouseId === warehouseId)
}

export const getStockAlerts = (): StockItem[] => {
  return mockStockItems.filter(s => s.quantity <= s.minStock)
}

export const getTotalStockValue = (): number => {
  return mockStockItems.reduce((sum, item) => sum + item.quantity, 0)
}
