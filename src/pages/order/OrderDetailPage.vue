<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Edit,
  FileText,
  Truck,
  Package,
  CheckCircle,
  MapPin,
  Calendar,
  User
} from 'lucide-vue-next'
import { getOrderById, getStatusInfo, getPaymentStatusInfo, getIncotermsLabel } from '@/data/order'

const router = useRouter()
const route = useRoute()

const order = ref(getOrderById(Number(route.params.id)))

onMounted(() => {
  if (!order.value) {
    router.push({ name: 'order' })
  }
})

const goBack = () => {
  router.back()
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusSteps = [
  { key: 'draft', label: 'Draft', icon: FileText },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'packing', label: 'Packing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: MapPin },
  { key: 'completed', label: 'Completed', icon: CheckCircle }
]

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'draft': return 'badge-neutral'
    case 'confirmed': return 'badge-primary'
    case 'packing': return 'badge-warning'
    case 'shipped': return 'badge-secondary'
    case 'delivered': return 'badge-info'
    case 'completed': return 'badge-success'
    case 'cancelled': return 'badge-danger'
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

const isStatusActive = (stepKey: string) => {
  const statusOrder = ['draft', 'confirmed', 'packing', 'shipped', 'delivered', 'completed']
  const currentIndex = statusOrder.indexOf(order.value?.status || '')
  const stepIndex = statusOrder.indexOf(stepKey)
  return stepIndex <= currentIndex
}
</script>

<template>
  <div v-if="order" class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <button @click="goBack" class="btn-icon btn-ghost">
          <ArrowLeft class="w-5 h-5" />
        </button>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-display font-bold text-text-primary">{{ order.orderNumber }}</h1>
            <span :class="['badge', getStatusBadgeClass(order.status)]">
              {{ getStatusInfo(order.status).label }}
            </span>
          </div>
          <p class="text-text-secondary mt-1">Detail order penjualan</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn-outline">
          <FileText class="w-4 h-4" />
          Invoice
        </button>
        <button class="btn-primary">
          <Edit class="w-4 h-4" />
          Edit
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Status Timeline -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Status Order</h2>
          
          <div class="flex items-center justify-between">
            <div 
              v-for="(step, index) in statusSteps" 
              :key="step.key"
              class="flex items-center"
            >
              <div class="flex flex-col items-center">
                <div 
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    isStatusActive(step.key) 
                      ? 'bg-accent-primary text-white' 
                      : 'bg-slate-200 text-text-muted'
                  ]"
                >
                  <component :is="step.icon" class="w-5 h-5" />
                </div>
                <span 
                  :class="[
                    'text-xs mt-2',
                    isStatusActive(step.key) ? 'text-accent-primary font-medium' : 'text-text-muted'
                  ]"
                >
                  {{ step.label }}
                </span>
              </div>
              
              <div 
                v-if="index < statusSteps.length - 1"
                :class="[
                  'w-12 h-0.5 mx-2',
                  isStatusActive(statusSteps[index + 1].key) ? 'bg-accent-primary' : 'bg-slate-200'
                ]"
              />
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="card overflow-hidden">
          <div class="p-4 border-b border-border">
            <h2 class="font-semibold text-text-primary">Item Order</h2>
          </div>
          
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right">Unit Price</th>
                  <th class="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.items" :key="item.id">
                  <td>
                    <div>
                      <p class="font-medium text-text-primary">{{ item.productName }}</p>
                      <p class="text-sm text-text-muted font-mono">{{ item.productSku }}</p>
                    </div>
                  </td>
                  <td class="text-right">{{ item.quantity }} {{ item.unit }}</td>
                  <td class="text-right">{{ formatCurrency(item.priceUsd) }}</td>
                  <td class="text-right font-medium">{{ formatCurrency(item.totalUsd) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="order.notes" class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Catatan</h2>
          <p class="text-text-secondary">{{ order.notes }}</p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Order Summary -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Ringkasan</h2>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-text-secondary">Subtotal</span>
              <span class="font-medium">{{ formatCurrency(order.subtotalUsd) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">Shipping</span>
              <span class="font-medium">{{ formatCurrency(order.shippingCostUsd) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">Tax</span>
              <span class="font-medium">{{ formatCurrency(order.taxUsd) }}</span>
            </div>
            <div class="border-t border-border pt-3">
              <div class="flex justify-between">
                <span class="font-semibold">Total</span>
                <span class="font-bold text-xl text-accent-primary">{{ formatCurrency(order.totalUsd) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Buyer Info -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Buyer</h2>
          
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                <User class="w-4 h-4" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Buyer</p>
                <p class="font-medium text-text-primary">{{ order.buyerName }}</p>
                <p class="text-sm text-text-muted">{{ order.buyerCountry }}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-violet-100 text-violet-600">
                <FileText class="w-4 h-4" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Incoterms</p>
                <p class="font-medium text-text-primary">{{ getIncotermsLabel(order.incoterms) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Status -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Pembayaran</h2>
          
          <div class="flex items-center gap-3">
            <span :class="['badge', getPaymentBadgeClass(order.paymentStatus)]">
              {{ getPaymentStatusInfo(order.paymentStatus).label }}
            </span>
          </div>
        </div>

        <!-- Timestamps -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Riwayat Waktu</h2>
          
          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-text-muted" />
              <span class="text-text-muted">Dibuat:</span>
              <span class="text-text-primary">{{ formatDate(order.createdAt) }}</span>
            </div>
            <div v-if="order.confirmedAt" class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-text-muted" />
              <span class="text-text-muted">Confirmed:</span>
              <span class="text-text-primary">{{ formatDate(order.confirmedAt) }}</span>
            </div>
            <div v-if="order.shippedAt" class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-text-muted" />
              <span class="text-text-muted">Shipped:</span>
              <span class="text-text-primary">{{ formatDate(order.shippedAt) }}</span>
            </div>
            <div v-if="order.deliveredAt" class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-text-muted" />
              <span class="text-text-muted">Delivered:</span>
              <span class="text-text-primary">{{ formatDate(order.deliveredAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
