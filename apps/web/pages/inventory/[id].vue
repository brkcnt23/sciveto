<template>
  <div class="min-h-screen bg-default">
    <AppHeader />
    <AppSidebar />

    <main class="lg:pl-64 pt-16">
      <div class="p-6 max-w-4xl mx-auto">
        <UBreadcrumb 
          :items="[
            { label: 'Stok', to: '/inventory' },
            { label: item?.name || 'Yükleniyor...' }
          ]" 
        />

        <div v-if="loading" class="mt-6 space-y-4">
          <USkeleton class="h-32" />
          <USkeleton class="h-48" />
        </div>

        <div v-else-if="item" class="mt-6 space-y-6">
          <!-- Header Card -->
          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold">{{ item.name }}</h1>
                <p class="text-sm text-muted">{{ item.code || '—' }}</p>
              </div>
              <UButton color="primary" @click="showAdjustModal = true">
                Stok Ayarla
              </UButton>
            </div>
          </UCard>

          <!-- Info Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UCard>
              <div class="text-sm text-muted">Mevcut Stok</div>
              <div class="text-2xl font-bold">{{ item.quantity }} {{ item.unit }}</div>
            </UCard>
            <UCard>
              <div class="text-sm text-muted">Min Seviye</div>
              <div class="text-lg">{{ item.minQuantity || '-' }}</div>
            </UCard>
            <UCard>
              <div class="text-sm text-muted">Fiyat</div>
              <div class="text-lg">{{ formatPrice(item.sellingPrice) }}</div>
            </UCard>
          </div>

          <!-- Transaction History -->
          <UCard>
            <h3 class="font-semibold mb-4">İşlem Geçmişi</h3>
            <div v-if="!item.transactions || item.transactions.length === 0" class="text-muted">
              Henüz işlem yok
            </div>
            <div v-else class="space-y-2">
              <div 
                v-for="txn in item.transactions" 
                :key="txn.id"
                class="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <div>
                  <div class="font-medium">{{ txn.type }}</div>
                  <div class="text-xs text-muted">{{ formatDate(txn.createdAt) }}</div>
                </div>
                <div class="font-semibold">{{ txn.quantity }}</div>
              </div>
            </div>
          </UCard>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-muted">Ürün bulunamadı</p>
        </div>
      </div>
    </main>

    <!-- Adjust Modal -->
    <UModal v-model="showAdjustModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Stok Ayarla</h3>
        </template>

        <div class="space-y-4">
          <div class="p-4 bg-gray-50 rounded">
            <p class="text-sm text-muted">Mevcut Stok</p>
            <p class="text-2xl font-bold">{{ item?.quantity }} {{ item?.unit }}</p>
          </div>

          <div>
            <label class="text-sm text-muted">İşlem Tipi</label>
            <USelect 
              v-model="adjustForm.type"
              :options="[
                { label: 'Giriş', value: 'IN' },
                { label: 'Çıkış', value: 'OUT' }
              ]"
            />
          </div>

          <div>
            <label class="text-sm text-muted">Miktar</label>
            <UInput v-model.number="adjustForm.quantity" type="number" />
          </div>

          <div>
            <label class="text-sm text-muted">Not</label>
              <UTextarea v-model="adjustForm.notes" :rows="3" />
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton variant="ghost" @click="showAdjustModal = false">İptal</UButton>
            <UButton :loading="adjusting" @click="handleAdjust">Kaydet</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const authStore = useAuthStore()

definePageMeta({ middleware: 'auth' })

const loading = ref(true)
const adjusting = ref(false)
const showAdjustModal = ref(false)

const item = ref<any>(null)

const adjustForm = ref({
  type: 'IN',
  quantity: 0,
  notes: ''
})

const fetchItem = async () => {
  loading.value = true
  try {
    const res = await $fetch(`${config.public.apiBase}/inventory/${route.params.id}`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    item.value = (res as any).data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleAdjust = async () => {
  adjusting.value = true
  try {
    await $fetch(`${config.public.apiBase}/inventory/${route.params.id}/adjust`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: adjustForm.value
    })
    showAdjustModal.value = false
    await fetchItem()
  } catch (error) {
    console.error(error)
  } finally {
    adjusting.value = false
  }
}

const formatPrice = (price?: number) => {
  if (!price) return '-'
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('tr-TR')
}

onMounted(() => {
  fetchItem()
})
</script>