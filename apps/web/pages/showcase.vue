<!-- pages/showcase.vue - Enhanced with Advanced Theme System -->
<template>
  <div class="min-h-screen bg-default theme-transition">
    <!-- Header with Theme Toggle -->
    <AppHeader 
      :navigation="headerNavigation"
      :user="currentUser"
      :notification-count="5"
      app-name="Sciveto Showcase"
      @open-search="openSearch"
      @toggle-notifications="toggleNotifications"
      @toggle-sidebar="toggleSidebar"
      @sign-out="handleSignOut"
    />

    <!-- Sidebar -->
    <AppSidebar 
      :collapsed="sidebarCollapsed"
      @update:collapsed="sidebarCollapsed = $event"
      @sign-out="handleSignOut"
    />

    <!-- Main Content -->
    <div class="transition-all duration-300 theme-transition" :class="sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'">
      <div class="px-4 sm:px-6 lg:px-8 py-8">
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- Welcome Section with Theme Demo -->
          <div class="dashboard-card p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-palette" class="w-8 h-8 text-primary" />
                <div>
                  <h1 class="text-3xl font-bold text-highlighted">🎨 Component Showcase</h1>
                  <p class="text-muted mt-1">Interactive components with advanced theme system</p>
                </div>
              </div>
              
              <!-- Theme Controls Demo -->
              <div class="flex items-center gap-2">
                <div class="hidden md:block text-sm text-muted">
                  Current: <span class="font-medium text-highlighted capitalize">{{ themeState.current }}</span>
                </div>
                <ThemeToggle 
                  show-options 
                  show-label 
                  variant="outline" 
                  color="primary"
                  size="md"
                />
              </div>
            </div>

            <!-- Theme Status Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div class="p-4 bg-elevated border border-accented rounded-lg theme-transition" :class="themeState.current === 'dark' ? 'ring-2 ring-primary' : ''">
                <div class="flex items-center gap-3">
                  <UIcon 
                    :name="themeState.current === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'" 
                    class="w-6 h-6"
                    :class="themeState.current === 'dark' ? 'text-primary' : 'text-warning'"
                  />
                  <div>
                    <div class="text-sm font-semibold text-highlighted capitalize">{{ themeState.current }} Mode</div>
                    <div class="text-xs text-muted">Currently active</div>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-elevated border border-accented rounded-lg theme-transition" :class="themeState.preference === 'auto' ? 'ring-2 ring-secondary' : ''">
                <div class="flex items-center gap-3">
                  <UIcon 
                    name="i-lucide-monitor" 
                    class="w-6 h-6"
                    :class="themeState.preference === 'auto' ? 'text-secondary' : 'text-muted'"
                  />
                  <div>
                    <div class="text-sm font-semibold text-highlighted">{{ themeState.preference === 'auto' ? 'Auto' : 'Manual' }}</div>
                    <div class="text-xs text-muted">Preference</div>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-elevated border border-accented rounded-lg theme-transition" :class="themeState.isSystemDark ? 'ring-2 ring-info' : 'ring-2 ring-warning'">
                <div class="flex items-center gap-3">
                  <UIcon 
                    name="i-lucide-laptop" 
                    class="w-6 h-6"
                    :class="themeState.isSystemDark ? 'text-info' : 'text-warning'"
                  />
                  <div>
                    <div class="text-sm font-semibold text-highlighted">{{ themeState.isSystemDark ? 'Dark' : 'Light' }}</div>
                    <div class="text-xs text-muted">System</div>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-elevated border border-accented rounded-lg theme-transition" :class="themeState.isTransitioning ? 'ring-2 ring-error' : 'ring-2 ring-success'">
                <div class="flex items-center gap-3">
                  <UIcon 
                    :name="themeState.isTransitioning ? 'i-lucide-loader-circle' : 'i-lucide-check-circle'" 
                    class="w-6 h-6"
                    :class="[
                      themeState.isTransitioning ? 'text-error animate-spin' : 'text-success',
                    ]"
                  />
                  <div>
                    <div class="text-sm font-semibold text-highlighted">{{ themeState.isTransitioning ? 'Changing' : 'Ready' }}</div>
                    <div class="text-xs text-muted">Status</div>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-muted">
              Bu sayfada projemizde kullanacağımız tüm component'leri görebilirsiniz.
              Artık <strong class="text-highlighted">advanced theme system</strong> ile otomatik dark/light mode desteği,
              keyboard shortcuts ve smooth transitions dahil!
            </p>
          </div>

          <!-- Theme System Demo -->
          <div class="dashboard-card p-6">
            <div class="flex items-center gap-3 mb-6">
              <UIcon name="i-lucide-paintbrush" class="w-6 h-6 text-primary" />
              <h2 class="text-2xl font-bold text-highlighted">🎨 Theme System Demo</h2>
            </div>

            <div class="space-y-6">
              <!-- Manual Theme Controls -->
              <div>
                <h3 class="text-lg font-semibold text-highlighted mb-4">Manual Theme Controls</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <UButton 
                    @click="setTheme('light')" 
                    :variant="themeState.current === 'light' ? 'solid' : 'outline'"
                    color="warning"
                    size="lg"
                    block
                  >
                    <UIcon name="i-lucide-sun" class="w-5 h-5 mr-2" />
                    Light Mode
                  </UButton>

                  <UButton 
                    @click="setTheme('dark')" 
                    :variant="themeState.current === 'dark' ? 'solid' : 'outline'"
                    color="info"
                    size="lg"
                    block
                  >
                    <UIcon name="i-lucide-moon" class="w-5 h-5 mr-2" />
                    Dark Mode
                  </UButton>

                  <UButton 
                    @click="setTheme('auto')" 
                    :variant="themeState.preference === 'auto' ? 'solid' : 'outline'"
                    color="neutral"
                    size="lg"
                    block
                  >
                    <UIcon name="i-lucide-monitor" class="w-5 h-5 mr-2" />
                    Auto Mode
                  </UButton>
                </div>
              </div>

              <!-- Theme Toggle Variants -->
              <div>
                <h3 class="text-lg font-semibold text-highlighted mb-4">Theme Toggle Variants</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="space-y-2">
                    <div class="text-sm font-medium text-highlighted">Simple</div>
                    <ThemeToggle />
                  </div>
                  
                  <div class="space-y-2">
                    <div class="text-sm font-medium text-highlighted">With Label</div>
                    <ThemeToggle show-label />
                  </div>
                  
                  <div class="space-y-2">
                    <div class="text-sm font-medium text-highlighted">Full Options</div>
                    <ThemeToggle show-options show-shortcuts variant="outline" color="primary" />
                  </div>
                  
                  <div class="space-y-2">
                    <div class="text-sm font-medium text-highlighted">Solid Variant</div>
                    <ThemeToggle show-label variant="solid" color="secondary" />
                  </div>
                </div>
              </div>

              <!-- Keyboard Shortcuts Demo -->
              <div>
                <h3 class="text-lg font-semibold text-highlighted mb-4">Keyboard Shortcuts</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="flex items-center justify-between p-3 bg-elevated rounded-lg border border-accented theme-transition">
                    <span class="text-sm text-default">Toggle</span>
                    <kbd class="px-2 py-1 bg-muted text-muted text-xs rounded theme-transition">Ctrl+Shift+T</kbd>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-elevated rounded-lg border border-accented theme-transition">
                    <span class="text-sm text-default">Light</span>
                    <kbd class="px-2 py-1 bg-muted text-muted text-xs rounded theme-transition">Ctrl+Shift+L</kbd>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-elevated rounded-lg border border-accented theme-transition">
                    <span class="text-sm text-default">Dark</span>
                    <kbd class="px-2 py-1 bg-muted text-muted text-xs rounded theme-transition">Ctrl+Shift+D</kbd>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-elevated rounded-lg border border-accented theme-transition">
                    <span class="text-sm text-default">Auto</span>
                    <kbd class="px-2 py-1 bg-muted text-muted text-xs rounded theme-transition">Ctrl+Shift+A</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Original Showcase Components -->
          <UCard 
            class="relative overflow-hidden h-[550px]"
            :ui="{ 
              root: 'h-full',
              body: 'p-0 h-full absolute inset-0',
              header: 'absolute top-0 left-0 right-0 z-20 bg-transparent'
            }"
          >
            <!-- Background Image -->
            <div 
              class="absolute inset-0"
              style="
                background-image: url('/map/f4f0badc-fb78-404c-8e19-acdeabe279d7.png');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
              "
            ></div>

            <template #header>
              <div class="flex items-center gap-2 relative z-10">
                🌍 <span class="font-semibold text-white drop-shadow-lg">Global Project Map</span>
              </div>
            </template>

            <div class="absolute inset-0 z-10">
              <WorldMap name="world-map" />
            </div>
          </UCard>
          <DataShowcase />
          <FeedbackShowcase />
          <ToastShowcase />
          <FormShowcase />
          <StatusShowcase />
          <LayoutShowcase />
          <!-- NavigationShowcase removed to prevent auto-scroll -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'

