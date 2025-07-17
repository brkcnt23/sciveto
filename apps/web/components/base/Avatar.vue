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
        :size="size"
        :class="avatarClass"
      >
        <template v-if="!user?.avatar && !user?.image">
          {{ getInitials(user?.name || user?.username) }}
        </template>
      </UAvatar>
    </UChip>
    
    <!-- Avatar with background color fill -->
    <UAvatar 
      v-else-if="bgColor && bgColor !== 'none'"
      :src="showImage ? (user?.avatar || user?.image) : undefined"
      :alt="user?.name || user?.username || 'User'"
      :size="size"
      :class="[
        bgColorClasses[bgColor],
        'ring-2 ring-white dark:ring-neutral-800 shadow-lg text-white font-medium',
        avatarClass
      ]"
    >
      <template v-if="!showImage || (!user?.avatar && !user?.image)">
        {{ getInitials(user?.name || user?.username) }}
      </template>
    </UAvatar>
    
    <!-- Avatar without any special styling (default) -->
    <UAvatar 
      v-else
      :src="user?.avatar || user?.image" 
      :alt="user?.name || user?.username || 'User'"
      :size="size"
      :class="[
        'ring-2 ring-white dark:ring-neutral-800 shadow-lg',
        sizeClasses[size],
        avatarClass
      ]"
    >
      <template v-if="!user?.avatar && !user?.image">
        {{ getInitials(user?.name || user?.username) }}
      </template>
    </UAvatar>
    
    <!-- Modern Status Badge with Icons -->
    <div 
      v-if="showOnlineStatus && user?.isOnline !== undefined"
      :class="[
        'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-800 flex items-center justify-center',
        getStatusColor(user.status || (user.isOnline ? 'online' : 'offline')),
        statusSizeClasses[size],
        { 'animate-pulse': user.status === 'busy' || user.status === 'away' }
      ]"
    >
      <!-- Status Icon -->
      <UIcon 
        v-if="getStatusIcon(user.status || (user.isOnline ? 'online' : 'offline'))"
        :name="getStatusIcon(user.status || (user.isOnline ? 'online' : 'offline'))" 
        :class="statusIconSizeClasses[size]"
        class="text-white"
      />
    </div>
    
    <!-- Notification Badge with Modern Style -->
    <UBadge
      v-if="notificationCount && notificationCount > 0"
      :label="notificationCount > 99 ? '99+' : notificationCount.toString()"
      color="error"
      variant="solid"
      size="xs"
      :class="[
        'absolute -top-1 -right-1 ring-2 ring-white dark:ring-neutral-800',
        badgePositionClasses[size]
      ]"
    />
    
    <!-- Role/Achievement Badge -->
    <div 
      v-if="showRole && user?.role"
      :class="[
        'absolute -top-1 -left-1 rounded-full ring-2 ring-white dark:ring-neutral-800 flex items-center justify-center',
        getRoleColor(user.role),
        roleBadgeSizeClasses[size]
      ]"
    >
      <UIcon 
        :name="getRoleIcon(user.role)" 
        :class="roleIconSizeClasses[size]"
        class="text-white"
      />
    </div>

    <!-- Custom Badge Slot -->
    <div 
      v-if="$slots.badge"
      :class="[
        'absolute',
        badgePosition === 'top-right' ? '-top-1 -right-1' : '',
        badgePosition === 'top-left' ? '-top-1 -left-1' : '',
        badgePosition === 'bottom-right' ? '-bottom-1 -right-1' : '',
        badgePosition === 'bottom-left' ? '-bottom-1 -left-1' : ''
      ]"
    >
      <slot name="badge" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
  color: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'].includes(value)
  },
  bgColor: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral', 'gradient-blue', 'gradient-green', 'gradient-purple', 'gradient-pink'].includes(value)
  },
  showOnlineStatus: {
    type: Boolean,
    default: false
  },
  showImage: {
    type: Boolean,
    default: true
  },
  notificationCount: {
    type: Number,
    default: 0
  },
  showRole: {
    type: Boolean,
    default: false
  },
  badgePosition: {
    type: String,
    default: 'top-right',
    validator: (value) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value)
  },
  avatarClass: {
    type: String,
    default: ''
  }
})

