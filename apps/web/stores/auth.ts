export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  // Initialize auth state from localStorage on client side
  const initializeAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth_token')
      const savedUser = localStorage.getItem('auth_user')
      
      if (savedToken && savedUser) {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      }
    }
  }

  const setAuth = (authData: { user: any; access_token: string }) => {
    user.value = authData.user
    token.value = authData.access_token
    
    if (process.client) {
      localStorage.setItem('auth_token', authData.access_token)
      localStorage.setItem('auth_user', JSON.stringify(authData.user))
    }
  }

  const clearAuth = () => {
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
      if (!token.value) return null
      
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
      clearAuth()
      throw error
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    initializeAuth,
    login,
    register,
    logout,
    fetchProfile,
    clearAuth
  }
})