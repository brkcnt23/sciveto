// Stock management related types

export interface StockEntry {
  current: number
  min: number
  max?: number
  location?: string
  lastUpdate?: Date
}

export interface StockInfo {
  currentStock?: number
  defaultMinStock?: number
  defaultMaxStock?: number
  preferredSupplier?: string
}

export interface StockItem {
  id: string
  name: string
  description: string
  category?: string // Made optional to match frontend usage
  unit: string
  stock: number
  minStockLevel?: number
  maxStockLevel?: number
  price?: number
  sku?: string
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED' | 'ARCHIVED'
  categoryId?: string
  specifications?: Record<string, any>
  originalRef?: any
  stockInfo?: StockInfo
  createdAt: Date
  updatedAt: Date
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

// Re-export category types for backwards compatibility
export type { Category, CategoryProperty, PropertyType } from '../categories/create-category.dto';
