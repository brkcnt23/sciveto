<template>
  <UFormField :label="label" :name="name" :description="description" :help="help" :required="required" :size="size"
    :error="error">
    <UPopover v-model:open="isOpen">
      <UButton :id="name" :name="name" :variant="variant" :color="color" :size="size" :disabled="disabled"
        :icon="leadingIcon || 'i-lucide-calendar'" :class="[
          'w-full justify-between text-left font-normal',
          !modelValue && 'text-muted-foreground',
          buttonClass
        ]" trailing-icon="i-lucide-chevron-down">
        <span v-if="displayValue" class="truncate">{{ displayValue }}</span>
        <span v-else class="text-neutral-500">{{ placeholder }}</span>
      </UButton>

      <template #content>
        <div class="p-4">
          <!-- Single Date Picker -->
          <UCalendar v-if="!range && !multiple" :id="uid" v-model="internalValue" :min-value="minDate"
            :max-value="maxDate" :disabled="disabled" @update:model-value="handleDateChange" />

          <!-- Date Range Picker -->
          <UCalendar v-else-if="range" :id="uid" v-model="internalValue" :min-value="minDate" :max-value="maxDate"
            :disabled="disabled" selection-mode="range" @update:model-value="handleDateChange" />

          <!-- Multiple Date Picker -->
          <UCalendar v-else-if="multiple" :id="uid" v-model="internalValue" :min-value="minDate" :max-value="maxDate"
            :disabled="disabled" selection-mode="multiple" @update:model-value="handleDateChange" />

          <!-- Time Picker for datetime-local -->
          <div v-if="type === 'datetime-local' && internalValue" class="mt-4 pt-4 border-t border-neutral-200">
            <div class="space-y-3">
              <label class="text-sm font-medium text-neutral-700">Select Time</label>
              <div class="flex space-x-2">
                <USelect :id="uid" v-model="selectedHour" name="hour" :items="hourOptions" placeholder="Hour" size="sm"
                  class="flex-1" />
                <USelect :id="uid" v-model="selectedMinute" name="minute" :items="minuteOptions" placeholder="Min"
                  size="sm" class="flex-1" />
              </div>
            </div>
          </div>

          <!-- Time Only Picker -->
          <div v-if="type === 'time'" class="space-y-3">
            <label class="text-sm font-medium text-neutral-700">Select Time</label>
            <div class="flex space-x-2">
              <USelect :id="uid" v-model="selectedHour" name="hour" :items="hourOptions" placeholder="Hour" size="sm"
                class="flex-1" />
              <USelect :id="uid" v-model="selectedMinute" name="minute" :items="minuteOptions" placeholder="Min"
                size="sm" class="flex-1" />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-2 mt-4 pt-4 border-t border-neutral-200">
            <UButton :id="uid" variant="outline" color="neutral" size="sm" @click="clearDate">
              Clear
            </UButton>
            <UButton size="sm" @click="confirmDate">
              {{ range ? 'Select Range' : multiple ? 'Select Dates' : 'Select Date' }}
            </UButton>
          </div>
        </div>
      </template>
    </UPopover>
  </UFormField>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate } from '@internationalized/date'
import { useId } from '#imports'

