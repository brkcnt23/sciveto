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
  category?: Category | string // Allow both Category object and string
  properties?: Record<string, any>
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED' | 'ARCHIVED' | 'active' | 'inactive' | 'discontinued' // Support both formats
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
  imageUrl?: string // Add imageUrl property
  tags?: string[]
  standards?: Record<string, string>
  templateFields?: Record<string, any>
  reservedStock?: number
  specifications?: string | Record<string, any> // Allow both formats
  allocations?: ProjectAllocation[]
  stockInfo?: StockInfo // Add stockInfo property
  customProperties?: Record<string, any> // Add customProperties
  originalRef?: any // Add originalRef for data mapping
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

// Additional types for create operations
export interface CreateStockItemData {
  name: string
  description: string
  unit: string
  currentStock: number
  stock?: number
  minStock: number
  maxStock?: number
  minStockLevel?: number
  maxStockLevel?: number
  value: number
  price?: number
  categoryId: string
  sku?: string
  status?: string
  location?: string
  supplier?: string
  notes?: string
  imageUrl?: string
  standards?: Record<string, string>
  templateFields?: Record<string, any>
  specifications?: string
  properties?: Record<string, any>
  customProperties?: Record<string, any>
}

export interface CreateCategoryData {
  name: string
  description?: string
  color: string
  icon: string
  properties: Omit<CategoryProperty, 'id'>[]
}

// Category with count information
export interface CategoryWithCount {
  id: string
  category: string
  name?: string
  count: number
  color: string
}

// Import types for data management
export type ImportType = 'csv' | 'excel' | 'json' | 'membran' | 'halat' | 'mapa' | 'plaka' | 'profil'

export interface ImportCounts {
  [category: string]: number
}

export interface ImportingStates {
  [category: string]: boolean
}

// Filter definitions
export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  label: string;
  key: string;
  type: 'select' | 'input' | 'date';
  options?: FilterOption[];
  placeholder?: string;
}

export interface QuickFilter {
  key: string;
  label: string;
  value: string;
  count: number;
  color: string;
  event: string;
}
