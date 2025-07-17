<template>
  <aside 
    :class="[
      'fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900',
      'border-r border-neutral-200 dark:border-neutral-800 shadow-lg',
      'transition-all duration-300 ease-in-out',
      showExpandedContent ? 'w-64' : 'w-16'
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="flex h-full flex-col">
      
      <!-- Header Section - CONSISTENT HEIGHT -->
      <div class="flex items-center justify-center h-16 px-4 border-b border-neutral-200 dark:border-neutral-800">
        <div class="relative w-full h-8 flex items-center">
          <div class="flex items-center w-full h-full">
            <!-- Logo Icon - FIXED SIZE -->
            <div :class="[
              'h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0',
              showExpandedContent ? 'mr-3' : 'mx-auto'
            ]">
              <span class="text-white font-bold text-sm">S</span>
            </div>
            
            <!-- Logo Text - SAME HEIGHT CONTAINER -->
            <div v-if="showExpandedContent" class="flex flex-col h-8 justify-center">
              <span class="font-semibold text-sm text-highlighted leading-none">
                Sciveto
              </span>
              <span class="text-xs text-muted leading-none">
                Stock Manager
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Section - SCROLLABLE -->
      <nav class="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin">
        
        <!-- COLLAPSED STATE: Fixed Heights -->
        <div v-if="!showExpandedContent" class="flex flex-col items-center space-y-2">
          
          <!-- Navigation Items - FIXED HEIGHT: 40px -->
          <template v-for="(section, sectionIndex) in navigationSections" :key="section.id">
            <template v-for="item in section.items" :key="item.to">
              
              <!-- Single Item - 40px HEIGHT -->
              <div v-if="!item.children" class="relative">
                <NuxtLink :to="item.to" class="relative group">
                  <div :class="[
                    'flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
                    isCurrentRoute(item.to) 
                      ? 'bg-primary text-white' 
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  ]">
                    <UIcon :name="item.icon" class="w-5 h-5" />
                  </div>
                  
                  <!-- Badge - ABSOLUTE POSITIONED -->
                  <UBadge 
                    v-if="item.badge" 
                    :label="item.badge.toString()" 
                    color="error" 
                    size="xs" 
                    class="absolute -top-1 -right-1"
                  />
                </NuxtLink>
                
                <!-- Tooltip -->
                <UTooltip :text="item.label" :popper="{ placement: 'right' }">
                  <template #default="{ open, close: closeTooltip }">
                    <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
                  </template>
                </UTooltip>
              </div>
              
              <!-- Parent Item - 40px HEIGHT -->
              <div v-else class="relative">
                <div :class="[
                  'flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors',
                  hasActiveChild(item.children)
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                ]">
                  <UIcon :name="item.icon" class="w-5 h-5" />
                </div>
                
                <!-- Tooltip with Children -->
                <UTooltip :popper="{ placement: 'right' }">
                  <template #default="{ open, close: closeTooltip }">
                    <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
                  </template>
                  
                  <template #content>
                    <div class="py-2 min-w-48">
                      <div class="font-medium text-sm mb-2 text-highlighted">{{ item.label }}</div>
                      <div class="space-y-1">
                        <NuxtLink
                          v-for="child in item.children"
                          :key="child.to"
                          :to="child.to"
                          class="flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted hover:text-highlighted transition-colors"
                        >
                          <div class="h-1.5 w-1.5 rounded-full bg-current opacity-60"></div>
                          <span>{{ child.label }}</span>
                          <UBadge 
                            v-if="child.badge" 
                            :label="child.badge.toString()" 
                            color="error" 
                            size="xs" 
                            class="ml-auto"
                          />
                        </NuxtLink>
                      </div>
                    </div>
                  </template>
                </UTooltip>
              </div>
              
            </template>
            
            <!-- Section Divider -->
            <div v-if="sectionIndex < navigationSections.length - 1" class="w-6 h-px bg-neutral-300 dark:bg-neutral-600 my-2"></div>
          </template>
        </div>
        
        <!-- EXPANDED STATE: Consistent Heights -->
        <div v-else class="space-y-1">
          <template v-for="(section, sectionIndex) in navigationSections" :key="section.id">
            
            <!-- Section Header - FIXED HEIGHT: 32px -->
            <div class="flex items-center px-3 py-2 mb-1 h-8">
              <div class="flex items-center w-full">
                <div :class="[
                  'flex items-center justify-center w-6 h-6 rounded-md shrink-0 mr-3',
                  getSectionColorClasses(section.color).bg
                ]">
                  <UIcon 
                    :name="section.icon" 
                    :class="['w-3 h-3', getSectionColorClasses(section.color).text]" 
                  />
                </div>
                <p class="text-xs font-semibold text-muted uppercase tracking-wider">
                  {{ section.label }}
                </p>
              </div>
            </div>
            
            <!-- Section Items -->
            <template v-for="item in section.items" :key="item.to">
              
              <!-- Single Item - FIXED HEIGHT: 40px -->
              <div v-if="!item.children" class="relative">
                <NuxtLink
                  :to="item.to"
                  :class="[
                    'group flex items-center px-3 py-2.5 h-10 text-sm font-medium rounded-lg transition-colors',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800 relative',
                    isCurrentRoute(item.to)
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-highlighted'
                  ]"
                >
                  <!-- Icon Container - FIXED SIZE -->
                  <div class="flex items-center justify-center w-5 h-5 shrink-0 mr-3">
                    <UIcon :name="item.icon" class="h-5 w-5" />
                  </div>
                  
                  <!-- Label + Badge Container -->
                  <div class="flex items-center justify-between flex-1 min-w-0">
                    <span class="truncate">{{ item.label }}</span>
                    <UBadge 
                      v-if="item.badge" 
                      :label="item.badge.toString()" 
                      :color="isCurrentRoute(item.to) ? 'white' : 'error'" 
                      size="xs" 
                      class="ml-2 shrink-0"
                    />
                  </div>
                </NuxtLink>
              </div>
              
              <!-- Parent Item with Children -->
              <UCollapsible 
                v-else
                :default-open="hasActiveChild(item.children)"
                class="space-y-1"
              >
                <template #trigger="{ open, toggle }">
                  <div
                    @click="toggle"
                    :class="[
                      'group flex items-center px-3 py-2.5 h-10 text-sm font-medium rounded-lg cursor-pointer transition-colors',
                      hasActiveChild(item.children)
                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted'
                    ]"
                  >
                    <!-- Icon Container - FIXED SIZE -->
                    <div class="flex items-center justify-center w-5 h-5 shrink-0 mr-3">
                      <UIcon :name="item.icon" class="h-5 w-5" />
                    </div>
                    
                    <!-- Label + Arrow Container -->
                    <div class="flex items-center justify-between flex-1">
                      <span class="truncate">{{ item.label }}</span>
                      <UIcon 
                        name="i-lucide-chevron-down" 
                        class="h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400 transition-transform"
                        :class="{ 'rotate-180': open }"
                      />
                    </div>
                  </div>
                </template>

                <template #content>
                  <div class="ml-8 space-y-1 pt-1">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.to"
                      :to="child.to"
                      :class="[
                        'flex items-center gap-3 px-3 py-2 h-9 text-sm rounded-lg transition-colors',
                        isCurrentRoute(child.to)
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted'
                      ]"
                    >
                      <div class="h-1.5 w-1.5 rounded-full bg-current opacity-60 shrink-0"></div>
                      <span class="truncate flex-1">{{ child.label }}</span>
                      <UBadge 
                        v-if="child.badge" 
                        :label="child.badge.toString()" 
                        :color="isCurrentRoute(child.to) ? 'white' : 'error'" 
                        size="xs" 
                        class="shrink-0"
                      />
                    </NuxtLink>
                  </div>
                </template>
              </UCollapsible>
              
            </template>
            
            <!-- Section Spacing -->
            <div v-if="sectionIndex < navigationSections.length - 1" class="pt-6"></div>
          </template>
        </div>
      </nav>

      <!-- Quick Actions Section - FIXED HEIGHTS -->
      <div class="border-t border-neutral-200 dark:border-neutral-700 px-2 py-4">
        
        <!-- Quick Actions Header - CONSISTENT HEIGHT -->
        <div class="flex items-center px-3 py-2 mb-2 h-8">
          <div class="flex items-center w-full">
            <div :class="[
              'flex items-center justify-center w-6 h-6 rounded-md bg-success-100 dark:bg-success-900 shrink-0',
              showExpandedContent ? 'mr-3' : 'mx-auto'
            ]">
              <UIcon name="i-lucide-zap" class="w-3 h-3 text-success-600 dark:text-success-400" />
            </div>
            <p 
              v-if="showExpandedContent"
              class="text-xs font-semibold text-muted uppercase tracking-wider"
            >
              Quick Actions
            </p>
          </div>
        </div>
        
        <!-- Quick Actions Buttons - FIXED HEIGHT: 40px -->
        <div :class="showExpandedContent ? 'space-y-1' : 'space-y-2'">
          <template v-for="action in quickActions" :key="action.id">
            <div class="relative">
              <button
                @click="action.action"
                :class="[
                  'w-full flex items-center px-3 py-2.5 h-10 text-sm font-medium rounded-lg transition-colors',
                  showExpandedContent ? 'justify-start' : 'justify-center',
                  action.color === 'primary' 
                    ? 'bg-primary text-white hover:bg-primary-600 shadow-sm' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                ]"
              >
                <!-- Icon Container - FIXED SIZE -->
                <div :class="[
                  'flex items-center justify-center w-5 h-5 shrink-0',
                  showExpandedContent ? 'mr-3' : 'mx-auto'
                ]">
                  <UIcon :name="action.icon" class="h-5 w-5" />
                </div>
                
                <!-- Label -->
                <span v-if="showExpandedContent" class="truncate">{{ action.label }}</span>
              </button>
              
              <!-- Tooltip for collapsed state -->
              <UTooltip
                v-if="!showExpandedContent"
                :text="action.label"
                :popper="{ placement: 'right' }"
              >
                <template #default="{ open, close: closeTooltip }">
                  <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
                </template>
              </UTooltip>
            </div>
          </template>
        </div>
        
        <!-- User Profile - FIXED HEIGHT: 48px -->
        <div class="pt-3">
          <div class="relative">
            <div
              :class="[
                'flex items-center px-3 py-2.5 h-12 rounded-lg cursor-pointer transition-colors',
                'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700',
                showExpandedContent ? 'justify-start' : 'justify-center'
              ]"
              @click="handleUserMenuClick"
            >
              <!-- Avatar Container - FIXED SIZE -->
              <div :class="[
                'flex items-center justify-center shrink-0',
                showExpandedContent ? 'mr-3' : 'mx-auto'
              ]">
                <UAvatar 
                  :src="userStore.user?.avatar || '/default-avatar.png'" 
                  :alt="userStore.user?.name || 'User'"
                  size="sm"
                />
              </div>
              
              <!-- User Info - SAME HEIGHT CONTAINER -->
              <div v-if="showExpandedContent" class="flex-1 min-w-0 h-8 flex flex-col justify-center">
                <p class="text-sm font-medium text-highlighted truncate leading-none">
                  {{ userStore.user?.name || 'User' }}
                </p>
                <p class="text-xs text-muted truncate leading-none mt-1">
                  {{ userStore.user?.email || 'user@example.com' }}
                </p>
              </div>
            </div>
            
            <!-- Tooltip for collapsed state -->
            <UTooltip
              v-if="!showExpandedContent"
              :text="userStore.user?.name || 'User Profile'"
              :popper="{ placement: 'right' }"
            >
              <template #default="{ open, close: closeTooltip }">
                <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
              </template>
            </UTooltip>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

