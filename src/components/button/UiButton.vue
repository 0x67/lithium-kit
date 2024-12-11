<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'radix-vue'
import { Primitive } from 'radix-vue'
import {
  type ButtonVariants,
  buttonVariants,
} from '.'

export interface IconProps {
  // icon?: Icon
  // iconSize?: number;
  // placement?: 'left' | 'right'
}

interface ButtonProps extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  label: string
}

type Props = ButtonProps & IconProps

withDefaults(defineProps<Props>(), {
  as: 'button',
  disabled: false,
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="disabled"
    :type="type"
    :class="
      cn(buttonVariants({ variant, size }))
    "
    @click="onClick"
  >
    <!-- <view
      v-if="props.icon && props.placement === 'left'"
      class="mr-24rpx"
      :class="props.icon"
    /> -->
    {{ label }}
    <!-- <view
      v-if="props.icon && props.placement === 'right'"
      class="ml-8rpx"
      :class="props.icon"
    /> -->
  </Primitive>
</template>
