<!-- pages/stock-management/index.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Stok Yönetimi Dashboard</h1>
      <p class="text-neutral-600 dark:text-neutral-400 mt-1">Stok durumu, import işlemleri ve sayım yönetimi</p>
    </div>
    
    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-package" class="w-8 h-8 text-primary mx-auto" />
          <div class="text-2xl font-bold text-neutral-900 dark:text-white">{{ totalProducts }}</div>
          <div class="text-sm text-neutral-500">Toplam Ürün</div>
        </div>
      </UCard>
      
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-alert-triangle" class="w-8 h-8 text-red-500 mx-auto" />
          <div class="text-2xl font-bold text-red-600">{{ lowStockCount }}</div>
          <div class="text-sm text-neutral-500">Az Stok</div>
        </div>
      </UCard>
      
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-trending-up" class="w-8 h-8 text-green-500 mx-auto" />
          <div class="text-2xl font-bold text-green-600">{{ updatedToday }}</div>
          <div class="text-sm text-neutral-500">Bugün Güncellenen</div>
        </div>
      </UCard>
      
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-layers" class="w-8 h-8 text-blue-500 mx-auto" />
          <div class="text-2xl font-bold text-blue-600">{{ totalCategories }}</div>
          <div class="text-sm text-neutral-500">Kategori</div>
        </div>
      </UCard>
    </div>
    
    <!-- Quick Actions -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-zap" class="w-5 h-5" />
          <h2 class="text-lg font-semibold">Hızlı İşlemler</h2>
        </div>
      </template>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink 
          to="/stock-management/data-import"
          class="group block p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
        >
          <div class="text-center space-y-2">
            <UIcon name="i-lucide-download" class="w-8 h-8 text-neutral-400 group-hover:text-primary mx-auto" />
            <div class="font-semibold text-neutral-900 dark:text-white">Veri Import</div>
            <div class="text-sm text-neutral-500">JSON verilerini sisteme aktar</div>
          </div>
        </NuxtLink>
        
        <NuxtLink 
          to="/stock-management/quick-entry"
          class="group block p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
        >
          <div class="text-center space-y-2">
            <UIcon name="i-lucide-edit" class="w-8 h-8 text-neutral-400 group-hover:text-primary mx-auto" />
            <div class="font-semibold text-neutral-900 dark:text-white">Hızlı Giriş</div>
            <div class="text-sm text-neutral-500">Ürünleri seç ve stok gir</div>
          </div>
        </NuxtLink>
        
        <NuxtLink 
          to="/stock-management/inventory"
          class="group block p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
        >
          <div class="text-center space-y-2">
            <UIcon name="i-lucide-clipboard-check" class="w-8 h-8 text-neutral-400 group-hover:text-primary mx-auto" />
            <div class="font-semibold text-neutral-900 dark:text-white">Stok Sayımı</div>
            <div class="text-sm text-neutral-500">Touch-friendly sayım</div>
          </div>
        </NuxtLink>
      </div>
    </UCard>
    
    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Low Stock Alert -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-red-500" />
              <h3 class="font-semibold">Az Stok Uyarısı</h3>
            </div>
            <UBadge color="error" variant="soft">{{ lowStockItems.length }}</UBadge>
          </div>
        </template>
        
        <div class="space-y-2 max-h-60 overflow-y-auto">
          <div 
            v-for="item in lowStockItems.slice(0, 5)" 
            :key="item.id"
            class="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded"
          >
            <div class="flex-1 min-w-0">
              <div class="font-medium text-sm truncate">{{ item.name }}</div>
              <div class="text-xs text-neutral-500">{{ item.category }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-red-600">{{ getStockCount(item) }}</div>
              <div class="text-xs text-neutral-500">mevcut</div>
            </div>
          </div>
          
          <div v-if="lowStockItems.length === 0" class="text-center py-4 text-neutral-500">
            🎉 Tüm stoklar yeterli seviyede!
          </div>
          
          <div v-if="lowStockItems.length > 5" class="text-center pt-2">
            <NuxtLink 
              to="/stock-management/inventory?filter=low"
              class="text-sm text-primary hover:underline"
            >
              +{{ lowStockItems.length - 5 }} daha fazla gör
            </NuxtLink>
          </div>
        </div>
      </UCard>
      
      <!-- Category Distribution -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-pie-chart" class="w-5 h-5" />
            <h3 class="font-semibold">Kategori Dağılımı</h3>
          </div>
        </template>
        
        <div class="space-y-3">
          <div 
            v-for="category in categoryStats" 
            :key="category.name"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div 
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: category.color }"
              ></div>
              <span class="text-sm font-medium">{{ category.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold">{{ category.count }}</div>
              <div class="text-xs text-neutral-500">{{ category.percentage }}%</div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useInventoryCount } from '~/composables/useInventoryCount'

// Page setup
definePageMeta({
  middleware: 'auth',
  title: 'Stok Yönetimi'
})

useHead({
  title: 'Stok Yönetimi Dashboard'
})

// Composables
const { stockItems, stockEntries, loadStockData, loadSavedEntries, getStockStatus } = useInventoryCount()

// Mock data for demo
const updatedToday = ref(15)

// Computed stats
const totalProducts = computed(() => stockItems.value.length)

const lowStockItems = computed(() => {
  return stockItems.value.filter(item => getStockStatus(item) === 'low')
})

const lowStockCount = computed(() => lowStockItems.value.length)

const totalCategories = computed(() => {
  const categories = new Set(stockItems.value.map(item => item.category))
  return categories.size
})

const categoryStats = computed(() => {
  const categories = stockItems.value.reduce((acc, item) => {
    const categoryName = typeof item.category === 'string' ? item.category : (item.category?.name || 'Genel')
    acc[categoryName] = (acc[categoryName] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
  
  return Object.entries(categories).map(([name, count], index) => ({
    name,
    count: count as number,
    percentage: Math.round(((count as number) / totalProducts.value) * 100),
    color: colors[index % colors.length]
  }))
})

// Methods
const getStockCount = (item: any) => {
  const entry = stockEntries[item.id]
  return entry?.current || 0
}

onMounted(() => {
  loadStockData()
  loadSavedEntries()
})
</script>