// Size classes for different elements
const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8', 
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-20 h-20'
}

const chipSizeClasses = {
  xs: 'p-0.5',
  sm: 'p-0.5',
  md: 'p-1',
  lg: 'p-1',
  xl: 'p-1.5',
  '2xl': 'p-2'
}

const statusSizeClasses = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
  xl: 'w-5 h-5',
  '2xl': 'w-6 h-6'
}

const statusIconSizeClasses = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
  xl: 'w-3 h-3',
  '2xl': 'w-4 h-4'
}

const roleBadgeSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
  '2xl': 'w-8 h-8'
}

const roleIconSizeClasses = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5'
}

const badgePositionClasses = {
  xs: 'min-w-[16px] h-4',
  sm: 'min-w-[18px] h-4',
  md: 'min-w-[20px] h-5',
  lg: 'min-w-[22px] h-5',
  xl: 'min-w-[24px] h-6',
  '2xl': 'min-w-[28px] h-7'
}

// Background color classes with Nuxt UI v3 colors + dark theme support
const bgColorClasses = {
  primary: 'bg-primary-500 dark:bg-primary-400',
  secondary: 'bg-secondary-500 dark:bg-secondary-400', 
  success: 'bg-success-500 dark:bg-success-400',
  info: 'bg-info-500 dark:bg-info-400',
  warning: 'bg-warning-500 dark:bg-warning-400',
  error: 'bg-error-500 dark:bg-error-400',
  neutral: 'bg-neutral-500 dark:bg-neutral-400',
  'gradient-blue': 'bg-gradient-to-br from-blue-400 to-purple-600 dark:from-blue-300 dark:to-purple-500',
  'gradient-green': 'bg-gradient-to-br from-green-400 to-blue-600 dark:from-green-300 dark:to-blue-500',
  'gradient-purple': 'bg-gradient-to-br from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500',
  'gradient-pink': 'bg-gradient-to-br from-pink-400 to-red-600 dark:from-pink-300 dark:to-red-500'
}

// Status colors with modern badge style + dark theme support
const getStatusColor = (status) => {
  const colors = {
    online: 'bg-success-500 dark:bg-success-400',
    away: 'bg-warning-500 dark:bg-warning-400',
    busy: 'bg-error-500 dark:bg-error-400',
    dnd: 'bg-error-500 dark:bg-error-400',
    offline: 'bg-neutral-500 dark:bg-neutral-400'
  }
  return colors[status] || 'bg-neutral-500 dark:bg-neutral-400'
}

// Status icons with Lucide icons
const getStatusIcon = (status) => {
  const icons = {
    online: 'i-lucide-wifi',
    away: 'i-lucide-clock',
    busy: 'i-lucide-minus-circle',
    dnd: 'i-lucide-do-not-disturb-sign',
    offline: 'i-lucide-wifi-off'
  }
  return icons[status] || null
}

// Role colors + dark theme support
const getRoleColor = (role) => {
  const colors = {
    admin: 'bg-error-500 dark:bg-error-400',
    moderator: 'bg-warning-500 dark:bg-warning-400',
    premium: 'bg-secondary-500 dark:bg-secondary-400',
    verified: 'bg-success-500 dark:bg-success-400',
    vip: 'bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-300 dark:to-orange-400'
  }
  return colors[role?.toLowerCase()] || 'bg-info-500 dark:bg-info-400'
}

// Role icons
const getRoleIcon = (role) => {
  const icons = {
    admin: 'i-lucide-crown',
    moderator: 'i-lucide-shield',
    premium: 'i-lucide-star',
    verified: 'i-lucide-check',
    vip: 'i-lucide-gem'
  }
  return icons[role?.toLowerCase()] || 'i-lucide-user'
}

// Generate initials from name
const getInitials = (name) => {
  if (!name) return '?'
  
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>