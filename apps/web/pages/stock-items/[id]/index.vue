<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/stock-items" class="text-neutral-500 hover:text-neutral-700">
              <Icon name="i-heroicons-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <h1 class="text-xl font-semibold text-neutral-900">Stock Item Details</h1>
          </div>
          
          <div class="flex space-x-3">
            <UButton 
              :to="`/stock-items/${route.params.id}/edit`"
              icon="i-heroicons-pencil"
              color="info"
              variant="outline"
            >
              Edit
            </UButton>
            
            <UButton 
              icon="i-heroicons-trash"
              color="error"
              variant="outline"
              @click="showDeleteModal = true"
            >
              Delete
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <USkeleton class="h-96" />
        <USkeleton class="h-96" />
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="stockItem" class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Image Section -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-neutral-100">
            <img 
              v-if="stockItem.imageUrl"
              :src="stockItem.imageUrl" 
              :alt="stockItem.name"
              class="w-full h-96 object-cover"
            />
            <div v-else class="w-full h-96 bg-neutral-100 flex items-center justify-center">
              <Icon name="i-heroicons-cube" class="w-24 h-24 text-neutral-400" />
            </div>
          </div>

          <!-- Additional Images Grid -->
          <div class="grid grid-cols-4 gap-2">
            <div v-for="n in 4" :key="n" class="aspect-w-1 aspect-h-1">
              <div class="w-full h-20 bg-neutral-100 rounded border"></div>
            </div>
          </div>
        </div>

        <!-- Info Section -->
        <div class="space-y-6">
          <!-- Basic Info -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h1 class="text-3xl font-bold text-neutral-900">{{ stockItem.name }}</h1>
              <UBadge 
                :color="getStatusColor(stockItem.status)"
                size="lg"
              >
                {{ stockItem.status }}
              </UBadge>
            </div>

            <p v-if="stockItem.description" class="text-neutral-600 text-lg leading-relaxed">
              {{ stockItem.description }}
            </p>
          </div>

          <!-- Price & Stock -->
          <UCard>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-500">Price</label>
                <p class="text-2xl font-bold text-neutral-900">
                  {{ stockItem.price ? `$${stockItem.price.toFixed(2)}` : 'Not set' }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500">Stock</label>
                <p class="text-2xl font-bold" :class="stockColorClass">
                  {{ stockItem.stock }} units
                </p>
              </div>
            </div>
          </UCard>

          <!-- Stock Item Details -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-neutral-900">Stock Item Details</h3>
            </template>
            
            <div class="space-y-4">
              <div v-if="stockItem.sku" class="flex justify-between py-2 border-b">
                <span class="font-medium text-neutral-500">SKU</span>
                <span class="text-neutral-900">{{ stockItem.sku }}</span>
              </div>
              
              <div v-if="stockItem.category" class="flex justify-between py-2 border-b">
                <span class="font-medium text-neutral-500">Category</span>
                <UBadge variant="soft">{{ stockItem.category.name }}</UBadge>
              </div>
              
              <div class="flex justify-between py-2 border-b">
                <span class="font-medium text-neutral-500">Created</span>
                <span class="text-neutral-900">{{ formatDate(stockItem.createdAt) }}</span>
              </div>
              
              <div class="flex justify-between py-2">
                <span class="font-medium text-neutral-500">Last Updated</span>
                <span class="text-neutral-900">{{ formatDate(stockItem.updatedAt) }}</span>
              </div>
            </div>
          </UCard>

          <!-- Actions -->
          <div class="flex space-x-3">
            <UButton 
              :to="`/stock-items/${stockItem.id}/edit`"
              icon="i-heroicons-pencil"
              color="info"
              block
            >
              Edit Stock Item
            </UButton>
            
            <UButton 
              icon="i-heroicons-arrow-path"
              color="success"
              variant="outline"
              @click="showAdjustModal = true"
            >
              Adjust Stock
            </UButton>
          </div>
        </div>
      </div>

      <!-- Related Items -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">Related Items</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard 
            v-for="item in relatedItems" 
            :key="item.id"
            class="hover:shadow-lg transition-shadow cursor-pointer"
            @click="$router.push(`/stock-items/${item.id}`)"
          >
            <div class="aspect-w-1 aspect-h-1 mb-4">
              <img 
                v-if="item.imageUrl"
                :src="item.imageUrl" 
                :alt="item.name"
                class="w-full h-32 object-cover rounded-lg"
              />
              <div v-else class="w-full h-32 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Icon name="i-heroicons-cube" class="w-8 h-8 text-neutral-400" />
              </div>
            </div>
            
            <h3 class="font-semibold text-neutral-900 mb-2">{{ item.name }}</h3>
            <p class="text-sm text-neutral-600">{{ item.price ? `$${item.price.toFixed(2)}` : 'No price' }}</p>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <EmptyState
        icon="i-heroicons-exclamation-triangle"
        title="Stock Item Not Found"
        description="The stock item you're looking for doesn't exist or has been removed."
        action-text="Go Back"
        action-link="/stock-items"
        action-icon="i-heroicons-arrow-left"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
            </div>
            <h3 class="text-lg font-semibold text-red-900">Delete Stock Item</h3>
          </div>
        </template>

        <div class="space-y-4">
          <p>Are you sure you want to delete <strong>{{ stockItem?.name }}</strong>? This action cannot be undone.</p>
          <UAlert
            color="error"
            variant="soft"
            title="Warning"
            description="All associated data will be permanently removed."
          />
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showDeleteModal = false">
              Cancel
            </UButton>
            <UButton color="error" :loading="deleting" @click="confirmDelete">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Stock Adjustment Modal -->
    <UModal v-model="showAdjustModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Adjust Stock</h3>
        </template>

        <div class="space-y-4">
          <div class="bg-neutral-50 p-4 rounded-lg">
            <p class="text-sm text-neutral-600">Current Stock</p>
            <p class="text-2xl font-bold text-neutral-900">{{ stockItem?.stock }} units</p>
          </div>
          
          <UFormGroup label="New Stock Quantity" required>
            <UInput
              v-model.number="adjustStock.newStock"
              type="number"
              min="0"
              placeholder="Enter new stock quantity"
            />
          </UFormGroup>
          
          <UFormGroup label="Reason for Adjustment">
            <UTextarea
              v-model="adjustStock.reason"
              placeholder="Enter reason for stock adjustment"
              :rows="3"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showAdjustModal = false">
              Cancel
            </UButton>
            <UButton color="success" :loading="adjusting" @click="confirmAdjustStock">
              Adjust Stock
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const route = useRoute()

// Data
const loading = ref(false)
const deleting = ref(false)
const adjusting = ref(false)
const showDeleteModal = ref(false)
const showAdjustModal = ref(false)
const stockItem = ref(null)
const relatedItems = ref([])

const adjustStock = reactive({
  newStock: 0,
  reason: ''
})

// Computed
const stockColorClass = computed(() => {
  if (!stockItem.value) return ''
  
  const stock = stockItem.value.stock
  if (stock === 0) return 'text-red-600'
  if (stock < 10) return 'text-yellow-600'
  return 'text-green-600'
})

// Methods
const fetchStockItem = async () => {
  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock stock item data
    stockItem.value = {
      id: parseInt(route.params.id),
      name: 'Wireless Headphones',
      sku: 'WH-001',
      description: 'High-quality wireless headphones with advanced noise cancellation technology. Perfect for work, travel, or leisure listening.',
      price: 199.99,
      stock: 25,
      status: 'active',
      category: { id: 1, name: 'Electronics' },
      imageUrl: null,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-06-20')
    }
    
    // Initialize adjust stock with current value
    adjustStock.newStock = stockItem.value.stock
    
    // Fetch related items
    await fetchRelatedItems()
    
  } catch (error) {
    console.error('Error fetching stock item:', error)
  } finally {
    loading.value = false
  }
}

