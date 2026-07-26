<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink :to="`/inventory/${route.params.id}`" class="text-neutral-500 hover:text-neutral-700">
              <Icon name="i-heroicons-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <h1 class="text-xl font-semibold text-neutral-900">
              Edit Inventory Item
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
          <h2 class="text-lg font-semibold text-neutral-900">Edit Inventory Item Information</h2>
        </template>

        <form @submit.prevent="updateStockItem" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Inventory Item Name" required>
              <UInput
                v-model="form.name"
                placeholder="Enter inventory item name"
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
              placeholder="Enter inventory item description"
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
          <UFormGroup label="Image URL" description="Direct link to inventory item image">
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
              @click="$router.push(`/inventory/${route.params.id}`)"
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
              Update Inventory Item
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

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useInventory } from '~/composables/useInventory'
import { useCategoriesApi } from '~/composables/useCategoriesApi'
import type { StockItem } from '~/types/stock'

const route = useRoute()

// Data
const loading = ref(false)
const loadingStockItem = ref(false)
const imageError = ref(false)
const stockItem = ref<StockItem | null>(null)

type AlertColor = 'neutral' | 'error' | 'success' | 'info' | 'warning' | 'primary' | 'secondary'
type StockStatus = 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED' | 'ARCHIVED'

const form = reactive({
  name: '',
  sku: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: '',
  status: 'ACTIVE' as StockStatus,
  imageUrl: ''
})

const notification = reactive({
  show: false,
  type: 'success' as AlertColor,
  title: '',
  message: ''
})

// Options
const categoryOptions = ref<{ label: string; value: string }[]>([
  { label: 'No Category', value: '' }
])

const statusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Discontinued', value: 'DISCONTINUED' },
  { label: 'Archived', value: 'ARCHIVED' }
]

// Computed
const isFormValid = computed(() => {
  return form.name.trim() !== '' && form.stock >= 0
})

// Methods
const { fetchInventoryItem, updateInventoryItem } = useInventory()
const { fetchCategories } = useCategoriesApi()

const fetchStockItem = async () => {
  loadingStockItem.value = true

  try {
    stockItem.value = await fetchInventoryItem(String(route.params.id))
    Object.assign(form, {
      name: stockItem.value.name,
      sku: stockItem.value.sku || '',
      description: stockItem.value.description || '',
      price: stockItem.value.price || 0,
      stock: stockItem.value.stock || 0,
      categoryId: stockItem.value.categoryId || '',
      status: normalizeStatus(stockItem.value.status || 'ACTIVE'),
      imageUrl: stockItem.value.imageUrl || ''
    })
  } catch (error) {
    console.error('Error fetching inventory item:', error)
    showNotification('error', 'Error!', 'Failed to load inventory item')
  } finally {
    loadingStockItem.value = false
  }
}

const updateStockItem = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    await updateInventoryItem(String(route.params.id), {
      name: form.name,
      sku: form.sku,
      description: form.description,
      price: form.price,
      stock: form.stock,
      categoryId: form.categoryId || undefined,
      status: form.status
    })

    showNotification('success', 'Success!', 'Inventory item updated successfully')

    setTimeout(() => {
      navigateTo(`/inventory/${route.params.id}`)
    }, 1200)
    
  } catch (error) {
    console.error('Error updating inventory item:', error)
    showNotification('error', 'Error!', 'Failed to update inventory item. Please try again.')
  } finally {
    loading.value = false
  }
}

const showNotification = (type: AlertColor, title: string, message: string) => {
  notification.show = true
  notification.type = type
  notification.title = title
  notification.message = message
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    notification.show = false
  }, 5000)
}

const normalizeStatus = (status: string): StockStatus => {
  const normalized = status.toUpperCase()
  if (normalized === 'INACTIVE' || normalized === 'DISCONTINUED' || normalized === 'ARCHIVED') {
    return normalized
  }
  return 'ACTIVE'
}

// Lifecycle
onMounted(async () => {
  await fetchStockItem()
  const categories = await fetchCategories()
  categoryOptions.value = [
    { label: 'No Category', value: '' },
    ...categories.map(category => ({
      label: category.name,
      value: category.id
    }))
  ]
})
</script>
