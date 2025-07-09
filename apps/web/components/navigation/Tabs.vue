<!-- apps/web/components/navigation/Tabs.vue -->
<template>
  <div class="w-full">
    <!-- Tab Headers -->
    <div class="border-b border-stone-200">
      <nav class="flex space-x-8" :class="headerClass">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectTab(tab.id)"
          class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200"
          :class="getTabClasses(tab.id)"
        >
          <!-- Tab Icon -->
          <Icon 
            v-if="tab.icon" 
            :name="tab.icon" 
            class="w-5 h-5 mr-2"
            :class="getTabIconClasses(tab.id)"
          />
          
          <!-- Tab Title -->
          <span>{{ tab.title }}</span>
          
          <!-- Badge/Count -->
          <span 
            v-if="tab.badge || tab.count" 
            class="ml-2 py-0.5 px-2 rounded-full text-xs font-medium"
            :class="getBadgeClasses(tab.id)"
          >
            {{ tab.badge || tab.count }}
          </span>
          
          <!-- Disabled indicator -->
          <Icon 
            v-if="tab.disabled" 
            name="i-heroicons-lock-closed" 
            class="w-4 h-4 ml-2 text-slate-400"
          />
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="mt-6">
      <div 
        v-for="tab in tabs"
        :key="tab.id"
        v-show="activeTab === tab.id"
        class="transition-all duration-300"
        :class="contentClass"
      >
        <slot :name="`tab-${tab.id}`" :tab="tab">
          <div class="text-slate-600">
            No content defined for tab "{{ tab.title }}"
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true
    // Format: [{ id: 'overview', title: 'Overview', icon: 'i-heroicons-home', badge: '3', disabled: false }]
  },
  defaultTab: String,
  color: {
    type: String,
    default: 'sky'
  },
  headerClass: String,
  contentClass: String
})

const emit = defineEmits(['tab-change'])

// Active tab state
const activeTab = ref(props.defaultTab || props.tabs[0]?.id)

// Methods
const selectTab = (tabId) => {
  const tab = props.tabs.find(t => t.id === tabId)
  if (tab?.disabled) return
  
  activeTab.value = tabId
  emit('tab-change', tabId)
}

// Styling helpers
const getTabClasses = (tabId) => {
  const isActive = activeTab.value === tabId
  const tab = props.tabs.find(t => t.id === tabId)
  
  if (tab?.disabled) {
    return 'border-transparent text-slate-400 cursor-not-allowed'
  }
  
  if (isActive) {
    const activeColors = {
      sky: 'border-sky-500 text-sky-600',
      emerald: 'border-emerald-500 text-emerald-600',
      violet: 'border-violet-500 text-violet-600',
      orange: 'border-orange-500 text-orange-600',
      rose: 'border-rose-500 text-rose-600'
    }
    return activeColors[props.color] || activeColors.sky
  }
  
  return 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
}

const getTabIconClasses = (tabId) => {
  const isActive = activeTab.value === tabId
  const tab = props.tabs.find(t => t.id === tabId)
  
  if (tab?.disabled) {
    return 'text-slate-400'
  }
  
  if (isActive) {
    const activeColors = {
      sky: 'text-sky-500',
      emerald: 'text-emerald-500',
      violet: 'text-violet-500',
      orange: 'text-orange-500',
      rose: 'text-rose-500'
    }
    return activeColors[props.color] || activeColors.sky
  }
  
  return 'text-slate-400 group-hover:text-slate-500'
}

const getBadgeClasses = (tabId) => {
  const isActive = activeTab.value === tabId
  
  if (isActive) {
    const activeColors = {
      sky: 'bg-sky-100 text-sky-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      violet: 'bg-violet-100 text-violet-600',
      orange: 'bg-orange-100 text-orange-600',
      rose: 'bg-rose-100 text-rose-600'
    }
    return activeColors[props.color] || activeColors.sky
  }
  
  return 'bg-slate-100 text-slate-600'
}

// Watch for external changes
watch(() => props.defaultTab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab
  }
})
</script>