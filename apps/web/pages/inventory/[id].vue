<template>
  <div class="min-h-screen bg-default">
    <!-- Header -->
    <div class="bg-elevated border-b border-accented">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/inventory" class="text-muted hover:text-highlighted transition-colors">
              <UIcon name="i-lucide-arrow-left" class="h-5 w-5" />
            </NuxtLink>
            <h1 class="text-xl font-semibold text-highlighted">Stok Detayları</h1>
          </div>
          
          <div class="flex space-x-3">
            <UButton 
              :to="`/inventory/${route.params.id}/edit`"
              icon="i-lucide-pencil"
              color="info"
              variant="outline"
            >
              Düzenle
            </UButton>
            
            <UButton 
              icon="i-lucide-trash-2"
              color="error"
              variant="outline"
              @click="showDeleteModal = true"
            >
              Sil
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkeletonLoader type="card" />
        <SkeletonLoader type="card" />
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="stockItem" class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <!-- Incomplete Item Warning -->
      <UAlert 
        v-if="!stockItem.isComplete"
        color="warning"
        variant="soft"
        icon="i-lucide-alert-triangle"
        class="mb-6"
      >
        <template #title>Bu ürün eksik bilgilerle eklendi (Hızlı Ekleme)</template>
        <template #description>
          Fiyat, raf kodu ve diğer detayları tamamlamak için "Detayları Tamamla" butonuna tıklayın.
        </template>
        <template #actions>
          <UButton 
            color="warning" 
            variant="solid" 
            size="sm"
            @click="showCompleteModal = true"
          >
            Detayları Tamamla
          </UButton>
        </template>
      </UAlert>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Image Section - Daha Küçük -->
        <div class="space-y-3">
          <!-- Main Image -->
          <div class="rounded-lg overflow-hidden bg-elevated border border-accented">
            <img 
              v-if="stockItem.imageUrl"
              :src="stockItem.imageUrl" 
              :alt="stockItem.name"
              class="w-full h-48 object-cover"
            />
            <div v-else class="w-full h-48 bg-muted/10 flex items-center justify-center">
              <UIcon name="i-lucide-package" class="w-16 h-16 text-muted" />
            </div>
          </div>

          <!-- Additional Images Grid -->
          <div class="grid grid-cols-4 gap-1">
            <div v-for="n in 4" :key="n">
              <div class="w-full h-12 bg-elevated rounded border border-accented"></div>
            </div>
          </div>
        </div>

        <!-- Info Section - 2 Kolon Genişliğinde -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Basic Info -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h1 class="text-3xl font-bold text-highlighted">{{ stockItem.name }}</h1>
              <div class="flex items-center gap-2">
                <UBadge 
                  v-if="!stockItem.isComplete"
                  color="warning"
                  variant="soft"
                >
                  ⚠️ Eksik
                </UBadge>
                <UBadge 
                  :color="getStatusColor(stockItem.status)"
                  size="lg"
                >
                  {{ stockItem.status }}
                </UBadge>
              </div>
            </div>

            <p v-if="stockItem.description" class="text-muted text-lg leading-relaxed">
              {{ stockItem.description }}
            </p>
          </div>

          <!-- Price & Stock -->
          <UCard class="dashboard-card">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-muted">Satış Fiyatı</label>
                <p class="text-2xl font-bold text-highlighted">
                  {{ stockItem.salePrice ? `₺${stockItem.salePrice.toFixed(2)}` : (stockItem.price ? `₺${stockItem.price.toFixed(2)}` : 'Belirlenmedi') }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-muted">Stok</label>
                <p class="text-2xl font-bold" :class="stockColorClass">
                  {{ stockQuantity }} {{ stockItem.unit || 'adet' }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-accented">
              <div>
                <label class="block text-sm font-medium text-muted">Rezerve</label>
                <p class="text-lg font-semibold text-highlighted">
                  {{ stockItem.reservedStock ?? 0 }} {{ stockItem.unit || 'adet' }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-muted">Kullanılabilir</label>
                <p class="text-lg font-semibold text-success">
                  {{ stockItem.availableStock ?? stockQuantity }} {{ stockItem.unit || 'adet' }}
                </p>
              </div>
            </div>
          </UCard>

          <!-- Inventory Item Details -->
          <UCard class="dashboard-card">
            <template #header>
              <h3 class="text-lg font-semibold text-highlighted">Ürün Detayları</h3>
            </template>
            
            <div class="space-y-3">
              <div v-if="stockItem.sku" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">SKU</span>
                <span class="text-highlighted font-mono">{{ stockItem.sku }}</span>
              </div>

              <div v-if="stockItem.barcode" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Barkod</span>
                <span class="text-highlighted font-mono">{{ stockItem.barcode }}</span>
              </div>
              
              <div v-if="stockItem.shelfCode" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Raf Kodu</span>
                <span class="text-highlighted">{{ stockItem.shelfCode }}</span>
              </div>

              <div v-if="stockItem.brand" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Marka</span>
                <span class="text-highlighted">{{ stockItem.brand }}</span>
              </div>

              <div v-if="stockItem.color" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Renk</span>
                <span class="text-highlighted">{{ stockItem.color }}</span>
              </div>

              <div v-if="stockItem.size" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Beden</span>
                <span class="text-highlighted">{{ stockItem.size }}</span>
              </div>

              <div v-if="stockItem.purchasePrice" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Alış Fiyatı</span>
                <span class="text-highlighted">₺{{ stockItem.purchasePrice.toFixed(2) }}</span>
              </div>

              <div v-if="stockItem.vatRate" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">KDV</span>
                <span class="text-highlighted">%{{ stockItem.vatRate }}</span>
              </div>
              
              <div v-if="stockItem.category" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Kategori</span>
                <UBadge variant="soft" color="primary">{{ typeof stockItem.category === 'string' ? stockItem.category : stockItem.category?.name }}</UBadge>
              </div>

              <div v-if="stockItem.supplier" class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Tedarikçi</span>
                <span class="text-highlighted">{{ stockItem.supplier }}</span>
              </div>
              
              <div class="flex justify-between py-2 border-b border-accented">
                <span class="font-medium text-muted">Oluşturulma</span>
                <span class="text-highlighted">{{ formatDate(stockItem.createdAt) }}</span>
              </div>
              
              <div class="flex justify-between py-2">
                <span class="font-medium text-muted">Son Güncelleme</span>
                <span class="text-highlighted">{{ formatDate(stockItem.updatedAt) }}</span>
              </div>
            </div>
          </UCard>

          <!-- Actions -->
          <div class="flex space-x-3">
            <UButton 
              :to="`/inventory/${stockItem.id}/edit`"
              icon="i-lucide-pencil"
              color="primary"
              block
            >
              Ürünü Düzenle
            </UButton>
            
            <UButton 
              icon="i-lucide-refresh-cw"
              color="success"
              variant="outline"
              @click="showAdjustModal = true"
            >
              Stok Ayarla
            </UButton>
          </div>
        </div>
      </div>

      <!-- Allocations & Transactions -->
      <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UCard class="dashboard-card">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-highlighted">Projelerde Rezerve</h3>
              <UBadge variant="soft" color="info">{{ allocations.length }}</UBadge>
            </div>
          </template>

          <div v-if="allocations.length" class="space-y-4">
            <div v-for="allocation in allocations" :key="allocation.id" class="p-4 border border-accented rounded-lg bg-elevated">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-highlighted">{{ allocation.project?.name || 'İsimsiz Proje' }}</p>
                  <p class="text-sm text-muted">{{ allocation.project?.projectCode || 'Kod yok' }}</p>
                </div>
                <UBadge :color="allocation.status === 'RESERVED' ? 'info' : 'success'" variant="soft">
                  {{ allocation.status }}
                </UBadge>
              </div>
              <div class="mt-3 grid grid-cols-2 gap-4 text-sm text-muted">
                <div>
                  Ayrılan: <span class="font-medium text-highlighted">{{ allocation.allocatedQuantity }}</span>
                </div>
                <div>
                  Kullanılan: <span class="font-medium text-highlighted">{{ allocation.usedQuantity }}</span>
                </div>
              </div>
              <div class="mt-3">
                <div class="flex items-center justify-between text-xs text-muted">
                  <span>Kullanım</span>
                  <span>{{ allocationUsage(allocation) }}%</span>
                </div>
                <div class="w-full bg-muted/20 rounded-full h-2 mt-1">
                  <div class="h-2 rounded-full bg-primary" :style="{ width: allocationUsage(allocation) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <EmptyState
            v-else
            icon="i-lucide-folder-kanban"
            title="Proje ataması yok"
            description="Bu ürün henüz hiçbir projeye atanmamış."
          />
        </UCard>

        <UCard class="dashboard-card">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-highlighted">İşlem Geçmişi</h3>
              <UBadge variant="soft" color="secondary">{{ transactions.length }}</UBadge>
            </div>
          </template>

          <div v-if="transactions.length" class="space-y-3">
            <div v-for="transaction in transactions" :key="transaction.id" class="flex items-center justify-between p-3 border border-accented rounded-lg bg-elevated">
              <div>
                <p class="font-medium text-highlighted">{{ transaction.type }}</p>
                <p class="text-xs text-muted">{{ formatDate(transaction.createdAt) }}</p>
              </div>
              <div class="text-right">
                <p :class="transaction.quantity < 0 ? 'text-error' : 'text-success'" class="font-semibold">
                  {{ transaction.quantity > 0 ? '+' : '' }}{{ transaction.quantity }}
                </p>
                <p class="text-xs text-muted">
                  {{ transaction.totalCost ? `₺${transaction.totalCost.toFixed(2)}` : '-' }}
                </p>
              </div>
            </div>
          </div>

          <EmptyState
            v-else
            icon="i-lucide-history"
            title="İşlem kaydı yok"
            description="Bu ürün için henüz işlem kaydedilmemiş."
          />
        </UCard>
      </div>

      <!-- Delete at Bottom -->
      <div class="mt-8 pt-8 border-t border-accented">
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="ghost"
          @click="showDeleteModal = true"
        >
          Ürünü Sil
        </UButton>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <EmptyState
        icon="i-lucide-package-x"
        title="Ürün Bulunamadı"
        description="Aradığınız ürün mevcut değil veya silinmiş olabilir."
        action-text="Geri Dön"
        action-icon="i-lucide-arrow-left"
        @action="navigateTo('/inventory')"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard class="dashboard-card">
        <template #header>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-error" />
            </div>
            <h3 class="text-lg font-semibold text-error">Ürünü Sil</h3>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-default">
            <strong class="text-highlighted">{{ stockItem?.name }}</strong> ürününü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </p>
          <UAlert
            color="error"
            variant="soft"
            icon="i-lucide-alert-circle"
            title="Dikkat"
            description="Tüm ilişkili veriler kalıcı olarak silinecektir."
          />
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showDeleteModal = false">
              İptal
            </UButton>
            <UButton color="error" :loading="deleting" @click="confirmDelete">
              Sil
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Stock Adjustment Modal -->
    <UModal v-model="showAdjustModal">
      <UCard class="dashboard-card">
        <template #header>
          <h3 class="text-lg font-semibold text-highlighted">Stok Ayarla</h3>
        </template>

        <div class="space-y-4">
          <div class="bg-elevated p-4 rounded-lg border border-accented">
            <p class="text-sm text-muted">Mevcut Stok</p>
            <p class="text-2xl font-bold text-highlighted">{{ stockQuantity }} {{ stockItem?.unit || 'adet' }}</p>
          </div>
          
          <UFormGroup label="Yeni Stok Miktarı" required>
            <UInput
              v-model.number="adjustStock.newStock"
              type="number"
              min="0"
              placeholder="Yeni stok miktarını girin"
            />
          </UFormGroup>
          
          <UFormGroup label="Ayarlama Nedeni">
            <UTextarea
              v-model="adjustStock.reason"
              placeholder="Stok ayarlama nedenini girin"
              :rows="3"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showAdjustModal = false">
              İptal
            </UButton>
            <UButton color="success" :loading="adjusting" @click="confirmAdjustStock">
              Stoku Ayarla
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Complete Item Modal (Dual-Mode) -->
    <UModal v-model="showCompleteModal">
      <UCard class="dashboard-card">
        <template #header>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-clipboard-check" class="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-highlighted">Ürün Detaylarını Tamamla</h3>
              <p class="text-sm text-muted">Eksik bilgileri girerek ürünü tamamlayın</p>
            </div>
          </div>
        </template>

        <div class="space-y-6">
          <!-- Pricing -->
          <div>
            <h4 class="text-sm font-semibold text-highlighted mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-banknote" class="w-4 h-4" />
              Fiyatlandırma
            </h4>
            <div class="grid grid-cols-2 gap-4">
              <UFormGroup label="Alış Fiyatı (₺)">
                <UInput v-model.number="completeForm.purchasePrice" type="number" step="0.01" placeholder="0.00" />
              </UFormGroup>
              <UFormGroup label="Satış Fiyatı (₺)">
                <UInput v-model.number="completeForm.salePrice" type="number" step="0.01" placeholder="0.00" />
              </UFormGroup>
              <UFormGroup label="Vadeli Fiyat (₺)">
                <UInput v-model.number="completeForm.salePrice2" type="number" step="0.01" placeholder="0.00" />
              </UFormGroup>
              <UFormGroup label="KDV (%)">
                <UInput v-model.number="completeForm.vatRate" type="number" placeholder="20" />
              </UFormGroup>
            </div>
          </div>

          <!-- Location & Details -->
          <div>
            <h4 class="text-sm font-semibold text-highlighted mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
              Konum ve Detaylar
            </h4>
            <div class="grid grid-cols-2 gap-4">
              <UFormGroup label="Raf Kodu">
                <UInput v-model="completeForm.shelfCode" placeholder="A-12-B" />
              </UFormGroup>
              <UFormGroup label="Tedarikçi">
                <UInput v-model="completeForm.supplier" placeholder="Tedarikçi adı" />
              </UFormGroup>
              <UFormGroup label="Marka">
                <UInput v-model="completeForm.brand" placeholder="Marka adı" />
              </UFormGroup>
              <UFormGroup label="Barkod">
                <UInput v-model="completeForm.barcode" placeholder="8690000000000" />
              </UFormGroup>
            </div>
          </div>

          <!-- Variants -->
          <div>
            <h4 class="text-sm font-semibold text-highlighted mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-palette" class="w-4 h-4" />
              Varyantlar
            </h4>
            <div class="grid grid-cols-2 gap-4">
              <UFormGroup label="Renk">
                <UInput v-model="completeForm.color" placeholder="Renk" />
              </UFormGroup>
              <UFormGroup label="Beden">
                <UInput v-model="completeForm.size" placeholder="Beden" />
              </UFormGroup>
            </div>
          </div>

          <!-- Notes -->
          <UFormGroup label="Notlar">
            <UTextarea v-model="completeForm.notes" placeholder="Ek notlar..." :rows="2" />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="outline" @click="showCompleteModal = false">
              İptal
            </UButton>
            <UButton color="warning" :loading="completing" @click="confirmComplete">
              <UIcon name="i-lucide-check" class="w-4 h-4 mr-2" />
              Tamamla
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useInventory } from '~/composables/useInventory'
import { useDualToast } from '~/composables/useDualToast'
import type { StockItem } from '~/types/stock'

const route = useRoute()
const toast = useDualToast()

// Data
const loading = ref(false)
const deleting = ref(false)
const adjusting = ref(false)
const completing = ref(false)
const showDeleteModal = ref(false)
const showAdjustModal = ref(false)
const showCompleteModal = ref(false)
const stockItem = ref<StockItem | null>(null)
const allocations = ref<any[]>([])
const transactions = ref<any[]>([])

const adjustStock = reactive({
  newStock: 0,
  reason: ''
})

const completeForm = reactive({
  purchasePrice: null as number | null,
  salePrice: null as number | null,
  salePrice2: null as number | null,
  vatRate: 20,
  shelfCode: '',
  supplier: '',
  brand: '',
  barcode: '',
  color: '',
  size: '',
  notes: ''
})

const {
  fetchInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  fetchInventoryAllocations,
  fetchInventoryTransactions
} = useInventory()

// Computed
const stockQuantity = computed(() => stockItem.value?.stock ?? stockItem.value?.currentStock ?? 0)

const stockColorClass = computed(() => {
  if (stockQuantity.value === 0) return 'text-error'
  if (stockQuantity.value < 10) return 'text-warning'
  return 'text-success'
})

// Methods
const fetchStockItem = async () => {
  loading.value = true

  try {
    stockItem.value = await fetchInventoryItem(String(route.params.id))
    adjustStock.newStock = stockQuantity.value
    
    // Pre-fill complete form with existing data
    if (stockItem.value) {
      completeForm.purchasePrice = stockItem.value.purchasePrice ?? null
      completeForm.salePrice = stockItem.value.salePrice ?? stockItem.value.price ?? null
      completeForm.salePrice2 = stockItem.value.salePrice2 ?? null
      completeForm.vatRate = stockItem.value.vatRate ?? 20
      completeForm.shelfCode = stockItem.value.shelfCode ?? ''
      completeForm.supplier = stockItem.value.supplier ?? ''
      completeForm.brand = stockItem.value.brand ?? ''
      completeForm.barcode = stockItem.value.barcode ?? ''
      completeForm.color = stockItem.value.color ?? ''
      completeForm.size = stockItem.value.size ?? ''
      completeForm.notes = stockItem.value.notes ?? ''
    }
  } catch (error) {
    console.error('Error fetching inventory item:', error)
  } finally {
    loading.value = false
  }
}

const fetchAllocations = async () => {
  try {
    allocations.value = await fetchInventoryAllocations(String(route.params.id))
  } catch (error) {
    console.error('Error fetching allocations:', error)
  }
}

const fetchTransactions = async () => {
  try {
    transactions.value = await fetchInventoryTransactions(String(route.params.id))
  } catch (error) {
    console.error('Error fetching transactions:', error)
  }
}

const allocationUsage = (allocation: any) => {
  if (!allocation?.allocatedQuantity) return 0
  return Math.round((allocation.usedQuantity / allocation.allocatedQuantity) * 100)
}

const getStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const normalized = status?.toLowerCase()
  const colors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    active: 'success',
    inactive: 'neutral',
    out_of_stock: 'error',
    discontinued: 'warning',
    archived: 'neutral'
  }
  return colors[normalized] || 'neutral'
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const confirmDelete = async () => {
  deleting.value = true

  try {
    await deleteInventoryItem(String(route.params.id))
    toast.success('Ürün Silindi', 'Ürün başarıyla silindi')
    await navigateTo('/inventory')
  } catch (error) {
    console.error('Error deleting inventory item:', error)
    toast.error('Silme Hatası', 'Ürün silinirken bir hata oluştu')
  } finally {
    deleting.value = false
  }
}

const confirmAdjustStock = async () => {
  if (!stockItem.value) return
  adjusting.value = true

  try {
    stockItem.value = await updateInventoryItem(stockItem.value.id, {
      stock: adjustStock.newStock
    })
    adjustStock.reason = ''
    showAdjustModal.value = false
    toast.success('Stok Güncellendi', `Stok ${adjustStock.newStock} olarak ayarlandı`)
  } catch (error) {
    console.error('Error adjusting stock:', error)
    toast.error('Güncelleme Hatası', 'Stok ayarlanırken bir hata oluştu')
  } finally {
    adjusting.value = false
  }
}

const confirmComplete = async () => {
  if (!stockItem.value) return
  completing.value = true

  try {
    // Build update payload with only filled values
    const payload: any = {
      isComplete: true,
      entryMode: 'DETAILED'
    }
    
    if (completeForm.purchasePrice) payload.purchasePrice = completeForm.purchasePrice
    if (completeForm.salePrice) payload.salePrice = completeForm.salePrice
    if (completeForm.salePrice2) payload.salePrice2 = completeForm.salePrice2
    if (completeForm.vatRate) payload.vatRate = completeForm.vatRate
    if (completeForm.shelfCode) payload.shelfCode = completeForm.shelfCode
    if (completeForm.supplier) payload.supplier = completeForm.supplier
    if (completeForm.brand) payload.brand = completeForm.brand
    if (completeForm.barcode) payload.barcode = completeForm.barcode
    if (completeForm.color) payload.color = completeForm.color
    if (completeForm.size) payload.size = completeForm.size
    if (completeForm.notes) payload.notes = completeForm.notes

    stockItem.value = await updateInventoryItem(stockItem.value.id, payload)
    showCompleteModal.value = false
    toast.success('Ürün Tamamlandı', 'Tüm detaylar başarıyla kaydedildi')
  } catch (error) {
    console.error('Error completing item:', error)
    toast.error('Kaydetme Hatası', 'Ürün detayları kaydedilirken bir hata oluştu')
  } finally {
    completing.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await fetchStockItem()
  await Promise.all([fetchAllocations(), fetchTransactions()])
})
</script>
