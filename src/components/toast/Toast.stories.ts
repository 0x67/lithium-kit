import type { Meta, StoryObj } from '@storybook/vue3'
import ToastProvider from './ToastProvider.vue'
import UiToastContent from './UiToastContent.vue'
import ToastViewport from '@/components/toast/ToastViewport.vue'

const meta = {
  title: 'UI/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
  },
} satisfies Meta<typeof ToastProvider>

export default meta

type Story = StoryObj<typeof meta>

export const Toast: Story = {
  args: {
    // checked: false,
    // disabled: false,
  },
  render: () => ({
    components: { ToastProvider, UiToastContent, ToastViewport },
    setup() {
      const toast = ref({
        title: 'Hello',
      })

      return {
        toast,
      }
    },
    template: `
      <ToastProvider>
        <UiToastContent v-bind="toast" />
        <ToastViewport />
      </ToastProvider>
    `,
  }),
}
