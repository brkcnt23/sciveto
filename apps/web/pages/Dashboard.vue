const sampleStockItems = ref([
  {
    id: '1',
    name: 'MacBook Pro 16" M3',
    sku: 'MBP-16-M3-001',
    description: 'High-performance laptop for development and design work. Features M3 chip with 16GB RAM and 512GB SSD.',
    price: 2499.99,
    stock: 8,
    unit: 'units',
    status: 'ACTIVE',
    category: { name: 'Electronics' },
    location: 'Tech Warehouse A',
    supplier: { name: 'Apple Inc.', contact: 'sales@apple.com' },
    updatedAt: '2024-12-10T10:30:00Z',
    imageUrl: null
  },
  {
    id: '2', 
    name: 'Cordless Drill Set',
    sku: 'DRILL-SET-001',
    description: 'Professional cordless drill set with multiple bits and carrying case. 18V lithium battery included.',
    price: 149.99,
    stock: 25,
    unit: 'sets',
    status: 'ACTIVE',
    category: { name: 'Tools' },
    location: 'Tool Storage B',
    supplier: { name: 'DeWalt Tools', contact: 'orders@dewalt.com' },
    updatedAt: '2024-12-09T14:15:00Z',
    imageUrl: null
  },
  {
    id: '3',
    name: 'Safety Helmets',
    sku: 'HELMET-SF-100',
    description: 'Industrial safety helmets meeting OSHA standards. Adjustable fit with chin strap.',
    price: 24.99,
    stock: 3,
    unit: 'pieces',
    status: 'ACTIVE',
    category: { name: 'Safety' },
    location: 'Safety Equipment',
    supplier: { name: 'SafetyFirst Corp', contact: 'info@safetyfirst.com' },
    updatedAt: '2024-12-08T09:45:00Z',
    imageUrl: null
  }
])

