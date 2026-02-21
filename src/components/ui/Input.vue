<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type InputSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue?: string | number
  type?: string
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  hint?: string
  label?: string
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: false,
  errorMessage: '',
  hint: '',
  label: '',
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base'
}

const inputClass = computed(() =>
  cn(
    'w-full rounded-lg border bg-white',
    'text-text-primary placeholder:text-text-muted',
    'transition-all duration-200',
    'hover:border-slate-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    sizeClasses[props.size],
    props.error
      ? 'border-accent-danger focus:ring-accent-danger focus:border-accent-danger'
      : 'border-border focus:ring-accent-primary focus:border-transparent',
    props.disabled && 'opacity-50 cursor-not-allowed bg-slate-50',
    props.readonly && 'bg-slate-50 cursor-default'
  )
)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="form-group">
    <label
      v-if="label"
      :for="id"
      :class="cn('label', required && 'label-required')"
    >
      {{ label }}
    </label>
    <div class="relative">
      <slot name="prefix" />
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="cn(inputClass, $slots.prefix && 'pl-10', $slots.suffix && 'pr-10')"
        @input="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
      <slot name="suffix" />
    </div>
    <p v-if="error && errorMessage" class="form-error">{{ errorMessage }}</p>
    <p v-else-if="hint" class="form-hint">{{ hint }}</p>
  </div>
</template>
