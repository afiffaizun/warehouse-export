<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Search, 
  X,
  Download,
  Printer,
  Package,
  AlertTriangle,
  Warehouse,
  TrendingUp
} from 'lucide-vue-next'
import { mockStockItems, warehouses } from '@/data/stok'
import type { StockItem } from '@/types/stok'

const stocks = ref<StockItem[]>([...mockStockItems])
const warehouseList = ref([...warehouses])
const searchQuery = ref('')
const selectedWarehouse = ref<number | ''>('')

const filteredStocks = computed(() => {
  return stocks.value.filter(stock => {
    const matchesSearch = !searchQuery.value || 
      stock.productName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      stock.productSku.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesWarehouse = !selectedWarehouse.value || stock.warehouseId === selectedWarehouse.value
    
    return matchesSearch && matchesWarehouse
  })
})

const totalItems = computed(() => {
  const uniqueProducts = new Set(stocks.value.map(s => s.productId))
  return uniqueProducts.size
})

const totalQuantity = computed(() => {
  return stocks.value.reduce((sum, s) => sum + s.quantity, 0)
})

const lowStockItems = computed(() => {
  return stocks.value.filter(s => s.quantity <= s.minStock).length
})

const totalWarehouseCount = computed(() => warehouseList.value.length)

const getWarehouseName = (warehouseId: number) => {
  const wh = warehouseList.value.find(w => w.id === warehouseId)
  return wh ? wh.name : '-'
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedWarehouse.value = ''
}

const getStockStatus = (quantity: number, minStock: number) => {
  if (quantity === 0) return 'out'
  if (quantity <= minStock) return 'low'
  return 'ok'
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Laporan Stok</h1>
        <p class="text-text-secondary mt-1">Ringkasan dan analisis stok gudang</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-outline">
          <Printer class="w-4 h-4" />
          Print
        </button>
        <button class="btn-primary">
          <Download class="w-4 h-4" />
          Export
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
            <Package class="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Items</p>
            <p class="text-xl font-bold text-text-primary">{{ totalItems }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <TrendingUp class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Quantity</p>
            <p class="text-xl font-bold text-blue-600">{{ totalQuantity.toLocaleString() }} units</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertTriangle class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Low Stock Alerts</p>
            <p class="text-xl font-bold text-red-600">{{ lowStockItems }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Warehouse class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Warehouses</p>
            <p class="text-xl font-bold text-emerald-600">{{ totalWarehouseCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-4">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari produk atau SKU..."
            class="input pl-10"
          />
        </div>

        <!-- Warehouse Filter -->
        <select v-model="selectedWarehouse" class="input w-full lg:w-48">
          <option value="">Semua Gudang</option>
          <option v-for="wh in warehouseList" :key="wh.id" :value="wh.id">
            {{ wh.name }}
          </option>
        </select>

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedWarehouse"
          @click="clearFilters"
          class="btn-outline flex items-center gap-2"
        >
          <X class="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th class="w-16">No</th>
              <th>Produk</th>
              <th>SKU</th>
              <th>Gudang</th>
              <th class="text-right">Quantity</th>
              <th class="text-right">Min Stock</th>
              <th class="text-right">Max Stock</th>
              <th>Batch</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, index) in filteredStocks" :key="stock.id">
              <td class="font-mono text-sm text-text-muted">{{ index + 1 }}</td>
              <td>
                <p class="font-medium text-text-primary">{{ stock.productName }}</p>
              </td>
              <td>
                <span class="font-mono text-sm">{{ stock.productSku }}</span>
              </td>
              <td>
                <span class="text-sm">{{ getWarehouseName(stock.warehouseId) }}</span>
              </td>
              <td class="text-right font-medium">{{ stock.quantity.toLocaleString() }}</td>
              <td class="text-right text-text-muted">{{ stock.minStock }}</td>
              <td class="text-right text-text-muted">{{ stock.maxStock }}</td>
              <td class="text-sm">{{ stock.batchNumber || '-' }}</td>
              <td>
                <span 
                  :class="[
                    'badge',
                    getStockStatus(stock.quantity, stock.minStock) === 'ok' ? 'badge-success' :
                    getStockStatus(stock.quantity, stock.minStock) === 'low' ? 'badge-warning' : 'badge-danger'
                  ]"
                >
                  {{ getStockStatus(stock.quantity, stock.minStock) === 'ok' ? 'OK' :
                     getStockStatus(stock.quantity, stock.minStock) === 'low' ? 'Low Stock' : 'Out of Stock' }}
                </span>
              </td>
            </tr>
            <tr v-if="filteredStocks.length === 0">
              <td colspan="9" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data stok</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
