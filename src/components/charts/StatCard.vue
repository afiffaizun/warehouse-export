<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

interface Props {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: any
  color?: 'cyan' | 'violet' | 'amber' | 'emerald' | 'red'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'cyan',
  changeLabel: 'vs last month'
})

const iconBgClasses = computed(() => {
  const colors = {
    cyan: 'bg-cyan-500',
    violet: 'bg-violet-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    red: 'bg-red-500'
  }
  return colors[props.color]
})

const changeClass = computed(() => {
  if (!props.change) return 'text-text-muted'
  if (props.change > 0) return 'text-accent-success'
  if (props.change < 0) return 'text-accent-danger'
  return 'text-text-muted'
})

const changeIcon = computed(() => {
  if (!props.change) return Minus
  if (props.change > 0) return TrendingUp
  return TrendingDown
})
</script>

<template>
  <div class="card p-5 hover:shadow-card-hover transition-shadow">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-text-secondary">{{ title }}</p>
        <p class="text-2xl font-bold text-text-primary mt-1">{{ value }}</p>
        
        <div 
          v-if="change !== undefined" 
          class="flex items-center gap-1 mt-2"
        >
          <component 
            :is="changeIcon" 
            :class="['w-4 h-4', changeClass]" 
          />
          <span :class="['text-sm font-medium', changeClass]">
            {{ Math.abs(change) }}%
          </span>
          <span class="text-xs text-text-muted ml-1">{{ changeLabel }}</span>
        </div>
      </div>
      
      <div :class="['p-3 rounded-xl', iconBgClasses]">
        <component :is="icon" class="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
</template>
