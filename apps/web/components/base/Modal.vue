<template>
  <UModal v-model="isOpen">
    <UCard>
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
              <h3 class="text-lg font-semibold text-gray-900">
                {{ title }}
              </h3>
              <p v-if="subtitle" class="text-sm text-gray-500">
                {{ subtitle }}
              </p>
            </div>
          </div>
          
          <!-- Close button -->
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            @click="close"
          />
        </div>
      </template>

      <!-- Body -->
      <div class="space-y-4">
        <!-- Description -->
        <p v-if="description" class="text-gray-600">
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
  confirmColor: {
    type: String,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const iconClasses = computed(() => {
  const typeClasses = {
    default: 'bg-gray-100 text-gray-600',
    danger: 'bg-red-100 text-red-600',
    warning: 'bg-yellow-100 text-yellow-600',
    success: 'bg-green-100 text-green-600',
    info: 'bg-blue-100 text-blue-600'
  }
  return typeClasses[props.type] || typeClasses.default
})

const cancel = () => {
  emit('cancel')
  isOpen.value = false
}

const confirm = () => {
  emit('confirm')
}

const close = () => {
  isOpen.value = false
}
</script>