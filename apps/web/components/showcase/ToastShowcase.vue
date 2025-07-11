<!-- components/showcase/ToastShowcase.vue -->
<template>
  <div class="space-y-8">
    <!-- Basic Toast Examples -->
    <div class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Basic Toast Examples
      </h4>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UButton 
          color="success"
          variant="outline"
          icon="i-lucide-check-circle"
          @click="showSuccessToast"
        >
          Success Toast
        </UButton>
        
        <UButton 
          color="error"
          variant="outline"
          icon="i-lucide-x-circle"
          @click="showErrorToast"
        >
          Error Toast
        </UButton>
        
        <UButton 
          color="warning"
          variant="outline"
          icon="i-lucide-alert-triangle"
          @click="showWarningToast"
        >
          Warning Toast
        </UButton>
        
        <UButton 
          color="info"
          variant="outline"
          icon="i-lucide-info"
          @click="showInfoToast"
        >
          Info Toast
        </UButton>
      </div>
    </div>

    <!-- Toast Component Preview -->
    <div v-if="showPreview" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Toast Component Preview
      </h4>
      
      <div class="bg-gray-50 p-6 rounded-lg border">
        <p class="text-sm text-gray-600 mb-4">Preview of Toast components (not functional, just visual):</p>
        
        <div class="space-y-4 max-w-md">
          <!-- Success Toast Preview -->
          <div class="border-green-200 bg-green-50/95 text-green-900 shadow-green-100/50 border rounded-lg p-4 flex items-start space-x-3">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div class="flex-1">
              <h5 class="font-semibold text-sm">Success!</h5>
              <p class="text-sm text-green-800 mt-1">Your data has been saved successfully.</p>
            </div>
            <UButton variant="ghost" size="xs" icon="i-lucide-x" />
          </div>

          <!-- Error Toast Preview -->  
          <div class="border-red-200 bg-red-50/95 text-red-900 shadow-red-100/50 border rounded-lg p-4 flex items-start space-x-3 border-l-4 border-l-red-500">
            <UIcon name="i-lucide-x-circle" class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div class="flex-1">
              <h5 class="font-semibold text-sm">Error!</h5>
              <p class="text-sm text-red-800 mt-1">Something went wrong. Please try again.</p>
              <div class="flex gap-2 mt-3">
                <UButton size="xs" color="error" variant="outline">Retry</UButton>
                <UButton size="xs" variant="ghost">Dismiss</UButton>
              </div>
            </div>
            <UButton variant="ghost" size="xs" icon="i-lucide-x" />
          </div>

          <!-- Warning Toast Preview -->
          <div class="border-yellow-200 bg-yellow-50/95 text-yellow-900 shadow-yellow-100/50 border rounded-lg p-4 flex items-start space-x-3 border-l-4 border-l-yellow-500">
            <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div class="flex-1">
              <h5 class="font-semibold text-sm">Warning!</h5>
              <p class="text-sm text-yellow-800 mt-1">Please review your settings before continuing.</p>
            </div>
            <UButton variant="ghost" size="xs" icon="i-lucide-x" />
          </div>

          <!-- Info Toast Preview -->
          <div class="border-blue-200 bg-blue-50/95 text-blue-900 shadow-blue-100/50 border rounded-lg p-4 flex items-start space-x-3">
            <UIcon name="i-lucide-info" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div class="flex-1">
              <h5 class="font-semibold text-sm">Information</h5>
              <p class="text-sm text-blue-800 mt-1">Here is some important information for you.</p>
            </div>
            <UButton variant="ghost" size="xs" icon="i-lucide-x" />
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Toast Features -->
    <div v-if="showAdvanced" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Advanced Toast Features
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Toast with Actions -->
        <UButton 
          variant="outline"
          icon="i-lucide-settings"
          @click="showActionToast"
        >
          Toast with Actions
        </UButton>
        
        <!-- Toast with Avatar -->
        <UButton 
          variant="outline"
          icon="i-lucide-user"
          @click="showAvatarToast"
        >
          Toast with Avatar
        </UButton>
        
        <!-- Persistent Toast -->
        <UButton 
          variant="outline"
          icon="i-lucide-clock"
          @click="showPersistentToast"
        >
          Persistent Toast
        </UButton>
        
        <!-- Custom Duration -->
        <UButton 
          variant="outline"
          icon="i-lucide-timer"
          @click="showCustomDurationToast"
        >
          10s Duration Toast
        </UButton>
        
        <!-- Different Sizes -->
        <UButton 
          variant="outline"
          icon="i-lucide-maximize"
          @click="showSizeToasts"
        >
          Different Sizes
        </UButton>
        
        <!-- Position Override -->
        <UButton 
          variant="outline"
          icon="i-lucide-move"
          @click="showPositionToasts"
        >
          Position Override
        </UButton>
      </div>
    </div>

    <!-- Real-world Examples -->
    <div v-if="showRealWorld" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Real-world Examples
      </h4>
      
      <div class="space-y-4">
        <!-- Project Management -->
        <div class="space-y-2">
          <h5 class="font-medium text-slate-600">Project Management</h5>
          <div class="flex flex-wrap gap-2">
            <UButton size="sm" variant="soft" @click="() => projectUpdate('Website Redesign', 85)">
              Project Updated
            </UButton>
            <UButton size="sm" variant="soft" @click="() => taskCompleted('Frontend Development')">
              Task Completed
            </UButton>
            <UButton size="sm" variant="soft" @click="() => dataSaved('Project Settings')">
              Data Saved
            </UButton>
          </div>
        </div>

        <!-- User Management -->
        <div class="space-y-2">
          <h5 class="font-medium text-slate-600">User Management</h5>
          <div class="flex flex-wrap gap-2">
            <UButton size="sm" variant="soft" @click="() => userInvited('john@example.com')">
              User Invited
            </UButton>
            <UButton size="sm" variant="soft" @click="() => permissionDenied('delete this item')">
              Permission Denied
            </UButton>
            <UButton size="sm" variant="soft" @click="() => itemDeleted('Project Alpha')">
              Item Deleted
            </UButton>
          </div>
        </div>

        <!-- System Notifications -->
        <div class="space-y-2">
          <h5 class="font-medium text-slate-600">System Notifications</h5>
          <div class="flex flex-wrap gap-2">
            <UButton size="sm" variant="soft" @click="() => serverError('Connection timeout')">
              Server Error
            </UButton>
            <UButton size="sm" variant="soft" @click="networkError">
              Network Error
            </UButton>
            <UButton size="sm" variant="soft" @click="() => maintenanceWarning('in 1 hour')">
              Maintenance Warning
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulation -->
    <div v-if="showSimulation" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Live Simulation
      </h4>
      
      <div class="flex flex-col sm:flex-row gap-4 items-center">
        <UButton 
          :variant="isSimulating ? 'solid' : 'outline'"
          :color="isSimulating ? 'error' : 'primary'"
          :loading="isSimulating"
          @click="toggleSimulation"
        >
          {{ isSimulating ? 'Stop Simulation' : 'Start Live Simulation' }}
        </UButton>
        
        <div class="text-sm text-slate-600">
          {{ isSimulating ? 'Simulating real-time notifications...' : 'Click to start live notification simulation' }}
        </div>
      </div>
      
      <div v-if="isSimulating" class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-sm text-blue-700">
            Live notifications are being generated every 3 seconds using our Toast component...
          </span>
        </div>
      </div>
    </div>

    <!-- Component Usage Info -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
      <div class="flex items-start space-x-3">
        <UIcon name="i-lucide-code" class="w-5 h-5 text-purple-600 mt-0.5" />
        <div>
          <h5 class="font-medium text-purple-900 mb-2">Custom Toast Component</h5>
          <p class="text-sm text-purple-800 mb-3">
            Using our custom Toast.vue component that wraps UToast with enhanced features:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="bg-white/60 p-3 rounded border border-purple-200">
              <h6 class="font-medium text-purple-900 mb-2">useDualToast Composable</h6>
              <ul class="text-purple-700 space-y-1 text-xs">
                <li>• Smart dual positioning (top/bottom)</li>
                <li>• Type-based routing (alerts vs notifications)</li>
                <li>• Quick action methods</li>
                <li>• Automatic icons and durations</li>
              </ul>
            </div>
            
            <div class="bg-white/60 p-3 rounded border border-purple-200">
              <h6 class="font-medium text-purple-900 mb-2">Toast.vue Component</h6>
              <ul class="text-purple-700 space-y-1 text-xs">
                <li>• Enhanced styling with animations</li>
                <li>• Type-based visual enhancements</li>
                <li>• Slot support for customization</li>
                <li>• Size variants (sm, md, lg)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Position Info -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
      <div class="flex items-start space-x-3">
        <UIcon name="i-lucide-info" class="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <h5 class="font-medium text-blue-900 mb-2">Smart Dual Toast System</h5>
          <p class="text-sm text-blue-800 mb-3">
            Toasts are intelligently routed based on their importance and purpose:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="bg-red-50 p-3 rounded border border-red-200">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                <span class="font-medium text-red-900">Top Right - Alerts</span>
              </div>
              <ul class="text-red-700 space-y-1 text-xs">
                <li>• Error messages (7s duration)</li>
                <li>• Warning notifications</li>
                <li>• Requires immediate attention</li>
                <li>• Enhanced visual emphasis</li>
              </ul>
            </div>
            
            <div class="bg-green-50 p-3 rounded border border-green-200">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="font-medium text-green-900">Bottom Right - Notifications</span>
              </div>
              <ul class="text-green-700 space-y-1 text-xs">
                <li>• Success confirmations (4s duration)</li>
                <li>• Info messages</li>
                <li>• Less intrusive design</li>
                <li>• Positive user feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toggle Controls -->
    <div v-if="showControls" class="pt-6 border-t border-slate-200">
      <h4 class="font-semibold text-slate-700 mb-4">Show/Hide Sections</h4>
      <div class="flex flex-wrap gap-2">
        <UButton 
          :variant="showPreview ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showPreview = !showPreview"
        >
          Component Preview
        </UButton>
        <UButton 
          :variant="showAdvanced ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showAdvanced = !showAdvanced"
        >
          Advanced Features
        </UButton>
        <UButton 
          :variant="showRealWorld ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showRealWorld = !showRealWorld"
        >
          Real-world Examples
        </UButton>
        <UButton 
          :variant="showSimulation ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showSimulation = !showSimulation"
        >
          Live Simulation
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useDualToast } from '@/composables/useDualToast'
import Toast from '@/components/ui/Toast.vue'
const { toasts } = useDualToast()
const TOP_TYPES = ['error', 'danger', 'warning', 'alert']

