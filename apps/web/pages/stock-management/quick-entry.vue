<!-- apps/web/pages/stock-management/quick-entry.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Hızlı Stok Girişi</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">Ürünleri hızlıca seçip stok bilgilerini girin</p>
      </div>
    </div>

    <!-- Product Selection -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-search" class="w-5 h-5" />
          <h2 class="text-lg font-semibold">Ürün Seçimi</h2>
        </div>
      </template>
      
      <div class="space-y-4">
        <!-- Search Input -->
        <UInput
          v-model="searchTerm"
          placeholder="Ürün ara ve Enter'a basarak seç..."
          icon="i-lucide-search"
          size="lg"
          @keydown.enter="addSelectedProduct"
        />
        
        <!-- Search Results -->
        <div 
          v-if="searchResults.length > 0 && searchTerm"
          class="border rounded-lg max-h-60 overflow-y-auto"
        >
          <div
            v-for="item in searchResults.slice(0, 10)"
            :key="item.id"
            class="p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer border-b last:border-b-0"
            @click="selectProduct(item)"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium">{{ item.name }}</div>
                <div class="text-sm text-neutral-500">{{ item.description }}</div>
              </div>
              <UBadge variant="soft" size="sm">{{ item.category }}</UBadge>
            </div>
          </div>
        </div>
        
        <!-- Category Filter -->
        <div class="flex gap-2 flex-wrap">
          <UButton 
            v-for="category in categories"
            :key="category.id"
            :variant="selectedCategory === category.id ? 'solid' : 'outline'"
            size="sm"
            @click="filterByCategory(category.id)"
          >
            {{ category.name }}
          </UButton>
        </div>
      </div>
    </UCard>
    
    <!-- Selected Items -->
    <div v-if="selectedItems.length > 0">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
          Seçilen Ürünler ({{ selectedItems.length }})
        </h3>
        <UButton 
          @click="clearAllSelections"
          variant="outline"
          color="error"
          size="sm"
        >
          Tümünü Temizle
        </UButton>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <UCard 
          v-for="item in selectedItems" 
          :key="item.id"
          class="relative"
        >
          <!-- Remove Button -->
          <UButton
            @click="removeSelectedItem(item.id)"
            icon="i-lucide-x"
            size="xs"
            color="error"
            variant="ghost"
            class="absolute top-2 right-2"
          />
          
          <div class="pr-8">
            <h4 class="font-semibold text-sm mb-1">{{ item.name }}</h4>
            <p class="text-xs text-neutral-500 mb-3 line-clamp-2">{{ item.description }}</p>
            
            <!-- Stock Entry -->
            <div class="grid grid-cols-2 gap-3">
              <UFormField label="Mevcut Stok" size="sm">
                <UInput 
                  v-model.number="stockEntries[item.id].current"
                  type="number"
                  placeholder="0"
                  size="sm"
                  class="text-center"
                  @focus="$event.target.select()"
                />
              </UFormField>
              
              <UFormField label="Min. Stok" size="sm">
                <UInput 
                  v-model.number="stockEntries[item.id].min"
                  type="number"
                  :placeholder="item.stockInfo?.defaultMinStock?.toString() || '0'"
                  size="sm"
                  class="text-center"
                  @focus="$event.target.select()"
                />
              </UFormField>
            </div>
            
            <!-- Quick Presets -->
            <div class="flex gap-1 mt-2">
              <UButton 
                v-for="preset in [10, 50, 100]"
                :key="preset"
                @click="setStock(item.id, preset)"
                size="xs"
                variant="outline"
              >
                {{ preset }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>
    
    <!-- Bulk Save -->
    <div v-if="selectedItems.length > 0" class="sticky bottom-4">
      <UCard class="bg-white dark:bg-neutral-900 shadow-lg border-2 border-primary-200 dark:border-primary-800">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-semibold">{{ selectedItems.length }} ürün seçildi</div>
            <div class="text-sm text-neutral-500">Tüm stok bilgilerini kaydet</div>
          </div>
          <div class="flex gap-2">
            <UButton 
              @click="fillAllMinStock"
              variant="outline"
              icon="i-lucide-wand-2"
            >
              Min. Stokları Doldur
            </UButton>
            <UButton 
              @click="saveAllStocks" 
              size="lg" 
              :loading="saving"
              :disabled="!hasValidEntries"
              icon="i-lucide-save"
            >
              Tümünü Kaydet
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
    
    <!-- Empty State -->
    <div v-if="selectedItems.length === 0" class="text-center py-12">
      <UIcon name="i-lucide-package-search" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        Henüz ürün seçilmedi
      </h3>
      <p class="text-neutral-500 mb-4">
        Yukarıdaki arama kutusunu kullanarak ürün arayın ve seçin
      </p>
      <UButton @click="loadRandomProducts" variant="outline">
        Örnek Ürünler Yükle
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useInventoryCount } from '~/composables/useInventoryCount'
import type { StockItem } from '~/types/stock'

