<!-- components/base/Avatar.vue -->
<template>
  <div class="relative inline-block">
    <!-- UAvatar with Chip integration for enhanced styling -->
    <UChip 
      v-if="chipColor && chipColor !== 'none'"
      :color="chipColor" 
      :inset="true"
      :class="chipSizeClasses[size]"
    >
      <UAvatar 
        :src="avatarSrc" 
        :alt="avatarAlt"
        :size="size"
        :icon="fallbackIcon"
        :text="fallbackText"
        :class="[
          'transition-all duration-200',
          avatarClass,
          {
            'opacity-75 grayscale': isOffline,
            'ring-2 ring-white dark:ring-neutral-800': showRing,
            'hover:scale-105': interactive,
            'cursor-pointer': interactive
          }
        ]"
        :ui="avatarUiOverrides"
        v-bind="$attrs"
      />
    </UChip>
    
    <!-- Enhanced UAvatar with custom background colors -->
    <UAvatar 
      v-else
      :src="shouldShowImage ? avatarSrc : undefined"
      :alt="avatarAlt"
      :size="size"
      :icon="fallbackIcon"
      :text="fallbackText || initials"
      :class="[
        'transition-all duration-200',
        backgroundColorClass,
        {
          'opacity-75 grayscale': isOffline,
          'ring-2 ring-white dark:ring-neutral-800 shadow-lg': showRing,
          'hover:scale-105': interactive,
          'cursor-pointer': interactive,
          'text-white font-medium': hasCustomBackground
        },
        avatarClass
      ]"
      :ui="avatarUiOverrides"
      v-bind="$attrs"
      @click="handleClick"
    />
    
    <!-- Modern Status Indicator -->
    <div 
      v-if="showOnlineStatus && hasStatus"
      :class="[
        'absolute rounded-full ring-2 ring-white dark:ring-neutral-800',
        'flex items-center justify-center transition-all duration-200',
        statusPositionClass[size],
        statusColorClass,
        statusSizeClass[size],
        {
          'animate-pulse': status === 'busy' || status === 'away',
          'animate-bounce': status === 'online' && pulseOnline
        }
      ]"
    >
      <!-- Status Icon -->
      <UIcon 
        v-if="statusIcon"
        :name="statusIcon" 
        :class="statusIconSizeClass[size]"
        class="text-white drop-shadow-sm"
      />
      <div
        v-else
        :class="[
          'rounded-full bg-white shadow-inner',
          statusDotSizeClass[size]
        ]"
      />
    </div>
    
    <!-- Notification Badge -->
    <UBadge
      v-if="notificationCount && notificationCount > 0"
      :label="notificationCount > 99 ? '99+' : notificationCount.toString()"
      color="error"
      variant="solid"
      size="xs"
      :class="[
        'absolute -top-1 -right-1 min-w-[18px] h-[18px]',
        'flex items-center justify-center text-[10px] font-bold',
        'ring-2 ring-white dark:ring-neutral-800',
        'animate-pulse'
      ]"
    />
    
    <!-- Role Badge -->
    <div
      v-if="showRole && roleConfig"
      :class="[
        'absolute -bottom-1 -right-1 rounded-full',
        'ring-2 ring-white dark:ring-neutral-800',
        'flex items-center justify-center',
        roleBadgeSizeClass[size],
        roleConfig.bgClass
      ]"
    >
      <UIcon 
        :name="roleConfig.icon"
        :class="[
          roleIconSizeClass[size],
          'text-white drop-shadow-sm'
        ]"
      />
    </div>
    
    <!-- Activity Indicator (Typing, Recording, etc.) -->
    <div
      v-if="activityType"
      :class="[
        'absolute -top-1 -left-1 rounded-full',
        'bg-info-500 ring-2 ring-white dark:ring-neutral-800',
        'flex items-center justify-center animate-pulse',
        activitySizeClass[size]
      ]"
    >
      <UIcon 
        :name="activityIcon"
        :class="activityIconSizeClass[size]"
        class="text-white"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id?: string | number
  name?: string
  username?: string
  email?: string
  avatar?: string
  image?: string
  initials?: string
  status?: 'online' | 'away' | 'busy' | 'offline'
  isOnline?: boolean
  role?: 'admin' | 'premium' | 'vip' | 'moderator' | 'user'
}

interface Props {
  // User data - can be undefined for simple usage
  user?: User
  
  // Direct props (override user data)
  src?: string
  alt?: string
  name?: string
  
  // Visual props
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  bgColor?: 'none' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' | 
           'gradient-blue' | 'gradient-green' | 'gradient-purple' | 'gradient-pink' | 'gradient-orange'
  chipColor?: 'none' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  
  // Feature toggles
  showOnlineStatus?: boolean
  showRole?: boolean
  showImage?: boolean
  showRing?: boolean
  interactive?: boolean
  pulseOnline?: boolean
  
