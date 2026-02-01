<template>
  <div class="min-h-screen bg-default">
    <!-- Header -->
    <div class="bg-elevated border-b border-accented">
      <div class="px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <!-- Title Section -->
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-xl bg-success/10">
              <UIcon name="i-lucide-package" class="w-6 h-6 text-success" />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-highlighted">
                Stok Yönetimi
              </h1>
              <p class="text-muted mt-1">
                Ürünlerinizi ve stok seviyelerinizi yönetin
              </p>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center gap-3">
            <UButton 
              icon="i-lucide-zap"
              color="warning"
              variant="soft"
              @click="showQuickAddModal = true"
            >
              ⚡ Hızlı Ekle
            </UButton>
            <UButton 
              to="/inventory/create"
              icon="i-lucide-plus"
              color="primary"
            >
              Yeni Ürün Ekle
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6 sm:px-6 lg:px-8">
      <!-- Incomplete Items Alert -->
      <UAlert 
        v-if="incompleteItems.length > 0"
        color="warning"
        variant="soft"
        icon="i-lucide-alert-triangle"
        class="mb-6"
      >
        <template #title>⚠️ {{ incompleteItems.length }} ürün detay bekliyor</template>
        <template #description>
          <div class="mt-2 space-y-2">
            <div v-for="item in incompleteItems.slice(0, 3)" :key="item.id" class="flex items-center justify-between">
              <span class="text-sm">
                <strong>{{ item.name }}</strong> 
                <span class="text-muted ml-2">({{ item.sku || 'SKU yok' }})</span>
              </span>
              <UButton 
                size="xs" 
                color="warning" 
                variant="solid"
                @click="navigateTo(`/inventory/${item.id}`)"
              >
                Tamamla
              </UButton>
            </div>
            <UButton 
              v-if="incompleteItems.length > 3"
              size="sm"
              color="warning"
              variant="ghost"
              class="mt-2"
              @click="showAllIncomplete = true"
            >
              Tümünü Gör ({{ incompleteItems.length }})
            </UButton>
          </div>
        </template>
      </UAlert>

      <!-- Search & Filters -->
      <UCard class="mb-6 dashboard-card">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UInput
            v-model="filters.search"
            placeholder="Ürün ara..."
            icon="i-lucide-search"
            @input="debouncedSearch"
          />
          
          <USelect
            v-model="filters.categoryId"
            :options="categoryOptions"
            placeholder="Tüm Kategoriler"
            @change="fetchStockItems"
          />
          
          <USelect
            v-model="filters.status"
            :options="statusOptions"
            placeholder="Tüm Durumlar"
            @change="fetchStockItems"
          />
          
          <UButton
            variant="outline"
            icon="i-lucide-refresh-cw"
            @click="resetFilters"
          >
            Sıfırla
          </UButton>
        </div>
      </UCard>

      <!-- Inventory Items Grid -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <SkeletonLoader 
          v-for="n in 12" 
          :key="n" 
          type="card" 
        />
      </div>

      <!-- Inventory Items List -->
      <div v-else-if="stockItems.length > 0" class="space-y-4">
        <!-- Grid View - Kompakt Kartlar -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          <div 
            v-for="item in stockItems" 
            :key="item.id"
            class="dashboard-card p-3 rounded-lg hover:shadow-md transition-all cursor-pointer relative group"
            @click="$router.push(`/inventory/${item.id}`)"
          >
            <!-- Incomplete Badge -->
            <div v-if="!item.isComplete" class="absolute top-1 left-1 z-10">
              <UBadge color="warning" variant="solid" size="xs">
                ⚠️
              </UBadge>
            </div>

            <!-- Kompakt Image -->
            <div class="mb-2 relative">
              <img 
                v-if="item.imageUrl"
                :src="item.imageUrl" 
                :alt="item.name"
                class="w-full h-20 object-cover rounded bg-elevated"
              />
              <div v-else class="w-full h-20 bg-elevated rounded flex items-center justify-center border border-accented">
                <UIcon name="i-lucide-package" class="w-8 h-8 text-muted" />
              </div>
              <!-- Quick Actions on Hover -->
              <div class="absolute inset-0 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <UButton
                  icon="i-lucide-eye"
                  size="xs"
                  color="neutral"
                  variant="solid"
                  @click.stop="viewItem(item.id)"
                />
                <UButton
                  icon="i-lucide-pencil"
                  size="xs"
                  color="info"
                  variant="solid"
                  @click.stop="editItem(item.id)"
                />
                <UButton
                  icon="i-lucide-trash-2"
                  size="xs"
                  color="error"
                  variant="solid"
                  @click.stop="deleteItem(item.id)"
                />
              </div>
            </div>

            <!-- Kompakt Content -->
            <div class="space-y-1">
              <h3 class="text-sm font-medium text-highlighted line-clamp-1">{{ item.name }}</h3>
              <p v-if="item.sku" class="text-xs text-muted font-mono truncate">{{ item.sku }}</p>
              
              <div class="flex items-center justify-between pt-1">
                <span class="text-sm font-bold text-highlighted">
                  {{ formatPrice(item.salePrice || item.price) }}
                </span>
                <span class="text-xs" :class="getStockColorClass(item.stock || item.currentStock || 0)">
                  {{ item.stock || item.currentStock || 0 }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Table View - Detaylı Tablo -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-elevated border-b border-accented">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-semibold text-muted uppercase tracking-wider">Ürün</th>
                <th class="px-3 py-2 text-left text-xs font-semibold text-muted uppercase tracking-wider">SKU</th>
                <th class="px-3 py-2 text-left text-xs font-semibold text-muted uppercase tracking-wider">Kategori</th>
                <th class="px-3 py-2 text-left text-xs font-semibold text-muted uppercase tracking-wider">Durum</th>
                <th class="px-3 py-2 text-right text-xs font-semibold text-muted uppercase tracking-wider">Fiyat</th>
                <th class="px-3 py-2 text-right text-xs font-semibold text-muted uppercase tracking-wider">Stok</th>
                <th class="px-3 py-2 text-center text-xs font-semibold text-muted uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-accented">
              <tr 
                v-for="item in stockItems" 
                :key="item.id"
                class="hover:bg-elevated/50 transition-colors cursor-pointer"
                @click="$router.push(`/inventory/${item.id}`)"
              >
                <td class="px-3 py-2">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded bg-elevated flex items-center justify-center flex-shrink-0">
                      <img v-if="item.imageUrl" :src="item.imageUrl" class="w-8 h-8 rounded object-cover" />
                      <UIcon v-else name="i-lucide-package" class="w-4 h-4 text-muted" />
                    </div>
                    <div class="min-w-0">
                      <p class="font-medium text-highlighted truncate">{{ item.name }}</p>
                      <UBadge v-if="!item.isComplete" color="warning" variant="soft" size="xs">Eksik</UBadge>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-2 font-mono text-xs text-muted">{{ item.sku || '-' }}</td>
                <td class="px-3 py-2 text-muted">{{ item.category || '-' }}</td>
                <td class="px-3 py-2">
                  <UBadge :color="getStatusColor(item.status)" size="xs">{{ item.status }}</UBadge>
                </td>
                <td class="px-3 py-2 text-right font-semibold text-highlighted">{{ formatPrice(item.salePrice || item.price) }}</td>
                <td class="px-3 py-2 text-right" :class="getStockColorClass(item.stock || item.currentStock || 0)">
                  {{ item.stock || item.currentStock || 0 }} {{ item.unit || 'adet' }}
                </td>
                <td class="px-3 py-2">
                  <div class="flex items-center justify-center gap-1" @click.stop>
                    <UButton icon="i-lucide-eye" size="xs" variant="ghost" @click="viewItem(item.id)" />
                    <UButton icon="i-lucide-pencil" size="xs" variant="ghost" color="info" @click="editItem(item.id)" />
                    <UButton icon="i-lucide-trash-2" size="xs" variant="ghost" color="error" @click="deleteItem(item.id)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-items="totalItems"
            :per-page="perPage"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
          />
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else
        icon="i-lucide-package"
        title="Henüz ürün yok"
        description="İlk ürününüzü ekleyerek başlayın."
        action-text="Ürün Ekle"
        action-icon="i-lucide-plus"
        action-color="success"
        @action="navigateTo('/inventory/create')"
      />

      <!-- View Mode Toggle -->
      <div class="fixed bottom-4 right-4">
        <UButtonGroup>
          <UButton
            icon="i-lucide-layout-grid"
            :variant="viewMode === 'grid' ? 'solid' : 'outline'"
            @click="viewMode = 'grid'"
          />
          <UButton
            icon="i-lucide-list"
            :variant="viewMode === 'table' ? 'solid' : 'outline'"
            @click="viewMode = 'table'"
          />
        </UButtonGroup>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard class="dashboard-card">
        <template #header>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-error" />
            </div>
            <h3 class="text-lg font-semibold text-error">Ürünü Sil</h3>
          </div>
        </template>

        <p class="text-default">Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showDeleteModal = false">
              İptal
            </UButton>
            <UButton color="error" :loading="deleting" @click="confirmDelete">
              Sil
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Quick Add Modal -->
    <UModal v-model="showQuickAddModal">
      <UCard class="dashboard-card">
        <template #header>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-zap" class="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-highlighted">⚡ Hızlı Ürün Ekle</h3>
              <p class="text-sm text-muted">Sadece temel bilgilerle hızlıca stok girin</p>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Ürün Adı" required>
            <UInput
              v-model="quickAddForm.name"
              placeholder="Ürün adını girin"
              autofocus
            />
          </UFormGroup>
          
          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="SKU / Stok Kodu">
              <UInput
                v-model="quickAddForm.sku"
                placeholder="ABC-123"
              />
            </UFormGroup>
            
            <UFormGroup label="Miktar">
              <UInput
                v-model.number="quickAddForm.quantity"
                type="number"
                min="0"
                placeholder="0"
              />
            </UFormGroup>
          </div>

          <UFormGroup label="Birim">
            <USelect
              v-model="quickAddForm.unit"
              :options="unitOptions"
              placeholder="Birim seçin"
            />
          </UFormGroup>

          <UFormGroup label="Notlar">
            <UTextarea
              v-model="quickAddForm.notes"
              placeholder="Opsiyonel notlar..."
              :rows="2"
            />
          </UFormGroup>

          <UAlert
            color="info"
            variant="soft"
            icon="i-lucide-info"
          >
            <template #description>
              Fiyat, raf kodu ve diğer detayları sonra ekleyebilirsiniz.
            </template>
          </UAlert>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showQuickAddModal = false">
              İptal
            </UButton>
            <UButton 
              color="warning" 
              :loading="quickAdding" 
              :disabled="!quickAddForm.name"
              @click="confirmQuickAdd"
            >
              <UIcon name="i-lucide-zap" class="w-4 h-4 mr-2" />
              Hızlı Ekle
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { StockItem } from '~/types/stock'
import { useInventory } from '~/composables/useInventory'
import { useCategoriesApi } from '~/composables/useCategoriesApi'
import { useDualToast } from '~/composables/useDualToast'

const toast = useDualToast()

// Data
const loading = ref(false)
const deleting = ref(false)
const quickAdding = ref(false)
const showDeleteModal = ref(false)
const showQuickAddModal = ref(false)
const showAllIncomplete = ref(false)
const deleteItemId = ref<string | null>(null)
const viewMode = ref<'grid' | 'table'>('grid')
const stockItems = ref<StockItem[]>([])
const incompleteItems = ref<StockItem[]>([])
const currentPage = ref(1)
const perPage = ref(24)
const totalItems = ref(0)

const filters = reactive({
  search: '',
  categoryId: '',
  status: ''
})

const quickAddForm = reactive({
  name: '',
  sku: '',
  quantity: 0,
  unit: 'pcs',
  notes: ''
})

const { fetchInventory, deleteInventoryItem, quickAdd, fetchIncompleteItems } = useInventory()
const { fetchCategories } = useCategoriesApi()

// Options
const categoryOptions = ref<{ label: string; value: string }[]>([
  { label: 'Tüm Kategoriler', value: '' }
])

const statusOptions = [
  { label: 'Tüm Durumlar', value: '' },
  { label: 'Aktif', value: 'ACTIVE' },
  { label: 'Pasif', value: 'INACTIVE' },
  { label: 'Stok Bitti', value: 'OUT_OF_STOCK' }
]

const unitOptions = [
  { label: 'Adet', value: 'pcs' },
  { label: 'Kilogram', value: 'kg' },
  { label: 'Metre', value: 'm' },
  { label: 'Metrekare', value: 'm2' },
  { label: 'Litre', value: 'lt' },
  { label: 'Paket', value: 'paket' },
  { label: 'Kutu', value: 'kutu' }
]

// perPage'i arttır - kompakt kartlar için
const perPageOptions = [24, 48, 96, 192]

// Computed
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / perPage.value)
})

