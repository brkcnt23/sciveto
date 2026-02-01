<!-- apps/web/pages/inventory/data-import.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
        Veri Import Sistemi
      </h1>
      <p class="text-neutral-600 dark:text-neutral-400 mt-1">
        JSON verilerini sisteme aktarın ve stok yönetimini başlatın
      </p>
    </div>

    <!-- Import Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Membran Import -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UIcon name="i-lucide-layers" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 class="font-semibold">Membran</h3>
              <p class="text-sm text-neutral-500">{{ counts.membran }} ürün</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            FERRARI, MEHLER, SIOEN ve diğer markalar
          </p>
          
          <UButton 
            @click="importMembran" 
            :loading="importing.membran"
            :disabled="importing.membran"
            block
            color="info"
            icon="i-lucide-download"
          >
            {{ importing.membran ? 'İmport Ediliyor...' : 'Membran Import Et' }}
          </UButton>
          
          <div v-if="counts.membran > 0" class="flex items-center gap-2 text-sm text-green-600">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
            {{ counts.membran }} ürün mevcut
          </div>
        </div>
      </UCard>

      <!-- Halat Import -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <UIcon name="i-lucide-cable" class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 class="font-semibold">Halat</h3>
              <p class="text-sm text-neutral-500">{{ counts.halat }} ürün</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Çelik ve paslanmaz halat çeşitleri
          </p>
          
          <UButton 
            @click="importHalat" 
            :loading="importing.halat"
            :disabled="importing.halat"
            block
            color="success"
            icon="i-lucide-download"
          >
            {{ importing.halat ? 'İmport Ediliyor...' : 'Halat Import Et' }}
          </UButton>
          
          <div v-if="counts.halat > 0" class="flex items-center gap-2 text-sm text-green-600">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
            {{ counts.halat }} ürün mevcut
          </div>
        </div>
      </UCard>

      <!-- Mapa Import -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <UIcon name="i-lucide-link" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 class="font-semibold">Mapa</h3>
              <p class="text-sm text-neutral-500">{{ counts.mapa }} ürün</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Halat ucu aksesuarları ve bağlantı elemanları
          </p>
          
          <UButton 
            @click="importMapa" 
            :loading="importing.mapa"
            :disabled="importing.mapa"
            block
            color="warning"
            icon="i-lucide-download"
          >
            {{ importing.mapa ? 'İmport Ediliyor...' : 'Mapa Import Et' }}
          </UButton>
          
          <div v-if="counts.mapa > 0" class="flex items-center gap-2 text-sm text-green-600">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
            {{ counts.mapa }} ürün mevcut
          </div>
        </div>
      </UCard>

      <!-- Plaka Import -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <UIcon name="i-lucide-square" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 class="font-semibold">Plaka</h3>
              <p class="text-sm text-neutral-500">{{ counts.plaka }} ürün</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Çelik ve paslanmaz plaka çeşitleri
          </p>
          
          <UButton 
            @click="importPlaka" 
            :loading="importing.plaka"
            :disabled="importing.plaka"
            block
            color="primary"
            icon="i-lucide-download"
          >
            {{ importing.plaka ? 'İmport Ediliyor...' : 'Plaka Import Et' }}
          </UButton>
          
          <div v-if="counts.plaka > 0" class="flex items-center gap-2 text-sm text-green-600">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
            {{ counts.plaka }} ürün mevcut
          </div>
        </div>
      </UCard>

      <!-- Profil Import -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <UIcon name="i-lucide-box" class="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 class="font-semibold">Profil</h3>
              <p class="text-sm text-neutral-500">{{ counts.profil }} ürün</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            HEA, IPE, UPN ve diğer profil tipleri
          </p>
          
          <UButton 
            @click="importProfil" 
            :loading="importing.profil"
            :disabled="importing.profil"
            block
            color="warning"
            icon="i-lucide-download"
          >
            {{ importing.profil ? 'İmport Ediliyor...' : 'Profil Import Et' }}
          </UButton>
          
          <div v-if="counts.profil > 0" class="flex items-center gap-2 text-sm text-green-600">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
            {{ counts.profil }} ürün mevcut
          </div>
        </div>
      </UCard>

      <!-- Bulk Import -->
      <UCard class="md:col-span-2 lg:col-span-1">
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <UIcon name="i-lucide-package" class="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div>
              <h3 class="font-semibold">Toplu İşlem</h3>
              <p class="text-sm text-neutral-500">{{ totalCount }} toplam ürün</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Tüm kategorileri tek seferde import edin
          </p>
          
          <UButton 
            @click="importAll"
            :loading="importingAll"
            :disabled="importingAll || Object.values(importing).some(Boolean)"
            block
            color="primary"
            icon="i-lucide-download-cloud"
          >
            {{ importingAll ? 'Tümü İmport Ediliyor...' : 'Hepsini Import Et' }}
          </UButton>
          
          <div v-if="totalCount > 0" class="text-center">
            <UBadge color="primary" variant="soft" size="lg">
              {{ totalCount }} ürün hazır
            </UBadge>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Progress Indicator -->
    <UCard v-if="importProgress.show">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-progress-activity" class="w-5 h-5" />
          <h3 class="font-semibold">İmport İlerlemesi</h3>
        </div>
      </template>
      
      <div class="space-y-4">
        <UProgress 
          :value="importProgress.value" 
          :max="importProgress.max"
          size="lg"
        />
        
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">{{ importProgress.message }}</p>
          <p class="text-sm text-neutral-500">
            %{{ Math.round((importProgress.value / importProgress.max) * 100) }}
          </p>
        </div>
      </div>
    </UCard>

    <!-- Import History -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-history" class="w-5 h-5" />
          <h3 class="font-semibold">İmport Geçmişi</h3>
        </div>
      </template>
      
      <div class="space-y-3">
        <div 
          v-for="history in importHistory" 
          :key="history.id"
          class="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg"
        >
          <div class="flex items-center gap-3">
            <UIcon 
              :name="history.success ? 'i-lucide-check-circle' : 'i-lucide-x-circle'" 
              :class="history.success ? 'text-green-500' : 'text-red-500'"
              class="w-5 h-5"
            />
            <div>
              <div class="font-medium">{{ history.type }} Import</div>
              <div class="text-sm text-neutral-500">
                {{ history.count }} ürün • {{ formatDate(history.date) }}
              </div>
            </div>
          </div>
          <UBadge 
            :color="history.success ? 'success' : 'error'" 
            variant="soft"
          >
            {{ history.success ? 'Başarılı' : 'Hatalı' }}
          </UBadge>
        </div>
        
        <div v-if="importHistory.length === 0" class="text-center py-8 text-neutral-500">
          Henüz import işlemi yapılmamış
        </div>
      </div>
    </UCard>

    <!-- Quick Actions -->
    <div class="flex flex-wrap gap-3 justify-center">
      <UButton 
        to="/inventory/quick-entry"
        variant="outline"
        icon="i-lucide-edit"
      >
        Hızlı Stok Girişi
      </UButton>
      
      <UButton 
        to="/inventory/count"
        variant="outline"
        icon="i-lucide-package-search"
      >
        Stok Sayımına Git
      </UButton>
      
      <UButton 
        to="/inventory/overview"
        variant="outline"
        icon="i-lucide-home"
      >
        Dashboard'a Dön
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import type { ImportType, ImportCounts, ImportingStates } from '~/types/stock'

