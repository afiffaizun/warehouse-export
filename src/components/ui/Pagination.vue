<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue: number
  totalItems: number
  itemsPerPage?: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  maxVisiblePages: 5
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
)

const pages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.modelValue
  const total = totalPages.value
  const max = props.maxVisiblePages

  if (total <= max) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 3; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

const startIndex = computed(() =>
  (props.modelValue - 1) * props.itemsPerPage + 1
)

const endIndex = computed(() =>
  Math.min(props.modelValue * props.itemsPerPage, props.totalItems)
)

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value && page !== props.modelValue) {
    emit('update:modelValue', page)
    emit('change', page)
  }
}

function previous() {
  goToPage(props.modelValue - 1)
}

function next() {
  goToPage(props.modelValue + 1)
}
</script>

<template>
  <div class="flex items-center justify-between px-4 py-3 border-t border-border">
    <div class="text-sm text-text-secondary">
      Menampilkan <span class="font-medium">{{ startIndex }}</span> - 
      <span class="font-medium">{{ endIndex }}</span> dari 
      <span class="font-medium">{{ totalItems }}</span> data
    </div>
    <div class="flex items-center gap-1">
      <button
        type="button"
        :disabled="modelValue === 1"
        :class="cn(
          'p-2 rounded-lg transition-colors',
          modelValue === 1
            ? 'text-text-muted cursor-not-allowed'
            : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary'
        )"
        @click="previous"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <template v-for="page in pages" :key="page">
        <span
          v-if="page === '...'"
          class="px-2 text-text-muted"
        >...</span>
        <button
          v-else
          type="button"
          :class="cn(
            'min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors',
            page === modelValue
              ? 'bg-accent-primary text-white'
              : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary'
          )"
          @click="goToPage(page as number)"
        >
          {{ page }}
        </button>
      </template>
      <button
        type="button"
        :disabled="modelValue === totalPages"
        :class="cn(
          'p-2 rounded-lg transition-colors',
          modelValue === totalPages
            ? 'text-text-muted cursor-not-allowed'
            : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary'
        )"
        @click="next"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>
