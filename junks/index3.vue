<!-- pages/stock/index3.vue -->
<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Stok Yönetimi</h1>
        <p class="text-slate-500">Tüm malzeme stoklarını görüntüleyin ve yönetin</p>
      </div>
      
      <div class="flex gap-2">
        <UButton 
          color="blue" 
          icon="i-lucide-file-spreadsheet"
          @click="exportData"
        >
          Export
        </UButton>
        <UButton 
          color="blue" 
          icon="i-lucide-plus"
          @click="showAddItemModal = true"
        >
          Yeni Malzeme
        </UButton>
      </div>
    </div>

    <!-- Category Tabs -->
    <UTabs v-model="activeCategory">
      <UTab name="all" label="Tümü" />
      <UTab
        v-for="category in categories" 
        :key="category.id" 
        :name="category.id.toString()"
        :label="category.name"
      />
      
      <template #default="{selected}">
        <div class="p-4">
          <Suspense>
            <!-- Main Tab Content with API Integration -->
            <div class="py-4">
              <ScivetoDataTable2
                ref="dataTableRef"
                :items="filteredStockItems"
                :columns="tableColumns"
                :loading="isLoading"
                :total-items="totalItems"
                :server-side-processing="true"
                :enable-advanced-filters="true"
                :category-options="categoryOptions"
                :supplier-options="suppliers"
                :project-options="projects"
                :location-options="locations"
                selectable
                allow-edit
                allow-delete
                title="Stok Malzemeleri"
                pagination
                row-clickable
                @edit="editItem"
                @delete="deleteItem"
                @row-click="viewItemDetail"
                @filter="applyFilters"
                @export="exportData"
                @sort="handleSort"
                @page-change="handlePageChange"
                @refresh="refreshData"
              />
            </div>
            
            <template #fallback>
              <div class="flex justify-center items-center py-16">
                <UIcon name="i-lucide-loader-2" class="animate-spin text-4xl text-blue-500" />
              </div>
            </template>
          </Suspense>
        </div>
      </template>
    </UTabs>

    <!-- Add/Edit Item Modal -->
    <UModal v-model="showAddItemModal">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">{{ isEditing ? 'Malzeme Düzenle' : 'Yeni Malzeme' }}</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-lucide-x"
              @click="showAddItemModal = false"
            />
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">Malzeme Adı</label>
            <UInput v-model="newItem.name" placeholder="Malzeme adı girin" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">Kategori</label>
            <USelectMenu
              v-model="newItem.categoryId"
              :options="categoryOptions"
              placeholder="Kategori seçin"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">Miktar</label>
            <UInput v-model="newItem.quantity" type="number" placeholder="Stok miktarı" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">Fiyat (₺)</label>
            <UInput v-model="newItem.price" type="number" placeholder="Birim fiyat" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">SKU</label>
            <UInput v-model="newItem.sku" placeholder="SKU / Stok kodu" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">Tedarikçi</label>
            <USelectMenu
              v-model="newItem.supplier"
              :options="suppliers"
              placeholder="Tedarikçi seçin"
            />
          </div>

          <div class="md:col-span-2 flex flex-col gap-2">
            <label class="text-sm font-medium text-slate-700">Açıklama</label>
            <UTextarea v-model="newItem.description" placeholder="Malzeme açıklaması" rows="3" />
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray"
              variant="outline"
              @click="showAddItemModal = false"
            >
              İptal
            </UButton>
            <UButton
              color="blue"
              :loading="isSaving"
              @click="saveItem"
            >
              {{ isEditing ? 'Güncelle' : 'Kaydet' }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Item Detail Modal -->
    <UModal v-model="showItemDetailModal">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Malzeme Detayı</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-lucide-x"
              @click="showItemDetailModal = false"
            />
          </div>
        </template>

        <div v-if="selectedItem" class="py-2">
          <div class="flex flex-col gap-6">
            <!-- Basic Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-500">Malzeme Adı</span>
                <span class="font-medium">{{ selectedItem.name }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-500">Kategori</span>
                <span class="font-medium">{{ getCategoryName(selectedItem.categoryId) }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-500">SKU</span>
                <span class="font-medium">{{ selectedItem.sku }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-500">Tedarikçi</span>
                <span class="font-medium">{{ selectedItem.supplier }}</span>
              </div>
            </div>

            <!-- Stock & Price Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UCard class="bg-blue-50 border-blue-200">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-blue-600">Miktar</span>
                  <span class="text-2xl font-bold">{{ selectedItem.quantity }}</span>
                  <span class="text-xs text-blue-600">adet</span>
                </div>
              </UCard>
              <UCard class="bg-amber-50 border-amber-200">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-amber-600">Birim Fiyat</span>
                  <span class="text-2xl font-bold">₺{{ selectedItem.price }}</span>
                  <span class="text-xs text-amber-600">+ KDV</span>
                </div>
              </UCard>
              <UCard class="bg-emerald-50 border-emerald-200">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-emerald-600">Toplam Değer</span>
                  <span class="text-2xl font-bold">₺{{ selectedItem.quantity * selectedItem.price }}</span>
                  <span class="text-xs text-emerald-600">+ KDV</span>
                </div>
              </UCard>
            </div>

            <!-- Description -->
            <div class="flex flex-col gap-1">
              <span class="text-xs text-slate-500">Açıklama</span>
              <p class="text-slate-700">{{ selectedItem.description || 'Açıklama bulunmuyor' }}</p>
            </div>

            <!-- Project Assignments -->
            <div v-if="selectedItem.projects?.length" class="flex flex-col gap-2">
              <span class="text-xs text-slate-500">Atanmış Projeler</span>
              <div class="flex flex-wrap gap-2">
                <UChip 
                  v-for="project in selectedItem.projects" 
                  :key="project.id"
                  color="blue"
                >
                  {{ project.name }}
                </UChip>
              </div>
            </div>

            <!-- Inventory History -->
            <div class="flex flex-col gap-2">
              <h4 class="font-medium text-slate-900">Stok Hareketleri</h4>
              <UTable 
                :columns="[
                  { key: 'date', label: 'Tarih' },
                  { key: 'type', label: 'İşlem' },
                  { key: 'quantity', label: 'Miktar' },
                  { key: 'user', label: 'Kullanıcı' }
                ]" 
                :rows="selectedItem.history || []"
              >
                <template #empty-state>
                  <div class="text-center py-4">
                    <p class="text-slate-500">Stok hareketi bulunamadı</p>
                  </div>
                </template>
              </UTable>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-between">
            <div>
              <UButton
                v-if="selectedItem"
                color="red"
                variant="ghost"
                icon="i-lucide-trash-2"
                @click="deleteItem(selectedItem)"
              >
                Sil
              </UButton>
            </div>
            <div class="flex gap-2">
              <UButton
                color="gray"
                variant="outline"
                @click="showItemDetailModal = false"
              >
                Kapat
              </UButton>
              <UButton
                v-if="selectedItem"
                color="blue"
                icon="i-lucide-pencil"
                @click="editItem(selectedItem)"
              >
                Düzenle
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteConfirm">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2 text-red-500">
            <UIcon name="i-lucide-alert-triangle" />
            <span>Silme Onayı</span>
          </div>
        </template>

        <p>Bu malzemeyi silmek istediğinizden emin misiniz?</p>
        <p class="text-sm text-slate-500 mt-1">Bu işlem geri alınamaz.</p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray" 
              variant="outline"
              @click="showDeleteConfirm = false"
            >
              İptal
            </UButton>
            <UButton
              color="red"
              :loading="isDeleting"
              @click="confirmDeleteItem"
            >
              Sil
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import useStockApi from '~/composables/useStockApi'

// API integration
const stockApi = useStockApi()

// Data state
const stockItems = ref([])
const categories = ref([])
const totalItems = ref(0)
const isLoading = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)

// UI state
const activeCategory = ref('all')
const showAddItemModal = ref(false)
const showItemDetailModal = ref(false)
const showDeleteConfirm = ref(false)
const selectedItem = ref(null)
const itemToDelete = ref(null)
const isEditing = ref(false)
const dataTableRef = ref(null)
const currentFilters = ref({})
const currentPage = ref(1)
const currentSort = reactive({
  key: 'createdAt',
  order: 'desc'
})

// Form state
const newItem = reactive({
  id: null,
  name: '',
  categoryId: null,
  quantity: 0,
  price: 0,
  sku: '',
  supplier: '',
  description: ''
})

// Sample data for select options
const suppliers = [
  { label: 'ABC Elektronik', value: 'ABC Elektronik' },
  { label: 'XYZ Sistemleri', value: 'XYZ Sistemleri' },
  { label: 'Merkez Dağıtım', value: 'Merkez Dağıtım' }
]

const projects = [
  { label: 'Proje A', value: 'A' },
  { label: 'Proje B', value: 'B' },
  { label: 'Proje C', value: 'C' }
]

const locations = [
  { label: 'Depo A', value: 'Depo A' },
  { label: 'Depo B', value: 'Depo B' },
  { label: 'Merkez Ofis', value: 'Merkez Ofis' }
]

// Table configuration
const tableColumns = [
  { key: 'name', label: 'Malzeme Adı', sortable: true },
  { key: 'categoryId', label: 'Kategori', sortable: true },
  { key: 'quantity', label: 'Miktar', sortable: true, type: 'number' },
  { key: 'price', label: 'Birim Fiyat', sortable: true, type: 'currency' },
  { key: 'totalValue', label: 'Toplam Değer', sortable: true, type: 'currency' },
  { key: 'supplier', label: 'Tedarikçi', sortable: true },
  { key: 'updatedAt', label: 'Son Güncelleme', sortable: true, type: 'date' }
]

// Computed properties
const categoryOptions = computed(() => {
  return categories.value.map(category => ({
    label: category.name,
    value: category.id
  }))
})

const filteredStockItems = computed(() => {
  let items = [...stockItems.value]
  
  // If a category is selected, filter by it
  if (activeCategory.value !== 'all') {
    items = items.filter(item => item.categoryId.toString() === activeCategory.value)
  }
  
  return items
})

// Methods
const fetchData = async () => {
  isLoading.value = true
  try {
    // Fetch categories
    const categoryData = await stockApi.fetchCategories()
    categories.value = categoryData.data || []
    
    // Fetch stock items with pagination and sorting
    const params = {
      page: currentPage.value,
      limit: 10,
      sortBy: currentSort.key,
      sortOrder: currentSort.order,
      ...currentFilters.value
    }
    
    if (activeCategory.value !== 'all') {
      params.categoryId = activeCategory.value
    }
    
    const response = await stockApi.fetchStockItems(params)
    stockItems.value = response.data || []
    totalItems.value = response.meta?.total || stockItems.value.length
  } catch (error) {
    console.error('Error fetching data:', error)
    useToast().add({
      title: 'Hata',
      description: 'Veriler yüklenirken bir hata oluştu',
      color: 'red'
    })
  } finally {
    isLoading.value = false
  }
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'Kategori Yok'
}

const resetForm = () => {
  Object.assign(newItem, {
    id: null,
    name: '',
    categoryId: null,
    quantity: 0,
    price: 0,
    sku: '',
    supplier: '',
    description: ''
  })
}

const editItem = (item) => {
  isEditing.value = true
  Object.assign(newItem, { ...item })
  showItemDetailModal.value = false
  showAddItemModal.value = true
}

const viewItemDetail = (item) => {
  selectedItem.value = item
  showItemDetailModal.value = true
}

const deleteItem = (item) => {
  itemToDelete.value = item
  showItemDetailModal.value = false
  showDeleteConfirm.value = true
}

const confirmDeleteItem = async () => {
  if (!itemToDelete.value) return
  
  isDeleting.value = true
  try {
    await stockApi.deleteStockItem(itemToDelete.value.id)
    
    // Remove from local state
    stockItems.value = stockItems.value.filter(item => item.id !== itemToDelete.value.id)
    totalItems.value--
    
    useToast().add({
      title: 'Başarılı',
      description: 'Malzeme başarıyla silindi',
      color: 'green'
    })
    
    showDeleteConfirm.value = false
  } catch (error) {
    console.error('Error deleting item:', error)
    useToast().add({
      title: 'Hata',
      description: 'Malzeme silinirken bir hata oluştu',
      color: 'red'
    })
  } finally {
    isDeleting.value = false
    itemToDelete.value = null
  }
}

const saveItem = async () => {
  isSaving.value = true
  
  try {
    let savedItem
    
    if (isEditing.value) {
      // Update existing item
      savedItem = await stockApi.updateStockItem(newItem.id, newItem)
      
      // Update local state
      const index = stockItems.value.findIndex(item => item.id === newItem.id)
      if (index !== -1) {
        stockItems.value[index] = savedItem
      }
      
      useToast().add({
        title: 'Başarılı',
        description: 'Malzeme başarıyla güncellendi',
        color: 'green'
      })
    } else {
      // Create new item
      savedItem = await stockApi.createStockItem(newItem)
      
      // Add to local state
      stockItems.value.unshift(savedItem)
      totalItems.value++
      
      useToast().add({
        title: 'Başarılı',
        description: 'Yeni malzeme başarıyla eklendi',
        color: 'green'
      })
    }
    
    // Reset and close form
    resetForm()
    showAddItemModal.value = false
    isEditing.value = false
  } catch (error) {
    console.error('Error saving item:', error)
    useToast().add({
      title: 'Hata',
      description: 'Malzeme kaydedilirken bir hata oluştu',
      color: 'red'
    })
  } finally {
    isSaving.value = false
  }
}

const applyFilters = (filters) => {
  currentFilters.value = filters
  currentPage.value = 1
  fetchData()
}

const handleSort = (key, order) => {
  currentSort.key = key
  currentSort.order = order
  fetchData()
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchData()
}

const exportData = (options = {}) => {
  const filters = { ...currentFilters.value, ...options }
  if (activeCategory.value !== 'all') {
    filters.categoryId = activeCategory.value
  }
  
  const format = options.format || 'csv'
  stockApi.exportStockItems(format, filters)
    .then(response => {
      // In a real app, this would handle the file download
      // For now, just show a success toast
      useToast().add({
        title: 'Export Başarılı',
        description: `Veriler ${format.toUpperCase()} formatında export edildi`,
        color: 'green'
      })
    })
    .catch(error => {
      console.error('Export error:', error)
      useToast().add({
        title: 'Export Hatası',
        description: 'Veriler export edilirken bir hata oluştu',
        color: 'red'
      })
    })
}

const refreshData = () => {
  fetchData()
}

// Lifecycle hooks
onMounted(() => {
  fetchData()
})

// Watch for category tab changes
watch(activeCategory, () => {
  currentPage.value = 1
  fetchData()
})
</script>
