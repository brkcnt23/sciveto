// composables/useDualToast.ts - Optimized with Toast.vue Component
import { createApp, ref, nextTick } from 'vue'
import Toast from '~/components/ui/Toast.vue'

interface ToastOptions {
  title: string
  description?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  timeout?: number
  actions?: ToastAction[]
  closable?: boolean
  position?: 'top' | 'bottom'
  showProgress?: boolean
}

interface ToastAction {
  label: string
  onClick?: () => void
}

interface DualToastConfig {
  successPosition?: 'top' | 'bottom'
  errorPosition?: 'top' | 'bottom'
  warningPosition?: 'top' | 'bottom'
  infoPosition?: 'top' | 'bottom'
  defaultTimeout?: number
}

export const useDualToast = (config: DualToastConfig = {}) => {
  // Default configuration
  const defaultConfig: Required<DualToastConfig> = {
    successPosition: 'bottom',
    errorPosition: 'top',
    warningPosition: 'top',
    infoPosition: 'bottom',
    defaultTimeout: 5000,
    ...config
  }

  // Toast containers map
  const containers = new Map<string, HTMLElement>()

  // Create or get toast container
  const getToastContainer = (position: 'top' | 'bottom'): HTMLElement => {
    const containerId = `toast-container-${position}`
    
    if (containers.has(containerId)) {
      return containers.get(containerId)!
    }

    let container = document.getElementById(containerId)
    
    if (!container) {
      container = document.createElement('div')
      container.id = containerId
      container.className = `fixed z-50 ${
        position === 'top' 
          ? 'top-4 right-4' 
          : 'bottom-4 right-4'
      } space-y-2 pointer-events-none max-w-sm w-full`
      document.body.appendChild(container)
    }
    
    containers.set(containerId, container)
    return container
  }

  // Create toast using Vue component
  const createToast = (options: ToastOptions & { position: 'top' | 'bottom' }) => {
    const container = getToastContainer(options.position)
    
    // Create wrapper div for the toast
    const toastWrapper = document.createElement('div')
    container.appendChild(toastWrapper)

    // Create Vue app with Toast component
    const toastApp = createApp(Toast, {
      ...options,
      onClose: () => {
        // Remove toast from DOM
        toastApp.unmount()
        if (toastWrapper.parentNode) {
          container.removeChild(toastWrapper)
        }
      },
      onAction: (action: ToastAction) => {
        if (action.onClick) {
          action.onClick()
        }
      }
    })

    // Mount the toast
    toastApp.mount(toastWrapper)
    
    return {
      destroy: () => {
        toastApp.unmount()
        if (toastWrapper.parentNode) {
          container.removeChild(toastWrapper)
        }
      }
    }
  }

  // Core methods with positioning
  const success = (title: string, description?: string, options?: Partial<ToastOptions>): void => {
    createToast({
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
    createToast({
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
    createToast({
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
    createToast({
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
    containers.forEach((container) => {
      container.innerHTML = ''
    })
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
          onClick: () => window.location.reload()
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

  // Add method for backward compatibility
  const add = (options: ToastOptions): void => {
    const position = options.position || 
      (options.color === 'error' || options.color === 'warning' ? 'top' : 'bottom')
    
    createToast({
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
          onClick: onConfirm
        },
        {
          label: 'Cancel',
          onClick: () => {} // Just dismiss
        }
      ]
    })
  }

  const loading = (title: string, description?: string): void => {
    info(title, description, {
      icon: 'i-lucide-loader-2',
      timeout: 0, // Don't auto-dismiss loading toasts
      closable: false,
      showProgress: false
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