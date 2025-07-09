<!-- apps/web/components/ui/LoadingSpinner.vue -->
<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <!-- Spinner Animation -->
      <div 
        class="animate-spin rounded-full border-4 border-transparent"
        :class="[sizeClass, colorClass]"
      >
        <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-current opacity-75"></div>
      </div>
      
      <!-- Center dot -->
      <div 
        v-if="showDot"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div class="w-2 h-2 rounded-full bg-current opacity-60"></div>
      </div>
    </div>
    
    <!-- Loading Text -->
    <span 
      v-if="text" 
      class="ml-3 font-medium animate-pulse"
      :class="textClass"
    >
      {{ text }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'sky'
  },
  text: String,
  showDot: {
    type: Boolean,
    default: false
  },
  fullScreen: {
    type: Boolean,
    default: false
  }
})

const sizeClass = computed(() => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6', 
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  return sizes[props.size]
})

const colorClass = computed(() => {
  const colors = {
    sky: 'border-sky-200 border-t-sky-600',
    emerald: 'border-emerald-200 border-t-emerald-600',
    violet: 'border-violet-200 border-t-violet-600',
    orange: 'border-orange-200 border-t-orange-600',
    rose: 'border-rose-200 border-t-rose-600',
    slate: 'border-slate-200 border-t-slate-600'
  }
  return colors[props.color] || colors.sky
})

const textClass = computed(() => {
  const colors = {
    sky: 'text-sky-600',
    emerald: 'text-emerald-600',
    violet: 'text-violet-600', 
    orange: 'text-orange-600',
    rose: 'text-rose-600',
    slate: 'text-slate-600'
  }
  return colors[props.color] || colors.sky
})

const containerClass = computed(() => {
  return props.fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' 
    : 'py-4'
})
</script>