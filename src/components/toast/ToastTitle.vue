<script setup lang="ts">
import { Primitive, type ToastTitleProps } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn('text-sm text-white font-semibold', props.class)">
    <slot />
  </Primitive>
</template>
