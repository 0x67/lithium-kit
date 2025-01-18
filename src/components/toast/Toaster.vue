<script setup lang="ts">
import { useToast } from './use-toast'
import { ToastProvider, ToastViewport, UiToastContent } from '.'

const { toasts } = useToast()
</script>

<template>
  <ToastProvider>
    <UiToastContent v-for="toast in toasts" :key="toast.id" v-bind="toast" />
    <ToastViewport />
  </ToastProvider>
</template>
