<!-- components/table/ScivetoDataTable.vue -->
<template>
  <div class="flex flex-col gap-4">
    <!-- Advanced Filters -->
    <TableAdvancedFilters2
      v-if="enableAdvancedFilters"
      v-model="filterData"
      :category-options="categoryOptions"
      :supplier-options="supplierOptions"
      :project-options="projectOptions"
      :location-options="locationOptions"
      :custom-fields="customFields"
      @filter-change="handleFilterChange"
      @export="handleExport"
    />

    <!-- Table Container -->
    <div class="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <!-- Table Header & Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 p-4 gap-4">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold text-slate-900" v-if="title">{{ title }}</h3>
          <UBadge v-if="totalItems > 0" color="blue" size="sm">{{ totalItems }} kayıt</UBadge>
        </div>
        
        <div class="flex items-center gap-2">
          <!-- Items Per Page -->
          <div class="hidden sm:flex items-center gap-2">
            <span class="text-sm text-slate-600">Sayfa başına:</span>
            <USelectMenu
              v-model="perPage"
              :options="perPageOptions"
              size="sm"
              class="w-20"
            />
          </div>
          
          <!-- View Options -->
          <UButtonGroup size="sm">
            <UButton
              color="gray"
              :variant="viewType === 'table' ? 'solid' : 'outline'"
              @click="viewType = 'table'"
              icon="i-lucide-table-2"
            />
            <UButton
              color="gray"
              :variant="viewType === 'grid' ? 'solid' : 'outline'"
              @click="viewType = 'grid'"
              icon="i-lucide-grid"
            />
          </UButtonGroup>
          
          <!-- Column Settings -->
          <UDropdown :items="dropdownItems">
            <UButton color="gray" variant="outline" icon="i-lucide-settings-2" size="sm" />
          </UDropdown>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="py-32 flex flex-col items-center justify-center">
        <UIcon name="i-lucide-loader-2" class="text-3xl animate-spin text-blue-500 mb-4" />
        <p class="text-slate-500">Veriler yükleniyor...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!items.length" class="py-32 flex flex-col items-center justify-center">
        <UIcon name="i-lucide-inbox" class="text-4xl text-slate-300 mb-4" />
        <h3 class="font-medium text-slate-700 mb-1">Veri bulunamadı</h3>
        <p class="text-slate-500 text-sm mb-4">{{ emptyText }}</p>
        <UButton color="blue" icon="i-lucide-refresh-cw" @click="refresh">Yenile</UButton>
      </div>

      <!-- Table View -->
      <div v-else-if="viewType === 'table'" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <!-- Selection Column -->
              <th v-if="selectable" scope="col" class="relative w-12 px-4 py-3.5">
                <UCheckbox
                  v-model="selectAll"
                  :indeterminate="someSelected"
                  @change="toggleSelectAll"
                />
              </th>
              
              <!-- Data Columns -->
              <th 
                v-for="column in visibleColumns" 
                :key="column.key"
                scope="col"
                class="px-4 py-3.5 text-left text-sm font-semibold text-slate-900"
                :class="[
                  column.sortable ? 'cursor-pointer hover:bg-slate-100' : '',
                  sortKey === column.key ? 'bg-slate-100' : ''
                ]"
                @click="column.sortable ? sort(column.key) : null"
              >
                <div class="flex items-center gap-1">
                  {{ column.label }}
                  <UIcon 
                    v-if="column.sortable" 
                    :name="getSortIcon(column.key)" 
                    class="text-slate-500 w-4 h-4"
                  />
                </div>
              </th>
              
              <!-- Actions Column -->
              <th v-if="hasActions" scope="col" class="relative px-4 py-3.5 text-right">
                <span class="sr-only">İşlemler</span>
              </th>
            </tr>
          </thead>
          
          <tbody class="divide-y divide-slate-200 bg-white">
            <tr 
              v-for="(item, rowIndex) in items" 
              :key="getItemKey(item, rowIndex)"
              :class="[
                isSelected(item) ? 'bg-blue-50' : '',
                rowClickable ? 'cursor-pointer hover:bg-slate-50' : ''
              ]"
              @click="rowClick(item, rowIndex)"
            >
              <!-- Selection Column -->
              <td v-if="selectable" class="relative w-12 px-4 py-4 text-sm">
                <UCheckbox
                  :model-value="isSelected(item)"
                  @update:model-value="toggleSelection(item)"
                  @click.stop
                />
              </td>
              
              <!-- Data Columns -->
              <td 
                v-for="column in visibleColumns" 
                :key="`${getItemKey(item, rowIndex)}-${column.key}`"
                class="px-4 py-4 text-sm text-slate-900"
              >
                <!-- Custom Cell Slot -->
                <slot 
                  :name="`cell:${column.key}`" 
                  :item="item" 
                  :value="getItemValue(item, column)"
                  :index="rowIndex"
                  :column="column"
                >
                  <!-- Default Cell Rendering -->
                  <span v-if="column.type === 'text' || !column.type">
                    {{ getItemValue(item, column) }}
                  </span>
                  
                  <span v-else-if="column.type === 'date'">
                    {{ formatDate(getItemValue(item, column), column.dateFormat) }}
                  </span>
                  
                  <span v-else-if="column.type === 'number'" class="font-mono">
                    {{ formatNumber(getItemValue(item, column)) }}
                  </span>
                  
                  <span v-else-if="column.type === 'currency'">
                    {{ formatCurrency(getItemValue(item, column), column.currencyOptions) }}
                  </span>
                  
                  <span v-else-if="column.type === 'boolean'">
                    <UIcon 
                      :name="getItemValue(item, column) ? 'i-lucide-check' : 'i-lucide-x'" 
                      :class="getItemValue(item, column) ? 'text-green-500' : 'text-red-500'"
                    />
                  </span>
                  
                  <span v-else-if="column.type === 'chip'" class="inline-block">
                    <UBadge :color="getChipColor(item, column)">
                      {{ getChipText(item, column) }}
                    </UBadge>
                  </span>
                  
                  <span v-else-if="column.type === 'image'" class="block w-12 h-12">
                    <img 
                      :src="getItemValue(item, column)" 
                      class="w-full h-full object-cover rounded"
                      alt=""
                    />
                  </span>
                </slot>
              </td>
              
              <!-- Actions Column -->
              <td v-if="hasActions" class="px-4 py-4 text-sm text-right">
                <slot 
                  name="actions" 
                  :item="item"
                  :index="rowIndex"
                >
                  <div class="flex justify-end gap-2">
                    <UButton
                      v-if="allowEdit"
                      color="blue"
                      variant="ghost"
                      icon="i-lucide-pencil"
                      size="xs"
                      @click.stop="edit(item)"
                    />
                    <UButton
                      v-if="allowDelete"
                      color="red"
                      variant="ghost"
                      icon="i-lucide-trash-2"
                      size="xs"
                      @click.stop="confirmDelete(item)"
                    />
                  </div>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Grid View -->
      <div v-else-if="viewType === 'grid'" class="p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div 
            v-for="(item, index) in items" 
            :key="getItemKey(item, index)"
            class="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            :class="{ 'ring-2 ring-blue-500': isSelected(item) }"
          >
            <slot name="grid-item" :item="item" :index="index">
              <div class="p-4 flex flex-col gap-2">
                <!-- Default Grid Item Content -->
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium text-slate-900 truncate">
                    {{ getItemValue(item, visibleColumns[0] || {}) }}
                  </h4>
                  <UCheckbox 
                    v-if="selectable"
                    :model-value="isSelected(item)"
                    @update:model-value="toggleSelection(item)"
                  />
                </div>
                
                <div class="text-sm text-slate-500 flex flex-col gap-1">
                  <div v-for="column in visibleColumns.slice(1, 5)" :key="column.key" class="flex justify-between">
                    <span class="font-medium">{{ column.label }}:</span>
                    <span>{{ getItemValue(item, column) }}</span>
                  </div>
                </div>
                
                <div v-if="hasActions" class="mt-3 pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <slot 
                    name="grid-actions" 
                    :item="item"
                    :index="index"
                  >
                    <UButton
                      v-if="allowEdit"
                      color="blue"
                      variant="ghost"
                      icon="i-lucide-pencil"
                      size="xs"
                      @click.stop="edit(item)"
                    >
                      Düzenle
                    </UButton>
                    <UButton
                      v-if="allowDelete"
                      color="red"
                      variant="ghost"
                      icon="i-lucide-trash-2"
                      size="xs"
                      @click.stop="confirmDelete(item)"
                    >
                      Sil
                    </UButton>
                  </slot>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-4">
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-slate-700">
              <span>Gösteriliyor: </span>
              <span class="font-medium">{{ paginationInfo.from }}</span>
              <span> - </span>
              <span class="font-medium">{{ paginationInfo.to }}</span>
              <span> / </span>
              <span class="font-medium">{{ totalItems }}</span>
              <span> kayıt</span>
            </p>
          </div>
          
          <UPagination
            v-model="page"
            :total="totalItems"
            :per-page="perPage"
            :ui="{ rounded: 'rounded-md' }"
          />
        </div>
        
        <div class="flex sm:hidden items-center justify-between w-full">
          <UButton
            color="gray"
            variant="outline"
            :disabled="page === 1"
            @click="page = Math.max(1, page - 1)"
          >
            Önceki
          </UButton>
          
          <span class="text-sm text-slate-700">
            {{ page }} / {{ totalPages }}
          </span>
          
          <UButton
            color="gray"
            variant="outline"
            :disabled="page === totalPages"
            @click="page = Math.min(totalPages, page + 1)"
          >
            Sonraki
          </UButton>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteConfirm">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2 text-red-500">
            <UIcon name="i-lucide-alert-triangle" />
            <span>Silme Onayı</span>
          </div>
        </template>
        
        <p>Bu kaydı silmek istediğinizden emin misiniz?</p>
        <p class="text-sm text-slate-500 mt-1">Bu işlem geri alınamaz.</p>
        
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray" 
              variant="outline"
              @click="showDeleteConfirm = false"
            >
              İptal
            </UButton>
            <UButton
              color="red"
              @click="deleteItem"
            >
              Sil
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import TableAdvancedFilters2 from './TableAdvancedFilters2.vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
  hidden?: boolean
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'chip' | 'image'
  dateFormat?: string
  currencyOptions?: any
  chipOptions?: any
}