// Import showcase components
import WorldMap from '~/components/WorldMap.vue'
import DataShowcase from '~/showcase/data/DataShowcase.vue'
import FeedbackShowcase from '~/showcase/feedback/FeedbackShowcase.vue'
import ToastShowcase from '~/showcase/feedback/ToastShowcase.vue'
import FormShowcase from '~/showcase/forms/FormShowcase.vue'
import StatusShowcase from '~/showcase/forms/StatusShowcase.vue'
import LayoutShowcase from '~/showcase/layout/LayoutShowcase.vue'
// import NavigationShowcase from '~/showcase/navigation/NavigationShowcase.vue' // Removed to prevent auto-scroll

// Import layout components
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

// Theme system
const { state: themeState, setTheme } = useTheme()

// Page state
const sidebarCollapsed = ref(true) // Default kapalı

// Mock data
const currentUser = {
  name: 'John Doe',
  email: 'john@sciveto.com',
  avatar: '/avatar-placeholder.jpg'
}

const headerNavigation = [
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home' },
  { label: 'Showcase', to: '/showcase', icon: 'i-lucide-palette' },
  { label: 'Components', to: '/components', icon: 'i-lucide-component' }
]

// Event handlers
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const openSearch = () => {
  console.log('Search opened')
}

const toggleNotifications = () => {
  console.log('Notifications toggled')
}

const handleSignOut = () => {
  console.log('User signed out')
}

// Force scroll to top on page load
onMounted(() => {
  window.scrollTo(0, 0)
})

// Page meta
definePageMeta({
  middleware: 'auth',
  title: 'Component Showcase'
})

// SEO
useHead({
  title: 'Component Showcase - Advanced Theme System',
  meta: [
    { name: 'description', content: 'Interactive component showcase with advanced theme management system' }
  ]
})
</script>

<style scoped>
/* Enhanced transitions for sidebar and theme changes */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Theme transition class for smooth color changes */
.theme-transition {
  transition: 
    color 0.25s ease-in-out,
    background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
}

/* Custom scrollbar for main content */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--ui-background-muted);
}

::-webkit-scrollbar-thumb {
  background: var(--ui-border-default);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--ui-neutral);
}

/* Force light mode fixes */
html:not(.dark) ::-webkit-scrollbar-track {
  background: #f1f5f9 !important;
}

html:not(.dark) ::-webkit-scrollbar-thumb {
  background: #cbd5e1 !important;
}

html:not(.dark) ::-webkit-scrollbar-thumb:hover {
  background: #94a3b8 !important;
}
</style>