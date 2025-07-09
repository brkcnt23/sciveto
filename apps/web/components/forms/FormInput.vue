<!-- apps/web/components/forms/FormInput.vue -->
<template>
  <div class="space-y-2">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input wrapper -->
    <div class="relative">
      <!-- Leading icon -->
      <div
        v-if="leadingIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <Icon :name="leadingIcon" class="h-5 w-5" :class="iconClasses" />
      </div>

      <!-- Input field -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :pattern="pattern"
        :autocomplete="autocomplete"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeydown"
        :class="[
          baseClasses,
          sizeClasses,
          stateClasses,
          leadingIcon ? 'pl-10' : '',
          trailingIcon || loading ? 'pr-10' : ''
        ]"
        ref="inputRef"
      />

      <!-- Trailing icon or loading -->
      <div
        v-if="trailingIcon || loading"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
        :class="trailingIcon && !loading ? 'cursor-pointer' : 'pointer-events-none'"
        @click="trailingIcon && !loading ? $emit('trailing-click') : null"
      >
        <!-- Loading spinner -->
        <LoadingSpinner
          v-if="loading"
          size="sm"
          class="h-5 w-5"
        />
        <!-- Trailing icon -->
        <Icon
          v-else-if="trailingIcon"
          :name="trailingIcon"
          class="h-5 w-5"
          :class="iconClasses"
        />
      </div>
    </div>

    <!-- Help text -->
    <p
      v-if="helpText && !error"
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      {{ helpText }}
    </p>

    <!-- Error message -->
    <ErrorMessage
      v-if="error"
      :error="error"
      type="error"
      size="sm"
    />

    <!-- Character count -->
    <div
      v-if="showCharCount && maxLength"
      class="text-xs text-right"
      :class="charCountClasses"
    >
      {{ characterCount }}/{{ maxLength }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text',
    validator: (value) => [
      'text', 'email', 'password', 'number', 'tel', 'url', 'search'
    ].includes(value)
  },
  label: String,
  placeholder: String,
  helpText: String,
  error: [String, Array, Object],
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  leadingIcon: String,
  trailingIcon: String,
  min: [String, Number],
  max: [String, Number],
  step: [String, Number],
  pattern: String,
  autocomplete: String,
  maxLength: Number,
  showCharCount: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue',
  'focus',
  'blur',
  'keydown',
  'trailing-click'
])

const inputRef = ref(null)
const isFocused = ref(false)

// Generate unique ID
const inputId = computed(() => {
  return `input-${Math.random().toString(36).substr(2, 9)}`
})

// Character count
const characterCount = computed(() => {
  return String(props.modelValue || '').length
})

// Classes
const baseClasses = computed(() => {
  return [
    'block w-full rounded-lg border transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
    'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    'dark:disabled:bg-gray-700 dark:disabled:text-gray-400'
  ].join(' ')
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  }
  return sizes[props.size]
})

const stateClasses = computed(() => {
  if (props.error) {
    return 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:border-red-500'
  }
  
  if (isFocused.value) {
    return 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
  }
  
  return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400'
})

const labelClasses = computed(() => {
  if (props.error) {
    return 'text-red-700 dark:text-red-400'
  }
  return 'text-gray-700 dark:text-gray-300'
})

const iconClasses = computed(() => {
  if (props.error) {
    return 'text-red-400'
  }
  if (props.disabled) {
    return 'text-gray-400'
  }
  return 'text-gray-500 dark:text-gray-400'
})

const charCountClasses = computed(() => {
  if (props.maxLength && characterCount.value > props.maxLength) {
    return 'text-red-500'
  }
  if (props.maxLength && characterCount.value > props.maxLength * 0.8) {
    return 'text-yellow-500'
  }
  return 'text-gray-500'
})

// Event handlers
const handleInput = (event) => {
  const value = props.type === 'number' 
    ? parseFloat(event.target.value) || null
    : event.target.value
  
  emit('update:modelValue', value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleKeydown = (event) => {
  emit('keydown', event)
}

// Methods
const focus = async () => {
  await nextTick()
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const select = () => {
  inputRef.value?.select()
}

// Expose methods
defineExpose({
  focus,
  blur,
  select,
  inputRef
})
</script>