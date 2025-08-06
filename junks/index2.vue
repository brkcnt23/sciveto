<!-- pages/stock/index.vue -->
<template>
  <div class="flex flex-col gap-6 p-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div class="flex items-center justify-between p-6">
        <div class="flex flex-col gap-1">
          <h1 class="text-2xl font-bold text-slate-900">📦 Stok Yönetimi</h1>
          <p class="text-slate-600">Tüm malzeme kategorilerini yönetin</p>
        </div>
        <div class="flex items-center gap-3">
          <UButton
            variant="outline"
            color="slate"
            icon="i-lucide-download"
            @click="exportAllStock"
          >
            Tüm Stok Export
          </UButton>
          <UDropdownMenu
            :items="[
              [
                { label: 'Çelik Malzeme', icon: 'i-lucide-hard-hat', click: () => addMaterial('steel') },
                { label: 'Membran', icon: 'i-lucide-layers', click: () => addMaterial('membrane') },
                { label: 'Halat', icon: 'i-lucide-link', click: () => addMaterial('rope') },
                { label: 'Fitil', icon: 'i-lucide-zap', click: () => addMaterial('thread') }
              ]
            ]"
          >
            <UButton
              color="blue"
              icon="i-lucide-plus"
              trailing-icon="i-lucide-chevron-down"
            >
              Yeni Malzeme
            </UButton>
          </UDropdownMenu>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard
        v-for="stat in stockStats"
        :key="stat.key"
        :ui="{ body: { padding: 'p-6' } }"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-600">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
            <p :class="[
              'text-sm',
              stat.trend.type === 'positive' ? 'text-green-600' : 
              stat.trend.type === 'negative' ? 'text-red-600' : 'text-slate-600'
            ]">
              {{ stat.trend.text }}
            </p>
          </div>
          <div :class="[
            'h-12 w-12 rounded-lg flex items-center justify-center',
            stat.color
          ]">
            <UIcon :name="stat.icon" class="h-6 w-6 text-white" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- AI Insights -->
    <div class="flex flex-col gap-4" v-if="aiInsights.length">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-brain" class="text-blue-500" />
            <h3 class="text-lg font-semibold">AI Stok Analizi</h3>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UAlert
            v-for="insight in aiInsights"
            :key="insight.id"
            :color="insight.priority === 'high' ? 'red' : insight.priority === 'medium' ? 'amber' : 'blue'"
            variant="soft"
            :icon="insight.icon"
          >
            <template #title>{{ insight.title }}</template>
            <template #description>{{ insight.message }}</template>
            <template #actions v-if="insight.actions">
              <UButton
                v-for="action in insight.actions"
                :key="action.label"
                variant="soft"
                size="xs"
                @click="action.handler"
              >
                {{ action.label }}
              </UButton>
            </template>
          </UAlert>
        </div>
      </UCard>
    </div>

    <!-- Category Tabs -->
    <UCard>
      <template #header>
        <UTabs
          v-model="selectedCategory"
          :items="categoryTabs"
          class="w-full"
        >
          <template #default="{ item }">
            <div class="flex items-center gap-2">
              <UIcon :name="item.icon" />
              <span>{{ item.label }}</span>
              <UBadge
                size="xs"
              >
                {{ item.count }}
              </UBadge>
            </div>
          </template>
        </UTabs>
      </template>

      <!-- Main Data Table -->
      <ScivetoDataTable
        :data="currentCategoryData"
        :columns="currentCategoryColumns"
        :loading="loading"
        :current-page="currentPage"
        :items-per-page="itemsPerPage"
        :total-items="totalItems"
        :title="currentCategoryTitle"
        :item-type="currentCategoryItemType"
        :view-density="viewDensity"
        :add-button-label="currentCategoryAddLabel"
        :available-filters="currentCategoryFilters"
        :ai-insights="relevantInsights"
        @add-item="addMaterial(selectedCategory)"
        @view-item="viewItem"
        @edit-item="editItem"
        @duplicate-item="duplicateItem"
        @delete-item="deleteItem"
        @export="exportCategory"
        @show-stock-only="showStockOnly"
        @show-project-assigned="showProjectAssigned"
        @clear-filters="clearAllFilters"
        @density-change="viewDensity = $event"
        @page-change="onPageChange"
        @items-per-page-change="onItemsPerPageChange"
      />
    </UCard>

    <!-- Material Detail Modal -->
    <ClientOnly>
      <UModal v-model="showDetailModal">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold">{{ selectedMaterial?.name }}</h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark"
                @click="closeDetailModal"
              />
            </div>
          </template>
          
          <div class="p-4 flex flex-col gap-6">
            <p>Malzeme detayları ve özellikleri burada gösterilecek</p>
            
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(value, key) in selectedMaterial" :key="key" class="flex flex-col gap-1">
                <span class="text-sm text-gray-600">{{ key }}</span>
                <p>{{ value }}</p>
              </div>
            </div>
          </div>
          
          <template #footer>
            <div class="flex justify-between">
              <UButton
                color="gray"
                variant="soft"
                @click="closeDetailModal"
              >
                Kapat
              </UButton>
              <div class="flex gap-2">
                <UButton
                  color="amber"
                  variant="soft"
                  icon="i-lucide-copy"
                  @click="duplicateItem(selectedMaterial)"
                >
                  Çoğalt
                </UButton>
                <UButton
                  color="blue"
                  icon="i-lucide-edit"
                  @click="editItem(selectedMaterial)"
                >
                  Düzenle
                </UButton>
              </div>
            </div>
          </template>
        </UCard>
      </UModal>
    </ClientOnly>

    <!-- Add/Edit Material Modal -->
    <ClientOnly>
      <UModal v-model="showMaterialForm">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold">{{ formMode === 'add' ? 'Yeni Malzeme Ekle' : 'Malzeme Düzenle' }}</h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark"
                @click="closeMaterialForm"
              />
            </div>
          </template>
          
          <div class="p-4">
            <form @submit.prevent="saveMaterial">
              <div class="flex flex-col gap-4">
                <UFormGroup label="Malzeme Adı" required>
                  <UInput v-model="editingMaterial.name" placeholder="Malzeme adı girin" />
                </UFormGroup>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFormGroup label="Kategori" required>
                    <USelect
                      v-model="editingMaterial.categoryId"
                      :options="categoryOptions"
                      placeholder="Kategori seçin"
                    />
                  </UFormGroup>
                  
                  <UFormGroup label="Miktar" required>
                    <UInput v-model.number="editingMaterial.currentStock" type="number" placeholder="0" />
                  </UFormGroup>
                  
                  <UFormGroup label="Birim" required>
                    <USelect
                      v-model="editingMaterial.unit"
                      :options="unitOptions"
                      placeholder="Birim seçin"
                    />
                  </UFormGroup>
                  
                  <UFormGroup label="Fiyat">
                    <UInput v-model.number="editingMaterial.price" type="number" placeholder="0.00" />
                  </UFormGroup>
                  
                  <UFormGroup label="Tedarikçi">
                    <UInput v-model="editingMaterial.supplier" placeholder="Tedarikçi" />
                  </UFormGroup>
                  
                  <UFormGroup label="Proje">
                    <USelect
                      v-model="editingMaterial.projectId"
                      :options="projectOptions"
                      placeholder="Proje seçin"
                      clearable
                    />
                  </UFormGroup>
                </div>
                
                <!-- Kategori-spesifik alanlar -->
                <div v-if="selectedCategory === 'steel'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFormGroup label="Kalite">
                    <USelect
                      v-model="editingMaterial.customProperties.grade"
                      :options="steelGradeOptions"
                      placeholder="Kalite seçin"
                    />
                  </UFormGroup>
                  
                  <UFormGroup label="Boyutlar">
                    <UInput v-model="editingMaterial.customProperties.dimensions" placeholder="örn. 100x200x5 mm" />
                  </UFormGroup>
                </div>
                
                <div v-if="selectedCategory === 'membrane'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFormGroup label="Renk">
                    <USelect
                      v-model="editingMaterial.customProperties.color"
                      :options="colorOptions"
                      placeholder="Renk seçin"
                    />
                  </UFormGroup>
                  
                  <UFormGroup label="Kalınlık">
                    <UInput v-model="editingMaterial.customProperties.thickness" type="number" placeholder="0.00" />
                  </UFormGroup>
                </div>
                
                <UFormGroup label="Minimum Stok Seviyesi">
                  <UInput v-model.number="editingMaterial.minStockLevel" type="number" placeholder="0" />
                </UFormGroup>
                
                <UFormGroup label="Notlar">
                  <UTextarea v-model="editingMaterial.notes" placeholder="Malzeme ile ilgili notlar..." />
                </UFormGroup>
              </div>
              
              <div class="flex justify-end gap-3 mt-6">
                <UButton
                  color="gray"
                  variant="outline"
                  @click="closeMaterialForm"
                >
                  İptal
                </UButton>
                <UButton
                  color="blue"
                  type="submit"
                  :loading="saveLoading"
                  :disabled="saveLoading"
                >
                  {{ formMode === 'add' ? 'Malzemeyi Ekle' : 'Malzemeyi Güncelle' }}
                </UButton>
              </div>
            </form>
          </div>
        </UCard>
      </UModal>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { ScivetoDataTable } from '~/components/table'
