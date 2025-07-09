<!-- apps/web/components/forms/DatePicker.vue -->
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

    <!-- Date input wrapper -->
    <div class="relative">
      <!-- Leading icon -->
      <div
        v-if="leadingIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
      >
        <Icon :name="leadingIcon" class="h-5 w-5" :class="iconClasses" />
      </div>

      <!-- Date input -->
      <input
        :id="inputId"
        :type="inputType"
        :value="formattedValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="minDate"
        :max="maxDate"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :class="[
          baseClasses,
          sizeClasses,
          stateClasses,
          leadingIcon ? 'pl-10' : '',
          'pr-10'
        ]"
        ref="inputRef"
      />

      <!-- Calendar icon -->
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        @click="toggleCalendar"
      >
        <Icon 
          name="i-heroicons-calendar-days" 
          class="h-5 w-5" 
          :class="iconClasses" 
        />
      </div>
    </div>

    <!-- Custom Calendar Popup -->
    <div
      v-if="showCalendar && !readonly && !disabled"
      class="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80"
      ref="calendarRef"
    >
      <!-- Calendar Header -->
      <div class="flex items-center justify-between mb-4">
        <button
          @click="previousMonth"
          class="p-1 hover:bg-gray-100 rounded"
          type="button"
        >
          <Icon name="i-heroicons-chevron-left" class="h-5 w-5" />
        </button>
        
        <div class="text-lg font-semibold">
          {{ currentMonthYear }}
        </div>
        
        <button
          @click="nextMonth"
          class="p-1 hover:bg-gray-100 rounded"
          type="button"
        >
          <Icon name="i-heroicons-chevron-right" class="h-5 w-5" />
        </button>
      </div>

      <!-- Days of week -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div
          v-for="day in daysOfWeek"
          :key="day"
          class="text-center text-xs font-medium text-gray-500 py-2"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar days -->
      <div class="grid grid-cols-7 gap-1">
        <button
          v-for="day in calendarDays"
          :key="`${day.date}-${day.isCurrentMonth}`"
          @click="selectDate(day)"
          :disabled="day.disabled"
          :class="[
            'h-8 w-8 text-sm rounded-full flex items-center justify-center transition-colors',
            day.isCurrentMonth
              ? 'text-gray-900 hover:bg-blue-100'
              : 'text-gray-400',
            day.isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : '',
            day.isToday && !day.isSelected
              ? 'bg-blue-100 text-blue-600'
              : '',
            day.disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer'
          ]"
          type="button"
        >
          {{ day.day }}
        </button>
      </div>

      <!-- Quick select buttons -->
      <div class="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
        <button
          @click="selectToday"
          class="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
          type="button"
        >
          Today
        </button>
        <button
          @click="clearDate"
          class="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
          type="button"
        >
          Clear
        </button>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: [String, Date],
  label: String,
  placeholder: String,
  helpText: String,
  error: [String, Array, Object],
  type: {
    type: String,
    default: 'date',
    validator: (value) => ['date', 'datetime-local', 'time'].includes(value)
  },
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
  leadingIcon: String,
  minDate: String,
  maxDate: String,
  showCalendar: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'update:modelValue',
  'change',
  'focus',
  'blur'
])

const inputRef = ref(null)
const calendarRef = ref(null)
const showCalendar = ref(false)
const isFocused = ref(false)
const currentDate = ref(new Date())

// Generate unique ID
const inputId = computed(() => {
  return `datepicker-${Math.random().toString(36).substr(2, 9)}`
})

// Input type for native date picker fallback
const inputType = computed(() => {
  return props.type
})

// Format value for display
const formattedValue = computed(() => {
  if (!props.modelValue) return ''
  
  const date = props.modelValue instanceof Date 
    ? props.modelValue 
    : new Date(props.modelValue)
    
  if (isNaN(date.getTime())) return ''
  
  switch (props.type) {
    case 'date':
      return date.toISOString().split('T')[0]
    case 'datetime-local':
      return date.toISOString().slice(0, 16)
    case 'time':
      return date.toTimeString().slice(0, 5)
    default:
      return date.toISOString().split('T')[0]
  }
})

// Calendar computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  const selectedDate = props.modelValue ? new Date(props.modelValue) : null
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const isCurrentMonth = date.getMonth() === month
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
    
    let disabled = false
    if (props.minDate && date < new Date(props.minDate)) disabled = true
    if (props.maxDate && date > new Date(props.maxDate)) disabled = true
    
    days.push({
      date: date.toISOString(),
      day: date.getDate(),
      isCurrentMonth,
      isToday,
      isSelected,
      disabled
    })
  }
  
  return days
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
    return 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
  }
  
  if (isFocused.value) {
    return 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
  }
  
  return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
})

const labelClasses = computed(() => {
  if (props.error) {
    return 'text-red-700'
  }
  return 'text-gray-700'
})

const iconClasses = computed(() => {
  if (props.error) {
    return 'text-red-400'
  }
  if (props.disabled) {
    return 'text-gray-400'
  }
  return 'text-gray-500'
})

// Methods
const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
}

const handleChange = (event) => {
  emit('change', event)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const toggleCalendar = () => {
  if (props.disabled || props.readonly) return
  showCalendar.value = !showCalendar.value
}

const selectDate = (day) => {
  if (day.disabled) return
  
  const date = new Date(day.date)
  emit('update:modelValue', date.toISOString().split('T')[0])
  showCalendar.value = false
}

const selectToday = () => {
  const today = new Date()
  emit('update:modelValue', today.toISOString().split('T')[0])
  showCalendar.value = false
}

const clearDate = () => {
  emit('update:modelValue', '')
  showCalendar.value = false
}

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

// Close calendar when clicking outside
const handleClickOutside = (event) => {
  if (calendarRef.value && !calendarRef.value.contains(event.target)) {
    showCalendar.value = false
  }
}

const focus = async () => {
  await nextTick()
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Expose methods
defineExpose({
  focus,
  blur,
  inputRef
})
</script>