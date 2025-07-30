<!-- apps/web/pages/stock-management/inventory.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Stok Sayımı
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Ürünlerin stok miktarlarını güncelleyin
        </p>
      </div>
      
      <!-- Stats -->
      <div class="flex items-center gap-4 text-sm">
        <div class="text-center">
          <div class="font-semibold text-lg">{{ filteredItems.length }}</div>
          <div class="text-gray-500">Toplam Ürün</div>
        </div>
        <div class="text-center">
          <div class="font-semibold text-lg text-green-600">{{ updatedCount }}</div>
          <div class="text-gray-500">Güncellenen</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <UCard>
      <div class="space-y-4">
        <!-- Search -->
        <UInput
          v-model="search"
          placeholder="Ürün ara... (ad, açıklama, kategori)"
          icon="i-lucide-search"
          size="lg"
          :loading="loading"
        />
        
        <!-- Category and Status Filters -->
        <div class="flex flex-wrap gap-2">
          <!-- Categories -->
          <UButton
            v-for="category in categories"
            :key="category.id"
            :variant="selectedCategory === category.id ? 'solid' : 'outline'"
            :color="selectedCategory === category.id ? 'primary' : 'neutral'"
            size="sm"
            @click="selectedCategory = category.id"
          >
            {{ category.name }}
            <UBadge 
              v-if="category.count > 0"
              :color="selectedCategory === category.id ? 'neutral' : 'primary'"
              :variant="selectedCategory === category.id ? 'solid' : 'soft'"
              size="xs"
              class="ml-1"
            >
              {{ category.count }}
            </UBadge>
          </UButton>
        </div>
        
        <!-- Status Filter -->
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
            color="error"
            size="sm"
            @click="statusFilter = 'low'"
          >
            Düşük Stok
          </UButton>
          <UButton
            :variant="statusFilter === 'medium' ? 'solid' : 'outline'"
            color="warning"
            size="sm"
            @click="statusFilter = 'medium'"
          >
            Orta Stok
          </UButton>
          <UButton
            :variant="statusFilter === 'high' ? 'solid' : 'outline'"
            color="success"
            size="sm"
            @click="statusFilter = 'high'"
          >
            Yeterli Stok
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Inventory Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="n in 6" 
        :key="n"
        class="animate-pulse"
      >
        <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
    
    <div v-else-if="displayedItems.length > 0" class="space-y-4">
      <!-- Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StockCountCard 
          v-for="item in displayedItems" 
          :key="item.id"
          :item="item"
          :stock-entry="stockEntries[item.id]"
          @update="updateStock"
        />
      </div>
      
      <!-- Load More -->
      <div 
        v-if="hasMore" 
        class="text-center py-6"
      >
        <UButton 
          @click="loadMore"
          :loading="loadingMore"
          variant="outline"
          size="lg"
        >
          {{ remainingCount }} ürün daha yükle
        </UButton>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <UIcon name="i-lucide-package-search" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
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
import type { StockItem } from '~/types/stock'

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
  autoSaving,
  loadStockData,
  loadSavedEntries,
  updateStock: updateStockEntry,
  getStockStatus,
  clearFilters
} = useInventoryCount()

// Local state
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 20
const loadingMore = ref(false)

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
  return Object.keys(stockEntries).length
})

// Methods
const updateStock = async (itemId: string, newStock: number) => {
  try {
    await updateStockEntry(itemId, newStock)
  } catch (error) {
    console.error('Stok güncelleme hatası:', error)
    // TODO: Show error toast
  }
}

const loadMore = () => {
  loadingMore.value = true
  setTimeout(() => {
    currentPage.value++
    loadingMore.value = false
  }, 500)
}

// Reset pagination when filters change
watch([search, selectedCategory, statusFilter], () => {
  currentPage.value = 1
})

// Load data on mount
onMounted(async () => {
  await loadStockData()
  loadSavedEntries()
})
</script>