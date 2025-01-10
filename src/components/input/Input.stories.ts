import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiInput from './Input.vue'

const meta = {
  title: 'UI/Input',
  component: UiInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'password',
        'email',
        'number',
        'tel',
        'url',
      ],
    },
  },
  args: {
    label: 'Input Label',
    id: 'basic-input',
  },
} satisfies Meta<typeof UiInput>

export default meta

type Story = StoryObj<typeof meta>

export const BasicInput: Story = {
  args: {
  },
  render: args => ({
    components: { UiInput },
    setup() {
      const modelValue = ref('')
      return { args, modelValue }
    },
    template: '<UiInput v-bind="args" v-model="modelValue" :label="args.label" />',
  }),
}
