// app.config.ts
export default defineAppConfig({
  ui: {
    // Global UI Theme
    primary: 'blue',
    gray: 'slate',
    
    // Toast Component Styling (position App component'te ayarlanır)
    toast: {
      slots: {
        root: 'relative overflow-hidden rounded-lg shadow-lg border backdrop-blur-sm',
        wrapper: 'p-4',
        title: 'text-sm font-semibold',
        description: 'text-sm text-muted-foreground mt-1',
        icon: 'flex-shrink-0',
        avatar: 'flex-shrink-0',
        actions: 'flex gap-2 mt-3',
        progress: 'absolute bottom-0 left-0 right-0 h-1',
        close: 'absolute top-2 right-2'
      },
      variants: {
        color: {
          primary: {
            root: 'bg-white/95 border-primary/20',
            title: 'text-primary-foreground',
            progress: 'bg-primary'
          },
          success: {
            root: 'bg-white/95 border-green-200',
            title: 'text-green-900',
            progress: 'bg-green-500'
          },
          warning: {
            root: 'bg-white/95 border-yellow-200',
            title: 'text-yellow-900',
            progress: 'bg-yellow-500'
          },
          error: {
            root: 'bg-white/95 border-red-200',
            title: 'text-red-900',
            progress: 'bg-red-500'
          },
          info: {
            root: 'bg-white/95 border-blue-200',
            title: 'text-blue-900',
            progress: 'bg-blue-500'
          },
          neutral: {
            root: 'bg-white/95 border-gray-200',
            title: 'text-gray-900',
            progress: 'bg-gray-500'
          }
        }
      },
      defaultVariants: {
        color: 'neutral'
      }
    }
  }
})