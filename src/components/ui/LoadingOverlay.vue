<script setup lang="ts">
import Spinner from './Spinner.vue'

interface Props {
  loading?: boolean
  text?: string
  fullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  text: 'Memuat...',
  fullscreen: false
})
</script>

<template>
  <Teleport v-if="fullscreen" to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="loading"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
      >
        <Spinner size="lg" />
        <p v-if="text" class="mt-4 text-sm text-text-secondary">{{ text }}</p>
      </div>
    </Transition>
  </Teleport>
  <Transition
    v-else
    enter-active-class="duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="loading"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg"
    >
      <Spinner size="lg" />
      <p v-if="text" class="mt-4 text-sm text-text-secondary">{{ text }}</p>
    </div>
  </Transition>
</template>
