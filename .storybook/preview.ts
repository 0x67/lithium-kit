import type { Preview } from '@storybook/vue3'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './preview.css'
import './dynamic-font'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