// User store
const userStore = useUserStore()

// Navigation types
interface NavigationItem {
  label: string
  to: string
  icon: string
  badge?: number
  children?: NavigationItem[]
}

interface NavigationSection {
  id: string
  label: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  items: NavigationItem[]
}

interface QuickAction {
  id: string
  label: string
  icon: string
  color: 'primary' | 'secondary'
  action: () => void
}

// Props and emits
const emit = defineEmits<{
  close: []
  signOut: []
  'update:collapsed': [value: boolean]
}>()

// Reactive state
const route = useRoute()
const isHovered = ref(false)

// Computed properties
const showExpandedContent = computed(() => isHovered.value)

// Color mapping helper - Updated for Nuxt UI v3
const getSectionColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    primary: {
      bg: 'bg-primary-100 dark:bg-primary-900',
      text: 'text-primary-600 dark:text-primary-400'
    },
    secondary: {
      bg: 'bg-secondary-100 dark:bg-secondary-900',
      text: 'text-secondary-600 dark:text-secondary-400'
    },
    success: {
      bg: 'bg-success-100 dark:bg-success-900',
      text: 'text-success-600 dark:text-success-400'
    },
    warning: {
      bg: 'bg-warning-100 dark:bg-warning-900',
      text: 'text-warning-600 dark:text-warning-400'
    },
    error: {
      bg: 'bg-error-100 dark:bg-error-900',
      text: 'text-error-600 dark:text-error-400'
    }
  }
  return colorMap[color] || colorMap.primary
}

