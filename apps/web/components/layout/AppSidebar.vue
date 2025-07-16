<template>
  <!-- Backdrop Overlay (Mobile) -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 bg-neutral-900/50 backdrop-blur-sm lg:hidden"
    @click="$emit('close')"
  ></div>

  <!-- Sidebar Container -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Sidebar Content -->
    <div class="flex h-full flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
      
      <!-- Header Section -->
      <div class="flex h-16 shrink-0 items-center justify-between px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center space-x-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <UIcon name="i-lucide-zap" class="h-5 w-5 text-white" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-highlighted">Sciveto</span>
            <span class="text-xs text-muted">Dashboard</span>
          </div>
        </div>
        
        <!-- Close button (Mobile only) -->
        <UButton
          variant="ghost"
          size="sm"
          icon="i-lucide-x"
          class="lg:hidden"
          @click="$emit('close')"
        />
      </div>

      <!-- Navigation Section (Scrollable) -->
      <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        <!-- Main Navigation -->
        <div class="space-y-1">
          <p class="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-3">
            Main
          </p>
          
          <template v-for="item in mainNavigation" :key="item.to">
            <!-- Single Level Item -->
            <NuxtLink
              v-if="!item.children"
              :to="item.to"
              :class="[
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                isCurrentRoute(item.to)
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted'
              ]"
            >
              <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
              <span class="truncate">{{ item.label }}</span>
              <UBadge 
                v-if="item.badge" 
                :label="item.badge.toString()" 
                :color="isCurrentRoute(item.to) ? 'white' : 'primary'" 
                size="xs" 
                class="ml-auto"
              />
            </NuxtLink>

            <!-- Multi Level Item (Collapsible) -->
            <UCollapsible v-else class="space-y-1">
              <template #trigger>
                <div
                  :class="[
                    'flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer',
                    hasActiveChild(item.children)
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
                    <span class="truncate">{{ item.label }}</span>
                  </div>
                  <UIcon
                    name="i-lucide-chevron-down"
                    class="h-4 w-4 transition-transform ui-open:rotate-180"
                  />
                </div>
              </template>

              <template #content>
                <div class="ml-8 space-y-1 pt-1">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.to"
                    :to="child.to"
                    :class="[
                      'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200',
                      isCurrentRoute(child.to)
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted'
                    ]"
                  >
                    <div class="h-1.5 w-1.5 rounded-full bg-current opacity-60"></div>
                    <span class="truncate">{{ child.label }}</span>
                    <UBadge 
                      v-if="child.badge" 
                      :label="child.badge.toString()" 
                      :color="isCurrentRoute(child.to) ? 'white' : 'primary'" 
                      size="xs" 
                      class="ml-auto"
                    />
                  </NuxtLink>
                </div>
              </template>
            </UCollapsible>
          </template>
        </div>

        <!-- Tools Section -->
        <div class="space-y-1 pt-6">
          <p class="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-3">
            Tools
          </p>
          
          <NuxtLink
            v-for="item in toolsNavigation"
            :key="item.to"
            :to="item.to"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isCurrentRoute(item.to)
                ? 'bg-primary text-white shadow-sm'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted'
            ]"
          >
            <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
            <span class="truncate">{{ item.label }}</span>
            <UBadge 
              v-if="item.badge" 
              :label="item.badge.toString()" 
              :color="isCurrentRoute(item.to) ? 'white' : 'success'" 
              size="xs" 
              class="ml-auto"
            />
          </NuxtLink>
        </div>
      </nav>

      <!-- User Section (Fixed Bottom) -->
      <div class="shrink-0 border-t border-neutral-200 dark:border-neutral-800">
        <!-- Quick Actions -->
        <div class="flex items-center justify-center gap-1 p-3 border-b border-neutral-100 dark:border-neutral-800">
          <UButton variant="ghost" size="sm" icon="i-lucide-settings" @click="openSettings" />
          <UButton variant="ghost" size="sm" icon="i-lucide-help-circle" @click="openHelp" />
          <UButton variant="ghost" size="sm" icon="i-lucide-bell" :badge="notificationCount > 0 ? notificationCount.toString() : undefined" />
        </div>

        <!-- User Profile -->
        <UDropdownMenu>
          <div class="flex items-center gap-3 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
            <div class="relative">
              <div class="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span class="text-sm font-semibold text-white">
                  {{ user?.name?.charAt(0) || 'U' }}
                </span>
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-white dark:border-neutral-900"></div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-highlighted truncate">
                {{ user?.name || 'User Name' }}
              </p>
              <p class="text-xs text-muted truncate">
                {{ user?.email || 'user@example.com' }}
              </p>
            </div>
            <UIcon name="i-lucide-chevron-up" class="h-4 w-4 text-muted" />
          </div>

          <template #items>
            <div class="p-2 space-y-1">
              <UButton variant="ghost" class="w-full justify-start text-sm" to="/profile">
                <UIcon name="i-lucide-user" class="h-4 w-4 mr-3" />
                Profile Settings
              </UButton>
              
              <UButton variant="ghost" class="w-full justify-start text-sm" to="/account">
                <UIcon name="i-lucide-credit-card" class="h-4 w-4 mr-3" />
                Billing & Account
              </UButton>
              
              <UButton variant="ghost" class="w-full justify-start text-sm" to="/preferences">
                <UIcon name="i-lucide-palette" class="h-4 w-4 mr-3" />
                Preferences
              </UButton>
              
              <div class="border-t border-neutral-200 dark:border-neutral-700 my-2"></div>
              
              <UButton variant="ghost" class="w-full justify-start text-sm" to="/help">
                <UIcon name="i-lucide-life-buoy" class="h-4 w-4 mr-3" />
                Help & Support
              </UButton>
              
              <UButton variant="ghost" class="w-full justify-start text-sm text-error" @click="$emit('signOut')">
                <UIcon name="i-lucide-log-out" class="h-4 w-4 mr-3" />
                Sign Out
              </UButton>
            </div>
          </template>
        </UDropdownMenu>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface NavigationItem {
  label: string
  to: string
  icon: string
  badge?: number
  children?: NavigationItem[]
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
  isOpen?: boolean
  notificationCount?: number
}>(), {
  navigation: () => [],
  isOpen: false,
  notificationCount: 0
})

