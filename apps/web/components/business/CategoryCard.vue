<!-- apps/web/components/business/CategoryCard.vue -->
<template>
  <UCard 
    class="hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4 overflow-hidden relative hover:scale-[1.02]"
    :class="cardBorderColor"
    @click="$emit('click')"
  >
    <!-- Background Pattern -->
    <div 
      class="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 translate-x-8 -translate-y-8"
      :class="categoryGradient"
    ></div>
    
    <div class="space-y-4 relative z-10">
      <!-- Header with Icon -->
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-4 flex-1 min-w-0">
          <!-- Category Icon -->
          <div class="flex-shrink-0">
            <div 
              class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300"
              :class="categoryGradient"
            >
              {{ getCategoryIcon(category.name) }}
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <!-- Category Name -->
            <h3 class="font-bold text-gray-900 text-xl group-hover:text-blue-600 transition-colors line-clamp-1">
              {{ category.name }}
            </h3>
            
            <!-- Category Code -->
            <div class="flex items-center space-x-2 mt-1">
              <span class="text-sm text-gray-500 font-mono">{{ category.code || 'N/A' }}</span>
              <UBadge 
                :color="getStatusColor(category.status)"
                size="xs"
                class="uppercase font-bold"
              >
                {{ category.status || 'Active' }}
              </UBadge>
            </div>
          </div>
        </div>
        
        <!-- Item Count -->
        <div class="text-right ml-4">
          <div class="flex items-center space-x-1">
            <Icon name="i-heroicons-cube" class="h-4 w-4 text-gray-500" />
            <span class="text-2xl font-bold text-gray-900">{{ category.itemCount || 0 }}</span>
          </div>
          <p class="text-xs text-gray-500">items</p>
        </div>
      </div>

      <!-- Description -->
      <p v-if="category.description" class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {{ category.description }}
      </p>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-3 gap-3">
        <!-- Total Value -->
        <div class="bg-blue-50 rounded-lg p-3 text-center">
          <Icon name="i-heroicons-currency-dollar" class="h-5 w-5 text-blue-600 mx-auto mb-1" />
          <p class="text-lg font-bold text-blue-900">
            ${{ formatCurrency(category.totalValue || 0) }}
          </p>
          <p class="text-xs text-blue-600">Total Value</p>
        </div>
        
        <!-- Low Stock Items -->
        <div class="bg-orange-50 rounded-lg p-3 text-center">
          <Icon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-orange-600 mx-auto mb-1" />
          <p class="text-lg font-bold text-orange-900">
            {{ category.lowStockItems || 0 }}
          </p>
          <p class="text-xs text-orange-600">Low Stock</p>
        </div>
        
        <!-- Active Projects -->
        <div class="bg-green-50 rounded-lg p-3 text-center">
          <Icon name="i-heroicons-briefcase" class="h-5 w-5 text-green-600 mx-auto mb-1" />
          <p class="text-lg font-bold text-green-900">
            {{ category.activeProjects || 0 }}
          </p>
          <p class="text-xs text-green-600">Projects</p>
        </div>
      </div>

      <!-- Popular Items -->
      <div v-if="category.popularItems && category.popularItems.length > 0" class="space-y-2">
        <h4 class="text-sm font-semibold text-gray-700 flex items-center">
          <Icon name="i-heroicons-star" class="h-4 w-4 text-yellow-500 mr-1" />
          Popular Items
        </h4>
        <div class="space-y-1">
          <div 
            v-for="item in category.popularItems.slice(0, 3)" 
            :key="item.id"
            class="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
          >
            <span class="font-medium text-gray-900 truncate">{{ item.name }}</span>
            <span class="text-gray-600">${{ formatPrice(item.price) }}</span>
          </div>
        </div>
      </div>

      <!-- Parent/Child Categories -->
      <div class="flex flex-wrap gap-2">
        <!-- Parent Category -->
        <div v-if="category.parentCategory" class="flex items-center">
          <span class="text-xs text-gray-500 mr-1">Parent:</span>
          <UBadge color="purple" variant="soft" size="xs">
            {{ category.parentCategory.name }}
          </UBadge>
        </div>
        
        <!-- Subcategories -->
        <div v-if="category.subcategories && category.subcategories.length > 0" class="flex items-center space-x-1">
          <span class="text-xs text-gray-500">Subcategories:</span>
          <span class="text-xs font-semibold text-gray-700">{{ category.subcategories.length }}</span>
        </div>
      </div>

      <!-- Recent Activity -->
      <div v-if="category.lastActivity" class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Icon name="i-heroicons-clock" class="h-4 w-4 text-indigo-600" />
            <span class="text-sm font-medium text-indigo-900">Last Activity</span>
          </div>
          <span class="text-sm text-indigo-700">
            {{ formatDate(category.lastActivity) }}
          </span>
        </div>
        <p class="text-xs text-indigo-600 mt-1">
          {{ category.lastActivityDescription || 'Item added/updated' }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-200">
        <div class="flex space-x-2">
          <Tooltip content="View category">
            <UButton 
              size="xs" 
              variant="soft" 
              color="sky"
              icon="i-heroicons-eye"
              @click.stop="$emit('view', category.id)"
            />
          </Tooltip>
          
          <Tooltip content="Edit category">
            <UButton 
              size="xs" 
              variant="soft" 
              color="emerald"
              icon="i-heroicons-pencil"
              @click.stop="$emit('edit', category.id)"
            />
          </Tooltip>
          
          <Tooltip content="Add item">
            <UButton 
              size="xs" 
              variant="soft" 
              color="violet"
              icon="i-heroicons-plus"
              @click.stop="$emit('add-item', category.id)"
            />
          </Tooltip>
        </div>
        
        <div class="flex space-x-2">
          <Tooltip content="View items">
            <UButton 
              size="xs" 
              variant="soft" 
              color="amber"
              icon="i-heroicons-queue-list"
              @click.stop="$emit('view-items', category.id)"
            >
              View Items
            </UButton>
          </Tooltip>
          
          <Tooltip content="Delete category">
            <UButton 
              size="xs" 
              variant="soft" 
              color="red"
              icon="i-heroicons-trash"
              @click.stop="$emit('delete', category.id)"
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
  category: {
    type: Object,
    required: true
  }
})

