import type { Meta, StoryObj } from '@storybook/vue3'
import UiCarousel from './UiCarousel.vue'

const meta = {
  title: 'UI/Carousel',
  component: UiCarousel,
  tags: ['autodocs'],
  args: {
    loop: true,
    autoplay: true,
    autoplayInterval: 5000,
  },
} satisfies Meta<typeof UiCarousel>

export default meta

type Story = StoryObj<typeof meta>
export const Carousel: Story = {
  args: {
    carousels: [
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
    ],
  },
}
