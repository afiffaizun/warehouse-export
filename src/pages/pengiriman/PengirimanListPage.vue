<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plus, 
  Search, 
  Eye,
  X,
  Ship,
  Plane,
  Truck
} from 'lucide-vue-next'
import type { Shipment, ShipmentStatus } from '@/types/pengiriman'
import { 
  mockShipments, 
  statusOptions, 
  transportModes,
  getStatusInfo,
  getTransportModeLabel
} from '@/data/pengiriman'

const router = useRouter()

const shipments = ref<Shipment[]>([...mockShipments])
const searchQuery = ref('')
const selectedStatus = ref<ShipmentStatus | ''>('')
const selectedMode = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredShipments = computed(() => {
  return shipments.value.filter(shipment => {
    const matchesSearch = !searchQuery.value || 
      shipment.shipmentNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      shipment.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      shipment.buyerName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !selectedStatus.value || shipment.status === selectedStatus.value
    const matchesMode = !selectedMode.value || shipment.transportMode === selectedMode.value
    
    return matchesSearch && matchesStatus && matchesMode
  })
})

const paginatedShipments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredShipments.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredShipments.value.length / itemsPerPage.value)
)

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedMode.value = ''
}

const navigateToDetail = (id: number) => {
  router.push({ name: 'pengiriman-detail', params: { id } })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusBadgeClass = (status: ShipmentStatus) => {
  const info = getStatusInfo(status)
  switch (info.color) {
    case 'gray': return 'badge-neutral'
    case 'cyan': return 'badge-primary'
    case 'amber': return 'badge-warning'
    case 'violet': return 'badge-secondary'
    case 'emerald': return 'badge-success'
    default: return 'badge-neutral'
  }
}

const getTransportIcon = (mode: string) => {
  switch (mode) {
    case 'sea': return Ship
    case 'air': return Plane
    case 'land': return Truck
    default: return Ship
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Daftar Pengiriman</h1>
        <p class="text-text-secondary mt-1">Kelola pengiriman dan logistik ekspor</p>
      </div>
      <button class="btn-primary">
        <Plus class="w-4 h-4" />
        Buat Pengiriman
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
            placeholder="Cari pengiriman atau order..."
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

        <!-- Mode Filter -->
        <select v-model="selectedMode" class="input w-full lg:w-40">
          <option value="">Semua Moda</option>
          <option v-for="mode in transportModes" :key="mode.value" :value="mode.value">
            {{ mode.label }}
          </option>
        </select>

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedStatus || selectedMode"
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
              <th>Pengiriman</th>
              <th>Order</th>
              <th>Buyer</th>
              <th>Moda</th>
              <th>ETD</th>
              <th>ETA</th>
              <th>Status</th>
              <th class="w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(shipment, index) in paginatedShipments" :key="shipment.id">
              <td class="font-mono text-sm text-text-muted">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary font-mono">{{ shipment.shipmentNumber }}</p>
                  <p class="text-sm text-text-muted">{{ shipment.carrierName }}</p>
                </div>
              </td>
              <td>
                <span class="font-mono text-sm">{{ shipment.orderNumber }}</span>
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary">{{ shipment.buyerName }}</p>
                  <p class="text-sm text-text-muted">{{ shipment.destinationCountry }}</p>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <component :is="getTransportIcon(shipment.transportMode)" class="w-4 h-4 text-text-muted" />
                  <span class="text-sm">{{ getTransportModeLabel(shipment.transportMode) }}</span>
                </div>
              </td>
              <td class="text-sm">{{ formatDate(shipment.etd) }}</td>
              <td class="text-sm">{{ formatDate(shipment.eta) }}</td>
              <td>
                <span :class="['badge', getStatusBadgeClass(shipment.status)]">
                  {{ getStatusInfo(shipment.status).label }}
                </span>
              </td>
              <td>
                <button 
                  @click="navigateToDetail(shipment.id)"
                  class="btn-icon btn-ghost"
                  title="Lihat Detail"
                >
                  <Eye class="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr v-if="paginatedShipments.length === 0">
              <td colspan="9" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data pengiriman</p>
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
          {{ Math.min(currentPage * itemsPerPage, filteredShipments.length) }} 
          dari {{ filteredShipments.length }} data
        </p>
        <div class="flex items-center gap-2">
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="btn-outline btn-sm"
          >
            Previous
          </button>
          <div class="flex gap-1">
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
          </div>
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
