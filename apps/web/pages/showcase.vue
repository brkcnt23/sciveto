<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <!-- Header - Full width, fixed position -->
    <AppHeader 
      :navigation="headerNavigation"
      :user="user"
      :notification-count="notificationCount"
      :app-name="appName"
      @open-search="openSearch"
      @toggle-notifications="toggleNotifications"
      @sign-out="signOut"
    />

    <!-- Main Layout Container -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <AppSidebar 
        :navigation="sidebarNavigation"
        :user="user"
        :is-open="sidebarOpen"
        @close="sidebarOpen = false"
      />

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

        <!-- Migration Status Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <UCard class="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <template #header>
              <h4 class="font-bold text-primary-800">✅ Migrated</h4>
            </template>
            <ul class="text-sm text-primary-700 space-y-1">
              <li>🔄 UDropdown → UDropdownMenu</li>
              <li>🔄 USelect options → items</li>
              <li>🔄 Added name props</li>
              <li>🔄 Color system (gray → neutral)</li>
              <li>🔄 New theming system</li>
            </ul>
          </UCard>

          <UCard class="bg-gradient-to-br from-success-50 to-success-100 border-success-200">
            <template #header>
              <h4 class="font-bold text-success-800">🎯 Features</h4>
            </template>
            <ul class="text-sm text-success-700 space-y-1">
              <li>✅ Tailwind CSS v4</li>
              <li>✅ Reka UI Components</li>
              <li>✅ Better Performance</li>
              <li>✅ TypeScript Support</li>
              <li>✅ Accessibility</li>
            </ul>
          </UCard>

          <UCard class="bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200">
            <template #header>
              <h4 class="font-bold text-warning-800">⚡ Performance</h4>
            </template>
            <ul class="text-sm text-warning-700 space-y-1">
              <li>📦 Smaller Bundle</li>
              <li>🚀 Faster Loading</li>
              <li>⚡ Tree Shaking</li>
              <li>📱 Mobile Optimized</li>
            </ul>
          </UCard>

          <UCard class="bg-gradient-to-br from-info-50 to-info-100 border-info-200">
            <template #header>
              <h4 class="font-bold text-info-800">🎨 Design</h4>
            </template>
            <ul class="text-sm text-info-700 space-y-1">
              <li>🎯 New Design Tokens</li>
              <li>🌗 Dark Mode Support</li>
              <li>🎨 Custom Theming</li>
              <li>📐 Consistent Spacing</li>
            </ul>
          </UCard>
        </div>

        <!-- Priority Badge Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <h3 class="text-xl font-bold text-slate-800">🏷️ Priority Badge (Nuxt UI v3)</h3>
          </template>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center space-y-3">
              <h4 class="font-semibold text-slate-700">LOW Priority</h4>
              <div class="space-y-2">
                <UBadge label="LOW" color="success" variant="solid" size="md" leading-icon="i-lucide-arrow-down" />
                <UBadge label="LOW" color="success" variant="soft" size="md" leading-icon="i-lucide-arrow-down" />
                <UBadge label="LOW" color="success" variant="outline" size="md" leading-icon="i-lucide-arrow-down" />
                <UBadge label="LOW" color="success" variant="subtle" size="md" leading-icon="i-lucide-arrow-down" />
              </div>
            </div>

            <div class="text-center space-y-3">
              <h4 class="font-semibold text-slate-700">MEDIUM Priority</h4>
              <div class="space-y-2">
                <UBadge label="MEDIUM" color="warning" variant="solid" size="md" leading-icon="i-lucide-minus" />
                <UBadge label="MEDIUM" color="warning" variant="soft" size="md" leading-icon="i-lucide-minus" />
                <UBadge label="MEDIUM" color="warning" variant="outline" size="md" leading-icon="i-lucide-minus" />
                <UBadge label="MEDIUM" color="warning" variant="subtle" size="md" leading-icon="i-lucide-minus" />
              </div>
            </div>

            <div class="text-center space-y-3">
              <h4 class="font-semibold text-slate-700">HIGH Priority</h4>
              <div class="space-y-2">
                <UBadge label="HIGH" color="error" variant="solid" size="md" leading-icon="i-lucide-arrow-up" />
                <UBadge label="HIGH" color="error" variant="soft" size="md" leading-icon="i-lucide-arrow-up" />
                <UBadge label="HIGH" color="error" variant="outline" size="md" leading-icon="i-lucide-arrow-up" />
                <UBadge label="HIGH" color="error" variant="subtle" size="md" leading-icon="i-lucide-arrow-up" />
              </div>
            </div>

            <div class="text-center space-y-3">
              <h4 class="font-semibold text-slate-700">URGENT Priority</h4>
              <div class="space-y-2">
                <UBadge label="URGENT" color="error" variant="solid" size="md" leading-icon="i-lucide-alert-triangle" />
                <UBadge label="URGENT" color="error" variant="soft" size="md" leading-icon="i-lucide-alert-triangle" />
                <UBadge label="URGENT" color="error" variant="outline" size="md"
                  leading-icon="i-lucide-alert-triangle" />
                <UBadge label="URGENT" color="error" variant="subtle" size="md"
                  leading-icon="i-lucide-alert-triangle" />
              </div>
            </div>
          </div>
        </UCard>

        <!-- World Map Section -->
        <UCard>
          <template #header>
            🌍 Global Project Map
          </template>

          <WorldMap name="world-map" />
        </UCard>

        <!-- Progress Bar Section -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <h3 class="text-xl font-bold text-slate-800">📊 Progress Bar (Nuxt UI v3)</h3>
          </template>
          <ProgressBarShowcase name="ProgressBarShowcase" />
        </UCard>

        <!-- Avatar Section -->
        <UCard>
          <template #header>
            <h3 class="text-xl font-bold text-slate-800">👤 Avatar (Nuxt UI v3)</h3>
          </template>
          <AvatarShowcase name="AvatarShowcase" />
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
              <SkeletonLoader name="SkeletonLoader" type="card" />
              <SkeletonLoader name="SkeletonLoader" type="list" />
              <SkeletonLoader name="SkeletonLoader" type="text" :lines="4" />
            </div>

            <!-- Spinner Loading -->
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-700">Spinner Loading</h4>
              <div class="space-y-4">
                <LoadingSpinner name="LoadingSpinner" size="sm" text="Loading..." />
                <LoadingSpinner name="LoadingSpinner" size="md" color="emerald" text="Processing..." />
                <LoadingSpinner name="LoadingSpinner" size="lg" color="violet" text="Uploading..." />
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
              <EmptyState name="EmptyState" icon="i-heroicons-briefcase" title="No Projects Found"
                description="You haven't created any projects yet. Get started by creating your first project."
                action-text="Create Project" action-icon="i-heroicons-plus" @action="handleCreateProject" />
            </div>

            <div>
              <h4 class="font-semibold text-slate-700 mb-4">No Stock Items</h4>
              <EmptyState name="EmptyState" icon="i-heroicons-cube" title="No Stock Items"
                description="Your inventory is empty. Add some stock items to get started." action-text="Add Stock Item"
                action-icon="i-heroicons-plus" @action="handleAddStock" />
            </div>
          </div>
        </UCard>

        <!-- Tabs Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <h3 class="text-xl font-bold text-slate-800">📑 Tabs Component</h3>
          </template>

          <Tabs v-model="activeTab" :tabs="sampleTabs" @change="handleTabChange">
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
                <div class="bg-neutral-50 p-4 rounded-lg">
                  <p class="text-neutral-600">Detailed project information, timelines, and specifications would be
                    displayed
                    here.</p>
                  <ul class="mt-2 space-y-1 text-sm text-neutral-500">
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
                  <div v-for="user in sampleUsers" :key="user.id"
                    class="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                    <Avatar name="Avatar" :user="user" size="md" show-online-status />
                    <div>
                      <p class="font-medium text-neutral-900">{{ user.name }}</p>
                      <p class="text-sm text-neutral-500">{{ user.email }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template #settings>
              <div class="space-y-4">
                <h4 class="font-semibold text-slate-700">Project Settings</h4>
                <div class="space-y-4">
                  <FormInput name="FormInput" v-model="settingsForm.name" label="Project Name"
                    placeholder="Enter project name" leading-icon="i-heroicons-folder" />
                  <FormInput name="FormInput" v-model="settingsForm.description" label="Description"
                    placeholder="Project description" leading-icon="i-heroicons-document-text" />
                  <div class="flex space-x-2">
                    <UButton name="UButton" color="blue" @click="saveSettings">Save Changes</UButton>
                    <UButton name="UButton" color="neutral" variant="outline" @click="resetSettings">Reset</UButton>
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
                <ErrorMessage v-if="showErrorExample" type="error" title="Validation Error"
                  :error="sampleErrors.validation" :show-retry="true" dismissible @retry="handleRetryError"
                  @dismiss="showErrorExample = false" />

                <ErrorMessage v-if="showWarningExample" type="warning" title="Warning"
                  error="This action cannot be undone. Please proceed with caution." dismissible
                  @dismiss="showWarningExample = false" />

                <ErrorMessage v-if="showInfoExample" type="info" title="Information"
                  error="Your session will expire in 5 minutes. Save your work to avoid losing changes." dismissible
                  @dismiss="showInfoExample = false" />
              </div>
            </div>

            <!-- Control Buttons -->
            <div class="flex flex-wrap gap-2">
              <UButton v-if="!showErrorExample" color="red" variant="outline" @click="showErrorExample = true">
                Show Error
              </UButton>
              <UButton v-if="!showWarningExample" color="amber" variant="outline" @click="showWarningExample = true">
                Show Warning
              </UButton>
              <UButton v-if="!showInfoExample" color="blue" variant="outline" @click="showInfoExample = true">
                Show Info
              </UButton>
              <UButton color="neutral" variant="soft" @click="showAllErrors">
                Show All
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Form Section -->
        <UCard>
          <template #header>
            <h3>📝 Form Components (Nuxt UI v3)</h3>
          </template>
          <FormShowcase name="FormShowcase" :default-show-states="true" :default-show-textarea-select="true"
            :default-show-advanced="true" :default-show-variants="false" :default-show-working-form="true" />
        </UCard>

        <!-- Status Indicator Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <h3 class="text-xl font-bold text-slate-800">🔍 Status Indicator (Nuxt UI v3)</h3>
          </template>
          <StatusShowcase name="StatusShowcase" :default-show-badge-style="true" :default-show-sizes="false"
            :default-show-interactive="true" />
        </UCard>

        <!-- Modal Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <h3 class="text-xl font-bold text-slate-800">🪟 Modal Component</h3>
          </template>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <UButton color="blue" @click="showModal = true">
              Basic Modal
            </UButton>

            <UButton color="red" @click="showDeleteModal = true">
              Delete Modal
            </UButton>

            <UButton color="green" @click="showFormModal = true">
              Form Modal
            </UButton>

            <UButton color="purple" @click="showInfoModal = true">
              Info Modal
            </UButton>
          </div>

          <!-- Basic Modal -->
          <UModal v-model="showModal">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-neutral-100 dark:divide-neutral-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
                    Basic Modal
                  </h3>
                  <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                    @click="showModal = false" />
                </div>
              </template>

              <div class="space-y-4">
                <p>This is the modal content area. You can put any content here.</p>
                <p>Click the buttons below to interact with the modal.</p>
              </div>

              <template #footer>
                <div class="flex justify-end space-x-3">
                  <UButton variant="outline" @click="showModal = false">Cancel</UButton>
                  <UButton @click="handleModalConfirm">Confirm</UButton>
                </div>
              </template>
            </UCard>
          </UModal>

          <!-- Delete Modal -->
          <UModal v-model="showDeleteModal">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-neutral-100 dark:divide-neutral-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-red-600">
                    Delete Project
                  </h3>
                  <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                    @click="showDeleteModal = false" />
                </div>
              </template>

              <div class="space-y-4">
                <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p class="text-red-800 font-medium">Warning: This action is permanent</p>
                  <p class="text-red-600 text-sm mt-1">All project data, files, and associated records will be
                    permanently
                    deleted.</p>
                </div>
              </div>

              <template #footer>
                <div class="flex justify-end space-x-3">
                  <UButton variant="outline" @click="showDeleteModal = false">Cancel</UButton>
                  <UButton color="red" @click="handleDeleteConfirm">Delete</UButton>
                </div>
              </template>
            </UCard>
          </UModal>

          <!-- Form Modal -->
          <UModal v-model="showFormModal">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-neutral-100 dark:divide-neutral-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
                    Create New Project
                  </h3>
                  <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                    @click="showFormModal = false" />
                </div>
              </template>

              <div class="space-y-4">
                <p class="text-sm text-neutral-600">Fill in the details below</p>
                <div class="space-y-4">
                  <FormInput name="FormInput" v-model="modalForm.name" label="Project Name"
                    placeholder="Enter project name" required />
                  <FormInput name="FormInput" v-model="modalForm.description" label="Description"
                    placeholder="Project description" />
                </div>
              </div>

              <template #footer>
                <div class="flex justify-end space-x-3">
                  <UButton variant="outline" @click="showFormModal = false">Cancel</UButton>
                  <UButton color="green" @click="handleFormSubmit">Create</UButton>
                </div>
              </template>
            </UCard>
          </UModal>

          <!-- Info Modal -->
          <UModal v-model="showInfoModal">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-neutral-100 dark:divide-neutral-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-blue-600">
                    System Information
                  </h3>
                  <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                    @click="showInfoModal = false" />
                </div>
              </template>

              <div class="space-y-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div class="space-y-2">
                    <p><strong>Version:</strong> 1.0.0</p>
                    <p><strong>Environment:</strong> Development</p>
                    <p><strong>Last Updated:</strong> {{ new Date().toLocaleDateString() }}</p>
                  </div>
                </div>
              </div>

              <template #footer>
                <div class="flex justify-end">
                  <UButton @click="showInfoModal = false">Got it</UButton>
                </div>
              </template>
            </UCard>
          </UModal>
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

              <FormSelect name="FormSelect" v-model="formData.priority" label="Priority Level"
                placeholder="Select priority" leading-icon="i-heroicons-flag" :options="priorityOptions"
                help-text="Choose the priority level for this task" />

              <FormSelect name="FormSelect" v-model="formData.category" label="Category" placeholder="Select category"
                :options="categoryOptions" :option-groups="categoryGroups" show-selected-value />

              <FormSelect name="FormSelect" v-model="formData.status" label="Status" :options="statusOptions"
                :loading="selectLoading" disabled />
            </div>

            <!-- Date Picker -->
            <div class="space-y-4">
              <h4 class="font-semibold text-slate-700">Date Picker</h4>

              <DatePicker name="DatePicker" v-model="formData.startDate" label="Start Date"
                placeholder="Select start date" leading-icon="i-heroicons-calendar-days"
                help-text="Choose the project start date" />

              <DatePicker name="DatePicker" v-model="formData.endDate" label="End Date" placeholder="Select end date"
                :min-date="formData.startDate" type="datetime-local" />

              <DatePicker name="DatePicker" v-model="formData.time" label="Meeting Time" type="time"
                placeholder="Select time" />
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
              <FileUpload name="FileUpload" v-model="uploadedFiles.single" label="Profile Picture" accept="image/*"
                :max-size="2 * 1024 * 1024" help-text="Upload a profile picture (max 2MB)"
                @upload-success="handleUploadSuccess" @upload-error="handleUploadError" />
            </div>

            <!-- Multiple File Upload -->
            <div>
              <h4 class="font-semibold text-slate-700 mb-4">Multiple File Upload</h4>
              <FileUpload name="FileUpload" v-model="uploadedFiles.multiple" label="Project Documents"
                accept=".pdf,.doc,.docx,.jpg,.png" :multiple="true" :max-files="5" :max-size="10 * 1024 * 1024"
                help-text="Upload project documents (max 5 files, 10MB each)" auto-upload
                @upload-success="handleUploadSuccess" @upload-error="handleUploadError" />
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

            <Pagination name="Pagination" :current-page="paginationData.currentPage"
              :total-pages="paginationData.totalPages" :total="paginationData.total" :per-page="paginationData.perPage"
              @page-change="handlePageChange" />
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
                <Tooltip name="Tooltip" content="Top start tooltip" placement="top-start">
                  <UButton variant="outline" size="sm">Top Start</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Top center tooltip" placement="top">
                  <UButton variant="outline" size="sm">Top</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Top end tooltip" placement="top-end">
                  <UButton variant="outline" size="sm">Top End</UButton>
                </Tooltip>

                <!-- Middle row -->
                <Tooltip name="Tooltip" content="Left tooltip with more content" placement="left">
                  <UButton variant="outline" size="sm">Left</UButton>
                </Tooltip>

                <div class="text-center">
                  <Tooltip name="Tooltip" content="Click me tooltip" trigger="click">
                    <UButton color="blue" size="sm">Click Me</UButton>
                  </Tooltip>
                </div>

                <Tooltip name="Tooltip" content="Right tooltip" placement="right">
                  <UButton variant="outline" size="sm">Right</UButton>
                </Tooltip>

                <!-- Bottom row -->
                <Tooltip name="Tooltip" content="Bottom start tooltip" placement="bottom-start">
                  <UButton variant="outline" size="sm">Bottom Start</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Bottom center tooltip" placement="bottom">
                  <UButton variant="outline" size="sm">Bottom</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Bottom end tooltip" placement="bottom-end">
                  <UButton variant="outline" size="sm">Bottom End</UButton>
                </Tooltip>
              </div>
            </div>

            <!-- Tooltip Themes -->
            <div>
              <h4 class="font-semibold text-slate-700 mb-4">Tooltip Themes</h4>
              <div class="flex flex-wrap gap-3">
                <Tooltip name="Tooltip" content="Dark theme (default)" theme="dark">
                  <UButton variant="outline" color="neutral">Dark</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Light theme tooltip" theme="light">
                  <UButton variant="outline" color="neutral">Light</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Error theme tooltip" theme="error">
                  <UButton variant="outline" color="red">Error</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Warning theme tooltip" theme="warning">
                  <UButton variant="outline" color="amber">Warning</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Success theme tooltip" theme="success">
                  <UButton variant="outline" color="green">Success</UButton>
                </Tooltip>
              </div>
            </div>

            <!-- Advanced Tooltips -->
            <div>
              <h4 class="font-semibold text-slate-700 mb-4">Advanced Features</h4>
              <div class="flex flex-wrap gap-3">
                <Tooltip name="Tooltip" content="Tooltip with delay" :delay="500">
                  <UButton variant="outline">Delayed</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="Large tooltip text" size="lg" max-width="300px">
                  <UButton variant="outline">Large</UButton>
                </Tooltip>

                <Tooltip name="Tooltip" content="This tooltip is disabled" disabled>
                  <UButton variant="outline" disabled>Disabled</UButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3>📢 Toast Notifications (Nuxt UI v3)</h3>
          </template>
          <ToastShowcase />
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
                <StockItemCard name="StockItemCard" v-for="stockItem in sampleStockItems" :key="stockItem.id"
                  :stock-item="stockItem" @click="handleStockItemClick(stockItem.id)" @view="handleStockItemView"
                  @edit="handleStockItemEdit" @delete="handleStockItemDelete" @adjust-stock="handleStockAdjust"
                  @add-to-project="handleAddToProject" />
              </div>
            </div>

            <!-- Category Cards -->
            <div>
              <h4 class="font-semibold text-slate-700 mb-4">Category Cards</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CategoryCard name="CategoryCard" v-for="category in sampleCategories" :key="category.id"
                  :category="category" @click="handleCategoryClick(category.id)" @view="handleCategoryView"
                  @edit="handleCategoryEdit" @delete="handleCategoryDelete" @add-item="handleCategoryAddItem"
                  @view-items="handleCategoryViewItems" />
              </div>
            </div>
          </div>
        </UCard>

        <!-- Project Cards Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-slate-800">🎴 Project Cards</h3>
              <UButton variant="outline" size="sm" :loading="projectsLoading" @click="toggleProjectsLoading">
                {{ projectsLoading ? 'Loading...' : 'Toggle Loading' }}
              </UButton>
            </div>
          </template>

          <!-- Loading State -->
          <div v-if="projectsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader name="SkeletonLoader" v-for="n in 3" :key="n" type="card" />
          </div>

          <!-- Loaded State -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard name="ProjectCard" v-for="project in sampleProjects" :key="project.id" :project="project"
              @click="handleProjectClick(project.id)" />
          </div>
        </UCard>

        <!-- Project Table Showcase -->
        <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-slate-800">📊 Project Table</h3>
              <UButton variant="outline" size="sm" :loading="tableLoading" @click="toggleTableLoading">
                {{ tableLoading ? 'Loading...' : 'Toggle Loading' }}
              </UButton>
            </div>
          </template>

          <!-- Loading State -->
          <div v-if="tableLoading" class="space-y-0 bg-white rounded-lg border overflow-hidden">
            <SkeletonLoader name="SkeletonLoader" v-for="n in 5" :key="n" type="table-row" />
          </div>

          <!-- Loaded State -->
          <ProjectTable name="ProjectTable" v-else :projects="sampleProjects" @view="handleProjectView"
            @edit="handleProjectEdit" @delete="handleProjectDelete" />
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
      <!-- Footer -->
      <AppFooter :app-name="appName" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDualToast } from '~/composables/useDualToast'
