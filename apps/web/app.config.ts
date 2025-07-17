declare global {
  const defineAppConfig: typeof import('nuxt/app')['defineAppConfig']
}

export default defineAppConfig({
  // Nuxt UI v3 Color System - Fixed for Tailwind v4
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
      external: 'i-lucide-external-link'
    },

    // Sidebar Navigation Theming
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

    // Navigation Item Theming
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
            base: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted',
          },
          active: {
            base: 'bg-primary text-white shadow-sm',
          },
          parentActive: {
            base: 'bg-primary/10 text-primary dark:bg-primary/20',
          }
        },
        size: {
          collapsed: {
            base: 'w-10 h-10 justify-center',
            icon: 'w-5 h-5'
          },
          expanded: {
            base: 'px-3 py-2.5 h-10 justify-start',
            icon: 'w-5 h-5 mr-3'
          },
          child: {
            base: 'px-3 py-2 h-9 justify-start gap-3',
            icon: 'h-1.5 w-1.5 rounded-full bg-current opacity-60'
          }
        }
      },
      defaultVariants: {
        state: 'default',
        size: 'expanded'
      }
    },

    // Quick Action Button Theming
    quickAction: {
      slots: {
        base: 'w-full flex items-center rounded-lg text-sm font-medium transition-colors',
        icon: 'flex items-center justify-center shrink-0',
        label: 'truncate'
      },
      variants: {
        color: {
          primary: {
            base: 'bg-primary text-white hover:bg-primary-600 shadow-sm'
          },
          secondary: {
            base: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }
        },
        size: {
          collapsed: {
            base: 'px-3 py-2.5 h-10 justify-center',
            icon: 'w-5 h-5 mx-auto'
          },
          expanded: {
            base: 'px-3 py-2.5 h-10 justify-start',
            icon: 'w-5 h-5 mr-3'
          }
        }
      },
      defaultVariants: {
        color: 'secondary',
        size: 'expanded'
      }
    },

    // Badge Component Theming
    badge: {
      slots: {
        base: 'inline-flex items-center font-medium rounded-full',
        content: 'text-center leading-none'
      },
      variants: {
        color: {
          primary: {
            base: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
          },
          secondary: {
            base: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200'
          },
          success: {
            base: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
          },
          error: {
            base: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200'
          },
          warning: {
            base: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
          },
          info: {
            base: 'bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-200'
          },
          neutral: {
            base: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
          },
          white: {
            base: 'bg-white text-neutral-900 shadow-sm'
          }
        },
        size: {
          xs: {
            base: 'px-1.5 py-0.5 text-xs',
            content: 'text-xs'
          },
          sm: {
            base: 'px-2 py-0.5 text-xs',
            content: 'text-xs'
          },
          md: {
            base: 'px-2.5 py-0.5 text-sm',
            content: 'text-sm'
          }
        }
      },
      defaultVariants: {
        color: 'neutral',
        size: 'sm'
      }
    },

    // Toast System Enhancement
    toast: {
      slots: {
        root: 'relative overflow-hidden bg-white dark:bg-neutral-900 shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-lg p-4 flex gap-3',
        wrapper: 'flex-1 flex flex-col',
        title: 'text-sm font-semibold text-highlighted',
        description: 'text-sm text-muted mt-1',
        icon: 'flex-shrink-0 w-5 h-5',
        avatar: 'flex-shrink-0',
        actions: 'flex gap-2 mt-3',
        progress: 'absolute inset-x-0 bottom-0 h-1',
        close: 'absolute top-2 right-2'
      },
      variants: {
        color: {
          primary: {
            root: 'border-l-4 border-primary-500',
            icon: 'text-primary-600',
            progress: 'bg-primary-500'
          },
          success: {
            root: 'border-l-4 border-success-500',
            icon: 'text-success-600', 
            progress: 'bg-success-500'
          },
          warning: {
            root: 'border-l-4 border-warning-500',
            icon: 'text-warning-600',
            progress: 'bg-warning-500'
          },
          error: {
            root: 'border-l-4 border-error-500',
            icon: 'text-error-600',
            progress: 'bg-error-500'
          },
          info: {
            root: 'border-l-4 border-info-500',
            icon: 'text-info-600',
            progress: 'bg-info-500'
          },
          neutral: {
            root: 'border-l-4 border-neutral-400',
            icon: 'text-neutral-600',
            progress: 'bg-neutral-500'
          }
        }
      },
      defaultVariants: {
        color: 'neutral'
      }
    },

    // Tooltip Enhancement
    tooltip: {
      slots: {
        base: 'relative inline-flex',
        content: 'z-50 px-3 py-1.5 text-sm text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-md shadow-lg',
        arrow: 'absolute w-2 h-2 bg-inherit transform rotate-45'
      },
      variants: {
        placement: {
          top: { arrow: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2' },
          bottom: { arrow: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2' },
          left: { arrow: 'right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2' },
          right: { arrow: 'left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2' }
        }
      },
      defaultVariants: {
        placement: 'top'
      }
    },

    // Collapsible Enhancement
    collapsible: {
      slots: {
        root: 'space-y-1',
        trigger: 'w-full',
        content: 'overflow-hidden',
        body: 'pt-1'
      },
      variants: {
        variant: {
          default: {},
          sidebar: {
            content: 'ml-8 space-y-1'
          }
        }
      },
      defaultVariants: {
        variant: 'default'
      }
    }
  },

  // Global App Configuration
  app: {
    // Toaster Configuration
    toaster: {
      position: 'top-right',
      duration: 4000,
      expand: true,
      gap: 8,
      offset: 16,
      visibleToasts: 5,
      closeButton: true,
      richColors: false,
      theme: 'light', // 'light' | 'dark' | 'system'
      className: '',
      style: {},
      toastOptions: {
        className: '',
        style: {},
        duration: 4000
      }
    },

    // Tooltip Configuration  
    tooltip: {
      delay: 700,
      offset: 8,
      arrow: true,
      animation: 'fade'
    }
  }
})