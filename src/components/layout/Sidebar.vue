<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  LayoutDashboard,
  Package,
  Boxes,
  Users,
  ShoppingCart,
  Truck,
  FileText,
  CreditCard,
  BarChart3,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isCollapsed = ref(false)
const isMobileOpen = ref(false)

const emit = defineEmits<{
  (e: 'toggle-mobile'): void
}>()

interface NavItem {
  label: string
  name: string
  icon: any
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navigationGroups: NavGroup[] = [
  {
    title: '',
    items: [
      { label: 'Dashboard', name: 'dashboard', icon: LayoutDashboard }
    ]
  },
  {
    title: 'Operasional',
    items: [
      { label: 'Barang', name: 'barang', icon: Package },
      { label: 'Stok', name: 'stok', icon: Boxes }
    ]
  },
  {
    title: 'Bisnis',
    items: [
      { label: 'Pelanggan', name: 'pelanggan', icon: Users },
      { label: 'Order', name: 'order', icon: ShoppingCart },
      { label: 'Pengiriman', name: 'pengiriman', icon: Truck }
    ]
  },
  {
    title: 'Keuangan',
    items: [
      { label: 'Invoice', name: 'keuangan-invoice', icon: FileText },
      { label: 'Pembayaran', name: 'keuangan-pembayaran', icon: CreditCard }
    ]
  },
  {
    title: 'Laporan',
    items: [
      { label: 'Penjualan', name: 'laporan-penjualan', icon: BarChart3 },
      { label: 'Stok', name: 'laporan-stok', icon: BarChart3 },
      { label: 'Keuangan', name: 'laporan-keuangan', icon: BarChart3 }
    ]
  },
  {
    title: 'Sistem',
    items: [
      { label: 'Pengguna', name: 'pengguna', icon: UserCog },
      { label: 'Pengaturan', name: 'pengaturan', icon: Settings }
    ]
  }
]

const isActive = (name: string): boolean => {
  return route.name === name || route.path.startsWith(`/${name}`)
}

const navigateTo = (name: string) => {
  router.push({ name })
  isMobileOpen.value = false
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleMobile = () => {
  isMobileOpen.value = !isMobileOpen.value
  emit('toggle-mobile')
}

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <aside
    :class="[
      'fixed top-0 left-0 z-40 h-screen bg-sidebar-bg border-r border-sidebar-border transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <div class="flex flex-col h-full">
      <!-- Logo -->
      <div class="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div 
          class="flex items-center gap-3 cursor-pointer"
          @click="navigateTo('dashboard')"
        >
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
            <span class="text-white font-bold text-lg">E</span>
          </div>
          <span 
            v-if="!isCollapsed" 
            class="text-white font-semibold text-lg tracking-tight"
          >
            ExportHub
          </span>
        </div>
        <button 
          @click="toggleCollapse"
          class="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-sidebar-text hover:bg-sidebar-hover transition-colors"
        >
          <ChevronLeft v-if="!isCollapsed" class="w-5 h-5" />
          <ChevronRight v-else class="w-5 h-5" />
        </button>
        <button 
          @click="toggleMobile"
          class="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-sidebar-text hover:bg-sidebar-hover transition-colors"
        >
          <Menu class="w-5 h-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        <div v-for="group in navigationGroups" :key="group.title" class="mb-6">
          <h3 
            v-if="!isCollapsed && group.title"
            class="px-3 mb-2 text-xs font-semibold text-sidebar-text uppercase tracking-wider"
          >
            {{ group.title }}
          </h3>
          <ul class="space-y-1">
            <li v-for="item in group.items" :key="item.name">
              <button
                @click="navigateTo(item.name)"
                :class="[
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive(item.name) 
                    ? 'bg-sidebar-active text-white' 
                    : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
                ]"
                :title="isCollapsed ? item.label : undefined"
              >
                <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
                <span 
                  v-if="!isCollapsed" 
                  class="text-sm font-medium truncate"
                >
                  {{ item.label }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <!-- User Profile -->
      <div class="border-t border-sidebar-border p-3">
        <div 
          :class="[
            'flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-hover transition-colors cursor-pointer',
          ]"
        >
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
            <span class="text-white font-medium text-sm">AD</span>
          </div>
          <div v-if="!isCollapsed" class="flex-1 min-w-0">
            <p class="text-white text-sm font-medium truncate">Admin User</p>
            <p class="text-sidebar-text text-xs truncate">admin@exporthub.com</p>
          </div>
          <button 
            v-if="!isCollapsed"
            @click="logout"
            class="p-2 rounded-lg text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <div 
    v-if="isMobileOpen"
    @click="toggleMobile"
    class="fixed inset-0 z-30 bg-black/50 lg:hidden"
  />
</template>
