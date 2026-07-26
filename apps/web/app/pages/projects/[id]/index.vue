<!-- pages/projects/[id]/index.vue -->
<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <!-- Loading State -->
    <div v-if="loading" class="p-6">
      <div class="animate-pulse space-y-6">
        <div class="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-1/3"></div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="h-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
        </div>
        <div class="h-96 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
      </div>
    </div>

    <!-- Project Content -->
    <div v-else-if="project" class="space-y-6">
      <!-- Header -->
      <div class="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div class="px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex items-start gap-4">
              <div :class="[
                'p-4 rounded-xl',
                getProjectIconBg(project.status)
              ]">
                <UIcon 
                  :name="getProjectIcon(project.categoryId)" 
                  :class="['w-8 h-8', getProjectIconColor(project.status)]"
                />
              </div>
              
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
                    {{ project.name }}
                  </h1>
                  <UBadge 
                    :color="getStatusColor(project.status)"
                    :variant="getStatusVariant(project.status)"
                  >
                    {{ getStatusLabel(project.status) }}
                  </UBadge>
                </div>
                
                <div class="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <span>{{ project.projectCode }}</span>
                  <span>•</span>
                  <span>{{ project.clientName }}</span>
                  <span>•</span>
                  <span>Due {{ formatDate(project.deadline) }}</span>
                </div>
                
                <p class="text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
                  {{ project.description }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <UButton variant="outline" color="neutral" icon="i-lucide-share">
                Share
              </UButton>
              <UButton variant="outline" color="neutral" icon="i-lucide-download">
                Export
              </UButton>
              <UButton color="primary" icon="i-lucide-edit" @click="editProject">
                Edit Project
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard class="relative overflow-hidden">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Progress</p>
                <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ project.completionPercentage }}%</p>
                <p class="text-sm text-green-600 dark:text-green-400 mt-1">On track</p>
              </div>
              <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <UIcon name="i-lucide-trending-up" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700">
              <div 
                class="h-full bg-blue-500 transition-all duration-500"
                :style="{ width: project.completionPercentage + '%' }"
              ></div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Budget</p>
                <p class="text-3xl font-bold text-neutral-900 dark:text-white">${{ formatCurrency(project.estimatedCost) }}</p>
                <p :class="[
                  'text-sm mt-1',
                  allocationsTotalCost > project.estimatedCost 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-green-600 dark:text-green-400'
                ]">
                  ${{ formatCurrency(allocationsTotalCost) }} allocated
                </p>
              </div>
              <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <UIcon name="i-lucide-dollar-sign" class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Timeline</p>
                <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ remainingDays }}</p>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">days remaining</p>
              </div>
              <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <UIcon name="i-lucide-calendar" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Team</p>
                <p class="text-3xl font-bold text-neutral-900 dark:text-white">{{ teamMembers.length }}</p>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">active members</p>
              </div>
              <div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <UIcon name="i-lucide-users" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Tabs -->
            <div class="flex flex-wrap items-center gap-2">
              <UButton
                :variant="activeTab === 'overview' ? 'solid' : 'outline'"
                color="primary"
                size="sm"
                @click="activeTab = 'overview'"
              >
                Overview
              </UButton>
              <UButton
                :variant="activeTab === 'materials' ? 'solid' : 'outline'"
                color="primary"
                size="sm"
                @click="activeTab = 'materials'"
              >
                Materials / BOM
              </UButton>
              <UButton
                :variant="activeTab === 'activity' ? 'solid' : 'outline'"
                color="primary"
                size="sm"
                @click="activeTab = 'activity'"
              >
                Activity
              </UButton>
            </div>

            <!-- Overview Tab -->
            <UCard v-if="activeTab === 'overview'">
              <template #header>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Budget vs Actual</h3>
              </template>

              <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Budget</p>
                    <p class="text-2xl font-bold text-neutral-900 dark:text-white">
                      ${{ formatCurrency(project.estimatedCost) }}
                    </p>
                  </div>
                  <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">Allocated</p>
                    <p class="text-2xl font-bold text-neutral-900 dark:text-white">
                      ${{ formatCurrency(allocationsTotalCost) }}
                    </p>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    <span>Budget usage</span>
                    <span class="font-medium text-neutral-900 dark:text-white">{{ budgetUsagePercent }}%</span>
                  </div>
                  <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div class="h-2 rounded-full bg-primary-500" :style="{ width: budgetUsagePercent + '%' }"></div>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Materials Tab -->
            <UCard v-else-if="activeTab === 'materials'">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Materials / BOM</h3>
                  <UButton variant="outline" size="sm" icon="i-lucide-plus" @click="showMaterialModal = true">
                    Add Material
                  </UButton>
                </div>
              </template>

              <div class="space-y-4">
                <div v-if="allocationItems.length === 0" class="text-sm text-neutral-500">
                  No materials allocated yet.
                </div>

                <div v-for="allocation in allocationItems" :key="allocation.id" 
                     class="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <div class="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                        <UIcon :name="getCategoryIcon(allocation.category)" 
                               class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h4 class="font-medium text-neutral-900 dark:text-white">{{ allocation.itemName }}</h4>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ allocation.category }}</p>
                      </div>
                    </div>
                    
                    <div class="text-right">
                      <div class="text-sm font-medium text-neutral-900 dark:text-white">
                        {{ allocation.allocatedQuantity }}/{{ allocation.requiredQuantity }} {{ allocation.unit }}
                      </div>
                      <div class="text-xs text-neutral-600 dark:text-neutral-400">
                        {{ getUsagePercentage(allocation) }}% allocated
                      </div>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-neutral-600 dark:text-neutral-400">Allocation Progress</span>
                      <span class="font-medium">{{ getUsagePercentage(allocation) }}%</span>
                    </div>
                    <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <div 
                        :class="getUsageColor(getUsagePercentage(allocation))"
                        class="h-2 rounded-full transition-all duration-300"
                        :style="{ width: getUsagePercentage(allocation) + '%' }"
                      ></div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                    <div class="text-sm text-neutral-600 dark:text-neutral-400">
                      Cost: ${{ formatCurrency(allocation.totalCost) }}
                    </div>
                    <div class="flex items-center gap-2">
                      <UBadge :color="allocation.status === 'RESERVED' ? 'info' : 'success'" variant="soft">
                        {{ allocation.status }}
                      </UBadge>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Activity Tab -->
            <UCard v-else>
              <template #header>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Recent Activity</h3>
              </template>

              <div class="space-y-4">
                <div v-for="activity in recentActivities" :key="activity.id" 
                     class="flex items-start gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                  <div :class="[
                    'p-2 rounded-full flex-shrink-0',
                    getActivityColor(activity.type)
                  ]">
                    <UIcon :name="getActivityIcon(activity.type)" class="w-4 h-4" />
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-neutral-900 dark:text-white">
                      {{ activity.title }}
                    </p>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                      {{ activity.description }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs text-neutral-500">{{ activity.user }}</span>
                      <span class="text-xs text-neutral-400">•</span>
                      <span class="text-xs text-neutral-500">{{ formatRelativeTime(activity.timestamp) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Project Info -->
            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Project Details</h3>
              </template>

              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-neutral-600 dark:text-neutral-400">Priority</span>
                  <UBadge :color="getPriorityColor(project.priority)" variant="soft">
                    {{ project.priority }}
                  </UBadge>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-sm text-neutral-600 dark:text-neutral-400">Start Date</span>
                  <span class="text-sm font-medium text-neutral-900 dark:text-white">
                    {{ formatDate(project.createdAt) }}
                  </span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-sm text-neutral-600 dark:text-neutral-400">Deadline</span>
                  <span :class="[
                    'text-sm font-medium',
                    isOverdue(project.deadline) 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-neutral-900 dark:text-white'
                  ]">
                    {{ formatDate(project.deadline) }}
                  </span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-sm text-neutral-600 dark:text-neutral-400">Manager</span>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-primary-600 dark:text-primary-400">
                        {{ project.manager?.name?.charAt(0) || 'PM' }}
                      </span>
                    </div>
                    <span class="text-sm font-medium text-neutral-900 dark:text-white">
                      {{ project.manager?.name || 'Project Manager' }}
                    </span>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Team Members -->
            <UCard>
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Team Members</h3>
                  <UButton variant="outline" size="sm" icon="i-lucide-user-plus">
                    Add Member
                  </UButton>
                </div>
              </template>

              <div class="space-y-3">
                <div v-for="member in teamMembers" :key="member.id" 
                     class="flex items-center justify-between p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {{ member.name.charAt(0) }}
                      </span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-neutral-900 dark:text-white">{{ member.name }}</div>
                      <div class="text-xs text-neutral-600 dark:text-neutral-400">{{ member.role }}</div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-1">
                    <div :class="[
                      'w-2 h-2 rounded-full',
                      member.isActive ? 'bg-green-500' : 'bg-neutral-400'
                    ]"></div>
                    <span class="text-xs text-neutral-500">
                      {{ member.isActive ? 'Active' : 'Offline' }}
                    </span>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Operations Panel -->
            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Operations</h3>
              </template>

              <div class="space-y-3">
                <UButton variant="outline" size="sm" class="w-full justify-start" icon="i-lucide-clipboard-check">
                  View Operations Panel
                </UButton>
                <UButton variant="outline" size="sm" class="w-full justify-start" icon="i-lucide-chart-bar">
                  Analytics Dashboard
                </UButton>
                <UButton variant="outline" size="sm" class="w-full justify-start" icon="i-lucide-file-text">
                  Generate Report
                </UButton>
                <UButton variant="outline" size="sm" class="w-full justify-start" icon="i-lucide-settings">
                  Project Settings
                </UButton>
              </div>
            </UCard>
          </div>
        </div>
      </div>

      <!-- Add Material Modal -->
      <UModal v-model="showMaterialModal">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Add Material</h3>
              <UButton variant="ghost" icon="i-lucide-x" @click="showMaterialModal = false" />
            </div>
          </template>

          <div class="space-y-4">
            <UFormGroup label="Inventory Item" required>
              <USelect
                v-model="allocationForm.stockItemId"
                :options="inventoryItems.map(item => ({ label: item.name, value: item.id }))"
                placeholder="Select inventory item"
                @change="setAllocationDefaults"
              />
            </UFormGroup>

            <div v-if="selectedInventoryItem" class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div class="flex items-center justify-between">
                <span>Available</span>
                <span class="font-medium text-neutral-900 dark:text-white">
                  {{ selectedInventoryItem.availableStock ?? selectedInventoryItem.stock ?? 0 }} {{ selectedInventoryItem.unit || 'pcs' }}
                </span>
              </div>
            </div>

            <UFormGroup label="Quantity" required>
              <UInput v-model.number="allocationForm.allocatedQuantity" type="number" min="1" />
            </UFormGroup>

            <UFormGroup label="Unit Price" required>
              <UInput v-model.number="allocationForm.allocatedPrice" type="number" min="0" step="0.01" />
            </UFormGroup>

            <UFormGroup label="Notes">
              <UTextarea v-model="allocationForm.notes" :rows="3" placeholder="Add optional notes" />
            </UFormGroup>
          </div>

          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton variant="outline" @click="showMaterialModal = false">Cancel</UButton>
              <UButton color="primary" :loading="submittingAllocation" :disabled="!canSubmitAllocation" @click="submitAllocation">
                Allocate Material
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </div>

    <!-- Error State -->
    <div v-else class="flex items-center justify-center min-h-[50vh]">
      <div class="text-center">
        <UIcon name="i-lucide-alert-circle" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Project not found</h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <UButton color="primary" @click="$router.push('/projects')">
          Back to Projects
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useDualToast } from '~/composables/useDualToast'
import { useProjects } from '~/composables/useProjects'
import { useInventory } from '~/composables/useInventory'
import type { StockItem } from '~/types/stock'

