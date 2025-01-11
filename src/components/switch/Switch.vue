<script setup lang="ts">
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="cn(
      'inline-flex h-48rpx w-80rpx shrink-0 bg-primary-gray-100 cursor-pointer items-center rounded-full transition transition-duration-300 disabled:cursor-not-allowed',
      // 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ',
      'data-[state=checked]:bg-primary-yellow-400 data-[state=checked]:disabled:(bg-primary-yellow-700 opacity-50)',
      'data-[state=unchecked]:bg-primary-gray-100',
      'data-[state=unchecked]:disabled:(bg-primary-gray-50 border border-3rpx border-primary-background-section)',
      props.class,
    )"
  >
    <SwitchThumb
      :class="cn(
        'pointer-events-none block h-40rpx w-40rpx rounded-full transition-transform',
        'data-[state=checked]:(translate-x-36rpx bg-white)',
        'data-[state=unchecked]:(translate-x-4rpx bg-white)',
        props.disabled && 'data-[state=unchecked]:(translate-x-2rpx bg-primary-background-section)',
      )
      "
    >
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>

<style scoped>
.ring-width {
  ring-width: 3rpx;
}
</style>
