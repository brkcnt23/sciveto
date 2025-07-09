<!-- apps/web/components/SearchBox.vue -->
<template>
  <div class="relative">
    <UInput
      v-model="searchQuery"
      :placeholder="placeholder"
      icon="i-heroicons-magnifying-glass"
      :loading="loading"
      @input="handleInput"
      @keydown.enter="handleEnter"
      class="w-64 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-sky-500 focus:ring-sky-500"
    />
    
    <!-- Search Results Dropdown -->
    <div 
      v-if="showResults && results.length > 0"
      class="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
    >
      <div 
        v-for="result in results" 
        :key="result.id"
        class="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
        @click="selectResult(result)"
      >
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Icon :name="result.icon" class="h-4 w-4 text-white" />
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium text-slate-900">{{ result.title }}</div>
            <div class="text-xs text-slate-500">{{ result.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { debounce } from 'lodash-es'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

const emit = defineEmits(['search', 'select'])

const searchQuery = ref('')
const loading = ref(false)
const showResults = ref(false)
const results = ref([])

// Mock search results for demonstration
const mockResults = [
  {
    id: '1',
    title: 'Modern Website Redesign',
    description: 'Project • Web Development',
    icon: 'i-heroicons-briefcase',
    type: 'project'
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Project • App Development',
    icon: 'i-heroicons-briefcase',
    type: 'project'
  },
  {
    id: '3',
    title: 'Laptop Stand',
    description: 'Stock Item • Hardware',
    icon: 'i-heroicons-cube',
    type: 'stock-item'
  },
  {
    id: '4',
    title: 'John Doe',
    description: 'User • Project Manager',
    icon: 'i-heroicons-user',
    type: 'user'
  }
]

const performSearch = async (query) => {
  if (!query.trim()) {
    results.value = []
    showResults.value = false
    return
  }

  loading.value = true
  
  // Simulate API call
  setTimeout(() => {
    results.value = mockResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    )
    showResults.value = true
    loading.value = false
  }, 300)
}

const debouncedSearch = debounce(performSearch, 300)

const handleInput = () => {
  debouncedSearch(searchQuery.value)
}

const handleEnter = () => {
  if (results.value.length > 0) {
    selectResult(results.value[0])
  }
  emit('search', searchQuery.value)
}

const selectResult = (result) => {
  searchQuery.value = result.title
  showResults.value = false
  emit('select', result)
}

// Close results when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showResults.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>