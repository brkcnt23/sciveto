// apps/web/composables/useCustomToast.ts
import { ref, nextTick } from 'vue'

interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  autoClose?: boolean
  duration?: number
  action?: {
    text: string
    handler: () => void
  }
}

interface Toast extends ToastOptions {
  id: string
  component?: any
}

const toasts = ref<Toast[]>([])

export const useCustomToast = () => {
  const add = (options: ToastOptions) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    
    const toast: Toast = {
      id,
      type: 'info',
      autoClose: true,
      duration: 5000,
      ...options
    }
    
    toasts.value.push(toast)
    
    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clear = () => {
    toasts.value = []
  }

  // Convenience methods
  const success = (message: string, options?: Partial<ToastOptions>) => {
    return add({ ...options, message, type: 'success' })
  }

  const error = (message: string, options?: Partial<ToastOptions>) => {
    return add({ ...options, message, type: 'error' })
  }

  const warning = (message: string, options?: Partial<ToastOptions>) => {
    return add({ ...options, message, type: 'warning' })
  }

  const info = (message: string, options?: Partial<ToastOptions>) => {
    return add({ ...options, message, type: 'info' })
  }

  // WebSocket simulation
  const simulateWebSocket = () => {
    const messages = [
      { type: 'success', title: 'Project Updated', message: 'Website Redesign progress updated to 75%' },
      { type: 'info', title: 'New Message', message: 'Client sent a new message about requirements' },
      { type: 'warning', title: 'Deadline Approaching', message: 'Mobile App Development due in 3 days' },
      { type: 'error', title: 'Server Error', message: 'Failed to sync data. Retrying...' },
      { type: 'success', title: 'Payment Received', message: '$5,000 payment received from StartupX' }
    ]

    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    
    add({
      type: randomMessage.type as any,
      title: randomMessage.title,
      message: randomMessage.message,
      action: randomMessage.type === 'error' ? {
        text: 'Retry',
        handler: () => {
          console.log('Retrying action...')
          success('Action retried successfully!')
        }
      } : undefined
    })
  }

  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info,
    simulateWebSocket
  }
}