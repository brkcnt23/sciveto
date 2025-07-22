<template>
  <div class="space-y-8">
    <!-- Feedback Components Header -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-message-circle" class="w-6 h-6 text-primary" />
          <h2 class="text-2xl font-bold text-highlighted">Feedback Components</h2>
        </div>
      </template>

      <p class="text-muted mb-6">
        Kullanıcı geri bildirim component'leri: Toast notifications, Alerts, Status indicators ve loading states.
        Nuxt UI v3 ile modern feedback patterns ve dark mode desteği.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <UCard variant="soft" color="primary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-bell" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Toast Notifications</h4>
              <p class="text-sm text-muted mt-1">Real-time user feedback</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="warning">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Alert Messages</h4>
              <p class="text-sm text-muted mt-1">Important notifications</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="success">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Status Indicators</h4>
              <p class="text-sm text-muted mt-1">State visualization</p>
            </div>
          </div>
        </UCard>

        <UCard variant="soft" color="secondary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-loader" class="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Loading States</h4>
              <p class="text-sm text-muted mt-1">Progress feedback</p>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>

    <!-- Toast Notifications Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-bell" class="w-5 h-5 text-primary" />
            <h3 class="text-xl font-bold text-highlighted">Enhanced Toast System</h3>
          </div>
          <div class="flex items-center gap-2">
            <UBadge color="success" variant="soft">useDualToast</UBadge>
            <UBadge color="primary" variant="solid">Updated</UBadge>
          </div>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Basic Toast Examples -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Enhanced Toast Methods</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <UButton color="success" @click="showSuccessToast" block>
              <UIcon name="i-lucide-check" class="w-4 h-4 mr-2" />
              Success Toast
            </UButton>
            <UButton color="error" @click="showErrorToast" block>
              <UIcon name="i-lucide-x" class="w-4 h-4 mr-2" />
              Error Toast
            </UButton>
            <UButton color="warning" @click="showWarningToast" block>
              <UIcon name="i-lucide-alert-triangle" class="w-4 h-4 mr-2" />
              Warning Toast
            </UButton>
            <UButton color="info" @click="showInfoToast" block>
              <UIcon name="i-lucide-info" class="w-4 h-4 mr-2" />
              Info Toast
            </UButton>
          </div>
        </div>

        <!-- Advanced Features -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Advanced Features</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <UButton variant="outline" @click="showServerErrorToast" block>
              <UIcon name="i-lucide-server-crash" class="w-4 h-4 mr-2" />
              Server Error (with Retry)
            </UButton>
            <UButton variant="outline" @click="showLoadingToast" block>
              <UIcon name="i-lucide-loader-2" class="w-4 h-4 mr-2" />
              Loading Toast
            </UButton>
            <UButton variant="outline" @click="showConfirmToast" block>
              <UIcon name="i-lucide-help-circle" class="w-4 h-4 mr-2" />
              Confirmation Toast
            </UButton>
          </div>
        </div>

        <!-- Smart Positioning Info -->
        <UAlert 
          color="primary" 
          variant="soft" 
          icon="i-lucide-info"
          title="Smart Toast Positioning"
          description="Errors appear at the top for immediate attention, while success/info toasts appear at the bottom for less intrusive feedback."
        />

        <!-- Quick Actions Demo -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Real-world Quick Actions</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <UButton variant="soft" color="success" @click="showProjectUpdateToast" block>
              <UIcon name="i-lucide-trending-up" class="w-4 h-4 mr-2" />
              Project Update
            </UButton>
            <UButton variant="soft" color="success" @click="showTaskCompletedToast" block>
              <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 mr-2" />
              Task Completed
            </UButton>
            <UButton variant="soft" color="primary" @click="showDataSavedToast" block>
              <UIcon name="i-lucide-save" class="w-4 h-4 mr-2" />
              Data Saved
            </UButton>
            <UButton variant="soft" color="info" @click="showUserInvitedToast" block>
              <UIcon name="i-lucide-user-plus" class="w-4 h-4 mr-2" />
              User Invited
            </UButton>
          </div>
        </div>

        <!-- Enhanced Toast Showcase Component -->
        <ToastShowcase />
      </div>
    </UCard>

    <!-- Alert Messages Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Alert Messages</h3>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Alert Types -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Alert Types</h4>
          <div class="space-y-4">
            <UAlert 
              v-if="showSuccessAlert"
              color="success" 
              variant="soft"
              title="Success Alert"
              description="This is a success alert message with proper dark mode support."
              :close-button="{ icon: 'i-lucide-x', color: 'neutral', variant: 'link', padded: false }"
              @close="showSuccessAlert = false"
            />

            <UAlert 
              v-if="showErrorAlert"
              color="error" 
              variant="soft"
              title="Error Alert"
              description="This is an error alert message. Something went wrong and needs attention."
              :close-button="{ icon: 'i-lucide-x', color: 'neutral', variant: 'link', padded: false }"
              @close="showErrorAlert = false"
            />

            <UAlert 
              v-if="showWarningAlert"
              color="warning" 
              variant="soft"
              title="Warning Alert"
              description="This is a warning alert. Please review before proceeding."
              :close-button="{ icon: 'i-lucide-x', color: 'neutral', variant: 'link', padded: false }"
              @close="showWarningAlert = false"
            />

            <UAlert 
              v-if="showInfoAlert"
              color="info" 
              variant="soft"
              title="Info Alert"
              description="This is an informational alert with helpful information."
              :close-button="{ icon: 'i-lucide-x', color: 'neutral', variant: 'link', padded: false }"
              @close="showInfoAlert = false"
            />
          </div>
        </div>

        <!-- Alert Controls -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Alert Controls</h4>
          <div class="flex flex-wrap gap-2">
            <UButton v-if="!showSuccessAlert" color="success" variant="outline" size="sm" @click="showSuccessAlert = true">
              Show Success
            </UButton>
            <UButton v-if="!showErrorAlert" color="error" variant="outline" size="sm" @click="showErrorAlert = true">
              Show Error
            </UButton>
            <UButton v-if="!showWarningAlert" color="warning" variant="outline" size="sm" @click="showWarningAlert = true">
              Show Warning
            </UButton>
            <UButton v-if="!showInfoAlert" color="info" variant="outline" size="sm" @click="showInfoAlert = true">
              Show Info
            </UButton>
            <UButton color="neutral" variant="soft" size="sm" @click="showAllAlerts">
              Show All
            </UButton>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Status Indicators Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Status Indicators (Nuxt UI v3)</h3>
        </div>
      </template>

      <StatusShowcase />
    </UCard>

    <!-- Loading States Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-loader" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Loading Components</h3>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Skeleton Loading -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Skeleton Loading</h4>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h5 class="font-medium text-muted">Card Skeleton</h5>
              <SkeletonLoader type="card" />
            </div>
            <div class="space-y-4">
              <h5 class="font-medium text-muted">List Skeleton</h5>
              <SkeletonLoader type="list" />
            </div>
          </div>
          
          <div class="mt-6 space-y-4">
            <h5 class="font-medium text-muted">Text Skeleton</h5>
            <SkeletonLoader type="text" :lines="4" />
          </div>
        </div>

        <!-- Spinner Loading -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Spinner Loading</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center space-y-3">
              <h5 class="font-medium text-muted">Small Spinner</h5>
              <LoadingSpinner size="sm" text="Loading..." />
            </div>
            <div class="text-center space-y-3">
              <h5 class="font-medium text-muted">Medium Spinner</h5>
              <LoadingSpinner size="md" color="primary" text="Processing..." />
            </div>
            <div class="text-center space-y-3">
              <h5 class="font-medium text-muted">Large Spinner</h5>
              <LoadingSpinner size="lg" color="success" text="Uploading..." />
            </div>
          </div>
        </div>

        <!-- Loading States in Action -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Loading States in Action</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard variant="outline">
              <template #header>
                <div class="flex items-center justify-between">
                  <h5 class="font-semibold text-highlighted">Data Table</h5>
                  <UButton 
                    :loading="isTableLoading" 
                    :disabled="isTableLoading"
                    @click="toggleTableLoading"
                    size="sm"
                  >
                    {{ isTableLoading ? 'Loading...' : 'Reload Data' }}
                  </UButton>
                </div>
              </template>

              <div v-if="isTableLoading" class="space-y-3">
                <SkeletonLoader type="table-row" v-for="n in 3" :key="n" />
              </div>
              <div v-else class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                  <span class="text-highlighted">Sample Data 1</span>
                  <UBadge color="success">Active</UBadge>
                </div>
                <div class="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                  <span class="text-highlighted">Sample Data 2</span>
                  <UBadge color="warning">Pending</UBadge>
                </div>
                <div class="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                  <span class="text-highlighted">Sample Data 3</span>
                  <UBadge color="error">Inactive</UBadge>
                </div>
              </div>
            </UCard>

            <UCard variant="outline">
              <template #header>
                <div class="flex items-center justify-between">
                  <h5 class="font-semibold text-highlighted">Form Submission</h5>
                  <UButton 
                    :loading="isFormLoading" 
                    :disabled="isFormLoading"
                    @click="toggleFormLoading"
                    size="sm"
                    color="primary"
                  >
                    {{ isFormLoading ? 'Submitting...' : 'Submit Form' }}
                  </UButton>
                </div>
              </template>

              <div class="space-y-4">
                <UFormGroup label="Name">
                  <UInput :disabled="isFormLoading" placeholder="Enter your name" />
                </UFormGroup>
                <UFormGroup label="Email">
                  <UInput :disabled="isFormLoading" type="email" placeholder="Enter your email" />
                </UFormGroup>
                <UFormGroup label="Message">
                  <UTextarea :disabled="isFormLoading" placeholder="Your message" rows="3" />
                </UFormGroup>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Empty State Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-inbox" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Empty State Component</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 class="font-semibold text-highlighted mb-4">No Projects</h4>
          <EmptyState 
            icon="i-lucide-briefcase" 
            title="No Projects Found"
            description="You haven't created any projects yet. Get started by creating your first project."
            action-text="Create Project" 
            action-icon="i-lucide-plus" 
            @action="handleCreateProject" 
          />
        </div>

        <div>
          <h4 class="font-semibold text-highlighted mb-4">No Stock Items</h4>
          <EmptyState 
            icon="i-lucide-package" 
            title="No Stock Items"
            description="Your inventory is empty. Add some stock items to get started." 
            action-text="Add Stock Item"
            action-icon="i-lucide-plus" 
            @action="handleAddStock" 
          />
        </div>
      </div>
    </UCard>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDualToast } from '~/composables/useDualToast'