// Page setup
definePageMeta({
  middleware: 'auth',
  title: 'Veri Import'
})

useHead({
  title: 'Veri Import - Envanter'
})

// Local state
const importing = reactive<ImportingStates>({
  membran: false,
  halat: false,
  mapa: false,
  plaka: false,
  profil: false
})

const importingAll = ref(false)

const importProgress = reactive({
  show: false,
  value: 0,
  max: 100,
  message: ''
})

const counts = reactive<ImportCounts>({
  membran: 0,
  halat: 0,
  mapa: 0,
  plaka: 0,
  profil: 0
})

// Mock import history
const importHistory = ref([
  {
    id: 1,
    type: 'Membran',
    count: 5,
    success: true,
    date: new Date('2025-01-22T10:30:00')
  },
  {
    id: 2,
    type: 'Halat',
    count: 5,
    success: true,
    date: new Date('2025-01-21T14:15:00')
  }
])

// Computed
const totalCount = computed(() => {
  return counts.membran + counts.halat + counts.mapa + counts.plaka + counts.profil
})

// Methods
const loadStockJSON = async (type: ImportType) => {
  try {
    // In real app, these would be from your JSON files
    const jsonData = await import(`~/assets/data/stock-${type}.json`)
    return jsonData.default || jsonData
  } catch (error) {
    console.error(`${type} JSON yükleme hatası:`, error)
    
    // Fallback to sample data
    const sampleData = getSampleData(type)
    return sampleData
  }
}

