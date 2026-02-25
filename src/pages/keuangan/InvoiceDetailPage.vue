<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  FileText,
  Printer,
  Download,
  Trash2,
  Loader2,
  CreditCard,
  Send
} from 'lucide-vue-next'
import type { Invoice } from '@/types/keuangan'
import { 
  getInvoiceById, 
  getInvoiceStatusInfo,
  getPaymentStatusInfo,
  formatCurrency 
} from '@/data/keuangan'

const route = useRoute()
const router = useRouter()

const invoice = ref<Invoice | null>(null)
const loading = ref(true)

onMounted(() => {
  const id = parseInt(route.params.id as string)
  invoice.value = getInvoiceById(id) || null
  loading.value = false
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
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

const remainingAmount = computed(() => {
  if (!invoice.value) return 0
  return invoice.value.total - invoice.value.paidAmount
})

const isOverdue = computed(() => {
  if (!invoice.value) return false
  return new Date(invoice.value.dueDate) < new Date() && invoice.value.paymentStatus !== 'paid'
})

const goBack = () => {
  router.push({ name: 'keuangan-invoice' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Back Button -->
    <button @click="goBack" class="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
      <ArrowLeft class="w-4 h-4" />
      <span>Kembali ke Daftar Invoice</span>
    </button>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-accent-primary" />
    </div>

    <div v-else-if="!invoice" class="card p-12 text-center">
      <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-text-primary mb-2">Invoice Tidak Ditemukan</h2>
      <p class="text-text-secondary mb-4">Invoice dengan ID tersebut tidak ditemukan dalam sistem.</p>
      <button @click="goBack" class="btn-primary">Kembali ke Daftar</button>
    </div>

    <div v-else class="space-y-6">
      <!-- Header Card -->
      <div class="card p-6">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-xl bg-accent-primary/10 flex items-center justify-center">
              <FileText class="w-7 h-7 text-accent-primary" />
            </div>
            <div>
              <h1 class="text-2xl font-display font-bold text-text-primary">{{ invoice.invoiceNumber }}</h1>
              <p class="text-text-secondary mt-1">Order: {{ invoice.orderNumber }}</p>
              <div class="flex items-center gap-3 mt-2">
                <span :class="['badge', getStatusBadgeClass(getInvoiceStatusInfo(invoice.status).color)]">
                  {{ getInvoiceStatusInfo(invoice.status).label }}
                </span>
                <span :class="['badge', getStatusBadgeClass(getPaymentStatusInfo(invoice.paymentStatus).color)]">
                  {{ getPaymentStatusInfo(invoice.paymentStatus).label }}
                </span>
                <span v-if="isOverdue" class="badge badge-danger">Overdue</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button v-if="invoice.status === 'draft'" class="btn-outline">
              <Send class="w-4 h-4" />
              Kirim Invoice
            </button>
            <button v-if="invoice.paymentStatus !== 'paid'" class="btn-primary">
              <CreditCard class="w-4 h-4" />
              Record Payment
            </button>
            <button class="btn-outline">
              <Printer class="w-4 h-4" />
              Print
            </button>
            <button class="btn-outline">
              <Download class="w-4 h-4" />
              PDF
            </button>
            <button class="btn-outline text-red-600 hover:bg-red-50">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Invoice Info -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Informasi Invoice</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-sm text-text-muted">Buyer</label>
                  <p class="font-medium text-text-primary">{{ invoice.buyerName }}</p>
                </div>
                <div>
                  <label class="text-sm text-text-muted">Alamat</label>
                  <p class="text-text-secondary">{{ invoice.buyerAddress }}</p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="text-sm text-text-muted">Tanggal Invoice</label>
                  <p class="font-medium text-text-primary">{{ formatDate(invoice.issueDate) }}</p>
                </div>
                <div>
                  <label class="text-sm text-text-muted">Jatuh Tempo</label>
                  <p :class="['font-medium', isOverdue ? 'text-red-600' : 'text-text-primary']">
                    {{ formatDate(invoice.dueDate) }}
                  </p>
                </div>
                <div>
                  <label class="text-sm text-text-muted">Currency</label>
                  <p class="font-medium text-text-primary">{{ invoice.currency }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Item Invoice</h2>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Unit</th>
                    <th class="text-right">Unit Price</th>
                    <th class="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in invoice.items" :key="item.id">
                    <td class="font-medium">{{ item.description }}</td>
                    <td class="text-right">{{ item.quantity }}</td>
                    <td class="text-right">{{ item.unit }}</td>
                    <td class="text-right">{{ formatCurrency(item.unitPrice) }}</td>
                    <td class="text-right font-medium">{{ formatCurrency(item.totalPrice) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" class="text-right font-medium">Subtotal</td>
                    <td class="text-right">{{ formatCurrency(invoice.subtotal) }}</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-right">Tax ({{ invoice.taxRate }}%)</td>
                    <td class="text-right">{{ formatCurrency(invoice.tax) }}</td>
                  </tr>
                  <tr class="border-t-2 border-border">
                    <td colspan="4" class="text-right font-bold text-lg">Total</td>
                    <td class="text-right font-bold text-lg">{{ formatCurrency(invoice.total) }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="invoice.notes" class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Catatan</h2>
            <p class="text-text-secondary">{{ invoice.notes }}</p>
          </div>
        </div>

        <!-- Right Column - Payment Summary -->
        <div class="space-y-6">
          <!-- Payment Status Card -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Status Pembayaran</h2>
            
            <div class="space-y-4">
              <div class="p-4 bg-slate-50 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-text-muted">Total Amount</span>
                  <span class="font-bold text-text-primary">{{ formatCurrency(invoice.total) }}</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-text-muted">Paid Amount</span>
                  <span class="font-medium text-emerald-600">{{ formatCurrency(invoice.paidAmount) }}</span>
                </div>
                <div class="border-t border-border pt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium">Remaining</span>
                    <span :class="['font-bold', remainingAmount > 0 ? 'text-red-600' : 'text-emerald-600']">
                      {{ formatCurrency(remainingAmount) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-text-muted">Payment Progress</span>
                  <span class="font-medium">{{ Math.round((invoice.paidAmount / invoice.total) * 100) }}%</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    class="bg-emerald-500 h-2 rounded-full transition-all"
                    :style="{ width: `${(invoice.paidAmount / invoice.total) * 100}%` }"
                  ></div>
                </div>
              </div>

              <div v-if="invoice.paidDate" class="text-sm">
                <span class="text-text-muted">Paid on: </span>
                <span class="text-text-primary">{{ formatDate(invoice.paidDate) }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Info -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Informasi Lainnya</h2>
            <div class="space-y-4">
              <div>
                <label class="text-sm text-text-muted">Dibuat</label>
                <p class="text-sm text-text-primary">{{ formatDateTime(invoice.createdAt) }}</p>
              </div>
              <div>
                <label class="text-sm text-text-muted">Terakhir Diupdate</label>
                <p class="text-sm text-text-primary">{{ formatDateTime(invoice.updatedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
