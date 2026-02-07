<!-- components/layout/AppSidebar.vue -->
<template>
  <div>
    <!-- Mobile Backdrop -->
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isMobileOpen && isMobile" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="closeMobile"
        aria-hidden="true" />
    </Transition>

    <!-- Sidebar -->
    <aside ref="sidebarRef"
      class="fixed inset-y-0 left-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-lg transition-all duration-300 ease-in-out flex flex-col"
      :class="[
        // Width
        (collapsed && !showExpandedContent) ? 'w-16' : 'w-64',
        // Z-index
        isMobileOpen ? 'z-50' : 'z-30',
        // Shadow on hover
        collapsed && showExpandedContent ? 'shadow-2xl' : '',
        // Mobile transform
        isMobile && !isMobileOpen ? '-translate-x-full' : 'translate-x-0',
        // Desktop always visible
        'lg:translate-x-0'
      ]" :role="isMobileOpen && isMobile ? 'dialog' : undefined"
      :aria-modal="isMobileOpen && isMobile ? 'true' : undefined"
      :aria-label="isMobileOpen && isMobile ? 'Navigasyon menüsü' : undefined" style="overflow: hidden;"
      @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <!-- Header -->
      <div class="flex items-center h-16 px-4 border-b border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shrink-0">
            S
          </div>
          <h1 class="text-lg font-semibold text-highlighted whitespace-nowrap overflow-hidden text-ellipsis">
            <span v-if="!collapsed || showExpandedContent">Sciveto</span>
          </h1>
        </div>

        <!-- Mobile Close Button -->
        <UButton v-if="isMobile && isMobileOpen" variant="ghost" size="xs" class="lg:hidden shrink-0"
          aria-label="Menüyü kapat" @click="closeMobile">
          <UIcon name="i-lucide-x" class="w-4 h-4" />
        </UButton>

        <!-- Desktop Collapse Toggle -->
        <UButton v-else variant="ghost" size="xs" class="shrink-0 ml-2" @click="handleCollapseClick"
          :aria-label="collapsed ? 'Menüyü genişlet' : 'Menüyü daralt'">
          <UIcon :name="collapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
            class="w-4 h-4 transition-transform duration-300" />
        </UButton>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        <div class="px-2 pt-4 pb-0 min-w-0">
          <div v-for="section in visibleSections" :key="section.id" class="mb-6 last:mb-0 min-w-0">
            <SidebarSection :title="section.label" :collapsed="collapsed && !showExpandedContent" />
            <div class="space-y-1 mt-2 min-w-0">
              <SidebarItem v-for="item in section.items" :key="item.to" :item="item"
                :collapsed="collapsed && !showExpandedContent" :active="isCurrentRoute(item.to)"
                @click="handleItemClick(item.to)" />
            </div>
          </div>
        </div>
      </nav>

      <!-- Footer -->
      <div class="border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 mt-auto">
        <!-- User Counter - Expanded -->
        <div v-if="authStore.isSuperAdmin && (!collapsed || showExpandedContent)"
          class="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-muted">Kullanıcılar</span>
            <span class="text-xs font-semibold text-highlighted">
              {{ authStore.userCount }}/{{ authStore.maxUsers }}
            </span>
          </div>
          <UProgress :value="authStore.userProgress" size="xs"
            :color="authStore.userProgress > 80 ? 'error' : authStore.userProgress > 60 ? 'warning' : 'primary'" />
          <p class="text-xs text-muted mt-1">
            {{ authStore.maxUsers - authStore.userCount }} kullanıcı daha eklenebilir
          </p>
        </div>

        <!-- User Counter - Collapsed -->
        <div v-if="authStore.isSuperAdmin && collapsed && !showExpandedContent"
          class="px-4 py-3 flex justify-center border-b border-neutral-100 dark:border-neutral-800">
          <UTooltip :text="`${authStore.userCount}/${authStore.maxUsers} Kullanıcı`">
            <div class="relative">
              <UIcon name="i-lucide-users" class="w-5 h-5 text-muted" />
              <span class="absolute -top-1 -right-2 text-[10px] font-bold text-primary">
                {{ authStore.userCount }}
              </span>
            </div>
          </UTooltip>
        </div>

        <!-- Actions Section -->
        <div class="p-4 pb-3">
          <div class="h-6 flex items-center mb-3">
            <span v-if="!collapsed || showExpandedContent"
              class="text-xs font-semibold text-muted uppercase tracking-wider">
              Hızlı İşlemler
            </span>
          </div>

          <div class="space-y-2">
            <!-- Theme Toggle -->
            <div class="h-10 flex items-center">
              <ThemeToggle :show-options="!collapsed || showExpandedContent"
                :show-label="!collapsed || showExpandedContent" :show-shortcuts="false" variant="ghost" size="sm"
                class="w-full h-full" :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
                @toggle="onThemeToggle" @change="onThemeChange" />
            </div>

            <!-- Quick Actions -->
            <template v-for="action in visibleQuickActions" :key="action.id">
              <div class="h-10 flex items-center">
                <UButton :color="action.color" variant="ghost" size="sm" class="w-full h-full flex items-center"
                  :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
                  @click="action.action">
                  <UIcon :name="action.icon" class="w-4 h-4 shrink-0" />
                  <span v-if="!collapsed || showExpandedContent" class="text-sm ml-3">
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
            <UButton variant="ghost" size="sm" class="w-full h-full group flex items-center"
              :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'"
              @click="handleUserMenuClick">
              <div class="relative shrink-0">
                <UAvatar :src="authStore.user?.avatar" :alt="authStore.fullName" size="xs"
                  :ui="{ fallback: 'bg-primary-500 dark:bg-primary-400 text-white' }">
                  {{ authStore.userInitials }}
                </UAvatar>
                <span v-if="authStore.user?.isOnline"
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-neutral-900 rounded-full" />
              </div>

              <div v-if="!collapsed || showExpandedContent" class="flex-1 text-left ml-3 min-w-0">
                <div class="text-sm font-medium text-highlighted truncate">{{ authStore.fullName }}</div>
                <div class="text-xs text-muted truncate">{{ roleLabel }}</div>
              </div>

              <UIcon v-if="!collapsed || showExpandedContent"
                class="w-4 h-4 text-muted group-hover:text-highlighted ml-auto shrink-0"
                name="i-lucide-more-horizontal" />
            </UButton>
          </div>

          <!-- Logout -->
          <div class="mt-2">
            <UButton variant="ghost" color="error" size="sm" class="w-full flex items-center"
              :class="collapsed && !showExpandedContent ? 'justify-center' : 'justify-start'" @click="handleLogout">
              <UIcon name="i-lucide-log-out" class="w-4 h-4 shrink-0" />
              <span v-if="!collapsed || showExpandedContent" class="ml-3">
                Çıkış Yap
              </span>
            </UButton>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import SidebarSection from './SidebarSection.vue'
