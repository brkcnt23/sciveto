// apps/web/stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isInitialized = ref(false)

  // Initialize auth state from localStorage on client side
  const initializeAuth = () => {
    if (process.client && !isInitialized.value) {
      try {
        const savedToken = localStorage.getItem('auth_token')
        const savedUser = localStorage.getItem('auth_user')
        
        console.log('Initializing auth:', { hasToken: !!savedToken, hasUser: !!savedUser })
        
        if (savedToken && savedUser) {
          token.value = savedToken
          user.value = JSON.parse(savedUser)
          console.log('Auth initialized successfully:', { userId: user.value?.id, tokenLength: token.value?.length })
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        clearAuth()
      } finally {
        isInitialized.value = true
      }
    }
  }

  const setAuth = (authData: { user: any; access_token: string }) => {
    console.log('Setting auth data:', { userId: authData.user?.id, tokenLength: authData.access_token?.length })
    
    user.value = authData.user
    token.value = authData.access_token
    
    if (process.client) {
      localStorage.setItem('auth_token', authData.access_token)
      localStorage.setItem('auth_user', JSON.stringify(authData.user))
    }
  }

  const clearAuth = () => {
    console.log('Clearing auth')
    user.value = null
    token.value = null
    
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const data = await $fetch<{ user: any; access_token: string }>('http://localhost:3001/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      setAuth(data)
      await navigateTo('/dashboard')
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userData: { email: string; password: string }) => {
    try {
      const data = await $fetch<{ user: any; access_token: string }>('http://localhost:3001/api/auth/register', {
        method: 'POST',
        body: userData
      })
      
      setAuth(data)
      await navigateTo('/dashboard')
      return data
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await $fetch('http://localhost:3001/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
      await navigateTo('/login')
    }
  }

  const fetchProfile = async () => {
    try {
      if (!token.value) {
        console.log('No token available for profile fetch')
        return null
      }
      
      console.log('Fetching profile with token:', token.value.substring(0, 10) + '...')
      
      const data = await $fetch<any>('http://localhost:3001/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      
      user.value = data
      if (process.client) {
        localStorage.setItem('auth_user', JSON.stringify(data))
      }
      return data
    } catch (error) {
      console.error('Profile fetch error:', error)
      clearAuth()
      throw error
    }
  }

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    if (!token.value) {
      console.warn('No token available for auth headers')
      return {}
    }
    return {
      Authorization: `Bearer ${token.value}`
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    isInitialized: readonly(isInitialized),
    initializeAuth,
    login,
    register,
    logout,
    fetchProfile,
    clearAuth,
    getAuthHeaders
  }
})