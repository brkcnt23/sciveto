<!-- components/BaseDataTable.vue -->
<template>
  <div class="base-data-table">
    <!-- Header -->
    <div class="table-header">
      <div class="table-info">
        <h3>{{ title }}</h3>
        <span class="item-count">{{ filteredCount }} {{ itemType }} gösteriliyor</span>
      </div>
      <div class="table-controls">
        <slot name="table-actions">
          <!-- Quick Filter Actions -->
          <div class="stock-filter-actions">
            <UButton
              @click="handleShowStockOnly"
              color="primary"
              variant="outline"
              size="sm"
              icon="i-heroicons-cube"
            >
              Sadece Stok
            </UButton>
            <UButton
              @click="handleShowProjectAssigned"
              color="warning"
              variant="outline"
              size="sm"
              icon="i-heroicons-clipboard-document-list"
            >
              Projede Kullanılan
            </UButton>
            <UButton
              @click="handleClearFilters"
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-heroicons-arrow-path"
            >
              Tümü
            </UButton>
          </div>
        </slot>
        
        <div class="view-density">
          <label>Görünüm:</label>
          <div class="density-buttons">
            <UButton
              v-for="density in viewDensities"
              :key="density.value"
              :color="currentDensity === density.value ? 'primary' : 'neutral'"
              :variant="currentDensity === density.value ? 'solid' : 'outline'"
              size="sm"
              @click="handleDensityChange(density.value)"
              :title="density.label"
            >
              {{ density.icon }}
            </UButton>
          </div>
        </div>

        <div class="items-per-page">
          <span>Sayfa başına:</span>
          <USelectMenu
            :model-value="itemsPerPage.toString()"
            @update:model-value="handleItemsChange"
            :options="[
              { label: '10', value: '10' },
              { label: '20', value: '20' },
              { label: '50', value: '50' },
              { label: '100', value: '100' }
            ]"
            size="sm"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <UIcon name="i-heroicons-arrow-path" class="loading-spinner" />
      <p>Veriler yükleniyor...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <UIcon name="i-heroicons-exclamation-triangle" class="error-icon" />
      <p>{{ error }}</p>
      <UButton @click="handleRetry" color="primary">Yeniden Dene</UButton>
    </div>

    <!-- Empty State -->
    <div v-else-if="paginatedData.length === 0" class="empty-state">
      <UIcon name="i-heroicons-inbox" class="empty-icon" />
      <h3>{{ emptyMessage || `${itemType} bulunamadı` }}</h3>
      <p>Filtreleri değiştirmeyi deneyin</p>
    </div>

    <!-- Table Content -->
    <div v-else class="table-wrapper">
      <table :class="['stock-table', `density-${currentDensity}`]">
        <thead>
          <tr>
            <!-- Selection Column -->
            <th v-if="selectable" class="checkbox-col">
              <UCheckbox
                :model-value="isAllSelected"
                :indeterminate="isPartiallySelected"
                @update:model-value="$emit('toggle-select-all')"
              />
            </th>
            
            <!-- Table Head Slot -->
            <slot name="table-head"></slot>
            
            <!-- Actions Column -->
            <th class="actions-col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="getItemId(item)"
            :class="getRowClasses(item)"
            @click="$emit('row-click', item)"
          >
            <!-- Selection Column -->
            <td v-if="selectable" class="checkbox-cell">
              <UCheckbox
                :model-value="selectedItems.includes(getItemId(item))"
                @update:model-value="$emit('item-select', getItemId(item))"
                @click.stop
              />
            </td>
            
            <!-- Table Body Slot -->
            <slot name="table-body" :item="item" :index="index"></slot>
            
            <!-- Actions Column -->
            <td class="actions-cell">
              <div class="action-buttons">
                <UButton
                  @click.stop="handleViewItem(item)"
                  color="info"
                  variant="ghost"
                  size="sm"
                  icon="i-heroicons-eye"
                  title="Görüntüle"
                />
                <UButton
                  @click.stop="handleEditItem(item)"
                  color="warning"
                  variant="ghost"
                  size="sm"
                  icon="i-heroicons-pencil-square"
                  title="Düzenle"
                />
                <UButton
                  @click.stop="handleDuplicateItem(item)"
                  color="success"
                  variant="ghost"
                  size="sm"
                  icon="i-heroicons-document-duplicate"
                  title="Kopyala"
                />
                <UButton
                  @click.stop="handleDeleteItem(item)"
                  color="error"
                  variant="ghost"
                  size="sm"
                  icon="i-heroicons-trash"
                  title="Sil"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && !error && totalItems > 0" class="pagination-container">
      <div class="pagination-info">
        <span>{{ startIndex }}-{{ endIndex }} / {{ totalItems }} kayıt gösteriliyor</span>
        <span v-if="selectedItems.length > 0" class="selected-info">
          ({{ selectedItems.length }} seçili)
        </span>
      </div>
      <div class="pagination-controls">
        <UButton
          @click="handlePageChange(currentPage - 1)"
          :disabled="currentPage <= 1"
          color="neutral"
          variant="outline"
          size="sm"
          icon="i-heroicons-chevron-left"
        >
          Önceki
        </UButton>
        
        <div class="page-numbers">
          <template v-for="(page, index) in visiblePages" :key="index">
            <span v-if="page === '...'" class="page-ellipsis">...</span>
            <UButton
              v-else
              @click="handlePageChange(page as number)"
              :color="currentPage === page ? 'primary' : 'neutral'"
              :variant="currentPage === page ? 'solid' : 'outline'"
              size="sm"
            >
              {{ page }}
            </UButton>
          </template>
        </div>
        
        <UButton
          @click="handlePageChange(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          color="neutral"
          variant="outline"
          size="sm"
          icon="i-heroicons-chevron-right"
        >
          Sonraki
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = withDefaults(defineProps<{
  title: string
  itemType: string
  paginatedData: any[]
  filteredCount: number
  totalItems: number
  currentPage: number
  itemsPerPage: number
  currentDensity: 'compact' | 'normal' | 'detailed'
  loading?: boolean
  error?: string | null
  selectable?: boolean
  selectedItems?: string[]
  emptyMessage?: string
  lowStockThreshold?: number
  criticalStockThreshold?: number
}>(), {
  loading: false,
  error: null,
  selectable: true,
  selectedItems: () => [],
  emptyMessage: '',
  lowStockThreshold: 20,
  criticalStockThreshold: 10
})

