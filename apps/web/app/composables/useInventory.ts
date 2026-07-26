import { useApi } from '~/composables/useApi'
import type { StockItem } from '~/types/stock'

type InventoryQuery = {
  search?: string
  categoryId?: string
  status?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

type InventoryResponse = {
  data: StockItem[]
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

type QuickAddPayload = {
  name: string
  sku?: string
  quantity?: number
  categoryId?: string
  unit?: string
  notes?: string
}

export const useInventory = () => {
  const api = useApi()

  const fetchInventory = async (query: InventoryQuery = {}): Promise<InventoryResponse> => {
    return await api('/stock-items', { params: query })
  }

  const fetchInventoryItem = async (id: string): Promise<StockItem> => {
    return await api(`/stock-items/${id}`)
  }

  const createInventoryItem = async (data: Partial<StockItem>): Promise<StockItem> => {
    return await api('/stock-items', {
      method: 'POST',
      body: data,
    })
  }

  const updateInventoryItem = async (id: string, data: Partial<StockItem>): Promise<StockItem> => {
    return await api(`/stock-items/${id}`, {
      method: 'PATCH',
      body: data,
    })
  }

  const deleteInventoryItem = async (id: string): Promise<void> => {
    await api(`/stock-items/${id}`, { method: 'DELETE' })
  }

  const fetchInventoryAllocations = async <T = any>(id: string): Promise<T[]> => {
    return await api(`/stock-items/${id}/allocations`)
  }

  const fetchInventoryTransactions = async <T = any>(id: string): Promise<T[]> => {
    return await api(`/stock-items/${id}/transactions`)
  }

  // ========== DUAL-MODE METHODS ==========

  /**
   * Hızlı ekleme - Fabrika işçileri için
   * POST /stock-items/quick
   */
  const quickAdd = async (payload: QuickAddPayload): Promise<StockItem> => {
    return await api('/stock-items/quick', {
      method: 'POST',
      body: payload,
    })
  }

  /**
   * Eksik kayıtları getir - Ofis yöneticileri için
   * GET /stock-items/incomplete
   */
  const fetchIncompleteItems = async (query: InventoryQuery = {}): Promise<InventoryResponse> => {
    return await api('/stock-items/incomplete', { params: query })
  }

  /**
   * Eksik kaydı tamamla
   * PATCH /stock-items/:id/complete
   */
  const completeItem = async (id: string, data: Partial<StockItem>): Promise<StockItem> => {
    return await api(`/stock-items/${id}/complete`, {
      method: 'PATCH',
      body: data,
    })
  }

  return {
    fetchInventory,
    fetchInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    fetchInventoryAllocations,
    fetchInventoryTransactions,
    // Dual-Mode
    quickAdd,
    fetchIncompleteItems,
    completeItem,
  }
}
