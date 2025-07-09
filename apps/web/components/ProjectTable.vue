<!-- apps/web/components/ProjectTable.vue -->
<template>
  <div class="overflow-x-auto bg-white rounded-xl shadow-lg">
    <table class="min-w-full divide-y divide-stone-200">
      <thead class="bg-gradient-to-r from-slate-50 to-stone-100">
        <tr>
          <th 
            class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-stone-200 transition-colors"
            @click="sort('name')"
          >
            <div class="flex items-center space-x-2">
              <span>Project</span>
              <Icon v-if="sortField === 'name'" :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="h-4 w-4" />
            </div>
          </th>
          <th 
            class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-stone-200 transition-colors"
            @click="sort('status')"
          >
            <div class="flex items-center space-x-2">
              <span>Status</span>
              <Icon v-if="sortField === 'status'" :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="h-4 w-4" />
            </div>
          </th>
          <th 
            class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-stone-200 transition-colors"
            @click="sort('progress')"
          >
            <div class="flex items-center space-x-2">
              <span>Progress</span>
              <Icon v-if="sortField === 'progress'" :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="h-4 w-4" />
            </div>
          </th>
          <th 
            class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-stone-200 transition-colors"
            @click="sort('client')"
          >
            <div class="flex items-center space-x-2">
              <span>Client</span>
              <Icon v-if="sortField === 'client'" :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="h-4 w-4" />
            </div>
          </th>
          <th 
            class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-stone-200 transition-colors"
            @click="sort('budget')"
          >
            <div class="flex items-center space-x-2">
              <span>Budget</span>
              <Icon v-if="sortField === 'budget'" :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="h-4 w-4" />
            </div>
          </th>
          <th 
            class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-stone-200 transition-colors"
            @click="sort('deadline')"
          >
            <div class="flex items-center space-x-2">
              <span>Deadline</span>
              <Icon v-if="sortField === 'deadline'" :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="h-4 w-4" />
            </div>
          </th>
          <th class="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-stone-100">
        <tr 
          v-for="project in sortedProjects" 
          :key="project.id"
          class="hover:bg-gradient-to-r hover:from-sky-50 hover:to-stone-50 cursor-pointer transition-all duration-200"
          @click="$emit('view', project.id)"
        >
          <!-- Project Info -->
          <td class="px-6 py-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-xl flex items-center justify-center text-white text-lg shadow-md"
                     :class="getStatusGradient(project.status)">
                  {{ getProjectIcon(project.name) }}
                </div>
              </div>
              <div class="ml-4">
                <div class="text-sm font-bold text-slate-900">
                  {{ project.name }}
                </div>
                <div class="text-sm text-slate-500 font-mono">
                  {{ project.projectCode }}
                </div>
              </div>
            </div>
          </td>

          <!-- Status -->
          <td class="px-6 py-5 whitespace-nowrap">
            <div class="space-y-2">
              <UBadge 
                :color="getStatusColor(project.status)"
                size="md"
                class="uppercase font-semibold px-3 py-1"
              >
                {{ project.status }}
              </UBadge>
              <UBadge 
                :color="getPriorityColor(project.priority)"
                variant="outline"
                size="sm"
                class="block w-fit"
              >
                {{ project.priority }}
              </UBadge>
            </div>
          </td>

          <!-- Progress -->
          <td class="px-6 py-5 whitespace-nowrap w-48">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-slate-700">
                  {{ project.completionPercentage }}%
                </span>
                <span class="text-xs text-slate-500">
                  Progress
                </span>
              </div>
              <div class="w-full bg-stone-200 rounded-full h-3 shadow-inner">
                <div 
                  class="h-3 rounded-full transition-all duration-500 shadow-sm"
                  :class="getProgressBarColor(project.completionPercentage)"
                  :style="{ width: `${project.completionPercentage}%` }"
                ></div>
              </div>
            </div>
          </td>

          <!-- Client -->
          <td class="px-6 py-5 whitespace-nowrap">
            <div class="space-y-1">
              <div class="text-sm font-bold text-slate-900">{{ project.clientName }}</div>
              <div class="text-sm text-slate-600">
                <Icon name="i-heroicons-user-circle" class="inline h-4 w-4 mr-1" />
                {{ project.manager.name }}
              </div>
            </div>
          </td>

          <!-- Budget -->
          <td class="px-6 py-5 whitespace-nowrap">
            <div class="space-y-1">
              <div class="text-sm font-bold text-slate-900">
                ${{ formatCurrency(project.estimatedCost) }}
              </div>
              <div class="text-xs text-slate-500">
                Spent: ${{ formatCurrency(project.actualCost) }}
              </div>
              <div class="w-16 bg-stone-200 rounded-full h-1">
                <div 
                  class="h-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                  :style="{ width: `${(project.actualCost / project.estimatedCost) * 100}%` }"
                ></div>
              </div>
            </div>
          </td>

          <!-- Deadline -->
          <td class="px-6 py-5 whitespace-nowrap">
            <div class="space-y-1">
              <div class="text-sm font-bold" :class="getDeadlineColor(project.deadline)">
                {{ formatDate(project.deadline) }}
              </div>
              <div class="text-xs text-slate-500">
                {{ getDaysUntilDeadline(project.deadline) }}
              </div>
            </div>
          </td>

          <!-- Actions -->
          <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex items-center justify-end space-x-2">
              <UButton
                size="xs"
                variant="soft"
                color="sky"
                icon="i-heroicons-eye"
                @click.stop="$emit('view', project.id)"
              >
                View
              </UButton>
              <UButton
                size="xs"
                variant="soft"
                color="emerald"
                icon="i-heroicons-pencil"
                @click.stop="$emit('edit', project.id)"
              >
                Edit
              </UButton>
              <UButton
                size="xs"
                variant="soft"
                color="rose"
                icon="i-heroicons-trash"
                @click.stop="$emit('delete', project)"
              >
                Delete
              </UButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['view', 'edit', 'delete'])

