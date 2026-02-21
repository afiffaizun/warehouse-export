<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    type="button"
    :class="cn(
      'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
      'transition-colors',
      disabled
        ? 'text-text-muted cursor-not-allowed'
        : active
          ? 'bg-slate-100 text-text-primary'
          : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary'
    )"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
