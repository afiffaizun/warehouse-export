<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Search, 
  X,
  Download,
  Printer,
  Eye,
  Package,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-vue-next'
import type { Order, OrderStatus } from '@/types/order'
import { 
  mockOrders, 
  statusOptions,
  getStatusInfo 
} from '@/data/order'

const router = useRouter()

const orders = ref<Order[]>([...mockOrders])
const searchQuery = ref('')
const selectedStatus = ref<OrderStatus | ''>('')
const dateFrom = ref('')
const dateTo = ref('')

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = !searchQuery.value || 
      order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !selectedStatus.value || order.status === selectedStatus.value
    
    let matchesDate = true
    if (dateFrom.value) {
      matchesDate = matchesDate && new Date(order.createdAt) >= new Date(dateFrom.value)
    }
    if (dateTo.value) {
      matchesDate = matchesDate && new Date(order.createdAt) <= new Date(dateTo.value)
    }
    
    return matchesSearch && matchesStatus && matchesDate
  })
})

const totalOrders = computed(() => orders.value.length)
const totalRevenue = computed(() => {
  return orders.value
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.totalUsd, 0)
})
const pendingOrders = computed(() => {
  return orders.value.filter(o => o.status === 'draft' || o.status === 'confirmed').length
})
const completedOrders = computed(() => {
  return orders.value.filter(o => o.status === 'completed').length
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  dateFrom.value = ''
  dateTo.value = ''
}

const navigateToDetail = (id: number) => {
  router.push({ name: 'order-detail', params: { id } })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const getStatusBadgeClass = (status: OrderStatus) => {
  const info = getStatusInfo(status)
  switch (info.color) {
    case 'gray': return 'badge-neutral'
    case 'blue': return 'badge-primary'
    case 'emerald': return 'badge-success'
    case 'amber': return 'badge-warning'
    case 'red': return 'badge-danger'
    default: return 'badge-neutral'
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Laporan Penjualan</h1>
        <p class="text-text-secondary mt-1">Ringkasan dan analisis penjualan ekspor</p>
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
            <p class="text-sm text-text-muted">Total Orders</p>
            <p class="text-xl font-bold text-text-primary">{{ totalOrders }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <DollarSign class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Revenue</p>
            <p class="text-xl font-bold text-emerald-600">{{ formatCurrency(totalRevenue) }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Clock class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Pending Orders</p>
            <p class="text-xl font-bold text-amber-600">{{ pendingOrders }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Completed</p>
            <p class="text-xl font-bold text-blue-600">{{ completedOrders }}</p>
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
            placeholder="Cari order..."
            class="input pl-10"
          />
        </div>

        <!-- Status Filter -->
        <select v-model="selectedStatus" class="input w-full lg:w-44">
          <option value="">Semua Status</option>
          <option v-for="status in statusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>

        <!-- Date From -->
        <input
          v-model="dateFrom"
          type="date"
          class="input w-full lg:w-40"
          placeholder="Dari tanggal"
        />

        <!-- Date To -->
        <input
          v-model="dateTo"
          type="date"
          class="input w-full lg:w-40"
          placeholder="Sampai tanggal"
        />

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedStatus || dateFrom || dateTo"
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
              <th>Order</th>
              <th>Buyer</th>
              <th>Tanggal Order</th>
              <th>ETD</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th class="w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in filteredOrders" :key="order.id">
              <td class="font-mono text-sm text-text-muted">{{ index + 1 }}</td>
              <td>
                <span class="font-medium font-mono text-text-primary">{{ order.orderNumber }}</span>
              </td>
              <td>
                <p class="font-medium text-text-primary">{{ order.buyerName }}</p>
              </td>
              <td class="text-sm">{{ formatDate(order.createdAt) }}</td>
              <td class="text-sm">{{ order.incoterms.toUpperCase() }}</td>
              <td class="text-sm">{{ order.items.length }} items</td>
              <td class="font-medium">{{ formatCurrency(order.totalUsd) }}</td>
              <td>
                <span :class="['badge', getStatusBadgeClass(order.status)]">
                  {{ getStatusInfo(order.status).label }}
                </span>
              </td>
              <td>
                <button 
                  @click="navigateToDetail(order.id)"
                  class="btn-icon btn-ghost"
                  title="Lihat Detail"
                >
                  <Eye class="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="9" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data order</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
