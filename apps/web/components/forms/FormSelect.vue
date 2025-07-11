<!-- components/base/FormSelect.vue -->
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
    <!-- Basic Select -->
    <USelect
      v-if="type === 'basic'"
      :model-value="modelValue"
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :loading="loading"
      :variant="variant"
      :color="color"
      :size="size"
      :class="selectClass"
      @update:model-value="handleChange"
    />

    <!-- Select Menu (Advanced) -->
    <USelectMenu
      v-else-if="type === 'menu'"
      :model-value="modelValue"
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :multiple="multiple"
      :searchable="searchable"
      :variant="variant"
      :color="color"
      :size="size"
      :class="selectClass"
      @update:model-value="handleChange"
    >
      <!-- Custom option template -->
      <template v-if="$slots.option" #option="{ option }">
        <slot name="option" :option="option" />
      </template>
      
      <!-- Custom selected template -->
      <template v-if="$slots.selected" #selected="{ selected }">
        <slot name="selected" :selected="selected" />
      </template>
    </USelectMenu>

    <!-- Input Menu (Searchable with custom input) -->
    <UInputMenu
      v-else-if="type === 'input-menu'"
      :model-value="modelValue"
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :multiple="multiple"
      :variant="variant"
      :color="color"
      :size="size"
      :leading-icon="leadingIcon"
      :trailing-icon="trailingIcon"
      :class="selectClass"
      @update:model-value="handleChange"
    >
      <!-- Custom option template -->
      <template v-if="$slots.option" #option="{ option }">
        <slot name="option" :option="option" />
      </template>
    </UInputMenu>

    <!-- Combobox (Custom implementation) -->
    <UPopover v-else-if="type === 'combobox'" v-model:open="isOpen">
      <UButton
        :variant="variant"
        :color="color"
        :size="size"
        :disabled="disabled"
        :class="[
          'w-full justify-between text-left font-normal',
          !selectedOptions.length && 'text-muted-foreground',
          selectClass
        ]"
        :icon="leadingIcon"
        :trailing-icon="isOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
      >
        <span v-if="selectedOptions.length" class="truncate">
          {{ displayValue }}
        </span>
        <span v-else class="text-gray-500">{{ placeholder }}</span>
      </UButton>

      <template #content>
        <div class="p-2 w-64">
          <!-- Search Input -->
          <UInput
            v-if="searchable"
            v-model="searchQuery"
            placeholder="Search options..."
            icon="i-lucide-search"
            size="sm"
            class="mb-2"
          />
          
          <!-- Options List -->
          <div class="max-h-48 overflow-y-auto space-y-1">
            <UButton
              v-for="option in filteredOptions"
              :key="getOptionValue(option)"
              :variant="isSelected(option) ? 'soft' : 'ghost'"
              :color="isSelected(option) ? color : 'neutral'"
              size="sm"
              class="w-full justify-start"
              @click="selectOption(option)"
            >
              <UCheckbox
                v-if="multiple"
                :model-value="isSelected(option)"
                size="sm"
                class="mr-2"
                @click.stop
              />
              
              <span class="truncate">{{ getOptionLabel(option) }}</span>
              
              <UIcon
                v-if="!multiple && isSelected(option)"
                name="i-lucide-check"
                class="ml-auto h-4 w-4"
              />
            </UButton>
            
            <div v-if="filteredOptions.length === 0" class="text-center py-4 text-gray-500 text-sm">
              No options found
            </div>
          </div>
          
          <!-- Actions -->
          <div v-if="multiple && selectedOptions.length > 0" class="flex justify-between items-center mt-2 pt-2 border-t">
            <span class="text-xs text-gray-500">
              {{ selectedOptions.length }} selected
            </span>
            <UButton
              variant="ghost"
              size="xs"
              @click="clearSelection"
            >
              Clear All
            </UButton>
          </div>
        </div>
      </template>
    </UPopover>

    <!-- Multi-select Tags Display -->
    <div v-if="multiple && selectedOptions.length > 0 && showTags" class="flex flex-wrap gap-1 mt-2">
      <UBadge
        v-for="option in selectedOptions"
        :key="getOptionValue(option)"
        :color="color"
        variant="soft"
        size="sm"
        class="flex items-center gap-1"
      >
        {{ getOptionLabel(option) }}
        <UButton
          variant="ghost"
          size="xs"
          icon="i-lucide-x"
          class="h-3 w-3 p-0"
          @click="removeOption(option)"
        />
      </UBadge>
    </div>
  </UFormField>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // v-model
  modelValue: {
    type: [String, Number, Array, Object],
    default: () => null
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
  
  // Select props
  type: {
    type: String,
    default: 'menu', // basic, menu, input-menu, combobox
    validator: (value) => ['basic', 'menu', 'input-menu', 'combobox'].includes(value)
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select option'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  searchable: {
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
  trailingIcon: String,
  
  // Display options
  showTags: {
    type: Boolean,
    default: true
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  
  // Custom classes
  selectClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'search'])

// State
const isOpen = ref(false)
const searchQuery = ref('')

// Computed
const selectedOptions = computed(() => {
  if (!props.modelValue) return []
  
  if (props.multiple) {
    if (Array.isArray(props.modelValue)) {
      return props.options.filter(option => {
        return props.modelValue.includes(getOptionValue(option))
      })
    }
    return []
  } else {
    const option = props.options.find(opt => getOptionValue(opt) === props.modelValue)
    return option ? [option] : []
  }
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  
  return props.options.filter(option => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(searchQuery.value.toLowerCase())
  })
})

const displayValue = computed(() => {
  if (selectedOptions.value.length === 0) return ''
  
  if (props.multiple) {
    if (selectedOptions.value.length === 1) {
      return getOptionLabel(selectedOptions.value[0])
    }
    return `${selectedOptions.value.length} items selected`
  } else {
    return getOptionLabel(selectedOptions.value[0])
  }
})

// Methods
const getOptionValue = (option) => {
  if (typeof option === 'object' && option !== null) {
    return option[props.valueKey] ?? option.value ?? option
  }
  return option
}

const getOptionLabel = (option) => {
  if (typeof option === 'object' && option !== null) {
    return option[props.labelKey] ?? option.label ?? option.name ?? option.value ?? String(option)
  }
  return String(option)
}

const isSelected = (option) => {
  const value = getOptionValue(option)
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }
  return props.modelValue === value
}

const selectOption = (option) => {
  const value = getOptionValue(option)
  
  if (props.multiple) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValues.indexOf(value)
    
    if (index > -1) {
      currentValues.splice(index, 1)
    } else {
      currentValues.push(value)
    }
    
    emit('update:modelValue', currentValues)
  } else {
    emit('update:modelValue', value)
    isOpen.value = false
  }
}

const removeOption = (option) => {
  if (!props.multiple) return
  
  const value = getOptionValue(option)
  const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const index = currentValues.indexOf(value)
  
  if (index > -1) {
    currentValues.splice(index, 1)
    emit('update:modelValue', currentValues)
  }
}

const clearSelection = () => {
  if (props.multiple) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', null)
  }
  isOpen.value = false
}

const handleChange = (value) => {
  emit('update:modelValue', value)
  emit('change', value)
}

// Watch search query
watch(searchQuery, (newQuery) => {
  emit('search', newQuery)
})
</script>