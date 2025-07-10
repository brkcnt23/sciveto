<template>
  <div class="text-center py-12">
    <!-- Icon -->
    <div class="mb-6">
      <slot name="icon">
        <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
          <Icon :name="icon" class="w-8 h-8 text-gray-400" />
        </div>
      </slot>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-gray-500 mb-6 max-w-sm mx-auto">
      {{ description }}
    </p>

    <!-- Primary Action -->
    <div v-if="actionText || $slots.action" class="space-y-3">
      <slot name="action">
        <UButton 
          v-if="actionText"
          :to="actionLink"
          :icon="actionIcon"
          :color="actionColor"
          :variant="actionVariant"
          @click="$emit('action')"
        >
          {{ actionText }}
        </UButton>
      </slot>
    </div>

    <!-- Secondary Actions -->
    <div v-if="$slots.secondary" class="mt-4">
      <slot name="secondary"></slot>
    </div>

    <!-- Help Text -->
    <div v-if="helpText" class="mt-6">
      <p class="text-sm text-gray-400">
        {{ helpText }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'i-heroicons-inbox'
  },
  title: {
    type: String,
    default: 'No data available'
  },
  description: {
    type: String,
    default: 'There are no items to display at the moment.'
  },
  actionText: String,
  actionLink: String,
  actionIcon: String,
  actionColor: {
    type: String,
    default: 'primary'
  },
  actionVariant: {
    type: String,
    default: 'solid'
  },
  helpText: String
})

defineEmits(['action'])
</script>