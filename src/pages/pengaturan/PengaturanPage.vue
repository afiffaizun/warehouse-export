<script setup lang="ts">
import { ref } from 'vue'
import { useToastStore } from '@/stores/toast'
import { 
  Building,
  Warehouse,
  Globe,
  Bell,
  Save,
  Plus,
  UserCog,
  Trash2,
  Edit,
  X,
  Mail
} from 'lucide-vue-next'

const toastStore = useToastStore()
import { mockUsers, roleOptions, statusOptions } from '@/data/pengguna'
import type { User, UserFormData, UserRole, UserStatus } from '@/types/pengguna'

const activeTab = ref('general')

const tabs = [
  { id: 'general', label: 'Umum', icon: Building },
  { id: 'warehouse', label: 'Gudang', icon: Warehouse },
  { id: 'export', label: 'Export', icon: Globe },
  { id: 'notifications', label: 'Notifikasi', icon: Bell },
  { id: 'users', label: 'Pengguna', icon: UserCog }
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

const users = ref<User[]>([...mockUsers])
const showUserModal = ref(false)
const editingUser = ref<User | null>(null)
const showDeleteModal = ref(false)
const deletingUserId = ref<number | null>(null)

const userForm = ref<UserFormData>({
  name: '',
  email: '',
  role: 'staff',
  status: 'active',
  phone: '',
  department: '',
  password: ''
})

const defaultUserForm: UserFormData = {
  name: '',
  email: '',
  role: 'staff',
  status: 'active',
  phone: '',
  department: '',
  password: ''
}

const saveSettings = () => {
  toastStore.success('Pengaturan berhasil disimpan!')
}

const openAddUserModal = () => {
  editingUser.value = null
  userForm.value = { ...defaultUserForm }
  showUserModal.value = true
}

const openEditUserModal = (user: User) => {
  editingUser.value = user
  userForm.value = {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    phone: user.phone || '',
    department: user.department || '',
    password: ''
  }
  showUserModal.value = true
}

const closeUserModal = () => {
  showUserModal.value = false
  editingUser.value = null
  userForm.value = { ...defaultUserForm }
}

const saveUser = () => {
  if (!userForm.value.name || !userForm.value.email) {
    toastStore.error('Nama dan email harus diisi!')
    return
  }

  if (editingUser.value) {
    const index = users.value.findIndex(u => u.id === editingUser.value!.id)
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        name: userForm.value.name,
        email: userForm.value.email,
        role: userForm.value.role,
        status: userForm.value.status,
        phone: userForm.value.phone || undefined,
        department: userForm.value.department || undefined,
        updatedAt: new Date().toISOString()
      }
    }
    toastStore.success('Pengguna berhasil diperbarui!')
  } else {
    const newUser: User = {
      id: Math.max(...users.value.map(u => u.id)) + 1,
      name: userForm.value.name,
      email: userForm.value.email,
      role: userForm.value.role,
      status: userForm.value.status,
      phone: userForm.value.phone || undefined,
      department: userForm.value.department || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    users.value.push(newUser)
    toastStore.success('Pengguna berhasil ditambahkan!')
  }
  closeUserModal()
}

const confirmDeleteUser = (id: number) => {
  deletingUserId.value = id
  showDeleteModal.value = true
}

const deleteUser = () => {
  if (deletingUserId.value) {
    users.value = users.value.filter(u => u.id !== deletingUserId.value)
    toastStore.success('Pengguna berhasil dihapus!')
  }
  showDeleteModal.value = false
  deletingUserId.value = null
}

const getRoleBadgeClass = (role: UserRole) => {
  switch (role) {
    case 'admin': return 'badge-danger'
    case 'manager': return 'badge-warning'
    case 'staff': return 'badge-primary'
    case 'warehouse': return 'badge-secondary'
    default: return 'badge-neutral'
  }
}

