<!-- pages/categories/[id]/index.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div v-if="loading" class="animate-pulse">
      <div class="h-10 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
      <div class="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded-lg mt-2"></div>
    </div>

    <div v-else-if="category" class="flex items-center justify-between">
      <div>
        <div class="flex items-center gap-3">
          <div 
            class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
            :style="{ backgroundColor: category.color }"
          >
            <UIcon :name="category.icon || 'i-lucide-folder'" class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">{{ category.name }}</h1>
            <div class="flex items-center gap-2 mt-1">
              <p class="text-neutral-600 dark:text-neutral-400">{{ category.description }}</p>
              <UBadge 
                v-if="category.isSystemBased"
                color="primary" 
                variant="soft" 
                size="xs"
              >
                Template
              </UBadge>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex gap-2">
        <UButton 
          to="/categories"
          variant="ghost"
          icon="i-lucide-arrow-left"
        >
          Geri Dön
        </UButton>
        
        <UButton 
          @click="openEditModal"
          variant="soft"
          color="primary"
          icon="i-lucide-edit"
        >
          Düzenle
        </UButton>
      </div>
    </div>

    <div v-if="!loading && !category" class="text-center py-12">
      <UIcon name="i-lucide-folder-x" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">Kategori Bulunamadı</h3>
      <p class="text-neutral-600 dark:text-neutral-400 mb-6">
        Bu kategori mevcut değil veya erişim izniniz yok
      </p>
      <UButton to="/categories" icon="i-lucide-arrow-left">
        Kategorilere Dön
      </UButton>
    </div>

    <!-- Quick Stats -->
    <div v-if="category" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-package" class="w-8 h-8 text-primary mx-auto" />
          <div class="text-2xl font-bold text-neutral-900 dark:text-white">{{ stockItems.length }}</div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">Toplam Ürün</div>
        </div>
      </UCard>
      
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-gauge" class="w-8 h-8 text-green-500 mx-auto" />
          <div class="text-2xl font-bold text-green-600">{{ stockWithQty }}</div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">Stokta Mevcut</div>
        </div>
      </UCard>
      
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-check-square" class="w-8 h-8 text-blue-500 mx-auto" />
          <div class="text-2xl font-bold text-blue-600">{{ standardCount }}</div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">Standart</div>
        </div>
      </UCard>
    </div>

    <!-- Stock Management -->
    <div v-if="category" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Stok Yönetimi</h2>
        
        <div class="flex gap-2">
          <UInput
            v-model="searchTerm"
            placeholder="Ürün ara..."
            icon="i-lucide-search"
            size="sm"
            class="w-64"
          />
          
          <UButton 
            @click="openCreateModal"
            color="primary"
            icon="i-lucide-plus"
          >
            Yeni Ekle
          </UButton>
        </div>
      </div>

      <!-- Table View -->
      <UCard>
        <div v-if="loading" class="animate-pulse space-y-4">
          <div class="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
          <div v-for="i in 5" :key="i" class="h-14 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
        </div>

        <UTable
          v-else
          :columns="tableColumns"
          :rows="filteredItems"
          :loading="loading"
          :empty-state="{ icon: 'i-lucide-package-x', label: 'Henüz ürün yok', description: 'Bu kategoriye ait ürün bulunmuyor. Yeni bir ürün ekleyin.' }"
        >
          <!-- Custom render for name column -->
          <template #name-data="{ row }">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-package" class="flex-shrink-0 w-5 h-5 text-neutral-500" />
              <span class="font-medium text-neutral-900 dark:text-white">{{ row.original.name }}</span>
            </div>
          </template>

          <!-- Custom render for stock column -->
          <template #stock-data="{ row }">
            <UBadge
              :color="row.original.currentStock > 0 ? 'success' : 'neutral'"
              :variant="row.original.currentStock > 0 ? 'soft' : 'outline'"
              size="sm"
            >
              {{ row.original.currentStock }} {{ row.original.unit }}
            </UBadge>
          </template>

          <!-- Custom render for actions column -->
          <template #actions-data="{ row }">
            <div class="flex items-center gap-2">
              <UButton
                icon="i-lucide-edit"
                color="neutral"
                variant="ghost"
                size="xs"
                @click="editItem(row.original)"
              />
              <UButton
                icon="i-lucide-trash-2"
                color="error"
                variant="ghost"
                size="xs"
                @click="confirmDelete(row.original)"
              />
            </div>
          </template>
        </UTable>

        <template #footer>
          <div class="flex justify-between items-center">
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ filteredItems.length }} üründen {{ Math.min(page * pageSize, filteredItems.length) }} gösteriliyor
            </p>
            
            <UPagination
              v-model="page"
              :page-count="Math.ceil(filteredItems.length / pageSize)"
              :total="filteredItems.length"
              class="rounded-full"
              size="sm"
            />
          </div>
        </template>
      </UCard>
    </div>

    <!-- Edit Category Modal -->
    <UModal v-model="showEditModal" class="md:max-w-2xl">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-edit" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">Kategori Düzenle</h3>
          </div>
        </template>
        
        <div class="space-y-4">
          <!-- Category form here -->
        </div>
        
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton @click="showEditModal = false" variant="ghost">İptal</UButton>
            <UButton color="primary" @click="updateCategory" :loading="updating">Kaydet</UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Create/Edit Stock Item Modal -->
    <UModal v-model="showItemModal" class="md:max-w-3xl">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon :name="editingItem ? 'i-lucide-edit' : 'i-lucide-plus'" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">{{ editingItem ? 'Ürün Düzenle' : 'Yeni Ürün Ekle' }}</h3>
          </div>
        </template>
        
        <div class="space-y-4">
          <!-- General Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-1">Ürün Adı*</label>
              <UInput v-model="itemForm.name" placeholder="Ürün adı girin" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-1">Birim*</label>
              <USelect
                v-model="itemForm.unit"
                :options="unitOptions"
                placeholder="Birim seçin"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-1">Açıklama</label>
            <UTextarea v-model="itemForm.description" placeholder="Ürün açıklaması..." :rows="3" />
          </div>

          <!-- Stock Information -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-1">Mevcut Stok</label>
              <UInput v-model="itemForm.currentStock" placeholder="0" type="number" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-1">Minimum Stok</label>
              <UInput v-model="itemForm.minStock" placeholder="0" type="number" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-1">Stok Değeri (₺)</label>
              <UInput v-model="itemForm.value" placeholder="0" type="number" />
            </div>
          </div>

          <!-- Dynamic Standard Fields -->
          <div v-if="category?.templateInfo?.standards?.length">
            <h4 class="text-md font-semibold text-neutral-900 dark:text-white mb-3">Standart Özellikler</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="standard in category.templateInfo.standards" :key="standard.id">
                <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-1">
                  {{ standard.name }}
                </label>
                <USelect
                  v-model="itemForm.standards[standard.id]"
                  :options="standardValueOptions(standard.id)"
                  placeholder="Seçim yapın"
                />
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton @click="showItemModal = false" variant="ghost">İptal</UButton>
            <UButton color="primary" @click="saveItem" :loading="savingItem">Kaydet</UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Delete Confirmation -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2 text-error-500">
            <UIcon name="i-lucide-trash-2" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">Ürün Sil</h3>
          </div>
        </template>
        
        <p>
          <span class="font-bold">{{ itemToDelete?.name }}</span> adlı ürünü silmek istediğinize emin misiniz?
          Bu işlem geri alınamaz.
        </p>
        
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton @click="showDeleteModal = false" variant="ghost">İptal</UButton>
            <UButton color="error" @click="deleteItem" :loading="deleting">Sil</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCategoriesApi } from '~/composables/useCategoriesApi'
