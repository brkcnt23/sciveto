<!-- apps/web/pages/stock-items/create.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <UButton 
        to="/stock-items" 
        icon="i-lucide-arrow-left" 
        variant="ghost"
        size="sm"
      />
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
          Yeni Stok Kalemi Ekle
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400">
          Kategori seçin ve ürün bilgilerini girin
        </p>
      </div>
    </div>

    <!-- Category Selection -->
    <UCard v-if="!selectedCategory">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-folder" class="w-5 h-5" />
          <h2 class="text-lg font-semibold">Kategori Seçin</h2>
        </div>
      </template>

      <div class="space-y-4">
        <UInput
          v-model="categorySearch"
          placeholder="Kategori ara..."
          icon="i-lucide-search"
          size="lg"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="category in filteredCategories"
            :key="category.id"
            class="p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer group"
            @click="selectCategory(category)"
          >
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
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  {{ category.name }}
                </h3>
                <p class="text-sm text-neutral-500">
                  {{ category.properties.length }} özellik
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredCategories.length === 0" class="text-center py-8">
          <UIcon name="i-lucide-search-x" class="w-12 h-12 text-neutral-400 mx-auto mb-2" />
          <p class="text-neutral-500">Aradığınız kategoride sonuç bulunamadı</p>
          <UButton 
            to="/categories/create"
            variant="outline"
            icon="i-lucide-plus"
            class="mt-4"
          >
            Yeni Kategori Oluştur
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Stock Item Form -->
    <div v-if="selectedCategory" class="space-y-6">
      <!-- Selected Category Info -->
      <UCard>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div 
              class="p-2 rounded-lg"
              :style="{ backgroundColor: selectedCategory.color + '20' }"
            >
              <UIcon 
                :name="selectedCategory.icon" 
                class="w-5 h-5"
                :style="{ color: selectedCategory.color }"
              />
            </div>
            <div>
              <h3 class="font-medium">{{ selectedCategory.name }}</h3>
              <p class="text-sm text-neutral-500">{{ selectedCategory.description }}</p>
            </div>
          </div>
          
          <UButton 
            @click="selectedCategory = null" 
            icon="i-lucide-x" 
            variant="ghost" 
            size="sm"
          />
        </div>
      </UCard>

      <!-- Basic Info Form -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Temel Bilgiler</h3>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="Ürün Adı" required>
            <UInput 
              v-model="form.name"
              placeholder="Ürün adını girin"
              icon="i-lucide-tag"
            />
          </UFormField>

          <UFormField label="Birim" required>
            <USelect
              v-model="form.unit"
              :options="unitOptions"
              placeholder="Birim seçin"
            />
          </UFormField>

          <UFormField label="Mevcut Stok" required class="md:col-span-2">
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Mevcut Stok
                </label>
                <UInput 
                  v-model.number="form.currentStock"
                  type="number"
                  min="0"
                  placeholder="0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Minimum Stok
                </label>
                <UInput 
                  v-model.number="form.minStock"
                  type="number"
                  min="0"
                  placeholder="0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Maksimum Stok
                </label>
                <UInput 
                  v-model.number="form.maxStock"
                  type="number"
                  min="0"
                  placeholder="Opsiyonel"
                />
              </div>
            </div>
          </UFormField>

          <UFormField label="Açıklama" class="md:col-span-2">
            <UTextarea 
              v-model="form.description"
              placeholder="Ürün hakkında ek bilgiler"
              :rows="3"
            />
          </UFormField>
        </div>
      </UCard>

      <!-- Category-Specific Properties -->
      <UCard v-if="selectedCategory.properties.length > 0">
        <template #header>
          <h3 class="text-lg font-semibold">
            {{ selectedCategory.name }} Özellikleri
          </h3>
        </template>

        <DynamicPropertyForm
          :properties="selectedCategory.properties"
          v-model="form.properties"
        />
      </UCard>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <UButton 
          @click="saveStockItem"
          :loading="saving"
          :disabled="!isFormValid"
          size="lg"
          icon="i-lucide-save"
        >
          Ürünü Kaydet
        </UButton>
        
        <UButton 
          @click="saveAndCreateAnother"
          :loading="saving"
          :disabled="!isFormValid"
          variant="outline"
          size="lg"
          icon="i-lucide-plus"
        >
          Kaydet & Yeni Ekle
        </UButton>

        <UButton 
          to="/stock-items"
          variant="outline"
          size="lg"
        >
          İptal
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useCategoryManager } from '~/composables/useCategoryManager'
import { useStockItemManager } from '~/composables/useStockItemManager'
import DynamicPropertyForm from '~/components/forms/DynamicPropertyForm.vue'
import type { Category } from '~/types/stock'

