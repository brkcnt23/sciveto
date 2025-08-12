import type { StockItem } from '~/types'

export const useStockItemsApi = () => {
  const api = useApi()

  const getStockItemsByCategory = async (categoryId: string): Promise<StockItem[]> => {
    try {
      console.log('Fetching stock items for category:', categoryId)
      const response = await api(`/stock-items/category/${categoryId}`)
      console.log('Stock items API response:', response)
      
      // API response structure'ını handle et
      if (response && typeof response === 'object' && 'data' in response) {
        return (response as any).data as StockItem[]
      }
      
      return response as StockItem[]
    } catch (error) {
      console.error('Error fetching stock items by category:', error)
      throw error
    }
  }

  const createStockItem = async (data: Partial<StockItem>): Promise<StockItem> => {
    try {
      console.log('Creating stock item:', data)
      const response = await api('/stock-items', {
        method: 'POST',
        body: data
      })
      console.log('Create stock item response:', response)
      return response as StockItem
    } catch (error) {
      console.error('Error creating stock item:', error)
      throw error
    }
  }

  const updateStockItem = async (id: string, data: Partial<StockItem>): Promise<StockItem> => {
    try {
      console.log('Updating stock item:', id, data)
      const response = await api(`/stock-items/${id}`, {
        method: 'PATCH',
        body: data
      })
      console.log('Update stock item response:', response)
      return response as StockItem
    } catch (error) {
      console.error('Error updating stock item:', error)
      throw error
    }
  }

  const deleteStockItem = async (id: string): Promise<void> => {
    try {
      console.log('Deleting stock item:', id)
      await api(`/stock-items/${id}`, {
        method: 'DELETE'
      })
      console.log('Stock item deleted successfully')
    } catch (error) {
      console.error('Error deleting stock item:', error)
      throw error
    }
  }

  return {
    getStockItemsByCategory,
    createStockItem,
    updateStockItem,
    deleteStockItem
  }
}
