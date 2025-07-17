<!-- pages/projects/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Page Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <!-- Title Section -->
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-xl bg-primary-100 dark:bg-primary-900">
              <UIcon name="i-lucide-briefcase" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Projects Management
              </h1>
              <p class="text-gray-600 dark:text-gray-400 mt-1">
                Manage your projects, track progress and allocate resources
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <UButton 
              variant="outline" 
              color="neutral"
              icon="i-lucide-download"
              @click="exportProjects"
            >
              Export
            </UButton>
            
            <UButton 
              color="primary"
              icon="i-lucide-plus"
              @click="createProject"
              :loading="creating"
            >
              New Project
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6 sm:px-6 lg:px-8">
      <!-- Stats Cards - Tairo Style -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <UCard 
          v-for="stat in projectStats" 
          :key="stat.key"
          class="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ stat.label }}
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {{ stat.value }}
              </p>
            </div>
            <div :class="[
              'p-3 rounded-full',
              stat.bgColor
            ]">
              <UIcon :name="stat.icon" :class="[
                'w-5 h-5',
                stat.iconColor
              ]" />
            </div>
          </div>
          
          <!-- Progress bar -->
          <div class="mt-4">
            <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{{ stat.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                :class="stat.progressColor"
                class="h-2 rounded-full transition-all duration-500"
                :style="{ width: stat.progress + '%' }"
              ></div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Filters & Controls -->
      <UCard class="mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center gap-4 p-6">
          <!-- Search -->
          <div class="flex-1">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="Search projects..."
              :loading="searching"
              class="max-w-sm"
            />
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap items-center gap-3">
            <USelect
              v-model="statusFilter"
              :options="statusOptions"
              placeholder="All Status"
              class="w-40"
            />
            
            <USelect
              v-model="priorityFilter"
              :options="priorityOptions"
              placeholder="All Priority"
              class="w-40"
            />

            <USelect
              v-model="categoryFilter"
              :options="categoryOptions"
              placeholder="All Categories"
              class="w-40"
            />

            <!-- View Toggle -->
            <div class="flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
              <UButton
                :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
                :color="viewMode === 'grid' ? 'primary' : 'neutral'"
                icon="i-lucide-grid-3x3"
                size="sm"
                @click="viewMode = 'grid'"
              />
              <UButton
                :variant="viewMode === 'table' ? 'solid' : 'ghost'"
                :color="viewMode === 'table' ? 'primary' : 'neutral'"
                icon="i-lucide-list"
                size="sm"
                @click="viewMode = 'table'"
              />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Projects Content -->
      <UCard>
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="p-6">
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="i" class="animate-pulse">
              <div class="bg-gray-200 dark:bg-gray-700 rounded-lg h-48"></div>
            </div>
          </div>

          <div v-else-if="filteredProjects.length === 0" class="text-center py-12">
            <UIcon name="i-lucide-folder-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              {{ searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating your first project' }}
            </p>
            <UButton color="primary" icon="i-lucide-plus" @click="createProject">
              Create Project
            </UButton>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              v-for="project in filteredProjects"
              :key="project.id"
              :project="project"
              @click="viewProject(project.id)"
              @edit="editProject(project.id)"
              @delete="deleteProject(project.id)"
            />
          </div>
        </div>

        <!-- Table View -->
        <div v-else>
          <UTable
            :data="filteredProjects"
            :columns="tableColumns"
            :loading="loading"
            :empty-state="{ 
              icon: 'i-lucide-folder-x', 
              label: 'No projects found.',
              description: searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating your first project'
            }"
          >
            <template #name-data="{ row }">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <UIcon name="i-lucide-folder" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">
                    {{ row.name }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    {{ row.projectCode }}
                  </div>
                </div>
              </div>
            </template>

            <template #status-data="{ row }">
              <UBadge 
                :color="getStatusColor(row.status)"
                :variant="getStatusVariant(row.status)"
              >
                {{ getStatusLabel(row.status) }}
              </UBadge>
            </template>

            <template #priority-data="{ row }">
              <UBadge 
                :color="getPriorityColor(row.priority)"
                variant="outline"
                size="xs"
              >
                {{ row.priority }}
              </UBadge>
            </template>

            <template #progress-data="{ row }">
              <div class="flex items-center gap-2">
                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: row.completionPercentage + '%' }"
                  ></div>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem]">
                  {{ row.completionPercentage }}%
                </span>
              </div>
            </template>

            <template #actions-data="{ row }">
              <div class="flex items-center gap-1">
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-lucide-eye"
                  size="xs"
                  @click="viewProject(row.id)"
                />
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-lucide-edit"
                  size="xs"
                  @click="editProject(row.id)"
                />
                <UButton
                  variant="ghost"
                  color="error"
                  icon="i-lucide-trash-2"
                  size="xs"
                  @click="deleteProject(row.id)"
                />
              </div>
            </template>
          </UTable>
        </div>

        <!-- Pagination -->
        <div v-if="filteredProjects.length > 0" class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalProjects) }} of {{ totalProjects }} projects
          </div>
          
          <div class="flex items-center gap-2">
            <UButton
              variant="outline"
              color="neutral"
              icon="i-lucide-chevron-left"
              size="xs"
              :disabled="currentPage === 1"
              @click="currentPage--"
            />
            
            <div class="flex items-center gap-1">
              <UButton
                v-for="page in visiblePages"
                :key="page"
                :variant="page === currentPage ? 'solid' : 'ghost'"
                :color="page === currentPage ? 'primary' : 'neutral'"
                size="xs"
                @click="currentPage = page"
              >
                {{ page }}
              </UButton>
            </div>
            
            <UButton
              variant="outline"
              color="neutral"
              icon="i-lucide-chevron-right"
              size="xs"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useDualToast } from '~/composables/useDualToast'

