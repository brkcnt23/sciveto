<!-- components/base/StatusIndicator.vue -->
<template>
  <div class="inline-flex items-center">
    <!-- Badge Style (modern approach) -->
    <UBadge
      v-if="variant === 'badge'"
      :color="badgeColor"
      :variant="badgeVariant"
      :size="size"
      :class="[
        'flex items-center gap-1.5',
        customClass
      ]"
    >
      <!-- Status Dot -->
      <div
        :class="[
          'rounded-full flex-shrink-0',
          dotSizeClasses[size],
          dotColorClasses[status],
          { 'animate-pulse': pulse }
        ]"
      ></div>
      
      <!-- Label -->
      <span v-if="label" class="font-medium">{{ label }}</span>
      
      <!-- Icon (optional) -->
      <UIcon 
        v-if="icon" 
        :name="icon" 
        :class="iconSizeClasses[size]"
      />
    </UBadge>

    <!-- Dot Style (classic approach) -->
    <div v-else class="inline-flex items-center">
      <!-- Status Dot -->
      <div
        :class="[
          'rounded-full flex-shrink-0',
          dotSizeClasses[size],
          dotColorClasses[status],
          { 'animate-pulse': pulse }
        ]"
      ></div>
      
      <!-- Label -->
      <span
        v-if="label"
        :class="[
          'ml-2 font-medium',
          textSizeClasses[size],
          textColorClasses[status]
        ]"
      >
        {{ label }}
      </span>
      
      <!-- Icon -->
      <UIcon 
        v-if="icon" 
        :name="icon" 
        :class="[
          'ml-1.5',
          iconSizeClasses[size],
          textColorClasses[status]
        ]"
      />
    </div>
    
    <!-- Custom content -->
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => [
      // User status
      'online', 'offline', 'away', 'busy', 'dnd',
      // General status
      'active', 'inactive', 'pending', 'completed', 'cancelled', 'failed',
      // Project status
      'planning', 'in-progress', 'review', 'testing', 'done',
      // System status
      'operational', 'maintenance', 'degraded', 'outage', 'unknown',
      // Priority status
      'low', 'medium', 'high', 'urgent', 'critical',
      // Custom status
      'success', 'warning', 'error', 'info', 'neutral'
    ].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  variant: {
    type: String,
    default: 'dot',
    validator: (value) => ['dot', 'badge'].includes(value)
  },
  pulse: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
})

// Size classes
const dotSizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4'
}

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

const iconSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-4 h-4',
  xl: 'w-5 h-5'
}

