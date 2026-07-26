<!-- components/forms/DatePicker.vue -->
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
      <UButton 
        :id="uid" 
        :name="name"
        :variant="variant" 
        :color="color" 
        :size="size" 
        :disabled="disabled"
        :icon="leadingIcon || 'i-lucide-calendar'" 
        :class="[
          'w-full justify-between text-left font-normal',
          !modelValue && 'text-muted-foreground',
          buttonClass
        ]" 
        trailing-icon="i-lucide-chevron-down"
      >
        <span v-if="displayValue" class="truncate">{{ displayValue }}</span>
        <span v-else class="text-neutral-500">{{ placeholder }}</span>
      </UButton>

      <template #content>
        <div class="p-4">
          <!-- Single Date Picker -->
          <UCalendar 
            v-if="!range && !multiple" 
            :id="`${uid}-calendar`" 
            :name="`${name}-calendar`"
            v-model="internalValue" 
            :min-value="minDate"
            :max-value="maxDate" 
            :disabled="disabled" 
            @update:model-value="handleDateChange" 
          />

          <!-- Date Range Picker -->
          <UCalendar 
            v-else-if="range" 
            :id="`${uid}-calendar`" 
            :name="`${name}-calendar`"
            v-model="internalValue" 
            :min-value="minDate" 
            :max-value="maxDate"
            :disabled="disabled" 
            selection-mode="range" 
            @update:model-value="handleDateChange" 
          />

          <!-- Multiple Date Picker -->
          <UCalendar 
            v-else-if="multiple" 
            :id="`${uid}-calendar`" 
            :name="`${name}-calendar`"
            v-model="internalValue" 
            :min-value="minDate" 
            :max-value="maxDate"
            :disabled="disabled" 
            selection-mode="multiple" 
            @update:model-value="handleDateChange" 
          />

          <!-- Time Picker for datetime-local -->
          <div v-if="type === 'datetime-local' && internalValue" class="mt-4 pt-4 border-t border-neutral-200">
            <div class="space-y-3">
              <label class="text-sm font-medium text-neutral-700">Select Time</label>
              <div class="flex space-x-2">
                <USelect 
                  :id="`${uid}-hour`" 
                  :name="`${name}-hour`"
                  v-model="selectedHour" 
                  :items="hourOptions" 
                  placeholder="Hour" 
                  size="sm"
                  class="flex-1" 
                />
                <USelect 
                  :id="`${uid}-minute`" 
                  :name="`${name}-minute`"
                  v-model="selectedMinute" 
                  :items="minuteOptions" 
                  placeholder="Min" 
                  size="sm"
                  class="flex-1" 
                />
              </div>
            </div>
          </div>

          <!-- Time only picker -->
          <div v-if="type === 'time'" class="space-y-3">
            <label class="text-sm font-medium text-neutral-700">Select Time</label>
            <div class="flex space-x-2">
              <USelect 
                :id="`${uid}-hour`" 
                :name="`${name}-hour`"
                v-model="selectedHour" 
                :items="hourOptions" 
                placeholder="Hour" 
                size="sm"
                class="flex-1" 
              />
              <USelect 
                :id="`${uid}-minute`" 
                :name="`${name}-minute`"
                v-model="selectedMinute" 
                :items="minuteOptions" 
                placeholder="Min" 
                size="sm"
                class="flex-1" 
              />
            </div>
          </div>

          <!-- Action buttons -->
          <div v-if="type !== 'time'" class="flex justify-between items-center mt-4 pt-4 border-t border-neutral-200">
            <UButton 
              :name="`${name}-clear`"
              variant="ghost" 
              color="neutral" 
              size="sm" 
              @click="clearDate"
            >
              Clear
            </UButton>
            <UButton 
              :name="`${name}-confirm`"
              variant="solid" 
              color="primary" 
              size="sm" 
              @click="confirmDate"
            >
              Confirm
            </UButton>
          </div>
        </div>
      </template>
    </UPopover>
  </UFormField>
