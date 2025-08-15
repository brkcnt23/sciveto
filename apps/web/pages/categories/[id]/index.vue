<!-- pages/categories/[id]/index.vue -->
<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <p class="mt-2 text-neutral-600 dark:text-neutral-400">Kategori yükleniyor...</p>
      </div>
    </div>

    <!-- Content -->
    <template v-else-if="category">
      <!-- Modern Page Header -->
      <PageHeader
        :title="category?.name || 'Kategori'"
        :subtitle="category?.description || 'Kategori malzemeleri'"
        :icon="category?.icon || 'i-lucide-folder'"
        :icon-color="category?.color"
        item-type="Ürün"
        @add-item="addItem"
        @export="exportData"
      />

      <!-- Enhanced Stats Cards -->
      <StatsGrid :statistics="categoryStats" />

      <!-- Modern Filters Section -->
      <FiltersSection
        :filters="filters"
        :search-text="searchQuery"
        :filter-groups="filterGroups"
        :quick-filters="quickFilters"
        @filter-change="onFilterChange"
        @search-change="onSearchChange"
        @clear-filters="clearFilters"
        @show-stock-only="showStockOnly"
        @show-project-assigned="showProjectAssigned"
      />

      <!-- Data Table -->
      <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
              Ürün Listesi
            </h3>
            <div class="flex items-center gap-2">
              <UButton
                @click="toggleView"
                :icon="viewMode === 'table' ? 'i-lucide-grid-3x3' : 'i-lucide-list'"
                variant="outline"
                size="sm"
              >
                {{ viewMode === 'table' ? 'Kart Görünümü' : 'Tablo Görünümü' }}
              </UButton>
            </div>
          </div>
        </div>

      <!-- BaseDataTable -->
      <BaseDataTable
        :title="category?.name || 'Ürün Listesi'"
        item-type="ürün"
        :paginatedData="paginatedStockItems"
        :filteredCount="filteredStockItems.length"
        :totalItems="filteredStockItems.length"
        :currentPage="pagination.page"
        :itemsPerPage="pagination.pageSize"
        :currentDensity="viewMode === 'table' ? 'normal' : 'compact'"
        :loading="loading"
        :error="null"
        :selectable="true"
        :selectedItems="[]"
        emptyMessage="Bu kategoride henüz ürün bulunmuyor"
        @density-change="onDensityChange"
        @items-change="onItemsPerPageChange"
        @show-stock-only="showStockOnly"
        @show-project-assigned="showProjectAssigned"
        @clear-filters="clearFilters"
        @page-change="onPageChange"
        @view-item="viewItem"
        @edit-item="editItem"
        @duplicate-item="duplicateItem"
        @delete-item="deleteItem"
      >
        <template #table-head>
          <th>Ürün Adı</th>
          <th>Açıklama</th>
          <th>Birim</th>
          <th>Mevcut Stok</th>
          <th>Min. Stok</th>
          <th>Birim Fiyat</th>
          <th>Toplam Değer</th>
          <th>Lokasyon</th>
          <th>Durum</th>
        </template>
        
        <template #table-body="{ item }">
          <td class="font-medium text-gray-900">{{ item.name }}</td>
          <td class="text-gray-600 max-w-xs truncate">{{ item.description || '-' }}</td>
          <td class="text-gray-900">{{ item.unit || '-' }}</td>
          <td class="text-gray-900 font-medium">{{ item.currentStock || 0 }}</td>
          <td class="text-gray-600">{{ item.minStock || 0 }}</td>
          <td class="text-gray-900">₺{{ item.unitPrice?.toFixed(2) || '0.00' }}</td>
          <td class="text-gray-900 font-medium">₺{{ ((item.currentStock || 0) * (item.unitPrice || 0)).toFixed(2) }}</td>
          <td class="text-gray-600">{{ item.location || '-' }}</td>
          <td>
            <span :class="getStockStatusClass(item)" class="px-2 py-1 text-xs font-medium rounded-full">
              {{ getStockStatusText(item) }}
            </span>
          </td>
        </template>
      </BaseDataTable>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && stockItems.length === 0" class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-12">
        <div class="text-center">
          <UIcon name="i-lucide-package" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">Henüz ürün eklenmemiş</h3>
          <p class="text-neutral-500 mb-4">Bu kategoriye ilk ürünü ekleyerek başlayın</p>
          <UButton
            icon="i-lucide-plus"
            label="İlk Ürünü Ekle"
            color="primary"
            @click="addItem"
          />
        </div>
      </div>
    </template>

    <!-- Error State -->
    <div v-else-if="!loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="text-neutral-400 mb-4">
          <UIcon name="i-lucide-alert-circle" class="w-12 h-12 mx-auto" />
        </div>
        <p class="text-neutral-600 dark:text-neutral-400">Kategori bulunamadı</p>
      </div>
    </div>

    <!-- Add/Edit Item Modal -->
    <BaseModal
      v-if="showItemModal"
      :title="editingItem ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'"
      size="large"
      @close="showItemModal = false"
    >
      <div class="space-y-4">
        <!-- Basic Fields -->
        <div>
          <label class="block text-sm font-medium mb-1">Ürün Adı *</label>
          <UInput v-model="itemForm.name" placeholder="Ürün adını girin" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Açıklama</label>
          <UTextarea v-model="itemForm.description" placeholder="Ürün açıklamasını girin" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Birim *</label>
            <USelectMenu
              v-model="itemForm.unit"
              :options="['adet', 'kg', 'm', 'm²', 'm³', 'lt', 'ton']"
              placeholder="Birim seçin"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Birim Fiyat (₺) *</label>
            <UInput v-model.number="itemForm.value" type="number" step="0.01" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Mevcut Stok *</label>
            <UInput v-model.number="itemForm.currentStock" type="number" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Minimum Stok *</label>
            <UInput v-model.number="itemForm.minStock" type="number" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">SKU/Kod</label>
            <UInput v-model="itemForm.sku" placeholder="Ürün kodu" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Lokasyon</label>
            <UInput v-model="itemForm.location" placeholder="Depo/Raf bilgisi" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Tedarikçi</label>
          <UInput v-model="itemForm.supplier" placeholder="Tedarikçi adı" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Özellikler</label>
          <UTextarea v-model="itemForm.specifications" placeholder="Teknik özellikler, boyutlar vb." />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton @click="showItemModal = false" variant="outline">
            İptal
          </UButton>
          <UButton @click="saveItem" :loading="savingItem" color="primary">
            {{ editingItem ? 'Güncelle' : 'Kaydet' }}
          </UButton>
        </div>
      </template>
    </BaseModal>

    <!-- Import Modal -->
    <BaseModal
      v-if="showImportModal"
      title="Veri İçe Aktar"
      size="medium"
      @close="showImportModal = false"
    >
      <div class="space-y-4">
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <UIcon name="i-lucide-upload" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p class="text-sm text-muted mb-2">Excel veya CSV dosyası seçin</p>
          <UButton variant="outline" size="sm">Dosya Seç</UButton>
        </div>
      </div>
      
      <template #footer>
        <UButton variant="outline" @click="showImportModal = false">İptal</UButton>
        <UButton color="primary">İçe Aktar</UButton>
      </template>
    </BaseModal>

    <!-- Export Modal -->
    <BaseModal
      v-if="showExportModal"
      title="Veri Dışa Aktar"
      size="medium"
      @close="showExportModal = false"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Format Seçin</label>
          <URadioGroup
            v-model="exportFormat"
            :options="[
              { label: 'Excel (.xlsx)', value: 'xlsx' },
              { label: 'CSV (.csv)', value: 'csv' },
              { label: 'JSON (.json)', value: 'json' }
            ]"
          />
        </div>
      </div>
      
      <template #footer>
        <UButton variant="outline" @click="showExportModal = false">İptal</UButton>
        <UButton color="primary" @click="exportData">Dışa Aktar</UButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDualToast } from '~/composables/useDualToast'
