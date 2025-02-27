<script setup lang="ts">
import type { HTMLAttributes, InputTypeHTMLAttribute } from 'vue'
import { useVModel } from '@vueuse/core'

const props = withDefaults(defineProps<{
  id: string
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  errorMessage?: string
  type?: InputTypeHTMLAttribute
  label?: string
  password?: boolean
  disabled?: boolean
  readonly?: boolean
}>(), {
  type: 'text',
  label: 'Label',
  password: false,
  disabled: false,
  readonly: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
  (e: 'onFocus'): void
}>()

const isFocused = ref(false)

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

function handleFocus() {
  if (!props.modelValue) {
    isFocused.value = !isFocused.value
  }
}
</script>

<template>
  <div>
    <div
      class="relative h112rpx w-full border-2rpx border-primary-gray-100 rounded-md"
      transition="colors duration-300 ease-in-out"
      :class="cn(
        errorMessage && 'border-primary-red-500',
        !errorMessage && isFocused && !disabled && 'border-primary-yellow-400',
        !errorMessage && !isFocused && 'border-primary-gray-100',
        disabled && 'bg-primary-gray-50',
      )"
    >
      <!-- TODO: Check why top-[1/2] suddenly stop working  -->
      <label
        :for="id"
        :class="cn(
          'inset-x-24rpx pointer-events-none transform-gpu',
        )"
        transition="all duration-300 ease-in-out"
        pos="absolute"
        :top="isFocused ? '16rpx' : '28rpx'"
        :text="isFocused ? 'caption-semibold primary-gray-600' : 'label-regular primary-gray-400'"
        translate-y="-50%"
      >
        {{ label }}
      </label>

      <input
        :id="id"
        v-model="modelValue"
        :value="modelValue"
        :name="id"
        :class="cn(
          'placeholder-transparent transform-gpu',
          isFocused ? '' : 'rounded-md',
        )"
        :h="isFocused ? '' : 'full'"
        :inset="isFocused ? 'x-24rpx' : 'x-0'"
        text="label-regular primary-raisin"
        transition="all duration-300 ease-in-out"
        position="absolute"
        :bottom="isFocused ? '16rpx' : ''"
        :opacity="isFocused ? '100' : '50'"
        outline="none"
        :password="password"
        :disabled="disabled"
        @focus="handleFocus"
        @blur="handleFocus"
      >
    </div>
    <span v-if="errorMessage" class="text-caption-regular text-red-400">{{ errorMessage }}</span>
  </div>
</template>
