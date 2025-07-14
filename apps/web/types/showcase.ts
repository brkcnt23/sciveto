// Nuxt UI v3 Type Definitions

export interface ShowcaseComponent {
  id: string
  title: string
  description: string
  category: ShowcaseCategory
  priority: PriorityLevel
  migrationStatus: MigrationStatus
  v2Component?: string // Old component name
  v3Component: string  // New component name
  features: string[]
  demoCode?: string
}

export type ShowcaseCategory = 
  | 'layout'     // Header, Sidebar, Footer, Breadcrumb
  | 'core'       // Card, Table, Modal, Button, Badge
  | 'data'       // ProgressBar, StatusIndicator, Avatar
  | 'migration'  // Component migration demos
  | 'features'   // Tailwind v4, Reka UI features
  | 'performance' // Bundle size, loading optimizations

export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent'

export type MigrationStatus = 'pending' | 'in-progress' | 'completed'

// Nuxt UI v3 Component Props - Updated API
export interface DropdownMenuItem {
  label?: string // Optional - not needed for separators
  icon?: string
  onClick?: () => void  // Changed from 'click' to 'onClick'
  disabled?: boolean
  separator?: boolean
  to?: string
}

export interface SelectItem {
  label: string
  value: string | number
  disabled?: boolean
  icon?: string
}

// Migration mapping from v2 to v3
export const COMPONENT_MIGRATION_MAP = {
  'UDropdown': 'UDropdownMenu',
  'UFormGroup': 'UFormField', 
  'URange': 'USlider',
  'UToggle': 'USwitch',
  'UDivider': 'USeparator',
  'UNotification': 'UToast',
  'UVerticalNavigation': 'UNavigationMenu',
  'UHorizontalNavigation': 'UNavigationMenu'
} as const

// Color system migration
export const COLOR_MIGRATION_MAP = {
  'gray': 'neutral',
  'black': 'neutral',
  'white': 'neutral'
} as const

// Design System Colors (Nuxt UI v3)
export const DESIGN_COLORS = {
  primary: 'green',
  secondary: 'blue', 
  success: 'emerald',
  info: 'blue',
  warning: 'yellow',
  error: 'red',
  neutral: 'slate'
} as const

export type DesignColor = keyof typeof DESIGN_COLORS