<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Edit, 
  Trash2,
  Package,
  Tag,
  DollarSign,
  FileText,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'
import { getProductById, getCategoryLabel, getStatusInfo, mockProducts } from '@/data/barang'

const router = useRouter()
const route = useRoute()

const product = ref(getProductById(Number(route.params.id)))
const currentImageIndex = ref(0)

onMounted(() => {
  if (!product.value) {
    router.push({ name: 'barang' })
  }
})

const goBack = () => {
  router.back()
}

const navigateToEdit = () => {
  router.push({ name: 'barang-edit', params: { id: product.value?.id } })
}

const deleteProduct = () => {
  if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
    const index = mockProducts.findIndex(p => p.id === product.value?.id)
    if (index !== -1) {
      mockProducts.splice(index, 1)
      router.push({ name: 'barang' })
    }
  }
}

const nextImage = () => {
  if (product.value && currentImageIndex.value < product.value.images.length - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const formatCurrency = (value: number, currency: string = 'IDR') => {
  if (currency === 'USD') {
    return `$${value.toLocaleString()}`
  }
  return `Rp ${value.toLocaleString()}`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div v-if="product" class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <button @click="goBack" class="btn-icon btn-ghost">
          <ArrowLeft class="w-5 h-5" />
        </button>
        <div>
          <h1 class="text-2xl font-display font-bold text-text-primary">Detail Barang</h1>
          <p class="text-text-secondary mt-1">Informasi lengkap produk</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button @click="navigateToEdit" class="btn-primary">
          <Edit class="w-4 h-4" />
          Edit
        </button>
        <button @click="deleteProduct" class="btn-danger">
          <Trash2 class="w-4 h-4" />
          Hapus
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Image Gallery -->
      <div class="card p-6">
        <h2 class="font-semibold text-text-primary mb-4">Gambar Produk</h2>
        
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
            <img 
              :src="product.images[currentImageIndex]?.url" 
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            
            <!-- Navigation Arrows -->
            <button 
              v-if="product.images.length > 1"
              @click="prevImage"
              :disabled="currentImageIndex === 0"
              class="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow disabled:opacity-50"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button 
              v-if="product.images.length > 1"
              @click="nextImage"
              :disabled="currentImageIndex === product.images.length - 1"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow disabled:opacity-50"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>

          <!-- Thumbnails -->
          <div v-if="product.images.length > 1" class="flex gap-2">
            <button 
              v-for="(img, index) in product.images" 
              :key="img.id"
              @click="currentImageIndex = index"
              :class="[
                'w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
                currentImageIndex === index ? 'border-accent-primary' : 'border-transparent'
              ]"
            >
              <img :src="img.url" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Info -->
        <div class="card p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h2 class="font-semibold text-xl text-text-primary">{{ product.name }}</h2>
              <p class="text-text-muted font-mono mt-1">{{ product.sku }}</p>
            </div>
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
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                <Tag class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Kategori</p>
                <p class="font-medium text-text-primary">{{ getCategoryLabel(product.category) }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-violet-100 text-violet-600">
                <Package class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Satuan</p>
                <p class="font-medium text-text-primary">{{ product.unit }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pricing -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Harga Jual</h2>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <DollarSign class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Harga (IDR)</p>
                <p class="text-xl font-bold text-text-primary">
                  {{ formatCurrency(product.priceIdr) }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-amber-100 text-amber-600">
                <DollarSign class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Harga (USD)</p>
                <p class="text-xl font-bold text-text-primary">
                  {{ formatCurrency(product.priceUsd, 'USD') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Informasi Tambahan</h2>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <FileText class="w-5 h-5 text-text-muted mt-0.5" />
              <div>
                <p class="text-sm text-text-muted">HS Code</p>
                <p class="font-medium text-text-primary">{{ product.hsCode || '-' }}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <FileText class="w-5 h-5 text-text-muted mt-0.5" />
              <div>
                <p class="text-sm text-text-muted">Deskripsi</p>
                <p class="text-text-primary">{{ product.description || '-' }}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <Calendar class="w-5 h-5 text-text-muted mt-0.5" />
              <div>
                <p class="text-sm text-text-muted">Dibuat</p>
                <p class="font-medium text-text-primary">{{ formatDate(product.createdAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