const sampleCategories = ref([
  {
    id: '1',
    name: 'Electronics',
    code: 'ELEC',
    description: 'Electronic devices, computers, and digital equipment for modern workplaces.',
    status: 'Active',
    itemCount: 45,
    totalValue: 125000,
    lowStockItems: 3,
    activeProjects: 12,
    popularItems: [
      { id: '1', name: 'MacBook Pro', price: 2499.99 },
      { id: '2', name: 'iPad Pro', price: 1099.99 },
      { id: '3', name: 'iPhone 15', price: 999.99 }
    ],
    lastActivity: '2024-12-10T15:20:00Z',
    lastActivityDescription: 'MacBook Pro added to inventory'
  },
  {
    id: '2',
    name: 'Tools',
    code: 'TOOL',
    description: 'Hand tools, power tools, and equipment for construction and maintenance work.',
    status: 'Active',
    itemCount: 78,
    totalValue: 35000,
    lowStockItems: 5,
    activeProjects: 8,
    popularItems: [
      { id: '4', name: 'Cordless Drill', price: 149.99 },
      { id: '5', name: 'Hammer Set', price: 89.99 },
      { id: '6', name: 'Screwdriver Kit', price: 45.99 }
    ],
    subcategories: [
      { id: '21', name: 'Power Tools' },
      { id: '22', name: 'Hand Tools' }
    ],
    lastActivity: '2024-12-09T11:30:00Z',
    lastActivityDescription: 'New drill set received'
  },
  {
    id: '3',
    name: 'Safety',
    code: 'SAFE',
    description: 'Personal protective equipment and safety gear for workplace protection.',
    status: 'Active',
    itemCount: 32,
    totalValue: 8500,
    lowStockItems: 8,
    activeProjects: 15,
    popularItems: [
      { id: '7', name: 'Safety Helmet', price: 24.99 },
      { id: '8', name: 'Safety Vest', price: 19.99 },
      { id: '9', name: 'Safety Gloves', price: 12.99 }
    ],
    parentCategory: { name: 'Equipment' },
    lastActivity: '2024-12-07T16:45:00Z',
    lastActivityDescription: 'Safety helmets low stock alert'
  }
])<!-- apps/web/pages/dashboard.vue -->
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
            <div class="space-y-2">
              <PriorityBadge priority="LOW" variant="solid" />
              <PriorityBadge priority="LOW" variant="soft" />
              <PriorityBadge priority="LOW" variant="outline" />
              <PriorityBadge priority="LOW" variant="subtle" />
            </div>
          </div>
          <div class="text-center space-y-3">
            <h4 class="font-semibold text-slate-700">MEDIUM Priority</h4>
            <div class="space-y-2">
              <PriorityBadge priority="MEDIUM" variant="solid" />
              <PriorityBadge priority="MEDIUM" variant="soft" />
              <PriorityBadge priority="MEDIUM" variant="outline" />
              <PriorityBadge priority="MEDIUM" variant="subtle" />
            </div>
          </div>
          <div class="text-center space-y-3">
            <h4 class="font-semibold text-slate-700">HIGH Priority</h4>
            <div class="space-y-2">
              <PriorityBadge priority="HIGH" variant="solid" />
              <PriorityBadge priority="HIGH" variant="soft" />
              <PriorityBadge priority="HIGH" variant="outline" />
              <PriorityBadge priority="HIGH" variant="subtle" />
            </div>
          </div>
          <div class="text-center space-y-3">
            <h4 class="font-semibold text-slate-700">URGENT Priority</h4>
            <div class="space-y-2">
              <PriorityBadge priority="URGENT" variant="solid" />
              <PriorityBadge priority="URGENT" variant="soft" />
              <PriorityBadge priority="URGENT" variant="outline" />
              <PriorityBadge priority="URGENT" variant="subtle" />
            </div>
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

      <!-- Tabs Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">📑 Tabs Component</h3>
        </template>
        
        <Tabs
          v-model="activeTab"
          :tabs="sampleTabs"
          @change="handleTabChange"
        >
          <template #overview>
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-700">Project Overview</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h5 class="font-semibold text-blue-800">Total Projects</h5>
                  <p class="text-2xl font-bold text-blue-600">24</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                  <h5 class="font-semibold text-green-800">Completed</h5>
                  <p class="text-2xl font-bold text-green-600">18</p>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg">
                  <h5 class="font-semibold text-orange-800">In Progress</h5>
                  <p class="text-2xl font-bold text-orange-600">6</p>
                </div>
              </div>
            </div>
          </template>

          <template #details>
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-700">Project Details</h4>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-600">Detailed project information, timelines, and specifications would be displayed here.</p>
                <ul class="mt-2 space-y-1 text-sm text-gray-500">
                  <li>• Project specifications</li>
                  <li>• Timeline and milestones</li>
                  <li>• Resource allocation</li>
                  <li>• Risk assessment</li>
                </ul>
              </div>
            </div>
          </template>

          <template #team>
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-700">Team Members</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="user in sampleUsers" :key="user.id" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar :user="user" size="md" show-online-status />
                  <div>
                    <p class="font-medium text-gray-900">{{ user.name }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #settings>
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-700">Project Settings</h4>
              <div class="space-y-4">
                <FormInput
                  v-model="settingsForm.name"
                  label="Project Name"
                  placeholder="Enter project name"
                  leading-icon="i-heroicons-folder"
                />
                <FormInput
                  v-model="settingsForm.description"
                  label="Description"
                  placeholder="Project description"
                  leading-icon="i-heroicons-document-text"
                />
                <div class="flex space-x-2">
                  <UButton color="blue" @click="saveSettings">Save Changes</UButton>
                  <UButton color="gray" variant="outline" @click="resetSettings">Reset</UButton>
                </div>
              </div>
            </div>
          </template>
        </Tabs>
      </UCard>

      <!-- Error Message Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">⚠️ Error Message Component</h3>
        </template>
        
        <div class="space-y-6">
          <!-- Error Types -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Error Types</h4>
            <div class="space-y-4">
              <ErrorMessage
                v-if="showErrorExample"
                type="error"
                title="Validation Error"
                :error="sampleErrors.validation"
                :show-retry="true"
                @retry="handleRetryError"
                dismissible
                @dismiss="showErrorExample = false"
              />
              
              <ErrorMessage
                v-if="showWarningExample"
                type="warning"
                title="Warning"
                error="This action cannot be undone. Please proceed with caution."
                dismissible
                @dismiss="showWarningExample = false"
              />
              
              <ErrorMessage
                v-if="showInfoExample"
                type="info"
                title="Information"
                error="Your session will expire in 5 minutes. Save your work to avoid losing changes."
                dismissible
                @dismiss="showInfoExample = false"
              />
            </div>
          </div>

          <!-- Control Buttons -->
          <div class="flex flex-wrap gap-2">
            <UButton 
              v-if="!showErrorExample"
              color="red" 
              variant="outline" 
              @click="showErrorExample = true"
            >
              Show Error
            </UButton>
            <UButton 
              v-if="!showWarningExample"
              color="amber" 
              variant="outline" 
              @click="showWarningExample = true"
            >
              Show Warning
            </UButton>
            <UButton 
              v-if="!showInfoExample"
              color="blue" 
              variant="outline" 
              @click="showInfoExample = true"
            >
              Show Info
            </UButton>
            <UButton 
              color="gray" 
              variant="soft" 
              @click="showAllErrors"
            >
              Show All
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- Form Input Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">📝 Form Input Component</h3>
        </template>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Input Examples -->
          <div class="space-y-6">
            <h4 class="font-semibold text-slate-700">Input Examples</h4>
            
            <FormInput
              v-model="formData.name"
              label="Full Name"
              placeholder="Enter your full name"
              leading-icon="i-heroicons-user"
              help-text="This will be displayed on your profile"
              required
            />
            
            <FormInput
              v-model="formData.email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              leading-icon="i-heroicons-envelope"
              :error="formErrors.email"
            />
            
            <FormInput
              v-model="formData.password"
              type="password"
              label="Password"
              placeholder="Enter password"
              leading-icon="i-heroicons-lock-closed"
              trailing-icon="i-heroicons-eye"
              :max-length="50"
              show-char-count
              @trailing-click="togglePasswordVisibility"
            />
            
            <FormInput
              v-model="formData.budget"
              type="number"
              label="Project Budget"
              placeholder="0.00"
              leading-icon="i-heroicons-currency-dollar"
              min="0"
              step="0.01"
            />
          </div>

          <!-- Input States -->
          <div class="space-y-6">
            <h4 class="font-semibold text-slate-700">Input States</h4>
            
            <FormInput
              v-model="formData.loading"
              label="Loading State"
              placeholder="Processing..."
              leading-icon="i-heroicons-clock"
              :loading="true"
              disabled
            />
            
            <FormInput
              v-model="formData.disabled"
              label="Disabled Input"
              placeholder="This field is disabled"
              leading-icon="i-heroicons-x-circle"
              disabled
            />
            
            <FormInput
              v-model="formData.readonly"
              label="Readonly Input"
              placeholder="This field is readonly"
              leading-icon="i-heroicons-lock-closed"
              readonly
            />
            
            <FormInput
              v-model="formData.search"
              type="search"
              label="Search"
              placeholder="Search anything..."
              leading-icon="i-heroicons-magnifying-glass"
              trailing-icon="i-heroicons-x-mark"
              @trailing-click="clearSearch"
            />
          </div>
        </div>
      </UCard>

      <!-- Status Indicator Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">🔍 Status Indicator Component</h3>
        </template>
        
        <div class="space-y-8">
          <!-- User Status -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">User Status</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="space-y-2">
                <StatusIndicator status="online" label="Online" size="lg" />
                <StatusIndicator status="away" label="Away" size="md" />
                <StatusIndicator status="busy" label="Busy" size="sm" />
                <StatusIndicator status="offline" label="Offline" size="xs" />
              </div>
            </div>
          </div>

          <!-- System Status -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">System Status</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span class="font-medium">API Server</span>
                <StatusIndicator status="live" label="Operational" pulse />
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span class="font-medium">Database</span>
                <StatusIndicator status="active" label="Connected" />
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span class="font-medium">File Storage</span>
                <StatusIndicator status="maintenance" label="Maintenance" pulse />
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span class="font-medium">Payment Gateway</span>
                <StatusIndicator status="error" label="Error" pulse />
              </div>
            </div>
          </div>

          <!-- Project Status -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Project Status</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium">Website Redesign</span>
                  <StatusIndicator status="active" label="In Progress" />
                </div>
                <p class="text-sm text-gray-600">75% complete</p>
              </div>
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium">Mobile App</span>
                  <StatusIndicator status="completed" label="Completed" />
                </div>
                <p class="text-sm text-gray-600">100% complete</p>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Modal Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">🪟 Modal Component</h3>
        </template>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UButton
            color="blue"
            @click="showModal = true"
          >
            Basic Modal
          </UButton>
          
          <UButton
            color="red"
            @click="showDeleteModal = true"
          >
            Delete Modal
          </UButton>
          
          <UButton
            color="green"
            @click="showFormModal = true"
          >
            Form Modal
          </UButton>
          
          <UButton
            color="purple"
            @click="showInfoModal = true"
          >
            Info Modal
          </UButton>
        </div>

        <!-- Modals -->
        <Modal
          v-model="showModal"
          title="Basic Modal"
          subtitle="This is a basic modal example"
          description="You can use this modal for general purposes like displaying information or simple confirmations."
          icon="i-heroicons-information-circle"
          @confirm="handleModalConfirm"
          @cancel="showModal = false"
        >
          <p>This is the modal content area. You can put any content here.</p>
        </Modal>

        <Modal
          v-model="showDeleteModal"
          title="Delete Project"
          description="Are you sure you want to delete this project? This action cannot be undone."
          icon="i-heroicons-trash"
          type="danger"
          confirm-text="Delete"
          @confirm="handleDeleteConfirm"
          @cancel="showDeleteModal = false"
        />

        <Modal
          v-model="showFormModal"
          title="Create New Project"
          subtitle="Fill in the details below"
          icon="i-heroicons-plus"
          type="success"
          confirm-text="Create"
          size="lg"
          @confirm="handleFormSubmit"
          @cancel="showFormModal = false"
        >
          <template #form>
            <div class="space-y-4">
              <FormInput
                v-model="modalForm.name"
                label="Project Name"
                placeholder="Enter project name"
                required
              />
              <FormInput
                v-model="modalForm.description"
                label="Description"
                placeholder="Project description"
              />
            </div>
          </template>
        </Modal>

        <Modal
          v-model="showInfoModal"
          title="System Information"
          icon="i-heroicons-cpu-chip"
          type="info"
          :show-cancel="false"
          confirm-text="Got it"
          @confirm="showInfoModal = false"
        >
          <div class="space-y-2">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Environment:</strong> Development</p>
            <p><strong>Last Updated:</strong> {{ new Date().toLocaleDateString() }}</p>
          </div>
        </Modal>
      </UCard>

      <!-- Form Components Extended Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">📋 Extended Form Components</h3>
        </template>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Form Select -->
          <div class="space-y-4">
            <h4 class="font-semibold text-slate-700">Form Select</h4>
            
            <FormSelect
              v-model="formData.priority"
              label="Priority Level"
              placeholder="Select priority"
              leading-icon="i-heroicons-flag"
              :options="priorityOptions"
              help-text="Choose the priority level for this task"
            />
            
            <FormSelect
              v-model="formData.category"
              label="Category"
              placeholder="Select category"
              :options="categoryOptions"
              :option-groups="categoryGroups"
              show-selected-value
            />
            
            <FormSelect
              v-model="formData.status"
              label="Status"
              :options="statusOptions"
              :loading="selectLoading"
              disabled
            />
          </div>

          <!-- Date Picker -->
          <div class="space-y-4">
            <h4 class="font-semibold text-slate-700">Date Picker</h4>
            
            <DatePicker
              v-model="formData.startDate"
              label="Start Date"
              placeholder="Select start date"
              leading-icon="i-heroicons-calendar-days"
              help-text="Choose the project start date"
            />
            
            <DatePicker
              v-model="formData.endDate"
              label="End Date"
              placeholder="Select end date"
              :min-date="formData.startDate"
              type="datetime-local"
            />
            
            <DatePicker
              v-model="formData.time"
              label="Meeting Time"
              type="time"
              placeholder="Select time"
            />
          </div>
        </div>
      </UCard>

      <!-- File Upload Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">📎 File Upload Component</h3>
        </template>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Single File Upload -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Single File Upload</h4>
            <FileUpload
              v-model="uploadedFiles.single"
              label="Profile Picture"
              accept="image/*"
              :max-size="2 * 1024 * 1024"
              help-text="Upload a profile picture (max 2MB)"
              @upload-success="handleUploadSuccess"
              @upload-error="handleUploadError"
            />
          </div>
          
          <!-- Multiple File Upload -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Multiple File Upload</h4>
            <FileUpload
              v-model="uploadedFiles.multiple"
              label="Project Documents"
              accept=".pdf,.doc,.docx,.jpg,.png"
              :multiple="true"
              :max-files="5"
              :max-size="10 * 1024 * 1024"
              help-text="Upload project documents (max 5 files, 10MB each)"
              auto-upload
              @upload-success="handleUploadSuccess"
              @upload-error="handleUploadError"
            />
          </div>
        </div>
      </UCard>

      <!-- Pagination Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">📄 Pagination Component</h3>
        </template>
        
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h5 class="font-semibold text-blue-800">Total Items</h5>
              <p class="text-2xl font-bold text-blue-600">{{ paginationData.total }}</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h5 class="font-semibold text-green-800">Current Page</h5>
              <p class="text-2xl font-bold text-green-600">{{ paginationData.currentPage }}</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h5 class="font-semibold text-purple-800">Per Page</h5>
              <p class="text-2xl font-bold text-purple-600">{{ paginationData.perPage }}</p>
            </div>
          </div>
          
          <Pagination
            :current-page="paginationData.currentPage"
            :total-pages="paginationData.totalPages"
            :total="paginationData.total"
            :per-page="paginationData.perPage"
            @page-change="handlePageChange"
          />
        </div>
      </UCard>

      <!-- Tooltip Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">💬 Tooltip Component</h3>
        </template>
        
        <div class="space-y-8">
          <!-- Tooltip Placements -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Tooltip Placements</h4>
            <div class="grid grid-cols-3 gap-4 place-items-center">
              <!-- Top row -->
              <Tooltip content="Top start tooltip" placement="top-start">
                <UButton variant="outline" size="sm">Top Start</UButton>
              </Tooltip>
              
              <Tooltip content="Top center tooltip" placement="top">
                <UButton variant="outline" size="sm">Top</UButton>
              </Tooltip>
              
              <Tooltip content="Top end tooltip" placement="top-end">
                <UButton variant="outline" size="sm">Top End</UButton>
              </Tooltip>
              
              <!-- Middle row -->
              <Tooltip content="Left tooltip with more content" placement="left">
                <UButton variant="outline" size="sm">Left</UButton>
              </Tooltip>
              
              <div class="text-center">
                <Tooltip content="Click me tooltip" trigger="click">
                  <UButton color="blue" size="sm">Click Me</UButton>
                </Tooltip>
              </div>
              
              <Tooltip content="Right tooltip" placement="right">
                <UButton variant="outline" size="sm">Right</UButton>
              </Tooltip>
              
              <!-- Bottom row -->
              <Tooltip content="Bottom start tooltip" placement="bottom-start">
                <UButton variant="outline" size="sm">Bottom Start</UButton>
              </Tooltip>
              
              <Tooltip content="Bottom center tooltip" placement="bottom">
                <UButton variant="outline" size="sm">Bottom</UButton>
              </Tooltip>
              
              <Tooltip content="Bottom end tooltip" placement="bottom-end">
                <UButton variant="outline" size="sm">Bottom End</UButton>
              </Tooltip>
            </div>
          </div>

          <!-- Tooltip Themes -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Tooltip Themes</h4>
            <div class="flex flex-wrap gap-3">
              <Tooltip content="Dark theme (default)" theme="dark">
                <UButton variant="outline" color="gray">Dark</UButton>
              </Tooltip>
              
              <Tooltip content="Light theme tooltip" theme="light">
                <UButton variant="outline" color="gray">Light</UButton>
              </Tooltip>
              
              <Tooltip content="Error theme tooltip" theme="error">
                <UButton variant="outline" color="red">Error</UButton>
              </Tooltip>
              
              <Tooltip content="Warning theme tooltip" theme="warning">
                <UButton variant="outline" color="amber">Warning</UButton>
              </Tooltip>
              
              <Tooltip content="Success theme tooltip" theme="success">
                <UButton variant="outline" color="green">Success</UButton>
              </Tooltip>
            </div>
          </div>

          <!-- Advanced Tooltips -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Advanced Features</h4>
            <div class="flex flex-wrap gap-3">
              <Tooltip content="Tooltip with delay" :delay="500">
                <UButton variant="outline">Delayed</UButton>
              </Tooltip>
              
              <Tooltip content="Large tooltip text" size="lg" max-width="300px">
                <UButton variant="outline">Large</UButton>
              </Tooltip>
              
              <Tooltip disabled>
                <UButton variant="outline" disabled>Disabled</UButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Toast Notification Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">🔔 Toast Notifications & WebSocket</h3>
        </template>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UButton 
            color="green" 
            variant="solid" 
            icon="i-heroicons-check-circle"
            @click="showSuccessToast"
            class="w-full"
          >
            Success Toast
          </UButton>
          
          <UButton 
            color="red" 
            variant="solid" 
            icon="i-heroicons-x-circle"
            @click="showErrorToast"
            class="w-full"
          >
            Error Toast
          </UButton>
          
          <UButton 
            color="amber" 
            variant="solid" 
            icon="i-heroicons-exclamation-triangle"
            @click="showWarningToast"
            class="w-full"
          >
            Warning Toast
          </UButton>
          
          <UButton 
            color="blue" 
            variant="solid" 
            icon="i-heroicons-information-circle"
            @click="showInfoToast"
            class="w-full"
          >
            Info Toast
          </UButton>
        </div>
        
        <div class="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <h4 class="font-semibold text-purple-800 mb-3">🚀 WebSocket Simulation</h4>
          <p class="text-sm text-purple-700 mb-4">
            Test real-time notifications that would come from your backend via WebSocket connections.
          </p>
          <div class="flex space-x-3">
            <UButton 
              color="violet" 
              variant="solid" 
              icon="i-heroicons-bolt"
              @click="simulateWebSocketMessage"
            >
              Simulate WebSocket
            </UButton>
            <UButton 
              color="purple" 
              variant="outline" 
              icon="i-heroicons-arrow-path"
              @click="startWebSocketSimulation"
              :loading="isSimulating"
            >
              {{ isSimulating ? 'Simulating...' : 'Auto Simulation' }}
            </UButton>
            <UButton 
              color="gray" 
              variant="soft" 
              icon="i-heroicons-trash"
              @click="clearAllToasts"
            >
              Clear All
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- Business Components Showcase -->
      <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <template #header>
          <h3 class="text-xl font-bold text-slate-800">🏢 Business Components</h3>
        </template>
        
        <div class="space-y-8">
          <!-- Stock Item Cards -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Stock Item Cards</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StockItemCard 
                v-for="stockItem in sampleStockItems" 
                :key="stockItem.id"
                :stock-item="stockItem"
                @click="handleStockItemClick(stockItem.id)"
                @view="handleStockItemView"
                @edit="handleStockItemEdit"
                @delete="handleStockItemDelete"
                @adjust-stock="handleStockAdjust"
                @add-to-project="handleAddToProject"
              />
            </div>
          </div>

          <!-- Category Cards -->
          <div>
            <h4 class="font-semibold text-slate-700 mb-4">Category Cards</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CategoryCard 
                v-for="category in sampleCategories" 
                :key="category.id"
                :category="category"
                @click="handleCategoryClick(category.id)"
                @view="handleCategoryView"
                @edit="handleCategoryEdit"
                @delete="handleCategoryDelete"
                @add-item="handleCategoryAddItem"
                @view-items="handleCategoryViewItems"
              />
            </div>
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
              <li>✅ StatusIndicator</li>
              <li>✅ Modal</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
            <h4 class="font-bold text-emerald-800 mb-2">UI Components</h4>
            <ul class="text-sm text-emerald-700 space-y-1">
              <li>✅ SkeletonLoader</li>
              <li>✅ LoadingSpinner</li>
              <li>✅ EmptyState</li>
              <li>✅ Toast</li>
              <li>✅ Tabs</li>
              <li>✅ Pagination</li>
              <li>✅ Tooltip</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-violet-50 to-violet-100 p-4 rounded-lg border border-violet-200">
            <h4 class="font-bold text-violet-800 mb-2">Business Components</h4>
            <ul class="text-sm text-violet-700 space-y-1">
              <li>✅ ProjectCard</li>
              <li>✅ ProjectTable</li>
              <li>✅ StockItemCard</li>
              <li>✅ CategoryCard</li>
              <li>⏳ UserCard</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <h4 class="font-bold text-orange-800 mb-2">Form Components</h4>
            <ul class="text-sm text-orange-700 space-y-1">
              <li>✅ SearchBox</li>
              <li>✅ FormInput</li>
              <li>✅ FormSelect</li>
              <li>✅ DatePicker</li>
              <li>✅ FileUpload</li>
            </ul>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  middleware: 'auth'
})

