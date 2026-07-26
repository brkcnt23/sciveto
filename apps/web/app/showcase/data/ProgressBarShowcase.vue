<template>
  <div class="space-y-8">
    <!-- Header with Modern Badge -->
    <div class="flex items-center justify-between">
      <h4 class="font-semibold text-highlighted text-lg">
        📊 Progress Bar Showcase
      </h4>
      <UBadge color="primary" variant="soft" size="sm" class="gap-1.5">
        <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        Updated Component
      </UBadge>
    </div>

    <!-- Project Progress Examples using our ProgressBar component -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-folder" class="w-5 h-5 text-primary" />
        <h4 class="font-semibold text-highlighted text-lg">Project Progress Examples</h4>
      </div>
      
      <!-- Planning Phase -->
      <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/50">
        <ProgressBar
          :value="15"
          label="Planning Phase"
          status="planning"
          description="Requirements gathering and analysis"
          estimated="5 days left"
          :show-trend-icon="true"
          size="lg"
        />
      </div>

      <!-- Development Phase -->
      <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/50">
        <ProgressBar
          :value="45"
          label="Development Phase"
          status="in-progress"
          description="Frontend components implementation"
          estimated="3 days left"
          :show-trend-icon="true"
          size="lg"
        />
      </div>

      <!-- Testing Phase -->
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
        <ProgressBar
          :value="78"
          label="Testing Phase"
          status="testing"
          description="Unit tests and QA review"
          estimated="1 day left"
          :show-trend-icon="true"
          size="lg"
        />
      </div>

      <!-- Deployment Phase -->
      <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
        <ProgressBar
          :value="100"
          label="Deployment Phase"
          status="completed"
          description="Successfully deployed to production"
          :show-trend-icon="true"
          size="lg"
        />
      </div>
    </div>

    <!-- Multi-step Progress -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-workflow" class="w-5 h-5 text-secondary" />
        <h4 class="font-semibold text-highlighted text-lg">Multi-step Progress</h4>
      </div>
      
      <div class="grid grid-cols-1 gap-6">
        <!-- Frontend Development -->
        <div class="space-y-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <ProgressBar
            :value="3"
            :max="['Planning', 'Development', 'Testing', 'Deploy']"
            label="Frontend Development"
            status="in-progress"
            description="Currently in testing phase"
            :show-steps="true"
            size="lg"
          />
        </div>
        
        <!-- Backend Development -->
        <div class="space-y-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <ProgressBar
            :value="2"
            :max="['Design', 'API Dev', 'Database', 'Testing']"
            label="Backend Development"
            status="in-progress"
            description="Database implementation ongoing"
            :show-steps="true"
            size="lg"
          />
        </div>
      </div>
    </div>

    <!-- Loading Animations -->
    <div v-if="showAnimations" class="space-y-6">
      <div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-loader-2" class="w-5 h-5 text-warning animate-spin" />
          <h4 class="font-semibold text-highlighted text-lg">Loading States</h4>
        </div>
        <UButton size="xs" variant="outline" @click="toggleAnimations">
          <UIcon name="i-lucide-refresh-cw" class="w-3 h-3 mr-1" />
          Refresh
        </UButton>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <ProgressBar
              :value="null"
              label="Loading Data"
              status="in-progress"
              description="Fetching from server..."
              :is-loading="true"
              :show-loading-icon="true"
              size="lg"
            />
          </div>
          
          <div class="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <ProgressBar
              :value="null"
              label="Processing Files"
              status="in-progress"
              description="Uploading documents..."
              :is-loading="true"
              size="lg"
            />
          </div>
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <ProgressBar
              :value="null"
              label="Analyzing Data"
              status="in-progress"
              description="Machine learning in progress..."
              :is-loading="true"
              size="lg"
            />
          </div>
          
          <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/50">
            <ProgressBar
              :value="45"
              label="Upload Failed"
              status="error"
              description="Network connection lost"
              error-message="Please check your internet connection and try again"
              :show-trend-icon="true"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Vertical Progress Bars -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5 text-info" />
        <h4 class="font-semibold text-highlighted text-lg">Server Monitoring</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- CPU Usage -->
        <div class="text-center space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
          <UBadge color="info" variant="soft" size="sm" class="gap-1">
            <UIcon name="i-lucide-cpu" class="w-3 h-3" />
            CPU Usage
          </UBadge>
          <div class="flex flex-col items-center space-y-2">
            <div class="w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full h-32 flex items-end overflow-hidden">
              <div 
                class="w-full bg-info-500 dark:bg-info-400 rounded-full transition-all duration-500"
                :style="{ height: `${cpuUsage}%` }"
              ></div>
            </div>
            <div class="text-sm font-medium text-info-600 dark:text-info-400">{{ Math.round(cpuUsage) }}%</div>
          </div>
        </div>

        <!-- Memory Usage -->
        <div class="text-center space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
          <UBadge color="success" variant="soft" size="sm" class="gap-1">
            <UIcon name="i-lucide-hard-drive" class="w-3 h-3" />
            Memory
          </UBadge>
          <div class="flex flex-col items-center space-y-2">
            <div class="w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full h-32 flex items-end overflow-hidden">
              <div 
                class="w-full bg-success-500 dark:bg-success-400 rounded-full transition-all duration-500"
                :style="{ height: `${memoryUsage}%` }"
              ></div>
            </div>
            <div class="text-sm font-medium text-success-600 dark:text-success-400">{{ Math.round(memoryUsage) }}%</div>
          </div>
        </div>

        <!-- Storage Usage -->
        <div class="text-center space-y-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800/50">
          <UBadge color="warning" variant="soft" size="sm" class="gap-1">
            <UIcon name="i-lucide-database" class="w-3 h-3" />
            Storage
          </UBadge>
          <div class="flex flex-col items-center space-y-2">
            <div class="w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full h-32 flex items-end overflow-hidden">
              <div 
                class="w-full bg-warning-500 dark:bg-warning-400 rounded-full transition-all duration-500"
                :style="{ height: `${storageUsage}%` }"
              ></div>
            </div>
            <div class="text-sm font-medium text-warning-600 dark:text-warning-400">{{ Math.round(storageUsage) }}%</div>
          </div>
        </div>

        <!-- Network Usage -->
        <div class="text-center space-y-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/50">
          <UBadge color="error" variant="soft" size="sm" class="gap-1">
            <UIcon name="i-lucide-wifi" class="w-3 h-3" />
            Network
          </UBadge>
          <div class="flex flex-col items-center space-y-2">
            <div class="w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full h-32 flex items-end overflow-hidden">
              <div 
                class="w-full bg-error-500 dark:bg-error-400 rounded-full transition-all duration-500"
                :style="{ height: `${networkUsage}%` }"
              ></div>
            </div>
            <div class="text-sm font-medium text-error-600 dark:text-error-400">{{ Math.round(networkUsage) }}%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Controls -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-sliders" class="w-5 h-5 text-secondary" />
        <h4 class="font-semibold text-highlighted text-lg">Interactive Controls</h4>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Interactive Progress -->
        <div class="space-y-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <ProgressBar
            :value="interactiveProgress"
            label="Interactive Progress"
            status="in-progress"
            description="Use controls below to adjust"
            :show-trend-icon="true"
            size="lg"
          />
          <div class="flex gap-2">
            <UButton size="xs" @click="interactiveProgress = Math.max(0, interactiveProgress - 10)">
              <UIcon name="i-lucide-minus" class="w-3 h-3" />
            </UButton>
            <UButton size="xs" @click="interactiveProgress = Math.min(100, interactiveProgress + 10)">
              <UIcon name="i-lucide-plus" class="w-3 h-3" />
            </UButton>
            <UButton size="xs" variant="outline" @click="simulateProgress">
              <UIcon name="i-lucide-play" class="w-3 h-3 mr-1" />
              Simulate
            </UButton>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="space-y-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h5 class="text-sm font-medium text-muted flex items-center gap-2">
            <UIcon name="i-lucide-ruler" class="w-4 h-4" />
            Size Variants
          </h5>
          <div class="space-y-3">
            <ProgressBar :value="65" label="Extra Small" size="xs" />
            <ProgressBar :value="75" label="Small" size="sm" />
            <ProgressBar :value="85" label="Medium" size="md" />
            <ProgressBar :value="95" label="Large" size="lg" />
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
      <UButton size="sm" @click="toggleAnimations">
        <UIcon name="i-lucide-zap" class="w-4 h-4 mr-1" />
        {{ showAnimations ? 'Hide' : 'Show' }} Animations
      </UButton>
      
      <UButton size="sm" variant="outline" @click="randomizeProgress">
        <UIcon name="i-lucide-shuffle" class="w-4 h-4 mr-1" />
        Randomize Values
      </UButton>
      
      <UButton size="sm" variant="outline" @click="resetProgress">
        <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4 mr-1" />
        Reset All
      </UButton>
    </div>
  </div>
