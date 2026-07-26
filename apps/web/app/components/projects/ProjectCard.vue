<!-- components/projects/ProjectCard.vue -->
<template>
  <UCard 
    class="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white dark:bg-neutral-800"
    @click="$emit('click')"
  >
    <!-- Card Header -->
    <template #header>
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <!-- Project Icon -->
          <div class="relative">
            <div :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200',
              getProjectIconBg(project.status)
            ]">
              <UIcon 
                :name="getProjectIcon(project.categoryId)" 
                :class="[
                  'w-6 h-6',
                  getProjectIconColor(project.status)
                ]"
              />
            </div>
            
            <!-- Status indicator -->
            <div :class="[
              'absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-800',
              getStatusIndicatorColor(project.status)
            ]"></div>
          </div>

          <!-- Project Info -->
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-neutral-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ project.name }}
            </h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ project.projectCode }}
            </p>
          </div>
        </div>

        <!-- Priority Badge -->
        <UBadge 
          :color="getPriorityColor(project.priority)"
          :variant="getPriorityVariant(project.priority)"
          size="xs"
        >
          {{ project.priority }}
        </UBadge>
      </div>
    </template>

    <!-- Card Content -->
    <div class="space-y-4">
      <!-- Description -->
      <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
        {{ project.description }}
      </p>

      <!-- Client & Progress Section -->
      <div class="space-y-3">
        <!-- Client -->
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-building" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-700 dark:text-neutral-300">{{ project.clientName }}</span>
        </div>

        <!-- Progress -->
        <div>
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="text-neutral-600 dark:text-neutral-400">Progress</span>
            <span class="font-medium text-neutral-900 dark:text-white">{{ project.completionPercentage }}%</span>
          </div>
          
          <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div 
              :class="getProgressColor(project.completionPercentage)"
              class="h-2 rounded-full transition-all duration-500 group-hover:shadow-lg"
              :style="{ width: project.completionPercentage + '%' }"
            ></div>
          </div>
        </div>

        <!-- Budget vs Actual -->
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-dollar-sign" class="w-4 h-4 text-neutral-500" />
            <span class="text-neutral-600 dark:text-neutral-400">Budget:</span>
            <span class="font-medium text-neutral-900 dark:text-white">
              ${{ formatCurrency(project.estimatedCost) }}
            </span>
          </div>
          
          <div class="flex items-center gap-1">
            <span class="text-neutral-600 dark:text-neutral-400">Spent:</span>
            <span :class="[
              'font-medium',
              project.actualCost > project.estimatedCost 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-green-600 dark:text-green-400'
            ]">
              ${{ formatCurrency(project.actualCost) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-calendar" class="w-4 h-4 text-neutral-500" />
          <span class="text-neutral-600 dark:text-neutral-400">Created:</span>
          <span class="text-neutral-900 dark:text-white">{{ formatDate(project.createdAt) }}</span>
        </div>
        
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-clock" class="w-4 h-4 text-neutral-500" />
          <span class="text-neutral-600 dark:text-neutral-400">Due:</span>
          <span :class="[
            'font-medium',
            isOverdue(project.deadline) 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-neutral-900 dark:text-white'
          ]">
            {{ formatDate(project.deadline) }}
          </span>
        </div>
      </div>

      <!-- Status Badge -->
      <div class="flex items-center justify-between">
        <UBadge 
          :color="getStatusColor(project.status)"
          :variant="getStatusVariant(project.status)"
          class="capitalize"
        >
          <UIcon :name="getStatusIcon(project.status)" class="w-3 h-3 mr-1" />
          {{ getStatusLabel(project.status) }}
        </UBadge>

        <!-- Overdue warning -->
        <div v-if="isOverdue(project.deadline) && project.status !== 'completed'" class="flex items-center gap-1">
          <UIcon name="i-lucide-alert-triangle" class="w-4 h-4 text-red-500" />
          <span class="text-xs text-red-600 dark:text-red-400 font-medium">Overdue</span>
        </div>
      </div>
    </div>

    <!-- Card Footer - Actions -->
    <template #footer>
      <div class="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <!-- Team members (if any) -->
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-users" class="w-4 h-4 text-neutral-500" />
          <span class="text-sm text-neutral-600 dark:text-neutral-400">Team: 3</span>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-lucide-eye"
            size="xs"
            @click.stop="$emit('click')"
          >
            View
          </UButton>
          
          <UDropdownMenu>
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-lucide-more-horizontal"
              size="xs"
              @click.stop
            />
            
            <template #content>
              <div class="py-1">
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-lucide-edit"
                  size="sm"
                  class="w-full justify-start"
                  @click.stop="$emit('edit')"
                >
                  Edit Project
                </UButton>
                
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-lucide-copy"
                  size="sm"
                  class="w-full justify-start"
                  @click.stop="duplicateProject"
                >
                  Duplicate
                </UButton>
                
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-lucide-archive"
                  size="sm"
                  class="w-full justify-start"
                  @click.stop="archiveProject"
                >
                  Archive
                </UButton>
                
                <div class="border-t border-neutral-200 dark:border-neutral-700 my-1"></div>
                
                <UButton
                  variant="ghost"
                  color="error"
                  icon="i-lucide-trash-2"
                  size="sm"
                  class="w-full justify-start"
                  @click.stop="$emit('delete')"
                >
                  Delete
                </UButton>
              </div>
            </template>
          </UDropdownMenu>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDualToast } from '~/composables/useDualToast'

