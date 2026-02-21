<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
type BadgeSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  removable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  dot: false,
  removable: false
})

const emit = defineEmits<{
  remove: []
}>()

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-cyan-100 text-cyan-800',
  secondary: 'bg-violet-100 text-violet-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-sky-100 text-sky-800',
  neutral: 'bg-slate-100 text-slate-700'
}

const dotClasses: Record<BadgeVariant, string> = {
  primary: 'bg-cyan-500',
  secondary: 'bg-violet-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-sky-500',
  neutral: 'bg-slate-500'
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm'
}

const badgeClass = computed(() =>
  cn(
    'inline-flex items-center gap-1.5 rounded-full font-medium',
    variantClasses[props.variant],
    sizeClasses[props.size]
  )
)
</script>

<template>
  <span :class="badgeClass">
    <span
      v-if="dot"
      :class="cn('w-1.5 h-1.5 rounded-full', dotClasses[variant])"
    />
    <slot />
    <button
      v-if="removable"
      type="button"
      class="ml-1 -mr-1 hover:opacity-70 transition-opacity"
      @click.stop="emit('remove')"
    >
      <svg
        class="w-3 h-3"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </span>
</template>
