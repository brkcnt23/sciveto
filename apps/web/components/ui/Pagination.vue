<!-- apps/web/components/ui/Pagination.vue -->
<template>
  <div class="flex items-center justify-between">
    <!-- Results info -->
    <div class="flex-1 flex justify-between sm:hidden">
      <UButton
        variant="outline"
        size="sm"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </UButton>
      <UButton
        variant="outline"
        size="sm"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </UButton>
    </div>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <!-- Results text -->
      <div>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Showing
          <span class="font-medium">{{ startItem }}</span>
          to
          <span class="font-medium">{{ endItem }}</span>
          of
          <span class="font-medium">{{ total }}</span>
          results
        </p>
      </div>

      <!-- Pagination controls -->
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <!-- Previous button -->
          <UButton
            variant="outline"
            size="sm"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span class="sr-only">Previous</span>
            <Icon name="i-heroicons-chevron-left" class="h-5 w-5" />
          </UButton>

          <!-- Page numbers -->
          <template v-for="page in visiblePages" :key="page">
            <!-- Current page -->
            <UButton
              v-if="page === currentPage"
              size="sm"
              color="blue"
              :variant="page === currentPage ? 'solid' : 'outline'"
              @click="goToPage(page)"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {{ page }}
            </UButton>

            <!-- Other pages -->
            <UButton
              v-else-if="page !== '...'"
              variant="outline"
              size="sm"
              @click="goToPage(page)"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {{ page }}
            </UButton>

            <!-- Ellipsis -->
            <span
              v-else
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
            >
              ...
            </span>
          </template>

          <!-- Next button -->
          <UButton
            variant="outline"
            size="sm"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span class="sr-only">Next</span>
            <Icon name="i-heroicons-chevron-right" class="h-5 w-5" />
          </UButton>
        </nav>
      </div>
    </div>

    <!-- Page size selector -->
    <div v-if="showPageSize" class="ml-4">
      <USelect
        v-model="selectedPageSize"
        :options="pageSizeOptions"
        size="sm"
        @update:model-value="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    default: 10
  },
  maxVisiblePages: {
    type: Number,
    default: 7
  },
  showPageSize: {
    type: Boolean,
    default: false
  },
  pageSizeOptions: {
    type: Array,
    default: () => [
      { label: '10 per page', value: 10 },
      { label: '25 per page', value: 25 },
      { label: '50 per page', value: 50 },
      { label: '100 per page', value: 100 }
    ]
  }
})

const emit = defineEmits(['page-change', 'page-size-change'])

// Reactive data
const selectedPageSize = ref(props.perPage)

// Computed properties
const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.total)
})

const visiblePages = computed(() => {
  const pages = []
  const { currentPage, totalPages, maxVisiblePages } = props

  if (totalPages <= maxVisiblePages) {
    // If total pages is less than or equal to max visible, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Calculate start and end pages
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // Adjust if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push('...')
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }
  }

  return pages
})

// Watch for perPage changes
watch(() => props.perPage, (newValue) => {
  selectedPageSize.value = newValue
})

// Methods
const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}

const handlePageSizeChange = (newPageSize) => {
  emit('page-size-change', newPageSize)
}

// Keyboard navigation
const handleKeydown = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      if (props.currentPage > 1) {
        goToPage(props.currentPage - 1)
      }
      break
    case 'ArrowRight':
      if (props.currentPage < props.totalPages) {
        goToPage(props.currentPage + 1)
      }
      break
    case 'Home':
      goToPage(1)
      break
    case 'End':
      goToPage(props.totalPages)
      break
  }
}

// Add keyboard event listener
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}

// Cleanup
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
/* Custom styles for pagination buttons */
.pagination-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.pagination-button:hover {
  background-color: #f9fafb;
}

.dark .pagination-button:hover {
  background-color: #374151;
}

.pagination-button.active {
  z-index: 10;
  background-color: #eff6ff;
  border-color: #3b82f6;
  color: #2563eb;
}

.dark .pagination-button.active {
  background-color: #1e3a8a;
  border-color: #60a5fa;
  color: #93c5fd;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>