// Components
import StatusShowcase from '~/showcase/forms/StatusShowcase.vue'
import SkeletonLoader from '~/components/ui/SkeletonLoader.vue'
import LoadingSpinner from '~/components/ui/LoadingSpinner.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import ToastShowcase from '~/showcase/feedback/ToastShowcase.vue'

// Use our enhanced dual toast system with Nuxt UI v3 integration
const toast = useDualToast()

// Alert states
const showSuccessAlert = ref(false)
const showErrorAlert = ref(false)
const showWarningAlert = ref(false)
const showInfoAlert = ref(false)

// Loading states
const isTableLoading = ref(false)
const isFormLoading = ref(false)

// Enhanced toast functions using useDualToast
const showSuccessToast = () => {
  toast.success('Success!', 'Operation completed successfully!')
}

const showErrorToast = () => {
  toast.error('Error!', 'Something went wrong. Please try again.')
}

const showWarningToast = () => {
  toast.warning('Warning!', 'Please review your settings before continuing.')
}

const showInfoToast = () => {
  toast.info('Information', 'Here is some important information for you.')
}

// Advanced toast methods
const showServerErrorToast = () => {
  toast.serverError('Failed to connect to the API. Please check your connection.')
}

const showLoadingToast = () => {
  toast.loading('Processing Request', 'Please wait while we process your data...')
}

