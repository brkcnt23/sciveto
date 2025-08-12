<template>
  <div class="stock-analytics-dashboard">
    <div class="dashboard-header">
      <h2>📊 Stok Analitik Dashboard</h2>
      <div class="time-range-selector">
        <USelectMenu
          v-model="selectedTimeRange"
          :options="timeRanges"
          @change="refreshAnalytics"
        />
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="metrics-grid">
      <div class="metric-card critical">
        <div class="metric-icon">🚨</div>
        <div class="metric-content">
          <h3>{{ analytics.criticalItems }}</h3>
          <p>Kritik Seviye</p>
          <span class="metric-change" :class="{ negative: analytics.criticalChange > 0 }">
            {{ analytics.criticalChange > 0 ? '+' : '' }}{{ analytics.criticalChange }}
          </span>
        </div>
      </div>

      <div class="metric-card warning">
        <div class="metric-icon">⚠️</div>
        <div class="metric-content">
          <h3>{{ analytics.lowStockItems }}</h3>
          <p>Düşük Stok</p>
          <span class="metric-change" :class="{ negative: analytics.lowStockChange > 0 }">
            {{ analytics.lowStockChange > 0 ? '+' : '' }}{{ analytics.lowStockChange }}
          </span>
        </div>
      </div>

      <div class="metric-card success">
        <div class="metric-icon">💰</div>
        <div class="metric-content">
          <h3>₺{{ formatCurrency(analytics.totalValue) }}</h3>
          <p>Toplam Değer</p>
          <span class="metric-change positive">
            +{{ analytics.valueChange }}%
          </span>
        </div>
      </div>

      <div class="metric-card info">
        <div class="metric-icon">📈</div>
        <div class="metric-content">
          <h3>{{ analytics.turnoverRate }}%</h3>
          <p>Devir Hızı</p>
          <span class="metric-change" :class="{ positive: analytics.turnoverChange > 0 }">
            {{ analytics.turnoverChange > 0 ? '+' : '' }}{{ analytics.turnoverChange }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-grid">
      <!-- Stock Status Distribution -->
      <div class="chart-card">
        <h3>📊 Stok Durum Dağılımı</h3>
        <div class="chart-container">
          <canvas ref="stockStatusChart"></canvas>
        </div>
      </div>

      <!-- ABC Analysis -->
      <div class="chart-card">
        <h3>🎯 ABC Analizi</h3>
        <div class="abc-analysis">
          <div class="abc-category" v-for="category in abcAnalysis" :key="category.label">
            <div class="category-header">
              <span class="category-label">{{ category.label }}</span>
              <span class="category-percentage">{{ category.percentage }}%</span>
            </div>
            <div class="category-bar">
              <div 
                class="bar-fill" 
                :style="{ width: `${category.percentage}%` }"
                :class="category.class"
              ></div>
            </div>
            <div class="category-details">
              <span>{{ category.items }} ürün</span>
              <span>₺{{ formatCurrency(category.value) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stock Movement Trend -->
      <div class="chart-card full-width">
        <h3>📈 Stok Hareket Trendi</h3>
        <div class="chart-container">
          <canvas ref="stockMovementChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Top Performers / Issues -->
    <div class="insights-grid">
      <!-- Top Moving Items -->
      <div class="insight-card">
        <h3>🔥 En Çok Hareket Eden</h3>
        <div class="item-list">
          <div 
            v-for="item in topMovingItems" 
            :key="item.id"
            class="insight-item"
          >
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-category">{{ item.category }}</span>
            </div>
            <div class="item-metric">
              <span class="metric-value">{{ item.movements }}</span>
              <span class="metric-label">hareket</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Reorder Recommendations -->
      <div class="insight-card">
        <h3>📦 Sipariş Önerileri</h3>
        <div class="item-list">
          <div 
            v-for="item in reorderRecommendations" 
            :key="item.id"
            class="insight-item reorder"
          >
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <StockStatusIndicator 
                :current-stock="item.currentStock"
                :target-level="item.targetLevel"
                :show-details="false"
                size="xs"
              />
            </div>
            <div class="item-metric">
              <span class="metric-value">{{ item.recommendedOrder }}</span>
              <span class="metric-label">adet</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Slow Moving Items -->
      <div class="insight-card">
        <h3>🐌 Yavaş Hareket Eden</h3>
        <div class="item-list">
          <div 
            v-for="item in slowMovingItems" 
            :key="item.id"
            class="insight-item slow"
          >
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-category">{{ item.category }}</span>
            </div>
            <div class="item-metric">
              <span class="metric-value">{{ item.daysStagnant }}</span>
              <span class="metric-label">gün</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Predictive Insights -->
    <div class="predictions-panel">
      <h3>🔮 AI Tahminleri</h3>
      <div class="predictions-grid">
        <div class="prediction-card">
          <h4>📅 Gelecek 30 Gün</h4>
          <ul class="prediction-list">
            <li v-for="prediction in predictions.nextMonth" :key="prediction.id">
              <UIcon :name="prediction.icon" :class="prediction.severity" />
              {{ prediction.message }}
            </li>
          </ul>
        </div>
        
        <div class="prediction-card">
          <h4>🎯 Optimizasyon Önerileri</h4>
          <ul class="prediction-list">
            <li v-for="optimization in predictions.optimizations" :key="optimization.id">
              <UIcon name="i-heroicons-light-bulb" class="text-yellow-500" />
              {{ optimization.message }}
              <UBadge :color="getImpactColor(optimization.impact)" size="xs">
                {{ optimization.impact }}
              </UBadge>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  items?: any[]
  timeRange?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  timeRange: '30d'
})

// Composables
const { getStockStatus, performABCAnalysis, forecastDemand } = useStockOptimization()

// Reactive state
const selectedTimeRange = ref(props.timeRange)
const stockStatusChart = ref<HTMLCanvasElement>()
const stockMovementChart = ref<HTMLCanvasElement>()

// Time range options
const timeRanges = [
  { value: '7d', label: 'Son 7 Gün' },
  { value: '30d', label: 'Son 30 Gün' },
  { value: '90d', label: 'Son 3 Ay' },
  { value: '1y', label: 'Son 1 Yıl' }
]

// Analytics data
const analytics = computed(() => {
  const criticalItems = props.items.filter(item => {
    const status = getStockStatus(item.currentStock || 0, item.minStockLevel || 10)
    return status.status === 'critical' || status.status === 'empty'
  }).length

  const lowStockItems = props.items.filter(item => {
    const status = getStockStatus(item.currentStock || 0, item.minStockLevel || 10)
    return status.status === 'low'
  }).length

  const totalValue = props.items.reduce((sum, item) => {
    return sum + ((item.currentStock || 0) * (item.unitPrice || 0))
  }, 0)

  return {
    criticalItems,
    lowStockItems,
    totalValue,
    turnoverRate: 78,
    criticalChange: 2,
    lowStockChange: -1,
    valueChange: 5.2,
    turnoverChange: 3.1
  }
})

// ABC Analysis
const abcAnalysis = computed(() => {
  const items = props.items.map(item => ({
    id: item.id,
    value: item.unitPrice || 0,
    quantity: item.currentStock || 0
  }))

  const analysis = performABCAnalysis(items)
  
  const categories = ['A', 'B', 'C'].map(cat => {
    const categoryItems = analysis.filter(item => item.category === cat)
    const totalValue = categoryItems.reduce((sum, item) => sum + item.totalValue, 0)
    const percentage = (categoryItems.length / analysis.length) * 100

    return {
      label: `${cat} Kategorisi`,
      percentage: Math.round(percentage),
      items: categoryItems.length,
      value: totalValue,
      class: `category-${cat.toLowerCase()}`
    }
  })

  return categories
})

// Top moving items (mock data for now)
const topMovingItems = computed(() => [
  { id: 1, name: 'Mapa Terminal 4mm', category: 'Mapa', movements: 45 },
  { id: 2, name: 'Çelik Levha 2mm', category: 'Levha', movements: 32 },
  { id: 3, name: 'Bakır Kablo 2.5mm', category: 'Kablo', movements: 28 }
])

// Reorder recommendations
const reorderRecommendations = computed(() => {
  return props.items
    .filter(item => {
      const status = getStockStatus(item.currentStock || 0, item.minStockLevel || 10)
      return ['critical', 'low'].includes(status.status)
    })
    .slice(0, 5)
    .map(item => ({
      id: item.id,
      name: item.name,
      currentStock: item.currentStock || 0,
      targetLevel: item.targetLevel || 100,
      recommendedOrder: Math.max(0, (item.targetLevel || 100) - (item.currentStock || 0))
    }))
})

// Helper function to map impact to valid Nuxt UI colors
const getImpactColor = (impact: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    'high': 'error',
    'medium': 'warning', 
    'low': 'info'
  }
  return colorMap[impact] || 'neutral'
}

