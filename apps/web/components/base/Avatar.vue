<!-- components/base/Avatar.vue -->
<template>
  <div class="relative inline-block">
    <!-- Ana Avatar with Chip for border colors -->
    <UChip 
      v-if="color && color !== 'none' && bgColor === 'none'"
      :color="color" 
      :inset="true"
      :class="chipSizeClasses[size]"
    >
      <UAvatar 
        :src="user?.avatar || user?.image" 
        :alt="user?.name || user?.username || 'User'"
        :text="getInitials(user?.name || user?.username)"
        :size="size"
      />
    </UChip>
    
    <!-- Avatar with background color fill -->
    <UAvatar 
      v-else-if="bgColor && bgColor !== 'none'"
      :src="showImage ? (user?.avatar || user?.image) : undefined"
      :alt="user?.name || user?.username || 'User'"
      :text="getInitials(user?.name || user?.username)"
      :size="size"
      :class="[
        bgColorClasses[bgColor],
        'ring-2 ring-white shadow-lg'
      ]"
    />
    
    <!-- Avatar without any special styling (default) -->
    <UAvatar 
      v-else
      :src="user?.avatar || user?.image" 
      :alt="user?.name || user?.username || 'User'"
      :text="getInitials(user?.name || user?.username)"
      :size="size"
      :class="[
        'ring-2 ring-white shadow-lg',
        sizeClasses[size]
      ]"
    />
    
    <!-- Online Status Badge -->
    <div 
      v-if="showOnlineStatus && user?.isOnline !== undefined"
      :class="[
        'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
        user.isOnline ? 'bg-emerald-500' : 'bg-slate-400',
        statusSizeClasses[size]
      ]"
    ></div>
    
    <!-- Notification Badge -->
    <div 
      v-if="notificationCount && notificationCount > 0"
      :class="[
        'absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white',
        badgeSizeClasses[size]
      ]"
    >
      {{ notificationCount > 99 ? '99+' : notificationCount }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(value)
  },
  color: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'].includes(value)
  },
  bgColor: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'orange', 'teal', 'cyan', 'lime', 'emerald', 'violet', 'fuchsia', 'rose', 'sky', 'amber'].includes(value)
  },
  showOnlineStatus: {
    type: Boolean,
    default: false
  },
  notificationCount: {
    type: Number,
    default: 0
  },
  showImage: {
    type: Boolean,
    default: true
  }
})

// Size mappings for different elements
const sizeClasses = {
  '3xs': '',
  '2xs': '',
  'xs': '',
  'sm': '',
  'md': '',
  'lg': '',
  'xl': '',
  '2xl': '',
  '3xl': ''
}

const chipSizeClasses = {
  '3xs': 'p-0.5',
  '2xs': 'p-0.5', 
  'xs': 'p-0.5',
  'sm': 'p-1',
  'md': 'p-1',
  'lg': 'p-1',
  'xl': 'p-1.5',
  '2xl': 'p-1.5',
  '3xl': 'p-2'
}

// Background color classes for avatar fill
const bgColorClasses = {
  'none': '',
  'red': 'bg-red-500 text-white',
  'blue': 'bg-blue-500 text-white',
  'green': 'bg-green-500 text-white',
  'yellow': 'bg-yellow-500 text-black',
  'purple': 'bg-purple-500 text-white',
  'pink': 'bg-pink-500 text-white',
  'indigo': 'bg-indigo-500 text-white',
  'orange': 'bg-orange-500 text-white',
  'teal': 'bg-teal-500 text-white',
  'cyan': 'bg-cyan-500 text-white',
  'lime': 'bg-lime-500 text-black',
  'emerald': 'bg-emerald-500 text-white',
  'violet': 'bg-violet-500 text-white',
  'fuchsia': 'bg-fuchsia-500 text-white',
  'rose': 'bg-rose-500 text-white',
  'sky': 'bg-sky-500 text-white',
  'amber': 'bg-amber-500 text-black'
}

const statusSizeClasses = {
  '3xs': 'w-2 h-2',
  '2xs': 'w-2 h-2', 
  'xs': 'w-2.5 h-2.5',
  'sm': 'w-3 h-3',
  'md': 'w-3 h-3',
  'lg': 'w-4 h-4',
  'xl': 'w-5 h-5',
  '2xl': 'w-6 h-6',
  '3xl': 'w-7 h-7'
}

const badgeSizeClasses = {
  '3xs': 'w-4 h-4 text-[8px]',
  '2xs': 'w-4 h-4 text-[8px]',
  'xs': 'w-5 h-5 text-[9px]',
  'sm': 'w-5 h-5 text-[10px]',
  'md': 'w-6 h-6 text-xs',
  'lg': 'w-7 h-7 text-xs',
  'xl': 'w-8 h-8 text-sm',
  '2xl': 'w-9 h-9 text-sm',
  '3xl': 'w-10 h-10 text-base'
}

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return '?'
  
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>