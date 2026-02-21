<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  width?: string
  height?: string
  circle?: boolean
  rounded?: boolean
  shimmer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  circle: false,
  rounded: true,
  shimmer: true
})

const skeletonClass = computed(() =>
  cn(
    props.shimmer ? 'shimmer' : 'bg-slate-200 animate-pulse',
    props.rounded && !props.circle && 'rounded',
    props.circle && 'rounded-full'
  )
)
</script>

<template>
  <div
    :class="skeletonClass"
    :style="{ width, height }"
  />
</template>
