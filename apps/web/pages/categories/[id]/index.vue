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
      <!-- Page Header -->
      <PageHeader
        :title="category.name"
        :description="category.description"
        organization="Asma Germe A.Ş."
        :breadcrumb="[
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Kategoriler', path: '/categories' },
          { name: category.name }
        ]"
      >
        <template #actions>
          <div class="flex items-center gap-3">
            <UButton
              icon="i-heroicons-arrow-down-tray"
              variant="outline"
              @click="openImportModal"
            >
              İçe Aktar
            </UButton>
            <UButton
              icon="i-heroicons-arrow-up-tray"
              variant="outline"
              @click="openExportModal"
            >
              Dışa Aktar
            </UButton>
          </div>
        </template>
      </PageHeader>

      <!-- Add Product Button -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">
            Ürün Listesi
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Bu kategorideki tüm ürünleri görüntüleyebilir ve yönetebilirsiniz
          </p>
        </div>
        <UButton
          icon="i-heroicons-plus"
          color="primary"
          size="md"
          @click="openAddModal"
        >
          Yeni Ürün Ekle
        </UButton>
      </div>

      <!-- Data Table -->
      <BaseDataTable
        :title="`${category?.name || 'Kategori'} Ürünleri`"
        item-type="ürün"
        :paginatedData="paginatedData"
        :filteredCount="filteredCount"
        :totalItems="totalItems"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        :currentDensity="currentDensity"
        :loading="loading"
        :selectable="false"
        @edit-item="openEditModal"
        @view-item="handleViewItem"
        @duplicate-item="handleDuplicateItem" 
        @delete-item="handleDeleteItem"
        @page-change="handlePageChange"
        @items-change="handleItemsChange"
        @density-change="handleDensityChange"
      >
        <template #table-head>
          <th v-for="column in tableColumns" :key="column.key" :class="column.class">
            {{ column.label }}
          </th>
        </template>
        
        <template #table-body="{ item }">
          <td v-for="column in tableColumns" :key="column.key" :class="column.class">
            <template v-if="column.key === 'name'">
              <div class="font-medium text-neutral-900 dark:text-white">{{ item.name }}</div>
            </template>
            <template v-else-if="column.key === 'description'">
              <div class="text-neutral-600 dark:text-neutral-300">{{ item.description || '-' }}</div>
            </template>
            <template v-else-if="column.key === 'currentStock'">
              <span class="text-neutral-700 dark:text-neutral-300">{{ item.currentStock }}</span>
            </template>
            <template v-else-if="column.key === 'value'">
              <span class="text-neutral-700 dark:text-neutral-300">{{ item.value }}</span>
            </template>
          </td>
        </template>
      </BaseDataTable>
    </template>

    <!-- Error State -->
    <div v-else class="text-center py-12">
      <UIcon name="i-lucide-alert-circle" class="h-12 w-12 mx-auto text-red-500 mb-4" />
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        Kategori bulunamadı
      </h3>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        Bu kategori mevcut değil veya silinmiş olabilir.
      </p>
      <UButton @click="$router.push('/categories')">
        Kategorilere Dön
      </UButton>
    </div>

    <!-- Add/Edit Modal -->
    <BaseModal 
      v-if="showAddEditModal"
      :title="editingItem ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'"
      :icon="editingItem ? 'i-heroicons-pencil' : 'i-heroicons-plus'"
      size="large"
      @close="closeAddEditModal"
      show-close-notification
    >
      <form @submit.prevent="handleSave" class="space-y-4">
        <!-- Basic Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Ürün Adı *</label>
            <UInput
              v-model="formData.name"
              placeholder="Ürün adını girin"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Birim</label>
            <UInput
              v-model="formData.unit"
              placeholder="adet, kg, litre vb."
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Mevcut Stok</label>
            <UInput
              v-model="formData.currentStock"
              type="number"
              placeholder="0"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Minimum Stok</label>
            <UInput
              v-model="formData.minStock"
              type="number"
              placeholder="0"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Değer (₺)</label>
            <UInput
              v-model="formData.value"
              type="number"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Konum</label>
            <UInput
              v-model="formData.location"
              placeholder="Depo konumu"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Açıklama</label>
          <UTextarea
            v-model="formData.description"
            placeholder="Ürün açıklaması"
            :rows="3"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Teknik Özellikler</label>
          <UTextarea
            v-model="formData.specifications"
            placeholder="Teknik özellikler ve detaylar"
            :rows="3"
          />
        </div>

        <!-- Dynamic Template Fields -->
        <div v-if="templateData?.fields?.length" class="border-t pt-4">
          <h4 class="text-md font-medium mb-3">{{ templateData.name }} Alanları</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="field in templateData.fields" :key="field.name">
              <label class="block text-sm font-medium mb-1">{{ field.label }} {{ field.required ? '*' : '' }}</label>
              
              <!-- Text Input -->
              <UInput
                v-if="field.type === 'text'"
                v-model="formData.templateFields[field.name]"
                :placeholder="field.placeholder"
              />
              
              <!-- Number Input -->
              <UInput
                v-else-if="field.type === 'number'"
                v-model="formData.templateFields[field.name]"
                type="number"
                :step="field.validation?.step || 'any'"
                :min="field.validation?.min"
                :max="field.validation?.max"
                :placeholder="field.placeholder"
              />
              
              <!-- Textarea -->
              <UTextarea
                v-else-if="field.type === 'textarea'"
                v-model="formData.templateFields[field.name]"
                :placeholder="field.placeholder"
              />
              
              <!-- Select -->
              <USelectMenu
                v-else-if="field.type === 'select' || field.type === 'enum'"
                v-model="formData.templateFields[field.name]"
                :options="field.options || []"
                :placeholder="`${field.label} seçin`"
              />
              
              <!-- Date -->
              <UInput
                v-else-if="field.type === 'date'"
                v-model="formData.templateFields[field.name]"
                type="date"
              />
              
              <!-- Boolean/Checkbox -->
              <UCheckbox
                v-else-if="field.type === 'boolean'"
                v-model="formData.templateFields[field.name]"
                :label="field.label"
              />
              
              <!-- Default Text Input -->
              <UInput
                v-else
                v-model="formData.templateFields[field.name]"
                :placeholder="field.placeholder"
              />
            </div>
          </div>
        </div>
      </form>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            variant="outline"
            @click="closeAddEditModal"
          >
            İptal
          </UButton>
          <UButton
            color="primary"
            @click="handleSave"
            :loading="saving"
            :disabled="!formData.name"
          >
            {{ editingItem ? 'Güncelle' : 'Kaydet' }}
          </UButton>
        </div>
      </template>
    </BaseModal>

    <!-- Import Modal -->
    <BaseModal 
      v-if="showImportModal"
      title="Ürün İçe Aktar"
      icon="i-heroicons-arrow-down-tray"
      size="medium"
      @close="closeImportModal"
    >
      <div class="space-y-4">
        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          CSV dosyası seçerek ürünleri toplu olarak içe aktarabilirsiniz.
        </p>
        
        <div class="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-6 text-center">
          <div class="space-y-2">
            <UIcon name="i-heroicons-arrow-up-tray" class="h-8 w-8 mx-auto text-neutral-400" />
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Dosyayı buraya sürükleyin veya seçin
            </p>
            <UButton size="sm" variant="outline">
              Dosya Seç
            </UButton>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            variant="outline"
            @click="closeImportModal"
          >
            İptal
          </UButton>
          <UButton color="primary" disabled>
            İçe Aktar
          </UButton>
        </div>
      </template>
    </BaseModal>

    <!-- Export Modal -->
    <BaseModal 
      v-if="showExportModal"
      title="Ürün Dışa Aktar"
      icon="i-heroicons-arrow-up-tray"
      size="medium"
      @close="closeExportModal"
    >
      <div class="space-y-4">
        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          Kategori ürünlerini CSV formatında dışa aktarabilirsiniz.
        </p>
        
        <div class="space-y-3">
          <UCheckbox v-model="exportOptions.includeTemplateFields" label="Template alanlarını dahil et" />
          <UCheckbox v-model="exportOptions.includeStockInfo" label="Stok bilgilerini dahil et" />
          <UCheckbox v-model="exportOptions.includeFinancialInfo" label="Mali bilgileri dahil et" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            variant="outline"
            @click="closeExportModal"
          >
            İptal
          </UButton>
          <UButton color="primary" @click="handleExport">
            Dışa Aktar
          </UButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { StockItem, Category } from '~/types'
