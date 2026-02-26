<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import { ArrowLeft, Save } from 'lucide-vue-next'
import type { BuyerFormData } from '@/types/pelanggan'
import { countries, segments, paymentTerms, getBuyerById, mockBuyers } from '@/data/pelanggan'

const router = useRouter()
const route = useRoute()
const toastStore = useToastStore()

const isEditMode = computed(() => !!route.params.id)
const pageTitle = computed(() => isEditMode.value ? 'Edit Pelanggan' : 'Tambah Pelanggan')

const isLoading = ref(false)

const formData = ref<BuyerFormData>({
  companyName: '',
  address: '',
  country: '',
  city: '',
  postalCode: '',
  contactPerson: '',
  email: '',
  phone: '',
  website: '',
  segment: 'new',
  status: 'aktif',
  creditLimit: 0,
  paymentTerms: 'dp_30',
  npwp: '',
  nik: '',
  notes: ''
})

onMounted(() => {
  if (isEditMode.value && route.params.id) {
    const buyer = getBuyerById(Number(route.params.id))
    if (buyer) {
      formData.value = {
        companyName: buyer.companyName,
        address: buyer.address,
        country: buyer.country,
        city: buyer.city,
        postalCode: buyer.postalCode,
        contactPerson: buyer.contactPerson,
        email: buyer.email,
        phone: buyer.phone,
        website: buyer.website || '',
        segment: buyer.segment,
        status: buyer.status,
        creditLimit: buyer.creditLimit,
        paymentTerms: buyer.paymentTerms,
        npwp: buyer.npwp || '',
        nik: buyer.nik || '',
        notes: buyer.notes || ''
      }
    }
  }
})

const goBack = () => {
  router.back()
}

const handleSubmit = async () => {
  if (!formData.value.companyName || !formData.value.contactPerson || !formData.value.email) {
    toastStore.error('Mohon lengkapi form yang wajib diisi')
    return
  }

  isLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (isEditMode.value) {
      const index = mockBuyers.findIndex(b => b.id === Number(route.params.id))
      if (index !== -1) {
        const existingBuyer = mockBuyers[index]
        mockBuyers[index] = {
          ...existingBuyer,
          ...formData.value,
          documents: existingBuyer.documents,
          totalOrders: existingBuyer.totalOrders,
          totalSpent: existingBuyer.totalSpent,
          updatedAt: new Date().toISOString()
        }
      }
    } else {
      const newId = Math.max(...mockBuyers.map(b => b.id)) + 1
      mockBuyers.push({
        id: newId,
        ...formData.value,
        documents: [],
        totalOrders: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }
    
    toastStore.success(isEditMode.value ? 'Pelanggan berhasil diperbarui!' : 'Pengguna berhasil ditambahkan!')
    router.push({ name: 'pelanggan' })
  } catch (error) {
    console.error('Error saving buyer:', error)
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
          {{ isEditMode ? 'Perbarui data pelanggan' : 'Tambah pelanggan baru' }}
        </p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Company Info -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Informasi Perusahaan</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group md:col-span-2">
              <label class="label label-required">Nama Perusahaan</label>
              <input
                v-model="formData.companyName"
                type="text"
                class="input"
                placeholder="Contoh: ABC Corporation"
              />
            </div>
            
            <div class="form-group md:col-span-2">
              <label class="label">Alamat</label>
              <textarea
                v-model="formData.address"
                class="textarea"
                rows="2"
                placeholder="Alamat lengkap..."
              ></textarea>
            </div>

            <div class="form-group">
              <label class="label">Negara</label>
              <select v-model="formData.country" class="select">
                <option value="">Pilih Negara</option>
                <option v-for="country in countries" :key="country.code" :value="country.name">
                  {{ country.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="label">Kota</label>
              <input
                v-model="formData.city"
                type="text"
                class="input"
                placeholder="Contoh: New York"
              />
            </div>

            <div class="form-group">
              <label class="label">Kode Pos</label>
              <input
                v-model="formData.postalCode"
                type="text"
                class="input"
                placeholder="Contoh: 10001"
              />
            </div>

            <div class="form-group">
              <label class="label">Website</label>
              <input
                v-model="formData.website"
                type="text"
                class="input"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <!-- Contact Person -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Informasi Kontak</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="label label-required">Nama Kontak</label>
              <input
                v-model="formData.contactPerson"
                type="text"
                class="input"
                placeholder="Contoh: John Smith"
              />
            </div>
            
            <div class="form-group">
              <label class="label label-required">Email</label>
              <input
                v-model="formData.email"
                type="email"
                class="input"
                placeholder="email@company.com"
              />
            </div>

            <div class="form-group">
              <label class="label">Telepon</label>
              <input
                v-model="formData.phone"
                type="text"
                class="input"
                placeholder="+1 234-567-8900"
              />
            </div>
          </div>
        </div>

        <!-- Documents -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Dokumen</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="label">NPWP</label>
              <input
                v-model="formData.npwp"
                type="text"
                class="input"
                placeholder="Nomor NPWP"
              />
            </div>
            
            <div class="form-group">
              <label class="label">NIK</label>
              <input
                v-model="formData.nik"
                type="text"
                class="input"
                placeholder="Nomor NIK"
              />
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Catatan</h2>
          <textarea
            v-model="formData.notes"
            class="textarea"
            rows="3"
            placeholder="Tambahkan catatan jika diperlukan..."
          ></textarea>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Segment & Status -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Segmentasi & Status</h2>
          
          <div class="space-y-4">
            <div class="form-group">
              <label class="label">Segment</label>
              <select v-model="formData.segment" class="select">
                <option v-for="seg in segments" :key="seg.value" :value="seg.value">
                  {{ seg.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="label">Status</label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="aktif" v-model="formData.status" class="radio" />
                  <span class="text-sm">Aktif</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="nonaktif" v-model="formData.status" class="radio" />
                  <span class="text-sm">Non-aktif</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Credit & Payment -->
        <div class="card p-6">
          <h2 class="font-semibold text-text-primary mb-4">Kredit & Pembayaran</h2>
          
          <div class="space-y-4">
            <div class="form-group">
              <label class="label">Credit Limit (USD)</label>
              <input
                v-model.number="formData.creditLimit"
                type="number"
                class="input"
                placeholder="0"
              />
            </div>

            <div class="form-group">
              <label class="label">Payment Terms</label>
              <select v-model="formData.paymentTerms" class="select">
                <option v-for="term in paymentTerms" :key="term.value" :value="term.value">
                  {{ term.label }}
                </option>
              </select>
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
