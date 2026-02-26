<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import { ArrowLeft, Save, Truck, Plus, Trash2 } from 'lucide-vue-next'
import { mockProducts } from '@/data/barang'
import { warehouses, mockStockItems, mockStockMutations } from '@/data/stok'
import type { StockMutation } from '@/types/stok'

const router = useRouter()
const toastStore = useToastStore()

const isLoading = ref(false)
const showSuccess = ref(false)

const form = ref({
  warehouseId: '',
  notes: '',
  items: [
    {
      productId: '',
      quantity: 0
    }
  ]
})

const availableStock = computed(() => {
  return mockStockItems
    .filter(item => !form.value.warehouseId || item.warehouseId === Number(form.value.warehouseId))
    .map(item => ({
      value: item.productId,
      label: `${item.productName} (${item.productSku}) - Tersedia: ${item.quantity} ${item.unit}`,
      unit: item.unit,
      available: item.quantity,
      warehouseId: item.warehouseId
    }))
})

const getAvailableStock = (productId: string) => {
  return availableStock.value.find(s => s.value === Number(productId))
}

const generateReferenceNumber = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `GI-${year}${month}-${random}`
}

const addItem = () => {
  form.value.items.push({
    productId: '',
    quantity: 0
  })
}

const removeItem = (index: number) => {
  if (form.value.items.length > 1) {
    form.value.items.splice(index, 1)
  }
}

const goBack = () => {
  router.back()
}

const handleSubmit = async () => {
  if (!form.value.warehouseId) {
    toastStore.error('Mohon pilih gudang asal')
    return
  }

  const validItems = form.value.items.filter(item => item.productId && item.quantity > 0)
  if (validItems.length === 0) {
    toastStore.error('Mohon tambahkan minimal 1 item')
    return
  }

  for (const item of validItems) {
    const stock = mockStockItems.find(
      s => s.productId === Number(item.productId) && s.warehouseId === Number(form.value.warehouseId)
    )
    if (!stock || stock.quantity < item.quantity) {
      toastStore.warning('Stok tidak mencukupi untuk produk yang dipilih')
      return
    }
  }

  isLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    validItems.forEach(item => {
      const refNumber = generateReferenceNumber()
      const product = mockProducts.find(p => p.id === Number(item.productId))
      
      mockStockMutations.unshift({
        id: mockStockMutations.length + 1,
        type: 'pengeluaran',
        referenceNumber: refNumber,
        productId: Number(item.productId),
        productName: product?.name || '',
        productSku: product?.sku || '',
        warehouseFrom: Number(form.value.warehouseId),
        warehouseNameFrom: warehouses.find(w => w.id === Number(form.value.warehouseId))?.name || '',
        quantity: item.quantity,
        unit: product?.unit || 'PCS',
        status: 'completed',
        notes: form.value.notes,
        createdBy: 'Admin Gudang',
        createdAt: new Date().toISOString()
      } as StockMutation)

      const existingStock = mockStockItems.find(
        s => s.productId === Number(item.productId) && s.warehouseId === Number(form.value.warehouseId)
      )
      
      if (existingStock) {
        existingStock.quantity -= item.quantity
      }
    })
    
    toastStore.success('Pengeluaran stok berhasil disimpan!')
    showSuccess.value = true
    setTimeout(() => {
      router.push({ name: 'stok' })
    }, 1500)
  } catch (error) {
    console.error('Error saving:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Success Message -->
    <div v-if="showSuccess" class="card p-6 bg-emerald-50 border-emerald-200">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-full bg-emerald-100 text-emerald-600">
          <Truck class="w-6 h-6" />
        </div>
        <div>
          <p class="font-semibold text-emerald-800">Pengeluaran Berhasil!</p>
          <p class="text-sm text-emerald-600">Data pengeluaran barang telah disimpan</p>
        </div>
      </div>
    </div>

    <!-- Page Header -->
    <div class="flex items-center gap-4">
      <button @click="goBack" class="btn-icon btn-ghost">
        <ArrowLeft class="w-5 h-5" />
      </button>
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Pengeluaran Barang</h1>
        <p class="text-text-secondary mt-1">Catat pengeluaran barang dari gudang (Goods Issue)</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Goods Issue Items -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-text-primary">Item Pengeluaran</h2>
            <button type="button" @click="addItem" class="btn-outline btn-sm">
              <Plus class="w-4 h-4" />
              Tambah Item
            </button>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="(item, index) in form.items" 
              :key="index"
              class="p-4 bg-background-tertiary rounded-lg"
            >
              <div class="flex items-start gap-4">
                <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="form-group">
                    <label class="label">Produk</label>
                    <select v-model="item.productId" class="select">
                      <option value="">Pilih Produk</option>
                      <option 
                        v-for="stock in availableStock" 
                        :key="stock.value" 
                        :value="stock.value"
                      >
                        {{ stock.label }}
                      </option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label class="label">Jumlah</label>
                    <div class="flex gap-2">
                      <input
                        v-model.number="item.quantity"
                        type="number"
                        min="1"
                        :max="getAvailableStock(item.productId)?.available || 0"
                        class="input"
                        placeholder="0"
                      />
                      <span class="text-sm text-text-muted self-center">
                        {{ getAvailableStock(item.productId)?.unit || 'unit' }}
                      </span>
                    </div>
                    <p v-if="item.productId" class="text-xs text-text-muted mt-1">
                      Tersedia: {{ getAvailableStock(item.productId)?.available || 0 }}
                    </p>
                  </div>
                </div>
                
                <button 
                  type="button"
                  @click="removeItem(index)"
                  :disabled="form.items.length === 1"
                  class="btn-icon btn-ghost text-accent-danger hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Catatan</h2>
          <textarea
            v-model="form.notes"
            class="textarea"
            rows="3"
            placeholder="Tambahkan catatan jika diperlukan..."
          ></textarea>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Warehouse Selection -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Gudang Asal</h2>
          <div class="space-y-2">
            <label 
              v-for="wh in warehouses" 
              :key="wh.id"
              class="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-slate-50"
            >
              <input 
                type="radio" 
                :value="wh.id" 
                v-model="form.warehouseId"
                class="radio"
              />
              <div>
                <p class="font-medium text-text-primary">{{ wh.name }}</p>
                <p class="text-xs text-text-muted">{{ wh.location }}</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Summary -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Ringkasan</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-text-secondary">Total Item</span>
              <span class="font-medium">{{ form.items.filter(i => i.productId && i.quantity > 0).length }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">Total Jumlah</span>
              <span class="font-medium">
                {{ form.items.reduce((sum, i) => sum + (i.quantity || 0), 0) }}
              </span>
            </div>
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
              {{ isLoading ? 'Menyimpan...' : 'Simpan Pengeluaran' }}
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