import { useStockApi } from '~/composables/useStockApi'
import { useCategoriesApi } from '~/composables/useCategoriesApi'

// Meta
definePageMeta({
  title: 'Stok Yönetimi',
  description: 'Tüm malzeme kategorilerini yönetin'
})

// API services
const stockApi = useStockApi()
const categoriesApi = useCategoriesApi()
const { $toast } = useNuxtApp()

// State
const selectedCategory = ref('all')
const selectedMaterial = ref(null)
const showDetailModal = ref(false)
const showMaterialForm = ref(false)
const editingMaterial = ref<any>({
  name: '',
  description: '',
  currentStock: 0,
  unit: 'pcs',
  minStockLevel: 0,
  status: 'ACTIVE',
  customProperties: {}
})
const formMode = ref<'add' | 'edit'>('add')
const loading = ref(false)
const saveLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(25)
const viewDensity = ref<'compact' | 'normal' | 'detailed'>('normal')

// Data storage
const allStockItems = ref<any[]>([])
const categoryStockItems = ref<Record<string, any[]>>({
  steel: [],
  membrane: [],
  rope: [],
  thread: []
})
const categories = ref<any[]>([])
const stockCounts = ref({
  total: 0,
  active: 0,
  low: 0,
  critical: 0,
  inactive: 0
})

