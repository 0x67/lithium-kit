import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    'storybook-addon-rem-v8',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  typescript: {
    check: true,
  },
  docs: {},
  async viteFinal(config) {
    return {
      ...config,
    }
  },
}
export default config