const uid = useId()
const props = defineProps({
  // v-model
  modelValue: {
    type: [String, Date, Object, Array],
    default: null
  },

  // Form field props - NAME IS NOW REQUIRED
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true // This is now required for Nuxt UI v3
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
  type: {
    type: String,
    default: 'date',
    validator: (value) => ['date', 'datetime-local', 'time'].includes(value)
  },
  placeholder: {
    type: String,
    default: 'Select date'
  },
  disabled: {
    type: Boolean,
    default: false
  },

  // Styling props - Updated for v3
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
    type: [String, Object, Date],
    default: null
  },
  maxDate: {
    type: [String, Object, Date],
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
const selectedHour = ref('12')
const selectedMinute = ref('00')

// Date formatter
const df = new DateFormatter('en-US', {
  dateStyle: props.dateFormat
})

const timeFormatter = new DateFormatter('en-US', {
  hour: '2-digit',
  minute: '2-digit'
})

// Internal value for calendar
const internalValue = computed({
  get() {
    if (!props.modelValue) return null

    if (typeof props.modelValue === 'string') {
      if (props.type === 'time') {
        // Handle time string like "14:30"
        const [hour, minute] = props.modelValue.split(':')
        selectedHour.value = hour || '12'
        selectedMinute.value = minute || '00'
        return null
      }
      // Parse date string
      try {
        return parseDate(props.modelValue)
      } catch {
        return new CalendarDate(new Date(props.modelValue))
      }
    }

    if (props.modelValue instanceof Date) {
      const date = props.modelValue
      return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    }

    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

// Display value formatting
const displayValue = computed(() => {
  if (!props.modelValue) return ''

  if (props.type === 'time') {
    return `${selectedHour.value}:${selectedMinute.value}`
  }

  if (props.range && Array.isArray(props.modelValue) && props.modelValue.length === 2) {
    const start = formatDisplayDate(props.modelValue[0])
    const end = formatDisplayDate(props.modelValue[1])
    return `${start} - ${end}`
  }

  if (props.multiple && Array.isArray(props.modelValue)) {
    if (props.modelValue.length === 1) {
      return formatDisplayDate(props.modelValue[0])
    }
    return `${props.modelValue.length} dates selected`
  }

  return formatDisplayDate(props.modelValue)
})

// Time options
const hourOptions = computed(() => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0')
    hours.push({ label: hour, value: hour })
  }
  return hours
})

const minuteOptions = computed(() => {
  const minutes = []
  for (let i = 0; i < 60; i += 5) {
    const minute = i.toString().padStart(2, '0')
    minutes.push({ label: minute, value: minute })
  }
  return minutes
})

// Methods
const formatDisplayDate = (date) => {
  if (!date) return ''

  if (typeof date === 'string') {
    if (props.type === 'time') return date
    date = new Date(date)
  }

  if (date instanceof Date) {
    if (props.type === 'datetime-local') {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    return df.format(date)
  }

  if (date?.toDate) {
    const jsDate = date.toDate(getLocalTimeZone())
    if (props.type === 'datetime-local') {
      return jsDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    return df.format(jsDate)
  }

  return String(date)
}

const handleDateChange = (value) => {
  if (props.type === 'time') {
    const timeString = `${selectedHour.value}:${selectedMinute.value}`
    emit('update:modelValue', timeString)
    return
  }

  if (props.type === 'datetime-local' && value) {
    // Combine date with selected time
    const jsDate = value.toDate ? value.toDate(getLocalTimeZone()) : new Date(value)
    jsDate.setHours(parseInt(selectedHour.value), parseInt(selectedMinute.value))
    emit('update:modelValue', jsDate.toISOString().slice(0, 16)) // datetime-local format
    return
  }

  if (value?.toDate) {
    // Convert CalendarDate to Date
    emit('update:modelValue', value.toDate(getLocalTimeZone()))
  } else {
    emit('update:modelValue', value)
  }
}

const clearDate = () => {
  emit('update:modelValue', null)
  isOpen.value = false
}

const confirmDate = () => {
  if (props.type === 'time') {
    const timeString = `${selectedHour.value}:${selectedMinute.value}`
    emit('update:modelValue', timeString)
  } else if (props.type === 'datetime-local' && internalValue.value) {
    // Combine current date with selected time
    const jsDate = internalValue.value.toDate(getLocalTimeZone())
    jsDate.setHours(parseInt(selectedHour.value), parseInt(selectedMinute.value))
    emit('update:modelValue', jsDate.toISOString().slice(0, 16))
  }
  isOpen.value = false
}

// Watch for time changes
watch([selectedHour, selectedMinute], () => {
  if (props.type === 'time') {
    handleDateChange(null)
  } else if (props.type === 'datetime-local' && internalValue.value) {
    handleDateChange(internalValue.value)
  }
})

// Initialize time from modelValue
watch(() => props.modelValue, (newValue) => {
  if (props.type === 'time' && typeof newValue === 'string') {
    const [hour, minute] = newValue.split(':')
    selectedHour.value = hour || '12'
    selectedMinute.value = minute || '00'
  } else if (props.type === 'datetime-local' && newValue) {
    const date = new Date(newValue)
    selectedHour.value = date.getHours().toString().padStart(2, '0')
    selectedMinute.value = date.getMinutes().toString().padStart(2, '0')
  }
}, { immediate: true })
</script>