const getStatusBadgeClass = (status: UserStatus) => {
  switch (status) {
    case 'active': return 'badge-success'
    case 'inactive': return 'badge-neutral'
    case 'suspended': return 'badge-danger'
    default: return 'badge-neutral'
  }
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

        <!-- Users Settings -->
        <div v-if="activeTab === 'users'" class="space-y-4">
          <div class="card p-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-text-primary">Manajemen Pengguna</h2>
                <p class="text-sm text-text-muted">Kelola pengguna sistem ({{ users.length }} pengguna)</p>
              </div>
              <button @click="openAddUserModal" class="btn-primary">
                <Plus class="w-4 h-4" />
                Tambah Pengguna
              </button>
            </div>
          </div>

          <div class="card overflow-hidden">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th class="w-16">No</th>
                    <th>Pengguna</th>
                    <th>Role</th>
                    <th>Departemen</th>
                    <th>Status</th>
                    <th class="w-32">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="user.id">
                    <td class="font-mono text-sm text-text-muted">{{ index + 1 }}</td>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center">
                          <span class="text-sm font-medium text-accent-primary">{{ user.name.charAt(0) }}</span>
                        </div>
                        <div>
                          <p class="font-medium text-text-primary">{{ user.name }}</p>
                          <p class="text-sm text-text-muted flex items-center gap-1">
                            <Mail class="w-3 h-3" />
                            {{ user.email }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span :class="['badge', getRoleBadgeClass(user.role)]">
                        {{ roleOptions.find(r => r.value === user.role)?.label }}
                      </span>
                    </td>
                    <td class="text-sm">{{ user.department || '-' }}</td>
                    <td>
                      <span :class="['badge', getStatusBadgeClass(user.status)]">
                        {{ statusOptions.find(s => s.value === user.status)?.label }}
                      </span>
                    </td>
                    <td>
                      <div class="flex items-center gap-1">
                        <button 
                          @click="openEditUserModal(user)"
                          class="btn-icon btn-ghost"
                          title="Edit"
                        >
                          <Edit class="w-4 h-4" />
                        </button>
                        <button 
                          @click="confirmDeleteUser(user.id)"
                          class="btn-icon btn-ghost text-red-600 hover:bg-red-50"
                          title="Hapus"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Modal -->
    <div v-if="showUserModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between p-4 border-b border-border">
          <h3 class="text-lg font-semibold text-text-primary">
            {{ editingUser ? 'Edit Pengguna' : 'Tambah Pengguna' }}
          </h3>
          <button @click="closeUserModal" class="btn-icon btn-ghost">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input v-model="userForm.name" type="text" class="input" placeholder="Masukkan nama lengkap" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">
              Email <span class="text-red-500">*</span>
            </label>
            <input v-model="userForm.email" type="email" class="input" placeholder="email@example.com" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">
              Password <span v-if="!editingUser" class="text-red-500">*</span>
            </label>
            <input v-model="userForm.password" type="password" class="input" :placeholder="editingUser ? 'Kosongkan jika tidak diubah' : 'Masukkan password'" />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-text-primary mb-1">Role</label>
              <select v-model="userForm.role" class="input">
                <option v-for="role in roleOptions" :key="role.value" :value="role.value">
                  {{ role.label }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-text-primary mb-1">Status</label>
              <select v-model="userForm.status" class="input">
                <option v-for="status in statusOptions" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Telepon</label>
            <input v-model="userForm.phone" type="text" class="input" placeholder="+62 812 3456 7890" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Departemen</label>
            <input v-model="userForm.department" type="text" class="input" placeholder="IT, Operations, Finance, dll" />
          </div>
        </div>
        
        <div class="flex items-center justify-end gap-2 p-4 border-t border-border">
          <button @click="closeUserModal" class="btn-outline">Batal</button>
          <button @click="saveUser" class="btn-primary">
            {{ editingUser ? 'Simpan Perubahan' : 'Tambah Pengguna' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-sm">
        <div class="p-6 text-center">
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Trash2 class="w-6 h-6 text-red-600" />
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Hapus Pengguna?</h3>
          <p class="text-text-secondary">Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.</p>
        </div>
        
        <div class="flex items-center justify-end gap-2 p-4 border-t border-border">
          <button @click="showDeleteModal = false" class="btn-outline">Batal</button>
          <button @click="deleteUser" class="btn-danger">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>
