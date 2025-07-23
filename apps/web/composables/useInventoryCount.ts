// apps/web/composables/useInventoryCount.ts
import { ref, reactive, computed } from 'vue'
import type { StockItem, StockEntry, Category } from '~/types/stock'

export const useInventoryCount = () => {
  // State
  const search = ref('')
  const selectedCategory = ref('all')
  const stockItems = ref<StockItem[]>([])
  const loading = ref(false)
  const stockEntries = reactive<Record<string, StockEntry>>({})
  const autoSaving = ref(false)

  // Computed
  const categories = computed<Category[]>(() => {
    const categoryMap = new Map<string, number>()
    
    stockItems.value.forEach(item => {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1)
    })

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
    
    const categoriesArray: Category[] = [
      { id: 'all', name: 'Tümü', count: stockItems.value.length, color: '#6B7280' }
    ]

    categoryMap.forEach((count, name) => {
      categoriesArray.push({
        id: name.toLowerCase(),
        name,
        count,
        color: colors[categoriesArray.length % colors.length]
      })
    })

    return categoriesArray
  })

  const filteredItems = computed(() => {
    let items = stockItems.value

    // Category filter
    if (selectedCategory.value !== 'all') {
      items = items.filter(item => 
        item.category.toLowerCase() === selectedCategory.value
      )
    }

    // Search filter
    if (search.value) {
      const searchTerm = search.value.toLowerCase()
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      )
    }

    return items
  })

  // Methods
  const loadStockData = async () => {
    loading.value = true
    try {
      // Load from localStorage for now
      const membranData = localStorage.getItem('stock_membran')
      const halatData = localStorage.getItem('stock_halat')
      const mapaData = localStorage.getItem('stock_mapa')
      const plakaData = localStorage.getItem('stock_plaka')
      const profilData = localStorage.getItem('stock_profil')

      const allItems: StockItem[] = []

      if (membranData) {
        const items = JSON.parse(membranData)
        allItems.push(...items.map((item: any, index: number) => ({
          ...item,
          id: `membran-${index}`,
          currentStock: 0
        })))
      }

      if (halatData) {
        const items = JSON.parse(halatData)
        allItems.push(...items.map((item: any, index: number) => ({
          ...item,
          id: `halat-${index}`,
          currentStock: 0
        })))
      }

      if (mapaData) {
        const items = JSON.parse(mapaData)
        allItems.push(...items.map((item: any, index: number) => ({
          ...item,
          id: `mapa-${index}`,
          currentStock: 0
        })))
      }

      if (plakaData) {
        const items = JSON.parse(plakaData)
        allItems.push(...items.map((item: any, index: number) => ({
          ...item,
          id: `plaka-${index}`,
          currentStock: 0
        })))
      }

      if (profilData) {
        const items = JSON.parse(profilData)
        allItems.push(...items.map((item: any, index: number) => ({
          ...item,
          id: `profil-${index}`,
          currentStock: 0
        })))
      }

      stockItems.value = allItems
    } catch (error) {
      console.error('Stok verisi yükleme hatası:', error)
    } finally {
      loading.value = false
    }
  }

  const loadSavedEntries = () => {
    try {
      const saved = localStorage.getItem('stock_entries')
      if (saved) {
        const entries = JSON.parse(saved)
        Object.assign(stockEntries, entries)
      }
    } catch (error) {
      console.error('Kayıtlı girişler yükleme hatası:', error)
    }
  }

  const updateStock = async (itemId: string, newStock: number) => {
    autoSaving.value = true
    
    try {
      // Update local state
      stockEntries[itemId] = {
        ...stockEntries[itemId],
        current: newStock,
        lastUpdated: new Date()
      }

      // Save to localStorage
      localStorage.setItem('stock_entries', JSON.stringify(stockEntries))

      // TODO: Send to API
      // await $fetch('/api/stock-items/${itemId}', {
      //   method: 'PUT',
      //   body: { currentStock: newStock }
      // })

      setTimeout(() => {
        autoSaving.value = false
      }, 1000)

    } catch (error) {
      console.error('Stok güncelleme hatası:', error)
      autoSaving.value = false
      throw error
    }
  }

  const getStockStatus = (item: StockItem): 'low' | 'medium' | 'high' => {
    const currentStock = stockEntries[item.id]?.current || item.currentStock || 0
    const minStock = stockEntries[item.id]?.min || item.minStock || item.stockInfo?.defaultMinStock || 0

    if (currentStock <= 0) return 'low'
    if (currentStock <= minStock) return 'low'
    if (currentStock <= minStock * 2) return 'medium'
    return 'high'
  }

  const getStockColor = (status: string): string => {
    switch (status) {
      case 'low': return 'red'
      case 'medium': return 'yellow'
      case 'high': return 'green'
      default: return 'gray'
    }
  }

  const clearFilters = () => {
    search.value = ''
    selectedCategory.value = 'all'
  }

  const saveAllStocks = async (selectedItems: StockItem[]) => {
    try {
      // Save multiple stock entries
      const saves: Record<string, StockEntry> = {}
      
      selectedItems.forEach(item => {
        if (stockEntries[item.id]) {
          saves[item.id] = {
            ...stockEntries[item.id],
            lastUpdated: new Date()
          }
        }
      })
      
      // Merge with existing saves
      const existingSaves = localStorage.getItem('stock_entries')
      const allSaves = existingSaves ? JSON.parse(existingSaves) : {}
      Object.assign(allSaves, saves)
      
      localStorage.setItem('stock_entries', JSON.stringify(allSaves))
      
      // TODO: Send to API
      // await Promise.all(selectedItems.map(item => 
      //   $fetch(`/api/stock-items/${item.id}`, {
      //     method: 'PUT',
      //     body: { 
      //       currentStock: stockEntries[item.id]?.current || 0,
      //       minStock: stockEntries[item.id]?.min || 0
      //     }
      //   })
      // ))
      
      return true
    } catch (error) {
      console.error('Toplu kaydetme hatası:', error)
      throw error
    }
  }

  return {
    // State
    search,
    selectedCategory,
    stockItems,
    loading,
    stockEntries,
    autoSaving,
    
    // Computed
    categories,
    filteredItems,
    
    // Methods
    loadStockData,
    loadSavedEntries,
    updateStock,
    saveAllStocks,
    getStockStatus,
    getStockColor,
    clearFilters
  }
}