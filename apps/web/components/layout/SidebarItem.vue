<!  <div
    :class="[
      'group relative flex items-center rounded-lg transition-all duration-300 ease-in-out',
      'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
      'min-h-[40px]',
      {
        'px-3 py-2': !collapsed,
        'px-2 py-2 justify-center': collapsed,
        'bg-primary-500 text-white shadow-sm hover:bg-primary-600': active,
        'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400': !active
      }
    ]"
    @click="handleClick"
  >layout/SidebarItem.vue -->
<template>
  <div
    :class=" [
      'group relative flex items-center rounded-lg transition-all duration-300 ease-in-out',
      'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
      {
        'px-3 py-2': !collapsed,
        'px-2 py-2 justify-center': collapsed,
        'bg-primary-500 text-white shadow-sm hover:bg-primary-600': active,
        'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400': !active
      }
    ]"
    @click="handleClick"
    style="min-height:40px"
  >
    <!-- Icon -->
    <div
      :class=" [
        'flex items-center justify-center shrink-0 transition-all duration-300',
        {
          'mr-3': !collapsed,
          'mr-0 w-full': collapsed
        }
      ]"
    >
      <UIcon
        :name="item.icon"
        :class=" [
          'transition-all duration-300 w-5 h-5 shrink-0',
          {
            'text-white': active,
            'text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400': !active && !collapsed,
            'text-neutral-500 dark:text-neutral-500 group-hover:text-primary-500 dark:group-hover:text-primary-500': !active && collapsed
          }
        ]"
      />
    </div>

    <!-- Label & Badge (only when not collapsed) -->
    <div 
      class="flex items-center justify-between flex-1 min-w-0 transition-all duration-300 overflow-hidden" 
      :class="!collapsed ? 'opacity-100' : 'opacity-0 w-0'"
    >
      <span
        :class=" [
          'truncate text-sm font-medium transition-colors duration-300 max-w-full',
          {
            'text-white': active,
            'text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400': !active
          }
        ]"
      >
        {{ item.label }}
      </span>

      <!-- Badge -->
      <UBadge
        v-if="badgeData"
        :label="badgeData.label"
        :color="active ? 'neutral' : badgeData.color"
        :variant="active ? 'outline' : 'soft'"
        size="xs"
        class="shrink-0 ml-2 transition-all duration-300"
      />
    </div>

    <!-- Tooltip for collapsed state -->
    <UTooltip
      v-if="collapsed"
      :text="item.label"
      :delay-duration="500"
    >
      <div class="absolute inset-0" />
    </UTooltip>

    <!-- Active indicator -->
    <div
      v-if="active"
      class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"
    />

    <!-- Hover effect -->
    <div
      :class=" [
        'absolute inset-0 rounded-lg transition-opacity duration-200',
        'bg-gradient-to-r from-primary-500/10 to-secondary-500/10',
        'opacity-0 group-hover:opacity-100',
        { 'opacity-0': active }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
interface NavigationItem {
  id: string
  label: string
  to: string
  icon: string
  badge?: {
    label: string
    color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  }
}

interface Props {
  item: NavigationItem
  collapsed?: boolean
  active?: boolean
  badge?: {
    label: string
    color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  }
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  active: false
})

const emit = defineEmits<{
  click: []
}>()

// Use badge from props or item
const badgeData = computed(() => {
  return props.badge || props.item.badge
})

// Handle click event
const handleClick = () => {
  emit('click')
}
</script>

<script lang="ts">
// Make it default export for better compatibility
export default {
  name: 'SidebarItem'
}
</script>

<style scoped>
/* Enhanced hover effects */
.group:hover .group-hover\:text-primary-600 {
  color: rgb(34 197 94);
}

.dark .group:hover .dark\:group-hover\:text-primary-400 {
  color: rgb(74 222 128);
}

/* Smooth badge animations */
.badge-enter-active,
.badge-leave-active {
  transition: all 0.2s ease-in-out;
}

.badge-enter-from,
.badge-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>