<!-- components/layout/AppSidebar.vue - Enhanced with Theme Toggle -->
<template>
  <aside 
    class="fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-lg transition-width duration-300 ease-in-out flex flex-col"
    :class="[
      (collapsed && !showExpandedContent) ? 'w-16' : 'w-64',
      collapsed && showExpandedContent ? 'shadow-2xl z-60' : ''
    ]"
    style="overflow: hidden;"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Header -->
    <div class="flex items-center h-16 px-4 border-b border-neutral-200 dark:border-neutral-800">
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shrink-0">
          S
        </div>
        <h1 
          class="text-lg font-semibold text-highlighted whitespace-nowrap overflow-hidden text-ellipsis"
        >
          <span v-if="!collapsed || showExpandedContent">Sciveto</span>
        </h1>
      </div>
      
      <!-- Collapse Toggle - Always visible -->
      <UButton
        variant="ghost"
        size="xs"
        class="shrink-0 ml-2"
        @click="$emit('update:collapsed', !collapsed)"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <UIcon 
          :name="collapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'" 
          class="w-4 h-4 transition-transform duration-300"
        />
      </UButton>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
      <div class="px-2 pt-4 pb-0 min-w-0">
        <div v-for="section in navigationSections" :key="section.id" class="mb-6 last:mb-0 min-w-0">
          <SidebarSection :title="section.label" :collapsed="collapsed && !showExpandedContent" />
          <div class="space-y-1 mt-2 min-w-0">
            <SidebarItem
              v-for="item in section.items"
              :key="item.to"
              :item="item"
              :collapsed="collapsed && !showExpandedContent"
              :active="isCurrentRoute(item.to)"
              @click="$router.push(item.to)"
            />
          </div>
        </div>
      </div>
    </nav>

    <!-- Fixed Footer - Always at bottom -->
    <div class="border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 mt-auto">
      <!-- Actions Section (Theme + Quick Actions) -->
      <div class="p-4 pb-3">
        <!-- Actions Title - Always same height -->
        <div class="h-6 flex items-center mb-3">
          <span 
            v-if="!collapsed || showExpandedContent"
            class="text-xs font-semibold text-muted uppercase tracking-wider"
          >
            Actions
          </span>
        </div>
        
        <!-- Actions Buttons - Fixed layout -->
        <div class="space-y-2">
          <!-- Theme Toggle -->
          <div class="h-10 flex items-center">
            <ThemeToggle 
              :show-options="!collapsed || showExpandedContent"
              :show-label="!collapsed || showExpandedContent"
              :show-shortcuts="false"
              variant="ghost"
              size="sm"
              class="w-full h-full"
              :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
              @toggle="onThemeToggle"
              @change="onThemeChange"
            />
          </div>
          
          <!-- Quick Actions -->
          <div 
            v-for="action in quickActions"
            :key="action.id"
            class="h-10 flex items-center"
          >
            <UButton
              :color="action.color"
              variant="ghost"
              size="sm"
              class="w-full h-full flex items-center"
              :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
              @click="action.action"
            >
              <UIcon 
                :name="action.icon" 
                class="w-4 h-4 shrink-0"
              />
              <span 
                v-if="!collapsed || showExpandedContent"
                class="text-sm ml-3"
              >
                {{ action.label }}
              </span>
            </UButton>
          </div>
        </div>
      </div>

      <!-- User Section -->
      <div class="border-t border-neutral-100 dark:border-neutral-800 p-4">
        <div class="h-12 flex items-center">
          <UButton
            variant="ghost"
            size="sm"
            class="w-full h-full group flex items-center"
            :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
            @click="handleUserMenuClick"
          >
            <UAvatar
              src="/avatar-placeholder.jpg"
              alt="User avatar"
              size="xs"
              class="shrink-0"
              :ui="{ fallback: 'bg-primary-500 dark:bg-primary-400 text-white' }"
            >
              JD
            </UAvatar>
            
            <div 
              v-if="!collapsed || showExpandedContent"
              class="flex-1 text-left ml-3"
            >
              <div class="text-sm font-medium text-highlighted">John Doe</div>
              <div class="text-xs text-muted">john@example.com</div>
            </div>
            
            <UIcon 
              v-if="!collapsed || showExpandedContent"
              class="w-4 h-4 text-muted group-hover:text-highlighted ml-auto"
              name="i-lucide-more-horizontal" 
            />
          </UButton>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import SidebarSection from './SidebarSection.vue'
import SidebarItem from './SidebarItem.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