const { success, error, warning, info, simulateWebSocket, clear } = useToast()

let simulationInterval = null

const projectsLoading = ref(false)
const tableLoading = ref(false)
const isSimulating = ref(false)

const showModal = ref(false)
const showDeleteModal = ref(false)
const showFormModal = ref(false)
const showInfoModal = ref(false)

const showErrorExample = ref(false)
const showWarningExample = ref(false)
const showInfoExample = ref(false)

const activeTab = ref(0)

const formData = ref({
  name: '',
  email: '',
  password: '',
  budget: 0,
  loading: 'Loading example...',
  disabled: 'This is disabled',
  readonly: 'This is readonly',
  search: '',
  priority: 'HIGH',
  category: 'web',
  status: 'active',
  startDate: '',
  endDate: '',
  time: ''
})

const uploadedFiles = ref({
  single: [],
  multiple: []
})

const paginationData = ref({
  currentPage: 1,
  totalPages: 15,
  total: 150,
  perPage: 10
})

const selectLoading = ref(false)

const priorityOptions = ref([
  { value: 'LOW', label: 'Low Priority', description: 'Non-urgent tasks' },
  { value: 'MEDIUM', label: 'Medium Priority', description: 'Standard tasks' },
  { value: 'HIGH', label: 'High Priority', description: 'Important tasks' },
  { value: 'URGENT', label: 'Urgent Priority', description: 'Critical tasks' }
])

