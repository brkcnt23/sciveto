<template>
  <div class="flex items-center justify-between">
    <!-- Items Info -->
    <div class="text-sm text-gray-700">
      Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-1">
      <!-- Previous Button -->
      <UButton
        variant="outline"
        size="sm"
        icon="i-heroicons-chevron-left"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </UButton>

      <!-- Page Numbers -->
      <div class="flex items-center space-x-1">
        <UButton
          v-for="page in visiblePages"
          :key="page"
          :variant="page === currentPage ? 'solid' : 'outline'"
          :color="page === currentPage ? 'primary' : 'gray'"
          size="sm"
          :disabled="page === '...'"
          @click="page !== '...' && goToPage(page)"
        >
          {{ page }}
        </UButton>
      </div>

      <!-- Next Button -->
      <UButton
        variant="outline"
        size="sm"
        icon="i-heroicons-chevron-right"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </UButton>
    </div>

    <!-- Per Page Selector -->
    <div v-if="showPerPage" class="flex items-center space-x-2">
      <span class="text-sm text-gray-700">Show:</span>
      <USelect
        v-model="selectedPageSize"
        :options="pageSizeOptions"
        size="sm"
        @change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    default: 10
  },
  showPerPage: {
    type: Boolean,
    default: true
  },
  maxVisiblePages: {
    type: Number,
    default: 7
  }
})

const emit = defineEmits(['page-change', 'page-size-change'])

const selectedPageSize = ref(props.perPage)

const pageSizeOptions = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 }
]

const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.totalItems)
})

const visiblePages = computed(() => {
  const pages = []
  const maxPages = props.maxVisiblePages
  const totalPages = props.totalPages
  const currentPage = props.currentPage

  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    const halfVisible = Math.floor(maxPages / 2)
    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)

    if (currentPage <= halfVisible) {
      endPage = maxPages
    } else if (currentPage >= totalPages - halfVisible) {
      startPage = totalPages - maxPages + 1
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) pages.push('...')
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }
  }

  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}

const handlePageSizeChange = (newPageSize) => {
  emit('page-size-change', newPageSize)
}

watch(() => props.perPage, (newValue) => {
  selectedPageSize.value = newValue
})
</script>