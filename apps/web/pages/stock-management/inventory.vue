<!-- pages/stock-management/inventory.vue -->
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Stok Sayımı</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Touch-friendly stok sayım arayüzü</p>
      </div>
      
      <!-- Stats -->
      <div class="flex gap-4">
        <div class="text-right">
          <div class="text-2xl font-bold text-primary">{{ filteredItems.length }}</div>
          <div class="text-sm text-gray-500">Toplam Ürün</div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-green-600">{{ updatedCount }}</div>
          <div class="text-sm text-gray-500">Güncellenen</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <UCard>
      <div class="space-y-4">
        <!-- Search -->
        <UInput 
          v-model="search"
          placeholder="Ürün ara..."
          icon="i-lucide-search"
          size="lg"
          clearable
        />
        
        <!-- Category Filter -->
        <div class="flex gap-2 flex-wrap">
          <UButton 
            v-for="category in categories"
            :key="category.id"
            :variant="selectedCategory === category.id ? 'solid' : 'outline'"
            size="sm"
            @click="selectedCategory = category.id"
          >
            {{ category.name }}
            <UBadge 
              v-if="category.id !== 'all'" 
              variant="soft" 
              size="xs" 
              class="ml-1"
            >
              {{ getCategoryCount(category.id) }}
            </UBadge>
          </UButton>
        </div>
        
        <!-- Stock Status Filter -->
        <div class="flex gap-2">
          <UButton
            :variant="statusFilter === 'all' ? 'solid' : 'outline'"
            size="sm"
            @click="statusFilter = 'all'"
          >
            Tümü
          </UButton>
          <UButton
            :variant="statusFilter === 'low' ? 'solid' : 'outline'"
            size="sm"
            color="red"
            @click="statusFilter = 'low'"
          >
            Az Stok
            <UBadge color="red" variant="soft" size="xs" class="ml-1">
              {{ getLowStockCount() }}
            </UBadge>
          </UButton>
          <UButton
            :variant="statusFilter === 'normal' ? 'solid' : 'outline'"
            size="sm"
            color="green"
            @click="statusFilter = 'normal'"
          >
            Normal
          </UButton>
          <UButton
            :variant="statusFilter === 'high' ? 'solid' : 'outline'"
            size="sm"
            color="blue"
            @click="statusFilter = 'high'"
          >
            Fazla Stok
          </UButton>
        </div>
      </div>
    </UCard>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary" />
    </div>
    
    <!-- Inventory Grid -->
    <div v-else-if="displayedItems.length > 0" class="space-y-4">
      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StockCountCard 
          v-for="item in displayedItems" 
          :key="item.id"
          :item="item"
          :model-value="stockEntries[item.id]"
          @update="updateStock"
        />
      </div>
      
      <!-- Load More -->
      <div v-if="hasMore" class="text-center">
        <UButton 
          @click="loadMore"
          variant="outline"
          :loading="loadingMore"
          icon="i-lucide-chevron-down"
        >
          Daha Fazla Yükle ({{ remainingCount }} kaldı)
        </UButton>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <UIcon name="i-lucide-package-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {{ search || selectedCategory !== 'all' ? 'Arama sonucu bulunamadı' : 'Henüz ürün yok' }}
      </h3>
      <p class="text-gray-500 mb-4">
        {{ search || selectedCategory !== 'all' ? 'Farklı arama terimleri deneyin' : 'Önce veri import sayfasından ürünleri yükleyin' }}
      </p>
      <UButton 
        v-if="!search && selectedCategory === 'all'"
        to="/stock-management/data-import"
        icon="i-lucide-download"
      >
        Veri Import Et
      </UButton>
      <UButton 
        v-else
        @click="clearFilters"
        variant="outline"
        icon="i-lucide-x"
      >
        Filtreleri Temizle
      </UButton>
    </div>
    
    <!-- Auto-save Indicator -->
    <div 
      v-if="autoSaving"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
    >
      <UIcon name="i-lucide-save" class="w-4 h-4" />
      Otomatik kaydediliyor...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useInventoryCount } from '~/composables/useInventoryCount'
import StockCountCard from '~/components/stock/StockCountCard.vue'

// Page setup
definePageMeta({
  middleware: 'auth',
  title: 'Stok Sayımı'
})

useHead({
  title: 'Stok Sayımı - Stok Yönetimi'
})

// Composables
const { 
  search,
  selectedCategory,
  stockItems,
  filteredItems,
  categories,
  stockEntries,
  loading,
  loadStockData,
  updateStock: updateStockEntry,
  loadSavedEntries,
  getStockStatus
} = useInventoryCount()

// Local state
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 20
const loadingMore = ref(false)
const autoSaving = ref(false)

// Computed
const statusFilteredItems = computed(() => {
  if (statusFilter.value === 'all') return filteredItems.value
  
  return filteredItems.value.filter(item => {
    const status = getStockStatus(item)
    return status === statusFilter.value
  })
})

const displayedItems = computed(() => {
  const endIndex = currentPage.value * itemsPerPage
  return statusFilteredItems.value.slice(0, endIndex)
})

const hasMore = computed(() => {
  return displayedItems.value.length < statusFilteredItems.value.length
})

const remainingCount = computed(() => {
  return statusFilteredItems.value.length - displayedItems.value.length
})

const updatedCount = computed(() => {
  return Object.keys(stockEntries).filter(key => {
    const entry = stockEntries[key]
    return entry && (entry.current > 0 || entry.min > 0)
  }).length
})

// Methods
const getCategoryCount = (categoryId: string) => {
  return stockItems.value.filter(item => item.category === categoryId).length
}

const getLowStockCount = () => {
  return stockItems.value.filter(item => getStockStatus(item) === 'low').length
}

const updateStock = (itemId: string, field: 'current' | 'min', value: number) => {
  updateStockEntry(itemId, field, value)
  
  // Show auto-save indicator
  autoSaving.value = true
  setTimeout(() => {
    autoSaving.value = false
  }, 1500)
}

const loadMore = () => {
  loadingMore.value = true
  setTimeout(() => {
    currentPage.value += 1
    loadingMore.value = false
  }, 500)
}

const clearFilters = () => {
  search.value = ''
  selectedCategory.value = 'all'
  statusFilter.value = 'all'
}

// Watch for filter changes and reset pagination
watch([search, selectedCategory, statusFilter], () => {
  currentPage.value = 1
})

onMounted(() => {
  loadStockData()
  loadSavedEntries()
})
</script>
