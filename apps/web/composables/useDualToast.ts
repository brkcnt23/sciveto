import { useToastManager } from "./useToastManager"

// composables/useDualToast.ts - TypeScript Fixed Version
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

export const useDualToast = () => {
  const toastManager = useToastManager()
  
  // Re-export methods
  const {
    success,
    error, 
    warning,
    info,
    addToast: showToast,
    clear,
    toasts,
    removeToast
  } = toastManager
  
  // Quick methods with proper types
  const projectUpdate = (projectName: string, progress: number): string => {
    return success(
      'Project Updated',
      `${projectName} progress updated to ${progress}%`
    )
  }

  const taskCompleted = (taskName: string): string => {
    return success(
      'Task Completed',
      `${taskName} has been completed successfully`
    )
  }

  const serverError = (message?: string): string => {
    return error(
      'Server Error',
      message || 'Unable to connect to server. Please try again.'
    )
  }

  const dataSaved = (entityName: string = 'Data'): string => {
    return success(
      'Saved Successfully',
      `${entityName} has been saved successfully`
    )
  }

  const userInvited = (email: string): string => {
    return info(
      'Invitation Sent',
      `Team invitation sent to ${email}`
    )
  }

  const networkError = (): string => {
    return error(
      'Network Error',
      'Please check your internet connection and try again'
    )
  }

  const permissionDenied = (action: string): string => {
    return warning(
      'Permission Denied',
      `You don't have permission to ${action}`
    )
  }

  const maintenanceWarning = (timeRemaining: string): string => {
    return warning(
      'Maintenance Mode',
      `System will be under maintenance ${timeRemaining}`
    )
  }

  return {
    // Core methods
    showToast,
    success,
    error,
    warning,
    info,
    clear,
    toasts,
    
    // Quick actions - properly typed
    projectUpdate,
    taskCompleted,
    dataSaved,
    userInvited,
    serverError,
    networkError,
    permissionDenied,
    maintenanceWarning,
    removeToast
  }
}