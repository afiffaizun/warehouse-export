<script setup lang="ts">
import { 
  ShoppingCart, 
  Truck, 
  Package, 
  CreditCard,
  AlertCircle,
  Clock
} from 'lucide-vue-next'

interface Activity {
  id: number
  type: 'order' | 'shipment' | 'stock' | 'payment' | 'alert'
  title: string
  description: string
  time: string
}

interface Props {
  activities: Activity[]
}

const props = defineProps<Props>()

const getIcon = (type: Activity['type']) => {
  const icons = {
    order: ShoppingCart,
    shipment: Truck,
    stock: Package,
    payment: CreditCard,
    alert: AlertCircle
  }
  return icons[type]
}

const getColor = (type: Activity['type']) => {
  const colors = {
    order: 'bg-cyan-100 text-cyan-600',
    shipment: 'bg-violet-100 text-violet-600',
    stock: 'bg-amber-100 text-amber-600',
    payment: 'bg-emerald-100 text-emerald-600',
    alert: 'bg-red-100 text-red-600'
  }
  return colors[type]
}
</script>

<template>
  <div class="card p-5 h-full">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-semibold text-text-primary">Aktivitas Terbaru</h3>
        <p class="text-sm text-text-muted">Riwayat aktivitas sistem</p>
      </div>
      <button class="text-sm text-accent-primary hover:text-cyan-700 font-medium">
        Lihat semua
      </button>
    </div>
    
    <div class="space-y-4">
      <div 
        v-for="activity in activities" 
        :key="activity.id"
        class="flex gap-3"
      >
        <div :class="['p-2 rounded-lg flex-shrink-0', getColor(activity.type)]">
          <component :is="getIcon(activity.type)" class="w-4 h-4" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-text-primary">{{ activity.title }}</p>
          <p class="text-xs text-text-secondary mt-0.5 truncate">{{ activity.description }}</p>
          <p class="text-xs text-text-muted mt-1 flex items-center gap-1">
            <Clock class="w-3 h-3" />
            {{ activity.time }}
          </p>
        </div>
      </div>
    </div>
    
    <div v-if="activities.length === 0" class="text-center py-8">
      <p class="text-sm text-text-muted">Tidak ada aktivitas terbaru</p>
    </div>
  </div>
</template>
