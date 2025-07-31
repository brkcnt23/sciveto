declare module '#app' {
  interface NuxtApp {
    $theme?: {
      state: import('~/composables/useTheme').ThemeState
      toggle: () => Promise<void>
      setTheme: (theme: 'light' | 'dark' | 'auto') => Promise<void>
      getSystemPreference: () => 'light' | 'dark'
      getStoredPreference: () => 'light' | 'dark' | 'auto' | null
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $theme?: {
      state: import('~/composables/useTheme').ThemeState
      toggle: () => Promise<void>
      setTheme: (theme: 'light' | 'dark' | 'auto') => Promise<void>
      getSystemPreference: () => 'light' | 'dark'
      getStoredPreference: () => 'light' | 'dark' | 'auto' | null
    }
  }
}

// Only project-specific types, NO global auto-import declarations
export interface ThemeConfig {
  autoMode: 'system' | 'time' | 'none'
  timeSchedule: {
    lightStart: string
    darkStart: string
  }
  enableKeyboardShortcuts: boolean
  enableTransitions: boolean
  transitionDuration: number
  persistMode: 'localStorage' | 'cookie' | 'none'
}

export interface ThemeState {
  current: 'light' | 'dark'
  preference: 'light' | 'dark' | 'auto'
  isSystemDark: boolean
  isAutoScheduled: boolean
  isTransitioning: boolean
}

export {}