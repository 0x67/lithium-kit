import type { Meta, StoryObj } from '@storybook/vue3'
import UiSwitch from './UiSwitch.vue'

const meta = {
  title: 'UI/Switch',
  component: UiSwitch,
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof UiSwitch>

export default meta

type Story = StoryObj<typeof meta>

export const Switch: Story = {
  args: {
    // checked: false,
    // disabled: false,
  },
  render: args => ({
    components: { UiSwitch },
    setup() {
      const checked = ref(true)
      const disabled = ref(true)
      return { args, checked, disabled }
    },
    template: '<UiSwitch v-model:checked="args.checked" v-model:disabled="args.disabled"/>',
  }),
}