import SidebarItem from './SidebarItem.vue'
import { useThrottleFn, onKeyStroke } from '@vueuse/core'

interface NavigationItem {
  id: string
  label: string
  to: string
  icon: string
  badge?: { label: string; color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' }
  children?: NavigationItem[]
  roles?: string[]
}

interface NavigationSection {
  id: string
  label: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  items: NavigationItem[]
  roles?: string[]
}

interface QuickAction {
  id: string
  label: string
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  action: () => void
  roles?: string[]
}

const props = withDefaults(defineProps<{
  collapsed?: boolean
}>(), {
  collapsed: false
})

const emit = defineEmits<{
  close: []
  signOut: []
  'update:collapsed': [value: boolean]
}>() 

const visibleQuickActions = computed(() => {
  return quickActions.filter(action => {
    if (!action.roles || action.roles.length === 0) return true
    return authStore.hasAnyRole(action.roles)
  })
})


watch(() => props.collapsed, (newVal) => {
  console.log('[AppSidebar] 📥 Prop changed:', newVal)
})
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const sidebarRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const isMobile = ref(false)
const isMobileOpen = ref(false)

const showExpandedContent = computed(() => isHovered.value && !isMobile.value)

// Throttled resize handler
const checkMobile = useThrottleFn(() => {
  isMobile.value = window.innerWidth < 1024
}, 200)

// Close mobile sidebar
const closeMobile = () => {
  isMobileOpen.value = false
}

// Handle collapse click - BURAYA EKLE
const handleCollapseClick = () => {
  console.log('[AppSidebar] 🔴 Click!')
  console.log('[AppSidebar] Current:', props.collapsed)
  console.log('[AppSidebar] New:', !props.collapsed)
  emit('update:collapsed', !props.collapsed)
}

// Handle navigation item click
const handleItemClick = (to: string) => {
  router.push(to)
  if (isMobile.value) {
    closeMobile()
  }
}
// Expose toggle for AppHeader
defineExpose({
  toggleMobile: () => {
    isMobileOpen.value = !isMobileOpen.value
  }
})

// Escape key handler for mobile
onKeyStroke('Escape', (e) => {
  if (isMobileOpen.value && isMobile.value) {
    e.preventDefault()
    closeMobile()
  }
})

// Focus trap for mobile
watchEffect(() => {
  if (isMobileOpen.value && isMobile.value && sidebarRef.value) {
    // Focus first focusable element
    const focusable = sidebarRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length > 0) {
      (focusable[0] as HTMLElement).focus()
    }
  }
})

