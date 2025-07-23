// apps/web/types/stock.ts - Create this file
export interface StockItem {
  id: string
  name: string
  description: string
  category: string
  unit: string
  currentStock?: number
  minStock?: number
  originalRef?: any
  stockInfo?: {
    defaultMinStock: number
    defaultMaxStock: number
    preferredSupplier?: string
  }
  specifications?: {
    [key: string]: any
  }
}

export interface StockEntry {
  current: number
  min: number
  lastUpdated?: Date
}

export interface Category {
  id: string
  name: string
  count: number
  color: string
}

export interface ImportCounts {
  membran: number
  halat: number
  mapa: number
  plaka: number
  profil: number
}

export interface ImportingStates {
  membran: boolean
  halat: boolean
  mapa: boolean
  plaka: boolean
  profil: boolean
}

export type ImportType = 'membran' | 'halat' | 'mapa' | 'plaka' | 'profil'