// Status color mapping with dark theme support
const statusColorMap = {
  // User status
  'online': { dot: 'bg-success-500 dark:bg-success-400', text: 'text-success-600 dark:text-success-400', badge: 'success' },
  'offline': { dot: 'bg-neutral-400 dark:bg-neutral-500', text: 'text-neutral-600 dark:text-neutral-400', badge: 'neutral' },
  'away': { dot: 'bg-warning-500 dark:bg-warning-400', text: 'text-warning-600 dark:text-warning-400', badge: 'warning' },
  'busy': { dot: 'bg-error-500 dark:bg-error-400', text: 'text-error-600 dark:text-error-400', badge: 'error' },
  'dnd': { dot: 'bg-error-500 dark:bg-error-400', text: 'text-error-600 dark:text-error-400', badge: 'error' },
  
  // General status
  'active': { dot: 'bg-success-500 dark:bg-success-400', text: 'text-success-600 dark:text-success-400', badge: 'success' },
  'inactive': { dot: 'bg-neutral-400 dark:bg-neutral-500', text: 'text-neutral-600 dark:text-neutral-400', badge: 'neutral' },
  'pending': { dot: 'bg-warning-500 dark:bg-warning-400', text: 'text-warning-600 dark:text-warning-400', badge: 'warning' },
  'completed': { dot: 'bg-success-500 dark:bg-success-400', text: 'text-success-600 dark:text-success-400', badge: 'success' },
  'cancelled': { dot: 'bg-neutral-400 dark:bg-neutral-500', text: 'text-neutral-600 dark:text-neutral-400', badge: 'neutral' },
  'failed': { dot: 'bg-error-500 dark:bg-error-400', text: 'text-error-600 dark:text-error-400', badge: 'error' },
  
  // Project status
  'planning': { dot: 'bg-info-500 dark:bg-info-400', text: 'text-info-600 dark:text-info-400', badge: 'info' },
  'in-progress': { dot: 'bg-primary-500 dark:bg-primary-400', text: 'text-primary-600 dark:text-primary-400', badge: 'primary' },
  'review': { dot: 'bg-secondary-500 dark:bg-secondary-400', text: 'text-secondary-600 dark:text-secondary-400', badge: 'secondary' },
  'testing': { dot: 'bg-warning-500 dark:bg-warning-400', text: 'text-warning-600 dark:text-warning-400', badge: 'warning' },
  'done': { dot: 'bg-success-500 dark:bg-success-400', text: 'text-success-600 dark:text-success-400', badge: 'success' },
  
  // System status
  'operational': { dot: 'bg-success-500 dark:bg-success-400', text: 'text-success-600 dark:text-success-400', badge: 'success' },
  'maintenance': { dot: 'bg-warning-500 dark:bg-warning-400', text: 'text-warning-600 dark:text-warning-400', badge: 'warning' },
  'degraded': { dot: 'bg-warning-500 dark:bg-warning-400', text: 'text-warning-600 dark:text-warning-400', badge: 'warning' },
  'outage': { dot: 'bg-error-500 dark:bg-error-400', text: 'text-error-600 dark:text-error-400', badge: 'error' },
  'unknown': { dot: 'bg-neutral-400 dark:bg-neutral-500', text: 'text-neutral-600 dark:text-neutral-400', badge: 'neutral' },
  
  // Priority status
  'low': { dot: 'bg-success-500 dark:bg-success-400', text: 'text-success-600 dark:text-success-400', badge: 'success' },
  'medium': { dot: 'bg-warning-500 dark:bg-warning-400', text: 'text-warning-600 dark:text-warning-400', badge: 'warning' },
  'high': { dot: 'bg-error-500 dark:bg-error-400', text: 'text-error-600 dark:text-error-400', badge: 'error' },
  'urgent': { dot: 'bg-error-500 dark:bg-error-400', text: 'text-error-600 dark:text-error-400', badge: 'error' },
  'critical': { dot: 'bg-error-500 dark:bg-error-400', text: 'text-error-600 dark:text-error-400', badge: 'error' },
  
  // Generic status
  'success': { dot: 'bg-success-500 dark:bg-success-400', text: 'text-success-600 dark:text-success-400', badge: 'success' },
  'warning': { dot: 'bg-warning-500 dark:bg-warning-400', text: 'text-warning-600 dark:text-warning-400', badge: 'warning' },
  'error': { dot: 'bg-error-500 dark:bg-error-400', text: 'text-error-600 dark:text-error-400', badge: 'error' },
  'info': { dot: 'bg-info-500 dark:bg-info-400', text: 'text-info-600 dark:text-info-400', badge: 'info' },
  'neutral': { dot: 'bg-neutral-400 dark:bg-neutral-500', text: 'text-neutral-600 dark:text-neutral-400', badge: 'neutral' }
}

// Computed color classes
const dotColorClasses = computed(() => {
  return { [statusColorMap[props.status]?.dot || 'bg-neutral-400 dark:bg-neutral-500']: true }
})

const textColorClasses = computed(() => {
  return { [statusColorMap[props.status]?.text || 'text-neutral-600 dark:text-neutral-400']: true }
})

const badgeColor = computed(() => {
  return statusColorMap[props.status]?.badge || 'neutral'
})

// Badge variant based on status
const badgeVariant = computed(() => {
  if (['completed', 'done', 'operational', 'active', 'online'].includes(props.status)) {
    return 'solid'
  }
  if (['failed', 'error', 'outage', 'critical', 'urgent'].includes(props.status)) {
    return 'solid'
  }
  return 'soft'
})
</script>