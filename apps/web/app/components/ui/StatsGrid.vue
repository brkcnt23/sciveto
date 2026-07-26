<!-- components/ui/StatsGrid.vue -->
<template>
  <div class="stats-grid">
    <div
      v-for="(stat, index) in statistics"
      :key="index"
      class="stat-card"
      :class="stat.variant || 'primary'"
    >
      <div class="stat-icon">
        <UIcon :name="stat.icon" size="20" />
      </div>
      <div class="stat-content">
        <h3>{{ formatValue(stat.value, stat.format) }}</h3>
        <p>{{ stat.label }}</p>
        <small v-if="stat.description">{{ stat.description }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StatItem {
  label: string
  value: number | string
  icon: string
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'error'
  description?: string
  format?: 'number' | 'currency' | 'percentage' | 'text'
}

interface Props {
  statistics: StatItem[]
}

defineProps<Props>()

const formatValue = (value: number | string, format?: string): string => {
  if (typeof value === 'string') return value
  
  switch (format) {
    case 'currency':
      return value.toLocaleString('tr-TR') + ' ₺'
    case 'percentage':
      return value + '%'
    case 'number':
      return value.toLocaleString('tr-TR')
    default:
      return String(value)
  }
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-card.primary {
  border-left: 4px solid #3b82f6;
}

.stat-card.success {
  border-left: 4px solid #10b981;
}

.stat-card.warning {
  border-left: 4px solid #f59e0b;
}

.stat-card.info {
  border-left: 4px solid #06b6d4;
}

.stat-card.error {
  border-left: 4px solid #ef4444;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-card.primary .stat-icon {
  background: #eff6ff;
  color: #3b82f6;
}

.stat-card.success .stat-icon {
  background: #f0fdf4;
  color: #10b981;
}

.stat-card.warning .stat-icon {
  background: #fffbeb;
  color: #f59e0b;
}

.stat-card.info .stat-icon {
  background: #f0f9ff;
  color: #06b6d4;
}

.stat-card.error .stat-icon {
  background: #fef2f2;
  color: #ef4444;
}

.stat-content h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.stat-content p {
  color: #64748b;
  margin: 0 0 0.125rem 0;
  font-weight: 500;
  font-size: 0.875rem;
}

.stat-content small {
  color: #94a3b8;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1.25rem;
  }
  
  .stat-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .stat-content h3 {
    font-size: 1.5rem;
  }
}
</style>