const categoryOptions = ref([
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'design', label: 'Design' }
])

const categoryGroups = ref([
  {
    label: 'Development',
    options: [
      { value: 'frontend', label: 'Frontend Development' },
      { value: 'backend', label: 'Backend Development' },
      { value: 'fullstack', label: 'Full Stack Development' }
    ]
  },
  {
    label: 'Design',
    options: [
      { value: 'ui', label: 'UI Design' },
      { value: 'ux', label: 'UX Design' },
      { value: 'graphic', label: 'Graphic Design' }
    ]
  }
])

const statusOptions = ref([
  'Active',
  'Inactive',
  'Pending',
  'Completed'
])

const formErrors = ref({
  email: 'Please enter a valid email address'
})

const settingsForm = ref({
  name: 'Modern Website Redesign',
  description: 'Complete website redesign project'
})

const modalForm = ref({
  name: '',
  description: ''
})

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

const sampleTabs = ref([
  {
    key: 'overview',
    label: 'Overview',
    icon: 'i-heroicons-chart-pie',
    badge: '24'
  },
  {
    key: 'details',
    label: 'Details',
    icon: 'i-heroicons-document-text'
  },
  {
    key: 'team',
    label: 'Team',
    icon: 'i-heroicons-users',
    badge: '4'
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth'
  }
])

