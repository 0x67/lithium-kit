import type { Meta, StoryObj } from '@storybook/vue3'
import UISwitch from './Switch.vue'

const meta = {
  title: 'UI/Switch',
  component: UISwitch,
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof UISwitch>

export default meta

type Story = StoryObj<typeof meta>

export const Switch: Story = {
  args: {
    // checked: false,
    // disabled: false,
  },
  render: args => ({
    components: { UISwitch },
    setup() {
      const checked = ref(args.checked)
      const disabled = ref(args.disabled)
      return { args, checked, disabled }
    },
    template: '<UISwitch v-model:checked="args.checked" v-model:disabled="args.disabled"/>',
  }),
}
