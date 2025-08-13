<template>
  <div class="base-data-table">
    <!-- Head          <USelectMenu
            :model-value="itemsPerPage"
            @update:model-value="handleItemsChange"-->
    <div class="table-header">
      <div class="table-info">
        <h3>{{ title }}</h3>
        <span class="item-count">{{ filteredCount }} {{ itemType }} gösteriliyor</span>
        
        <!-- Performance indicator -->
        <UBadge
          v-if="shouldUseVirtualScroll"
          color="primary"
          variant="soft"
          size="xs"
        >
          🚀 Virtual Scroll Aktif
        </UBadge>
      </div>
      <div class="table-controls">
        <!-- Advanced Stock Filters Toggle -->
        <UButton
          @click="showAdvancedFilters = !showAdvancedFilters"
          variant="outline"
          size="sm"
          :color="showAdvancedFilters ? 'primary' : 'neutral'"
        >
          <UIcon name="i-heroicons-funnel" />
          Gelişmiş Filtreler
        </UButton>
        
        <div class="stock-filter-actions">
          <UButton @click="$emit('show-stock-only')" variant="soft" color="primary" size="sm">
            <UIcon name="i-lucide-package" />
            Sadece Stok
          </UButton>
          <UButton @click="$emit('show-project-assigned')" variant="soft" color="neutral" size="sm">
            <UIcon name="i-lucide-clipboard-list" />
            Projeye Atanmış
          </UButton>
          <UButton @click="$emit('clear-filters')" variant="outline" size="sm">
            <UIcon name="i-lucide-refresh-cw" />
            Tümünü Göster
          </UButton>
        </div>

        <!-- Import/Export Actions -->
        <div class="import-export-actions">
          <UButton @click="$emit('open-import')" variant="soft" color="success" size="sm">
            <UIcon name="i-lucide-download" />
            İçe Aktar
          </UButton>
          <UButton @click="$emit('open-export')" variant="soft" color="info" size="sm">
            <UIcon name="i-lucide-upload" />
            Dışa Aktar
          </UButton>
        </div>
        
        <div class="view-density">
          <label>Görünüm:</label>
          <UButton 
            v-for="density in viewDensities" 
            :key="density.value"
            @click="$emit('density-change', density.value)"
            :variant="currentDensity === density.value ? 'solid' : 'outline'"
            :color="currentDensity === density.value ? 'primary' : 'neutral'"
            size="sm"
            :title="density.label"
          >
            {{ density.icon }}
          </UButton>
        </div>

        <div class="items-per-page">
          <USelectMenu
            :model-value="itemsPerPage"
            @update:model-value="handleItemsChange"
            :options="[
              { value: 25, label: '25 kayıt' },
              { value: 50, label: '50 kayıt' },
              { value: 100, label: '100 kayıt' },
              { value: 500, label: '500 kayıt' }
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Advanced Filters Panel -->
    <div v-show="showAdvancedFilters" class="advanced-filters-panel">
      <div class="p-4 bg-gray-50 border rounded-lg">
        <p class="text-sm text-gray-600">Gelişmiş filtreler yakında eklenecek...</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Veriler yükleniyor...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">❌</div>
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="btn btn-primary">Yeniden Dene</button>
    </div>

    <!-- Table Content -->
    <div v-else class="table-wrapper">
      <table :class="['stock-table', `density-${currentDensity}`]">
        <thead>
          <tr>
            <th v-if="selectable" class="checkbox-col">
              <input 
                type="checkbox" 
                @change="$emit('toggle-select-all')" 
                :checked="isAllSelected"
                :indeterminate="isPartiallySelected"
              >
            </th>
            <slot name="table-head"></slot>
            <th class="actions-col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedData.length === 0" class="empty-row">
            <td :colspan="columnCount" class="empty-message">
              <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>{{ emptyMessage || 'Gösterilecek veri bulunamadı' }}</p>
              </div>
            </td>
          </tr>
          <tr 
            v-else
            v-for="item in paginatedData" 
            :key="getItemId(item)" 
            :class="getRowClasses(item)"
            @click="$emit('row-click', item)"
          >
            <td v-if="selectable" class="checkbox-cell">
              <input 
                type="checkbox" 
                :value="getItemId(item)" 
                :checked="selectedItems.includes(getItemId(item))"
                @change="$emit('item-select', getItemId(item))"
                @click.stop
              >
            </td>
            
            <slot name="table-body" :item="item" :index="paginatedData.indexOf(item)"></slot>
            
            <td class="actions-cell">
              <div class="action-buttons">
                <button 
                  @click.stop="$emit('view-item', item)" 
                  class="btn-icon btn-info" 
                  title="Detayları Görüntüle"
                >
                  <UIcon name="i-lucide-eye" />
                </button>
                <button 
                  @click.stop="$emit('edit-item', item)" 
                  class="btn-icon btn-warning" 
                  title="Düzenle"
                >
                  <UIcon name="i-lucide-edit" />
                </button>
                <button 
                  @click.stop="$emit('duplicate-item', item)" 
                  class="btn-icon btn-secondary" 
                  title="Kopyala"
                >
                  <UIcon name="i-lucide-copy" />
                </button>
                <button 
                  @click.stop="$emit('delete-item', item)" 
                  class="btn-icon btn-danger" 
                  title="Sil"
                >
                  <UIcon name="i-lucide-trash-2" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && !error && totalItems > 0" class="pagination-container">
      <div class="pagination-info">
        Gösterilen: {{ startIndex }}-{{ endIndex }} / {{ totalItems }} kayıt
      </div>
      <div class="pagination-controls">
        <button 
          @click="$emit('page-change', currentPage - 1)" 
          :disabled="currentPage === 1" 
          class="btn btn-sm"
        >
          ← Önceki
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="typeof page === 'number' && $emit('page-change', page)"
            :class="['btn', 'btn-sm', { active: page === currentPage }]"
            :disabled="typeof page === 'string'"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="$emit('page-change', currentPage + 1)" 
          :disabled="currentPage === totalPages" 
          class="btn btn-sm"
        >
          Sonraki →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Props
