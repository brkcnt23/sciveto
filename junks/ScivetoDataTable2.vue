<!-- components/table/ScivetoDataTable2.vue -->
<template>
  <div class="flex flex-col gap-4">
    <!-- Table Container -->
    <div class="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <!-- Table Header & Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 p-4 gap-4">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold text-slate-900" v-if="title">{{ title }}</h3>
          <p class="text-sm text-slate-600">{{ filteredItems.length }} {{ itemType }} gösteriliyor</p>
        </div>
        
        <div class="flex items-center gap-3">
          <!-- Quick Actions -->
          <div class="flex items-center gap-2">
            <UButton
              v-if="showStockOnlyFilter"
              color="blue"
              variant="ghost"
              icon="i-lucide-package"
              @click="$emit('show-stock-only')"
            >
              Stokta Var
            </UButton>
            <UButton
              v-if="showProjectFilter"
              color="amber"
              variant="ghost"
              icon="i-lucide-clipboard-list"
              @click="$emit('show-project-assigned')"
            >
              Projelerde
            </UButton>
            <UButton
              v-if="showClearFilter"
              color="gray"
              variant="ghost"
              icon="i-lucide-refresh-cw"
              @click="$emit('clear-filters')"
            >
              Tümü
            </UButton>
          </div>

          <!-- View Density -->
          <UButtonGroup size="sm">
            <UButton
              color="gray"
              :variant="viewDensity === 'compact' ? 'solid' : 'outline'"
              icon="i-lucide-minus"
              @click="$emit('density-change', 'compact')"
            />
            <UButton
              color="gray"
              :variant="viewDensity === 'normal' ? 'solid' : 'outline'"
              icon="i-lucide-equal"
              @click="$emit('density-change', 'normal')"
            />
            <UButton
              color="gray"
              :variant="viewDensity === 'detailed' ? 'solid' : 'outline'"
              icon="i-lucide-plus"
              @click="$emit('density-change', 'detailed')"
            />
          </UButtonGroup>

          <!-- Export & Add -->
          <UButton
            color="gray"
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
      <TableAdvancedFilters2 
        v-if="showFilters"
        v-model="filterData"
        :category-options="categoryFilterOptions"
        :supplier-options="supplierFilterOptions" 
        :project-options="projectFilterOptions"
        :location-options="locationFilterOptions"
        @filter-change="handleFilterChange"
        @export="handleExport"
      />
      
      <!-- Loading State -->
      <div v-if="loading" class="py-32 flex flex-col items-center justify-center">
        <UIcon name="i-lucide-loader-2" class="text-3xl animate-spin text-blue-500 mb-4" />
        <p class="text-slate-500">Veriler yükleniyor...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!filteredItems.length" class="py-32 flex flex-col items-center justify-center">
        <UIcon name="i-lucide-inbox" class="text-4xl text-slate-300 mb-4" />
        <h3 class="font-medium text-slate-700 mb-1">Veri bulunamadı</h3>
        <p class="text-slate-500 text-sm mb-4">{{ emptyText }}</p>
        <UButton color="blue" icon="i-lucide-refresh-cw" @click="$emit('refresh')">Yenile</UButton>
      </div>
      
      <!-- Table View -->
      <div v-else class="overflow-x-auto">
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
                :class="[
                  'text-left text-sm font-semibold text-slate-900',
                  getPaddingClass('th'),
                  column.sortable ? 'cursor-pointer hover:bg-slate-100' : '',
                  column.key === sortKey ? 'bg-slate-100' : ''
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
              <th 
                v-if="hasActions" 
                scope="col" 
                :class="['relative text-right', getPaddingClass('th')]"
              >
                <span class="sr-only">İşlemler</span>
              </th>
            </tr>
          </thead>
          
          <tbody class="divide-y divide-slate-200 bg-white">
            <tr 
              v-for="(item, index) in filteredItems" 
              :key="getItemKey(item, index)"
              :class="[
                isSelected(item) ? 'bg-blue-50' : '',
                isClickable ? 'cursor-pointer hover:bg-slate-50' : ''
              ]"
              @click="rowClick(item, index)"
            >
              <!-- Selection Column -->
              <td v-if="selectable" :class="['relative w-12', getPaddingClass('td')]">
                <UCheckbox
                  :model-value="isSelected(item)"
                  @update:model-value="toggleSelection(item)"
                  @click.stop
                />
              </td>
              
              <!-- Data Columns -->
              <td 
                v-for="column in visibleColumns" 
                :key="`${getItemKey(item, index)}-${column.key}`"
                :class="['text-sm text-slate-900', getPaddingClass('td')]"
              >
                <!-- Custom Cell Slot -->
                <slot 
                  :name="`cell:${column.key}`" 
                  :item="item" 
                  :value="getItemValue(item, column)"
                  :index="index"
                >
                  <!-- Default Cell Rendering -->
                  <span v-if="column.type === 'text' || !column.type">
                    {{ getItemValue(item, column) }}
                  </span>
                  
                  <span v-else-if="column.type === 'date'">
                    {{ formatDate(getItemValue(item, column)) }}
                  </span>
                  
                  <span v-else-if="column.type === 'number'">
                    {{ formatNumber(getItemValue(item, column)) }}
                  </span>
                  
                  <span v-else-if="column.type === 'currency'">
                    {{ formatCurrency(getItemValue(item, column)) }}
                  </span>
                  
                  <span v-else-if="column.type === 'boolean'">
                    <UIcon 
                      :name="getItemValue(item, column) ? 'i-lucide-check' : 'i-lucide-x'" 
                      :class="getItemValue(item, column) ? 'text-green-500' : 'text-red-500'"
                    />
                  </span>
                  
                  <span v-else-if="column.type === 'tag'">
                    <UBadge :color="getTagColor(item, column)">
                      {{ getItemValue(item, column) }}
                    </UBadge>
                  </span>
                  
                  <span v-else-if="column.type === 'status'">
                    <div class="flex items-center gap-2">
                      <span 
                        class="w-2 h-2 rounded-full" 
                        :class="getStatusColor(item, column)"
                      ></span>
                      <span>{{ getItemValue(item, column) }}</span>
                    </div>
                  </span>
                </slot>
              </td>
              
              <!-- Actions Column -->
              <td 
                v-if="hasActions" 
                :class="['text-sm text-right', getPaddingClass('td')]"
              >
                <slot 
                  name="actions" 
                  :item="item"
                  :index="index"
                >
                  <div class="flex justify-end gap-2">
                    <UButton
                      v-if="showViewAction"
                      color="gray"
                      variant="ghost"
                      icon="i-lucide-eye"
                      size="xs"
                      @click.stop="$emit('view', item)"
                    />
                    <UButton
                      v-if="showEditAction"
                      color="blue"
                      variant="ghost"
                      icon="i-lucide-pencil"
                      size="xs"
                      @click.stop="$emit('edit', item)"
                    />
                    <UButton
                      v-if="showDeleteAction"
                      color="red"
                      variant="ghost"
                      icon="i-lucide-trash-2"
                      size="xs"
                      @click.stop="$emit('delete', item)"
                    />
                  </div>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination Controls -->
      <div v-if="showPagination && totalPages > 1" class="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-4">
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-slate-700">
              <span>Gösteriliyor: </span>
              <span class="font-medium">{{ paginationFrom }}</span>
              <span> - </span>
              <span class="font-medium">{{ paginationTo }}</span>
              <span> / </span>
              <span class="font-medium">{{ totalItems }}</span>
              <span> kayıt</span>
            </p>
          </div>
          
          <UPagination
            v-model="currentPage"
            :total="totalItems"
            :page-count="totalPages"
            :ui="{ rounded: 'rounded-md' }"
          />
        </div>
        
        <div class="flex sm:hidden items-center justify-between w-full">
          <UButton
            color="gray"
            variant="outline"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Önceki
          </UButton>
          
          <span class="text-sm text-slate-700">
            {{ currentPage }} / {{ totalPages }}
          </span>
          
          <UButton
            color="gray"
            variant="outline"
            :disabled="currentPage === totalPages"
            @click="nextPage"
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
              @click="cancelDelete"
            >
              İptal
            </UButton>
            <UButton
              color="red"
              @click="confirmDelete"
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
import { ref, computed, watch } from 'vue'
import TableAdvancedFilters2 from './TableAdvancedFilters2.vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
  hidden?: boolean
  type?: 'text' | 'date' | 'number' | 'currency' | 'boolean' | 'tag' | 'status'
  tagColors?: Record<string, string>
  statusColors?: Record<string, string>
}

