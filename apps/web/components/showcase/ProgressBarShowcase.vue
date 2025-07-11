<!-- components/showcase/ProgressBarShowcase.vue -->
<template>
  <div class="space-y-8">
    <!-- Project Progress Examples -->
    <div class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Project Progress Examples
      </h4>
      
      <!-- Planning Phase -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-slate-700">Planning Phase</span>
          <span class="text-xs text-slate-500">Est. 5 days remaining</span>
        </div>
        <UProgress 
          :model-value="15" 
          color="error" 
          size="lg"
          status
        />
        <p class="text-xs text-slate-600">Just started</p>
      </div>

      <!-- Development Phase -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-slate-700">Development Phase</span>
          <span class="text-xs text-slate-500">Est. 3 days remaining</span>
        </div>
        <UProgress 
          :model-value="45" 
          color="warning" 
          size="lg"
          status
        />
        <p class="text-xs text-slate-600">In progress</p>
      </div>

      <!-- Testing Phase -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-slate-700">Testing Phase</span>
          <span class="text-xs text-slate-500">Est. 1 day remaining</span>
        </div>
        <UProgress 
          :model-value="75" 
          color="info" 
          size="lg"
          status
        />
        <p class="text-xs text-slate-600">Almost done</p>
      </div>

      <!-- Completed Project -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-slate-700">Completed Project</span>
          <span class="text-xs text-slate-500">Complete</span>
        </div>
        <UProgress 
          :model-value="100" 
          color="success" 
          size="lg"
          status
        />
        <p class="text-xs text-slate-600">Completed</p>
      </div>
    </div>

    <!-- Different Sizes -->
    <div v-if="showSizes" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Different Sizes
      </h4>
      
      <div class="space-y-4">
        <div class="space-y-2">
          <span class="text-sm text-slate-600">2XS Size</span>
          <UProgress :model-value="60" color="primary" size="2xs" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">XS Size</span>
          <UProgress :model-value="60" color="primary" size="xs" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">SM Size</span>
          <UProgress :model-value="60" color="primary" size="sm" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">MD Size (Default)</span>
          <UProgress :model-value="60" color="primary" size="md" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">LG Size</span>
          <UProgress :model-value="60" color="primary" size="lg" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">XL Size</span>
          <UProgress :model-value="60" color="primary" size="xl" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">2XL Size</span>
          <UProgress :model-value="60" color="primary" size="2xl" />
        </div>
      </div>
    </div>

    <!-- Different Colors -->
    <div v-if="showColors" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Color Variants
      </h4>
      
      <div class="space-y-4">
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Primary (Blue)</span>
          <UProgress :model-value="85" color="primary" size="lg" status />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Secondary</span>
          <UProgress :model-value="70" color="secondary" size="lg" status />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Success (Green)</span>
          <UProgress :model-value="90" color="success" size="lg" status />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Info</span>
          <UProgress :model-value="60" color="info" size="lg" status />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Warning (Orange)</span>
          <UProgress :model-value="40" color="warning" size="lg" status />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Error (Red)</span>
          <UProgress :model-value="25" color="error" size="lg" status />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Neutral</span>
          <UProgress :model-value="55" color="neutral" size="lg" status />
        </div>
      </div>
    </div>

    <!-- Multi-step Progress -->
    <div v-if="showSteps" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Multi-step Progress (With Steps)
      </h4>
      
      <div class="space-y-4">
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Frontend Development</span>
          <UProgress 
            :model-value="3" 
            :max="['Planning', 'Development', 'Testing', 'Deployment', 'Review']"
            color="success" 
            size="lg" 
            status 
          />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Backend Development</span>
          <UProgress 
            :model-value="2" 
            :max="['Design', 'API Development', 'Database', 'Testing']"
            color="warning" 
            size="lg" 
            status 
          />
        </div>
      </div>
    </div>

    <!-- Loading Animation (Indeterminate) -->
    <div v-if="showAnimations" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Loading Animations (Indeterminate)
      </h4>
      
      <div class="space-y-4">
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Carousel Animation (Default)</span>
          <UProgress animation="carousel" color="primary" size="lg" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Carousel Inverse</span>
          <UProgress animation="carousel-inverse" color="success" size="lg" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Swing Animation</span>
          <UProgress animation="swing" color="warning" size="lg" />
        </div>
        
        <div class="space-y-2">
          <span class="text-sm text-slate-600">Elastic Animation</span>
          <UProgress animation="elastic" color="error" size="lg" />
        </div>
      </div>
    </div>

    <!-- Vertical Progress -->
    <div v-if="showVertical" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Vertical Progress Bars
      </h4>
      
      <div class="flex space-x-8 justify-center">
        <div class="text-center space-y-2">
          <span class="text-sm text-slate-600">Frontend</span>
          <UProgress 
            orientation="vertical" 
            :model-value="85" 
            color="success" 
            size="lg" 
            class="h-32" 
          />
          <span class="text-xs text-slate-500">85%</span>
        </div>
        
        <div class="text-center space-y-2">
          <span class="text-sm text-slate-600">Backend</span>
          <UProgress 
            orientation="vertical" 
            :model-value="70" 
            color="warning" 
            size="lg" 
            class="h-32" 
          />
          <span class="text-xs text-slate-500">70%</span>
        </div>
        
        <div class="text-center space-y-2">
          <span class="text-sm text-slate-600">Testing</span>
          <UProgress 
            orientation="vertical" 
            :model-value="45" 
            color="info" 
            size="lg" 
            class="h-32" 
          />
          <span class="text-xs text-slate-500">45%</span>
        </div>
        
        <div class="text-center space-y-2">
          <span class="text-sm text-slate-600">Deployment</span>
          <UProgress 
            orientation="vertical" 
            :model-value="15" 
            color="error" 
            size="lg" 
            class="h-32" 
          />
          <span class="text-xs text-slate-500">15%</span>
        </div>
      </div>
    </div>

    <!-- Toggle Controls -->
    <div v-if="showControls" class="pt-6 border-t border-slate-200">
      <h4 class="font-semibold text-slate-700 mb-4">Show/Hide Sections</h4>
      <div class="flex flex-wrap gap-2">
        <UButton 
          :variant="showSizes ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showSizes = !showSizes"
        >
          Sizes
        </UButton>
        <UButton 
          :variant="showColors ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showColors = !showColors"
        >
          Colors
        </UButton>
        <UButton 
          :variant="showSteps ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showSteps = !showSteps"
        >
          Steps
        </UButton>
        <UButton 
          :variant="showAnimations ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showAnimations = !showAnimations"
        >
          Animations
        </UButton>
        <UButton 
          :variant="showVertical ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showVertical = !showVertical"
        >
          Vertical
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props for controlling what sections to show
const props = defineProps({
  showControls: {
    type: Boolean,
    default: true
  },
  defaultShowSizes: {
    type: Boolean,
    default: false
  },
  defaultShowColors: {
    type: Boolean,
    default: false
  },
  defaultShowSteps: {
    type: Boolean,
    default: false
  },
  defaultShowAnimations: {
    type: Boolean,
    default: false
  },
  defaultShowVertical: {
    type: Boolean,
    default: false
  }
})

// Reactive state for showing/hiding sections
const showSizes = ref(props.defaultShowSizes)
const showColors = ref(props.defaultShowColors)
const showSteps = ref(props.defaultShowSteps)
const showAnimations = ref(props.defaultShowAnimations)
const showVertical = ref(props.defaultShowVertical)
</script>

