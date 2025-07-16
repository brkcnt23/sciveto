declare global {
  const defineAppConfig: typeof import('nuxt/app')['defineAppConfig']
}
export default defineAppConfig({
  colors: {
    primary: 'green',
    secondary: 'blue',
    success: 'emerald',
    info: 'blue',
    warning: 'amber',
    error: 'red',
    neutral: 'slate'
  },

  toast: {
    slots: {
      root: 'relative overflow-hidden bg-white dark:bg-neutral-900 shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-lg p-4 flex gap-3',
      wrapper: 'flex-1 flex flex-col',
      title: 'text-sm font-semibold text-neutral-900 dark:text-white',
      description: 'text-sm text-neutral-600 dark:text-neutral-400 mt-1',
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
  }
})