<script setup lang="ts">
import { useToast } from './use-toast'
import { Toast, ToastProvider, ToastViewport } from '.'

const { toasts } = useToast()
</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <ToastContent v-bind="toast" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
