<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'

type SortDirection = 'asc' | 'desc' | null

interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface Props {
  columns: Column[]
  data: T[]
  rowKey?: string
  loading?: boolean
  emptyText?: string
  hoverable?: boolean
  striped?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  loading: false,
  emptyText: 'Tidak ada data',
  hoverable: true,
  striped: false,
  compact: false
})

const emit = defineEmits<{
  'row-click': [row: T, index: number]
  sort: [key: string, direction: SortDirection]
}>()

const sortKey = ref<string | null>(null)
const sortDirection = ref<SortDirection>(null)

function handleSort(column: Column) {
  if (!column.sortable) return

  if (sortKey.value === column.key) {
    if (sortDirection.value === 'asc') {
      sortDirection.value = 'desc'
    } else if (sortDirection.value === 'desc') {
      sortKey.value = null
      sortDirection.value = null
    }
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }

  emit('sort', sortKey.value!, sortDirection.value)
}

const sortedData = computed(() => {
  if (!sortKey.value || !sortDirection.value) return props.data

  return [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value!]
    const bVal = b[sortKey.value!]

    if (aVal === bVal) return 0
    if (aVal === null || aVal === undefined) return 1
    if (bVal === null || bVal === undefined) return -1

    const comparison = aVal > bVal ? 1 : -1
    return sortDirection.value === 'asc' ? comparison : -comparison
  })
})

function getSortIcon(column: Column) {
  if (sortKey.value !== column.key) return 'none'
  return sortDirection.value
}
</script>

<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="cn(
              'select-none',
              column.sortable && 'cursor-pointer hover:bg-slate-100',
              column.align === 'center' && 'text-center',
              column.align === 'right' && 'text-right'
            )"
            :style="column.width ? { width: column.width } : {}"
            @click="handleSort(column)"
          >
            <div class="flex items-center gap-2">
              <span>{{ column.label }}</span>
              <span v-if="column.sortable" class="flex flex-col">
                <svg
                  :class="cn(
                    'w-3 h-3 transition-colors',
                    getSortIcon(column) === 'asc' ? 'text-accent-primary' : 'text-slate-300'
                  )"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                <svg
                  :class="cn(
                    'w-3 h-3 -mt-1 transition-colors',
                    getSortIcon(column) === 'desc' ? 'text-accent-primary' : 'text-slate-300'
                  )"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr v-for="i in 5" :key="i">
          <td v-for="column in columns" :key="column.key">
            <div class="skeleton h-4 w-3/4 rounded" />
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="sortedData.length === 0">
        <tr>
          <td :colspan="columns.length" class="text-center py-8">
            <div class="empty-state">
              <svg class="empty-state-icon mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p class="text-text-secondary">{{ emptyText }}</p>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="(row, index) in sortedData"
          :key="row[rowKey] || index"
          :class="cn(
            hoverable && 'hover:bg-slate-50 cursor-pointer',
            striped && index % 2 === 1 && 'bg-slate-50'
          )"
          @click="emit('row-click', row, index)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="cn(
              column.align === 'center' && 'text-center',
              column.align === 'right' && 'text-right',
              compact ? 'py-2' : 'py-3'
            )"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ row[column.key] ?? '-' }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