defineEmits(['click', 'view', 'edit', 'delete', 'add-item', 'view-items'])

// Category colors based on name
const categoryGradient = computed(() => {
  const categoryName = props.category.name || 'default'
  const gradients = {
    'Hardware': 'bg-gradient-to-br from-gray-500 to-gray-600',
    'Software': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'Electronics': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'Materials': 'bg-gradient-to-br from-amber-500 to-amber-600',
    'Tools': 'bg-gradient-to-br from-orange-500 to-orange-600',
    'Office': 'bg-gradient-to-br from-green-500 to-green-600',
    'Safety': 'bg-gradient-to-br from-red-500 to-red-600',
    'Consumables': 'bg-gradient-to-br from-pink-500 to-pink-600',
    'Equipment': 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    'default': 'bg-gradient-to-br from-slate-500 to-slate-600'
  }
  return gradients[categoryName] || gradients.default
})

// Card border color
const cardBorderColor = computed(() => {
  const categoryName = props.category.name || 'default'
  const colors = {
    'Hardware': 'border-l-gray-500',
    'Software': 'border-l-blue-500',
    'Electronics': 'border-l-purple-500',
    'Materials': 'border-l-amber-500',
    'Tools': 'border-l-orange-500',
    'Office': 'border-l-green-500',
    'Safety': 'border-l-red-500',
    'Consumables': 'border-l-pink-500',
    'Equipment': 'border-l-indigo-500',
    'default': 'border-l-slate-500'
  }
  return colors[categoryName] || colors.default
})

// Get category icon
const getCategoryIcon = (categoryName) => {
  const icons = {
    'Hardware': '🔧',
    'Software': '💻',
    'Electronics': '⚡',
    'Materials': '🧱',
    'Tools': '🛠️',
    'Office': '📋',
    'Safety': '🦺',
    'Consumables': '🔋',
    'Equipment': '⚙️',
    'default': '📦'
  }
  return icons[categoryName] || icons.default
}

// Status colors
const getStatusColor = (status) => {
  const colors = {
    'Active': 'green',
    'Inactive': 'orange',
    'Archived': 'red',
    'Draft': 'gray'
  }
  return colors[status] || 'green'
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount || 0)
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
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>