const sampleErrors = ref({
  validation: {
    name: ['Name is required', 'Name must be at least 3 characters'],
    email: 'Invalid email format',
    password: 'Password must contain at least 8 characters'
  }
})

const showSuccessToast = () => {
  success('Operation completed successfully!', {
    title: 'Success',
    action: {
      text: 'View Details',
      handler: () => console.log('Success action clicked')
    }
  })
}

const showErrorToast = () => {
  error('Something went wrong. Please try again.', {
    title: 'Error',
    action: {
      text: 'Retry',
      handler: () => {
        console.log('Retrying...')
        setTimeout(() => {
          success('Retry successful!')
        }, 1000)
      }
    }
  })
}

const showWarningToast = () => {
  warning('Your session will expire in 5 minutes.', {
    title: 'Warning',
    autoClose: false,
    action: {
      text: 'Extend Session',
      handler: () => {
        success('Session extended!')
      }
    }
  })
}

const showInfoToast = () => {
  info('New feature available! Check out the updated dashboard.', {
    title: 'Info',
    duration: 7000
  })
}

const simulateWebSocketMessage = () => {
  simulateWebSocket()
}

const startWebSocketSimulation = () => {
  if (isSimulating.value) {
    clearInterval(simulationInterval)
    isSimulating.value = false
    return
  }

  isSimulating.value = true
  simulationInterval = setInterval(() => {
    simulateWebSocket()
  }, 3000)

  setTimeout(() => {
    if (isSimulating.value) {
      clearInterval(simulationInterval)
      isSimulating.value = false
      info('WebSocket simulation ended')
    }
  }, 30000)
}

