<template>
  <header class="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left: Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Mobile menu button -->
          <UButton
            variant="ghost"
            size="sm"
            icon="i-lucide-menu"
            class="lg:hidden"
            @click="$emit('toggleSidebar')"
          />
          
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <UIcon name="i-lucide-zap" class="h-8 w-8 text-primary-600" />
            <span class="hidden font-bold text-xl sm:inline-block">
              {{ appName || 'Sciveto' }}
            </span>
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-1">
            <UButton
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              :variant="isCurrentRoute(item.to) ? 'solid' : 'ghost'"
              :color="isCurrentRoute(item.to) ? 'primary' : 'gray'"
              size="sm"
            >
              <UIcon :name="item.icon" class="w-4 h-4 mr-2" />
              {{ item.label }}
            </UButton>
          </nav>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center space-x-3">
          <!-- Search -->
          <div class="hidden sm:block">
            <UButton
              variant="outline"
              size="sm"
              class="w-48 justify-start text-muted-foreground"
              @click="$emit('openSearch')"
            >
              <UIcon name="i-lucide-search" class="w-4 h-4 mr-2" />
              Search...
              <UKbd class="ml-auto">⌘K</UKbd>
            </UButton>
          </div>

          <!-- Mobile Search -->
          <UButton
            variant="ghost"
            size="sm"
            icon="i-lucide-search"
            class="sm:hidden"
            @click="$emit('openSearch')"
          />

          <!-- Notifications -->
          <UButton
            variant="ghost"
            size="sm"
            icon="i-lucide-bell"
            :badge="notificationCount > 0 ? notificationCount.toString() : undefined"
            @click="$emit('toggleNotifications')"
          />

          <!-- Theme Toggle -->
          <UColorModeButton variant="ghost" />

          <!-- User Menu -->
          <UDropdown v-if="user">
            <UAvatar
              :src="user.avatar"
              :alt="user.name"
              size="sm"
              class="cursor-pointer"
            />
            
            <template #items>
              <UDropdownItem
                icon="i-lucide-user"
                label="Profile"
                to="/profile"
              />
              <UDropdownItem
                icon="i-lucide-settings"
                label="Settings"
                to="/settings"
              />
              <UDropdownItem
                icon="i-lucide-help-circle"
                label="Help"
                to="/help"
              />
              <UDropdownItem
                icon="i-lucide-log-out"
                label="Sign out"
                @click="$emit('signOut')"
              />
            </template>
          </UDropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface NavigationItem {
  label: string
  to: string
  icon: string
}

interface User {
  name: string
  email: string
  avatar?: string
}

// Props
const props = withDefaults(defineProps<{
  navigation?: NavigationItem[]
  user?: User
  notificationCount?: number
  appName?: string
}>(), {
  navigation: () => [],
  notificationCount: 0,
  appName: 'Sciveto'
})

// Emits
defineEmits<{
  openSearch: []
  toggleNotifications: []
  toggleSidebar: []
  signOut: []
}>()

// Composables
const route = useRoute()

// Methods
const isCurrentRoute = (to: string) => {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>