import { useTheme } from '~/composables/useTheme'
import { useStockItemsApi } from '~/composables/useStockItemsApi'
import { useCategoriesApi } from '~/composables/useCategoriesApi'

// Components
import PageHeader from '~/components/ui/PageHeader.vue'
import StatsGrid from '~/components/ui/StatsGrid.vue'
import FiltersSection from '~/components/ui/FiltersSection.vue'
import BaseDataTable from '~/components/BaseDataTable.vue'
import BaseModal from '~/components/base/BaseModal.vue'

// Types
interface StockItem {
  id: string
  name: string
  description?: string
  sku?: string
  code?: string
  price: number
  stock?: number
  currentStock?: number
  unit: string
  status: string
  location?: string
  supplier?: string
  minStock?: number
  minStockLevel?: number
  value?: number
  categoryId: string
  reservedStock?: number
  specifications?: string | object
  templateFields?: Record<string, any>
  standards?: Record<string, any>
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  templateId?: string
}

interface ApiResponse {
  data: Array<{
    id: string
    name: string
    description: string
    sku: string
    price: number
    stock: number
    unit?: string
    status: string
    location?: string
    supplier?: string
    minStock?: number
    categoryId: string
    category: Category
  }>
}

// Setup
const route = useRoute()
const { success, error } = useDualToast()
const { isDark } = useTheme()
const { getStockItemsByCategory, createStockItem, updateStockItem } = useStockItemsApi()
const { fetchCategories } = useCategoriesApi()