import { useDualToast } from '~/composables/useDualToast'
import type { TableColumn } from '@nuxt/ui'

// Page meta
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

// Interface
interface StockItem {
  id: string
  name: string
  description?: string
  unit: string
  currentStock: number
  minStock: number
  value?: number
  standards: Record<string, string>
  categoryId: string
}

interface ItemForm {
  name: string
  description: string
  unit: string
  currentStock: number
  minStock: number
  value: number
  standards: Record<string, string>
}

// Composables
const route = useRoute()
const config = useRuntimeConfig()
const { getCategory } = useCategoriesApi()
const { success, error } = useDualToast()

// State
const loading = ref(true)
const category = ref<any>(null)
const stockItems = ref<StockItem[]>([])
const searchTerm = ref('')
const page = ref(1)
const pageSize = ref(10)

// Modal states
const showEditModal = ref(false)
const showItemModal = ref(false)
const showDeleteModal = ref(false)
const editingItem = ref<StockItem | null>(null)
const itemToDelete = ref<StockItem | null>(null)
const updating = ref(false)
const savingItem = ref(false)
const deleting = ref(false)

// Get category ID from route
const categoryId = computed(() => route.params.id as string)

// Form state
// Form state
const itemForm = ref<ItemForm>({
  name: '',
  description: '',
  unit: 'm²',
  currentStock: 0,
  minStock: 0,
  value: 0,
  standards: {}
})

