// composables/useTheme.ts
import { ref, computed, watch, onMounted, nextTick } from 'vue'

export interface ThemeConfig {
  // Otomatik Ayarlar
  autoMode: 'system' | 'time' | 'none'
  timeSchedule: {
    lightStart: string // "07:00"
    darkStart: string  // "19:00"
  }
  
  // Manuel Kontroller
  enableKeyboardShortcuts: boolean
  enableTransitions: boolean
  transitionDuration: number
  
  // Persistence
  persistMode: 'localStorage' | 'cookie' | 'none'
}

export interface ThemeState {
  current: 'light' | 'dark'
  preference: 'light' | 'dark' | 'auto'
  isSystemDark: boolean
  isAutoScheduled: boolean
  isTransitioning: boolean
}

export interface ThemeEvents {
  onBeforeChange: (newTheme: 'light' | 'dark') => void | Promise<void>
  onAfterChange: (newTheme: 'light' | 'dark') => void
  onSystemChange: (isSystemDark: boolean) => void
}

const DEFAULT_CONFIG: ThemeConfig = {
  autoMode: 'system',
  timeSchedule: {
    lightStart: '07:00',
    darkStart: '19:00'
  },
  enableKeyboardShortcuts: true,
  enableTransitions: true,
  transitionDuration: 300,
  persistMode: 'localStorage'
}

// Global state
const isInitialized = ref(false)
const config = ref<ThemeConfig>(DEFAULT_CONFIG)
const events = ref<Partial<ThemeEvents>>({})

