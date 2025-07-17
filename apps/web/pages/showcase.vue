<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
    <!-- Header - Full width, fixed position -->
    <AppHeader :navigation="headerNavigation" :user="user" :notification-count="notificationCount" :app-name="appName"
      @open-search="openSearch" @toggle-notifications="toggleNotifications" @sign-out="signOut" />

    <!-- Main Layout Container -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <AppSidebar :navigation="sidebarNavigation" :user="user" :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <div class="main-content-wrapper flex-1 overflow-auto">
        <!-- World Map Section -->
        <UCard>
          <template #header>
            🌍 Global Project Map
          </template>

          <WorldMap name="world-map" />
        </UCard>

        <!-- Mevcut header/sidebar -->
        <NavigationShowcase />
        <!-- LayoutShowcase'i ekle -->
        <LayoutShowcase />
        <!-- Form Section -->
        <FormShowcase />
        <DataShowcase />
        <FeedbackShowcase />



        <!-- Business Components Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <h3 class="text-xl font-bold text-slate-800">🏢 Business Components</h3>
          </template>

          <div class="space-y-8">
            <!-- Stock Item Cards -->
            <div>
              <h4 class="font-semibold text-slate-700 mb-4">Stock Item Cards</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StockItemCard name="StockItemCard" v-for="stockItem in sampleStockItems" :key="stockItem.id"
                  :stock-item="stockItem" @click="handleStockItemClick(stockItem.id)" @view="handleStockItemView"
                  @edit="handleStockItemEdit" @delete="handleStockItemDelete" @adjust-stock="handleStockAdjust"
                  @add-to-project="handleAddToProject" />
              </div>
            </div>

            <!-- Category Cards -->
            <div>
              <h4 class="font-semibold text-slate-700 mb-4">Category Cards</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CategoryCard name="CategoryCard" v-for="category in sampleCategories" :key="category.id"
                  :category="category" @click="handleCategoryClick(category.id)" @view="handleCategoryView"
                  @edit="handleCategoryEdit" @delete="handleCategoryDelete" @add-item="handleCategoryAddItem"
                  @view-items="handleCategoryViewItems" />
              </div>
            </div>
          </div>
        </UCard>

        <!-- Project Cards Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-slate-800">🎴 Project Cards</h3>
              <UButton variant="outline" size="sm" :loading="projectsLoading" @click="toggleProjectsLoading">
                {{ projectsLoading ? 'Loading...' : 'Toggle Loading' }}
              </UButton>
            </div>
          </template>

          <!-- Loading State -->
          <div v-if="projectsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader name="SkeletonLoader" v-for="n in 3" :key="n" type="card" />
          </div>

          <!-- Loaded State -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard name="ProjectCard" v-for="project in sampleProjects" :key="project.id" :project="project"
              @click="handleProjectClick(project.id)" />
          </div>
        </UCard>

        <!-- Project Table Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-slate-800">📊 Project Table</h3>
              <UButton variant="outline" size="sm" :loading="tableLoading" @click="toggleTableLoading">
                {{ tableLoading ? 'Loading...' : 'Toggle Loading' }}
              </UButton>
            </div>
          </template>

          <!-- Loading State -->
          <div v-if="tableLoading" class="space-y-0 bg-white rounded-lg border overflow-hidden">
            <SkeletonLoader name="SkeletonLoader" v-for="n in 5" :key="n" type="table-row" />
          </div>

          <!-- Loaded State -->
          <ProjectTable name="ProjectTable" v-else :projects="sampleProjects" @view="handleProjectView"
            @edit="handleProjectEdit" @delete="handleProjectDelete" />
        </UCard>
        <AppFooter :app-name="appName" />
      </div>
      <!-- Footer -->

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDualToast } from '~/composables/useDualToast'

import DataShowcase from '@/showcase/data/DataShowcase.vue'

import FeedbackShowcase from '@/showcase/feedback/FeedbackShowcase.vue'
import ToastShowcase from '@/showcase/feedback/ToastShowcase.vue'

import FormShowcase from '~/showcase/forms/FormShowcase.vue'
//import InputShowcase from '~/showcase/forms/InputShowcase.vue'
import StatusShowcase from '~/showcase/forms/StatusShowcase.vue'

import LayoutShowcase from '~/showcase/layout/LayoutShowcase.vue'

