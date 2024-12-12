<script lang="ts" setup>
import Autoplay from 'embla-carousel-autoplay'

interface CarouselItem {
  img?: string
  title: string
  description?: string
}

withDefaults(defineProps<{
  autoplay?: boolean
  autoplayInterval?: number
  loop?: boolean
  carousels: CarouselItem[]
}>(), {
  loop: true,
  autoplay: true,
  autoplayInterval: 5000,
})
</script>

<template>
  <Carousel
    class="w-720rpx flex-col gap-16rpx text-center"
    :opts="{
      loop: true,
    }"
    :plugins="autoplay ? [Autoplay({ delay: autoplayInterval })] : []"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(carousel, idx) in carousels"
        :key="idx"
        class="flex flex-col"
      >
        <view>
          <view class="center p-32rpx">
            <img v-if="carousel.img" :src="carousel.img" class="h-400rpx w-640rpx">
          </view>
          <view class="flex flex-col p32rpx">
            <span class="text-title-lg text-primary-raisin">{{ carousel.title }}</span>
            <span
              v-if="carousel.description"
              class="whitespace-pre-wrap text-body-regular text-primary-gray-600"
            >
              {{ carousel.description }}
            </span>
          </view>
        </view>
      </CarouselItem>
    </CarouselContent>
    <CarouselDotButtons class="py-16rpx" />
  </Carousel>
</template>
