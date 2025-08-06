<!-- components/table/TableAdvancedFilters2.vue -->
<template>
  <div class="flex flex-col gap-4">
    <!-- Quick Filters Bar -->
    <div class="bg-white border border-slate-200 rounded-lg p-4">
      <div class="flex items-center gap-3">
        <!-- Global Search -->
        <div class="flex-1">
          <UInputGroup>
            <UInput
              v-model="globalSearch"
              placeholder="Ara..."
              size="md"
              :loading="searchLoading"
              class="flex-1"
              @keyup.enter="emitFilters"
            >
              <template #trailing>
                <UButton
                  v-if="globalSearch"
                  color="gray"
                  variant="ghost"
                  icon="i-lucide-x"
                  size="xs"
                  @click="clearGlobalSearch"
                />
              </template>
            </UInput>
            <UButton
              color="gray"
              icon="i-lucide-filter"
              :variant="showAdvancedFilters ? 'solid' : 'outline'"
              @click="showAdvancedFilters = !showAdvancedFilters"
            >
              <span class="hidden sm:inline">Filtreler</span>
              <UBadge
                v-if="activeFiltersCount > 0"
                size="xs"
                color="primary"
                class="ml-1"
              >
                {{ activeFiltersCount }}
              </UBadge>
            </UButton>
            <UButton
              v-if="activeFiltersCount > 0"
              color="gray"
              icon="i-lucide-trash-2"
              variant="outline"
              @click="clearAllFilters"
            >
              <span class="hidden sm:inline">Temizle</span>
            </UButton>
          </UInputGroup>
        </div>

        <!-- Quick Action Buttons -->
        <div class="flex gap-2">
          <UButton
            color="blue"
            variant="ghost"
            icon="i-lucide-brain-circuit"
            @click="showAISuggestions = true"
          >
            <span class="hidden md:inline">AI Önerileri</span>
          </UButton>
          <UButton
            color="blue"
            variant="ghost"
            icon="i-lucide-save"
            @click="showFilterManager = true"
          >
            <span class="hidden md:inline">Kayıtlı Filtreler</span>
          </UButton>
          <UButton
            color="blue"
            variant="ghost"
            icon="i-lucide-download"
            @click="exportFilteredData"
          >
            <span class="hidden md:inline">Export</span>
          </UButton>
        </div>
      </div>
    </div>

    <!-- Advanced Filters Panel -->
    <UCollapse :open="showAdvancedFilters">
      <UCard>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <!-- Category Filter -->
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-slate-700">
              Kategori
            </label>
            <USelectMenu
              v-model="filters.category"
              :options="categoryOptions"
              placeholder="Kategori seç"
              multiple
              size="sm"
            />
          </div>

          <!-- Stock Status Filter -->
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-slate-700">
              Stok Durumu
            </label>
            <USelectMenu
              v-model="filters.stockStatus"
              :options="stockStatusOptions"
              placeholder="Durum seç"
              multiple
              size="sm"
            />
          </div>

          <!-- Price Range Filter -->
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-slate-700">
              Fiyat Aralığı
            </label>
            <div class="flex items-center gap-2">
              <UInput
                v-model="filters.priceRange.min"
                placeholder="Min"
                size="sm"
                type="number"
              />
              <span class="text-slate-500">-</span>
              <UInput
                v-model="filters.priceRange.max"
                placeholder="Max"
                size="sm"
                type="number"
              />
            </div>
          </div>

          <!-- Date Range Filter -->
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-slate-700">
              Tarih Aralığı
            </label>
            <UInputMenu
              v-model="dateRangeLabel"
              :options="['Bugün', 'Son 7 gün', 'Son 30 gün', 'Özel']"
              :ui="{ active: 'bg-blue-500 text-white' }"
              size="sm"
              @option:click="option => setDateRange(option.key)"
            >
              <template #option="{ item }">
                <span>{{ item.label }}</span>
              </template>

              <template #menu>
                <div class="flex flex-col gap-3 p-4 min-w-[300px]">
                  <div class="flex items-center gap-2">
                    <UInput
                      v-model="filters.dateRange.start"
                      type="date"
                      size="sm"
                    />
                    <span class="text-slate-400">-</span>
                    <UInput
                      v-model="filters.dateRange.end"
                      type="date"
                      size="sm"
                    />
                  </div>
                  <div class="flex gap-2">
                    <UButton
                      variant="outline"
                      size="xs"
                      block
                      @click="setDateRange('today')"
                    >
                      Bugün
                    </UButton>
                    <UButton
                      variant="outline"
                      size="xs"
                      block
                      @click="setDateRange('week')"
                    >
                      Son 7 gün
                    </UButton>
                    <UButton
                      variant="outline"
                      size="xs"
                      block
                      @click="setDateRange('month')"
                    >
                      Son 30 gün
                    </UButton>
                  </div>
                </div>
              </template>
            </UInputMenu>
          </div>

          <!-- Supplier Filter -->
          <div class="flex flex-col gap-2" v-if="supplierOptions.length">
            <label class="block text-sm font-medium text-slate-700">
              Tedarikçi
            </label>
            <USelectMenu
              v-model="filters.suppliers"
              :options="supplierOptions"
              placeholder="Tedarikçi seç"
              multiple
              size="sm"
            />
          </div>

          <!-- Project Filter -->
          <div class="flex flex-col gap-2" v-if="projectOptions.length">
            <label class="block text-sm font-medium text-slate-700">
              Proje
            </label>
            <USelectMenu
              v-model="filters.projects"
              :options="projectOptions"
              placeholder="Proje seç"
              multiple
              size="sm"
            />
          </div>

          <!-- Location Filter -->
          <div class="flex flex-col gap-2" v-if="locationOptions.length">
            <label class="block text-sm font-medium text-slate-700">
              Konum
            </label>
            <USelectMenu
              v-model="filters.locations"
              :options="locationOptions"
              placeholder="Konum seç"
              multiple
              size="sm"
            />
          </div>

          <!-- Custom Fields -->
          <template v-for="field in customFields" :key="field.key">
            <div class="flex flex-col gap-2">
              <label class="block text-sm font-medium text-slate-700">
                {{ field.label }}
              </label>
              <component
                :is="getCustomFieldComponent(field.type)"
                v-model="filters.custom[field.key]"
                v-bind="getCustomFieldProps(field)"
                :placeholder="field.placeholder || `${field.label} seç`"
              />
            </div>
          </template>
        </div>

        <!-- Custom Filter Conditions -->
        <div class="mt-4 border-t border-slate-200 pt-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-sm text-slate-900">Özel Filtreler</h3>
            <UButton
              color="blue"
              variant="ghost"
              icon="i-lucide-plus"
              size="xs"
              @click="addCustomCondition"
            >
              Filtre Ekle
            </UButton>
          </div>

          <div class="flex flex-col gap-3">
            <div
              v-for="(condition, index) in customConditions"
              :key="index"
              class="flex items-center gap-2"
            >
              <USelectMenu
                v-model="condition.field"
                :options="conditionFieldOptions"
                placeholder="Alan"
                size="sm"
                class="w-40"
              />
              <USelectMenu
                v-model="condition.operator"
                :options="getOperatorOptions(condition.field)"
                placeholder="Operatör"
                size="sm"
                class="w-36"
              />
              <UInput
                v-model="condition.value"
                :placeholder="getConditionPlaceholder(condition.field, condition.operator)"
                size="sm"
                class="flex-1"
              />
              <UButton
                color="gray"
                variant="ghost"
                icon="i-lucide-x"
                size="xs"
                @click="removeCustomCondition(index)"
              />
            </div>
          </div>
        </div>

        <!-- Filter Buttons -->
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray"
              variant="outline"
              @click="clearAllFilters"
            >
              Temizle
            </UButton>
            <UButton
              color="blue"
              @click="emitFilters"
            >
              Filtreleri Uygula
            </UButton>
          </div>
        </template>
      </UCard>
    </UCollapse>

    <!-- Active Filters Display -->
    <div v-if="activeFiltersCount > 0" class="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-sm font-medium text-slate-700">Aktif Filtreler:</span>
        
        <!-- Category Filters -->
        <UChip
          v-for="category in filters.category"
          :key="'cat-' + category"
          closable
          color="blue"
          size="sm"
          @close="removeFilter('category', category)"
        >
          {{ getCategoryLabel(category) }}
        </UChip>
        
        <!-- Status Filters -->
        <UChip
          v-for="status in filters.stockStatus"
          :key="'status-' + status"
          closable
          :color="getStatusColor(status)"
          size="sm"
          @close="removeFilter('stockStatus', status)"
        >
          {{ getStatusLabel(status) }}
        </UChip>
        
        <!-- Price Range -->
        <UChip
          v-if="filters.priceRange.min || filters.priceRange.max"
          closable
          color="gray"
          size="sm"
          @close="clearPriceRange"
        >
          {{ formatPriceRange() }}
        </UChip>
        
        <!-- Date Range -->
        <UChip
          v-if="filters.dateRange.start || filters.dateRange.end"
          closable
          color="gray"
          size="sm"
          @close="clearDateRange"
        >
          {{ formatDateRange() }}
        </UChip>
        
        <!-- Supplier Filters -->
        <UChip
          v-for="supplier in filters.suppliers"
          :key="'supplier-' + supplier"
          closable
          color="amber"
          size="sm"
          @close="removeFilter('suppliers', supplier)"
        >
          {{ supplier }}
        </UChip>
        
        <!-- Project Filters -->
        <UChip
          v-for="project in filters.projects"
          :key="'project-' + project"
          closable
          color="emerald"
          size="sm"
          @close="removeFilter('projects', project)"
        >
          {{ project }}
        </UChip>
        
        <!-- Location Filters -->
        <UChip
          v-for="location in filters.locations"
          :key="'location-' + location"
          closable
          color="purple"
          size="sm"
          @close="removeFilter('locations', location)"
        >
          {{ location }}
        </UChip>
        
        <!-- Custom Filters -->
        <UChip
          v-for="(value, key) in filters.custom"
          :key="'custom-' + key"
          v-if="value"
          closable
          color="indigo"
          size="sm"
          @close="filters.custom[key] = null"
        >
          {{ key }}: {{ value }}
        </UChip>
        
        <UButton
          v-if="activeFiltersCount > 1"
          color="gray"
          variant="ghost"
          size="xs"
          icon="i-lucide-trash-2"
          @click="clearAllFilters"
        >
          Hepsini Temizle
        </UButton>
      </div>
    </div>

    <!-- AI Filter Suggestions Modal -->
    <UModal v-model="showAISuggestions">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-brain-circuit" class="text-blue-500" />
            <h3 class="text-lg font-semibold">AI Filtre Önerileri</h3>
          </div>
        </template>
        
        <div class="flex flex-col gap-4 py-2">
          <div v-for="suggestion in aiSuggestions" :key="suggestion.id" 
               class="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
               @click="applySuggestion(suggestion)">
            <div class="flex items-start gap-3">
              <UIcon :name="suggestion.icon" class="text-2xl" :class="suggestion.iconColor" />
              <div>
                <h4 class="font-medium text-slate-900">{{ suggestion.title }}</h4>
                <p class="text-sm text-slate-600">{{ suggestion.description }}</p>
                <div class="flex flex-wrap gap-1 mt-2">
                  <UBadge v-for="filter in suggestion.filters" :key="filter.key" color="blue" size="sm">
                    {{ filter.label }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-end">
            <UButton color="gray" @click="showAISuggestions = false">
              Kapat
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Filter Manager Modal -->
    <UModal v-model="showFilterManager">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Kayıtlı Filtreler</h3>
            <UButton 
              color="blue" 
              variant="outline" 
              size="sm"
              icon="i-lucide-save"
              @click="saveCurrentFilter"
            >
              Mevcut Filtreyi Kaydet
            </UButton>
          </div>
        </template>
        
        <div class="flex flex-col gap-4 py-2">
          <div v-if="!savedFilters.length" class="text-center py-6">
            <UIcon name="i-lucide-filter-x" class="text-4xl text-slate-400 mx-auto mb-2" />
            <p class="text-slate-600">Henüz kaydedilmiş filtre yok.</p>
          </div>
          
          <div v-for="filter in savedFilters" :key="filter.id" 
               class="p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-slate-900">{{ filter.name }}</h4>
                <p class="text-xs text-slate-500">{{ filter.createdAt }}</p>
              </div>
              <div class="flex gap-2">
                <UButton 
                  color="blue" 
                  variant="ghost" 
                  size="sm"
                  icon="i-lucide-check"
                  @click="applySavedFilter(filter)"
                >
                  Uygula
                </UButton>
                <UButton 
                  color="red" 
                  variant="ghost" 
                  size="sm"
                  icon="i-lucide-trash-2"
                >
                  Sil
                </UButton>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-end">
            <UButton color="gray" @click="showFilterManager = false">
              Kapat
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any
  categoryOptions?: any[]
  supplierOptions?: any[]
  projectOptions?: any[]
  locationOptions?: any[]
  customFields?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  categoryOptions: () => [],
  supplierOptions: () => [],
  projectOptions: () => [],
  locationOptions: () => [],
  customFields: () => []
})

