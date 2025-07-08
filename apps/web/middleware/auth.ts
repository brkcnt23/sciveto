import { useAuthStore } from "~/stores/auth"

// auth.ts - Protect authenticated routes
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth state on client
  if (process.client && !authStore.isAuthenticated) {
    authStore.initializeAuth()
  }
  
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
