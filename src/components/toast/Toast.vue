<script setup lang="ts">
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'radix-vue'
import { computed } from 'vue'
import { type ToastProps, toastVariants } from '.'

const props = defineProps<ToastProps>()

const emits = defineEmits<ToastRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    class="box-shadow"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>

<style scoped>
.box-shadow {
  box-shadow:
    0px 4px 6px -2px #0000000d,
    0px 10px 15px -3px #0000001a;
}
</style>
