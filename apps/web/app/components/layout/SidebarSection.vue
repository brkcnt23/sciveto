<!-- components/layout/SidebarSection.vue -->
<template>
  <div class="px-3 py-2 h-8 flex items-center justify-center">
    <!-- Expanded state - Full title -->
    <h3 
      v-if="!collapsed"
      class="text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis w-full"
    >
      {{ title }}
    </h3>
    
    <!-- Collapsed state - First letter with same height -->
    <div 
      v-else
      class="flex items-center justify-center w-6 h-6 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400"
    >
      {{ title.charAt(0).toUpperCase() }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false
})
</script>

<script lang="ts">
// Make it default export for better compatibility
export default {
  name: 'SidebarSection'
}
</script>

<style scoped>
/* Sabit yükseklik ve hizalama ile layout shifting engellenir */
.min-h-\[40px\] { min-height: 40px; }
.min-h-\[24px\] { min-height: 24px; }
</style>