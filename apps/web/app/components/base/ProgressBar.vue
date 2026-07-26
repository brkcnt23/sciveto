<template>
  <div class="space-y-2">
    <!-- Label and Percentage with Modern Badges -->
    <div v-if="label || showPercentage || status" class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <!-- Status Badge with Icon -->
        <UBadge
          v-if="status"
          :color="statusColor"
          :variant="statusVariant"
          size="xs"
          class="gap-1"
        >
          <UIcon 
            v-if="statusIcon" 
            :name="statusIcon" 
            class="w-3 h-3" 
          />
          {{ status }}
        </UBadge>
        
        <!-- Label -->
        <span v-if="label" class="text-sm font-medium text-highlighted">
          {{ label }}
        </span>
      </div>
      
      <div class="flex items-center gap-2">
        <!-- Percentage Badge -->
        <UBadge
          v-if="showPercentage && value !== null"
          :color="percentageColor"
          variant="soft"
          size="xs"
          class="gap-1"
        >
          <UIcon 
            v-if="showTrendIcon" 
            :name="trendIcon" 
            class="w-3 h-3" 
          />
          {{ Math.round(value) }}%
        </UBadge>
        
        <!-- Estimated Time Badge -->
        <UBadge
          v-if="estimated"
          color="neutral"
          variant="outline"
          size="xs"
          class="gap-1"
        >
          <UIcon name="i-lucide-clock" class="w-3 h-3" />
          {{ estimated }}
        </UBadge>
      </div>
    </div>
    
    <!-- Progress Bar with Enhanced Styling -->
    <div class="relative">
      <div 
        :class="[
          'w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden',
          sizeClasses,
          customClass,
          {
            'shadow-sm': size === 'lg' || size === 'xl',
            'animate-pulse': isLoading && !value
          }
        ]"
      >
        <!-- Progress Fill -->
        <div 
          v-if="!isLoading || value !== null"
          :class="[
            'h-full rounded-full transition-all duration-500 ease-out',
            progressColorClasses,
            {
              'animate-pulse': isLoading
            }
          ]"
          :style="{ width: `${Math.min(100, Math.max(0, value || 0))}%` }"
        />
        
        <!-- Indeterminate Loading Animation -->
        <div 
          v-else
          :class="[
            'h-full rounded-full',
            progressColorClasses,
            'animate-pulse'
          ]"
          style="width: 60%; animation: progress-slide 2s infinite;"
        />
      </div>
      
      <!-- Overlay Icon for Loading State -->
      <div 
        v-if="isLoading && showLoadingIcon"
        class="absolute inset-0 flex items-center justify-center"
      >
        <UIcon 
          name="i-lucide-loader-2" 
          class="w-4 h-4 text-white animate-spin"
        />
      </div>
    </div>
    
    <!-- Description and Details -->
    <div v-if="description || showSteps || errorMessage" class="space-y-1">
      <!-- Description with Icon -->
      <div v-if="description" class="flex items-center gap-2 text-xs text-muted">
        <UIcon 
          v-if="descriptionIcon" 
          :name="descriptionIcon" 
          class="w-3 h-3" 
        />
        <span>{{ description }}</span>
      </div>
      
      <!-- Step Indicators -->
      <div v-if="showSteps && Array.isArray(max)" class="flex flex-wrap items-center gap-1 text-xs">
        <span 
          v-for="(step, index) in max" 
          :key="index"
          :class="[
            'px-2 py-1 rounded text-xs font-medium transition-colors flex-shrink-0',
            index < value 
              ? 'bg-success-500 dark:bg-success-400 text-white' 
              : index === value 
                ? 'bg-primary-500 dark:bg-primary-400 text-white' 
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
          ]"
        >
          {{ step }}
        </span>
      </div>
      
      <!-- Error Message -->
      <div v-if="errorMessage" class="flex items-center gap-2 text-xs text-error-600 dark:text-error-400">
        <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
        <span>{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: null // null for indeterminate
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  estimated: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: '',
    validator: (value) => ['', 'planning', 'in-progress', 'testing', 'completed', 'error', 'paused'].includes(value)
  },
  color: {
    type: String,
    default: 'auto',
    validator: (value) => ['auto', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  showPercentage: {
    type: Boolean,
    default: true
  },
  showSteps: {
    type: Boolean,
    default: false
  },
  showTrendIcon: {
    type: Boolean,
    default: false
  },
  showLoadingIcon: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  max: {
    type: [Number, Array],
    default: 100
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  customClass: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

// Size classes for progress bar height
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  }
  return sizes[props.size] || sizes.md
})

// Auto color based on progress value
const progressColor = computed(() => {
  if (props.color !== 'auto') {
    return props.color
  }

  // Auto color logic based on value
  if (props.value === null) return 'primary' // indeterminate
  if (props.errorMessage) return 'error'
  if (props.value <= 25) return 'error'
  if (props.value <= 50) return 'warning'
  if (props.value <= 75) return 'info'
  if (props.value < 100) return 'primary'
  return 'success'
})

// Progress color classes with dark mode support
const progressColorClasses = computed(() => {
  const colors = {
    primary: 'bg-primary-500 dark:bg-primary-400',
    secondary: 'bg-secondary-500 dark:bg-secondary-400',
    success: 'bg-success-500 dark:bg-success-400',
    info: 'bg-info-500 dark:bg-info-400',
    warning: 'bg-warning-500 dark:bg-warning-400',
    error: 'bg-error-500 dark:bg-error-400',
    neutral: 'bg-neutral-500 dark:bg-neutral-400'
  }
  return colors[progressColor.value] || colors.primary
})

// Status color mapping with Nuxt UI v3 colors
const statusColor = computed(() => {
  const colors = {
    'planning': 'info',
    'in-progress': 'primary', 
    'testing': 'warning',
    'completed': 'success',
    'error': 'error',
    'paused': 'neutral'
  }
  return colors[props.status] || 'neutral'
})

// Status variant
const statusVariant = computed(() => {
  return props.status === 'completed' ? 'solid' : 'soft'
})

// Status icons with modern Lucide icons
const statusIcon = computed(() => {
  const icons = {
    'planning': 'i-lucide-calendar',
    'in-progress': 'i-lucide-play',
    'testing': 'i-lucide-bug',
    'completed': 'i-lucide-check-circle',
    'error': 'i-lucide-alert-circle',
    'paused': 'i-lucide-pause'
  }
  return icons[props.status]
})

// Description icon based on status
const descriptionIcon = computed(() => {
  if (props.errorMessage) return 'i-lucide-alert-triangle'
  if (props.status === 'completed') return 'i-lucide-check'
  if (props.status === 'in-progress') return 'i-lucide-activity'
  return 'i-lucide-info'
})

// Percentage color based on value
const percentageColor = computed(() => {
  if (props.value === null) return 'neutral'
  if (props.value >= 90) return 'success'
  if (props.value >= 70) return 'primary'
  if (props.value >= 50) return 'warning'
  return 'error'
})

// Trend icon based on progress
const trendIcon = computed(() => {
  if (props.value === null) return null
  if (props.value >= 90) return 'i-lucide-trending-up'
  if (props.value >= 50) return 'i-lucide-minus'
  return 'i-lucide-trending-down'
})
</script>

<style scoped>
@keyframes progress-slide {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>