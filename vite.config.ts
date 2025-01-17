import path from 'node:path'
import {
  cleanupInlineStyle,
  cleanupSVG,
  deOptimisePaths,
  importDirectory,
  parseColors,
  removeFigmaClipPathFromSVG,
  runSVGO,
} from '@iconify/tools'
import Shiki from '@shikijs/markdown-it'
import Vue from '@vitejs/plugin-vue'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Iconify from 'unplugin-iconify-generator/vite'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { type PluginOption, type UserConfig, defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import ViteRestart from 'vite-plugin-restart'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import generateSitemap from 'vite-ssg-sitemap'

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

  iconSet.forEachSync((name) => {
    const svg = iconSet.toSVG(name)!

    cleanupInlineStyle(svg)
    cleanupSVG(svg)

    parseColors(svg, {
      callback: (attributes, color, parsedColor) => {
        // supports for duo-tone icons
        switch (attributes) {
          case 'fill':
          case 'stroke':
            switch (parsedColor?.type) {
              case 'none':
                return 'none'
              case 'transparent':
                return 'transparent'
              default:
                if (attributes === 'fill') {
                  return 'var(--icon-fill, transparent)'
                }

                return 'var(--icon-stroke, currentColor)'
            }

          default:
            return color
        }
      },
    })

    // Optimise
    runSVGO(svg)

    // Update paths for compatibility with old software
    deOptimisePaths(svg)

    // Remove clip-path from Figma
    removeFigmaClipPathFromSVG(svg)

    // Update icon in icon set
    iconSet.fromSVG(name, svg)
  })

  // Return as function
  return () => iconSet.export()
}

const fullReloadAlways: PluginOption = {
  name: 'full-reload-always',
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' })
    return []
  },
} as PluginOption

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const env = loadEnv(mode, '.')

  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: ['.vue', '.md'],
        dts: 'src/typed-router.d.ts',
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
          VueRouterAutoImports,
          {
            // add any other imports you were relying on
            'vue-router/auto': ['useLink'],
          },
        ],
        packagePresets: ['@vueuse/motion', '@vueuse/components'],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables/**',
          'src/utils/**',
          'src/types/**',
        ],
        vueTemplate: true,
        viteOptimizeDeps: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.ts$/],
        dts: 'src/components.d.ts',
        resolvers: [
          IconResolver({
            customCollections: [
              'allo',
            ],
          }),
        ],
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      Unocss(),
      Iconify({
        collections: {
          allo: './src/assets/icons',
        },
      }),
      Icons({
        compiler: 'vue3',
        customCollections: {
          // eslint-disable-next-line ts/ban-ts-comment
          // @ts-ignore
          allo: await loadCustomIconSet('./src/assets/icons'),
        },
      }),

      // https://github.com/unplugin/unplugin-vue-markdown
      // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        async markdownItSetup(md) {
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
          md.use(await Shiki({
            defaultColor: false,
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          }))
        },
      }),

      // https://github.com/antfu/vite-plugin-pwa
      env.VITE_MODE !== 'storybook' && VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'Vitesse',
          short_name: 'Vitesse',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),

      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),
      ViteRestart({
        restart: [
          'vite.config.ts',
          'uno.config.ts',
          './src/assets/icons/**/*.svg',
          './src/config/unocss.ts',
        ],
      }),
      fullReloadAlways,
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      crittersOptions: {
        reduceInlineStyles: false,
      },
      onFinished() {
        generateSitemap()
      },
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
        'vite-plugin-pwa',
        'radix-vue',
        'vue-demi',
      ],
    },
    server: {
      hmr: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window'],
    },
  }
})