// Slow moving items (mock data)
const slowMovingItems = computed(() => [
  { id: 1, name: 'Özel Vida M12', category: 'Vida', daysStagnant: 45 },
  { id: 2, name: 'Nadir Conta 50mm', category: 'Conta', daysStagnant: 38 },
  { id: 3, name: 'Eski Model Sigorta', category: 'Sigorta', daysStagnant: 32 }
])

// AI Predictions (mock data for demonstration)
const predictions = computed(() => ({
  nextMonth: [
    {
      id: 1,
      icon: 'i-heroicons-exclamation-triangle',
      severity: 'text-orange-500',
      message: 'Mapa kategorisinde %20 artış bekleniyor'
    },
    {
      id: 2,
      icon: 'i-heroicons-arrow-trending-down',
      severity: 'text-red-500',
      message: '5 ürün kritik seviyeye düşecek'
    },
    {
      id: 3,
      icon: 'i-heroicons-check-circle',
      severity: 'text-green-500',
      message: 'Genel stok seviyesi iyileşiyor'
    }
  ],
  optimizations: [
    {
      id: 1,
      message: 'Sipariş sıklığını 2 haftaya çıkarın',
      impact: 'high'
    },
    {
      id: 2,
      message: 'C kategorisi ürünlerde minimum stok seviyesini düşürün',
      impact: 'medium'
    },
    {
      id: 3,
      message: 'Tedarikçi lead time\'ını optimize edin',
      impact: 'high'
    }
  ]
}))

