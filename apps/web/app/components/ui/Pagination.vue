<template>
  <div :class="containerClass">
    <!-- Hidden input for forms - NAME PROP ADDED -->
    <input 
      v-if="name"
      :name="name"
      type="hidden" 
      :value="currentPage" 
    />

    <nav class="flex items-center justify-between" aria-label="Pagination Navigation">
      <!-- Results Info -->
      <div v-if="showInfo" class="flex-1 flex justify-between text-sm text-neutral-600 sm:hidden">
        <span>{{ startItem }} - {{ endItem }} of {{ total }}</span>
      </div>

      <div v-if="showInfo" class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-neutral-700">
            Showing
            <span class="font-medium">{{ startItem }}</span>
            to
            <span class="font-medium">{{ endItem }}</span>
            of
            <span class="font-medium">{{ total }}</span>
            results
          </p>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div :class="['flex items-center space-x-1', showInfo ? 'flex-1 justify-end' : 'justify-center']">
        <!-- First Page Button -->
        <UButton
          v-if="showFirstLast && totalPages > maxVisiblePages"
          variant="outline"
          color="neutral"
          :size="size"
          icon="i-lucide-chevrons-left"
          :disabled="currentPage === 1"
          :aria-label="firstLabel"
          @click="goToPage(1)"
        />

        <!-- Previous Button -->
        <UButton
          variant="outline"
          color="neutral"
          :size="size"
          :icon="previousIcon"
          :disabled="currentPage === 1"
          :aria-label="previousLabel"
          @click="goToPrevious"
        >
          <span v-if="showLabels" class="hidden sm:inline">{{ previousLabel }}</span>
        </UButton>

        <!-- Page Number Buttons -->
        <template v-for="page in visiblePages" :key="page">
          <!-- Page Number -->
          <UButton
            v-if="typeof page === 'number'"
            :variant="page === currentPage ? 'solid' : 'outline'"
            :color="page === currentPage ? color : 'neutral'"
            :size="size"
            :aria-label="`Go to page ${page}`"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="goToPage(page)"
          >
            {{ page }}
          </UButton>

          <!-- Ellipsis -->
          <span 
            v-else 
            :class="[
              'px-3 py-2 text-neutral-500',
              sizeClasses[size] || 'text-sm'
            ]"
            aria-hidden="true"
          >
            ...
          </span>
        </template>

        <!-- Next Button -->
        <UButton
          variant="outline"
          color="neutral"
          :size="size"
          :trailing-icon="nextIcon"
          :disabled="currentPage === totalPages"
          :aria-label="nextLabel"
          @click="goToNext"
        >
          <span v-if="showLabels" class="hidden sm:inline">{{ nextLabel }}</span>
        </UButton>

        <!-- Last Page Button -->
        <UButton
          v-if="showFirstLast && totalPages > maxVisiblePages"
          variant="outline"
          color="neutral"
          :size="size"
          icon="i-lucide-chevrons-right"
          :disabled="currentPage === totalPages"
          :aria-label="lastLabel"
          @click="goToPage(totalPages)"
        />
      </div>

      <!-- Per Page Select -->
      <div v-if="showPerPageSelect" class="flex items-center space-x-2 ml-4">
        <span class="text-sm text-neutral-700 whitespace-nowrap">Show:</span>
        <USelectMenu
          :model-value="perPage"
          :name="`${name}-per-page`"
          :items="perPageOptions"
          :size="size"
          class="w-20"
          @update:model-value="handlePerPageChange"
        />
      </div>
    </nav>

    <!-- Mobile Pagination Info -->
    <div v-if="showInfo" class="sm:hidden mt-3 text-center">
      <p class="text-sm text-neutral-700">
        Page {{ currentPage }} of {{ totalPages }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Core pagination props
  currentPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    default: 10
  },
  
  // NAME PROP NOW REQUIRED for Nuxt UI v3 form integration
  name: {
    type: String,
    required: true
  },
  
  // Display options
  maxVisiblePages: {
    type: Number,
    default: 7
  },
  showInfo: {
    type: Boolean,
    default: true
  },
  showLabels: {
    type: Boolean,
    default: false
  },
  showFirstLast: {
    type: Boolean,
    default: true
  },
  showPerPageSelect: {
    type: Boolean,
    default: false
  },
  
  // Styling props - Updated for Nuxt UI v3
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'].includes(value)
  },
  
  // Icon customization
  previousIcon: {
    type: String,
    default: 'i-lucide-chevron-left'
  },
  nextIcon: {
    type: String,
    default: 'i-lucide-chevron-right'
  },
  
  // Labels for accessibility
  previousLabel: {
    type: String,
    default: 'Previous'
  },
  nextLabel: {
    type: String,
    default: 'Next'
  },
  firstLabel: {
    type: String,
    default: 'First page'
  },
  lastLabel: {
    type: String,
    default: 'Last page'
  },
  
  // Per page options
  perPageOptions: {
    type: Array,
    default: () => [
      { label: '5', value: 5 },
      { label: '10', value: 10 },
      { label: '25', value: 25 },
      { label: '50', value: 50 },
      { label: '100', value: 100 }
    ]
  },
  
  // Custom classes
  containerClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:currentPage', 'update:perPage', 'change'])

// Size classes for consistent styling
const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm', 
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(props.total / props.perPage)
})

const startItem = computed(() => {
  if (props.total === 0) return 0
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  const end = props.currentPage * props.perPage
  return Math.min(end, props.total)
})

const visiblePages = computed(() => {
  const pages = []
  const totalPagesValue = totalPages.value
  const currentPageValue = props.currentPage
  const maxVisible = props.maxVisiblePages

  if (totalPagesValue <= maxVisible) {
    // Show all pages if total pages is less than max visible
    for (let i = 1; i <= totalPagesValue; i++) {
      pages.push(i)
    }
  } else {
    // Calculate start and end of visible range
    let start = Math.max(1, currentPageValue - Math.floor(maxVisible / 2))
    let end = Math.min(totalPagesValue, start + maxVisible - 1)

    // Adjust start if we're at the end
    if (end === totalPagesValue) {
      start = Math.max(1, end - maxVisible + 1)
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1)
      if (start > 2) {
        pages.push('...')
      }
    }

    // Add visible page range
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis and last page if needed
    if (end < totalPagesValue) {
      if (end < totalPagesValue - 1) {
        pages.push('...')
      }
      pages.push(totalPagesValue)
    }
  }

  return pages
})

// Methods
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value || page === props.currentPage) {
    return
  }
  
  emit('update:currentPage', page)
  emit('change', { 
    page, 
    perPage: props.perPage,
    total: props.total
  })
}

const goToPrevious = () => {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

const goToNext = () => {
  if (props.currentPage < totalPages.value) {
    goToPage(props.currentPage + 1)
  }
}

const handlePerPageChange = (newPerPage) => {
  // Calculate new page to maintain position
  const currentStart = (props.currentPage - 1) * props.perPage + 1
  const newPage = Math.ceil(currentStart / newPerPage) || 1
  
  emit('update:perPage', newPerPage)
  emit('update:currentPage', newPage)
  emit('change', {
    page: newPage,
    perPage: newPerPage,
    total: props.total
  })
}
</script>