  // Additional props
  notificationCount?: number
  activityType?: 'typing' | 'recording' | 'uploading'
  fallbackIcon?: string
  fallbackText?: string
  avatarClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  bgColor: 'none',
  chipColor: 'none',
  showImage: true,
  showRing: true,
  interactive: false,
  pulseOnline: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Computed properties
const avatarSrc = computed(() => 
  props.src || props.user?.avatar || props.user?.image
)

const avatarAlt = computed(() => 
  props.alt || props.name || props.user?.name || props.user?.username || 'User Avatar'
)

const shouldShowImage = computed(() => 
  props.showImage && !!avatarSrc.value
)

const initials = computed(() => {
  const name = props.name || props.user?.name || props.user?.username
  if (!name) return ''
  
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

const status = computed(() => 
  props.user?.status || (props.user?.isOnline ? 'online' : 'offline')
)

const hasStatus = computed(() => 
  props.user?.isOnline !== undefined || props.user?.status !== undefined
)

const isOffline = computed(() => 
  status.value === 'offline' || props.user?.isOnline === false
)

const hasCustomBackground = computed(() => 
  props.bgColor && props.bgColor !== 'none'
)

// Style classes
const chipSizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6', 
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-20 h-20',
  '3xl': 'w-24 h-24'
}

const statusPositionClass = {
  xs: 'bottom-0 right-0',
  sm: 'bottom-0 right-0',
  md: 'bottom-0 right-0', 
  lg: 'bottom-1 right-1',
  xl: 'bottom-1 right-1',
  '2xl': 'bottom-2 right-2',
  '3xl': 'bottom-2 right-2'
}

const statusSizeClass = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
  xl: 'w-5 h-5',
  '2xl': 'w-6 h-6',
  '3xl': 'w-7 h-7'
}

const statusIconSizeClass = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5', 
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
  xl: 'w-3 h-3',
  '2xl': 'w-4 h-4',
  '3xl': 'w-5 h-5'
}

const statusDotSizeClass = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2', 
  lg: 'w-2.5 h-2.5',
  xl: 'w-3 h-3',
  '2xl': 'w-4 h-4',
  '3xl': 'w-5 h-5'
}

const roleBadgeSizeClass = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6', 
  xl: 'w-7 h-7',
  '2xl': 'w-8 h-8',
  '3xl': 'w-9 h-9'
}

const roleIconSizeClass = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5', 
  '3xl': 'w-6 h-6'
}

const activitySizeClass = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
  '2xl': 'w-8 h-8',
  '3xl': 'w-9 h-9'
}

const activityIconSizeClass = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5', 
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5',
  '3xl': 'w-6 h-6'
}

// Background colors with enhanced gradients
const backgroundColorClasses = {
  none: '',
  primary: 'bg-primary-500 dark:bg-primary-400',
  secondary: 'bg-secondary-500 dark:bg-secondary-400',
  success: 'bg-success-500 dark:bg-success-400',
  info: 'bg-info-500 dark:bg-info-400',
  warning: 'bg-warning-500 dark:bg-warning-400',
  error: 'bg-error-500 dark:bg-error-400',
  neutral: 'bg-neutral-500 dark:bg-neutral-400',
  'gradient-blue': 'bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600',
  'gradient-green': 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600',
  'gradient-purple': 'bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600',
  'gradient-pink': 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500',
  'gradient-orange': 'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500'
}

const backgroundColorClass = computed(() => 
  backgroundColorClasses[props.bgColor] || ''
)

// Status colors and icons
const statusColors = {
  online: 'bg-success-500',
  away: 'bg-warning-500', 
  busy: 'bg-error-500',
  offline: 'bg-neutral-400'
}

const statusIcons = {
  online: '',
  away: 'i-lucide-clock',
  busy: 'i-lucide-minus-circle',
  offline: 'i-lucide-wifi-off'
}

const statusColorClass = computed(() => 
  statusColors[status.value] || statusColors.offline
)

const statusIcon = computed(() => 
  statusIcons[status.value]
)

// Role configurations
const roleConfigs = {
  admin: {
    icon: 'i-lucide-crown',
    bgClass: 'bg-error-500'
  },
  premium: {
    icon: 'i-lucide-star',
    bgClass: 'bg-warning-500'
  },
  vip: {
    icon: 'i-lucide-gem',
    bgClass: 'bg-purple-500'
  },
  moderator: {
    icon: 'i-lucide-shield',
    bgClass: 'bg-info-500'
  },
  user: {
    icon: 'i-lucide-user',
    bgClass: 'bg-neutral-500'
  }
}

const roleConfig = computed(() => 
  props.user?.role ? roleConfigs[props.user.role] : null
)

// Activity configurations
const activityIcons = {
  typing: 'i-lucide-type',
  recording: 'i-lucide-mic',
  uploading: 'i-lucide-upload'
}

const activityIcon = computed(() => 
  props.activityType ? activityIcons[props.activityType] : 'i-lucide-activity'
)

// UI overrides for UAvatar
const avatarUiOverrides = computed(() => ({
  root: 'relative inline-flex items-center justify-center flex-shrink-0 font-medium overflow-hidden',
  image: 'object-cover w-full h-full',
  fallback: 'flex items-center justify-center w-full h-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
}))

// Methods
const handleClick = (event: MouseEvent) => {
  if (props.interactive) {
    emit('click', event)
  }
}
</script>