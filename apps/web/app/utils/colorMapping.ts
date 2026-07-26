// utils/colorMapping.ts - Nuxt UI v3 Color Mapping
export const colorMapping = {
  // Old colors to new colors mapping
  gray: 'neutral',
  red: 'error',
  green: 'success',
  blue: 'info',
  yellow: 'warning',
  orange: 'warning',
  purple: 'primary',
  white: 'neutral',
} as const

export function mapColor(color: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' {
  return (colorMapping as any)[color] || 'primary'
}

export function getStatusColor(status: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'active':
    case 'success':
    case 'high':
      return 'success'
    case 'pending':
    case 'medium':
    case 'warning':
      return 'warning'
    case 'cancelled':
    case 'inactive':
    case 'error':
    case 'low':
      return 'error'
    case 'draft':
    case 'neutral':
      return 'neutral'
    default:
      return 'primary'
  }
}

export function getPriorityColor(priority: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' {
  switch (priority?.toLowerCase()) {
    case 'high':
    case 'urgent':
      return 'error'
    case 'medium':
      return 'warning'
    case 'low':
      return 'success'
    default:
      return 'primary'
  }
}

export function getCategoryColor(category: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' {
  const hash = category.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  const colors: Array<'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = [
    'primary', 'secondary', 'success', 'info', 'warning', 'neutral'
  ]
  
  return colors[Math.abs(hash) % colors.length]
}
