<!-- apps/web/components/base/PriorityBadge.vue -->
<template>
  <span 
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200"
    :class="badgeClasses"
  >
    <Icon :name="priorityIcon" class="w-3 h-3 mr-1" />
    {{ priority }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  priority: {
    type: String,
    required: true,
    validator: (value) => ['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(value)
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
  },
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'soft', 'outline', 'subtle'].includes(value)
  }
})

const priorityIcon = computed(() => {
  const icons = {
    LOW: 'i-heroicons-arrow-down',
    MEDIUM: 'i-heroicons-minus',
    HIGH: 'i-heroicons-arrow-up',
    URGENT: 'i-heroicons-exclamation-triangle'
  }
  return icons[props.priority] || 'i-heroicons-minus'
})

const badgeClasses = computed(() => {
  const baseClasses = []
  
  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1 text-sm'
  }
  baseClasses.push(sizeClasses[props.size])
  
  // Color and variant classes
  const colorVariants = {
    LOW: {
      solid: 'bg-green-500 text-white border border-green-500',
      soft: 'bg-green-100 text-green-800 border border-green-200',
      outline: 'bg-transparent text-green-700 border border-green-500',
      subtle: 'bg-green-50 text-green-600 border border-transparent'
    },
    MEDIUM: {
      solid: 'bg-yellow-500 text-white border border-yellow-500',
      soft: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      outline: 'bg-transparent text-yellow-700 border border-yellow-500',
      subtle: 'bg-yellow-50 text-yellow-600 border border-transparent'
    },
    HIGH: {
      solid: 'bg-orange-500 text-white border border-orange-500',
      soft: 'bg-orange-100 text-orange-800 border border-orange-200',
      outline: 'bg-transparent text-orange-700 border border-orange-500',
      subtle: 'bg-orange-50 text-orange-600 border border-transparent'
    },
    URGENT: {
      solid: 'bg-red-500 text-white border border-red-500',
      soft: 'bg-red-100 text-red-800 border border-red-200',
      outline: 'bg-transparent text-red-700 border border-red-500',
      subtle: 'bg-red-50 text-red-600 border border-transparent'
    }
  }
  
  baseClasses.push(colorVariants[props.priority][props.variant])
  
  return baseClasses.join(' ')
})
</script>