// Types
type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled'
type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

interface Project {
  id: string
  name: string
  projectCode: string
  description: string
  status: ProjectStatus
  priority: ProjectPriority
  completionPercentage: number
  clientName: string
  estimatedCost: number
  actualCost: number
  deadline: string
  createdAt: string
  categoryId: string
  manager?: {
    name: string
    email: string
  }
}

// Composables
const route = useRoute()
const router = useRouter()
const toast = useDualToast()
const { fetchProject, fetchProjectAllocations, allocateMaterial } = useProjects()
const { fetchInventory } = useInventory()

// State
const loading = ref(true)
const project = ref<Project | null>(null)
const allocations = ref<any[]>([])
const inventoryItems = ref<StockItem[]>([])
const activeTab = ref<'overview' | 'materials' | 'activity'>('overview')
const showMaterialModal = ref(false)
const submittingAllocation = ref(false)

const allocationForm = reactive({
  stockItemId: '',
  allocatedQuantity: 1,
  allocatedPrice: 0,
  notes: ''
})

// Mock activity (until audit trail is available)
const recentActivities = ref([
  {
    id: '1',
    type: 'progress',
    title: 'Project progress updated',
    description: 'Progress updated based on allocations',
    user: 'System',
    timestamp: new Date().toISOString()
  }
])

