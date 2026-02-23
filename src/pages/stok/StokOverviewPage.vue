<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Package, 
  Boxes, 
  AlertTriangle, 
  TrendingUp,
  Search,
  Plus,
  ArrowRight
} from 'lucide-vue-next'
import { mockStockItems, warehouses, getStockAlerts } from '@/data/stok'
import type { StockItem } from '@/types/stok'

const router = useRouter()

const stockItems = ref<StockItem[]>([...mockStockItems])
const searchQuery = ref('')
const selectedWarehouse = ref<number | ''>('')
const showLowStockOnly = ref(false)

const stockAlerts = computed(() => getStockAlerts())

const totalStock = computed(() => stockItems.value.reduce((sum, item) => sum + item.quantity, 0))
const totalProducts = computed(() => stockItems.value.length)
const lowStockCount = computed(() => stockAlerts.value.length)

const filteredStock = computed(() => {
  return stockItems.value.filter(item => {
    const matchesSearch = !searchQuery.value ||
      item.productName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.productSku.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesWarehouse = !selectedWarehouse.value || item.warehouseId === selectedWarehouse.value
    
    const matchesLowStock = !showLowStockOnly.value || item.quantity <= item.minStock
    
    return matchesSearch && matchesWarehouse && matchesLowStock
  })
})

const getStockStatus = (item: StockItem) => {
  if (item.quantity <= item.minStock) return 'low'
  if (item.quantity >= item.maxStock) return 'high'
  return 'normal'
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'low': return 'text-red-600 bg-red-50'
    case 'high': return 'text-emerald-600 bg-emerald-50'
    default: return 'text-amber-600 bg-amber-50'
  }
}

const navigateToPenerimaan = () => {
  router.push({ name: 'stok-penerimaan' })
}

const navigateToPengeluaran = () => {
  router.push({ name: 'stok-pengeluaran' })
}

const navigateToMutasi = () => {
  router.push({ name: 'stok-mutasi' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Stok Inventori</h1>
        <p class="text-text-secondary mt-1">Kelola stock barang di setiap gudang</p>
      </div>
      <div class="flex gap-2">
        <button @click="navigateToPenerimaan" class="btn-primary">
          <Plus class="w-4 h-4" />
          Penerimaan
        </button>
        <button @click="navigateToPengeluaran" class="btn-secondary">
          <ArrowRight class="w-4 h-4" />
          Pengeluaran
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-5">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-xl bg-cyan-100 text-cyan-600">
            <Package class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Item</p>
            <p class="text-2xl font-bold text-text-primary">{{ totalProducts }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-5">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-xl bg-violet-100 text-violet-600">
            <Boxes class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Stok</p>
            <p class="text-2xl font-bold text-text-primary">{{ totalStock.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="card p-5">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-xl bg-amber-100 text-amber-600">
            <TrendingUp class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Gudang</p>
            <p class="text-2xl font-bold text-text-primary">{{ warehouses.length }}</p>
          </div>
        </div>
      </div>

      <div class="card p-5">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-xl bg-red-100 text-red-600">
            <AlertTriangle class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Stok Menipis</p>
            <p class="text-2xl font-bold text-text-primary">{{ lowStockCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stock Alerts -->
    <div v-if="stockAlerts.length > 0" class="card p-4 border-l-4 border-l-red-500">
      <div class="flex items-center gap-2 mb-3">
        <AlertTriangle class="w-5 h-5 text-red-600" />
        <h3 class="font-semibold text-text-primary">Peringatan Stok Menipis</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div 
          v-for="alert in stockAlerts" 
          :key="alert.id"
          class="p-3 bg-red-50 rounded-lg"
        >
          <p class="font-medium text-text-primary text-sm">{{ alert.productName }}</p>
          <p class="text-xs text-text-muted">{{ alert.productSku }}</p>
          <div class="flex justify-between mt-2">
            <span class="text-xs text-text-muted">Tersedia: {{ alert.quantity }} {{ alert.unit }}</span>
            <span class="text-xs text-text-muted">Min: {{ alert.minStock }}</span>
          </div>
          <div class="w-full bg-red-200 rounded-full h-1.5 mt-2">
            <div 
              class="bg-red-500 h-1.5 rounded-full" 
              :style="{ width: `${Math.min((alert.quantity / alert.minStock) * 100, 100)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-4">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1 relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari produk..."
            class="input pl-10"
          />
        </div>
        
        <select v-model="selectedWarehouse" class="input w-full lg:w-48">
          <option value="">Semua Gudang</option>
          <option v-for="wh in warehouses" :key="wh.id" :value="wh.id">
            {{ wh.name }}
          </option>
        </select>

        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="showLowStockOnly" class="checkbox" />
          <span class="text-sm text-text-secondary">Stok menipis saja</span>
        </label>

        <button @click="navigateToMutasi" class="btn-outline">
          Riwayat Mutasi
        </button>
      </div>
    </div>

    <!-- Stock Table -->
    <div class="card overflow-hidden">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Gudang</th>
              <th class="text-right">Stok</th>
              <th class="text-center">Min</th>
              <th class="text-center">Max</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredStock" :key="item.id">
              <td>
                <div>
                  <p class="font-medium text-text-primary">{{ item.productName }}</p>
                  <p class="text-sm text-text-muted font-mono">{{ item.productSku }}</p>
                </div>
              </td>
              <td>
                <span class="badge badge-neutral">{{ item.warehouseName }}</span>
              </td>
              <td class="text-right font-medium">
                {{ item.quantity.toLocaleString() }} {{ item.unit }}
              </td>
              <td class="text-center text-text-muted">
                {{ item.minStock }}
              </td>
              <td class="text-center text-text-muted">
                {{ item.maxStock }}
              </td>
              <td>
                <span :class="['badge', getStatusColor(getStockStatus(item))]">
                  <template v-if="getStockStatus(item) === 'low'">Menipis</template>
                  <template v-else-if="getStockStatus(item) === 'high'">Melimpah</template>
                  <template v-else>Normal</template>
                </span>
              </td>
            </tr>
            <tr v-if="filteredStock.length === 0">
              <td colspan="6" class="text-center py-12">
                <p class="text-text-muted">Tidak ada data stok</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
