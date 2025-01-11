import type { Meta, StoryObj } from '@storybook/vue3'
import UIButtonGroup from './ButtonGroup.vue'
import UiButton from '@/components/button/Button.vue'

const meta = {
  title: 'UI/ButtonGroup',
  component: UIButtonGroup,
  tags: ['autodocs'],

} satisfies Meta<typeof UIButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const ButtonGroup: Story = {
  args: {
  },
  render: () => ({
    components: { UIButtonGroup, UiButton },
    setup() {
    },
    template: `
      <UIButtonGroup>
        <UiButton variant="primary" size="primary" label="Button 1"/>
        <UiButton variant="secondary" size="primary" label="Button 2"/>
        <UiButton variant="danger" size="primary" label="Button 3"/>
      </UIButtonGroup>
    `,
  }),
}
