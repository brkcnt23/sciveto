<!-- components/ThemeToggle.vue -->
<template>
  <UPopover v-if="showOptions" :popper="{ placement: 'bottom-end' }">
    <UButton
      :variant="variant"
      :color="color"
      :size="size"
      :loading="state.isTransitioning"
      :disabled="disabled"
      :class="buttonClass"
      :aria-label="ariaLabel"
      v-bind="buttonProps"
    >
      <UIcon 
        :name="currentIcon" 
        :class="iconClass"
      />
      <span v-if="showLabel" class="ml-2">{{ currentLabel }}</span>
      <UIcon 
        v-if="showOptions && !hideChevron" 
        name="i-lucide-chevron-down" 
        class="w-3 h-3 ml-1 opacity-60"
      />
    </UButton>

    <template #panel>
      <div class="p-2 w-48">
        <div class="space-y-1">
          <UButton
            v-for="option in themeOptions"
            :key="option.value"
            :variant="state.preference === option.value ? 'soft' : 'ghost'"
            :color="state.preference === option.value ? color : 'neutral'"
            size="sm"
            block
            justify="start"
            @click="() => handleThemeChange(option.value)"
            class="group"
          >
            <UIcon 
              :name="option.icon" 
              class="w-4 h-4 mr-3 group-hover:scale-110 transition-transform"
              :class="option.iconClass"
            />
            <div class="flex-1 text-left">
              <div class="text-sm font-medium">{{ option.label }}</div>
              <div class="text-xs text-muted">{{ option.description }}</div>
            </div>
            <UIcon 
              v-if="state.preference === option.value"
              name="i-lucide-check" 
              class="w-4 h-4 ml-2 text-primary-500"
            />
          </UButton>
        </div>
        
        <div v-if="showShortcuts" class="border-t border-neutral-200 dark:border-neutral-700 mt-2 pt-2">
          <div class="text-xs text-muted px-2 py-1">
            <div class="font-medium mb-1">Keyboard Shortcuts:</div>
            <div class="space-y-0.5">
              <div><kbd>⌘ ⇧ T</kbd> Toggle</div>
              <div><kbd>⌘ ⇧ L</kbd> Light</div>
              <div><kbd>⌘ ⇧ D</kbd> Dark</div>
              <div><kbd>⌘ ⇧ A</kbd> Auto</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UPopover>

  <UButton
    v-else
    :variant="variant"
    :color="color"
    :size="size"
    :loading="state.isTransitioning"
    :disabled="disabled"
    :class="buttonClass"
    :aria-label="ariaLabel"
    @click="handleToggle"
    v-bind="buttonProps"
  >
    <UIcon 
      :name="currentIcon" 
      :class="iconClass"
    />
    <span v-if="showLabel" class="ml-2">{{ currentLabel }}</span>
  </UButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '~/composables/useTheme'
import type { ThemeConfig, ThemeEvents } from '~/composables/useTheme'

interface Props {
  // Appearance
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  // Behavior
  showOptions?: boolean
  showLabel?: boolean
  showShortcuts?: boolean
  hideChevron?: boolean
  disabled?: boolean
  
  // Styling
  class?: string
  iconClass?: string
  buttonClass?: string
  
  // Theme config override
  themeConfig?: Partial<ThemeConfig>
  themeEvents?: Partial<ThemeEvents>
  
  // Button props passthrough
  [key: string]: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  color: 'neutral',
  size: 'md',
  showOptions: false,
  showLabel: false,
  showShortcuts: true,
  hideChevron: false,
  disabled: false,
  class: '',
  iconClass: 'w-5 h-5',
  buttonClass: ''
})

const emit = defineEmits<{
  beforeChange: [theme: 'light' | 'dark']
  afterChange: [theme: 'light' | 'dark']
  toggle: []
  change: [theme: 'light' | 'dark' | 'auto']
}>()

// Use theme composable with props config
const { state, toggle, setTheme } = useTheme(
  props.themeConfig,
  {
    onBeforeChange: (theme: 'light' | 'dark') => emit('beforeChange', theme),
    onAfterChange: (theme: 'light' | 'dark') => emit('afterChange', theme),
    ...props.themeEvents
  }
)

// Theme options for dropdown
const themeOptions = computed(() => [
  {
    value: 'light' as const,
    label: 'Light',
    description: 'Light mode',
    icon: 'i-lucide-sun',
    iconClass: 'text-amber-500'
  },
  {
    value: 'dark' as const,
    label: 'Dark', 
    description: 'Dark mode',
    icon: 'i-lucide-moon',
    iconClass: 'text-blue-400'
  },
  {
    value: 'auto' as const,
    label: 'System',
    description: 'Use system setting',
    icon: 'i-lucide-monitor',
    iconClass: 'text-neutral-500'
  }
])

// Current theme display
const currentThemeOption = computed(() => {
  return themeOptions.value.find(option => option.value === state.value.preference) || themeOptions.value[0]
})

const currentIcon = computed(() => {
  if (state.value.preference === 'auto') {
    return state.value.isSystemDark ? 'i-lucide-moon' : 'i-lucide-sun'
  }
  return currentThemeOption.value.icon
})

const currentLabel = computed(() => {
  if (state.value.preference === 'auto') {
    return `System (${state.value.current})`
  }
  return currentThemeOption.value.label
})

const ariaLabel = computed(() => {
  if (props.showOptions) {
    return `Current theme: ${currentLabel.value}. Click to open theme options`
  }
  return `Toggle theme. Current: ${state.value.current}`
})

// Extract button props (exclude our custom props)
const buttonProps = computed(() => {
  const {
    variant,
    color, 
    size,
    showOptions,
    showLabel,
    showShortcuts,
    hideChevron,
    disabled,
    class: className,
    iconClass,
    buttonClass,
    themeConfig,
    themeEvents,
    ...rest
  } = props
  
  return rest
})

// Handlers
const handleToggle = async () => {
  emit('toggle')
  await toggle()
}

const handleThemeChange = async (newTheme: 'light' | 'dark' | 'auto') => {
  emit('change', newTheme)
  await setTheme(newTheme)
}

// Keyboard shortcut hint
const shortcutHint = computed(() => {
  if (process.client && navigator.platform.includes('Mac')) {
    return '⌘ ⇧ T'
  }
  return 'Ctrl + Shift + T'
})
</script>