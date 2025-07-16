<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <!-- Header - Full width, fixed position -->
    <AppHeader 
      :navigation="headerNavigation" 
      :user="user" 
      :notification-count="notificationCount" 
      :app-name="appName"
      @open-search="openSearch" 
      @toggle-notifications="toggleNotifications" 
      @sign-out="signOut" 
    />

    <!-- Main Layout Container -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <AppSidebar 
        :navigation="sidebarNavigation" 
        :user="user" 
        :is-open="sidebarOpen" 
        @close="sidebarOpen = false" 
      />

      <!-- Main Content Area -->
      <div class="flex-1 overflow-auto">
        <div class="mx-auto max-w-screen-2xl px-6 lg:px-8 py-8 space-y-8">
          
          <!-- Welcome Section -->
          <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <h1 class="text-3xl font-bold text-neutral-800">🎨 Component Showcase</h1>
                  <p class="text-neutral-600 mt-2">
                    Explore our beautiful UI components with Nuxt UI v3 updates
                  </p>
                </div>
                <UBadge color="primary" variant="solid" size="lg">
                  Nuxt UI v3
                </UBadge>
              </div>
            </template>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="text-center p-4">
                <div class="text-2xl font-bold text-primary">{{ componentCategories.length }}</div>
                <div class="text-sm text-muted">Categories</div>
              </div>
              <div class="text-center p-4">
                <div class="text-2xl font-bold text-success">50+</div>
                <div class="text-sm text-muted">Components</div>
              </div>
              <div class="text-center p-4">
                <div class="text-2xl font-bold text-warning">100%</div>
                <div class="text-sm text-muted">Responsive</div>
              </div>
              <div class="text-center p-4">
                <div class="text-2xl font-bold text-info">v3</div>
                <div class="text-sm text-muted">Nuxt UI</div>
              </div>
            </div>
          </UCard>

          <!-- Component Categories Navigation -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-layout-grid" class="w-6 h-6 text-primary" />
                <h2 class="text-2xl font-bold text-highlighted">Component Categories</h2>
              </div>
            </template>

            <!-- Category Tabs -->
            <UTabs v-model="activeCategory" :items="componentCategories" @change="handleCategoryChange">
              
              <!-- Layout Components Tab -->
              <template #layout="{ item }">
                <LayoutShowcase />
              </template>

              <!-- Form Components Tab -->
              <template #forms="{ item }">
                <FormShowcase />
              </template>

              <!-- Data Components Tab -->
              <template #data="{ item }">
                <DataShowcase />
              </template>

              <!-- Feedback Components Tab -->
              <template #feedback="{ item }">
                <FeedbackShowcase />
              </template>

              <!-- Navigation Components Tab -->
              <template #navigation="{ item }">
                <NavigationShowcase />
              </template>

            </UTabs>
          </UCard>

          <!-- Quick Actions -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-zap" class="w-5 h-5 text-primary" />
                <h3 class="text-xl font-bold text-highlighted">Quick Actions</h3>
              </div>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <UButton variant="outline" @click="showAllToasts" block>
                <UIcon name="i-lucide-bell" class="w-4 h-4 mr-2" />
                Show All Toasts
              </UButton>
              
              <UButton variant="outline" @click="toggleDemoMode" block>
                <UIcon name="i-lucide-play" class="w-4 h-4 mr-2" />
                {{ demoMode ? 'Stop Demo' : 'Start Demo' }}
              </UButton>
              
              <UButton variant="outline" @click="exportShowcase" block>
                <UIcon name="i-lucide-download" class="w-4 h-4 mr-2" />
                Export Components
              </UButton>
              
              <UButton variant="outline" @click="openDocumentation" block>
                <UIcon name="i-lucide-book-open" class="w-4 h-4 mr-2" />
                Documentation
              </UButton>
            </div>
          </UCard>

          <!-- Legacy Components Section (for backward compatibility) -->
          <UCard v-if="showLegacyComponents">
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <UIcon name="i-lucide-archive" class="w-5 h-5 text-warning" />
                  <h3 class="text-xl font-bold text-highlighted">Legacy Components</h3>
                </div>
                <UButton variant="ghost" size="sm" @click="showLegacyComponents = false">
                  <UIcon name="i-lucide-x" class="w-4 h-4" />
                </UButton>
              </div>
            </template>

            <div class="space-y-4">
              <UAlert color="warning" variant="soft">
                <template #title>Migration Notice</template>
                <template #description>
                  These components are being migrated to Nuxt UI v3. 
                  Some functionality may be deprecated.
                </template>
              </UAlert>

              <!-- World Map Section -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UCard variant="outline">
                  <template #header>
                    🌍 World Map Component
                  </template>
                  <WorldMap />
                </UCard>

                <!-- Sample Projects Preview -->
                <UCard variant="outline">
                  <template #header>
                    📊 Sample Data Preview
                  </template>
                  <div class="space-y-3">
                    <div v-for="project in sampleProjects.slice(0, 3)" :key="project.id" 
                         class="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                      <UAvatar :alt="project.name" size="sm" />
                      <div class="flex-1">
                        <div class="font-medium text-highlighted">{{ project.name }}</div>
                        <div class="text-sm text-muted">{{ project.description }}</div>
                      </div>
                      <UBadge :color="project.status === 'active' ? 'success' : 'neutral'" size="xs">
                        {{ project.status }}
                      </UBadge>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </UCard>

        </div>

        <!-- Footer -->
        <AppFooter :app-name="appName" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDualToast } from '~/composables/useDualToast'