// Computed
const remainingDays = computed(() => {
  const deadline = new Date(project.value?.deadline || '')
  const today = new Date()
  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
})

const getCategoryName = (category?: StockItem['category']) => {
  if (!category) return 'Uncategorized'
  return typeof category === 'string' ? category : category.name || 'Uncategorized'
}

const allocationItems = computed(() => {
  return allocations.value.map(allocation => ({
    id: allocation.id,
    itemName: allocation.stockItem?.name || 'Unnamed Item',
    category: getCategoryName(allocation.stockItem?.category),
    allocatedQuantity: allocation.allocatedQuantity,
    usedQuantity: allocation.usedQuantity,
    requiredQuantity: allocation.requiredQuantity ?? allocation.allocatedQuantity,
    unit: allocation.stockItem?.unit || 'pcs',
    totalCost: allocation.totalAllocatedCost,
    status: allocation.status
  }))
})

const allocationsTotalCost = computed(() => {
  return allocationItems.value.reduce((sum, item) => sum + (item.totalCost || 0), 0)
})

const budgetUsagePercent = computed(() => {
  if (!project.value?.estimatedCost) return 0
  return Math.min(100, Math.round((allocationsTotalCost.value / project.value.estimatedCost) * 100))
})

const selectedInventoryItem = computed(() => {
  return inventoryItems.value.find(item => item.id === allocationForm.stockItemId)
})

