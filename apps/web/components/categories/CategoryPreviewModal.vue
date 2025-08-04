<!-- components/categories/CategoryPreviewModal.vue -->
<template>
  <UModal v-model="isOpen" :ui="{ wrapper: 'w-full max-w-4xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <UIcon :name="category?.icon || 'i-lucide-folder'" 
                  class="w-6 h-6"
                  :style="{ color: category?.color }" />
            <div>
              <h3 class="text-xl font-bold text-highlighted">{{ category?.name }} Önizleme</h3>
              <p class="text-sm text-muted">{{ category?.description }}</p>
            </div>
          </div>
          
          <UButton 
            variant="ghost" 
            size="sm" 
            icon="i-lucide-x"
            @click="close"
          />
        </div>
      </template>

      <div class="space-y-6">
        <!-- Category Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UCard variant="soft" color="primary" class="text-center">
            <div class="space-y-2">
              <UIcon name="i-lucide-package" class="w-8 h-8 text-primary mx-auto" />
              <div class="text-2xl font-bold text-highlighted">{{ category?._count?.stockItems || category?.itemCount || 0 }}</div>
              <div class="text-sm text-muted">Ürün</div>
            </div>
          </UCard>
          
          <UCard variant="soft" color="success" class="text-center">
            <div class="space-y-2">
              <UIcon name="i-lucide-form-input" class="w-8 h-8 text-success mx-auto" />
              <div class="text-2xl font-bold text-highlighted">{{ category?.properties?.length || 0 }}</div>
              <div class="text-sm text-muted">Alan</div>
            </div>
          </UCard>
          
          <UCard variant="soft" color="warning" class="text-center">
            <div class="space-y-2">
              <UIcon name="i-lucide-asterisk" class="w-8 h-8 text-warning mx-auto" />
              <div class="text-2xl font-bold text-highlighted">{{ requiredFieldCount }}</div>
              <div class="text-sm text-muted">Zorunlu</div>
            </div>
          </UCard>
        </div>

        <!-- Category Contents Tabs -->
        <div class="space-y-4">
          <div class="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-fit">
            <UButton
              :variant="activeTab === 'properties' ? 'solid' : 'ghost'"
              size="sm"
              @click="activeTab = 'properties'"
            >
              Özellikler ({{ category?.properties?.length || 0 }})
            </UButton>
            <UButton
              :variant="activeTab === 'sample' ? 'solid' : 'ghost'"
              size="sm"
              @click="activeTab = 'sample'"
            >
              Tablo Önizleme
            </UButton>
          </div>

          <!-- Properties Tab -->
          <UCard v-if="activeTab === 'properties'" variant="soft" color="neutral">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-form-input" class="w-5 h-5 text-success" />
                <h4 class="font-semibold text-highlighted">Kategori Alanları</h4>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-muted">
                Kategoride tanımlı form alanları. Stok ürünü eklerken bu alanlar otomatik olarak gösterilir.
              </p>

              <div class="space-y-3">
                <div 
                  v-for="property in category?.properties"
                  :key="property.id"
                  class="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-700"
                >
                  <div class="flex items-center gap-3">
                    <UIcon 
                      :name="getPropertyIcon(property.type)" 
                      class="w-5 h-5 text-neutral-500" 
                    />
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-medium text-highlighted">{{ property.name }}</span>
                        <UBadge 
                          v-if="property.required" 
                          color="warning" 
                          variant="soft" 
                          size="xs"
                        >
                          Zorunlu
                        </UBadge>
                      </div>
                      <div class="text-sm text-muted" v-if="property.placeholder">
                        {{ property.placeholder }}
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <UBadge variant="outline" size="xs">{{ getPropertyTypeLabel(property.type) }}</UBadge>
                    <span v-if="property.unit" class="text-xs text-muted">{{ property.unit }}</span>
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Sample Table Preview -->
          <UCard v-if="activeTab === 'sample'" variant="soft" color="neutral">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-table" class="w-5 h-5 text-neutral-500" />
                <h4 class="font-semibold text-highlighted">Tablo Önizlemesi</h4>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-muted">
                Bu kategoride oluşturulacak stok ürünlerinin tablo görünümü.
              </p>

              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        # Kod
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Ürün Adı
                      </th>
                      <th 
                        v-for="(property, index) in visibleProperties"
                        :key="index"
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {{ property.name }}
                      </th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Stok
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr v-for="i in 3" :key="i">
                      <td class="px-3 py-2 whitespace-nowrap text-xs">
                        <span class="font-mono">{{ category?.id?.substring(0, 8) || 'XXXXX' }}-{{ 100 + i }}</span>
                      </td>
                      <td class="px-3 py-2 whitespace-nowrap text-xs">
                        <div class="font-medium">{{ category?.name }} Örnek {{ i }}</div>
                      </td>
                      <td 
                        v-for="(property, index) in visibleProperties"
                        :key="index"
                        class="px-3 py-2 whitespace-nowrap text-xs"
                      >
                        <span>{{ getSampleValue(property, i) }}</span>
                      </td>
                      <td class="px-3 py-2 whitespace-nowrap text-xs">
                        <UBadge 
                          :color="i === 1 ? 'success' : i === 2 ? 'warning' : 'error'"
                          variant="soft"
                          size="xs"
                        >
                          {{ i === 1 ? 'Yeterli' : i === 2 ? 'Az' : 'Stokta yok' }}
                        </UBadge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between w-full">
          <UButton variant="ghost" @click="close">
            Kapat
          </UButton>
          
          <UButton 
            color="primary" 
            @click="editCategory"
          >
            Kategoriyi Düzenle
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Category } from '~/types/stock'
import type { CategoryProperty } from '~/types/category'

const props = defineProps<{
  modelValue: boolean
  category?: Category
}>()

const emit = defineEmits(['update:modelValue', 'edit'])

// Local state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const activeTab = ref('properties')

// Computed properties
const requiredFieldCount = computed(() => {
  return props.category?.properties?.filter(p => p.required)?.length || 0
})

const visibleProperties = computed(() => {
  return props.category?.properties?.slice(0, 5) || []
})

// Methods
const getPropertyIcon = (type: string) => {
  const icons = {
    'text': 'i-lucide-type',
    'number': 'i-lucide-hash',
    'select': 'i-lucide-list',
    'boolean': 'i-lucide-toggle-right',
    'textarea': 'i-lucide-file-text',
  }
  return icons[type as keyof typeof icons] || 'i-lucide-help-circle'
}

const getPropertyTypeLabel = (type: string) => {
  const labels = {
    'text': 'Metin',
    'number': 'Sayı',
    'select': 'Seçim',
    'boolean': 'Evet/Hayır',
    'textarea': 'Açıklama',
  }
  return labels[type as keyof typeof labels] || type
}

const getSampleValue = (property: CategoryProperty, index: number) => {
  switch (property.type) {
    case 'text':
      return property.placeholder || `Örnek ${index}`
    case 'number':
      return `${(index * 10) + Math.floor(Math.random() * 90)}${property.unit ? ' ' + property.unit : ''}`
    case 'select':
      return property.options && property.options.length > 0 
        ? property.options[index % property.options.length] 
        : 'Seçenek ' + index
    case 'boolean':
      return index % 2 === 0 ? 'Evet' : 'Hayır'
    case 'textarea':
      return property.placeholder || 'Açıklama metni'
    default:
      return 'Değer ' + index
  }
}

const close = () => {
  isOpen.value = false
}

const editCategory = () => {
  if (props.category) {
    emit('edit', props.category)
    close()
  }
}
</script>