import { useAuthStore } from '~/stores/auth'

// Component imports
import LayoutShowcase from '~/showcase/layout/LayoutShowcase.vue'
import FormShowcase from '~/showcase/forms/FormShowcase.vue'
import DataShowcase from '~/showcase/data/DataShowcase.vue'
import FeedbackShowcase from '~/showcase/feedback/FeedbackShowcase.vue'
import NavigationShowcase from '~/showcase/navigation/NavigationShowcase.vue'
import WorldMap from '@/components/WorldMap.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

// Composables
const dualToast = useDualToast()
const authStore = useAuthStore()
const toast = useToast()

// Page meta
definePageMeta({
  middleware: 'auth'
})

// Reactive state
const activeCategory = ref('layout')
const demoMode = ref(false)
const showLegacyComponents = ref(false)
const sidebarOpen = ref(false)
const notificationCount = ref(3)
const appName = ref('Sciveto')

// User data
const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://avatars.githubusercontent.com/u/739984?v=4'
})

// Navigation data with Nuxt UI v3 syntax
const headerNavigation = ref([
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home' },
  { label: 'Showcase', to: '/showcase', icon: 'i-lucide-layout' }
])

const sidebarNavigation = ref([
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home' },
  { label: 'Showcase', to: '/showcase', icon: 'i-lucide-layout' },
  { label: 'Settings', to: '/settings', icon: 'i-lucide-settings' }
])

// Component categories for tabs
const componentCategories = ref([
  { 
    key: 'layout', 
    label: 'Layout', 
    icon: 'i-lucide-layout-dashboard',
    description: 'Headers, Sidebars, Footers'
  },
  { 
    key: 'forms', 
    label: 'Forms', 
    icon: 'i-lucide-edit',
    description: 'Inputs, Buttons, Validation'
  },
  { 
    key: 'data', 
    label: 'Data', 
    icon: 'i-lucide-database',
    description: 'Tables, Cards, Progress'
  },
  { 
    key: 'feedback', 
    label: 'Feedback', 
    icon: 'i-lucide-message-circle',
    description: 'Toasts, Alerts, Modals'
  },
  { 
    key: 'navigation', 
    label: 'Navigation', 
    icon: 'i-lucide-navigation',
    description: 'Menus, Breadcrumbs, Tabs'
  }
])

// Sample projects data
const sampleProjects = ref([
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'Modern online shopping experience',
    status: 'active',
    progress: 85
  },
  {
    id: 2,
    name: 'Dashboard Analytics',
    description: 'Real-time data visualization',
    status: 'active',
    progress: 92
  },
  {
    id: 3,
    name: 'Mobile App',
    description: 'Cross-platform mobile solution',
    status: 'pending',
    progress: 45
  }
])

