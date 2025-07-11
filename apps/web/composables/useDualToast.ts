// composables/useDualToast.ts
export const useDualToast = () => {
  const toast = useToast()

  const showToast = (options: {
    title: string
    description?: string
    type?: 'success' | 'error' | 'warning' | 'info' | 'neutral'
    icon?: string
    color?: 'success' | 'error' | 'warning' | 'info' | 'neutral'
    duration?: number
    actions?: any[]
    avatar?: any
    progress?: any
    variant?: string
    size?: 'sm' | 'md' | 'lg'
    persistent?: boolean
    position?: 'auto' | 'top' | 'bottom'
  }) => {
    // Determine type (priority: type > color > default)
    const toastType = options.type || options.color || 'info'
    
    // Smart routing logic
    const isAlert = toastType === 'error' || toastType === 'warning'
    const isNotification = toastType === 'success' || toastType === 'info' || toastType === 'neutral'
    
    // Override position if specified
    let shouldUseTop = isAlert
    let shouldUseBottom = isNotification
    
    if (options.position === 'top') {
      shouldUseTop = true
      shouldUseBottom = false
    } else if (options.position === 'bottom') {
      shouldUseTop = false
      shouldUseBottom = true
    }

    // Smart duration
    const smartDuration = options.duration ?? (
      options.persistent ? 0 : (isAlert ? 7000 : 4000)
    )

    // Default icons based on type
    const defaultIcons = {
      success: 'i-lucide-check-circle',
      error: 'i-lucide-x-circle', 
      warning: 'i-lucide-alert-triangle',
      info: 'i-lucide-info',
      neutral: 'i-lucide-bell'
    }

    const toastData = {
      title: options.title,
      description: options.description,
      icon: options.icon ?? defaultIcons[toastType],
      color: toastType,
      duration: smartDuration,
      actions: options.actions,
      avatar: options.avatar,
      progress: options.progress,
      id: `${toastType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      // Add positioning hints for styling
      'data-position': shouldUseTop ? 'top' : 'bottom',
      'data-type': toastType
    }

    // Add to appropriate toaster
    toast.add(toastData)
    
    return toastData.id
  }

  // Convenience methods with automatic routing
  const success = (title: string, description?: string, options?: any) => {
    return showToast({
      title,
      description,
      type: 'success',
      ...options
    })
  }

  const error = (title: string, description?: string, options?: any) => {
    return showToast({
      title,
      description,
      type: 'error',
      ...options
    })
  }

  const warning = (title: string, description?: string, options?: any) => {
    return showToast({
      title,
      description,
      type: 'warning',
      ...options
    })
  }

  const info = (title: string, description?: string, options?: any) => {
    return showToast({
      title,
      description,
      type: 'info',
      ...options
    })
  }

  const neutral = (title: string, description?: string, options?: any) => {
    return showToast({
      title,
      description,
      type: 'neutral',
      ...options
    })
  }

  // Quick actions for common scenarios
  const projectUpdate = (projectName: string, progress: number) => {
    return success(
      'Project Updated',
      `${projectName} progress updated to ${progress}%`,
      { 
        icon: 'i-lucide-trending-up',
        variant: 'success'
      }
    )
  }

  const taskCompleted = (taskName: string) => {
    return success(
      'Task Completed',
      `${taskName} has been completed successfully`,
      { icon: 'i-lucide-check-circle-2' }
    )
  }

  const serverError = (message?: string) => {
    return error(
      'Server Error',
      message ?? 'Unable to connect to server. Please try again.',
      { 
        icon: 'i-lucide-server-crash',
        actions: [{
          label: 'Retry',
          color: 'error',
          variant: 'outline',
          onClick: () => {
            success('Retrying...', 'Attempting to reconnect to server')
          }
        }]
      }
    )
  }

  const maintenanceWarning = (timeRemaining: string) => {
    return warning(
      'Maintenance Mode',
      `System will be under maintenance ${timeRemaining}`,
      { 
        icon: 'i-lucide-wrench',
        duration: 10000, // Longer for important warnings
        persistent: false
      }
    )
  }

  const dataSaved = (entityName = 'Data') => {
    return success(
      'Saved Successfully',
      `${entityName} has been saved successfully`,
      { 
        icon: 'i-lucide-save',
        size: 'sm',
        duration: 3000
      }
    )
  }

  const itemDeleted = (itemName: string) => {
    return success(
      'Item Deleted',
      `${itemName} has been permanently deleted`,
      { 
        icon: 'i-lucide-trash-2',
        variant: 'destructive'
      }
    )
  }

  const userInvited = (email: string) => {
    return info(
      'Invitation Sent',
      `Team invitation sent to ${email}`,
      { 
        icon: 'i-lucide-mail',
        avatar: { fallback: email.charAt(0).toUpperCase() }
      }
    )
  }

  const networkError = () => {
    return error(
      'Network Error',
      'Please check your internet connection and try again',
      {
        icon: 'i-lucide-wifi-off',
        actions: [{
          label: 'Retry',
          onClick: () => window.location.reload()
        }]
      }
    )
  }

  const permissionDenied = (action: string) => {
    return warning(
      'Permission Denied',
      `You don't have permission to ${action}`,
      {
        icon: 'i-lucide-shield-x',
        duration: 6000
      }
    )
  }

  return {
    // Core methods
    showToast,
    success,
    error,
    warning,
    info,
    neutral,
    
    // Quick actions - Project related
    projectUpdate,
    taskCompleted,
    dataSaved,
    itemDeleted,
    
    // Quick actions - User related  
    userInvited,
    
    // Quick actions - System related
    serverError,
    maintenanceWarning,
    networkError,
    permissionDenied
  }
}