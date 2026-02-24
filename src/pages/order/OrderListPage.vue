<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plus, 
  Search, 
  Eye,
  X
} from 'lucide-vue-next'
import type { Order, OrderStatus } from '@/types/order'
import { 
  mockOrders, 
  statusOptions, 
  getStatusInfo,
  getPaymentStatusInfo
} from '@/data/order'

const router = useRouter()

const orders = ref<Order[]>([...mockOrders])
const searchQuery = ref('')
const selectedStatus = ref<OrderStatus | ''>('')
const selectedPaymentStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = !searchQuery.value || 
      order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !selectedStatus.value || order.status === selectedStatus.value
    const matchesPayment = !selectedPaymentStatus.value || order.paymentStatus === selectedPaymentStatus.value
    
    return matchesSearch && matchesStatus && matchesPayment
  })
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredOrders.value.length / itemsPerPage.value)
)

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedPaymentStatus.value = ''
}

const navigateToAdd = () => {
  router.push({ name: 'order-buat' })
}

const navigateToDetail = (id: number) => {
  router.push({ name: 'order-detail', params: { id } })
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusBadgeClass = (status: OrderStatus) => {
  const info = getStatusInfo(status)
  switch (info.color) {
    case 'gray': return 'badge-neutral'
    case 'cyan': return 'badge-primary'
    case 'amber': return 'badge-warning'
    case 'violet': return 'badge-secondary'
    case 'blue': return 'badge-info'
    case 'emerald': return 'badge-success'
    case 'red': return 'badge-danger'
    default: return 'badge-neutral'
  }
}

const getPaymentBadgeClass = (status: string) => {
  switch (status) {
    case 'unpaid': return 'badge-danger'
    case 'partial': return 'badge-warning'
    case 'paid': return 'badge-success'
    default: return 'badge-neutral'
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Daftar Order</h1>
        <p class="text-text-secondary mt-1">Kelola order penjualan ekspor</p>
      </div>
      <button @click="navigateToAdd" class="btn-primary">
        <Plus class="w-4 h-4" />
        Buat Order
      </button>
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
            placeholder="Cari order atau buyer..."
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

        <!-- Payment Filter -->
        <select v-model="selectedPaymentStatus" class="input w-full lg:w-40">
          <option value="">Semua Pembayaran</option>
          <option value="unpaid">Unpaid</option>
          <option value="partial">Partial</option>
          <option value="paid">Paid</option>
        </select>

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedStatus || selectedPaymentStatus"
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
              <th class="text-right">Total</th>
              <th>Status</th>
              <th>Pembayaran</th>
              <th>Tanggal</th>
              <th class="w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in paginatedOrders" :key="order.id">
              <td class="font-mono text-sm text-text-muted">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary font-mono">{{ order.orderNumber }}</p>
                  <p class="text-sm text-text-muted">{{ order.items.length }} item(s)</p>
                </div>
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary">{{ order.buyerName }}</p>
                  <p class="text-sm text-text-muted">{{ order.buyerCountry }}</p>
                </div>
              </td>
              <td class="text-right font-medium">
                {{ formatCurrency(order.totalUsd) }}
              </td>
              <td>
                <span :class="['badge', getStatusBadgeClass(order.status)]">
                  {{ getStatusInfo(order.status).label }}
                </span>
              </td>
              <td>
                <span :class="['badge', getPaymentBadgeClass(order.paymentStatus)]">
                  {{ getPaymentStatusInfo(order.paymentStatus).label }}
                </span>
              </td>
              <td class="text-sm text-text-muted">
                {{ formatDate(order.createdAt) }}
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
            <tr v-if="paginatedOrders.length === 0">
              <td colspan="8" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data order</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between px-4 py-3 border-t border-border">
        <p class="text-sm text-text-muted">
          Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - 
          {{ Math.min(currentPage * itemsPerPage, filteredOrders.length) }} 
          dari {{ filteredOrders.length }} data
        </p>
        <div class="flex items-center gap-2">
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="btn-outline btn-sm"
          >
            Previous
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
              currentPage === page 
                ? 'bg-accent-primary text-white' 
                : 'text-text-secondary hover:bg-slate-100'
            ]"
          >
            {{ page }}
          </button>
          <button 
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
