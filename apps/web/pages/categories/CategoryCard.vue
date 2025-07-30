<!-- apps/web/components/categories/CategoryCard.vue -->
<template>
  <UCard 
    class="hover:shadow-lg transition-all duration-200 cursor-pointer group"
    @click="$emit('viewDetails', category)"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div 
          class="p-3 rounded-xl transition-transform group-hover:scale-110"
          :style="{ backgroundColor: category.color + '20' }"
        >
          <UIcon 
            :name="category.icon" 
            class="w-6 h-6"
            :style="{ color: category.color }"
          />
        </div>
        
        <div>
          <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
            {{ category.name }}
          </h3>
          <p class="text-sm text-gray-500 line-clamp-1">
            {{ category.description }}
          </p>
        </div>
      </div>

      <!-- Badge -->
      <UBadge 
        :color="category.isDefault ? 'info' : 'primary'" 
        variant="soft"
        size="sm"
      >
        {{ category.isDefault ? 'Varsayılan' : 'Özel' }}
      </UBadge>
    </div>

    <!-- Properties Count -->
    <div class="mb-4">
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <UIcon name="i-lucide-list" class="w-4 h-4" />
        <span>{{ category.properties.length }} özellik</span>
      </div>
    </div>

    <!-- Properties Preview -->
    <div v-if="category.properties.length > 0" class="mb-4">
      <div class="flex flex-wrap gap-1">
        <UBadge
          v-for="property in category.properties.slice(0, 3)"
          :key="property.id"
          variant="soft"
          size="xs"
          color="neutral"
        >
          {{ property.name }}
        </UBadge>
        <UBadge
          v-if="category.properties.length > 3"
          variant="soft"
          size="xs"
          color="neutral"
        >
          +{{ category.properties.length - 3 }} daha
        </UBadge>
      </div>
    </div>

    <!-- Created Date -->
    <div class="mb-4 text-xs text-gray-400">
      {{ formatDate(category.createdAt) }} tarihinde oluşturuldu
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center gap-2">
      <UButton
        @click.stop="$emit('edit', category)"
        icon="i-lucide-edit"
        size="sm"
        variant="outline"
        class="flex-1"
      >
        Düzenle
      </UButton>
      
      <UButton
        v-if="!category.isDefault"
        @click.stop="$emit('delete', category)"
        icon="i-lucide-trash-2"
        size="sm"
        color="error"
        variant="outline"
      >
        Sil
      </UButton>
      
      <UButton
        @click.stop="$emit('viewDetails', category)"
        icon="i-lucide-eye"
        size="sm"
        variant="ghost"
      >
        Detay
      </UButton>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg pointer-events-none" />
  </UCard>
</template>

<script setup lang="ts">
import type { Category } from '~/types/category'

// Props
interface Props {
  category: Category
}

defineProps<Props>()

// Emits
defineEmits<{
  edit: [category: Category]
  delete: [category: Category]
  viewDetails: [category: Category]
}>()

// Methods
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>