// Event handlers
const openSearch = () => {
  toast.add({
    title: 'Search',
    description: 'Opening global search...',
    color: 'info',
    icon: 'i-lucide-search'
  })
}

const toggleNotifications = () => {
  toast.add({
    title: 'Notifications',
    description: 'Toggle notifications panel',
    color: 'info',
    icon: 'i-lucide-bell'
  })
}

const signOut = () => {
  authStore.logout()
  toast.add({
    title: 'Signed Out',
    description: 'You have been signed out successfully',
    color: 'success',
    icon: 'i-lucide-log-out'
  })
}

const handleCategoryChange = ({ index, tab }) => {
  toast.add({
    title: 'Category Changed',
    description: `Switched to ${tab.label} components`,
    color: 'info',
    icon: tab.icon
  })
}

// Quick actions
const showAllToasts = () => {
  const toastTypes = [
    { color: 'success', title: 'Success', description: 'Operation completed successfully', icon: 'i-lucide-check' },
    { color: 'error', title: 'Error', description: 'Something went wrong', icon: 'i-lucide-x' },
    { color: 'warning', title: 'Warning', description: 'Please check your input', icon: 'i-lucide-alert-triangle' },
    { color: 'info', title: 'Info', description: 'Here is some information', icon: 'i-lucide-info' }
  ]

  toastTypes.forEach((toastData, index) => {
    setTimeout(() => {
      toast.add(toastData)
    }, index * 500)
  })
}

const toggleDemoMode = () => {
  demoMode.value = !demoMode.value
  toast.add({
    title: 'Demo Mode',
    description: demoMode.value ? 'Demo mode activated' : 'Demo mode deactivated',
    color: demoMode.value ? 'success' : 'neutral',
    icon: demoMode.value ? 'i-lucide-play' : 'i-lucide-pause'
  })
}

const exportShowcase = () => {
  toast.add({
    title: 'Export Started',
    description: 'Generating component documentation...',
    color: 'info',
    icon: 'i-lucide-download'
  })
  
  // Simulate export process
  setTimeout(() => {
    toast.add({
      title: 'Export Complete',
      description: 'Component documentation has been generated',
      color: 'success',
      icon: 'i-lucide-check'
    })
  }, 2000)
}

const openDocumentation = () => {
  window.open('https://ui.nuxt.com', '_blank')
  toast.add({
    title: 'Documentation',
    description: 'Opening Nuxt UI documentation',
    color: 'info',
    icon: 'i-lucide-external-link'
  })
}

// Auto-demo functionality
let demoInterval = null

const startAutoDemo = () => {
  if (demoInterval) return
  
  demoInterval = setInterval(() => {
    const categories = componentCategories.value
    const currentIndex = categories.findIndex(cat => cat.key === activeCategory.value)
    const nextIndex = (currentIndex + 1) % categories.length
    activeCategory.value = categories[nextIndex].key
  }, 5000) // Switch category every 5 seconds
}

const stopAutoDemo = () => {
  if (demoInterval) {
    clearInterval(demoInterval)
    demoInterval = null
  }
}

// Watch demo mode changes
watch(demoMode, (newValue) => {
  if (newValue) {
    startAutoDemo()
  } else {
    stopAutoDemo()
  }
})

// Set page title
useHead({
  title: 'Component Showcase - Nuxt UI v3'
})

// Clean up on unmount
onUnmounted(() => {
  stopAutoDemo()
})

// Show legacy components after 3 seconds (optional)
onMounted(() => {
  setTimeout(() => {
    showLegacyComponents.value = true
  }, 3000)
})
</script>

<style scoped>
/* Custom transitions for category switching */
.showcase-transition-enter-active,
.showcase-transition-leave-active {
  transition: all 0.3s ease-in-out;
}

.showcase-transition-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.showcase-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Smooth scroll behavior */
.overflow-auto {
  scroll-behavior: smooth;
}

/* Custom scrollbar for main content */
.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>