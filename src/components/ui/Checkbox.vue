<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  disabled: false,
  indeterminate: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const checkboxClass = computed(() =>
  cn(
    'w-4 h-4 rounded border-border bg-white',
    'text-accent-primary',
    'focus:ring-2 focus:ring-accent-primary focus:ring-offset-0',
    'transition-colors cursor-pointer',
    props.disabled && 'opacity-50 cursor-not-allowed'
  )
)

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<template>
  <label
    :class="cn('inline-flex items-center gap-2', disabled ? 'cursor-not-allowed' : 'cursor-pointer')"
  >
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :class="checkboxClass"
      @change="handleChange"
    />
    <span v-if="label" class="text-sm text-text-primary">{{ label }}</span>
    <slot v-else />
  </label>
</template>
