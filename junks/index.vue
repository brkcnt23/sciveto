<!-- pages/stock/index.vue -->
<template>
  <div class="stock-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="text-2xl font-bold text-slate-900">📦 Stok Yönetimi</h1>
          <p class="text-slate-600">Tüm malzeme kategorilerini yönetin</p>
        </div>
        <div class="header-actions">
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
    <div class="stats-grid">
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
    <div class="ai-insights-section" v-if="aiInsights.length">
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
        @page-change="currentPage = $event"
        @items-per-page-change="itemsPerPage = $event"
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
                @click="selectedMaterial = null"
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
                @click="selectedMaterial = null"
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
                      v-model="editingMaterial.category"
                      :options="categoryOptions"
                      placeholder="Kategori seçin"
                    />
                  </UFormGroup>
                  
                  <UFormGroup label="Miktar" required>
                    <UInput v-model="editingMaterial.quantity" type="number" placeholder="0" />
                  </UFormGroup>
                  
                  <UFormGroup label="Birim" required>
                    <USelect
                      v-model="editingMaterial.unit"
                      :options="unitOptions"
                      placeholder="Birim seçin"
                    />
                  </UFormGroup>
                  
                  <UFormGroup label="Fiyat">
                    <UInput v-model="editingMaterial.price" type="number" placeholder="0.00" />
                  </UFormGroup>
                  
                  <UFormGroup label="Tedarikçi">
                    <UInput v-model="editingMaterial.supplier" placeholder="Tedarikçi" />
                  </UFormGroup>
                  
                  <UFormGroup label="Proje">
                    <USelect
                      v-model="editingMaterial.project"
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
                      v-model="editingMaterial.grade"
                      :options="steelGradeOptions"
                      placeholder="Kalite seçin"
                    />
                  </UFormGroup>
                  
                  <UFormGroup label="Boyutlar">
                    <UInput v-model="editingMaterial.dimensions" placeholder="örn. 100x200x5 mm" />
                  </UFormGroup>
                </div>
                
                <div v-if="selectedCategory === 'membrane'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFormGroup label="Renk">
                    <USelect
                      v-model="editingMaterial.color"
                      :options="colorOptions"
                      placeholder="Renk seçin"
                    />
                  </UFormGroup>
                  
                  <UFormGroup label="En">
                    <UInput v-model="editingMaterial.width" type="number" placeholder="En (metre)" />
                  </UFormGroup>
                </div>
              </div>
            </form>
          </div>
          
          <template #footer>
            <div class="flex justify-between">
              <UButton
                color="gray"
                variant="soft"
                @click="closeMaterialForm"
              >
                İptal
              </UButton>
              <UButton
                color="blue"
                @click="saveMaterial"
              >
                {{ formMode === 'add' ? 'Ekle' : 'Güncelle' }}
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { ScivetoDataTable } from '~/components/table'

// Meta
definePageMeta({
  title: 'Stok Yönetimi',
  description: 'Tüm malzeme kategorilerini yönetin'
})

// Stores
const stockStore = useStockStore()
const { $toast } = useNuxtApp()

// State
const selectedCategory = ref('all')
const selectedMaterial = ref(null)
const showDetailModal = ref(false)
const showMaterialForm = ref(false)
const editingMaterial = ref<any>({})
const formMode = ref<'add' | 'edit'>('add')
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(25)
const viewDensity = ref<'compact' | 'normal' | 'detailed'>('normal')

