import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,

  components: [
    {
      path: '~/components/base',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    {
      path: '~/components/business',
      pathPrefix: false,
    },
    {
      path: '~/components/forms',
      pathPrefix: false,
    },
    {
      path: '~/components/layout',
      pathPrefix: false,
    },
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  css: ['~/assets/css/main.css'],
  
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Force enable auto-imports
  imports: {
    autoImport: true,
    global: true
  },

  // App configuration
  app: {
    head: {
      title: 'Sciveto - Modern Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modern dashboard built with Nuxt UI v3' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Build configuration
  build: {
    transpile: ['@headlessui/vue']
  },

  // Vite configuration
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001',
      wsUrl: process.env.WS_URL || 'ws://localhost:3001'
    }
  },

  nitro: {
    experimental: {
      wasm: true
    }
  }
})