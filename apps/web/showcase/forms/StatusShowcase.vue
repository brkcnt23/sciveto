<template>
  <div class="space-y-8">
    <!-- Status Component Examples -->
    <div>
      <h4 class="font-semibold text-highlighted mb-4">Status Component Examples</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Basic Status Examples -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <h5 class="font-medium text-highlighted">Basic Status</h5>
          </template>
          
          <div class="space-y-3">
            <Status status="success" text="Project Completed" />
            <Status status="warning" text="Pending Review" />
            <Status status="error" text="Failed to Deploy" />
            <Status status="info" text="Information Available" />
            <Status status="active" text="Service Running" />
            <Status status="inactive" text="Service Stopped" />
          </div>
        </UCard>

        <!-- Status with Badges -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <h5 class="font-medium text-highlighted">Status with Badges</h5>
          </template>
          
          <div class="space-y-3">
            <Status status="success" text="Online Users" badge="1,234" />
            <Status status="warning" text="Pending Tasks" badge="42" />
            <Status status="error" text="Failed Jobs" badge="3" />
            <Status status="info" text="Notifications" badge="NEW" />
            <Status status="active" text="Active Sessions" badge="256" />
            <Status status="pending" text="Queue Items" badge="18" />
          </div>
        </UCard>

        <!-- Status Variants -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <h5 class="font-medium text-highlighted">Status Variants</h5>
          </template>
          
          <div class="space-y-3">
            <Status status="success" text="Default Variant" />
            <Status status="success" text="Card Variant" variant="card" />
            <Status status="success" text="Pill Variant" variant="pill" />
            <Status status="success" text="Inline Variant" variant="inline" />
          </div>
        </UCard>

        <!-- Status Sizes -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <h5 class="font-medium text-highlighted">Status Sizes</h5>
          </template>
          
          <div class="space-y-3">
            <Status status="success" text="Extra Small" size="xs" />
            <Status status="success" text="Small" size="sm" />
            <Status status="success" text="Medium (Default)" size="md" />
            <Status status="success" text="Large" size="lg" />
            <Status status="success" text="Extra Large" size="xl" />
          </div>
        </UCard>

        <!-- Animated Status -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <h5 class="font-medium text-highlighted">Animated Status</h5>
          </template>
          
          <div class="space-y-3">
            <Status status="success" text="Pulse Animation" pulse />
            <Status status="warning" text="Processing..." animated />
            <Status status="error" text="Connection Lost" pulse />
            <Status status="info" text="Syncing Data..." animated />
          </div>
        </UCard>

        <!-- Custom Status -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <h5 class="font-medium text-highlighted">Custom Status</h5>
          </template>
          
          <div class="space-y-3">
            <Status 
              color="primary" 
              icon="i-lucide-database" 
              text="Database Connected" 
              :show-dot="false"
            />
            <Status 
              color="secondary" 
              icon="i-lucide-wifi" 
              text="Network Status" 
              badge="98ms"
              :show-dot="false"
            />
            <Status 
              color="success" 
              icon="i-lucide-shield-check" 
              text="Security Scan" 
              badge="CLEAN"
              :show-dot="false"
            />
          </div>
        </UCard>

      </div>
    </div>

    <!-- Real-world Examples -->
    <div>
      <h4 class="font-semibold text-highlighted mb-4">Real-world Status Examples</h4>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- System Status Dashboard -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-server" class="w-5 h-5 text-primary" />
              <h5 class="font-medium text-highlighted">System Status</h5>
            </div>
          </template>
          
          <div class="space-y-4">
            <Status 
              status="success" 
              text="API Service" 
              badge="99.9% uptime"
              variant="card"
            />
            <Status 
              status="success" 
              text="Database" 
              badge="Healthy"
              variant="card"
            />
            <Status 
              status="warning" 
              text="Cache Service" 
              badge="Degraded"
              variant="card"
            />
            <Status 
              status="error" 
              text="Email Service" 
              badge="Down"
              variant="card"
            />
          </div>
        </UCard>

        <!-- User Activity Status -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-users" class="w-5 h-5 text-primary" />
              <h5 class="font-medium text-highlighted">User Activity</h5>
            </div>
          </template>
          
          <div class="space-y-4">
            <Status 
              status="active" 
              text="John Doe" 
              badge="Online"
              variant="card"
              size="sm"
            />
            <Status 
              status="warning" 
              text="Jane Smith" 
              badge="Away"
              variant="card"
              size="sm"
            />
            <Status 
              status="error" 
              text="Bob Johnson" 
              badge="Busy"
              variant="card"
              size="sm"
            />
            <Status 
              status="inactive" 
              text="Alice Brown" 
              badge="Offline"
              variant="card"
              size="sm"
            />
          </div>
        </UCard>

        <!-- Project Status -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-folder" class="w-5 h-5 text-primary" />
              <h5 class="font-medium text-highlighted">Project Status</h5>
            </div>
          </template>
          
          <div class="space-y-4">
            <Status 
              status="success" 
              text="Website Redesign" 
              badge="Completed"
              variant="card"
            />
            <Status 
              status="warning" 
              text="Mobile App" 
              badge="In Progress"
              variant="card"
              animated
            />
            <Status 
              status="pending" 
              text="API Integration" 
              badge="Pending"
              variant="card"
            />
            <Status 
              status="error" 
              text="Legacy Migration" 
              badge="Blocked"
              variant="card"
            />
          </div>
        </UCard>

        <!-- Deployment Status -->
        <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-rocket" class="w-5 h-5 text-primary" />
              <h5 class="font-medium text-highlighted">Deployment Status</h5>
            </div>
          </template>
          
          <div class="space-y-4">
            <Status 
              status="success" 
              text="Production" 
              badge="v2.1.0"
              variant="card"
              icon="i-lucide-check-circle"
              :show-dot="false"
            />
            <Status 
              status="warning" 
              text="Staging" 
              badge="Deploying..."
              variant="card"
              icon="i-lucide-clock"
              :show-dot="false"
              animated
            />
            <Status 
              status="info" 
              text="Development" 
              badge="v2.2.0-beta"
              variant="card"
              icon="i-lucide-code"
              :show-dot="false"
            />
          </div>
        </UCard>

      </div>
    </div>

    <!-- Interactive Status Demo -->
    <div>
      <h4 class="font-semibold text-highlighted mb-4">Interactive Status Demo</h4>
      <UCard variant="outline" class="bg-white dark:bg-neutral-800/50">
        <template #header>
          <div class="flex items-center justify-between">
            <h5 class="font-medium text-highlighted">Service Status Monitor</h5>
            <div class="flex gap-2">
              <UButton size="sm" @click="simulateStatusChange">
                <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-1" />
                Refresh
              </UButton>
              <UButton 
                size="sm" 
                :color="autoRefresh ? 'success' : 'neutral'"
                :variant="autoRefresh ? 'solid' : 'outline'"
                @click="toggleAutoRefresh"
              >
                <UIcon name="i-lucide-play" class="w-4 h-4 mr-1" />
                Auto Refresh
              </UButton>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Status 
            v-for="service in services" 
            :key="service.name"
            :status="service.status" 
            :text="service.name" 
            :badge="service.badge"
            variant="card"
            :animated="service.status === 'pending'"
            :pulse="service.status === 'warning'"
          />
        </div>
      </UCard>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Status from '~/components/ui/Status.vue'

