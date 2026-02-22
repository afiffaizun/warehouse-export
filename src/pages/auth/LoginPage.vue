<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  
  if (!email.value) {
    errorMessage.value = 'Email harus diisi'
    return
  }
  
  if (!password.value) {
    errorMessage.value = 'Password harus diisi'
    return
  }

  isLoading.value = true
  
  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      router.push({ name: 'dashboard' })
    } else {
      errorMessage.value = 'Email atau password salah'
    }
  } catch (error) {
    errorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background-primary px-4 py-8">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 mb-4">
          <span class="text-white font-bold text-2xl">E</span>
        </div>
        <h1 class="text-2xl font-display font-bold text-text-primary">ExportHub</h1>
        <p class="text-text-secondary mt-2">Gudang Penjualan Barang Ekspor</p>
      </div>

      <!-- Login Card -->
      <div class="card p-8">
        <h2 class="text-xl font-semibold text-text-primary mb-2">Masuk ke Akun</h2>
        <p class="text-text-secondary text-sm mb-6">Silakan masuk dengan email dan password Anda</p>
        
        <!-- Error Message -->
        <div 
          v-if="errorMessage" 
          class="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div class="form-group">
            <label for="email" class="label">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="input"
              placeholder="admin@exporthub.com"
              autocomplete="email"
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password" class="label">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="input pr-10"
                placeholder="Masukkan password"
                autocomplete="current-password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
              >
                <EyeOff v-if="showPassword" class="w-5 h-5" />
                <Eye v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="checkbox" />
              <span class="text-sm text-text-secondary">Ingat saya</span>
            </label>
            <a href="#" class="text-sm text-accent-primary hover:text-cyan-700">
              Lupa password?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full py-2.5"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
            <span v-else>Masuk</span>
          </button>
        </form>

        <!-- Demo Hint -->
        <div class="mt-6 pt-6 border-t border-border">
          <p class="text-xs text-text-muted text-center">
            Demo: Gunakan email dan password apapun untuk login
          </p>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-text-muted mt-8">
        © 2024 ExportHub. All rights reserved.
      </p>
    </div>
  </div>
</template>