// Table config
const tableColumns: TableColumn<StockItem>[] = [
  { accessorKey: 'name', header: 'Ürün Adı' },
  { accessorKey: 'description', header: 'Açıklama' },
  { accessorKey: 'unit', header: 'Birim' },
  { accessorKey: 'currentStock', header: 'Stok' },
  { accessorKey: 'value', header: 'Değer' },
  { id: 'actions', header: 'İşlemler' }
]

// Options
const unitOptions = [
  { label: 'Metrekare (m²)', value: 'm²' },
  { label: 'Metre (m)', value: 'm' },
  { label: 'Adet', value: 'adet' },
  { label: 'Kilogram (kg)', value: 'kg' },
  { label: 'Litre (L)', value: 'L' }
]

// Computed
const filteredItems = computed(() => {
  if (!searchTerm.value) return stockItems.value
  
  const search = searchTerm.value.toLowerCase()
  return stockItems.value.filter(item => 
    item.name.toLowerCase().includes(search) ||
    item.description?.toLowerCase().includes(search)
  )
})

const stockWithQty = computed(() => {
  return stockItems.value.filter(item => item.currentStock > 0).length
})

const standardCount = computed(() => {
  return category.value?.templateInfo?.standards?.length || 0
})

// Methods
const loadCategory = async () => {
  loading.value = true
  try {
    const data = await getCategory(categoryId.value)
    if (data) {
      category.value = data
      await loadStockItems()
    } else {
      error('Hata', 'Kategori bulunamadı')
    }
  } catch (err: any) {
    console.error('Category load error:', err)
    error('Hata', err.message || 'Kategori yüklenirken bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const loadStockItems = async () => {
  try {
    console.log('Loading stock items for category:', categoryId.value)
    
    // Stock items API çağrısı
    const items = await $fetch(`${config.public.apiBase}/stock-items/category/${categoryId.value}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    })
    
    console.log('Stock items API response:', items)
    
    if (Array.isArray(items)) {
      // API'den gelen verileri uygun formata dönüştür
      stockItems.value = items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        unit: item.unit || 'adet',
        currentStock: item.currentStock || 0,
        minStock: item.minStockLevel || 0,
        value: item.lastPurchasePrice || 0,
        standards: item.customProperties || {},
        categoryId: categoryId.value
      }))
    } else {
      stockItems.value = []
    }
  } catch (err: any) {
    console.error('Stock items load error:', err)
    stockItems.value = []
  }
}

const standardValueOptions = (standardId: string) => {
  // Burada gerçek standardın olası değerlerini döndürün
  // Örnek olarak bazı değerler
  const options: Record<string, Array<{label: string, value: string}>> = {
    material: [
      { label: 'ST37', value: 'st37' },
      { label: 'ST52', value: 'st52' },
      { label: 'Paslanmaz', value: 'stainless' }
    ],
    coating: [
      { label: 'Galvaniz', value: 'galvaniz' },
      { label: 'Siyah', value: 'siyah' },
      { label: 'Boyalı', value: 'painted' }
    ],
    type: [
      { label: 'PVC', value: 'pvc' },
      { label: 'PTFE', value: 'ptfe' },
      { label: 'ETFE', value: 'etfe' }
    ],
    weight: [
      { label: '650gr', value: '650gr' },
      { label: '850gr', value: '850gr' },
      { label: '1050gr', value: '1050gr' }
    ]
  }
  
  return options[standardId] || []
}

// UI Actions
const openEditModal = () => {
  // Form değerlerini mevcut kategori ile doldur
  showEditModal.value = true
}

const updateCategory = async () => {
  updating.value = true
  try {
    // Kategori güncelleme mantığı
    await new Promise(resolve => setTimeout(resolve, 800)) // API çağrısı simülasyonu
    
    success('Başarılı', 'Kategori başarıyla güncellendi')
    showEditModal.value = false
  } catch (err: any) {
    error('Hata', err.message || 'Kategori güncellenirken bir hata oluştu')
  } finally {
    updating.value = false
  }
}

const openCreateModal = () => {
  editingItem.value = null
  // Form değerlerini sıfırla
  itemForm.value = {
    name: '',
    description: '',
    unit: 'm²',
    currentStock: 0,
    minStock: 0,
    value: 0,
    standards: {}
  }
  
  // Kategori standartları için varsayılan değerler
  if (category.value?.templateInfo?.standards) {
    category.value.templateInfo.standards.forEach((standard: { id: string }) => {
      itemForm.value.standards[standard.id] = ''
    })
  }
  
  showItemModal.value = true
}

const editItem = (item: StockItem) => {
  editingItem.value = item
  
  // Form değerlerini seçilen ürün ile doldur
  itemForm.value = {
    name: item.name,
    description: item.description || '',
    unit: item.unit,
    currentStock: item.currentStock,
    minStock: item.minStock,
    value: item.value || 0,
    standards: { ...item.standards }
  }
  
  showItemModal.value = true
}

const saveItem = async () => {
  savingItem.value = true
  try {
    // Ürün kaydetme mantığı
    await new Promise(resolve => setTimeout(resolve, 800)) // API çağrısı simülasyonu
    
    if (editingItem.value) {
      // Mevcut öğeyi güncelle
      const index = stockItems.value.findIndex(item => item.id === editingItem.value!.id)
      if (index !== -1) {
        stockItems.value[index] = {
          ...editingItem.value,
          ...itemForm.value
        }
      }
      success('Başarılı', 'Ürün başarıyla güncellendi')
    } else {
      // Yeni öğe ekle
      const newItem: StockItem = {
        id: `new-${Date.now()}`,
        ...itemForm.value,
        categoryId: categoryId.value
      }
      stockItems.value.push(newItem)
      success('Başarılı', 'Yeni ürün başarıyla eklendi')
    }
    
    showItemModal.value = false
  } catch (err: any) {
    error('Hata', err.message || 'Ürün kaydedilirken bir hata oluştu')
  } finally {
    savingItem.value = false
  }
}

const confirmDelete = (item: StockItem) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const deleteItem = async () => {
  if (!itemToDelete.value) return
  
  deleting.value = true
  try {
    // Ürün silme mantığı
    await new Promise(resolve => setTimeout(resolve, 800)) // API çağrısı simülasyonu
    
    // Ürünü listeden kaldır
    stockItems.value = stockItems.value.filter(item => item.id !== itemToDelete.value!.id)
    
    success('Başarılı', 'Ürün başarıyla silindi')
    showDeleteModal.value = false
  } catch (err: any) {
    error('Hata', err.message || 'Ürün silinirken bir hata oluştu')
  } finally {
    deleting.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadCategory()
})

// SEO
useSeoMeta({
  title: () => category.value ? `${category.value.name} - Stok Yönetimi` : 'Kategori Detayı',
  description: () => category.value?.description || 'Kategori stok yönetimi'
})
</script>
