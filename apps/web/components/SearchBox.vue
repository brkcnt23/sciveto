<!-- apps/web/components/SearchBox.vue -->
<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      class="w-64 pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-white/90 backdrop-blur-sm"
      @input="$emit('search', searchQuery)"
      @keyup.enter="$emit('enter', searchQuery)"
    />
    <Icon 
      name="i-heroicons-magnifying-glass" 
      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" 
    />
    
    <!-- Clear button -->
    <button
      v-if="searchQuery"
      @click="clearSearch"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
    >
      <Icon name="i-heroicons-x-mark" class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

defineEmits(['search', 'enter'])

const searchQuery = ref('')

const clearSearch = () => {
  searchQuery.value = ''
  $emit('search', '')
}
</script>