// Re-export types from specific modules (avoid conflicts)
export type { StockItem, ItemForm } from './stock'
export type { Category as ApiCategory } from './category'

// General types
export interface TableColumn<T = any> {
  key: string
  label: string
  sortable?: boolean
  class?: string
}

// Define Category type for component usage
export interface Category {
  id: string
  name: string
  description?: string
  color: string
  icon?: string
  templateId?: string
  templateVersion?: string
  isSystemBased?: boolean
}