// Methods
const fetchStockItems = async () => {
  loading.value = true
  try {
    const response = await fetchInventory({
      search: filters.search || undefined,
      categoryId: filters.categoryId || undefined,
      status: filters.status || undefined,
      page: currentPage.value,
      limit: perPage.value,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })

    const items = Array.isArray(response) ? response : response?.data || []
    const meta = Array.isArray(response) ? undefined : response?.meta

    stockItems.value = items.map(item => ({
      ...item,
      stock: item.stock ?? item.currentStock ?? 0,
      category: typeof item.category === 'string' ? item.category : item.category?.name || ''
    }))

    totalItems.value = meta?.total ?? stockItems.value.length
  } catch (error) {
    console.error('Error fetching inventory items:', error)
  } finally {
    loading.value = false
  }
}

const loadIncompleteItems = async () => {
  try {
    const response = await fetchIncompleteItems({ limit: 10 })
    incompleteItems.value = Array.isArray(response) ? response : response?.data || []
  } catch (error) {
    console.error('Error fetching incomplete items:', error)
  }
}

const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1
  fetchStockItems()
}, 300)

const resetFilters = () => {
  Object.assign(filters, {
    search: '',
    categoryId: '',
    status: ''
  })
  currentPage.value = 1
  fetchStockItems()
}

const getStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const normalized = status?.toLowerCase()
  const colors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    active: 'success',
    inactive: 'neutral',
    out_of_stock: 'error'
  }
  return colors[normalized] || 'neutral'
}

const getStockColorClass = (stock: number): string => {
  if (stock === 0) return 'text-error font-semibold'
  if (stock < 10) return 'text-warning font-semibold'
  return 'text-success font-semibold'
}

const formatPrice = (price: number | null | undefined): string => {
  if (price == null || price === 0) return 'Fiyat yok'
  return `₺${price.toFixed(2)}`
}

const viewItem = (id: number | string): void => {
  navigateTo(`/inventory/${id}`)
}

const editItem = (id: number | string): void => {
  navigateTo(`/inventory/${id}/edit`)
}

const deleteItem = (id: number | string): void => {
  deleteItemId.value = String(id)
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    if (!deleteItemId.value) return
    await deleteInventoryItem(deleteItemId.value)

    stockItems.value = stockItems.value.filter(item => item.id !== deleteItemId.value)
    totalItems.value = Math.max(0, totalItems.value - 1)
    showDeleteModal.value = false
    toast.success('Ürün Silindi', 'Ürün başarıyla silindi')
  } catch (error) {
    console.error('Error deleting item:', error)
    toast.error('Silme Hatası', 'Ürün silinirken bir hata oluştu')
  } finally {
    deleting.value = false
  }
}

