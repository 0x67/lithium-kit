<script setup lang="ts">
const carousels = [
  {
    img: '/assets/slide_1.svg',
    title: 'Welcome to Allo Bank',
    description: 'Banking made easy so you can focus on what\nmatters most. Let’s get started!',
  },
  {
    img: '/assets/slide_2.svg',
    title: 'Unlimited free transfers',
    description: 'Transfer to any bank without fees. More money\nsaved, more freedom for you.',
  },
  {
    img: '/assets/slide_2.svg',
    title: 'Earn interest up to 6.5%',
    description: 'Grow your savings while you focus on life.',
  },
]
</script>

<template>
  <div class="">
    <ui-carousel :carousels="carousels" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
