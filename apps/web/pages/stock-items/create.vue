<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/stock-items" class="text-gray-500 hover:text-gray-700">
              <Icon name="i-heroicons-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <h1 class="text-xl font-semibold text-gray-900">Create Stock Item</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-3xl px-6 lg:px-8 py-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900">Stock Item Information</h2>
        </template>

        <form @submit.prevent="createStockItem" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Stock Item Name" required>
              <UInput
                v-model="form.name"
                placeholder="Enter stock item name"
                :disabled="loading"
                required
              />
            </UFormGroup>

            <UFormGroup label="SKU" help="Stock Keeping Unit">
              <UInput
                v-model="form.sku"
                placeholder="Enter SKU (optional)"
                :disabled="loading"
              />
            </UFormGroup>
          </div>

          <!-- Description -->
          <UFormGroup label="Description">
            <UTextarea
              v-model="form.description"
              placeholder="Enter stock item description"
              :disabled="loading"
              rows="4"
            />
          </UFormGroup>

          <!-- Price and Stock -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Price ($)">
              <UInput
                v-model.number="form.price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                :disabled="loading"
              />
            </UFormGroup>

            <UFormGroup label="Stock Quantity">
              <UInput
                v-model.number="form.stock"
                type="number"
                min="0"
                placeholder="0"
                :disabled="loading"
              />
            </UFormGroup>
          </div>

          <!-- Category and Status -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Category">
              <USelect
                v-model="form.categoryId"
                :options="categoryOptions"
                placeholder="Select category"
                :disabled="loading"
              />
            </UFormGroup>

            <UFormGroup label="Status">
              <USelect
                v-model="form.status"
                :options="statusOptions"
                :disabled="loading"
              />
            </UFormGroup>
          </div>

          <!-- Image URL -->
          <UFormGroup label="Image URL" help="Direct link to stock item image">
            <UInput
              v-model="form.imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              :disabled="loading"
            />
          </UFormGroup>

          <!-- Image Preview -->
          <div v-if="form.imageUrl" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Image Preview</label>
            <div class="max-w-xs">
              <img 
                :src="form.imageUrl" 
                :alt="form.name || 'Stock item preview'"
                class="w-full h-48 object-cover rounded-lg border"
                @error="imageError = true"
                @load="imageError = false"
              />
              <p v-if="imageError" class="text-sm text-red-500 mt-1">
                Failed to load image
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <UButton
              variant="outline"
              :disabled="loading"
              @click="$router.push('/stockItems')"
            >
              Cancel
            </UButton>
            
            <UButton
              type="submit"
              :loading="loading"
              :disabled="!form.name.trim()"
              icon="i-heroicons-plus"
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
const imageError = ref(false)
const categories = ref([])

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
const categoryOptions = computed(() => [
  { label: 'No Category', value: '' },
  ...categories.value.map(cat => ({
    label: cat.name,
    value: cat.id
  }))
])

const statusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Archived', value: 'ARCHIVED' }
]

// Methods
const fetchCategories = async () => {
  try {
    categories.value = await $fetch('http://localhost:3001/api/categories')
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const createStockItem = async () => {
  loading.value = true
  
  try {
    // Clean form data
    const stockItemData = {
      ...form,
      categoryId: form.categoryId || undefined,
      imageUrl: form.imageUrl || undefined,
      price: form.price || undefined,
      sku: form.sku || undefined
    }

    await $fetch('http://localhost:3001/api/stock-items', {
      method: 'POST',
      body: stockItemData,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    console.log('Stock Item created successfully!')
    router.push('/stockItems')
  } catch (error) {
    console.error('Error creating stock item:', error)
    // Handle error - could show error message
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchCategories()
})
</script>