<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent-primary text-white hover:bg-cyan-700 active:bg-cyan-800 focus:ring-accent-primary',
  secondary: 'bg-accent-secondary text-white hover:bg-violet-700 active:bg-violet-800 focus:ring-accent-secondary',
  success: 'bg-accent-success text-white hover:bg-emerald-700 active:bg-emerald-800 focus:ring-accent-success',
  warning: 'bg-accent-warning text-white hover:bg-amber-600 active:bg-amber-700 focus:ring-accent-warning',
  danger: 'bg-accent-danger text-white hover:bg-red-700 active:bg-red-800 focus:ring-accent-danger',
  outline: 'border border-border bg-transparent text-text-primary hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-400',
  ghost: 'bg-transparent text-text-secondary hover:bg-slate-100 hover:text-text-primary active:bg-slate-200 focus:ring-slate-400',
  link: 'bg-transparent text-accent-primary hover:text-cyan-700 hover:bg-cyan-50 active:bg-cyan-100 focus:ring-accent-primary'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2 aspect-square'
}

const buttonClass = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.block && 'w-full',
    props.loading && 'cursor-wait'
  )
)

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="w-4 h-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>
