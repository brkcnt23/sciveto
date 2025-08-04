<!-- pages/categories/index.vue - Enhanced with Template Selection -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-highlighted">Kategori Yönetimi</h1>
        <p class="text-muted mt-1">
          Stok kategorilerinizi oluşturun ve yönetin
        </p>
      </div>
      
      <div class="flex gap-2">
        <UButton 
          to="/categories/from-template"
          color="primary"
          icon="i-lucide-template"
        >
          Template'den Oluştur
        </UButton>
        
        <UButton 
          to="/categories/create-new"
          variant="ghost"
          icon="i-lucide-plus"
        >
          Manuel Oluştur
        </UButton>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard class="text-center theme-transition">
        <div class="space-y-2">
          <UIcon name="i-lucide-folder" class="w-8 h-8 text-primary mx-auto" />
          <div class="text-2xl font-bold text-highlighted">{{ totalCategories }}</div>
          <div class="text-sm text-muted">Toplam Kategori</div>
        </div>
      </UCard>
      
      <UCard class="text-center theme-transition">
        <div class="space-y-2">
          <UIcon name="i-lucide-package" class="w-8 h-8 text-green-500 mx-auto" />
          <div class="text-2xl font-bold text-green-600">{{ totalProducts }}</div>
          <div class="text-sm text-muted">Toplam Ürün</div>
        </div>
      </UCard>
      
      <UCard class="text-center theme-transition">
        <div class="space-y-2">
          <UIcon name="i-lucide-template" class="w-8 h-8 text-blue-500 mx-auto" />
          <div class="text-2xl font-bold text-blue-600">{{ templateBasedCategories.length }}</div>
          <div class="text-sm text-muted">Template Kategori</div>
        </div>
      </UCard>
      
      <UCard class="text-center theme-transition">
        <div class="space-y-2">
          <UIcon name="i-lucide-user" class="w-8 h-8 text-purple-500 mx-auto" />
          <div class="text-2xl font-bold text-purple-600">{{ customCategories.length }}</div>
          <div class="text-sm text-muted">Manuel Kategori</div>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions Banner -->
    <UAlert color="primary" variant="soft" class="theme-transition">
      <template #title>🚀 Hızlı Kategori Oluşturma</template>
      <template #description>
        <div class="space-y-3 mt-3">
          <p>
            Sektör standartlarına uygun kategorileri dakikalar içinde oluşturun! 
            Template sistemimiz ile Profil, Plaka, Halat, Membran ve daha fazlası hazır.
          </p>
          
          <div class="flex gap-2 flex-wrap">
            <UBadge color="primary" variant="soft" size="sm">15+ Template</UBadge>
            <UBadge color="success" variant="soft" size="sm">120+ Standart</UBadge>
            <UBadge color="warning" variant="soft" size="sm">5 Dakika Kurulum</UBadge>
          </div>
          
          <div class="flex gap-2 mt-4">
            <UButton 
              to="/categories/from-template"
              size="sm"
              icon="i-lucide-zap"
            >
              Template'leri Keşfet
            </UButton>
            <UButton 
              variant="ghost" 
              size="sm"
              @click="showTemplateInfo = true"
            >
              Nasıl Çalışır?
            </UButton>
          </div>
        </div>
      </template>
    </UAlert>

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
        :variant="activeTab === 'template' ? 'solid' : 'ghost'"
        size="sm"
        @click="activeTab = 'template'"
      >
        Template ({{ templateBasedCategories.length }})
      </UButton>
      <UButton
        :variant="activeTab === 'custom' ? 'solid' : 'ghost'"
        size="sm"
        @click="activeTab = 'custom'"
      >
        Manuel ({{ customCategories.length }})
      </UButton>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <UCard 
        v-for="category in filteredCategories"
        :key="category.id"
        class="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl theme-transition"
        @click="viewCategory(category)"
      >
        <div class="space-y-4">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div 
                class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                :style="{ backgroundColor: category.color }"
              >
                <UIcon :name="category.icon || 'i-lucide-folder'" class="w-6 h-6" />
              </div>
              <div>
                <h4 class="font-bold text-highlighted">{{ category.name }}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <UBadge 
                    v-if="category.isSystemBased"
                    color="primary" 
                    variant="soft" 
                    size="xs"
                  >
                    Template
                  </UBadge>
                  <UBadge 
                    v-else
                    color="neutral" 
                    variant="soft" 
                    size="xs"
                  >
                    Manuel
                  </UBadge>
                </div>
              </div>
            </div>
            
            <UDropdown :items="getCategoryActions(category)">
              <UButton variant="ghost" size="sm" icon="i-lucide-more-horizontal" />
            </UDropdown>
          </div>
          
          <p v-if="category.description" class="text-sm text-muted">
            {{ category.description }}
          </p>
          
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted">{{ category.itemCount || 0 }} ürün</span>
            <span class="text-muted">{{ formatDate(category.createdAt) }}</span>
          </div>
          
          <!-- Template Info -->
          <div v-if="category.isSystemBased && category.templateInfo" class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted">Template</span>
              <span class="text-highlighted font-medium">{{ category.templateInfo.name }} v{{ category.templateInfo.version }}</span>
            </div>
            <div class="flex gap-2">
              <UBadge color="primary" variant="soft" size="xs">
                {{ category.templateInfo.standardCount }} Standart
              </UBadge>
              <UBadge color="success" variant="soft" size="xs">
                {{ category.templateInfo.fieldCount }} Alan
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Add New Category Card -->
      <UCard 
        class="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl theme-transition border-2 border-dashed border-neutral-300 dark:border-neutral-600"
        @click="showCreateOptions = true"
      >
        <div class="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <UIcon name="i-lucide-plus" class="w-8 h-8 text-neutral-400" />
          </div>
          <div>
            <h4 class="font-semibold text-highlighted">Yeni Kategori</h4>
            <p class="text-sm text-muted mt-1">Template veya manuel oluştur</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <UCard v-if="filteredCategories.length === 0" class="text-center py-12">
      <div class="space-y-4">
        <UIcon name="i-lucide-folder-x" class="w-16 h-16 text-neutral-400 mx-auto" />
        <div>
          <h3 class="text-lg font-semibold text-highlighted">Kategori Bulunamadı</h3>
          <p class="text-muted mt-1">
            {{ activeTab === 'all' ? 'Henüz hiç kategori oluşturulmamış.' : `${activeTab} kategorisi bulunamadı.` }}
          </p>
        </div>
        <UButton 
          to="/categories/from-template"
          color="primary"
        >
          İlk Kategoriyi Oluştur
        </UButton>
      </div>
    </UCard>

    <!-- Create Options Modal -->
    <UModal v-model="showCreateOptions">
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-plus-circle" class="w-6 h-6 text-primary" />
            <h3 class="text-xl font-bold text-highlighted">Kategori Oluşturma Seçeneği</h3>
          </div>
        </template>

        <div class="space-y-6">
          <p class="text-muted">
            Nasıl kategori oluşturmak istiyorsunuz?
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCard 
              class="cursor-pointer hover:bg-primary/5 transition-colors"
              @click="navigateToTemplate"
            >
              <div class="text-center space-y-3">
                <UIcon name="i-lucide-template" class="w-12 h-12 text-primary mx-auto" />
                <div>
                  <h4 class="font-bold text-highlighted">Template'den Oluştur</h4>
                  <p class="text-sm text-muted mt-1">Sektör standartları ile hızlı kurulum</p>
                </div>
                <UBadge color="primary" variant="soft" size="sm">Önerilen</UBadge>
              </div>
            </UCard>

            <UCard 
              class="cursor-pointer hover:bg-neutral/5 transition-colors"
              @click="navigateToManual"
            >
              <div class="text-center space-y-3">
                <UIcon name="i-lucide-edit" class="w-12 h-12 text-neutral-500 mx-auto" />
                <div>
                  <h4 class="font-bold text-highlighted">Manuel Oluştur</h4>
                  <p class="text-sm text-muted mt-1">Sıfırdan özel kategori tasarla</p>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton variant="ghost" @click="showCreateOptions = false">
              İptal
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'auth',
  layout: 'default' // Changed from 'dashboard' to 'default'
})

// Imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Category } from '~/types/category'

// Interfaces
interface TemplateInfo {
  name: string
  version: string
  standardCount: number
  fieldCount: number
}

// State
const router = useRouter()
const activeTab = ref('all')
const showCreateOptions = ref(false)
const showTemplateInfo = ref(false)

// Mock data - replace with API calls
const allCategories = ref<(Category & { itemCount?: number; isSystemBased?: boolean; templateInfo?: TemplateInfo })[]>([
  {
    id: '1',
    name: 'Profil',
    description: 'HEA, HEB, IPE serisi yapısal profiller',
    color: '#3B82F6',
    icon: 'i-lucide-box',
    isDefault: true,
    properties: [],
    itemCount: 25,
    isSystemBased: true,
    templateInfo: {
      name: 'Profil',
      version: '1.0',
      standardCount: 15,
      fieldCount: 8
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Plaka',
    description: 'S235, S355, paslanmaz çelik plakalar',
    color: '#10B981',
    icon: 'i-lucide-square',
    isDefault: true,
    properties: [],
    itemCount: 18,
    isSystemBased: true,
    templateInfo: {
      name: 'Plaka',
      version: '1.0',
      standardCount: 10,
      fieldCount: 6
    },
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'Özel Aksesuarlar',
    description: 'Firmaya özel üretim aksesuarları',
    color: '#8B5CF6',
    icon: 'i-lucide-wrench',
    isDefault: false,
    properties: [],
    itemCount: 8,
    isSystemBased: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
])

// Computed
const totalCategories = computed(() => allCategories.value.length)
const totalProducts = computed(() => allCategories.value.reduce((sum, cat) => sum + (cat.itemCount || 0), 0))
const templateBasedCategories = computed(() => allCategories.value.filter(cat => cat.isSystemBased))
const customCategories = computed(() => allCategories.value.filter(cat => !cat.isSystemBased))

const filteredCategories = computed(() => {
  switch (activeTab.value) {
    case 'template':
      return templateBasedCategories.value
    case 'custom':
      return customCategories.value
    default:
      return allCategories.value
  }
})

// Methods
const viewCategory = (category: any) => {
  router.push(`/categories/${category.id}`)
}

const getCategoryActions = (category: any) => [
  [{
    label: 'Görüntüle',
    icon: 'i-lucide-eye',
    click: () => viewCategory(category)
  }],
  [{
    label: 'Düzenle',
    icon: 'i-lucide-edit',
    click: () => router.push(`/categories/${category.id}/edit`)
  }],
  [{
    label: 'Sil',
    icon: 'i-lucide-trash-2',
    click: () => deleteCategory(category)
  }]
]

const deleteCategory = (category: Category) => {
  // Implement delete logic
  console.log('Delete category:', category.id)
}

const navigateToTemplate = () => {
  showCreateOptions.value = false
  router.push('/categories/from-template')
}

const navigateToManual = () => {
  showCreateOptions.value = false
  router.push('/categories/create-new')
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date))
}

// Lifecycle
onMounted(() => {
  // Load categories from API
  // loadCategories()
})
</script>

<style scoped>
/* Enhanced theme transitions consistent with existing design */
.theme-transition {
  transition: 
    color 0.25s ease-in-out, 
    background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out,
    transform 0.2s ease-in-out;
}
</style>