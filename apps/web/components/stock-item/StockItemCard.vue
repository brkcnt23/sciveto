<template>
  <UCard
    class="hover:shadow-lg transition-all duration-200 cursor-pointer group"
    :class="[
      'border border-neutral-200 hover:border-neutral-300',
      stockLevelClass
    ]"
    @click="$emit('click', item)"
  >
    <!-- Card Header -->
    <template #header>
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-3">
          <!-- Item Image/Icon -->
          <div class="relative">
            <div v-if="item.imageUrl" class="h-12 w-12 rounded-lg overflow-hidden bg-neutral-100">
              <img
                :src="item.imageUrl"
                :alt="item.name"
                class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                @error="imageError = true"
              />
            </div>
            <div v-else class="h-12 w-12 rounded-lg bg-gradient-to-br from-neutral-400 to-neutral-500 flex items-center justify-center">
              <UIcon :name="categoryIcon" class="h-6 w-6 text-white" />
            </div>
            
            <!-- Stock Level Indicator -->
            <div
              class="absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white"
              :class="stockIndicatorClass"
            />
          </div>

          <!-- Item Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2">
              <h3 class="font-semibold text-neutral-900 truncate group-hover:text-blue-600 transition-colors">
                {{ item.name }}
              </h3>
              <UBadge 
                v-if="item.sku" 
                :label="item.sku" 
                color="neutral" 
                variant="soft" 
                size="xs"
              />
            </div>
            
            <p v-if="item.description" class="text-sm text-neutral-600 line-clamp-1 mt-1">
              {{ item.description }}
            </p>
            
            <!-- Category -->
            <div v-if="item.category" class="flex items-center space-x-1 mt-2">
              <UIcon :name="getCategoryIcon(item.category)" class="h-3 w-3" :class="getCategoryColorClass(item.category)" />
              <span class="text-xs" :class="getCategoryTextClass(item.category)">
                {{ item.category }}
              </span>
            </div>
          </div>
        </div>

        <!-- Status Badge -->
        <UBadge
          :label="item.status"
          :color="statusColor"
          variant="soft"
          size="xs"
        />
      </div>
    </template>

    <!-- Card Body -->
    <div class="space-y-4">
      <!-- Stock Information -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Current Stock -->
        <div class="space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-neutral-500">Current Stock</span>
            <UIcon :name="stockLevelIcon" :class="stockLevelIconColor" class="h-3 w-3" />
          </div>
          <div class="flex items-baseline space-x-1">
            <span class="text-lg font-bold" :class="stockLevelTextColor">
              {{ formatNumber(item.stock) }}
            </span>
            <span v-if="item.unit" class="text-xs text-neutral-500">
              {{ item.unit }}
            </span>
          </div>
          
          <!-- Stock Level Progress -->
          <div class="w-full bg-neutral-200 rounded-full h-1.5">
            <div
              class="h-1.5 rounded-full transition-all duration-300"
              :class="stockProgressClass"
              :style="{ width: `${stockPercentage}%` }"
            />
          </div>
          
          <p class="text-xs" :class="stockLevelTextColor">
            {{ stockStatusText }}
          </p>
        </div>

        <!-- Price -->
        <div class="space-y-1">
          <span class="text-xs font-medium text-neutral-500">Price</span>
          <div class="flex items-baseline space-x-1">
            <span class="text-lg font-bold text-neutral-900">
              ${{ formatPrice(item.price || 0) }}
            </span>
            <span v-if="item.unit" class="text-xs text-neutral-500">
              per {{ item.unit }}
            </span>
          </div>
          
          <!-- Total Value -->
          <p class="text-xs text-neutral-600">
            Total: ${{ formatPrice((item.price || 0) * item.stock) }}
          </p>
        </div>
      </div>

      <!-- Min/Max Stock Levels -->
      <div v-if="item.minStockLevel || item.maxStockLevel" class="flex items-center justify-between text-xs text-neutral-500">
        <span v-if="item.minStockLevel">
          Min: {{ formatNumber(item.minStockLevel) }}{{ item.unit ? ` ${item.unit}` : '' }}
        </span>
        <span v-if="item.maxStockLevel">
          Max: {{ formatNumber(item.maxStockLevel) }}{{ item.unit ? ` ${item.unit}` : '' }}
        </span>
      </div>

      <!-- Location & Supplier -->
      <div v-if="item.location || item.supplier" class="flex items-center justify-between text-xs text-neutral-500">
        <span v-if="item.location" class="flex items-center space-x-1">
          <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />
          <span>{{ item.location }}</span>
        </span>
        <span v-if="item.supplier" class="flex items-center space-x-1">
          <UIcon name="i-heroicons-building-storefront" class="h-3 w-3" />
          <span>{{ item.supplier }}</span>
        </span>
      </div>
    </div>

    <!-- Card Footer -->
    <template #footer>
      <div class="flex items-center justify-between">
        <!-- Last Updated -->
        <span class="text-xs text-neutral-500">
          Updated {{ formatDate(item.updatedAt) }}
        </span>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-2">
          <UButton
            icon="i-heroicons-pencil"
            size="xs"
            color="neutral"
            variant="ghost"
            @click.stop="$emit('edit', item)"
          />
          <UButton
            icon="i-heroicons-eye"
            size="xs"
            color="blue"
            variant="ghost"
            @click.stop="$emit('view', item)"
          />
          <UButton
            icon="i-heroicons-arrow-up"
            size="xs"
            color="green"
            variant="ghost"
            @click.stop="$emit('restock', item)"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { StockItem } from '~/types/stock'

