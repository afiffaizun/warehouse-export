<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  placement: 'bottom'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const triggerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (
    triggerRef.value &&
    dropdownRef.value &&
    !triggerRef.value.contains(event.target as Node) &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    close()
  }
}

watch(isOpen, (value) => {
  if (value) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

defineExpose({ close })
</script>

<template>
  <div class="relative inline-block">
    <div ref="triggerRef" @click="toggle">
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <Transition
        enter-active-class="duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          ref="dropdownRef"
          :class="cn(
            'absolute z-50 min-w-[180px] py-1',
            'bg-white rounded-lg border border-border shadow-dropdown',
            'animate-fade-in'
          )"
          @click.stop
        >
          <slot />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
