<!-- apps/web/pages/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-200 via-slate-100 to-emerald-200">
    <!-- Header Component -->
    <Header :user="user" />

    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-8 space-y-8">
      <!-- Welcome Section -->
      <Card title="🚀 Component Showcase Dashboard" hover-effect>
        <p class="text-slate-600 mb-6">
          Bu sayfada projemizde kullanacağımız tüm base component'leri görebilirsiniz. 
          Her component doğal renkler ve modern tasarım prensipleri ile oluşturulmuştur.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-sky-50 p-4 rounded-lg">
            <h4 class="font-semibold text-sky-800">🎨 Layout Components</h4>
            <p class="text-sm text-sky-600 mt-1">Header, Sidebar, Footer, Breadcrumb</p>
          </div>
          <div class="bg-emerald-50 p-4 rounded-lg">
            <h4 class="font-semibold text-emerald-800">🔧 Core UI Components</h4>
            <p class="text-sm text-emerald-600 mt-1">Card, Table, Modal, Button, Badge</p>
          </div>
          <div class="bg-violet-50 p-4 rounded-lg">
            <h4 class="font-semibold text-violet-800">📊 Data Components</h4>
            <p class="text-sm text-violet-600 mt-1">ProgressBar, StatusIndicator, Avatar</p>
          </div>
        </div>
      </Card>

      <!-- Priority Badge Showcase -->
      <Card title="🏷️ Priority Badge Component">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="space-y-3">
            <h4 class="font-semibold text-slate-700">LOW Priority</h4>
            <PriorityBadge priority="LOW" />
          </div>
          <div class="space-y-3">
            <h4 class="font-semibold text-slate-700">MEDIUM Priority</h4>
            <PriorityBadge priority="MEDIUM" />
          </div>
          <div class="space-y-3">
            <h4 class="font-semibold text-slate-700">HIGH Priority</h4>
            <PriorityBadge priority="HIGH" />
          </div>
          <div class="space-y-3">
            <h4 class="font-semibold text-slate-700">URGENT Priority</h4>
            <PriorityBadge priority="URGENT" />
          </div>
        </div>
      </Card>

      <!-- Progress Bar Showcase -->
      <Card title="📊 Progress Bar Component">
        <div class="space-y-6">
          <ProgressBar :value="25" label="Planning Phase" />
          <ProgressBar :value="50" label="Development Phase" />
          <ProgressBar :value="75" label="Testing Phase" />
          <ProgressBar :value="95" label="Deployment Phase" animated />
          <ProgressBar :value="60" label="Custom Color" color="violet" />
        </div>
      </Card>

      <!-- Avatar Showcase -->
      <Card title="👤 Avatar Component">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div class="text-center space-y-2">
            <Avatar :user="{ firstName: 'John', lastName: 'Doe' }" size="xs" />
            <p class="text-xs text-slate-500">Extra Small</p>
          </div>
          <div class="text-center space-y-2">
            <Avatar :user="{ firstName: 'Jane', lastName: 'Smith' }" size="sm" />
            <p class="text-xs text-slate-500">Small</p>
          </div>
          <div class="text-center space-y-2">
            <Avatar :user="{ firstName: 'Mike', lastName: 'Wilson' }" size="md" />
            <p class="text-xs text-slate-500">Medium</p>
          </div>
          <div class="text-center space-y-2">
            <Avatar :user="{ firstName: 'Sarah', lastName: 'Johnson' }" size="lg" />
            <p class="text-xs text-slate-500">Large</p>
          </div>
          <div class="text-center space-y-2">
            <Avatar :user="{ firstName: 'Alex', lastName: 'Chen' }" size="xl" />
            <p class="text-xs text-slate-500">Extra Large</p>
          </div>
        </div>
      </Card>

      <!-- Loading & Skeleton Showcase -->
      <Card title="🔄 Loading Components">
        <div class="space-y-8">
          <!-- Loading Spinners -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Loading Spinners</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="space-y-4">
                <h5 class="text-sm font-medium text-slate-600">Different Sizes</h5>
                <div class="flex items-center space-x-4">
                  <LoadingSpinner size="xs" />
                  <LoadingSpinner size="sm" color="emerald" />
                  <LoadingSpinner size="md" color="violet" show-dot />
                  <LoadingSpinner size="lg" color="orange" />
                </div>
              </div>
              
              <div class="space-y-4">
                <h5 class="text-sm font-medium text-slate-600">With Text</h5>
                <LoadingSpinner text="Loading projects..." color="sky" />
                <LoadingSpinner text="Saving changes..." color="emerald" size="sm" />
              </div>
              
              <div class="space-y-4">
                <h5 class="text-sm font-medium text-slate-600">Interactive Demo</h5>
                <UButton @click="showFullScreenLoading" color="violet">
                  Show Full Screen Loading
                </UButton>
              </div>
            </div>
          </div>

          <!-- Skeleton Loaders -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Skeleton Loaders</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 class="text-sm font-medium text-slate-600 mb-2">Card Skeleton</h5>
                <SkeletonLoader type="card" />
              </div>
              <div>
                <h5 class="text-sm font-medium text-slate-600 mb-2">List Items</h5>
                <div class="space-y-2">
                  <SkeletonLoader type="list-item" />
                  <SkeletonLoader type="list-item" />
                  <SkeletonLoader type="list-item" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Empty State Showcase -->
      <Card title="📭 Empty State Component">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmptyState
            icon="i-heroicons-briefcase"
            title="No Projects Found"
            description="You haven't created any projects yet. Start by creating your first project."
            action-text="Create Project"
            action-icon="i-heroicons-plus"
            action-color="sky"
            @action="handleAction"
          />
          
          <EmptyState
            icon="i-heroicons-cube"
            title="Stock is Empty"
            description="Your inventory is currently empty. Add some stock items to get started."
            action-text="Add Stock Item"
            action-icon="i-heroicons-plus"
            action-color="emerald"
            @action="handleAction"
          />
        </div>
      </Card>

      <!-- Toast Demo -->
      <Card title="🔔 Toast Notifications">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UButton @click="showSuccessToast" color="emerald">
            Success Toast
          </UButton>
          <UButton @click="showErrorToast" color="rose">
            Error Toast
          </UButton>
          <UButton @click="showWarningToast" color="amber">
            Warning Toast
          </UButton>
          <UButton @click="showInfoToast" color="sky">
            Info Toast
          </UButton>
        </div>
        <p class="text-sm text-slate-600 mt-4">
          Click the buttons above to see different toast notifications!
        </p>
      </Card>

      <!-- Table Showcase -->
      <Card title="📋 Table Component">
        <Table 
          :data="sampleData"
          :columns="tableColumns"
          :actions="tableActions"
          @row-click="handleRowClick"
          @edit="handleEdit"
          @delete="handleDelete"
        >
          <template #cell-status="{ value }">
            <UBadge :color="getStatusColor(value)" size="sm" class="uppercase">
              {{ value }}
            </UBadge>
          </template>
          
          <template #cell-priority="{ value }">
            <PriorityBadge :priority="value" />
          </template>
          
          <template #cell-progress="{ value }">
            <div class="w-24">
              <ProgressBar :value="value" :show-label="false" height="2" />
            </div>
          </template>
          
          <template #cell-manager="{ value }">
            <div class="flex items-center space-x-2">
              <Avatar :user="{ firstName: value.split(' ')[0], lastName: value.split(' ')[1] }" size="xs" />
              <span class="text-sm">{{ value }}</span>
            </div>
          </template>
        </Table>
      </Card>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card hover-effect border-color="border-l-4 border-l-sky-500">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-sky-100 rounded-full">
              <Icon name="i-heroicons-briefcase" class="h-6 w-6 text-sky-600" />
            </div>
            <div>
              <p class="text-sm text-slate-600">Total Projects</p>
              <p class="text-2xl font-bold text-slate-900">24</p>
            </div>
          </div>
        </Card>

        <Card hover-effect border-color="border-l-4 border-l-emerald-500">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-emerald-100 rounded-full">
              <Icon name="i-heroicons-cube" class="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p class="text-sm text-slate-600">Stock Items</p>
              <p class="text-2xl font-bold text-slate-900">156</p>
            </div>
          </div>
        </Card>

        <Card hover-effect border-color="border-l-4 border-l-orange-500">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-orange-100 rounded-full">
              <Icon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p class="text-sm text-slate-600">Urgent Tasks</p>
              <p class="text-2xl font-bold text-slate-900">7</p>
            </div>
          </div>
        </Card>

        <Card hover-effect border-color="border-l-4 border-l-violet-500">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-violet-100 rounded-full">
              <Icon name="i-heroicons-currency-dollar" class="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <p class="text-sm text-slate-600">Total Budget</p>
              <p class="text-2xl font-bold text-slate-900">$2.4M</p>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Global Components -->
    <Toast />
    <LoadingSpinner 
      v-if="isFullScreenLoading"
      full-screen
      size="xl"
      text="Processing your request..."
      color="sky"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

