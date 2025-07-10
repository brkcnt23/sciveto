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

            <UFormGroup label="SKU" description="Stock Keeping Unit">
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

            <UFormGroup label="Stock Quantity" required>
              <UInput
                v-model.number="form.stock"
                type="number"
                min="0"
                placeholder="0"
                :disabled="loading"
                required
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
                :disabled="loading || loadingCategories"
              />
              <div v-if="categoryError" class="text-red-500 text-sm mt-1">
                {{ categoryError }}
              </div>
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
          <UFormGroup label="Image URL" description="Direct link to stock item image">
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
            <div class="w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden">
              <img 
                :src="form.imageUrl" 
                :alt="form.name"
                class="w-full h-full object-cover"
                @error="imageError = true"
                @load="imageError = false"
              />
            </div>
            <p v-if="imageError" class="text-red-500 text-sm">
              Unable to load image from this URL
            </p>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <UButton
              type="button"
              variant="outline"
              @click="$router.push('/stock-items')"
              :disabled="loading"
            >
              Cancel
            </UButton>
            
            <UButton
              type="submit"
              color="green"
              :loading="loading"
              :disabled="!isFormValid"
            >
              Create Stock Item
            </UButton>
          </div>
        </form>
      </UCard>
    </div>

    <!-- Success/Error Notifications -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-50">
      <UAlert
        :color="notification.type"
        :title="notification.title"
        :description="notification.message"
        :close-button="{ icon: 'i-heroicons-x-mark', color: 'gray', variant: 'link' }"
        @close="notification.show = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Data
const loading = ref(false)
const loadingCategories = ref(false)
const categories = ref([])
const categoryError = ref('')
const imageError = ref(false)

const form = reactive({
  name: '',
  sku: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: '',
  status: 'active',
  imageUrl: ''
})

const notification = reactive({
  show: false,
  type: 'success',
  title: '',
  message: ''
})

// Options
const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]

// Computed
const categoryOptions = computed(() => {
  const options = [{ label: 'No Category', value: '' }]
  categories.value.forEach(category => {
    options.push({ label: category.name, value: category.id })
  })
  return options
})

const isFormValid = computed(() => {
  return form.name.trim() !== '' && form.stock >= 0
})

// Methods
const fetchCategories = async () => {
  loadingCategories.value = true
  categoryError.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock categories data
    categories.value = [
      { id: 1, name: 'Hardware' },
      { id: 2, name: 'Software' },
      { id: 3, name: 'Materials' },
      { id: 4, name: 'Electronics' }
    ]
  } catch (error) {
    console.error('Error fetching categories:', error)
    categoryError.value = 'Failed to load categories'
  } finally {
    loadingCategories.value = false
  }
}

const createStockItem = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock successful creation
    console.log('Creating stock item:', form)
    
    // Show success notification
    notification.show = true
    notification.type = 'green'
    notification.title = 'Success!'
    notification.message = 'Stock item created successfully'
    
    // Reset form
    Object.assign(form, {
      name: '',
      sku: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: '',
      status: 'active',
      imageUrl: ''
    })
    
    // Navigate to stock items list after a delay
    setTimeout(() => {
      navigateTo('/stock-items')
    }, 1500)
    
  } catch (error) {
    console.error('Error creating stock item:', error)
    
    // Show error notification
    notification.show = true
    notification.type = 'red'
    notification.title = 'Error!'
    notification.message = 'Failed to create stock item. Please try again.'
    
  } finally {
    loading.value = false
  }
}

const showNotification = (type, title, message) => {
  notification.show = true
  notification.type = type
  notification.title = title
  notification.message = message
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    notification.show = false
  }, 5000)
}

// Lifecycle
onMounted(() => {
  fetchCategories()
})
</script>