function getPosition(toast) {
  if (toast.position && toast.position !== 'auto') return toast.position
  return TOP_TYPES.includes(toast.type) ? 'top' : 'bottom'
}

const topToasts = computed(() => toasts.value.filter(t => getPosition(t) === 'top'))
const bottomToasts = computed(() => toasts.value.filter(t => getPosition(t) === 'bottom'))
// Props for controlling sections
const props = defineProps({
  showControls: {
    type: Boolean,
    default: true
  },
  defaultShowPreview: {
    type: Boolean,
    default: true
  },
  defaultShowAdvanced: {
    type: Boolean,
    default: true
  },
  defaultShowRealWorld: {
    type: Boolean,
    default: true
  },
  defaultShowSimulation: {
    type: Boolean,
    default: true
  }
})

// State
const showPreview = ref(props.defaultShowPreview)
const showAdvanced = ref(props.defaultShowAdvanced)
const showRealWorld = ref(props.defaultShowRealWorld)
const showSimulation = ref(props.defaultShowSimulation)
const isSimulating = ref(false)

// Use our custom dual toast system
const { 
  success, 
  error, 
  warning, 
  info, 
  projectUpdate, 
  taskCompleted, 
  serverError, 
  maintenanceWarning,
  dataSaved,
  itemDeleted,
  userInvited,
  networkError,
  permissionDenied,
  showToast
} = useDualToast()

