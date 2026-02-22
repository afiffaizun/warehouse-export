<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Save, Upload, X } from 'lucide-vue-next'
import type { ProductFormData } from '@/types/barang'
import { categories, statuses, units, getProductById, mockProducts } from '@/data/barang'

const router = useRouter()
const route = useRoute()

const isEditMode = computed(() => !!route.params.id)
const pageTitle = computed(() => isEditMode.value ? 'Edit Barang' : 'Tambah Barang')

const isLoading = ref(false)

const formData = ref<ProductFormData>({
  name: '',
  sku: '',
  category: 'batik',
  unit: 'PCS',
  description: '',
  hsCode: '',
  priceIdr: 0,
  priceUsd: 0,
  status: 'aktif'
})

const imagePreview = ref<string[]>([])

onMounted(() => {
  if (isEditMode.value && route.params.id) {
    const product = getProductById(Number(route.params.id))
    if (product) {
      formData.value = {
        name: product.name,
        sku: product.sku,
        category: product.category,
        unit: product.unit,
        description: product.description,
        hsCode: product.hsCode,
        priceIdr: product.priceIdr,
        priceUsd: product.priceUsd,
        status: product.status
      }
      imagePreview.value = product.images.map(img => img.url)
    }
  }
})

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const url = URL.createObjectURL(file)
    imagePreview.value.push(url)
  }
}

const removeImage = (index: number) => {
  imagePreview.value.splice(index, 1)
}

const goBack = () => {
  router.back()
}

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.sku || !formData.value.category) {
    alert('Mohon lengkapi form yang wajib diisi')
    return
  }

  isLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (isEditMode.value) {
      const index = mockProducts.findIndex(p => p.id === Number(route.params.id))
      if (index !== -1) {
        mockProducts[index] = {
          ...mockProducts[index],
          ...formData.value,
          images: imagePreview.value.map((url, i) => ({
            id: i + 1,
            url,
            isPrimary: i === 0
          }))
        }
      }
    } else {
      const newId = Math.max(...mockProducts.map(p => p.id)) + 1
      mockProducts.push({
        id: newId,
        ...formData.value,
        images: imagePreview.value.map((url, i) => ({
          id: i + 1,
          url,
          isPrimary: i === 0
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }
    
    router.push({ name: 'barang' })
  } catch (error) {
    console.error('Error saving product:', error)
  } finally {
    isLoading.value = false
  }
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
        <h1 class="text-2xl font-display font-bold text-text-primary">{{ pageTitle }}</h1>
        <p class="text-text-secondary mt-1">
          {{ isEditMode ? 'Perbarui data produk' : 'Tambah produk baru ke inventori' }}
        </p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Info -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Informasi Dasar</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="label label-required">Nama Barang</label>
              <input
                v-model="formData.name"
                type="text"
                class="input"
                placeholder="Contoh: Batik Premium Motif Parang"
              />
            </div>
            
            <div class="form-group">
              <label class="label label-required">SKU</label>
              <input
                v-model="formData.sku"
                type="text"
                class="input"
                placeholder="Contoh: BAT-PAR-001"
              />
            </div>

            <div class="form-group">
              <label class="label label-required">Kategori</label>
              <select v-model="formData.category" class="select">
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                  {{ cat.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="label">Satuan</label>
              <select v-model="formData.unit" class="select">
                <option v-for="unit in units" :key="unit" :value="unit">
                  {{ unit }}
                </option>
              </select>
            </div>

            <div class="form-group md:col-span-2">
              <label class="label">HS Code</label>
              <input
                v-model="formData.hsCode"
                type="text"
                class="input"
                placeholder="Contoh: 6204.42.00"
              />
              <p class="form-hint">Harmonized System Code untuk klasifikasi ekspor</p>
            </div>
          </div>
        </div>

        <!-- Pricing -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Harga Jual</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="label">Harga (IDR)</label>
              <input
                v-model.number="formData.priceIdr"
                type="number"
                class="input"
                placeholder="0"
              />
            </div>
            
            <div class="form-group">
              <label class="label">Harga (USD)</label>
              <input
                v-model.number="formData.priceUsd"
                type="number"
                step="0.01"
                class="input"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Deskripsi</h2>
          
          <div class="form-group">
            <textarea
              v-model="formData.description"
              class="textarea"
              rows="4"
              placeholder="Deskripsi produk..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Image Upload -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Gambar Produk</h2>
          
          <div class="space-y-4">
            <!-- Image Preview Grid -->
            <div v-if="imagePreview.length > 0" class="grid grid-cols-3 gap-2">
              <div 
                v-for="(img, index) in imagePreview" 
                :key="index"
                class="relative aspect-square rounded-lg overflow-hidden bg-slate-100"
              >
                <img :src="img" class="w-full h-full object-cover" />
                <button 
                  type="button"
                  @click="removeImage(index)"
                  class="absolute top-1 right-1 p-1 bg-white rounded-full shadow text-red-500 hover:bg-red-50"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>

            <!-- Upload Button -->
            <div class="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent-primary transition-colors">
              <input 
                type="file" 
                accept="image/*" 
                multiple
                class="hidden" 
                id="image-upload"
                @change="handleImageUpload"
              />
              <label for="image-upload" class="cursor-pointer">
                <Upload class="w-8 h-8 mx-auto text-text-muted mb-2" />
                <p class="text-sm text-text-secondary">Klik untuk upload</p>
                <p class="text-xs text-text-muted">PNG, JPG max 5MB</p>
              </label>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Status</h2>
          
          <div class="space-y-2">
            <label 
              v-for="status in statuses" 
              :key="status.value"
              class="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-slate-50"
            >
              <input 
                type="radio" 
                :value="status.value" 
                v-model="formData.status"
                class="radio"
              />
              <span class="font-medium">{{ status.label }}</span>
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="card p-6">
          <div class="space-y-3">
            <button 
              type="submit" 
              :disabled="isLoading"
              class="btn-primary w-full"
            >
              <Save class="w-4 h-4" />
              {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
            </button>
            <button 
              type="button" 
              @click="goBack"
              class="btn-outline w-full"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
