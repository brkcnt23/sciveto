<!-- pages/categories/from-template.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-highlighted">Template'den Kategori Oluştur</h1>
        <p class="text-muted mt-1">
          Sektör standartlarına uygun hazır template'lerden kategori oluşturun
        </p>
      </div>
      
      <div class="flex gap-2">
        <UButton 
          to="/categories"
          variant="ghost"
          icon="i-lucide-arrow-left"
        >
          Geri Dön
        </UButton>
      </div>
    </div>

    <!-- Quick Stats & Progress -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard class="text-center theme-transition">
        <div class="space-y-2">
          <UIcon name="i-lucide-template" class="w-8 h-8 text-primary mx-auto" />
          <div class="text-2xl font-bold text-highlighted">{{ templateStats.total }}</div>
          <div class="text-sm text-muted">Toplam Template</div>
        </div>
      </UCard>
      
      <UCard class="text-center theme-transition">
        <div class="space-y-2">
          <UIcon name="i-lucide-factory" class="w-8 h-8 text-blue-500 mx-auto" />
          <div class="text-2xl font-bold text-blue-600">{{ templateStats.industries }}</div>
          <div class="text-sm text-muted">Sektör</div>
        </div>
      </UCard>
      
      <UCard class="text-center theme-transition">
        <div class="space-y-2">
          <UIcon name="i-lucide-database" class="w-8 h-8 text-green-500 mx-auto" />
          <div class="text-2xl font-bold text-green-600">{{ templateStats.standards }}</div>
          <div class="text-sm text-muted">Standart</div>
        </div>
      </UCard>
      
      <UCard class="text-center theme-transition">
        <div class="space-y-2">
          <UIcon name="i-lucide-zap" class="w-8 h-8 text-warning mx-auto" />
          <div class="text-2xl font-bold text-warning">5dk</div>
          <div class="text-sm text-muted">Kurulum Süresi</div>
        </div>
      </UCard>
    </div>

    <!-- Selection Steps -->
    <UCard class="dashboard-card">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-list-checks" class="w-6 h-6 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Template Seçim Süreci</h3>
          <UBadge color="primary" variant="soft" size="xs">3 Adım</UBadge>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard variant="soft" :color="currentStep >= 1 ? 'success' : 'neutral'" class="theme-transition">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                   :class="currentStep >= 1 ? 'bg-success' : 'bg-neutral-400'">
                1
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-highlighted">Sektör Seçimi</h4>
              <p class="text-sm text-muted mt-1">İş alanınıza uygun sektörü seçin</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" :color="currentStep >= 2 ? 'success' : 'neutral'" class="theme-transition">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                   :class="currentStep >= 2 ? 'bg-success' : 'bg-neutral-400'">
                2
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-highlighted">Template Seçimi</h4>
              <p class="text-sm text-muted mt-1">Ürün kategoriniz için template seçin</p>
            </div>
          </div>
        </UCard>

        <UCard variant="soft" :color="currentStep >= 3 ? 'success' : 'neutral'" class="theme-transition">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                   :class="currentStep >= 3 ? 'bg-success' : 'bg-neutral-400'">
                3
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-highlighted">Özelleştirme</h4>
              <p class="text-sm text-muted mt-1">Kategoriyi ihtiyaçlarınıza göre ayarlayın</p>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>

    <!-- Step 1: Industry Selection -->
    <UCard v-if="currentStep === 1" class="dashboard-card">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-factory" class="w-6 h-6 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Sektör Seçimi</h3>
          <UBadge color="primary" variant="soft" size="xs">Adım 1/3</UBadge>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          İş alanınıza en uygun sektörü seçin. Her sektör için özel hazırlanmış template'ler ve standartlar bulunur.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <UCard 
            v-for="industry in industries"
            :key="industry.id"
            class="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
            :class="selectedIndustry?.id === industry.id ? 'ring-2 ring-primary' : ''"
            @click="selectIndustry(industry)"
          >
            <div class="text-center space-y-4">
              <div class="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <UIcon :name="industry.icon" class="w-8 h-8 text-primary" />
              </div>
              
              <div>
                <h4 class="font-bold text-highlighted text-lg">{{ industry.name }}</h4>
                <p class="text-sm text-muted mt-1">{{ industry.description }}</p>
              </div>
              
              <div class="flex items-center justify-center gap-4 text-sm">
                <div class="flex items-center gap-1">
                  <UIcon name="i-lucide-template" class="w-4 h-4 text-primary" />
                  <span class="text-muted">{{ industry.templateCount }} Template</span>
                </div>
                <div class="flex items-center gap-1">
                  <UIcon name="i-lucide-star" class="w-4 h-4 text-warning" />
                  <span class="text-muted">{{ industry.standardCount }} Standart</span>
                </div>
              </div>
              
              <UBadge 
                v-if="selectedIndustry?.id === industry.id"
                color="primary" 
                variant="solid" 
                size="sm"
              >
                Seçildi
              </UBadge>
            </div>
          </UCard>
        </div>

        <div class="flex justify-end">
          <UButton 
            :disabled="!selectedIndustry"
            @click="goToStep(2)"
            icon="i-lucide-arrow-right"
            trailing
          >
            Template'leri Görüntüle
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Step 2: Template Selection -->
    <UCard v-if="currentStep === 2" class="dashboard-card">
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-template" class="w-6 h-6 text-primary" />
            <h3 class="text-xl font-bold text-highlighted">Template Seçimi</h3>
            <UBadge color="primary" variant="soft" size="xs">Adım 2/3</UBadge>
          </div>
          
          <UButton 
            variant="ghost" 
            size="sm"
            @click="goToStep(1)"
            icon="i-lucide-arrow-left"
          >
            Sektör Değiştir
          </UButton>
        </div>
      </template>

      <div class="space-y-6">
        <UAlert color="primary" variant="soft">
          <template #title>{{ selectedIndustry?.name }} Template'leri</template>
          <template #description>
            {{ selectedIndustry?.name }} sektörü için özel hazırlanmış {{ templates.length }} adet template bulundu.
            Her template sektör standartlarına uygun önceden tanımlanmış alanlar içerir.
          </template>
        </UAlert>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <UCard 
            v-for="template in templates"
            :key="template.id"
            class="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
            :class="selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''"
            @click="selectTemplate(template)"
          >
            <div class="space-y-4">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <UIcon :name="template.icon" class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 class="font-bold text-highlighted">{{ template.name }}</h4>
                    <UBadge color="neutral" variant="soft" size="xs">v{{ template.version }}</UBadge>
                  </div>
                </div>
                
                <UBadge 
                  v-if="selectedTemplate?.id === template.id"
                  color="primary" 
                  variant="solid" 
                  size="xs"
                >
                  Seçildi
                </UBadge>
              </div>
              
              <p class="text-sm text-muted">{{ template.description }}</p>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted">Standartlar</span>
                  <UBadge color="primary" variant="soft" size="xs">{{ template.standardCount }}</UBadge>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted">Alanlar</span>
                  <UBadge color="success" variant="soft" size="xs">{{ template.fieldCount }}</UBadge>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted">Zorunlu Alanlar</span>
                  <UBadge color="warning" variant="soft" size="xs">{{ template.requiredFieldCount }}</UBadge>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <div class="flex justify-between">
          <UButton 
            variant="ghost"
            @click="goToStep(1)"
            icon="i-lucide-arrow-left"
          >
            Geri
          </UButton>
          
          <UButton 
            :disabled="!selectedTemplate"
            @click="goToStep(3)"
            icon="i-lucide-arrow-right"
            trailing
          >
            Özelleştir
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Step 3: Customization -->
    <UCard v-if="currentStep === 3" class="dashboard-card">
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-settings" class="w-6 h-6 text-primary" />
            <h3 class="text-xl font-bold text-highlighted">Kategori Özelleştirme</h3>
            <UBadge color="primary" variant="soft" size="xs">Adım 3/3</UBadge>
          </div>
          
          <UButton 
            variant="ghost" 
            size="sm"
            @click="goToStep(2)"
            icon="i-lucide-arrow-left"
          >
            Template Değiştir
          </UButton>
        </div>
      </template>

      <div class="space-y-6">
        <UAlert color="success" variant="soft">
          <template #title>{{ selectedTemplate?.name }} Template'i Seçildi</template>
          <template #description>
            Template {{ selectedTemplate?.standardCount }} standart ve {{ selectedTemplate?.fieldCount }} alan içeriyor.
            Aşağıdan kategori adını ve rengini özelleştirebilirsiniz.
          </template>
        </UAlert>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Category Settings -->
          <UCard variant="soft" color="neutral">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-edit" class="w-5 h-5 text-primary" />
                <h4 class="font-semibold text-highlighted">Kategori Ayarları</h4>
              </div>
            </template>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-highlighted mb-2">Kategori Adı</label>
                <UInput 
                  v-model="categoryForm.name"
                  placeholder="Örn: Yapısal Profiller"
                  size="lg"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-highlighted mb-2">Açıklama (Opsiyonel)</label>
                <UTextarea 
                  v-model="categoryForm.description"
                  placeholder="Kategori hakkında kısa açıklama..."
                  :rows="3"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-highlighted mb-2">Kategori Rengi</label>
                <div class="flex gap-2 flex-wrap">
                  <div 
                    v-for="color in colorOptions"
                    :key="color"
                    class="w-8 h-8 rounded-lg cursor-pointer border-2 transition-all"
                    :class="categoryForm.color === color ? 'border-gray-900 scale-110' : 'border-gray-300'"
                    :style="{ backgroundColor: color }"
                    @click="categoryForm.color = color"
                  />
                </div>
              </div>
            </div>
          </UCard>

          <!-- Template Preview -->
          <UCard variant="soft" color="primary">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-eye" class="w-5 h-5 text-primary" />
                <h4 class="font-semibold text-highlighted">Template Önizleme</h4>
              </div>
            </template>

            <div class="space-y-4">
              <div v-if="selectedTemplate">
                <h5 class="font-medium text-highlighted mb-2">İçerik Özeti:</h5>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-muted">Standartlar</span>
                    <span class="text-highlighted font-medium">{{ selectedTemplate.standardCount }} adet</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-muted">Toplam Alan</span>
                    <span class="text-highlighted font-medium">{{ selectedTemplate.fieldCount }} adet</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-muted">Zorunlu Alan</span>
                    <span class="text-highlighted font-medium">{{ selectedTemplate.requiredFieldCount }} adet</span>
                  </div>
                </div>
              </div>

              <UButton 
                variant="ghost" 
                size="sm" 
                block
                @click="showPreview = true"
              >
                Detaylı Önizleme
              </UButton>
            </div>
          </UCard>
        </div>

        <div class="flex justify-between">
          <UButton 
            variant="ghost"
            @click="goToStep(2)"
            icon="i-lucide-arrow-left"
          >
            Geri
          </UButton>
          
          <UButton 
            :disabled="!categoryForm.name || isCreating"
            :loading="isCreating"
            @click="createCategory"
            color="primary"
          >
            {{ isCreating ? 'Oluşturuluyor...' : 'Kategori Oluştur' }}
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Interfaces
interface Industry {
  id: string
  name: string
  description: string
  icon: string
  templateCount: number
  standardCount: number
}

