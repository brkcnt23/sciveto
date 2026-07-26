<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Stok Yönetimi</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Ürünlerinizi takip edin</p>
        </div>
        <UButton color="primary" size="lg" icon="i-lucide-plus" @click="showCreateModal = true">
          Ürün Ekle
        </UButton>
      </div>
    </div>

       <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <UIcon name="i-lucide-package" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Toplam</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalItems }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Stokta</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.inStock }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <UIcon name="i-lucide-alert-triangle" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Azalan</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ stats.lowStock }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <UIcon name="i-lucide-x-circle" class="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Tükendi</p>
            <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.outOfStock }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <USkeleton class="h-40" />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="items.length === 0" class="text-center py-16">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
        <UIcon name="i-lucide-package-open" class="w-10 h-10 text-gray-400" />
      </div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Henüz ürün yok</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">İlk ürünü ekleyin</p>
      <UButton color="primary" size="lg" icon="i-lucide-plus" @click="showCreateModal = true">
        İlk Ürünü Ekle
      </UButton>
    </div>

    <!-- Products Grid -->
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <div 
          v-for="item in items" 
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          @click="navigateTo(`/inventory/${item.id}`)"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-box" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </div>
            <UBadge :color="getStockBadgeColor(item.quantity, item.minQuantity)" size="xs">
              {{ getStockLabel(item.quantity, item.minQuantity) }}
            </UBadge>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ item.name }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4 truncate">{{ item.code || 'Kod yok' }}</p>
          <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Stok</p>
              <p :class="getStockColor(item.quantity, item.minQuantity)" class="font-bold">
                {{ item.quantity }} {{ item.unit }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500 dark:text-gray-400">Fiyat</p>
              <p class="font-semibold text-gray-900 dark:text-white">{{ formatPrice(item.sellingPrice) }}</p>
            </div>
          </div>
        </div>
      </div>
<!-- Pagination -->
      <div class="flex items-center justify-center gap-4">
        <UButton :disabled="page <= 1" variant="outline" icon="i-lucide-chevron-left" @click="changePage(page - 1)">
          Önceki
        </UButton>
        <span class="text-sm text-gray-600 dark:text-gray-400">Sayfa {{ page }} / {{ totalPages }}</span>
        <UButton :disabled="page >= totalPages" variant="outline" icon="i-lucide-chevron-right" @click="changePage(page + 1)">
          Sonraki
        </UButton>
      </div>
    </div>

    <!-- Create Modal -->
    <UModal v-model="showCreateModal">
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UIcon name="i-lucide-plus" class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">Yeni Ürün</h3>
              <p class="text-sm text-gray-500">Bilgileri girin</p>
            </div>
          </div>
        </template>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ürün Adı <span class="text-red-500">*</span>
            </label>
            <UInput v-model="form.name" placeholder="Örn: Somun M10" size="lg" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Miktar</label>
              <UInput v-model.number="form.quantity" type="number" placeholder="0" size="lg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Birim</label>
              <USelect v-model="form.unit" :options="unitOptions" size="lg" />
            </div>
          </div>
        </div>
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="showCreateModal = false">İptal</UButton>
            <UButton color="primary" :loading="creating" :disabled="!form.name" @click="handleCreate">
              Oluştur
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const authStore = useAuthStore()
const toast = useToast()

definePageMeta({ 
  middleware: 'auth',
  layout: 'default'
})

const loading = ref(true)
const creating = ref(false)
const showCreateModal = ref(false)
const page = ref(1)
const perPage = 24
const totalPages = ref(1)
const items = ref<any[]>([])
const stats = ref({
  totalItems: 0,
  inStock: 0,
  lowStock: 0,
  outOfStock: 0
})

const form = ref({
  name: '',
  quantity: 0,
  unit: 'pcs'
})

const unitOptions = [
  { label: 'Adet', value: 'pcs' },
  { label: 'Kilogram', value: 'kg' },
  { label: 'Metre', value: 'm' },
  { label: 'Metrekare', value: 'm2' },
  { label: 'Litre', value: 'l' }
]

const fetchData = async () => {
  loading.value = true
  try {
    const [itemsRes, statsRes] = await Promise.all([
      $fetch(`${config.public.apiBase}/inventory`, {
        headers: { Authorization: `Bearer ${authStore.token}` },
        params: { page: page.value, limit: perPage }
      }),
      $fetch(`${config.public.apiBase}/inventory/stats/summary`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      })
    ])
    
    items.value = (itemsRes as any).data || []
    totalPages.value = (itemsRes as any).pagination?.pages || 1
    stats.value = (statsRes as any).data
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Hata',
      description: 'Veriler yüklenemedi',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const handleCreate = async () => {
  creating.value = true
  try {
    await $fetch(`${config.public.apiBase}/inventory`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: form.value
    })
    
    showCreateModal.value = false
    form.value = { name: '', quantity: 0, unit: 'pcs' }
    
    toast.add({
      title: 'Başarılı',
      description: 'Ürün eklendi',
      color: 'success'
    })
    
    await fetchData()
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Hata',
      description: 'Ürün eklenemedi',
      color: 'error'
    })
  } finally {
    creating.value = false
  }
}

const changePage = (newPage: number) => {
  page.value = newPage
  fetchData()
}

const getStockBadgeColor = (qty: number, min: number = 10) => {
  if (qty <= 0) return 'error'
  if (qty <= min) return 'warning'
  return 'success'
}

const getStockLabel = (qty: number, min: number = 10) => {
  if (qty <= 0) return 'Tükendi'
  if (qty <= min) return 'Azalıyor'
  return 'Stokta'
}

const getStockColor = (qty: number, min: number = 10) => {
  if (qty <= 0) return 'text-red-600 dark:text-red-400'
  if (qty <= min) return 'text-orange-600 dark:text-orange-400'
  return 'text-green-600 dark:text-green-400'
}

const formatPrice = (price?: number) => {
  if (!price) return '-'
  return new Intl.NumberFormat('tr-TR', { 
    style: 'currency', 
    currency: 'TRY',
    minimumFractionDigits: 0
  }).format(price)
}

onMounted(() => {
  fetchData()
})
</script>