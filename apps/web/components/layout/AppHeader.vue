<!-- components/layout/AppHeader.vue - Enhanced with Theme Toggle -->
<template>
  <header class="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left Side: Logo & Toggle Button -->
        <div class="flex items-center gap-4">
          <!-- Mobile Sidebar Toggle -->
          <UButton
            variant="ghost"
            size="sm"
            class="lg:hidden"
            @click="$emit('toggleSidebar')"
            aria-label="Toggle sidebar"
          >
            <UIcon name="i-lucide-menu" class="w-5 h-5" />
          </UButton>
          
          <!-- Logo & App Name -->
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              {{ appName.charAt(0).toUpperCase() }}
            </div>
            <h1 class="text-lg font-semibold text-highlighted hidden sm:block">{{ appName }}</h1>
          </div>
        </div>

        <!-- Center: Navigation (Desktop) -->
        <nav class="hidden lg:flex items-center space-x-1" v-if="navigation.length > 0">
          <UButton
            v-for="item in navigation"
            :key="item.to"
            :variant="isCurrentRoute(item.to) ? 'soft' : 'ghost'"
            :color="isCurrentRoute(item.to) ? 'primary' : 'neutral'"
            size="sm"
            :to="item.to"
            class="transition-colors"
          >
            <UIcon :name="item.icon" class="w-4 h-4 mr-2" />
            {{ item.label }}
          </UButton>
        </nav>

        <!-- Right Side: Actions -->
        <div class="flex items-center gap-2">
          <!-- Search Button -->
          <UButton
            variant="ghost"
            size="sm"
            class="hidden sm:flex"
            @click="$emit('openSearch')"
            aria-label="Open search"
          >
            <UIcon name="i-lucide-search" class="w-5 h-5" />
          </UButton>

          <!-- Theme Toggle - NEW -->
          <ThemeToggle 
            show-options 
            show-shortcuts
            variant="ghost" 
            size="sm"
            @toggle="onThemeToggle"
            @change="onThemeChange"
          />

          <!-- Quick Actions Button -->
          <UButton
            variant="ghost"
            size="sm"
            @click="openQuickActions"
            aria-label="Quick actions"
            class="hidden md:flex"
          >
            <UIcon name="i-lucide-zap" class="w-5 h-5" />
          </UButton>

          <!-- Notifications -->
          <UButton
            variant="ghost"
            size="sm"
            @click="$emit('toggleNotifications')"
            aria-label="Notifications"
            class="relative"
          >
            <UIcon name="i-lucide-bell" class="w-5 h-5" />
            <UBadge
              v-if="notificationCount > 0"
              :label="notificationCount > 99 ? '99+' : notificationCount.toString()"
              color="error"
              size="xs"
              class="absolute -top-1 -right-1 min-w-0 h-4 px-1"
            />
          </UButton>

          <!-- User Menu -->
          <UDropdownMenu v-if="user">
            <UButton variant="ghost" size="sm" class="gap-2">
              <UAvatar
                :src="user.avatar"
                :alt="user.name"
                size="xs"
                :ui="{ background: 'bg-primary-500 dark:bg-primary-400' }"
              >
                {{ user.name?.charAt(0).toUpperCase() }}
              </UAvatar>
              <span class="hidden md:block text-sm font-medium text-highlighted max-w-32 truncate">
                {{ user.name }}
              </span>
              <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-neutral-400 hidden md:block" />
            </UButton>

            <template #panel>
              <div class="p-2 w-56">
                <!-- User Info -->
                <div class="px-3 py-2 border-b border-neutral-200 dark:border-neutral-700 mb-2">
                  <div class="font-medium text-highlighted text-sm">{{ user.name }}</div>
                  <div class="text-xs text-muted">{{ user.email }}</div>
                </div>

                <!-- Menu Items -->
                <div class="space-y-1">
                  <UButton
                    variant="ghost"
                    class="w-full justify-start text-sm group"
                    to="/profile"
                  >
                    <UIcon name="i-lucide-user" class="w-4 h-4 mr-3 text-neutral-500 group-hover:text-primary transition-colors" />
                    <span>Profile Settings</span>
                  </UButton>

                  <UButton
                    variant="ghost"
                    class="w-full justify-start text-sm group"
                    to="/preferences"
                  >
                    <UIcon name="i-lucide-settings" class="w-4 h-4 mr-3 text-neutral-500 group-hover:text-primary transition-colors" />
                    <span>Preferences</span>
                  </UButton>

                  <UButton
                    variant="ghost"
                    class="w-full justify-start text-sm group"
                    @click="openQuickActions"
                  >
                    <UIcon name="i-lucide-command" class="w-4 h-4 mr-3 text-neutral-500 group-hover:text-primary transition-colors" />
                    <span>Quick Actions</span>
                    <div class="ml-auto flex items-center gap-1 text-xs text-muted">
                      <UBadge variant="soft" size="xs" class="mr-1" />
                      <UIcon name="i-lucide-arrow-up-right" class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </UButton>

                  <UButton
                    variant="ghost"
                    class="w-full justify-start text-sm group"
                    to="/help"
                  >
                    <UIcon name="i-lucide-help-circle" class="w-4 h-4 mr-3 text-neutral-500 group-hover:text-primary transition-colors" />
                    <span>Help & Support</span>
                    <UIcon name="i-lucide-arrow-up-right" class="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </UButton>
                </div>

                <!-- Divider -->
                <div class="border-t border-neutral-100 dark:border-neutral-800 my-2"></div>

                <!-- Sign Out -->
                <div class="py-2">
                  <UButton
                    variant="ghost"
                    class="w-full justify-start text-sm text-error hover:bg-error/10 group"
                    @click="$emit('signOut')"
                  >
                    <UIcon name="i-lucide-log-out" class="w-4 h-4 mr-3 group-hover:translate-x-0.5 transition-transform" />
                    <span>Sign Out</span>
                  </UButton>
                </div>
              </div>
            </template>
          </UDropdownMenu>
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

const openQuickActions = () => {
  // Quick actions modal/dropdown
  console.log('Quick actions opened')
}

// Theme event handlers
const onThemeToggle = () => {
  console.log('[AppHeader] Theme toggled')
}

const onThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
  console.log(`[AppHeader] Theme changed to: ${newTheme}`)
}
</script>