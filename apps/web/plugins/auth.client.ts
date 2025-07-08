export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // Initialize auth when the app starts on client side
  if (process.client) {
    authStore.initializeAuth()
    
    console.log('Auth plugin - Initialized auth store on client')
  }
})