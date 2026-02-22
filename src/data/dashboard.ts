export interface KPI {
  title: string
  value: string
  change: number
  icon: string
  color: 'cyan' | 'violet' | 'amber' | 'emerald'
}

export interface SalesData {
  labels: string[]
  revenue: number[]
  orders?: number[]
}

export interface TopProduct {
  name: string
  value: number
}

export interface Activity {
  id: number
  type: 'order' | 'shipment' | 'stock' | 'payment' | 'alert'
  title: string
  description: string
  time: string
}

export interface StockAlert {
  id: number
  sku: string
  name: string
  currentStock: number
  minStock: number
  urgency: 'low' | 'medium' | 'high'
}

export const kpiData: KPI[] = [
  {
    title: 'Total Stok',
    value: '24,850',
    change: 12.5,
    icon: 'package',
    color: 'cyan'
  },
  {
    title: 'Nilai Inventori',
    value: '$2.4M',
    change: 8.2,
    icon: 'dollar',
    color: 'violet'
  },
  {
    title: 'Order Aktif',
    value: '156',
    change: -3.1,
    icon: 'cart',
    color: 'amber'
  },
  {
    title: 'Revenue Bulan Ini',
    value: '$485K',
    change: 24.8,
    icon: 'trending',
    color: 'emerald'
  }
]

export const salesChartData: SalesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  revenue: [
    180000, 220000, 195000, 280000, 320000, 290000,
    350000, 380000, 420000, 390000, 450000, 485000
  ],
  orders: [
    45, 52, 48, 65, 72, 68, 82, 88, 95, 90, 105, 112
  ]
}

export const topProductsData: TopProduct[] = [
  { name: 'Batik Premium', value: 4250 },
  { name: 'Kopi Luwak', value: 3180 },
  { name: 'Palm Oil', value: 2850 },
  { name: 'Rubber Sheet', value: 2120 },
  { name: 'Coffee Beans', value: 1890 }
]

export const recentActivities: Activity[] = [
  {
    id: 1,
    type: 'order',
    title: 'Order Baru',
    description: 'Order #SO-2024-089 dari PT Maju Jaya',
    time: '5 menit lalu'
  },
  {
    id: 2,
    type: 'shipment',
    title: 'Pengiriman',
    description: 'Container CV-KE-8847 tiba di tujuan (Singapore)',
    time: '1 jam lalu'
  },
  {
    id: 3,
    type: 'payment',
    title: 'Pembayaran',
    description: 'Invoice #INV-2024-156 lunas dari Buyer ABC Corp',
    time: '2 jam lalu'
  },
  {
    id: 4,
    type: 'stock',
    title: 'Penerimaan Stok',
    description: 'Penerimaan GR-2024-023 dari Gudang Jakarta',
    time: '3 jam lalu'
  },
  {
    id: 5,
    type: 'alert',
    title: 'Stok Menipis',
    description: 'SKU-BATIK-001 stok di bawah minimum (15 unit)',
    time: '4 jam lalu'
  }
]

export const stockAlerts: StockAlert[] = [
  {
    id: 1,
    sku: 'SKU-BATIK-001',
    name: 'Batik Premium Motif Parang',
    currentStock: 15,
    minStock: 50,
    urgency: 'high'
  },
  {
    id: 2,
    sku: 'SKU-KOPI-003',
    name: 'Kopi Luwak Grade A',
    currentStock: 45,
    minStock: 100,
    urgency: 'medium'
  },
  {
    id: 3,
    sku: 'SKU-PALM-012',
    name: 'Palm Oil CPO Grade A',
    currentStock: 120,
    minStock: 200,
    urgency: 'low'
  }
]