const emit = defineEmits<{
  'update:modelValue': [filters: any]
  'filter-change': [filters: any]
  'export': [filters: any]
}>()

// State
const showAdvancedFilters = ref(false)
const showAISuggestions = ref(false)
const showFilterManager = ref(false)
const globalSearch = ref('')
const searchLoading = ref(false)

const filters = reactive({
  category: [],
  stockStatus: [],
  priceRange: { min: '', max: '' },
  dateRange: { start: '', end: '' },
  suppliers: [],
  projects: [],
  locations: [],
  custom: {}
})

const customConditions = ref([])
const savedFilters = ref([])
const aiSuggestions = ref([
  {
    id: 1,
    title: 'Düşük Stoklu Kritik Malzemeler',
    description: 'Son 30 günde kullanılan ama stoğu %20\'nin altında olan malzemeler',
    icon: 'i-lucide-alert-triangle',
    iconColor: 'text-amber-500',
    filters: [
      { key: 'stockStatus', label: 'Stok < %20' },
      { key: 'lastUsed', label: 'Son 30 gün' }
    ]
  },
  {
    id: 2,
    title: 'Pahalı Atıl Malzemeler',
    description: '₺10.000 üzeri değerde ama 6 aydır kullanılmayan malzemeler',
    icon: 'i-lucide-dollar-sign',
    iconColor: 'text-red-500',
    filters: [
      { key: 'price', label: 'Fiyat > ₺10.000' },
      { key: 'lastUsed', label: '6 ay+ atıl' }
    ]
  }
])

