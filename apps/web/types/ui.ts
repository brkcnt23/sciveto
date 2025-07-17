// types/ui.ts - Nuxt UI v3 Type Definitions
import type { Ref } from 'vue'

export interface NavigationItem {
  label: string
  to: string
  icon: string
  badge?: number
  children?: NavigationItem[]
  disabled?: boolean
  class?: string
  onClick?: () => void
}

export interface NavigationSection {
  id: string
  label: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  items: NavigationItem[]
  disabled?: boolean
}

export interface QuickAction {
  id: string
  label: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  action: () => void
  disabled?: boolean
  loading?: boolean
  badge?: number | string
}

// Nuxt UI v3 Color System
export type UIColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

// Nuxt UI v3 Size System
export type UISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Nuxt UI v3 Variant System
export type UIVariant = 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'

// Toast Types for Nuxt UI v3
export interface ToastOptions {
  id?: string
  title?: string
  description?: string
  color?: UIColor
  icon?: string
  avatar?: {
    src?: string
    alt?: string
  }
  timeout?: number
  actions?: ToastAction[]
  callback?: () => void
  onDismiss?: () => void
}

export interface ToastAction {
  label: string
  color?: UIColor
  variant?: UIVariant
  onClick?: (event?: Event) => void
}

// Sidebar States
export interface SidebarState {
  isExpanded: boolean
  isHovered: boolean
  isMobile: boolean
  activeSection?: string
  activeItem?: string
}

// Command Palette Types
export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: string
  shortcut?: string[]
  group?: string
  action: () => void
  disabled?: boolean
}

export interface CommandGroup {
  key: string
  label: string
  items: CommandItem[]
}

// Layout Types
export interface LayoutConfig {
  sidebar: {
    collapsible: boolean
    defaultCollapsed: boolean
    width: {
      collapsed: number
      expanded: number
    }
  }
  header: {
    height: number
    sticky: boolean
  }
  footer: {
    height: number
    visible: boolean
  }
}

// Theme Configuration
export interface ThemeConfig {
  colorMode: 'light' | 'dark' | 'auto'
  primaryColor: UIColor
  neutralColor: 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
  radius: number
  animations: boolean
}

// User Interface State
export interface UIState {
  theme: ThemeConfig
  layout: LayoutConfig
  sidebar: SidebarState
  commandPalette: {
    isOpen: boolean
    query: string
  }
  notifications: {
    count: number
    items: NotificationItem[]
  }
}

// Notification Types
export interface NotificationItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

// Modal & Slideover Types
export interface ModalOptions {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  fullscreen?: boolean
  overlay?: boolean
  persistent?: boolean
  transition?: boolean
  preventClose?: boolean
}

export interface SlideoverOptions {
  side?: 'left' | 'right'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  overlay?: boolean
  persistent?: boolean
}

// Form Types for Nuxt UI v3
export interface FormField {
  name: string
  label?: string
  description?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  help?: string
  error?: string
}

export interface FormSchema {
  fields: FormField[]
  validation?: Record<string, any>
}

// Data Table Types
export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  searchable?: boolean
  class?: string
  width?: string | number
}

export interface TableRow {
  [key: string]: any
}

export interface TableConfig {
  columns: TableColumn[]
  rows: TableRow[]
  loading?: boolean
  empty?: {
    icon?: string
    label?: string
    description?: string
  }
  pagination?: {
    page: number
    pageCount: number
    total: number
    pageSize: number
  }
}

// Animation Types
export interface AnimationConfig {
  enter: string
  enterFrom: string
  enterTo: string
  leave: string
  leaveFrom: string
  leaveTo: string
}

// Icon Types
export interface IconConfig {
  name: string
  class?: string
  size?: UISize
  color?: UIColor
}

// Avatar Types
export interface AvatarConfig {
  src?: string
  alt?: string
  size?: UISize
  text?: string
  icon?: string
  chipColor?: UIColor
  chipText?: string
  chipPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
}

// Badge Types
export interface BadgeConfig {
  label: string | number
  color?: UIColor
  variant?: UIVariant
  size?: UISize
  icon?: string
}

// Button Types Enhanced for v3
export interface ButtonConfig {
  label?: string
  icon?: string
  leadingIcon?: string
  trailingIcon?: string
  loading?: boolean
  disabled?: boolean
  color?: UIColor
  variant?: UIVariant
  size?: UISize
  block?: boolean
  square?: boolean
  truncate?: boolean
}

// Composable Return Types
export interface UseToastReturn {
  add: (toast: ToastOptions) => void
  remove: (id: string) => void
  clear: () => void
  update: (id: string, toast: Partial<ToastOptions>) => void
}

export interface UseModalReturn {
  open: (component: any, props?: any, options?: ModalOptions) => void
  close: () => void
  isOpen: Ref<boolean>
}

export interface UseSlideoverReturn {
  open: (component: any, props?: any, options?: SlideoverOptions) => void
  close: () => void
  isOpen: Ref<boolean>
}

// Component Props Types
export interface UISidebarProps {
  modelValue?: boolean
  user?: {
    name: string
    email: string
    avatar?: string
  }
  navigationSections?: NavigationSection[]
  quickActions?: QuickAction[]
  notificationCount?: number
}

export interface UISidebarEmits {
  'update:modelValue': [value: boolean]
  'sign-out': []
  'close': []
}

// Utility Types
export type ExtractProps<T> = T extends new (...args: any) => any
  ? InstanceType<T>['$props']
  : never

export type WithClass<T = {}> = T & {
  class?: any
  ui?: Record<string, any>
}

// Global Augmentation for Nuxt UI v3
declare global {
  interface Window {
    $ui?: {
      toast: UseToastReturn
      modal: UseModalReturn
      slideover: UseSlideoverReturn
    }
  }
}

export {}