const clearAllToasts = () => {
  clear()
  success('All notifications cleared!')
}

const handleTabChange = ({ index, tab }) => {
  console.log('Tab changed:', { index, tab })
  info(`Switched to ${tab.label} tab`)
}

const handleModalConfirm = () => {
  showModal.value = false
  success('Modal confirmed!')
}

const handleDeleteConfirm = () => {
  showDeleteModal.value = false
  success('Project deleted successfully!')
}

const handleFormSubmit = () => {
  if (!modalForm.value.name) {
    error('Project name is required')
    return
  }
  showFormModal.value = false
  success(`Project "${modalForm.value.name}" created successfully!`)
  modalForm.value = { name: '', description: '' }
}

const handleRetryError = () => {
  success('Retry successful!')
}

const showAllErrors = () => {
  showErrorExample.value = true
  showWarningExample.value = true
  showInfoExample.value = true
}

const togglePasswordVisibility = () => {
  console.log('Toggle password visibility')
  info('Password visibility toggled')
}

const clearSearch = () => {
  formData.value.search = ''
  success('Search cleared')
}

const saveSettings = () => {
  success('Settings saved successfully!')
}

const resetSettings = () => {
  settingsForm.value = {
    name: 'Modern Website Redesign',
    description: 'Complete website redesign project'
  }
  info('Settings reset to default')
}

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
  info(`Viewing project: ${projectId}`)
}

