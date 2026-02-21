<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  name: '',
  size: 'md'
})

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl'
}

const initials = computed(() => {
  if (!props.name) return '?'
  const names = props.name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return names[0].substring(0, 2).toUpperCase()
})

const avatarClass = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-full',
    'bg-slate-200 text-slate-600 font-medium overflow-hidden',
    sizeClasses[props.size]
  )
)
</script>

<template>
  <div :class="avatarClass">
    <img
      v-if="src"
      :src="src"
      :alt="alt || name"
      class="w-full h-full object-cover"
    />
    <span v-else class="select-none">{{ initials }}</span>
  </div>
</template>
