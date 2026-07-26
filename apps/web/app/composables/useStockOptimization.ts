/**
 * Advanced Stock Optimization Composable
 * Inspired by AG_Stock's algorithms but modernized for Sciveto
 */

export interface StockLevel {
  status: 'empty' | 'critical' | 'low' | 'sufficient' | 'overstocked'
  percentage: number
  daysRemaining: number
  recommendation: string
  severity: 1 | 2 | 3 | 4 | 5
}

export interface StockOptimizationConfig {
  criticalLevel: number
  lowLevel: number
  targetLevel: number
  maxLevel: number
  leadTimeDays: number
  safetyStockDays: number
}

export const useStockOptimization = () => {
  // Default configuration
  const defaultConfig: StockOptimizationConfig = {
    criticalLevel: 10,
    lowLevel: 20,
    targetLevel: 100,
    maxLevel: 200,
    leadTimeDays: 7,
    safetyStockDays: 3
  }

  /**
   * Calculate stock status with advanced logic
   */
  const getStockStatus = (
    currentStock: number,
    minLevel: number = defaultConfig.criticalLevel,
    config: Partial<StockOptimizationConfig> = {}
  ): StockLevel => {
    const cfg = { ...defaultConfig, ...config }
    
    // Calculate percentage relative to target
    const percentage = Math.round((currentStock / cfg.targetLevel) * 100)
    
    // Determine status
    let status: StockLevel['status']
    let severity: StockLevel['severity']
    let recommendation: string
    
    if (currentStock <= 0) {
      status = 'empty'
      severity = 5
      recommendation = '🚨 Immediate restock required! Production may stop.'
    } else if (currentStock <= cfg.criticalLevel) {
      status = 'critical'
      severity = 4
      recommendation = '⚠️ Critical level! Order immediately.'
    } else if (currentStock <= cfg.lowLevel) {
      status = 'low'
      severity = 3
      recommendation = '📦 Low stock. Plan reorder soon.'
    } else if (currentStock > cfg.maxLevel) {
      status = 'overstocked'
      severity = 2
      recommendation = '📊 Overstocked. Consider reducing orders.'
    } else {
      status = 'sufficient'
      severity = 1
      recommendation = '✅ Stock levels are healthy.'
    }
    
    // Calculate days remaining (basic consumption rate)
    const dailyConsumption = calculateDailyConsumption(currentStock, cfg.targetLevel)
    const daysRemaining = dailyConsumption > 0 ? Math.round(currentStock / dailyConsumption) : 999
    
    return {
      status,
      percentage,
      daysRemaining,
      recommendation,
      severity
    }
  }

  /**
   * Calculate optimal reorder point
   */
  const calculateReorderPoint = (
    averageDailyUsage: number,
    leadTimeDays: number = defaultConfig.leadTimeDays,
    safetyStockDays: number = defaultConfig.safetyStockDays
  ): number => {
    const leadTimeStock = averageDailyUsage * leadTimeDays
    const safetyStock = averageDailyUsage * safetyStockDays
    return Math.ceil(leadTimeStock + safetyStock)
  }

  /**
   * Economic Order Quantity (EOQ) calculation
   */
  const calculateEOQ = (
    annualDemand: number,
    orderingCost: number,
    holdingCostPerUnit: number
  ): number => {
    return Math.ceil(Math.sqrt((2 * annualDemand * orderingCost) / holdingCostPerUnit))
  }

  /**
   * ABC Analysis for inventory categorization
   */
  const performABCAnalysis = (items: Array<{ id: string; value: number; quantity: number }>) => {
    const totalValue = items.reduce((sum, item) => sum + (item.value * item.quantity), 0)
    
    const sortedItems = items
      .map(item => ({
        ...item,
        totalValue: item.value * item.quantity,
        percentage: ((item.value * item.quantity) / totalValue) * 100
      }))
      .sort((a, b) => b.totalValue - a.totalValue)
    
    let cumulativePercentage = 0
    return sortedItems.map(item => {
      cumulativePercentage += item.percentage
      let category: 'A' | 'B' | 'C'
      
      if (cumulativePercentage <= 80) category = 'A'
      else if (cumulativePercentage <= 95) category = 'B'
      else category = 'C'
      
      return { ...item, category, cumulativePercentage }
    })
  }

  /**
   * Demand forecasting using simple moving average
   */
  const forecastDemand = (historicalData: number[], periods: number = 3): number => {
    if (historicalData.length < periods) return 0
    
    const recentData = historicalData.slice(-periods)
    const average = recentData.reduce((sum, val) => sum + val, 0) / periods
    
    // Apply trend analysis
    const trend = calculateTrend(historicalData)
    return Math.max(0, Math.round(average * (1 + trend)))
  }

  /**
   * Calculate consumption trend
   */
  const calculateTrend = (data: number[]): number => {
    if (data.length < 2) return 0
    
    const n = data.length
    const x = Array.from({ length: n }, (_, i) => i + 1)
    const y = data
    
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0)
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    return slope / (sumY / n) // Normalize by average
  }

  /**
   * Get stock level color for UI
   */
  const getStockColor = (status: StockLevel['status']): string => {
    switch (status) {
      case 'empty': return 'red'
      case 'critical': return 'orange'
      case 'low': return 'yellow'
      case 'sufficient': return 'green'
      case 'overstocked': return 'blue'
      default: return 'gray'
    }
  }

  /**
   * Get stock level icon
   */
  const getStockIcon = (status: StockLevel['status']): string => {
    switch (status) {
      case 'empty': return 'i-heroicons-x-circle'
      case 'critical': return 'i-heroicons-exclamation-triangle'
      case 'low': return 'i-heroicons-exclamation-circle'
      case 'sufficient': return 'i-heroicons-check-circle'
      case 'overstocked': return 'i-heroicons-arrow-trending-up'
      default: return 'i-heroicons-question-mark-circle'
    }
  }

  /**
   * Calculate daily consumption rate (helper)
   */
  const calculateDailyConsumption = (currentStock: number, targetLevel: number): number => {
    // Simple heuristic: assume 30-day consumption cycle
    return targetLevel / 30
  }

  /**
   * Generate stock alerts
   */
  const generateStockAlerts = (items: Array<{ id: string; name: string; currentStock: number; minLevel: number }>) => {
    return items
      .map(item => ({
        ...item,
        stockLevel: getStockStatus(item.currentStock, item.minLevel)
      }))
      .filter(item => ['empty', 'critical', 'low'].includes(item.stockLevel.status))
      .sort((a, b) => b.stockLevel.severity - a.stockLevel.severity)
  }

  return {
    getStockStatus,
    calculateReorderPoint,
    calculateEOQ,
    performABCAnalysis,
    forecastDemand,
    calculateTrend,
    getStockColor,
    getStockIcon,
    generateStockAlerts,
    defaultConfig
  }
}
