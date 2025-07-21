// app.config.ts - Enhanced with Advanced Theme System
declare global {
  const defineAppConfig: typeof import('nuxt/app')['defineAppConfig']
}

export default defineAppConfig({
  // Nuxt UI v3 Color System - Enhanced for theme system
  ui: {
    colors: {
      primary: 'green',
      secondary: 'blue', 
      success: 'emerald',
      info: 'blue',
      warning: 'amber',
      error: 'red',
      neutral: 'slate'
    },

    // Global Icons Configuration - Enhanced with theme icons
    icons: {
      chevronDown: 'i-lucide-chevron-down',
      chevronUp: 'i-lucide-chevron-up',
      chevronLeft: 'i-lucide-chevron-left',
      chevronRight: 'i-lucide-chevron-right',
      close: 'i-lucide-x',
      loading: 'i-lucide-loader-circle',
      check: 'i-lucide-check',
      minus: 'i-lucide-minus',
      search: 'i-lucide-search',
      external: 'i-lucide-external-link',
      
      // Theme-specific icons
      sun: 'i-lucide-sun',
      moon: 'i-lucide-moon',
      monitor: 'i-lucide-monitor',
      palette: 'i-lucide-palette'
    },

    // Enhanced Sidebar Navigation Theming with Dark Mode Support
    sidebar: {
      slots: {
        root: 'fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-lg transition-all duration-300 ease-in-out',
        header: 'flex items-center justify-center h-16 px-4 border-b border-neutral-200 dark:border-neutral-800',
        nav: 'flex-1 overflow-y-auto px-2 py-4',
        footer: 'border-t border-neutral-200 dark:border-neutral-700 px-2 py-4'
      },
      variants: {
        size: {
          collapsed: { root: 'w-16' },
          expanded: { root: 'w-64' }
        }
      }
    },

    // Enhanced Navigation Item Theming with Better Dark Mode
    navigationItem: {
      slots: {
        base: 'group flex items-center rounded-lg transition-colors cursor-pointer',
        icon: 'flex items-center justify-center shrink-0',
        label: 'truncate text-sm font-medium',
        badge: 'shrink-0',
        chevron: 'shrink-0 transition-transform'
      },
      variants: {
        state: {
          default: {
            base: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted transition-colors',
          },
          active: {
            base: 'bg-primary text-white shadow-sm',
          },
          parentActive: {
            base: 'bg-primary/10 text-primary dark:bg-primary/20',
          }
        },
        size: {
          sm: {
            base: 'px-2 py-1.5',
            icon: 'w-4 h-4 mr-2',
            label: 'text-xs'
          },
          md: {
            base: 'px-3 py-2',
            icon: 'w-5 h-5 mr-3',
            label: 'text-sm'
          },
          lg: {
            base: 'px-4 py-2.5',
            icon: 'w-6 h-6 mr-3',
            label: 'text-base'
          }
        }
      }
    },

    // Enhanced Button Theming for Dark Mode
    button: {
      slots: {
        base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 transition-colors'
      },
      variants: {
        color: {
          primary: {
            solid: 'shadow-sm text-white dark:text-white bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 aria-disabled:bg-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
            outline: 'ring-1 ring-inset ring-primary-500 dark:ring-primary-400 text-primary-500 dark:text-primary-400 hover:bg-primary-50 disabled:bg-transparent aria-disabled:bg-transparent dark:hover:bg-primary-950 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
            soft: 'text-primary-500 dark:text-primary-400 bg-primary-50 hover:bg-primary-100 disabled:bg-primary-50 aria-disabled:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-900 dark:disabled:bg-primary-950 dark:aria-disabled:bg-primary-950 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
            ghost: 'text-primary-500 dark:text-primary-400 hover:bg-primary-50 disabled:bg-transparent aria-disabled:bg-transparent dark:hover:bg-primary-950 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400'
          },
          neutral: {
            solid: 'shadow-sm text-neutral-900 dark:text-white bg-neutral-50 hover:bg-neutral-100 disabled:bg-neutral-50 aria-disabled:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:disabled:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400',
            outline: 'ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 disabled:bg-transparent aria-disabled:bg-transparent dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400',
            soft: 'text-neutral-500 dark:text-neutral-400 bg-neutral-100 hover:bg-neutral-200 disabled:bg-neutral-100 aria-disabled:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:disabled:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400',
            ghost: 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 disabled:bg-transparent aria-disabled:bg-transparent dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400'
          }
        }
      }
    },

    // Enhanced Card Component for Theme System
    card: {
      slots: {
        root: 'overflow-hidden rounded-lg shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 bg-white dark:bg-neutral-900 transition-colors',
        header: 'px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700',
        body: 'px-4 py-5 sm:p-6',
        footer: 'px-4 py-4 sm:px-6 border-t border-neutral-200 dark:border-neutral-700'
      }
    },

    // Enhanced Input Components
    input: {
      slots: {
        root: 'relative',
        base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm px-3 py-1.5 shadow-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md transition-colors'
      }
    },

    // Theme Toggle Component Styling
    themeToggle: {
      slots: {
        base: 'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        icon: 'shrink-0 transition-transform duration-200',
        label: 'truncate'
      },
      variants: {
        variant: {
          ghost: {
            base: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
          },
          outline: {
            base: 'ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'
          },
          solid: {
            base: 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-500'
          }
        }
      }
    }
  },

  // Theme System Configuration
  theme: {
    // Default theme settings
    default: 'system', // 'light' | 'dark' | 'system'
    
    // Theme transition settings
    transitions: {
      enabled: true,
      duration: 250, // milliseconds
      easing: 'ease-in-out'
    },
    
    // Keyboard shortcuts
    shortcuts: {
      enabled: true,
      toggle: 'cmd+shift+t',
      light: 'cmd+shift+l',
      dark: 'cmd+shift+d',
      auto: 'cmd+shift+a'
    },
    
    // Persistence settings
    storage: {
      key: 'nuxt-color-mode',
      type: 'localStorage' // 'localStorage' | 'cookie' | 'none'
    },
    
    // Advanced features
    features: {
      timeBasedScheduling: false, // Enable time-based auto switching
      ambientLightSensor: false,  // Enable ambient light sensor (future)
      perRouteThemes: false       // Enable per-route theme overrides
    }
  }
})