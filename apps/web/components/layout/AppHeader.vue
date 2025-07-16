<template>
  <header class="sticky top-0 z-50 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 border-b border-neutral-200/50 dark:border-neutral-800/50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        
        <!-- Left: Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Mobile menu button -->
          <UButton 
            variant="ghost" 
            size="sm" 
            icon="i-lucide-menu" 
            class="lg:hidden hover:bg-neutral-100 dark:hover:bg-neutral-800" 
            @click="$emit('toggleSidebar')" 
          />

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300">
              <UIcon name="i-lucide-zap" class="h-5 w-5 text-white" />
            </div>
            <div class="hidden sm:block">
              <span class="font-bold text-lg bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                {{ props.appName }}
              </span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-1">
            <template v-for="item in props.navigation" :key="item.to">
              <UButton
                :to="item.to"
                :variant="isCurrentRoute(item.to) ? 'soft' : 'ghost'"
                :color="isCurrentRoute(item.to) ? 'primary' : 'neutral'"
                size="sm"
                class="relative group"
              >
                <UIcon :name="item.icon" class="w-4 h-4 mr-2" />
                {{ item.label }}
                
                <!-- Active indicator -->
                <div
                  v-if="isCurrentRoute(item.to)"
                  class="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                ></div>
              </UButton>
            </template>
          </nav>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center space-x-2">
          
          <!-- Search -->
          <div class="hidden sm:block">
            <UButton
              variant="outline"
              size="sm"
              class="w-64 justify-start text-muted hover:bg-neutral-50 dark:hover:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 group"
              @click="$emit('openSearch')"
            >
              <UIcon name="i-lucide-search" class="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary transition-colors" />
              <span class="text-neutral-500 dark:text-neutral-400">Search anything...</span>
              <div class="ml-auto flex items-center space-x-1">
                <kbd class="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
                  ⌘K
                </kbd>
              </div>
            </UButton>
          </div>

          <!-- Mobile Search -->
          <UButton 
            variant="ghost" 
            size="sm" 
            icon="i-lucide-search" 
            class="sm:hidden hover:bg-neutral-100 dark:hover:bg-neutral-800" 
            @click="$emit('openSearch')" 
          />

          <!-- Actions Group -->
          <div class="flex items-center space-x-1 border-l border-neutral-200 dark:border-neutral-700 pl-3 ml-1">
            
            <!-- Theme Toggle -->
            <UButton 
              variant="ghost" 
              size="sm" 
              class="relative group hover:bg-neutral-100 dark:hover:bg-neutral-800"
              @click="toggleColorMode"
            >
              <UIcon 
                :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" 
                class="w-4 h-4 transition-transform group-hover:scale-110" 
              />
              <div class="absolute inset-0 rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </UButton>

            <!-- Notifications -->
            <UButton 
              variant="ghost" 
              size="sm" 
              class="relative group hover:bg-neutral-100 dark:hover:bg-neutral-800"
              @click="$emit('toggleNotifications')"
            >
              <UIcon name="i-lucide-bell" class="w-4 h-4 transition-transform group-hover:scale-110" />
              
              <!-- Notification Badge -->
              <div
                v-if="props.notificationCount > 0"
                class="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-error to-red-600 flex items-center justify-center shadow-lg"
              >
                <span class="text-[10px] font-bold text-white">
                  {{ props.notificationCount > 99 ? '99+' : props.notificationCount }}
                </span>
              </div>
              
              <!-- Notification Pulse -->
              <div
                v-if="props.notificationCount > 0"
                class="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-error animate-ping opacity-30"
              ></div>
              
              <div class="absolute inset-0 rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </UButton>

            <!-- Quick Actions -->
            <UButton 
              variant="ghost" 
              size="sm" 
              icon="i-lucide-plus" 
              class="relative group hover:bg-neutral-100 dark:hover:bg-neutral-800"
              @click="openQuickActions"
            >
              <div class="absolute inset-0 rounded-md bg-gradient-to-r from-success/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </UButton>
          </div>

          <!-- User Menu -->
          <UDropdownMenu v-if="props.user" placement="bottom-end">
            <UButton variant="ghost" size="sm" class="p-1 ml-3 group">
              <div class="relative">
                <!-- Avatar -->
                <div class="h-8 w-8 rounded-full bg-gradient-to-br from-primary via-secondary to-success p-0.5 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                  <div class="h-full w-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                    <span class="text-xs font-semibold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                      {{ props.user.name?.charAt(0) || 'U' }}
                    </span>
                  </div>
                </div>
                
                <!-- Online Status -->
                <div class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-white dark:border-neutral-900 shadow-sm"></div>
              </div>
            </UButton>

            <template #items>
              <div class="w-64 p-2">
                <!-- User Info Header -->
                <div class="px-3 py-4 border-b border-neutral-100 dark:border-neutral-800">
                  <div class="flex items-center space-x-3">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                      <div class="h-full w-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                        <span class="text-sm font-semibold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                          {{ props.user.name?.charAt(0) || 'U' }}
                        </span>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-highlighted truncate">
                        {{ props.user.name }}
                      </p>
                      <p class="text-xs text-muted truncate">
                        {{ props.user.email }}
                      </p>
                      <div class="flex items-center mt-1">
                        <div class="h-1.5 w-1.5 rounded-full bg-success mr-1.5"></div>
                        <span class="text-xs text-success font-medium">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="py-2 space-y-1">
                  <UButton
                    variant="ghost"
                    class="w-full justify-start text-sm group"
                    to="/profile"
                  >
                    <UIcon name="i-lucide-user" class="w-4 h-4 mr-3 text-neutral-500 group-hover:text-primary transition-colors" />
                    <span>Profile & Account</span>
                    <UIcon name="i-lucide-arrow-up-right" class="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </UButton>

                  <UButton
                    variant="ghost"
                    class="w-full justify-start text-sm group"
                    to="/settings"
                  >
                    <UIcon name="i-lucide-settings" class="w-4 h-4 mr-3 text-neutral-500 group-hover:text-primary transition-colors" />
                    <span>Settings</span>
                    <UIcon name="i-lucide-arrow-up-right" class="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </UButton>

                  <UButton
                    variant="ghost"
                    class="w-full justify-start text-sm group"
                    to="/billing"
                  >
                    <UIcon name="i-lucide-credit-card" class="w-4 h-4 mr-3 text-neutral-500 group-hover:text-primary transition-colors" />
                    <span>Billing & Usage</span>
                    <div class="ml-auto flex items-center">
                      <UBadge label="Pro" color="success" size="xs" class="mr-1" />
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

// Manual dark mode toggle
const toggleColorMode = () => {
  const html = document.documentElement
  html.classList.toggle('dark')
  localStorage.setItem('nuxt-color-mode', html.classList.contains('dark') ? 'dark' : 'light')
}

const isDark = computed(() => {
  if (process.client) {
    return document.documentElement.classList.contains('dark')
  }
  return false
})

const openQuickActions = () => {
  // Quick actions modal/dropdown
  console.log('Quick actions opened')
}
</script>