// Components - Import path düzeltildi
import ProjectCard from '~/components/projects/ProjectCard.vue'
import { useSeoMeta } from 'nuxt/app'

// Composables
const toast = useDualToast()
const router = useRouter()

// Types for better TypeScript support
type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold'
type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

// State
const loading = ref(true)
const creating = ref(false)
const searching = ref(false)
const viewMode = ref<'grid' | 'table'>('grid')

// Filters
const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')
const categoryFilter = ref('')

// Pagination
const currentPage = ref(1)
const pageSize = ref(12)

// Mock data - Replace with real API calls
const projects = ref([
  {
    id: '1',
    name: 'Website Redesign',
    projectCode: 'WEB-2024-001',
    description: 'Complete website redesign with modern UI/UX',
    status: 'in-progress',
    priority: 'HIGH',
    completionPercentage: 65,
    clientName: 'Tech Solutions Inc.',
    estimatedCost: 25000,
    actualCost: 15000,
    deadline: '2024-12-15',
    createdAt: '2024-10-01',
    categoryId: 'web-dev'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    projectCode: 'APP-2024-002',
    description: 'Native mobile application for iOS and Android',
    status: 'planning',
    priority: 'URGENT',
    completionPercentage: 25,
    clientName: 'StartupX',
    estimatedCost: 45000,
    actualCost: 8000,
    deadline: '2024-11-30',
    createdAt: '2024-09-15',
    categoryId: 'mobile-dev'
  },
  {
    id: '3',
    name: 'E-commerce Platform',
    projectCode: 'ECOM-2024-003',
    description: 'Full-featured e-commerce platform',
    status: 'completed',
    priority: 'MEDIUM',
    completionPercentage: 100,
    clientName: 'Retail Masters',
    estimatedCost: 60000,
    actualCost: 58000,
    deadline: '2024-10-30',
    createdAt: '2024-08-01',
    categoryId: 'web-dev'
  }
])

// Filter options
const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Planning', value: 'planning' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'On Hold', value: 'on-hold' }
]

const priorityOptions = [
  { label: 'All Priority', value: '' },
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
  { label: 'Urgent', value: 'URGENT' }
]