</template>

<script setup>
import { useId } from '#imports'

// Generate unique ID for accessibility
const uid = useId()

const props = defineProps({
  // v-model
  modelValue: {
    type: [String, Date, Array, Object],
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

  // Date picker props
  type: {
    type: String,
    default: 'date',
    validator: (value) => ['date', 'datetime-local', 'time'].includes(value)
  },
  placeholder: {
    type: String,
    default: 'Select date...'
  },
  disabled: {
    type: Boolean,
    default: false
  },

  // Date range and multiple
  range: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },

  // Date constraints
  minDate: {
    type: [String, Date],
    default: null
  },
  maxDate: {
    type: [String, Date],
    default: null
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

  // Format
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },

  // Custom classes
  buttonClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// State
const isOpen = ref(false)
const internalValue = ref(props.modelValue)
const selectedHour = ref('12')
const selectedMinute = ref('00')

// Computed
const displayValue = computed(() => {
  if (!internalValue.value) return ''

  if (props.range && Array.isArray(internalValue.value)) {
    if (internalValue.value.length === 2) {
      const start = formatDate(internalValue.value[0])
      const end = formatDate(internalValue.value[1])
      return `${start} - ${end}`
    }
    return ''
  }

  if (props.multiple && Array.isArray(internalValue.value)) {
    if (internalValue.value.length === 1) {
      return formatDate(internalValue.value[0])
    }
    return `${internalValue.value.length} dates selected`
  }

  if (props.type === 'time') {
    return `${selectedHour.value}:${selectedMinute.value}`
  }

  if (props.type === 'datetime-local') {
    const dateStr = formatDate(internalValue.value)
    return `${dateStr} ${selectedHour.value}:${selectedMinute.value}`
  }

  return formatDate(internalValue.value)
})

const hourOptions = computed(() => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return { label: hour, value: hour }
  })
})

const minuteOptions = computed(() => {
  return Array.from({ length: 60 }, (_, i) => {
    const minute = i.toString().padStart(2, '0')
    return { label: minute, value: minute }
  })
})

// Methods
const formatDate = (date) => {
  if (!date) return ''
  
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    
    return d.toLocaleDateString('en-CA') // YYYY-MM-DD format
  } catch (error) {
    return String(date)
  }
}

const handleDateChange = (newValue) => {
  internalValue.value = newValue
  
  if (props.type === 'time') {
    emit('update:modelValue', `${selectedHour.value}:${selectedMinute.value}`)
    emit('change', `${selectedHour.value}:${selectedMinute.value}`)
  } else {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const clearDate = () => {
  internalValue.value = null
  selectedHour.value = '12'
  selectedMinute.value = '00'
  emit('update:modelValue', null)
  emit('change', null)
  isOpen.value = false
}

const confirmDate = () => {
  let finalValue = internalValue.value

  if (props.type === 'datetime-local' && finalValue) {
    // Combine date and time for datetime-local
    const date = new Date(finalValue)
    date.setHours(parseInt(selectedHour.value))
    date.setMinutes(parseInt(selectedMinute.value))
    finalValue = date.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm format
  }

  emit('update:modelValue', finalValue)
  emit('change', finalValue)
  isOpen.value = false
}

// Watch for external value changes
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue
  
  // Extract time from datetime-local or time values
  if (newValue && (props.type === 'datetime-local' || props.type === 'time')) {
    const timeMatch = String(newValue).match(/(\d{2}):(\d{2})/)
    if (timeMatch) {
      selectedHour.value = timeMatch[1]
      selectedMinute.value = timeMatch[2]
    }
  }
}, { immediate: true })

// Watch for time changes
watch([selectedHour, selectedMinute], () => {
  if (props.type === 'time') {
    const timeValue = `${selectedHour.value}:${selectedMinute.value}`
    emit('update:modelValue', timeValue)
    emit('change', timeValue)
  }
})
</script>