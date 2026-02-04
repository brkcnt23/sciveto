<!-- components/layout/AppSidebar.vue - Role-based Navigation with User Counter -->
<template>
  <aside 
    class="fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-lg transition-width duration-300 ease-in-out flex flex-col"
    :class="[
      (collapsed && !showExpandedContent) ? 'w-16' : 'w-64',
      collapsed && showExpandedContent ? 'shadow-2xl z-60' : ''
    ]"
    style="overflow: hidden;"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Header -->
    <div class="flex items-center h-16 px-4 border-b border-neutral-200 dark:border-neutral-800">
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shrink-0">
          S
        </div>
        <h1 
          class="text-lg font-semibold text-highlighted whitespace-nowrap overflow-hidden text-ellipsis"
        >
          <span v-if="!collapsed || showExpandedContent">Sciveto</span>
        </h1>
      </div>
      
      <!-- Collapse Toggle - Always visible -->
      <UButton
        variant="ghost"
        size="xs"
        class="shrink-0 ml-2"
        @click="$emit('update:collapsed', !collapsed)"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <UIcon 
          :name="collapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'" 
          class="w-4 h-4 transition-transform duration-300"
        />
      </UButton>
    </div>

    <!-- Navigation - Role Based -->
    <nav class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
      <div class="px-2 pt-4 pb-0 min-w-0">
        <div v-for="section in visibleSections" :key="section.id" class="mb-6 last:mb-0 min-w-0">
          <SidebarSection :title="section.label" :collapsed="collapsed && !showExpandedContent" />
          <div class="space-y-1 mt-2 min-w-0">
            <SidebarItem
              v-for="item in section.items"
              :key="item.to"
              :item="item"
              :collapsed="collapsed && !showExpandedContent"
              :active="isCurrentRoute(item.to)"
              @click="$router.push(item.to)"
            />
          </div>
        </div>
      </div>
    </nav>

    <!-- Fixed Footer - Always at bottom -->
    <div class="border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 mt-auto">
      <!-- User Counter - Only for ORGANIZATION_OWNER -->
      <div 
        v-if="authStore.isSuperAdmin && (!collapsed || showExpandedContent)"
        class="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-muted">Kullanıcılar</span>
          <span class="text-xs font-semibold text-highlighted">
            {{ authStore.userCount }}/{{ authStore.maxUsers }}
          </span>
        </div>
        <UProgress 
          :value="authStore.userProgress" 
          size="xs"
          :color="authStore.userProgress > 80 ? 'error' : authStore.userProgress > 60 ? 'warning' : 'primary'"
        />
        <p class="text-xs text-muted mt-1">
          {{ authStore.maxUsers - authStore.userCount }} kullanıcı daha eklenebilir
        </p>
      </div>

      <!-- User Counter - Collapsed state icon only -->
      <div 
        v-if="authStore.isSuperAdmin && collapsed && !showExpandedContent"
        class="px-4 py-3 flex justify-center border-b border-neutral-100 dark:border-neutral-800"
      >
        <UTooltip :text="`${authStore.userCount}/${authStore.maxUsers} Kullanıcı`">
          <div class="relative">
            <UIcon name="i-lucide-users" class="w-5 h-5 text-muted" />
            <span 
              class="absolute -top-1 -right-2 text-[10px] font-bold text-primary"
            >
              {{ authStore.userCount }}
            </span>
          </div>
        </UTooltip>
      </div>

      <!-- Actions Section (Theme + Quick Actions) -->
      <div class="p-4 pb-3">
        <!-- Actions Title - Always same height -->
        <div class="h-6 flex items-center mb-3">
          <span 
            v-if="!collapsed || showExpandedContent"
            class="text-xs font-semibold text-muted uppercase tracking-wider"
          >
            Hızlı İşlemler
          </span>
        </div>
        
        <!-- Actions Buttons - Fixed layout -->
        <div class="space-y-2">
          <!-- Theme Toggle -->
          <div class="h-10 flex items-center">
            <ThemeToggle 
              :show-options="!collapsed || showExpandedContent"
              :show-label="!collapsed || showExpandedContent"
              :show-shortcuts="false"
              variant="ghost"
              size="sm"
              class="w-full h-full"
              :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
              @toggle="onThemeToggle"
              @change="onThemeChange"
            />
          </div>
          
          <!-- Quick Actions - Role based -->
          <template v-for="action in visibleQuickActions" :key="action.id">
            <div class="h-10 flex items-center">
              <UButton
                :color="action.color"
                variant="ghost"
                size="sm"
                class="w-full h-full flex items-center"
                :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
                @click="action.action"
              >
                <UIcon 
                  :name="action.icon" 
                  class="w-4 h-4 shrink-0"
                />
                <span 
                  v-if="!collapsed || showExpandedContent"
                  class="text-sm ml-3"
                >
                  {{ action.label }}
                </span>
              </UButton>
            </div>
          </template>
        </div>
      </div>

      <!-- User Section -->
      <div class="border-t border-neutral-100 dark:border-neutral-800 p-4">
        <div class="h-12 flex items-center">
          <UButton
            variant="ghost"
            size="sm"
            class="w-full h-full group flex items-center"
            :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
            @click="handleUserMenuClick"
          >
            <!-- Avatar with Online Status -->
            <div class="relative shrink-0">
              <UAvatar
                :src="authStore.user?.avatar"
                :alt="authStore.fullName"
                size="xs"
                :ui="{ fallback: 'bg-primary-500 dark:bg-primary-400 text-white' }"
              >
                {{ authStore.userInitials }}
              </UAvatar>
              <!-- Online indicator -->
              <span 
                v-if="authStore.user?.isOnline"
                class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-neutral-900 rounded-full"
              />
            </div>
            
            <div 
              v-if="!collapsed || showExpandedContent"
              class="flex-1 text-left ml-3 min-w-0"
            >
              <div class="text-sm font-medium text-highlighted truncate">{{ authStore.fullName }}</div>
              <div class="text-xs text-muted truncate">{{ roleLabel }}</div>
            </div>
            
            <UIcon 
              v-if="!collapsed || showExpandedContent"
              class="w-4 h-4 text-muted group-hover:text-highlighted ml-auto shrink-0"
              name="i-lucide-more-horizontal" 
            />
          </UButton>
        </div>
        
        <!-- Logout Button -->
        <div class="mt-2">
          <UButton
            variant="ghost"
            color="error"
            size="sm"
            class="w-full flex items-center"
            :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
            @click="handleLogout"
          >
            <UIcon name="i-lucide-log-out" class="w-4 h-4 shrink-0" />
            <span v-if="!collapsed || showExpandedContent" class="ml-3">
              Çıkış Yap
            </span>
          </UButton>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import SidebarSection from './SidebarSection.vue'
