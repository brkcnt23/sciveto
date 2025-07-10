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
            color="green"
          >
            Add Stock Item
          </UButton>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <!-- Search & Filters -->
      <UCard class="mb-6">
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
      </UCard>

      <!-- Stock Items Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonLoader 
          v-for="n in 6" 
          :key="n" 
          type="card" 
        />
      </div>

      <!-- Stock Items List -->
      <div v-else-if="stockItems.length > 0" class="space-y-6">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard 
            v-for="item in stockItems" 
            :key="item.id"
            class="hover:shadow-lg transition-shadow cursor-pointer"
            @click="$router.push(`/stock-items/${item.id}`)"
          >
            <!-- Image -->
            <div class="aspect-w-16 aspect-h-9 mb-4">
              <img 
                v-if="item.imageUrl"
                :src="item.imageUrl" 
                :alt="item.name"
                class="w-full h-48 object-cover rounded-lg bg-gray-100"
              />
              <div v-else class="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon name="i-heroicons-cube" class="w-12 h-12 text-gray-400" />
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-3">
              <div class="flex items-start justify-between">
                <h3 class="font-semibold text-gray-900 line-clamp-2">{{ item.name }}</h3>
                <UBadge 
                  :color="getStatusColor(item.status)"
                  size="sm"
                >
                  {{ item.status }}
                </UBadge>
              </div>

              <p v-if="item.description" class="text-sm text-gray-600 line-clamp-2">
                {{ item.description }}
              </p>

              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <p class="text-lg font-bold text-gray-900">
                    {{ item.price ? `$${item.price.toFixed(2)}` : 'No price' }}
                  </p>
                  <p class="text-sm text-gray-500">
                    Stock: {{ item.stock }} units
                  </p>
                </div>

                <div class="flex space-x-1">
                  <UButton
                    icon="i-heroicons-eye"
                    size="sm"
                    variant="soft"
                    @click.stop="viewItem(item.id)"
                  />
                  <UButton
                    icon="i-heroicons-pencil"
                    size="sm"
                    variant="soft"
                    color="blue"
                    @click.stop="editItem(item.id)"
                  />
                  <UButton
                    icon="i-heroicons-trash"
                    size="sm"
                    variant="soft"
                    color="red"
                    @click.stop="deleteItem(item.id)"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Table View -->
        <UTable 
          v-else
          :rows="stockItems"
          :columns="tableColumns"
          :loading="loading"
        >
          <template #name-data="{ row }">
            <div class="flex items-center space-x-3">
              <img 
                v-if="row.imageUrl"
                :src="row.imageUrl" 
                :alt="row.name"
                class="w-10 h-10 rounded object-cover"
              />
              <div v-else class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                <Icon name="i-heroicons-cube" class="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ row.name }}</p>
                <p v-if="row.sku" class="text-sm text-gray-500">{{ row.sku }}</p>
              </div>
            </div>
          </template>

          <template #status-data="{ row }">
            <UBadge :color="getStatusColor(row.status)">
              {{ row.status }}
            </UBadge>
          </template>

          <template #price-data="{ row }">
            <span class="font-medium">
              {{ row.price ? `$${row.price.toFixed(2)}` : '-' }}
            </span>
          </template>

          <template #stock-data="{ row }">
            <span :class="getStockColorClass(row.stock)">
              {{ row.stock }}
            </span>
          </template>

          <template #actions-data="{ row }">
            <div class="flex space-x-1">
              <UButton
                icon="i-heroicons-eye"
                size="sm"
                variant="ghost"
                @click="viewItem(row.id)"
              />
              <UButton
                icon="i-heroicons-pencil"
                size="sm"
                variant="ghost"
                color="blue"
                @click="editItem(row.id)"
              />
              <UButton
                icon="i-heroicons-trash"
                size="sm"
                variant="ghost"
                color="red"
                @click="deleteItem(row.id)"
              />
            </div>
          </template>
        </UTable>

        <!-- Pagination -->
        <div class="flex justify-center">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-items="totalItems"
            :per-page="perPage"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
          />
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else
        icon="i-heroicons-cube"
        title="No stock items found"
        description="Get started by adding your first stock item to the inventory."
        action-text="Add Stock Item"
        action-link="/stock-items/create"
        action-icon="i-heroicons-plus"
        action-color="green"
      />

      <!-- View Mode Toggle -->
      <div class="fixed bottom-4 right-4">
        <UButtonGroup>
          <UButton
            icon="i-heroicons-squares-2x2"
            :variant="viewMode === 'grid' ? 'solid' : 'outline'"
            @click="viewMode = 'grid'"
          />
          <UButton
            icon="i-heroicons-bars-3"
            :variant="viewMode === 'table' ? 'solid' : 'outline'"
            @click="viewMode = 'table'"
          />
        </UButtonGroup>
      </div>
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

        <p>Are you sure you want to delete this stock item? This action cannot be undone.</p>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showDeleteModal = false">
              Cancel
            </UButton>
            <UButton color="red" :loading="deleting" @click="confirmDelete">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'

// Data
const loading = ref(false)
const deleting = ref(false)
const showDeleteModal = ref(false)
const deleteItemId = ref(null)
const viewMode = ref('grid')
const stockItems = ref([])
const currentPage = ref(1)
const perPage = ref(12)
const totalItems = ref(0)

const filters = reactive({
  search: '',
  categoryId: '',
  status: ''
})

// Options
const categoryOptions = [
  { label: 'All Categories', value: '' },
  { label: 'Hardware', value: 'hardware' },
  { label: 'Software', value: 'software' },
  { label: 'Materials', value: 'materials' }
]

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Out of Stock', value: 'out_of_stock' }
]

const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'actions', label: 'Actions' }
]

// Computed
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / perPage.value)
})

// Methods
const fetchStockItems = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data
    stockItems.value = [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 199.99,
        stock: 25,
        status: 'active',
        category: 'Electronics',
        sku: 'WH-001',
        imageUrl: null
      },
      {
        id: 2,
        name: 'USB Cable',
        description: 'Premium USB-C to USB-A cable',
        price: 24.99,
        stock: 0,
        status: 'out_of_stock',
        category: 'Hardware',
        sku: 'USC-002'
      }
    ]
    totalItems.value = stockItems.value.length
  } catch (error) {
    console.error('Error fetching stock items:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = useDebounceFn(() => {
  fetchStockItems()
}, 300)

const resetFilters = () => {
  Object.assign(filters, {
    search: '',
    categoryId: '',
    status: ''
  })
  fetchStockItems()
}

const getStatusColor = (status) => {
  const colors = {
    active: 'green',
    inactive: 'gray',
    out_of_stock: 'red'
  }
  return colors[status] || 'gray'
}

const getStockColorClass = (stock) => {
  if (stock === 0) return 'text-red-600 font-semibold'
  if (stock < 10) return 'text-yellow-600 font-semibold'
  return 'text-green-600 font-semibold'
}

const viewItem = (id) => {
  navigateTo(`/stock-items/${id}`)
}

const editItem = (id) => {
  navigateTo(`/stock-items/${id}/edit`)
}

const deleteItem = (id) => {
  deleteItemId.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Remove item from list
    stockItems.value = stockItems.value.filter(item => item.id !== deleteItemId.value)
    totalItems.value--
    
    showDeleteModal.value = false
  } catch (error) {
    console.error('Error deleting item:', error)
  } finally {
    deleting.value = false
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchStockItems()
}

const handlePageSizeChange = (size) => {
  perPage.value = size
  currentPage.value = 1
  fetchStockItems()
}

// Lifecycle
onMounted(() => {
  fetchStockItems()
})
</script>