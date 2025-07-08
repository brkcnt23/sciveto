<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/stockItems" class="text-gray-500 hover:text-gray-700">
              <Icon name="i-heroicons-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <h1 class="text-xl font-semibold text-gray-900">Stock Item Details</h1>
          </div>
          
          <div v-if="stockItem && isOwner" class="flex space-x-3">
            <UButton
              variant="outline"
              icon="i-heroicons-pencil"
              :to="`/stock-items/${stockItem.id}/edit`"
            >
              Edit
            </UButton>
            <UButton
              variant="outline"
              icon="i-heroicons-trash"
              color="red"
              @click="confirmDelete"
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

    <!-- Stock Item Not Found -->
    <div v-else-if="!stockItem" class="mx-auto max-w-7xl px-6 lg:px-8 py-16 text-center">
      <Icon name="i-heroicons-exclamation-triangle" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Stock Item not found</h3>
      <p class="text-gray-500 mb-4">The stock item you're looking for doesn't exist.</p>
      <UButton to="/stock-items">Back to Stock Items</UButton>
    </div>

    <!-- Main Content -->
    <div v-else class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Image Section -->
        <div class="space-y-4">
          <div class="aspect-w-1 aspect-h-1">
            <img 
              :src="stockItem.imageUrl || '/placeholder-stock-item.jpg'"
              :alt="stockItem.name"
              class="w-full h-96 object-cover rounded-lg bg-gray-100 border"
            />
          </div>
          
          <!-- Image Gallery Placeholder -->
          <div class="grid grid-cols-4 gap-2">
            <div v-for="n in 4" :key="n" class="aspect-w-1 aspect-h-1">
              <div class="w-full h-20 bg-gray-100 rounded border"></div>
            </div>
          </div>
        </div>

        <!-- stockITem Info -->
        <div class="space-y-6">
          <!-- Basic Info -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h1 class="text-3xl font-bold text-gray-900">{{ stockItem.name }}</h1>
              <UBadge 
                :color="getStatusColor(stockItem.status)"
                size="lg"
              >
                {{ stockItem.status }}
              </UBadge>
            </div>

            <p v-if="stockItem.description" class="text-gray-600 text-lg leading-relaxed">
              {{ stockItem.description }}
            </p>
          </div>

          <!-- Price & Stock -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Price</label>
                <p class="text-2xl font-bold text-gray-900">
                  {{ stockItem.price ? `$${stockItem.price.toFixed(2)}` : 'Not set' }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Stock</label>
                <p class="text-2xl font-bold" :class="stockColorClass">
                  {{ stockItem.stock }} units
                </p>
              </div>
            </div>
          </div>

          <!-- Stok Item Details -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900">Stock Item Details</h3>
            
            <div class="grid grid-cols-1 gap-4">
              <div v-if="stockItem.sku" class="flex justify-between py-2 border-b">
                <span class="font-medium text-gray-500">SKU</span>
                <span class="text-gray-900">{{ stockItem.sku }}</span>
              </div>
              
              <div v-if="stockItem.category" class="flex justify-between py-2 border-b">
                <span class="font-medium text-gray-500">Category</span>
                <UBadge variant="soft">{{ stockItem.category.name }}</UBadge>
              </div>
              
              <div class="flex justify-between py-2 border-b">
                <span class="font-medium text-gray-500">Created</span>
                <span class="text-gray-900">{{ formatDate(stockItem.createdAt) }}</span>
              </div>
              
              <div class="flex justify-between py-2 border-b">
                <span class="font-medium text-gray-500">Last Updated</span>
                <span class="text-gray-900">{{ formatDate(stockItem.updatedAt) }}</span>
              </div>
              
              <div v-if="stockItem.user" class="flex justify-between py-2">
                <span class="font-medium text-gray-500">Created by</span>
                <span class="text-gray-900">{{ stockItem.user.email }}</span>
              </div>
            </div>
          </div>

          <!-- Actions for non-owners -->
          <div v-if="!isOwner" class="pt-6 border-t">
            <p class="text-sm text-gray-500 mb-4">
              This stockItem is owned by {{ stockItem.user?.email }}
            </p>
            <UButton variant="outline" to="/stockItem">
              Back to stockItem
            </UButton>
          </div>
        </div>
      </div>

      <!-- Additional Sections -->
      <div class="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Stock Status -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Stock Status</h3>
          </template>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">Current Stock</span>
              <span class="font-medium">{{ stockItem.stock }} units</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">Status</span>
              <UBadge :color="stockStatus.color" size="sm">
                {{ stockStatus.label }}
              </UBadge>
            </div>
          </div>
        </UCard>

        <!-- Quick Actions -->
        <UCard v-if="isOwner">
          <template #header>
            <h3 class="font-semibold">Quick Actions</h3>
          </template>
          
          <div class="space-y-3">
            <UButton 
              variant="outline" 
              block
              icon="i-heroicons-pencil"
              :to="`/stockItems/${stockItem.id}/edit`"
            >
              Edit Stock Item
            </UButton>
            <UButton 
              variant="outline" 
              block
              icon="i-heroicons-arrow-path"
              @click="toggleStatus"
              :loading="updatingStatus"
            >
              {{ stockItem.status === 'ACTIVE' ? 'Deactivate' : 'Activate' }}
            </UButton>
          </div>
        </UCard>

        <!-- Analytics Placeholder -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Analytics</h3>
          </template>
          
          <div class="space-y-3 text-sm text-gray-500">
            <p>Views: 0</p>
            <p>Favorites: 0</p>
            <p>Last viewed: Never</p>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Delete Stock Item</h3>
        </template>
        
        <p class="text-gray-600">
          Are you sure you want to delete "{{ stockItem?.name }}"? This action cannot be undone.
        </p>
        
        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showDeleteModal = false">
              Cancel
            </UButton>
            <UButton 
              color="red" 
              :loading="deleting"
              @click="deleteStockItem"
            >
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

// Reactive data
const stockItem = ref(null)
const loading = ref(true)
const deleting = ref(false)
const updatingStatus = ref(false)
const showDeleteModal = ref(false)

// Computed
const isOwner = computed(() => {
  return stockItem.value && authStore.user && stockItem.value.userId === authStore.user.id
})

const stockColorClass = computed(() => {
  if (!stockItem.value) return 'text-gray-900'
  
  if (stockItem.value.stock === 0) return 'text-red-600'
  if (stockItem.value.stock < 10) return 'text-yellow-600'
  return 'text-green-600'
})

const stockStatus = computed(() => {
  if (!stockItem.value) return { label: 'Unknown', color: 'gray' }
  
  if (stockItem.value.stock === 0) return { label: 'Out of Stock', color: 'red' }
  if (stockItem.value.stock < 10) return { label: 'Low Stock', color: 'yellow' }
  return { label: 'In Stock', color: 'green' }
})

// Methods
const fetchStockItem = async () => {
  loading.value = true
  try {
    stockItem.value = await $fetch(`http://localhost:3001/api/stock-items/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
  } catch (error) {
    console.error('Error loading stock item:', error)
    stockItem.value = null
  } finally {
    loading.value = false
  }
}

const getStatusColor = (status) => {
  const colors = {
    ACTIVE: 'green',
    INACTIVE: 'gray',
    DRAFT: 'yellow',
    ARCHIVED: 'red'
  }
  return colors[status] || 'gray'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const deleteStockItem = async () => {
  if (!stockItem.value) return
  
  deleting.value = true
  try {
    await $fetch(`http://localhost:3001/api/stock-items/${stockItem.value.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    console.log('Stock item deleted successfully')
    router.push('/stock-items')
  } catch (error) {
    console.error('Error deleting stock item:', error)
  } finally {
    deleting.value = false
  }
}

const toggleStatus = async () => {
  if (!stockItem.value) return
  
  updatingStatus.value = true
  try {
    const newStatus = stockItem.value.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'

    const updatedStockItem = await $fetch(`http://localhost:3001/api/stock-items/${stockItem.value.id}/status`, {
      method: 'PATCH',
      body: { status: newStatus },
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    stockItem.value.status = updatedStockItem.status
    console.log('Stock item status updated')
  } catch (error) {
    console.error('Error updating status:', error)
  } finally {
    updatingStatus.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchStockItem()
})
</script>