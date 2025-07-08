<!-- apps/web/pages/stock-items/create.vue - Updated sections -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Create New Stock Item</h1>
        <p class="text-gray-600 mt-2">Add a new item to your inventory</p>
      </div>

      <UCard>
        <form @submit.prevent="createStockItem" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Name" required>
              <UInput
                v-model="form.name"
                placeholder="Enter item name"
                required
              />
            </UFormGroup>

            <UFormGroup label="SKU">
              <UInput
                v-model="form.sku"
                placeholder="Enter SKU (optional)"
              />
            </UFormGroup>
          </div>

          <UFormGroup label="Description">
            <UTextarea
              v-model="form.description"
              placeholder="Enter item description"
              rows="3"
            />
          </UFormGroup>

          <!-- Pricing and Stock -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Price">
              <UInput
                v-model.number="form.price"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
            </UFormGroup>

            <UFormGroup label="Stock Quantity" required>
              <UInput
                v-model.number="form.stock"
                type="number"
                min="0"
                placeholder="0"
                required
              />
            </UFormGroup>
          </div>

          <!-- Category and Status -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Category">
              <div class="space-y-2">
                <!-- Temporary native select as fallback -->
                <select 
                  v-model="form.categoryId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :disabled="loadingCategories"
                >
                  <option value="">No Category</option>
                  <option 
                    v-for="category in categories" 
                    :key="category.id" 
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                
                <div v-if="categoryError" class="text-red-500 text-sm">
                  {{ categoryError }}
                </div>
                <div v-if="categories.length === 0 && !loadingCategories" class="text-gray-500 text-sm">
                  No categories available. Categories will be loaded automatically.
                </div>
              </div>
            </UFormGroup>

            <UFormGroup label="Status" required>
              <!-- Temporary native select as fallback -->
              <select 
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="DRAFT">Draft</option>
                <option value="INACTIVE">Inactive</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </UFormGroup>
          </div>

          <!-- Image URL -->
          <UFormGroup label="Image URL">
            <UInput
              v-model="form.imageUrl"
              placeholder="Enter image URL (optional)"
              @input="imageError = false"
            />
            <div v-if="form.imageUrl && !imageError" class="mt-2">
              <img
                :src="form.imageUrl"
                alt="Preview"
                class="w-32 h-32 object-cover rounded-lg border"
                @error="imageError = true"
              />
            </div>
            <div v-if="imageError" class="mt-2 text-red-500 text-sm">
              Failed to load image
            </div>
          </UFormGroup>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <UButton
              type="button"
              variant="outline"
              @click="$router.push('/stock-items')"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              :loading="loading"
            >
              Create Stock Item
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()

// Reactive data
const loading = ref(false)
const loadingCategories = ref(false)
const imageError = ref(false)
const categories = ref([])
const categoryError = ref('')

const form = reactive({
  name: '',
  description: '',
  price: null,
  sku: '',
  stock: 0,
  status: 'ACTIVE',
  imageUrl: '',
  categoryId: ''
})

// Computed
const categoryOptions = computed(() => {
  const options = [
    { label: 'No Category', value: '' }
  ]
  
  if (categories.value && Array.isArray(categories.value)) {
    const categoryItems = categories.value.map(cat => ({
      label: cat.name || 'Unnamed Category',
      value: cat.id || cat._id || ''
    }))
    options.push(...categoryItems)
  }
  
  return options
})

const statusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Archived', value: 'ARCHIVED' }
]

// Methods
const fetchCategories = async () => {
  loadingCategories.value = true
  categoryError.value = ''
  
  try {
    console.log('Fetching categories with auth...')
    
    if (!authStore.token) {
      throw new Error('No auth token available')
    }
    
    // Categories now require auth to get the correct organization
    const response = await $fetch('http://localhost:3001/api/categories', {
      headers: authStore.getAuthHeaders()
    })
    
    console.log('Categories response:', response)
    
    if (Array.isArray(response)) {
      categories.value = response
    } else if (response && response.data && Array.isArray(response.data)) {
      categories.value = response.data
    } else {
      console.warn('Unexpected categories response format:', response)
      categories.value = []
    }
    
    console.log('Categories loaded:', categories.value.length)
    
  } catch (error) {
    console.error('Error loading categories:', error)
    categoryError.value = `Failed to load categories: ${error.message || 'Unknown error'}`
    
    if (error.status === 401 || error.statusCode === 401) {
      console.log('Auth failed while loading categories')
      authStore.clearAuth()
      router.push('/login')
    }
  } finally {
    loadingCategories.value = false
  }
}

const createStockItem = async () => {
  loading.value = true
  
  try {
    console.log('Creating stock item with auth:', {
      hasToken: !!authStore.token,
      hasUser: !!authStore.user,
      tokenPreview: authStore.token ? authStore.token.substring(0, 10) + '...' : 'none'
    })

    // Ensure we have authentication
    if (!authStore.token) {
      console.error('No authentication token available')
      throw new Error('Authentication required. Please log in again.')
    }

    // Clean form data
    const stockItemData = {
      ...form,
      categoryId: form.categoryId || undefined,
      imageUrl: form.imageUrl || undefined,
      price: form.price || undefined,
      sku: form.sku || undefined
    }

    console.log('Sending stock item data:', stockItemData)

    const response = await $fetch('http://localhost:3001/api/stock-items', {
      method: 'POST',
      body: stockItemData,
      headers: authStore.getAuthHeaders()
    })

    console.log('Stock Item created successfully:', response)
    router.push('/stock-items')
  } catch (error) {
    console.error('Error creating stock item:', error)
    
    // Handle specific error cases
    if (error.status === 401 || error.statusCode === 401) {
      console.log('Authentication failed, clearing auth and redirecting to login')
      authStore.clearAuth()
      router.push('/login')
    } else {
      // Show error to user
      alert(`Error creating stock item: ${error.message || 'Unknown error'}`)
    }
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  // Ensure auth is initialized
  if (process.client) {
    authStore.initializeAuth()
    await nextTick()
    
    console.log('Stock items create - Auth state:', {
      isAuthenticated: authStore.isAuthenticated,
      hasToken: !!authStore.token,
      hasUser: !!authStore.user
    })
    
    if (!authStore.isAuthenticated) {
      console.log('Not authenticated, redirecting to login')
      await router.push('/login')
      return
    }
  }
  
  await fetchCategories()
})
</script>