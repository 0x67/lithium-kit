<script lang="ts" setup>
interface IconProps {
  fillColor?: string
  name: string
  strokeColor?: string
}

const props = defineProps<IconProps>()
</script>

<template>
  <div>
    <component :is="props.name" />
  </div>
</template>