interface Props {
  items: any[]
  columns: Column[]
  title?: string
  loading?: boolean
  emptyText?: string
  selectable?: boolean
  rowClickable?: boolean
  allowEdit?: boolean
  allowDelete?: boolean
  keyProp?: string
  pagination?: boolean
  serverSideProcessing?: boolean
  totalItems?: number
  modelValue?: any[]
  itemsPerPage?: number
  page?: number
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
  enableAdvancedFilters?: boolean
  categoryOptions?: any[]
  supplierOptions?: any[]
  projectOptions?: any[]
  locationOptions?: any[]
  customFields?: any[]
  viewType?: 'table' | 'grid'
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  emptyText: 'Veriler bulunamadı',
  selectable: false,
  rowClickable: false,
  allowEdit: false,
  allowDelete: false,
  keyProp: 'id',
  pagination: true,
  serverSideProcessing: false,
  totalItems: 0,
  itemsPerPage: 10,
  page: 1,
  sortKey: '',
  sortOrder: 'asc',
  enableAdvancedFilters: false,
  categoryOptions: () => [],
  supplierOptions: () => [],
  projectOptions: () => [],
  locationOptions: () => [],
  customFields: () => [],
  viewType: 'table'
})

const emit = defineEmits<{
  'update:modelValue': [value: any[]],
  'page-change': [page: number],
  'sort': [key: string, order: 'asc' | 'desc'],
  'edit': [item: any],
  'delete': [item: any],
  'row-click': [item: any, index: number],
  'filter': [filters: any],
  'export': [filters: any],
  'refresh': []
}>()