import { useAuthStore } from '~/stores/auth'
import FileUpload from '~/components/forms/FileUpload.vue'
import Pagination from '~/components/ui/Pagination.vue'
import StatusShowcase from '~/showcase/forms/StatusShowcase.vue'
import StatusIndicator from '~/components/base/StatusIndicator.vue'
import WorldMap from '@/components/WorldMap.vue'
const dualToast = useDualToast()
const authStore = useAuthStore()

// Add logout state
const loggingOut = ref(false)

definePageMeta({
  middleware: 'auth'
})

// Add logout handler
const handleDevLogout = async () => {
  loggingOut.value = true
  try {
    await authStore.logout()
    dualToast.success('Logged out successfully!')
  } catch (error) {
    console.error('Logout error:', error)
    dualToast.error('Logout failed, redirecting anyway...')
    // Force redirect even if logout fails
    await navigateTo('/login')
  } finally {
    loggingOut.value = false
  }
}

// Fix: Update these functions to use dualToast consistently
const success = (message) => dualToast.success(message)
const error = (message) => dualToast.error(message)
const warning = (message, options) => dualToast.warning(message, options)
const info = (message) => dualToast.info(message)

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

// Projects data
const projects = ref([
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'Modern e-commerce solution with advanced features',
    status: 'in-progress',
    progress: 75,
    team: 8,
    dueDate: 'Dec 15'
  },
  {
    id: 2,
    name: 'Mobile App',
    description: 'Cross-platform mobile application',
    status: 'completed',
    progress: 100,
    team: 5,
    dueDate: 'Nov 30'
  },
  {
    id: 3,
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard',
    status: 'pending',
    progress: 25,
    team: 3,
    dueDate: 'Jan 20'
  }
])

