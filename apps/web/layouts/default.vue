<!-- layouts/default.vue - DOĞRU HALİ -->
<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <AppHeader 
      :collapsed="sidebarCollapsed" 
      @toggle-sidebar="toggleSidebar" 
    />
    
    <AppSidebar 
      ref="sidebarRef" 
      :collapsed="sidebarCollapsed"
      @update:collapsed="handleCollapsedUpdate"
    />
    
    <main 
      class="pt-16 transition-all duration-300"
      :class="{
        'lg:ml-64': !sidebarCollapsed,
        'lg:ml-16': sidebarCollapsed,
        'ml-0': true
      }"
    >
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type AppSidebar from '~/components/layout/AppSidebar.vue'

const sidebarRef = ref<InstanceType<typeof AppSidebar> | null>(null)
const sidebarCollapsed = ref(true)

// Handle collapsed update from sidebar
const handleCollapsedUpdate = (value: boolean) => {
  console.log('[Layout] 🔥 Received update:', value)
  sidebarCollapsed.value = value
}

// Debug watch
watch(sidebarCollapsed, (newVal, oldVal) => {
  console.log('[Layout] 🟢 State changed:', oldVal, '→', newVal)
})

// Mobile sidebar toggle
const toggleSidebar = () => {
  console.log('[Layout] 🔵 Toggle mobile')
  sidebarRef.value?.toggleMobile()
}

// LocalStorage persistence
watch(sidebarCollapsed, (newValue) => {
  if (process.client) {
    localStorage.setItem('sidebar-collapsed', newValue.toString())
  }
})

// Restore on mount
onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved !== null) {
      sidebarCollapsed.value = saved === 'true'
      console.log('[Layout] 📂 Restored:', sidebarCollapsed.value)
    }
  }
})
</script>