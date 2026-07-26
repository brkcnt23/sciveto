<template>
  <component 
    :is="tag"
    :class="statusClasses"
    v-bind="$attrs"
  >
    <!-- Status Dot -->
    <div 
      v-if="showDot" 
      :class="dotClasses"
    />

    <!-- Status Icon -->
    <UIcon 
      v-if="icon && !showDot" 
      :name="icon" 
      :class="iconClasses"
    />

    <!-- Status Text -->
    <span v-if="$slots.default || text" :class="textClasses">
      <slot>{{ text }}</slot>
    </span>

    <!-- Status Badge -->
    <UBadge 
      v-if="badge" 
      :color="badgeColor || color"
      :variant="badgeVariant"
      :size="badgeSize"
      class="ml-auto"
    >
      {{ badge }}
    </UBadge>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Status configuration
  status: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning', 'error', 'info', 'pending', 'active', 'inactive'].includes(value)
  },
  
  // Color override (uses Nuxt UI v3 color system)
  color: {
    type: String,
    default: null,
    validator: (value) => !value || ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'].includes(value)
  },

  // Display options
  text: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  showDot: {
    type: Boolean,
    default: true
  },
  
  // Badge options
  badge: {
    type: String,
    default: null
  },
  badgeColor: {
    type: String,
    default: null
  },
  badgeVariant: {
    type: String,
    default: 'soft'
  },
  badgeSize: {
    type: String,
    default: 'sm'
  },

  // Layout options
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'card', 'inline', 'pill'].includes(value)
  },
  
  // HTML tag
  tag: {
    type: String,
    default: 'div'
  },

  // Animation options
  animated: {
    type: Boolean,
    default: false
  },
  pulse: {
    type: Boolean,
    default: false
  }
})

// Status to color mapping
const statusColorMap = {
  default: 'neutral',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  pending: 'warning',
  active: 'success',
  inactive: 'neutral'
}

// Status to icon mapping
const statusIconMap = {
  success: 'i-lucide-check-circle',
  warning: 'i-lucide-alert-triangle',
  error: 'i-lucide-x-circle',
  info: 'i-lucide-info',
  pending: 'i-lucide-clock',
  active: 'i-lucide-play-circle',
  inactive: 'i-lucide-pause-circle'
}

// Computed properties
const statusColor = computed(() => props.color || statusColorMap[props.status] || 'neutral')
const statusIcon = computed(() => props.icon || statusIconMap[props.status])

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    xs: {
      container: 'text-xs gap-1.5',
      dot: 'w-1.5 h-1.5',
      icon: 'w-3 h-3',
      padding: 'px-2 py-1'
    },
    sm: {
      container: 'text-sm gap-2',
      dot: 'w-2 h-2',
      icon: 'w-3.5 h-3.5',
      padding: 'px-2.5 py-1.5'
    },
    md: {
      container: 'text-sm gap-2.5',
      dot: 'w-2.5 h-2.5',
      icon: 'w-4 h-4',
      padding: 'px-3 py-2'
    },
    lg: {
      container: 'text-base gap-3',
      dot: 'w-3 h-3',
      icon: 'w-5 h-5',
      padding: 'px-4 py-2.5'
    },
    xl: {
      container: 'text-lg gap-3.5',
      dot: 'w-3.5 h-3.5',
      icon: 'w-6 h-6',
      padding: 'px-5 py-3'
    }
  }
  return sizes[props.size]
})

// Color classes for dot/icon
const colorClasses = computed(() => {
  const colors = {
    primary: 'text-primary-600 dark:text-primary-400 bg-primary-500 dark:bg-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-400 bg-secondary-500 dark:bg-secondary-400',
    success: 'text-success-600 dark:text-success-400 bg-success-500 dark:bg-success-400',
    info: 'text-info-600 dark:text-info-400 bg-info-500 dark:bg-info-400',
    warning: 'text-warning-600 dark:text-warning-400 bg-warning-500 dark:bg-warning-400',
    error: 'text-error-600 dark:text-error-400 bg-error-500 dark:bg-error-400',
    neutral: 'text-neutral-600 dark:text-neutral-400 bg-neutral-500 dark:bg-neutral-400'
  }
  return colors[statusColor.value] || colors.neutral
})

// Main container classes
const statusClasses = computed(() => {
  const baseClasses = [
    'flex',
    'items-center',
    'transition-all',
    'duration-200',
    sizeClasses.value.container
  ]

  // Variant classes
  if (props.variant === 'card') {
    baseClasses.push(
      'bg-white',
      'dark:bg-neutral-800',
      'border',
      'border-neutral-200',
      'dark:border-neutral-700',
      'rounded-lg',
      'shadow-sm',
      sizeClasses.value.padding
    )
  } else if (props.variant === 'pill') {
    baseClasses.push(
      'bg-neutral-100',
      'dark:bg-neutral-800',
      'rounded-full',
      sizeClasses.value.padding
    )
  } else if (props.variant === 'inline') {
    baseClasses.push('inline-flex')
  }

  // Animation classes
  if (props.animated) {
    baseClasses.push('animate-pulse')
  }

  return baseClasses
})

// Dot classes
const dotClasses = computed(() => {
  const classes = [
    'rounded-full',
    'flex-shrink-0',
    sizeClasses.value.dot,
    colorClasses.value.split(' ').filter(c => c.startsWith('bg-')).join(' ')
  ]

  if (props.pulse) {
    classes.push('animate-pulse')
  }

  if (props.animated) {
    classes.push('animate-ping')
  }

  return classes
})

// Icon classes  
const iconClasses = computed(() => {
  const classes = [
    'flex-shrink-0',
    sizeClasses.value.icon,
    colorClasses.value.split(' ').filter(c => c.startsWith('text-')).join(' ')
  ]

  return classes
})

// Text classes
const textClasses = computed(() => {
  return [
    'text-highlighted',
    'font-medium'
  ]
})
</script>