const handleProjectView = (projectId) => {
  console.log('View project:', projectId)
  info(`Opening project details: ${projectId}`)
}

const handleProjectEdit = (projectId) => {
  console.log('Edit project:', projectId)
  info(`Editing project: ${projectId}`)
}

const handleProjectDelete = (projectId) => {
  console.log('Delete project:', projectId)
  warning(`Are you sure you want to delete project: ${projectId}?`, {
    autoClose: false,
    action: {
      text: 'Confirm Delete',
      handler: () => {
        success('Project deleted successfully!')
      }
    }
  })
}

const handleCreateProject = () => {
  console.log('Create new project')
  success('Redirecting to project creation...', {
    title: 'Navigation'
  })
}

const handleUploadSuccess = ({ file }) => {
  success(`File "${file.name}" uploaded successfully!`)
}

const handleUploadError = ({ file, error }) => {
  error(`Failed to upload "${file.name}": ${error.message || error}`)
}

const handlePageChange = (page) => {
  paginationData.value.currentPage = page
  info(`Navigated to page ${page}`)
}

// Stock item handlers
const handleStockItemClick = (stockItemId) => {
  console.log('Stock item clicked:', stockItemId)
  info(`Viewing stock item: ${stockItemId}`)
}

const handleStockItemView = (stockItemId) => {
  console.log('View stock item:', stockItemId)
  success(`Opening stock item details: ${stockItemId}`)
}