const showConfirmToast = () => {
  toast.confirm(
    'Delete Item',
    'Are you sure you want to delete this item? This action cannot be undone.',
    () => {
      toast.success('Deleted', 'Item has been deleted successfully.')
    }
  )
}

// Real-world quick action toasts
const showProjectUpdateToast = () => {
  toast.projectUpdate('Website Redesign', 75)
}

const showTaskCompletedToast = () => {
  toast.taskCompleted('Code Review')
}

const showDataSavedToast = () => {
  toast.dataSaved('User Profile')
}

const showUserInvitedToast = () => {
  toast.userInvited('newuser@example.com')
}

// Alert functions
const showAllAlerts = () => {
  showSuccessAlert.value = true
  showErrorAlert.value = true
  showWarningAlert.value = true
  showInfoAlert.value = true
}

// Loading functions
const toggleTableLoading = () => {
  isTableLoading.value = true
  setTimeout(() => {
    isTableLoading.value = false
    toast.success('Data reloaded successfully!')
  }, 2000)
}

const toggleFormLoading = () => {
  isFormLoading.value = true
  setTimeout(() => {
    isFormLoading.value = false
    toast.success('Form submitted successfully!')
  }, 2000)
}

// Empty state functions
const handleCreateProject = () => {
  toast.success('Redirecting to project creation...')
}

const handleAddStock = () => {
  toast.success('Redirecting to stock item creation...')
}
</script>