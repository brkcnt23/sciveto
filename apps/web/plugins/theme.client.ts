// plugins/theme.client.ts
import { useTheme } from '~/composables/useTheme'
import type { ThemeState } from '~/composables/useTheme'

export default defineNuxtPlugin({
  name: 'theme-manager',
  
  setup() {
    // Only run on client-side
    if (process.server) return

    // Auto-initialize theme system
    const { initialize, state, getSystemPreference, getStoredPreference } = useTheme({
      autoMode: 'system', // Default to system preference
      enableTransitions: true,
      enableKeyboardShortcuts: true,
      persistMode: 'localStorage'
    }, {
      onAfterChange: (theme: 'light' | 'dark') => {
        // Debug logging in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Theme] Changed to ${theme} mode`)
        }
        
        // Emit custom event for other parts of the app
        window.dispatchEvent(new CustomEvent('theme-changed', { 
          detail: { theme, state: state.value } 
        }))
      },
      
      onSystemChange: (isSystemDark: boolean) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Theme] System preference changed to ${isSystemDark ? 'dark' : 'light'}`)
        }
      }
    })

    // Initialize theme system and store cleanup function
    const cleanup = initialize()
    
    // Apply early theme to prevent flash
    const applyEarlyTheme = () => {
      try {
        const stored = getStoredPreference()
        const system = getSystemPreference()
        
        // Determine initial theme
        let initialTheme: 'light' | 'dark'
        
        if (stored === 'light' || stored === 'dark') {
          initialTheme = stored
        } else if (stored === 'auto' || !stored) {
          initialTheme = system
        } else {
          initialTheme = 'light' // fallback
        }
        
        // Apply theme immediately to prevent flash
        const html = document.documentElement
        const body = document.body
        
        // Remove all theme classes first
        html.classList.remove('light', 'dark')
        body.classList.remove('light', 'dark')
        
        // Add theme class
        html.classList.add(initialTheme)
        body.classList.add(initialTheme)
        
        // Set color scheme for better browser integration
        html.style.colorScheme = initialTheme
        body.style.colorScheme = initialTheme
        
        // Force repaint to ensure theme is applied
        html.offsetHeight
        body.offsetHeight
        
        console.log(`[Theme Plugin] Applied early theme: ${initialTheme}`)
        
      } catch (error) {
        console.warn('[Theme] Error applying early theme:', error)
      }
    }
    
    // Apply theme as early as possible
    applyEarlyTheme()
    
    // Global theme utilities
    const themeUtils = {
      getThemeState: () => state.value,
      isCurrentlyDark: () => state.value.current === 'dark',
      isCurrentlyLight: () => state.value.current === 'light',
      isAutoMode: () => state.value.preference === 'auto',
      getSystemPreference,
      getStoredPreference
    }
    
    // Make theme utilities globally available
    if (process.client) {
      (window as any).__nuxt_theme__ = themeUtils
    }
    
    // Handle cleanup when app unmounts
    if (process.client) {
      window.addEventListener('beforeunload', () => {
        cleanup?.()
      })
      
      // Also handle cleanup on navigation
      const nuxtApp = useNuxtApp()
      nuxtApp.hook('app:beforeMount', () => {
        // Store cleanup function for later use
        nuxtApp.payload._themeCleanup = cleanup
      })
    }
    
    // Return void (no return value) to satisfy Nuxt plugin typing
  },
  
  // Ensure this plugin runs before other plugins that might depend on theme
  enforce: 'pre'
})