// Category Tabs
const categoryTabs = [
  {
    key: 'all',
    label: 'Tümü',
    icon: 'i-lucide-layers-3',
    count: computed(() => stockStore.totalItems || 0)
  },
  {
    key: 'steel',
    label: 'Çelik',
    icon: 'i-lucide-hard-hat',
    count: computed(() => stockStore.steelItems?.length || 0)
  },
  {
    key: 'membrane',
    label: 'Membran',
    icon: 'i-lucide-layers',
    count: computed(() => stockStore.membraneItems?.length || 0)
  },
  {
    key: 'rope',
    label: 'Halat',
    icon: 'i-lucide-link',
    count: computed(() => stockStore.ropeItems?.length || 0)
  },
  {
    key: 'thread',
    label: 'Fitil',
    icon: 'i-lucide-zap',
    count: computed(() => stockStore.threadItems?.length || 0)
  }
]

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
    value: (stockStore.totalItems || 0).toLocaleString(),
    trend: { type: 'positive', text: '+12% bu ay' },
    color: 'bg-blue-500',
    icon: 'i-lucide-package'
  },
  {
    key: 'totalValue',
    label: 'Toplam Değer',
    value: formatCurrency(stockStore.totalValue || 0),
    trend: { type: 'positive', text: '+8% bu ay' },
    color: 'bg-green-500',
    icon: 'i-lucide-dollar-sign'
  },
  {
    key: 'lowStock',
    label: 'Düşük Stok',
    value: (stockStore.lowStockItems?.length || 0).toString(),
    trend: { type: 'negative', text: '+3 bu hafta' },
    color: 'bg-amber-500',
    icon: 'i-lucide-alert-triangle'
  },
  {
    key: 'outOfStock',
    label: 'Tükenen',
    value: (stockStore.outOfStockItems?.length || 0).toString(),
    trend: { type: 'negative', text: '+2 dün' },
    color: 'bg-red-500',
    icon: 'i-lucide-x-circle'
  }
])

// Table Data
const currentCategoryData = computed(() => {
  switch (selectedCategory.value) {
    case 'steel':
      return stockStore.steelItems || []
    case 'membrane':
      return stockStore.membraneItems || []
    case 'rope':
      return stockStore.ropeItems || []
    case 'thread':
      return stockStore.threadItems || []
    default:
      return stockStore.allItems || []
  }
})

const currentCategoryColumns = computed(() => {
  const baseColumns: TableColumn[] = [
    { key: 'name', label: 'Malzeme Adı', sortable: true },
    { key: 'category', label: 'Kategori' },
    { key: 'stock-status', label: 'Stok Durumu' },
    { key: 'quantity', label: 'Miktar', sortable: true },
    { key: 'unit', label: 'Birim' },
    { key: 'price', label: 'Fiyat', sortable: true },
    { key: 'supplier', label: 'Tedarikçi' },
    { key: 'project', label: 'Proje' },
    { key: 'lastUpdate', label: 'Son Güncelleme', sortable: true },
    { key: 'actions', label: 'İşlemler' }
  ]

  // Category-specific columns
  switch (selectedCategory.value) {
    case 'steel':
      return [
        baseColumns[0], // name
        { key: 'grade', label: 'Kalite', sortable: true },
        { key: 'dimensions', label: 'Boyutlar' },
        ...baseColumns.slice(2) // rest
      ]
    case 'membrane':
      return [
        baseColumns[0], // name
        { key: 'color', label: 'Renk' },
        { key: 'width', label: 'En', sortable: true },
        ...baseColumns.slice(2) // rest
      ]
    default:
      return baseColumns
  }
})

const currentCategoryTitle = computed(() => {
  const titles = {
    all: 'Tüm Malzemeler',
    steel: 'Çelik Malzemeler',
    membrane: 'Membran Malzemeler',
    rope: 'Halat Malzemeler',
    thread: 'Fitil Malzemeler'
  }
  return titles[selectedCategory.value as keyof typeof titles] || 'Malzemeler'
})

const currentCategoryItemType = computed(() => {
  const types = {
    all: 'malzeme',
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
    steel: 'Çelik Ekle',
    membrane: 'Membran Ekle',
    rope: 'Halat Ekle',
    thread: 'Fitil Ekle'
  }
  return labels[selectedCategory.value as keyof typeof labels] || 'Yeni Ekle'
})