// Category Tabs
const categoryTabs = computed(() => [
  {
    key: 'all',
    label: 'Tümü',
    icon: 'i-lucide-layers-3',
    count: allStockItems.value.length || 0
  },
  {
    key: 'steel',
    label: 'Çelik',
    icon: 'i-lucide-hard-hat',
    count: categoryStockItems.value.steel?.length || 0
  },
  {
    key: 'membrane',
    label: 'Membran',
    icon: 'i-lucide-layers',
    count: categoryStockItems.value.membrane?.length || 0
  },
  {
    key: 'rope',
    label: 'Halat',
    icon: 'i-lucide-link',
    count: categoryStockItems.value.rope?.length || 0
  },
  {
    key: 'thread',
    label: 'Fitil',
    icon: 'i-lucide-zap',
    count: categoryStockItems.value.thread?.length || 0
  }
])

// Mock AI Insights
const aiInsights = ref([
  {
    id: 1,
    title: 'Düşük Stoklu Çelik',
    message: '5 çelik malzeme kritik seviyede stokta. Tedarik edilmesi önerilir.',
    priority: 'high',
    icon: 'i-lucide-alert-triangle',
    category: 'steel'
  },
  {
    id: 2,
    title: 'Atıl Membran Stoku',
    message: '3 membran ürünü 6 aydan fazla zamandır kullanılmıyor.',
    priority: 'medium',
    icon: 'i-lucide-alert-circle',
    category: 'membrane'
  }
])

const relevantInsights = computed(() => {
  return aiInsights.value.filter(insight => 
    selectedCategory.value === 'all' || insight.category === selectedCategory.value
  )
})

