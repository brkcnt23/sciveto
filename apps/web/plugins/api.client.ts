import { defineNuxtPlugin } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()

  // Add auth headers to all API requests
  $fetch.create({
    onRequest({ request, options }) {
      if (process.client && authStore.token) {
        // Only add auth header for API requests
        const url = typeof request === 'string' ? request : request.toString()
        if (url.includes('/api/')) {
          // Type-safe header handling
          if (options.headers instanceof Headers) {
            options.headers.set('Authorization', `Bearer ${authStore.token}`)
          } else {
            // Create new Headers object
            const newHeaders = new Headers()
            
            // Copy existing headers
            if (options.headers && typeof options.headers === 'object') {
              Object.entries(options.headers).forEach(([key, value]) => {
                if (typeof value === 'string') {
                  newHeaders.set(key, value)
                }
              })
            }
            
            // Add authorization header
            newHeaders.set('Authorization', `Bearer ${authStore.token}`)
            options.headers = newHeaders
          }
        }
      }
    },
    onRequestError({ request, options, error }) {
      console.error('Request error:', error)
    },
    onResponseError({ request, response, options }) {
      // Handle 401 errors by redirecting to login
      if (response.status === 401 && process.client) {
        authStore.logout()
        navigateTo('/login')
      }
    }
  })
})