const currentCategoryFilters = computed(() => {
  const baseFilters = [
    {
      key: 'supplier',
      label: 'Tedarikçi',
      options: stockStore.uniqueSuppliers?.map(s => ({ label: s, value: s })) || []
    },
    {
      key: 'project',
      label: 'Proje',
      options: stockStore.uniqueProjects?.map(p => ({ label: p, value: p })) || []
    }
  ]

  switch (selectedCategory.value) {
    case 'steel':
      return [
        {
          key: 'grade',
          label: 'Kalite',
          options: stockStore.uniqueSteelGrades?.map(g => ({ label: g, value: g })) || []
        },
        ...baseFilters
      ]
    case 'membrane':
      return [
        {
          key: 'color',
          label: 'Renk',
          options: stockStore.uniqueColors?.map(c => ({ label: c, value: c })) || []
        },
        ...baseFilters
      ]
    default:
      return baseFilters
  }
})

const totalItems = computed(() => currentCategoryData.value.length)

// Form Options
const categoryOptions = [
  { label: 'Çelik', value: 'steel' },
  { label: 'Membran', value: 'membrane' },
  { label: 'Halat', value: 'rope' },
  { label: 'Fitil', value: 'thread' }
]

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

const projectOptions = [
  { label: 'Proje 1', value: 'prj1' },
  { label: 'Proje 2', value: 'prj2' },
  { label: 'Proje 3', value: 'prj3' }
]

// Methods
const addMaterial = (categoryType: string) => {
  selectedCategory.value = categoryType
  formMode.value = 'add'
  editingMaterial.value = {
    category: categoryType === 'all' ? null : categoryType
  }
  showMaterialForm.value = true
}

const viewItem = (item: any) => {
  selectedMaterial.value = item
  showDetailModal.value = true
}

const editItem = (item: any) => {
  formMode.value = 'edit'
  editingMaterial.value = { ...item }
  showMaterialForm.value = true
  showDetailModal.value = false
}

const duplicateItem = (item: any) => {
  formMode.value = 'add'
  editingMaterial.value = { ...item, id: undefined, name: `${item.name} (Kopya)` }
  showMaterialForm.value = true
  showDetailModal.value = false
}

const deleteItem = async (item: any) => {
  if (await confirmDelete(item.name)) {
    try {
      await stockStore.deleteItem(selectedCategory.value, item.id)
      $toast.success(`${item.name} başarıyla silindi`)
    } catch (error) {
      $toast.error('Silme işlemi başarısız oldu')
    }
  }
}

const closeMaterialForm = () => {
  showMaterialForm.value = false
  editingMaterial.value = {}
}

const saveMaterial = async () => {
  try {
    if (formMode.value === 'add') {
      await stockStore.addItem(selectedCategory.value, editingMaterial.value)
      $toast.success('Malzeme başarıyla eklendi')
    } else {
      await stockStore.updateItem(selectedCategory.value, editingMaterial.value.id, editingMaterial.value)
      $toast.success('Malzeme başarıyla güncellendi')
    }
    closeMaterialForm()
    await refreshData()
  } catch (error) {
    $toast.error('İşlem başarısız oldu')
  }
}

const exportCategory = () => {
  stockStore.exportData(selectedCategory.value)
}

const exportAllStock = () => {
  stockStore.exportAllData()
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

const refreshData = async () => {
  loading.value = true
  try {
    await stockStore.fetchAllData()
  } finally {
    loading.value = false
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
})

// Store integrations
// Burada normalde eğer store yapınız mevcut ise import edebiliriz
if (!stockStore.isInitialized) {
  // Mock veri - gerçek uygulamanızda kendi store mantığınızı kullanabilirsiniz
  stockStore.initializeMockData()
}
</script>

<style scoped>
.stock-page {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(226, 232, 240);
  overflow: hidden;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.ai-insights-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
