// apps/web/middleware/auth.ts
import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth state on client
  if (process.client) {
    authStore.initializeAuth()
    
    // Wait for initialization to complete
    await nextTick()
    
    console.log('Auth middleware - Auth state:', {
      isAuthenticated: authStore.isAuthenticated,
      hasToken: !!authStore.token,
      hasUser: !!authStore.user,
      isInitialized: authStore.isInitialized
    })
  }
  
  if (!authStore.isAuthenticated) {
    console.log('Auth middleware - Redirecting to login, not authenticated')
    return navigateTo('/login')
  }
})