<script lang="ts" setup>
import { type Component, isVNode } from 'vue'
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'radix-vue'
import type { StringOrVNode } from './use-toast'
import { type ToastProps, toastVariants } from '.'
import IAlloToastInfo from '~icons/allo/toast-info'

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: StringOrVNode
  action?: Component
}

const toast = defineProps<ToasterToast>()
const emits = defineEmits<ToastRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = toast

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const icons = {
  info: {
    component: IAlloToastInfo,
  },
}
</script>

<template>
  <ToastRoot
    v-bind="forwarded" class="box-shadow"
    :class="cn(toastVariants({ variant }), toast.class)"
    @update:open="onOpenChange"
  >
    <div class="flex flex-row items-center gap-16rpx">
      <component :is="icons.info.component" class="h-48rpx w-48rpx" />
      <div class="flex flex-col items-center gap-8rpx">
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
        <ToastClose />
      </div>
    </div>
  </ToastRoot>
  <!-- <component :is="toast.action" /> -->
</template>

<style scoped>
.box-shadow {
  box-shadow:
    0px 4px 6px -2px #0000000d,
    0px 10px 15px -3px #0000001a;
}
</style>
