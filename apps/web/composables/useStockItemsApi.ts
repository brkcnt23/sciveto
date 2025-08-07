import type { StockItem } from '~/types'

export const useStockItemsApi = () => {
  const runtimeConfig = useRuntimeConfig()

  const getStockItemsByCategory = async (categoryId: string): Promise<StockItem[]> => {
    try {
      const response = await $fetch(`${runtimeConfig.public.apiBase}/stock-items/category/${categoryId}`)
      return response as StockItem[]
    } catch (error) {
      console.error('Error fetching stock items by category:', error)
      throw error
    }
  }

  const createStockItem = async (data: Partial<StockItem>): Promise<StockItem> => {
    try {
      const response = await $fetch(`${runtimeConfig.public.apiBase}/stock-items`, {
        method: 'POST',
        body: data
      })
      return response as StockItem
    } catch (error) {
      console.error('Error creating stock item:', error)
      throw error
    }
  }

  const updateStockItem = async (id: string, data: Partial<StockItem>): Promise<StockItem> => {
    try {
      const response = await $fetch(`${runtimeConfig.public.apiBase}/stock-items/${id}`, {
        method: 'PATCH',
        body: data
      })
      return response as StockItem
    } catch (error) {
      console.error('Error updating stock item:', error)
      throw error
    }
  }

  const deleteStockItem = async (id: string): Promise<void> => {
    try {
      await $fetch(`${runtimeConfig.public.apiBase}/stock-items/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Error deleting stock item:', error)
      throw error
    }
  }

  const getStockItem = async (id: string): Promise<StockItem> => {
    try {
      const response = await $fetch(`${runtimeConfig.public.apiBase}/stock-items/${id}`)
      return response as StockItem
    } catch (error) {
      console.error('Error fetching stock item:', error)
      throw error
    }
  }

  return {
    getStockItemsByCategory,
    createStockItem,
    updateStockItem,
    deleteStockItem,
    getStockItem
  }
}
