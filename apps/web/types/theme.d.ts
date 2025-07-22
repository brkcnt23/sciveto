// types/theme.d.ts

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

// Auto-import types for better VSCode support
declare global {
  // Vue composables
  const ref: typeof import('vue')['ref']
  const computed: typeof import('vue')['computed']
  const reactive: typeof import('vue')['reactive']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const onMounted: typeof import('vue')['onMounted']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const nextTick: typeof import('vue')['nextTick']
  const readonly: typeof import('vue')['readonly']
  const shallowRef: typeof import('vue')['shallowRef']
  
  // Nuxt composables
  const useHead: typeof import('#imports')['useHead']
  const useColorMode: typeof import('#imports')['useColorMode']
  const defineNuxtPlugin: typeof import('#imports')['defineNuxtPlugin']
  const navigateTo: typeof import('#imports')['navigateTo']
  const useRoute: typeof import('#imports')['useRoute']
  const useRouter: typeof import('#imports')['useRouter']
  const definePageMeta: typeof import('#imports')['definePageMeta']
  
  // Custom composables
  const useTheme: typeof import('~/composables/useTheme')['useTheme']
}

// Theme configuration types (Legacy - renamed to avoid conflicts with useTheme)
export interface LegacyThemeConfig {
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

// Theme state types (Legacy - renamed to avoid conflicts with useTheme)
export interface LegacyThemeState {
  current: 'light' | 'dark'
  preference: 'light' | 'dark' | 'auto'
  isSystemDark: boolean
  isAutoScheduled: boolean
  isTransitioning: boolean
}

// Theme events types
export interface LegacyThemeEvents {
  onBeforeChange: (newTheme: 'light' | 'dark') => void | Promise<void>
  onAfterChange: (newTheme: 'light' | 'dark') => void
  onSystemChange: (isSystemDark: boolean) => void
}
export interface NuxtThemeUtils {
  getThemeState: () => any
  isCurrentlyDark: () => boolean
  isCurrentlyLight: () => boolean
  isAutoMode: () => boolean
  getSystemPreference: () => 'light' | 'dark'
  getStoredPreference: () => 'light' | 'dark' | 'auto' | undefined
}

// Theme utilities return type
export interface ThemeComposable {
  state: Readonly<Ref<LegacyThemeState>>
  isDark: Readonly<Ref<boolean>>
  isLight: Readonly<Ref<boolean>>
  isAuto: Readonly<Ref<boolean>>
  config: Readonly<Ref<LegacyThemeConfig>>
  toggle: () => Promise<void>
  setTheme: (theme: 'light' | 'dark' | 'auto') => Promise<void>
  initialize: () => (() => void) | undefined
  getSystemPreference: () => 'light' | 'dark'
  getStoredPreference: () => 'light' | 'dark' | 'auto' | null
  updateConfig: (newConfig: Partial<LegacyThemeConfig>) => void
  updateEvents: (newEvents: Partial<LegacyThemeEvents>) => void
  _internal?: {
    systemMediaQuery: Readonly<Ref<MediaQueryList | null>>
    timeScheduleInterval: Readonly<Ref<NodeJS.Timeout | null>>
    isTransitioning: Readonly<Ref<boolean>>
  }
}

// Custom DOM events
export interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: 'light' | 'dark'
    state: ThemeState
  }
}

// Global window types
declare global {
  interface WindowEventMap {
    'theme-changed': ThemeChangeEvent
  }
}

// CSS custom properties for themes
declare module 'csstype' {
  interface Properties {
    // Theme-aware CSS variables
    '--theme-primary'?: string
    '--theme-secondary'?: string
    '--theme-background'?: string
    '--theme-foreground'?: string
    '--theme-muted'?: string
    '--theme-accent'?: string
    '--theme-destructive'?: string
    '--theme-border'?: string
    '--theme-input'?: string
    '--theme-ring'?: string
    '--theme-radius'?: string
  }
}

export {}