// State
const page = ref(props.page)
const perPage = ref(props.itemsPerPage)
const sortKey = ref(props.sortKey)
const sortOrder = ref(props.sortOrder)
const selection = ref<any[]>(props.modelValue || [])
const selectAll = ref(false)
const someSelected = ref(false)
const showDeleteConfirm = ref(false)
const itemToDelete = ref(null)
const viewType = ref(props.viewType)
const filterData = reactive({})

// Options
const perPageOptions = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 }
]

// Computed
const visibleColumns = computed(() => {
  return props.columns.filter(column => !column.hidden)
})

const totalPages = computed(() => {
  if (!props.pagination) return 1
  return Math.ceil((props.serverSideProcessing ? props.totalItems : props.items.length) / perPage.value)
})

const paginationInfo = computed(() => {
  const total = props.serverSideProcessing ? props.totalItems : props.items.length
  const from = total === 0 ? 0 : (page.value - 1) * perPage.value + 1
  const to = Math.min(page.value * perPage.value, total)
  return { from, to, total }
})

const hasActions = computed(() => {
  return props.allowEdit || props.allowDelete || !!useSlots().actions
})

const dropdownItems = computed(() => {
  const items = [
    {
      label: 'Görünür Kolonlar',
      slot: 'columns-menu'
    },
    {
      label: 'Tabloyu Yenile',
      icon: 'i-lucide-refresh-cw',
      click: () => refresh()
    },
    [
      {
        label: 'Tümünü Seç',
        icon: 'i-lucide-check-square',
        disabled: !props.selectable,
        click: () => selectAll.value = true
      },
      {
        label: 'Seçimleri Temizle',
        icon: 'i-lucide-x-square',
        disabled: !props.selectable,
        click: () => selection.value = []
      }
    ],
    [
      {
        label: 'Export CSV',
        icon: 'i-lucide-download',
        click: () => handleExport({ format: 'csv' })
      },
      {
        label: 'Export Excel',
        icon: 'i-lucide-file-spreadsheet',
        click: () => handleExport({ format: 'excel' })
      }
    ]
  ]
  
  return items
})

