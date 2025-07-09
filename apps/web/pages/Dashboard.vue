<!-- apps/web/pages/dashboard.vue -->
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
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-violet-50 to-violet-100 p-4 rounded-lg border border-violet-200">
            <h4 class="font-bold text-violet-800 mb-2">Business Components</h4>
            <ul class="text-sm text-violet-700 space-y-1">
              <li>✅ ProjectCard</li>
              <li>✅ ProjectTable</li>
              <li>⏳ StockItemCard</li>
              <li>⏳ CategoryCard</li>
              <li>⏳ UserCard</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <h4 class="font-bold text-orange-800 mb-2">Form Components</h4>
            <ul class="text-sm text-orange-700 space-y-1">
              <li>✅ SearchBox</li>
              <li>✅ FormInput</li>
              <li>✅ ErrorMessage</li>
              <li>⏳ FormSelect</li>
              <li>⏳ DatePicker</li>
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
  search: ''
})

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