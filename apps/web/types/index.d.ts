// Global type declarations for the application

declare global {
  interface Window {
    // Add any global window properties here
  }
}

// Vue component types
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// ECharts types for WorldMap component
declare module 'echarts-gl/components' {
  export const GlobeComponent: any
}

declare module 'echarts-gl/charts' {
  export const Scatter3DChart: any
}

declare module 'vue-echarts' {
  import { DefineComponent } from 'vue'
  const VChart: DefineComponent<any, any, any>
  export default VChart
}

// Project data types
export interface ProjectLocation {
  name: string
  coordinates: [number, number]
  project: string
  link: string
  image?: string
  color?: string
  importance?: number
}

// Form data types
export interface FormData {
  name: string
  email: string
  budget: number | null
  description: string
  priority: string | null
  startDate: Date | string | null
  endDate: Date | string | null
  time: string | null
}

// Upload file types
export interface UploadFile {
  name: string
  size: number
  type: string
  file: File
  uploaded: boolean
  uploading: boolean
  progress: number
  error?: string
}

// Pagination types
export interface PaginationData {
  currentPage: number
  perPage: number
  total: number
}

// Toast notification types
export interface ToastOptions {
  title: string
  description?: string
  color?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary' | 'neutral'
  icon?: string
  timeout?: number
}

// Component prop types
export interface ComponentWithName {
  name: string
}

export interface SelectOption {
  label: string
  value: string | number
  icon?: string
  disabled?: boolean
}

// Project types
export interface Project {
  id: number
  name: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  progress: number
  team: number
  dueDate: string
}

// User types
export interface User {
  id: number
  name: string
  firstName?: string
  email: string
  avatar?: string
  role?: string
}

// Export everything
export {}