interface Props {
  items: any[]
  columns: Column[]
  title?: string
  itemType?: string
  loading?: boolean
  emptyText?: string
  selectable?: boolean
  modelValue?: any[]
  showFilters?: boolean
  showPagination?: boolean
  showDeleteAction?: boolean
  showEditAction?: boolean
  showViewAction?: boolean
  showStockOnlyFilter?: boolean
  showProjectFilter?: boolean
  showClearFilter?: boolean
  viewDensity?: 'compact' | 'normal' | 'detailed'
  addButtonLabel?: string
  perPage?: number
  totalItems?: number
  categoryFilterOptions?: any[]
  supplierFilterOptions?: any[]
  projectFilterOptions?: any[]
  locationFilterOptions?: any[]
  keyProp?: string
  isClickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  itemType: 'kayıt',
  loading: false,
  emptyText: 'Kayıt bulunamadı',
  selectable: false,
  modelValue: () => [],
  showFilters: false,
  showPagination: true,
  showDeleteAction: false,
  showEditAction: false,
  showViewAction: false,
  showStockOnlyFilter: false,
  showProjectFilter: false,
  showClearFilter: false,
  viewDensity: 'normal',
  addButtonLabel: 'Yeni Ekle',
  perPage: 10,
  totalItems: 0,
  categoryFilterOptions: () => [],
  supplierFilterOptions: () => [],
  projectFilterOptions: () => [],
  locationFilterOptions: () => [],
  keyProp: 'id',
  isClickable: false
})