const sampleStockItems = ref([
  {
    id: '1',
    name: 'Safety Helmet',
    sku: 'SH-001',
    category: 'Safety Equipment',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    unitPrice: 24.99,
    totalValue: 1124.55,
    supplier: 'SafetyFirst Co.',
    lastRestocked: '2024-01-15T10:30:00Z',
    status: 'IN_STOCK',
    location: 'Warehouse A, Shelf 12',
    description: 'High-quality construction safety helmet'
  },
  {
    id: '2',
    name: 'Work Gloves',
    sku: 'WG-002',
    category: 'Safety Equipment',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unitPrice: 12.99,
    totalValue: 103.92,
    supplier: 'WorkGear Ltd.',
    lastRestocked: '2024-01-10T14:20:00Z',
    status: 'LOW_STOCK',
    location: 'Warehouse B, Shelf 5',
    description: 'Durable work gloves for construction'
  }
])

const sampleCategories = ref([
  {
    id: '1',
    name: 'Safety Equipment',
    description: 'Personal protective equipment and safety gear',
    color: 'blue',
    icon: 'i-heroicons-shield-check',
    status: 'Active',
    itemCount: 32,
    totalValue: 8500,
    lowStockItems: 8,
    activeProjects: 15,
    popularItems: [
      { id: '1', name: 'Safety Helmet', price: 24.99 },
      { id: '2', name: 'Safety Vest', price: 19.99 },
      { id: '3', name: 'Safety Gloves', price: 12.99 }
    ],
    parentCategory: null,
    lastActivity: '2024-01-15T16:45:00Z',
    lastActivityDescription: 'Safety helmets restocked'
  },
  {
    id: '2',
    name: 'Tools',
    description: 'Construction and maintenance tools',
    color: 'green',
    icon: 'i-heroicons-wrench-screwdriver',
    status: 'Active',
    itemCount: 45,
    totalValue: 12750,
    lowStockItems: 3,
    activeProjects: 8,
    popularItems: [
      { id: '4', name: 'Power Drill', price: 89.99 },
      { id: '5', name: 'Hammer', price: 25.99 },
      { id: '6', name: 'Screwdriver Set', price: 34.99 }
    ],
    parentCategory: { name: 'Equipment' },
    lastActivity: '2024-01-12T10:30:00Z',
    lastActivityDescription: 'New power tools added'
  }
])


