// composables/useDualToast.ts - Custom Dual Position Toast System
interface ToastOptions {
  title: string
  description?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  timeout?: number
  actions?: any[]
  avatar?: any
  closable?: boolean
  position?: 'top' | 'bottom'
}

interface DualToastConfig {
  successPosition?: 'top' | 'bottom'
  errorPosition?: 'top' | 'bottom'
  warningPosition?: 'top' | 'bottom'
  infoPosition?: 'top' | 'bottom'
  defaultTimeout?: number
}

export const useDualToast = (config: DualToastConfig = {}) => {
  // Use Nuxt UI v3 toast system but with our customizations
  const baseToast = useToast()
  
  // Default configuration
  const defaultConfig: Required<DualToastConfig> = {
    successPosition: 'bottom',
    errorPosition: 'top',
    warningPosition: 'top',
    infoPosition: 'bottom',
    defaultTimeout: 5000,
    ...config
  }

  // Create custom toast containers for different positions
  const createToastContainer = (position: 'top' | 'bottom') => {
    let container = document.getElementById(`toast-container-${position}`)
    
    if (!container) {
      container = document.createElement('div')
      container.id = `toast-container-${position}`
      container.className = `fixed z-50 ${
        position === 'top' 
          ? 'top-6 right-6' 
          : 'bottom-6 right-6'
      } space-y-3 pointer-events-none max-w-sm w-full`
      document.body.appendChild(container)
    }
    
    return container
  }

  // Custom toast creation function
  const createCustomToast = (options: ToastOptions & { position: 'top' | 'bottom' }) => {
    const container = createToastContainer(options.position)
    const timeout = options.timeout || defaultConfig.defaultTimeout
    
    // Create toast element
    const toastEl = document.createElement('div')
    toastEl.className = `
      relative overflow-hidden cursor-pointer
      bg-white dark:bg-gray-900 
      border rounded-xl shadow-xl
      transform transition-all duration-300 hover:scale-105
      pointer-events-auto min-w-[300px] max-w-sm
      ${options.position === 'top' ? 'animate-slide-down' : 'animate-slide-up'}
      ${getColorClasses(options.color || 'neutral')}
    `

    // Create progress bar for timeout
    const progressBar = timeout > 0 ? `
      <div class="absolute bottom-0 left-0 h-1 bg-current opacity-30 animate-progress" 
           style="animation-duration: ${timeout}ms; animation-fill-mode: forwards;"></div>
    ` : ''

    // Create toast content
    toastEl.innerHTML = `
      <div class="p-4">
        <div class="flex items-start space-x-3">
          ${options.icon ? `<i class="${options.icon} w-5 h-5 mt-0.5 flex-shrink-0 text-current"></i>` : ''}
          <div class="flex-1 min-w-0">
            <h5 class="font-semibold text-sm text-current leading-5">${options.title}</h5>
            ${options.description ? `<p class="text-sm mt-1 text-current opacity-80 leading-4">${options.description}</p>` : ''}
            ${options.actions ? createActionButtons(options.actions) : ''}
          </div>
        </div>
      </div>
      ${progressBar}
    `

    // Click to dismiss functionality
    toastEl.addEventListener('click', (e) => {
      e.preventDefault()
      removeToast(toastEl, container, options.position)
    })

    // Add to container
    container.appendChild(toastEl)

    // Auto-remove after timeout
    if (timeout > 0) {
      setTimeout(() => {
        if (toastEl.parentNode) {
          removeToast(toastEl, container, options.position)
        }
      }, timeout)
    }

    return toastEl
  }

  // Helper function to remove toast with animation
  const removeToast = (toastEl: HTMLElement, container: HTMLElement, position: 'top' | 'bottom') => {
    toastEl.style.opacity = '0'
    toastEl.style.transform = position === 'top' ? 'translateY(-100%) scale(0.95)' : 'translateY(100%) scale(0.95)'
    setTimeout(() => {
      if (toastEl.parentNode) {
        container.removeChild(toastEl)
      }
    }, 300)
  }

  // Helper functions
  const getColorClasses = (color: string) => {
    const colors = {
      success: 'border-2 border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100',
      error: 'border-2 border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100',
      warning: 'border-2 border-yellow-500 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100',
      info: 'border-2 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100',
      primary: 'border-2 border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-100',
      neutral: 'border-2 border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100'
    }
    return colors[color as keyof typeof colors] || colors.neutral
  }

  const createActionButtons = (actions: any[]) => {
    return `
      <div class="flex gap-2 mt-3">
        ${actions.map(action => `
          <button 
            class="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200
                   bg-current/10 hover:bg-current/20 text-current
                   border border-current/20 hover:border-current/30"
            onclick="event.stopPropagation(); ${action.click ? action.click.toString() : ''}"
          >
            ${action.label}
          </button>
        `).join('')}
      </div>
    `
  }

  // Core methods with positioning
  const success = (title: string, description?: string, options?: Partial<ToastOptions>): void => {
    createCustomToast({
      title,
      description,
      color: 'success',
      icon: 'i-lucide-check-circle',
      timeout: defaultConfig.defaultTimeout,
      position: defaultConfig.successPosition,
      ...options
    })
  }

  const error = (title: string, description?: string, options?: Partial<ToastOptions>): void => {
    createCustomToast({
      title,
      description,
      color: 'error',
      icon: 'i-lucide-x-circle',
      timeout: defaultConfig.defaultTimeout,
      position: defaultConfig.errorPosition,
      ...options
    })
  }

  const warning = (title: string, description?: string, options?: Partial<ToastOptions>): void => {
    createCustomToast({
      title,
      description,
      color: 'warning',
      icon: 'i-lucide-alert-triangle',
      timeout: defaultConfig.defaultTimeout,
      position: defaultConfig.warningPosition,
      ...options
    })
  }

  const info = (title: string, description?: string, options?: Partial<ToastOptions>): void => {
    createCustomToast({
      title,
      description,
      color: 'info',
      icon: 'i-lucide-info',
      timeout: defaultConfig.defaultTimeout,
      position: defaultConfig.infoPosition,
      ...options
    })
  }

  const clear = (): void => {
    // Clear both containers
    const topContainer = document.getElementById('toast-container-top')
    const bottomContainer = document.getElementById('toast-container-bottom')
    
    if (topContainer) topContainer.innerHTML = ''
    if (bottomContainer) bottomContainer.innerHTML = ''
  }
  
  // Enhanced quick methods with better UX
  const projectUpdate = (projectName: string, progress: number): void => {
    success(
      'Project Updated',
      `${projectName} progress updated to ${progress}%`,
      { icon: 'i-lucide-trending-up' }
    )
  }

  const taskCompleted = (taskName: string): void => {
    success(
      'Task Completed',
      `${taskName} has been completed successfully`,
      { icon: 'i-lucide-check-circle-2' }
    )
  }

  const serverError = (message?: string): void => {
    error(
      'Server Error',
      message || 'Unable to connect to server. Please try again.',
      { 
        icon: 'i-lucide-server-crash',
        timeout: 8000,
        actions: [{
          label: 'Retry',
          click: () => window.location.reload()
        }]
      }
    )
  }

  const dataSaved = (entityName: string = 'Data'): void => {
    success(
      'Saved Successfully',
      `${entityName} has been saved successfully`,
      { icon: 'i-lucide-save' }
    )
  }

  const userInvited = (email: string): void => {
    info(
      'Invitation Sent',
      `Team invitation sent to ${email}`,
      { icon: 'i-lucide-user-plus' }
    )
  }

  const networkError = (): void => {
    error(
      'Network Error',
      'Please check your internet connection and try again',
      { 
        icon: 'i-lucide-wifi-off',
        timeout: 8000
      }
    )
  }

  const permissionDenied = (action: string): void => {
    warning(
      'Permission Denied',
      `You don't have permission to ${action}`,
      { icon: 'i-lucide-shield-x' }
    )
  }

  const maintenanceWarning = (timeRemaining: string): void => {
    warning(
      'Maintenance Mode',
      `System will be under maintenance ${timeRemaining}`,
      { 
        icon: 'i-lucide-wrench',
        timeout: 10000
      }
    )
  }

  // Add method for backward compatibility with enhanced features
  const add = (options: ToastOptions): void => {
    const position = options.position || 
      (options.color === 'error' || options.color === 'warning' ? 'top' : 'bottom')
    
    createCustomToast({
      ...options,
      position
    })
  }

  // Advanced toast methods
  const confirm = (title: string, description: string, onConfirm: () => void): void => {
    warning(title, description, {
      timeout: 0, // Don't auto-dismiss
      actions: [
        {
          label: 'Confirm',
          click: onConfirm
        },
        {
          label: 'Cancel',
          click: () => {} // Just dismiss
        }
      ]
    })
  }

  const loading = (title: string, description?: string): void => {
    info(title, description, {
      icon: 'i-lucide-loader-2',
      timeout: 0, // Don't auto-dismiss loading toasts
      closable: false
    })
  }

  return {
    // Core methods - Enhanced custom positioning
    add,
    success,
    error,
    warning,
    info,
    clear,
    
    // Quick actions - Enhanced with better UX
    projectUpdate,
    taskCompleted,
    dataSaved,
    userInvited,
    serverError,
    networkError,
    permissionDenied,
    maintenanceWarning,
    
    // Advanced methods
    confirm,
    loading,
    
    // Configuration access
    config: defaultConfig
  }
}