// Methods
const getItemKey = (item: any, index: number) => {
  return item[props.keyProp] || index
}

const getItemValue = (item: any, column: Column) => {
  if (!column || !column.key) return ''
  
  // Handle nested properties with dot notation
  if (column.key.includes('.')) {
    return column.key.split('.').reduce((obj, key) => 
      obj && obj[key] !== undefined ? obj[key] : null
    , item)
  }
  
  return item[column.key]
}

const isSelected = (item: any) => {
  if (!props.selectable) return false
  
  return selection.value.some(selected => 
    selected[props.keyProp] === item[props.keyProp]
  )
}

const toggleSelection = (item: any) => {
  if (!props.selectable) return
  
  const isItemSelected = isSelected(item)
  
  if (isItemSelected) {
    selection.value = selection.value.filter(selected => 
      selected[props.keyProp] !== item[props.keyProp]
    )
  } else {
    selection.value = [...selection.value, item]
  }
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selection.value = [...props.items]
  } else {
    selection.value = []
  }
}

const sort = (key: string) => {
  if (sortKey.value === key) {
    // Toggle sort order
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    // New sort key
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  
  emit('sort', sortKey.value, sortOrder.value)
}

const getSortIcon = (key: string) => {
  if (sortKey.value !== key) {
    return 'i-lucide-chevrons-up-down'
  }
  
  return sortOrder.value === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
}

const refresh = () => {
  emit('refresh')
}

const rowClick = (item: any, index: number) => {
  if (props.rowClickable) {
    emit('row-click', item, index)
  }
}

const edit = (item: any) => {
  emit('edit', item)
}

const confirmDelete = (item: any) => {
  itemToDelete.value = item
  showDeleteConfirm.value = true
}

const deleteItem = () => {
  if (itemToDelete.value) {
    emit('delete', itemToDelete.value)
    showDeleteConfirm.value = false
    itemToDelete.value = null
  }
}

const formatDate = (value: any, format = 'dd/MM/yyyy') => {
  if (!value) return ''
  
  // Simple date formatting - in a real app, use a proper date library
  try {
    const date = new Date(value)
    return date.toLocaleDateString('tr-TR')
  } catch (e) {
    return value
  }
}

const formatNumber = (value: any) => {
  if (value === undefined || value === null) return ''
  
  return Number(value).toLocaleString('tr-TR')
}

const formatCurrency = (value: any, options = {}) => {
  if (value === undefined || value === null) return ''
  
  const opts = { 
    style: 'currency', 
    currency: 'TRY',
    ...options
  }
  
  return Number(value).toLocaleString('tr-TR', opts)
}

const getChipColor = (item: any, column: Column) => {
  if (!column.chipOptions) return 'blue'
  
  const value = getItemValue(item, column)
  return column.chipOptions[value]?.color || 'blue'
}

const getChipText = (item: any, column: Column) => {
  if (!column.chipOptions) return getItemValue(item, column)
  
  const value = getItemValue(item, column)
  return column.chipOptions[value]?.text || value
}

const handleFilterChange = (filters: any) => {
  emit('filter', filters)
}

const handleExport = (options: any) => {
  emit('export', { ...options, filters: filterData })
}

// Watches
watch(selection, (newValue) => {
  emit('update:modelValue', newValue)
  
  if (props.items.length === 0) {
    selectAll.value = false
    someSelected.value = false
    return
  }
  
  selectAll.value = props.items.length > 0 && newValue.length === props.items.length
  someSelected.value = newValue.length > 0 && newValue.length < props.items.length
})

watch(page, (newValue) => {
  emit('page-change', newValue)
})

watch(viewType, (newValue) => {
  if (newValue === 'grid') {
    selectAll.value = false
  }
})

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    selection.value = newValue
  }
}, { immediate: true })
</script>
            color="slate"
            icon="i-lucide-equal"
            size="sm"
            @click="$emit('density-change', 'normal')"
          />
          <UButton
            :variant="viewDensity === 'detailed' ? 'solid' : 'soft'"
            color="slate"
            icon="i-lucide-plus"
            size="sm"
            @click="$emit('density-change', 'detailed')"
          />
        </UButtonGroup>

        <!-- Export & Add -->
        <UButton
          color="slate"
          variant="outline"
          icon="i-lucide-download"
          @click="$emit('export')"
        >
          Export
        </UButton>
        <UButton
          color="blue"
          icon="i-lucide-plus"
          @click="$emit('add-item')"
        >
          {{ addButtonLabel }}
        </UButton>
      </div>
    </div>

    <!-- Advanced Filters -->
    <TableAdvancedFilters 
      v-if="showFilters"
      v-model="filterData"
      :category-options="categoryFilterOptions"
      :supplier-options="supplierFilterOptions" 
      :project-options="projectFilterOptions"
      :location-options="locationFilterOptions"
      :custom-fields="customFilterFields"
      @filter-change="onFilterChange"
      @export="$emit('export')"
    />

    <!-- AI Insights (Eğer varsa) -->
    <div class="ai-insights" v-if="aiInsights && aiInsights.length">
      <div class="flex items-center gap-2 mb-2">
        <UIcon name="i-lucide-brain" class="text-blue-500" />
        <span class="text-sm font-medium text-slate-700">AI Önerileri</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <UAlert
          v-for="insight in aiInsights"
          :key="insight.id"
          :color="insight.priority === 'high' ? 'red' : insight.priority === 'medium' ? 'amber' : 'blue'"
          variant="soft"
          :icon="insight.icon"
        >
          <template #title>{{ insight.title }}</template>
          <template #description>{{ insight.message }}</template>
        </UAlert>
      </div>
    </div>

    <!-- Main Table -->
    <UTable
      v-model:sort="sortState"
      v-model:global-filter="globalSearch"
      :data="paginatedData"
      :columns="computedColumns"
      :loading="loading"
      :ui="{
        wrapper: 'relative overflow-auto',
        base: 'min-w-full table-auto',
        thead: 'bg-slate-50/50 sticky top-0 z-10',
        tbody: 'divide-y divide-slate-200',
        tr: {
          base: 'transition-colors',
          selected: 'bg-blue-50',
          active: 'hover:bg-slate-50'
        },
        th: {
          base: 'text-left rtl:text-right font-medium',
          padding: viewDensity === 'compact' ? 'px-3 py-2' : viewDensity === 'detailed' ? 'px-6 py-4' : 'px-4 py-3',
          color: 'text-slate-700',
          size: 'text-sm'
        },
        td: {
          base: 'whitespace-nowrap',
          padding: viewDensity === 'compact' ? 'px-3 py-2' : viewDensity === 'detailed' ? 'px-6 py-4' : 'px-4 py-3',
          color: 'text-slate-900',
          size: 'text-sm'
        }
      }"
    >
      <!-- Custom Cell Templates -->
      <template #stock-status-data="{ row }">
        <div class="flex items-center gap-2">
          <div
            class="h-2 w-2 rounded-full"
            :class="{
              'bg-green-500': getStockStatus(row) === 'sufficient',
              'bg-amber-500': getStockStatus(row) === 'low',
              'bg-red-500': getStockStatus(row) === 'critical',
              'bg-slate-300': getStockStatus(row) === 'empty'
            }"
          />
          <span class="text-xs text-slate-600">
            {{ getStockStatusLabel(row) }}
          </span>
        </div>
      </template>

      <template #price-data="{ row }">
        <div class="text-right">
          <div class="font-medium">{{ formatCurrency(row.price) }}</div>
          <div class="text-xs text-slate-500" v-if="row.currency !== 'TL'">
            {{ row.originalPrice }} {{ row.currency }}
          </div>
        </div>
      </template>

      <template #actions-data="{ row }">
        <div class="flex items-center justify-end gap-1">
          <UButton
            variant="ghost"
            color="slate"
            size="xs"
            icon="i-lucide-eye"
            @click="$emit('view-item', row)"
          />
          <UButton
            variant="ghost"
            color="blue"
            size="xs"
            icon="i-lucide-edit"
            @click="$emit('edit-item', row)"
          />
          <UButton
            variant="ghost"
            color="amber"
            size="xs"
            icon="i-lucide-copy"
            @click="$emit('duplicate-item', row)"
          />
          <UButton
            variant="ghost"
            color="red"
            size="xs"
            icon="i-lucide-trash-2"
            @click="$emit('delete-item', row)"
          />
        </div>
      </template>

      <!-- Loading State -->
      <template #loading-state>
        <div class="flex items-center justify-center p-8">
          <UIcon name="i-lucide-loader-2" class="animate-spin h-6 w-6 text-blue-500" />
          <span class="ml-2 text-sm text-slate-600">Yükleniyor...</span>
        </div>
      </template>

      <!-- Empty State -->
      <template #empty-state>
        <div class="flex flex-col items-center justify-center p-8 text-center">
          <UIcon name="i-lucide-package-x" class="h-12 w-12 text-slate-300 mb-4" />
          <h4 class="text-lg font-medium text-slate-900 mb-2">{{ emptyTitle }}</h4>
          <p class="text-sm text-slate-500 mb-4">{{ emptyMessage }}</p>
          <UButton
            color="blue"
            icon="i-lucide-plus"
            @click="$emit('add-item')"
          >
            {{ addButtonLabel }}
          </UButton>
        </div>
      </template>
    </UTable>

    <!-- Pagination -->
    <div class="pagination-section" v-if="totalItems > itemsPerPage">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-sm text-slate-600">Sayfa başına:</span>
          <USelectMenu
            v-model="itemsPerPage"
            :options="[
              { label: '25', value: 25 },
              { label: '50', value: 50 },
              { label: '100', value: 100 }
            ]"
            size="sm"
            @change="$emit('items-per-page-change', itemsPerPage)"
          />
          <span class="text-sm text-slate-600">
            {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, totalItems) }} / {{ totalItems }}
          </span>
        </div>

        <UPagination
          v-model="currentPage"
          :page-count="itemsPerPage"
          :total="totalItems"
          :max="5"
          @update:model-value="$emit('page-change', currentPage)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import TableAdvancedFilters from './TableAdvancedFilters.vue'

