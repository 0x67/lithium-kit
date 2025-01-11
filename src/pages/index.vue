<script setup lang="ts">
import { UiButton } from '@/components/button'
import { UiSwitch } from '@/components/ui/switch'

const checked = ref(false)
const disabled = ref(false)
</script>

<template>
  <div class="h-screen">
    <UiButton label="TEst" />
    <UiSwitch v-model:checked="checked" :disabled="disabled" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
