<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  Ship, 
  Plane, 
  Truck, 
  MapPin, 
  Calendar,
  Package,
  FileText,
  Download,
  Printer,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-vue-next'
import type { Shipment } from '@/types/pengiriman'
import { getShipmentById, getStatusInfo, getTransportModeLabel } from '@/data/pengiriman'

const route = useRoute()
const router = useRouter()

const shipment = ref<Shipment | null>(null)
const loading = ref(true)

onMounted(() => {
  const id = parseInt(route.params.id as string)
  shipment.value = getShipmentById(id) || null
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

const getStatusBadgeClass = (status: string) => {
  const info = getStatusInfo(status as any)
  switch (info.color) {
    case 'gray': return 'badge-neutral'
    case 'cyan': return 'badge-primary'
    case 'amber': return 'badge-warning'
    case 'violet': return 'badge-secondary'
    case 'emerald': return 'badge-success'
    default: return 'badge-neutral'
  }
}

const getTransportIcon = (mode: string) => {
  switch (mode) {
    case 'sea': return Ship
    case 'air': return Plane
    case 'land': return Truck
    default: return Ship
  }
}

const getDocumentIcon = (_type: string) => {
  return FileText
}

const getDocumentLabel = (docType: string) => {
  const labels: Record<string, string> = {
    bl: 'Bill of Lading',
    awb: 'Air Waybill',
    peb: 'PEB (Export Declaration)',
    coo: 'Certificate of Origin',
    health_cert: 'Health Certificate',
    invoice: 'Commercial Invoice',
    packing_list: 'Packing List'
  }
  return labels[docType] || docType
}

const statusTimeline = computed(() => {
  if (!shipment.value) return []
  
  const statuses = ['created', 'in_transit', 'arrived', 'customs', 'delivered']
  const currentIndex = statuses.indexOf(shipment.value.status)
  
  return statuses.map((status, index) => ({
    status,
    label: getStatusInfo(status as any).label,
    completed: index <= currentIndex,
    current: index === currentIndex
  }))
})

const goBack = () => {
  router.push({ name: 'pengiriman' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Back Button -->
    <button @click="goBack" class="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
      <ArrowLeft class="w-4 h-4" />
      <span>Kembali ke Daftar Pengiriman</span>
    </button>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader2 class="w-8 h-8 animate-spin text-accent-primary" />
    </div>

    <div v-else-if="!shipment" class="card p-12 text-center">
      <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-text-primary mb-2">Pengiriman Tidak Ditemukan</h2>
      <p class="text-text-secondary mb-4">Pengiriman dengan ID tersebut tidak ditemukan dalam sistem.</p>
      <button @click="goBack" class="btn-primary">Kembali ke Daftar</button>
    </div>

    <div v-else class="space-y-6">
      <!-- Header Card -->
      <div class="card p-6">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-xl bg-accent-primary/10 flex items-center justify-center">
              <component :is="getTransportIcon(shipment.transportMode)" class="w-7 h-7 text-accent-primary" />
            </div>
            <div>
              <h1 class="text-2xl font-display font-bold text-text-primary">{{ shipment.shipmentNumber }}</h1>
              <p class="text-text-secondary mt-1">Order: {{ shipment.orderNumber }}</p>
              <div class="flex items-center gap-3 mt-2">
                <span :class="['badge', getStatusBadgeClass(shipment.status)]">
                  {{ getStatusInfo(shipment.status).label }}
                </span>
                <span class="text-sm text-text-muted flex items-center gap-1">
                  <component :is="getTransportIcon(shipment.transportMode)" class="w-4 h-4" />
                  {{ getTransportModeLabel(shipment.transportMode) }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn-outline">
              <Edit class="w-4 h-4" />
              Edit
            </button>
            <button class="btn-outline">
              <Printer class="w-4 h-4" />
              Print
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
          <!-- Shipment Info -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Informasi Pengiriman</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-sm text-text-muted">Buyer</label>
                  <p class="font-medium text-text-primary">{{ shipment.buyerName }}</p>
                </div>
                <div>
                  <label class="text-sm text-text-muted">Negara Tujuan</label>
                  <p class="font-medium text-text-primary flex items-center gap-2">
                    <MapPin class="w-4 h-4 text-text-muted" />
                    {{ shipment.destinationCountry }}
                  </p>
                </div>
                <div>
                  <label class="text-sm text-text-muted">Port Tujuan</label>
                  <p class="font-medium text-text-primary">{{ shipment.destinationPort }}</p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="text-sm text-text-muted">Carrier</label>
                  <p class="font-medium text-text-primary">{{ shipment.carrierName }}</p>
                </div>
                <div v-if="shipment.voyageNumber">
                  <label class="text-sm text-text-muted">Voyage/Flight Number</label>
                  <p class="font-medium text-text-primary font-mono">{{ shipment.voyageNumber }}</p>
                </div>
                <div v-if="shipment.containerNumber">
                  <label class="text-sm text-text-muted">Container Number</label>
                  <p class="font-medium text-text-primary font-mono">{{ shipment.containerNumber }}</p>
                </div>
                <div v-if="shipment.blNumber">
                  <label class="text-sm text-text-muted">BL/AWB Number</label>
                  <p class="font-medium text-text-primary font-mono">{{ shipment.blNumber }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Dates -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Jadwal Pengiriman</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Calendar class="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <label class="text-sm text-amber-700">ETD (Estimated Departure)</label>
                  <p class="font-semibold text-text-primary">{{ formatDate(shipment.etd) }}</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Calendar class="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <label class="text-sm text-emerald-700">ETA (Estimated Arrival)</label>
                  <p class="font-semibold text-text-primary">{{ formatDate(shipment.eta) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Documents -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-text-primary">Dokumen ({{ shipment.documents.length }})</h2>
              <button class="btn-outline btn-sm">
                <Package class="w-4 h-4" />
                Upload Dokumen
              </button>
            </div>
            
            <div v-if="shipment.documents.length === 0" class="text-center py-8">
              <FileText class="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p class="text-text-secondary">Belum ada dokumen</p>
              <button class="btn-primary btn-sm mt-3">Upload Dokumen Pertama</button>
            </div>

            <div v-else class="space-y-3">
              <div 
                v-for="doc in shipment.documents" 
                :key="doc.id"
                class="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                    <component :is="getDocumentIcon(doc.type)" class="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <p class="font-medium text-text-primary">{{ doc.name }}</p>
                    <p class="text-sm text-text-muted">{{ getDocumentLabel(doc.type) }} • {{ formatDateTime(doc.uploadedAt) }}</p>
                  </div>
                </div>
                <button class="btn-icon btn-ghost">
                  <Download class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="shipment.notes" class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Catatan</h2>
            <p class="text-text-secondary">{{ shipment.notes }}</p>
          </div>
        </div>

        <!-- Right Column - Status Timeline -->
        <div class="space-y-6">
          <!-- Status Timeline -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-6">Status Pengiriman</h2>
            <div class="relative">
              <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
              <div class="space-y-6">
                <div 
                  v-for="item in statusTimeline" 
                  :key="item.status"
                  class="relative flex items-start gap-4"
                >
                  <div 
                    :class="[
                      'relative z-10 w-8 h-8 rounded-full flex items-center justify-center',
                      item.completed 
                        ? 'bg-accent-primary text-white' 
                        : 'bg-slate-100 text-text-muted'
                    ]"
                  >
                    <CheckCircle v-if="item.completed && !item.current" class="w-5 h-5" />
                    <Loader2 v-else-if="item.current" class="w-5 h-5 animate-spin" />
                    <Clock v-else class="w-5 h-5" />
                  </div>
                  <div class="pt-1">
                    <p 
                      :class="[
                        'font-medium',
                        item.completed ? 'text-text-primary' : 'text-text-muted'
                      ]"
                    >
                      {{ item.label }}
                    </p>
                    <p v-if="item.current" class="text-sm text-accent-primary">Sedang Berlangsung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Info -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Informasi Lainnya</h2>
            <div class="space-y-4">
              <div>
                <label class="text-sm text-text-muted">Dibuat</label>
                <p class="text-sm text-text-primary">{{ formatDateTime(shipment.createdAt) }}</p>
              </div>
              <div>
                <label class="text-sm text-text-muted">Terakhir Diupdate</label>
                <p class="text-sm text-text-primary">{{ formatDateTime(shipment.updatedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