interface Props {
  item: StockItem
}

interface Emits {
  (e: 'click', item: StockItem): void
  (e: 'edit', item: StockItem): void
  (e: 'view', item: StockItem): void
  (e: 'restock', item: StockItem): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

// Constants for stock level thresholds
const LOW_STOCK_THRESHOLD = 10
const MEDIUM_STOCK_THRESHOLD = 50
const HIGH_STOCK_THRESHOLD = 100

// Reactive state
const imageError = ref(false)

// Computed properties
const categoryIcon = computed(() => {
  return getCategoryIcon(props.item.category || '')
})

const getCategoryIcon = (category: string): string => {
  const categoryIconMap: Record<string, string> = {
    'Membran': 'i-lucide-layers',
    'Halat': 'i-lucide-cable',
    'Mapa': 'i-lucide-link',
    'Plaka': 'i-lucide-square',
    'Profil': 'i-lucide-box'
  }
  return categoryIconMap[category] || 'i-heroicons-cube'
}

const getCategoryColorClass = (category: string): string => {
  const categoryColorMap: Record<string, string> = {
    'Membran': 'text-blue-500',
    'Halat': 'text-green-500',
    'Mapa': 'text-pink-500',
    'Plaka': 'text-purple-500',
    'Profil': 'text-orange-500'
  }
  return categoryColorMap[category] || 'text-gray-500'
}

const getCategoryTextClass = (category: string): string => {
  const categoryColorMap: Record<string, string> = {
    'Membran': 'text-blue-600',
    'Halat': 'text-green-600',
    'Mapa': 'text-pink-600',
    'Plaka': 'text-purple-600',
    'Profil': 'text-orange-600'
  }
  return categoryColorMap[category] || 'text-gray-600'
}

const statusColor = computed(() => {
  switch (props.item.status) {
    case 'ACTIVE': return 'green'
    case 'INACTIVE': return 'yellow'
    case 'DISCONTINUED': return 'red'
    case 'ARCHIVED': return 'gray'
    default: return 'neutral'
  }
})

const stockLevelClass = computed(() => {
  if (props.item.stock <= 0) return 'border-l-4 border-l-red-500'
  if (props.item.stock <= LOW_STOCK_THRESHOLD) return 'border-l-4 border-l-orange-500'
  return ''
})

const stockIndicatorClass = computed(() => {
  if (props.item.stock <= 0) return 'bg-red-500'
  if (props.item.stock <= LOW_STOCK_THRESHOLD) return 'bg-orange-500'
  if (props.item.stock <= MEDIUM_STOCK_THRESHOLD) return 'bg-yellow-500'
  return 'bg-green-500'
})

const stockLevelIcon = computed(() => {
  if (props.item.stock <= 0) return 'i-heroicons-x-circle'
  if (props.item.stock <= LOW_STOCK_THRESHOLD) return 'i-heroicons-exclamation-triangle'
  if (props.item.stock <= MEDIUM_STOCK_THRESHOLD) return 'i-heroicons-exclamation-circle'
  return 'i-heroicons-check-circle'
})

const stockLevelIconColor = computed(() => {
  if (props.item.stock <= 0) return 'text-red-500'
  if (props.item.stock <= LOW_STOCK_THRESHOLD) return 'text-orange-500'
  if (props.item.stock <= MEDIUM_STOCK_THRESHOLD) return 'text-yellow-500'
  return 'text-green-500'
})

const stockLevelTextColor = computed(() => {
  if (props.item.stock <= 0) return 'text-red-600'
  if (props.item.stock <= LOW_STOCK_THRESHOLD) return 'text-orange-600'
  if (props.item.stock <= MEDIUM_STOCK_THRESHOLD) return 'text-yellow-600'
  return 'text-green-600'
})

const stockProgressClass = computed(() => {
  if (props.item.stock <= 0) return 'bg-red-500'
  if (props.item.stock <= LOW_STOCK_THRESHOLD) return 'bg-orange-500'
  if (props.item.stock <= MEDIUM_STOCK_THRESHOLD) return 'bg-yellow-500'
  return 'bg-green-500'
})

const stockPercentage = computed(() => {
  const maxStock = props.item.maxStockLevel || HIGH_STOCK_THRESHOLD
  return Math.min((props.item.stock / maxStock) * 100, 100)
})

const stockStatusText = computed(() => {
  if (props.item.stock <= 0) return 'Out of stock'
  if (props.item.stock <= LOW_STOCK_THRESHOLD) return 'Low stock'
  if (props.item.stock <= MEDIUM_STOCK_THRESHOLD) return 'Medium stock'
  return 'In stock'
})

// Helper functions
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value)
}

const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 48) return 'Yesterday'
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}
</script>