let simulationInterval = null

// Basic toast methods
const showSuccessToast = () => {
  success('Success!', 'Your action was completed successfully.')
}

const showErrorToast = () => {
  error('Error!', 'Something went wrong. Please try again.')
}

const showWarningToast = () => {
  warning('Warning!', 'Please review your settings before continuing.')
}

const showInfoToast = () => {
  info('Information', 'Here is some important information for you.')
}

// Advanced toast methods
const showActionToast = () => {
  error('Update Required', 'A critical security update is available.', {
    actions: [{
      label: 'Update Now',
      color: 'error',
      variant: 'solid',
      onClick: () => {
        success('Updating...', 'Please wait while we update your application.')
      }
    }, {
      label: 'Later',
      color: 'neutral',
      variant: 'ghost'
    }],
    duration: 10000
  })
}

const showAvatarToast = () => {
  success('New Team Member', 'Alice Johnson has joined your team.', {
    avatar: {
      src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      alt: 'Alice Johnson'
    }
  })
}

const showPersistentToast = () => {
  warning('Important Notice', 'This message will stay until you dismiss it.', {
    persistent: true,
    icon: 'i-lucide-alert-circle'
  })
}

const showCustomDurationToast = () => {
  info('10 Second Toast', 'This toast will stay for 10 seconds.', {
    duration: 10000,
    icon: 'i-lucide-timer'
  })
}

const showSizeToasts = () => {
  success('Small Toast', 'This is a small toast', { size: 'sm' })
  setTimeout(() => {
    info('Medium Toast', 'This is a medium toast', { size: 'md' })
  }, 500)
  setTimeout(() => {
    warning('Large Toast', 'This is a large toast', { size: 'lg' })
  }, 1000)
}

const showPositionToasts = () => {
  success('Bottom Success', 'This success toast is forced to bottom', { position: 'bottom' })
  setTimeout(() => {
    error('Top Error', 'This error toast is forced to top', { position: 'top' })
  }, 500)
}

// Simulation
const simulationMessages = [
  () => success('Payment Received', '$2,500 payment received for Project Alpha'),
  () => info('New Message', 'You have received a new message from client'),
  () => taskCompleted('UI Design Review'),
  () => projectUpdate('Mobile App', 75),
  () => dataSaved('User Preferences'),
  () => warning('Deadline Approaching', 'Project deadline in 2 days'),
  () => info('Build Complete', 'Production build completed successfully'),
  () => userInvited('designer@example.com')
]

const toggleSimulation = () => {
  if (isSimulating.value) {
    clearInterval(simulationInterval)
    simulationInterval = null
    isSimulating.value = false
  } else {
    isSimulating.value = true
    simulationInterval = setInterval(() => {
      const randomMessage = simulationMessages[Math.floor(Math.random() * simulationMessages.length)]
      randomMessage()
    }, 3000)
  }
}

// Cleanup
onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})
</script>