<template>
  <div class="base-data-table">
    <!-- Header -->
    <div class="table-header">
      <div class="table-info">
        <h3>{{ title }}</h3>
        <span class="item-count">{{ filteredCount }} {{ itemType }} gösteriliyor</span>
      </div>
      <div class="table-controls">
        <div class="stock-filter-actions">
          <button @click="$emit('show-stock-only')" class="btn btn-info">
            📦 Sadece Stok
          </button>
          <button @click="$emit('show-project-assigned')" class="btn btn-secondary">
            📋 Projeye Atanmış
          </button>
          <button @click="$emit('clear-filters')" class="btn btn-outline">
            🔄 Tümünü Göster
          </button>
        </div>
        
        <div class="view-density">
          <label>Görünüm:</label>
          <button 
            v-for="density in viewDensities" 
            :key="density.value"
            @click="$emit('density-change', density.value)"
            :class="['btn-density', { active: currentDensity === density.value }]"
            :title="density.label"
          >
            {{ density.icon }}
          </button>
        </div>

        <div class="items-per-page">
          <select :value="itemsPerPage" @change="e => $emit('items-change', (e.target as HTMLSelectElement).value)">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>kayıt</span>
        </div>

        <button @click="$emit('add-item')" class="btn btn-primary">
          ➕ Yeni Ürün Ekle
        </button>
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
                <button @click="$emit('add-item')" class="btn btn-primary">
                  ➕ İlk Ürünü Ekle
                </button>
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
                  👁️
                </button>
                <button 
                  @click.stop="$emit('edit-item', item)" 
                  class="btn-icon btn-warning" 
                  title="Düzenle"
                >
                  ✏️
                </button>
                <button 
                  @click.stop="$emit('duplicate-item', item)" 
                  class="btn-icon btn-secondary" 
                  title="Kopyala"
                >
                  📋
                </button>
                <button 
                  @click.stop="$emit('delete-item', item)" 
                  class="btn-icon btn-danger" 
                  title="Sil"
                >
                  🗑️
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
import { computed } from 'vue'

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

// Emits
defineEmits<{
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
  'add-item': []
  'retry': []
}>()

// Constants
const viewDensities = [
  { value: 'compact' as const, icon: '🔍-', label: 'Kompakt' },
  { value: 'normal' as const, icon: '🔍', label: 'Normal' },
  { value: 'detailed' as const, icon: '🔍+', label: 'Detaylı' }
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
