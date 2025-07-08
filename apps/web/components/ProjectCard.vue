<!-- apps/web/components/ProjectCard.vue -->
<template>
  <UCard class="hover:shadow-lg transition-all duration-200 cursor-pointer group">
    <div class="space-y-4">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
            {{ project.name }}
          </h3>
          <p class="text-sm text-gray-500 mt-1">{{ project.projectCode }}</p>
        </div>
        <div class="flex flex-col items-end space-y-2 ml-4">
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
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ project.description }}
      </p>

      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Progress</span>
          <span class="font-medium">{{ project.completionPercentage }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${project.completionPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Client & Manager -->
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-gray-500 block">Client</span>
          <span class="font-medium">{{ project.clientName }}</span>
        </div>
        <div>
          <span class="text-gray-500 block">Manager</span>
          <span class="font-medium">{{ project.manager.name }}</span>
        </div>
      </div>

      <!-- Cost & Timeline -->
      <div class="bg-gray-50 rounded-lg p-3 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Budget</span>
          <div class="text-right">
            <div class="font-medium">${{ formatCurrency(project.estimatedCost) }}</div>
            <div class="text-xs text-gray-500">
              Spent: ${{ formatCurrency(project.actualCost) }}
            </div>
          </div>
        </div>
        
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Deadline</span>
          <span class="font-medium" :class="getDeadlineColor()">
            {{ formatDate(project.deadline) }}
          </span>
        </div>
      </div>

      <!-- Materials Count -->
      <div class="flex items-center justify-between pt-2 border-t">
        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <Icon name="i-heroicons-cube" class="h-4 w-4" />
          <span>{{ project.materialCount }} materials</span>
        </div>
        
        <!-- Quick Actions -->
        <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <UButton
            size="xs"
            variant="ghost"
            icon="i-heroicons-eye"
            @click.stop="$emit('view', project.id)"
          />
          <UButton
            size="xs"
            variant="ghost"
            icon="i-heroicons-pencil"
            @click.stop="$emit('edit', project.id)"
          />
          <UButton
            size="xs"
            variant="ghost"
            icon="i-heroicons-trash"
            color="red"
            @click.stop="$emit('delete', project)"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
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
const getDeadlineColor = () => {
  const deadline = new Date(props.project.deadline)
  const today = new Date()
  const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 0) return 'text-red-600' // Overdue
  if (daysUntil <= 7) return 'text-orange-600' // Due soon
  if (daysUntil <= 30) return 'text-yellow-600' // Due this month
  return 'text-gray-900' // Normal
}
</script>