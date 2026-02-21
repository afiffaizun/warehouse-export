import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const isLoading = ref(false)
  const notifications = ref<any[]>([])

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  function addNotification(notification: any) {
    notifications.value.push({
      id: Date.now(),
      ...notification
    })
  }

  function removeNotification(id: number) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    sidebarCollapsed,
    isLoading,
    notifications,
    toggleSidebar,
    setLoading,
    addNotification,
    removeNotification
  }
})