// Utility functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('tr-TR').format(value)
}

const refreshAnalytics = () => {
  console.log('Refreshing analytics for:', selectedTimeRange.value)
  // TODO: Implement analytics refresh logic
}

// Initialize charts on mount
onMounted(() => {
  nextTick(() => {
    initializeCharts()
  })
})

const initializeCharts = () => {
  // Initialize Chart.js charts
  // This would typically use Chart.js or similar library
  console.log('Initializing analytics charts...')
}
</script>

<style scoped>
.stock-analytics-dashboard {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.dashboard-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.metric-card.critical {
  border-color: #fecaca;
}

.metric-card.warning {
  border-color: #fed7aa;
}

.metric-card.success {
  border-color: #bbf7d0;
}

.metric-card.info {
  border-color: #bfdbfe;
}

.metric-icon {
  font-size: 1.875rem;
}

.metric-content h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.metric-content p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.metric-change {
  font-size: 0.875rem;
  font-weight: 500;
}

.metric-change.positive {
  color: #059669;
}

.metric-change.negative {
  color: #dc2626;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .chart-card.full-width {
    grid-column: 1 / -1;
  }
}

.chart-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-container {
  height: 16rem;
}

.abc-analysis {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.abc-category {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-bar {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.5rem;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease;
}

.bar-fill.category-a {
  background-color: #ef4444;
}

.bar-fill.category-b {
  background-color: #eab308;
}

.bar-fill.category-c {
  background-color: #22c55e;
}

.category-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
}

.insights-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .insights-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.insight-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.insight-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.insight-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.item-info {
  flex: 1;
}

.item-name {
  display: block;
  font-weight: 500;
  color: #1f2937;
}

.item-category {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
}

.item-metric {
  text-align: right;
}

.metric-value {
  display: block;
  font-weight: bold;
  font-size: 1.125rem;
  color: #1f2937;
}

.metric-label {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
}

.predictions-panel {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.predictions-panel h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.predictions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .predictions-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.prediction-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.prediction-card h4 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
}

.prediction-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.prediction-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

/* Dark mode styles would go here */
@media (prefers-color-scheme: dark) {
  .dashboard-header h2,
  .metric-content h3,
  .insight-card h3,
  .predictions-panel h3,
  .item-name,
  .metric-value {
    color: #f9fafb;
  }
  
  .metric-card,
  .chart-card,
  .insight-card,
  .predictions-panel {
    background: #1f2937;
    border-color: #374151;
  }
  
  .insight-item {
    background-color: #374151;
  }
  
  .metric-content p,
  .item-category,
  .metric-label,
  .category-details {
    color: #9ca3af;
  }
}
</style>