const handleStockItemEdit = (stockItemId) => {
  console.log('Edit stock item:', stockItemId)
  info(`Editing stock item: ${stockItemId}`)
}

const handleStockItemDelete = (stockItemId) => {
  console.log('Delete stock item:', stockItemId)
  warning(`Are you sure you want to delete stock item: ${stockItemId}?`, {
    autoClose: false,
    action: {
      text: 'Confirm Delete',
      handler: () => {
        success('Stock item deleted successfully!')
      }
    }
  })
}

const handleStockAdjust = (stockItemId) => {
  console.log('Adjust stock:', stockItemId)
  info(`Opening stock adjustment for: ${stockItemId}`)
}

const handleAddToProject = (stockItemId) => {
  console.log('Add to project:', stockItemId)
  success(`Added stock item ${stockItemId} to project`)
}

// Category handlers
const handleCategoryClick = (categoryId) => {
  console.log('Category clicked:', categoryId)
  info(`Viewing category: ${categoryId}`)
}

const handleCategoryView = (categoryId) => {
  console.log('View category:', categoryId)
  success(`Opening category details: ${categoryId}`)
}

const handleCategoryEdit = (categoryId) => {
  console.log('Edit category:', categoryId)
  info(`Editing category: ${categoryId}`)
}

const handleCategoryDelete = (categoryId) => {
  console.log('Delete category:', categoryId)
  warning(`Are you sure you want to delete category: ${categoryId}?`, {
    autoClose: false,
    action: {
      text: 'Confirm Delete',
      handler: () => {
        success('Category deleted successfully!')
      }
    }
  })
}

const handleCategoryAddItem = (categoryId) => {
  console.log('Add item to category:', categoryId)
  success(`Adding new item to category: ${categoryId}`)
}

const handleCategoryViewItems = (categoryId) => {
  console.log('View category items:', categoryId)
  info(`Viewing items in category: ${categoryId}`)
}

const handleAddStock = () => {
  console.log('Add new stock item')
  success('Redirecting to stock item creation...', {
    title: 'Navigation'
  })
}

onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})
</script>