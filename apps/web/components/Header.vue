<template>
  <header class="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <NuxtLink to="/dashboard" class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-building-office" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900">Sciveto</span>
          </NuxtLink>

          <!-- Main Navigation -->
          <nav class="hidden md:flex items-center space-x-1">
            <UButton v-for="item in navigationItems" :key="item.name" :to="item.href" variant="ghost"
              :color="isActivePath(item.href) ? 'primary' : 'gray'" :icon="item.icon">
              {{ item.name }}
            </UButton>
          </nav>
        </div>

        <!-- Right side items -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden md:block">
            <UInput v-model="searchQuery" placeholder="Search..." icon="i-heroicons-magnifying-glass" size="sm"
              @keyup.enter="handleSearch" />
          </div>

          <!-- Notifications -->
          <UButton variant="ghost" color="gray" size="sm" icon="i-heroicons-bell"
            :badge="unreadNotifications > 0 ? unreadNotifications : null"
            @click="showNotifications = !showNotifications" />

          <!-- User Menu -->
          <UDropdown :items="userMenuItems">
            <UButton variant="ghost" color="white" class="flex items-center space-x-2">
              <UAvatar :src="user?.avatar" :alt="user?.name" size="sm"
                class="bg-gradient-to-br from-indigo-380 to-green-500 text-white" />
              <span class="hidden md:block text-sm font-medium">
                {{ user?.firstName || user?.email || 'User' }}
              </span>
              <Icon name="i-heroicons-chevron-down" class="w-4 h-4" />
            </UButton>
          </UDropdown>

          <!-- Mobile menu button -->
          <UButton variant="ghost" color="gray" size="sm" icon="i-heroicons-bars-3" class="md:hidden"
            @click="showMobileMenu = !showMobileMenu" />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
        <div class="space-y-1">
          <UButton v-for="item in navigationItems" :key="item.name" :to="item.href" variant="ghost"
            :color="isActivePath(item.href) ? 'primary' : 'gray'" :icon="item.icon" block justify="start"
            @click="showMobileMenu = false">
            {{ item.name }}
          </UButton>
        </div>

        <!-- Mobile Search -->
        <div class="mt-4">
          <UInput v-model="searchQuery" placeholder="Search..." icon="i-heroicons-magnifying-glass"
            @keyup.enter="handleSearch" />
        </div>
      </div>
    </div>

    <!-- Notifications Panel -->
    <UCard v-if="showNotifications" class="absolute top-full right-4 w-80 max-h-96 overflow-y-auto shadow-lg">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Notifications</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" size="sm"
            @click="showNotifications = false" />
        </div>
      </template>

      <div class="space-y-3">
        <div v-if="notifications.length === 0" class="text-center py-4">
          <p class="text-gray-500">No notifications</p>
        </div>

        <div v-for="notification in notifications" :key="notification.id"
          class="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer" @click="markAsRead(notification.id)">
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <Icon :name="notification.icon" class="w-5 h-5 text-blue-500" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
              <p class="text-sm text-gray-500">{{ notification.message }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showMobileMenu = ref(false)
const showNotifications = ref(false)

// Props
const props = defineProps({
  user: Object,
  notifications: {
    type: Array,
    default: () => []
  }
})

// Navigation items
const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: 'i-heroicons-home' },
  { name: 'Stock Items', href: '/stock-items', icon: 'i-heroicons-cube' },
  { name: 'Categories', href: '/categories', icon: 'i-heroicons-folder' },
  { name: 'Projects', href: '/projects', icon: 'i-heroicons-briefcase' }
]

// User menu items
const userMenuItems = [
  [{ label: 'Profile', icon: 'i-heroicons-user', to: '/profile' }],
  [{ label: 'Settings', icon: 'i-heroicons-cog', to: '/settings' }],
  [{ label: 'Sign out', icon: 'i-heroicons-arrow-right-on-rectangle', click: logout }]
]

// Computed
const unreadNotifications = computed(() => {
  return props.notifications.filter(n => !n.read).length
})

// Methods
const isActivePath = (path) => {
  const route = useRoute()
  return route.path.startsWith(path)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Implement search logic
    console.log('Searching for:', searchQuery.value)
  }
}

const markAsRead = (id) => {
  // Implement mark as read logic
  console.log('Mark as read:', id)
}

function logout() {
  // Implement logout logic
  console.log('Logout')
}
</script>