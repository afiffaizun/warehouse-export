<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Plus, 
  Search, 
  X,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-vue-next'
import type { Payment } from '@/types/keuangan'
import { 
  mockPayments,
  mockInvoices,
  paymentMethods,
  getPaymentMethodLabel,
  formatCurrency
} from '@/data/keuangan'

const payments = ref<Payment[]>([...mockPayments])
const searchQuery = ref('')
const selectedMethod = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredPayments = computed(() => {
  return payments.value.filter(payment => {
    const matchesSearch = !searchQuery.value || 
      payment.paymentNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.buyerName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesMethod = !selectedMethod.value || payment.paymentMethod === selectedMethod.value
    
    return matchesSearch && matchesMethod
  })
})

const paginatedPayments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPayments.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredPayments.value.length / itemsPerPage.value)
)

const totalPaymentAmount = computed(() => {
  return payments.value.reduce((sum, p) => sum + p.amount, 0)
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedMethod.value = ''
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getMethodBadgeClass = (method: string) => {
  switch (method) {
    case 'bank_transfer': return 'badge-primary'
    case 'cash': return 'badge-success'
    case 'credit': return 'badge-warning'
    default: return 'badge-neutral'
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Pembayaran</h1>
        <p class="text-text-secondary mt-1">Kelola penerimaan pembayaran dari buyer</p>
      </div>
      <button class="btn-primary">
        <Plus class="w-4 h-4" />
        Record Pembayaran
      </button>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
            <DollarSign class="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Transactions</p>
            <p class="text-xl font-bold text-text-primary">{{ payments.length }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Received</p>
            <p class="text-xl font-bold text-emerald-600">{{ formatCurrency(totalPaymentAmount) }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Clock class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Pending Invoices</p>
            <p class="text-xl font-bold text-amber-600">
              {{ mockInvoices.filter(i => i.paymentStatus !== 'paid').length }}
            </p>
          </div>
        </div>
      </div>
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
            placeholder="Cari pembayaran..."
            class="input pl-10"
          />
        </div>

        <!-- Method Filter -->
        <select v-model="selectedMethod" class="input w-full lg:w-48">
          <option value="">Semua Metode</option>
          <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
            {{ method.label }}
          </option>
        </select>

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedMethod"
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
              <th>Pembayaran</th>
              <th>Invoice</th>
              <th>Order</th>
              <th>Buyer</th>
              <th>Metode</th>
              <th>Tgl Pembayaran</th>
              <th>Jumlah</th>
              <th>Ref Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(payment, index) in paginatedPayments" :key="payment.id">
              <td class="font-mono text-sm text-text-muted">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary font-mono">{{ payment.paymentNumber }}</p>
                  <p class="text-sm text-text-muted">{{ formatDate(payment.createdAt) }}</p>
                </div>
              </td>
              <td>
                <span class="font-mono text-sm">{{ payment.invoiceNumber }}</span>
              </td>
              <td>
                <span class="font-mono text-sm">{{ payment.orderNumber }}</span>
              </td>
              <td>
                <p class="font-medium text-text-primary">{{ payment.buyerName }}</p>
              </td>
              <td>
                <span :class="['badge', getMethodBadgeClass(payment.paymentMethod)]">
                  {{ getPaymentMethodLabel(payment.paymentMethod) }}
                </span>
              </td>
              <td class="text-sm">{{ formatDate(payment.paymentDate) }}</td>
              <td class="font-medium text-emerald-600">{{ formatCurrency(payment.amount) }}</td>
              <td>
                <span class="font-mono text-sm text-text-muted">{{ payment.referenceNumber }}</span>
              </td>
            </tr>
            <tr v-if="paginatedPayments.length === 0">
              <td colspan="9" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data pembayaran</p>
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
          {{ Math.min(currentPage * itemsPerPage, filteredPayments.length) }} 
          dari {{ filteredPayments.length }} data
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
