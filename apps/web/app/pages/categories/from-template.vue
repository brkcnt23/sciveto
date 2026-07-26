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
          <UIcon name="i-lucide-file-text" class="w-8 h-8 text-primary mx-auto" />
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

        <div v-if="apiLoading" class="flex items-center justify-center py-12">
          <div class="text-center space-y-4">
            <UIcon name="i-lucide-loader-2" class="w-8 h-8 text-primary animate-spin mx-auto" />
            <p class="text-muted">Template'ler yükleniyor...</p>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            <UIcon name="i-lucide-file-text" class="w-6 h-6 text-primary" />
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

        <div class="space-y-6">
          <!-- Category Settings -->
          <UCard variant="soft" color="neutral">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-edit" class="w-5 h-5 text-primary" />
                <h4 class="font-semibold text-highlighted">Kategori Ayarları</h4>
              </div>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    :class="categoryForm.color === color ? 'border-neutral-900 scale-110' : 'border-neutral-300'"
                    :style="{ backgroundColor: color }"
                    @click="categoryForm.color = color"
                  />
                </div>
              </div>
            </div>
          </UCard>

          <!-- Template Details Preview -->
          <UCard v-if="selectedTemplate" variant="soft" color="primary">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon :name="selectedTemplate?.icon || 'i-lucide-folder'" class="w-6 h-6 text-primary" />
                <div>
                  <h4 class="font-semibold text-highlighted">{{ selectedTemplate.name }} Template Detayları</h4>
                  <p class="text-sm text-muted">{{ selectedTemplate.description }}</p>
                </div>
              </div>
            </template>

            <div class="space-y-6">
              <!-- Template Info Grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center p-4 bg-white/50 rounded-lg">
                  <UIcon name="i-lucide-star" class="w-8 h-8 text-warning mx-auto mb-2" />
                  <div class="text-2xl font-bold text-warning">{{ selectedTemplate.standardCount }}</div>
                  <div class="text-sm text-muted">Standart</div>
                </div>
                
                <div class="text-center p-4 bg-white/50 rounded-lg">
                  <UIcon name="i-lucide-form-input" class="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div class="text-2xl font-bold text-blue-600">{{ selectedTemplate.fieldCount }}</div>
                  <div class="text-sm text-muted">Veri Alanı</div>
                </div>
                
                <div class="text-center p-4 bg-white/50 rounded-lg">
                  <UIcon name="i-lucide-asterisk" class="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div class="text-2xl font-bold text-red-600">{{ selectedTemplate.requiredFieldCount }}</div>
                  <div class="text-sm text-muted">Zorunlu Alan</div>
                </div>
              </div>

              <!-- Template Content -->
              <div v-if="loadingDetails" class="text-center py-8">
                <UIcon name="i-lucide-loader-2" class="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                <p class="text-muted">Template detayları yükleniyor...</p>
              </div>
              
              <div v-else-if="templateDetails" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Standards -->
                <div v-if="templateDetails.standards && templateDetails.standards.length > 0">
                  <h5 class="text-lg font-semibold text-highlighted mb-4 flex items-center gap-2">
                    <UIcon name="i-lucide-star" class="w-5 h-5 text-warning" />
                    Standartlar ({{ templateDetails.standards.length }})
                  </h5>
                  <div class="space-y-3 max-h-64 overflow-y-auto">
                    <div 
                      v-for="standard in templateDetails.standards" 
                      :key="standard.id"
                      class="p-3 bg-white/60 rounded-lg border"
                    >
                      <div class="font-medium text-highlighted">{{ standard.name }}</div>
                      <div class="text-sm text-muted">{{ standard.value }}</div>
                      <UBadge v-if="standard.category" color="neutral" variant="soft" size="xs" class="mt-1">
                        {{ standard.category }}
                      </UBadge>
                    </div>
                  </div>
                </div>
                
                <!-- Fields -->
                <div v-if="templateDetails.fields && templateDetails.fields.length > 0">
                  <h5 class="text-lg font-semibold text-highlighted mb-4 flex items-center gap-2">
                    <UIcon name="i-lucide-form-input" class="w-5 h-5 text-blue-500" />
                    Veri Alanları ({{ templateDetails.fields.length }})
                  </h5>
                  <div class="space-y-3 max-h-64 overflow-y-auto">
                    <div 
                      v-for="field in templateDetails.fields" 
                      :key="field.id"
                      class="p-3 bg-white/60 rounded-lg border"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-medium text-highlighted">{{ field.label || field.name }}</span>
                        <UBadge v-if="field.required" color="error" variant="soft" size="xs">
                          Zorunlu
                        </UBadge>
                      </div>
                      <div class="text-sm text-muted">
                        {{ field.type || 'text' }}
                        <span v-if="field.unit"> ({{ field.unit }})</span>
                      </div>
                      <div v-if="field.defaultValue" class="text-xs text-muted mt-1">
                        Varsayılan: {{ field.defaultValue }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8">
                <UIcon name="i-lucide-alert-circle" class="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p class="text-muted">Template detayları yüklenemedi.</p>
              </div>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplatesApi } from '~/composables/useTemplatesApi'
import { useDualToast } from '~/composables/useDualToast'