// Options
const stockStatusOptions = [
  { label: 'Yeterli', value: 'sufficient', color: 'green' },
  { label: 'Düşük', value: 'low', color: 'amber' },
  { label: 'Kritik', value: 'critical', color: 'red' },
  { label: 'Tükendi', value: 'empty', color: 'slate' }
]

const conditionFieldOptions = [
  { label: 'Malzeme Adı', value: 'name' },
  { label: 'Kategori', value: 'category' },
  { label: 'Fiyat', value: 'price' },
  { label: 'Stok Miktarı', value: 'quantity' },
  { label: 'Son Kullanım', value: 'lastUsed' }
]

// Computed
const activeFiltersCount = computed(() => {
  let count = 0
  count += filters.category.length
  count += filters.stockStatus.length
  count += filters.suppliers.length
  count += filters.projects.length
  count += filters.locations.length
  if (filters.priceRange.min || filters.priceRange.max) count++
  if (filters.dateRange.start || filters.dateRange.end) count++
  count += Object.keys(filters.custom).filter(key => filters.custom[key]).length
  return count
})

const dateRangeLabel = computed(() => {
  if (filters.dateRange.start && filters.dateRange.end) {
    return `${filters.dateRange.start} - ${filters.dateRange.end}`
  }
  if (filters.dateRange.start) {
    return `${filters.dateRange.start} sonrası`
  }
  if (filters.dateRange.end) {
    return `${filters.dateRange.end} öncesi`
  }
  return 'Tarih seç'
})