interface Template {
  id: string
  name: string
  description: string
  icon: string
  version: string
  standardCount: number
  fieldCount: number
  requiredFieldCount: number
}

interface CategoryForm {
  name: string
  description: string
  color: string
}

// Page meta
definePageMeta({
  middleware: 'auth',
  layout: 'default' // Changed from 'dashboard' to 'default'
})

// Imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// State
const router = useRouter()
const currentStep = ref(1)
const selectedIndustry = ref<Industry | null>(null)
const selectedTemplate = ref<Template | null>(null)
const isCreating = ref(false)
const showPreview = ref(false)

// Form data
const categoryForm = ref<CategoryForm>({
  name: '',
  description: '',
  color: '#3B82F6'
})

// Mock data - replace with API calls
const templateStats = ref({
  total: 15,
  industries: 3,
  standards: 120
})

const industries = ref<Industry[]>([
  {
    id: 'steel-manufacturing',
    name: 'Demir-Çelik İmalat',
    description: 'Profil, plaka ve yapısal çelik ürünleri',
    icon: 'i-lucide-hammer',
    templateCount: 8,
    standardCount: 65
  },
  {
    id: 'tensile-architecture', 
    name: 'Asma Gergi Mimarlık',
    description: 'Membran, halat ve gergi aksesuarları',
    icon: 'i-lucide-tent',
    templateCount: 5,
    standardCount: 45
  },
  {
    id: 'construction',
    name: 'İnşaat & Yapı',
    description: 'Yapı malzemeleri ve inşaat ekipmanları',
    icon: 'i-lucide-building',
    templateCount: 2,
    standardCount: 10
  }
])

