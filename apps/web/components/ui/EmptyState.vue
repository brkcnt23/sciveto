<template>
  <div class="flex flex-col items-center justify-center text-center py-12 px-6">
    <!-- Icon -->
    <div class="mb-4">
      <UIcon 
        :name="icon" 
        class="w-16 h-16 text-neutral-400 dark:text-neutral-500"
      />
    </div>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-highlighted mb-2">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-muted max-w-md mb-6">
      {{ description }}
    </p>

    <!-- Action Button -->
    <UButton 
      v-if="actionText"
      :color="actionColor"
      :variant="actionVariant"
      @click="handleAction"
    >
      <UIcon 
        v-if="actionIcon" 
        :name="actionIcon" 
        class="w-4 h-4 mr-2" 
      />
      {{ actionText }}
    </UButton>

    <!-- Secondary Action -->
    <UButton 
      v-if="secondaryActionText"
      color="neutral"
      variant="ghost"
      size="sm"
      class="mt-3"
      @click="handleSecondaryAction"
    >
      {{ secondaryActionText }}
    </UButton>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'i-lucide-inbox'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  actionText: {
    type: String,
    default: null
  },
  actionIcon: {
    type: String,
    default: null
  },
  actionColor: {
    type: String,
    default: 'primary'
  },
  actionVariant: {
    type: String,
    default: 'solid'
  },
  secondaryActionText: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['action', 'secondary-action'])

const handleAction = () => {
  emit('action')
}

const handleSecondaryAction = () => {
  emit('secondary-action')
}
</script>