const emit = defineEmits([
  'update:modelValue',
  'row-click',
  'view',
  'edit',
  'delete',
  'add-item',
  'filter',
  'export',
  'refresh',
  'page-change',
  'sort',
  'show-stock-only',
  'show-project-assigned',
  'clear-filters',
  'density-change'
])

// State
const selection = ref(props.modelValue)
const selectAll = ref(false)
const someSelected = ref(false)
const showDeleteConfirm = ref(false)
const itemToDelete = ref(null)
const currentPage = ref(1)
const sortKey = ref('')
const sortOrder = ref('asc')
const filterData = ref({})

// Computed
const visibleColumns = computed(() => {
  return props.columns.filter(column => !column.hidden)
})

const filteredItems = computed(() => {
  return props.items
})

const hasActions = computed(() => {
  return props.showEditAction || props.showDeleteAction || props.showViewAction || !!useSlots().actions
})

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.perPage)
})

const paginationFrom = computed(() => {
  if (props.totalItems === 0) return 0
  return (currentPage.value - 1) * props.perPage + 1
})

const paginationTo = computed(() => {
  return Math.min(paginationFrom.value + props.perPage - 1, props.totalItems)
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

const getPaddingClass = (element: 'th' | 'td') => {
  if (props.viewDensity === 'compact') {
    return 'px-3 py-2'
  } else if (props.viewDensity === 'detailed') {
    return 'px-6 py-4'
  } else {
    return 'px-4 py-3'
  }
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
  
  emit('update:modelValue', selection.value)
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selection.value = [...props.items]
  } else {
    selection.value = []
  }
  
  emit('update:modelValue', selection.value)
}

const sort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
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

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const rowClick = (item: any, index: number) => {
  if (props.isClickable) {
    emit('row-click', item, index)
  }
}

const confirmDelete = () => {
  emit('delete', itemToDelete.value)
  showDeleteConfirm.value = false
  itemToDelete.value = null
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  itemToDelete.value = null
}

const handleFilterChange = (filters: any) => {
  filterData.value = filters
  emit('filter', filters)
}

const handleExport = (options: any) => {
  emit('export', { ...options, filters: filterData.value })
}

const formatDate = (value: any) => {
  if (!value) return ''
  
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

const formatCurrency = (value: any) => {
  if (value === undefined || value === null) return ''
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value)
}

const getTagColor = (item: any, column: Column) => {
  const value = getItemValue(item, column)
  if (column.tagColors && value in column.tagColors) {
    return column.tagColors[value]
  }
  return 'blue'
}

const getStatusColor = (item: any, column: Column) => {
  const value = getItemValue(item, column)
  if (column.statusColors && value in column.statusColors) {
    return column.statusColors[value]
  }
  return 'bg-blue-500'
}

// Watches
watch(() => props.modelValue, (newValue) => {
  selection.value = newValue
}, { immediate: true })

watch(selection, () => {
  selectAll.value = props.items.length > 0 && selection.value.length === props.items.length
  someSelected.value = selection.value.length > 0 && selection.value.length < props.items.length
})

watch(currentPage, (newValue) => {
  emit('page-change', newValue)
})
</script>