const canSubmitAllocation = computed(() => {
  if (!allocationForm.stockItemId) return false
  if (allocationForm.allocatedQuantity <= 0) return false
  if (allocationForm.allocatedPrice <= 0) return false

  const available = selectedInventoryItem.value?.availableStock ?? selectedInventoryItem.value?.stock ?? 0
  return allocationForm.allocatedQuantity <= available
})

const teamMembers = computed(() => {
  const members = new Map<string, { id: string; name: string; role: string; isActive: boolean }>()

  if (project.value?.manager?.name) {
    members.set('manager', {
      id: 'manager',
      name: project.value.manager.name,
      role: 'Manager',
      isActive: true
    })
  }

  allocations.value.forEach((allocation: any) => {
    const user = allocation.user
    if (!user) return
    const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email
    members.set(user.id, {
      id: user.id,
      name,
      role: 'Contributor',
      isActive: true
    })
  })

  return Array.from(members.values())
})

// Methods
const normalizeStatus = (status: string): ProjectStatus => {
  if (!status) return 'planning'
  return status.toLowerCase().replace('_', '-') as ProjectStatus
}

const mapProject = (data: any): Project => {
  const managerName = data.manager
    ? [data.manager.firstName, data.manager.lastName].filter(Boolean).join(' ')
    : undefined

  return {
    id: data.id,
    name: data.name,
    projectCode: data.projectCode || 'N/A',
    description: data.description || '',
    status: normalizeStatus(data.status),
    priority: data.priority || 'MEDIUM',
    completionPercentage: data.completionPercentage ?? 0,
    clientName: data.clientName || '',
    estimatedCost: data.estimatedBudget ?? 0,
    actualCost: data.actualCost ?? 0,
    deadline: data.endDate || data.startDate || data.createdAt,
    createdAt: data.createdAt,
    categoryId: data.categoryId || 'general',
    manager: managerName
      ? {
          name: managerName,
          email: data.manager.email
        }
      : undefined
  }
}

const loadProject = async () => {
  const data = await fetchProject(route.params.id as string)
  project.value = mapProject(data)
}

const loadAllocations = async () => {
  allocations.value = await fetchProjectAllocations(route.params.id as string)
}

const loadInventoryItems = async () => {
  const response = await fetchInventory({ page: 1, limit: 200 })
  inventoryItems.value = Array.isArray(response) ? response : response?.data || []
}

const setAllocationDefaults = () => {
  if (!selectedInventoryItem.value) return
  allocationForm.allocatedPrice = selectedInventoryItem.value.price || selectedInventoryItem.value.lastPurchasePrice || 0
}