const fetchRelatedItems = async () => {
  try {
    // Mock related items
    relatedItems.value = [
      { id: 2, name: 'Wireless Mouse', price: 49.99, imageUrl: null },
      { id: 3, name: 'USB Cable', price: 24.99, imageUrl: null },
      { id: 4, name: 'Bluetooth Speaker', price: 79.99, imageUrl: null },
      { id: 5, name: 'Phone Charger', price: 29.99, imageUrl: null }
    ]
  } catch (error) {
    console.error('Error fetching related items:', error)
  }
}

const getStatusColor = (status) => {
  const colors = {
    active: 'green',
    inactive: 'neutral',
    out_of_stock: 'red'
  }
  return colors[status] || 'neutral'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const confirmDelete = async () => {
  deleting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Navigate back to stock items list
    await navigateTo('/stock-items')
    
  } catch (error) {
    console.error('Error deleting stock item:', error)
  } finally {
    deleting.value = false
  }
}

const confirmAdjustStock = async () => {
  adjusting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update local stock value
    stockItem.value.stock = adjustStock.newStock
    
    // Reset form and close modal
    adjustStock.reason = ''
    showAdjustModal.value = false
    
  } catch (error) {
    console.error('Error adjusting stock:', error)
  } finally {
    adjusting.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchStockItem()
})
</script>