// Stats
const stockStats = computed(() => [
  {
    key: 'totalItems',
    label: 'Toplam Malzeme',
    value: stockCounts.value.total.toLocaleString(),
    trend: { type: 'positive', text: '+12% bu ay' },
    color: 'bg-blue-500',
    icon: 'i-lucide-package'
  },
  {
    key: 'totalValue',
    label: 'Toplam Değer',
    value: formatCurrency(calculateTotalValue()),
    trend: { type: 'positive', text: '+8% bu ay' },
    color: 'bg-green-500',
    icon: 'i-lucide-dollar-sign'
  },
  {
    key: 'lowStock',
    label: 'Düşük Stok',
    value: stockCounts.value.low.toString(),
    trend: { type: 'negative', text: '+3 bu hafta' },
    color: 'bg-amber-500',
    icon: 'i-lucide-alert-triangle'
  },
  {
    key: 'outOfStock',
    label: 'Tükenen',
    value: stockCounts.value.critical.toString(),
    trend: { type: 'negative', text: '+2 dün' },
    color: 'bg-red-500',
    icon: 'i-lucide-x-circle'
  }
])

// Table Data
const currentCategoryData = computed(() => {
  switch (selectedCategory.value) {
    case 'steel':
      return categoryStockItems.value.steel || []
    case 'membrane':
      return categoryStockItems.value.membrane || []
    case 'rope':
      return categoryStockItems.value.rope || []
    case 'thread':
      return categoryStockItems.value.thread || []
    default:
      return allStockItems.value
  }
})

const currentCategoryColumns = computed<TableColumn[]>(() => {
  const baseColumns: TableColumn[] = [
    { key: 'name', label: 'Malzeme Adı', sortable: true },
    { key: 'category', label: 'Kategori' },
    { key: 'currentStock', label: 'Stok' },
    { key: 'stockStatus', label: 'Durum' },
    { key: 'unit', label: 'Birim' },
    { key: 'price', label: 'Fiyat' },
    { key: 'supplier', label: 'Tedarikçi' },
    { key: 'updatedAt', label: 'Son Güncelleme' },
    { key: 'actions', label: '', sortable: false }
  ]

  // Category-specific columns
  switch (selectedCategory.value) {
    case 'steel':
      return [
        ...baseColumns.slice(0, 4),
        { key: 'customProperties.grade', label: 'Kalite' },
        { key: 'customProperties.dimensions', label: 'Boyutlar' },
        ...baseColumns.slice(4)
      ]
    case 'membrane':
      return [
        ...baseColumns.slice(0, 4),
        { key: 'customProperties.color', label: 'Renk' },
        { key: 'customProperties.thickness', label: 'Kalınlık' },
        ...baseColumns.slice(4)
      ]
    case 'rope':
      return [
        ...baseColumns.slice(0, 4),
        { key: 'customProperties.type', label: 'Halat Tipi' },
        { key: 'customProperties.diameter', label: 'Çap' },
        ...baseColumns.slice(4)
      ]
    default:
      return baseColumns
  }
})

const currentCategoryTitle = computed(() => {
  const titles = {
    all: 'Tüm Malzemeler',
    steel: 'Çelik Malzemeler',
    membrane: 'Membran Ürünleri',
    rope: 'Halatlar',
    thread: 'Fitiller'
  }
  return titles[selectedCategory.value as keyof typeof titles] || 'Malzemeler'
})

const currentCategoryItemType = computed(() => {
  const types = {
    all: 'öğe',
    steel: 'çelik malzeme',
    membrane: 'membran',
    rope: 'halat',
    thread: 'fitil'
  }
  return types[selectedCategory.value as keyof typeof types] || 'öğe'
})

const currentCategoryAddLabel = computed(() => {
  const labels = {
    all: 'Yeni Malzeme',
    steel: 'Yeni Çelik',
    membrane: 'Yeni Membran',
    rope: 'Yeni Halat',
    thread: 'Yeni Fitil'
  }
  return labels[selectedCategory.value as keyof typeof labels] || 'Yeni Ekle'
})

const currentCategoryFilters = computed(() => {
  const baseFilters = [
    {
      key: 'category',
      label: 'Kategori',
      options: categories.value.map(cat => ({
        label: cat.name,
        value: cat.id
      }))
    },
    {
      key: 'stockStatus',
      label: 'Stok Durumu',
      options: [
        { label: 'Yeterli', value: 'sufficient' },
        { label: 'Düşük', value: 'low' },
        { label: 'Kritik', value: 'critical' },
        { label: 'Tükendi', value: 'empty' }
      ]
    }
  ]

  // Category-specific filters
  switch (selectedCategory.value) {
    case 'steel':
      return [
        ...baseFilters,
        {
          key: 'grade',
          label: 'Kalite',
          options: steelGradeOptions.map(o => ({ label: o.label, value: o.value }))
        }
      ]
    case 'membrane':
      return [
        ...baseFilters,
        {
          key: 'color',
          label: 'Renk',
          options: colorOptions.map(o => ({ label: o.label, value: o.value }))
        }
      ]
    default:
      return baseFilters
  }
})

