<template>
  <!-- Sidebar Container -->
  <div
    :class="[
      'fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Sidebar Content -->
    <div class="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <!-- Sidebar Header -->
      <div class="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center space-x-2">
          <UIcon name="i-lucide-layers" class="h-6 w-6 text-primary-600" />
          <span class="font-semibold">Navigation</span>
        </div>
        
        <!-- Close button for mobile -->
        <UButton
          variant="ghost"
          size="sm"
          icon="i-lucide-x"
          class="lg:hidden"
          @click="$emit('close')"
        />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
        <div v-for="section in navigation" :key="section.title" class="space-y-3">
          <!-- Section Title -->
          <h3
            v-if="section.title"
            class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            {{ section.title }}
          </h3>

          <!-- Navigation Items -->
          <div class="space-y-1">
            <template v-for="item in section.items" :key="item.to">
              <!-- Expandable Item -->
              <UCollapsible v-if="item.children" class="space-y-1">
                <template #trigger>
                  <div
                    class="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <div class="flex items-center space-x-3">
                      <UIcon :name="item.icon" class="h-4 w-4" />
                      <span>{{ item.label }}</span>
                    </div>
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="h-4 w-4 transition-transform ui-open:rotate-180"
                    />
                  </div>
                </template>

                <template #content>
                  <div class="ml-6 space-y-1">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.to"
                      :to="child.to"
                      :class="[
                        'flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors',
                        isCurrentRoute(child.to)
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                      ]"
                    >
                      <UIcon :name="child.icon" class="h-4 w-4" />
                      <span>{{ child.label }}</span>
                    </NuxtLink>
                  </div>
                </template>
              </UCollapsible>

              <!-- Regular Item -->
              <NuxtLink
                v-else
                :to="item.to"
                :class="[
                  'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isCurrentRoute(item.to)
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                ]"
              >
                <div class="flex items-center space-x-3">
                  <UIcon :name="item.icon" class="h-4 w-4" />
                  <span>{{ item.label }}</span>
                </div>
                <UBadge
                  v-if="item.badge"
                  :label="item.badge.toString()"
                  size="xs"
                />
              </NuxtLink>
            </template>
          </div>
        </div>
      </nav>

      <!-- User Info -->
      <div class="shrink-0 border-t border-gray-200 dark:border-gray-800 p-4">
        <div class="flex items-center space-x-3 px-3 py-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <UAvatar
            :src="user?.avatar"
            :alt="user?.name"
            size="sm"
          />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">
              {{ user?.name }}
            </p>
            <p class="truncate text-xs text-gray-500">
              {{ user?.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-30 bg-black/50 lg:hidden"
    @click="$emit('close')"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface NavigationSection {
  title?: string
  items: NavigationItem[]
}

interface NavigationItem {
  label: string
  to: string
  icon: string
  badge?: number
  children?: NavigationItem[]
}

interface User {
  name: string
  email: string
  avatar?: string
}

// Props
const props = defineProps<{
  navigation: NavigationSection[]
  user?: User
  isOpen: boolean
}>()

// Emits
defineEmits<{
  close: []
}>()

// Composables
const route = useRoute()

// Methods
const isCurrentRoute = (to: string) => {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>