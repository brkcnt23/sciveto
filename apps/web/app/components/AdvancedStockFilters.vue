<template>
  <div class="advanced-stock-filters">
    <div class="filter-section">
      <h4>📊 Stok Durumu</h4>
      <div class="filter-chips">
        <UToggle
          v-for="status in stockStatuses"
          :key="status.value"
          v-model="selectedStatuses"
          :value="status.value"
          class="filter-chip"
        >
          <template #default="{ checked }">
            <div :class="['status-chip', { active: checked }, status.class]">
              <UIcon :name="status.icon" size="xs" />
              <span>{{ status.label }}</span>
              <UBadge 
                :color="getValidColor(status.color)" 
                variant="soft" 
                size="xs"
              >
                {{ getStatusCount(status.value) }}
              </UBadge>
            </div>
          </template>
        </UToggle>
      </div>
    </div>

    <div class="filter-section">
      <h4>🎯 Stok Seviyeleri</h4>
      <div class="range-filters">
        <div class="range-filter">
          <label>Minimum Stok:</label>
          <URange
            v-model="stockRange.min"
            :min="0"
            :max="1000"
            :step="10"
          />
          <span>{{ stockRange.min }}</span>
        </div>
        <div class="range-filter">
          <label>Maksimum Stok:</label>
          <URange
            v-model="stockRange.max"
            :min="0"
            :max="1000"
            :step="10"
          />
          <span>{{ stockRange.max }}</span>
        </div>
      </div>
    </div>

    <div class="filter-section">
      <h4>📈 ABC Analizi</h4>
      <USelectMenu
        v-model="selectedABCCategories"
        :options="abcCategories"
        multiple
        placeholder="ABC kategorileri seçin"
      />
    </div>

    <div class="filter-section">
      <h4>⏰ Kalan Süre</h4>
      <USelectMenu
        v-model="selectedTimeFrames"
        :options="timeFrames"
        multiple
        placeholder="Süre aralıkları seçin"
      />
    </div>

    <div class="filter-section">
      <h4>💰 Değer Aralığı</h4>
      <div class="value-range">
        <UInput
          v-model="valueRange.min"
          type="number"
          placeholder="Min değer"
          prefix="₺"
        />
        <span>-</span>
        <UInput
          v-model="valueRange.max"
          type="number"
          placeholder="Max değer"
          prefix="₺"
        />
      </div>
    </div>

    <div class="filter-actions">
      <UButton @click="applyFilters" color="primary">
        Filtreleri Uygula
      </UButton>
      <UButton @click="clearAllFilters" variant="ghost">
        Temizle
      </UButton>
      <UButton @click="saveFilterPreset" variant="outline">
        Preset Kaydet
      </UButton>
    </div>

    <!-- Quick Presets -->
    <div class="quick-presets">
      <h4>🚀 Hızlı Filtreler</h4>
      <div class="preset-buttons">
        <UButton
          v-for="preset in quickPresets"
          :key="preset.id"
          @click="applyPreset(preset)"
          :color="getValidColor(preset.color)"
          variant="soft"
          size="sm"
        >
          {{ preset.icon }} {{ preset.name }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StockFilterConfig {
  statuses: string[]
  stockRange: { min: number; max: number }
  abcCategories: string[]
  timeFrames: string[]
  valueRange: { min: number | null; max: number | null }
}

interface Props {
  items?: any[]
  modelValue?: StockFilterConfig
}

interface Emits {
  (e: 'update:modelValue', value: StockFilterConfig): void
  (e: 'filtersChanged', filters: StockFilterConfig): void
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const emit = defineEmits<Emits>()

const { getStockStatus } = useStockOptimization()

// Filter state
const selectedStatuses = ref<string[]>([])
const stockRange = ref({ min: 0, max: 1000 })
const selectedABCCategories = ref<string[]>([])
const selectedTimeFrames = ref<string[]>([])
const valueRange = ref({ min: null as number | null, max: null as number | null })

// Helper function to map status/preset colors to Nuxt UI types
const getValidColor = (color: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    'red': 'error',
    'orange': 'warning',
    'yellow': 'warning',
    'green': 'success',
    'blue': 'primary',
    'purple': 'secondary'
  }
  return colorMap[color] || 'neutral'
}

// Stock status options
const stockStatuses = [
  {
    value: 'empty',
    label: 'Stok Yok',
    icon: 'i-heroicons-x-circle',
    color: 'error',
    class: 'status-empty'
  },
  {
    value: 'critical',
    label: 'Kritik',
    icon: 'i-heroicons-exclamation-triangle',
    color: 'warning',
    class: 'status-critical'
  },
  {
    value: 'low',
    label: 'Düşük',
    icon: 'i-heroicons-exclamation-circle',
    color: 'warning',
    class: 'status-low'
  },
  {
    value: 'sufficient',
    label: 'Yeterli',
    icon: 'i-heroicons-check-circle',
    color: 'success',
    class: 'status-sufficient'
  },
  {
    value: 'overstocked',
    label: 'Fazla',
    icon: 'i-heroicons-arrow-trending-up',
    color: 'primary',
    class: 'status-overstocked'
  }
]

// ABC categories
const abcCategories = [
  { value: 'A', label: 'A Kategorisi (Yüksek Değer)' },
  { value: 'B', label: 'B Kategorisi (Orta Değer)' },
  { value: 'C', label: 'C Kategorisi (Düşük Değer)' }
]

// Time frames
const timeFrames = [
  { value: '0-7', label: '0-7 gün' },
  { value: '8-14', label: '8-14 gün' },
  { value: '15-30', label: '15-30 gün' },
  { value: '30+', label: '30+ gün' }
]

// Quick presets
const quickPresets = [
  {
    id: 'critical',
    name: 'Kritik Stoklar',
    icon: '🚨',
    color: 'error',
    config: { statuses: ['empty', 'critical'] }
  },
  {
    id: 'reorder',
    name: 'Sipariş Verilecek',
    icon: '📦',
    color: 'warning',
    config: { statuses: ['low', 'critical'] }
  },
  {
    id: 'overstocked',
    name: 'Fazla Stoklar',
    icon: '📈',
    color: 'primary',
    config: { statuses: ['overstocked'] }
  },
  {
    id: 'high-value',
    name: 'Yüksek Değer',
    icon: '💎',
    color: 'secondary',
    config: { abcCategories: ['A'] }
  }
]

// Get status count for each filter
const getStatusCount = (status: string): number => {
  return props.items.filter(item => {
    const stockLevel = getStockStatus(item.currentStock || 0, item.minStockLevel || 10)
    return stockLevel.status === status
  }).length
}

// Apply filters
const applyFilters = () => {
  const filters: StockFilterConfig = {
    statuses: selectedStatuses.value,
    stockRange: stockRange.value,
    abcCategories: selectedABCCategories.value,
    timeFrames: selectedTimeFrames.value,
    valueRange: valueRange.value
  }
  
  emit('update:modelValue', filters)
  emit('filtersChanged', filters)
}

// Clear all filters
const clearAllFilters = () => {
  selectedStatuses.value = []
  stockRange.value = { min: 0, max: 1000 }
  selectedABCCategories.value = []
  selectedTimeFrames.value = []
  valueRange.value = { min: null, max: null }
  applyFilters()
}

// Apply preset
const applyPreset = (preset: any) => {
  if (preset.config.statuses) {
    selectedStatuses.value = preset.config.statuses
  }
  if (preset.config.abcCategories) {
    selectedABCCategories.value = preset.config.abcCategories
  }
  applyFilters()
}

// Save filter preset
const saveFilterPreset = () => {
  // TODO: Implement preset saving to localStorage or user preferences
  console.log('Saving filter preset...', {
    statuses: selectedStatuses.value,
    stockRange: stockRange.value,
    abcCategories: selectedABCCategories.value,
    timeFrames: selectedTimeFrames.value,
    valueRange: valueRange.value
  })
}

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    selectedStatuses.value = newValue.statuses || []
    stockRange.value = newValue.stockRange || { min: 0, max: 1000 }
    selectedABCCategories.value = newValue.abcCategories || []
    selectedTimeFrames.value = newValue.timeFrames || []
    valueRange.value = newValue.valueRange || { min: null, max: null }
  }
}, { immediate: true })
</script>

