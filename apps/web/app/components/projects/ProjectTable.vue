<template>
  <div class="space-y-4">
    <!-- Table Controls -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <UInput 
          v-model="searchQuery" 
          placeholder="Search projects..." 
          icon="i-lucide-search"
          class="w-64"
        />
        <USelect 
          v-model="statusFilter" 
          :options="statusOptions" 
          placeholder="Filter by status"
          class="w-48"
        />
      </div>
      <div class="flex items-center gap-2">
        <UButton size="sm" variant="outline" @click="refreshData">
          <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-2" />
          Refresh
        </UButton>
        <UButton size="sm" color="primary" @click="$emit('create')">
          <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
          New Project
        </UButton>
      </div>
    </div>

    <!-- Project Table -->
    <UTable 
      :rows="filteredProjects" 
      :columns="columns"
      :loading="loading"
      class="bg-white dark:bg-neutral-800"
    >
      <!-- Project Name Column -->
      <template #name-data="{ row }">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-folder" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <div class="font-medium text-highlighted">{{ row.name }}</div>
            <div class="text-sm text-muted">{{ row.projectCode }}</div>
          </div>
        </div>
      </template>

      <!-- Client Column -->
      <template #client-data="{ row }">
        <div>
          <div class="font-medium text-highlighted">{{ row.clientName }}</div>
          <div class="text-sm text-muted">{{ row.manager?.name }}</div>
        </div>
      </template>

      <!-- Status Column -->
      <template #status-data="{ row }">
        <UBadge 
          :color="getStatusColor(row.status)" 
          variant="soft"
          size="sm"
        >
          {{ getStatusLabel(row.status) }}
        </UBadge>
      </template>

      <!-- Priority Column -->
      <template #priority-data="{ row }">
        <UBadge 
          :color="getPriorityColor(row.priority)" 
          variant="outline"
          size="sm"
        >
          {{ row.priority }}
        </UBadge>
      </template>

      <!-- Progress Column -->
      <template #progress-data="{ row }">
        <div class="space-y-1">
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted">{{ row.completionPercentage }}%</span>
          </div>
          <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-300"
              :class="getProgressColor(row.completionPercentage)"
              :style="{ width: `${row.completionPercentage}%` }"
            ></div>
          </div>
        </div>
      </template>

      <!-- Budget Column -->
      <template #budget-data="{ row }">
        <div class="text-right">
          <div class="font-medium text-highlighted">${{ formatNumber(row.estimatedCost) }}</div>
          <div class="text-sm text-muted">${{ formatNumber(row.actualCost) }} spent</div>
        </div>
      </template>

      <!-- Deadline Column -->
      <template #deadline-data="{ row }">
        <div class="text-right">
          <div class="font-medium text-highlighted">{{ formatDate(row.deadline) }}</div>
          <div class="text-sm" :class="getDeadlineColor(row.deadline)">
            {{ getDeadlineStatus(row.deadline) }}
          </div>
        </div>
      </template>

      <!-- Actions Column -->
      <template #actions-data="{ row }">
        <UDropdown :items="getActions(row)">
          <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" size="sm" />
        </UDropdown>
      </template>
    </UTable>

    <!-- Empty State -->
    <div v-if="filteredProjects.length === 0 && !loading" class="text-center py-12">
      <UIcon name="i-lucide-folder-x" class="w-12 h-12 text-neutral-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-highlighted mb-2">No projects found</h3>
      <p class="text-muted mb-6">
        {{ searchQuery ? 'Try adjusting your search criteria' : 'Get started by creating your first project' }}
      </p>
      <UButton v-if="!searchQuery" color="primary" @click="$emit('create')">
        <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
        Create Project
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  projects: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['view', 'edit', 'delete', 'create', 'refresh'])

// Reactive state
const searchQuery = ref('')
const statusFilter = ref('')

// Table columns
const columns = ref([
  { id: 'name', key: 'name', label: 'Project' },
  { id: 'client', key: 'client', label: 'Client' },
  { id: 'status', key: 'status', label: 'Status' },
  { id: 'priority', key: 'priority', label: 'Priority' },
  { id: 'progress', key: 'progress', label: 'Progress' },
  { id: 'budget', key: 'budget', label: 'Budget' },
  { id: 'deadline', key: 'deadline', label: 'Deadline' },
  { id: 'actions', key: 'actions', label: 'Actions' }
])

// Filter options
const statusOptions = ref([
  { label: 'All Status', value: '' },
  { label: 'Planning', value: 'planning' },
  { label: 'Designing', value: 'designing' },
  { label: 'Development', value: 'manufacturing' },
  { label: 'Testing', value: 'testing' },
  { label: 'Completed', value: 'completed' },
  { label: 'On Hold', value: 'on-hold' }
])

// Computed properties
const filteredProjects = computed(() => {
  let filtered = props.projects

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.name.toLowerCase().includes(query) ||
      project.clientName.toLowerCase().includes(query) ||
      project.projectCode.toLowerCase().includes(query)
    )
  }

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter(project => project.status === statusFilter.value)
  }

  return filtered
})

// Helper functions
const getStatusColor = (status) => {
  const colors = {
    planning: 'neutral',
    designing: 'secondary',
    manufacturing: 'primary',
    testing: 'warning',
    completed: 'success',
    'on-hold': 'error'
  }
  return colors[status] || 'neutral'
}

const getStatusLabel = (status) => {
  const labels = {
    planning: 'Planning',
    designing: 'Designing',
    manufacturing: 'Development',
    testing: 'Testing',
    completed: 'Completed',
    'on-hold': 'On Hold'
  }
  return labels[status] || status
}

const getPriorityColor = (priority) => {
  const colors = {
    LOW: 'neutral',
    MEDIUM: 'primary',
    HIGH: 'warning',
    URGENT: 'error'
  }
  return colors[priority] || 'neutral'
}

const getProgressColor = (percentage) => {
  if (percentage >= 80) return 'bg-success-500'
  if (percentage >= 60) return 'bg-primary-500'
  if (percentage >= 40) return 'bg-warning-500'
  return 'bg-error-500'
}

const getDeadlineColor = (deadline) => {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'text-error-600'
  if (diffDays <= 7) return 'text-warning-600'
  return 'text-muted'
}

const getDeadlineStatus = (deadline) => {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`
  if (diffDays === 0) return 'Due today'
  if (diffDays <= 7) return `${diffDays} days left`
  return `${diffDays} days left`
}

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getActions = (row) => {
  return [
    [{
      label: 'View Details',
      icon: 'i-lucide-eye',
      click: () => emit('view', row.id)
    }],
    [{
      label: 'Edit Project',
      icon: 'i-lucide-edit',
      click: () => emit('edit', row.id)
    }, {
      label: 'Duplicate',
      icon: 'i-lucide-copy',
      click: () => duplicateProject(row)
    }],
    [{
      label: 'Delete Project',
      icon: 'i-lucide-trash',
      click: () => emit('delete', row.id)
    }]
  ]
}

const refreshData = () => {
  emit('refresh')
}

const duplicateProject = (project) => {
  // Handle project duplication
  console.log('Duplicating project:', project)
}
</script>