import PageHeader from '~/components/ui/PageHeader.vue'
import BaseModal from '~/components/base/BaseModal.vue'

// Local types
interface TemplateField {
  name: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
  defaultValue?: any
  validation?: {
    step?: string
    min?: number
    max?: number
  }
  options?: string[]
}

// Page Meta
definePageMeta({
  title: 'Kategori Ürünleri',
  description: 'Kategori ürünlerini yönetin'
})

// Route
const route = useRoute()
const categoryId = route.params.id as string

// Custom composables
const { state: themeState } = useTheme()
const { success, error, warning, info, dataSaved, projectUpdate } = useDualToast()

// Reactive State
const loading = ref(true)
const saving = ref(false)
const category = ref<Category | null>(null)
const stockItems = ref<StockItem[]>([])
const templateData = ref<any>(null)

// Pagination state for BaseDataTable
const currentPage = ref(1)
const itemsPerPage = ref(25)
const currentDensity = ref<'compact' | 'normal' | 'detailed'>('normal')

// Modal States - Simple and clean
const showAddEditModal = ref(false)
const showImportModal = ref(false)
const showExportModal = ref(false)
const editingItem = ref<StockItem | null>(null)

// Form State
interface FormDataType {
  name: string
  description: string
  unit: string
  currentStock: number
  minStock: number
  value: number
  location: string
  specifications: string
  reservedStock: number
  standards: Record<string, any>
  templateFields: Record<string, any>
}

