<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="space-y-6">
    <!-- Welcome Banner Skeleton -->
    <USkeleton class="h-32 rounded-lg" />
    
    <!-- Stats Cards Skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <USkeleton v-for="i in 4" :key="i" class="h-28 rounded-lg" />
    </div>
    
    <!-- Content Skeleton -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <USkeleton class="h-64 rounded-lg" />
      <USkeleton class="h-64 rounded-lg lg:col-span-2" />
    </div>
  </div>
  
  <div v-else>
    <!-- Welcome Banner -->
    <div class="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-lg mb-6">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-white mb-1">
              Hoş geldin, {{ authStore.fullName }}! 👋
            </h1>
            <p class="text-primary-100">
              {{ authStore.orgName }} · {{ roleLabel }}
            </p>
          </div>
          <div class="hidden md:flex items-center gap-3">
            <span class="inline-flex items-center px-3 py-1.5 rounded-md bg-white/20 text-white text-sm font-medium">
              <UIcon name="i-lucide-building-2" class="w-4 h-4 mr-1" />
              {{ authStore.orgCode }}
            </span>
          </div>
        </div>
      </div>
    </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <!-- Üretim Emirleri -->
    <UCard>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Aktif Üretim</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">{{ stats.activeOrders }}</p>
          <p class="text-xs text-success-600 dark:text-success-400 mt-1">+3 bu hafta</p>
        </div>
        <div class="p-3 bg-success-100 dark:bg-success-900 rounded-full">
          <UIcon name="i-lucide-factory" class="w-5 h-5 text-success-600 dark:text-success-400" />
        </div>
      </div>
    </UCard>

    <!-- Stok Durumu -->
    <UCard>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Stok Kalemleri</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">{{ stats.stockItems }}</p>
          <p class="text-xs text-warning-600 dark:text-warning-400 mt-1">{{ stats.lowStock }} kritik seviye</p>
        </div>
        <div class="p-3 bg-warning-100 dark:bg-warning-900 rounded-full">
          <UIcon name="i-lucide-package" class="w-5 h-5 text-warning-600 dark:text-warning-400" />
        </div>
      </div>
    </UCard>

    <!-- Çalışanlar -->
    <UCard v-if="authStore.hasAnyRole(['ORGANIZATION_OWNER', 'HR_MANAGER'])">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Çalışanlar</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">{{ stats.employees }}</p>
          <p class="text-xs text-primary-600 dark:text-primary-400 mt-1">{{ stats.activeEmployees }} aktif</p>
        </div>
        <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
          <UIcon name="i-lucide-users" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </UCard>

    <!-- Bekleyen Siparişler -->
    <UCard v-if="authStore.hasAnyRole(['ORGANIZATION_OWNER', 'PROCUREMENT_MANAGER'])">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Bekleyen Siparişler</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">{{ stats.pendingOrders }}</p>
          <p class="text-xs text-info-600 dark:text-info-400 mt-1">₺{{ formatCurrency(stats.pendingValue) }} değerinde</p>
        </div>
        <div class="p-3 bg-info-100 dark:bg-info-900 rounded-full">
          <UIcon name="i-lucide-shopping-cart" class="w-5 h-5 text-info-600 dark:text-info-400" />
        </div>
      </div>
    </UCard>

    <!-- Kullanıcı Limiti - Sadece ORGANIZATION_OWNER -->
    <UCard v-if="authStore.isSuperAdmin">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Kullanıcılar</p>
          <p class="text-2xl font-bold text-neutral-900 dark:text-white">
            {{ authStore.userCount }}/{{ authStore.maxUsers }}
          </p>
          <UProgress 
            :value="authStore.userProgress" 
            size="xs" 
            class="mt-2"
            :color="authStore.userProgress > 80 ? 'error' : 'primary'"
          />
        </div>
        <div class="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-full">
          <UIcon name="i-lucide-user-cog" class="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </div>
      </div>
    </UCard>
  </div>

  <!-- Quick Actions & Recent Activity -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Quick Actions -->
    <div class="lg:col-span-1">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-zap" class="w-5 h-5 text-warning-500" />
            <h3 class="font-semibold text-neutral-900 dark:text-white">Hızlı İşlemler</h3>
          </div>
        </template>

        <div class="space-y-3">
          <!-- Yeni Üretim Emri -->
          <UButton
            v-if="authStore.hasAnyRole(['ORGANIZATION_OWNER', 'PRODUCTION_MANAGER'])"
            variant="soft"
            color="success"
            block
            size="lg"
            class="justify-start"
            @click="$router.push('/production/orders/new')"
          >
            <UIcon name="i-lucide-clipboard-plus" class="w-5 h-5 mr-2" />
            Yeni Üretim Emri
          </UButton>

          <!-- Stok Girişi -->
          <UButton
            v-if="authStore.hasAnyRole(['ORGANIZATION_OWNER', 'WAREHOUSE_SUPERVISOR'])"
            variant="soft"
            color="warning"
            block
            size="lg"
            class="justify-start"
            @click="$router.push('/warehouse/movements/new')"
          >
            <UIcon name="i-lucide-package-plus" class="w-5 h-5 mr-2" />
            Stok Girişi
          </UButton>

          <!-- Satın Alma Talebi -->
          <UButton
            v-if="authStore.hasAnyRole(['ORGANIZATION_OWNER', 'PROCUREMENT_MANAGER'])"
            variant="soft"
            color="primary"
            block
            size="lg"
            class="justify-start"
            @click="$router.push('/procurement/requests/new')"
          >
            <UIcon name="i-lucide-shopping-cart" class="w-5 h-5 mr-2" />
            Satın Alma Talebi
          </UButton>

          <!-- Çalışan Ekle -->
          <UButton
            v-if="authStore.hasAnyRole(['ORGANIZATION_OWNER', 'HR_MANAGER'])"
            variant="soft"
            color="info"
            block
            size="lg"
            class="justify-start"
            @click="$router.push('/hr/employees/new')"
          >
            <UIcon name="i-lucide-user-plus" class="w-5 h-5 mr-2" />
            Çalışan Ekle
          </UButton>

          <!-- Kullanıcı Ekle - Sadece ORGANIZATION_OWNER -->
          <UButton
            v-if="authStore.isSuperAdmin"
            variant="soft"
            color="neutral"
            block
            size="lg"
            class="justify-start"
            @click="$router.push('/settings/users/new')"
          >
            <UIcon name="i-lucide-user-cog" class="w-5 h-5 mr-2" />
            Kullanıcı Ekle
          </UButton>
        </div>
      </UCard>
    </div>

    <!-- Recent Activity -->
    <div class="lg:col-span-2">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-activity" class="w-5 h-5 text-primary-500" />
              <h3 class="font-semibold text-neutral-900 dark:text-white">Son Aktiviteler</h3>
            </div>
            <UButton variant="ghost" size="xs" @click="$router.push('/analytics')">
              Tümünü Gör
            </UButton>
          </div>
        </template>

        <div class="divide-y divide-neutral-200 dark:divide-neutral-700">
          <div v-for="activity in recentActivities" :key="activity.id" class="py-4 first:pt-0 last:pb-0">
            <div class="flex items-center gap-4">
              <div :class="['p-2 rounded-full', activity.bgColor]">
                <UIcon :name="activity.icon" :class="['w-4 h-4', activity.iconColor]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-neutral-900 dark:text-white truncate">
                  {{ activity.title }}
                </p>
                <p class="text-xs text-neutral-600 dark:text-neutral-400">
                  {{ activity.description }} · {{ activity.time }}
                </p>
              </div>
              <UBadge :color="activity.badgeColor" variant="subtle" size="sm">
                {{ activity.badge }}
              </UBadge>
            </div>
          </div>

          <div v-if="recentActivities.length === 0" class="py-8 text-center">
            <UIcon name="i-lucide-inbox" class="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
            <p class="text-neutral-500 dark:text-neutral-400">Henüz aktivite yok</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

