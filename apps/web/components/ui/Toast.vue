<!-- components/ui/Toast.vue - Unified Toast Component -->
<template>
  <Transition
    :name="`toast-${position}`"
    appear
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <div
      v-if="visible"
      :class="toastClasses"
      @click="onToastClick"
      role="alert"
      aria-live="assertive"
    >
      <!-- Toast Content -->
      <div class="relative p-4">
        <div class="flex items-start gap-3">
          <!-- Icon -->
          <div v-if="icon" class="flex-shrink-0 mt-0.5">
            <div class="w-6 h-6 rounded-full bg-current/10 flex items-center justify-center">
              <UIcon :name="icon" class="w-4 h-4 text-current" />
            </div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-semibold text-current leading-5 tracking-tight">
                {{ title }}
              </h4>
              
              <!-- Close Button -->
              <button 
                v-if="closable"
                @click.stop="onClose"
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 flex-shrink-0 hover:scale-110 transition-transform"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4 text-current/60 hover:text-current" />
              </button>
            </div>
            
            <!-- Description -->
            <p v-if="description" class="text-sm mt-1.5 text-current/75 leading-relaxed font-medium">
              {{ description }}
            </p>
            
            <!-- Actions -->
            <div v-if="actions && actions.length > 0" class="flex gap-2 mt-3">
              <button 
                v-for="(action, index) in actions"
                :key="index"
                @click.stop="onActionClick(action)"
                class="px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 bg-current/8 hover:bg-current/15 active:bg-current/20 text-current border border-current/15 hover:border-current/25 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                {{ action.label }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Glass morphism overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl"></div>
      </div>
      
      <!-- Progress Bar -->
      <div 
        v-if="showProgress && timeout > 0"
        class="absolute bottom-0 left-0 w-full h-1 bg-black/5 dark:bg-white/5 overflow-hidden rounded-b-2xl"
      >
        <div 
          ref="progressBar"
          class="h-full bg-gradient-to-r from-current/60 to-current/80 rounded-b-2xl transition-all duration-100 ease-linear"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

// Props
interface ToastAction {
  label: string
  onClick?: () => void
}

interface ToastProps {
  title: string
  description?: string
  color?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'neutral'
  icon?: string
  timeout?: number
  closable?: boolean
  showProgress?: boolean
  position?: 'top' | 'bottom'
  actions?: ToastAction[]
}

const props = withDefaults(defineProps<ToastProps>(), {
  color: 'neutral',
  timeout: 5000,
  closable: true,
  showProgress: true,
  position: 'bottom',
  actions: () => []
})

// Emits
const emit = defineEmits<{
  close: []
  action: [action: ToastAction]
}>()

// State
const visible = ref(true)
const progressWidth = ref(100)
let timeoutId: NodeJS.Timeout | null = null
let progressInterval: NodeJS.Timeout | null = null

