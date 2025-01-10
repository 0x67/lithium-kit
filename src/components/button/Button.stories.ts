import type { Meta, StoryObj } from '@storybook/vue3'
import UiButton from './Button.vue'
import type { ButtonVariants } from '.'

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
    onClick: {
      action: 'click',
    },
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
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'primary',
    label: 'Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'primary',
    label: 'Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'primary',
    label: 'Button',
  },
}