// State
const loading = ref(true)
const category = ref<Category | null>(null)
const stockItems = ref<StockItem[]>([])
const showItemModal = ref(false)
const showImportModal = ref(false)
const showExportModal = ref(false)
const editingItem = ref<StockItem | null>(null)
const savingItem = ref(false)
const exportFormat = ref('xlsx')

// Modern UI state
const viewMode = ref<'table' | 'cards'>('table')
const searchQuery = ref('')
const pagination = ref({
  page: 1,
  pageSize: 20,
  total: 0
})

// Filters
const filters = ref({
  stockStatus: '',
  project: '',
  location: '',
  search: ''
})

// Form data
const itemForm = ref({
  name: '',
  sku: '',
  description: '',
  currentStock: 0,
  minStock: 0,
  value: 0,
  unit: 'adet',
  location: '',
  supplier: '',
  specifications: '',
  standards: {} as Record<string, any>,
  templateFields: {} as Record<string, any>
})

// Filter groups for FiltersSection component
const filterGroups = computed(() => ({
  stockStatus: {
    label: 'Stok Durumu',
    key: 'stockStatus',
    type: 'select' as const,
    options: [
      { label: 'Tümü', value: '' },
      { label: 'Stokta Var', value: 'in_stock' },
      { label: 'Düşük Stok', value: 'low_stock' },
      { label: 'Stok Yok', value: 'out_of_stock' },
      { label: 'Projede Kullanılıyor', value: 'allocated' }
    ]
  },
  location: {
    label: 'Lokasyon',
    key: 'location',
    type: 'input' as const,
    placeholder: 'Depo/Raf ara...',
    options: []
  }
}))

// Quick filters for modern UI
const quickFilters = computed(() => [
  {
    key: 'low_stock',
    label: 'Düşük Stok',
    value: 'low_stock',
    count: lowStockCount.value,
    color: 'orange' as const,
    event: 'show-stock-only' as const
  },
  {
    key: 'out_of_stock',
    label: 'Stok Yok',
    value: 'out_of_stock',
    count: outOfStockCount.value,
    color: 'red' as const,
    event: 'show-stock-only' as const
  }
])

// Statistics for modern UI
const categoryStats = computed(() => [
  {
    label: 'Toplam Ürün',
    value: stockItems.value.length,
    icon: 'i-lucide-package',
    variant: 'primary' as const
  },
  {
    label: 'Toplam Stok Değeri',
    value: totalValue.value,
    icon: 'i-lucide-coins',
    variant: 'success' as const,
    format: 'currency' as const
  },
  {
    label: 'Düşük Stok Uyarısı',
    value: lowStockCount.value,
    icon: 'i-lucide-alert-triangle',
    variant: 'warning' as const
  },
  {
    label: 'Aktif Ürün',
    value: activeCount.value,
    icon: 'i-lucide-check-circle',
    variant: 'success' as const
  }
])

// Computed
const filteredStockItems = computed(() => {
  let filtered = stockItems.value
  
  // Search filter
  if (filters.value.search || searchQuery.value) {
    const query = (filters.value.search || searchQuery.value).toLowerCase()
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.location?.toLowerCase().includes(query) ||
      item.sku?.toLowerCase().includes(query)
    )
  }
  
  // Stock status filter
  if (filters.value.stockStatus) {
    filtered = filtered.filter(item => {
      const current = item.currentStock || item.stock || 0
      const min = item.minStock || item.minStockLevel || 0
      const reserved = item.reservedStock || 0
      const available = current - reserved
      
      switch (filters.value.stockStatus) {
        case 'in_stock':
          return available > min
        case 'low_stock':
          return available <= min && available > 0
        case 'out_of_stock':
          return available <= 0
        case 'allocated':
          return reserved > 0
        default:
          return true
      }
    })
  }
  
  // Location filter
  if (filters.value.location) {
    filtered = filtered.filter(item => 
      item.location?.toLowerCase().includes(filters.value.location.toLowerCase())
    )
  }
  
  return filtered
})

const paginatedStockItems = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return filteredStockItems.value.slice(start, end)
})

const activeCount = computed(() => {
  return stockItems.value.filter(item => item.status === 'ACTIVE').length
})

