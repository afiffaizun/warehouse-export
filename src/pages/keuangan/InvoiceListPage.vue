<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plus, 
  Search, 
  Eye, 
  X,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-vue-next'
import type { Invoice, InvoiceStatus } from '@/types/keuangan'
import { 
  mockInvoices, 
  invoiceStatusOptions,
  paymentStatusOptions,
  getInvoiceStatusInfo,
  getPaymentStatusInfo,
  getTotalReceivable,
  getTotalPaid
} from '@/data/keuangan'

const router = useRouter()

const invoices = ref<Invoice[]>([...mockInvoices])
const searchQuery = ref('')
const selectedStatus = ref<InvoiceStatus | ''>('')
const selectedPaymentStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const totalReceivable = computed(() => getTotalReceivable())
const totalPaid = computed(() => getTotalPaid())

const filteredInvoices = computed(() => {
  return invoices.value.filter(invoice => {
    const matchesSearch = !searchQuery.value || 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      invoice.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      invoice.buyerName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !selectedStatus.value || invoice.status === selectedStatus.value
    const matchesPaymentStatus = !selectedPaymentStatus.value || invoice.paymentStatus === selectedPaymentStatus.value
    
    return matchesSearch && matchesStatus && matchesPaymentStatus
  })
})

const paginatedInvoices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredInvoices.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredInvoices.value.length / itemsPerPage.value)
)

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedPaymentStatus.value = ''
}

const navigateToDetail = (id: number) => {
  router.push({ name: 'keuangan-invoice-detail', params: { id } })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

const getStatusBadgeClass = (color: string) => {
  switch (color) {
    case 'gray': return 'badge-neutral'
    case 'blue': return 'badge-primary'
    case 'emerald': return 'badge-success'
    case 'red': return 'badge-danger'
    case 'slate': return 'badge-neutral'
    default: return 'badge-neutral'
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Daftar Invoice</h1>
        <p class="text-text-secondary mt-1">Kelola invoice dan pembayaran ekspor</p>
      </div>
      <button class="btn-primary">
        <Plus class="w-4 h-4" />
        Buat Invoice
      </button>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
            <FileText class="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Invoice</p>
            <p class="text-xl font-bold text-text-primary">{{ invoices.length }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Paid</p>
            <p class="text-xl font-bold text-emerald-600">{{ formatCurrency(totalPaid) }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertCircle class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Receivable</p>
            <p class="text-xl font-bold text-red-600">{{ formatCurrency(totalReceivable) }}</p>
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
            placeholder="Cari invoice atau order..."
            class="input pl-10"
          />
        </div>

        <!-- Status Filter -->
        <select v-model="selectedStatus" class="input w-full lg:w-44">
          <option value="">Semua Status</option>
          <option v-for="status in invoiceStatusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>

        <!-- Payment Status Filter -->
        <select v-model="selectedPaymentStatus" class="input w-full lg:w-44">
          <option value="">Semua Pembayaran</option>
          <option v-for="status in paymentStatusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedStatus || selectedPaymentStatus"
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
              <th>Invoice</th>
              <th>Order</th>
              <th>Buyer</th>
              <th>Tgl Invoice</th>
              <th>Jatuh Tempo</th>
              <th>Total</th>
              <th>Status</th>
              <th>Pembayaran</th>
              <th class="w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoice, index) in paginatedInvoices" :key="invoice.id">
              <td class="font-mono text-sm text-text-muted">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary font-mono">{{ invoice.invoiceNumber }}</p>
                  <p class="text-sm text-text-muted">{{ invoice.currency }}</p>
                </div>
              </td>
              <td>
                <span class="font-mono text-sm">{{ invoice.orderNumber }}</span>
              </td>
              <td>
                <div>
                  <p class="font-medium text-text-primary">{{ invoice.buyerName }}</p>
                  <p class="text-sm text-text-muted">{{ invoice.buyerAddress.split(',')[0] }}</p>
                </div>
              </td>
              <td class="text-sm">{{ formatDate(invoice.issueDate) }}</td>
              <td class="text-sm">{{ formatDate(invoice.dueDate) }}</td>
              <td class="font-medium">{{ formatCurrency(invoice.total) }}</td>
              <td>
                <span :class="['badge', getStatusBadgeClass(getInvoiceStatusInfo(invoice.status).color)]">
                  {{ getInvoiceStatusInfo(invoice.status).label }}
                </span>
              </td>
              <td>
                <span :class="['badge', getStatusBadgeClass(getPaymentStatusInfo(invoice.paymentStatus).color)]">
                  {{ getPaymentStatusInfo(invoice.paymentStatus).label }}
                </span>
              </td>
              <td>
                <button 
                  @click="navigateToDetail(invoice.id)"
                  class="btn-icon btn-ghost"
                  title="Lihat Detail"
                >
                  <Eye class="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr v-if="paginatedInvoices.length === 0">
              <td colspan="10" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data invoice</p>
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
          {{ Math.min(currentPage * itemsPerPage, filteredInvoices.length) }} 
          dari {{ filteredInvoices.length }} data
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