// Emits
const emit = defineEmits<{
  'density-change': [density: 'compact' | 'normal' | 'detailed']
  'items-change': [count: string]
  'show-stock-only': []
  'show-project-assigned': []
  'clear-filters': []
  'toggle-select-all': []
  'item-select': [id: string]
  'page-change': [page: number]
  'row-click': [item: any]
  'view-item': [item: any]
  'edit-item': [item: any]
  'duplicate-item': [item: any]
  'delete-item': [item: any]
  'retry': []
}>()

// Constants
const viewDensities = [
  { value: 'compact' as const, icon: '⚲', label: 'Kompakt' },
  { value: 'normal' as const, icon: '☰', label: 'Normal' },
  { value: 'detailed' as const, icon: '☱', label: 'Detaylı' }
]

// Computed
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const startIndex = computed(() => {
  if (props.paginatedData.length === 0) return 0
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endIndex = computed(() => {
  const calculated = props.currentPage * props.itemsPerPage
  return Math.min(calculated, props.totalItems)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = props.currentPage
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      pages.push(...[1, 2, 3, 4, 5, '...', total])
    } else if (current >= total - 3) {
      pages.push(...[1, '...', total - 4, total - 3, total - 2, total - 1, total])
    } else {
      pages.push(...[1, '...', current - 1, current, current + 1, '...', total])
    }
  }
  
  return pages
})

const isAllSelected = computed(() => {
  return props.paginatedData.length > 0 && 
         props.selectedItems.length === props.paginatedData.length &&
         props.paginatedData.every(item => props.selectedItems.includes(getItemId(item)))
})

const isPartiallySelected = computed(() => {
  const selectedInPage = props.paginatedData.filter(item => 
    props.selectedItems.includes(getItemId(item))
  ).length
  return selectedInPage > 0 && selectedInPage < props.paginatedData.length
})

// Methods
const getItemId = (item: any): string => {
  return item.id || item._id || String(Math.random())
}

