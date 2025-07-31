export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,

  // CSS imports
  css: ['~/assets/css/main.css'],

  // ENHANCED Auto-imports configuration
  imports: {
    autoImport: true,
    global: true,
    dirs: [
      'composables/**',
      'utils/**', 
      'stores/**'
    ],
    // Explicit imports to fix VSCode issues
    presets: [
      {
        from: 'vue',
        imports: [
          'ref', 'reactive', 'computed', 'watch', 'watchEffect',
          'onMounted', 'onUnmounted', 'onErrorCaptured', 'nextTick',
          'readonly', 'shallowRef', 'toRef', 'toRefs', 'unref'
        ]
      },
      {
        from: '@nuxt/kit',
        imports: ['useHead']
      },
      {
        from: 'nuxt/app', 
        imports: [
          'definePageMeta', 'useSeoMeta', 'useRouter', 'useRoute',
          'navigateTo', 'createError', 'useRuntimeConfig'
        ]
      },
      {
        from: '@nuxt/ui',
        imports: ['useToast']
      },
      {
        from: 'pinia',
        imports: ['defineStore']
      }
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

  // TypeScript configuration - Enhanced
  typescript: {
    strict: true,
    typeCheck: true,
    // Generate better types for VSCode
    tsConfig: {
      compilerOptions: {
        // Better auto-import support
        types: [
          'node',
          'nuxt',
          '@pinia/nuxt',
          '@vueuse/nuxt',
          '@nuxt/ui'
        ]
      },
      // Ensure .nuxt types are included
      include: [
        '**/*.ts',
        '**/*.tsx', 
        '**/*.vue',
        '.nuxt/nuxt.d.ts',
        '.nuxt/imports.d.ts'
      ]
    }
  },

  // Rest of config...
  alias: {
    '@/types': './types',
    '@/': './',
    '~/': './'
  },

  build: {
    transpile: ['@headlessui/vue']
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['vue', '@nuxt/ui', 'pinia'],
      exclude: ['@tailwindcss/oxide', 'lightningcss']
    },
    build: {
      rollupOptions: {
        external: ['@tailwindcss/oxide', 'lightningcss']
      }
    },
    server: {
      fs: {
        allow: ['..']
      }
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001'
    }
  }
})