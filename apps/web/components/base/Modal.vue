<!-- apps/web/components/base/Modal.vue -->
<template>
  <UModal v-model="isOpen" :ui="modalUI">
    <UCard 
      class="relative overflow-hidden"
      :ui="{
        base: 'overflow-visible',
        header: { background: 'bg-white dark:bg-gray-900' },
        body: { base: 'space-y-4' }
      }"
    >
      <!-- Header -->
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <!-- Icon -->
            <div 
              v-if="icon"
              class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="iconClasses"
            >
              <Icon :name="icon" class="w-5 h-5" />
            </div>
            
            <!-- Title -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ title }}
              </h3>
              <p v-if="subtitle" class="text-sm text-gray-500 dark:text-gray-400">
                {{ subtitle }}
              </p>
            </div>
          </div>
          
          <!-- Close button -->
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="close"
          />
        </div>
      </template>

      <!-- Body -->
      <div class="space-y-4">
        <!-- Description -->
        <p v-if="description" class="text-gray-600 dark:text-gray-300">
          {{ description }}
        </p>
        
        <!-- Content slot -->
        <slot></slot>
        
        <!-- Form slot -->
        <slot name="form"></slot>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="flex items-center justify-end space-x-3">
          <!-- Custom footer slot -->
          <slot name="footer">
            <!-- Cancel button -->
            <UButton
              v-if="showCancel"
              color="gray"
              variant="outline"
              @click="cancel"
            >
              {{ cancelText }}
            </UButton>
            
            <!-- Confirm button -->
            <UButton
              v-if="showConfirm"
              :color="confirmColor"
              :loading="loading"
              @click="confirm"
            >
              {{ confirmText }}
            </UButton>
          </slot>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  description: String,
  icon: String,
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'danger', 'warning', 'success', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(value)
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  loading: {
    type: Boolean,
    default: false
  },
  preventClose: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const confirmColor = computed(() => {
  const colors = {
    default: 'primary',
    danger: 'red',
    warning: 'amber',
    success: 'green',
    info: 'blue'
  }
  return colors[props.type]
})

const iconClasses = computed(() => {
  const classes = {
    default: 'bg-gray-100 text-gray-600',
    danger: 'bg-red-100 text-red-600',
    warning: 'bg-amber-100 text-amber-600',
    success: 'bg-green-100 text-green-600',
    info: 'bg-blue-100 text-blue-600'
  }
  return classes[props.type]
})

const modalUI = computed(() => {
  const sizes = {
    xs: 'sm:max-w-xs',
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl'
  }
  
  return {
    container: `${sizes[props.size]} mx-auto`,
    overlay: {
      background: 'bg-gray-200/50 dark:bg-gray-800/50'
    }
  }
})

const close = () => {
  if (props.preventClose) return
  isOpen.value = false
  emit('close')
}

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  close()
  emit('cancel')
}

// Expose methods
defineExpose({
  close,
  confirm,
  cancel
})
</script>