<!-- apps/web/components/ui/Toast.vue -->
<template>
  <div 
    v-if="visible"
    class="min-w-80 max-w-md"
    :class="toastClasses"
  >
    <div class="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      <!-- Header with icon and close -->
      <div class="flex items-start p-4">
        <div class="flex-shrink-0">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="iconBgClass"
          >
            <Icon :name="typeIcon" class="w-4 h-4" :class="iconClass" />
          </div>
        </div>
        
        <div class="ml-3 flex-1">
          <h3 v-if="title" class="text-sm font-medium text-gray-900">
            {{ title }}
          </h3>
          <p class="text-sm text-gray-600" :class="{ 'mt-1': title }">
            {{ message }}
          </p>
          
          <!-- Action button -->
          <div v-if="action" class="mt-3">
            <UButton
              size="xs"
              :color="actionColor"
              variant="outline"
              @click="handleAction"
            >
              {{ action.text }}
            </UButton>
          </div>
        </div>
        
        <!-- Close button -->
        <button
          @click="close"
          class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="i-heroicons-x-mark" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Progress bar for auto-dismiss -->
      <div 
        v-if="autoClose && progress > 0"
        class="h-1 bg-gray-100"
      >
        <div 
          class="h-full transition-all duration-100 ease-linear"
          :class="progressBarClass"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: String,
  message: {
    type: String,
    required: true
  },
  autoClose: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 5000
  },
  action: Object // { text: 'Undo', handler: () => {} }
})

const emit = defineEmits(['close', 'action'])

const visible = ref(false)
const progress = ref(100)

let progressInterval = null
let autoCloseTimeout = null

const typeIcon = computed(() => {
  const icons = {
    success: 'i-heroicons-check-circle',
    error: 'i-heroicons-x-circle',
    warning: 'i-heroicons-exclamation-triangle',
    info: 'i-heroicons-information-circle'
  }
  return icons[props.type]
})

const iconClass = computed(() => {
  const classes = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-amber-600',
    info: 'text-blue-600'
  }
  return classes[props.type]
})

const iconBgClass = computed(() => {
  const classes = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-amber-100',
    info: 'bg-blue-100'
  }
  return classes[props.type]
})

const progressBarClass = computed(() => {
  const classes = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500'
  }
  return classes[props.type]
})

const actionColor = computed(() => {
  const colors = {
    success: 'green',
    error: 'red',
    warning: 'amber',
    info: 'blue'
  }
  return colors[props.type]
})

const toastClasses = computed(() => {
  return [
    'transform transition-all duration-300',
    visible.value ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
  ]
})

const show = () => {
  visible.value = true
  
  if (props.autoClose) {
    startProgress()
    autoCloseTimeout = setTimeout(() => {
      close()
    }, props.duration)
  }
}

const close = () => {
  visible.value = false
  clearTimers()
  setTimeout(() => {
    emit('close', props.id)
  }, 300)
}

const handleAction = () => {
  if (props.action?.handler) {
    props.action.handler()
  }
  emit('action', props.action)
  close()
}

const startProgress = () => {
  const interval = 50 // Update every 50ms
  const decrement = (interval / props.duration) * 100
  
  progressInterval = setInterval(() => {
    progress.value -= decrement
    if (progress.value <= 0) {
      progress.value = 0
      clearInterval(progressInterval)
    }
  }, interval)
}

const clearTimers = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
    autoCloseTimeout = null
  }
}

const pauseTimer = () => {
  clearTimers()
}

const resumeTimer = () => {
  if (props.autoClose && visible.value) {
    const remainingTime = (progress.value / 100) * props.duration
    startProgress()
    autoCloseTimeout = setTimeout(() => {
      close()
    }, remainingTime)
  }
}

onMounted(() => {
  show()
})

onUnmounted(() => {
  clearTimers()
})

// Expose methods for parent components
defineExpose({
  show,
  close,
  pauseTimer,
  resumeTimer
})
</script>