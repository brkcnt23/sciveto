// nuxt.config.ts - Nuxt 4 + Nuxt UI v4 Configuration
import { resolve } from 'path'
import { pathToFileURL } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2026-04-01',
  devtools: { enabled: true },
  ssr: false,

  // CSS imports
  css: ['~/assets/css/main.css'],

  // Auto-imports configuration
  imports: {
    autoImport: true,
    global: true,
    dirs: [
      'composables/**',
      'utils/**',
      'stores/**'
    ]
  },

  // Component auto-discovery
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      global: true
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
      global: true
    },
    {
      path: '~/components/layout',
      pathPrefix: false,
      global: true
    },
    {
      path: '~/showcase',
      pathPrefix: false,
      global: true
    }
  ],

  // Modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // Workaround for Nuxt 4.4.4 ssr:false bug (#34957)
    function spaDevWorkaround(_options: any, nuxt: any) {
      nuxt.hook('nitro:config', (nitroConfig: any) => {
        if (!nuxt.options.dev || nuxt.options.ssr) return

        const clientManifestPath = pathToFileURL(
          resolve(nuxt.options.buildDir, 'dist/server/client.manifest.mjs'),
        ).href

        nitroConfig.virtual ||= {}
        nitroConfig.virtual['#build/dist/server/server.mjs'] = 'export default () => {}'
        nitroConfig.virtual['#build/dist/server/client.manifest.mjs'] =
          `export { default } from ${JSON.stringify(clientManifestPath)}`
      })
    },
  ],

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Build configuration
  build: {
    transpile: ['@headlessui/vue']
  },

  // Vite configuration
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    server: {
      fs: {
        allow: ['..', '../../node_modules']
      }
    }
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8501/api'
    }
  },

  // Development server configuration
  devServer: {
    port: 8500
  }
})
