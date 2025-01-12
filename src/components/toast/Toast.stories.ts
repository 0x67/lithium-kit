import type { Meta, StoryObj } from '@storybook/vue3'
import ToastProvider from './ToastProvider.vue'
import UiToast from './Toast.vue'
import ToastContent from './ToastContent.vue'

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
    components: { ToastProvider, UiToast, ToastContent },
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
      <UiToast>
        <ToastContent :toast="toast" />
      </UiToast>
    </ToastProvider>
    `,
  }),
}
