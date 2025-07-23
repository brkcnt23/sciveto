// nuxt.config.ts - Enhanced with Advanced Theme System
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
      path: '~/showcase',
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

  alias: {
    '@/types': './types'
  },
  
  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: true
  },

  // Enhanced auto-imports for theme system
  imports: {
    autoImport: true,
    global: true,
    dirs: [
      'composables/**',
      'utils/**'
    ]
  },

  // App configuration with theme system
  app: {
    head: {
      title: 'Sciveto - Modern Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modern dashboard built with Nuxt UI v3' },

        // Enhanced theme meta tags
        { name: 'theme-color', content: '#16a34a', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#22c55e', media: '(prefers-color-scheme: dark)' },
        { name: 'color-scheme', content: 'light dark' },

        // Apple-specific meta tags
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },

        // Microsoft-specific meta tags
        { name: 'msapplication-TileColor', content: '#16a34a' },

        // Prefers color scheme support
        { name: 'supported-color-schemes', content: 'light dark' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

        // Preload critical fonts for better performance
        {
          rel: 'preload',
          href: '/fonts/inter-var.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ],
      script: [
        // Early theme detection script to prevent flash
        {
          innerHTML: `
            (function() {
              const getStoredTheme = () => {
                try {
                  return localStorage.getItem('nuxt-color-mode')
                } catch (e) {
                  return null
                }
              }
              
              const getSystemTheme = () => {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
              }
              
              const applyTheme = (theme) => {
                const html = document.documentElement
                const body = document.body
                
                html.classList.remove('light', 'dark')
                body.classList.remove('light', 'dark')
                
                html.classList.add(theme)
                body.classList.add(theme)
                
                html.style.colorScheme = theme
                body.style.colorScheme = theme
                
                // Force repaint
                html.offsetHeight
                body.offsetHeight
              }
              
              // Apply theme immediately
              const stored = getStoredTheme()
              let theme
              
              if (stored === 'light' || stored === 'dark') {
                theme = stored
              } else if (stored === 'auto' || !stored) {
                theme = getSystemTheme()
              } else {
                theme = 'light'
              }
              
              applyTheme(theme)
              
              // Listen for system changes
              if (stored === 'auto' || !stored) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                  const newTheme = e.matches ? 'dark' : 'light'
                  applyTheme(newTheme)
                })
              }
            })()
          `,
          type: 'text/javascript'
        }
      ]
    }
  },

  // Enhanced build configuration
  build: {
    transpile: ['@headlessui/vue']
  },

  // Vite configuration with theme system optimizations
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/css/variables.scss";
          `
        }
      }
    },
    build: {
      // Optimize CSS for better performance
      cssCodeSplit: true,
      // Reduce bundle size
      rollupOptions: {
        output: {
          manualChunks: {
            'theme-system': ['~/composables/useTheme', '~/components/ThemeToggle.vue']
          }
        }
      }
    }
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001',
      wsUrl: process.env.WS_URL || 'ws://localhost:3001',

      // Theme system configuration
      theme: {
        defaultMode: process.env.NUXT_DEFAULT_THEME || 'system',
        enableTransitions: process.env.NUXT_THEME_TRANSITIONS !== 'false',
        enableKeyboardShortcuts: process.env.NUXT_THEME_SHORTCUTS !== 'false',
        transitionDuration: parseInt(process.env.NUXT_THEME_TRANSITION_DURATION || '250')
      }
    }
  },

  // Nitro configuration
  nitro: {
    experimental: {
      wasm: true
    },

    // Prerender configuration for better SEO
    prerender: {
      routes: ['/']
    }
  },

  // Experimental features
  experimental: {
    payloadExtraction: false, // Better hydration performance
    viewTransition: true      // Smooth page transitions
  },

  // Optimization
  optimization: {
    keyedComposables: [
      {
        name: 'useTheme',
        argumentLength: 2
      }
    ]
  }
})