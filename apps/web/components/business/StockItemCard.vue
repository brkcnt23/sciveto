<!-- apps/web/components/business/StockItemCard.vue -->
<template>
  <UCard 
    class="hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4 overflow-hidden relative"
    :class="cardBorderColor"
    @click="$emit('click')"
  >
    <!-- Stock Level Indicator -->
    <div 
      class="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8"
      :class="stockLevelGradient"
    ></div>
    
    <div class="space-y-4 relative z-10">
      <!-- Header with Image/Icon -->
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-4 flex-1 min-w-0">
          <!-- Item Image/Icon -->
          <div class="flex-shrink-0">
            <div 
              v-if="stockItem.imageUrl"
              class="w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white"
            >
              <img 
                :src="stockItem.imageUrl" 
                :alt="stockItem.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div 
              v-else
              class="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              :class="categoryGradient"
            >
              {{ getItemIcon(stockItem.category?.name) }}
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <!-- Item Name -->
            <h3 class="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
              {{ stockItem.name }}
            </h3>
            
            <!-- SKU and Category -->
            <div class="flex items-center space-x-3 mt-1">
              <span class="text-sm text-gray-500 font-mono">{{ stockItem.sku }}</span>
              <UBadge 
                v-if="stockItem.category"
                color="blue" 
                variant="soft" 
                size="xs"
              >
                {{ stockItem.category.name }}
              </UBadge>
            </div>
          </div>
        </div>
        
        <!-- Status and Price -->
        <div class="flex flex-col items-end space-y-2 ml-4">
          <UBadge 
            :color="getStatusColor(stockItem.status)"
            size="sm"
            class="uppercase font-semibold"
          >
            {{ stockItem.status }}
          </UBadge>
          
          <div class="text-right">
            <p class="text-lg font-bold text-gray-900">
              ${{ formatPrice(stockItem.price) }}
            </p>
            <p class="text-xs text-gray-500">per unit</p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <p v-if="stockItem.description" class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {{ stockItem.description }}
      </p>

      <!-- Stock Level Section -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700">Stock Level</span>
          <div class="flex items-center space-x-2">
            <Icon 
              :name="getStockLevelIcon(stockItem.stock)" 
              class="w-4 h-4"
              :class="getStockLevelColor(stockItem.stock)"
            />
            <span class="text-lg font-bold" :class="getStockLevelColor(stockItem.stock)">
              {{ stockItem.stock }} {{ stockItem.unit || 'units' }}
            </span>
          </div>
        </div>
        
        <!-- Stock Level Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 shadow-inner">
          <div 
            class="h-2 rounded-full transition-all duration-500 shadow-sm"
            :class="getStockLevelBarColor(stockItem.stock)"
            :style="{ width: `${getStockPercentage(stockItem.stock)}%` }"
          ></div>
        </div>
        
        <!-- Stock Status Text -->
        <p class="text-xs" :class="getStockLevelColor(stockItem.stock)">
          {{ getStockStatusText(stockItem.stock) }}
        </p>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Last Updated -->
        <div class="bg-blue-50 rounded-lg p-3">
          <div class="flex items-center space-x-2 mb-1">
            <Icon name="i-heroicons-clock" class="h-4 w-4 text-blue-600" />
            <span class="text-xs text-blue-600 font-medium uppercase tracking-wide">Updated</span>
          </div>
          <span class="font-semibold text-blue-900 text-sm">
            {{ formatDate(stockItem.updatedAt) }}
          </span>
        </div>
        
        <!-- Location/Warehouse -->
        <div class="bg-green-50 rounded-lg p-3">
          <div class="flex items-center space-x-2 mb-1">
            <Icon name="i-heroicons-map-pin" class="h-4 w-4 text-green-600" />
            <span class="text-xs text-green-600 font-medium uppercase tracking-wide">Location</span>
          </div>
          <span class="font-semibold text-green-900 text-sm">
            {{ stockItem.location || 'Main Warehouse' }}
          </span>
        </div>
      </div>

      <!-- Supplier Info -->
      <div v-if="stockItem.supplier" class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
        <div class="flex items-center space-x-3">
          <Icon name="i-heroicons-building-office-2" class="h-5 w-5 text-purple-600" />
          <div>
            <p class="text-sm font-semibold text-purple-900">{{ stockItem.supplier.name }}</p>
            <p class="text-xs text-purple-600">{{ stockItem.supplier.contact || 'Supplier' }}</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-200">
        <div class="flex space-x-2">
          <Tooltip content="View details">
            <UButton 
              size="xs" 
              variant="soft" 
              color="sky"
              icon="i-heroicons-eye"
              @click.stop="$emit('view', stockItem.id)"
            />
          </Tooltip>
          
          <Tooltip content="Edit item">
            <UButton 
              size="xs" 
              variant="soft" 
              color="emerald"
              icon="i-heroicons-pencil"
              @click.stop="$emit('edit', stockItem.id)"
            />
          </Tooltip>
          
          <Tooltip content="Adjust stock">
            <UButton 
              size="xs" 
              variant="soft" 
              color="amber"
              icon="i-heroicons-arrows-up-down"
              @click.stop="$emit('adjust-stock', stockItem.id)"
            />
          </Tooltip>
        </div>
        
        <div class="flex space-x-2">
          <Tooltip content="Add to project">
            <UButton 
              size="xs" 
              variant="soft" 
              color="violet"
              icon="i-heroicons-plus"
              @click.stop="$emit('add-to-project', stockItem.id)"
            />
          </Tooltip>
          
          <Tooltip content="Delete item">
            <UButton 
              size="xs" 
              variant="soft" 
              color="red"
              icon="i-heroicons-trash"
              @click.stop="$emit('delete', stockItem.id)"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  stockItem: {
    type: Object,
    required: true
  }
})

