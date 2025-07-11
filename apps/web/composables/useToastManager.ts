// composables/useToastManager.ts
import { ref } from 'vue'

interface ToastOptions {
  title: string
  description?: string
  type?: 'success' | 'error' | 'warning' | 'info' | 'neutral'
  icon?: string
  duration?: number
  actions?: any[]
  avatar?: any
  size?: 'sm' | 'md' | 'lg'
  persistent?: boolean
  position?: 'auto' | 'top' | 'bottom'
}

export const useToastManager = () => {
  // Nuxt UI v3 toast instances
  const alertToast = useToast()
  const notificationToast = useToast()
  const TOP_TYPES = ['error', 'danger', 'warning', 'alert']
  const addToast = (options: ToastOptions) => {
    const toastType = options.type || 'info'
    
    // Determine routing: error/warning → top, success/info/neutral → bottom
    let useTopToaster = false
    if (options.position === 'top') {
      useTopToaster = true
    } else if (options.position === 'bottom') {
      useTopToaster = false
    } else {
      // Auto routing based on type
      useTopToaster = toastType === 'error' || toastType === 'warning'
    }
    
    // Default icons for Nuxt UI v3
    const defaultIcons: Record<string, string> = {
      success: 'i-lucide-check-circle',
      error: 'i-lucide-x-circle',
      warning: 'i-lucide-alert-triangle',
      info: 'i-lucide-info',
      neutral: 'i-lucide-bell'
    }
    
    // Smart duration based on type
    const smartDuration = options.duration ?? (
      options.persistent ? 0 : (
        toastType === 'error' || toastType === 'warning' ? 7000 : 4000
      )
    )
    
    // Map our types to Nuxt UI v3 colors
    const colorMap: Record<string, string> = {
      success: 'success',
      error: 'error', 
      warning: 'warning',
      info: 'info',
      neutral: 'neutral'
    }
    
    // Prepare toast payload for Nuxt UI v3
    const toastPayload = {
      title: options.title,
      description: options.description,
      icon: options.icon || defaultIcons[toastType],
      color: colorMap[toastType] as any,
      duration: smartDuration === 0 ? undefined : smartDuration,
      actions: options.actions,
      avatar: options.avatar
    }
    
    // Route to appropriate toaster
    if (useTopToaster) {
      return alertToast.add(toastPayload)
    } else {
      return notificationToast.add(toastPayload)
    }
  }
  
  const removeToast = (id: string) => {
    // Remove from both toasters (Nuxt UI v3 handles this internally)
    alertToast.remove(id)
    notificationToast.remove(id)
  }
  
  // Convenience methods
  const success = (title: string, description?: string, options?: Partial<ToastOptions>) => {
    return addToast({ title, description, type: 'success', ...options })
  }
  
  const error = (title: string, description?: string, options?: Partial<ToastOptions>) => {
    return addToast({ title, description, type: 'error', ...options })
  }
  
  const warning = (title: string, description?: string, options?: Partial<ToastOptions>) => {
    return addToast({ title, description, type: 'warning', ...options })
  }
  
  const info = (title: string, description?: string, options?: Partial<ToastOptions>) => {
    return addToast({ title, description, type: 'info', ...options })
  }
  
  const clear = () => {
    alertToast.clear()
    notificationToast.clear()
  }
  
  return {
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clear,
    // Expose toaster instances for advanced usage
    alertToast,
    notificationToast
  }
}