const submitAllocation = async () => {
  if (!allocationForm.stockItemId || allocationForm.allocatedQuantity <= 0) return

  submittingAllocation.value = true
  try {
    await allocateMaterial(route.params.id as string, {
      stockItemId: allocationForm.stockItemId,
      allocatedQuantity: allocationForm.allocatedQuantity,
      allocatedPrice: allocationForm.allocatedPrice,
      notes: allocationForm.notes || undefined
    })

    showMaterialModal.value = false
    allocationForm.stockItemId = ''
    allocationForm.allocatedQuantity = 1
    allocationForm.allocatedPrice = 0
    allocationForm.notes = ''

    await Promise.all([loadProject(), loadAllocations(), loadInventoryItems()])
    toast.success('Allocation added', 'Material allocated successfully')
  } catch (error) {
    console.error('Allocation error:', error)
    toast.error('Allocation failed', 'Unable to allocate material')
  } finally {
    submittingAllocation.value = false
  }
}

const getProjectIcon = (categoryId: string) => {
  const icons: Record<string, string> = {
    'construction': 'i-lucide-hammer',
    'web-dev': 'i-lucide-globe',
    'mobile-dev': 'i-lucide-smartphone'
  }
  return icons[categoryId] || 'i-lucide-folder'
}

const getProjectIconBg = (status: string) => {
  const backgrounds: Record<ProjectStatus, string> = {
    'planning': 'bg-blue-100 dark:bg-blue-900',
    'in-progress': 'bg-amber-100 dark:bg-amber-900',
    'completed': 'bg-green-100 dark:bg-green-900',
    'on-hold': 'bg-neutral-100 dark:bg-neutral-700',
    'cancelled': 'bg-red-100 dark:bg-red-900'
  }
  return backgrounds[status as ProjectStatus] || 'bg-neutral-100 dark:bg-neutral-700'
}

const getProjectIconColor = (status: string) => {
  const colors: Record<ProjectStatus, string> = {
    'planning': 'text-blue-600 dark:text-blue-400',
    'in-progress': 'text-amber-600 dark:text-amber-400',
    'completed': 'text-green-600 dark:text-green-400',
    'on-hold': 'text-neutral-600 dark:text-neutral-400',
    'cancelled': 'text-red-600 dark:text-red-400'
  }
  return colors[status as ProjectStatus] || 'text-neutral-600 dark:text-neutral-400'
}

const getStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colors: Record<ProjectStatus, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    'planning': 'info',
    'in-progress': 'warning',
    'completed': 'success',
    'on-hold': 'neutral',
    'cancelled': 'error'
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
    'on-hold': 'On Hold',
    'cancelled': 'Cancelled'
  }
  return labels[status as ProjectStatus] || status
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

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    'Membran': 'i-lucide-layers',
    'Fitil': 'i-lucide-cable',
    'Profil': 'i-lucide-box'
  }
  return icons[category] || 'i-lucide-package'
}

const getUsagePercentage = (allocation: any) => {
  if (!allocation.requiredQuantity) return 0
  return Math.round((allocation.allocatedQuantity / allocation.requiredQuantity) * 100)
}

const getUsageColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-green-500'
  if (percentage >= 70) return 'bg-yellow-500'
  return 'bg-blue-500'
}

const getActivityIcon = (type: string) => {
  const icons: Record<string, string> = {
    'progress': 'i-lucide-trending-up',
    'stock': 'i-lucide-package',
    'note': 'i-lucide-message-square'
  }
  return icons[type as 'progress' | 'stock' | 'note'] || 'i-lucide-circle'
}

const getActivityColor = (type: string) => {
  const colors: Record<string, string> = {
    'progress': 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
    'stock': 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
    'note': 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
  }
  return colors[type as 'progress' | 'stock' | 'note'] || 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  return `${Math.floor(diffInHours / 24)}d ago`
}

const isOverdue = (deadline: string) => {
  return new Date(deadline) < new Date()
}

const editProject = () => {
  router.push(`/projects/${route.params.id}/edit`)
}

// Lifecycle
onMounted(async () => {
  try {
    await Promise.all([loadProject(), loadAllocations()])
    await loadInventoryItems()
  } catch (error) {
    toast.error('Error', 'Failed to load project')
  } finally {
    loading.value = false
  }
})

// Meta
definePageMeta({
  title: 'Project Detail',
  layout: 'default'
})

useSeoMeta({
  title: 'Project Detail - Sciveto'
})
</script>