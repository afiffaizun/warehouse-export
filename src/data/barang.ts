import type { Product, ProductCategory, ProductStatus } from '@/types/barang'

export const categories: { value: ProductCategory; label: string }[] = [
  { value: 'batik', label: 'Batik' },
  { value: 'kopi', label: 'Kopi' },
  { value: 'minyak-kelapa', label: 'Minyak Kelapa' },
  { value: 'karet', label: 'Karet' },
  { value: 'rempah', label: 'Rempah' },
  { value: 'tekstil', label: 'Tekstil' },
  { value: 'kerajinan', label: 'Kerajinan' },
  { value: 'lainnya', label: 'Lainnya' }
]

export const statuses: { value: ProductStatus; label: string; color: string }[] = [
  { value: 'aktif', label: 'Aktif', color: 'success' },
  { value: 'nonaktif', label: 'Non-aktif', color: 'secondary' },
  { value: 'discontinue', label: 'Discontinue', color: 'danger' }
]

export const units = [
  'PCS',
  'KG',
  'BOX',
  'SET',
  'ROLL',
  'LITER',
  'PACK',
  'UNIT'
]

export const warehouses = [
  { id: 1, code: 'GUD-JKT', name: 'Gudang Jakarta', location: 'Jakarta Utara' },
  { id: 2, code: 'GUD-SUB', name: 'Gudang Surabaya', location: 'Surabaya' },
  { id: 3, code: 'GUD-TNG', name: 'Gudang Tangeran', location: 'Tangerang' }
]

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Batik Premium Motif Parang',
    sku: 'BAT-PAR-001',
    category: 'batik',
    unit: 'PCS',
    description: 'Batik premium quality dengan motif parang klasik Indonesia. Diproduksi dengan teknik batik tulis menggunakan malam alami.',
    hsCode: '6204.42.00',
    priceIdr: 850000,
    priceUsd: 55,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/0891B2/FFFFFF?text=Batik+Parang', isPrimary: true }
    ],
    status: 'aktif',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Kopi Luwak Grade A',
    sku: 'KOP-LUW-001',
    category: 'kopi',
    unit: 'KG',
    description: 'Kopi luwak premium grade A dari Sumatera. Diproses secara tradisional dengan seleksi buah cherry terbaik.',
    hsCode: '0901.11.10',
    priceIdr: 450000,
    priceUsd: 29,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/7C3AED/FFFFFF?text=Kopi+Luwak', isPrimary: true }
    ],
    status: 'aktif',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 3,
    name: 'Palm Oil CPO Grade A',
    sku: 'PAL-CPO-001',
    category: 'minyak-kelapa',
    unit: 'TON',
    description: 'Crude Palm Oil (CPO) kualitas ekspor grade A. Standar mutu sesuai spesifikasi internasional.',
    hsCode: '1511.10.00',
    priceIdr: 14500000,
    priceUsd: 920,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/D97706/FFFFFF?text=Palm+Oil', isPrimary: true }
    ],
    status: 'aktif',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 4,
    name: 'Rubber Sheet RSS-3',
    sku: 'RUB-RSS-001',
    category: 'karet',
    unit: 'KG',
    description: 'Ribbed Smoked Sheet (RSS) grade 3. Karet alam berkualitas tinggi untuk ekspor.',
    hsCode: '4001.22.00',
    priceIdr: 28000,
    priceUsd: 1.8,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/059669/FFFFFF?text=Rubber+Sheet', isPrimary: true }
    ],
    status: 'aktif',
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z'
  },
  {
    id: 5,
    name: 'Lada Hitam Muntok',
    sku: 'REM-LAD-001',
    category: 'rempah',
    unit: 'KG',
    description: 'Lada hitam kualitas ekspor dari Bangka Belitung. Kadar piperin tinggi.',
    hsCode: '0904.22.10',
    priceIdr: 125000,
    priceUsd: 8,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/DC2626/FFFFFF?text=Lada+Hitam', isPrimary: true }
    ],
    status: 'aktif',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 6,
    name: 'Batik Mega Mendung',
    sku: 'BAT-MEG-001',
    category: 'batik',
    unit: 'PCS',
    description: 'Batik Cirebon motif mega mendung. Kombinasi warna gradasi yang elegan.',
    hsCode: '6204.42.00',
    priceIdr: 1200000,
    priceUsd: 76,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/0891B2/FFFFFF?text=Batik+Mega', isPrimary: true }
    ],
    status: 'aktif',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 7,
    name: 'Kopi Robusta Roban',
    sku: 'KOP-ROB-001',
    category: 'kopi',
    unit: 'KG',
    description: 'Kopi robusta dari Dataran Tinggi Roban. Rasa kuat dan aroma khas.',
    hsCode: '0901.11.10',
    priceIdr: 85000,
    priceUsd: 5.5,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/7C3AED/FFFFFF?text=Kopi+Robusta', isPrimary: true }
    ],
    status: 'nonaktif',
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 8,
    name: 'VCO (Virgin Coconut Oil)',
    sku: 'MIN-VCO-001',
    category: 'minyak-kelapa',
    unit: 'LITER',
    description: 'Virgin Coconut Oil 100% murni untuk ekspor. Proses cold pressed.',
    hsCode: '1513.19.00',
    priceIdr: 185000,
    priceUsd: 12,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/D97706/FFFFFF?text=VCO', isPrimary: true }
    ],
    status: 'aktif',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 9,
    name: 'Tenun Ikat Troso',
    sku: 'TEK-TEN-001',
    category: 'tekstil',
    unit: 'PCS',
    description: 'Tenun ikat tradisional dari Jepara dengan motif khas daerah.',
    hsCode: '5804.21.00',
    priceIdr: 2500000,
    priceUsd: 158,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/059669/FFFFFF?text=Tenun+Ikat', isPrimary: true }
    ],
    status: 'discontinue',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-03-05T10:00:00Z'
  },
  {
    id: 10,
    name: 'Keris Akik Puyang',
    sku: 'KER-AKI-001',
    category: 'kerajinan',
    unit: 'PCS',
    description: 'Keris pusaka koleksi dengan bilah dari bahan baja berkualitas.',
    hsCode: '9705.00.00',
    priceIdr: 15000000,
    priceUsd: 950,
    images: [
      { id: 1, url: 'https://placehold.co/400x400/DC2626/FFFFFF?text=Keris', isPrimary: true }
    ],
    status: 'aktif',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z'
  }
]

export const getCategoryLabel = (category: ProductCategory): string => {
  const found = categories.find(c => c.value === category)
  return found ? found.label : category
}

export const getStatusInfo = (status: ProductStatus) => {
  const found = statuses.find(s => s.value === status)
  return found || { value: status, label: status, color: 'secondary' }
}

export const getProductById = (id: number): Product | undefined => {
  return mockProducts.find(p => p.id === id)
}
