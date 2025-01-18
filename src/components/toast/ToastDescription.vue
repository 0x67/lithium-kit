<script setup lang="ts">
import { Primitive, type ToastDescriptionProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<ToastDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Primitive
    :class="cn('text-label-regular text-white max-w-560rpx h-48rpx truncate', props.class)"
    v-bind="delegatedProps"
  >
    {{ props.class }}
    <slot />
  </Primitive>
</template>