export const useTheme = (userConfig?: Partial<ThemeConfig>, userEvents?: Partial<ThemeEvents>) => {
  // Manual color mode implementation for better compatibility
  const preference = ref<'light' | 'dark' | 'auto'>('auto')
  const value = ref<'light' | 'dark'>('light')
  
  const colorMode = {
    preference,
    value
  }

  // Initialize preference from storage
  if (process.client) {
    try {
      const stored = localStorage.getItem('nuxt-color-mode')
      if (stored === 'light' || stored === 'dark' || stored === 'auto') {
        preference.value = stored
      }
    } catch (error) {
      console.warn('[useTheme] Could not read from localStorage:', error)
    }
  }
  
  // Internal state
  const isTransitioning = ref(false)
  const systemMediaQuery = ref<MediaQueryList | null>(null)
  const timeScheduleInterval = ref<NodeJS.Timeout | null>(null)

  // Merge user config
  if (userConfig) {
    config.value = { ...config.value, ...userConfig }
  }
  
  // Merge user events
  if (userEvents) {
    events.value = { ...events.value, ...userEvents }
  }

  // Computed values
  const state = computed<ThemeState>(() => ({
    current: value.value,
    preference: preference.value,
    isSystemDark: systemMediaQuery.value?.matches ?? false,
    isAutoScheduled: config.value.autoMode === 'time',
    isTransitioning: isTransitioning.value
  }))

  const isDark = computed(() => value.value === 'dark')
  const isLight = computed(() => value.value === 'light')
  const isAuto = computed(() => preference.value === 'auto')

  // Smooth transitions
  const enableTransitions = () => {
    if (!config.value.enableTransitions) return

    const css = `
      *, *::before, *::after {
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke !important;
        transition-duration: ${config.value.transitionDuration}ms !important;
        transition-timing-function: ease-in-out !important;
      }
    `
    
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    
    // Remove transition after change completes
    setTimeout(() => {
      document.head.removeChild(style)
      isTransitioning.value = false
    }, config.value.transitionDuration + 50)
  }

  const disableTransitions = () => {
    const css = `
      *, *::before, *::after {
        transition: none !important;
      }
    `
    
    const style = document.createElement('style')
    style.id = 'disable-transitions'
    style.textContent = css
    document.head.appendChild(style)
    
    requestAnimationFrame(() => {
      const disableStyle = document.getElementById('disable-transitions')
      if (disableStyle) {
        document.head.removeChild(disableStyle)
      }
    })
  }

  // Theme change with events and transitions
  const changeTheme = async (newTheme: 'light' | 'dark' | 'auto') => {
    try {
      const resolvedTheme = newTheme === 'auto' 
        ? (systemMediaQuery.value?.matches ? 'dark' : 'light')
        : newTheme

      // Before change event
      if (events.value.onBeforeChange) {
        await events.value.onBeforeChange(resolvedTheme)
      }

      isTransitioning.value = true
      
      if (config.value.enableTransitions) {
        enableTransitions()
      }

      // Change theme manually
      preference.value = newTheme
      value.value = resolvedTheme
      
      // Apply to DOM with improved class management
      if (process.client) {
        const html = document.documentElement
        const body = document.body
        
        // Remove all theme classes first
        html.classList.remove('light', 'dark')
        body.classList.remove('light', 'dark')
        
        // Add new theme class
        html.classList.add(resolvedTheme)
        body.classList.add(resolvedTheme)
        
        // Set color scheme
        html.style.colorScheme = resolvedTheme
        body.style.colorScheme = resolvedTheme
        
        // Force repaint to ensure theme is applied
        html.offsetHeight
        body.offsetHeight
        
        // Persist preference
        if (config.value.persistMode === 'localStorage') {
          try {
            localStorage.setItem('nuxt-color-mode', newTheme)
          } catch (error) {
            console.warn('[useTheme] Could not persist theme:', error)
          }
        }
      }

      // After change event
      await nextTick()
      if (events.value.onAfterChange) {
        events.value.onAfterChange(resolvedTheme)
      }

    } catch (error) {
      console.error('[useTheme] Error changing theme:', error)
      isTransitioning.value = false
    }
  }

  // Quick toggle
  const toggle = async () => {
    const newTheme = state.value.current === 'dark' ? 'light' : 'dark'
    await changeTheme(newTheme)
  }

  // Set specific theme
  const setTheme = async (theme: 'light' | 'dark' | 'auto') => {
    await changeTheme(theme)
  }

  // System preference detection
  const initSystemDetection = () => {
    if (process.client && window.matchMedia) {
      systemMediaQuery.value = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleSystemChange = (e: MediaQueryListEvent) => {
        if (events.value.onSystemChange) {
          events.value.onSystemChange(e.matches)
        }
        
        // Auto-apply system change if preference is auto
        if (preference.value === 'auto') {
          value.value = e.matches ? 'dark' : 'light'
          
          // Apply to DOM with proper class management
          if (process.client) {
            const html = document.documentElement
            const body = document.body
            
            // Remove all theme classes first
            html.classList.remove('light', 'dark')
            body.classList.remove('light', 'dark')
            
            // Add new theme class
            html.classList.add(value.value)
            body.classList.add(value.value)
            
            // Set color scheme
            html.style.colorScheme = value.value
            body.style.colorScheme = value.value
            
            // Force repaint
            html.offsetHeight
            body.offsetHeight
          }
        }
      }

      systemMediaQuery.value.addEventListener('change', handleSystemChange)
      
      // Initialize current system value
      if (preference.value === 'auto') {
        value.value = systemMediaQuery.value.matches ? 'dark' : 'light'
        
        if (process.client) {
          const html = document.documentElement
          html.classList.remove('light', 'dark')
          html.classList.add(value.value)
          html.style.colorScheme = value.value
        }
      }
      
      return () => {
        systemMediaQuery.value?.removeEventListener('change', handleSystemChange)
      }
    }
  }

  // Time-based scheduling
  const initTimeScheduling = () => {
    if (config.value.autoMode !== 'time') return

    const checkTimeSchedule = () => {
      const now = new Date()
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      
      const { lightStart, darkStart } = config.value.timeSchedule
      
      let shouldBeDark = false
      
      // Handle cases where dark time crosses midnight
      if (darkStart > lightStart) {
        shouldBeDark = currentTime >= darkStart || currentTime < lightStart
      } else {
        shouldBeDark = currentTime >= darkStart && currentTime < lightStart
      }
      
      const targetTheme = shouldBeDark ? 'dark' : 'light'
      
      if (value.value !== targetTheme) {
        value.value = targetTheme
        
        // Apply to DOM
        if (process.client) {
          const html = document.documentElement
          html.classList.remove('light', 'dark')
          html.classList.add(targetTheme)
          html.style.colorScheme = targetTheme
        }
      }
    }

    // Check immediately
    checkTimeSchedule()
    
    // Check every minute
    timeScheduleInterval.value = setInterval(checkTimeSchedule, 60000)
    
    return () => {
      if (timeScheduleInterval.value) {
        clearInterval(timeScheduleInterval.value)
      }
    }
  }

  // Keyboard shortcuts
  const initKeyboardShortcuts = () => {
    if (!config.value.enableKeyboardShortcuts || !process.client) return

    const handleKeydown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + T
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault()
        toggle()
      }
      
      // Ctrl/Cmd + Shift + L (Light)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
        e.preventDefault()
        setTheme('light')
      }
      
      // Ctrl/Cmd + Shift + D (Dark)  
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setTheme('dark')
      }
      
      // Ctrl/Cmd + Shift + A (Auto)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setTheme('auto')
      }
    }

    document.addEventListener('keydown', handleKeydown)
    
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }

  // Initialize everything
  const initialize = () => {
    if (isInitialized.value) return
    
    const cleanupFunctions: (() => void)[] = []
    
    // Initialize based on config
    if (config.value.autoMode === 'system') {
      const cleanup = initSystemDetection()
      if (cleanup) cleanupFunctions.push(cleanup)
    }
    
    if (config.value.autoMode === 'time') {
      const cleanup = initTimeScheduling()
      if (cleanup) cleanupFunctions.push(cleanup)
    }
    
    const keyboardCleanup = initKeyboardShortcuts()
    if (keyboardCleanup) cleanupFunctions.push(keyboardCleanup)
    
    isInitialized.value = true
    
    // Return cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
      isInitialized.value = false
    }
  }

  // Lifecycle
  onMounted(() => {
    initialize()
  })

  // Watch for config changes
  watch(() => config.value.autoMode, (newMode, oldMode) => {
    if (newMode !== oldMode && isInitialized.value) {
      // Re-initialize with new mode
      initialize()
    }
  })

  // Utility methods
  const getSystemPreference = (): 'light' | 'dark' => {
    if (process.client && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  const getStoredPreference = (): 'light' | 'dark' | 'auto' | null => {
    if (!process.client || config.value.persistMode === 'none') return null
    
    if (config.value.persistMode === 'localStorage') {
      try {
        return localStorage.getItem('nuxt-color-mode') as 'light' | 'dark' | 'auto' | null
      } catch (error) {
        return null
      }
    }
    
    if (config.value.persistMode === 'cookie') {
      const cookies = document.cookie.split(';')
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=')
        if (name === 'nuxt-color-mode') {
          return decodeURIComponent(value) as 'light' | 'dark' | 'auto'
        }
      }
    }
    
    return null
  }

  const updateConfig = (newConfig: Partial<ThemeConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  const updateEvents = (newEvents: Partial<ThemeEvents>) => {
    events.value = { ...events.value, ...newEvents }
  }

  return {
    // State
    state: readonly(state),
    isDark: readonly(isDark),
    isLight: readonly(isLight), 
    isAuto: readonly(isAuto),
    config: readonly(config),
    
    // Actions
    toggle,
    setTheme,
    initialize,
    
    // Utilities
    getSystemPreference,
    getStoredPreference,
    updateConfig,
    updateEvents,
    
    // For debugging
    _internal: process.env.NODE_ENV === 'development' ? {
      systemMediaQuery: readonly(systemMediaQuery),
      timeScheduleInterval: readonly(timeScheduleInterval),
      isTransitioning: readonly(isTransitioning)
    } : undefined
  }
}