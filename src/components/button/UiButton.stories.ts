import type { Meta, StoryObj } from '@storybook/vue3'

import UiButton from './UiButton.vue'
import type { ButtonVariants } from '@/components/button'

const meta = {
  title: 'UI/Button',
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'danger',
        'ghost',
      ] as ButtonVariants['variant'][],
    },
    size: { control: 'select', options: [
      'primary',
      'small',
    ] as ButtonVariants['size'][] },
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },

} satisfies Meta<typeof UiButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'primary',
    label: 'Button',
    disabled: false,
  },
}
