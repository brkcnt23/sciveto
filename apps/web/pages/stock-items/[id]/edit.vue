<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink :to="`/stock-items/${route.params.id}`" class="text-neutral-500 hover:text-neutral-700">
              <Icon name="i-heroicons-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <h1 class="text-xl font-semibold text-neutral-900">
              Edit Stock Item
            </h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loadingStockItem" class="mx-auto max-w-3xl px-6 lg:px-8 py-8">
      <UCard>
        <USkeleton class="h-96" />
      </UCard>
    </div>

    <!-- Main Content -->
    <div v-else class="mx-auto max-w-3xl px-6 lg:px-8 py-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-neutral-900">Edit Stock Item Information</h2>
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
              :rows="4"
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
            <label class="block text-sm font-medium text-neutral-700">Image Preview</label>
            <div class="w-32 h-32 border-2 border-neutral-200 rounded-lg overflow-hidden">
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
              @click="$router.push(`/stock-items/${route.params.id}`)"
              :disabled="loading"
            >
              Cancel
            </UButton>
            
            <UButton
              type="submit"
              color="info"
              :loading="loading"
              :disabled="!isFormValid"
            >
              Update Stock Item
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
        :close-button="{ icon: 'i-heroicons-x-mark', color: 'neutral', variant: 'link' }"
        @close="notification.show = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const route = useRoute()

// Data
const loading = ref(false)
const loadingStockItem = ref(false)
const imageError = ref(false)
const stockItem = ref(null)

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
const categoryOptions = [
  { label: 'No Category', value: '' },
  { label: 'Hardware', value: 'hardware' },
  { label: 'Software', value: 'software' },
  { label: 'Materials', value: 'materials' },
  { label: 'Electronics', value: 'electronics' }
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Out of Stock', value: 'out_of_stock' }
]

// Computed
const isFormValid = computed(() => {
  return form.name.trim() !== '' && form.stock >= 0
})

// Methods
const fetchStockItem = async () => {
  loadingStockItem.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock stock item data
    stockItem.value = {
      id: parseInt(route.params.id),
      name: 'Wireless Headphones',
      sku: 'WH-001',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      stock: 25,
      status: 'active',
      categoryId: 'electronics',
      imageUrl: 'https://example.com/headphones.jpg'
    }
    
    // Populate form with existing data
    Object.assign(form, stockItem.value)
    
  } catch (error) {
    console.error('Error fetching stock item:', error)
    showNotification('red', 'Error!', 'Failed to load stock item')
  } finally {
    loadingStockItem.value = false
  }
}

const updateStockItem = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock successful update
    console.log('Updating stock item:', form)
    
    // Show success notification
    showNotification('green', 'Success!', 'Stock item updated successfully')
    
    // Navigate back to stock item detail after a delay
    setTimeout(() => {
      navigateTo(`/stock-items/${route.params.id}`)
    }, 1500)
    
  } catch (error) {
    console.error('Error updating stock item:', error)
    showNotification('red', 'Error!', 'Failed to update stock item. Please try again.')
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
  fetchStockItem()
})
</script>