// Page setup
definePageMeta({
  title: 'Yeni Stok Kalemi'
})

useHead({
  title: 'Yeni Stok Kalemi - Sciveto'
})

// Composables
const { categories, fetchCategories } = useCategoryManager()
const { createStockItem } = useStockItemManager()

// State
const selectedCategory = ref<Category | null>(null)
const categorySearch = ref('')
const saving = ref(false)

const form = reactive({
  name: '',
  description: '',
  unit: '',
  currentStock: 0,
  minStock: 0,
  maxStock: null as number | null,
  properties: {} as Record<string, any>
})

// Options
const unitOptions = [
  { label: 'Adet', value: 'adet' },
  { label: 'Metre (m)', value: 'm' },
  { label: 'Metrekare (m²)', value: 'm²' },
  { label: 'Metreküp (m³)', value: 'm³' },
  { label: 'Kilogram (kg)', value: 'kg' },
  { label: 'Gram (g)', value: 'g' },
  { label: 'Litre (L)', value: 'L' },
  { label: 'Paket', value: 'paket' },
  { label: 'Kutu', value: 'kutu' },
  { label: 'Rulo', value: 'rulo' }
]

// Computed
const filteredCategories = computed(() => {
  if (!categorySearch.value) return categories.value
  
  const search = categorySearch.value.toLowerCase()
  return categories.value.filter(category =>
    category.name.toLowerCase().includes(search) ||
    category.description?.toLowerCase().includes(search)
  )
})

const isFormValid = computed(() => {
  if (!form.name.trim() || !form.unit || !selectedCategory.value) {
    return false
  }

  // Check required properties
  return selectedCategory.value.properties
    .filter(prop => prop.required)
    .every(prop => {
      const value = form.properties[prop.id]
      return value !== undefined && value !== null && value !== ''
    })
})

// Methods
const selectCategory = (category: any) => {
  // Create a mutable copy of the category
  selectedCategory.value = {
    ...category,
    properties: [...category.properties].map(prop => ({ ...prop }))
  }
  
  // Reset form properties
  form.properties = {}
  
  // Initialize properties with default values
  if (selectedCategory.value) {
    selectedCategory.value.properties.forEach(prop => {
    switch (prop.type) {
      case 'boolean':
        form.properties[prop.id] = false
        break
      case 'number':
        form.properties[prop.id] = null
        break
      default:
        form.properties[prop.id] = ''
    }
  })
  }
}

const saveStockItem = async () => {
  if (!selectedCategory.value || !isFormValid.value) return
  
  saving.value = true
  
  try {
    await createStockItem({
      name: form.name,
      description: form.description,
      categoryId: selectedCategory.value.id,
      unit: form.unit,
      stock: form.currentStock,
      minStockLevel: form.minStock || undefined,
      maxStockLevel: form.maxStock || undefined,
      customProperties: form.properties
    })
    
    // Success - redirect to stock items list
    await navigateTo('/stock-items')
    
    // TODO: Show success toast
    console.log('Stok kalemi başarıyla oluşturuldu')
    
  } catch (error) {
    console.error('Stok kalemi oluşturulurken hata:', error)
    // TODO: Show error toast
  } finally {
    saving.value = false
  }
}

const saveAndCreateAnother = async () => {
  await saveStockItem()
  
  if (!saving.value) {
    // Reset form but keep category selection
    form.name = ''
    form.description = ''
    form.currentStock = 0
    form.minStock = 0
    form.maxStock = null
    
    // Reset properties to default values
    if (selectedCategory.value) {
      selectedCategory.value.properties.forEach(prop => {
        switch (prop.type) {
          case 'boolean':
            form.properties[prop.id] = false
            break
          case 'number':
            form.properties[prop.id] = null
            break
          default:
            form.properties[prop.id] = ''
        }
      })
    }
  }
}

// Load categories on mount
onMounted(() => {
  fetchCategories()
})
</script>