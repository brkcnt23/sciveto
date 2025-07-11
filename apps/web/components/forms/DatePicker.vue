<!-- components/base/DatePicker.vue -->
<template>
  <UFormField 
    :label="label" 
    :name="name"
    :description="description"
    :help="help"
    :required="required"
    :size="size"
    :error="error"
  >
    <UPopover v-model:open="isOpen">
      <!-- Trigger Button -->
      <UButton
        :variant="variant"
        :color="color"
        :size="size"
        :disabled="disabled"
        :class="[
          'w-full justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
          buttonClass
        ]"
        :icon="leadingIcon || 'i-lucide-calendar'"
        :trailing-icon="isOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
      >
        <span v-if="displayValue">{{ displayValue }}</span>
        <span v-else class="text-gray-500">{{ placeholder }}</span>
      </UButton>

      <!-- Popover Content -->
      <template #content>
        <div class="p-4 w-80">
          <!-- Calendar -->
          <UCalendar
            v-model="internalValue"
            :color="color"
            :size="size"
            :min-value="minDate"
            :max-value="maxDate"
            :range="range"
            :multiple="multiple"
            class="rounded-md border"
            @update:model-value="handleDateChange"
          />
          
          <!-- Quick Actions -->
          <div class="flex items-center justify-between mt-3 pt-3 border-t">
            <UButton
              variant="ghost"
              size="sm"
              @click="selectToday"
            >
              Today
            </UButton>
            
            <div class="flex gap-2">
              <UButton
                variant="ghost"
                size="sm"
                @click="clearDate"
              >
                Clear
              </UButton>
              <UButton
                variant="outline"
                size="sm"
                @click="closeCalendar"
              >
                Close
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </UFormField>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'

const props = defineProps({
  // v-model
  modelValue: {
    type: [String, Object, Array],
    default: null
  },
  
  // Form field props
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  help: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: [String, Boolean],
    default: false
  },
  
  // DatePicker specific props
  placeholder: {
    type: String,
    default: 'Select date'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  
  // Styling props
  variant: {
    type: String,
    default: 'outline',
    validator: (value) => ['outline', 'soft', 'subtle', 'ghost'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  
  // Icon props
  leadingIcon: String,
  
  // Calendar props
  minDate: {
    type: [String, Object],
    default: null
  },
  maxDate: {
    type: [String, Object],
    default: null
  },
  range: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  
  // Date format
  dateFormat: {
    type: String,
    default: 'medium' // short, medium, long, full
  },
  
  // Custom classes
  buttonClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// State
const isOpen = ref(false)

// Date formatter
const df = new DateFormatter('en-US', {
  dateStyle: props.dateFormat
})

// Internal value for calendar
const internalValue = computed({
  get() {
    if (!props.modelValue) return null
    
    if (typeof props.modelValue === 'string') {
      try {
        return parseDate(props.modelValue)
      } catch {
        return null
      }
    }
    
    return props.modelValue
  },
  set(value) {
    if (value) {
      if (props.range || props.multiple) {
        emit('update:modelValue', value)
      } else {
        // Convert CalendarDate to ISO string
        const isoString = value.toDate(getLocalTimeZone()).toISOString().split('T')[0]
        emit('update:modelValue', isoString)
      }
    } else {
      emit('update:modelValue', null)
    }
  }
})

// Display value for button
const displayValue = computed(() => {
  if (!props.modelValue) return ''
  
  if (props.range && props.modelValue.start) {
    if (props.modelValue.end) {
      return `${df.format(props.modelValue.start.toDate(getLocalTimeZone()))} - ${df.format(props.modelValue.end.toDate(getLocalTimeZone()))}`
    }
    return df.format(props.modelValue.start.toDate(getLocalTimeZone()))
  }
  
  if (props.multiple && Array.isArray(props.modelValue)) {
    if (props.modelValue.length === 1) {
      return df.format(props.modelValue[0].toDate(getLocalTimeZone()))
    } else if (props.modelValue.length > 1) {
      return `${props.modelValue.length} dates selected`
    }
  }
  
  if (internalValue.value) {
    return df.format(internalValue.value.toDate(getLocalTimeZone()))
  }
  
  return ''
})

// Methods
const handleDateChange = (value) => {
  internalValue.value = value
  if (!props.range && !props.multiple) {
    isOpen.value = false
  }
}

const selectToday = () => {
  const todayDate = today(getLocalTimeZone())
  internalValue.value = todayDate
  isOpen.value = false
}

const clearDate = () => {
  internalValue.value = null
  isOpen.value = false
}

const closeCalendar = () => {
  isOpen.value = false
}
</script>