import NavigationShowcase from '~/showcase/navigation/NavigationShowcase.vue'

import WorldMap from '@/components/WorldMap.vue'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

import SkeletonLoader from '~/components/ui/SkeletonLoader.vue'


const dualToast = useDualToast()

definePageMeta({
  middleware: 'auth'
})

// Fix: Update these functions to use dualToast consistently
const success = (message) => dualToast.success(message)
const error = (message) => dualToast.error(message)
const warning = (message, options) => dualToast.warning(message, options)
const info = (message) => dualToast.info(message)

let simulationInterval = null

const projectsLoading = ref(false)
const tableLoading = ref(false)


const sampleStockItems = ref([
  {
    id: '1',
    name: 'Safety Helmet',
    sku: 'SH-001',
    category: 'Safety Equipment',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    unitPrice: 24.99,
    totalValue: 1124.55,
    supplier: 'SafetyFirst Co.',
    lastRestocked: '2024-01-15T10:30:00Z',
    status: 'IN_STOCK',
    location: 'Warehouse A, Shelf 12',
    description: 'High-quality construction safety helmet'
  },
  {
    id: '2',
    name: 'Work Gloves',
    sku: 'WG-002',
    category: 'Safety Equipment',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unitPrice: 12.99,
    totalValue: 103.92,
    supplier: 'WorkGear Ltd.',
    lastRestocked: '2024-01-10T14:20:00Z',
    status: 'LOW_STOCK',
    location: 'Warehouse B, Shelf 5',
    description: 'Durable work gloves for construction'
  }
])

const sampleCategories = ref([
  {
    id: '1',
    name: 'Safety Equipment',
    description: 'Personal protective equipment and safety gear',
    color: 'blue',
    icon: 'i-heroicons-shield-check',
    status: 'Active',
    itemCount: 32,
    totalValue: 8500,
    lowStockItems: 8,
    activeProjects: 15,
    popularItems: [
      { id: '1', name: 'Safety Helmet', price: 24.99 },
      { id: '2', name: 'Safety Vest', price: 19.99 },
      { id: '3', name: 'Safety Gloves', price: 12.99 }
    ],
    parentCategory: null,
    lastActivity: '2024-01-15T16:45:00Z',
    lastActivityDescription: 'Safety helmets restocked'
  },
  {
    id: '2',
    name: 'Tools',
    description: 'Construction and maintenance tools',
    color: 'green',
    icon: 'i-heroicons-wrench-screwdriver',
    status: 'Active',
    itemCount: 45,
    totalValue: 12750,
    lowStockItems: 3,
    activeProjects: 8,
    popularItems: [
      { id: '4', name: 'Power Drill', price: 89.99 },
      { id: '5', name: 'Hammer', price: 25.99 },
      { id: '6', name: 'Screwdriver Set', price: 34.99 }
    ],
    parentCategory: { name: 'Equipment' },
    lastActivity: '2024-01-12T10:30:00Z',
    lastActivityDescription: 'New power tools added'
  }
])

const user = ref({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: null
})
const sampleProjects = ref([
  {
    id: '1',
    name: 'Modern Website Redesign',
    projectCode: 'WEB-2024-001',
    description: 'Complete website redesign with modern UI/UX principles and responsive design for better user experience.',
    status: 'designing',
    priority: 'HIGH',
    completionPercentage: 65,
    clientName: 'Tech Solutions Inc.',
    manager: { name: 'Sarah Connor', email: 'sarah@techsolutions.com' },
    estimatedCost: 25000,
    actualCost: 15000,
    deadline: '2024-12-15',
    createdAt: '2024-10-01'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    projectCode: 'APP-2024-002',
    description: 'Native mobile application development for iOS and Android platforms with cross-platform compatibility.',
    status: 'manufacturing',
    priority: 'URGENT',
    completionPercentage: 40,
    clientName: 'StartupX',
    manager: { name: 'John Matrix', email: 'john@startupx.com' },
    estimatedCost: 45000,
    actualCost: 20000,
    deadline: '2024-11-30',
    createdAt: '2024-09-15'
  },
  {
    id: '3',
    name: 'E-commerce Platform',
    projectCode: 'ECOM-2024-003',
    description: 'Full-featured e-commerce platform with payment integration, inventory management, and analytics.',
    status: 'planning',
    priority: 'MEDIUM',
    completionPercentage: 15,
    clientName: 'Retail Masters',
    manager: { name: 'Lisa Wong', email: 'lisa@retailmasters.com' },
    estimatedCost: 60000,
    actualCost: 8000,
    deadline: '2025-02-28',
    createdAt: '2024-10-10'
  }
])