interface Props {
  // Data
  data: any[]
  columns: TableColumn[]
  loading?: boolean
  
  // Pagination
  currentPage: number
  itemsPerPage: number
  totalItems: number
  
  // Display
  title: string
  itemType: string
  viewDensity: 'compact' | 'normal' | 'detailed'
  addButtonLabel?: string
  emptyTitle?: string
  emptyMessage?: string
  
  // Features
  showFilters?: boolean
  availableFilters?: any[]
  aiInsights?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  addButtonLabel: 'Yeni Ekle',
  emptyTitle: 'Veri bulunamadı',
  emptyMessage: 'Henüz veri eklenmemiş veya filtrelerinizle eşleşen kayıt yok.',
  showFilters: true,
  availableFilters: () => [],
  aiInsights: () => []
})

const emit = defineEmits<{
  // Actions
  'add-item': []
  'view-item': [item: any]
  'edit-item': [item: any]
  'duplicate-item': [item: any]
  'delete-item': [item: any]
  'export': []
  
  // Filters
  'show-stock-only': []
  'show-project-assigned': []
  'clear-filters': []
  
  // Table controls
  'density-change': [density: 'compact' | 'normal' | 'detailed']
  'page-change': [page: number]
  'items-per-page-change': [count: number]
}>()

// Local state
const globalSearch = ref('')
const sortState = ref({})
const filterData = ref({
  globalSearch: '',
  category: [],
  stockStatus: [],
  priceRange: { min: '', max: '' },
  dateRange: { start: '', end: '' },
  suppliers: [],
  projects: [],
  locations: [],
  custom: {}
})
const currentPage = ref(props.currentPage)
const itemsPerPage = ref(props.itemsPerPage)

