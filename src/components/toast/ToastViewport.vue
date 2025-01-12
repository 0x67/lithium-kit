<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastViewport v-bind="delegatedProps" :class="cn('fixed top-0 z-[100] flex max-h-screen flex-col-reverse sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col', props.class)" />
</template>
