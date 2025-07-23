<!-- pages/stock-management/data-import.vue -->
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Veri Import Sistemi</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">JSON verilerini stok sistemine aktarın</p>
      </div>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-download" class="w-5 h-5" />
          <h2 class="text-lg font-semibold">Import Seçenekleri</h2>
        </div>
      </template>
      
      <!-- Import Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <UButton 
          @click="importMembran" 
          :loading="importing.membran"
          icon="i-lucide-layers"
          size="lg"
          variant="outline"
          block
          class="h-20 flex-col gap-2"
        >
          <span class="font-semibold">Membran</span>
          <span class="text-sm opacity-75">{{ counts.membran }} ürün</span>
        </UButton>
        
        <UButton 
          @click="importHalat"
          :loading="importing.halat" 
          icon="i-lucide-cable"
          size="lg"
          variant="outline"
          block
          class="h-20 flex-col gap-2"
        >
          <span class="font-semibold">Halat</span>
          <span class="text-sm opacity-75">{{ counts.halat }} ürün</span>
        </UButton>
        
        <UButton 
          @click="importMapa"
          :loading="importing.mapa"
          icon="i-lucide-link"
          size="lg"
          variant="outline"
          block
          class="h-20 flex-col gap-2"
        >
          <span class="font-semibold">Mapa</span>
          <span class="text-sm opacity-75">{{ counts.mapa }} ürün</span>
        </UButton>
        
        <UButton 
          @click="importAll"
          :loading="importingAll"
          variant="solid"
          color="primary"
          size="lg"
          block
          class="h-20 flex-col gap-2"
          icon="i-lucide-package"
        >
          <span class="font-semibold">Hepsini Import Et</span>
          <span class="text-sm opacity-75">{{ totalCount }} toplam</span>
        </UButton>
      </div>
      
      <!-- Progress -->
      <div v-if="importProgress.show" class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="font-medium">{{ importProgress.message }}</span>
          <span class="text-gray-500">{{ importProgress.value }}%</span>
        </div>
        <UProgress 
          :value="importProgress.value" 
          :max="importProgress.max"
          size="md"
        />
      </div>
    </UCard>

    <!-- Import History -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-history" class="w-5 h-5" />
          <h2 class="text-lg font-semibold">Import Geçmişi</h2>
        </div>
      </template>
      
      <div class="space-y-3">
        <div 
          v-for="history in importHistory" 
          :key="history.id"
          class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex items-center gap-3">
            <UIcon 
              :name="history.success ? 'i-lucide-check-circle' : 'i-lucide-x-circle'" 
              :class="history.success ? 'text-green-500' : 'text-red-500'"
              class="w-5 h-5"
            />
            <div>
              <div class="font-medium">{{ history.type }} Import</div>
              <div class="text-sm text-gray-500">
                {{ history.count }} ürün • {{ formatDate(history.date) }}
              </div>
            </div>
          </div>
          <UBadge 
            :color="history.success ? 'green' : 'red'" 
            variant="soft"
          >
            {{ history.success ? 'Başarılı' : 'Hatalı' }}
          </UBadge>
        </div>
        
        <div v-if="importHistory.length === 0" class="text-center py-8 text-gray-500">
          Henüz import işlemi yapılmamış
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStockImport } from '~/composables/useStockImport'

// Page setup
definePageMeta({
  middleware: 'auth',
  title: 'Veri Import'
})

useHead({
  title: 'Veri Import - Stok Yönetimi'
})

// Composables
const { 
  importing, 
  importingAll, 
  importProgress, 
  counts, 
  importMembran, 
  importHalat, 
  importMapa, 
  importAll,
  loadCounts
} = useStockImport()

// Mock import history
const importHistory = ref([
  {
    id: 1,
    type: 'Membran',
    count: 45,
    success: true,
    date: new Date('2025-01-22T10:30:00')
  },
  {
    id: 2,
    type: 'Halat',
    count: 23,
    success: true,
    date: new Date('2025-01-21T14:15:00')
  },
  {
    id: 3,
    type: 'Mapa',
    count: 12,
    success: false,
    date: new Date('2025-01-20T09:45:00')
  }
])

const totalCount = computed(() => {
  return counts.membran + counts.halat + counts.mapa
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

onMounted(() => {
  loadCounts()
})
</script>
