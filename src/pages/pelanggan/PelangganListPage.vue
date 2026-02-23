<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  X
} from 'lucide-vue-next'
import type { Buyer, BuyerSegment, BuyerStatus } from '@/types/pelanggan'
import { 
  mockBuyers, 
  segments, 
  countries,
  getSegmentInfo 
} from '@/data/pelanggan'

const router = useRouter()

const buyers = ref<Buyer[]>([...mockBuyers])
const searchQuery = ref('')
const selectedSegment = ref<BuyerSegment | ''>('')
const selectedCountry = ref('')
const selectedStatus = ref<BuyerStatus | ''>('')
const showDeleteModal = ref(false)
const buyerToDelete = ref<Buyer | null>(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredBuyers = computed(() => {
  return buyers.value.filter(buyer => {
    const matchesSearch = !searchQuery.value || 
      buyer.companyName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      buyer.contactPerson.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesSegment = !selectedSegment.value || buyer.segment === selectedSegment.value
    const matchesCountry = !selectedCountry.value || buyer.country === selectedCountry.value
    const matchesStatus = !selectedStatus.value || buyer.status === selectedStatus.value
    
    return matchesSearch && matchesSegment && matchesCountry && matchesStatus
  })
})

const paginatedBuyers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredBuyers.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredBuyers.value.length / itemsPerPage.value)
)

const clearFilters = () => {
  searchQuery.value = ''
  selectedSegment.value = ''
  selectedCountry.value = ''
  selectedStatus.value = ''
}

const navigateToAdd = () => {
  router.push({ name: 'pelanggan-tambah' })
}

const navigateToEdit = (id: number) => {
  router.push({ name: 'pelanggan-detail', params: { id } })
}

const navigateToDetail = (id: number) => {
  router.push({ name: 'pelanggan-detail', params: { id } })
}

const confirmDelete = (buyer: Buyer) => {
  buyerToDelete.value = buyer
  showDeleteModal.value = true
}

const deleteBuyer = () => {
  if (buyerToDelete.value) {
    buyers.value = buyers.value.filter(b => b.id !== buyerToDelete.value?.id)
    showDeleteModal.value = false
    buyerToDelete.value = null
  }
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`
}

const getSegmentBadgeClass = (segment: BuyerSegment) => {
  const info = getSegmentInfo(segment)
  switch (info.color) {
    case 'amber': return 'badge-warning'
    case 'cyan': return 'badge-primary'
    case 'emerald': return 'badge-success'
    default: return 'badge-neutral'
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Daftar Pelanggan</h1>
        <p class="text-text-secondary mt-1">Kelola data buyer/pelanggan ekspor</p>
      </div>
      <button @click="navigateToAdd" class="btn-primary">
        <Plus class="w-4 h-4" />
        Tambah Pelanggan
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
            placeholder="Cari perusahaan atau kontak..."
            class="input pl-10"
          />
        </div>

        <!-- Segment Filter -->
        <select v-model="selectedSegment" class="input w-full lg:w-40">
          <option value="">Semua Segment</option>
          <option v-for="seg in segments" :key="seg.value" :value="seg.value">
            {{ seg.label }}
          </option>
        </select>

        <!-- Country Filter -->
        <select v-model="selectedCountry" class="input w-full lg:w-48">
          <option value="">Semua Negara</option>
          <option v-for="country in countries" :key="country.code" :value="country.name">
            {{ country.name }}
          </option>
        </select>

        <!-- Status Filter -->
        <select v-model="selectedStatus" class="input w-full lg:w-32">
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Non-aktif</option>
        </select>

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedSegment || selectedCountry || selectedStatus"
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
              <th>Perusahaan</th>
              <th>Kontak</th>
              <th>Negara</th>
              <th>Segment</th>
              <th class="text-right">Credit Limit</th>
              <th class="text-center">Orders</th>
              <th>Status</th>
              <th class="w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(buyer, index) in paginatedBuyers" :key="buyer.id">
              <td class="font-mono text-sm text-text-muted">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary">{{ buyer.companyName }}</p>
                  <p class="text-sm text-text-muted">{{ buyer.city }}</p>
                </div>
              </td>
              <td>
                <div>
                  <p class="text-sm text-text-primary">{{ buyer.contactPerson }}</p>
                  <p class="text-xs text-text-muted">{{ buyer.email }}</p>
                </div>
              </td>
              <td>
                <span class="badge badge-neutral">{{ buyer.country }}</span>
              </td>
              <td>
                <span :class="['badge', getSegmentBadgeClass(buyer.segment)]">
                  {{ getSegmentInfo(buyer.segment).label }}
                </span>
              </td>
              <td class="text-right font-medium">
                {{ formatCurrency(buyer.creditLimit) }}
              </td>
              <td class="text-center">
                <span class="font-medium">{{ buyer.totalOrders }}</span>
              </td>
              <td>
                <span :class="['badge', buyer.status === 'aktif' ? 'badge-success' : 'badge-secondary']">
                  {{ buyer.status === 'aktif' ? 'Aktif' : 'Non-aktif' }}
                </span>
              </td>
              <td>
                <div class="flex items-center gap-1">
                  <button 
                    @click="navigateToDetail(buyer.id)"
                    class="btn-icon btn-ghost"
                    title="Lihat"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button 
                    @click="navigateToEdit(buyer.id)"
                    class="btn-icon btn-ghost"
                    title="Edit"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button 
                    @click="confirmDelete(buyer)"
                    class="btn-icon btn-ghost text-accent-danger hover:bg-red-50"
                    title="Hapus"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="paginatedBuyers.length === 0">
              <td colspan="9" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data pelanggan</p>
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
          {{ Math.min(currentPage * itemsPerPage, filteredBuyers.length) }} 
          dari {{ filteredBuyers.length }} data
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

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="modal-content max-w-sm">
        <div class="modal-header">
          <h3 class="font-semibold text-lg">Konfirmasi Hapus</h3>
        </div>
        <div class="modal-body">
          <p class="text-text-secondary">
            Apakah Anda yakin ingin menghapus pelanggan 
            <strong class="text-text-primary">{{ buyerToDelete?.companyName }}</strong>?
          </p>
          <p class="text-sm text-text-muted mt-2">Tindakan ini tidak dapat dibatalkan.</p>
        </div>
        <div class="modal-footer">
          <button @click="showDeleteModal = false" class="btn-outline">
            Batal
          </button>
          <button @click="deleteBuyer" class="btn-danger">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
