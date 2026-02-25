<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Search, 
  X,
  Download,
  Printer,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-vue-next'
import type { InvoiceStatus, PaymentStatus } from '@/types/keuangan'
import { 
  mockInvoices,
  invoiceStatusOptions,
  paymentStatusOptions,
  getInvoiceStatusInfo,
  getPaymentStatusInfo
} from '@/data/keuangan'

const invoices = ref([...mockInvoices])
const searchQuery = ref('')
const selectedStatus = ref<InvoiceStatus | ''>('')
const selectedPaymentStatus = ref<PaymentStatus | ''>('')
const dateFrom = ref('')
const dateTo = ref('')

const filteredInvoices = computed(() => {
  return invoices.value.filter(inv => {
    const matchesSearch = !searchQuery.value || 
      inv.invoiceNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      inv.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      inv.buyerName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !selectedStatus.value || inv.status === selectedStatus.value
    const matchesPaymentStatus = !selectedPaymentStatus.value || inv.paymentStatus === selectedPaymentStatus.value
    
    let matchesDate = true
    if (dateFrom.value) {
      matchesDate = matchesDate && new Date(inv.issueDate) >= new Date(dateFrom.value)
    }
    if (dateTo.value) {
      matchesDate = matchesDate && new Date(inv.issueDate) <= new Date(dateTo.value)
    }
    
    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDate
  })
})

const totalInvoices = computed(() => invoices.value.length)
const totalAmount = computed(() => invoices.value.reduce((sum, i) => sum + i.total, 0))
const totalPaid = computed(() => invoices.value.filter(i => i.paymentStatus === 'paid').reduce((sum, i) => sum + i.total, 0))
const totalReceivable = computed(() => invoices.value.filter(i => i.paymentStatus !== 'paid').reduce((sum, i) => sum + (i.total - i.paidAmount), 0))
const overdueCount = computed(() => {
  return invoices.value.filter(i => {
    return new Date(i.dueDate) < new Date() && i.paymentStatus !== 'paid'
  }).length
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedPaymentStatus.value = ''
  dateFrom.value = ''
  dateTo.value = ''
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const getStatusBadgeClass = (color: string) => {
  switch (color) {
    case 'gray': return 'badge-neutral'
    case 'blue': return 'badge-primary'
    case 'emerald': return 'badge-success'
    case 'red': return 'badge-danger'
    default: return 'badge-neutral'
  }
}

const isOverdue = (dueDate: string, paymentStatus: PaymentStatus) => {
  return new Date(dueDate) < new Date() && paymentStatus !== 'paid'
}
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Laporan Keuangan</h1>
        <p class="text-text-secondary mt-1">Ringkasan dan analisis keuangan ekspor</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-outline">
          <Printer class="w-4 h-4" />
          Print
        </button>
        <button class="btn-primary">
          <Download class="w-4 h-4" />
          Export
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
            <FileText class="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Invoices</p>
            <p class="text-xl font-bold text-text-primary">{{ totalInvoices }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <DollarSign class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Amount</p>
            <p class="text-xl font-bold text-blue-600">{{ formatCurrency(totalAmount) }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Paid</p>
            <p class="text-xl font-bold text-emerald-600">{{ formatCurrency(totalPaid) }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Clock class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Receivable</p>
            <p class="text-xl font-bold text-amber-600">{{ formatCurrency(totalReceivable) }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertCircle class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Overdue</p>
            <p class="text-xl font-bold text-red-600">{{ overdueCount }}</p>
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
            placeholder="Cari invoice..."
            class="input pl-10"
          />
        </div>

        <!-- Status Filter -->
        <select v-model="selectedStatus" class="input w-full lg:w-40">
          <option value="">Semua Status</option>
          <option v-for="status in invoiceStatusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>

        <!-- Payment Status Filter -->
        <select v-model="selectedPaymentStatus" class="input w-full lg:w-40">
          <option value="">Semua Pembayaran</option>
          <option v-for="status in paymentStatusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>

        <!-- Date From -->
        <input
          v-model="dateFrom"
          type="date"
          class="input w-full lg:w-40"
          placeholder="Dari tanggal"
        />

        <!-- Date To -->
        <input
          v-model="dateTo"
          type="date"
          class="input w-full lg:w-40"
          placeholder="Sampai tanggal"
        />

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedStatus || selectedPaymentStatus || dateFrom || dateTo"
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
              <th class="text-right">Total</th>
              <th class="text-right">Paid</th>
              <th>Status</th>
              <th>Pembayaran</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inv, index) in filteredInvoices" :key="inv.id">
              <td class="font-mono text-sm text-text-muted">{{ index + 1 }}</td>
              <td>
                <span class="font-medium font-mono text-text-primary">{{ inv.invoiceNumber }}</span>
              </td>
              <td>
                <span class="font-mono text-sm">{{ inv.orderNumber }}</span>
              </td>
              <td>
                <p class="font-medium text-text-primary">{{ inv.buyerName }}</p>
              </td>
              <td class="text-sm">{{ formatDate(inv.issueDate) }}</td>
              <td :class="['text-sm', isOverdue(inv.dueDate, inv.paymentStatus) ? 'text-red-600 font-medium' : '']">
                {{ formatDate(inv.dueDate) }}
              </td>
              <td class="text-right font-medium">{{ formatCurrency(inv.total) }}</td>
              <td class="text-right text-emerald-600">{{ formatCurrency(inv.paidAmount) }}</td>
              <td>
                <span :class="['badge', getStatusBadgeClass(getInvoiceStatusInfo(inv.status).color)]">
                  {{ getInvoiceStatusInfo(inv.status).label }}
                </span>
              </td>
              <td>
                <span :class="['badge', getStatusBadgeClass(getPaymentStatusInfo(inv.paymentStatus).color)]">
                  {{ getPaymentStatusInfo(inv.paymentStatus).label }}
                </span>
              </td>
            </tr>
            <tr v-if="filteredInvoices.length === 0">
              <td colspan="10" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data invoice</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
