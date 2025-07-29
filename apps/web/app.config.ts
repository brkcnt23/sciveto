// app.config.ts - Enhanced with Advanced Theme System
declare global {
  const defineAppConfig: typeof import('nuxt/app')['defineAppConfig']
}
// app.config.ts - Unified Color System for Consistent Toast Colors
export default defineAppConfig({
  // Nuxt UI v3 Color System - Unified with Toast Component
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

    // Global Icons Configuration
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

    // UNIFIED TOAST COMPONENT THEME - Matches UI Components
    toast: {
      slots: {
        root: 'group relative overflow-hidden cursor-pointer pointer-events-auto backdrop-blur-xl rounded-2xl shadow-2xl border transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-3xl active:scale-[0.98] min-w-[320px] max-w-sm mx-auto',
        content: 'relative p-4',
        iconWrapper: 'flex-shrink-0 mt-0.5',
        icon: 'w-6 h-6 rounded-full bg-current/10 flex items-center justify-center',
        iconInner: 'w-4 h-4 text-current',
        textWrapper: 'flex-1 min-w-0',
        header: 'flex items-center justify-between',
        title: 'text-sm font-semibold text-current leading-5 tracking-tight',
        closeButton: 'opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 flex-shrink-0 hover:scale-110 transition-transform',
        closeIcon: 'w-4 h-4 text-current/60 hover:text-current',
        description: 'text-sm mt-1.5 text-current/75 leading-relaxed font-medium',
        actions: 'flex gap-2 mt-3',
        actionButton: 'px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 bg-current/8 hover:bg-current/15 active:bg-current/20 text-current border border-current/15 hover:border-current/25 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 backdrop-blur-sm',
        overlay: 'absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl',
        progressContainer: 'absolute bottom-0 left-0 w-full h-1 bg-black/5 dark:bg-white/5 overflow-hidden rounded-b-2xl',
        progressBar: 'h-full bg-gradient-to-r from-current/60 to-current/80 rounded-b-2xl transition-all duration-100 ease-linear'
      },
      variants: {
        color: {
          success: {
            root: 'bg-white/95 dark:bg-slate-800/95 border-2 border-emerald-500/30 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-200 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-400/20'
          },
          error: {
            root: 'bg-white/95 dark:bg-slate-800/95 border-2 border-red-500/30 dark:border-red-400/40 text-red-800 dark:text-red-200 shadow-lg shadow-red-500/10 dark:shadow-red-400/20'
          },
          warning: {
            root: 'bg-white/95 dark:bg-slate-800/95 border-2 border-amber-500/30 dark:border-amber-400/40 text-amber-800 dark:text-amber-200 shadow-lg shadow-amber-500/10 dark:shadow-amber-400/20'
          },
          info: {
            root: 'bg-white/95 dark:bg-slate-800/95 border-2 border-blue-500/30 dark:border-blue-400/40 text-blue-800 dark:text-blue-200 shadow-lg shadow-blue-500/10 dark:shadow-blue-400/20'
          },
          primary: {
            root: 'bg-white/95 dark:bg-slate-800/95 border-2 border-green-500/30 dark:border-green-400/40 text-green-800 dark:text-green-200 shadow-lg shadow-green-500/10 dark:shadow-green-400/20'
          },
          neutral: {
            root: 'bg-white/95 dark:bg-slate-800/95 border-2 border-slate-300/40 dark:border-slate-600/40 text-slate-800 dark:text-slate-200 shadow-lg shadow-slate-500/5 dark:shadow-slate-400/10'
          }
        }
      },
      defaultVariants: {
        color: 'neutral'
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
            base: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
          },
          active: {
            base: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50'
          }
        }
      }
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

    // Enhanced Form Input Theming
    input: {
      slots: {
        base: 'block w-full border-0 bg-transparent py-1.5 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-0 sm:text-sm sm:leading-6',
        wrapper: 'relative rounded-md shadow-sm bg-white dark:bg-neutral-800 ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 focus-within:ring-2 focus-within:ring-primary-500 dark:focus-within:ring-primary-400'
      },
      variants: {
        size: {
          sm: {
            base: 'px-2.5 py-1.5 text-sm',
            wrapper: 'text-sm'
          },
          md: {
            base: 'px-3 py-1.5',
            wrapper: 'text-sm'
          },
          lg: {
            base: 'px-3 py-2',
            wrapper: 'text-base'
          }
        },
        variant: {
          outline: {
            wrapper: 'border border-neutral-500 text-sm px-3 py-1.5 shadow-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md transition-colors'
          }
        }
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