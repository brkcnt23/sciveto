<!-- apps/web/components/base/StatusIndicator.vue -->
<template>
  <div class="inline-flex items-center">
    <!-- Dot indicator -->
    <div 
      class="flex-shrink-0 rounded-full"
      :class="[dotSize, dotColor, { 'animate-pulse': pulse }]"
    ></div>
    
    <!-- Label -->
    <span 
      v-if="label"
      class="ml-2 font-medium"
      :class="[textSize, textColor]"
    >
      {{ label }}
    </span>
    
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
      'online', 'offline', 'away', 'busy',
      'active', 'inactive', 'pending', 'completed',
      'success', 'error', 'warning', 'info',
      'live', 'maintenance', 'draft', 'published'
    ].includes(value)
  },
  label: String,
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
  },
  pulse: {
    type: Boolean,
    default: false
  }
})

const dotSize = computed(() => {
  const sizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }
  return sizes[props.size]
})

const textSize = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})

const dotColor = computed(() => {
  const colors = {
    // User status
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    
    // General status
    active: 'bg-green-500',
    inactive: 'bg-gray-400',
    pending: 'bg-yellow-500',
    completed: 'bg-blue-500',
    
    // Semantic status
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    
    // System status
    live: 'bg-green-500',
    maintenance: 'bg-orange-500',
    draft: 'bg-gray-400',
    published: 'bg-green-500'
  }
  return colors[props.status] || 'bg-gray-400'
})

const textColor = computed(() => {
  const colors = {
    // User status
    online: 'text-green-700',
    offline: 'text-gray-600',
    away: 'text-yellow-700',
    busy: 'text-red-700',
    
    // General status
    active: 'text-green-700',
    inactive: 'text-gray-600',
    pending: 'text-yellow-700',
    completed: 'text-blue-700',
    
    // Semantic status
    success: 'text-green-700',
    error: 'text-red-700',
    warning: 'text-yellow-700',
    info: 'text-blue-700',
    
    // System status
    live: 'text-green-700',
    maintenance: 'text-orange-700',
    draft: 'text-gray-600',
    published: 'text-green-700'
  }
  return colors[props.status] || 'text-gray-600'
})
</script>