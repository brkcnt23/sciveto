<!-- apps/web/components/ui/EmptyState.vue -->
<template>
  <div class="text-center py-12 px-6">
    <!-- Icon/Illustration -->
    <div class="mx-auto mb-6">
      <div 
        v-if="!$slots.icon"
        class="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
        :class="iconBgClass"
      >
        <Icon 
          :name="icon" 
          class="w-10 h-10"
          :class="iconColorClass"
        />
      </div>
      <slot name="icon"></slot>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-bold text-slate-900 mb-3">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
      {{ description }}
    </p>

    <!-- Action Button -->
    <div v-if="$slots.action || actionText">
      <slot name="action">
        <UButton 
          v-if="actionText"
          :to="actionLink"
          :icon="actionIcon"
          @click="$emit('action')"
          :color="actionColor"
          class="shadow-lg"
        >
          {{ actionText }}
        </UButton>
      </slot>
    </div>

    <!-- Secondary Actions -->
    <div v-if="$slots.secondary" class="mt-4">
      <slot name="secondary"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
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
    default: 'Try adjusting your search or filter criteria to find what you are looking for.'
  },
  actionText: String,
  actionLink: String,
  actionIcon: String,
  actionColor: {
    type: String,
    default: 'sky'
  }
})

defineEmits(['action'])

const iconBgClass = computed(() => {
  const colors = {
    'i-heroicons-inbox': 'bg-slate-100',
    'i-heroicons-briefcase': 'bg-sky-100',
    'i-heroicons-cube': 'bg-emerald-100',
    'i-heroicons-users': 'bg-violet-100',
    'i-heroicons-document': 'bg-orange-100',
    'i-heroicons-folder': 'bg-amber-100'
  }
  return colors[props.icon] || 'bg-slate-100'
})

const iconColorClass = computed(() => {
  const colors = {
    'i-heroicons-inbox': 'text-slate-400',
    'i-heroicons-briefcase': 'text-sky-400',
    'i-heroicons-cube': 'text-emerald-400',
    'i-heroicons-users': 'text-violet-400',
    'i-heroicons-document': 'text-orange-400',
    'i-heroicons-folder': 'text-amber-400'
  }
  return colors[props.icon] || 'text-slate-400'
})
</script>