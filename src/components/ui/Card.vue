<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  hoverable?: boolean
  clickable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  clickable: false,
  padding: 'md'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
}

const cardClass = computed(() =>
  cn(
    'bg-card rounded-lg border border-border',
    props.hoverable && 'transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5',
    props.clickable && 'cursor-pointer active:scale-[0.99]',
    props.padding !== 'none' && paddingClasses[props.padding]
  )
)

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<template>
  <div :class="cardClass" @click="handleClick">
    <slot />
  </div>
</template>
