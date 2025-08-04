<template>
  <UCard 
    class="category-card relative overflow-hidden transition-all duration-200 hover:shadow-lg"
    :class="[
      'border-l-4',
      category.isDefault ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'
    ]"
    :style="{ borderLeftColor: category.color }"
  >
    <!-- Header -->
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div 
            class="w-10 h-10 rounded-lg flex items-center justify-center"
            :style="{ backgroundColor: category.color + '20' }"
          >
            <UIcon 
              :name="category.icon" 
              class="w-5 h-5"
              :style="{ color: category.color }"
            />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ category.name }}</h3>
            <p class="text-sm text-gray-500">{{ category.description || 'Açıklama yok' }}</p>
          </div>
        </div>
        
        <!-- Category Type Badge -->
        <UBadge
          :color="category.isDefault ? 'neutral' : 'primary'"
          variant="soft"
          size="xs"
        >
          {{ category.isDefault ? 'Varsayılan' : 'Özel' }}
        </UBadge>
      </div>
    </template>

    <!-- Stats -->
    <div class="space-y-4">
      <!-- Quick Stats -->
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ category.itemCount || 0 }}</div>
          <div class="text-xs text-gray-500">Ürün</div>
        </div>
        <div class="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div class="text-lg font-bold text-green-600">{{ formatCurrency(category.totalValue || 0) }}</div>
          <div class="text-xs text-gray-500">Değer</div>
        </div>
      </div>

      <!-- Properties Preview -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Özellikler</span>
          <span class="text-xs text-gray-500">{{ category.properties.length }} alan</span>
        </div>
        
        <div class="space-y-1">
          <div 
            v-for="property in category.properties.slice(0, 6)" 
            :key="property.id"
            class="flex items-center justify-between text-xs"
          >
            <span class="text-gray-600 dark:text-gray-400">{{ property.name }}</span>
            <div class="flex items-center gap-1">
              <UBadge 
                :color="getPropertyTypeColor(property.type)" 
                variant="soft" 
                size="xs"
              >
                {{ getPropertyTypeLabel(property.type) }}
              </UBadge>
              <UIcon 
                v-if="property.required" 
                name="i-lucide-asterisk" 
                class="w-2 h-2 text-red-500" 
              />
            </div>
          </div>
          
          <div v-if="category.properties.length > 6" class="text-xs text-gray-400 text-center">
            +{{ category.properties.length - 6 }} daha...
          </div>
        </div>
      </div>

      <!-- Status Indicators -->
      <div class="flex items-center justify-between text-xs">
        <div class="flex items-center gap-4">
          <div v-if="category.lowStockItems" class="flex items-center gap-1 text-red-500">
            <UIcon name="i-lucide-alert-triangle" class="w-3 h-3" />
            <span>{{ category.lowStockItems }} az stok</span>
          </div>
          <div v-if="category.activeProjects" class="flex items-center gap-1 text-blue-500">
            <UIcon name="i-lucide-briefcase" class="w-3 h-3" />
            <span>{{ category.activeProjects }} proje</span>
          </div>
        </div>
        
        <div class="text-gray-400">
          {{ formatDate(category.updatedAt) }}
        </div>
      </div>
    </div>

    <!-- Actions -->
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex gap-1">
          <UButton
            @click="$emit('view-items', category)"
            icon="i-lucide-package"
            size="xs"
            variant="outline"
          >
            Ürünler
          </UButton>
          <UButton
            @click="showPreview = true"
            icon="i-lucide-eye"
            size="xs"
            variant="outline"
          >
            Önizleme
          </UButton>
          <UButton
            v-if="!category.isDefault"
            @click="$emit('edit', category)"
            icon="i-lucide-edit"
            size="xs"
            variant="outline"
          >
            Düzenle
          </UButton>
          
          <!-- Category Preview Modal -->
          <CategoryPreviewModal 
            v-model="showPreview"
            :category="category"
            @edit="$emit('edit', category)"
          />
        </div>
        
        <UDropdown 
          :items="dropdownItems"
          @select="handleDropdownAction"
        >
          <UButton 
            icon="i-lucide-more-horizontal" 
            size="xs" 
            variant="ghost"
          />
        </UDropdown>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Category } from '~/types/stock'
import CategoryPreviewModal from './CategoryPreviewModal.vue'

interface Props {
  category: Category
}

interface Emits {
  (e: 'edit', category: Category): void
  (e: 'delete', category: Category): void
  (e: 'view-items', category: Category): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showPreview = ref(false)

// Computed
const dropdownItems = computed(() => {
  const items = [
    [{
      label: 'Ürünleri Görüntüle',
      icon: 'i-lucide-package',
      action: 'view-items'
    }]
  ]

  if (!props.category.isDefault) {
    items.push([
      {
        label: 'Düzenle',
        icon: 'i-lucide-edit',
        action: 'edit'
      },
      {
        label: 'Sil',
        icon: 'i-lucide-trash-2',
        action: 'delete'
      }
    ])
  } else {
    items.push([
      {
        label: 'Kopyala',
        icon: 'i-lucide-copy',
        action: 'duplicate'
      }
    ])
  }

  return items
})

// Methods
const getPropertyTypeColor = (type: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    text: 'info',
    number: 'success',
    textarea: 'secondary',
    select: 'warning',
    boolean: 'primary'
  }
  return colors[type] || 'neutral'
}

const getPropertyTypeLabel = (type: string) => {
  const labels = {
    text: 'Metin',
    number: 'Sayı',
    textarea: 'Uzun Metin',
    select: 'Seçim',
    boolean: 'E/H'
  }
  return labels[type as keyof typeof labels] || type
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).format(new Date(date))
}

const handleDropdownAction = (item: any) => {
  switch (item.action) {
    case 'view-items':
      emit('view-items', props.category)
      break
    case 'edit':
      emit('edit', props.category)
      break
    case 'delete':
      if (confirm(`${props.category.name} kategorisini silmek istediğinizden emin misiniz?`)) {
        emit('delete', props.category)
      }
      break
    case 'duplicate':
      // TODO: Implement duplicate functionality
      break
  }
}
</script>

<style scoped>
.category-card {
  min-height: 280px;
}

.category-card:hover {
  transform: translateY(-2px);
}
</style>
