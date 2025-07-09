<!-- apps/web/components/base/Avatar.vue -->
<template>
  <div class="relative inline-block">
    <!-- Avatar Image or Initials -->
    <div 
      class="rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-lg relative overflow-hidden"
      :class="[sizeClass, backgroundGradient]"
    >
      <!-- User Image -->
      <img 
        v-if="avatarUrl"
        :src="avatarUrl" 
        :alt="displayName"
        class="w-full h-full object-cover rounded-full"
        @error="onImageError"
      />
      
      <!-- Initials -->
      <span v-else class="select-none" :class="textSizeClass">
        {{ initials }}
      </span>
    </div>
    
    <!-- Online Status Indicator -->
    <div 
      v-if="showOnlineStatus"
      class="absolute bottom-0 right-0 rounded-full border-2 border-white"
      :class="[statusSizeClass, onlineStatusClass]"
    ></div>
    
    <!-- Badge/Notification -->
    <div 
      v-if="badge"
      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-bold border-2 border-white"
    >
      {{ badge > 99 ? '99+' : badge }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
  },
  showOnlineStatus: {
    type: Boolean,
    default: false
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  badge: {
    type: [Number, String],
    default: null
  }
})

const imageError = ref(false)

const avatarUrl = computed(() => {
  if (imageError.value) return null
  return props.user?.avatar || props.user?.avatarUrl || null
})

const displayName = computed(() => {
  return props.user?.name || 
         `${props.user?.firstName || ''} ${props.user?.lastName || ''}`.trim() ||
         props.user?.email || 
         'User'
})

const initials = computed(() => {
  const name = displayName.value
  
  if (name === 'User') return 'U'
  
  // Email case - use first letter
  if (name.includes('@')) {
    return name.charAt(0).toUpperCase()
  }
  
  // Name case - use first letters of words
  const words = name.split(' ').filter(word => word.length > 0)
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }
  
  return name.substring(0, 2).toUpperCase()
})

const sizeClass = computed(() => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  }
  return sizes[props.size]
})

const textSizeClass = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  }
  return sizes[props.size]
})

const statusSizeClass = computed(() => {
  const sizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5'
  }
  return sizes[props.size]
})

const backgroundGradient = computed(() => {
  // Generate consistent color based on name
  const name = displayName.value
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  const gradients = [
    'bg-gradient-to-br from-sky-400 to-sky-600',
    'bg-gradient-to-br from-emerald-400 to-emerald-600',
    'bg-gradient-to-br from-violet-400 to-violet-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-rose-400 to-rose-600',
    'bg-gradient-to-br from-amber-400 to-amber-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-teal-400 to-teal-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-purple-400 to-purple-600'
  ]
  
  return gradients[hash % gradients.length]
})

const onlineStatusClass = computed(() => {
  return props.isOnline ? 'bg-green-400' : 'bg-gray-400'
})

const onImageError = () => {
  imageError.value = true
}
</script>