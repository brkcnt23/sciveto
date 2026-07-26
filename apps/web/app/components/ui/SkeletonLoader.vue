<template>
  <div class="animate-pulse">
    <!-- Card Skeleton -->
    <div v-if="type === 'card'" class="space-y-4">
      <USkeleton class="h-48 w-full" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-3/4" />
        <USkeleton class="h-4 w-1/2" />
      </div>
    </div>

    <!-- Table Row Skeleton -->
    <div v-else-if="type === 'table-row'" class="flex items-center space-x-4 p-4">
      <USkeleton class="h-10 w-10" />
      <div class="flex-1 space-y-2">
        <USkeleton class="h-4 w-3/4" />
        <USkeleton class="h-3 w-1/2" />
      </div>
      <USkeleton class="h-8 w-16" />
    </div>

    <!-- List Item Skeleton -->
    <div v-else-if="type === 'list'" class="flex items-center space-x-4 p-3">
      <USkeleton class="h-8 w-8" />
      <div class="flex-1 space-y-1">
        <USkeleton class="h-4 w-2/3" />
        <USkeleton class="h-3 w-1/3" />
      </div>
    </div>

    <!-- Text Lines Skeleton -->
    <div v-else-if="type === 'text'" class="space-y-3">
      <USkeleton 
        v-for="line in lines" 
        :key="line" 
        class="h-4"
        :class="getLineWidth(line)" 
      />
    </div>

    <!-- Custom/Default Skeleton -->
    <div v-else class="space-y-3">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-5/6" />
      <USkeleton class="h-4 w-4/6" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['card', 'table-row', 'list', 'text', 'custom'].includes(value)
  },
  lines: {
    type: Number,
    default: 3
  }
})

const getLineWidth = (lineIndex) => {
  const widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/6', 'w-2/6']
  return widths[lineIndex % widths.length] || 'w-full'
}
</script>