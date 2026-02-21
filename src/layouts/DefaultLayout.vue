<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'

const sidebarCollapsed = ref(false)
const mobileMenuOpen = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-background-primary">
    <!-- Sidebar -->
    <Sidebar 
      :class="[
        'transition-transform duration-300',
        mobileMenuOpen ? 'translate-x-0' : ''
      ]"
      @toggle-mobile="toggleMobileMenu"
    />

    <!-- Main Content -->
    <div 
      :class="[
        'transition-all duration-300',
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      ]"
    >
      <!-- Header -->
      <Header @toggle-sidebar="toggleSidebar" />

      <!-- Page Content -->
      <main class="p-4 lg:p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