// Methods
const clearGlobalSearch = () => {
  globalSearch.value = ''
}

const clearAllFilters = () => {
  Object.assign(filters, {
    category: [],
    stockStatus: [],
    priceRange: { min: '', max: '' },
    dateRange: { start: '', end: '' },
    suppliers: [],
    projects: [],
    locations: [],
    custom: {}
  })
  globalSearch.value = ''
  customConditions.value = []
  emitFilters()
}

const removeFilter = (type: string, value: any) => {
  if (Array.isArray(filters[type])) {
    const index = filters[type].indexOf(value)
    if (index > -1) {
      filters[type].splice(index, 1)
    }
  }
  emitFilters()
}

const clearPriceRange = () => {
  filters.priceRange.min = ''
  filters.priceRange.max = ''
  emitFilters()
}

const clearDateRange = () => {
  filters.dateRange.start = ''
  filters.dateRange.end = ''
  emitFilters()
}

const setDateRange = (period: string) => {
  const today = new Date()
  
  switch (period) {
    case 'today':
      filters.dateRange.start = today.toISOString().split('T')[0]
      filters.dateRange.end = today.toISOString().split('T')[0]
      break
    case 'week':
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      filters.dateRange.start = weekAgo.toISOString().split('T')[0]
      filters.dateRange.end = today.toISOString().split('T')[0]
      break
    case 'month':
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
      filters.dateRange.start = monthAgo.toISOString().split('T')[0]
      filters.dateRange.end = today.toISOString().split('T')[0]
      break
  }
  
  emitFilters()
}