const confirmQuickAdd = async () => {
  if (!quickAddForm.name) return
  quickAdding.value = true

  try {
    await quickAdd({
      name: quickAddForm.name,
      sku: quickAddForm.sku || undefined,
      quantity: quickAddForm.quantity || 0,
      unit: quickAddForm.unit,
      notes: quickAddForm.notes || undefined
    })

    // Reset form
    Object.assign(quickAddForm, {
      name: '',
      sku: '',
      quantity: 0,
      unit: 'pcs',
      notes: ''
    })

    showQuickAddModal.value = false
    toast.success('⚡ Hızlı Ekleme', `${quickAddForm.name || 'Ürün'} başarıyla eklendi. Detayları tamamlamayı unutmayın!`)
    
    // Refresh lists
    await fetchStockItems()
    await loadIncompleteItems()
  } catch (error) {
    console.error('Error quick adding item:', error)
    toast.error('Ekleme Hatası', 'Ürün eklenirken bir hata oluştu')
  } finally {
    quickAdding.value = false
  }
}

const handlePageChange = (page: number): void => {
  currentPage.value = page
  fetchStockItems()
}

const handlePageSizeChange = (size: number): void => {
  perPage.value = size
  currentPage.value = 1
  fetchStockItems()
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchStockItems(),
    loadIncompleteItems()
  ])
  
  fetchCategories().then(categories => {
    categoryOptions.value = [
      { label: 'Tüm Kategoriler', value: '' },
      ...categories.map(category => ({
        label: category.name,
        value: category.id
      }))
    ]
  })
})
</script>
