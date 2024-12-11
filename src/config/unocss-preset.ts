import { definePreset } from '@unocss/core'

const rpxRE = /(-?[.\d]+)rpx/g

export interface RpxToPxOptions {
  /**
   * Conversion factor for rpx to px
   * @default 2
   */
  conversionFactor?: number
}

/**
 * Custom UnoCSS preset for converting `rpx` to `px`.
 */
export const presetRpxToPx = definePreset((options: RpxToPxOptions = {}) => {
  const { conversionFactor = 2 } = options

  return {
    name: '@unocss/preset-rpx-to-px',
    postprocess: (util) => {
      util.entries.forEach((entry) => {
        const [, value] = entry // Destructure key-value pair
        if (typeof value === 'string' && rpxRE.test(value)) {
          entry[1] = value.replace(rpxRE, (_, rpxValue) => `${rpxValue / conversionFactor}px`)
        }
      })
    },
  }
})

export default presetRpxToPx
