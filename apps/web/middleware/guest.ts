import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth state on client
  if (process.client) {
    authStore.initializeAuth()
  }
  
  if (authStore.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})