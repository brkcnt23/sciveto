<!-- apps/web/components/base/PriorityBadge.vue -->
<template>
  <UBadge 
    :color="priorityColor"
    :size="size"
    :variant="variant"
    class="font-bold uppercase tracking-wide"
  >
    <Icon :name="priorityIcon" class="w-3 h-3 mr-1" />
    {{ priority }}
  </UBadge>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  priority: {
    type: String,
    required: true,
    validator: (value) => ['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(value)
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
  },
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'soft', 'outline', 'subtle'].includes(value)
  }
})

const priorityColor = computed(() => {
  const colors = {
    LOW: 'green',      // Yeşil - düşük öncelik
    MEDIUM: 'yellow',  // Sarı - orta öncelik  
    HIGH: 'orange',    // Turuncu - yüksek öncelik
    URGENT: 'red'      // Kırmızı - acil öncelik
  }
  return colors[props.priority] || 'gray'
})

const priorityIcon = computed(() => {
  const icons = {
    LOW: 'i-heroicons-arrow-down',
    MEDIUM: 'i-heroicons-minus',
    HIGH: 'i-heroicons-arrow-up',
    URGENT: 'i-heroicons-exclamation-triangle'
  }
  return icons[props.priority] || 'i-heroicons-minus'
})
</script>