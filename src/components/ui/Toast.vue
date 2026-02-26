<script setup lang="ts">
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import type { Toast as ToastType } from '@/stores/toast'

defineProps<{
  toast: ToastType
}>()

const emit = defineEmits<{
  (e: 'close', id: number): void
}>()

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return CheckCircle
    case 'error': return XCircle
    case 'warning': return AlertTriangle
    case 'info': return Info
    default: return Info
  }
}

const getClasses = (type: string) => {
  switch (type) {
    case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-800'
    case 'error': return 'bg-red-50 border-red-200 text-red-800'
    case 'warning': return 'bg-amber-50 border-amber-200 text-amber-800'
    case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
    default: return 'bg-gray-50 border-gray-200 text-gray-800'
  }
}

const getIconClasses = (type: string) => {
  switch (type) {
    case 'success': return 'text-emerald-500'
    case 'error': return 'text-red-500'
    case 'warning': return 'text-amber-500'
    case 'info': return 'text-blue-500'
    default: return 'text-gray-500'
  }
}
</script>

<template>
  <div 
    :class="[
      'flex items-start gap-3 p-4 rounded-lg border shadow-lg transform transition-all duration-300 ease-in-out',
      getClasses(toast.type)
    ]"
  >
    <component 
      :is="getIcon(toast.type)" 
      :class="['w-5 h-5 flex-shrink-0 mt-0.5', getIconClasses(toast.type)]" 
    />
    <p class="flex-1 text-sm font-medium">{{ toast.message }}</p>
    <button 
      @click="emit('close', toast.id)"
      class="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</template>
