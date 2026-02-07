import { defineStore } from 'pinia'
import { navigateTo } from 'nuxt/app'

// User interface - matches backend response
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  position?: string
  phone?: string
  avatar?: string
  isActive: boolean
  isOnline: boolean
  lastLoginAt?: string
  organizationId: string
  createdAt: string
  updatedAt: string
}

// Organization interface - matches backend response
interface Organization {
  id: string
  code: string        // ORG-001
  name: string        // Compro
  subdomain: string
  plan: string        // BASIC, PROFESSIONAL, ENTERPRISE
  maxUsers: number    // 10
  maxProjects: number // 50
  userCount: number   // 1
  projectCount: number
  employeeCount: number
  status: string      // ACTIVE
}

interface AuthState {
  user: User | null
  org: Organization | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    org: null,
    token: null,
    isAuthenticated: false,
    isLoading: false
  }),

  getters: {
    // User getters
    isLoggedIn: (state) => state.isAuthenticated && !!state.user,
    userRole: (state) => state.user?.role || '',
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName || ''} ${state.user.lastName || ''}`.trim() || 'İsimsiz'
    },
    userEmail: (state) => state.user?.email || '',
    userInitials: (state) => {
      if (!state.user) return 'U'
      const first = state.user.firstName?.charAt(0) || ''
      const last = state.user.lastName?.charAt(0) || ''
      return (first + last).toUpperCase() || 'U'
    },
    
    // Role checks - Support both old (ORG_ADMIN) and new (ORGANIZATION_OWNER) role names
    isSuperAdmin: (state) => state.user?.role === 'ORGANIZATION_OWNER' || state.user?.role === 'ORG_ADMIN',
    isProcurementManager: (state) => state.user?.role === 'PROCUREMENT_MANAGER',
    isAccountant: (state) => state.user?.role === 'ACCOUNTANT',
    isProductionManager: (state) => state.user?.role === 'PRODUCTION_MANAGER',
    isHRManager: (state) => state.user?.role === 'HR_MANAGER',
    isWarehouseSupervisor: (state) => state.user?.role === 'WAREHOUSE_SUPERVISOR',
    isProductionSupervisor: (state) => state.user?.role === 'PRODUCTION_SUPERVISOR',
    
    // Organization getters
    orgName: (state) => state.org?.name || 'Sciveto',
    orgCode: (state) => state.org?.code || 'ORG-000',
    userCount: (state) => state.org?.userCount || 0,
    maxUsers: (state) => state.org?.maxUsers || 10,
    userProgress: (state) => {
      if (!state.org) return 0
      return Math.round((state.org.userCount / state.org.maxUsers) * 100)
    },
    
    // Check if user has specific role
    hasRole: (state) => (role: string) => {
      if (!state.user) return false
      // ORGANIZATION_OWNER and ORG_ADMIN have all permissions
      if (state.user.role === 'ORGANIZATION_OWNER' || state.user.role === 'ORG_ADMIN') return true
      return state.user.role === role
    },
    
    // Check if user has any of the specified roles
    hasAnyRole: (state) => (roles: string[]) => {
      if (!state.user) return false
      // ORGANIZATION_OWNER and ORG_ADMIN have all permissions
      if (state.user.role === 'ORGANIZATION_OWNER' || state.user.role === 'ORG_ADMIN') return true
      return roles.includes(state.user.role)
    }
  },

  actions: {
    // Initialize auth from localStorage
    async initializeAuth() {
      this.isLoading = true
      
      try {
        if (!process.client) return
        
        const token = localStorage.getItem('auth-token')
        const userData = localStorage.getItem('auth-user')
        const orgData = localStorage.getItem('auth-org')
        
        if (token && userData) {
          this.token = token
          this.user = JSON.parse(userData)
          this.org = orgData ? JSON.parse(orgData) : null
          this.isAuthenticated = true
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        this.clearAuth()
      } finally {
        this.isLoading = false
      }
    },

    // Register new organization + owner
    async register(data: {
      organizationName: string
      firstName: string
      lastName: string
      email: string
      password: string
      industry?: string
    }) {
      this.isLoading = true
      
      try {
        const config = useRuntimeConfig()
        
        const response = await $fetch<{
          user: User
          access_token: string
          organization?: Organization
        }>('/auth/register', {
          baseURL: config.public.apiBase,
          method: 'POST',
          body: {
            organizationName: data.organizationName,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            industry: data.industry
          }
        })
        
        if (response && response.access_token && response.user) {
          // Get organization from user's organization relation or separate field
          const org = response.organization || (response.user as any).organization
          
          this.setAuth(response.user, response.access_token, org)
          
          return { 
            success: true, 
            user: response.user,
            organization: org
          }
        } else {
          throw new Error('Sunucudan geçersiz yanıt alındı')
        }
      } catch (error: any) {
        console.error('Registration failed:', error)
        
        // Extract meaningful error message
        const errorMessage = error.data?.message || 
                            error.response?._data?.message ||
                            error.message || 
                            'Kayıt işlemi başarısız oldu'
        
        // Create a proper error with the message
        const err = new Error(errorMessage)
        throw err
      } finally {
        this.isLoading = false
      }
    },

    // Login
    async login(email: string, password: string) {
      this.isLoading = true
      
      try {
        const config = useRuntimeConfig()
        
        const response = await $fetch<{
          user: User
          access_token: string
          organization?: Organization
        }>('/auth/login', {
          baseURL: config.public.apiBase,
          method: 'POST',
          body: { email, password }
        })
        
        if (response && response.access_token && response.user) {
          const org = response.organization || (response.user as any).organization
          
          this.setAuth(response.user, response.access_token, org)
          
          return { success: true }
        } else {
          throw new Error('Sunucudan geçersiz yanıt alındı')
        }
      } catch (error: any) {
        console.error('Login failed:', error)
        
        // Extract meaningful error message
        const errorMessage = error.data?.message || 
                            error.response?._data?.message ||
                            error.message || 
                            'Giriş başarısız oldu'
        
        return { 
          success: false, 
          error: errorMessage
        }
      } finally {
        this.isLoading = false
      }
    },

    // Logout
    async logout() {
      try {
        console.log('Logging out...')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearAuth()
        await navigateTo('/login')
      }
    },

    // Set auth state
    setAuth(user: User, token: string, org?: Organization) {
      this.user = user
      this.token = token
      this.org = org || null
      this.isAuthenticated = true
      
      if (process.client) {
        localStorage.setItem('auth-token', token)
        localStorage.setItem('auth-user', JSON.stringify(user))
        if (org) {
          localStorage.setItem('auth-org', JSON.stringify(org))
        }
      }
    },

    // Clear auth state
    clearAuth() {
      this.user = null
      this.org = null
      this.token = null
      this.isAuthenticated = false
      
      if (process.client) {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('auth-user')
        localStorage.removeItem('auth-org')
      }
    },
    
    // Update organization data (after user count changes etc.)
    updateOrg(org: Partial<Organization>) {
      if (this.org) {
        this.org = { ...this.org, ...org }
        if (process.client) {
          localStorage.setItem('auth-org', JSON.stringify(this.org))
        }
      }
    },
    
    // Update user online status
    setOnlineStatus(isOnline: boolean) {
      if (this.user) {
        this.user.isOnline = isOnline
        if (process.client) {
          localStorage.setItem('auth-user', JSON.stringify(this.user))
        }
      }
    }
  }
})