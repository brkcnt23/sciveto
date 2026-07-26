// plugins/theme.client.ts
export default defineNuxtPlugin({
  name: 'theme-manager',
  
  setup() {
    // Only run on client-side
    if (process.server) return

    // Use Nuxt's built-in color mode instead of custom useTheme
    const colorMode = useColorMode()
    
    // Initialize color mode
    onMounted(() => {
      // Ensure color mode is properly initialized
      if (!colorMode.value) {
        colorMode.preference = 'system'
      }
    })

    return {
      provide: {
        theme: {
          mode: colorMode,
          setTheme: (theme: 'light' | 'dark' | 'system') => {
            colorMode.preference = theme
          },
          toggle: () => {
            colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
          }
        }
      }
    }
  }
})