const totalItems = computed(() => currentCategoryData.value.length)

// Select Options
const categoryOptions = computed(() => 
  categories.value.map(cat => ({ label: cat.name, value: cat.id }))
)

const unitOptions = [
  { label: 'Adet', value: 'piece' },
  { label: 'Metre', value: 'm' },
  { label: 'Kilogram', value: 'kg' },
  { label: 'Metrekare', value: 'm2' },
  { label: 'Litre', value: 'l' }
]

const steelGradeOptions = [
  { label: 'S235', value: 'S235' },
  { label: 'S275', value: 'S275' },
  { label: 'S355', value: 'S355' },
  { label: 'S420', value: 'S420' },
  { label: 'S460', value: 'S460' }
]

const colorOptions = [
  { label: 'Beyaz', value: 'white' },
  { label: 'Gri', value: 'gray' },
  { label: 'Siyah', value: 'black' },
  { label: 'Mavi', value: 'blue' },
  { label: 'Yeşil', value: 'green' },
  { label: 'Kırmızı', value: 'red' }
]

const projectOptions = ref([
  { label: 'Proje 1', value: 'prj1' },
  { label: 'Proje 2', value: 'prj2' },
  { label: 'Proje 3', value: 'prj3' }
])

// Methods
function calculateTotalValue() {
  return allStockItems.value.reduce((sum, item) => {
    return sum + ((Number(item.price) || 0) * (Number(item.currentStock) || 0))
  }, 0)
}

const addMaterial = (categoryType: string) => {
  selectedCategory.value = categoryType
  formMode.value = 'add'
  
  // Get category ID based on category type
  const categoryId = categories.value.find(
    cat => cat.name.toLowerCase().includes(getCategoryDisplayName(categoryType).toLowerCase())
  )?.id
  
  editingMaterial.value = {
    name: '',
    description: '',
    categoryId: categoryId || '',
    currentStock: 0,
    unit: 'piece',
    minStockLevel: 0,
    status: 'ACTIVE',
    customProperties: {},
    supplier: '',
    location: '',
    notes: ''
  }
  
  showMaterialForm.value = true
}

const getCategoryDisplayName = (categoryType: string) => {
  switch (categoryType) {
    case 'steel': return 'Çelik'
    case 'membrane': return 'Membran'
    case 'rope': return 'Halat'
    case 'thread': return 'Fitil'
    default: return 'Genel'
  }
}

const viewItem = (item: any) => {
  selectedMaterial.value = item
  showDetailModal.value = true
}

const closeDetailModal = () => {
  selectedMaterial.value = null
  showDetailModal.value = false
}

const editItem = (item: any) => {
  formMode.value = 'edit'
  // Create a deep copy to avoid direct mutation
  editingMaterial.value = JSON.parse(JSON.stringify(item))
  // Ensure customProperties exists
  if (!editingMaterial.value.customProperties) {
    editingMaterial.value.customProperties = {}
  }
  showMaterialForm.value = true
  showDetailModal.value = false
}

const duplicateItem = (item: any) => {
  formMode.value = 'add'
  // Create a deep copy and modify for duplication
  const duplicate = JSON.parse(JSON.stringify(item))
  delete duplicate.id
  duplicate.name = `${duplicate.name} (Kopya)`
  editingMaterial.value = duplicate
  showMaterialForm.value = true
  showDetailModal.value = false
}

const deleteItem = async (item: any) => {
  if (await confirmDelete(item.name)) {
    try {
      loading.value = true
      const success = await stockApi.deleteStockItem(item.id)
      
      if (success) {
        $toast.success(`"${item.name}" başarıyla silindi`)
        refreshData()
      } else {
        $toast.error(`"${item.name}" silinirken bir hata oluştu`)
      }
    } catch (error) {
      console.error('Delete error:', error)
      $toast.error('Silme işlemi sırasında bir hata oluştu')
    } finally {
      loading.value = false
    }
  }
}