// Filter options
const categoryFilterOptions = computed(() => 
  props.availableFilters
    .filter(f => f.key === 'category')
    .flatMap(f => f.options) || []
)

const supplierFilterOptions = computed(() => 
  props.availableFilters
    .filter(f => f.key === 'supplier')
    .flatMap(f => f.options) || []
)

const projectFilterOptions = computed(() => 
  props.availableFilters
    .filter(f => f.key === 'project')
    .flatMap(f => f.options) || []
)

const locationFilterOptions = computed(() => 
  props.availableFilters
    .filter(f => f.key === 'location')
    .flatMap(f => f.options) || []
)

const customFilterFields = computed(() => {
  // Özel filtreler için alan tanımları
  return props.availableFilters
    .filter(f => !['category', 'supplier', 'project', 'location'].includes(f.key))
    .map(f => ({
      key: f.key,
      label: f.label,
      type: 'select',
      options: f.options
    }))
})

// Computed properties
const filteredItems = computed(() => {
  let items = [...props.data]
  
  // Apply global search from advanced filters
  if (filterData.value.globalSearch) {
    const searchTerm = filterData.value.globalSearch.toLowerCase()
    items = items.filter(item => {
      return Object.values(item).some(val => 
        val && String(val).toLowerCase().includes(searchTerm)
      )
    })
  }
  
  // Apply category filters
  if (filterData.value.category?.length) {
    items = items.filter(item => filterData.value.category.includes(item.category))
  }
  
  // Apply stock status filters
  if (filterData.value.stockStatus?.length) {
    items = items.filter(item => 
      filterData.value.stockStatus.includes(getStockStatus(item))
    )
  }
  
  // Apply supplier filters
  if (filterData.value.suppliers?.length) {
    items = items.filter(item => filterData.value.suppliers.includes(item.supplier))
  }
  
  // Apply project filters
  if (filterData.value.projects?.length) {
    items = items.filter(item => filterData.value.projects.includes(item.project))
  }
  
  // Apply price range filter
  if (filterData.value.priceRange?.min || filterData.value.priceRange?.max) {
    const min = filterData.value.priceRange.min ? Number(filterData.value.priceRange.min) : 0
    const max = filterData.value.priceRange.max ? Number(filterData.value.priceRange.max) : Infinity
    
    items = items.filter(item => {
      const price = Number(item.price) || 0
      return price >= min && price <= max
    })
  }
  
  return items
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredItems.value.slice(start, end)
})

