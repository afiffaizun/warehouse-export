<script setup lang="ts">
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  AlertTriangle
} from 'lucide-vue-next'
import StatCard from '@/components/charts/StatCard.vue'
import SalesChart from '@/components/charts/SalesChart.vue'
import TopProductsChart from '@/components/charts/TopProductsChart.vue'
import ActivityFeed from '@/components/charts/ActivityFeed.vue'
import { 
  kpiData, 
  salesChartData, 
  topProductsData, 
  recentActivities,
  stockAlerts 
} from '@/data/dashboard'

const iconMap: Record<string, any> = {
  package: Package,
  dollar: DollarSign,
  cart: ShoppingCart,
  trending: TrendingUp
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-display font-bold text-text-primary">Dashboard</h1>
        <p class="text-text-secondary mt-1">Ringkasan kinerja gudang ekspor</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-text-muted">Periode: </span>
        <select class="input py-1.5 px-3 w-auto text-sm">
          <option>Bulan Ini</option>
          <option>Bulan Lalu</option>
          <option>Tahun Ini</option>
        </select>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        v-for="kpi in kpiData"
        :key="kpi.title"
        :title="kpi.title"
        :value="kpi.value"
        :change="kpi.change"
        :icon="iconMap[kpi.icon]"
        :color="kpi.color"
      />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <SalesChart 
          :labels="salesChartData.labels"
          :revenue-data="salesChartData.revenue"
          :order-data="salesChartData.orders"
        />
      </div>
      <div>
        <TopProductsChart :products="topProductsData" />
      </div>
    </div>

    <!-- Bottom Row: Alerts & Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Stock Alerts -->
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="p-2 rounded-lg bg-red-100 text-red-600">
              <AlertTriangle class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-semibold text-text-primary">Peringatan Stok</h3>
              <p class="text-sm text-text-muted">Barang di bawah minimum</p>
            </div>
          </div>
          <span class="badge badge-danger">{{ stockAlerts.length }} item</span>
        </div>
        
        <div class="space-y-3">
          <div 
            v-for="alert in stockAlerts" 
            :key="alert.id"
            class="flex items-center justify-between p-3 rounded-lg bg-background-tertiary"
          >
            <div>
              <p class="text-sm font-medium text-text-primary">{{ alert.name }}</p>
              <p class="text-xs text-text-muted">{{ alert.sku }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium" :class="{
                'text-red-600': alert.urgency === 'high',
                'text-amber-600': alert.urgency === 'medium',
                'text-text-secondary': alert.urgency === 'low'
              }">
                {{ alert.currentStock }} / {{ alert.minStock }}
              </p>
              <p class="text-xs text-text-muted">unit</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Feed -->
      <ActivityFeed :activities="recentActivities" />
    </div>
  </div>
</template>
