<!-- pages/categories/index.vue - Enhanced Category Management -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Kategori Yönetimi</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1">
          Stok kategorilerinizi oluşturun ve yönetin
        </p>
      </div>
      
      <div class="flex gap-2">
        <UButton 
          to="/categories/create-new"
          icon="i-lucide-plus"
        >
          Yeni Kategori
        </UButton>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-folder" class="w-8 h-8 text-primary mx-auto" />
          <div class="text-2xl font-bold text-neutral-900 dark:text-white">{{ totalCategories }}</div>
          <div class="text-sm text-neutral-500">Toplam Kategori</div>
        </div>
      </UCard>
      
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-package" class="w-8 h-8 text-green-500 mx-auto" />
          <div class="text-2xl font-bold text-green-600">{{ totalProducts }}</div>
          <div class="text-sm text-neutral-500">Toplam Ürün</div>
        </div>
      </UCard>
      
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-user" class="w-8 h-8 text-blue-500 mx-auto" />
          <div class="text-2xl font-bold text-blue-600">{{ customCategories.length }}</div>
          <div class="text-sm text-neutral-500">Özel Kategori</div>
        </div>
      </UCard>
      
      <UCard class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-settings" class="w-8 h-8 text-purple-500 mx-auto" />
          <div class="text-2xl font-bold text-purple-600">{{ defaultCategories.length }}</div>
          <div class="text-sm text-neutral-500">Varsayılan Kategori</div>
        </div>
      </UCard>
    </div>

    <!-- Category Tabs -->
    <div class="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-fit">
      <UButton
        :variant="activeTab === 'all' ? 'solid' : 'ghost'"
        size="sm"
        @click="activeTab = 'all'"
      >
        Tümü ({{ allCategories.length }})
      </UButton>
      <UButton
        :variant="activeTab === 'default' ? 'solid' : 'ghost'"
        size="sm"
        @click="activeTab = 'default'"
      >
        Varsayılan ({{ defaultCategories.length }})
      </UButton>
      <UButton
        :variant="activeTab === 'custom' ? 'solid' : 'ghost'"
        size="sm"
        @click="activeTab = 'custom'"
      >
        Özel ({{ customCategories.length }})
      </UButton>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CategoryCard
        v-for="category in displayedCategories"
        :key="category.id"
        :category="category"
        @edit="editCategory"
        @delete="deleteCategory"
        @view-items="viewCategoryItems"
      />
    </div>

    <!-- Empty State -->
    <div v-if="displayedCategories.length === 0" class="text-center py-12">
      <UIcon 
        :name="activeTab === 'custom' ? 'i-lucide-folder-plus' : 'i-lucide-folder'" 
        class="w-16 h-16 text-neutral-400 mx-auto mb-4" 
      />
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        {{ activeTab === 'custom' ? 'Henüz özel kategori yok' : 'Kategori bulunamadı' }}
      </h3>
      <p class="text-neutral-500 mb-4">
        {{ activeTab === 'custom' 
          ? 'Kendi kategorilerinizi oluşturmaya başlayın' 
          : 'Sistemde kategori bulunmuyor' 
        }}
      </p>
      <UButton 
        v-if="activeTab === 'custom'"
        to="/categories/create-new"
        icon="i-lucide-plus"
      >
        İlk Kategorini Oluştur
      </UButton>
    </div>

    <!-- Quick Create Templates -->
    <UCard v-if="activeTab === 'custom' && customCategories.length === 0">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-sparkles" class="w-5 h-5" />
          <h3 class="font-semibold">Hızlı Başlangıç Şablonları</h3>
        </div>
      </template>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="template in quickTemplates"
          :key="template.id"
          class="p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer"
          @click="useTemplate(template)"
        >
          <div class="text-center space-y-2">
            <UIcon :name="template.icon" class="w-8 h-8 mx-auto" :style="{ color: template.color }" />
            <div class="font-semibold">{{ template.name }}</div>
            <div class="text-sm text-neutral-500">{{ template.description }}</div>
            <div class="text-xs text-neutral-400">{{ template.properties.length }} özel alan</div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CategoryCard from '~/components/categories/CategoryCard.vue'
import type { Category } from '~/types/stock'

// Page setup
definePageMeta({
  middleware: 'auth',
  title: 'Kategoriler'
})

useHead({
  title: 'Kategori Yönetimi'
})

// State
const activeTab = ref('all')
const loading = ref(false)

