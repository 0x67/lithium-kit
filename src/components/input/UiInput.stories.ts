import type { Meta, StoryObj } from '@storybook/vue3'
import UiInput from './UiInput.vue'

const meta = {
  title: 'UI/Input',
  component: UiInput,
  tags: ['autodocs'],
  args: {
  },
} satisfies Meta<typeof UiInput>

export default meta

type Story = StoryObj<typeof meta>

export const BasicInput: Story = {
  args: {
    id: 'basic-input',
  },
}
