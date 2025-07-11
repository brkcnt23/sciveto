// composables/useToastManager.ts - TypeScript Fixed Version
import { ref, readonly } from 'vue'

// Toast interface
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

interface Toast extends ToastOptions {
  id: string
  timestamp: number
  type: 'success' | 'error' | 'warning' | 'info' | 'neutral'
}

// Global toast state - kendi sistemimiz
const toastList = ref<Toast[]>([])

export const useToastManager = () => {
  
  const addToast = (options: ToastOptions): string => {
    const toastType = options.type || 'info'
    
    // Default icons
    const defaultIcons: Record<string, string> = {
      success: 'i-lucide-check-circle',
      error: 'i-lucide-x-circle', 
      warning: 'i-lucide-alert-triangle',
      info: 'i-lucide-info',
      neutral: 'i-lucide-bell'
    }
    
    // Smart duration
    const smartDuration = options.duration ?? (
      options.persistent ? 0 : (
        toastType === 'error' || toastType === 'warning' ? 7000 : 4000
      )
    )
    
    // Create toast with unique ID
    const toastId = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const toast: Toast = {
      id: toastId,
      title: options.title,
      description: options.description,
      type: toastType,
      icon: options.icon || defaultIcons[toastType],
      duration: smartDuration,
      actions: options.actions || [],
      avatar: options.avatar,
      size: options.size || 'md',
      persistent: options.persistent || false,
      position: options.position || 'auto',
      timestamp: Date.now()
    }
    
    // Add to our list
    toastList.value.push(toast)
    
    // Auto remove after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(toastId)
      }, toast.duration)
    }
    
    return toastId
  }
  
  const removeToast = (id: string): void => {
    const index = toastList.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toastList.value.splice(index, 1)
    }
  }
  
  // Convenience methods
  const success = (title: string, description?: string, options: Partial<ToastOptions> = {}): string => {
    return addToast({ title, description, type: 'success', ...options })
  }
  
  const error = (title: string, description?: string, options: Partial<ToastOptions> = {}): string => {
    return addToast({ title, description, type: 'error', ...options })
  }
  
  const warning = (title: string, description?: string, options: Partial<ToastOptions> = {}): string => {
    return addToast({ title, description, type: 'warning', ...options })
  }
  
  const info = (title: string, description?: string, options: Partial<ToastOptions> = {}): string => {
    return addToast({ title, description, type: 'info', ...options })
  }
  
  const clear = (): void => {
    toastList.value = []
  }
  
  return {
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clear,
    toasts: toastList // readonly kaldırıyoruz
  }
}