<!-- apps/web/components/stock/StockCountCard.vue -->
<template>
  <UCard 
    class="p-4 hover:shadow-lg transition-all duration-200 touch-manipulation"
    :class="[
      'border-l-4',
      statusColor === 'red' ? 'border-l-red-500' :
      statusColor === 'yellow' ? 'border-l-yellow-500' :
      statusColor === 'green' ? 'border-l-green-500' :
      'border-l-gray-300'
    ]"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <h3 class="font-semibold text-lg leading-tight line-clamp-2">
          {{ item.name }}
        </h3>
        <p class="text-sm text-gray-500 mt-1 line-clamp-1">
          {{ item.description }}
        </p>
      </div>
      
      <!-- Category Badge -->
      <UBadge 
        :color="getCategoryColor(item.category)"
        variant="soft"
        size="sm"
        class="ml-2 shrink-0"
      >
        {{ item.category }}
      </UBadge>
    </div>

    <!-- Stock Counter -->
    <div class="flex items-center justify-center gap-3 my-4">
      <UButton 
        @click="decreaseStock"
        :disabled="currentCount <= 0 || updating"
        icon="i-lucide-minus"
        size="sm"
        variant="outline"
        :class="currentCount <= 0 ? 'opacity-50' : 'hover:bg-red-50'"
      />
      
      <UInput 
        v-model="displayCount"
        type="number"
        min="0"
        class="text-center text-2xl font-bold w-24"
        :class="getStockInputClass()"
        @blur="saveCount"
        @keyup.enter="saveCount"
        :disabled="updating"
      />
      
      <UButton 
        @click="increaseStock"
        :disabled="updating"
        icon="i-lucide-plus"
        size="sm"
        variant="outline"
        class="hover:bg-green-50"
      />
    </div>

    <!-- Unit and Status -->
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-500 font-medium">{{ item.unit }}</span>
      
      <!-- Stock Status -->
      <div class="flex items-center gap-1">
        <div 
          class="w-2 h-2 rounded-full"
          :class="getStatusDotClass()"
        ></div>
        <span 
          class="text-xs font-medium"
          :class="getStatusTextClass()"
        >
          {{ getStatusText() }}
        </span>
      </div>
    </div>

    <!-- Min Stock Info -->
    <div 
      v-if="minStock > 0" 
      class="mt-2 text-xs text-gray-400 flex items-center gap-1"
    >
      <UIcon name="i-lucide-alert-triangle" class="w-3 h-3" />
      Min. stok: {{ minStock }} {{ item.unit }}
    </div>

    <!-- Last Updated -->
    <div 
      v-if="lastUpdated" 
      class="mt-2 text-xs text-gray-400 flex items-center gap-1"
    >
      <UIcon name="i-lucide-clock" class="w-3 h-3" />
      {{ formatLastUpdated() }}
    </div>

    <!-- Saving Indicator -->
    <div 
      v-if="updating"
      class="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-lg"
    >
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <UIcon name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
        Kaydediliyor...
      </div>
    </div>

    <!-- Technical Details Accordion -->
    <UAccordion 
      v-if="item.originalRef" 
      class="mt-3"
    >
      <UAccordionItem 
        title="Teknik Detaylar"
        :default-open="false"
      >
        <div class="text-xs space-y-1 max-h-32 overflow-y-auto">
          <!-- Original Ref Details -->
          <div v-if="item.originalRef" class="space-y-1">
            <div 
              v-for="(value, key) in getDisplayableSpecs(item.originalRef)" 
              :key="key"
              class="flex justify-between"
            >
              <span class="text-gray-500">{{ formatKey(key) }}:</span>
              <span class="font-mono text-gray-800 dark:text-gray-200">
                {{ formatValue(value) }}
              </span>
            </div>
          </div>
          
          <!-- Stock Info -->
          <div v-if="item.stockInfo" class="border-t pt-1 mt-2">
            <div class="text-gray-600 font-medium mb-1">Stok Bilgileri:</div>
            <div class="flex justify-between">
              <span class="text-gray-500">Varsayılan Min:</span>
              <span>{{ item.stockInfo.defaultMinStock || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Varsayılan Max:</span>
              <span>{{ item.stockInfo.defaultMaxStock || 0 }}</span>
            </div>
            <div v-if="item.stockInfo.preferredSupplier" class="flex justify-between">
              <span class="text-gray-500">Tedarikçi:</span>
              <span>{{ item.stockInfo.preferredSupplier }}</span>
            </div>
          </div>
        </div>
      </UAccordionItem>
    </UAccordion>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { StockEntry } from '~/types/stock'

// Props
interface StockItem {
  id: string
  name: string
  description: string
  category: string
  unit: string
  currentStock?: number
  minStock?: number
  originalRef?: any
  stockInfo?: {
    defaultMinStock: number
    defaultMaxStock: number
    preferredSupplier?: string
  }
}

interface Props {
  item: StockItem
  stockEntry?: StockEntry
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  update: [itemId: string, newStock: number]
}>()

// State
const updating = ref(false)
const displayCount = ref('0')

// Computed
const currentCount = computed(() => {
  return props.stockEntry?.current || props.item.currentStock || 0
})

const minStock = computed(() => {
  return props.stockEntry?.min || props.item.minStock || props.item.stockInfo?.defaultMinStock || 0
})

const lastUpdated = computed(() => {
  return props.stockEntry?.lastUpdated
})

const statusColor = computed(() => {
  if (currentCount.value <= 0) return 'red'
  if (currentCount.value <= minStock.value) return 'red'
  if (currentCount.value <= minStock.value * 2) return 'yellow'
  return 'green'
})

// Methods
const increaseStock = async () => {
  await updateStock(currentCount.value + 1)
}

const decreaseStock = async () => {
  if (currentCount.value > 0) {
    await updateStock(currentCount.value - 1)
  }
}

const updateStock = async (newStock: number) => {
  if (newStock < 0) return
  
  updating.value = true
  try {
    emit('update', props.item.id, newStock)
    displayCount.value = newStock.toString()
  } catch (error) {
    console.error('Stok güncelleme hatası:', error)
  } finally {
    setTimeout(() => {
      updating.value = false
    }, 500)
  }
}

const saveCount = async () => {
  const newCount = parseInt(displayCount.value) || 0
  if (newCount !== currentCount.value) {
    await updateStock(newCount)
  }
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Membran': 'blue',
    'Halat': 'green',
    'Mapa': 'yellow',
    'Plaka': 'purple',
    'Profil': 'orange',
    'Fitil': 'pink',
    'Sarf': 'gray'
  }
  return colors[category] || 'gray'
}

const getStockInputClass = () => {
  switch (statusColor.value) {
    case 'red': return 'border-red-300 focus:border-red-500 text-red-600'
    case 'yellow': return 'border-yellow-300 focus:border-yellow-500 text-yellow-600'
    case 'green': return 'border-green-300 focus:border-green-500 text-green-600'
    default: return ''
  }
}

const getStatusDotClass = () => {
  switch (statusColor.value) {
    case 'red': return 'bg-red-500'
    case 'yellow': return 'bg-yellow-500'
    case 'green': return 'bg-green-500'
    default: return 'bg-gray-400'
  }
}

const getStatusTextClass = () => {
  switch (statusColor.value) {
    case 'red': return 'text-red-600'
    case 'yellow': return 'text-yellow-600'
    case 'green': return 'text-green-600'
    default: return 'text-gray-500'
  }
}

const getStatusText = () => {
  if (currentCount.value <= 0) return 'Stokta yok'
  if (currentCount.value <= minStock.value) return 'Düşük stok'
  if (currentCount.value <= minStock.value * 2) return 'Orta stok'
  return 'Yeterli stok'
}

const formatLastUpdated = () => {
  if (!lastUpdated.value) return ''
  
  const now = new Date()
  const diff = now.getTime() - lastUpdated.value.getTime()
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'Az önce'
  if (minutes < 60) return `${minutes} dk önce`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} saat önce`
  
  return lastUpdated.value.toLocaleDateString('tr-TR')
}

const getDisplayableSpecs = (obj: any) => {
  if (!obj) return {}
  
  const filtered: Record<string, any> = {}
  
  // Only include useful fields for display
  const allowedKeys = [
    'brand', 'weight_g_m2', 'width_cm', 'warranty_years',
    'construction', 'material', 'diameter_mm', 'min_break_kN',
    'rope_mm', 'thread', 'A_mm', 'B1_mm',
    'thickness', 'material', 'dimensions'
  ]
  
  allowedKeys.forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      filtered[key] = obj[key]
    }
  })
  
  return filtered
}

const formatKey = (key: string) => {
  const keyMap: Record<string, string> = {
    'brand': 'Marka',
    'weight_g_m2': 'Ağırlık (g/m²)',
    'width_cm': 'Genişlik (cm)',
    'warranty_years': 'Garanti (yıl)',
    'construction': 'Yapı',
    'material': 'Malzeme',
    'diameter_mm': 'Çap (mm)',
    'min_break_kN': 'Min. Kopma (kN)',
    'rope_mm': 'Halat (mm)',
    'thread': 'Diş',
    'A_mm': 'A (mm)',
    'B1_mm': 'B1 (mm)',
    'thickness': 'Kalınlık',
    'dimensions': 'Boyutlar'
  }
  
  return keyMap[key] || key
}

const formatValue = (value: any) => {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value)
  }
  return String(value)
}

// Watch for changes in stockEntry
watch(() => props.stockEntry?.current, (newValue) => {
  if (newValue !== undefined) {
    displayCount.value = newValue.toString()
  }
}, { immediate: true })

// Initialize display count
watch(() => currentCount.value, (newValue) => {
  displayCount.value = newValue.toString()
}, { immediate: true })
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.touch-manipulation {
  touch-action: manipulation;
}
</style>