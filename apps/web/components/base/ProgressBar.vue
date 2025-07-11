
<!-- components/base/ProgressBar.vue -->
<template>
  <div class="space-y-2">
    <!-- Label and Percentage -->
    <div v-if="label || showPercentage" class="flex items-center justify-between">
      <span v-if="label" class="text-sm font-medium text-slate-700">
        {{ label }}
      </span>
      <span v-if="showPercentage" class="text-sm font-bold text-slate-600">
        {{ value }}%
      </span>
    </div>
    
    <!-- Progress Bar -->
    <UProgress 
      :model-value="value" 
      :color="progressColor"
      :size="size"
      :status="showStatus"
      :max="max"
      :animation="animation"
      :orientation="orientation"
      :class="customClass"
    />
    
    <!-- Status/Description -->
    <div v-if="description || estimated" class="flex items-center justify-between text-xs text-slate-500">
      <span v-if="description">{{ description }}</span>
      <span v-if="estimated">{{ estimated }}</span>
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
  color: {
    type: String,
    default: 'auto',
    validator: (value) => ['auto', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
  },
  showPercentage: {
    type: Boolean,
    default: true
  },
  showStatus: {
    type: Boolean,
    default: false
  },
  max: {
    type: [Number, Array],
    default: 100
  },
  animation: {
    type: String,
    default: 'carousel',
    validator: (value) => ['carousel', 'carousel-inverse', 'swing', 'elastic'].includes(value)
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  customClass: {
    type: String,
    default: ''
  }
})

// Auto color based on progress value
const progressColor = computed(() => {
  if (props.color !== 'auto') {
    return props.color
  }

  // Auto color logic based on value
  if (props.value === null) return 'primary' // indeterminate
  if (props.value <= 25) return 'error'
  if (props.value <= 50) return 'warning'
  if (props.value <= 75) return 'info'
  if (props.value < 100) return 'primary'
  return 'success'
})
</script>