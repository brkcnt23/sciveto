import { defineNuxtRouteMiddleware, navigateTo, createError } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from "~/stores/auth"

// Middleware for admin-only routes
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
  
  // Check if user has admin role
  const userRole = authStore.user?.role
  if (userRole !== 'SUPER_ADMIN' && userRole !== 'ORG_ADMIN') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access Denied: Admin privileges required'
    })
  }
})