// Page meta
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

// SEO
useSeoMeta({
  title: 'Gösterge Paneli - Sciveto',
  description: 'Sciveto ERP Gösterge Paneli'
})

// Composables
const authStore = useAuthStore()
const toast = useToast()

// Loading state
const isLoading = ref(true)

// Initialize on mount
onMounted(async () => {
  isLoading.value = true
  
  try {
    // Ensure auth is initialized
    await authStore.initializeAuth()
    
    // Simulate loading stats from API (replace with real API call later)
    await new Promise(resolve => setTimeout(resolve, 500))
    
  } catch (error: any) {
    console.error('Failed to load dashboard:', error)
    toast.add({
      title: 'Hata',
      description: 'Dashboard verileri yüklenemedi',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    isLoading.value = false
  }
})

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

// Mock stats - Bu veriler API'den gelecek
const stats = ref({
  activeOrders: 12,
  stockItems: 156,
  lowStock: 8,
  employees: 45,
  activeEmployees: 42,
  pendingOrders: 7,
  pendingValue: 125000
})

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('tr-TR').format(value)
}

// Mock recent activities
const recentActivities = ref([
  {
    id: 1,
    title: 'Üretim emri tamamlandı',
    description: 'PRD-2024-0145 · Ahmet Yılmaz',
    time: '2 saat önce',
    icon: 'i-lucide-check-circle',
    bgColor: 'bg-success-100 dark:bg-success-900',
    iconColor: 'text-success-600 dark:text-success-400',
    badge: 'Üretim',
    badgeColor: 'success' as const
  },
  {
    id: 2,
    title: 'Yeni stok girişi yapıldı',
    description: 'Hammadde deposu · 250 adet',
    time: '3 saat önce',
    icon: 'i-lucide-package-plus',
    bgColor: 'bg-warning-100 dark:bg-warning-900',
    iconColor: 'text-warning-600 dark:text-warning-400',
    badge: 'Depo',
    badgeColor: 'warning' as const
  },
  {
    id: 3,
    title: 'Satın alma siparişi onaylandı',
    description: 'PO-2024-0089 · ABC Tedarik',
    time: '5 saat önce',
    icon: 'i-lucide-shopping-cart',
    bgColor: 'bg-primary-100 dark:bg-primary-900',
    iconColor: 'text-primary-600 dark:text-primary-400',
    badge: 'Satın Alma',
    badgeColor: 'primary' as const
  },
  {
    id: 4,
    title: 'Yeni çalışan eklendi',
    description: 'Mehmet Demir · Üretim Departmanı',
    time: '1 gün önce',
    icon: 'i-lucide-user-plus',
    bgColor: 'bg-info-100 dark:bg-info-900',
    iconColor: 'text-info-600 dark:text-info-400',
    badge: 'İK',
    badgeColor: 'info' as const
  }
])
</script>