// State
const router = useRouter()
const { fetchTemplates, fetchTemplate, createCategoryFromTemplate, loading: apiLoading } = useTemplatesApi()
const { success, error: showError } = useDualToast()
const currentStep = ref(1)
const selectedIndustry = ref<Industry | null>(null)
const selectedTemplate = ref<Template | null>(null)
const isCreating = ref(false)
const templateDetails = ref<any>(null)
const loadingDetails = ref(false)

// Form data
const categoryForm = ref<CategoryForm>({
  name: '',
  description: '',
  color: '#3B82F6'
})

// API Data
const allTemplates = ref<any[]>([])
const templateStats = ref({
  total: 0,
  industries: 0,
  standards: 0
})

// Load template details when modal opens
const loadTemplateDetails = async (templateId: string) => {
  if (!templateId) {
    console.log('⚠️ No templateId provided to loadTemplateDetails')
    return
  }
  
  console.log('🚀 loadTemplateDetails starting for ID:', templateId)
  loadingDetails.value = true
  templateDetails.value = null
  
  try {
    console.log('📞 Calling fetchTemplate...')
    const details = await fetchTemplate(templateId)
    console.log('🎯 Template details result:', details)
    
    if (details) {
      templateDetails.value = details
      console.log('✅ Template details successfully set:', templateDetails.value)
    } else {
      console.log('⚠️ No template details returned')
      templateDetails.value = null
    }
  } catch (error) {
    console.error('💥 Failed to load template details:', error)
    templateDetails.value = null
  } finally {
    loadingDetails.value = false
    console.log('🏁 loadTemplateDetails finished. loadingDetails:', loadingDetails.value)
  }
}



// Load templates from API
const loadTemplates = async () => {
  try {
    console.log('Loading templates...')
    const templates = await fetchTemplates()
    console.log('Templates response:', templates)
    allTemplates.value = templates
    
    // Calculate stats
    templateStats.value = {
      total: allTemplates.value.length,
      industries: [...new Set(allTemplates.value.map(t => t.industry))].length,
      standards: allTemplates.value.reduce((sum, t) => sum + (t.standards?.length || 0), 0)
    }
    console.log('Template stats:', templateStats.value)
    console.log('Industries computed:', industries.value)
  } catch (error) {
    console.error('Failed to load templates:', error)
  }
}

// Compute industries from real template data
const industries = computed((): Industry[] => {
  const industryMap = new Map<string, Industry>()
  
  allTemplates.value.forEach(template => {
    if (!template.industry) return
    
    if (!industryMap.has(template.industry)) {
      industryMap.set(template.industry, {
        id: template.industry,
        name: template.industry === 'steel-manufacturing' ? 'Demir-Çelik İmalat' :
              template.industry === 'tensile-architecture' ? 'Asma Gergi Mimarlık' :
              template.industry === 'construction' ? 'İnşaat & Yapı' : template.industry,
        description: template.industry === 'steel-manufacturing' ? 'Profil, plaka ve yapısal çelik ürünleri' :
                    template.industry === 'tensile-architecture' ? 'Membran, halat ve gergi aksesuarları' :
                    template.industry === 'construction' ? 'Yapı malzemeleri ve inşaat ekipmanları' : '',
        icon: template.industry === 'steel-manufacturing' ? 'i-lucide-hammer' :
              template.industry === 'tensile-architecture' ? 'i-lucide-tent' :
              template.industry === 'construction' ? 'i-lucide-building' : 'i-lucide-folder',
        templateCount: 0,
        standardCount: 0
      })
    }
    
    const industry = industryMap.get(template.industry)!
    industry.templateCount++
    industry.standardCount += template.standards?.length || 0
  })
  
  return Array.from(industryMap.values())
})

// Compute templates based on selected industry
const templates = computed((): Template[] => {
  if (!selectedIndustry.value) return []
  
  return allTemplates.value
    .filter(template => template.industry === selectedIndustry.value?.id)
    .map(template => ({
      id: template.id,
      name: template.name,
      description: template.description || '',
      icon: template.icon || 'i-lucide-folder',
      version: template.version,
      standardCount: template.standards?.length || 0,
      fieldCount: template.fields?.length || 0,
      requiredFieldCount: template.fields?.filter((f: any) => f.required).length || 0
    }))
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
  // Load template details immediately
  loadTemplateDetails(template.id)
}

const goToStep = (step: number) => {
  currentStep.value = step
}

const createCategory = async () => {
  if (!selectedTemplate.value || !categoryForm.value.name) return
  
  isCreating.value = true
  
  try {
    // API call to create category from template
    const response = await createCategoryFromTemplate({
      templateId: selectedTemplate.value.id,
      categoryName: categoryForm.value.name,
      description: categoryForm.value.description,
      color: categoryForm.value.color
    })
    
    if (response?.success) {
      // Success notification
      success(
        'Kategori Oluşturuldu! 🎉',
        `"${categoryForm.value.name}" kategorisi ${selectedTemplate.value.name} template'inden başarıyla oluşturuldu.`,
        {
          timeout: 5000,
          actions: [
            {
              label: 'Kategorileri Görüntüle',
              onClick: () => router.push('/categories')
            }
          ]
        }
      )
      
      // Redirect to categories page after a short delay
      setTimeout(() => {
        router.push('/categories')
      }, 2000)
    }
  } catch (error: any) {
    console.error('Failed to create category:', error)
    showError(
      'Kategori Oluşturulamadı',
      error.message || 'Kategori oluşturulurken bir hata oluştu.',
      {
        timeout: 8000
      }
    )
  } finally {
    isCreating.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadTemplates()
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