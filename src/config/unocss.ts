import { resolve } from 'node:path'
import {
  type ConfigBase,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import {
  presetApplet,
  presetRemRpx,
} from 'unocss-applet'
import { presetAnimations } from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'
import { deOptimisePaths, importDirectory, parseColors, runSVGO } from '@iconify/tools'

/**
 * Load custom icon set
 * @ref https://github.com/iconify/tools/blob/42a6b8c53a30626b6857efe977a36eb5f336e6d7/%40iconify-demo/unocss/unocss.config.ts#L15
 */
async function loadCustomIconSet(dir: string) {
  // Load icon set
  const iconSet = await importDirectory(dir, {
    prefix: 'allo',
    ignoreImportErrors: 'warn',
  })

  // Parse all icons: optimise, clean up palette
  iconSet.forEachSync((name) => {
    const svg = iconSet.toSVG(name)!

    parseColors(svg, {
      defaultColor: 'currentColor',
      callback: () => {
        return 'currentColor'
      },
    })

    // Optimise
    runSVGO(svg)

    // Update paths for compatibility with old software
    deOptimisePaths(svg)

    // Update icon in icon set
    iconSet.fromSVG(name, svg)
  })

  // Return as function
  return () => iconSet.export()
}

export const lithiumContents: ConfigBase['content'] = {
  pipeline: {
    include: [
      // the default
      /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
      // include js/ts files
      'src/**/*.{js,ts}',
    ],
  },
}

const path = resolve(__dirname, '../../src/assets/icons')

export const lithiumPresets: ConfigBase['presets'] = [
  presetUno({
    attributifyPseudo: true,
  }),
  presetIcons({
    warn: true,
    extraProperties: {
      'display': 'inline-block',
      'vertical-align': 'middle',
    },
    collections: {
      nuxtflix: await loadCustomIconSet(path),
    },
  }),
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  presetApplet(),
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  presetRemRpx({
    mode: 'rpx2rem',
  }),
  // presetWeapp(),
  presetTypography(),
  // presetWebFonts({
  //   fonts: {
  //     sans: 'DM Sans',
  //     serif: 'DM Serif Display',
  //     mono: 'DM Mono',
  //   },
  //   processors: createLocalFontProcessor(),
  // }),
  presetAttributify(),
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  presetAnimations(),
  // presetTailwindMotion({}),
  presetShadcn(),
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  // presetRpxToPx({
  //   conversionFactor: 2, // Divide `rpx` values by 2 to get `px`
  // }),
]

export const lithiumPreflights: ConfigBase['preflights'] = [
  {
    getCSS: () => `
      /** Apply global numeric styles **/
      :root {
        font-variant-numeric: lining-nums tabular-nums;
      }

      /** Revert styles injected by tailwind **/
      ul, ol {
        list-style: revert;
      }
    `,
  },
]

//

export const lithiumThemes: ConfigBase['theme'] = {
  // ref: https://www.figma.com/design/UYIpU2RqNhptJmOT7bUJe8/Lithium-Kit-1.0?node-id=2-75
  colors: {
    // border: 'hsl(var(--border))',
    // input: 'hsl(var(--input))',
    // ring: 'hsl(var(--ring))',
    // foreground: 'hsl(var(--foreground))',
    white: 'hsl(var(--hue, 0), 0%, 100%)', // #FFFFFF
    primary: {
      raisin: 'hsl(var(--hue, 0), 0%, 20%)', // #333333
      gray: {
        600: 'hsl(var(--hue, 216.52), 10.5%, 42.94%)', // #626B79 ($gray-600)
        400: 'hsl(var(--hue, 212), 8%, 52%)', // #8B95A5 ($gray-400)
        100: 'hsl(var(--hue, 210), 20%, 83%)', // #D0D6DD ($gray-100)
        50: 'hsl(var(--hue, 210), 31%, 94%)', // #EDF0F2 ($gray-50)
        25: 'hsl(var(--hue, 216), 33%, 97%)', // #F8F9FB ($gray-25)
      },
      yellow: {
        700: 'hsl(var(--hue, 43), 94%, 48%)', // #F5AB00
        500: 'hsl(var(--hue, 42), 100%, 52%)', // #FFB60A
        400: 'hsl(var(--hue, 42), 100%, 55%)', // #FFBC25
        100: 'hsl(var(--hue, 43), 100%, 85%)', // #FFE7AD
        50: 'hsl(var(--hue, 43), 100%, 93%)', // #FFF3D6
      },
      orange: {
        700: 'hsl(var(--hue, 28), 100%, 48%)', // #F38000
        500: 'hsl(var(--hue, 32), 100%, 55%)', // #FF961F
        400: 'hsl(var(--hue, 32), 100%, 71%)', // #FFBC70
        50: 'hsl(var(--hue, 38), 90%, 94%)', // #FBF3DD
      },
      red: {
        700: 'hsl(var(--hue, 4), 60%, 41%)', // #AB3129
        500: 'hsl(var(--hue, 3), 62%, 50%)', // #C83E39
        400: 'hsl(var(--hue, 3), 67%, 55%)', // #DA473F
        50: 'hsl(var(--hue, 3), 78%, 95%)', // #FDECEE
      },
      green: {
        700: 'hsl(var(--hue, 158), 73%, 37%)', // #17A16E
        500: 'hsl(var(--hue, 157), 73%, 45%)', // #1CC487
        400: 'hsl(var(--hue, 106), 41%, 60%)', // #68BE79
        50: 'hsl(var(--hue, 146), 100%, 94%)', // #ECFFF8
      },
      blue: {
        700: 'hsl(var(--hue, 231), 96%, 38%)', // #042FB2
        500: 'hsl(var(--hue, 226), 84%, 47%)', // #1141D0
        400: 'hsl(var(--hue, 226), 85%, 61%)', // #2759EE
        50: 'hsl(var(--hue, 229), 89%, 95%)', // #E9EEFF
      },
      overlay: 'hsl(var(--hue, 213), 19%, 16%, 0.8)', // #232933, 80%
      shimmer: {
        prime: 'hsl(var(--hue, 0), 4%, 75%)', // #C3BEBE (100%, 25%, 100%)
        payplus: 'hsl(var(--hue, 197), 39%, 35%)', // #3B7182 (100%, 25%, 100%)
        pay: 'hsl(var(--hue, 150), 40%, 80%)', // #B4E2CE (100%, 25%, 100%)
      },
      background: {
        DEFAULT: 'hsl(var(--hue, 216), 20%, 96%)', // #F0F3F8 ($background)
        dark: 'hsl(var(--hue, 225), 7%, 14%)', // #212324 ($background-dark)
        page: 'hsl(var(--hue, 216), 17%, 90%)', // #E5E5E5 ($page-background)
        section: 'hsl(var(--hue, 210), 20%, 83%)', // #D0D6DD ($section-background)
      },
    },
  },
  // https://www.figma.com/design/UYIpU2RqNhptJmOT7bUJe8/Lithium-Kit-1.0?node-id=2-76
  shadowColor: {
    xs: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
    sm: '0px 2px 4px rgba(35, 41, 51, 0.14), 0px 0px 2px rgba(35, 41, 51, 0.12)',
    md: '0px 10px 15px -3px rgba(35, 41, 51, 0.1), 0px 4px 6px -2px rgba(35, 41, 51, 0.05)',
    lg: '0px 9px 28px 8px rgba(35, 41, 51, 0.05), 0px 6px 16px rgba(35, 41, 51, 0.08), 0px 3px 6px -4px rgba(35, 41, 51, 0.12)',
  },
  // https://www.figma.com/design/UYIpU2RqNhptJmOT7bUJe8/Lithium-Kit-1.0?node-id=2-77
  borderRadius: {
    none: '0',
    xs: '8rpx',
    sm: '12rpx',
    md: '16rpx',
    xl: '24rpx',
    full: '9999rpx',
  },
  // https://www.figma.com/design/UYIpU2RqNhptJmOT7bUJe8/Lithium-Kit-1.0?node-id=2-78
  spacing: {
    'none': '0',
    '3xs': '8rpx',
    '2xs': '16rpx',
    'xs': '24rpx',
    'sm': '32rpx',
    'md': '40rpx',
    'lg': '48rpx',
    'xl': '64rpx',
    '2xl': '80rpx',
    '3xl': '160rpx',
  },
  // Typography
  // https://www.figma.com/design/UYIpU2RqNhptJmOT7bUJe8/Lithium-Kit-1.0?node-id=2-79
  fontSize: {
    '2xs': '20rpx',
    'xs': '24rpx',
    'sm': '28rpx',
    'md': '32rpx',
    'lg': '38rpx',
    'xl': '40rpx',
  },
  fontWeight: {
    bold: 700,
    semibold: 600, // also for title
    medium: 500,
    regular: 400, // also for strike / underline
  },
  lineHeight: {
    '2xs': '24rpx',
    'xs': '32rpx',
    'sm': '40rpx',
    'md': '48rpx',
    'lg': '52rpx',
    'xl': '56rpx',
  },
  animation: {
    keyframes: {
      'collapsible-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-collapsible-content-height)' },
      },
      'collapsible-up': {
        from: { height: 'var(--radix-collapsible-content-height)' },
        to: { height: 0 },
      },
    },
    animations: {
      'collapsible-down': 'collapsible-down 0.3s ease-in-out forwards',
      'collapsible-up': 'collapsible-up 0.3s ease-in-out forwards',
    },
  },
}

