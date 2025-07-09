<!-- apps/web/components/forms/FormSelect.vue -->
<template>
  <div class="space-y-2">
    <!-- Label -->
    <label
      v-if="label"
      :for="selectId"
      class="block text-sm font-medium"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Select wrapper -->
    <div class="relative">
      <!-- Leading icon -->
      <div
        v-if="leadingIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
      >
        <Icon :name="leadingIcon" class="h-5 w-5" :class="iconClasses" />
      </div>

      <!-- Select field -->
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled || loading"
        :required="required"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :class="[
          baseClasses,
          sizeClasses,
          stateClasses,
          leadingIcon ? 'pl-10' : '',
          loading ? 'pr-10' : ''
        ]"
        ref="selectRef"
      >
        <!-- Placeholder option -->
        <option
          v-if="placeholder"
          value=""
          disabled
          :selected="!modelValue"
        >
          {{ placeholder }}
        </option>
        
        <!-- Options -->
        <option
          v-for="option in normalizedOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
        
        <!-- Option Groups -->
        <optgroup
          v-for="group in optionGroups"
          :key="group.label"
          :label="group.label"
        >
          <option
            v-for="option in group.options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </optgroup>
      </select>

      <!-- Loading spinner -->
      <div
        v-if="loading"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <LoadingSpinner size="sm" class="h-5 w-5" />
      </div>

      <!-- Custom arrow (if needed) -->
      <div
        v-else-if="showCustomArrow"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <Icon name="i-heroicons-chevron-down" class="h-5 w-5" :class="iconClasses" />
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

    <!-- Selected value display (for complex objects) -->
    <div
      v-if="showSelectedValue && selectedOption"
      class="mt-2 p-2 bg-gray-50 rounded text-sm"
    >
      <strong>Selected:</strong> {{ selectedOption.label }}
      <span v-if="selectedOption.description" class="text-gray-600 ml-2">
        - {{ selectedOption.description }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  modelValue: [String, Number, Boolean],
  options: {
    type: Array,
    default: () => [],
    validator: (options) => {
      return options.every(option => 
        typeof option === 'string' ||
        typeof option === 'number' ||
        (typeof option === 'object' && option !== null && 'value' in option)
      )
    }
  },
  optionGroups: {
    type: Array,
    default: () => []
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
  required: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  leadingIcon: String,
  showCustomArrow: {
    type: Boolean,
    default: false
  },
  showSelectedValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue',
  'change',
  'focus',
  'blur'
])

const selectRef = ref(null)
const isFocused = ref(false)

// Generate unique ID
const selectId = computed(() => {
  return `select-${Math.random().toString(36).substr(2, 9)}`
})

// Normalize options to consistent format
const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        label: String(option),
        value: option,
        disabled: false
      }
    }
    return {
      label: option.label || String(option.value),
      value: option.value,
      disabled: option.disabled || false,
      description: option.description
    }
  })
})

// Find selected option
const selectedOption = computed(() => {
  return normalizedOptions.value.find(option => option.value === props.modelValue)
})

// Classes
const baseClasses = computed(() => {
  return [
    'block w-full rounded-lg border transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
    'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    'dark:disabled:bg-gray-700 dark:disabled:text-gray-400',
    'appearance-none bg-white'
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
    return 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:border-red-500'
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

// Event handlers
const handleChange = (event) => {
  let value = event.target.value
  
  // Convert to appropriate type based on original option type
  const originalOption = props.options.find(opt => {
    const optValue = typeof opt === 'object' ? opt.value : opt
    return String(optValue) === value
  })
  
  if (originalOption) {
    const originalValue = typeof originalOption === 'object' ? originalOption.value : originalOption
    value = originalValue
  }
  
  emit('update:modelValue', value)
  emit('change', {
    value,
    option: selectedOption.value,
    event
  })
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

// Methods
const focus = async () => {
  await nextTick()
  selectRef.value?.focus()
}

const blur = () => {
  selectRef.value?.blur()
}

// Expose methods
defineExpose({
  focus,
  blur,
  selectRef,
  selectedOption
})
</script>