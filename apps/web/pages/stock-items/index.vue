<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/dashboard" class="text-gray-500 hover:text-gray-700">
              <Icon name="i-heroicons-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <h1 class="text-xl font-semibold text-gray-900">Stock Items</h1>
          </div>
          
          <UButton 
            to="/stock-items/create"
            icon="i-heroicons-plus"
            size="sm"
          >
            Add Stock Item
          </UButton>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <!-- Search & Filters -->
      <div class="mb-6">
        <UCard>
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <UInput
                v-model="filters.search"
                placeholder="Search stock items..."
                icon="i-heroicons-magnifying-glass"
                @input="debouncedSearch"
              />
              
              <USelect
                v-model="filters.categoryId"
                :options="categoryOptions"
                placeholder="All Categories"
                @change="fetchStockItems"
              />
              
              <USelect
                v-model="filters.status"
                :options="statusOptions"
                placeholder="All Status"
                @change="fetchStockItems"
              />
              
              <UButton
                variant="outline"
                icon="i-heroicons-arrow-path"
                @click="resetFilters"
              >
                Reset
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Stock Items Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <USkeleton v-for="n in 6" :key="n" class="h-64" />
      </div>

      <div v-else-if="stockItems.length === 0" class="text-center py-12">
        <Icon name="i-heroicons-cube" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No stock items found</h3>
        <p class="text-gray-500 mb-4">Get started by adding your first stock item.</p>
        <UButton to="/stock-items/create" icon="i-heroicons-plus">
          Add Stock Item
        </UButton>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard 
          v-for="item in stockItems" 
          :key="item.id"
          class="hover:shadow-lg transition-shadow cursor-pointer"
          @click="$router.push(`/stock-items/${item.id}`)"
        >
          <div class="space-y-3">
            <div class="flex items-start justify-between">
              <h3 class="font-semibold text-gray-900 line-clamp-2">
                {{ item.name }}
              </h3>
              <UBadge 
                :color="getStatusColor(item.status)"
                size="xs"
              >
                {{ item.status }}
              </UBadge>
            </div>
            
            <p v-if="item.description" class="text-sm text-gray-600 line-clamp-2">
              {{ item.description }}
            </p>
            
            <!-- Stock Info -->
            <div class="bg-gray-50 rounded p-3 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Current Stock:</span>
                <span class="font-medium" :class="getStockColorClass(item.stock)">
                  {{ item.stock }} {{ item.unit || 'pcs' }}
                </span>
              </div>
              
              <div v-if="item.price" class="flex justify-between text-sm">
                <span class="text-gray-500">Last Price:</span>
                <span class="font-medium text-gray-900">
                  ${{ item.price.toFixed(2) }}
                </span>
              </div>
              
              <div v-if="item.sku" class="flex justify-between text-sm">
                <span class="text-gray-500">SKU:</span>
                <span class="font-medium text-gray-900">{{ item.sku }}</span>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex justify-between items-center pt-2 border-t">
              <div v-if="item.category" class="flex">
                <UBadge variant="soft" size="xs">
                  {{ item.category.name }}
                </UBadge>
              </div>
              
              <div class="flex space-x-2">
                <UButton
                  variant="ghost"
                  icon="i-heroicons-pencil"
                  size="xs"
                  @click.stop="$router.push(`/stock-items/${item.id}/edit`)"
                />
                <UButton
                  variant="ghost"
                  icon="i-heroicons-trash"
                  size="xs"
                  color="red"
                  @click.stop="confirmDelete(item)"
                />
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Pagination -->
      <div v-if="meta.totalPages > 1" class="mt-8 flex justify-center">
        <UPagination 
          v-model="currentPage"
          :page-count="meta.limit"
          :total="meta.total"
          @update:model-value="fetchStockItems"
        />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Delete Stock Item</h3>
        </template>
        
        <p class="text-gray-600">
          Are you sure you want to delete "{{ itemToDelete?.name }}"? This action cannot be undone.
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
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

// Reactive data
const stockItems = ref([])
const categories = ref([])
const loading = ref(false)
const deleting = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const currentPage = ref(1)

const filters = reactive({
  search: '',
  categoryId: '',
  status: '',
})

const meta = ref({
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1
})

// Computed
const categoryOptions = computed(() => [
  { label: 'All Categories', value: '' },
  ...categories.value.map(cat => ({
    label: cat.name,
    value: cat.id
  }))
])

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Discontinued', value: 'DISCONTINUED' },
  { label: 'Archived', value: 'ARCHIVED' }
]

// Methods
const fetchStockItems = async () => {
  loading.value = true
  try {
    if (!authStore.token) {
      console.log('No auth token for stock items')
      return
    }
    
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: '12',
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value)
      )
    })

    const data = await $fetch(`http://localhost:3001/api/stock-items?${params}`, {
      headers: authStore.getAuthHeaders()
    })
    
    stockItems.value = data.data || []
    meta.value = data.meta || { total: 0, page: 1, limit: 12, totalPages: 1 }
    
    console.log('Stock items loaded:', stockItems.value.length)
  } catch (error) {
    console.error('Error loading stock items:', error)
    
    if (error.status === 401 || error.statusCode === 401) {
      console.log('Auth failed while loading stock items')
      authStore.clearAuth()
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    if (!authStore.token) {
      console.log('No auth token for categories, skipping...')
      return
    }
    
    categories.value = await $fetch('http://localhost:3001/api/categories', {
      headers: authStore.getAuthHeaders()
    })
    
    console.log('Categories loaded in stock items list:', categories.value.length)
  } catch (error) {
    console.error('Error loading categories:', error)
    
    if (error.status === 401 || error.statusCode === 401) {
      console.log('Auth failed while loading categories')
      authStore.clearAuth()
      await navigateTo('/login')
    }
  }
}

const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1
  fetchStockItems()
}, 500)

const resetFilters = () => {
  Object.assign(filters, {
    search: '',
    categoryId: '',
    status: ''
  })
  currentPage.value = 1
  fetchStockItems()
}

const getStatusColor = (status) => {
  const colors = {
    ACTIVE: 'green',
    INACTIVE: 'gray',
    DISCONTINUED: 'orange',
    ARCHIVED: 'red'
  }
  return colors[status] || 'gray'
}

const getStockColorClass = (stock) => {
  if (stock === 0) return 'text-red-600'
  if (stock < 10) return 'text-yellow-600'
  return 'text-green-600'
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const deleteStockItem = async () => {
  if (!itemToDelete.value) return
  
  deleting.value = true
  try {
    await $fetch(`http://localhost:3001/api/stock-items/${itemToDelete.value.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    
    console.log('Stock item deleted successfully')
    showDeleteModal.value = false
    await fetchStockItems()
  } catch (error) {
    console.error('Error deleting stock item:', error)
  } finally {
    deleting.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchCategories()
  fetchStockItems()
})
</script>