<!-- apps/web/components/Table.vue -->
<template>
  <div class="overflow-x-auto bg-white rounded-xl shadow-lg">
    <table class="min-w-full divide-y divide-stone-200">
      <!-- Header -->
      <thead class="bg-gradient-to-r from-slate-50 to-stone-100">
        <tr>
          <th 
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider transition-colors"
            :class="[
              column.sortable ? 'cursor-pointer hover:bg-stone-200' : '',
              column.width || '',
              column.align === 'center' ? 'text-center' : '',
              column.align === 'right' ? 'text-right' : ''
            ]"
            @click="column.sortable ? sort(column.key) : null"
          >
            <div class="flex items-center space-x-2" :class="column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : ''">
              <span>{{ column.label }}</span>
              <Icon 
                v-if="column.sortable && sortField === column.key" 
                :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
                class="h-4 w-4" 
              />
            </div>
          </th>
          <th v-if="actions.length > 0" class="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      
      <!-- Body -->
      <tbody class="bg-white divide-y divide-stone-100">
        <tr 
          v-for="(item, index) in sortedData" 
          :key="item.id || index"
          class="transition-all duration-200"
          :class="[
            hoverable && 'hover:bg-gradient-to-r hover:from-sky-50 hover:to-stone-50 cursor-pointer',
            striped && index % 2 === 1 && 'bg-slate-25'
          ]"
          @click="hoverable ? $emit('row-click', item) : null"
        >
          <!-- Data Cells -->
          <td 
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-5"
            :class="[
              column.width || '',
              column.align === 'center' ? 'text-center' : '',
              column.align === 'right' ? 'text-right' : '',
              column.nowrap !== false ? 'whitespace-nowrap' : ''
            ]"
          >
            <slot 
              :name="`cell-${column.key}`" 
              :item="item" 
              :value="getNestedValue(item, column.key)"
              :index="index"
            >
              <!-- Default cell content -->
              <span class="text-sm text-slate-900">
                {{ formatValue(getNestedValue(item, column.key), column.format) }}
              </span>
            </slot>
          </td>
          
          <!-- Actions -->
          <td v-if="actions.length > 0" class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex items-center justify-end space-x-2">
              <component
                v-for="action in actions"
                :key="action.name"
                :is="action.component || 'UButton'"
                size="xs"
                variant="soft"
                :color="action.color"
                :icon="action.icon"
                @click.stop="$emit(action.event, item)"
                v-bind="action.props"
              >
                {{ action.label }}
              </component>
            </div>
          </td>
        </tr>
        
        <!-- Empty State -->
        <tr v-if="sortedData.length === 0">
          <td :colspan="columns.length + (actions.length > 0 ? 1 : 0)" class="px-6 py-12 text-center">
            <div class="text-slate-500">
              <Icon name="i-heroicons-inbox" class="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p class="text-lg font-medium">{{ emptyMessage }}</p>
              <p class="text-sm">{{ emptyDescription }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  actions: {
    type: Array,
    default: () => []
  },
  sortOrder: {
    type: Object,
    default: () => ({})
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  striped: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: 'No data available'
  },
  emptyDescription: {
    type: String,
    default: 'Try adjusting your search or filter criteria.'
  }
})

const emit = defineEmits(['row-click', 'sort'])

// Sorting state
const sortField = ref('')
const sortDirection = ref('asc')

// Get nested object value
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((value, key) => value?.[key], obj)
}

// Format value based on column format
const formatValue = (value, format) => {
  if (!value && value !== 0) return '-'
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    case 'number':
      return new Intl.NumberFormat('en-US').format(value)
    case 'date':
      return new Date(value).toLocaleDateString()
    case 'datetime':
      return new Date(value).toLocaleString()
    case 'percentage':
      return `${value}%`
    default:
      return value
  }
}

// Computed sorted data
const sortedData = computed(() => {
  if (!sortField.value) return props.data
  
  return [...props.data].sort((a, b) => {
    let aValue = getNestedValue(a, sortField.value)
    let bValue = getNestedValue(b, sortField.value)
    
    // Handle enum sorting
    if (props.sortOrder[sortField.value]) {
      aValue = props.sortOrder[sortField.value][aValue] || 999
      bValue = props.sortOrder[sortField.value][bValue] || 999
    }
    
    // Handle string sorting
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    // Handle date sorting
    if (sortField.value.includes('date') || sortField.value.includes('deadline')) {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }
    
    if (sortDirection.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
})

// Sort function
const sort = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  
  emit('sort', { field, direction: sortDirection.value })
}
</script>