const getStockPercentage = (item: any): number => {
  const current = item.currentStock || item.stock || 0
  const min = item.minStock || item.minStockLevel || 0
  return min > 0 ? Math.round((current / min) * 100) : 100
}

const getRowClasses = (item: any): string[] => {
  const classes: string[] = []
  
  if (props.selectedItems.includes(getItemId(item))) {
    classes.push('selected-row')
  }
  
  // Stok durumu sınıfları
  const current = item.currentStock || item.stock || 0
  const min = item.minStock || item.minStockLevel || 0
  
  if (current === 0) {
    classes.push('empty-stock')
  } else if (current <= min && min > 0) {
    if (current < min * 0.5) {
      classes.push('critical-stock')
    } else {
      classes.push('low-stock')
    }
  }
  
  return classes
}

// Event handlers
const handleItemsChange = (payload: any) => {
  const count = typeof payload === 'string' ? payload : payload?.value || payload
  emit('items-change', count)
}

const handlePageChange = (page: number) => {
  emit('page-change', page)
}

const handleDensityChange = (density: 'compact' | 'normal' | 'detailed') => {
  emit('density-change', density)
}

const handleShowStockOnly = () => {
  emit('show-stock-only')
}

const handleShowProjectAssigned = () => {
  emit('show-project-assigned')
}

const handleClearFilters = () => {
  emit('clear-filters')
}

const handleToggleSelectAll = () => {
  emit('toggle-select-all')
}

const handleItemSelect = (id: string) => {
  emit('item-select', id)
}

const handleRowClick = (item: any) => {
  emit('row-click', item)
}

const handleViewItem = (item: any) => {
  emit('view-item', item)
}

const handleEditItem = (item: any) => {
  emit('edit-item', item)
}

const handleDuplicateItem = (item: any) => {
  emit('duplicate-item', item)
}

const handleDeleteItem = (item: any) => {
  emit('delete-item', item)
}

const handleRetry = () => {
  emit('retry')
}
</script>

<style scoped>
.base-data-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* Header */
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
  flex-wrap: wrap;
  gap: 15px;
}

.table-info h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.4rem;
}

.item-count {
  color: #6b7280;
  font-size: 14px;
}

.table-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.stock-filter-actions {
  display: flex;
  gap: 8px;
}

.view-density {
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-density label {
  font-weight: 500;
  color: #374151;
  font-size: 14px;
  white-space: nowrap;
}

.density-buttons {
  display: flex;
  gap: 4px;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
}

/* States */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  animation: spin 1s linear infinite;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.error-icon,
.empty-icon {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
  max-height: 70vh;
}

.stock-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.stock-table.density-compact {
  font-size: 11px;
}

.stock-table.density-compact th,
.stock-table.density-compact td {
  padding: 8px 6px;
}

.stock-table.density-normal th,
.stock-table.density-normal td {
  padding: 12px 8px;
}

.stock-table.density-detailed th,
.stock-table.density-detailed td {
  padding: 16px 10px;
}

.stock-table th {
  background: #f8fafc;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
  white-space: nowrap;
}

.stock-table td {
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
}

.stock-table tbody tr {
  transition: background 0.2s;
  cursor: pointer;
}

.stock-table tbody tr:hover {
  background: #f8fafc;
}

.selected-row {
  background: #dbeafe !important;
}

.low-stock {
  background: #fefbeb !important;
}

.critical-stock {
  background: #fef2f2 !important;
}

.empty-stock {
  background: #f3f4f6 !important;
  opacity: 0.7;
}

/* Table Cells */
.checkbox-col,
.checkbox-cell {
  width: 40px;
  text-align: center;
}

.actions-col,
.actions-cell {
  min-width: 140px;
  text-align: center;
  position: sticky;
  right: 0;
  background: inherit;
  z-index: 5;
}

.action-buttons {
  display: flex;
  gap: 4px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
}

.pagination-info {
  color: #6b7280;
  font-size: 14px;
}

.selected-info {
  color: #3b82f6;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-ellipsis {
  color: #6b7280;
  padding: 0 8px;
}

/* Animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .table-controls {
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .stock-filter-actions {
    order: -1;
    width: 100%;
    justify-content: center;
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
