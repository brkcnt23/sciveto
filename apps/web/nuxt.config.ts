// nuxt.config.ts - Optimized Nuxt UI v3 Configuration
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
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
    '@vueuse/nuxt'
  ],

  // Alias configuration
  alias: {
    '@/types': './types',
    '@/': './',
    '~/': './'
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Build configuration
  build: {
    transpile: ['@headlessui/vue']
  },

  // Vite configuration - Tailwind CSS v4 + Nuxt UI v3 Windows Fix
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['vue', '@nuxt/ui', 'pinia'],
      exclude: ['@tailwindcss/oxide', 'lightningcss']
    },
    ssr: {
      noExternal: ['@nuxt/ui', 'tailwindcss']
    },
    build: {
      rollupOptions: {
        external: ['@tailwindcss/oxide-win32-x64-msvc', 'lightningcss/node']
      }
    },
    server: {
      fs: {
        allow: ['..', '../../node_modules']
      }
    }
  },

  // Nitro configuration for Windows + Tailwind v4
  nitro: {
    experimental: {
      wasm: true
    },
    rollupConfig: {
      external: ['@tailwindcss/oxide', 'lightningcss']
    }
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001/api'
    }
  },

  // Development server configuration
  devServer: {
    port: 3000
  }
})