// Page setup
definePageMeta({
  middleware: 'auth',
  title: 'Hızlı Stok Girişi'
})

useHead({
  title: 'Hızlı Stok Girişi - Stok Yönetimi'
})

// Composables
const { 
  stockItems, 
  categories, 
  stockEntries, 
  loadStockData, 
  saveAllStocks: saveStocks
} = useInventoryCount()

// Local state
const searchTerm = ref('')
const selectedCategory = ref('all')
const selectedItems = ref<StockItem[]>([])
const saving = ref(false)

// Search results
const searchResults = computed(() => {
  if (!searchTerm.value) return []
  
  let items = stockItems.value
  
  // Category filter
  if (selectedCategory.value !== 'all') {
    items = items.filter(item => item.category === selectedCategory.value)
  }
  
  // Search filter
  const searchLower = searchTerm.value.toLowerCase()
  return items.filter(item => 
    item.name.toLowerCase().includes(searchLower) ||
    item.description?.toLowerCase().includes(searchLower)
  ).filter(item => !selectedItems.value.find(selected => selected.id === item.id))
})

// Validation
const hasValidEntries = computed(() => {
  return selectedItems.value.some(item => {
    const entry = stockEntries[item.id]
    return entry && (entry.current > 0 || entry.min > 0)
  })
})

// Methods
const selectProduct = (item: StockItem) => {
  if (!selectedItems.value.find(selected => selected.id === item.id)) {
    selectedItems.value.push(item)
    
    // Initialize stock entry
    if (!stockEntries[item.id]) {
      stockEntries[item.id] = {
        current: 0,
        min: item.stockInfo?.defaultMinStock || 0
      }
    }
    
    searchTerm.value = ''
  }
}

const addSelectedProduct = () => {
  if (searchResults.value.length > 0) {
    selectProduct(searchResults.value[0])
  }
}

const removeSelectedItem = (itemId: string) => {
  selectedItems.value = selectedItems.value.filter(item => item.id !== itemId)
  delete stockEntries[itemId]
}

const clearAllSelections = () => {
  selectedItems.value = []
  Object.keys(stockEntries).forEach(key => delete stockEntries[key])
}

const filterByCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const setStock = (itemId: string, amount: number) => {
  if (stockEntries[itemId]) {
    stockEntries[itemId].current = amount
  }
}

const fillAllMinStock = () => {
  selectedItems.value.forEach(item => {
    if (stockEntries[item.id]) {
      stockEntries[item.id].min = item.stockInfo?.defaultMinStock || 10
    }
  })
}

const saveAllStocks = async () => {
  saving.value = true
  try {
    await saveStocks(selectedItems.value)
    
    // Show success message
    console.log('Stoklar başarıyla kaydedildi!')
    
    // Clear selections after save
    clearAllSelections()
  } catch (error) {
    console.error('Kaydetme hatası:', error)
  } finally {
    saving.value = false
  }
}

const loadRandomProducts = () => {
  // Load first 5 products as example
  const randomItems = stockItems.value.slice(0, 5)
  randomItems.forEach(item => selectProduct(item))
}

// Watch for changes
watch(selectedItems, (newItems) => {
  // Initialize stock entries for new items
  newItems.forEach(item => {
    if (!stockEntries[item.id]) {
      stockEntries[item.id] = {
        current: 0,
        min: item.stockInfo?.defaultMinStock || 0
      }
    }
  })
}, { deep: true })

onMounted(() => {
  loadStockData()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>