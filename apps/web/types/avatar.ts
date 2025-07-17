// types/avatar.ts
export interface User {
  id?: string | number
  name?: string
  username?: string
  email?: string
  avatar?: string
  image?: string
  initials?: string
  status?: UserStatus
  isOnline?: boolean
  role?: UserRole
}

export type UserStatus = 'online' | 'away' | 'busy' | 'offline'

export type UserRole = 'admin' | 'premium' | 'vip' | 'moderator' | 'user'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export type AvatarBgColor = 
  | 'none' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'info' 
  | 'warning' 
  | 'error' 
  | 'neutral' 
  | 'gradient-blue' 
  | 'gradient-green' 
  | 'gradient-purple' 
  | 'gradient-pink' 
  | 'gradient-orange'

export type ChipColor = 
  | 'none' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'info' 
  | 'warning' 
  | 'error' 
  | 'neutral'

export type ActivityType = 'typing' | 'recording' | 'uploading'

export interface AvatarProps {
  // User data - can be undefined for simple usage
  user?: User
  
  // Direct props (override user data)
  src?: string
  alt?: string
  name?: string
  
  // Visual props
  size?: AvatarSize
  bgColor?: AvatarBgColor
  chipColor?: ChipColor
  
  // Feature toggles
  showOnlineStatus?: boolean
  showRole?: boolean
  showImage?: boolean
  showRing?: boolean
  interactive?: boolean
  pulseOnline?: boolean
  
  // Additional props
  notificationCount?: number
  activityType?: ActivityType
  fallbackIcon?: string
  fallbackText?: string
  avatarClass?: string
}

export interface RoleConfig {
  icon: string
  bgClass: string
}

// Usage examples for documentation
export interface AvatarUsageExamples {
  // Simple usage
  simple: {
    user: { name: string }
  }
  
  // With image
  withImage: {
    user: { name: string; avatar: string }
    size: AvatarSize
  }
  
  // With status
  withStatus: {
    user: User
    showOnlineStatus: boolean
  }
  
  // With notification
  withNotification: {
    user: User
    notificationCount: number
  }
  
  // Custom background
  customBackground: {
    user: { name: string }
    bgColor: AvatarBgColor
  }
  
  // Interactive
  interactive: {
    user: User
    interactive: boolean
    onClick: (event: MouseEvent) => void
  }
  
  // Avatar group
  group: {
    users: User[]
    size: AvatarSize
    max?: number
  }
}

// Status configurations
export const StatusConfigs: Record<UserStatus, { color: string; icon?: string }> = {
  online: { color: 'bg-success-500', icon: '' },
  away: { color: 'bg-warning-500', icon: 'i-lucide-clock' },
  busy: { color: 'bg-error-500', icon: 'i-lucide-minus-circle' },
  offline: { color: 'bg-neutral-400', icon: 'i-lucide-wifi-off' }
}

// Role configurations
export const RoleConfigs: Record<UserRole, RoleConfig> = {
  admin: { icon: 'i-lucide-crown', bgClass: 'bg-error-500' },
  premium: { icon: 'i-lucide-star', bgClass: 'bg-warning-500' },
  vip: { icon: 'i-lucide-gem', bgClass: 'bg-purple-500' },
  moderator: { icon: 'i-lucide-shield', bgClass: 'bg-info-500' },
  user: { icon: 'i-lucide-user', bgClass: 'bg-neutral-500' }
}

// Activity configurations
export const ActivityConfigs: Record<ActivityType, { icon: string }> = {
  typing: { icon: 'i-lucide-type' },
  recording: { icon: 'i-lucide-mic' },
  uploading: { icon: 'i-lucide-upload' }
}