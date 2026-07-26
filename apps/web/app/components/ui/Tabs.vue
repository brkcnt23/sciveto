<!-- apps/web/components/ui/Tabs.vue -->
<template>
  <div class="space-y-4">
    <!-- Tab Headers -->
    <div class="border-b border-neutral-200 dark:border-neutral-700">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.key || index"
          @click="setActiveTab(index)"
          :class="[
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
            activeTabIndex === index
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200'
          ]"
          :disabled="tab.disabled"
        >
          <!-- Icon -->
          <Icon
            v-if="tab.icon"
            :name="tab.icon"
            class="w-4 h-4 mr-2 inline-block"
          />
          
          <!-- Label -->
          {{ tab.label }}
          
          <!-- Badge -->
          <span
            v-if="tab.badge"
            class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            :class="
              activeTabIndex === index
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
            "
          >
            {{ tab.badge }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="relative">
      <div
        v-for="(tab, index) in tabs"
        v-show="activeTabIndex === index"
        :key="tab.key || index"
        class="tab-content opacity-100 transform translate-y-0 transition-all duration-200"
      >
        <!-- Named slot for each tab -->
        <slot
          :name="tab.key || `tab-${index}`"
          :tab="tab"
          :index="index"
          :isActive="activeTabIndex === index"
        >
          <!-- Default content -->
          <div v-if="tab.content" v-html="tab.content"></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) => {
      return tabs.every(tab => 
        typeof tab === 'object' && 
        typeof tab.label === 'string'
      )
    }
  },
  lazy: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeTabIndex = ref(props.modelValue)

const setActiveTab = (index) => {
  if (props.tabs[index]?.disabled) return
  
  activeTabIndex.value = index
  emit('update:modelValue', index)
  emit('change', {
    index,
    tab: props.tabs[index]
  })
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  activeTabIndex.value = newValue
})

// Computed for active tab
const activeTab = computed(() => {
  return props.tabs[activeTabIndex.value]
})

// Keyboard navigation
const handleKeydown = (event) => {
  const enabledTabs = props.tabs
    .map((tab, index) => ({ tab, index }))
    .filter(({ tab }) => !tab.disabled)
  
  const currentEnabledIndex = enabledTabs.findIndex(
    ({ index }) => index === activeTabIndex.value
  )
  
  let newIndex = currentEnabledIndex
  
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      newIndex = currentEnabledIndex > 0 
        ? currentEnabledIndex - 1 
        : enabledTabs.length - 1
      break
    case 'ArrowRight':
    case 'ArrowDown':
      newIndex = currentEnabledIndex < enabledTabs.length - 1 
        ? currentEnabledIndex + 1 
        : 0
      break
    case 'Home':
      newIndex = 0
      break
    case 'End':
      newIndex = enabledTabs.length - 1
      break
    default:
      return
  }
  
  event.preventDefault()
  setActiveTab(enabledTabs[newIndex].index)
}

onMounted(() => {
  // Add keyboard listeners
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Expose methods and computed
defineExpose({
  activeTabIndex: readonly(activeTabIndex),
  activeTab,
  setActiveTab
})
</script>

<style scoped>
.tab-content {
  min-height: 200px; /* Prevent layout shift */
}
</style>