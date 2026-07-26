<!-- components/layout/AppHeader.vue -->
<template>
  <header 
    class="fixed top-0 right-0 h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-20 transition-all duration-300"
    :class="{
      'left-0 lg:left-64': !collapsed,
      'left-0 lg:left-16': collapsed
    }"
  >
    <div class="h-full px-4 flex items-center justify-between gap-4">
      <!-- Mobile Hamburger -->
      <button
        @click="emit('toggle-sidebar')"
        class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Menüyü aç"
      >
        <UIcon name="i-lucide-menu" class="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
      </button>

      <!-- Left: Organization Info -->
      <div class="flex items-center gap-3 flex-1">
        <!-- Organization Badge -->
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            {{ orgInitial }}
          </div>
          <div class="hidden sm:block">
            <h1 class="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
              {{ authStore.orgName }}
            </h1>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              {{ authStore.orgCode }}
            </p>
          </div>
        </div>
      </div>

      <!-- Right: Actions & User -->
      <div class="flex items-center gap-2">
        <!-- Search -->
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          icon="i-lucide-search"
          class="hidden sm:flex"
        />
        
        <!-- Theme Toggle -->
        <ClientOnly>
          <ThemeToggle 
            variant="ghost" 
            size="sm"
          />
        </ClientOnly>
        
        <!-- Notifications -->
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          icon="i-lucide-bell"
          class="relative"
        >
          <UBadge
            v-if="(notificationCount ?? 0) > 0"
            :label="(notificationCount ?? 0) > 99 ? '99+' : String(notificationCount ?? 0)"
            color="error"
            size="xs"
            class="absolute -top-1 -right-1"
          />
        </UButton>
        
        <!-- User Dropdown -->
        <UDropdownMenu :items="userMenuItems">
          <UButton variant="ghost" color="neutral" size="sm" class="gap-2 pl-2">
            <!-- Online indicator + Name -->
            <div class="flex items-center gap-2">
              <div 
                class="w-2 h-2 rounded-full"
                :class="authStore.user?.isOnline ? 'bg-green-500' : 'bg-neutral-400'"
                :title="authStore.user?.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'"
              />
              <span class="hidden md:block text-sm font-medium text-neutral-700 dark:text-neutral-300 max-w-32 truncate">
                {{ authStore.fullName }}
              </span>
            </div>
            
            <!-- Avatar -->
            <UAvatar
              :alt="authStore.fullName"
              size="xs"
              :src="authStore.user?.avatar"
              class="bg-primary text-white"
            >
              {{ authStore.userInitials }}
            </UAvatar>
            
            <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-neutral-400 hidden md:block" />
          </UButton>
        </UDropdownMenu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  notificationCount?: number
  collapsed?: boolean
}>()

const emit = defineEmits<{
  'toggle-sidebar': []
}>()

const authStore = useAuthStore()

const orgInitial = computed(() => {
  return authStore.orgName?.charAt(0).toUpperCase() || 'S'
})

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: authStore.fullName,
      avatar: {
        src: authStore.user?.avatar,
        alt: authStore.fullName,
      },
      type: 'label' as const,
    },
  ],
  [
    {
      label: 'Profil',
      icon: 'i-lucide-user',
      to: '/profile',
    },
    {
      label: 'Ayarlar',
      icon: 'i-lucide-settings',
      to: '/settings',
    },
  ],
  [
    {
      label: 'Çıkış Yap',
      icon: 'i-lucide-log-out',
      color: 'error' as const,
      onSelect: () => {
        authStore.logout()
      },
    },
  ],
])
</script>