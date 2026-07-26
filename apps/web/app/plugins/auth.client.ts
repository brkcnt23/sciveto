import { defineNuxtPlugin } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // Initialize auth when the app starts on client side
  if (process.client) {
    authStore.initializeAuth()
  }
})