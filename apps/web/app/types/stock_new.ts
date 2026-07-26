// apps/web/types/stock.ts - Fixed Type Definitions

export type PropertyType = 'text' | 'number' | 'textarea' | 'select' | 'boolean'

export interface CategoryProperty {
  id: string
  name: string
  type: PropertyType
  required: boolean
  options?: string[]
  placeholder?: string
  unit?: string
  optionsText?: string // Helper for form input
}

export interface CategoryTemplate {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  isDefault: boolean
  properties: CategoryProperty[]
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  isDefault: boolean
  properties: CategoryProperty[]
  createdAt: Date
  updatedAt: Date
  itemCount?: number
  totalValue?: number
  lowStockItems?: number
  _count?: {
    stockItems: number
  }
  activeProjects?: number
  popularItems?: StockItem[]
}

// Project allocation interface
export interface ProjectAllocation {
  id: string
  projectId: string
  stockItemId: string
  allocatedQuantity: number
  usedQuantity: number
  project?: {
    id: string
    name: string
    status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  }
  createdAt: Date
  updatedAt: Date
}

export interface StockItem {
  id: string
  name: string
  sku?: string
  description: string
  price?: number
  stock: number
  currentStock?: number
  minStock?: number
  unit?: string
  categoryId: string
  category?: Category
  properties?: Record<string, any>
  status: 'active' | 'inactive' | 'discontinued'
  value?: number
  lastPurchasePrice?: number
  supplier?: string
  location?: string
  barcode?: string
  notes?: string
  minStockLevel?: number
  maxStockLevel?: number
  reorderPoint?: number
  reorderQuantity?: number
  image?: string
  tags?: string[]
  standards?: Record<string, string>
  templateFields?: Record<string, any>
  reservedStock?: number
  specifications?: string
  allocations?: ProjectAllocation[]
  createdAt: Date
  updatedAt: Date
}

// Form interface for creating/editing stock items
export interface ItemForm {
  name: string
  description: string
  unit: string
  currentStock: number
  minStock: number
  value: number
  standards: Record<string, string>
  templateFields: Record<string, any>
  location?: string
  specifications?: string
  reservedStock?: number
}

// Input validation map - FIXED for TypeScript
export const inputTypeMap: Record<PropertyType, string> = {
  text: 'text',
  number: 'number', 
  textarea: 'textarea',
  select: 'select',
  boolean: 'checkbox'
}

// Stock management specific types
export interface StockEntry {
  current: number
  min: number
  max?: number
  location?: string
  lastUpdate?: Date
}

export interface StockInfo {
  currentStock?: number
  defaultMinStock: number
  defaultMaxStock: number
  preferredSupplier?: string
}
