<template>
  <aside 
    :class="[
      'fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-lg',
      'transition-all duration-300 ease-in-out',
      showExpandedContent ? 'w-64' : 'w-16'
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="flex h-full flex-col">
      <!-- Header Section (Fixed) - ORTAK MODÜL -->
      <div class="flex items-center justify-center p-4 border-b border-neutral-200 dark:border-neutral-800">
        <!-- Logo - ORTAK container -->
        <div class="relative w-full h-8 flex items-center">
          <div class="flex items-center w-full h-full">
            <!-- Icon - her zaman var -->
            <div :class="[
              'h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0',
              showExpandedContent ? 'mr-3' : 'mx-auto'
            ]">
              <span class="text-white font-bold text-sm">S</span>
            </div>
            
            <!-- Text - sadece expanded'da -->
            <div v-if="showExpandedContent" class="flex flex-col">
              <span class="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                Sciveto
              </span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400">
                Stock Manager
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Section (Scrollable) -->
      <nav class="flex-1 overflow-y-auto px-2 py-4">
        <!-- COLLAPSED STATE: Sadece iconlar, TAM ORTADA -->
        <div v-if="!showExpandedContent" class="flex flex-col items-center space-y-2">
          <!-- Dashboard -->
          <NuxtLink 
            to="/dashboard" 
            class="relative group"
          >
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-lg',
              isCurrentRoute('/dashboard') 
                ? 'bg-primary text-white' 
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]">
              <UIcon name="i-lucide-home" class="w-5 h-5" />
            </div>
            <div v-if="navigationSections[0].items[0].badge" class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">{{ navigationSections[0].items[0].badge }}</div>
            <UTooltip text="Dashboard" :popper="{ placement: 'right' }">
              <template #default="{ open, close: closeTooltip }">
                <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
              </template>
            </UTooltip>
          </NuxtLink>
          
          <!-- Den Dashboard -->
          <NuxtLink 
            to="/denDashboard" 
            class="relative group"
          >
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-lg',
              isCurrentRoute('/denDashboard') 
                ? 'bg-primary text-white' 
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]">
              <UIcon name="i-lucide-activity" class="w-5 h-5" />
            </div>
            <UTooltip text="Den Dashboard" :popper="{ placement: 'right' }">
              <template #default="{ open, close: closeTooltip }">
                <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
              </template>
            </UTooltip>
          </NuxtLink>
          
          <!-- Projects -->
          <NuxtLink 
            to="/projects" 
            class="relative group"
          >
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-lg',
              isCurrentRoute('/projects') 
                ? 'bg-primary text-white' 
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]">
              <UIcon name="i-lucide-briefcase" class="w-5 h-5" />
            </div>
            <UTooltip text="Projects" :popper="{ placement: 'right' }">
              <template #default="{ open, close: closeTooltip }">
                <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
              </template>
            </UTooltip>
          </NuxtLink>
          
          <!-- Stock Items -->
          <NuxtLink 
            to="/stock-items" 
            class="relative group"
          >
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-lg',
              isCurrentRoute('/stock-items') 
                ? 'bg-primary text-white' 
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]">
              <UIcon name="i-lucide-package" class="w-5 h-5" />
            </div>
            <div v-if="navigationSections[0].items[3]?.children?.find(child => child.badge)" class="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">{{ navigationSections[0].items[3]?.children?.find(child => child.badge)?.badge }}</div>
            <UTooltip text="Stock Items" :popper="{ placement: 'right' }">
              <template #default="{ open, close: closeTooltip }">
                <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
              </template>
            </UTooltip>
          </NuxtLink>
          
          <!-- Divider -->
          <div class="w-6 h-px bg-neutral-300 dark:bg-neutral-600 my-2"></div>
          
          <!-- Showcase -->
          <NuxtLink 
            to="/showcase" 
            class="relative group"
          >
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-lg',
              isCurrentRoute('/showcase') 
                ? 'bg-primary text-white' 
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]">
              <UIcon name="i-lucide-eye" class="w-5 h-5" />
            </div>
            <UTooltip text="Showcase" :popper="{ placement: 'right' }">
              <template #default="{ open, close: closeTooltip }">
                <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
              </template>
            </UTooltip>
          </NuxtLink>
          
          <!-- Test Page -->
          <NuxtLink 
            to="/tst" 
            class="relative group"
          >
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-lg',
              isCurrentRoute('/tst') 
                ? 'bg-primary text-white' 
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]">
              <UIcon name="i-lucide-flask" class="w-5 h-5" />
            </div>
            <UTooltip text="Test Page" :popper="{ placement: 'right' }">
              <template #default="{ open, close: closeTooltip }">
                <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
              </template>
            </UTooltip>
          </NuxtLink>
          
          <!-- Settings -->
          <NuxtLink 
            to="/settings" 
            class="relative group"
          >
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-lg',
              isCurrentRoute('/settings') 
                ? 'bg-primary text-white' 
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]">
              <UIcon name="i-lucide-settings" class="w-5 h-5" />
            </div>
            <UTooltip text="Settings" :popper="{ placement: 'right' }">
              <template #default="{ open, close: closeTooltip }">
                <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
              </template>
            </UTooltip>
          </NuxtLink>
        </div>
        
        <!-- EXPANDED STATE: Tam detay -->
        <div v-else class="space-y-1">
          <!-- Dynamic Sections -->
          <div v-for="section in navigationSections" :key="section.id" class="space-y-1">
            <!-- Section Title - ORTAK MODÜL, sadece görünüm değişiyor -->
            <div class="flex items-center px-3 py-2.5 mb-1 h-10">
              <div class="relative w-full h-8 flex items-center">
                <!-- Her zaman aynı content, sadece layout değişiyor -->
                <div class="flex items-center w-full h-full">
                  <!-- Icon - her zaman var -->
                  <div class="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mr-3"
                       :class="getSectionColorClasses(section.color).bg">
                    <UIcon 
                      :name="section.icon" 
                      :class="[
                        'w-4 h-4',
                        getSectionColorClasses(section.color).text
                      ]" 
                    />
                  </div>
                  
                  <!-- Text - sadece expanded'da görünür -->
                  <p class="text-xs font-semibold text-muted uppercase tracking-wider flex-1">
                    {{ section.label }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Section Items -->
            <template v-for="item in section.items" :key="item.to">
              <!-- Single Level Item - ORTAK MODÜL -->
              <div v-if="!item.children" class="relative">
                <NuxtLink
                  :to="item.to"
                  :class="[
                    'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 relative',
                    isCurrentRoute(item.to)
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-highlighted'
                  ]"
                >
                  <!-- Icon - her zaman var -->
                  <div class="flex items-center justify-center w-5 h-5 shrink-0 mr-3">
                    <UIcon :name="item.icon" class="h-5 w-5" />
                  </div>
                  
                  <!-- Label + Badge - sadece expanded'da -->
                  <div class="flex items-center justify-between flex-1">
                    <span class="truncate">{{ item.label }}</span>
                    <UBadge 
                      v-if="item.badge" 
                      :label="item.badge.toString()" 
                      :color="isCurrentRoute(item.to) ? 'white' : 'primary'" 
                      size="xs" 
                      class="ml-auto"
                    />
                  </div>
                </NuxtLink>
              </div>
              
              <!-- Parent Item with Children - ORTAK MODÜL -->
              <UCollapsible 
                v-else
                :default-open="hasActiveChild(item.children)"
                class="space-y-1"
              >
                <template #trigger="{ open, toggle }">
                  <div
                    @click="toggle"
                    :class="[
                      'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer',
                      hasActiveChild(item.children)
                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted'
                    ]"
                  >
                    <!-- Icon - her zaman var -->
                    <div class="flex items-center justify-center w-5 h-5 shrink-0 mr-3">
                      <UIcon :name="item.icon" class="h-5 w-5" />
                    </div>
                    
                    <!-- Label + Arrow - sadece expanded'da -->
                    <div class="flex items-center justify-between flex-1">
                      <span class="truncate">{{ item.label }}</span>
                      <UIcon 
                        name="i-heroicons-chevron-down" 
                        class="h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400"
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
                        'flex items-center gap-3 px-3 py-2 text-sm rounded-lg',
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
            
            <!-- Add spacing between sections -->
            <div class="pt-6"></div>
          </div>
        </div>
      </nav> 
                    v-if="item.badge" 
                    :label="item.badge.toString()" 
                    :color="isCurrentRoute(item.to) ? 'white' : 'primary'" 
                    size="xs" 
                    class="ml-auto"
                  />
                </div>
              </NuxtLink>
              
              <!-- Tooltip for collapsed state -->
              <UTooltip
                v-if="!showExpandedContent"
                :text="item.label"
                :popper="{ placement: 'right' }"
              >
                <template #default="{ open, close: closeTooltip }">
                  <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
                </template>
              </UTooltip>
            </div>

            <!-- Multi Level Item (Collapsible) - Only show when expanded -->
            <UCollapsible v-else-if="showExpandedContent" class="space-y-1">
              <template #trigger>
                <div
                  :class="[
                    'flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer',
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
                    class="h-4 w-4 ui-open:rotate-180"
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
                      'flex items-center gap-3 px-3 py-2 text-sm rounded-lg',
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
            
            <!-- Collapsed state for parent items with children -->
            <div v-else-if="!showExpandedContent" class="relative">
              <div
                :class="[
                  'group flex items-center justify-center px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer',
                  hasActiveChild(item.children)
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-highlighted'
                ]"
              >
                <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
              </div>
              
              <!-- Tooltip with children -->
              <UTooltip :popper="{ placement: 'right' }">
                <template #default="{ open, close: closeTooltip }">
                  <div class="absolute inset-0 rounded-lg" @mouseenter="open" @mouseleave="closeTooltip"></div>
                </template>
                
                <template #content>
                  <div class="py-2">
                    <div class="font-medium text-sm mb-2">{{ item.label }}</div>
                    <div class="space-y-1">
                      <NuxtLink
                        v-for="child in item.children"
                        :key="child.to"
                        :to="child.to"
                        class="block px-3 py-1 text-sm rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        {{ child.label }}
                      </NuxtLink>
                    </div>
                  </div>
                </template>
              </UTooltip>
            </div>
          </template>
          
          <!-- Add spacing between sections -->
          <div class="pt-6"></div>
        </div>
      </nav>

      <!-- Bottom Section (Fixed) -->
      <div class="border-t border-neutral-200 dark:border-neutral-700 px-2 py-4 space-y-2">
        <!-- Quick Actions - ORTAK MODÜL -->
        <div class="space-y-1">
          <!-- Section Title - ORTAK MODÜL -->
          <div class="flex items-center px-3 py-2.5 mb-1 h-10">
            <div class="relative w-full h-8 flex items-center">
              <div class="flex items-center w-full h-full">
                <!-- Icon - her zaman var -->
                <div :class="[
                  'flex items-center justify-center w-8 h-8 rounded-lg bg-success-100 dark:bg-success-900 shrink-0',
                  showExpandedContent ? 'mr-3' : 'mx-auto'
                ]">
                  <UIcon name="i-lucide-zap" class="w-4 h-4 text-success-600 dark:text-success-400" />
                </div>
                
                <!-- Text - sadece expanded'da -->
                <p 
                  v-if="showExpandedContent"
                  class="text-xs font-semibold text-muted uppercase tracking-wider flex-1"
                >
                  Quick Actions
                </p>
              </div>
            </div>
          </div>
          
          <!-- Quick Actions Layout - ORTAK MODÜL -->
          <div :class="showExpandedContent ? 'space-y-1' : 'space-y-2'">
            <template v-for="action in quickActions" :key="action.id">
              <div class="relative">
                <button
                  @click="action.action"
                  :class="[
                    'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg',
                    showExpandedContent 
                      ? 'justify-start' 
                      : 'justify-center',
                    action.color === 'primary' 
                      ? 'bg-primary text-white hover:bg-primary-600' 
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  ]"
                >
                  <!-- Icon - her zaman var -->
                  <div :class="[
                    'flex items-center justify-center w-5 h-5 shrink-0',
                    showExpandedContent ? 'mr-3' : 'mx-auto'
                  ]">
                    <UIcon :name="action.icon" class="h-5 w-5" />
                  </div>
                  
                  <!-- Label - sadece expanded'da -->
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
        </div>
        
        <!-- User Profile - ORTAK MODÜL -->
        <div class="pt-2">
          <div class="relative">
            <div
              :class="[
                'flex items-center px-3 py-2.5 rounded-lg cursor-pointer',
                'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700',
                showExpandedContent ? 'justify-start' : 'justify-center'
              ]"
              @click="handleUserMenuClick"
            >
              <!-- Avatar - her zaman var -->
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
              
              <!-- User info - sadece expanded'da -->
              <div v-if="showExpandedContent" class="flex-1 min-w-0">
                <p class="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {{ userStore.user?.name || 'User' }}
                </p>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
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
const isMobileOpen = ref(false)

// Computed properties
const showExpandedContent = computed(() => isHovered.value)

// Color mapping helper
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

// Navigation data
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

// Quick actions
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
      // Open search modal
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
  // Handle user menu click
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
/* Custom scrollbar for the navigation */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.dark nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

.dark nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>