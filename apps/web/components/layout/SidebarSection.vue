<!-- components/layout/SidebarSection.vue -->
<template>
  <div class="px-3 py-2 min-h-[32px] flex items-center">
    <h3 
      v-if="!collapsed"
      class="text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis"
    >
      {{ title }}
    </h3>
    <!-- Kapalıyken boş ama yükseklik korunur -->
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

<style scoped>
/* Sabit yükseklik ve hizalama ile layout shifting engellenir */
.min-h-\[40px\] { min-height: 40px; }
.min-h-\[24px\] { min-height: 24px; }
</style>