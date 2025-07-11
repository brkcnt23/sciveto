<!-- components/showcase/StatusShowcase.vue -->
<template>
  <div class="space-y-8">
    <!-- Classic Dot Style -->
    <div class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Classic Dot Style
      </h4>
      
      <!-- User Status -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">User Status</h5>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="flex flex-col items-center space-y-2 p-3 bg-gray-50 rounded-lg">
            <StatusIndicator status="online" label="Online" size="lg" pulse />
          </div>
          <div class="flex flex-col items-center space-y-2 p-3 bg-gray-50 rounded-lg">
            <StatusIndicator status="away" label="Away" size="lg" />
          </div>
          <div class="flex flex-col items-center space-y-2 p-3 bg-gray-50 rounded-lg">
            <StatusIndicator status="busy" label="Busy" size="lg" />
          </div>
          <div class="flex flex-col items-center space-y-2 p-3 bg-gray-50 rounded-lg">
            <StatusIndicator status="offline" label="Offline" size="lg" />
          </div>
          <div class="flex flex-col items-center space-y-2 p-3 bg-gray-50 rounded-lg">
            <StatusIndicator status="dnd" label="Do Not Disturb" size="lg" />
          </div>
          <div class="flex flex-col items-center space-y-2 p-3 bg-gray-50 rounded-lg">
            <StatusIndicator status="active" label="Active" size="lg" pulse />
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">System Status</h5>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span class="font-medium">API Server</span>
            <StatusIndicator status="live" label="Operational" pulse />
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span class="font-medium">Database</span>
            <StatusIndicator status="connected" label="Connected" />
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
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Project Status</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">Website Redesign</span>
              <StatusIndicator status="in-progress" label="In Progress" />
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

    <!-- Modern Badge Style -->
    <div v-if="showBadgeStyle" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Modern Badge Style (Nuxt UI v3)
      </h4>
      
      <!-- Online Status -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Online Status</h5>
        <div class="flex flex-wrap gap-3">
          <StatusIndicator variant="badge" status="online" label="Online" icon="i-lucide-wifi" />
          <StatusIndicator variant="badge" status="away" label="Away" icon="i-lucide-clock" />
          <StatusIndicator variant="badge" status="busy" label="Busy" icon="i-lucide-minus-circle" />
          <StatusIndicator variant="badge" status="offline" label="Offline" icon="i-lucide-wifi-off" />
        </div>
      </div>

      <!-- Project Status -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Project Status</h5>
        <div class="flex flex-wrap gap-3">
          <StatusIndicator variant="badge" status="planning" label="Planning" icon="i-lucide-calendar" />
          <StatusIndicator variant="badge" status="in-progress" label="In Progress" icon="i-lucide-play" />
          <StatusIndicator variant="badge" status="review" label="In Review" icon="i-lucide-eye" />
          <StatusIndicator variant="badge" status="done" label="Completed" icon="i-lucide-check-circle" />
        </div>
      </div>

      <!-- Task Status -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Task Status</h5>
        <div class="flex flex-wrap gap-3">
          <StatusIndicator variant="badge" status="pending" label="To Do" icon="i-lucide-circle" />
          <StatusIndicator variant="badge" status="in-progress" label="In Progress" icon="i-lucide-loader" />
          <StatusIndicator variant="badge" status="done" label="Done" icon="i-lucide-check-circle-2" />
        </div>
      </div>

      <!-- System Status -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">System Status</h5>
        <div class="flex flex-wrap gap-3">
          <StatusIndicator variant="badge" status="operational" label="Operational" icon="i-lucide-server" pulse />
          <StatusIndicator variant="badge" status="degraded" label="Degraded" icon="i-lucide-alert-triangle" />
          <StatusIndicator variant="badge" status="down" label="Down" icon="i-lucide-x-circle" />
          <StatusIndicator variant="badge" status="maintenance" label="Maintenance" icon="i-lucide-settings" />
        </div>
      </div>
    </div>

    <!-- Size Variations -->
    <div v-if="showSizes" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Size Variations
      </h4>
      
      <!-- Dot Sizes -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Dot Sizes</h5>
        <div class="flex items-center space-x-6">
          <StatusIndicator status="online" label="XS" size="xs" />
          <StatusIndicator status="online" label="SM" size="sm" />
          <StatusIndicator status="online" label="MD" size="md" />
          <StatusIndicator status="online" label="LG" size="lg" />
          <StatusIndicator status="online" label="XL" size="xl" />
        </div>
      </div>

      <!-- Badge Sizes -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Badge Sizes</h5>
        <div class="flex items-center space-x-4 flex-wrap gap-2">
          <StatusIndicator variant="badge" status="success" label="XS" size="xs" />
          <StatusIndicator variant="badge" status="success" label="SM" size="sm" />
          <StatusIndicator variant="badge" status="success" label="MD" size="md" />
          <StatusIndicator variant="badge" status="success" label="LG" size="lg" />
          <StatusIndicator variant="badge" status="success" label="XL" size="xl" />
        </div>
      </div>
    </div>

    <!-- Interactive Examples -->
    <div v-if="showInteractive" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Interactive Examples
      </h4>
      
      <!-- Live Status Simulation -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Live Status Simulation</h5>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UCard class="p-4">
            <div class="flex items-center justify-between">
              <span class="font-medium">Server Status</span>
              <StatusIndicator 
                :status="serverStatus" 
                :label="getStatusLabel(serverStatus)" 
                :pulse="serverStatus === 'maintenance'" 
              />
            </div>
          </UCard>
          
          <UCard class="p-4">
            <div class="flex items-center justify-between">
              <span class="font-medium">User Activity</span>
              <StatusIndicator 
                variant="badge"
                :status="userStatus" 
                :label="getStatusLabel(userStatus)"
                icon="i-lucide-user"
              />
            </div>
          </UCard>
          
          <UCard class="p-4">
            <div class="flex items-center justify-between">
              <span class="font-medium">Build Status</span>
              <StatusIndicator 
                variant="badge"
                :status="buildStatus" 
                :label="getStatusLabel(buildStatus)"
                :pulse="buildStatus === 'in-progress'"
                icon="i-lucide-settings"
              />
            </div>
          </UCard>
        </div>
        
        <div class="flex justify-center">
          <UButton 
            variant="outline" 
            @click="simulateStatusChanges"
            :loading="isSimulating"
          >
            {{ isSimulating ? 'Simulating...' : 'Simulate Status Changes' }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Toggle Controls -->
    <div v-if="showControls" class="pt-6 border-t border-slate-200">
      <h4 class="font-semibold text-slate-700 mb-4">Show/Hide Sections</h4>
      <div class="flex flex-wrap gap-2">
        <UButton 
          :variant="showBadgeStyle ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showBadgeStyle = !showBadgeStyle"
        >
          Badge Style
        </UButton>
        <UButton 
          :variant="showSizes ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showSizes = !showSizes"
        >
          Size Variations
        </UButton>
        <UButton 
          :variant="showInteractive ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showInteractive = !showInteractive"
        >
          Interactive Examples
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props for controlling sections
const props = defineProps({
  showControls: {
    type: Boolean,
    default: true
  },
  defaultShowBadgeStyle: {
    type: Boolean,
    default: true
  },
  defaultShowSizes: {
    type: Boolean,
    default: false
  },
  defaultShowInteractive: {
    type: Boolean,
    default: true
  }
})

// Reactive state
const showBadgeStyle = ref(props.defaultShowBadgeStyle)
const showSizes = ref(props.defaultShowSizes)
const showInteractive = ref(props.defaultShowInteractive)

// Interactive status simulation
const serverStatus = ref('live')
const userStatus = ref('online')
const buildStatus = ref('success')
const isSimulating = ref(false)

let simulationInterval = null

// Status options
const statusOptions = {
  server: ['live', 'maintenance', 'down', 'degraded'],
  user: ['online', 'away', 'busy', 'offline'],
  build: ['success', 'in-progress', 'error', 'pending']
}

// Get human readable status labels
const getStatusLabel = (status) => {
  const labels = {
    live: 'Operational',
    maintenance: 'Maintenance',
    down: 'Down',
    degraded: 'Degraded',
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline',
    success: 'Success',
    'in-progress': 'Building',
    error: 'Failed',
    pending: 'Pending'
  }
  return labels[status] || status
}

// Simulate status changes
const simulateStatusChanges = async () => {
  isSimulating.value = true
  
  // Change statuses every 1.5 seconds
  simulationInterval = setInterval(() => {
    // Randomly change each status
    const serverOptions = statusOptions.server
    const userOptions = statusOptions.user
    const buildOptions = statusOptions.build
    
    serverStatus.value = serverOptions[Math.floor(Math.random() * serverOptions.length)]
    userStatus.value = userOptions[Math.floor(Math.random() * userOptions.length)]
    buildStatus.value = buildOptions[Math.floor(Math.random() * buildOptions.length)]
  }, 1500)
  
  // Stop simulation after 10 seconds
  setTimeout(() => {
    if (simulationInterval) {
      clearInterval(simulationInterval)
      simulationInterval = null
    }
    isSimulating.value = false
    
    // Reset to good states
    serverStatus.value = 'live'
    userStatus.value = 'online'
    buildStatus.value = 'success'
  }, 10000)
}

// Cleanup
onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})
</script>