// Emits
defineEmits<{
  close: []
  signOut: []
}>()

// Composables
const route = useRoute()

// Navigation Data
const mainNavigation = ref<NavigationItem[]>([
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'i-lucide-layout-dashboard',
    badge: 2
  },
  {
    label: 'Analytics',
    to: '/analytics',
    icon: 'i-lucide-bar-chart-3',
    children: [
      { label: 'Overview', to: '/analytics/overview', icon: 'i-lucide-eye' },
      { label: 'Reports', to: '/analytics/reports', icon: 'i-lucide-file-text', badge: 5 },
      { label: 'Real-time', to: '/analytics/realtime', icon: 'i-lucide-activity' }
    ]
  },
  {
    label: 'Projects',
    to: '/projects',
    icon: 'i-lucide-folder',
    badge: 12
  },
  {
    label: 'Team',
    to: '/team',
    icon: 'i-lucide-users',
    children: [
      { label: 'Members', to: '/team/members', icon: 'i-lucide-user' },
      { label: 'Roles', to: '/team/roles', icon: 'i-lucide-shield' },
      { label: 'Permissions', to: '/team/permissions', icon: 'i-lucide-key' }
    ]
  },
  {
    label: 'Files',
    to: '/files',
    icon: 'i-lucide-folder-open'
  }
])

const toolsNavigation = ref<NavigationItem[]>([
  {
    label: 'Showcase',
    to: '/showcase',
    icon: 'i-lucide-palette',
    badge: 3
  },
  {
    label: 'Documentation',
    to: '/docs',
    icon: 'i-lucide-book-open'
  },
  {
    label: 'API Reference',
    to: '/api',
    icon: 'i-lucide-code'
  }
])

// Methods
const isCurrentRoute = (to: string) => {
  return route.path === to || route.path.startsWith(to + '/')
}

const hasActiveChild = (children: NavigationItem[]) => {
  return children.some(child => isCurrentRoute(child.to))
}

const openSettings = () => {
  navigateTo('/settings')
}

const openHelp = () => {
  navigateTo('/help')
}
</script>