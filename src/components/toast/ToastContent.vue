<script lang="ts" setup>
import { type Component, isVNode } from 'vue'
import type { StringOrVNode } from './use-toast'
import type { ToastProps } from '.'
import IAlloInfo from '~icons/allo/info'

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: StringOrVNode
  action?: Component
}

const toast = defineProps<ToasterToast>()
const icons = {
  info: {
    component: IAlloInfo,
  },
}
</script>

<template>
  <div class="flex flex-row items-center gap-16rpx">
    <component :is="icons.info" class="" />
    <div class="grid items-center gap-8rpx">
      <ToastTitle v-if="toast.title">
        {{ toast.title }}
      </ToastTitle>
      <template v-if="toast.description">
        <ToastDescription v-if="isVNode(toast.description)">
          <component :is="toast.description" />
        </ToastDescription>

        <ToastDescription v-else>
          {{ toast.description }}
        </ToastDescription>
      </template>
    <!-- <ToastClose /> -->
    </div>
  </div>
  <!-- <component :is="toast.action" /> -->
</template>