// Props
interface Project {
  id: string
  name: string
  projectCode: string
  description: string
  status: string
  priority: string
  completionPercentage: number
  clientName: string
  estimatedCost: number
  actualCost: number
  deadline: string
  createdAt: string
  categoryId: string
}

const props = defineProps<{
  project: Project
}>()

// Emits
const emit = defineEmits<{
  click: []
  edit: []
  delete: []
}>()

// Composables
const toast = useDualToast()

// Types for better TypeScript support
type CategoryId = 'web-dev' | 'mobile-dev' | 'design' | 'marketing' | 'research'
type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold'
type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

// Methods
const getProjectIcon = (categoryId: string) => {
  const icons: Record<CategoryId, string> = {
    'web-dev': 'i-lucide-globe',
    'mobile-dev': 'i-lucide-smartphone',
    'design': 'i-lucide-palette',
    'marketing': 'i-lucide-megaphone',
    'research': 'i-lucide-microscope'
  }
  return icons[categoryId as CategoryId] || 'i-lucide-folder'
}

const getProjectIconBg = (status: string) => {
  const backgrounds: Record<ProjectStatus, string> = {
    'planning': 'bg-blue-100 dark:bg-blue-900',
    'in-progress': 'bg-amber-100 dark:bg-amber-900',
    'completed': 'bg-green-100 dark:bg-green-900',
    'on-hold': 'bg-neutral-100 dark:bg-neutral-700'
  }
  return backgrounds[status as ProjectStatus] || 'bg-neutral-100 dark:bg-neutral-700'
}

const getProjectIconColor = (status: string) => {
  const colors: Record<ProjectStatus, string> = {
    'planning': 'text-blue-600 dark:text-blue-400',
    'in-progress': 'text-amber-600 dark:text-amber-400',
    'completed': 'text-green-600 dark:text-green-400',
    'on-hold': 'text-neutral-600 dark:text-neutral-400'
  }
  return colors[status as ProjectStatus] || 'text-neutral-600 dark:text-neutral-400'
}

const getStatusIndicatorColor = (status: string) => {
  const colors: Record<ProjectStatus, string> = {
    'planning': 'bg-blue-500',
    'in-progress': 'bg-amber-500',
    'completed': 'bg-green-500',
    'on-hold': 'bg-neutral-500'
  }
  return colors[status as ProjectStatus] || 'bg-neutral-500'
}

const getStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colors: Record<ProjectStatus, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
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

const getStatusIcon = (status: string) => {
  const icons: Record<ProjectStatus, string> = {
    'planning': 'i-lucide-clock',
    'in-progress': 'i-lucide-play-circle',
    'completed': 'i-lucide-check-circle',
    'on-hold': 'i-lucide-pause-circle'
  }
  return icons[status as ProjectStatus] || 'i-lucide-circle'
}

const getPriorityColor = (priority: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colors: Record<ProjectPriority, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    'LOW': 'success',
    'MEDIUM': 'warning',
    'HIGH': 'error',
    'URGENT': 'error'
  }
  return colors[priority as ProjectPriority] || 'neutral'
}

const getPriorityVariant = (priority: string) => {
  return priority === 'URGENT' ? 'solid' : 'soft'
}

const getProgressColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-green-500'
  if (percentage >= 60) return 'bg-blue-500'
  if (percentage >= 40) return 'bg-yellow-500'
  if (percentage >= 20) return 'bg-orange-500'
  return 'bg-red-500'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

const isOverdue = (deadline: string) => {
  return new Date(deadline) < new Date()
}

const duplicateProject = () => {
  toast.success('Project Duplicated', `${props.project.name} has been duplicated.`)
}

const archiveProject = () => {
  toast.info('Project Archived', `${props.project.name} has been archived.`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>