// Role labels
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

// Navigation sections
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
      { id: 'inventory', label: 'Stok Yönetimi', to: '/inventory', icon: 'i-lucide-package' },
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
      { id: 'suppliers', label: 'Tedarikçiler', to: '/suppliers', icon: 'i-lucide-truck', roles: ['ORGANIZATION_OWNER', 'PROCUREMENT_MANAGER'] },
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

const visibleSections = computed(() => {
  return navigationSections
    .filter(section => {
      if (!section.roles || section.roles.length === 0) return true
      return authStore.hasAnyRole(section.roles)
    })
    .map(section => ({
      ...section,
      items: section.items.filter(item => {
        if (!item.roles || item.roles.length === 0) return true
        return authStore.hasAnyRole(item.roles)
      })
    }))
    .filter(section => section.items.length > 0)
})

// Quick actions
const quickActions: QuickAction[] = [
  {
    id: 'search',
    label: 'Hızlı Arama',
    icon: 'i-lucide-search',
    color: 'neutral',
    action: () => console.log('Open search modal')
  },
  {
    id: 'new-order',
    label: 'Yeni Sipariş',
    icon: 'i-lucide-plus',
    color: 'primary',
    roles: ['ORGANIZATION_OWNER', 'PROCUREMENT_MANAGER'],
    action: () => router.push('/procurement/orders/new')
  },
  {
    id: 'add-employee',
    label: 'Çalışan Ekle',
    icon: 'i-lucide-user-plus',
    color: 'success',
    roles: ['ORGANIZATION_OWNER', 'HR_MANAGER'],
    action: () => router.push('/hr/employees/new')
  }
]
watch(() => props.collapsed, (newVal) => {
  console.log('[AppSidebar] 📥 Prop changed:', newVal)
})
const isCurrentRoute = (to: string) => {
  return route.path === to || route.path.startsWith(to + '/')
}

const handleUserMenuClick = () => {
  router.push('/profile')
}

const handleLogout = () => {
  authStore.logout()
  if (isMobile.value) {
    closeMobile()
  }
}

const onMouseEnter = () => {
  if (props.collapsed && !isMobile.value) {
    isHovered.value = true
  }
}

const onMouseLeave = () => {
  if (props.collapsed && !isMobile.value) {
    isHovered.value = false
  }
}

const onThemeToggle = () => {
  console.log('[AppSidebar] Theme toggled')
}

const onThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
  console.log('Theme changed to:', newTheme)
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgb(212 212 212);
  border-radius: 2px;
  transition: background-color 0.2s ease-in-out;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(163 163 163);
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgb(82 82 82);
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(115 115 115);
}

.-translate-x-full {
  transform: translateX(-100%);
}

.translate-x-0 {
  transform: translateX(0);
}
</style>