const formData = ref({
  projectName: 'Modern Website Redesign',
  description: 'Complete website redesign project',
  priority: 'HIGH',
  category: 'web',
  status: 'active',
  startDate: '',
  endDate: '',
  time: '',
  budget: 0
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

const categoryOptions = [
  { label: 'Web Development', value: 'web' },
  { label: 'Mobile App', value: 'mobile' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' }
]

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

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' }
]

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

// Methods
const showSuccess = () => {
  toast.add({
    title: 'Success!',
    description: 'This is a success message with Nuxt UI v3.',
    color: 'success',
    icon: 'i-heroicons-check'
  })
}

const showError = () => {
  toast.add({
    title: 'Error!',
    description: 'This is an error message with Nuxt UI v3.',
    color: 'error',
    icon: 'i-heroicons-x-mark'
  })
}

const showWarning = () => {
  toast.add({
    title: 'Warning!',
    description: 'This is a warning message with Nuxt UI v3.',
    color: 'warning',
    icon: 'i-heroicons-exclamation-triangle'
  })
}

const showInfo = () => {
  toast.add({
    title: 'Info!',
    description: 'This is an info message with Nuxt UI v3.',
    color: 'info',
    icon: 'i-heroicons-information-circle'
  })
}


// Fix: Use dualToast instead of undefined variable
const simulateWebSocketMessage = () => {
  dualToast.simulateWebSocket()
}

const startWebSocketSimulation = () => {
  if (isSimulating.value) {
    // Stop simulation
    if (simulationInterval) {
      clearInterval(simulationInterval)
      simulationInterval = null
    }
    isSimulating.value = false
  } else {
    // Start simulation
    isSimulating.value = true
    simulationInterval = setInterval(() => {
      dualToast.simulateWebSocket()
    }, 3000) // Send a message every 3 seconds
  }
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
  success('Redirecting to project creation...')
}
// Other methods
const handleUploadSuccess = (file) => {
  success('Upload Success', `File ${file.name} uploaded successfully`)
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
  success('Redirecting to stock item creation...')
}
const handleSave = () => {
  showSuccess()
  console.log('Form data:', formData)
}

const handleReset = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = typeof formData[key] === 'string' ? '' : null
  })
  showInfo()
}

const handlePaginationChange = (data) => {
  console.log('Pagination changed:', data)
}


// Set page title
useHead({
  title: 'Component Showcase - Dashboard'
})

// Clean up interval on unmount
onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})
</script>