const headerNavigation = ref([
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home' },
  { label: 'Showcase', to: '/showcase', icon: 'i-lucide-layout' }
])

const sidebarNavigation = ref([
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home' },
  { label: 'Showcase', to: '/showcase', icon: 'i-lucide-layout' }
])

const sidebarOpen = ref(false)
const notificationCount = ref(3)
const appName = ref('Sciveto')

// Function'lar
const openSearch = () => console.log('Search opened')
const toggleNotifications = () => console.log('Notifications toggled')
const signOut = () => console.log('User signed out')

const toggleProjectsLoading = () => {
  projectsLoading.value = !projectsLoading.value
  if (projectsLoading.value) {
    setTimeout(() => {
      projectsLoading.value = false
    }, 3000)
  }
}

const toggleTableLoading = () => {
  tableLoading.value = !tableLoading.value
  if (tableLoading.value) {
    setTimeout(() => {
      tableLoading.value = false
    }, 3000)
  }
}

const handleProjectClick = (projectId) => {
  console.log('Project clicked:', projectId)
  info(`Viewing project: ${projectId}`)
}

const handleProjectView = (projectId) => {
  console.log('View project:', projectId)
  info(`Opening project details: ${projectId}`)
}

const handleProjectEdit = (projectId) => {
  console.log('Edit project:', projectId)
  info(`Editing project: ${projectId}`)
}

const handleProjectDelete = (projectId) => {
  console.log('Delete project:', projectId)
  warning(`Are you sure you want to delete project: ${projectId}?`, {
    autoClose: false,
    action: {
      text: 'Confirm Delete',
      handler: () => {
        success('Project deleted successfully!')
      }
    }
  })
}

// Stock item handlers
const handleStockItemClick = (stockItemId) => {
  console.log('Stock item clicked:', stockItemId)
  info(`Viewing stock item: ${stockItemId}`)
}

const handleStockItemView = (stockItemId) => {
  console.log('View stock item:', stockItemId)
  success(`Opening stock item details: ${stockItemId}`)
}

const handleStockItemEdit = (stockItemId) => {
  console.log('Edit stock item:', stockItemId)
  info(`Editing stock item: ${stockItemId}`)
}

const handleStockItemDelete = (stockItemId) => {
  console.log('Delete stock item:', stockItemId)
  warning(`Are you sure you want to delete stock item: ${stockItemId}?`, {
    autoClose: false,
    action: {
      text: 'Confirm Delete',
      handler: () => {
        success('Stock item deleted successfully!')
      }
    }
  })
}

const handleStockAdjust = (stockItemId) => {
  console.log('Adjust stock:', stockItemId)
  info(`Opening stock adjustment for: ${stockItemId}`)
}

const handleAddToProject = (stockItemId) => {
  console.log('Add to project:', stockItemId)
  success(`Added stock item ${stockItemId} to project`)
}

// Category handlers
const handleCategoryClick = (categoryId) => {
  console.log('Category clicked:', categoryId)
  info(`Viewing category: ${categoryId}`)
}

const handleCategoryView = (categoryId) => {
  console.log('View category:', categoryId)
  success(`Opening category details: ${categoryId}`)
}

const handleCategoryEdit = (categoryId) => {
  console.log('Edit category:', categoryId)
  info(`Editing category: ${categoryId}`)
}

const handleCategoryDelete = (categoryId) => {
  console.log('Delete category:', categoryId)
  warning(`Are you sure you want to delete category: ${categoryId}?`, {
    autoClose: false,
    action: {
      text: 'Confirm Delete',
      handler: () => {
        success('Category deleted successfully!')
      }
    }
  })
}

const handleCategoryAddItem = (categoryId) => {
  console.log('Add item to category:', categoryId)
  success(`Adding new item to category: ${categoryId}`)
}

const handleCategoryViewItems = (categoryId) => {
  console.log('View category items:', categoryId)
  info(`Viewing items in category: ${categoryId}`)
}


// Set page title
useHead({
  title: 'Component Showcase - Dashboard'
})

// Clean up interval on unmount
onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})
</script>