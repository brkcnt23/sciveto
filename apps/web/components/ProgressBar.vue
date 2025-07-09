<!-- apps/web/components/ProgressBar.vue -->
<template>
  <div class="space-y-2">
    <!-- Label and Percentage -->
    <div v-if="showLabel" class="flex justify-between items-center">
      <span class="text-sm font-medium text-slate-700">{{ label }}</span>
      <span class="text-sm font-bold" :class="textColor">
        {{ value }}{{ unit }}
      </span>
    </div>
    
    <!-- Progress Bar -->
    <div class="relative">
      <div 
        class="w-full rounded-full shadow-inner"
        :class="[backgroundClass, `h-${height}`]"
      >
        <div 
          class="rounded-full transition-all duration-500 shadow-sm relative overflow-hidden"
          :class="[barColor, `h-${height}`]"
          :style="{ width: `${Math.min(value, 100)}%` }"
        >
          <!-- Animated shine effect -->
          <div 
            v-if="animated"
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
          ></div>
        </div>
      </div>
      
      <!-- Steps/Markers -->
      <div v-if="steps && steps.length > 0" class="flex justify-between mt-2">
        <span 
          v-for="(step, index) in steps"
          :key="index"
          class="text-xs text-slate-500"
          :class="value >= step.value ? 'font-semibold text-slate-700' : ''"
        >
          {{ step.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  label: String,
  unit: {
    type: String,
    default: '%'
  },
  height: {
    type: String,
    default: '3'
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'auto'
  },
  steps: Array // [{ value: 25, label: 'Planning' }, ...]
})

const backgroundClass = computed(() => {
  return props.height === '1' ? 'bg-stone-300' : 'bg-stone-200'
})

const textColor = computed(() => {
  if (props.value >= 90) return 'text-emerald-600'
  if (props.value >= 70) return 'text-sky-600'
  if (props.value >= 50) return 'text-amber-600'
  if (props.value >= 30) return 'text-orange-600'
  return 'text-rose-600'
})

const barColor = computed(() => {
  if (props.color !== 'auto') {
    return `bg-${props.color}-500`
  }
  
  // Auto color based on value
  if (props.value >= 90) return 'bg-gradient-to-r from-emerald-400 to-emerald-600'
  if (props.value >= 70) return 'bg-gradient-to-r from-sky-400 to-sky-600'
  if (props.value >= 50) return 'bg-gradient-to-r from-amber-400 to-amber-600'
  if (props.value >= 30) return 'bg-gradient-to-r from-orange-400 to-orange-600'
  return 'bg-gradient-to-r from-rose-400 to-rose-600'
})
</script>