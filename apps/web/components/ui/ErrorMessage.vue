<!-- apps/web/components/ui/ErrorMessage.vue -->
<template>
  <Transition
    name="error"
    appear
  >
    <div
      v-if="visible && (error || $slots.default)"
      class="rounded-lg border p-4"
      :class="[
        errorClasses,
        sizeClasses
      ]"
    >
      <div class="flex items-start">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <Icon
            :name="iconName"
            class="w-5 h-5"
            :class="iconClasses"
          />
        </div>
        
        <!-- Content -->
        <div class="ml-3 flex-1">
          <!-- Title -->
          <h3
            v-if="title"
            class="font-medium"
            :class="titleClasses"
          >
            {{ title }}
          </h3>
          
          <!-- Error message -->
          <div
            class="mt-1"
            :class="messageClasses"
          >
            <slot>
              <p v-if="typeof error === 'string'">{{ error }}</p>
              <div v-else-if="error">
                <!-- Handle validation errors -->
                <p v-if="error.message">{{ error.message }}</p>
                <ul v-else-if="Array.isArray(error)" class="list-disc list-inside space-y-1">
                  <li v-for="(err, index) in error" :key="index">
                    {{ typeof err === 'string' ? err : err.message }}
                  </li>
                </ul>
                <ul v-else-if="typeof error === 'object'" class="space-y-1">
                  <li v-for="(value, key) in error" :key="key">
                    <strong>{{ key }}:</strong> 
                    <span v-if="Array.isArray(value)">
                      {{ value.join(', ') }}
                    </span>
                    <span v-else>{{ value }}</span>
                  </li>
                </ul>
              </div>
            </slot>
          </div>
          
          <!-- Actions -->
          <div v-if="$slots.actions || showRetry" class="mt-3 flex space-x-3">
            <slot name="actions">
              <UButton
                v-if="showRetry"
                size="xs"
                color="red"
                variant="outline"
                @click="$emit('retry')"
                :loading="retrying"
              >
                {{ retryText }}
              </UButton>
            </slot>
          </div>
        </div>
        
        <!-- Close button -->
        <div v-if="dismissible" class="ml-auto pl-3">
          <button
            @click="dismiss"
            class="inline-flex rounded-md p-1.5 transition-colors"
            :class="closeButtonClasses"
          >
            <span class="sr-only">Dismiss</span>
            <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  error: [String, Object, Array],
  title: String,
  type: {
    type: String,
    default: 'error',
    validator: (value) => ['error', 'warning', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  dismissible: {
    type: Boolean,
    default: false
  },
  showRetry: {
    type: Boolean,
    default: false
  },
  retryText: {
    type: String,
    default: 'Try Again'
  },
  retrying: {
    type: Boolean,
    default: false
  },
  autoHide: {
    type: Boolean,
    default: false
  },
  autoHideDelay: {
    type: Number,
    default: 5000
  }
})

const emit = defineEmits(['dismiss', 'retry'])

const visible = ref(true)

const iconName = computed(() => {
  const icons = {
    error: 'i-heroicons-x-circle',
    warning: 'i-heroicons-exclamation-triangle',
    info: 'i-heroicons-information-circle'
  }
  return icons[props.type]
})

const errorClasses = computed(() => {
  const classes = {
    error: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
  }
  return classes[props.type]
})

const iconClasses = computed(() => {
  const classes = {
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  }
  return classes[props.type]
})

const titleClasses = computed(() => {
  const classes = {
    error: 'text-red-800 dark:text-red-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
    info: 'text-blue-800 dark:text-blue-200'
  }
  return classes[props.type]
})

const messageClasses = computed(() => {
  const classes = {
    error: 'text-red-700 dark:text-red-300',
    warning: 'text-yellow-700 dark:text-yellow-300',
    info: 'text-blue-700 dark:text-blue-300'
  }
  return classes[props.type]
})

const closeButtonClasses = computed(() => {
  const classes = {
    error: 'text-red-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50',
    warning: 'text-yellow-400 hover:text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/50',
    info: 'text-blue-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50'
  }
  return classes[props.type]
})

const sizeClasses = computed(() => {
  const classes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return classes[props.size]
})

const dismiss = () => {
  visible.value = false
  emit('dismiss')
}

// Auto hide functionality
if (props.autoHide) {
  setTimeout(() => {
    dismiss()
  }, props.autoHideDelay)
}

// Expose methods
defineExpose({
  dismiss,
  visible: readonly(visible)
})
</script>

<style scoped>
.error-enter-active,
.error-leave-active {
  transition: all 0.3s ease;
}

.error-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>