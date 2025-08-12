/**
 * Virtual Scrolling Composable for Large Datasets
 * Performance optimization for DataTable
 */

export interface VirtualScrollConfig {
  itemHeight: number
  containerHeight: number
  buffer: number
  threshold: number
}

export const useVirtualScroll = (
  items: Ref<any[]>,
  config: VirtualScrollConfig
) => {
  const scrollTop = ref(0)
  const containerRef = ref<HTMLElement>()
  
  const mergedConfig: VirtualScrollConfig = {
    itemHeight: config.itemHeight ?? 48,
    containerHeight: config.containerHeight ?? 400,
    buffer: config.buffer ?? 5,
    threshold: config.threshold ?? 1000
  }

  // Calculate visible range
  const visibleRange = computed(() => {
    const { itemHeight, containerHeight, buffer } = mergedConfig
    const itemCount = Math.ceil(containerHeight / itemHeight)
    
    const start = Math.max(0, Math.floor(scrollTop.value / itemHeight) - buffer)
    const end = Math.min(items.value.length, start + itemCount + buffer * 2)
    
    return { start, end }
  })

  // Get visible items
  const visibleItems = computed(() => {
    const { start, end } = visibleRange.value
    return items.value.slice(start, end).map((item, index) => ({
      ...item,
      index: start + index
    }))
  })

  // Calculate total height
  const totalHeight = computed(() => {
    return items.value.length * mergedConfig.itemHeight
  })

  // Calculate offset for visible items
  const offsetY = computed(() => {
    return visibleRange.value.start * mergedConfig.itemHeight
  })

  // Handle scroll
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  // Check if virtual scrolling should be enabled
  const shouldUseVirtualScroll = computed(() => {
    return items.value.length > mergedConfig.threshold
  })

  return {
    containerRef,
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    shouldUseVirtualScroll,
    visibleRange
  }
}
