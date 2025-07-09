<!-- apps/web/components/PriorityBadge.vue -->
<template>
  <div 
    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase border-2 transition-all duration-200"
    :class="priorityStyles[priority] || priorityStyles.LOW"
  >
    <Icon :name="priorityIcon" class="w-3 h-3 mr-1" />
    {{ priority }}
  </div>
</template>

<script setup>
defineProps({
  priority: {
    type: String,
    required: true,
    validator: value => ['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(value)
  }
})

const priorityStyles = {
  LOW: 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200',
  MEDIUM: 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200',
  HIGH: 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200',
  URGENT: 'bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200 animate-pulse'
}

const priorityIcon = computed(() => {
  const icons = {
    LOW: 'i-heroicons-chevron-down',
    MEDIUM: 'i-heroicons-minus',
    HIGH: 'i-heroicons-chevron-up',
    URGENT: 'i-heroicons-exclamation-triangle'
  }
  return icons[props.priority] || icons.LOW
})
</script>