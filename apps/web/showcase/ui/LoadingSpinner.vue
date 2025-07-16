@ -2,28 +2,29 @@
<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <!-- Main Spinner -->
      <div 
        class="animate-spin rounded-full border-4"
        :class="[sizeClass, spinnerColorClass]"
      ></div>
      
      <!-- Inner dot (optional) -->
      <div 
        v-if="showDot"
        class="absolute inset-0 flex items-center justify-center"
      ><div 
          class="rounded-full"
          :class="dotClass"
        ></div>
      </div>
    </div>
    
    <!-- Loading Text -->
    <span 
      v-if="text" 
      class="ml-3 font-medium"
      :class="textColorClass"
    >
      {{ text }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'sky',
    validator: (value) => ['sky', 'emerald', 'violet', 'orange', 'rose', 'amber', 'slate'].includes(value)
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
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  }
  return sizes[props.size]
})

const dotClass = computed(() => {
  const sizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3'
  }
  return `${sizes[props.size]} ${spinnerColorClass.value.replace('border-', 'bg-').split(' ')[0]}`
})

const spinnerColorClass = computed(() => {
  const colors = {
    sky: 'border-slate-200 border-t-sky-500',
    emerald: 'border-slate-200 border-t-emerald-500',
    violet: 'border-slate-200 border-t-violet-500',
    orange: 'border-slate-200 border-t-orange-500',
    rose: 'border-slate-200 border-t-rose-500',
    amber: 'border-slate-200 border-t-amber-500',
    slate: 'border-slate-200 border-t-slate-500'
  }
  return colors[props.color]
})

const textColorClass = computed(() => {
  const colors = {
    sky: 'text-sky-600',
    emerald: 'text-emerald-600',
    violet: 'text-violet-600',
    orange: 'text-orange-600',
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    slate: 'text-slate-600'
  }
  return colors[props.color]
})

const containerClass = computed(() => {
  if (props.fullScreen) {
    return 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50'
  }
  return 'py-2'
})
</script>