// NavigationItem arayüzünü SidebarItem.vue ile uyumlu hale getiriyoruz
interface NavigationItem {
  id: string
  label: string
  to: string
  icon: string
  badge?: { label: string; color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' } // badge artık strict type olmalı
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
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  action: () => void
}

// Props
const props = withDefaults(defineProps<{
  collapsed?: boolean
}>(), {
  collapsed: false
})

// Emits
defineEmits<{
  close: []
  signOut: []
  'update:collapsed': [value: boolean]
}>()

// Composables
const route = useRoute()
const isHovered = ref(false)

// Computed properties
const showExpandedContent = computed(() => isHovered.value)

// Navigation data - Enhanced for theme system
const navigationSections: NavigationSection[] = [
  {
    id: 'main',
    label: 'Main',
    icon: 'i-lucide-layout-grid',
    color: 'primary',
    items: [
      { id: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home' },
      { id: 'analytics', label: 'Analytics', to: '/analytics', icon: 'i-lucide-bar-chart-3' },
      { id: 'reports', label: 'Reports', to: '/reports', icon: 'i-lucide-file-text', badge: { label: '3', color: 'primary' } }
    ]
  },
  {
    id: 'content',
    label: 'Content',
    icon: 'i-lucide-folder',
    color: 'secondary',
    items: [
      { id: 'projects', label: 'Projects', to: '/projects', icon: 'i-lucide-folder-open' },
      { id: 'tasks', label: 'Tasks', to: '/tasks', icon: 'i-lucide-check-square', badge: { label: '12', color: 'primary' } },
      { 
        id: 'resources',
        label: 'Resources', 
        to: '/resources', 
        icon: 'i-lucide-archive',
        children: [
          { id: 'images', label: 'Images', to: '/resources/images', icon: 'i-lucide-image' },
          { id: 'documents', label: 'Documents', to: '/resources/documents', icon: 'i-lucide-file' },
          { id: 'videos', label: 'Videos', to: '/resources/videos', icon: 'i-lucide-video' }
        ]
      }
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'i-lucide-wrench',
    color: 'success',
    items: [
      { id: 'showcase', label: 'Showcase', to: '/showcase', icon: 'i-lucide-palette' },
      { id: 'components', label: 'Components', to: '/components', icon: 'i-lucide-component' },
      { id: 'settings', label: 'Settings', to: '/settings', icon: 'i-lucide-settings' }
    ]
  }
]

// Quick actions - Enhanced with theme-aware actions
const quickActions: QuickAction[] = [
  {
    id: 'search',
    label: 'Quick Search',
    icon: 'i-lucide-search',
    color: 'neutral',
    action: () => {
      console.log('Open search modal')
    }
  },
  {
    id: 'new-project',
    label: 'New Project',
    icon: 'i-lucide-plus',
    color: 'primary',
    action: () => {
      console.log('Create new project')
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
  console.log('User menu clicked')
}

// Mouse events
const onMouseEnter = () => {
  if (props.collapsed) {
    isHovered.value = true
  }
}

const onMouseLeave = () => {
  if (props.collapsed) {
    isHovered.value = false
  }
}

// Theme event handlers
const onThemeToggle = () => {
  console.log('[AppSidebar] Theme toggled')
}

const onThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
  console.log(`[AppSidebar] Theme changed to: ${newTheme}`)
}
</script>

<style scoped>
/* Modern scrollbar - Theme aware */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgb(212 212 212); /* neutral-300 */
  border-radius: 2px;
  transition: background-color 0.2s ease-in-out;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(163 163 163); /* neutral-400 */
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgb(82 82 82); /* neutral-600 */
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(115 115 115); /* neutral-500 */
}

/* Enhanced transitions for theme switching and sidebar animation */
.transition-width {
  transition: width 0.3s ease-in-out;
}

/* Flexbox layout for sidebar */
.flex-col {
  display: flex;
  flex-direction: column;
}

/* Ensure consistent heights and prevent layout shifting */
.h-8 { height: 2rem !important; }
.h-12 { height: 3rem !important; }
.h-16 { height: 4rem !important; }

/* Prevent content jumping during transitions */
.w-16 {
  width: 4rem !important;
  min-width: 4rem !important;
  max-width: 4rem !important;
}

.w-64 {
  width: 16rem !important;
  min-width: 16rem !important;
  max-width: 16rem !important;
}

/* Higher z-index for hover state */
.z-60 {
  z-index: 60;
}
</style>