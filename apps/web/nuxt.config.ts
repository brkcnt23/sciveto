// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false, // For better auth handling
  
  components: [
    // Base components - temel UI bileşenleri
    {
      path: '~/components/base',
      pathPrefix: false,
    },
    // UI helper components - yardımcı bileşenler  
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    // Business logic components - iş mantığı bileşenleri
    {
      path: '~/components/business',
      pathPrefix: false,
    },
    // Form components - form bileşenleri
    {
      path: '~/components/forms',
      pathPrefix: false,
    },
    // Layout components - sayfa düzeni bileşenleri
    {
      path: '~/components/layout',
      pathPrefix: false,
    },
    // Plugin & AI components - eklenti ve AI bileşenleri
    {
      path: '~/components/plugins',
      pathPrefix: false,
    },
    // Default components folder - genel bileşenler
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