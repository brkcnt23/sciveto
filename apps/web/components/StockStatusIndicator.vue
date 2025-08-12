<template>
  <div class="stock-status-indicator" :class="stockStatusClass">
    <div class="stock-info">
      <UIcon 
        :name="stockIcon" 
        :class="['status-icon', stockColorClass]"
        :size="size"
      />
      <div class="stock-details" v-if="showDetails">
        <span class="stock-level">{{ stockLevel.percentage }}%</span>
        <span class="stock-text">{{ currentStock }} / {{ targetLevel }}</span>
        <span class="days-remaining" v-if="stockLevel.daysRemaining < 30">
          {{ stockLevel.daysRemaining }} gün kaldı
        </span>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="stock-progress" v-if="showProgress">
      <div 
        class="progress-fill" 
        :class="stockColorClass"
        :style="{ width: `${Math.min(stockLevel.percentage, 100)}%` }"
      ></div>
    </div>
    
    <!-- Recommendation Tooltip -->
    <UTooltip 
      :text="stockLevel.recommendation"
      :prevent-default="false"
    >
      <UIcon 
        name="i-heroicons-information-circle" 
        class="info-icon"
        size="xs"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentStock: number
  targetLevel?: number
  minLevel?: number
  maxLevel?: number
  showDetails?: boolean
  showProgress?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  config?: Partial<import('~/composables/useStockOptimization').StockOptimizationConfig>
}

const props = withDefaults(defineProps<Props>(), {
  targetLevel: 100,
  minLevel: 10,
  maxLevel: 200,
  showDetails: true,
  showProgress: true,
  size: 'sm'
})

const { getStockStatus, getStockColor, getStockIcon } = useStockOptimization()

// Calculate stock status
const stockLevel = computed(() => {
  return getStockStatus(props.currentStock, props.minLevel, {
    criticalLevel: props.minLevel,
    targetLevel: props.targetLevel,
    maxLevel: props.maxLevel,
    ...props.config
  })
})

// Get stock color and icon
const stockColor = computed(() => getStockColor(stockLevel.value.status))
const stockIcon = computed(() => getStockIcon(stockLevel.value.status))

// CSS classes
const stockColorClass = computed(() => `text-${stockColor.value}-500`)
const stockStatusClass = computed(() => [
  'stock-status',
  `status-${stockLevel.value.status}`,
  `severity-${stockLevel.value.severity}`
])
</script>

<style scoped>
.stock-status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid;
}

.stock-status.status-empty {
  background: #fef2f2;
  border-color: #fecaca;
}

@media (prefers-color-scheme: dark) {
  .stock-status.status-empty {
    background: rgba(185, 28, 28, 0.2);
    border-color: #991b1b;
  }
}

.stock-status.status-critical {
  background: #fff7ed;
  border-color: #fed7aa;
}

@media (prefers-color-scheme: dark) {
  .stock-status.status-critical {
    background: rgba(194, 65, 12, 0.2);
    border-color: #c2410c;
  }
}

.stock-status.status-low {
  background: #fefce8;
  border-color: #fde047;
}

@media (prefers-color-scheme: dark) {
  .stock-status.status-low {
    background: rgba(161, 98, 7, 0.2);
    border-color: #a16207;
  }
}

.stock-status.status-sufficient {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

@media (prefers-color-scheme: dark) {
  .stock-status.status-sufficient {
    background: rgba(22, 101, 52, 0.2);
    border-color: #166534;
  }
}

.stock-status.status-overstocked {
  background: #eff6ff;
  border-color: #bfdbfe;
}

@media (prefers-color-scheme: dark) {
  .stock-status.status-overstocked {
    background: rgba(29, 78, 216, 0.2);
    border-color: #1d4ed8;
  }
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.stock-details {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
}

.stock-level {
  font-weight: 600;
}

.stock-text {
  color: #6b7280;
}

@media (prefers-color-scheme: dark) {
  .stock-text {
    color: #9ca3af;
  }
}

.days-remaining {
  color: #ea580c;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .days-remaining {
    color: #fb923c;
  }
}

.stock-progress {
  width: 100%;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  .stock-progress {
    background: #374151;
  }
}

.progress-fill {
  height: 100%;
  transition: all 0.3s ease-in-out;
}

.info-icon {
  color: #9ca3af;
  cursor: help;
}

.info-icon:hover {
  color: #6b7280;
}

@media (prefers-color-scheme: dark) {
  .info-icon {
    color: #6b7280;
  }
  
  .info-icon:hover {
    color: #d1d5db;
  }
}

/* Severity-based animations */
.severity-4, .severity-5 {
  animation: pulse-warning 2s infinite;
}

@keyframes pulse-warning {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>