const lowStockCount = computed(() => {
  return stockItems.value.filter(item => {
    const current = item.currentStock || item.stock || 0
    const min = item.minStock || item.minStockLevel || 10
    return current <= min
  }).length
})

const outOfStockCount = computed(() => {
  return stockItems.value.filter(item => {
    const current = item.currentStock || item.stock || 0
    const reserved = item.reservedStock || 0
    return (current - reserved) <= 0
  }).length
})

const totalValue = computed(() => {
  return stockItems.value.reduce((sum, item) => {
    const stock = item.currentStock || item.stock || 0
    const price = item.price || item.value || 0
    return sum + (stock * price)
  }, 0)
})

// Methods
const getItemColor = (item: StockItem) => {
  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899']
  const index = (item.name || '').length % colors.length
  return colors[index]
}

const getItemInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const getStockBadgeClass = (item: StockItem) => {
  const current = item.currentStock || item.stock || 0
  const min = item.minStock || item.minStockLevel || 0
  
  if (current === 0) {
    return 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  } else if (current <= min && min > 0) {
    return 'px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  } else {
    return 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
}

const getStatusBadgeClass = (item: StockItem) => {
  const current = item.currentStock || item.stock || 0
  const min = item.minStock || item.minStockLevel || 0
  
  if (current === 0) {
    return 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  } else if (current <= min && min > 0) {
    return 'px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  } else {
    return 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
}

const getStatusText = (item: StockItem) => {
  const current = item.currentStock || item.stock || 0
  const min = item.minStock || item.minStockLevel || 0
  
  if (current === 0) {
    return 'Stok Yok'
  } else if (current <= min && min > 0) {
    return 'Düşük Stok'
  } else {
    return 'Normal'
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(value)
}

// Modern UI Methods
const toggleView = () => {
  viewMode.value = viewMode.value === 'table' ? 'cards' : 'table'
}

const onFilterChange = (updatedFilters: Record<string, any>) => {
  filters.value = { ...filters.value, ...updatedFilters }
}

const onSearchChange = (value: string) => {
  searchQuery.value = value
  filters.value.search = value
}

const onPageChange = (page: number) => {
  pagination.value.page = page
}

const onItemsPerPageChange = (count: string) => {
  pagination.value.pageSize = parseInt(count, 10)
  pagination.value.page = 1
}

const onDensityChange = (density: 'compact' | 'normal' | 'detailed') => {
  console.log('Density changed to:', density)
}

const showStockOnly = () => {
  filters.value.stockStatus = 'in_stock'
}

const showProjectAssigned = () => {
  filters.value.stockStatus = 'allocated'
}

const clearFilters = () => {
  filters.value = {
    stockStatus: '',
    project: '',
    location: '',
    search: ''
  }
  searchQuery.value = ''
}

const addItem = () => {
  editingItem.value = null
  resetForm()
  showItemModal.value = true
}

const editItem = (item: StockItem) => {
  editingItem.value = item
  itemForm.value = {
    name: item.name,
    sku: item.sku || '',
    description: item.description || '',
    currentStock: item.currentStock || item.stock || 0,
    minStock: item.minStock || item.minStockLevel || 0,
    value: item.price || item.value || 0,
    unit: item.unit || 'adet',
    location: item.location || '',
    supplier: item.supplier || '',
    specifications: typeof item.specifications === 'string' ? item.specifications : JSON.stringify(item.specifications || {}),
    standards: item.standards ? { ...item.standards } : {},
    templateFields: item.templateFields ? { ...item.templateFields } : {}
  }
  showItemModal.value = true
}

const viewItem = (item: StockItem) => {
  console.log('View item:', item)
}

const duplicateItem = (item: StockItem) => {
  editingItem.value = null
  itemForm.value = {
    name: `${item.name} (Kopya)`,
    sku: '',
    description: item.description || '',
    currentStock: 0,
    minStock: item.minStock || item.minStockLevel || 0,
    value: item.price || item.value || 0,
    unit: item.unit || 'adet',
    location: item.location || '',
    supplier: item.supplier || '',
    specifications: typeof item.specifications === 'string' ? item.specifications : JSON.stringify(item.specifications || {}),
    standards: item.standards ? { ...item.standards } : {},
    templateFields: item.templateFields ? { ...item.templateFields } : {}
  }
  showItemModal.value = true
}

const deleteItem = async (item: StockItem) => {
  if (confirm(`"${item.name}" ürününü silmek istediğinize emin misiniz?`)) {
    try {
      const index = stockItems.value.findIndex(i => i.id === item.id)
      if (index > -1) {
        stockItems.value.splice(index, 1)
        success('Ürün başarıyla silindi')
      }
    } catch (err) {
      error('Ürün silinemedi')
    }
  }
}

const saveItem = async () => {
  try {
    savingItem.value = true
    
    if (editingItem.value) {
      const updatedItem = await updateStockItem(editingItem.value.id, itemForm.value)
      const index = stockItems.value.findIndex(i => i.id === editingItem.value!.id)
      if (index > -1) {
        stockItems.value[index] = updatedItem as StockItem
      }
      success('Ürün güncellendi')
    } else {
      const newItem = await createStockItem(itemForm.value)
      stockItems.value.unshift(newItem as StockItem)
      success('Ürün eklendi')
    }
    
    showItemModal.value = false
    resetForm()
  } catch (err: any) {
    error(err.message || 'İşlem başarısız')
  } finally {
    savingItem.value = false
  }
}

const resetForm = () => {
  itemForm.value = {
    name: '',
    sku: '',
    description: '',
    currentStock: 0,
    minStock: 0,
    value: 0,
    unit: 'adet',
    location: '',
    supplier: '',
    specifications: '',
    standards: {},
    templateFields: {}
  }
}

const exportData = () => {
  console.log('Export format:', exportFormat.value)
  success(`Veriler ${exportFormat.value} formatında dışa aktarıldı`)
  showExportModal.value = false
}

const loadCategory = async () => {
  try {
    loading.value = true
    const categoryId = route.params.id as string
    
    console.log('Loading category:', categoryId)
    
    // Kategorileri yükle
    const categories = await fetchCategories()
    const categoryData = categories.find(cat => cat.id === categoryId)
    
    if (!categoryData) {
      error('Kategori bulunamadı')
      return
    }
    
    category.value = {
      id: categoryData.id,
      name: categoryData.name,
      description: categoryData.description || '',
      icon: categoryData.icon || 'i-heroicons-folder',
      color: categoryData.color || '#3B82F6',
      templateId: categoryData.templateId
    }
    console.log('Category loaded:', category.value)
    
    // Stok ürünlerini yükle
    await loadStockItems()
  } catch (err: any) {
    console.error('Error loading category:', err)
    error(err.message || 'Kategori yüklenirken hata oluştu')
  } finally {
    loading.value = false
  }
}

const loadStockItems = async () => {
  try {
    const categoryId = route.params.id as string
    console.log('Loading stock items for category:', categoryId)
    
    const items = await getStockItemsByCategory(categoryId)
    console.log('Raw stock items response:', items)
    
    if (Array.isArray(items)) {
      stockItems.value = items.map(item => ({
        ...item,
        price: item.price || item.value || 0,
        description: item.description || '',
        unit: item.unit || 'adet'
      } as StockItem))
    } else if (items && typeof items === 'object' && 'data' in items && Array.isArray((items as any).data)) {
      stockItems.value = ((items as any).data as any[]).map(item => ({
        ...item,
        price: item.price || item.value || 0,
        description: item.description || '',
        unit: item.unit || 'adet'
      } as StockItem))
    } else {
      console.warn('Stock items response is not an array:', items)
      stockItems.value = []
    }
    
    console.log('Final stock items:', stockItems.value)
  } catch (err: any) {
    console.error('Error loading stock items:', err)
    stockItems.value = []
    error(err.message || 'Ürünler yüklenirken hata oluştu')
  }
}

// Helper methods for stock status
const getStockStatusClass = (item: any) => {
  const currentStock = item.currentStock || 0
  const minStock = item.minStock || 0
  
  if (currentStock === 0) {
    return 'bg-red-100 text-red-800'
  } else if (currentStock <= minStock) {
    return 'bg-yellow-100 text-yellow-800'
  } else {
    return 'bg-green-100 text-green-800'
  }
}

const getStockStatusText = (item: any) => {
  const currentStock = item.currentStock || 0
  const minStock = item.minStock || 0
  
  if (currentStock === 0) {
    return 'Stokta Yok'
  } else if (currentStock <= minStock) {
    return 'Az Stok'
  } else {
    return 'Stokta Var'
  }
}

// Lifecycle
onMounted(() => {
  // Modal state'lerini sıfırla
  showItemModal.value = false
  showImportModal.value = false
  showExportModal.value = false
  
  // Body'deki modal açık durumunu temizle
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.body.classList.remove('modal-open')
  
  console.log('Modal states after reset:', {
    showItemModal: showItemModal.value,
    showImportModal: showImportModal.value,
    showExportModal: showExportModal.value
  })
  
  loadCategory()
})

onUnmounted(() => {
  // Page'den çıkarken body'yi temizle
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.body.classList.remove('modal-open')
})
</script>