<style scoped>
.advanced-stock-filters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .advanced-stock-filters {
    background: #111827;
  }
}

.filter-section h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  .filter-section h4 {
    color: #d1d5db;
  }
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
  cursor: pointer;
}

.status-chip.active {
  box-shadow: 0 0 0 2px #3b82f6;
}

.status-chip.status-empty {
  background: #fef2f2;
  border-color: #fecaca;
  color: #b91c1c;
}

@media (prefers-color-scheme: dark) {
  .status-chip.status-empty {
    background: rgba(185, 28, 28, 0.2);
    border-color: #991b1b;
    color: #fca5a5;
  }
}

.status-chip.status-critical {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #c2410c;
}

@media (prefers-color-scheme: dark) {
  .status-chip.status-critical {
    background: rgba(194, 65, 12, 0.2);
    border-color: #c2410c;
    color: #fdba74;
  }
}

.status-chip.status-low {
  background: #fefce8;
  border-color: #fde047;
  color: #a16207;
}

@media (prefers-color-scheme: dark) {
  .status-chip.status-low {
    background: rgba(161, 98, 7, 0.2);
    border-color: #a16207;
    color: #fde047;
  }
}

.status-chip.status-sufficient {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

@media (prefers-color-scheme: dark) {
  .status-chip.status-sufficient {
    background: rgba(22, 101, 52, 0.2);
    border-color: #166534;
    color: #bbf7d0;
  }
}

.status-chip.status-overstocked {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

@media (prefers-color-scheme: dark) {
  .status-chip.status-overstocked {
    background: rgba(29, 78, 216, 0.2);
    border-color: #1d4ed8;
    color: #bfdbfe;
  }
}

.range-filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.range-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.range-filter label {
  font-size: 0.875rem;
  color: #6b7280;
  min-width: 8rem;
}

@media (prefers-color-scheme: dark) {
  .range-filter label {
    color: #9ca3af;
  }
}

.value-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-actions {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .filter-actions {
    border-top-color: #374151;
  }
}

.quick-presets {
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .quick-presets {
    border-top-color: #374151;
  }
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
