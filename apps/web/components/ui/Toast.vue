<!-- components/ui/Toast.vue -->
<template>
  <UToast
    :title="title"
    :description="description"
    :icon="icon"
    :avatar="avatar"
    :color="color"
    :duration="duration"
    :actions="actions"
    :progress="progress"
    :orientation="orientation"
    :close="close"
    :class="[
      'relative overflow-hidden backdrop-blur-sm',
      colorClasses[color],
      sizeClasses[size],
      customClass
    ]"
    v-bind="$attrs"
  >
    <!-- Custom slots -->
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>
    
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
    
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </UToast>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Core props
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  
  // Type and styling
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info', 'neutral'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'destructive', 'success', 'warning'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  
  // Display options
  icon: {
    type: String,
    default: ''
  },
  avatar: {
    type: Object,
    default: null
  },
  duration: {
    type: Number,
    default: null // Will use smart defaults from useDualToast
  },
  persistent: {
    type: Boolean,
    default: false
  },
  
  // Interactive elements
  actions: {
    type: Array,
    default: () => []
  },
  progress: {
    type: [Boolean, Object],
    default: false
  },
  orientation: {
    type: String,
    default: 'vertical',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  close: {
    type: [Boolean, Object],
    default: true
  },
  
  // Positioning hint for useDualToast
  position: {
    type: String,
    default: 'auto', // auto, top, bottom
    validator: (value) => ['auto', 'top', 'bottom'].includes(value)
  },
  
  // Custom styling
  customClass: {
    type: String,
    default: ''
  }
})

// Compute color from type if not explicitly set
const color = computed(() => {
  const typeToColor = {
    success: 'success',
    error: 'error', 
    warning: 'warning',
    info: 'info',
    neutral: 'neutral'
  }
  return typeToColor[props.type] || 'neutral'
})

// Enhanced color classes for better visual hierarchy
const colorClasses = {
  success: 'border-green-200 bg-green-50/95 text-green-900 shadow-green-100/50',
  error: 'border-red-200 bg-red-50/95 text-red-900 shadow-red-100/50',
  warning: 'border-yellow-200 bg-yellow-50/95 text-yellow-900 shadow-yellow-100/50',
  info: 'border-blue-200 bg-blue-50/95 text-blue-900 shadow-blue-100/50',
  neutral: 'border-gray-200 bg-white/95 text-gray-900 shadow-gray-100/50',
  primary: 'border-blue-200 bg-blue-50/95 text-blue-900 shadow-blue-100/50',
  secondary: 'border-gray-200 bg-gray-50/95 text-gray-900 shadow-gray-100/50'
}

const sizeClasses = {
  sm: 'text-sm p-3 max-w-sm',
  md: 'text-sm p-4 max-w-md', 
  lg: 'text-base p-5 max-w-lg'
}

// Default icons based on type
const defaultIcon = computed(() => {
  if (props.icon) return props.icon
  
  const iconMap = {
    success: 'i-lucide-check-circle',
    error: 'i-lucide-x-circle',
    warning: 'i-lucide-alert-triangle',
    info: 'i-lucide-info',
    neutral: 'i-lucide-bell'
  }
  return iconMap[props.type] || 'i-lucide-bell'
})

// Computed duration based on type for smart defaults
const smartDuration = computed(() => {
  if (props.duration !== null) return props.duration
  if (props.persistent) return 0
  
  // Smart defaults: alerts longer, notifications shorter
  const isAlert = props.type === 'error' || props.type === 'warning'
  return isAlert ? 7000 : 4000
})

// Expose for parent components
defineExpose({
  type: props.type,
  isAlert: computed(() => props.type === 'error' || props.type === 'warning'),
  isNotification: computed(() => props.type === 'success' || props.type === 'info'),
  smartDuration
})
</script>

<style scoped>
/* Enhanced backdrop blur and shadow effects */
.toast-enhanced {
  backdrop-filter: blur(12px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* Subtle animations */
.toast-enhanced {
  animation: toast-slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes toast-slide-in {
  from {
    opacity: 0;
    transform: translateX(100%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

/* Type-specific enhancements */
.toast-enhanced[data-type="error"] {
  border-left: 4px solid rgb(239 68 68);
}

.toast-enhanced[data-type="warning"] {
  border-left: 4px solid rgb(245 158 11);
}

.toast-enhanced[data-type="success"] {
  border-left: 4px solid rgb(34 197 94);
}

.toast-enhanced[data-type="info"] {
  border-left: 4px solid rgb(59 130 246);
}
</style>