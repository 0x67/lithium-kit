import type { ToastRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

import { type VariantProps, cva } from 'class-variance-authority'

export { default as Toast } from './Toast.vue'
export { default as ToastAction } from './ToastAction.vue'
export { default as ToastClose } from './ToastClose.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as Toaster } from './Toaster.vue'
export { default as ToastProvider } from './ToastProvider.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as ToastViewport } from './ToastViewport.vue'
export { default as ToastContent } from './ToastContent.vue'
export { toast, useToast } from './use-toast'

export const toastVariants = cva(
  cn(
    'group pointer-events-auto relative flex w-672rpx items-center justify-between space-x-4 overflow-hidden rounded-md border border-3rpx p-24rpx bg-primary-raisin',
    'transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[--radix-toast-swipe-end-x] data-[swipe=move]:translate-x-[--radix-toast-swipe-move-x] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  ),
  {
    variants: {
      variant: {
        info: 'border-primary-shimmer-payplus',
        success: 'border-primary-green-500',
        warning: 'border-primary-orange-500',
        danger: 'border-primary-red-500',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

type ToastVariants = VariantProps<typeof toastVariants>

export const ToastIconVariants = {
  info: 'i-allo-done',
  success: 'i-allo-info',
  danger: 'i-allo-error',
  warning: 'i-allo-warning',
}

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}
