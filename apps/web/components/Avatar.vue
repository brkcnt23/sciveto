<!-- apps/web/components/Avatar.vue -->
<template>
  <div 
    class="rounded-full flex items-center justify-center font-semibold text-white shadow-md"
    :class="[sizeClasses, bgColor]"
  >
    <img 
      v-if="user?.avatar || avatarUrl" 
      :src="user?.avatar || avatarUrl" 
      :alt="displayName"
      class="w-full h-full rounded-full object-cover"
    />
    <span v-else class="uppercase">
      {{ initials }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
  avatarUrl: String,
  size: {
    type: String,
    default: 'md',
    validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  }
  return sizes[props.size]
})

const displayName = computed(() => {
  if (props.user?.firstName && props.user?.lastName) {
    return `${props.user.firstName} ${props.user.lastName}`
  }
  return props.user?.email || props.user?.name || 'User'
})

const initials = computed(() => {
  const name = displayName.value
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`
  }
  return name.substring(0, 2)
})

const bgColor = computed(() => {
  // Generate color based on name
  const colors = [
    'bg-gradient-to-br from-sky-400 to-sky-600',
    'bg-gradient-to-br from-emerald-400 to-emerald-600',
    'bg-gradient-to-br from-violet-400 to-violet-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-rose-400 to-rose-600',
    'bg-gradient-to-br from-amber-400 to-amber-600'
  ]
  const index = displayName.value.charCodeAt(0) % colors.length
  return colors[index]
})
</script>