// Inventory count logic
import { ref, reactive, computed } from 'vue'

export const useInventoryCount = () => {
  const search = ref('')
  const selectedCategory = ref('all')
  const stockItems = ref<any[]>([])
  const loading = ref(false)
  
  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'Membran', name: 'Membran' },
    { id: 'Halat', name: 'Halat' },
    { id: 'Mapa', name: 'Mapa' },
    { id: 'Plaka', name: 'Plaka' },
    { id: 'Profil', name: 'Profil' }
  ]
  
  const stockEntries = reactive<Record<string, { current: number, min: number }>>({})
  
  // Filtered items
  const filteredItems = computed(() => {
    let items = stockItems.value
    
    // Category filter
    if (selectedCategory.value !== 'all') {
      items = items.filter(item => item.category === selectedCategory.value)
    }
    
    // Search filter
    if (search.value) {
      const searchLower = search.value.toLowerCase()
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
      )
    }
    
    return items
  })
  
  // Load stock data from localStorage
  const loadStockData = async () => {
    loading.value = true
    try {
      const allItems: any[] = []
      
      // Load all stock types
      const stockTypes = ['membran', 'halat', 'mapa', 'plaka', 'profil']
      
      for (const type of stockTypes) {
        const data = localStorage.getItem(`stock_${type}`)
        if (data) {
          const items = JSON.parse(data)
          allItems.push(...items.map((item: any, index: number) => ({
            ...item,
            id: `${type}_${index}`,
            originalType: type
          })))
        }
      }
      
      stockItems.value = allItems
      
      // Initialize stock entries
      allItems.forEach(item => {
        if (!stockEntries[item.id]) {
          stockEntries[item.id] = {
            current: 0,
            min: item.stockInfo?.defaultMinStock || 0
          }
        }
      })
      
    } catch (error) {
      console.error('Stok verisi yükleme hatası:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Update stock count
  const updateStock = (itemId: string, field: 'current' | 'min', value: number) => {
    if (stockEntries[itemId]) {
      stockEntries[itemId][field] = value
      
      // Auto-save after 1 second delay
      clearTimeout((updateStock as any).saveTimeout)
      ;(updateStock as any).saveTimeout = setTimeout(() => {
        saveStockEntry(itemId)
      }, 1000)
    }
  }
  
  // Save single stock entry
  const saveStockEntry = async (itemId: string) => {
    try {
      const existingSaves = localStorage.getItem('stock_entries') || '{}'
      const saves = JSON.parse(existingSaves)
      saves[itemId] = stockEntries[itemId]
      localStorage.setItem('stock_entries', JSON.stringify(saves))
    } catch (error) {
      console.error('Stok kaydetme hatası:', error)
    }
  }
  
  // Save all stock entries
  const saveAllStocks = async (selectedItems: any[]) => {
    try {
      const saves: Record<string, any> = {}
      
      selectedItems.forEach(item => {
        if (stockEntries[item.id]) {
          saves[item.id] = stockEntries[item.id]
        }
      })
      
      const existingSaves = localStorage.getItem('stock_entries') || '{}'
      const allSaves = { ...JSON.parse(existingSaves), ...saves }
      localStorage.setItem('stock_entries', JSON.stringify(allSaves))
      
      return true
    } catch (error) {
      console.error('Toplu kaydetme hatası:', error)
      throw error
    }
  }
  
  // Load saved stock entries
  const loadSavedEntries = () => {
    try {
      const saved = localStorage.getItem('stock_entries')
      if (saved) {
        const entries = JSON.parse(saved)
        Object.assign(stockEntries, entries)
      }
    } catch (error) {
      console.error('Kaydedilen stok girişlerini yükleme hatası:', error)
    }
  }
  
  // Get stock status (low, normal, high)
  const getStockStatus = (item: any) => {
    const entry = stockEntries[item.id]
    if (!entry) return 'unknown'
    
    const current = entry.current
    const min = entry.min || item.stockInfo?.defaultMinStock || 0
    const max = item.stockInfo?.defaultMaxStock || min * 10
    
    if (current <= min) return 'low'
    if (current >= max) return 'high'
    return 'normal'
  }
  
  return {
    search,
    selectedCategory,
    stockItems,
    filteredItems,
    categories,
    stockEntries,
    loading,
    loadStockData,
    updateStock,
    saveAllStocks,
    loadSavedEntries,
    getStockStatus
  }
}
