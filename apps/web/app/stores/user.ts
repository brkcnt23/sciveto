import { defineStore } from 'pinia'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  // Getters
  const userInitials = computed(() => {
    if (!user.value?.name) return 'U'
    return user.value.name.charAt(0).toUpperCase()
  })

  // Actions
  const setUser = (userData: User) => {
    user.value = userData
    isAuthenticated.value = true
  }

  const clearUser = () => {
    user.value = null
    isAuthenticated.value = false
  }

  const updateUser = (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }

  // Mock login for development
  const mockLogin = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/default-avatar.png',
      role: 'admin'
    })
  }

  // Initialize with mock data in development
  if (process.dev) {
    mockLogin()
  }

  return {
    user,
    isAuthenticated,
    loading,
    userInitials,
    setUser,
    clearUser,
    updateUser,
    mockLogin
  }
})
