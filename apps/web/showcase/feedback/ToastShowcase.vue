<!-- showcase/feedback/ToastShowcase.vue - Enhanced with useDualToast -->
<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-semibold tracking-tight">Toast System</h3>
        <div class="flex items-center gap-2">
          <UButton 
            variant="outline" 
            size="sm" 
            icon="i-lucide-trash-2"
            @click="clearAllToasts"
          >
            Clear All
          </UButton>
          <UButton 
            variant="outline" 
            size="sm" 
            icon="i-lucide-eye"
            @click="showPreview = !showPreview"
          >
            {{ showPreview ? 'Hide' : 'Show' }} Preview
          </UButton>
        </div>
      </div>
      <p class="text-muted-foreground">
        Interactive toast notifications with enhanced positioning and styling. 
        Errors appear at the top, success/info at the bottom by default.
      </p>
    </div>

    <!-- Basic Toast Examples -->
    <div class="space-y-6">
      <h4 class="text-lg font-semibold text-foreground border-b border-border pb-2">
        Basic Toast Types
      </h4>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UButton 
          color="success"
          variant="outline"
          icon="i-lucide-check-circle"
          @click="showSuccessToast"
          class="w-full"
        >
          Success
        </UButton>
        
        <UButton 
          color="error"
          variant="outline"
          icon="i-lucide-x-circle"
          @click="showErrorToast"
          class="w-full"
        >
          Error
        </UButton>
        
        <UButton 
          color="warning"
          variant="outline"
          icon="i-lucide-alert-triangle"
          @click="showWarningToast"
          class="w-full"
        >
          Warning
        </UButton>
        
        <UButton 
          color="info"
          variant="outline"
          icon="i-lucide-info"
          @click="showInfoToast"
          class="w-full"
        >
          Info
        </UButton>
      </div>
    </div>

    <!-- Advanced Toast Examples -->
    <div class="space-y-6">
      <h4 class="text-lg font-semibold text-foreground border-b border-border pb-2">
        Advanced Toast Features
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UButton 
          variant="outline"
          icon="i-lucide-server-crash"
          @click="showServerErrorToast"
          class="w-full"
        >
          Server Error (with Retry)
        </UButton>
        
        <UButton 
          variant="outline"
          icon="i-lucide-loader-2"
          @click="showLoadingToast"
          class="w-full"
        >
          Loading Toast
        </UButton>
        
        <UButton 
          variant="outline"
          icon="i-lucide-help-circle"
          @click="showConfirmToast"
          class="w-full"
        >
          Confirmation Toast
        </UButton>
      </div>
    </div>

    <!-- Toast Component Preview -->
    <div v-if="showPreview" class="space-y-6">
      <h4 class="text-lg font-semibold text-foreground border-b border-border pb-2">
        Toast Component Preview
      </h4>
      
      <div class="bg-muted/50 p-6 rounded-lg border border-border">
        <p class="text-sm text-muted-foreground mb-4">Preview of new modern Toast components (visual only):</p>
        
        <div class="space-y-4 max-w-md">
          <!-- Success Toast Preview -->
          <div class="relative overflow-hidden bg-green-50 dark:bg-green-950 border-2 border-green-500 dark:border-green-400 text-green-900 dark:text-green-100 rounded-xl shadow-xl p-4 cursor-pointer hover:scale-105 transition-transform">
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-current mt-0.5 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <h5 class="font-semibold text-sm text-current leading-5">Success!</h5>
                <p class="text-sm mt-1 text-current opacity-80 leading-4">Your data has been saved successfully.</p>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 h-1 bg-current opacity-30 w-3/4"></div>
          </div>

          <!-- Error Toast Preview -->  
          <div class="relative overflow-hidden bg-red-50 dark:bg-red-950 border-2 border-red-500 dark:border-red-400 text-red-900 dark:text-red-100 rounded-xl shadow-xl p-4 cursor-pointer hover:scale-105 transition-transform">
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-x-circle" class="w-5 h-5 text-current mt-0.5 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <h5 class="font-semibold text-sm text-current leading-5">Error!</h5>
                <p class="text-sm mt-1 text-current opacity-80 leading-4">Something went wrong. Please try again.</p>
                <div class="flex gap-2 mt-3">
                  <button class="px-3 py-1.5 text-xs font-medium rounded-lg bg-current/10 hover:bg-current/20 text-current border border-current/20">
                    Retry
                  </button>
                  <button class="px-3 py-1.5 text-xs font-medium rounded-lg bg-current/10 hover:bg-current/20 text-current border border-current/20">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 h-1 bg-current opacity-30 w-1/2"></div>
          </div>

          <!-- Info Toast Preview -->
          <div class="relative overflow-hidden bg-blue-50 dark:bg-blue-950 border-2 border-blue-500 dark:border-blue-400 text-blue-900 dark:text-blue-100 rounded-xl shadow-xl p-4 cursor-pointer hover:scale-105 transition-transform">
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-info" class="w-5 h-5 text-current mt-0.5 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <h5 class="font-semibold text-sm text-current leading-5">New Update Available</h5>
                <p class="text-sm mt-1 text-current opacity-80 leading-4">Click to download the latest version.</p>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 h-1 bg-current opacity-30 w-4/5"></div>
          </div>

          <!-- Warning Toast Preview -->
          <div class="relative overflow-hidden bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-500 dark:border-yellow-400 text-yellow-900 dark:text-yellow-100 rounded-xl shadow-xl p-4 cursor-pointer hover:scale-105 transition-transform">
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-current mt-0.5 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <h5 class="font-semibold text-sm text-current leading-5">Warning!</h5>
                <p class="text-sm mt-1 text-current opacity-80 leading-4">Please review your settings before continuing.</p>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 h-1 bg-current opacity-30 w-2/3"></div>
          </div>
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div class="flex items-start space-x-2">
            <UIcon name="i-lucide-lightbulb" class="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div class="text-sm text-blue-800 dark:text-blue-200">
              <strong>New Features:</strong>
              <ul class="mt-1 space-y-1 text-xs">
                <li>• Click anywhere on toast to dismiss</li>
                <li>• Progress bar shows remaining time</li>
                <li>• Smooth hover animations</li>
                <li>• Solid backgrounds for better readability</li>
                <li>• Error toasts appear at top, success at bottom</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Real-world Examples -->
    <div class="space-y-6">
      <h4 class="text-lg font-semibold text-foreground border-b border-border pb-2">
        Real-world Examples
      </h4>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <UButton 
          variant="soft" 
          color="success" 
          icon="i-lucide-trending-up"
          @click="showProjectUpdateToast"
          class="w-full"
        >
          Project Update
        </UButton>
        
        <UButton 
          variant="soft" 
          color="success" 
          icon="i-lucide-check-circle-2"
          @click="showTaskCompletedToast"
          class="w-full"
        >
          Task Completed
        </UButton>
        
        <UButton 
          variant="soft" 
          color="primary" 
          icon="i-lucide-save"
          @click="showDataSavedToast"
          class="w-full"
        >
          Data Saved
        </UButton>
        
        <UButton 
          variant="soft" 
          color="info" 
          icon="i-lucide-user-plus"
          @click="showUserInvitedToast"
          class="w-full"
        >
          User Invited
        </UButton>
      </div>
    </div>

    <!-- Feature Info -->
    <UAlert 
      color="primary" 
      variant="soft"
      icon="i-lucide-lightbulb"
      title="Enhanced Toast Features"
      description="Our useDualToast composable provides smart positioning (errors at top, success at bottom), enhanced styling, and pre-built quick actions for common scenarios."
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDualToast } from '~/composables/useDualToast'

// Use our enhanced dual toast system with Nuxt UI v3 integration
const toast = useDualToast()

// Props for controlling sections
const props = defineProps({
  showControls: {
    type: Boolean,
    default: true
  },
  defaultShowPreview: {
    type: Boolean,
    default: false
  }
})

// State
const showPreview = ref(props.defaultShowPreview)

// Basic toast methods - enhanced
const showSuccessToast = () => {
  toast.success('Success!', 'Your action was completed successfully.')
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

// Advanced toast methods - using enhanced useDualToast features
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

const clearAllToasts = () => {
  toast.clear()
}

// Real-world examples
const showProjectUpdateToast = () => {
  toast.projectUpdate('Website Redesign', 85)
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
</script>