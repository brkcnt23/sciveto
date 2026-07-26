// composables/useStockItemManager.ts - Stock Item Management Logic

import type { StockItem, CreateStockItemData, Category } from '~/types/stock'

export const useStockItemManager = () => {
  // State
  const stockItems = ref<StockItem[]>([])
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Filters
  const searchQuery = ref('')
  const selectedCategoryId = ref<string>('')
  const selectedStatus = ref<string>('')
  const sortBy = ref<'name' | 'stock' | 'price' | 'updatedAt'>('updatedAt')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Pagination
  const currentPage = ref(1)
  const itemsPerPage = ref(12)

  // Computed
  const filteredStockItems = computed(() => {
    let items = [...stockItems.value]

    // Search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.sku?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.supplier?.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategoryId.value) {
      items = items.filter(item => item.categoryId === selectedCategoryId.value)
    }

    // Status filter
    if (selectedStatus.value) {
      items = items.filter(item => item.status === selectedStatus.value)
    }

    // Sort items
    items.sort((a, b) => {
      let aValue: any = a[sortBy.value]
      let bValue: any = b[sortBy.value]

      // Handle different data types
      if (sortBy.value === 'updatedAt') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue?.toLowerCase() || ''
      } else if (typeof aValue === 'number') {
        aValue = aValue || 0
        bValue = bValue || 0
      }

      if (sortOrder.value === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      }
    })

    return items
  })

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredStockItems.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredStockItems.value.length / itemsPerPage.value)
  })

  const totalItems = computed(() => filteredStockItems.value.length)

  // Stock Statistics
  const stockStats = computed(() => {
    const items = stockItems.value
    const totalItems = items.length
    const lowStockItems = items.filter(item => item.stock <= (item.minStockLevel || 10)).length
    const outOfStockItems = items.filter(item => item.stock <= 0).length
    const totalValue = items.reduce((sum, item) => sum + ((item.price || 0) * item.stock), 0)

    return {
      totalItems,
      lowStockItems,
      outOfStockItems,
      totalValue,
      activeItems: items.filter(item => item.status === 'ACTIVE' || item.status === 'active').length,
      categories: [...new Set(items.map(item => item.categoryId).filter(Boolean))].length
    }
  })

  // API Functions
  const fetchStockItems = async (params?: {
    search?: string
    categoryId?: string
    status?: string
    page?: number
    limit?: number
  }) => {
    loading.value = true
    error.value = null

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 800))

      // Mock data generation
      const mockItems: StockItem[] = [
        {
          id: '1',
          name: 'PTFE Membrane 1050',
          sku: 'MEM-PTFE-1050',
          description: 'High-quality PTFE membrane for architectural applications',
          price: 45.50,
          stock: 150,
          unit: 'm²',
          minStockLevel: 50,
          maxStockLevel: 500,
          status: 'ACTIVE' as const,
          location: 'Warehouse A-1',
          supplier: 'Ferrari Textiles',
          categoryId: 'cat-1',
          category: 'Membran',
          customProperties: {
            weight_g_m2: 1050,
            width_cm: 300,
            type: 'PTFE',
            color: 'Natural White',
            warranty_years: 20
          },
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: '2',
          name: 'Steel Cable 6mm',
          sku: 'HAL-SS316-6',
          description: 'Stainless steel cable 316 grade',
          price: 8.25,
          stock: 8,
          unit: 'm',
          minStockLevel: 20,
          maxStockLevel: 200,
          status: 'ACTIVE' as const,
          location: 'Warehouse B-2',
          supplier: 'Steel Tech Ltd',
          categoryId: 'cat-2',
          category: 'Halat',
          customProperties: {
            diameter_mm: 6,
            material: 'Stainless Steel 316',
            construction: '7x7',
            breaking_load_kn: 12.5,
            length_m: 100
          },
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-22')
        },
        {
          id: '3',
          name: 'HEB200 Profile',
          sku: 'PRF-HEB200-S235',
          description: 'HEB200 structural steel profile',
          price: 125.00,
          stock: 0,
          unit: 'pcs',
          minStockLevel: 5,
          maxStockLevel: 50,
          status: 'ACTIVE' as const,
          location: 'Yard C',
          supplier: 'Metro Steel',
          categoryId: 'cat-3',
          category: 'Profil',
          customProperties: {
            profile_type: 'HEB',
            dimensions: 'HEB200',
            material: 'S235JR',
            length_m: 12,
            weight_kg_m: 71.5
          },
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-18')
        }
      ]

      stockItems.value = mockItems
    } catch (err) {
      error.value = 'Failed to fetch stock items'
      console.error('Error fetching stock items:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      // Mock categories
      const mockCategories: Category[] = [
        {
          id: 'cat-1',
          name: 'Membran',
          description: 'PTFE/ETFE membranes',
          color: 'blue',
          icon: 'i-heroicons-square-3-stack-3d',
          isDefault: true,
          properties: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'cat-2',
          name: 'Halat',
          description: 'Steel cables and ropes',
          color: 'gray',
          icon: 'i-heroicons-link',
          isDefault: true,
          properties: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'cat-3',
          name: 'Profil',
          description: 'Structural profiles',
          color: 'orange',
          icon: 'i-heroicons-squares-plus',
          isDefault: true,
          properties: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      categories.value = mockCategories
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const createStockItem = async (data: CreateStockItemData): Promise<StockItem | null> => {
    loading.value = true
    error.value = null

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newItem: StockItem = {
        id: Date.now().toString(),
        name: data.name,
        sku: data.sku || undefined,
        description: data.description || '', // Ensure description is always a string
        price: data.price || undefined,
        stock: data.currentStock || data.stock || 0,
        unit: data.unit,
        minStockLevel: data.minStock || data.minStockLevel || undefined,
        maxStockLevel: data.maxStock || data.maxStockLevel || undefined,
        status: (data.status as any) || 'ACTIVE',
        location: data.location || undefined,
        supplier: data.supplier || undefined,
        notes: data.notes || undefined,
        categoryId: data.categoryId,
        category: data.categoryId, // Simplified category mapping
        imageUrl: data.imageUrl || undefined,
        customProperties: data.properties || data.customProperties || undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      stockItems.value.unshift(newItem)
      return newItem
    } catch (err) {
      error.value = 'Failed to create stock item'
      console.error('Error creating stock item:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const updateStockItem = async (id: string, data: Partial<CreateStockItemData>): Promise<StockItem | null> => {
    loading.value = true
    error.value = null

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800))

      const index = stockItems.value.findIndex(item => item.id === id)
      if (index === -1) {
        throw new Error('Stock item not found')
      }

      const updatedItem: StockItem = {
        ...stockItems.value[index],
        ...data,
        updatedAt: new Date()
      } as StockItem

      stockItems.value[index] = updatedItem
      return updatedItem
    } catch (err) {
      error.value = 'Failed to update stock item'
      console.error('Error updating stock item:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteStockItem = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const index = stockItems.value.findIndex(item => item.id === id)
      if (index === -1) {
        throw new Error('Stock item not found')
      }

      stockItems.value.splice(index, 1)
      return true
    } catch (err) {
      error.value = 'Failed to delete stock item'
      console.error('Error deleting stock item:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateStock = async (id: string, newStock: number, notes?: string): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const index = stockItems.value.findIndex(item => item.id === id)
      if (index === -1) {
        throw new Error('Stock item not found')
      }

      stockItems.value[index].stock = newStock
      stockItems.value[index].updatedAt = new Date()
      
      if (notes) {
        stockItems.value[index].notes = notes
      }

      return true
    } catch (err) {
      error.value = 'Failed to update stock'
      console.error('Error updating stock:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Filter and search functions
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1 // Reset to first page
  }

  const setCategoryFilter = (categoryId: string) => {
    selectedCategoryId.value = categoryId
    currentPage.value = 1
  }

  const setStatusFilter = (status: string) => {
    selectedStatus.value = status
    currentPage.value = 1
  }

  const setSorting = (field: typeof sortBy.value, order: typeof sortOrder.value) => {
    sortBy.value = field
    sortOrder.value = order
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategoryId.value = ''
    selectedStatus.value = ''
    currentPage.value = 1
  }

  // Initialize data
  const initialize = async () => {
    await Promise.all([
      fetchCategories(),
      fetchStockItems()
    ])
  }

  return {
    // State
    stockItems: readonly(stockItems),
    categories: readonly(categories),
    loading: readonly(loading),
    error: readonly(error),

    // Filters
    searchQuery,
    selectedCategoryId,
    selectedStatus,
    sortBy,
    sortOrder,

    // Pagination
    currentPage,
    itemsPerPage,

    // Computed
    filteredStockItems,
    paginatedItems,
    totalPages,
    totalItems,
    stockStats,

    // API Functions
    fetchStockItems,
    fetchCategories,
    createStockItem,
    updateStockItem,
    deleteStockItem,
    updateStock,

    // Filter Functions
    setSearchQuery,
    setCategoryFilter,
    setStatusFilter,
    setSorting,
    resetFilters,

    // Initialize
    initialize
  }
}