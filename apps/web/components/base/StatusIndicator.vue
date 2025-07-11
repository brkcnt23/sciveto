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
      'active', 'inactive', 'pending', 'completed', 'paused',
      // Semantic status
      'success', 'error', 'warning', 'info', 'neutral',
      // System status
      'live', 'maintenance', 'down', 'degraded',
      // Project status
      'planning', 'in-progress', 'review', 'done', 'cancelled',
      // Custom status
      'operational', 'connected', 'disconnected'
    ].includes(value)
  },
  label: {
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
    default: 'dot', // dot, badge
    validator: (value) => ['dot', 'badge'].includes(value)
  },
  pulse: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
})

// Size mappings
const dotSizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2', 
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4'
}

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

const iconSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-3 h-3',
  md: 'w-4 h-4', 
  lg: 'w-5 h-5',
  xl: 'w-6 h-6'
}

// Status color mappings
const dotColorClasses = {
  // User status
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  dnd: 'bg-red-600',
  
  // General status
  active: 'bg-green-500',
  inactive: 'bg-gray-400', 
  pending: 'bg-yellow-500',
  completed: 'bg-blue-500',
  paused: 'bg-orange-500',
  
  // Semantic status
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
  neutral: 'bg-gray-400',
  
  // System status
  live: 'bg-green-500',
  maintenance: 'bg-orange-500',
  down: 'bg-red-500',
  degraded: 'bg-yellow-500',
  
  // Project status
  planning: 'bg-blue-500',
  'in-progress': 'bg-green-500',
  review: 'bg-yellow-500',
  done: 'bg-green-600',
  cancelled: 'bg-gray-500',
  
  // Custom status
  operational: 'bg-green-500',
  connected: 'bg-green-500',
  disconnected: 'bg-red-500'
}

const textColorClasses = {
  // User status  
  online: 'text-green-700',
  offline: 'text-gray-600',
  away: 'text-yellow-700',
  busy: 'text-red-700',
  dnd: 'text-red-800',
  
  // General status
  active: 'text-green-700',
  inactive: 'text-gray-600',
  pending: 'text-yellow-700', 
  completed: 'text-blue-700',
  paused: 'text-orange-700',
  
  // Semantic status
  success: 'text-green-700',
  error: 'text-red-700',
  warning: 'text-yellow-700',
  info: 'text-blue-700',
  neutral: 'text-gray-600',
  
  // System status
  live: 'text-green-700',
  maintenance: 'text-orange-700',
  down: 'text-red-700',
  degraded: 'text-yellow-700',
  
  // Project status
  planning: 'text-blue-700',
  'in-progress': 'text-green-700',
  review: 'text-yellow-700',
  done: 'text-green-800',
  cancelled: 'text-gray-600',
  
  // Custom status
  operational: 'text-green-700',
  connected: 'text-green-700',
  disconnected: 'text-red-700'
}

// Badge color mapping for UBadge
const badgeColor = computed(() => {
  const mapping = {
    online: 'success',
    offline: 'neutral',
    away: 'warning',
    busy: 'error',
    dnd: 'error',
    active: 'success',
    inactive: 'neutral',
    pending: 'warning',
    completed: 'info',
    paused: 'warning',
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
    neutral: 'neutral',
    live: 'success',
    maintenance: 'warning',
    down: 'error',
    degraded: 'warning',
    planning: 'info',
    'in-progress': 'success',
    review: 'warning',
    done: 'success',
    cancelled: 'neutral',
    operational: 'success',
    connected: 'success',
    disconnected: 'error'
  }
  return mapping[props.status] || 'neutral'
})

const badgeVariant = computed(() => {
  return 'soft' // Always use soft variant for better visibility
})
</script>