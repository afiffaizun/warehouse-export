<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

interface Props {
  labels: string[]
  revenueData: number[]
  orderData?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  orderData: () => []
})

const series = computed(() => {
  const data = [
    {
      name: 'Revenue',
      data: props.revenueData
    }
  ]
  
  if (props.orderData.length > 0) {
    data.push({
      name: 'Orders',
      data: props.orderData
    })
  }
  
  return data
})

const chartOptions = computed(() => ({
  chart: {
    type: 'area' as const,
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    },
    fontFamily: 'DM Sans, sans-serif',
    foreColor: '#94A3B8',
    background: 'transparent'
  },
  colors: ['#0891B2', '#7C3AED'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth' as const,
    width: 2
  },
  fill: {
    type: 'gradient' as const,
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 100]
    }
  },
  grid: {
    borderColor: '#E2E8F0',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  xaxis: {
    categories: props.labels,
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      style: {
        colors: '#64748B',
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#64748B',
        fontSize: '12px'
      },
      formatter: (val: number) => {
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
        if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
        return `$${val}`
      }
    }
  },
  legend: {
    position: 'top' as const,
    horizontalAlign: 'right' as const,
    fontSize: '13px',
    markers: {
      size: 8,
      shape: 'circle' as const,
      offsetX: -4
    },
    itemMargin: {
      horizontal: 12
    }
  },
  tooltip: {
    theme: 'light' as const,
    x: {
      show: true
    },
    y: {
      formatter: (val: number) => `$${val.toLocaleString()}`
    }
  }
}))
</script>

<template>
  <div class="card p-5">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-semibold text-text-primary">Tren Penjualan</h3>
        <p class="text-sm text-text-muted">Revenue bulanan</p>
      </div>
    </div>
    <VueApexCharts
      type="area"
      height="320"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
