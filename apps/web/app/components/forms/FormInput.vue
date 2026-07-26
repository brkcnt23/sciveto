<!-- components/forms/FormInput.vue -->
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
    <!-- Text Input -->
    <UInput 
      v-if="type === 'text' || type === 'email' || type === 'password' || type === 'url' || type === 'number'"
      :id="uid" 
      :name="name"
      :model-value="modelValue" 
      :type="type" 
      :placeholder="placeholder" 
      :disabled="disabled"
      :loading="loading" 
      :icon="icon" 
      :leading-icon="leadingIcon" 
      :trailing-icon="trailingIcon" 
      :variant="variant"
      :color="color" 
      :size="size" 
      :class="inputClass" 
      @update:model-value="$emit('update:modelValue', $event)" 
    />

    <!-- Textarea -->
    <UTextarea 
      v-else-if="type === 'textarea'" 
      :id="uid" 
      :name="name"
      :model-value="modelValue" 
      :placeholder="placeholder"
      :disabled="disabled" 
      :rows="rows" 
      :variant="variant" 
      :color="color" 
      :size="size" 
      :class="inputClass"
      @update:model-value="$emit('update:modelValue', $event)" 
    />

    <!-- Select -->
    <USelect 
      v-else-if="type === 'select'" 
      :id="uid" 
      :name="name"
      :model-value="modelValue" 
      :options="options"
      :placeholder="placeholder" 
      :disabled="disabled" 
      :variant="variant" 
      :color="color" 
      :size="size" 
      :class="inputClass"
      @update:model-value="$emit('update:modelValue', $event)" 
    />

    <!-- Select Menu (Multiple support) -->
    <USelectMenu 
      v-else-if="type === 'select-menu'" 
      :id="uid" 
      :name="name"
      :model-value="modelValue" 
      :options="options"
      :placeholder="placeholder" 
      :disabled="disabled" 
      :multiple="multiple" 
      :variant="variant" 
      :color="color"
      :size="size" 
      :class="inputClass" 
      @update:model-value="$emit('update:modelValue', $event)" 
    />

    <!-- Input Number -->
    <UInputNumber 
      v-else-if="type === 'input-number'" 
      :id="uid" 
      :name="name"
      :model-value="modelValue" 
      :placeholder="placeholder"
      :disabled="disabled" 
      :min="min" 
      :max="max" 
      :step="step" 
      :variant="variant" 
      :color="color" 
      :size="size"
      :class="inputClass" 
      @update:model-value="$emit('update:modelValue', $event)" 
    />

    <!-- File Input -->
    <UInput 
      v-else-if="type === 'file'" 
      :id="uid" 
      :name="name"
      :type="type" 
      :disabled="disabled" 
      :accept="accept"
      :multiple="multiple" 
      :variant="variant" 
      :color="color" 
      :size="size" 
      :class="inputClass"
      @change="$emit('update:modelValue', $event.target.files)" 
    />

    <!-- Search Input with clear button -->
    <UInput 
      v-else-if="type === 'search'" 
      :id="uid" 
      :name="name"
      :model-value="modelValue" 
      type="text" 
      :placeholder="placeholder"
      :disabled="disabled" 
      :loading="loading" 
      icon="i-lucide-search"
      :trailing-icon="modelValue ? 'i-lucide-x' : undefined" 
      :variant="variant" 
      :color="color" 
      :size="size"
      :class="inputClass" 
      @update:model-value="$emit('update:modelValue', $event)"
      @click:trailing="$emit('update:modelValue', '')" 
    />

    <!-- Default fallback -->
    <UInput 
      v-else 
      :id="uid" 
      :name="name"
      :model-value="modelValue" 
      :type="type" 
      :placeholder="placeholder" 
      :disabled="disabled"
      :loading="loading" 
      :icon="icon" 
      :leading-icon="leadingIcon" 
      :trailing-icon="trailingIcon" 
      :variant="variant"
      :color="color" 
      :size="size" 
      :class="inputClass" 
      @update:model-value="$emit('update:modelValue', $event)" 
    />
  </UFormField>
</template>

<script setup>
import { useId } from '#imports'

// Generate unique ID for accessibility
const uid = useId()

const props = defineProps({
  // v-model
  modelValue: {
    type: [String, Number, Array, Object, File, FileList],
    default: ''
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

  // Input props
  type: {
    type: String,
    default: 'text',
    validator: (value) => [
      'text', 'email', 'password', 'number', 'url', 'file', 'search',
      'textarea', 'select', 'select-menu', 'input-number'
    ].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },

  // Input styling
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
  icon: String,
  leadingIcon: String,
  trailingIcon: String,

  // Textarea specific
  rows: {
    type: Number,
    default: 3
  },

  // Select specific
  options: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  },

  // Number input specific
  min: Number,
  max: Number,
  step: Number,

  // File input specific
  accept: String,

  // Custom classes
  inputClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
</script>