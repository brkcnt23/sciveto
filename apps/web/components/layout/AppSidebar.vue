<!-- components/layout/AppSidebar.vue - Enhanced with Theme Toggle -->
<template>
  <aside 
    class="fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-lg transition-all duration-300 ease-in-out w-64"
    :class="{ 'w-16': collapsed }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Header -->
    <div class="flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-800">
      <div v-show="!collapsed || showExpandedContent" class="flex items-center gap-3">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
          S
        </div>
        <h1 class="text-lg font-semibold text-highlighted">Sciveto</h1>
      </div>
      
      <!-- Collapse Toggle -->
      <UButton
        variant="ghost"
        size="xs"
        @click="$emit('update:collapsed', !collapsed)"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <UIcon 
          :name="collapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'" 
          class="w-4 h-4 transition-transform"
        />
      </UButton>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin space-y-6">
      <!-- Navigation Sections -->
      <div v-for="section in navigationSections" :key="section.id" class="space-y-2">
        <!-- Section Header -->
        <div 
          v-show="!collapsed || showExpandedContent"
          class="px-3 py-2 text-xs font-semibold text-muted uppercase tracking-wider"
        >
          {{ section.label }}
        </div>

        <!-- Section Items -->
        <div class="space-y-1">
          <template v-for="item in section.items" :key="item.to">
            <!-- Simple Item -->
            <div v-if="!item.children">
              <UButton
                :to="item.to"
                :variant="isCurrentRoute(item.to) ? 'soft' : 'ghost'"
                :color="isCurrentRoute(item.to) ? 'primary' : 'neutral'"
                size="sm"
                class="w-full justify-start transition-colors group"
                :class="collapsed && !showExpandedContent ? 'justify-center' : ''"
              >
                <UIcon 
                  :name="item.icon" 
                  class="shrink-0 transition-colors"
                  :class="collapsed && !showExpandedContent ? 'w-5 h-5' : 'w-4 h-4 mr-3'"
                />
                <span 
                  v-show="!collapsed || showExpandedContent"
                  class="truncate text-sm font-medium"
                >
                  {{ item.label }}
                </span>
                
                <!-- Badge -->
                <UBadge
                  v-if="item.badge && (!collapsed || showExpandedContent)"
                  :label="item.badge.toString()"
                  size="xs"
                  color="primary"
                  class="ml-auto"
                />
              </UButton>
            </div>

            <!-- Item with Children (Expandable) -->
            <UAccordion 
              v-else 
              :items="[{
                label: item.label,
                icon: item.icon,
                content: 'children',
                defaultOpen: hasActiveChild(item.children || [])
              }]"
              :unmount-on-hide="false"
            >
              <template #children>
                <div class="space-y-1 pl-2 mt-1">
                  <UButton
                    v-for="child in item.children"
                    :key="child.to"
                    :to="child.to"
                    :variant="isCurrentRoute(child.to) ? 'soft' : 'ghost'"
                    :color="isCurrentRoute(child.to) ? 'primary' : 'neutral'"
                    size="sm"
                    class="w-full justify-start text-sm"
                  >
                    <UIcon :name="child.icon" class="w-3 h-3 mr-3" />
                    {{ child.label }}
                  </UButton>
                </div>
              </template>
            </UAccordion>
          </template>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="border-t border-neutral-200 dark:border-neutral-700 p-4 space-y-4">
      <!-- Theme Toggle Section -->
      <div class="space-y-2">
        <div 
          v-show="!collapsed || showExpandedContent"
          class="text-xs font-semibold text-muted uppercase tracking-wider px-1"
        >
          Theme
        </div>
        
        <div class="flex items-center" :class="collapsed && !showExpandedContent ? 'justify-center' : ''">
          <ThemeToggle 
            :show-options="!collapsed || showExpandedContent"
            :show-label="!collapsed || showExpandedContent"
            :show-shortcuts="false"
            variant="ghost"
            size="sm"
            class="w-full"
            :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
            @toggle="onThemeToggle"
            @change="onThemeChange"
          />
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-2">
        <div 
          v-show="!collapsed || showExpandedContent"
          class="text-xs font-semibold text-muted uppercase tracking-wider px-1"
        >
          Actions
        </div>
        
        <div class="space-y-1">
          <UButton
            v-for="action in quickActions"
            :key="action.id"
            :color="action.color"
            variant="ghost"
            size="sm"
            class="w-full transition-colors"
            :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
            @click="action.action"
          >
            <UIcon 
              :name="action.icon" 
              :class="collapsed && !showExpandedContent ? 'w-4 h-4' : 'w-4 h-4 mr-3'"
            />
            <span v-show="!collapsed || showExpandedContent" class="text-sm">
              {{ action.label }}
            </span>
          </UButton>
        </div>
      </div>

      <!-- User Section -->
      <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <UButton
          variant="ghost"
          size="sm"
          class="w-full group"
          :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
          @click="handleUserMenuClick"
        >
          <div class="flex items-center gap-3 min-w-0">
            <UAvatar
              src="/avatar-placeholder.jpg"
              alt="User avatar"
              size="xs"
              class="shrink-0"
              :ui="{ background: 'bg-primary-500 dark:bg-primary-400' }"
            >
              JD
            </UAvatar>
            
            <div 
              v-show="!collapsed || showExpandedContent"
              class="flex-1 text-left truncate"
            >
              <div class="text-sm font-medium text-highlighted">John Doe</div>
              <div class="text-xs text-muted">john@example.com</div>
            </div>
          </div>
          
          <UIcon 
            v-show="!collapsed || showExpandedContent"
            name="i-lucide-more-horizontal" 
            class="w-4 h-4 text-muted group-hover:text-highlighted transition-colors ml-auto"
          />
        </UButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

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
      { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home' },
      { label: 'Analytics', to: '/analytics', icon: 'i-lucide-bar-chart-3' },
      { label: 'Reports', to: '/reports', icon: 'i-lucide-file-text', badge: 3 }
    ]
  },
  {
    id: 'content',
    label: 'Content',
    icon: 'i-lucide-folder',
    color: 'secondary',
    items: [
      { label: 'Projects', to: '/projects', icon: 'i-lucide-folder-open' },
      { label: 'Tasks', to: '/tasks', icon: 'i-lucide-check-square', badge: 12 },
      { 
        label: 'Resources', 
        to: '/resources', 
        icon: 'i-lucide-archive',
        children: [
          { label: 'Images', to: '/resources/images', icon: 'i-lucide-image' },
          { label: 'Documents', to: '/resources/documents', icon: 'i-lucide-file' },
          { label: 'Videos', to: '/resources/videos', icon: 'i-lucide-video' }
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
      { label: 'Showcase', to: '/showcase', icon: 'i-lucide-palette' },
      { label: 'Components', to: '/components', icon: 'i-lucide-component' },
      { label: 'Settings', to: '/settings', icon: 'i-lucide-settings' }
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
  isHovered.value = false
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

/* Enhanced transitions for theme switching */
.transition-colors {
  transition: 
    color 0.2s ease-in-out, 
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
}

/* Ensure consistent heights */
.h-8 { height: 2rem !important; }
.h-12 { height: 3rem !important; }
.h-16 { height: 4rem !important; }

/* Theme toggle specific styling */
.theme-toggle-section {
  transition: all 0.3s ease-in-out;
}

/* Hover effects for interactive elements */
.group:hover .group-hover\:text-highlighted {
  color: var(--ui-text-highlighted);
}

/* Smooth sidebar expansion */
@media (min-width: 1024px) {
  .sidebar-expanded {
    width: 16rem; /* w-64 */
  }
  
  .sidebar-collapsed {
    width: 4rem; /* w-16 */
  }
}
</style>