const getSampleData = (type: ImportType) => {
  // This would normally be your actual JSON data
  switch (type) {
    case 'membran': return Array.from({length: 5}, (_, i) => ({
      name: `Membran Ürün ${i + 1}`,
      category: 'Membran',
      unit: 'm²'
    }))
    case 'halat': return Array.from({length: 5}, (_, i) => ({
      name: `Halat Ürün ${i + 1}`,
      category: 'Halat', 
      unit: 'm'
    }))
    case 'mapa': return Array.from({length: 5}, (_, i) => ({
      name: `Mapa Ürün ${i + 1}`,
      category: 'Mapa',
      unit: 'adet'
    }))
    case 'plaka': return Array.from({length: 6}, (_, i) => ({
      name: `Plaka Ürün ${i + 1}`,
      category: 'Plaka',
      unit: 'm²'
    }))
    case 'profil': return Array.from({length: 7}, (_, i) => ({
      name: `Profil Ürün ${i + 1}`,
      category: 'Profil',
      unit: 'm'
    }))
    default: return []
  }
}

const saveToLocalStorage = (type: ImportType, data: any[]) => {
  localStorage.setItem(`stock_${type}`, JSON.stringify(data))
  counts[type] = data.length
}

const importCategory = async (type: ImportType) => {
  importing[type] = true
  
  try {
    importProgress.show = true
    importProgress.value = 25
    importProgress.message = `${type} verileri yükleniyor...`
    
    const data = await loadStockJSON(type)
    importProgress.value = 50
    importProgress.message = `${type} verileri işleniyor...`
    
    // Add IDs
    const processedData = data.map((item: any, index: number) => ({
      ...item,
      id: `${type}-${index}`,
      currentStock: 0
    }))
    
    importProgress.value = 75
    importProgress.message = `${type} verileri kaydediliyor...`
    
    saveToLocalStorage(type, processedData)
    
    importProgress.value = 100
    importProgress.message = `${processedData.length} ${type} ürünü başarıyla import edildi!`
    
    // Add to history
    importHistory.value.unshift({
      id: Date.now(),
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count: processedData.length,
      success: true,
      date: new Date()
    })
    
    setTimeout(() => {
      importProgress.show = false
    }, 2000)
    
  } catch (error) {
    console.error(`${type} import hatası:`, error)
    importProgress.message = `${type} import hatası!`
    
    setTimeout(() => {
      importProgress.show = false
    }, 3000)
  } finally {
    importing[type] = false
  }
}

const importMembran = () => importCategory('membran')
const importHalat = () => importCategory('halat')
const importMapa = () => importCategory('mapa')
const importPlaka = () => importCategory('plaka')
const importProfil = () => importCategory('profil')

const importAll = async () => {
  importingAll.value = true
  
  try {
    const categoryKeys: ImportType[] = ['membran', 'halat', 'mapa', 'plaka', 'profil']
    
    for (const category of categoryKeys) {
      await importCategory(category)
      await new Promise(resolve => setTimeout(resolve, 500)) // Small delay
    }
    
  } catch (error) {
    console.error('Toplu import hatası:', error)
  } finally {
    importingAll.value = false
  }
}

const loadCounts = () => {
  try {
    const categoryKeys: (keyof ImportCounts)[] = ['membran', 'halat', 'mapa', 'plaka', 'profil']
    
    categoryKeys.forEach(category => {
      const data = localStorage.getItem(`stock_${category}`)
      counts[category] = data ? JSON.parse(data).length : 0
    })
  } catch (error) {
    console.error('Count yükleme hatası:', error)
  }
}

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