// User data
const user = ref({
  email: 'test@sciveto.com',
  firstName: 'Test',
  lastName: 'User'
})

// Loading state
const isFullScreenLoading = ref(false)

// Sample data
const sampleData = ref([
  {
    id: 1,
    name: 'Industrial Conveyor System',
    status: 'manufacturing',
    priority: 'HIGH',
    progress: 65,
    manager: 'John Smith',
    budget: 125000
  },
  {
    id: 2,
    name: 'Custom Machine Parts', 
    status: 'designing',
    priority: 'MEDIUM',
    progress: 30,
    manager: 'Sarah Johnson',
    budget: 45000
  },
  {
    id: 3,
    name: 'Steel Frame Assembly',
    status: 'planning', 
    priority: 'URGENT',
    progress: 15,
    manager: 'Mike Wilson',
    budget: 75000
  }
])

const tableColumns = [
  { key: 'name', label: 'Project Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'priority', label: 'Priority', sortable: true },
  { key: 'progress', label: 'Progress', width: 'w-32' },
  { key: 'manager', label: 'Manager', sortable: true },
  { key: 'budget', label: 'Budget', format: 'currency' }
]

const tableActions = [
  { name: 'edit', label: 'Edit', color: 'emerald', icon: 'i-heroicons-pencil', event: 'edit' },
  { name: 'delete', label: 'Delete', color: 'rose', icon: 'i-heroicons-trash', event: 'delete' }
]

// Methods
const showFullScreenLoading = () => {
  isFullScreenLoading.value = true
  setTimeout(() => {
    isFullScreenLoading.value = false
    if (window.toast) window.toast.success('Loading completed!')
  }, 3000)
}

const showSuccessToast = () => {
  if (window.toast) window.toast.success('Operation completed successfully!', 'Success')
}

const showErrorToast = () => {
  if (window.toast) window.toast.error('Something went wrong!', 'Error')
}

const showWarningToast = () => {
  if (window.toast) window.toast.warning('Please check your input!', 'Warning')
}

const showInfoToast = () => {
  if (window.toast) window.toast.info('New features available!', 'Info')
}

const handleAction = () => {
  if (window.toast) window.toast.info('Action clicked!')
}

const handleRowClick = (item) => {
  console.log('Row clicked:', item.name)
}

const handleEdit = (item) => {
  if (window.toast) window.toast.info(`Editing ${item.name}`)
}

const handleDelete = (item) => {
  if (window.toast) window.toast.warning(`Delete ${item.name}?`)
}

const getStatusColor = (status) => {
  const colors = {
    planning: 'sky',
    designing: 'indigo', 
    manufacturing: 'orange',
    collecting: 'emerald',
    completed: 'green'
  }
  return colors[status] || 'stone'
}
</script>