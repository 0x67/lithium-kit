<script setup lang="ts">
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'

const props = defineProps<WithClassAsProps>()
const { scrollTo, selectedIndex, scrollSnaps, orientation } = useCarousel()
</script>

<template>
  <div
    :class="
      cn(
        'flex gap-16rpx justify-center relative',
        { 'top-10': orientation === 'vertical' },
        props.class,
      )
    "
  >
    <div
      v-for="(_, index) in scrollSnaps"
      :key="index"
      class="dot rounded-full"
      :class="
        cn(
          index === selectedIndex
            ? 'border-transparent bg-primary-yellow-500'
            : 'bg-primary-gray-100',
          'w-12rpx h-12rpx',
        )
      "
      @click="scrollTo(index)"
    />
  </div>
</template>

<style scoped>
.dot {
  transition:
    width 0.3s ease,
    height 0.3s ease;

  @apply ease-in-out;
}
</style>
