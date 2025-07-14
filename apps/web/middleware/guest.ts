import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from "~/stores/auth"

// Middleware for routes that should only be accessible to guests (non-authenticated users)
// e.g., login, register, forgot-password pages
export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const authStore = useAuthStore()
  
  // Initialize auth state on client
  if (process.client) {
    await authStore.initializeAuth()
  }
  
  // If user is already authenticated, redirect to dashboard
  if (authStore.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})