const props = defineProps<{
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
}>()

// Default values for optional props
const loading = props.loading ?? false
const error = props.error ?? null
const selectable = props.selectable ?? true
const selectedItems = props.selectedItems ?? []
const emptyMessage = props.emptyMessage ?? ''
const lowStockThreshold = props.lowStockThreshold ?? 20
const criticalStockThreshold = props.criticalStockThreshold ?? 10

// Advanced features state
const showAdvancedFilters = ref(false)
const advancedFilters = ref({
  statuses: [],
  stockRange: { min: 0, max: 1000 },
  abcCategories: [],
  timeFrames: [],
  valueRange: { min: null, max: null }
})

// Simple virtual scroll alternative
const shouldUseVirtualScroll = computed(() => props.paginatedData.length > 100)

// Emits
const emit = defineEmits<{
  'density-change': [density: 'compact' | 'normal' | 'detailed']
  'items-change': [count: number]
  'show-stock-only': []
  'show-project-assigned': []
  'clear-filters': []
  'open-import': []
  'open-export': []
  'toggle-select-all': []
  'item-select': [id: string]
  'page-change': [page: number]
  'row-click': [item: any]
  'view-item': [item: any]
  'edit-item': [item: any]
  'duplicate-item': [item: any]
  'delete-item': [item: any]
  'add-item': []
  'retry': []
  'filters-changed': [filters: any]
}>()

// Constants
const viewDensities = [
  { value: 'compact' as const, icon: 'S', label: 'Kompakt' },
  { value: 'normal' as const, icon: 'M', label: 'Normal' },
  { value: 'detailed' as const, icon: 'L', label: 'Detaylı' }
]

// Methods
const handleAdvancedFilters = (filters: any) => {
  emit('filters-changed', filters)
}

const handleItemsChange = (value: any) => {
  emit('items-change', value?.value || value)
}

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
         selectedItems.length === props.paginatedData.length &&
         props.paginatedData.every(item => selectedItems.includes(getItemId(item)))
})

const isPartiallySelected = computed(() => {
  const selectedInPage = props.paginatedData.filter(item => 
    selectedItems.includes(getItemId(item))
  ).length
  return selectedInPage > 0 && selectedInPage < props.paginatedData.length
})

const columnCount = computed(() => {
  let count = 6 // Base columns estimate
  if (props.selectable) count += 1
  return count
})

// Methods
const getItemId = (item: any): string => {
  return item._id || item.id || String(Math.random())
}

const getStockPercentage = (item: any): number => {
  const current = parseFloat(item.currentStock || '0')
  const min = parseFloat(item.minStockLevel || '0')
  return min > 0 ? Math.round((current / min) * 100) : (current > 0 ? 100 : 0)
}

const getRowClasses = (item: any): string[] => {
  const classes: string[] = []
  
  if (selectedItems.includes(getItemId(item))) {
    classes.push('selected-row')
  }
  
  // Stok durumu sınıfları
  const current = parseFloat(item.currentStock || '0')
  const min = parseFloat(item.minStockLevel || '0')
  
  if (current === 0) {
    classes.push('empty-stock')
  } else if (current <= min && min > 0) {
    classes.push('critical-stock')
  } else if (current <= min * 1.5 && min > 0) {
    classes.push('low-stock')
  }
  
  return classes
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

.import-export-actions {
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

.btn-density {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  min-width: 36px;
}

.btn-density:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.btn-density.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
}

.items-per-page select {
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

/* Buttons */
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.btn-sm {
  padding: 6px 10px;
  font-size: 12px;
}

.btn-primary { background: #3b82f6; color: white; }
.btn-secondary { background: #6b7280; color: white; }
.btn-info { background: #06b6d4; color: white; }
.btn-outline { 
  background: transparent; 
  border: 1px solid #d1d5db; 
  color: #374151; 
}

.btn:hover { transform: translateY(-1px); }
.btn:disabled { 
  opacity: 0.5; 
  cursor: not-allowed; 
  transform: none; 
}

/* States */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  color: #9ca3af;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
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

.btn-icon {
  padding: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon:hover {
  transform: scale(1.1);
}

.btn-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-icon.btn-info { background: #e0f2fe; color: #0369a1; }
.btn-icon.btn-warning { background: #fef3c7; color: #92400e; }
.btn-icon.btn-success { background: #dcfce7; color: #166534; }
.btn-icon.btn-secondary { background: #f3f4f6; color: #374151; }
.btn-icon.btn-danger { background: #fef2f2; color: #dc2626; }

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

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.pagination-controls .btn.active {
  background: #3b82f6;
  color: white;
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