const addCustomCondition = () => {
  customConditions.value.push({
    field: '',
    operator: '',
    value: ''
  })
}

const removeCustomCondition = (index: number) => {
  customConditions.value.splice(index, 1)
}

const saveCurrentFilter = () => {
  // Save current filter state implementation would go here
  // In a real implementation, we would prompt for a name and save to API/storage
}

const applySavedFilter = (filter: any) => {
  // Apply saved filter implementation would go here
  // In a real implementation, we would set all filter values from the saved filter
}

const applySuggestion = (suggestion: any) => {
  // Apply AI suggestion
  // In a real implementation, we would update filters based on the suggestion
  showAISuggestions.value = false
}

const exportFilteredData = () => {
  emit('export', { ...filters, globalSearch: globalSearch.value })
}

const emitFilters = () => {
  const filterData = {
    ...filters,
    globalSearch: globalSearch.value,
    customConditions: customConditions.value
  }
  emit('update:modelValue', filterData)
  emit('filter-change', filterData)
}

// Helper methods
const getCategoryLabel = (category: string) => category
const getStatusLabel = (status: string) => {
  const option = stockStatusOptions.find(o => o.value === status)
  return option?.label || status
}
const getStatusColor = (status: string) => {
  const option = stockStatusOptions.find(o => o.value === status)
  return option?.color || 'slate'
}
const formatPriceRange = () => {
  const { min, max } = filters.priceRange
  if (min && max) return `₺${min} - ₺${max}`
  if (min) return `₺${min}+`
  if (max) return `₺${max} altı`
  return ''
}
const formatDateRange = () => {
  const { start, end } = filters.dateRange
  if (start && end) return `${start} - ${end}`
  if (start) return `${start} sonrası`
  if (end) return `${end} öncesi`
  return ''
}

const getCustomFieldComponent = (type: string) => {
  switch (type) {
    case 'select': return 'USelectMenu'
    case 'number': return 'UInput'
    case 'date': return 'UInput'
    default: return 'UInput'
  }
}

const getCustomFieldProps = (field: any) => {
  const baseProps = { size: 'sm' }
  
  switch (field.type) {
    case 'select':
      return { ...baseProps, options: field.options, multiple: field.multiple }
    case 'number':
      return { ...baseProps, type: 'number' }
    case 'date':
      return { ...baseProps, type: 'date' }
    default:
      return baseProps
  }
}

const getOperatorOptions = (field: string) => {
  const numericOperators = [
    { label: 'Eşit', value: 'equals' },
    { label: 'Büyük', value: 'greater' },
    { label: 'Küçük', value: 'less' },
    { label: 'Aralık', value: 'between' }
  ]
  
  const textOperators = [
    { label: 'İçerir', value: 'contains' },
    { label: 'Başlar', value: 'starts' },
    { label: 'Biter', value: 'ends' },
    { label: 'Eşit', value: 'equals' }
  ]
  
  return ['price', 'quantity'].includes(field) ? numericOperators : textOperators
}

const getConditionPlaceholder = (field: string, operator: string) => {
  if (field === 'price') return 'Fiyat girin'
  if (field === 'quantity') return 'Miktar girin'
  return 'Değer girin'
}

// Watch for changes
watch(filters, () => {
  emitFilters()
}, { deep: true })

// Simple debounce function
const debounce = (fn: Function, delay: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

const debouncedEmit = debounce(() => {
  emitFilters()
}, 300)

watch(globalSearch, () => {
  debouncedEmit()
})
</script>
