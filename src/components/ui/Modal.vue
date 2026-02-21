<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  size: 'md',
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]'
}

const modalClass = computed(() =>
  cn(
    'bg-white rounded-xl shadow-modal w-full',
    'animate-scale-in',
    sizeClasses[props.size]
  )
)

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    close()
  }
}

function handleEscape(event: KeyboardEvent) {
  if (props.closeOnEscape && event.key === 'Escape') {
    close()
  }
}

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="handleOverlayClick"
      >
        <div :class="modalClass" role="dialog" aria-modal="true">
          <div
            v-if="title || closable"
            class="flex items-center justify-between px-6 py-4 border-b border-border"
          >
            <h3 class="text-lg font-semibold text-text-primary">{{ title }}</h3>
            <button
              v-if="closable"
              type="button"
              class="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-100 transition-colors"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
            <slot />
          </div>
          <div v-if="$slots.footer" class="flex items-center justify-end gap-2 px-6 py-4 border-t border-border bg-slate-50 rounded-b-xl">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
