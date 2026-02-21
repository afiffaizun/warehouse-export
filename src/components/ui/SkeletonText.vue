<script setup lang="ts">
import Skeleton from './Skeleton.vue'

interface Props {
  lines?: number
  avatar?: boolean
  title?: boolean
}

withDefaults(defineProps<Props>(), {
  lines: 3,
  avatar: false,
  title: true
})
</script>

<template>
  <div class="space-y-4">
    <div v-if="avatar || title" class="flex items-center gap-3">
      <Skeleton v-if="avatar" height="40px" width="40px" circle />
      <div v-if="title" class="flex-1 space-y-2">
        <Skeleton height="14px" width="60%" />
        <Skeleton height="12px" width="40%" />
      </div>
    </div>
    <div class="space-y-2">
      <Skeleton v-for="i in lines" :key="i" :height="i === lines ? '12px' : '14px'" :width="i === lines ? '70%' : '100%'" />
    </div>
  </div>
</template>
