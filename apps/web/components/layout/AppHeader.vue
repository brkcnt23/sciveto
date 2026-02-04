<!-- components/layout/AppHeader.vue - Organization & User Header -->
<template>
  <header class="sticky top-0 z-50 h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm">
    <div class="h-full px-4 flex items-center justify-between">
      <!-- Left: Organization Info -->
      <div class="flex items-center gap-3">
        <!-- Mobile Sidebar Toggle -->
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          class="lg:hidden"
          icon="i-lucide-menu"
          @click="$emit('toggle-sidebar')"
        />
        
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
        <!-- Search (placeholder) -->
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
import { computed } from 'vue'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useAuthStore } from '~/stores/auth'

// Props
defineProps<{
  notificationCount?: number
}>()

// Emits
defineEmits<{
  'toggle-sidebar': []
}>()

// Auth Store
const authStore = useAuthStore()

// Computed
const orgInitial = computed(() => {
  return authStore.orgName?.charAt(0).toUpperCase() || 'S'
})

// User menu items for dropdown
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

// Role helpers
const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    'ORGANIZATION_OWNER': 'Yönetici',
    'ORG_ADMIN': 'Yönetici',
    'PROCUREMENT_MANAGER': 'Satın Alma',
    'ACCOUNTANT': 'Muhasebe',
    'PRODUCTION_MANAGER': 'Üretim Müd.',
    'HR_MANAGER': 'İK Sorumlusu',
    'WAREHOUSE_SUPERVISOR': 'Depo Sorumlusu',
    'PRODUCTION_SUPERVISOR': 'İmalat Şefi'
  }
  return labels[role] || role
}

const getRoleBadgeColor = (role: string) => {
  const colors: Record<string, 'primary' | 'success' | 'warning' | 'info' | 'error' | 'neutral'> = {
    'ORGANIZATION_OWNER': 'primary',
    'ORG_ADMIN': 'primary',
    'PROCUREMENT_MANAGER': 'info',
    'ACCOUNTANT': 'success',
    'PRODUCTION_MANAGER': 'warning',
    'HR_MANAGER': 'neutral',
    'WAREHOUSE_SUPERVISOR': 'info',
    'PRODUCTION_SUPERVISOR': 'warning'
  }
  return colors[role] || 'neutral'
}
</script>