// Navigation data - Updated with v3 design system
const navigationSections: NavigationSection[] = [
  {
    id: 'main',
    label: 'Main',
    icon: 'i-lucide-layout-grid',
    color: 'primary',
    items: [
      { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home', badge: 3 },
      { label: 'Den Dashboard', to: '/denDashboard', icon: 'i-lucide-activity' },
      { 
        label: 'Projects', 
        to: '/projects', 
        icon: 'i-lucide-briefcase',
        children: [
          { label: 'All Projects', to: '/projects', icon: 'i-lucide-folder' },
          { label: 'My Projects', to: '/projects/my', icon: 'i-lucide-user' },
          { label: 'Shared Projects', to: '/projects/shared', icon: 'i-lucide-users' }
        ]
      },
      { 
        label: 'Stock Items', 
        to: '/stock-items', 
        icon: 'i-lucide-package',
        children: [
          { label: 'All Items', to: '/stock-items', icon: 'i-lucide-list' },
          { label: 'Low Stock', to: '/stock-items/low-stock', icon: 'i-lucide-alert-triangle', badge: 5 },
          { label: 'Categories', to: '/stock-items/categories', icon: 'i-lucide-tag' }
        ]
      }
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'i-lucide-wrench',
    color: 'secondary',
    items: [
      { label: 'Showcase', to: '/showcase', icon: 'i-lucide-eye' },
      { label: 'Test Page', to: '/tst', icon: 'i-lucide-flask' },
      { label: 'Settings', to: '/settings', icon: 'i-lucide-settings' }
    ]
  }
]

// Quick actions - Updated with modern actions
const quickActions: QuickAction[] = [
  {
    id: 'new-project',
    label: 'New Project',
    icon: 'i-lucide-plus',
    color: 'primary',
    action: () => navigateTo('/projects/new')
  },
  {
    id: 'add-stock',
    label: 'Add Stock',
    icon: 'i-lucide-package-plus',
    color: 'secondary',
    action: () => navigateTo('/stock-items/new')
  },
  {
    id: 'quick-search',
    label: 'Quick Search',
    icon: 'i-lucide-search',
    color: 'secondary',
    action: () => {
      // TODO: Open command palette
      console.log('Open search modal')
    }
  }
]

// Methods
const isCurrentRoute = (to: string) => {
  return route.path === to || route.path.startsWith(to + '/')
}

const hasActiveChild = (children: NavigationItem[]) => {
  return children.some(child => isCurrentRoute(child.to))
}

const handleUserMenuClick = () => {
  // TODO: Open user menu
  console.log('User menu clicked')
}

// Mouse events
const onMouseEnter = () => {
  isHovered.value = true
}

const onMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
/* Modern scrollbar - Nuxt UI v3 compatible */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: theme('colors.neutral.300');
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: theme('colors.neutral.400');
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: theme('colors.neutral.600');
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: theme('colors.neutral.500');
}

/* Smooth transitions for all interactive elements */
.transition-colors {
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

/* Ensure consistent heights across all states */
.h-8 { height: 2rem !important; }
.h-9 { height: 2.25rem !important; }
.h-10 { height: 2.5rem !important; }
.h-12 { height: 3rem !important; }
.h-16 { height: 4rem !important; }
</style>