const categoryOptions = [
  { label: 'All Categories', value: '' },
  { label: 'Web Development', value: 'web-dev' },
  { label: 'Mobile Development', value: 'mobile-dev' },
  { label: 'Design', value: 'design' }
]

// Table columns
const tableColumns = [
  { key: 'name', label: 'Project' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'progress', label: 'Progress' },
  { key: 'clientName', label: 'Client' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'actions', label: '', sortable: false }
]

// Computed
const projectStats = computed(() => [
  {
    key: 'total',
    label: 'Total Projects',
    value: projects.value.length,
    icon: 'i-lucide-briefcase',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
    progress: 100,
    progressColor: 'bg-blue-500'
  },
  {
    key: 'active',
    label: 'Active Projects',
    value: projects.value.filter(p => p.status === 'in-progress').length,
    icon: 'i-lucide-play-circle',
    bgColor: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
    progress: 75,
    progressColor: 'bg-green-500'
  },
  {
    key: 'completed',
    label: 'Completed',
    value: projects.value.filter(p => p.status === 'completed').length,
    icon: 'i-lucide-check-circle',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    progress: 90,
    progressColor: 'bg-emerald-500'
  },
  {
    key: 'overdue',
    label: 'Overdue',
    value: 0, // Calculate based on deadline
    icon: 'i-lucide-alert-circle',
    bgColor: 'bg-red-100 dark:bg-red-900',
    iconColor: 'text-red-600 dark:text-red-400',
    progress: 15,
    progressColor: 'bg-red-500'
  }
])

const filteredProjects = computed(() => {
  let filtered = projects.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.name.toLowerCase().includes(query) ||
      project.projectCode.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.clientName.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(project => project.status === statusFilter.value)
  }

  if (priorityFilter.value) {
    filtered = filtered.filter(project => project.priority === priorityFilter.value)
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(project => project.categoryId === categoryFilter.value)
  }

  return filtered
})

const totalProjects = computed(() => filteredProjects.value.length)
const totalPages = computed(() => Math.ceil(totalProjects.value / pageSize.value))
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const getStatusColor = (status: string) => {
  const colors: Record<ProjectStatus, string> = {
    'planning': 'info',
    'in-progress': 'warning',
    'completed': 'success',
    'on-hold': 'neutral'
  }
  return colors[status as ProjectStatus] || 'neutral'
}

const getStatusVariant = (status: string) => {
  return status === 'completed' ? 'solid' : 'soft'
}

const getStatusLabel = (status: string) => {
  const labels: Record<ProjectStatus, string> = {
    'planning': 'Planning',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'on-hold': 'On Hold'
  }
  return labels[status as ProjectStatus] || status
}

const getPriorityColor = (priority: string) => {
  const colors: Record<ProjectPriority, string> = {
    'LOW': 'success',
    'MEDIUM': 'warning',
    'HIGH': 'error',
    'URGENT': 'error'
  }
  return colors[priority as ProjectPriority] || 'neutral'
}

// Actions
const createProject = () => {
  router.push('/projects/create')
}

const viewProject = (id: string) => {
  router.push(`/projects/${id}`)
}

const editProject = (id: string) => {
  router.push(`/projects/${id}/edit`)
}

const deleteProject = async (id: string) => {
  // Implement delete logic
  toast.warning('Delete Project', 'Are you sure you want to delete this project?')
}

const exportProjects = () => {
  // Implement export logic
  toast.success('Export Started', 'Your projects export will be ready shortly.')
}

// Watchers
watch([searchQuery], () => {
  searching.value = true
  setTimeout(() => {
    searching.value = false
  }, 500)
})

// Lifecycle
onMounted(async () => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

// Meta
definePageMeta({
  title: 'Projects',
  layout: 'default'
})

// SEO - Nuxt 3 auto-import
useSeoMeta({
  title: 'Projects Management - Sciveto',
  description: 'Manage your projects, track progress and allocate resources'
})
</script>