<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'radix-vue'
import {
  type ButtonVariants,
  buttonVariants,
} from './variants'

export interface IconProps {
  icon?: string
  // iconSize?: number
  placement?: 'left' | 'right'
}

interface ButtonProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  label: string
  /**
   *  DON'T CHANGE IN STORYBOOK
   */
  asChild?: boolean
}

const props = withDefaults(defineProps<ButtonProps & IconProps>(), {
  disabled: false,
  type: 'button',
})
</script>

<template>
  <Primitive
    as="button"
    :as-child="asChild"
    :disabled="disabled"
    :type="type"
    :class="
      cn(buttonVariants({ variant, size }))
    "
    @click="onClick"
  >
    <div
      v-if="props.icon && props.placement === 'left'"
      class="mr-24rpx"
      :class="props.icon"
    />
    {{ label }}
    <div
      v-if="props.icon && props.placement === 'right'"
      class="ml-8rpx"
      :class="props.icon"
    />
  </Primitive>
</template>
