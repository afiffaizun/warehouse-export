<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

interface Product {
  name: string
  value: number
  color?: string
}

interface Props {
  products: Product[]
}

const props = defineProps<Props>()

const series = computed(() => [{
  name: 'Total Ekspor',
  data: props.products.map(p => p.value)
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar' as const,
    toolbar: {
      show: false
    },
    fontFamily: 'DM Sans, sans-serif',
    foreColor: '#94A3B8',
    background: 'transparent'
  },
  colors: ['#0891B2'],
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 4,
      barHeight: '60%',
      distributed: false,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: 30,
    style: {
      fontSize: '12px',
      colors: ['#64748B']
    },
    formatter: (val: number) => `${val.toLocaleString()} unit`
  },
  grid: {
    borderColor: '#E2E8F0',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    }
  },
  xaxis: {
    categories: props.products.map(p => p.name),
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#64748B',
        fontSize: '12px'
      }
    }
  },
  legend: {
    show: false
  },
  tooltip: {
    theme: 'light' as const,
    y: {
      formatter: (val: number) => `${val.toLocaleString()} unit`
    }
  }
}))
</script>

<template>
  <div class="card p-5 h-full">
    <div class="mb-4">
      <h3 class="font-semibold text-text-primary">Produk Terlaris</h3>
      <p class="text-sm text-text-muted">Top 5 barang ekspor</p>
    </div>
    <VueApexCharts
      type="bar"
      height="280"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
