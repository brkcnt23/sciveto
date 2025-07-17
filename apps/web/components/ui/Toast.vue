<!-- components/ui/Toast.vue - UPDATED VERSION -->
<template>
  <div>
    <!-- Top Toasts - Error/Warning -->
    <Teleport to="body">
      <div 
        id="top-toasts" 
        class="fixed top-4 right-4 z-[9999] pointer-events-none max-w-sm w-full"
      >
        <div class="space-y-3 pointer-events-auto">
          <TransitionGroup name="slide-top" tag="div" class="space-y-3">
            <div
              v-for="toast in topToasts"
              :key="toast.id"
              :class="getToastClasses(toast)"
              class="relative overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm flex items-start space-x-3 transition-all duration-300 cursor-pointer"
              @click="handleToastClick(toast)"
            >
              <!-- Icon -->
              <UIcon 
                :name="toast.icon"
                :class="['w-5 h-5 mt-0.5 flex-shrink-0', getIconClasses(toast.type)]"
              />
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h5 class="font-semibold text-sm">{{ toast.title }}</h5>
                <p v-if="toast.description" class="text-sm mt-1 opacity-90">
                  {{ toast.description }}
                </p>
                
                <!-- Actions - Stop propagation to prevent closing -->
                <div v-if="toast.actions?.length" class="flex gap-2 mt-3" @click.stop>
                  <UButton
                    v-for="(action, index) in toast.actions"
                    :key="index"
                    :label="action.label"
                    :color="action.color || 'neutral'"
                    :variant="action.variant || 'outline'"
                    size="xs"
                    @click="action.onClick"
                  />
                </div>
              </div>
              
              <!-- Close Button - Always visible for action toasts -->
              <button
                v-if="toast.actions?.length"
                class="opacity-70 hover:opacity-100 transition-opacity p-1 flex-shrink-0"
                @click.stop="handleRemoveToast(toast.id)"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4" />
              </button>

              <!-- Progress Bar -->
              <div 
                v-if="toast.duration && toast.duration > 0"
                class="absolute bottom-0 left-0 h-1 bg-current opacity-30 transition-all duration-linear"
                :style="{ 
                  width: getProgressWidth(toast),
                  animationDuration: toast.duration + 'ms'
                }"
              ></div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </Teleport>

    <!-- Bottom Toasts - Success/Info -->
    <Teleport to="body">
      <div 
        id="bottom-toasts" 
        class="fixed bottom-4 right-4 z-[9998] pointer-events-none max-w-sm w-full"
      >
        <div class="space-y-3 pointer-events-auto">
          <TransitionGroup name="slide-bottom" tag="div" class="space-y-3">
            <div
              v-for="toast in bottomToasts"
              :key="toast.id"
              :class="getToastClasses(toast)"
              class="relative overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm flex items-start space-x-3 transition-all duration-300 cursor-pointer"
              @click="handleToastClick(toast)"
            >
              <!-- Icon -->
              <UIcon 
                :name="toast.icon"
                :class="['w-5 h-5 mt-0.5 flex-shrink-0', getIconClasses(toast.type)]"
              />
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h5 class="font-semibold text-sm">{{ toast.title }}</h5>
                <p v-if="toast.description" class="text-sm mt-1 opacity-90">
                  {{ toast.description }}
                </p>
                
                <!-- Actions - Stop propagation to prevent closing -->
                <div v-if="toast.actions?.length" class="flex gap-2 mt-3" @click.stop>
                  <UButton
                    v-for="(action, index) in toast.actions"
                    :key="index"
                    :label="action.label"
                    :color="action.color || 'neutral'"
                    :variant="action.variant || 'outline'"
                    size="xs"
                    @click="action.onClick"
                  />
                </div>
              </div>
              
              <!-- Close Button - Only visible for action toasts -->
              <button
                v-if="toast.actions?.length"
                class="opacity-70 hover:opacity-100 transition-opacity p-1 flex-shrink-0"
                @click.stop="handleRemoveToast(toast.id)"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4" />
              </button>

              <!-- Progress Bar -->
              <div 
                v-if="toast.duration && toast.duration > 0"
                class="absolute bottom-0 left-0 h-1 bg-current opacity-30 transition-all duration-linear progress-bar"
                :style="{ animationDuration: toast.duration + 'ms' }"
              ></div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
// Get toasts from our composable
const { toasts, removeToast } = useDualToast()

// Make sure removeToast is available
if (!removeToast) {
  console.error('removeToast function not available from useDualToast')
}

// Define which types go to top (alerts)
const TOP_TYPES = ['error', 'warning']

// Computed for positioning
const topToasts = computed(() => 
  toasts.value.filter(toast => 
    toast.position === 'top' || 
    (toast.position === 'auto' && TOP_TYPES.includes(toast.type))
  )
)

const bottomToasts = computed(() => 
  toasts.value.filter(toast => 
    toast.position === 'bottom' || 
    (toast.position === 'auto' && !TOP_TYPES.includes(toast.type))
  )
)

// Handle toast click
const handleToastClick = (toast) => {
  // Only close if it doesn't have actions
  if (!toast.actions || toast.actions.length === 0) {
    handleRemoveToast(toast.id)
  }
}

// Safe remove function
const handleRemoveToast = (toastId) => {
  if (typeof removeToast === 'function') {
    removeToast(toastId)
  } else {
    console.warn('removeToast function not available')
  }
}

// Progress bar calculation
const getProgressWidth = (toast) => {
  if (!toast.duration || toast.duration <= 0) return '0%'
  const elapsed = Date.now() - toast.timestamp
  const progress = Math.max(0, Math.min(100, (elapsed / toast.duration) * 100))
  return (100 - progress) + '%'
}

// Styling functions
const getToastClasses = (toast) => {
  const colorClasses = {
    success: 'border-green-200 bg-green-50/95 text-green-900',
    error: 'border-red-200 bg-red-50/95 text-red-900 border-l-4 border-l-red-500',
    warning: 'border-yellow-200 bg-yellow-50/95 text-yellow-900 border-l-4 border-l-yellow-500',
    info: 'border-blue-200 bg-blue-50/95 text-blue-900',
    neutral: 'border-neutral-200 bg-white/95 text-neutral-900'
  }
  
  return colorClasses[toast.type] || colorClasses.neutral
}

const getIconClasses = (type) => {
  const classes = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    neutral: 'text-neutral-600'
  }
  return classes[type] || classes.neutral
}
</script>

<style scoped>
/* Top toast animations */
.slide-top-enter-active,
.slide-top-leave-active {
  transition: all 0.3s ease;
}

.slide-top-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-top-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Bottom toast animations */
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all 0.3s ease;
}

.slide-bottom-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-bottom-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Progress bar animation */
.progress-bar {
  animation: progress-countdown linear;
}

@keyframes progress-countdown {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Hover effect for clickable toasts */
.cursor-pointer:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}
</style>