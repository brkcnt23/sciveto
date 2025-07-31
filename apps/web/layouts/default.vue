<!-- layouts/default.vue - Global Layout with Sidebar -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <AppSidebar 
      :collapsed="sidebarCollapsed" 
      @update:collapsed="sidebarCollapsed = $event"
    />
    
    <!-- Main Content Area -->
    <div 
      class="transition-all duration-300 ease-in-out"
      :class="sidebarCollapsed ? 'ml-16' : 'ml-64'"
    >
      <!-- Header -->
      <AppHeader @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />
      
      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Sidebar state - Global for all pages
const sidebarCollapsed = ref(true) // Default collapsed

// Persist sidebar state to localStorage
watch(sidebarCollapsed, (newValue) => {
  if (process.client) {
    localStorage.setItem('sidebar-collapsed', newValue.toString())
  }
})

// Restore sidebar state on mount
onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved !== null) {
      sidebarCollapsed.value = saved === 'true'
    }
  }
})
</script>
