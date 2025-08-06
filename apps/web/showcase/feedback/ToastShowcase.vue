<!-- showcase/feedback/ToastShowcase.vue - Optimized with Unified Toast Component -->
<template>
  <div class="space-y-8">
    <!-- Header Section - Enhanced -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Toast System</h3>
        <div class="flex items-center gap-2">
          <UBadge color="success" variant="soft">Unified Component</UBadge>
          <UBadge color="primary" variant="solid">v3.0</UBadge>
          <UButton 
            variant="outline" 
            size="sm" 
            icon="i-lucide-trash-2"
            @click="clearAllToasts"
            color="error"
            class="hover:scale-105 transition-transform"
          >
            Clear All
          </UButton>
          <UButton 
            variant="outline" 
            size="sm" 
            icon="i-lucide-eye"
            @click="showPreview = !showPreview"
            class="hover:scale-105 transition-transform"
          >
            {{ showPreview ? 'Hide' : 'Show' }} Preview
          </UButton>
        </div>
      </div>
      <p class="text-muted-foreground text-lg">
        Unified toast system using <code class="px-2 py-1 bg-primary-100 dark:bg-primary-900 rounded text-primary-600 dark:text-primary-400">Toast.vue</code> component. 
        <span class="font-semibold text-amber-600 dark:text-amber-400">All colors from app.config.ts</span> - fully consistent!
      </p>
    </div>

    <!-- Basic Toast Examples - Enhanced -->
    <UCard class="border-0 shadow-2xl bg-gradient-to-br from-white/90 to-neutral-50/90 dark:from-neutral-900/90 dark:to-neutral-800/90 backdrop-blur-xl">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
            <UIcon name="i-lucide-message-circle" class="w-5 h-5 text-white" />
          </div>
          <h4 class="text-lg font-semibold text-foreground">Basic Toast Types</h4>
        </div>
      </template>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UButton 
          color="success"
          variant="outline"
          icon="i-lucide-check-circle"
          @click="showSuccessToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 border-2"
        >
          Success
        </UButton>
        
        <UButton 
          color="error"
          variant="outline"
          icon="i-lucide-x-circle"
          @click="showErrorToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 border-2"
        >
          Error
        </UButton>
        
        <UButton 
          color="warning"
          variant="outline"
          icon="i-lucide-alert-triangle"
          @click="showWarningToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 border-2"
        >
          Warning
        </UButton>
        
        <UButton 
          color="info"
          variant="outline"
          icon="i-lucide-info"
          @click="showInfoToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 border-2"
        >
          Info
        </UButton>
      </div>
    </UCard>

    <!-- Advanced Toast Examples - Enhanced -->
    <UCard class="border-0 shadow-2xl bg-gradient-to-br from-purple-50/90 to-indigo-50/90 dark:from-purple-950/50 dark:to-indigo-950/50 backdrop-blur-xl border border-purple-200 dark:border-purple-800">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-white" />
          </div>
          <h4 class="text-lg font-semibold text-foreground">Advanced Toast Features</h4>
        </div>
      </template>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UButton 
          variant="soft"
          icon="i-lucide-server-crash"
          @click="showServerErrorToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          Server Error (with Retry)
        </UButton>
        
        <UButton 
          variant="soft"
          icon="i-lucide-loader-2"
          @click="showLoadingToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          Loading Toast
        </UButton>
        
        <UButton 
          variant="soft"
          icon="i-lucide-help-circle"
          @click="showConfirmToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          Confirmation Toast
        </UButton>
      </div>
    </UCard>

    <!-- Real-world Examples - Enhanced -->
    <UCard class="border-0 shadow-2xl bg-gradient-to-br from-cyan-50/90 to-teal-50/90 dark:from-cyan-950/50 dark:to-teal-950/50 backdrop-blur-xl border border-cyan-200 dark:border-cyan-800">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center">
            <UIcon name="i-lucide-briefcase" class="w-5 h-5 text-white" />
          </div>
          <h4 class="text-lg font-semibold text-foreground">Real-world Examples</h4>
        </div>
      </template>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <UButton 
          variant="soft" 
          color="success" 
          icon="i-lucide-trending-up"
          @click="showProjectUpdateToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          Project Update
        </UButton>
        
        <UButton 
          variant="soft" 
          color="success" 
          icon="i-lucide-check-circle-2"
          @click="showTaskCompletedToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          Task Completed
        </UButton>
        
        <UButton 
          variant="soft" 
          color="primary" 
          icon="i-lucide-save"
          @click="showDataSavedToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          Data Saved
        </UButton>
        
        <UButton 
          variant="soft" 
          color="info" 
          icon="i-lucide-user-plus"
          @click="showUserInvitedToast"
          class="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          User Invited
        </UButton>
      </div>
    </UCard>

    <!-- Live Toast Component Preview - Using Real Component -->
    <UCard v-if="showPreview" class="border-0 shadow-2xl bg-gradient-to-br from-slate-50/90 to-neutral-100/90 dark:from-slate-900/90 dark:to-neutral-900/90 backdrop-blur-xl">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-slate-600 to-neutral-700 rounded-xl flex items-center justify-center">
            <UIcon name="i-lucide-eye" class="w-5 h-5 text-white" />
          </div>
          <h4 class="text-lg font-semibold text-foreground">Live Toast Component Preview</h4>
        </div>
      </template>
      
      <div class="space-y-6">
        <div class="flex items-center gap-2 text-sm">
          <UIcon name="i-lucide-info" class="w-4 h-4 text-blue-500" />
          <span class="text-muted-foreground">These are live Toast.vue components with consistent app.config.ts colors:</span>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Live Success Toast -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Success Toast (Bottom)</span>
            </div>
            <div class="relative">
              <Toast
                title="Success!"
                description="Your data has been saved successfully with the unified component."
                color="success"
                icon="i-lucide-check-circle"
                :timeout="0"
                position="bottom"
                :show-progress="false"
                :closable="false"
              />
            </div>
          </div>

          <!-- Live Error Toast -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span class="text-sm font-semibold text-red-600 dark:text-red-400">Error Toast (Top)</span>
            </div>
            <div class="relative">
              <Toast
                title="Error!"
                description="Something went wrong. Please try again."
                color="error"
                icon="i-lucide-x-circle"
                :timeout="0"
                position="top"
                :show-progress="false"
                :closable="false"
                :actions="[
                  { label: 'Retry', onClick: () => {} },
                  { label: 'Dismiss', onClick: () => {} }
                ]"
              />
            </div>
          </div>

          <!-- Live Warning Toast -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span class="text-sm font-semibold text-amber-600 dark:text-amber-400">Warning Toast (Top)</span>
            </div>
            <div class="relative">
              <Toast
                title="Warning!"
                description="Please review your settings before continuing."
                color="warning"
                icon="i-lucide-alert-triangle"
                :timeout="0"
                position="top"
                :show-progress="false"
                :closable="false"
              />
            </div>
          </div>

          <!-- Live Info Toast -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">Info Toast (Bottom)</span>
            </div>
            <div class="relative">
              <Toast
                title="Information"
                description="Here is some important information for you."
                color="info"
                icon="i-lucide-info"
                :timeout="0"
                position="bottom"
                :show-progress="false"
                :closable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Optimization Info -->
    <UAlert 
      color="primary" 
      variant="soft"
      icon="i-lucide-rocket"
      title="Optimized Toast System"
      description="✅ Single Toast.vue component ✅ Colors from app.config.ts ✅ No duplicate styling ✅ Vue component instead of DOM manipulation ✅ Consistent across all UI ✅ Fully type-safe"
      class="border-2 border-primary-200 dark:border-primary-800 shadow-xl shadow-primary-500/10"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDualToast } from '~/composables/useDualToast'
import Toast from '~/components/ui/Toast.vue'

// Use our optimized dual toast system
const toast = useDualToast()

// State
const showPreview = ref(false)

// Basic toast methods - now using unified component
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

// Advanced toast methods - using optimized useDualToast features
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