// Mock default categories (these would come from your JSON imports)
const defaultCategories = ref<Category[]>([
  {
    id: 'membran',
    name: 'Membran',
    description: 'Su yalıtım membranları',
    color: '#3B82F6',
    icon: 'i-lucide-layers',
    isDefault: true,
    properties: [
      { id: '1', name: 'Marka', type: 'text', required: true },
      { id: '2', name: 'Kalınlık', type: 'number', required: true, unit: 'mm' },
      { id: '3', name: 'Genişlik', type: 'number', required: true, unit: 'cm' },
      { id: '4', name: 'Garanti', type: 'number', required: false, unit: 'yıl' }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    itemCount: 25,
    totalValue: 15400,
    lowStockItems: 3,
    activeProjects: 5
  },
  {
    id: 'halat',
    name: 'Halat',
    description: 'Çelik ve fiber halatlar',
    color: '#10B981',
    icon: 'i-lucide-cable',
    isDefault: true,
    properties: [
      { id: '1', name: 'Çap', type: 'number', required: true, unit: 'mm' },
      { id: '2', name: 'Malzeme', type: 'select', required: true, options: ['Çelik', 'Fiber', 'Karışım'] },
      { id: '3', name: 'Kopma Yükü', type: 'number', required: true, unit: 'kg' }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    itemCount: 18,
    totalValue: 8900,
    lowStockItems: 1,
    activeProjects: 3
  },
  {
    id: 'mapa',
    name: 'Mapa',
    description: 'Bağlantı elemanları',
    color: '#F59E0B',
    icon: 'i-lucide-link',
    isDefault: true,
    properties: [
      { id: '1', name: 'Tip', type: 'select', required: true, options: ['Saplama', 'Klips', 'Bağlantı'] },
      { id: '2', name: 'Uyumlu Çap', type: 'number', required: true, unit: 'mm' },
      { id: '3', name: 'Malzeme', type: 'text', required: true }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    itemCount: 42,
    totalValue: 3200,
    lowStockItems: 7,
    activeProjects: 2
  }
])

// Custom categories from localStorage
const customCategories = ref<Category[]>([])

// Computed
const allCategories = computed(() => [...defaultCategories.value, ...customCategories.value])

const displayedCategories = computed(() => {
  switch (activeTab.value) {
    case 'default':
      return defaultCategories.value
    case 'custom':
      return customCategories.value
    default:
      return allCategories.value
  }
})

const totalCategories = computed(() => allCategories.value.length)
const totalProducts = computed(() => allCategories.value.reduce((sum, cat) => sum + (cat.itemCount || 0), 0))

// Quick templates
const quickTemplates = [
  {
    id: 'gitar',
    name: 'Gitar',
    description: 'Müzik aleti kategorisi',
    color: '#EC4899',
    icon: 'i-lucide-music',
    properties: [
      { name: 'Frets', type: 'number', required: true, unit: 'adet' },
      { name: 'Kulakçık', type: 'select', required: true, options: ['Çelik', 'Naylon', 'Bronz'] },
      { name: 'Pickguard', type: 'boolean', required: false },
      { name: 'Marka', type: 'text', required: true }
    ]
  },
  {
    id: 'elektronik',
    name: 'Elektronik',
    description: 'Elektronik bileşenler',
    color: '#8B5CF6',
    icon: 'i-lucide-zap',
    properties: [
      { name: 'Voltaj', type: 'number', required: true, unit: 'V' },
      { name: 'Akım', type: 'number', required: true, unit: 'A' },
      { name: 'Model', type: 'text', required: true },
      { name: 'Boyut', type: 'text', required: false }
    ]
  },
  {
    id: 'malzeme',
    name: 'Malzeme',
    description: 'Genel malzemeler',
    color: '#06B6D4',
    icon: 'i-lucide-layers',
    properties: [
      { name: 'Malzeme Türü', type: 'select', required: true, options: ['Metal', 'Plastik', 'Ahşap', 'Cam'] },
      { name: 'Boyut', type: 'text', required: true },
      { name: 'Ağırlık', type: 'number', required: false, unit: 'kg' },
      { name: 'Renk', type: 'text', required: false }
    ]
  }
]

// Methods
const loadCustomCategories = () => {
  const saved = localStorage.getItem('custom_categories')
  if (saved) {
    customCategories.value = JSON.parse(saved)
  }
}

const useTemplate = (template: any) => {
  navigateTo(`/categories/create-new?example=${template.id}`)
}

const editCategory = (category: Category) => {
  navigateTo(`/categories/${category.id}/edit`)
}

const deleteCategory = async (category: Category) => {
  if (category.isDefault) {
    // Show warning for default categories
    return
  }
  
  // Remove from custom categories
  customCategories.value = customCategories.value.filter(cat => cat.id !== category.id)
  localStorage.setItem('custom_categories', JSON.stringify(customCategories.value))
}

const viewCategoryItems = (category: Category) => {
  navigateTo(`/stock-items?category=${category.id}`)
}

onMounted(() => {
  loadCustomCategories()
})
</script>
