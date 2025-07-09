<!-- apps/web/components/ui/SkeletonLoader.vue -->
<template>
  <div class="animate-pulse">
    <!-- Card Skeleton -->
    <div v-if="type === 'card'" class="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div class="flex items-start space-x-4">
        <div class="w-12 h-12 bg-slate-200 rounded-xl"></div>
        <div class="flex-1 space-y-2">
          <div class="h-5 bg-slate-200 rounded w-3/4"></div>
          <div class="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
        <div class="w-20 h-6 bg-slate-200 rounded-full"></div>
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-slate-200 rounded"></div>
        <div class="h-4 bg-slate-200 rounded w-5/6"></div>
      </div>
      <div class="h-3 bg-slate-200 rounded-full"></div>
      <div class="flex justify-between pt-2">
        <div class="h-4 bg-slate-200 rounded w-24"></div>
        <div class="flex space-x-2">
          <div class="w-8 h-8 bg-slate-200 rounded"></div>
          <div class="w-8 h-8 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Table Row Skeleton -->
    <div v-else-if="type === 'table-row'" class="flex items-center py-4 space-x-6">
      <div class="flex items-center space-x-3 flex-1">
        <div class="w-10 h-10 bg-slate-200 rounded-full"></div>
        <div class="space-y-2">
          <div class="h-4 bg-slate-200 rounded w-32"></div>
          <div class="h-3 bg-slate-200 rounded w-20"></div>
        </div>
      </div>
      <div class="w-20 h-6 bg-slate-200 rounded-full"></div>
      <div class="w-16 h-3 bg-slate-200 rounded-full"></div>
      <div class="w-24 h-4 bg-slate-200 rounded"></div>
      <div class="w-20 h-4 bg-slate-200 rounded"></div>
      <div class="flex space-x-2">
        <div class="w-16 h-7 bg-slate-200 rounded"></div>
        <div class="w-16 h-7 bg-slate-200 rounded"></div>
      </div>
    </div>

    <!-- List Item Skeleton -->
    <div v-else-if="type === 'list-item'" class="flex items-center py-3 space-x-4">
      <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-slate-200 rounded w-2/3"></div>
        <div class="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
      <div class="w-16 h-3 bg-slate-200 rounded"></div>
    </div>

    <!-- Avatar + Text Skeleton -->
    <div v-else-if="type === 'avatar-text'" class="flex items-center space-x-3">
      <div :class="`w-${avatarSize} h-${avatarSize} bg-slate-200 rounded-full`"></div>
      <div class="space-y-2">
        <div class="h-4 bg-slate-200 rounded w-24"></div>
        <div class="h-3 bg-slate-200 rounded w-16"></div>
      </div>
    </div>

    <!-- Text Lines Skeleton -->
    <div v-else-if="type === 'text'" class="space-y-2">
      <div 
        v-for="i in lines" 
        :key="i"
        class="h-4 bg-slate-200 rounded"
        :class="i === lines ? 'w-3/4' : 'w-full'"
      ></div>
    </div>

    <!-- Custom Pattern -->
    <div v-else class="space-y-4">
      <div class="flex space-x-4">
        <div class="w-12 h-12 bg-slate-200 rounded"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-slate-200 rounded"></div>
          <div class="h-3 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>
      <div class="h-32 bg-slate-200 rounded"></div>
      <div class="flex justify-between">
        <div class="h-8 bg-slate-200 rounded w-24"></div>
        <div class="h-8 bg-slate-200 rounded w-24"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'card',
    validator: value => ['card', 'table-row', 'list-item', 'avatar-text', 'text', 'custom'].includes(value)
  },
  lines: {
    type: Number,
    default: 3
  },
  avatarSize: {
    type: String,
    default: '10'
  }
})
</script>