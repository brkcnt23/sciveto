/**
 * Real-time Stock Updates Composable
 * WebSocket-based live data updates for Sciveto
 */

export interface StockUpdate {
  id: string
  field: string
  oldValue: any
  newValue: any
  timestamp: Date
  userId?: string
}

export interface WebSocketConfig {
  url: string
  reconnectInterval: number
  maxReconnectAttempts: number
  heartbeatInterval: number
}

export const useRealTimeStock = (config?: Partial<WebSocketConfig>) => {
  const socket = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const reconnectAttempts = ref(0)
  const lastHeartbeat = ref<Date | null>(null)
  
  const defaultConfig: WebSocketConfig = {
    url: 'ws://localhost:3001/stock-updates',
    reconnectInterval: 5000,
    maxReconnectAttempts: 5,
    heartbeatInterval: 30000,
    ...config
  }

  // Stock updates queue
  const pendingUpdates = ref<StockUpdate[]>([])
  const processedUpdates = ref<StockUpdate[]>([])

  // Event handlers
  const updateHandlers = new Map<string, Function[]>()

  const connect = () => {
    try {
      socket.value = new WebSocket(defaultConfig.url)
      
      socket.value.onopen = () => {
        isConnected.value = true
        reconnectAttempts.value = 0
        console.log('🔗 Real-time stock updates connected')
        
        // Start heartbeat
        startHeartbeat()
        
        // Send authentication if available
        const authStore = useAuthStore()
        if (authStore.token) {
          send({
            type: 'auth',
            token: authStore.token
          })
        }
      }

      socket.value.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          handleMessage(data)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      socket.value.onclose = () => {
        isConnected.value = false
        console.log('🔌 Real-time connection closed')
        
        // Attempt reconnection
        if (reconnectAttempts.value < defaultConfig.maxReconnectAttempts) {
          setTimeout(() => {
            reconnectAttempts.value++
            console.log(`🔄 Reconnecting... (${reconnectAttempts.value}/${defaultConfig.maxReconnectAttempts})`)
            connect()
          }, defaultConfig.reconnectInterval)
        }
      }

      socket.value.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
    }
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value.close()
      socket.value = null
    }
    isConnected.value = false
  }

  const send = (data: any) => {
    if (socket.value && isConnected.value) {
      socket.value.send(JSON.stringify(data))
    }
  }

  const handleMessage = (data: any) => {
    switch (data.type) {
      case 'stock_update':
        handleStockUpdate(data.payload)
        break
      case 'bulk_update':
        handleBulkUpdate(data.payload)
        break
      case 'user_action':
        handleUserAction(data.payload)
        break
      case 'heartbeat':
        lastHeartbeat.value = new Date()
        break
      default:
        console.log('Unknown message type:', data.type)
    }
  }

  const handleStockUpdate = (update: StockUpdate) => {
    // Add to pending updates
    pendingUpdates.value.push(update)
    
    // Trigger handlers
    const handlers = updateHandlers.get('stock_update') || []
    handlers.forEach(handler => handler(update))
    
    // Show toast notification for critical updates
    if (isCriticalUpdate(update)) {
      showCriticalAlert(update)
    }
  }

  const handleBulkUpdate = (updates: StockUpdate[]) => {
    updates.forEach(update => handleStockUpdate(update))
  }

  const handleUserAction = (action: any) => {
    // Handle real-time user actions (like someone else editing same item)
    const handlers = updateHandlers.get('user_action') || []
    handlers.forEach(handler => handler(action))
  }

  const isCriticalUpdate = (update: StockUpdate): boolean => {
    // Check if update is critical (stock levels, important changes)
    return update.field === 'currentStock' && Number(update.newValue) <= 10
  }

  const showCriticalAlert = (update: StockUpdate) => {
    // Show toast notification for critical stock updates
    const toast = useToast()
    toast.add({
      title: '🚨 Critical Stock Alert',
      description: `Stock critically low: ${update.newValue}`,
      color: 'error',
      actions: [{
        label: 'View Item',
        onClick: () => {
          // Navigate to item
          navigateTo(`/items/${update.id}`)
        }
      }]
    })
  }

  const startHeartbeat = () => {
    setInterval(() => {
      if (isConnected.value) {
        send({ type: 'heartbeat', timestamp: new Date().toISOString() })
      }
    }, defaultConfig.heartbeatInterval)
  }

  // Subscribe to specific events
  const on = (event: string, handler: Function) => {
    if (!updateHandlers.has(event)) {
      updateHandlers.set(event, [])
    }
    updateHandlers.get(event)!.push(handler)
  }

  // Unsubscribe from events
  const off = (event: string, handler: Function) => {
    const handlers = updateHandlers.get(event)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  // Process pending updates (apply to local state)
  const processPendingUpdates = () => {
    const updates = pendingUpdates.value.splice(0)
    processedUpdates.value.push(...updates)
    return updates
  }

  // Manual stock update
  const updateStock = (itemId: string, field: string, newValue: any) => {
    send({
      type: 'update_stock',
      payload: {
        id: itemId,
        field,
        newValue,
        timestamp: new Date().toISOString()
      }
    })
  }

  // Optimistic updates (update local state immediately, sync later)
  const optimisticUpdate = (itemId: string, updates: Record<string, any>) => {
    // Apply update locally first
    const updateEvent = {
      id: itemId,
      updates,
      timestamp: new Date(),
      optimistic: true
    }
    
    // Trigger local handlers
    const handlers = updateHandlers.get('optimistic_update') || []
    handlers.forEach(handler => handler(updateEvent))
    
    // Send to server
    send({
      type: 'optimistic_update',
      payload: updateEvent
    })
  }

  // Auto-connect on mount
  onMounted(() => {
    connect()
  })

  // Disconnect on unmount
  onUnmounted(() => {
    disconnect()
  })

  return {
    // Connection state
    isConnected: readonly(isConnected),
    reconnectAttempts: readonly(reconnectAttempts),
    lastHeartbeat: readonly(lastHeartbeat),
    
    // Updates
    pendingUpdates: readonly(pendingUpdates),
    processedUpdates: readonly(processedUpdates),
    
    // Methods
    connect,
    disconnect,
    send,
    on,
    off,
    processPendingUpdates,
    updateStock,
    optimisticUpdate
  }
}
