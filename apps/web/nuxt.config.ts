// 1. RENAME COMPOSABLE TO AVOID CONFLICT
// Rename: apps/web/composables/useToast.ts → apps/web/composables/useCustomToast.ts

// 2. UPDATE nuxt.config.ts - REMOVE DUPLICATE COMPONENT PATHS
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  
  components: [
    // Remove duplicate paths and fix order
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
    // REMOVE plugins directory since it doesn't exist
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