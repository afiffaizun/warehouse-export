<script setup lang="ts">
import { ref } from 'vue'
import { 
  Building,
  Warehouse,
  Globe,
  Bell,
  Save
} from 'lucide-vue-next'

const activeTab = ref('general')

const tabs = [
  { id: 'general', label: 'Umum', icon: Building },
  { id: 'warehouse', label: 'Gudang', icon: Warehouse },
  { id: 'export', label: 'Export', icon: Globe },
  { id: 'notifications', label: 'Notifikasi', icon: Bell }
]

const generalSettings = ref({
  companyName: 'PT ExportHub Indonesia',
  companyAddress: 'Jl. Export No. 123, Jakarta Pusat 10110',
  phone: '+62 21 1234 5678',
  email: 'info@exporthub.com',
  website: 'www.exporthub.com',
  timezone: 'Asia/Jakarta',
  currency: 'USD',
  language: 'id'
})

const warehouseSettings = ref({
  defaultWarehouse: '1',
  autoStockMutation: true,
  lowStockThreshold: 10,
  enableBatchTracking: true,
  enableExpiryTracking: true
})

const exportSettings = ref({
  defaultIncoterms: 'fob',
  defaultPort: 'Tanjung Priok',
  requirePeb: true,
  autoGenerateBl: true,
  defaultCurrency: 'USD'
})

const notificationSettings = ref({
  emailNotifications: true,
  orderUpdates: true,
  stockAlerts: true,
  paymentReminders: true,
  shipmentUpdates: true
})

const saveSettings = () => {
  alert('Pengaturan berhasil disimpan!')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Pengaturan Sistem</h1>
        <p class="text-text-secondary mt-1">Kelola konfigurasi dan preferensi sistem</p>
      </div>
      <button @click="saveSettings" class="btn-primary">
        <Save class="w-4 h-4" />
        Simpan Perubahan
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Tabs -->
      <div class="lg:col-span-1">
        <div class="card p-2">
          <nav class="space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-accent-primary text-white'
                  : 'text-text-secondary hover:bg-slate-100'
              ]"
            >
              <component :is="tab.icon" class="w-5 h-5" />
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div class="lg:col-span-3">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="card p-6 space-y-6">
          <div>
            <h2 class="text-lg font-semibold text-text-primary mb-4">Informasi Perusahaan</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-text-primary mb-1">Nama Perusahaan</label>
                <input v-model="generalSettings.companyName" type="text" class="input" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-text-primary mb-1">Alamat</label>
                <textarea v-model="generalSettings.companyAddress" rows="2" class="input"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Telepon</label>
                <input v-model="generalSettings.phone" type="text" class="input" />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input v-model="generalSettings.email" type="email" class="input" />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Website</label>
                <input v-model="generalSettings.website" type="text" class="input" />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Zona Waktu</label>
                <select v-model="generalSettings.timezone" class="input">
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="border-t border-border pt-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Preferensi</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Mata Uang Default</label>
                <select v-model="generalSettings.currency" class="input">
                  <option value="USD">USD - US Dollar</option>
                  <option value="IDR">IDR - Indonesian Rupiah</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Bahasa</label>
                <select v-model="generalSettings.language" class="input">
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Warehouse Settings -->
        <div v-if="activeTab === 'warehouse'" class="card p-6 space-y-6">
          <div>
            <h2 class="text-lg font-semibold text-text-primary mb-4">Konfigurasi Gudang</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Gudang Default</label>
                <select v-model="warehouseSettings.defaultWarehouse" class="input">
                  <option value="1">Gudang Jakarta</option>
                  <option value="2">Gudang Surabaya</option>
                  <option value="3">Gudang Tangerang</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Batas Stok Minimum</label>
                <input v-model="warehouseSettings.lowStockThreshold" type="number" class="input w-32" />
                <p class="text-sm text-text-muted mt-1">Akan memicu notifikasi jika stok di bawah batas ini</p>
              </div>
            </div>
          </div>

          <div class="border-t border-border pt-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Tracking</h2>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="warehouseSettings.autoStockMutation" type="checkbox" class="checkbox" />
                <span class="text-sm">Otomatis mutasi stok antar gudang</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="warehouseSettings.enableBatchTracking" type="checkbox" class="checkbox" />
                <span class="text-sm">Aktifkan tracking nomor batch</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="warehouseSettings.enableExpiryTracking" type="checkbox" class="checkbox" />
                <span class="text-sm">Aktifkan tracking tanggal kedaluwarsa</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Export Settings -->
        <div v-if="activeTab === 'export'" class="card p-6 space-y-6">
          <div>
            <h2 class="text-lg font-semibold text-text-primary mb-4">Pengaturan Export</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Incoterms Default</label>
                <select v-model="exportSettings.defaultIncoterms" class="input">
                  <option value="fob">FOB - Free On Board</option>
                  <option value="cif">CIF - Cost, Insurance, Freight</option>
                  <option value="exw">EXW - Ex Works</option>
                  <option value="dap">DAP - Delivered at Place</option>
                  <option value="ddp">DDP - Delivered Duty Paid</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Port Export Default</label>
                <select v-model="exportSettings.defaultPort" class="input">
                  <option value="Tanjung Priok">Tanjung Priok, Jakarta</option>
                  <option value="Tanjung Perak">Tanjung Perak, Surabaya</option>
                  <option value="Belawan">Belawan, Medan</option>
                  <option value="Makassar">Makassar, Sulawesi Selatan</option>
                </select>
              </div>
            </div>
          </div>

          <div class="border-t border-border pt-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Dokumen</h2>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="exportSettings.requirePeb" type="checkbox" class="checkbox" />
                <span class="text-sm">Wajib PEB (Pemberitahuan Export Barang)</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="exportSettings.autoGenerateBl" type="checkbox" class="checkbox" />
                <span class="text-sm">Otomatis generate nomor BL</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeTab === 'notifications'" class="card p-6 space-y-6">
          <div>
            <h2 class="text-lg font-semibold text-text-primary mb-4">Preferensi Notifikasi</h2>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="notificationSettings.emailNotifications" type="checkbox" class="checkbox" />
                <span class="text-sm">Aktifkan notifikasi via email</span>
              </label>
            </div>
          </div>

          <div class="border-t border-border pt-6">
            <h2 class="text-lg font-semibold text-text-primary mb-4">Notifikasi yang Diterima</h2>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="notificationSettings.orderUpdates" type="checkbox" class="checkbox" />
                <span class="text-sm">Update pesanan (order baru, status berubah)</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="notificationSettings.stockAlerts" type="checkbox" class="checkbox" />
                <span class="text-sm">Peringatan stok (stok menipis, expired)</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="notificationSettings.paymentReminders" type="checkbox" class="checkbox" />
                <span class="text-sm">Pengingat pembayaran (invoice jatuh tempo)</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="notificationSettings.shipmentUpdates" type="checkbox" class="checkbox" />
                <span class="text-sm">Update pengiriman (status pengiriman)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
