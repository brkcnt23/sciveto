import { defineNuxtRouteMiddleware, navigateTo, createError } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const authStore = useAuthStore()
  
  // Initialize auth state on client
  if (process.client) {
    await authStore.initializeAuth()
  }
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    // Store the intended destination in query params
    const redirectPath = to.fullPath
    return navigateTo(`/login?redirect=${encodeURIComponent(redirectPath)}`)
  }
  
  // Check if user has required permissions for protected routes
  if (to.meta?.requiresAuth === false) {
    return
  }
  
  // Check role-based access
  if (to.meta?.requiredRole && authStore.user?.role !== to.meta.requiredRole) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access Denied: Insufficient permissions'
    })
  }
})