<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-vue-next'
import { incotermsList } from '@/data/order'
import { mockBuyers } from '@/data/pelanggan'
import { mockProducts } from '@/data/barang'
import { mockOrders } from '@/data/order'

const router = useRouter()

const isLoading = ref(false)

const form = ref({
  buyerId: '',
  items: [
    {
      productId: '',
      quantity: 1
    }
  ],
  incoterms: 'fob',
  shippingCostUsd: 0,
  taxPercent: 10,
  notes: ''
})

const selectedBuyer = computed(() => {
  return mockBuyers.find(b => b.id === Number(form.value.buyerId))
})

const availableProducts = computed(() => {
  return mockProducts.filter(p => p.status === 'aktif')
})

const orderItems = computed(() => {
  return form.value.items
    .filter(item => item.productId)
    .map((item, index) => {
      const product = mockProducts.find(p => p.id === Number(item.productId))
      return {
        id: index + 1,
        productId: Number(item.productId),
        productName: product?.name || '',
        productSku: product?.sku || '',
        quantity: item.quantity,
        unit: product?.unit || 'PCS',
        priceUsd: product?.priceUsd || 0,
        totalUsd: (product?.priceUsd || 0) * item.quantity
      }
    })
})

const subtotal = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + item.totalUsd, 0)
})

const taxAmount = computed(() => {
  return subtotal.value * (form.value.taxPercent / 100)
})

const total = computed(() => {
  return subtotal.value + form.value.shippingCostUsd + taxAmount.value
})

const generateOrderNumber = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `SO-${year}${month}-${random}`
}

const addItem = () => {
  form.value.items.push({
    productId: '',
    quantity: 1
  })
}

const removeItem = (index: number) => {
  if (form.value.items.length > 1) {
    form.value.items.splice(index, 1)
  }
}

const getProductInfo = (productId: string) => {
  return availableProducts.value.find(p => p.id === Number(productId))
}

const goBack = () => {
  router.back()
}

const handleSubmit = async () => {
  if (!form.value.buyerId) {
    alert('Mohon pilih buyer')
    return
  }

  const validItems = form.value.items.filter(item => item.productId && item.quantity > 0)
  if (validItems.length === 0) {
    alert('Mohon tambahkan minimal 1 item')
    return
  }

  isLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newId = Math.max(...mockOrders.map(o => o.id)) + 1
    mockOrders.unshift({
      id: newId,
      orderNumber: generateOrderNumber(),
      buyerId: Number(form.value.buyerId),
      buyerName: selectedBuyer.value?.companyName || '',
      buyerCountry: selectedBuyer.value?.country || '',
      items: orderItems.value,
      subtotalUsd: subtotal.value,
      shippingCostUsd: form.value.shippingCostUsd,
      taxUsd: taxAmount.value,
      totalUsd: total.value,
      incoterms: form.value.incoterms as any,
      status: 'draft',
      paymentStatus: 'unpaid',
      notes: form.value.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    
    router.push({ name: 'order' })
  } catch (error) {
    console.error('Error saving order:', error)
  } finally {
    isLoading.value = false
  }
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
        <h1 class="text-2xl font-display font-bold text-text-primary">Buat Order Baru</h1>
        <p class="text-text-secondary mt-1">Buat sales order ekspor baru</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Buyer Selection -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Informasi Buyer</h2>
          
          <div class="form-group">
            <label class="label label-required">Pilih Buyer</label>
            <select v-model="form.buyerId" class="select">
              <option value="">Pilih Buyer</option>
              <option 
                v-for="buyer in mockBuyers" 
                :key="buyer.id" 
                :value="buyer.id"
              >
                {{ buyer.companyName }} ({{ buyer.country }})
              </option>
            </select>
          </div>

          <div v-if="selectedBuyer" class="mt-4 p-4 bg-background-tertiary rounded-lg">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-text-muted">Kontak</p>
                <p class="font-medium">{{ selectedBuyer.contactPerson }}</p>
              </div>
              <div>
                <p class="text-text-muted">Email</p>
                <p class="font-medium">{{ selectedBuyer.email }}</p>
              </div>
              <div>
                <p class="text-text-muted">Credit Limit</p>
                <p class="font-medium">{{ formatCurrency(selectedBuyer.creditLimit) }}</p>
              </div>
              <div>
                <p class="text-text-muted">Payment Terms</p>
                <p class="font-medium">{{ selectedBuyer.paymentTerms }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-text-primary">Item Order</h2>
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
                <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="form-group">
                    <label class="label">Produk</label>
                    <select v-model="item.productId" class="select">
                      <option value="">Pilih Produk</option>
                      <option 
                        v-for="product in availableProducts" 
                        :key="product.id" 
                        :value="product.id"
                      >
                        {{ product.name }} ({{ product.sku }})
                      </option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label class="label">Jumlah</label>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      min="1"
                      class="input"
                      placeholder="0"
                    />
                  </div>

                  <div class="form-group">
                    <label class="label">Subtotal</label>
                    <div class="input bg-slate-100 text-text-muted">
                      {{ formatCurrency((getProductInfo(item.productId)?.priceUsd || 0) * item.quantity) }}
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button"
                  @click="removeItem(index)"
                  :disabled="form.items.length === 1"
                  class="btn-icon btn-ghost text-accent-danger hover:bg-red-50 disabled:opacity-50 mt-6"
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
        <!-- Incoterms -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Incoterms</h2>
          <div class="form-group">
            <select v-model="form.incoterms" class="select">
              <option v-for="term in incotermsList" :key="term.value" :value="term.value">
                {{ term.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Summary -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Ringkasan</h2>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-text-secondary">Subtotal</span>
              <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-text-secondary">Shipping</span>
              <input
                v-model.number="form.shippingCostUsd"
                type="number"
                class="input w-24 text-right"
                placeholder="0"
              />
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-text-secondary">Tax ({{ form.taxPercent }}%)</span>
              <span class="font-medium">{{ formatCurrency(taxAmount) }}</span>
            </div>
            
            <div class="border-t border-border pt-3">
              <div class="flex justify-between">
                <span class="font-semibold">Total</span>
                <span class="font-bold text-lg text-accent-primary">{{ formatCurrency(total) }}</span>
              </div>
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
              {{ isLoading ? 'Menyimpan...' : 'Simpan Order' }}
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
