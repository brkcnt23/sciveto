import { defineStore } from 'pinia'
import { navigateTo } from 'nuxt/app'

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: 'USER' | 'MANAGER' | 'ORG_ADMIN' | 'SUPER_ADMIN'
  organizationId: string
  createdAt: string
  updatedAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.user,
    userRole: (state) => state.user?.role,
    userName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
    userEmail: (state) => state.user?.email || ''
  },

  actions: {
    async initializeAuth() {
      this.isLoading = true
      
      try {
        const token = process.client ? localStorage.getItem('auth-token') : null
        
        if (token) {
          this.token = token
          const userData = process.client ? localStorage.getItem('auth-user') : null
          if (userData) {
            this.user = JSON.parse(userData)
            this.isAuthenticated = true
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        this.clearAuth()
      } finally {
        this.isLoading = false
      }
    },

    async login(credentials: { email: string; password: string }) {
      this.isLoading = true
      
      try {
        // Real API login
        const response = await $fetch<{
          user: User;
          access_token: string;
        }>('/auth/login', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'POST',
          body: credentials
        })
        
        if (response && response.access_token && response.user) {
          this.setAuth(response.user, response.access_token)
          return { success: true }
        } else {
          throw new Error('Invalid response from server')
        }
      } catch (error: any) {
        console.error('Login failed:', error)
        return { 
          success: false, 
          error: error.data?.message || error.message || 'Login failed' 
        }
      } finally {
        this.isLoading = false
      }
    },

    // Register fonksiyonu - mevcut register sayfası ile uyumlu
    async register(userData: {
      email: string
      password: string
      firstName: string
      lastName?: string
      organizationName?: string
      marketingEmails?: boolean
    }) {
      this.isLoading = true
      
      try {
        // Mock registration for development
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const mockUser: User = {
          id: 'user_' + Date.now(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName || '',
          role: 'ORG_ADMIN',
          organizationId: userData.organizationName ? 'org_' + Date.now() : 'org_default',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        const mockToken = 'mock_token_' + Date.now()
        this.setAuth(mockUser, mockToken)
        
        // Redirect to dashboard after successful registration
        await navigateTo('/dashboard')
        
        return { success: true }
      } catch (error: any) {
        console.error('Registration failed:', error)
        throw error // Let the component handle the error
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        // Mock logout
        console.log('Logging out...')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearAuth()
        await navigateTo('/login')
      }
    },

    setAuth(user: User, token: string) {
      this.user = user
      this.token = token
      this.isAuthenticated = true
      
      if (process.client) {
        localStorage.setItem('auth-token', token)
        localStorage.setItem('auth-user', JSON.stringify(user))
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      
      if (process.client) {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('auth-user')
      }
    }
  }
})