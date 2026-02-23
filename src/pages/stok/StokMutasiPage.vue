<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  Search, 
  PackagePlus, 
  PackageMinus, 
  ArrowRightLeft, 
  Settings,
  User,
  Clock
} from 'lucide-vue-next'
import { mockStockMutations } from '@/data/stok'
import type { StockMutation, MutationType } from '@/types/stok'

const router = useRouter()

const mutations = ref<StockMutation[]>([...mockStockMutations])
const searchQuery = ref('')
const selectedType = ref<MutationType | ''>('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredMutations = computed(() => {
  return mutations.value.filter(mutation => {
    const matchesSearch = !searchQuery.value ||
      mutation.productName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      mutation.productSku.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      mutation.referenceNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = !selectedType.value || mutation.type === selectedType.value
    
    return matchesSearch && matchesType
  })
})

const paginatedMutations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMutations.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredMutations.value.length / itemsPerPage.value)
)

const getTypeIcon = (type: MutationType) => {
  const icons = {
    penerimaan: PackagePlus,
    pengeluaran: PackageMinus,
    transfer: ArrowRightLeft,
    adjustment: Settings
  }
  return icons[type]
}

const getTypeColor = (type: MutationType) => {
  const colors = {
    penerimaan: 'bg-emerald-100 text-emerald-600',
    pengeluaran: 'bg-red-100 text-red-600',
    transfer: 'bg-violet-100 text-violet-600',
    adjustment: 'bg-amber-100 text-amber-600'
  }
  return colors[type]
}

const getTypeLabel = (type: MutationType) => {
  const labels = {
    penerimaan: 'Penerimaan',
    pengeluaran: 'Pengeluaran',
    transfer: 'Transfer',
    adjustment: 'Adjustment'
  }
  return labels[type]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'badge-success'
    case 'pending': return 'badge-warning'
    case 'cancelled': return 'badge-danger'
    default: return 'badge-neutral'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center gap-4">
      <button @click="goBack" class="btn-icon btn-ghost">
        <ArrowLeft class="w-5 h-5" />
      </button>
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Riwayat Mutasi Stok</h1>
        <p class="text-text-secondary mt-1">Lacak semua pergerakan inventori</p>
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
            placeholder="Cari produk atau nomor referensi..."
            class="input pl-10"
          />
        </div>
        
        <select v-model="selectedType" class="input w-full lg:w-48">
          <option value="">Semua Tipe</option>
          <option value="penerimaan">Penerimaan</option>
          <option value="pengeluaran">Pengeluaran</option>
          <option value="transfer">Transfer</option>
          <option value="adjustment">Adjustment</option>
        </select>
      </div>
    </div>

    <!-- Mutations List -->
    <div class="space-y-4">
      <div 
        v-for="mutation in paginatedMutations" 
        :key="mutation.id"
        class="card p-4"
      >
        <div class="flex items-start gap-4">
          <!-- Type Icon -->
          <div :class="['p-3 rounded-xl flex-shrink-0', getTypeColor(mutation.type)]">
            <component :is="getTypeIcon(mutation.type)" class="w-5 h-5" />
          </div>
          
          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="badge badge-neutral">{{ getTypeLabel(mutation.type) }}</span>
                  <span :class="['badge', getStatusColor(mutation.status)]">
                    {{ mutation.status }}
                  </span>
                </div>
                <h3 class="font-semibold text-text-primary">{{ mutation.productName }}</h3>
                <p class="text-sm text-text-muted font-mono">{{ mutation.productSku }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-lg" :class="mutation.quantity >= 0 ? 'text-emerald-600' : 'text-red-600'">
                  {{ mutation.quantity >= 0 ? '+' : '' }}{{ mutation.quantity }}
                </p>
                <p class="text-sm text-text-muted">{{ mutation.unit }}</p>
              </div>
            </div>
            
            <div class="mt-3 pt-3 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p class="text-text-muted">Nomor Referensi</p>
                <p class="font-medium text-text-primary font-mono">{{ mutation.referenceNumber }}</p>
              </div>
              <div v-if="mutation.type === 'transfer'">
                <p class="text-text-muted">Transfer</p>
                <p class="font-medium text-text-primary">
                  {{ mutation.warehouseNameFrom }} → {{ mutation.warehouseNameTo }}
                </p>
              </div>
              <div v-else-if="mutation.type === 'penerimaan'">
                <p class="text-text-muted">Gudang Tujuan</p>
                <p class="font-medium text-text-primary">{{ mutation.warehouseNameTo }}</p>
              </div>
              <div v-else-if="mutation.type === 'pengeluaran'">
                <p class="text-text-muted">Gudang Asal</p>
                <p class="font-medium text-text-primary">{{ mutation.warehouseNameFrom }}</p>
              </div>
              <div v-else>
                <p class="text-text-muted">Gudang</p>
                <p class="font-medium text-text-primary">{{ mutation.warehouseNameFrom }}</p>
              </div>
              <div>
                <p class="text-text-muted">Dibuat Oleh</p>
                <p class="font-medium text-text-primary flex items-center gap-1">
                  <User class="w-3 h-3" />
                  {{ mutation.createdBy }}
                </p>
              </div>
              <div>
                <p class="text-text-muted">Waktu</p>
                <p class="font-medium text-text-primary flex items-center gap-1">
                  <Clock class="w-3 h-3" />
                  {{ formatDate(mutation.createdAt) }}
                </p>
              </div>
            </div>
            
            <div v-if="mutation.notes" class="mt-3 pt-3 border-t border-border">
              <p class="text-sm text-text-muted">Catatan: {{ mutation.notes }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="paginatedMutations.length === 0" class="card p-12 text-center">
        <p class="text-text-muted">Tidak ada riwayat mutasi</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="card p-4">
      <div class="flex items-center justify-between">
        <p class="text-sm text-text-muted">
          Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - 
          {{ Math.min(currentPage * itemsPerPage, filteredMutations.length) }} 
          dari {{ filteredMutations.length }} data
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