import SidebarItem from './SidebarItem.vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

// NavigationItem arayüzünü SidebarItem.vue ile uyumlu hale getiriyoruz
interface NavigationItem {
  id: string
  label: string
  to: string
  icon: string
  badge?: { label: string; color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' }
  children?: NavigationItem[]
  roles?: string[] // Which roles can see this item (empty = all roles)
}

interface NavigationSection {
  id: string
  label: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  items: NavigationItem[]
  roles?: string[] // Which roles can see this section (empty = all roles)
}

interface QuickAction {
  id: string
  label: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  action: () => void
  roles?: string[] // Which roles can see this action (empty = all roles)
}

// Props
const props = withDefaults(defineProps<{
  collapsed?: boolean
}>(), {
  collapsed: false
})

// Emits
defineEmits<{
  close: []
  signOut: []
  'update:collapsed': [value: boolean]
}>()

// Composables
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isHovered = ref(false)

// Computed properties
const showExpandedContent = computed(() => isHovered.value)

// Role labels in Turkish
const roleLabels: Record<string, string> = {
  'ORGANIZATION_OWNER': 'Organizasyon Sahibi',
  'ORG_ADMIN': 'Organizasyon Sahibi',
  'PROCUREMENT_MANAGER': 'Satın Alma Müdürü',
  'ACCOUNTANT': 'Muhasebeci',
  'PRODUCTION_MANAGER': 'Üretim Müdürü',
  'HR_MANAGER': 'İK Müdürü',
  'WAREHOUSE_SUPERVISOR': 'Depo Sorumlusu',
  'PRODUCTION_SUPERVISOR': 'Üretim Sorumlusu'
}

const roleLabel = computed(() => {
  const role = authStore.user?.role || ''
  return roleLabels[role] || role
})

// Navigation data - Role-based for ERP
const navigationSections: NavigationSection[] = [
  {
    id: 'main',
    label: 'Ana Menü',
    icon: 'i-lucide-layout-grid',
    color: 'primary',
    items: [
      { id: 'dashboard', label: 'Gösterge Paneli', to: '/dashboard', icon: 'i-lucide-home' },
      { id: 'analytics', label: 'Raporlar', to: '/analytics', icon: 'i-lucide-bar-chart-3' }
    ]
  },
  {
    id: 'production',
    label: 'Üretim',
    icon: 'i-lucide-factory',
    color: 'success',
    roles: ['ORGANIZATION_OWNER', 'PRODUCTION_MANAGER', 'PRODUCTION_SUPERVISOR'],
    items: [
      { id: 'production-orders', label: 'Üretim Emirleri', to: '/production/orders', icon: 'i-lucide-clipboard-list' },
      { id: 'production-planning', label: 'Üretim Planlama', to: '/production/planning', icon: 'i-lucide-calendar-days', roles: ['ORGANIZATION_OWNER', 'PRODUCTION_MANAGER'] },
      { id: 'production-tracking', label: 'Üretim Takibi', to: '/production/tracking', icon: 'i-lucide-activity' },
      { id: 'quality-control', label: 'Kalite Kontrol', to: '/production/quality', icon: 'i-lucide-shield-check' }
    ]
  },
  {
    id: 'warehouse',
    label: 'Depo & Stok',
    icon: 'i-lucide-warehouse',
    color: 'warning',
    roles: ['ORGANIZATION_OWNER', 'WAREHOUSE_SUPERVISOR', 'PROCUREMENT_MANAGER'],
    items: [
      { id: 'inventory', label: 'Stok Yönetimi', to: '/warehouse/inventory', icon: 'i-lucide-package' },
      { id: 'stock-movements', label: 'Stok Hareketleri', to: '/warehouse/movements', icon: 'i-lucide-truck' },
      { id: 'warehouses', label: 'Depolar', to: '/warehouse/locations', icon: 'i-lucide-building-2', roles: ['ORGANIZATION_OWNER', 'WAREHOUSE_SUPERVISOR'] }
    ]
  },
  {
    id: 'procurement',
    label: 'Satın Alma',
    icon: 'i-lucide-shopping-cart',
    color: 'secondary',
    roles: ['ORGANIZATION_OWNER', 'PROCUREMENT_MANAGER', 'ACCOUNTANT'],
    items: [
      { id: 'suppliers', label: 'Tedarikçiler', to: '/procurement/suppliers', icon: 'i-lucide-users' },
      { id: 'purchase-orders', label: 'Satın Alma Siparişleri', to: '/procurement/orders', icon: 'i-lucide-file-text' },
      { id: 'purchase-requests', label: 'Talep Yönetimi', to: '/procurement/requests', icon: 'i-lucide-inbox', badge: { label: '5', color: 'warning' } }
    ]
  },
  {
    id: 'hr',
    label: 'İnsan Kaynakları',
    icon: 'i-lucide-users',
    color: 'primary',
    roles: ['ORGANIZATION_OWNER', 'HR_MANAGER'],
    items: [
      { id: 'employees', label: 'Çalışanlar', to: '/hr/employees', icon: 'i-lucide-contact' },
      { id: 'attendance', label: 'Puantaj', to: '/hr/attendance', icon: 'i-lucide-clock' },
      { id: 'shifts', label: 'Vardiya Yönetimi', to: '/hr/shifts', icon: 'i-lucide-calendar-clock' }
    ]
  },
  {
    id: 'finance',
    label: 'Finans',
    icon: 'i-lucide-banknote',
    color: 'error',
    roles: ['ORGANIZATION_OWNER', 'ACCOUNTANT'],
    items: [
      { id: 'invoices', label: 'Faturalar', to: '/finance/invoices', icon: 'i-lucide-receipt' },
      { id: 'payments', label: 'Ödemeler', to: '/finance/payments', icon: 'i-lucide-credit-card' },
      { id: 'reports', label: 'Finansal Raporlar', to: '/finance/reports', icon: 'i-lucide-pie-chart', roles: ['ORGANIZATION_OWNER', 'ACCOUNTANT'] }
    ]
  },
  {
    id: 'settings',
    label: 'Yönetim',
    icon: 'i-lucide-settings',
    color: 'primary',
    roles: ['ORGANIZATION_OWNER'],
    items: [
      { id: 'users', label: 'Kullanıcılar', to: '/settings/users', icon: 'i-lucide-user-cog' },
      { id: 'organization', label: 'Organizasyon', to: '/settings/organization', icon: 'i-lucide-building' },
      { id: 'integrations', label: 'Entegrasyonlar', to: '/settings/integrations', icon: 'i-lucide-plug' }
    ]
  }
]

// Filter sections and items based on user role
const visibleSections = computed(() => {
  return navigationSections
    .filter(section => {
      // If section has no role restriction, show to all
      if (!section.roles || section.roles.length === 0) return true
      // Check if user has any of the required roles
      return authStore.hasAnyRole(section.roles)
    })
    .map(section => ({
      ...section,
      items: section.items.filter(item => {
        // If item has no role restriction, show to all
        if (!item.roles || item.roles.length === 0) return true
        // Check if user has any of the required roles
        return authStore.hasAnyRole(item.roles)
      })
    }))
    .filter(section => section.items.length > 0) // Remove empty sections
})

// Quick actions - Role based
const quickActions: QuickAction[] = [
  {
    id: 'search',
    label: 'Hızlı Arama',
    icon: 'i-lucide-search',
    color: 'neutral',
    action: () => {
      console.log('Open search modal')
    }
  },
  {
    id: 'new-order',
    label: 'Yeni Sipariş',
    icon: 'i-lucide-plus',
    color: 'primary',
    roles: ['ORGANIZATION_OWNER', 'PROCUREMENT_MANAGER'],
    action: () => {
      router.push('/procurement/orders/new')
    }
  },
  {
    id: 'add-employee',
    label: 'Çalışan Ekle',
    icon: 'i-lucide-user-plus',
    color: 'success',
    roles: ['ORGANIZATION_OWNER', 'HR_MANAGER'],
    action: () => {
      router.push('/hr/employees/new')
    }
  }
]

// Filter quick actions based on user role
const visibleQuickActions = computed(() => {
  return quickActions.filter(action => {
    if (!action.roles || action.roles.length === 0) return true
    return authStore.hasAnyRole(action.roles)
  })
})

// Methods
const isCurrentRoute = (to: string) => {
  return route.path === to || route.path.startsWith(to + '/')
}

const handleUserMenuClick = () => {
  router.push('/profile')
}

// Logout handler
const handleLogout = () => {
  authStore.logout()
}

// Mouse events
const onMouseEnter = () => {
  if (props.collapsed) {
    isHovered.value = true
  }
}

const onMouseLeave = () => {
  if (props.collapsed) {
    isHovered.value = false
  }
}

// Theme event handlers
const onThemeToggle = () => {
  console.log('[AppSidebar] Theme toggled')
}

const onThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
  console.log('Theme changed to:', newTheme)
}
</script>

<style scoped>
/* Modern scrollbar - Theme aware */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgb(212 212 212); /* neutral-300 */
  border-radius: 2px;
  transition: background-color 0.2s ease-in-out;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(163 163 163); /* neutral-400 */
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgb(82 82 82); /* neutral-600 */
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(115 115 115); /* neutral-500 */
}

/* Enhanced transitions for theme switching and sidebar animation */
.transition-width {
  transition: width 0.3s ease-in-out;
}

/* Flexbox layout for sidebar */
.flex-col {
  display: flex;
  flex-direction: column;
}

/* Ensure consistent heights and prevent layout shifting */
.h-8 { height: 2rem !important; }
.h-12 { height: 3rem !important; }
.h-16 { height: 4rem !important; }

/* Prevent content jumping during transitions */
.w-16 {
  width: 4rem !important;
  min-width: 4rem !important;
  max-width: 4rem !important;
}

.w-64 {
  width: 16rem !important;
  min-width: 16rem !important;
  max-width: 16rem !important;
}

/* Higher z-index for hover state */
.z-60 {
  z-index: 60;
}
</style>