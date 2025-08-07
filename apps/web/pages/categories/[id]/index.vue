<template>
  <div class="space-y-6">
    <!-- Category Header -->
    <div v-if="category" class="flex items-center gap-4">
      <div class="flex-shrink-0">
        <div 
          class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-medium"
          :style="{ backgroundColor: category.color }"
        >
          <UIcon :name="category.icon || 'i-lucide-folder'" size="20" />
        </div>
      </div>
      <div class="flex-1">
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">
          {{ category.name }}
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400">
          {{ category.description }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <UButton 
          @click="addItem"
          icon="i-lucide-plus"
          color="primary"
          variant="solid"
        >
          Ürün Ekle
        </UButton>
      </div>
    </div>

    <!-- Enhanced Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <UIcon name="i-lucide-package" size="16" class="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Toplam Ürün Çeşidi</p>
            <p class="text-lg font-semibold text-neutral-900 dark:text-white">{{ stockItems.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <UIcon name="i-lucide-trending-up" size="16" class="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Toplam Stok Değeri</p>
            <p class="text-lg font-semibold text-neutral-900 dark:text-white">{{ formatCurrency(totalStockValue) }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
            <UIcon name="i-lucide-alert-triangle" size="16" class="text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Düşük Stok Uyarısı</p>
            <p class="text-lg font-semibold text-neutral-900 dark:text-white">{{ lowStockItems }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
            <UIcon name="i-lucide-users" size="16" class="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Aktif Projeler</p>
            <p class="text-lg font-semibold text-neutral-900 dark:text-white">{{ activeProjectsCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Filters -->
    <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
      <h3 class="text-lg font-medium mb-4">Filtreler</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Stok Durumu</label>
          <USelectMenu
            v-model="filters.stockStatus"
            :options="stockStatusOptions"
            placeholder="Stok durumu seçin"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Proje</label>
          <USelectMenu
            v-model="filters.project"
            :options="projectOptions"
            placeholder="Proje seçin"
            option-attribute="name"
            value-attribute="id"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Lokasyon</label>
          <UInput
            v-model="filters.location"
            placeholder="Depo/Raf ara"
          />
        </div>
        <div class="flex items-end">
          <UButton @click="clearFilters" variant="outline" block>
            Filtreleri Temizle
          </UButton>
        </div>
      </div>
    </div>

    <!-- Stock Items Table -->
    <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
        <h2 class="text-lg font-medium text-neutral-900 dark:text-white">Stok Ürünleri</h2>
      </div>
      
      <ScivetoDataTable 
        v-if="filteredStockItems.length > 0"
        :rows="filteredStockItems" 
        :columns="tableColumns"
        :loading="loading"
        @select="editItem"
      >
        <!-- Project Allocations Slot -->
        <template #projectAllocations-data="{ row }">
          <div class="space-y-1">
            <div v-if="(row as unknown as StockItem).allocations && (row as unknown as StockItem).allocations!.length > 0" class="space-y-1">
              <div 
                v-for="allocation in (row as unknown as StockItem).allocations" 
                :key="allocation.id"
                class="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-800 rounded px-2 py-1"
              >
                <span class="font-medium">
                  {{ allocation.allocatedQuantity }}/{{ (row as unknown as StockItem).currentStock || 0 }}
                </span>
                <UBadge 
                  :color="allocation.project?.status === 'COMPLETED' ? 'success' : 'primary'"
                  variant="soft"
                  size="xs"
                >
                  {{ allocation.project?.name || 'Unknown Project' }}
                </UBadge>
              </div>
            </div>
            <div v-else class="text-xs text-gray-500">
              Atama yok
            </div>
          </div>
        </template>
        
        <!-- Stock Status Slot -->
        <template #stockStatus-data="{ row }">
          <div class="flex items-center space-x-2">
            <UBadge 
              :color="getStockStatusColor(row as unknown as StockItem)"
              variant="soft"
              size="sm"
            >
              {{ getStockStatusLabel(row as unknown as StockItem) }}
            </UBadge>
            <span class="text-xs text-gray-500">
              {{ getAvailableStock(row as unknown as StockItem) }}/{{ (row as unknown as StockItem).currentStock || 0 }}
            </span>
          </div>
        </template>
        
        <!-- Location Slot -->
        <template #location-data="{ row }">
          <div class="flex items-center space-x-2">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-gray-400" />
            <span class="text-sm">{{ (row as unknown as StockItem).location || 'Belirtilmemiş' }}</span>
          </div>
        </template>
        
        <!-- Actions Slot -->
        <template #actions-data="{ row }">
          <div class="flex items-center space-x-1">
            <UButton
              icon="i-heroicons-pencil-square"
              size="xs"
              variant="ghost"
              @click="editItem(row as unknown as StockItem)"
            />
            <UButton
              icon="i-heroicons-plus"
              size="xs"
              variant="ghost"
              color="primary"
              @click="allocateStock(row as unknown as StockItem)"
            />
            <UButton
              icon="i-heroicons-arrow-path"
              size="xs"
              variant="ghost"
              color="success"
              @click="adjustStock(row as unknown as StockItem)"
            />
          </div>
        </template>
        
        <template #templateFields-data="{ row }">
          <div v-if="(row as any).templateFields && Object.keys((row as any).templateFields).length > 0" class="space-y-1">
            <div v-for="(value, key) in (row as any).templateFields" :key="key" class="text-sm">
              <span class="font-medium capitalize">{{ String(key).replace('_', ' ') }}:</span> {{ value }}
            </div>
          </div>
          <span v-else class="text-neutral-400 text-sm">-</span>
        </template>
      </ScivetoDataTable>
      
      <div v-else-if="!loading" class="p-8 text-center text-neutral-600 dark:text-neutral-400">
        <UIcon name="i-lucide-package-x" size="48" class="mx-auto mb-4 opacity-50" />
        <p>Bu kategoride henüz ürün bulunmuyor.</p>
        <UButton @click="addItem" class="mt-4" variant="outline">
          İlk Ürünü Ekle
        </UButton>
      </div>
      
      <div v-else class="p-8 text-center">
        <UIcon name="i-lucide-loader" size="24" class="animate-spin mx-auto" />
      </div>
    </div>

    <!-- Add/Edit Item Modal -->
    <UModal v-model="showItemModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">{{ editingItem ? 'Ürün Düzenle' : 'Yeni Ürün Ekle' }}</h3>
        </template>

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
              <label class="block text-sm font-medium mb-1">Değer (₺) *</label>
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

          <!-- Location and Reserved Stock -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Lokasyon</label>
              <UInput v-model="itemForm.location" placeholder="Depo/Raf bilgisi" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Rezerve Stok</label>
              <UInput v-model.number="itemForm.reservedStock" type="number" readonly />
            </div>
          </div>

          <!-- Specifications -->
          <div>
            <label class="block text-sm font-medium mb-1">Özellikler</label>
            <UTextarea v-model="itemForm.specifications" placeholder="Teknik özellikler, boyutlar vb." />
          </div>

          <!-- Template-based Standards (Mapa Ölçüleri) -->
          <div v-if="templateData?.standards?.length" class="space-y-4">
            <h4 class="font-medium text-neutral-900 dark:text-white">Standartlar</h4>
            <div v-for="standard in templateData.standards" :key="standard.id" class="space-y-2">
              <div>
                <label class="block text-sm font-medium mb-1">{{ standard.name }} *</label>
                <USelectMenu
                  v-model="itemForm.standards[standard.id]"
                  :options="standard.values"
                  :placeholder="`${standard.name} seçin`"
                />
              </div>
            </div>
          </div>

          <!-- Template-based Fields (Mapa özel alanları) -->
          <div v-if="templateData?.fields?.length" class="space-y-4">
            <h4 class="font-medium text-neutral-900 dark:text-white">{{ templateData.name }} Özellikleri</h4>
            <div v-for="field in templateData.fields" :key="field.name" class="space-y-2">
              <div>
                <label class="block text-sm font-medium mb-1">{{ field.label }} {{ field.required ? '*' : '' }}</label>
                <UInput
                  v-if="field.type === 'text'"
                  v-model="itemForm.templateFields[field.name]"
                  :placeholder="field.placeholder"
                />
                <UInput
                  v-else-if="field.type === 'number'"
                  v-model.number="itemForm.templateFields[field.name]"
                  type="number"
                  :step="field.step || '0.01'"
                  :placeholder="field.placeholder"
                />
                <USelectMenu
                  v-else-if="field.type === 'select'"
                  v-model="itemForm.templateFields[field.name]"
                  :options="field.options"
                  :placeholder="field.placeholder"
                />
              </div>
            </div>
          </div>

          <!-- Mapa için özel alanlar -->
          <div v-if="category?.name === 'Mapa'" class="space-y-4">
            <h4 class="font-medium text-neutral-900 dark:text-white">Proje Bilgileri</h4>
            <div>
              <label class="block text-sm font-medium mb-1">Kullanıldığı Proje</label>
              <UInput 
                v-model="itemForm.templateFields.used_project" 
                placeholder="Proje adını girin"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Ek Açıklama</label>
              <UTextarea 
                v-model="itemForm.templateFields.additional_notes" 
                placeholder="Ek açıklama girin"
              />
            </div>
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
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { StockItem, Category, ItemForm, TableColumn } from '~/types'

const route = useRoute()
const toast = useToast()
const { getCategory } = useCategoriesApi()
const { getStockItemsByCategory, createStockItem, updateStockItem } = useStockItemsApi()

// Page metadata
definePageMeta({
  middleware: 'auth'
})

// Reactive data
const categoryId = computed(() => route.params.id as string)
const category = ref<Category | null>(null)
const stockItems = ref<StockItem[]>([])
const projects = ref<any[]>([])
const templateData = ref<any>(null)
const loading = ref(false)
const showItemModal = ref(false)
const editingItem = ref<StockItem | null>(null)
const savingItem = ref(false)

// Filters
const filters = ref({
  stockStatus: '',
  project: '',
  location: '',
  search: ''
})

// Filter options
const stockStatusOptions = [
  { label: 'Tümü', value: '' },
  { label: 'Stokta Var', value: 'in_stock' },
  { label: 'Düşük Stok', value: 'low_stock' },
  { label: 'Stok Yok', value: 'out_of_stock' },
  { label: 'Projede Kullanılıyor', value: 'allocated' }
]

// Form state
const itemForm = ref<ItemForm>({
  name: '',
  description: '',
  unit: 'adet',
  currentStock: 0,
  minStock: 0,
  value: 0,
  standards: {},
  templateFields: {}
})

// Table config
const tableColumns = [
  {
    key: 'name',
    label: 'Ürün Adı / Kodu',
    sortable: true
  },
  {
    key: 'specifications',
    label: 'Boyut/Özellik'
  },
  {
    key: 'stockInfo',
    label: 'Stok Durumu'
  },
  {
    key: 'projectAllocations',
    label: 'Proje Atamaları'
  },
  {
    key: 'location',
    label: 'Lokasyon'
  },
  {
    key: 'value',
    label: 'Birim Fiyat'
  },
  {
    key: 'totalValue',
    label: 'Toplam Değer'
  },
  {
    key: 'actions',
    label: 'İşlemler'
  }
]

// Computed
const filteredStockItems = computed(() => {
  if (!Array.isArray(stockItems.value)) return []
  
  let filtered = stockItems.value
  
  // Stock status filter
  if (filters.value.stockStatus) {
    filtered = filtered.filter(item => {
      const available = (item.currentStock || 0) - ((item as any).reservedStock || 0)
      switch (filters.value.stockStatus) {
        case 'in_stock':
          return available > (item.minStockLevel || 0)
        case 'low_stock':
          return available <= (item.minStockLevel || 0) && available > 0
        case 'out_of_stock':
          return available <= 0
        case 'allocated':
          return ((item as any).reservedStock || 0) > 0
        default:
          return true
      }
    })
  }
  
  // Project filter
  if (filters.value.project) {
    filtered = filtered.filter(item => 
      (item as any).allocations?.some((alloc: any) => alloc.projectId === filters.value.project)
    )
  }
  
  // Location filter
  if (filters.value.location) {
    filtered = filtered.filter(item => 
      item.location?.toLowerCase().includes(filters.value.location.toLowerCase())
    )
  }
  
  return filtered
})

const totalStockValue = computed(() => {
  if (!Array.isArray(stockItems.value)) return 0
  return stockItems.value.reduce((total, item) => {
    return total + ((item.currentStock || 0) * ((item as any).lastPurchasePrice || item.value || 0))
  }, 0)
})

const lowStockItems = computed(() => {
  if (!Array.isArray(stockItems.value)) return 0
  return stockItems.value.filter((item: StockItem) => {
    const available = (item.currentStock || 0) - ((item as any).reservedStock || 0)
    return available <= (item.minStockLevel || 0)
  }).length
})

const activeProjectsCount = computed(() => {
  if (!Array.isArray(projects.value)) return 0
  return projects.value.filter(p => p.status === 'IN_PROGRESS').length
})

const projectOptions = computed(() => {
  if (!Array.isArray(projects.value)) return []
  return [
    { id: '', name: 'Tüm Projeler' },
    ...projects.value.map(p => ({ id: p.id, name: p.name }))
  ]
})

// Methods
const loadCategory = async () => {
  loading.value = true
  try {
    const data = await getCategory(categoryId.value)
    category.value = data

    // Template verilerini yükle
    if (data?.templateId) {
      await loadTemplateData(data.templateId)
    }

    // Stok ürünlerini yükle
    await loadStockItems()
  } catch (err: any) {
    console.error('Error loading category:', err)
    toast.add({
      title: 'Hata',
      description: err.message || 'Kategori yüklenirken hata oluştu',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const loadTemplateData = async (templateId: string) => {
  try {
    const runtimeConfig = useRuntimeConfig()
    const template = await $fetch(`${runtimeConfig.public.apiBase}/templates/${templateId}`) as any
    console.log('Template data loaded:', template)
    templateData.value = template
  } catch (err) {
    console.error('Error loading template data:', err)
  }
}

const loadStockItems = async () => {
  try {
    const items = await getStockItemsByCategory(categoryId.value)
    stockItems.value = items
  } catch (err: any) {
    console.error('Error loading stock items:', err)
    toast.add({
      title: 'Hata',
      description: err.message || 'Ürünler yüklenirken hata oluştu',
      color: 'error'
    })
  }
}

// Helper functions
const getStockStatusColor = (item: StockItem) => {
  const available = (item.currentStock || 0) - (item.reservedStock || 0)
  if (available <= 0) return 'error'
  if (available <= (item.minStockLevel || 0)) return 'warning'
  if ((item.reservedStock || 0) > 0) return 'primary'
  return 'success'
}

const getStockStatusLabel = (item: StockItem) => {
  const available = (item.currentStock || 0) - (item.reservedStock || 0)
  if (available <= 0) return 'Stokta Yok'
  if (available <= (item.minStockLevel || 0)) return 'Düşük Stok'
  if ((item.reservedStock || 0) > 0) return 'Rezerve Edilmiş'
  return 'Mevcut'
}

const getAvailableStock = (item: StockItem) => {
  return (item.currentStock || 0) - (item.reservedStock || 0)
}

const clearFilters = () => {
  filters.value = {
    stockStatus: '',
    project: '',
    location: '',
    search: ''
  }
}

// Stock action functions
const allocateStock = (item: StockItem) => {
  // Implementation for stock allocation to projects
  console.log('Allocating stock for item:', item.id)
  // TODO: Open allocation modal
}

const adjustStock = (item: StockItem) => {
  // Implementation for manual stock adjustment
  console.log('Adjusting stock for item:', item.id)
  // TODO: Open stock adjustment modal
}

const addItem = () => {
  editingItem.value = null
  // Form değerlerini sıfırla
  itemForm.value = {
    name: '',
    description: '',
    unit: 'adet',
    currentStock: 0,
    minStock: 0,
    value: 0,
    standards: {},
    templateFields: {
      used_project: '',
      additional_notes: ''
    },
    location: '',
    specifications: '',
    reservedStock: 0
  }
  showItemModal.value = true
}
const editItem = (item: StockItem) => {
  editingItem.value = item
  // Formu ürün ile doldur
  itemForm.value = {
    name: item.name,
    description: item.description || '',
    unit: item.unit || 'adet',
    currentStock: item.currentStock || 0,
    minStock: item.minStock || 0,
    value: item.value || 0,
    standards: { ...item.standards },
    templateFields: { 
      used_project: (item.templateFields as any)?.used_project || '',
      additional_notes: (item.templateFields as any)?.additional_notes || '',
      ...item.templateFields 
    },
    location: item.location || '',
    specifications: item.specifications || '',
    reservedStock: item.reservedStock || 0
  }

  showItemModal.value = true
}

const saveItem = async () => {
  savingItem.value = true
  try {
    if (editingItem.value) {
      // Ürün güncelle
      await updateStockItem(editingItem.value.id, {
        ...itemForm.value,
        categoryId: categoryId.value
      })
      toast.add({
        title: 'Başarılı',
        description: 'Ürün güncellendi',
        color: 'success'
      })
    } else {
      // Yeni ürün oluştur
      await createStockItem({
        ...itemForm.value,
        categoryId: categoryId.value
      })
      toast.add({
        title: 'Başarılı',
        description: 'Ürün eklendi',
        color: 'success'
      })
    }

    showItemModal.value = false
    await loadStockItems()
  } catch (err: any) {
    toast.add({
      title: 'Hata',
      description: err.message || 'Ürün kaydedilirken hata oluştu',
      color: 'error'
    })
  } finally {
    savingItem.value = false
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(value)
}

// Initialize
onMounted(() => {
  loadCategory()
})
</script>
