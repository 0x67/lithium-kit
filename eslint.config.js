// @ts-check
import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'
import storybook from 'eslint-plugin-storybook'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    ignores: [
      'storybook-static',
    ],
    plugins: [
      storybook,
      oxlint.configs['flat/all'],
      // ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),
    ],
  },
)