// Sorting state
const sortField = ref('')
const sortDirection = ref('asc')

// Status order for enum sorting
const statusOrder = {
  planning: 1,
  reserving: 2,
  offering: 3,
  designing: 4,
  manufacturing: 5,
  collecting: 6,
  completed: 7
}

// Computed sorted projects
const sortedProjects = computed(() => {
  if (!sortField.value) return props.projects
  
  return [...props.projects].sort((a, b) => {
    let aValue, bValue
    
    switch (sortField.value) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'status':
        aValue = statusOrder[a.status] || 999
        bValue = statusOrder[b.status] || 999
        break
      case 'progress':
        aValue = a.completionPercentage
        bValue = b.completionPercentage
        break
      case 'client':
        aValue = a.clientName.toLowerCase()
        bValue = b.clientName.toLowerCase()
        break
      case 'budget':
        aValue = a.estimatedCost
        bValue = b.estimatedCost
        break
      case 'deadline':
        aValue = new Date(a.deadline)
        bValue = new Date(b.deadline)
        break
      default:
        return 0
    }
    
    if (sortDirection.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
})

// Sort function
const sort = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

// Status colors - DOĞAL RENKLER 🌿
const getStatusColor = (status) => {
  const colors = {
    planning: 'sky',        // Gökyüzü mavisi
    reserving: 'amber',     // Bal rengi
    offering: 'violet',     // Menekşe
    designing: 'indigo',    // İndigo çiçeği
    manufacturing: 'orange', // Turuncu çiçek
    collecting: 'emerald',  // Zümrüt yeşili
    completed: 'green'      // Ağaç yeşili
  }
  return colors[status] || 'stone'
}

// Status gradient backgrounds
const getStatusGradient = (status) => {
  const gradients = {
    planning: 'bg-gradient-to-br from-sky-500 to-sky-600',
    reserving: 'bg-gradient-to-br from-amber-500 to-amber-600',
    offering: 'bg-gradient-to-br from-violet-500 to-violet-600',
    designing: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    manufacturing: 'bg-gradient-to-br from-orange-500 to-orange-600',
    collecting: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    completed: 'bg-gradient-to-br from-green-500 to-green-600'
  }
  return gradients[status] || 'bg-gradient-to-br from-stone-500 to-stone-600'
}

// Project icon based on name
const getProjectIcon = (name) => {
  if (name.includes('Conveyor')) return '🏭'
  if (name.includes('Machine')) return '⚙️'
  if (name.includes('Steel') || name.includes('Frame')) return '🏗️'
  if (name.includes('Hydraulic')) return '🔧'
  return '📋'
}

// Priority colors
const getPriorityColor = (priority) => {
  const colors = {
    LOW: 'emerald',     // Yeşil yaprak
    MEDIUM: 'amber',    // Sarı çiçek 
    HIGH: 'orange',     // Turuncu çiçek
    URGENT: 'rose'      // Pembe çiçek
  }
  return colors[priority] || 'stone'
}

// Progress bar colors - Doğal geçişler
const getProgressBarColor = (percentage) => {
  if (percentage >= 90) return 'bg-gradient-to-r from-emerald-400 to-emerald-600'  // Yeşil yaprak
  if (percentage >= 70) return 'bg-gradient-to-r from-sky-400 to-sky-600'          // Gökyüzü
  if (percentage >= 50) return 'bg-gradient-to-r from-amber-400 to-amber-600'      // Bal rengi
  if (percentage >= 30) return 'bg-gradient-to-r from-orange-400 to-orange-600'    // Turuncu çiçek
  return 'bg-gradient-to-r from-rose-400 to-rose-600'                              // Pembe çiçek
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Deadline color based on urgency
const getDeadlineColor = (deadline) => {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 0) return 'text-rose-600 font-bold'      // Pembe - gecikmiş
  if (daysUntil <= 7) return 'text-orange-600 font-bold'   // Turuncu - yakında
  if (daysUntil <= 30) return 'text-amber-600 font-semibold'  // Sarı - bu ay
  return 'text-slate-700 font-semibold'                    // Normal
}

// Days until deadline text
const getDaysUntilDeadline = (deadline) => {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`
  if (daysUntil === 0) return 'Due today!'
  if (daysUntil === 1) return 'Due tomorrow'
  if (daysUntil <= 7) return `${daysUntil} days left`
  return `${daysUntil} days remaining`
}
</script>