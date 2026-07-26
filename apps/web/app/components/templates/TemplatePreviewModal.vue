<!-- components/templates/TemplatePreviewModal.vue -->
<template>
  <UModal v-model="isOpen" :ui="{ wrapper: 'w-full max-w-4xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <UIcon :name="template?.icon || 'i-lucide-template'" class="w-6 h-6 text-primary" />
            <div>
              <h3 class="text-xl font-bold text-highlighted">{{ template?.name }} Template Önizleme</h3>
              <div class="flex items-center gap-2 mt-1">
                <UBadge color="neutral" variant="soft" size="xs">v{{ template?.version }}</UBadge>
                <UBadge color="primary" variant="soft" size="xs">{{ template?.industry }}</UBadge>
              </div>
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
        <!-- Template Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UCard variant="soft" color="primary" class="text-center">
            <div class="space-y-2">
              <UIcon name="i-lucide-database" class="w-8 h-8 text-primary mx-auto" />
              <div class="text-2xl font-bold text-highlighted">{{ template?.standardCount || 0 }}</div>
              <div class="text-sm text-muted">Standart</div>
            </div>
          </UCard>
          
          <UCard variant="soft" color="success" class="text-center">
            <div class="space-y-2">
              <UIcon name="i-lucide-form-input" class="w-8 h-8 text-success mx-auto" />
              <div class="text-2xl font-bold text-highlighted">{{ template?.fieldCount || 0 }}</div>
              <div class="text-sm text-muted">Alan</div>
            </div>
          </UCard>
          
          <UCard variant="soft" color="warning" class="text-center">
            <div class="space-y-2">
              <UIcon name="i-lucide-asterisk" class="w-8 h-8 text-warning mx-auto" />
              <div class="text-2xl font-bold text-highlighted">{{ template?.requiredFieldCount || 0 }}</div>
              <div class="text-sm text-muted">Zorunlu</div>
            </div>
          </UCard>
        </div>

        <!-- Template Description -->
        <UAlert color="primary" variant="soft" v-if="template?.description">
          <template #title>Template Açıklaması</template>
          <template #description>
            {{ template.description }}
          </template>
        </UAlert>

        <!-- Standards & Fields Tabs -->
        <div class="space-y-4">
          <div class="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg w-fit">
            <UButton
              :variant="activeTab === 'standards' ? 'solid' : 'ghost'"
              size="sm"
              @click="activeTab = 'standards'"
            >
              Standartlar ({{ mockStandards.length }})
            </UButton>
            <UButton
              :variant="activeTab === 'fields' ? 'solid' : 'ghost'"
              size="sm"
              @click="activeTab = 'fields'"
            >
              Alanlar ({{ mockFields.length }})
            </UButton>
            <UButton
              :variant="activeTab === 'sample' ? 'solid' : 'ghost'"
              size="sm"
              @click="activeTab = 'sample'"
            >
              Örnek Veri
            </UButton>
          </div>

          <!-- Standards Tab -->
          <UCard v-if="activeTab === 'standards'" variant="soft" color="neutral">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-database" class="w-5 h-5 text-primary" />
                <h4 class="font-semibold text-highlighted">Template Standartları</h4>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-muted">
                Bu template'de önceden tanımlanmış standart değerler. Kategori oluşturulduğunda otomatik olarak kullanılabilir.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                  v-for="(group, category) in groupedStandards"
                  :key="category"
                  class="space-y-2"
                >
                  <h5 class="font-medium text-highlighted text-sm uppercase tracking-wide">
                    {{ String(category).replace('_', ' ') }}
                  </h5>
                  <div class="space-y-1">
                    <UBadge 
                      v-for="standard in group"
                      :key="standard.id"
                      variant="soft" 
                      color="primary" 
                      size="xs"
                    >
                      {{ standard.name }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Fields Tab -->
          <UCard v-if="activeTab === 'fields'" variant="soft" color="neutral">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-form-input" class="w-5 h-5 text-success" />
                <h4 class="font-semibold text-highlighted">Template Alanları</h4>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-muted">
                Template'de tanımlı form alanları. Stok ürünü eklerken bu alanlar otomatik olarak gelir.
              </p>

              <div class="space-y-3">
                <div 
                  v-for="field in mockFields"
                  :key="field.id"
                  class="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-700"
                >
                  <div class="flex items-center gap-3">
                    <UIcon 
                      :name="getFieldIcon(field.type)" 
                      class="w-5 h-5 text-neutral-500" 
                    />
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-medium text-highlighted">{{ field.label }}</span>
                        <UBadge 
                          v-if="field.required" 
                          color="warning" 
                          variant="soft" 
                          size="xs"
                        >
                          Zorunlu
                        </UBadge>
                      </div>
                      <div class="text-sm text-muted">{{ field.name }}</div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <UBadge variant="outline" size="xs">{{ field.type }}</UBadge>
                    <span v-if="field.unit" class="text-xs text-muted">{{ field.unit }}</span>
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Sample Data Tab -->
          <UCard v-if="activeTab === 'sample'" variant="soft" color="neutral">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-eye" class="w-5 h-5 text-neutral-500" />
                <h4 class="font-semibold text-highlighted">Örnek Stok Ürünü</h4>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-muted">
                Bu template kullanılarak oluşturulacak örnek bir stok ürünü.
              </p>

              <UCard variant="outline">
                <div class="space-y-4">
                  <div class="flex items-start justify-between">
                    <div>
                      <h5 class="font-bold text-highlighted text-lg">{{ sampleData.name }}</h5>
                      <p class="text-sm text-muted">{{ sampleData.description }}</p>
                    </div>
                    <UBadge color="success" variant="soft">Aktif</UBadge>
                  </div>

                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div v-for="(value, key) in sampleData.specifications" :key="key">
                      <span class="text-muted">{{ formatFieldName(String(key)) }}:</span>
                      <div class="font-medium text-highlighted">{{ value }}</div>
                    </div>
                  </div>
                </div>
              </UCard>
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
            @click="useTemplate"
          >
            Bu Template'i Kullan
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
interface TemplateField {
  id: string
  name: string
  label: string
  type: string
  required: boolean
  unit?: string
}

interface TemplateStandard {
  id: string
  name: string
  value: string
  category: string
}

interface Template {
  id: string
  name: string
  description?: string
  icon?: string
  version?: string
  industry?: string
  standardCount?: number
  fieldCount?: number
  requiredFieldCount?: number
}

interface Props {
  modelValue: boolean
  template?: Template
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'use-template', template: Template): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// State
const activeTab = ref('standards')

// Mock data - replace with real API data
const mockStandards = computed((): TemplateStandard[] => {
  if (!props.template) return []
  
  // Mock standards based on template type
  const standardsMap: Record<string, TemplateStandard[]> = {
    'profil-template': [
      { id: '1', name: 'HEA', value: 'HEA', category: 'profile_type' },
      { id: '2', name: 'HEB', value: 'HEB', category: 'profile_type' },
      { id: '3', name: 'IPE', value: 'IPE', category: 'profile_type' },
      { id: '4', name: 'S235JR', value: 'S235JR', category: 'material' },
      { id: '5', name: 'S355JR', value: 'S355JR', category: 'material' }
    ],
    'membran-template': [
      { id: '1', name: 'FERRARI', value: 'FERRARI', category: 'brand' },
      { id: '2', name: 'MEHLER', value: 'MEHLER', category: 'brand' },
      { id: '3', name: 'SIOEN', value: 'SIOEN', category: 'brand' }
    ]
  }
  
  return standardsMap[props.template.id] || []
})

const mockFields = computed((): TemplateField[] => {
  if (!props.template) return []
  
  const fieldsMap: Record<string, TemplateField[]> = {
    'profil-template': [
      { id: '1', name: 'profile_type', label: 'Profil Tipi', type: 'select', required: true },
      { id: '2', name: 'dimensions', label: 'Boyutlar', type: 'text', required: true },
      { id: '3', name: 'material', label: 'Malzeme', type: 'select', required: true },
      { id: '4', name: 'height_mm', label: 'Yükseklik', type: 'number', required: false, unit: 'mm' },
      { id: '5', name: 'weight_kg_m', label: 'Birim Ağırlık', type: 'number', required: false, unit: 'kg/m' }
    ],
    'membran-template': [
      { id: '1', name: 'brand', label: 'Marka', type: 'select', required: true },
      { id: '2', name: 'weight_g_m2', label: 'Ağırlık', type: 'number', required: true, unit: 'g/m²' },
      { id: '3', name: 'width_cm', label: 'En', type: 'number', required: true, unit: 'cm' },
      { id: '4', name: 'warranty_years', label: 'Garanti', type: 'number', required: false, unit: 'yıl' }
    ]
  }
  
  return fieldsMap[props.template.id] || []
})

const groupedStandards = computed(() => {
  return mockStandards.value.reduce((groups: Record<string, TemplateStandard[]>, standard: TemplateStandard) => {
    const category = standard.category || 'other'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(standard)
    return groups
  }, {})
})

const sampleData = computed(() => {
  const sampleMap: Record<string, any> = {
    'profil-template': {
      name: 'HEA 100 Profil',
      description: 'HEA 100 yapısal çelik profil',
      specifications: {
        profile_type: 'HEA',
        dimensions: '100',
        material: 'S235JR',
        height_mm: '96 mm',
        weight_kg_m: '16.7 kg/m'
      }
    },
    'membran-template': {
      name: 'FERRARI Biobrane Activ 902',
      description: 'Gaz tutucu membranlar - S2 PVDF / Aktiv',
      specifications: {
        brand: 'FERRARI',
        weight_g_m2: '950 g/m²',
        width_cm: '267 cm',
        warranty_years: '10 yıl'
      }
    }
  }
  
  return sampleMap[props.template?.id || ''] || {
    name: 'Örnek Ürün',
    description: 'Template örnek ürünü',
    specifications: {}
  }
})

// Methods
const close = () => {
  isOpen.value = false
}

const useTemplate = () => {
  if (props.template) {
    emit('use-template', props.template)
  }
  close()
}

const getFieldIcon = (type: string) => {
  const iconMap: Record<string, string> = {
    text: 'i-lucide-type',
    number: 'i-lucide-hash',
    select: 'i-lucide-list',
    textarea: 'i-lucide-align-left',
    boolean: 'i-lucide-check-square',
    date: 'i-lucide-calendar'
  }
  return iconMap[type] || 'i-lucide-form-input'
}

const formatFieldName = (name: string) => {
  return name
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}
</script>