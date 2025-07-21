<!-- components/layout/SidebarSection.vue -->
<template>
  <div v-if="!collapsed" class="px-3 py-2">
    <h3 class="text-xs font-semibold text-muted uppercase tracking-wider">
      {{ title }}
    </h3>
  </div>
  <div v-else class="h-px bg-neutral-200 dark:bg-neutral-700 mx-3 my-2" />
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