</template>

<script setup>
// Import our updated component
import ProgressBar from '~/components/base/ProgressBar.vue'

// Component name for debugging
defineOptions({
  name: 'ProgressBarShowcase'
})

// Reactive state
const showAnimations = ref(true)
const interactiveProgress = ref(45)

// Server stats - FLOAT SAYILARI KALDIRILDI
const cpuUsage = ref(68)
const memoryUsage = ref(45)
const storageUsage = ref(82)
const networkUsage = ref(23)

// Methods
const toggleAnimations = () => {
  showAnimations.value = !showAnimations.value
}

const simulateProgress = () => {
  const interval = setInterval(() => {
    if (interactiveProgress.value < 100) {
      interactiveProgress.value += Math.random() * 10
    } else {
      clearInterval(interval)
      interactiveProgress.value = 100
    }
  }, 200)
}

const randomizeProgress = () => {
  cpuUsage.value = Math.floor(Math.random() * 100)
  memoryUsage.value = Math.floor(Math.random() * 100)
  storageUsage.value = Math.floor(Math.random() * 100)
  networkUsage.value = Math.floor(Math.random() * 100)
  interactiveProgress.value = Math.floor(Math.random() * 100)
}

const resetProgress = () => {
  cpuUsage.value = 68
  memoryUsage.value = 45
  storageUsage.value = 82
  networkUsage.value = 23
  interactiveProgress.value = 45
}

// Auto-update server stats - SADECE TAM SAYILAR
onMounted(() => {
  const interval = setInterval(() => {
    cpuUsage.value = Math.max(0, Math.min(100, Math.round(cpuUsage.value + (Math.random() - 0.5) * 10)))
    memoryUsage.value = Math.max(0, Math.min(100, Math.round(memoryUsage.value + (Math.random() - 0.5) * 5)))
    storageUsage.value = Math.max(0, Math.min(100, Math.round(storageUsage.value + (Math.random() - 0.5) * 2)))
    networkUsage.value = Math.max(0, Math.min(100, Math.round(networkUsage.value + (Math.random() - 0.5) * 15)))
  }, 3000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>