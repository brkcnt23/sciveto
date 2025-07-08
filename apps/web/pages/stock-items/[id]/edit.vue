<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink :to="`/stockItems/${route.params.id}`" class="text-gray-500 hover:text-gray-700">
              <Icon name="i-heroicons-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <h1 class="text-xl font-semibold text-gray-900">
              Edit stock item
            </h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loadingStockItem" class="mx-auto max-w-3xl px-6 lg:px-8 py-8">
      <USkeleton class="h-96" />
    </div>

    <!-- Main Content -->
    <div v-else class="mx-auto max-w-3xl px-6 lg:px-8 py-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900">Edit Stock Item Information</h2>
        </template>

        <form @submit.prevent="updateStockItem" class="space-y-6">
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
              @click="$router.push(`/stockItems/${route.params.id}`)"
            >
              Cancel
            </UButton>
            
            <UButton
              type="submit"
              :loading="loading"
              :disabled="!form.name.trim()"
              icon="i-heroicons-check"
            >
              Update Stock Item
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
const route = useRoute()
const router = useRouter()

// Reactive data
const loading = ref(false)
const loadingStockItem = ref(true)
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

const fetchStockItem = async () => {
  loadingStockItem.value = true
  try {
    const stockItem = await $fetch(`http://localhost:3001/api/stock-items/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    // Populate form with stock item data
    Object.assign(form, {
      name: stockItem.name || '',
      description: stockItem.description || '',
      price: stockItem.price || null,
      sku: stockItem.sku || '',
      stock: stockItem.stock || 0,
      status: stockItem.status || 'ACTIVE',
      imageUrl: stockItem.imageUrl || '',
      categoryId: stockItem.categoryId || ''
    })
  } catch (error) {
    console.error('Error loading stock item:', error)
    router.push('/stock-items')
  } finally {
    loadingStockItem.value = false
  }
}

const updateStockItem = async () => {
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

    await $fetch(`http://localhost:3001/api/stock-items/${route.params.id}`, {
      method: 'PATCH',
      body: stockItemData,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    console.log('Stock item updated successfully!')
    router.push(`/stock-items/${route.params.id}`)
  } catch (error) {
    console.error('Error updating stock item:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await fetchCategories()
  await fetchStockItem()
})
</script>