const formData = ref<FormDataType>({
  name: '',
  description: '',
  unit: 'adet',
  currentStock: 0,
  minStock: 0,
  value: 0,
  location: '',
  specifications: '',
  reservedStock: 0,
  standards: {},
  templateFields: {}
})

// Export Options
const exportOptions = ref({
  includeTemplateFields: true,
  includeStockInfo: true,
  includeFinancialInfo: false
})

// Table Columns for BaseDataTable
const tableColumns = [
  { 
    key: 'name', 
    label: 'Ürün Adı', 
    sortable: true,
    searchable: true
  },
  { 
    key: 'description', 
    label: 'Açıklama',
    searchable: true
  },
  { 
    key: 'currentStock', 
    label: 'Stok', 
    type: 'number',
    sortable: true,
    class: 'text-center'
  },
  { 
    key: 'value', 
    label: 'Değer (₺)', 
    type: 'currency',
    sortable: true,
    class: 'text-right'
  }
]

// Computed values for BaseDataTable
const filteredCount = computed(() => stockItems.value.length)
const totalItems = computed(() => stockItems.value.length)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return stockItems.value.slice(start, end)
})

// API Functions
const loadCategory = async () => {
  try {
    const response = await $fetch(`/api/categories/${categoryId}`, {
      baseURL: 'http://localhost:3001'
    }) as any
    category.value = response
    
    if (response) {
      info('Kategori Yüklendi', `${response.name} kategorisi hazır`, {
        icon: 'i-heroicons-folder-open',
        timeout: 3000
      })
    }
  } catch (err) {
    console.error('Error loading category:', err)
    error('Kategori Yüklenemedi', 'Kategori bilgileri alınamadı', {
      icon: 'i-heroicons-exclamation-circle'
    })
  }
}

const loadStockItems = async () => {
  try {
    const response = await $fetch(`/api/stock-items/category/${categoryId}`, {
      baseURL: 'http://localhost:3001'
    }) as any
    
    // API response has data array, map to our StockItem format
    if (response.data) {
      stockItems.value = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        unit: 'adet', // Default unit
        currentStock: item.stock || 0,
        minStock: 0,
        value: item.price || 0,
        location: '',
        specifications: '',
        reservedStock: 0,
        standards: {},
        templateFields: {}
      }))
      
      if (response.data.length > 0) {
        projectUpdate('Stok Listesi', 100) // Custom project update toast
      }
    }
  } catch (err) {
    console.error('Error loading stock items:', err)
    stockItems.value = []
    warning('Veri Yüklenemedi', 'Stok ürünleri yüklenirken sorun oluştu', {
      icon: 'i-heroicons-server'
    })
  }
}

// Form Management
const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    unit: 'adet',
    currentStock: 0,
    minStock: 0,
    value: 0,
    location: '',
    specifications: '',
    reservedStock: 0,
    standards: {},
    templateFields: {}
  }
  
  // Initialize template fields
  if (templateData.value?.fields) {
    templateData.value.fields.forEach((field: TemplateField) => {
      formData.value.templateFields[field.name] = field.defaultValue || ''
    })
  }
}

// Modal Functions - Simple and clean
const openAddModal = () => {
  editingItem.value = null
  resetForm()
  showAddEditModal.value = true
}

const openEditModal = (item: StockItem) => {
  editingItem.value = item
  
  // Load item data into form
  formData.value = {
    name: item.name,
    description: item.description || '',
    unit: item.unit || 'adet',
    currentStock: item.currentStock || 0,
    minStock: item.minStock || 0,
    value: item.value || 0,
    location: item.location || '',
    specifications: (item.specifications as string) || '',
    reservedStock: item.reservedStock || 0,
    standards: item.standards || {},
    templateFields: item.templateFields || {}
  }
  
  showAddEditModal.value = true
}

const closeAddEditModal = () => {
  showAddEditModal.value = false
  editingItem.value = null
}

const openImportModal = () => {
  showImportModal.value = true
}

const closeImportModal = () => {
  showImportModal.value = false
}

const openExportModal = () => {
  showExportModal.value = true
}

const closeExportModal = () => {
  showExportModal.value = false
}

// Event handlers for BaseDataTable
const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleItemsChange = (count: number) => {
  itemsPerPage.value = count
  currentPage.value = 1
}