const templates = computed((): Template[] => {
  if (!selectedIndustry.value) return []
  
  // Mock templates based on industry
  const mockTemplates: Record<string, Template[]> = {
    'steel-manufacturing': [
      {
        id: 'profil-template',
        name: 'Profil',
        description: 'HEA, HEB, IPE, UPN serisi yapısal profiller',
        icon: 'i-lucide-box',
        version: '1.0',
        standardCount: 15,
        fieldCount: 8,
        requiredFieldCount: 3
      },
      {
        id: 'plaka-template',
        name: 'Plaka',
        description: 'S235, S355, paslanmaz çelik plakalar',
        icon: 'i-lucide-square',
        version: '1.0',
        standardCount: 10,
        fieldCount: 6,
        requiredFieldCount: 2
      }
    ],
    'tensile-architecture': [
      {
        id: 'membran-template',
        name: 'Membran',
        description: 'Ferrari, Mehler, Sioen membran kumaşları',
        icon: 'i-lucide-layers',
        version: '1.0',
        standardCount: 25,
        fieldCount: 10,
        requiredFieldCount: 4
      },
      {
        id: 'halat-template',
        name: 'Halat',
        description: 'Çelik halat çeşitleri ve ölçüleri',
        icon: 'i-lucide-cable',
        version: '1.0',
        standardCount: 12,
        fieldCount: 7,
        requiredFieldCount: 3
      },
      {
        id: 'mapa-template',
        name: 'Mapa',
        description: 'Halat ucu aksesuarları ve bağlantı elemanları',
        icon: 'i-lucide-link',
        version: '1.0',
        standardCount: 8,
        fieldCount: 5,
        requiredFieldCount: 2
      }
    ]
  }
  
  return mockTemplates[selectedIndustry.value.id] || []
})

