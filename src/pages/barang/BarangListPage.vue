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
import type { Product, ProductCategory, ProductStatus } from '@/types/barang'
import { 
  mockProducts, 
  categories, 
  statuses, 
  getCategoryLabel, 
  getStatusInfo 
} from '@/data/barang'

const router = useRouter()

const products = ref<Product[]>([...mockProducts])
const searchQuery = ref('')
const selectedCategory = ref<ProductCategory | ''>('')
const selectedStatus = ref<ProductStatus | ''>('')
const showDeleteModal = ref(false)
const productToDelete = ref<Product | null>(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = !searchQuery.value || 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !selectedCategory.value || 
      product.category === selectedCategory.value
    
    const matchesStatus = !selectedStatus.value || 
      product.status === selectedStatus.value
    
    return matchesSearch && matchesCategory && matchesStatus
  })
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredProducts.value.length / itemsPerPage.value)
)

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
}

const navigateToAdd = () => {
  router.push({ name: 'barang-tambah' })
}

const navigateToEdit = (id: number) => {
  router.push({ name: 'barang-edit', params: { id } })
}

const navigateToDetail = (id: number) => {
  router.push({ name: 'barang-detail', params: { id } })
}

const confirmDelete = (product: Product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const deleteProduct = () => {
  if (productToDelete.value) {
    products.value = products.value.filter(p => p.id !== productToDelete.value?.id)
    showDeleteModal.value = false
    productToDelete.value = null
  }
}

const formatCurrency = (value: number, currency: string = 'IDR') => {
  if (currency === 'USD') {
    return `$${value.toLocaleString()}`
  }
  return `Rp ${value.toLocaleString()}`
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Daftar Barang</h1>
        <p class="text-text-secondary mt-1">Kelola data produk ekspor</p>
      </div>
      <button @click="navigateToAdd" class="btn-primary">
        <Plus class="w-4 h-4" />
        Tambah Barang
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
            placeholder="Cari nama atau SKU..."
            class="input pl-10"
          />
        </div>

        <!-- Category Filter -->
        <select v-model="selectedCategory" class="input w-full lg:w-48">
          <option value="">Semua Kategori</option>
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </option>
        </select>

        <!-- Status Filter -->
        <select v-model="selectedStatus" class="input w-full lg:w-40">
          <option value="">Semua Status</option>
          <option v-for="stat in statuses" :key="stat.value" :value="stat.value">
            {{ stat.label }}
          </option>
        </select>

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedCategory || selectedStatus"
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
              <th class="w-24">Gambar</th>
              <th>Nama / SKU</th>
              <th>Kategori</th>
              <th class="text-right">Harga (IDR)</th>
              <th class="text-right">Harga (USD)</th>
              <th>Status</th>
              <th class="w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in paginatedProducts" :key="product.id">
              <td class="font-mono text-sm text-text-muted">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td>
                <div class="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                  <img 
                    :src="product.images[0]?.url" 
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary">{{ product.name }}</p>
                  <p class="text-sm text-text-muted font-mono">{{ product.sku }}</p>
                </div>
              </td>
              <td>
                <span class="badge badge-neutral">
                  {{ getCategoryLabel(product.category) }}
                </span>
              </td>
              <td class="text-right font-medium">
                {{ formatCurrency(product.priceIdr) }}
              </td>
              <td class="text-right font-medium">
                {{ formatCurrency(product.priceUsd, 'USD') }}
              </td>
              <td>
                <span 
                  :class="[
                    'badge',
                    getStatusInfo(product.status).color === 'success' ? 'badge-success' :
                    getStatusInfo(product.status).color === 'danger' ? 'badge-danger' :
                    'badge-secondary'
                  ]"
                >
                  {{ getStatusInfo(product.status).label }}
                </span>
              </td>
              <td>
                <div class="flex items-center gap-1">
                  <button 
                    @click="navigateToDetail(product.id)"
                    class="btn-icon btn-ghost"
                    title="Lihat"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button 
                    @click="navigateToEdit(product.id)"
                    class="btn-icon btn-ghost"
                    title="Edit"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button 
                    @click="confirmDelete(product)"
                    class="btn-icon btn-ghost text-accent-danger hover:bg-red-50"
                    title="Hapus"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="paginatedProducts.length === 0">
              <td colspan="8" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data barang</p>
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
          {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} 
          dari {{ filteredProducts.length }} data
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
            Apakah Anda yakin ingin menghapus barang 
            <strong class="text-text-primary">{{ productToDelete?.name }}</strong>?
          </p>
          <p class="text-sm text-text-muted mt-2">Tindakan ini tidak dapat dibatalkan.</p>
        </div>
        <div class="modal-footer">
          <button @click="showDeleteModal = false" class="btn-outline">
            Batal
          </button>
          <button @click="deleteProduct" class="btn-danger">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
