<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Edit, 
  Trash2,
  Building2,
  MapPin,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  Calendar,
  DollarSign,
  ShoppingCart
} from 'lucide-vue-next'
import { getBuyerById, getSegmentInfo, mockBuyers } from '@/data/pelanggan'
import type { Buyer } from '@/types/pelanggan'

const router = useRouter()
const route = useRoute()

const buyer = ref<Buyer | undefined>(getBuyerById(Number(route.params.id)))

onMounted(() => {
  if (!buyer.value) {
    router.push({ name: 'pelanggan' })
  }
})

const goBack = () => {
  router.back()
}

const deleteBuyer = () => {
  if (confirm('Apakah Anda yakin ingin menghapus pelanggan ini?')) {
    const index = mockBuyers.findIndex(b => b.id === buyer.value?.id)
    if (index !== -1) {
      mockBuyers.splice(index, 1)
      router.push({ name: 'pelanggan' })
    }
  }
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getSegmentBadgeClass = (segment: string) => {
  const info = getSegmentInfo(segment as any)
  switch (info.color) {
    case 'amber': return 'badge-warning'
    case 'cyan': return 'badge-primary'
    case 'emerald': return 'badge-success'
    default: return 'badge-neutral'
  }
}
</script>

<template>
  <div v-if="buyer" class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <button @click="goBack" class="btn-icon btn-ghost">
          <ArrowLeft class="w-5 h-5" />
        </button>
        <div>
          <h1 class="text-2xl font-display font-bold text-text-primary">Detail Pelanggan</h1>
          <p class="text-text-secondary mt-1">Informasi lengkap buyer/pelanggan</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn-primary">
          <Edit class="w-4 h-4" />
          Edit
        </button>
        <button @click="deleteBuyer" class="btn-danger">
          <Trash2 class="w-4 h-4" />
          Hapus
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Company Info -->
        <div class="card p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <Building2 class="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 class="font-semibold text-xl text-text-primary">{{ buyer.companyName }}</h2>
                <p class="text-text-muted">{{ buyer.city }}, {{ buyer.country }}</p>
              </div>
            </div>
            <div class="flex gap-2">
              <span :class="['badge', getSegmentBadgeClass(buyer.segment)]">
                {{ getSegmentInfo(buyer.segment).label }}
              </span>
              <span :class="['badge', buyer.status === 'aktif' ? 'badge-success' : 'badge-secondary']">
                {{ buyer.status === 'aktif' ? 'Aktif' : 'Non-aktif' }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-text-muted mt-0.5" />
              <div>
                <p class="text-sm text-text-muted">Alamat</p>
                <p class="text-text-primary">
                  {{ buyer.address }}<br />
                  {{ buyer.city }} {{ buyer.postalCode }}<br />
                  {{ buyer.country }}
                </p>
              </div>
            </div>
            
            <div class="flex items-start gap-3" v-if="buyer.website">
              <Globe class="w-5 h-5 text-text-muted mt-0.5" />
              <div>
                <p class="text-sm text-text-muted">Website</p>
                <a :href="buyer.website" target="_blank" class="text-accent-primary hover:text-cyan-700">
                  {{ buyer.website }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Person -->
        <div class="card p-6">
          <h3 class="font-semibold text-text-primary mb-4">Personel Kontak</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                <User class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Nama</p>
                <p class="font-medium text-text-primary">{{ buyer.contactPerson }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-violet-100 text-violet-600">
                <Mail class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Email</p>
                <a :href="`mailto:${buyer.email}`" class="font-medium text-accent-primary hover:text-cyan-700">
                  {{ buyer.email }}
                </a>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <Phone class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Telepon</p>
                <p class="font-medium text-text-primary">{{ buyer.phone }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Documents -->
        <div class="card p-6">
          <h3 class="font-semibold text-text-primary mb-4">Dokumen</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-amber-100 text-amber-600">
                <FileText class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">NPWP</p>
                <p class="font-medium text-text-primary">{{ buyer.npwp || '-' }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-amber-100 text-amber-600">
                <FileText class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">NIK</p>
                <p class="font-medium text-text-primary">{{ buyer.nik || '-' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="buyer.notes" class="card p-6">
          <h3 class="font-semibold text-text-primary mb-4">Catatan</h3>
          <p class="text-text-secondary">{{ buyer.notes }}</p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Stats -->
        <div class="card p-6">
          <h3 class="font-semibold text-text-primary mb-4">Statistik</h3>
          
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <DollarSign class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Credit Limit</p>
                <p class="font-bold text-lg text-text-primary">{{ formatCurrency(buyer.creditLimit) }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                <ShoppingCart class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Total Orders</p>
                <p class="font-bold text-lg text-text-primary">{{ buyer.totalOrders }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-violet-100 text-violet-600">
                <DollarSign class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-muted">Total Spent</p>
                <p class="font-bold text-lg text-text-primary">{{ formatCurrency(buyer.totalSpent) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Terms -->
        <div class="card p-6">
          <h3 class="font-semibold text-text-primary mb-4">Payment Terms</h3>
          <p class="text-text-secondary">{{ buyer.paymentTerms }}</p>
        </div>

        <!-- Timestamps -->
        <div class="card p-6">
          <h3 class="font-semibold text-text-primary mb-4">Informasi Waktu</h3>
          
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-text-muted" />
              <div>
                <p class="text-xs text-text-muted">Dibuat</p>
                <p class="text-sm text-text-primary">{{ formatDate(buyer.createdAt) }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-text-muted" />
              <div>
                <p class="text-xs text-text-muted">Diperbarui</p>
                <p class="text-sm text-text-primary">{{ formatDate(buyer.updatedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