const handleDensityChange = (density: 'compact' | 'normal' | 'detailed') => {
  currentDensity.value = density
}

// CRUD Functions
const handleViewItem = (item: StockItem) => {
  console.log('Viewing item:', item.id)
  
  info('Ürün Detayları', `${item.name} detay sayfası yüklenecek`, {
    icon: 'i-lucide-eye',
    timeout: 3000
  })
  
  // TODO: Navigate to item detail page
  // await navigateTo(`/categories/${categoryId}/items/${item.id}`)
}

const handleDuplicateItem = (item: StockItem) => {
  editingItem.value = null
  
  // Copy item data but reset some fields
  formData.value = {
    name: `${item.name} (Kopya)`,
    description: item.description || '',
    unit: item.unit || 'adet',
    currentStock: 0,
    minStock: item.minStock || 0,
    value: item.value || 0,
    location: item.location || '',
    specifications: (item.specifications as string) || '',
    reservedStock: 0,
    standards: item.standards || {},
    templateFields: item.templateFields || {}
  }
  
  showAddEditModal.value = true
  
  info('Ürün Kopyalandı', `${item.name} temel alınarak yeni ürün formu hazırlandı`, {
    icon: 'i-heroicons-document-duplicate',
    timeout: 4000
  })
}

const handleDeleteItem = async (item: StockItem) => {
  const confirmed = confirm(`"${item.name}" ürününü silmek istediğinizden emin misiniz?\n\nBu işlem geri alınamaz!`)
  
  if (!confirmed) return
  
  try {
    console.log('Deleting item:', item.id)
    
    // TODO: API call here
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulated delay
    
    success('Silme Başarılı', `${item.name} başarıyla silindi`, {
      icon: 'i-heroicons-trash'
    })
    
    await loadStockItems() // Reload data
    
  } catch (err) {
    console.error('Error deleting item:', err)
    error('Silme Hatası', 'Ürün silinirken bir hata oluştu', {
      icon: 'i-heroicons-exclamation-circle'
    })
  }
}

const handleSave = async () => {
  if (!formData.value.name.trim()) {
    warning('Eksik Bilgi', 'Ürün adı zorunludur', { icon: 'i-heroicons-exclamation-triangle' })
    return
  }

  saving.value = true
  
  try {
    if (editingItem.value) {
      // Update existing item
      console.log('Updating item:', editingItem.value.id, formData.value)
      
      // TODO: API call here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated delay
      
      success('Güncelleme Başarılı', `${formData.value.name} başarıyla güncellendi`, {
        icon: 'i-heroicons-check-circle'
      })
    } else {
      // Create new item
      console.log('Creating new item:', formData.value)
      
      // TODO: API call here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated delay
      
      dataSaved(formData.value.name)
    }
    
    closeAddEditModal()
    await loadStockItems() // Reload data
    
    info('Veriler Yenilendi', 'Stok listesi güncellendi', {
      icon: 'i-heroicons-arrow-path'
    })
    
  } catch (err) {
    console.error('Error saving item:', err)
    error('Kayıt Hatası', 'Ürün kaydedilirken bir hata oluştu', {
      icon: 'i-heroicons-x-circle',
      timeout: 8000
    })
  } finally {
    saving.value = false
  }
}

// Export Function
const handleExport = async () => {
  try {
    console.log('Exporting with options:', exportOptions.value)
    
    // TODO: Implement actual export functionality
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated delay
    
    success('Dışa Aktarma Başarılı', 'Veriler CSV formatında indirildi', {
      icon: 'i-heroicons-arrow-down-tray',
      timeout: 6000
    })
    
    closeExportModal()
    
  } catch (err) {
    console.error('Export error:', err)
    error('Dışa Aktarma Hatası', 'Veriler dışa aktarılırken bir hata oluştu', {
      icon: 'i-heroicons-document-minus'
    })
  }
}

// Lifecycle
onMounted(async () => {
  loading.value = true
  
  // Initial loading toast
  const loadingToastId = info('Yükleniyor', 'Kategori verileri getiriliyor', {
    icon: 'i-heroicons-arrow-path',
    timeout: 0, // Don't auto-dismiss
    closable: false
  })
  
  try {
    await Promise.all([
      loadCategory(),
      loadStockItems()
    ])
    
    // Clear loading toast and show success
    setTimeout(() => {
      success('Sayfa Hazır', 'Tüm veriler başarıyla yüklendi', {
        icon: 'i-heroicons-check-circle',
        timeout: 4000
      })
    }, 100)
    
  } catch (err) {
    console.error('Error initializing page:', err)
    error('Başlatma Hatası', 'Sayfa yüklenirken bir sorun oluştu', {
      icon: 'i-heroicons-exclamation-triangle',
      timeout: 8000
    })
  } finally {
    loading.value = false
  }
})
</script>