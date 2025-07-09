<!-- apps/web/components/ui/Toast.vue -->
<template>
  <teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <transition-group
        name="toast"
        tag="div"
        class="space-y-2"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-center p-4 rounded-lg shadow-lg border backdrop-blur-sm max-w-sm"
          :class="getToastClasses(toast.type)"
        >
          <!-- Icon -->
          <div class="flex-shrink-0 mr-3">
            <Icon 
              :name="getToastIcon(toast.type)" 
              class="w-5 h-5"
              :class="getIconColor(toast.type)"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h4 v-if="toast.title" class="font-semibold text-sm mb-1" :class="getTitleColor(toast.type)">
              {{ toast.title }}
            </h4>
            <p class="text-sm" :class="getTextColor(toast.type)">
              {{ toast.message }}
            </p>
          </div>

          <!-- Close Button -->
          <button
            @click="removeToast(toast.id)"
            class="flex-shrink-0 ml-3 rounded-full p-1 hover:bg-black/10 transition-colors"
          >
            <Icon name="i-heroicons-x-mark" class="w-4 h-4" :class="getIconColor(toast.type)" />
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
// Toast store (global state)
const toasts = ref([])

// Toast methods
const addToast = (toast) => {
  const id = Date.now() + Math.random()
  const newToast = {
    id,
    type: toast.type || 'info',
    title: toast.title,
    message: toast.message,
    duration: toast.duration || 5000
  }
  
  toasts.value.push(newToast)
  
  // Auto remove after duration
  if (newToast.duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)
  }
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Toast styling helpers
const getToastClasses = (type) => {
  const classes = {
    success: 'bg-emerald-50/95 border-emerald-200',
    error: 'bg-rose-50/95 border-rose-200',
    warning: 'bg-amber-50/95 border-amber-200',
    info: 'bg-sky-50/95 border-sky-200'
  }
  return classes[type] || classes.info
}

const getToastIcon = (type) => {
  const icons = {
    success: 'i-heroicons-check-circle',
    error: 'i-heroicons-x-circle',
    warning: 'i-heroicons-exclamation-triangle',
    info: 'i-heroicons-information-circle'
  }
  return icons[type] || icons.info
}

const getIconColor = (type) => {
  const colors = {
    success: 'text-emerald-600',
    error: 'text-rose-600',
    warning: 'text-amber-600',
    info: 'text-sky-600'
  }
  return colors[type] || colors.info
}

const getTitleColor = (type) => {
  const colors = {
    success: 'text-emerald-900',
    error: 'text-rose-900',
    warning: 'text-amber-900',
    info: 'text-sky-900'
  }
  return colors[type] || colors.info
}

const getTextColor = (type) => {
  const colors = {
    success: 'text-emerald-700',
    error: 'text-rose-700',
    warning: 'text-amber-700',
    info: 'text-sky-700'
  }
  return colors[type] || colors.info
}

// Global toast functions
if (process.client) {
  window.toast = {
    success: (message, title) => addToast({ type: 'success', message, title }),
    error: (message, title) => addToast({ type: 'error', message, title }),
    warning: (message, title) => addToast({ type: 'warning', message, title }),
    info: (message, title) => addToast({ type: 'info', message, title })
  }
}

// Expose functions
defineExpose({
  addToast,
  removeToast
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>