const colorOptions = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
]

// Methods
const selectIndustry = (industry: Industry) => {
  selectedIndustry.value = industry
}

const selectTemplate = (template: Template) => {
  selectedTemplate.value = template
  // Auto-populate category name
  if (!categoryForm.value.name) {
    categoryForm.value.name = template.name
  }
}

const goToStep = (step: number) => {
  currentStep.value = step
}

const createCategory = async () => {
  if (!selectedTemplate.value || !categoryForm.value.name) return
  
  isCreating.value = true
  
  try {
    // API call to create category from template
    const response: any = await $fetch('/api/templates/create-category', {
      method: 'POST',
      body: {
        templateId: selectedTemplate.value.id,
        categoryName: categoryForm.value.name,
        description: categoryForm.value.description,
        color: categoryForm.value.color
      }
    })
    
    if (response.success) {
      // Success notification
      console.log('Category created successfully!')
      
      // Redirect to categories page
      await router.push('/categories')
    }
  } catch (error) {
    console.error('Failed to create category:', error)
  } finally {
    isCreating.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Load template statistics
  // loadTemplateStats()
})
</script>

<style scoped>
/* Enhanced theme transitions for template selection */
.theme-transition {
  transition: 
    color 0.25s ease-in-out, 
    background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out,
    transform 0.2s ease-in-out;
}

/* Dashboard card hover effect consistent with existing design */
.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.dark .dashboard-card:hover {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.25);
}
</style>