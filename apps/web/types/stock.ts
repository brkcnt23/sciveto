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

export interface StockItem {
  id: string
  name: string
  sku?: string
  description: string // Required for consistency
  price?: number
  stock: number
  currentStock?: number // Helper property for inventory management
  minStock?: number // Helper property for inventory management
  unit?: string
  minStockLevel?: number
  maxStockLevel?: number
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED' | 'ARCHIVED'
  location?: string
  supplier?: string
  notes?: string
  categoryId?: string
  category?: string // Simple string category for now
  imageUrl?: string
  customProperties?: Record<string, any>
  specifications?: Record<string, any>
  originalRef?: any
  stockInfo?: StockInfo
  createdAt: Date
  updatedAt: Date
}

export interface CreateCategoryData {
  name: string
  description?: string
  color: string
  icon: string
  properties: Omit<CategoryProperty, 'id'>[]
}

export interface CreateStockItemData {
  name: string
  sku?: string
  description?: string
  price?: number
  stock: number
  currentStock?: number // For compatibility with forms
  minStock?: number // For compatibility with forms
  maxStock?: number // For compatibility with forms
  unit?: string
  minStockLevel?: number
  maxStockLevel?: number
  status?: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED' | 'ARCHIVED'
  location?: string
  supplier?: string
  notes?: string
  categoryId?: string
  imageUrl?: string
  customProperties?: Record<string, any>
  properties?: Record<string, any> // For dynamic properties
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

export interface ImportProgress {
  show: boolean
  value: number
  max: number
  message: string
}

export interface ImportingStates {
  membran: boolean
  halat: boolean
  mapa: boolean
  plaka: boolean
  profil: boolean
}

export interface ImportCounts {
  membran: number
  halat: number
  mapa: number
  plaka: number
  profil: number
}

export type ImportType = 'membran' | 'halat' | 'mapa' | 'plaka' | 'profil'

export interface CategoryWithCount {
  id: string
  name: string
  count: number
}