const computedColumns = computed(() => {
  return props.columns.map(column => ({
    ...column,
    sortable: column.sortable !== false
  }))
})

// Helper functions
const getStockStatus = (item: any): string => {
  const percentage = getStockPercentage(item)
  if (percentage === 0) return 'empty'
  if (percentage < 10) return 'critical'
  if (percentage < 20) return 'low'
  return 'sufficient'
}

const getStockStatusLabel = (item: any): string => {
  const status = getStockStatus(item)
  const percentage = getStockPercentage(item)
  
  switch (status) {
    case 'empty': return 'Tükendi'
    case 'critical': return `Kritik (%${percentage})`
    case 'low': return `Düşük (%${percentage})`
    case 'sufficient': return `Yeterli (%${percentage})`
    default: return 'Bilinmiyor'
  }
}

const getStockPercentage = (item: any): number => {
  const current = Number(item.currentStock) || 0
  const total = Number(item.totalStock) || 0
  return total > 0 ? Math.round((current / total) * 100) : 0
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount || 0)
}

// Methods
const onFilterChange = (newFilters) => {
  filterData.value = newFilters
}

// Watch for prop changes
watch(() => props.currentPage, (newPage) => {
  currentPage.value = newPage
})

watch(() => props.itemsPerPage, (newCount) => {
  itemsPerPage.value = newCount
})
</script>

<style scoped>
.sciveto-data-table {
  @apply bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden;
}

.table-header {
  @apply flex items-center justify-between p-6 border-b border-slate-200;
}

.table-controls {
  @apply flex items-center gap-4;
}

.quick-actions {
  @apply flex items-center gap-2;
}

.filters-section {
  @apply p-4 bg-slate-50 border-b border-slate-200;
}

.filters-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3;
}

.ai-insights {
  @apply p-4 bg-blue-50/50 border-b border-slate-200;
}

.pagination-section {
  @apply p-4 border-t border-slate-200 bg-slate-50;
}
</style>