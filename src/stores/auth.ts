import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isAuthenticated = computed(() => !!token.value)

  function login(email: string, _password: string) {
    // Mock login
    user.value = {
      id: 1,
      name: 'Admin User',
      email: email,
      role: 'super_admin'
    }
    token.value = 'mock-jwt-token'
    localStorage.setItem('token', token.value)
    return true
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { user, token, isAuthenticated, login, logout }
})
