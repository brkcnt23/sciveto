<template>
  <UCard 
    class="stock-count-card cursor-pointer select-none"
    :class="[
      getStatusClass(),
      'transition-all duration-200 hover:shadow-md active:scale-95'
    ]"
    @click="focusInput"
  >
    <div class="space-y-3">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-sm text-gray-900 dark:text-white truncate">
            {{ item.name }}
          </h3>
          <p class="text-xs text-gray-500 mt-1 line-clamp-2">
            {{ item.description }}
          </p>
        </div>
        
        <!-- Status Badge -->
        <UBadge 
          :color="getStatusColor()" 
          variant="soft" 
          size="xs"
          class="ml-2"
        >
          {{ getStatusText() }}
        </UBadge>
      </div>
      
      <!-- Stock Input -->
      <div class="grid grid-cols-2 gap-2">
        <UFormField label="Mevcut" size="xs">
          <UInput
            ref="currentInput"
            v-model.number="currentStock"
            type="number"
            size="sm"
            :placeholder="item.stockInfo?.currentStock?.toString() || '0'"
            @update:model-value="handleCurrentUpdate"
            @focus="$event.target.select()"
            class="text-center font-mono"
          />
        </UFormField>
        
        <UFormField label="Min." size="xs">
          <UInput
            v-model.number="minStock"
            type="number"
            size="sm"
            :placeholder="item.stockInfo?.defaultMinStock?.toString() || '0'"
            @update:model-value="handleMinUpdate"
            @focus="$event.target.select()"
            class="text-center font-mono"
          />
        </UFormField>
      </div>
      
      <!-- Quick Actions -->
      <div class="flex gap-1">
        <UButton 
          size="xs" 
          variant="outline"
          @click.stop="adjustStock(-1)"
          :disabled="currentStock <= 0"
        >
          -1
        </UButton>
        <UButton 
          size="xs" 
          variant="outline"
          @click.stop="adjustStock(-10)"
          :disabled="currentStock <= 0"
        >
          -10
        </UButton>
        <div class="flex-1"></div>
        <UButton 
          size="xs" 
          variant="outline"
          @click.stop="adjustStock(10)"
        >
          +10
        </UButton>
        <UButton 
          size="xs" 
          variant="outline"
          @click.stop="adjustStock(1)"
        >
          +1
        </UButton>
      </div>
      
      <!-- Last Update -->
      <div v-if="lastUpdate" class="text-xs text-gray-400 text-center">
        Son güncelleme: {{ formatDate(lastUpdate) }}
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface StockItem {
  id: string
  name: string
  description?: string
  category: string
  unit: string
  stockInfo?: {
    currentStock?: number
    defaultMinStock?: number
    defaultMaxStock?: number
  }
}

interface Props {
  item: StockItem
  modelValue?: { current: number, min: number }
}

interface Emits {
  (e: 'update', itemId: string, field: 'current' | 'min', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentInput = ref<HTMLInputElement>()
const currentStock = ref(props.modelValue?.current || 0)
const minStock = ref(props.modelValue?.min || props.item.stockInfo?.defaultMinStock || 0)
const lastUpdate = ref<Date | null>(null)

// Watch for external updates
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    currentStock.value = newValue.current
    minStock.value = newValue.min
  }
}, { deep: true })

const stockStatus = computed(() => {
  const current = currentStock.value
  const min = minStock.value
  const max = props.item.stockInfo?.defaultMaxStock || min * 10
  
  if (current <= min) return 'low'
  if (current >= max) return 'high'
  return 'normal'
})

const getStatusClass = () => {
  switch (stockStatus.value) {
    case 'low':
      return 'ring-2 ring-red-200 bg-red-50 dark:bg-red-900/20'
    case 'high':
      return 'ring-2 ring-blue-200 bg-blue-50 dark:bg-blue-900/20'
    default:
      return 'ring-1 ring-gray-200 dark:ring-gray-700'
  }
}

const getStatusColor = () => {
  switch (stockStatus.value) {
    case 'low':
      return 'red'
    case 'high':
      return 'blue'
    default:
      return 'green'
  }
}

const getStatusText = () => {
  switch (stockStatus.value) {
    case 'low':
      return 'Az'
    case 'high':
      return 'Fazla'
    default:
      return 'Normal'
  }
}

const handleCurrentUpdate = (value: number) => {
  lastUpdate.value = new Date()
  emit('update', props.item.id, 'current', value)
}

const handleMinUpdate = (value: number) => {
  lastUpdate.value = new Date()
  emit('update', props.item.id, 'min', value)
}

const adjustStock = (amount: number) => {
  const newValue = Math.max(0, currentStock.value + amount)
  currentStock.value = newValue
  handleCurrentUpdate(newValue)
}

const focusInput = () => {
  nextTick(() => {
    currentInput.value?.focus()
    currentInput.value?.select()
  })
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.stock-count-card {
  touch-action: manipulation;
  user-select: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