defineEmits(['click', 'view', 'edit', 'delete', 'adjust-stock', 'add-to-project'])

// Stock level thresholds
const LOW_STOCK_THRESHOLD = 10
const MEDIUM_STOCK_THRESHOLD = 50
const HIGH_STOCK_THRESHOLD = 100

// Status colors
const getStatusColor = (status) => {
  const colors = {
    ACTIVE: 'green',
    DRAFT: 'gray', 
    INACTIVE: 'orange',
    ARCHIVED: 'red'
  }
  return colors[status] || 'gray'
}

// Card border color based on stock level
const cardBorderColor = computed(() => {
  const stock = props.stockItem.stock || 0
  if (stock <= LOW_STOCK_THRESHOLD) return 'border-l-red-500'
  if (stock <= MEDIUM_STOCK_THRESHOLD) return 'border-l-yellow-500'
  return 'border-l-green-500'
})

// Stock level gradient background
const stockLevelGradient = computed(() => {
  const stock = props.stockItem.stock || 0
  if (stock <= LOW_STOCK_THRESHOLD) return 'bg-gradient-to-br from-red-500 to-red-600'
  if (stock <= MEDIUM_STOCK_THRESHOLD) return 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  return 'bg-gradient-to-br from-green-500 to-green-600'
})

// Category gradient for icon background
const categoryGradient = computed(() => {
  const category = props.stockItem.category?.name || 'default'
  const gradients = {
    'Hardware': 'bg-gradient-to-br from-gray-500 to-gray-600',
    'Software': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'Electronics': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'Materials': 'bg-gradient-to-br from-brown-500 to-brown-600',
    'Tools': 'bg-gradient-to-br from-orange-500 to-orange-600',
    'default': 'bg-gradient-to-br from-slate-500 to-slate-600'
  }
  return gradients[category] || gradients.default
})

// Get item icon based on category
const getItemIcon = (categoryName) => {
  const icons = {
    'Hardware': '🔧',
    'Software': '💻',
    'Electronics': '⚡',
    'Materials': '📦',
    'Tools': '🛠️',
    'Office': '📋',
    'default': '📦'
  }
  return icons[categoryName] || icons.default
}

// Stock level color
const getStockLevelColor = (stock) => {
  if (stock <= LOW_STOCK_THRESHOLD) return 'text-red-600'
  if (stock <= MEDIUM_STOCK_THRESHOLD) return 'text-yellow-600'
  return 'text-green-600'
}

// Stock level icon
const getStockLevelIcon = (stock) => {
  if (stock <= LOW_STOCK_THRESHOLD) return 'i-heroicons-exclamation-triangle'
  if (stock <= MEDIUM_STOCK_THRESHOLD) return 'i-heroicons-exclamation-circle'
  return 'i-heroicons-check-circle'
}

// Stock level bar color
const getStockLevelBarColor = (stock) => {
  if (stock <= LOW_STOCK_THRESHOLD) return 'bg-gradient-to-r from-red-400 to-red-500'
  if (stock <= MEDIUM_STOCK_THRESHOLD) return 'bg-gradient-to-r from-yellow-400 to-yellow-500'
  return 'bg-gradient-to-r from-green-400 to-green-500'
}

// Stock percentage for progress bar
const getStockPercentage = (stock) => {
  const maxDisplayStock = HIGH_STOCK_THRESHOLD
  return Math.min((stock / maxDisplayStock) * 100, 100)
}

// Stock status text
const getStockStatusText = (stock) => {
  if (stock <= 0) return 'Out of stock'
  if (stock <= LOW_STOCK_THRESHOLD) return 'Low stock - Reorder soon'
  if (stock <= MEDIUM_STOCK_THRESHOLD) return 'Medium stock'
  return 'In stock'
}

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price || 0)
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}
</script>