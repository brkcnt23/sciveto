<!-- apps/web/pages/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-200 via-slate-100 to-emerald-200">
    <!-- Header Component -->
    <Header :user="user" />

    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-8 space-y-8">
      <!-- Welcome Section -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h2 class="text-2xl font-bold text-slate-800">🚀 Component Showcase Dashboard</h2>
        </template>
        
        <p class="text-slate-600 mb-6">
          Bu sayfada projemizde kullanacağımız tüm base component'leri görebilirsiniz. 
          Her component doğal renkler ve modern tasarım prensipleri ile oluşturulmuştur.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-sky-50 p-4 rounded-lg border border-sky-200">
            <h4 class="font-semibold text-sky-800">🎨 Layout Components</h4>
            <p class="text-sm text-sky-600 mt-1">Header, Sidebar, Footer, Breadcrumb</p>
          </div>
          <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h4 class="font-semibold text-emerald-800">🔧 Core UI Components</h4>
            <p class="text-sm text-emerald-600 mt-1">Card, Table, Modal, Button, Badge</p>
          </div>
          <div class="bg-violet-50 p-4 rounded-lg border border-violet-200">
            <h4 class="font-semibold text-violet-800">📊 Data Components</h4>
            <p class="text-sm text-violet-600 mt-1">ProgressBar, StatusIndicator, Avatar</p>
          </div>
        </div>
      </UCard>

      <!-- Priority Badge Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">🏷️ Priority Badge Component</h3>
        </template>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center space-y-3">
            <h4 class="font-semibold text-slate-700">LOW Priority</h4>
            <PriorityBadge priority="LOW" />
            <PriorityBadge priority="LOW" variant="soft" />
            <PriorityBadge priority="LOW" variant="outline" />
          </div>
          <div class="text-center space-y-3">
            <h4 class="font-semibold text-slate-700">MEDIUM Priority</h4>
            <PriorityBadge priority="MEDIUM" />
            <PriorityBadge priority="MEDIUM" variant="soft" />
            <PriorityBadge priority="MEDIUM" variant="outline" />
          </div>
          <div class="text-center space-y-3">
            <h4 class="font-semibold text-slate-700">HIGH Priority</h4>
            <PriorityBadge priority="HIGH" />
            <PriorityBadge priority="HIGH" variant="soft" />
            <PriorityBadge priority="HIGH" variant="outline" />
          </div>
          <div class="text-center space-y-3">
            <h4 class="font-semibold text-slate-700">URGENT Priority</h4>
            <PriorityBadge priority="URGENT" />
            <PriorityBadge priority="URGENT" variant="soft" />
            <PriorityBadge priority="URGENT" variant="outline" />
          </div>
        </div>
      </UCard>

      <!-- Progress Bar Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">📊 Progress Bar Component</h3>
        </template>
        
        <div class="space-y-6">
          <ProgressBar :value="15" label="Planning Phase" estimated="5 days remaining" show-status />
          <ProgressBar :value="45" label="Development Phase" estimated="3 days remaining" show-status />
          <ProgressBar :value="75" label="Testing Phase" estimated="1 day remaining" show-status />
          <ProgressBar :value="100" label="Completed Project" estimated="Complete" show-status />
          
          <!-- Custom Colors -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <h4 class="font-semibold text-slate-700 mb-4">Custom Colors</h4>
            <div class="space-y-4">
              <ProgressBar :value="60" label="Blue Progress" color="blue" />
              <ProgressBar :value="80" label="Green Progress" color="green" />
              <ProgressBar :value="40" label="Orange Progress" color="orange" />
              <ProgressBar :value="90" label="Purple Progress" color="purple" />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Avatar Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">👤 Avatar Component</h3>
        </template>
        
        <div class="space-y-8">
          <!-- Size variations -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Size Variations</h4>
            <div class="flex items-center space-x-6">
              <div class="text-center space-y-2">
                <Avatar :user="sampleUsers[0]" size="xs" />
                <p class="text-xs text-slate-600">XS</p>
              </div>
              <div class="text-center space-y-2">
                <Avatar :user="sampleUsers[0]" size="sm" />
                <p class="text-xs text-slate-600">SM</p>
              </div>
              <div class="text-center space-y-2">
                <Avatar :user="sampleUsers[0]" size="md" />
                <p class="text-xs text-slate-600">MD</p>
              </div>
              <div class="text-center space-y-2">
                <Avatar :user="sampleUsers[0]" size="lg" />
                <p class="text-xs text-slate-600">LG</p>
              </div>
              <div class="text-center space-y-2">
                <Avatar :user="sampleUsers[0]" size="xl" />
                <p class="text-xs text-slate-600">XL</p>
              </div>
              <div class="text-center space-y-2">
                <Avatar :user="sampleUsers[0]" size="2xl" />
                <p class="text-xs text-slate-600">2XL</p>
              </div>
            </div>
          </div>

          <!-- Different users -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Different Users</h4>
            <div class="flex items-center space-x-4">
              <div v-for="user in sampleUsers" :key="user.id" class="text-center space-y-2">
                <Avatar :user="user" size="lg" show-online-status />
                <p class="text-sm font-medium text-slate-700">{{ user.name }}</p>
              </div>
            </div>
          </div>

          <!-- With badges -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">With Notifications</h4>
            <div class="flex items-center space-x-4">
              <Avatar :user="sampleUsers[0]" size="lg" :badge="3" />
              <Avatar :user="sampleUsers[1]" size="lg" :badge="12" />
              <Avatar :user="sampleUsers[2]" size="lg" :badge="99" />
              <Avatar :user="sampleUsers[3]" size="lg" :badge="150" />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Loading Components Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">⏳ Loading Components</h3>
        </template>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Skeleton Loading -->
          <div class="space-y-4">
            <h4 class="font-semibold text-slate-700">Skeleton Loading</h4>
            <SkeletonLoader type="card" />
            <SkeletonLoader type="list" />
            <SkeletonLoader type="text" :lines="4" />
          </div>
          
          <!-- Spinner Loading -->
          <div class="space-y-4">
            <h4 class="font-semibold text-slate-700">Spinner Loading</h4>
            <div class="space-y-4">
              <LoadingSpinner size="sm" text="Loading..." />
              <LoadingSpinner size="md" color="emerald" text="Processing..." />
              <LoadingSpinner size="lg" color="violet" text="Uploading..." />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Empty State Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">📭 Empty State Component</h3>
        </template>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">No Projects</h4>
            <EmptyState
              icon="i-heroicons-briefcase"
              title="No Projects Found"
              description="You haven't created any projects yet. Get started by creating your first project."
              action-text="Create Project"
              action-icon="i-heroicons-plus"
              @action="handleCreateProject"
            />
          </div>
          
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">No Stock Items</h4>
            <EmptyState
              icon="i-heroicons-cube"
              title="No Stock Items"
              description="Your inventory is empty. Add some stock items to get started."
              action-text="Add Stock Item"
              action-color="emerald"
              @action="handleAddStock"
            />
          </div>
        </div>
      </UCard>

      <!-- Project Cards Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-800">🎴 Project Cards</h3>
            <UButton 
              variant="outline" 
              size="sm"
              @click="toggleProjectsLoading"
              :loading="projectsLoading"
            >
              {{ projectsLoading ? 'Loading...' : 'Toggle Loading' }}
            </UButton>
          </div>
        </template>
        
        <!-- Loading State -->
        <div v-if="projectsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonLoader v-for="n in 3" :key="n" type="card" />
        </div>
        
        <!-- Loaded State -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard 
            v-for="project in sampleProjects" 
            :key="project.id"
            :project="project"
            @click="handleProjectClick(project.id)"
          />
        </div>
      </UCard>

      <!-- Project Table Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-800">📊 Project Table</h3>
            <UButton 
              variant="outline" 
              size="sm"
              @click="toggleTableLoading"
              :loading="tableLoading"
            >
              {{ tableLoading ? 'Loading...' : 'Toggle Loading' }}
            </UButton>
          </div>
        </template>
        
        <!-- Loading State -->
        <div v-if="tableLoading" class="space-y-0 bg-white rounded-lg border overflow-hidden">
          <SkeletonLoader v-for="n in 5" :key="n" type="table-row" />
        </div>
        
        <!-- Loaded State -->
        <ProjectTable 
          v-else
          :projects="sampleProjects"
          @view="handleProjectView"
          @edit="handleProjectEdit"
          @delete="handleProjectDelete"
        />
      </UCard>

      <!-- Component Library Summary -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">📚 Component Library</h3>
        </template>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-sky-50 to-sky-100 p-4 rounded-lg border border-sky-200">
            <h4 class="font-bold text-sky-800 mb-2">Base Components</h4>
            <ul class="text-sm text-sky-700 space-y-1">
              <li>✅ PriorityBadge</li>
              <li>✅ ProgressBar</li>
              <li>✅ Avatar</li>
              <li>⏳ StatusBadge</li>
              <li>⏳ Button</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
            <h4 class="font-bold text-emerald-800 mb-2">UI Components</h4>
            <ul class="text-sm text-emerald-700 space-y-1">
              <li>✅ SkeletonLoader</li>
              <li>✅ LoadingSpinner</li>
              <li>✅ EmptyState</li>
              <li>⏳ Modal</li>
              <li>⏳ Tooltip</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-violet-50 to-violet-100 p-4 rounded-lg border border-violet-200">
            <h4 class="font-bold text-violet-800 mb-2">Business Components</h4>
            <ul class="text-sm text-violet-700 space-y-1">
              <li>✅ ProjectCard</li>
              <li>✅ ProjectTable</li>
              <li>⏳ StockItemCard</li>
              <li>⏳ CategoryCard</li>
              <li>⏳ UserCard</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <h4 class="font-bold text-orange-800 mb-2">Form Components</h4>
            <ul class="text-sm text-orange-700 space-y-1">
              <li>✅ SearchBox</li>
              <li>⏳ FormInput</li>
              <li>⏳ FormSelect</li>
              <li>⏳ DatePicker</li>
              <li>⏳ FileUpload</li>
            </ul>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Meta
definePageMeta({
  middleware: 'auth'
})

// Loading states
const projectsLoading = ref(false)
const tableLoading = ref(false)

// Sample data for showcase
const user = ref({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: null
})

const sampleUsers = ref([
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: null },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatar: null },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', avatar: null },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', avatar: null }
])

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

// Event handlers
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
}

const handleProjectView = (projectId) => {
  console.log('View project:', projectId)
}

const handleProjectEdit = (projectId) => {
  console.log('Edit project:', projectId)
}

const handleProjectDelete = (projectId) => {
  console.log('Delete project:', projectId)
}

const handleCreateProject = () => {
  console.log('Create new project')
}

const handleAddStock = () => {
  console.log('Add new stock item')
}
</script>