// Service status data
const services = ref([
  { name: 'Web Server', status: 'success', badge: 'Online' },
  { name: 'Database', status: 'success', badge: 'Healthy' },
  { name: 'API Gateway', status: 'warning', badge: 'High Load' },
  { name: 'Cache Layer', status: 'success', badge: 'Optimal' },
  { name: 'CDN', status: 'success', badge: 'Global' },
  { name: 'Email Service', status: 'error', badge: 'Down' }
])

const autoRefresh = ref(false)
let refreshInterval = null

// Simulate status changes
const simulateStatusChange = () => {
  const statuses = ['success', 'warning', 'error', 'pending']
  services.value.forEach(service => {
    // 30% chance to change status
    if (Math.random() < 0.3) {
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)]
      service.status = newStatus
      
      // Update badge based on status
      switch (newStatus) {
        case 'success':
          service.badge = Math.random() > 0.5 ? 'Online' : 'Healthy'
          break
        case 'warning':
          service.badge = Math.random() > 0.5 ? 'High Load' : 'Degraded'
          break
        case 'error':
          service.badge = Math.random() > 0.5 ? 'Down' : 'Failed'
          break
        case 'pending':
          service.badge = 'Checking...'
          break
      }
    }
  })
}

const toggleAutoRefresh = () => {
  autoRefresh.value = !autoRefresh.value
  
  if (autoRefresh.value) {
    refreshInterval = setInterval(() => {
      simulateStatusChange()
    }, 3000)
  } else {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = null
    }
  }
}

// Cleanup on unmount
onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>