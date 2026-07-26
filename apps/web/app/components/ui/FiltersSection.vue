<!-- components/ui/FiltersSection.vue -->
<template>
  <div class="filters-section">
    <div class="filter-header">
      <h3 class="filter-title">
        <UIcon name="i-lucide-filter" size="18" />
        Filtreler
      </h3>
      <UButton
        @click="$emit('clear-filters')"
        variant="ghost"
        size="sm"
        icon="i-lucide-x"
      >
        Temizle
      </UButton>
    </div>
    
    <div class="filter-grid">
      <!-- Search -->
      <div class="filter-group">
        <label>Arama</label>
        <UInput
          :model-value="searchText"
          @update:model-value="$emit('search-change', $event)"
          :placeholder="searchPlaceholder || 'Ara...'"
          icon="i-lucide-search"
        />
      </div>

      <!-- Dynamic Filter Groups -->
      <div
        v-for="(filterGroup, key) in filterGroups"
        :key="key"
        class="filter-group"
      >
        <label>{{ filterGroup.label }}</label>
        <USelect
          :model-value="filters[key]"
          @update:model-value="updateFilter(key, $event)"
          :options="filterGroup.options"
          :placeholder="`Tüm ${filterGroup.label}`"
        />
      </div>
    </div>

    <!-- Quick Filter Buttons -->
    <div v-if="quickFilters.length > 0" class="quick-filters">
      <UButton
        v-for="filter in quickFilters"
        :key="filter.key"
        @click="handleQuickFilter(filter)"
        variant="outline"
        :color="filter.color === 'orange' ? 'warning' : filter.color === 'red' ? 'error' : filter.color === 'blue' ? 'primary' : 'neutral'"
        size="sm"
        :icon="filter.icon"
      >
        {{ filter.label }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FilterOption {
  value: string
  label: string
}

interface FilterGroup {
  label: string
  options: FilterOption[]
}

interface QuickFilter {
  key: string
  label: string
  event: string
  icon?: string
  variant?: string
  color?: string
}

interface Props {
  filters: Record<string, any>
  searchText: string
  filterGroups?: Record<string, FilterGroup>
  quickFilters?: QuickFilter[]
  searchPlaceholder?: string
}

withDefaults(defineProps<Props>(), {
  filterGroups: () => ({}),
  quickFilters: () => [
    {
      key: 'stock-only',
      label: 'Sadece Stokta',
      event: 'show-stock-only',
      icon: 'i-lucide-package',
      color: 'blue'
    },
    {
      key: 'project-assigned',
      label: 'Projeye Atanmış',
      event: 'show-project-assigned',
      icon: 'i-lucide-clipboard-list',
      color: 'green'
    },
    {
      key: 'all',
      label: 'Tümünü Göster',
      event: 'clear-filters',
      icon: 'i-lucide-refresh-cw',
      variant: 'outline'
    }
  ],
  searchPlaceholder: 'Kalite, boyut, proje ara...'
})

const emit = defineEmits<{
  'filter-change': [filters: Record<string, any>]
  'search-change': [search: string]
  'clear-filters': []
  'show-stock-only': []
  'show-project-assigned': []
}>()

const updateFilter = (key: string, value: string) => {
  emit('filter-change', { [key]: value })
}

const handleQuickFilter = (filter: any) => {
  if (filter.event === 'show-stock-only') {
    emit('show-stock-only')
  } else if (filter.event === 'show-project-assigned') {
    emit('show-project-assigned')
  } else if (filter.event === 'clear-filters') {
    emit('clear-filters')
  }
}
</script>

<style scoped>
.filters-section {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.filter-title {
  margin: 0;
  color: #1e293b;
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.quick-filters {
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-filters {
    justify-content: center;
  }
  
  .filter-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
}
</style>