const closeMaterialForm = () => {
  showMaterialForm.value = false
  editingMaterial.value = {
    name: '',
    description: '',
    currentStock: 0,
    unit: 'piece',
    customProperties: {}
  }
}

const saveMaterial = async () => {
  try {
    saveLoading.value = true
    
    // Format data for API
    const apiData = {
      ...editingMaterial.value,
      stock: editingMaterial.value.currentStock // API expects 'stock' field
    }
    
    let result
    
    if (formMode.value === 'add') {
      result = await stockApi.createStockItem(apiData)
    } else {
      const id = editingMaterial.value.id
      result = await stockApi.updateStockItem(id, apiData)
    }
    
    if (result) {
      $toast.success(
        formMode.value === 'add' 
          ? 'Yeni malzeme başarıyla eklendi' 
          : 'Malzeme başarıyla güncellendi'
      )
      
      closeMaterialForm()
      refreshData()
    } else {
      $toast.error('İşlem sırasında bir hata oluştu')
    }
  } catch (error) {
    console.error('Save error:', error)
    $toast.error('Kaydetme işlemi sırasında bir hata oluştu')
  } finally {
    saveLoading.value = false
  }
}

const exportCategory = () => {
  const categoryId = selectedCategory.value !== 'all' 
    ? categories.value.find(c => c.name.toLowerCase().includes(getCategoryDisplayName(selectedCategory.value).toLowerCase()))?.id 
    : undefined
    
  stockApi.exportStockItems({ categoryId })
  $toast.info('Dışa aktarma işlemi başlatıldı')
}

const exportAllStock = () => {
  stockApi.exportStockItems()
  $toast.info('Tüm stok verilerinin dışa aktarma işlemi başlatıldı')
}

const showStockOnly = () => {
  // Apply stock filter
  $toast.info('Sadece stokta var filtresi uygulandı')
}

const showProjectAssigned = () => {
  // Apply project filter
  $toast.info('Sadece projelerdeki malzemeler gösteriliyor')
}

const clearAllFilters = () => {
  // Clear all filters
  $toast.info('Tüm filtreler temizlendi')
}

const onPageChange = (page: number) => {
  currentPage.value = page
  refreshData()
}

const onItemsPerPageChange = (count: number) => {
  itemsPerPage.value = count
  currentPage.value = 1 // Reset to first page
  refreshData()
}

const refreshData = async () => {
  loading.value = true
  
  try {
    // Load categories first
    await fetchCategories()
    
    // Load stock data with params
    const params = {
      page: currentPage.value,
      limit: itemsPerPage.value,
      categoryId: selectedCategory.value !== 'all' 
        ? categories.value.find(c => 
            c.name.toLowerCase().includes(getCategoryDisplayName(selectedCategory.value).toLowerCase())
          )?.id 
        : undefined
    }
    
    const response = await stockApi.fetchStockItems(params)
    allStockItems.value = response.data
    
    // Get stock counts
    stockCounts.value = await stockApi.getStockCounts()
    
    // Group by category for the tabs
    categoryStockItems.value = {
      steel: allStockItems.value.filter(item => 
        item.categoryId === categories.value.find(c => c.name.toLowerCase().includes('çelik'))?.id
      ),
      membrane: allStockItems.value.filter(item => 
        item.categoryId === categories.value.find(c => c.name.toLowerCase().includes('membran'))?.id
      ),
      rope: allStockItems.value.filter(item => 
        item.categoryId === categories.value.find(c => c.name.toLowerCase().includes('halat'))?.id
      ),
      thread: allStockItems.value.filter(item => 
        item.categoryId === categories.value.find(c => c.name.toLowerCase().includes('fitil'))?.id
      )
    }
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    categories.value = await categoriesApi.fetchCategories()
  } catch (error) {
    console.error('Error fetching categories:', error)
    $toast.error('Kategoriler yüklenirken bir hata oluştu')
  }
}

const confirmDelete = (itemName: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Modal confirm dialog
    resolve(confirm(`"${itemName}" öğesini silmek istediğinizden emin misiniz?`))
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount)
}

// Lifecycle
onMounted(async () => {
  await refreshData()
})

// Watch category changes
watch(selectedCategory, () => {
  currentPage.value = 1
  refreshData()
})
</script>
