<template>
  <div class="space-y-6">
    <!-- Form Title -->
    <div class="border-b border-neutral-200 pb-4">
      <h3 class="text-lg font-semibold text-neutral-900 flex items-center">
        <UIcon name="i-lucide-settings" class="h-6 w-6 mr-2 text-gray-600" />
        Category Properties
      </h3>
      <p class="text-sm text-neutral-600 mt-1">
        Fill in the category-specific properties for this item
      </p>
    </div>

    <!-- Dynamic Properties -->
    <div class="grid grid-cols-1 gap-6">
      <div
        v-for="property in properties"
        :key="property.id"
        class="space-y-2"
      >
        <!-- Text Input -->
        <UFormGroup
          v-if="property.type === 'text'"
          :label="formatPropertyLabel(property)"
          :required="property.required"
          :description="property.unit ? `Unit: ${property.unit}` : undefined"
        >
          <UInput
            :id="property.id"
            v-model="formData[property.id]"
            type="text"
            :placeholder="property.placeholder"
            :required="property.required"
            :disabled="disabled"
          />
        </UFormGroup>

        <!-- Number Input -->
        <UFormGroup
          v-else-if="property.type === 'number'"
          :label="formatPropertyLabel(property)"
          :required="property.required"
          :description="property.unit ? `Unit: ${property.unit}` : undefined"
        >
          <UInput
            :id="property.id"
            v-model.number="formData[property.id]"
            type="number"
            step="0.01"
            :placeholder="property.placeholder"
            :required="property.required"
            :disabled="disabled"
          />
        </UFormGroup>

        <!-- Textarea -->
        <UFormGroup
          v-else-if="property.type === 'textarea'"
          :label="formatPropertyLabel(property)"
          :required="property.required"
          :description="property.unit ? `Unit: ${property.unit}` : undefined"
        >
          <UTextarea
            :id="property.id"
            v-model="formData[property.id]"
            :placeholder="property.placeholder"
            :required="property.required"
            :disabled="disabled"
            rows="3"
          />
        </UFormGroup>

        <!-- Select -->
        <UFormGroup
          v-else-if="property.type === 'select'"
          :label="formatPropertyLabel(property)"
          :required="property.required"
          :description="property.unit ? `Unit: ${property.unit}` : undefined"
        >
          <USelect
            :id="property.id"
            v-model="formData[property.id]"
            :options="getSelectOptions(property)"
            :placeholder="property.placeholder || 'Select option'"
            :required="property.required"
            :disabled="disabled"
          />
        </UFormGroup>

        <!-- Boolean/Checkbox -->
        <UFormGroup
          v-else-if="property.type === 'boolean'"
          :label="formatPropertyLabel(property)"
          :required="property.required"
          :description="property.unit ? `Unit: ${property.unit}` : undefined"
        >
          <div class="flex items-center space-x-2">
            <UCheckbox
              :id="property.id"
              v-model="formData[property.id]"
              :required="property.required"
              :disabled="disabled"
            />
            <label :for="property.id" class="text-sm text-neutral-700">
              {{ property.placeholder || 'Yes/No' }}
            </label>
          </div>
        </UFormGroup>

        <!-- Unknown Property Type Fallback -->
        <div 
          v-else
          class="p-3 bg-yellow-50 border border-yellow-200 rounded-md"
        >
          <p class="text-sm text-yellow-800">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 inline mr-1" />
            Unknown property type: <code class="bg-yellow-100 px-1 rounded">{{ property.type }}</code>
          </p>
        </div>
      </div>
    </div>

    <!-- Validation Summary -->
    <div v-if="!isValid && showValidation" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
      <h4 class="text-sm font-semibold text-red-800 mb-2">
        <UIcon name="i-heroicons-exclamation-circle" class="h-4 w-4 inline mr-1" />
        Please fix the following errors:
      </h4>
      <ul class="text-sm text-red-700 space-y-1">
        <li v-for="error in validationErrors" :key="error">
          • {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, onMounted } from 'vue'
import type { CategoryProperty } from '~/types/stock'

interface Props {
  properties: CategoryProperty[]
  modelValue?: Record<string, any>
  disabled?: boolean
  showValidation?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'validate', isValid: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  disabled: false,
  showValidation: false
})

const emit = defineEmits<Emits>()

// Form data reactive object
const formData = reactive<Record<string, any>>({ ...props.modelValue })

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(formData, newValue)
  },
  { deep: true }
)

// Emit changes back to parent
watch(
  formData,
  (newValue) => {
    emit('update:modelValue', { ...newValue })
    emit('validate', isValid.value)
  },
  { deep: true }
)

// Computed validation
const validationErrors = computed(() => {
  const errors: string[] = []
  
  props.properties.forEach((property: CategoryProperty) => {
    const value = formData[property.id]
    
    if (property.required && (value === undefined || value === null || value === '')) {
      errors.push(`${formatPropertyLabel(property)} is required`)
    }
    
    if (property.type === 'number' && value !== undefined && value !== null && value !== '') {
      if (isNaN(Number(value))) {
        errors.push(`${formatPropertyLabel(property)} must be a valid number`)
      }
    }
  })
  
  return errors
})

const isValid = computed(() => {
  return validationErrors.value.length === 0
})

// Helper functions
const formatPropertyLabel = (property: CategoryProperty): string => {
  return property.name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/_/g, ' ')
    .trim()
}

const getSelectOptions = (property: CategoryProperty) => {
  if (!property.options || property.options.length === 0) {
    return [{ label: 'No options available', value: '', disabled: true }]
  }
  
  return property.options.map(option => ({
    label: option,
    value: option
  }))
}

// Initialize form data with default values
onMounted(() => {
  props.properties.forEach((property: CategoryProperty) => {
    if (formData[property.id] === undefined) {
      // Set default values based on property type
      switch (property.type) {
        case 'text':
        case 'textarea':
        case 'select':
          formData[property.id] = ''
          break
        case 'number':
          formData[property.id] = 0
          break
        case 'boolean':
          formData[property.id] = false
          break
        default:
          formData[property.id] = ''
      }
    }
  })
})

// Expose validation method
defineExpose({
  validate: () => isValid.value,
  getFormData: () => ({ ...formData }),
  reset: () => {
    props.properties.forEach((property: CategoryProperty) => {
      switch (property.type) {
        case 'text':
        case 'textarea':
        case 'select':
          formData[property.id] = ''
          break
        case 'number':
          formData[property.id] = 0
          break
        case 'boolean':
          formData[property.id] = false
          break
        default:
          formData[property.id] = ''
      }
    })
  }
})
</script>