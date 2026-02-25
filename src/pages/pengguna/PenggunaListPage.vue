<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Plus, 
  Search, 
  Eye, 
  X,
  Edit,
  Trash2,
  Mail,
  Shield,
  Clock,
  CheckCircle,
  User as UserIcon
} from 'lucide-vue-next'
import type { User as UserType, UserRole, UserStatus } from '@/types/pengguna'
import { 
  mockUsers, 
  roleOptions,
  statusOptions,
  getRoleInfo,
  getStatusInfo,
  getTotalActiveUsers,
  getTotalAdmins
} from '@/data/pengguna'

const users = ref<UserType[]>([...mockUsers])
const searchQuery = ref('')
const selectedRole = ref<UserRole | ''>('')
const selectedStatus = ref<UserStatus | ''>('')

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !searchQuery.value || 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRole = !selectedRole.value || user.role === selectedRole.value
    const matchesStatus = !selectedStatus.value || user.status === selectedStatus.value
    
    return matchesSearch && matchesRole && matchesStatus
  })
})

const totalUsers = computed(() => users.value.length)
const activeUsers = computed(() => getTotalActiveUsers())
const adminCount = computed(() => getTotalAdmins())

const clearFilters = () => {
  searchQuery.value = ''
  selectedRole.value = ''
  selectedStatus.value = ''
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusBadgeClass = (color: string) => {
  switch (color) {
    case 'emerald': return 'badge-success'
    case 'gray': return 'badge-neutral'
    case 'red': return 'badge-danger'
    default: return 'badge-neutral'
  }
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
</script>

<template>
  <div class="space-y-4">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Manajemen Pengguna</h1>
        <p class="text-text-secondary mt-1">Kelola pengguna dan hak akses sistem</p>
      </div>
      <button class="btn-primary">
        <Plus class="w-4 h-4" />
        Tambah Pengguna
      </button>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
            <UserIcon class="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Total Pengguna</p>
            <p class="text-xl font-bold text-text-primary">{{ totalUsers }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Pengguna Aktif</p>
            <p class="text-xl font-bold text-emerald-600">{{ activeUsers }}</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <Shield class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-sm text-text-muted">Administrator</p>
            <p class="text-xl font-bold text-red-600">{{ adminCount }}</p>
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
            placeholder="Cari nama atau email..."
            class="input pl-10"
          />
        </div>

        <!-- Role Filter -->
        <select v-model="selectedRole" class="input w-full lg:w-44">
          <option value="">Semua Role</option>
          <option v-for="role in roleOptions" :key="role.value" :value="role.value">
            {{ role.label }}
          </option>
        </select>

        <!-- Status Filter -->
        <select v-model="selectedStatus" class="input w-full lg:w-40">
          <option value="">Semua Status</option>
          <option v-for="status in statusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>

        <!-- Clear Filters -->
        <button 
          v-if="searchQuery || selectedRole || selectedStatus"
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
              <th>Pengguna</th>
              <th>Role</th>
              <th>Departemen</th>
              <th>Status</th>
              <th>Login Terakhir</th>
              <th class="w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user.id">
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
                  {{ getRoleInfo(user.role).label }}
                </span>
              </td>
              <td>
                <span class="text-sm">{{ user.department || '-' }}</span>
              </td>
              <td>
                <span :class="['badge', getStatusBadgeClass(getStatusInfo(user.status).color)]">
                  {{ getStatusInfo(user.status).label }}
                </span>
              </td>
              <td class="text-sm text-text-muted">
                <div class="flex items-center gap-1">
                  <Clock class="w-3 h-3" />
                  {{ user.lastLogin ? formatDate(user.lastLogin) : 'Belum pernah' }}
                </div>
              </td>
              <td>
                <div class="flex items-center gap-1">
                  <button 
                    class="btn-icon btn-ghost"
                    title="Lihat Detail"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button 
                    class="btn-icon btn-ghost"
                    title="Edit"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button 
                    class="btn-icon btn-ghost text-red-600 hover:bg-red-50"
                    title="Hapus"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="7" class="text-center py-12">
                <div class="empty-state">
                  <p class="text-text-muted">Tidak ada data pengguna</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
