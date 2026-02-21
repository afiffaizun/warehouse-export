<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  required?: boolean
  id?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: false,
  errorMessage: '',
  label: '',
  required: false,
  rows: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaClass = computed(() =>
  cn(
    'w-full rounded-lg border bg-white px-3 py-2 text-sm',
    'text-text-primary placeholder:text-text-muted',
    'transition-all duration-200',
    'hover:border-slate-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'resize-y min-h-[100px]',
    props.error
      ? 'border-accent-danger focus:ring-accent-danger focus:border-accent-danger'
      : 'border-border focus:ring-accent-primary focus:border-transparent',
    props.disabled && 'opacity-50 cursor-not-allowed bg-slate-50',
    props.readonly && 'bg-slate-50 cursor-default'
  )
)

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
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
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :class="textareaClass"
      @input="handleInput"
    />
    <p v-if="error && errorMessage" class="form-error">{{ errorMessage }}</p>
  </div>
</template>
