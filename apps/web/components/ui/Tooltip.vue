<!-- apps/web/components/ui/Tooltip.vue -->
<template>
  <div
    class="relative inline-block"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @click="handleClick"
  >
    <!-- Trigger content -->
    <slot />
    
    <!-- Tooltip -->
    <div
      v-if="isVisible"
      :class="[
        'absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg transition-opacity duration-200',
        'pointer-events-none',
        tooltipClasses,
        sizeClasses,
        positionClasses
      ]"
      :style="{ maxWidth: maxWidth }"
      role="tooltip"
    >
      <!-- Tooltip content -->
      <slot name="content">
        {{ content }}
      </slot>
      
      <!-- Arrow -->
      <div
        :class="[
          'absolute w-2 h-2 transform rotate-45',
          arrowClasses,
          arrowPositionClasses
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  placement: {
    type: String,
    default: 'top',
    validator: (value) => [
      'top', 'top-start', 'top-end',
      'bottom', 'bottom-start', 'bottom-end',
      'left', 'left-start', 'left-end',
      'right', 'right-start', 'right-end'
    ].includes(value)
  },
  trigger: {
    type: String,
    default: 'hover',
    validator: (value) => ['hover', 'click', 'focus'].includes(value)
  },
  delay: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light', 'error', 'warning', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  maxWidth: {
    type: String,
    default: '200px'
  }
})

const isVisible = ref(false)
let showTimeout = null

// Computed properties
const tooltipClasses = computed(() => {
  const themes = {
    dark: 'bg-neutral-900 text-white border border-neutral-700',
    light: 'bg-white text-neutral-900 border border-neutral-200 shadow-md',
    error: 'bg-red-600 text-white border border-red-700',
    warning: 'bg-yellow-500 text-white border border-yellow-600',
    success: 'bg-green-600 text-white border border-green-700'
  }
  return themes[props.theme]
})

const arrowClasses = computed(() => {
  const themes = {
    dark: 'bg-neutral-900 border-neutral-700',
    light: 'bg-white border-neutral-200',
    error: 'bg-red-600 border-red-700',
    warning: 'bg-yellow-500 border-yellow-600',
    success: 'bg-green-600 border-green-700'
  }
  return themes[props.theme]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
  }
  return sizes[props.size]
})

const positionClasses = computed(() => {
  const positions = {
    'top': 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    'top-start': 'bottom-full left-0 mb-2',
    'top-end': 'bottom-full right-0 mb-2',
    'bottom': 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    'bottom-start': 'top-full left-0 mt-2',
    'bottom-end': 'top-full right-0 mt-2',
    'left': 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    'left-start': 'right-full top-0 mr-2',
    'left-end': 'right-full bottom-0 mr-2',
    'right': 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    'right-start': 'left-full top-0 ml-2',
    'right-end': 'left-full bottom-0 ml-2'
  }
  return positions[props.placement]
})

const arrowPositionClasses = computed(() => {
  const positions = {
    'top': 'top-full left-1/2 transform -translate-x-1/2 -mt-1',
    'top-start': 'top-full left-2 -mt-1',
    'top-end': 'top-full right-2 -mt-1',
    'bottom': 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1',
    'bottom-start': 'bottom-full left-2 -mb-1',
    'bottom-end': 'bottom-full right-2 -mb-1',
    'left': 'left-full top-1/2 transform -translate-y-1/2 -ml-1',
    'left-start': 'left-full top-2 -ml-1',
    'left-end': 'left-full bottom-2 -ml-1',
    'right': 'right-full top-1/2 transform -translate-y-1/2 -mr-1',
    'right-start': 'right-full top-2 -mr-1',
    'right-end': 'right-full bottom-2 -mr-1'
  }
  return positions[props.placement]
})

// Methods
const showTooltip = () => {
  if (props.disabled) return
  
  if (props.delay > 0) {
    showTimeout = setTimeout(() => {
      isVisible.value = true
    }, props.delay)
  } else {
    isVisible.value = true
  }
}

const hideTooltip = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  isVisible.value = false
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    showTooltip()
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    hideTooltip()
  }
}

const handleFocusIn = () => {
  if (props.trigger === 'focus') {
    showTooltip()
  }
}

const handleFocusOut = () => {
  if (props.trigger === 'focus') {
    hideTooltip()
  }
}

const handleClick = () => {
  if (props.trigger === 'click') {
    if (isVisible.value) {
      hideTooltip()
    } else {
      showTooltip()
    }
  }
}

// Expose methods
defineExpose({
  show: showTooltip,
  hide: hideTooltip
})
</script>