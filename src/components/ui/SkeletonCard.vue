<script setup lang="ts">
import Skeleton from './Skeleton.vue'

interface Props {
  showHeader?: boolean
  showFooter?: boolean
  bodyLines?: number
}

withDefaults(defineProps<Props>(), {
  showHeader: true,
  showFooter: false,
  bodyLines: 3
})
</script>

<template>
  <div class="card p-4 space-y-4">
    <div v-if="showHeader" class="flex items-center justify-between">
      <Skeleton height="20px" width="150px" />
      <Skeleton height="32px" width="100px" :rounded="true" />
    </div>
    <div class="space-y-2">
      <Skeleton v-for="i in bodyLines" :key="i" :height="i === bodyLines ? '12px' : '14px'" :width="i === bodyLines ? '60%' : '100%'" />
    </div>
    <div v-if="showFooter" class="pt-2 border-t border-border flex items-center justify-end gap-2">
      <Skeleton height="32px" width="80px" :rounded="true" />
      <Skeleton height="32px" width="80px" :rounded="true" />
    </div>
  </div>
</template>
