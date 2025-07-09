<!-- apps/web/pages/projects/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-200 via-slate-100 to-emerald-200">
    <!-- Header -->
    <div class="bg-white/95 backdrop-blur-md shadow-lg border-b border-sky-200">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/dashboard" class="text-slate-500 hover:text-sky-600 transition-colors">
              <Icon name="i-heroicons-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Icon name="i-heroicons-briefcase" class="h-5 w-5 text-white" />
              </div>
              <h1 class="text-xl font-bold text-slate-800">Projects</h1>
            </div>
          </div>
          
          <UButton 
            to="/projects/create"
            icon="i-heroicons-plus"
            size="sm"
            class="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 shadow-lg text-white"
          >
            New Project
          </UButton>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <!-- Search & Filters -->
      <div class="mb-8">
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <UInput
                v-model="filters.search"
                placeholder="Search projects..."
                icon="i-heroicons-magnifying-glass"
                @input="debouncedSearch"
                class="bg-white"
              />
              
              <select 
                v-model="filters.status"
                class="px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                @change="fetchProjects"
              >
                <option value="">All Status</option>
                <option value="planning">🔵 Planning</option>
                <option value="reserving">🟡 Reserving</option>
                <option value="offering">🟣 Offering</option>
                <option value="designing">🔵 Designing</option>
                <option value="manufacturing">🟠 Manufacturing</option>
                <option value="collecting">🟢 Collecting</option>
                <option value="completed">✅ Completed</option>
              </select>
              
              <select 
                v-model="filters.priority"
                class="px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                @change="fetchProjects"
              >
                <option value="">All Priority</option>
                <option value="LOW">🟢 Low</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HIGH">🟠 High</option>
                <option value="URGENT">🔴 Urgent</option>
              </select>
              
              <UButton
                variant="outline"
                icon="i-heroicons-arrow-path"
                @click="resetFilters"
                class="border-gray-200 hover:bg-gray-50"
              >
                Reset
              </UButton>
              
              <UButton
                variant="outline"
                icon="i-heroicons-view-columns"
                @click="toggleView"
                class="border-gray-200 hover:bg-gray-50"
              >
                {{ viewMode === 'cards' ? '📊 Table' : '🎴 Cards' }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Projects Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <USkeleton v-for="n in 6" :key="n" class="h-80" />
      </div>

      <div v-else-if="projects.length === 0" class="text-center py-16">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-md mx-auto">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="i-heroicons-briefcase" class="h-10 w-10 text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">No projects found</h3>
          <p class="text-gray-600 mb-6">Get started by creating your first project.</p>
          <UButton 
            to="/projects/create" 
            icon="i-heroicons-plus"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
          >
            New Project
          </UButton>
        </div>
      </div>

      <!-- Cards View -->
      <div v-else-if="viewMode === 'cards'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.id"
          :project="project"
          @click="$router.push(`/projects/${project.id}`)"
        />
      </div>

      <!-- Table View -->
      <div v-else class="bg-white shadow rounded-lg overflow-hidden">
        <ProjectTable 
          :projects="projects"
          @view="(id) => $router.push(`/projects/${id}`)"
          @edit="(id) => $router.push(`/projects/${id}/edit`)"
          @delete="confirmDelete"
        />
      </div>

      <!-- Pagination -->
      <div v-if="projects.length > 0" class="mt-8 flex justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="meta.totalPages"
          :total="meta.total"
          show-last
          show-first
        />
      </div>
    </div>

    <!-- Delete Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Delete Project</h3>
        </template>
        
        <p class="text-gray-600">
          Are you sure you want to delete "{{ itemToDelete?.name }}"? This action cannot be undone.
        </p>
        
        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showDeleteModal = false">
              Cancel
            </UButton>
            <UButton 
              color="red" 
              :loading="deleting"
              @click="deleteProject"
            >
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

// Reactive data
const projects = ref([
  // Mock data for visualization
  {
    id: '1',
    name: 'Industrial Conveyor System',
    description: 'Complete conveyor belt system for factory automation',
    status: 'manufacturing',
    priority: 'HIGH',
    estimatedCost: 125000,
    actualCost: 89500,
    startDate: '2025-01-15',
    deadline: '2025-03-30',
    clientName: 'TechCorp Industries',
    projectCode: 'ICS-2025-001',
    manager: { name: 'John Smith' },
    materialCount: 24,
    completionPercentage: 65
  },
  {
    id: '2', 
    name: 'Custom Machine Parts',
    description: 'Precision machined components for automotive industry',
    status: 'designing',
    priority: 'MEDIUM',
    estimatedCost: 45000,
    actualCost: 12000,
    startDate: '2025-02-01',
    deadline: '2025-04-15',
    clientName: 'AutoParts Ltd',
    projectCode: 'CMP-2025-002',
    manager: { name: 'Sarah Johnson' },
    materialCount: 12,
    completionPercentage: 30
  },
  {
    id: '3',
    name: 'Steel Frame Assembly',
    description: 'Heavy-duty steel framework for construction project',
    status: 'planning',
    priority: 'URGENT',
    estimatedCost: 75000,
    actualCost: 0,
    startDate: '2025-02-10',
    deadline: '2025-05-20',
    clientName: 'BuildCorp',
    projectCode: 'SFA-2025-003',
    manager: { name: 'Mike Wilson' },
    materialCount: 8,
    completionPercentage: 15
  },
  {
    id: '4',
    name: 'Hydraulic System Upgrade',
    description: 'Modernization of existing hydraulic machinery',
    status: 'collecting',
    priority: 'LOW',
    estimatedCost: 28000,
    actualCost: 26800,
    startDate: '2024-12-01',
    deadline: '2025-02-28',
    clientName: 'Heavy Machinery Co',
    projectCode: 'HSU-2024-004',
    manager: { name: 'Lisa Chen' },
    materialCount: 15,
    completionPercentage: 95
  }
])

const loading = ref(false)
const deleting = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const currentPage = ref(1)
const viewMode = ref('cards')

const filters = reactive({
  search: '',
  status: '',
  priority: '',
})

const meta = ref({
  total: 4,
  page: 1,
  limit: 12,
  totalPages: 1
})

// Methods
const fetchProjects = async () => {
  loading.value = true
  try {
    // TODO: Replace with real API call
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Fetching projects with filters:', filters)
  } catch (error) {
    console.error('Error loading projects:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1
  fetchProjects()
}, 500)

const resetFilters = () => {
  Object.assign(filters, {
    search: '',
    status: '',
    priority: ''
  })
  currentPage.value = 1
  fetchProjects()
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'cards' ? 'table' : 'cards'
}

const confirmDelete = (project) => {
  itemToDelete.value = project
  showDeleteModal.value = true
}

const deleteProject = async () => {
  if (!itemToDelete.value) return
  
  deleting.value = true
  try {
    // TODO: Replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    projects.value = projects.value.filter(p => p.id !== itemToDelete.value.id)
    showDeleteModal.value = false
    console.log('Project deleted successfully')
  } catch (error) {
    console.error('Error deleting project:', error)
  } finally {
    deleting.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchProjects()
})
</script>