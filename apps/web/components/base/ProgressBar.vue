<!-- apps/web/components/base/ProgressBar.vue -->
<template>
  <div class="space-y-2">
    <!-- Label and Percentage -->
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-slate-700">
        {{ label }}
      </span>
      <span class="text-sm font-bold" :class="percentageTextColor">
        {{ value }}%
      </span>
    </div>
    
    <!-- Progress Bar Container -->
    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
      <div 
        class="h-full rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden"
        :class="progressBarColor"
        :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"
      >
        <!-- Shimmer effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
    </div>
    
    <!-- Status indicator (optional) -->
    <div v-if="showStatus" class="flex items-center justify-between text-xs text-slate-500">
      <span>{{ statusText }}</span>
      <span v-if="estimated">Est. {{ estimated }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  label: {
    type: String,
    default: 'Progress'
  },
  color: {
    type: String,
    default: 'auto', // auto, green, blue, orange, red, purple
    validator: (value) => ['auto', 'green', 'blue', 'orange', 'red', 'purple', 'yellow'].includes(value)
  },
  showStatus: {
    type: Boolean,
    default: false
  },
  estimated: String // "2 days remaining", "Complete" etc.
})

const progressBarColor = computed(() => {
  if (props.color !== 'auto') {
    const colors = {
      green: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
      blue: 'bg-gradient-to-r from-sky-400 to-sky-500',
      orange: 'bg-gradient-to-r from-orange-400 to-orange-500',
      red: 'bg-gradient-to-r from-red-400 to-red-500',
      purple: 'bg-gradient-to-r from-violet-400 to-violet-500',
      yellow: 'bg-gradient-to-r from-yellow-400 to-yellow-500'
    }
    return colors[props.color]
  }

  // Auto color based on progress value
  if (props.value <= 25) return 'bg-gradient-to-r from-red-400 to-red-500'
  if (props.value <= 50) return 'bg-gradient-to-r from-orange-400 to-orange-500'
  if (props.value <= 75) return 'bg-gradient-to-r from-yellow-400 to-yellow-500'
  if (props.value < 100) return 'bg-gradient-to-r from-sky-400 to-sky-500'
  return 'bg-gradient-to-r from-emerald-400 to-emerald-500'
})

const percentageTextColor = computed(() => {
  if (props.color !== 'auto') {
    const colors = {
      green: 'text-emerald-600',
      blue: 'text-sky-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      purple: 'text-violet-600',
      yellow: 'text-yellow-600'
    }
    return colors[props.color]
  }

  // Auto color based on progress value
  if (props.value <= 25) return 'text-red-600'
  if (props.value <= 50) return 'text-orange-600'
  if (props.value <= 75) return 'text-yellow-600'
  if (props.value < 100) return 'text-sky-600'
  return 'text-emerald-600'
})

const statusText = computed(() => {
  if (props.value === 0) return 'Not started'
  if (props.value < 25) return 'Just started'
  if (props.value < 50) return 'In progress'
  if (props.value < 75) return 'Making progress'
  if (props.value < 100) return 'Almost done'
  return 'Completed'
})
</script>