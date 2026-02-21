<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const crumbs = [{ name: 'Home', path: '/dashboard' }]
  
  let currentPath = ''
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`
    crumbs.push({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      path: currentPath
    })
  })
  
  return crumbs
})

const notifications = ref([
  { id: 1, title: 'Stok menipis', message: 'Barang SKU-001 stok di bawah minimum', time: '5 menit lalu', unread: true },
  { id: 2, title: 'Order baru', message: 'Order #SO-2024-001 dari Buyer ABC', time: '1 jam lalu', unread: true },
  { id: 3, title: 'Pembayaran diterima', message: 'Invoice #INV-001 lunas', time: '2 jam lalu', unread: false }
])

const unreadCount = computed(() => notifications.value.filter(n => n.unread).length)

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const markAllRead = () => {
  notifications.value.forEach(n => n.unread = false)
}

const goToNotification = (_id: number) => {
  showNotifications.value = false
}

const goToProfile = () => {
  showUserMenu.value = false
  router.push({ name: 'pengguna' })
}

const goToSettings = () => {
  showUserMenu.value = false
  router.push({ name: 'pengaturan' })
}

const logout = () => {
  showUserMenu.value = false
  router.push({ name: 'login' })
}

const closeDropdowns = () => {
  showNotifications.value = false
  showUserMenu.value = false
}
</script>

<template>
  <header class="sticky top-0 z-30 h-16 bg-white border-b border-border">
    <div class="flex items-center justify-between h-full px-4 lg:px-6">
      <!-- Left: Menu toggle & Breadcrumb -->
      <div class="flex items-center gap-4">
        <button 
          @click="$emit('toggle-sidebar')"
          class="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-slate-100 transition-colors"
        >
          <Menu class="w-5 h-5" />
        </button>

        <!-- Breadcrumb -->
        <nav class="hidden sm:flex items-center gap-2 text-sm">
          <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
            <span 
              v-if="index > 0" 
              class="text-text-muted"
            >
              /
            </span>
            <router-link
              :to="crumb.path"
              :class="[
                'transition-colors',
                index === breadcrumbs.length - 1 
                  ? 'text-text-primary font-medium' 
                  : 'text-text-secondary hover:text-text-primary'
              ]"
            >
              {{ crumb.name }}
            </router-link>
          </template>
        </nav>
      </div>

      <!-- Right: Search, Notifications, User -->
      <div class="flex items-center gap-2 lg:gap-4">
        <!-- Search -->
        <div class="hidden md:block relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari..."
            class="w-64 pl-10 pr-4 py-2 text-sm bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all"
          />
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        </div>

        <!-- Notifications -->
        <div class="relative">
          <button
            @click="toggleNotifications"
            class="relative p-2 rounded-lg text-text-secondary hover:bg-slate-100 transition-colors"
          >
            <Bell class="w-5 h-5" />
            <span 
              v-if="unreadCount > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-accent-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {{ unreadCount }}
            </span>
          </button>

          <!-- Notifications Dropdown -->
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-border shadow-dropdown animate-fade-in"
          >
            <div class="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 class="font-semibold text-text-primary">Notifikasi</h3>
              <button 
                @click="markAllRead"
                class="text-xs text-accent-primary hover:text-cyan-700"
              >
                Tandai semua dibaca
              </button>
            </div>
            <div class="max-h-80 overflow-y-auto">
              <div
                v-for="notif in notifications"
                :key="notif.id"
                @click="goToNotification(notif.id)"
                :class="[
                  'px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-border last:border-b-0',
                  notif.unread ? 'bg-cyan-50/50' : ''
                ]"
              >
                <div class="flex items-start gap-3">
                  <div 
                    :class="[
                      'w-2 h-2 mt-2 rounded-full flex-shrink-0',
                      notif.unread ? 'bg-accent-primary' : 'bg-transparent'
                    ]"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-text-primary">{{ notif.title }}</p>
                    <p class="text-xs text-text-secondary mt-0.5">{{ notif.message }}</p>
                    <p class="text-xs text-text-muted mt-1">{{ notif.time }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 border-t border-border">
              <button class="text-sm text-accent-primary hover:text-cyan-700 font-medium">
                Lihat semua notifikasi
              </button>
            </div>
          </div>
        </div>

        <!-- User Menu -->
        <div class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <span class="text-white text-sm font-medium">AD</span>
            </div>
            <ChevronDown class="w-4 h-4 text-text-secondary hidden sm:block" />
          </button>

          <!-- User Dropdown -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-border shadow-dropdown animate-fade-in"
          >
            <div class="py-1">
              <button
                @click="goToProfile"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors"
              >
                <User class="w-4 h-4" />
                Profil
              </button>
              <button
                @click="goToSettings"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors"
              >
                <Settings class="w-4 h-4" />
                Pengaturan
              </button>
              <div class="border-t border-border my-1" />
              <button
                @click="logout"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-accent-danger hover:bg-red-50 transition-colors"
              >
                <LogOut class="w-4 h-4" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Click outside to close -->
    <div 
      v-if="showNotifications || showUserMenu"
      @click="closeDropdowns"
      class="fixed inset-0 z-[-1]"
    />
  </header>
</template>