/**
 * 自定义快捷语句
 * @see https://github.com/unocss/unocss#shortcuts
 */
export const lithiumShortcuts: ConfigBase['shortcuts'] = {
  'center': 'flex items-center justify-center',
  'text-title-lg': 'text-xl font-semibold line-height-xl',
  'text-title-header': 'text-lg font-semibold line-height-lg',
  'text-title-section': 'text-md font-semibold line-height-md',
  'text-label': 'text-md line-height-md',
  'text-label-bold': 'text-label font-bold',
  'text-label-semibold': 'text-label font-semibold',
  'text-label-medium': 'text-label font-medium',
  'text-label-regular': 'text-label font-regular',
  'text-label-link': 'text-label-regular underline',
  'text-label-strike': 'text-label-regular line-through',
  'text-body': 'text-sm line-height-sm',
  'text-body-bold': 'text-body font-bold',
  'text-body-semibold': 'text-body font-semibold',
  'text-body-medium': 'text-body font-medium',
  'text-body-regular': 'text-body font-regular',
  'text-body-link': 'text-body-regular underline',
  'text-body-strike': 'text-body-regular line-through',
  'text-caption': 'text-xs line-height-xs',
  'text-caption-bold': 'text-caption font-bold',
  'text-caption-semibold': 'text-caption font-semibold',
  'text-caption-medium': 'text-caption font-medium',
  'text-caption-regular': 'text-caption font-regular',
  'text-caption-link': 'text-caption-regular underline',
  'text-caption-strike': 'text-caption-regular line-through',
  'text-overline': 'text-2xs line-height-2xs',
  'text-overline-bold': 'text-overline font-bold',
  'text-overline-semibold': 'text-overline font-semibold',
  'text-overline-medium': 'text-overline font-medium',
  'text-overline-regular': 'text-overline font-regular',
  'text-overline-link': 'text-overline-regular underline',
  'text-overline-strike': 'text-overline-regular line-through',
}

export const lithiumTransformers: ConfigBase['transformers'] = [
  transformerDirectives(),
  transformerVariantGroup(),
  // transformerAttributify({ ignoreAttributes: ['block'], deleteAttributes: false }),
]

export const lithiumRules: ConfigBase['rules'] = [
  [
    'p-safe',
    {
      padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
    },
  ],
  ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
  ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  [
    'lining-tabular-nums',
    { 'font-variant-numeric': 'lining-nums tabular-nums' },
  ],
]

export const lithiumConfig: ConfigBase = {
  content: lithiumContents,
  presets: lithiumPresets,
  preflights: lithiumPreflights,
  theme: lithiumThemes,
  shortcuts: lithiumShortcuts,
  transformers: lithiumTransformers,
  rules: lithiumRules,
}