// Computed
const toastClasses = computed(() => {
  const baseClasses = [
    'group relative overflow-hidden cursor-pointer pointer-events-auto',
    'backdrop-blur-xl rounded-2xl shadow-2xl border',
    'transform transition-all duration-500 ease-out',
    'hover:scale-[1.02] hover:shadow-3xl active:scale-[0.98]',
    'min-w-[320px] max-w-sm mx-auto'
  ]

  // Color-specific classes - Theme compatible colors
  const colorClasses = {
    success: [
      // Light mode: Soft emerald background with proper contrast
      'bg-white/95 dark:bg-slate-800/95',
      'border-2 border-emerald-500/30 dark:border-emerald-400/40',
      'text-emerald-800 dark:text-emerald-200',
      'shadow-lg shadow-emerald-500/10 dark:shadow-emerald-400/20',
      '[&_.bg-current\\/10]:bg-emerald-500/15 [&_.text-current]:text-emerald-600 dark:[&_.text-current]:text-emerald-400'
    ],
    error: [
      // Light mode: Clean white bg with red accents, Dark mode: theme-consistent  
      'bg-white/95 dark:bg-slate-800/95',
      'border-2 border-red-500/30 dark:border-red-400/40', 
      'text-red-800 dark:text-red-200',
      'shadow-lg shadow-red-500/10 dark:shadow-red-400/20',
      '[&_.bg-current\\/10]:bg-red-500/15 [&_.text-current]:text-red-600 dark:[&_.text-current]:text-red-400'
    ],
    warning: [
      // Light mode: Clean white bg with amber accents
      'bg-white/95 dark:bg-slate-800/95',
      'border-2 border-amber-500/30 dark:border-amber-400/40',
      'text-amber-800 dark:text-amber-200', 
      'shadow-lg shadow-amber-500/10 dark:shadow-amber-400/20',
      '[&_.bg-current\\/10]:bg-amber-500/15 [&_.text-current]:text-amber-600 dark:[&_.text-current]:text-amber-400'
    ],
    info: [
      // Light mode: Clean white bg with blue accents
      'bg-white/95 dark:bg-slate-800/95',
      'border-2 border-blue-500/30 dark:border-blue-400/40',
      'text-blue-800 dark:text-blue-200',
      'shadow-lg shadow-blue-500/10 dark:shadow-blue-400/20', 
      '[&_.bg-current\\/10]:bg-blue-500/15 [&_.text-current]:text-blue-600 dark:[&_.text-current]:text-blue-400'
    ],
    primary: [
      // Light mode: Clean white bg with green accents  
      'bg-white/95 dark:bg-slate-800/95',
      'border-2 border-green-500/30 dark:border-green-400/40',
      'text-green-800 dark:text-green-200',
      'shadow-lg shadow-green-500/10 dark:shadow-green-400/20',
      '[&_.bg-current\\/10]:bg-green-500/15 [&_.text-current]:text-green-600 dark:[&_.text-current]:text-green-400'
    ],
    neutral: [
      // Theme-consistent neutral colors
      'bg-white/95 dark:bg-slate-800/95',
      'border-2 border-slate-300/40 dark:border-slate-600/40',
      'text-slate-800 dark:text-slate-200', 
      'shadow-lg shadow-slate-500/5 dark:shadow-slate-400/10',
      '[&_.bg-current\\/10]:bg-slate-500/15 [&_.text-current]:text-slate-600 dark:[&_.text-current]:text-slate-400'
    ]
  }

  return [
    ...baseClasses,
    ...colorClasses[props.color]
  ].join(' ')
})

// Methods
const onToastClick = () => {
  if (props.closable) {
    onClose()
  }
}

const onClose = () => {
  visible.value = false
  clearTimeouts()
  emit('close')
}

const onActionClick = (action: ToastAction) => {
  if (action.onClick) {
    action.onClick()
  }
  emit('action', action)
}

const clearTimeouts = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

const startAutoClose = () => {
  if (props.timeout > 0) {
    // Start progress countdown
    if (props.showProgress) {
      const startTime = Date.now()
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, props.timeout - elapsed)
        progressWidth.value = (remaining / props.timeout) * 100
        
        if (remaining <= 0) {
          clearInterval(progressInterval!)
          progressInterval = null
        }
      }, 16) // ~60fps
    }
    
    // Auto close timer
    timeoutId = setTimeout(() => {
      onClose()
    }, props.timeout)
  }
}

// Animation handlers
const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = props.position === 'top' 
    ? 'translateY(-100%) scale(0.95)' 
    : 'translateY(100%) scale(0.95)'
}

const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.offsetHeight // Force reflow
  element.style.opacity = '1'
  element.style.transform = 'translateY(0) scale(1)'
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = props.position === 'top'
    ? 'translateY(-100%) scale(0.95)'
    : 'translateY(100%) scale(0.95)'
}

// Lifecycle
onMounted(() => {
  startAutoClose()
})

onUnmounted(() => {
  clearTimeouts()
})
</script>

<style scoped>
/* Toast transitions */
.toast-top-enter-active,
.toast-top-leave-active,
.toast-bottom-enter-active,
.toast-bottom-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-top-enter-from {
  opacity: 0;
  transform: translateY(-100%) scale(0.95);
}

.toast-bottom-enter-from {
  opacity: 0;
  transform: translateY(100%) scale(0.95);
}

.toast-top-leave-to {
  opacity: 0;
  transform: translateY(-100%) scale(0.95);
}

.toast-bottom-leave-to {
  opacity: 0;
  transform: translateY(100%) scale(0.95);
}
</style>