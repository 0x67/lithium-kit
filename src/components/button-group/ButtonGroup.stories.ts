import type { Meta, StoryObj } from '@storybook/vue3'
import UiButtonGroup from './UiButtonGroup.vue'
import { UiButton } from '@/components/button'

const meta = {
  title: 'UI/ButtonGroup',
  component: UiButtonGroup,
  tags: ['autodocs'],

} satisfies Meta<typeof UiButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const ButtonGroup: Story = {
  args: {
  },
  render: () => ({
    components: { UiButtonGroup, UiButton },
    setup() {
    },
    template: `
      <UiButtonGroup>
        <UiButton variant="primary" size="primary" label="Button 1"/>
        <UiButton variant="secondary" size="primary" label="Button 2"/>
        <UiButton variant="danger" size="primary" label="Button 3"/>
      </UiButtonGroup>
    `,
  }),
}
