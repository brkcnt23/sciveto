<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Reactive state
const searchQuery = ref('')
const showNotifications = ref(false)
const showMobileMenu = ref(false)

// Mock notifications count
const unreadNotifications = ref(3)

// Navigation items
const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: 'i-heroicons-home' },
  { name: 'Projects', href: '/projects', icon: 'i-heroicons-briefcase' },
  { name: 'Stock Items', href: '/stock-items', icon: 'i-heroicons-cube' },
  { name: 'Categories', href: '/categories', icon: 'i-heroicons-tag' },
  { name: 'Users', href: '/users', icon: 'i-heroicons-users' }
]

// User menu items
const userMenuItems = computed(() => [
  [{
    label: props.user?.email || 'user@example.com',
    slot: 'account',
    disabled: true
  }],
  [{
    label: 'Profile',
    icon: 'i-heroicons-user',
    click: () => router.push('/profile')
  }, {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    click: () => router.push('/settings')
  }],
  [{
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => router.push('/help')
  }],
  [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    click: handleLogout
  }]
])

// Methods
const isActivePath = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // TODO: Implement search functionality
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    // Navigation will be handled by the store
  } catch (error) {
    console.error('Logout error:', error)
    // Force navigation even if logout fails
    await router.push('/login')
  }
}

const markAllAsRead = () => {
  unreadNotifications.value = 0
  showNotifications.value = false
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  showMobileMenu.value = false
})

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    // Close notifications if clicking outside
    if (showNotifications.value && !e.target.closest('.notifications-panel')) {
      showNotifications.value = false
    }
  })
})
</script><!-- apps/web/components/layout/Header.vue -->
<template>
  <header class="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <NuxtLink to="/dashboard" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-building-office" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900">Sciveto</span>
          </NuxtLink>

          <!-- Main Navigation -->
          <nav class="hidden md:flex items-center space-x-1">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.href"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="isActivePath(item.href) 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'"
            >
              <Icon :name="item.icon" class="w-4 h-4 mr-2" />
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Right side items -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden md:block relative">
            <div class="relative">
              <Icon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm w-64"
                @keyup.enter="handleSearch"
              >
            </div>
          </div>

          <!-- Notifications -->
          <UButton
            variant="ghost"
            color="gray"
            size="sm"
            @click="showNotifications = !showNotifications"
            class="relative"
          >
            <Icon name="i-heroicons-bell" class="w-5 h-5" />
            <span
              v-if="unreadNotifications > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ unreadNotifications > 99 ? '99+' : unreadNotifications }}
            </span>
          </UButton>

          <!-- User Menu -->
          <UDropdown 
            :items="userMenuItems" 
            :popper="{ placement: 'bottom-end' }"
            :ui="{ item: { disabled: 'cursor-not-allowed opacity-50' } }"
          >
            <UButton variant="ghost" color="gray" class="flex items-center space-x-2">
              <Avatar :user="user" size="sm" />
              <span class="hidden md:block text-sm font-medium text-gray-700">
                {{ user?.firstName || user?.email || 'User' }}
              </span>
              <Icon name="i-heroicons-chevron-down" class="w-4 h-4 text-gray-400" />
            </UButton>
          </UDropdown>

          <!-- Mobile menu button -->
          <UButton
            variant="ghost"
            color="gray"
            size="sm"
            class="md:hidden"
            @click="showMobileMenu = !showMobileMenu"
          >
            <Icon name="i-heroicons-bars-3" class="w-5 h-5" />
          </UButton>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
        <div class="space-y-1">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="isActivePath(item.href) 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'"
            @click="showMobileMenu = false"
          >
            <Icon :name="item.icon" class="w-4 h-4 mr-3" />
            {{ item.name }}
          </NuxtLink>
        </div>
        
        <!-- Mobile Search -->
        <div class="mt-4 px-3">
          <div class="relative">
            <Icon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="handleSearch"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Panel -->
    <div
      v-if="showNotifications"
      class="absolute top-full right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 notifications-panel"
    >
      <div class="px-4 py-2 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-gray-900">Notifications</h3>
          <UButton
            variant="ghost"
            color="gray"
            size="xs"
            @click="markAllAsRead"
          >
            Mark all as read
          </UButton>
        </div>
      </div>
      
      <div class="max-h-64 overflow-y-auto">
        <!-- Sample notifications -->
        <div class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-900">New project assigned</p>
              <p class="text-xs text-gray-500 mt-1">2 minutes ago</p>
            </div>
          </div>
        </div>
        
        <div class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-900">Stock item updated</p>
              <p class="text-xs text-gray-500 mt-1">1 hour ago</p>
            </div>
          </div>
        </div>
        
        <div class="px-4 py-3 hover:bg-gray-50">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-900">Low stock alert</p>
              <p class="text-xs text-gray-500 mt-1">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="px-4 py-2 border-t border-gray-200">
        <UButton variant="ghost" size="sm" class="w-full justify-center">
          View all notifications
        </UButton>
      </div>
    </div>
  </header>
</template>