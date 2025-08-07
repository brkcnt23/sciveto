<template>
  <div class="w-full">
    <UTable
      :rows="rows"
      :columns="columns as any"
      :loading="loading"
      @select="handleSelect"
      class="w-full"
    >
      <!-- Dynamic slots for custom column rendering -->
      <template v-for="column in columns" :key="column.key" #[`${column.key}-data`]="{ row }">
        <slot :name="`${column.key}-data`" :row="row">
          <!-- Default rendering based on column type -->
          <div v-if="column.key === 'currentStock'" class="flex items-center gap-2">
            <span class="font-medium">{{ (row as any).currentStock || 0 }}</span>
            <UBadge
              :color="((row as any).currentStock || 0) <= ((row as any).minStock || 0) ? 'error' : 'success'"
              variant="soft"
              size="xs"
            >
              {{ ((row as any).currentStock || 0) <= ((row as any).minStock || 0) ? 'Düşük' : 'Normal' }}
            </UBadge>
          </div>
          
          <div v-else-if="column.key === 'value'" class="font-medium text-neutral-900 dark:text-white">
            {{ formatCurrency((row as any).value || 0) }}
          </div>
          
          <div v-else-if="column.key === 'standards'" class="flex flex-wrap gap-1">
            <div v-if="(row as any).standards && Object.keys((row as any).standards).length > 0">
              <UBadge 
                v-for="(value, key) in (row as any).standards" 
                :key="key"
                variant="outline"
                size="xs"
                class="mr-1"
              >
                {{ key }}: {{ value }}
              </UBadge>
            </div>
            <span v-else class="text-gray-400 text-sm">-</span>
          </div>
          
          <div v-else-if="column.key === 'templateFields'">
            <div v-if="(row as any).templateFields && Object.keys((row as any).templateFields).length > 0" class="space-y-1">
              <div v-for="(value, key) in (row as any).templateFields" :key="key" class="text-sm">
                <span class="font-medium">{{ key }}:</span> {{ value }}
              </div>
            </div>
            <span v-else class="text-gray-400 text-sm">-</span>
          </div>
          
          <!-- Default text rendering -->
          <span v-else>{{ (row as any)[column.key] }}</span>
        </slot>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
interface TableColumn {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  rows: any[]
  columns: TableColumn[]
  loading?: boolean
}

interface Emits {
  (e: 'select', row: any): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSelect = (row: any) => {
  emit('select', row)
}

// Currency formatting utility
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(value)
}
</script>
