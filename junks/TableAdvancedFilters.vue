<!-- components/table/TableAdvancedFilters.vue -->
<template>
  <div class="advanced-filters">
    <!-- Quick Filters Bar -->
    <div class="quick-filters-bar">
      <div class="flex items-center gap-3">
        <!-- Global Search -->
        <UInput
          v-model="globalSearch"
          placeholder="Malzeme ara..."
          icon="i-lucide-search"
          size="sm"
          class="w-64"
          :loading="searchLoading"
        >
          <template #trailing>
            <UKbd v-if="!globalSearch" size="xs">⌘K</UKbd>
            <UButton
              v-else
              variant="ghost"
              color="slate"
              size="xs"
              icon="i-lucide-x"
              @click="clearGlobalSearch"
            />
          </template>
        </UInput>

        <!-- Saved Filters -->
        <UDropdownMenu
          v-if="savedFilters.length"
          :items="[
            [
              ...savedFilters.map(filter => ({
                label: filter.name,
                icon: 'i-lucide-filter',
                click: () => applySavedFilter(filter)
              }))
            ],
            [
              { label: 'Filtre Yönet', icon: 'i-lucide-settings', click: () => showFilterManager = true }
            ]
          ]"
        >
          <UButton
            variant="outline"
            color="slate"
            icon="i-lucide-bookmark"
            size="sm"
          >
            Kayıtlı Filtreler
          </UButton>
        </UDropdownMenu>

        <!-- AI Filter Suggestions -->
        <UButton
          v-if="aiSuggestions.length"
          variant="soft"
          color="blue"
          icon="i-lucide-brain"
          size="sm"
          @click="showAISuggestions = true"
        >
          AI Önerileri
          <UBadge color="blue" variant="solid" size="xs" class="ml-1">
            {{ aiSuggestions.length }}
          </UBadge>
        </UButton>

        <div class="flex-1" />

        <!-- Filter Actions -->
        <div class="flex items-center gap-2">
          <UBadge
            v-if="activeFiltersCount > 0"
            color="blue"
            variant="soft"
            size="sm"
          >
            {{ activeFiltersCount }} filtre aktif
          </UBadge>

          <UButton
            variant="ghost"
            color="slate"
            icon="i-lucide-settings-2"
            size="sm"
            @click="showAdvancedFilters = !showAdvancedFilters"
          >
            {{ showAdvancedFilters ? 'Basit' : 'Gelişmiş' }}
          </UButton>

          <UButton
            v-if="activeFiltersCount > 0"
            variant="ghost"
            color="red"
            icon="i-lucide-x"
            size="sm"
            @click="clearAllFilters"
          >
            Temizle
          </UButton>
        </div>
      </div>
    </div>

    <!-- Advanced Filters Panel -->
    <UCollapse :open="showAdvancedFilters">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium text-slate-900">Gelişmiş Filtreler</h4>
            <div class="flex items-center gap-2">
              <UButton
                variant="ghost"
                color="slate"
                size="xs"
                @click="saveCurrentFilter"
              >
                Filtreyi Kaydet
              </UButton>
              <UButton
                variant="ghost"
                color="slate"
                size="xs"
                icon="i-lucide-download"
                @click="exportFilteredData"
              >
                Export
              </UButton>
            </div>
          </div>
        </template>

        <div class="filters-grid">
          <!-- Category Filters -->
          <div class="filter-group">
            <label class="filter-label">Kategori</label>
            <USelectMenu
              v-model="filters.category"
              :options="categoryOptions"
              placeholder="Tüm kategoriler"
              multiple
              searchable
            />
          </div>

          <!-- Stock Status -->
          <div class="filter-group">
            <label class="filter-label">Stok Durumu</label>
            <USelectMenu
              v-model="filters.stockStatus"
              :options="stockStatusOptions"
              placeholder="Tüm durumlar"
              multiple
            />
          </div>

          <!-- Price Range -->
          <div class="filter-group">
            <label class="filter-label">Fiyat Aralığı (₺)</label>
            <div class="price-range">
              <UInput
                v-model="filters.priceRange.min"
                type="number"
                placeholder="Min"
                size="sm"
              />
              <span class="text-slate-400">-</span>
              <UInput
                v-model="filters.priceRange.max"
                type="number"
                placeholder="Max"
                size="sm"
              />
            </div>
          </div>

          <!-- Date Range -->
          <div class="filter-group">
            <label class="filter-label">Tarih Aralığı</label>
            <UPopover>
              <UButton
                variant="outline"
                color="slate"
                size="sm"
                :label="dateRangeLabel"
                trailing-icon="i-lucide-calendar"
              />
              <template #panel>
                <div class="p-4 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Başlangıç</label>
                    <UInput
                      v-model="filters.dateRange.start"
                      type="date"
                      size="sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Bitiş</label>
                    <UInput
                      v-model="filters.dateRange.end"
                      type="date"
                      size="sm"
                    />
                  </div>
                  <div class="flex gap-2">
                    <UButton
                      size="xs"
                      @click="setDateRange('today')"
                    >
                      Bugün
                    </UButton>
                    <UButton
                      size="xs"
                      @click="setDateRange('week')"
                    >
                      Bu Hafta
                    </UButton>
                    <UButton
                      size="xs"
                      @click="setDateRange('month')"
                    >
                      Bu Ay
                    </UButton>
                  </div>
                </div>
              </template>
            </UPopover>
          </div>

          <!-- Supplier -->
          <div class="filter-group">
            <label class="filter-label">Tedarikçi</label>
            <USelectMenu
              v-model="filters.suppliers"
              :options="supplierOptions"
              placeholder="Tüm tedarikçiler"
              multiple
              searchable
            />
          </div>

          <!-- Project -->
          <div class="filter-group">
            <label class="filter-label">Proje</label>
            <USelectMenu
              v-model="filters.projects"
              :options="projectOptions"
              placeholder="Tüm projeler"
              multiple
              searchable
            />
          </div>

          <!-- Location -->
          <div class="filter-group">
            <label class="filter-label">Konum</label>
            <USelectMenu
              v-model="filters.locations"
              :options="locationOptions"
              placeholder="Tüm konumlar"
              multiple
            />
          </div>

          <!-- Custom Fields (Dynamic) -->
          <div
            v-for="customField in customFields"
            :key="customField.key"
            class="filter-group"
          >
            <label class="filter-label">{{ customField.label }}</label>
            <component
              :is="getCustomFieldComponent(customField.type)"
              v-model="filters.custom[customField.key]"
              v-bind="getCustomFieldProps(customField)"
            />
          </div>
        </div>

        <!-- Filter Conditions -->
        <div class="mt-6 pt-6 border-t border-slate-200">
          <div class="flex items-center justify-between mb-4">
            <h5 class="text-sm font-medium text-slate-900">Özel Koşullar</h5>
            <UButton
              variant="ghost"
              color="blue"
              size="xs"
              icon="i-lucide-plus"
              @click="addCustomCondition"
            >
              Koşul Ekle
            </UButton>
          </div>

          <div class="space-y-3">
            <div
              v-for="(condition, index) in customConditions"
              :key="index"
              class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
            >
              <USelectMenu
                v-model="condition.field"
                :options="conditionFieldOptions"
                placeholder="Alan seç"
                size="sm"
                class="w-40"
              />
              <USelectMenu
                v-model="condition.operator"
                :options="getOperatorOptions(condition.field)"
                placeholder="Operatör"
                size="sm"
                class="w-32"
              />
              <UInput
                v-model="condition.value"
                :placeholder="getConditionPlaceholder(condition.field, condition.operator)"
                size="sm"
                class="flex-1"
              />
              <UButton
                variant="ghost"
                color="red"
                size="xs"
                icon="i-lucide-x"
                @click="removeCustomCondition(index)"
              />
            </div>
          </div>
        </div>
      </UCard>
    </UCollapse>

    <!-- Active Filters Display -->
    <div v-if="activeFiltersCount > 0" class="active-filters">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-sm text-slate-600">Aktif filtreler:</span>
        
        <!-- Category filters -->
        <UBadge
          v-for="category in filters.category"
          :key="`cat-${category}`"
          color="blue"
          variant="soft"
          size="sm"
          closable
          @close="removeFilter('category', category)"
        >
          {{ getCategoryLabel(category) }}
        </UBadge>

        <!-- Stock status filters -->
        <UBadge
          v-for="status in filters.stockStatus"
          :key="`status-${status}`"
          :color="getStatusColor(status)"
          variant="soft"
          size="sm"
          closable
          @close="removeFilter('stockStatus', status)"
        >
          {{ getStatusLabel(status) }}
        </UBadge>

        <!-- Price range -->
        <UBadge
          v-if="filters.priceRange.min || filters.priceRange.max"
          color="green"
          variant="soft"
          size="sm"
          closable
          @close="clearPriceRange"
        >
          {{ formatPriceRange() }}
        </UBadge>

        <!-- Date range -->
        <UBadge
          v-if="filters.dateRange.start || filters.dateRange.end"
          color="purple"
          variant="soft"
          size="sm"
          closable
          @close="clearDateRange"
        >
          {{ formatDateRange() }}
        </UBadge>

        <!-- Other filters -->
        <UBadge
          v-for="supplier in filters.suppliers"
          :key="`supplier-${supplier}`"
          color="amber"
          variant="soft"
          size="sm"
          closable
          @close="removeFilter('suppliers', supplier)"
        >
          🏭 {{ supplier }}
        </UBadge>

        <UBadge
          v-for="project in filters.projects"
          :key="`project-${project}`"
          color="cyan"
          variant="soft"
          size="sm"
          closable
          @close="removeFilter('projects', project)"
        >
          🏗️ {{ project }}
        </UBadge>
      </div>
    </div>

    <!-- AI Filter Suggestions Modal -->
    <UModal v-model="showAISuggestions">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">AI Filtre Önerileri</h3>
        </template>

        <div class="space-y-4">
          <div
            v-for="suggestion in aiSuggestions"
            :key="suggestion.id"
            class="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
            @click="applySuggestion(suggestion)"
          >
            <div class="flex items-start gap-3">
              <UIcon :name="suggestion.icon" :class="suggestion.iconColor" />
              <div class="flex-1">
                <h4 class="font-medium text-slate-900">{{ suggestion.title }}</h4>
                <p class="text-sm text-slate-600">{{ suggestion.description }}</p>
                <div class="flex flex-wrap gap-1 mt-2">
                  <UBadge
                    v-for="filter in suggestion.filters"
                    :key="filter.key"
                    variant="subtle"
                    size="xs"
                  >
                    {{ filter.label }}
                  </UBadge>
                </div>
              </div>
              <UButton
                variant="ghost"
                color="blue"
                size="xs"
              >
                Uygula
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>

    <!-- Filter Manager Modal -->
    <UModal v-model="showFilterManager">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Filtre Yöneticisi</h3>
        </template>

        <div class="space-y-4">
          <div
            v-for="filter in savedFilters"
            :key="filter.id"
            class="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
          >
            <div>
              <h4 class="font-medium text-slate-900">{{ filter.name }}</h4>
              <p class="text-sm text-slate-600">{{ filter.description }}</p>
            </div>
            <div class="flex gap-2">
              <UButton
                variant="ghost"
                color="blue"
                size="xs"
                @click="applySavedFilter(filter)"
              >
                Uygula
              </UButton>
              <UButton
                variant="ghost"
                color="red"
                size="xs"
                icon="i-lucide-trash-2"
                @click="deleteSavedFilter(filter.id)"
              />
            </div>
          </div>
        </div>
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
      const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
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
  // Save current filter state
}

const applySavedFilter = (filter: any) => {
  // Apply saved filter
}

const applySuggestion = (suggestion: any) => {
  // Apply AI suggestion
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

// Basit bir debounce fonksiyonu
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

<style scoped>
.advanced-filters {
  @apply space-y-4;
}

.quick-filters-bar {
  @apply bg-white border border-slate-200 rounded-lg p-4;
}

.filters-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4;
}

.filter-group {
  @apply space-y-2;
}

.filter-label {
  @apply block text-sm font-medium text-slate-700;
}

.price-range {
  @apply flex items-center gap-2;
}

.active-filters {
  @apply bg-slate-50 border border-slate-200 rounded-lg p-4;
}
</style>