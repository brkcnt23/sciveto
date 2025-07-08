<!-- apps/web/components/ProjectTable.vue -->
<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Project
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Progress
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Client
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Budget
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Deadline
          </th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr 
          v-for="project in projects" 
          :key="project.id"
          class="hover:bg-gray-50 cursor-pointer"
          @click="$emit('view', project.id)"
        >
          <!-- Project Info -->
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon name="i-heroicons-briefcase" class="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ project.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ project.projectCode }}
                </div>
              </div>
            </div>
          </td>

          <!-- Status -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center space-x-2">
              <UBadge 
                :color="getStatusColor(project.status)"
                size="sm"
                class="uppercase"
              >
                {{ project.status }}
              </UBadge>
              <UBadge 
                :color="getPriorityColor(project.priority)"
                variant="outline"
                size="xs"
              >
                {{ project.priority }}
              </UBadge>
            </div>
          </td>

          <!-- Progress -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center space-x-3">
              <div class="flex-1">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full"
                    :style="{ width: `${project.completionPercentage}%` }"
                  ></div>
                </div>
              </div>
              <span class="text-sm font-medium text-gray-900 w-10">
                {{ project.completionPercentage }}%
              </span>
            </div>
          </td>

          <!-- Client -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ project.clientName }}</div>
            <div class="text-sm text-gray-500">{{ project.manager.name }}</div>
          </td>

          <!-- Budget -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">
              ${{ formatCurrency(project.estimatedCost) }}
            </div>
            <div class="text-sm text-gray-500">
              Spent: ${{ formatCurrency(project.actualCost) }}
            </div>
          </td>

          <!-- Deadline -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm" :class="getDeadlineColor(project.deadline)">
              {{ formatDate(project.deadline) }}
            </div>
            <div class="text-xs text-gray-500">
              {{ getDaysUntilDeadline(project.deadline) }}
            </div>
          </td>

          <!-- Actions -->
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex items-center justify-end space-x-2">
              <UButton
                size="xs"
                variant="ghost"
                icon="i-heroicons-eye"
                @click.stop="$emit('view', project.id)"
              >
                View
              </UButton>
              <UButton
                size="xs"
                variant="ghost"
                icon="i-heroicons-pencil"
                @click.stop="$emit('edit', project.id)"
              >
                Edit
              </UButton>
              <UButton
                size="xs"
                variant="ghost"
                icon="i-heroicons-trash"
                color="red"
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
defineProps({
  projects: {
    type: Array,
    required: true
  }
})

defineEmits(['view', 'edit', 'delete'])

// Status colors
const getStatusColor = (status) => {
  const colors = {
    planning: 'blue',
    reserving: 'yellow',
    offering: 'purple',
    designing: 'indigo',
    manufacturing: 'orange',
    collecting: 'green',
    completed: 'emerald'
  }
  return colors[status] || 'gray'
}

// Priority colors  
const getPriorityColor = (priority) => {
  const colors = {
    LOW: 'green',
    MEDIUM: 'yellow',
    HIGH: 'orange', 
    URGENT: 'red'
  }
  return colors[priority] || 'gray'
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
  
  if (daysUntil < 0) return 'text-red-600' // Overdue
  if (daysUntil <= 7) return 'text-orange-600' // Due soon
  if (daysUntil <= 30) return 'text-yellow-600' // Due this month
  return 'text-gray-900' // Normal
}

// Days until deadline text
const getDaysUntilDeadline = (deadline) => {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`
  if (daysUntil === 0) return 'Due today'
  if (daysUntil === 1) return 'Due tomorrow'
  if (daysUntil <= 7) return `Due in ${daysUntil} days`
  if (daysUntil <= 30) return `Due in ${daysUntil} days`
  return `${daysUntil} days remaining`
}
</script>