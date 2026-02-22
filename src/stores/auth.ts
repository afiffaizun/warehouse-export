import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'admin_gudang' | 'admin_penjualan' | 'manager' | 'viewer'
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  
  const userName = computed(() => user.value?.name || 'User')
  const userInitials = computed(() => {
    if (!user.value?.name) return 'U'
    return user.value.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  async function login(email: string, _password: string): Promise<boolean> {
    isLoading.value = true
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      user.value = {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'super_admin'
      }
      token.value = 'mock-jwt-token-' + Date.now()
      localStorage.setItem('token', token.value)
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  function hasPermission(permission: string): boolean {
    const rolePermissions: Record<string, string[]> = {
      super_admin: ['*'],
      admin_gudang: ['barang', 'stok', 'laporan'],
      admin_penjualan: ['pelanggan', 'order', 'pengiriman', 'keuangan'],
      manager: ['dashboard', 'laporan', 'keuangan'],
      viewer: ['dashboard']
    }
    
    const userRole = user.value?.role || 'viewer'
    const permissions = rolePermissions[userRole] || []
    
    return permissions.includes('*') || permissions.includes(permission)
  }

  return { 
    user, 
    token, 
    isLoading,
    isAuthenticated, 
    userName,
    userInitials,
    login, 
    logout,
    hasPermission
  }
})
