<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type SelectSize = 'sm' | 'md' | 'lg'

interface Option {
  value: string | number
  label: string
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  options: Option[]
  size?: SelectSize
  placeholder?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  size: 'md',
  placeholder: 'Pilih...',
  disabled: false,
  error: false,
  errorMessage: '',
  label: '',
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const sizeClasses: Record<SelectSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs pr-8',
  md: 'px-3 py-2 text-sm pr-10',
  lg: 'px-4 py-3 text-base pr-12'
}

const selectClass = computed(() =>
  cn(
    'w-full rounded-lg border bg-white',
    'text-text-primary appearance-none cursor-pointer',
    'transition-all duration-200',
    'hover:border-slate-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'bg-no-repeat bg-right',
    sizeClasses[props.size],
    props.error
      ? 'border-accent-danger focus:ring-accent-danger focus:border-accent-danger'
      : 'border-border focus:ring-accent-primary focus:border-transparent',
    props.disabled && 'opacity-50 cursor-not-allowed bg-slate-50'
  )
)

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = target.value
  emit('update:modelValue', value)
  emit('change', value)
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
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :class="selectClass"
        :style="{
          backgroundImage: `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')`,
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5em 1.5em'
        }"
        @change="handleChange"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <p v-if="error && errorMessage" class="form-error">{{ errorMessage }}</p>
  </div>
</template>
