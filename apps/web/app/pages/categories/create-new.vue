<!-- pages/categories/create.vue - Enhanced Category Creator -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Yeni Kategori Oluştur</h1>
      <p class="text-neutral-600 dark:text-neutral-400 mt-1">
        Özel kategoriler oluşturun ve kendine özel alanlar tanımlayın
      </p>
    </div>

    <!-- Category Form -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-folder-plus" class="w-5 h-5" />
          <h2 class="text-lg font-semibold">Kategori Bilgileri</h2>
        </div>
      </template>

      <UForm ref="formRef" :state="formData" @submit="createCategory">
        <div class="space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Kategori Adı" required>
              <UInput
                v-model="formData.name"
                placeholder="örn: Gitar, MembranAG, Sensörler"
                :disabled="loading"
                required
              />
            </UFormGroup>

            <UFormGroup label="Renk">
              <div class="flex gap-2">
                <UInput
                  v-model="formData.color"
                  type="color"
                  class="w-16"
                  :disabled="loading"
                />
                <USelect
                  v-model="formData.color"
                  :options="colorOptions"
                  placeholder="Hazır renkler"
                  :disabled="loading"
                />
              </div>
            </UFormGroup>
          </div>

          <UFormGroup label="Açıklama">
            <UTextarea
              v-model="formData.description"
              placeholder="Bu kategori hakkında kısa açıklama"
              :disabled="loading"
              :rows="2"
            />
          </UFormGroup>

          <UFormGroup label="İkon">
            <div class="flex gap-2">
              <USelect
                v-model="formData.icon"
                :options="iconOptions"
                placeholder="İkon seç"
                :disabled="loading"
              />
              <div class="flex items-center justify-center w-10 h-10 bg-neutral-100 rounded">
                <UIcon :name="formData.icon || 'i-lucide-folder'" class="w-5 h-5" />
              </div>
            </div>
          </UFormGroup>

          <!-- Custom Properties Section -->
          <div class="border-t pt-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Özel Alanlar</h3>
                <p class="text-sm text-neutral-500">Bu kategoriye özel veri alanları tanımlayın</p>
              </div>
              <UButton 
                @click="addProperty" 
                icon="i-lucide-plus"
                size="sm"
                :disabled="loading"
              >
                Alan Ekle
              </UButton>
            </div>

            <!-- Property List -->
            <div class="space-y-4">
              <div 
                v-for="(property, index) in formData.properties" 
                :key="index"
                class="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
              >
                <div class="flex items-start gap-4">
                  <!-- Property Name -->
                  <div class="flex-1">
                    <UFormGroup label="Alan Adı" size="sm">
                      <UInput
                        v-model="property.name"
                        placeholder="örn: Frets, Kulakçık, Marka"
                        size="sm"
                        :disabled="loading"
                      />
                    </UFormGroup>
                  </div>

                  <!-- Property Type -->
                  <div class="w-32">
                    <UFormGroup label="Tür" size="sm">
                      <USelect
                        v-model="property.type"
                        :options="propertyTypeOptions"
                        size="sm"
                        :disabled="loading"
                      />
                    </UFormGroup>
                  </div>

                  <!-- Required Toggle -->
                  <div class="w-20">
                    <UFormGroup label="Zorunlu" size="sm">
                      <UToggle 
                        v-model="property.required" 
                        :disabled="loading"
                      />
                    </UFormGroup>
                  </div>

                  <!-- Remove Button -->
                  <div class="w-10 pt-6">
                    <UButton
                      @click="removeProperty(index)"
                      icon="i-lucide-trash-2"
                      color="error"
                      variant="ghost"
                      size="sm"
                      :disabled="loading"
                    />
                  </div>
                </div>

                <!-- Additional Options for Select Type -->
                <div v-if="property.type === 'select'" class="mt-4">
                  <UFormGroup label="Seçenekler (virgülle ayırın)" size="sm">
                    <UInput
                      v-model="property.optionsText"
                      placeholder="örn: Küçük, Orta, Büyük"
                      size="sm"
                      :disabled="loading"
                      @input="updatePropertyOptions(property)"
                    />
                  </UFormGroup>
                </div>

                <!-- Placeholder and Unit -->
                <div class="grid grid-cols-2 gap-4 mt-4">
                  <UFormGroup label="Placeholder" size="sm">
                    <UInput
                      v-model="property.placeholder"
                      placeholder="örn: Değer giriniz"
                      size="sm"
                      :disabled="loading"
                    />
                  </UFormGroup>

                  <UFormGroup label="Birim" size="sm">
                    <UInput
                      v-model="property.unit"
                      placeholder="örn: cm, kg, adet"
                      size="sm"
                      :disabled="loading"
                    />
                  </UFormGroup>
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="formData.properties.length === 0" class="text-center py-8 text-neutral-500">
                <UIcon name="i-lucide-list" class="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Henüz özel alan eklenmedi</p>
                <p class="text-sm">Kategorinize özel veri alanları ekleyin</p>
              </div>
            </div>
          </div>

          <!-- Örnek Özellikler -->
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Örnek Özellikler</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700 dark:text-blue-300">
              <div><strong>Gitar:</strong> Frets, Kulakçık, Pickguard, Marka</div>
              <div><strong>Membran:</strong> Kalınlık, Genişlik, Marka, Garanti</div>
              <div><strong>Elektronik:</strong> Voltaj, Akım, Boyut, Model</div>
              <div><strong>Malzeme:</strong> Malzeme Türü, Boyut, Ağırlık, Sertlik</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-6 border-t">
            <UButton
              color="neutral"
              variant="ghost"
              to="/categories"
              :disabled="loading"
            >
              İptal
            </UButton>
            <UButton
              type="submit"
              :loading="loading"
              :disabled="!isFormValid"
              icon="i-lucide-save"
            >
              Kategori Oluştur
            </UButton>
          </div>
        </div>
      </UForm>
    </UCard>

    <!-- Success/Error Messages -->
    <div 
      v-if="notification.show"
      class="fixed top-4 right-4 z-50"
    >
      <UAlert
        :color="notification.type"
        :title="notification.title"
        :description="notification.message"
        @close="notification.show = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { CreateCategoryData, CategoryProperty } from '~/types/stock'

// Page setup
definePageMeta({
  middleware: 'auth',
  title: 'Kategori Oluştur'
})

useHead({
  title: 'Yeni Kategori Oluştur'
})

// State
const formRef = ref()
const loading = ref(false)

const formData = reactive<CreateCategoryData>({
  name: '',
  description: '',
  color: '#3B82F6',
  icon: 'i-lucide-folder',
  properties: []
})

const notification = reactive({
  show: false,
  type: 'success' as 'success' | 'error',
  title: '',
  message: ''
})

// Options
const colorOptions = [
  { label: 'Mavi', value: '#3B82F6' },
  { label: 'Yeşil', value: '#10B981' },
  { label: 'Kırmızı', value: '#EF4444' },
  { label: 'Sarı', value: '#F59E0B' },
  { label: 'Mor', value: '#8B5CF6' },
  { label: 'Pembe', value: '#EC4899' },
  { label: 'Turuncu', value: '#F97316' },
  { label: 'Gri', value: '#6B7280' }
]

const iconOptions = [
  { label: 'Klasör', value: 'i-lucide-folder' },
  { label: 'Paket', value: 'i-lucide-package' },
  { label: 'Kutu', value: 'i-lucide-box' },
  { label: 'Araç', value: 'i-lucide-wrench' },
  { label: 'Müzik', value: 'i-lucide-music' },
  { label: 'Elektronik', value: 'i-lucide-zap' },
  { label: 'Malzeme', value: 'i-lucide-layers' },
  { label: 'Yapı', value: 'i-lucide-building' },
  { label: 'Medikal', value: 'i-lucide-heart' },
  { label: 'Spor', value: 'i-lucide-dumbbell' }
]

const propertyTypeOptions = [
  { label: 'Metin', value: 'text' },
  { label: 'Sayı', value: 'number' },
  { label: 'Çok Satır Metin', value: 'textarea' },
  { label: 'Seçim Listesi', value: 'select' },
  { label: 'Evet/Hayır', value: 'boolean' }
]

// Computed
const isFormValid = computed(() => {
  return formData.name.trim() !== '' && 
         formData.properties.every(prop => prop.name.trim() !== '')
})

// Methods
const addProperty = () => {
  formData.properties.push({
    name: '',
    type: 'text',
    required: false,
    placeholder: '',
    unit: '',
    optionsText: '',
    options: []
  })
}

const removeProperty = (index: number) => {
  formData.properties.splice(index, 1)
}

const updatePropertyOptions = (property: any) => {
  if (property.optionsText) {
    property.options = property.optionsText
      .split(',')
      .map((opt: string) => opt.trim())
      .filter((opt: string) => opt !== '')
  } else {
    property.options = []
  }
}

const createCategory = async () => {
  if (!isFormValid.value) return

  loading.value = true
  try {
    // Prepare properties data
    const properties: Omit<CategoryProperty, 'id'>[] = formData.properties.map(prop => ({
      name: prop.name,
      type: prop.type,
      required: prop.required,
      placeholder: prop.placeholder || undefined,
      unit: prop.unit || undefined,
      options: prop.options && prop.options.length > 0 ? prop.options : undefined
    }))

    // Real API call to create category
    const categoriesApi = useCategoriesApi()
    const result = await categoriesApi.createCategory({
      name: formData.name,
      description: formData.description || undefined,
      color: formData.color,
      customFields: {
        icon: formData.icon,
        properties: properties
      }
    })
    
    if (!result) {
      throw new Error(categoriesApi.error.value || 'Kategori oluşturulamadı')
    }

    notification.show = true
    notification.type = 'success'
    notification.title = 'Başarılı!'
    notification.message = `${formData.name} kategorisi oluşturuldu`

    // Navigate back after delay
    setTimeout(() => {
      navigateTo('/categories')
    }, 1500)

  } catch (error: any) {
    console.error('Category creation error:', error)
    notification.show = true
    notification.type = 'error'
    notification.title = 'Hata!'
    notification.message = error.message || 'Kategori oluşturulamadı'
  } finally {
    loading.value = false
  }
}

// Initialize with some example properties
onMounted(() => {
  // Add example properties based on URL params
  const route = useRoute()
  if (route.query.example === 'gitar') {
    formData.name = 'Gitar'
    formData.icon = 'i-lucide-music'
    formData.color = '#EC4899'
    formData.properties = [
      { name: 'Frets', type: 'number', required: true, placeholder: '24', unit: 'adet' },
      { name: 'Kulakçık', type: 'select', required: true, options: ['Çelik', 'Naylon', 'Bronz'], optionsText: 'Çelik, Naylon, Bronz' },
      { name: 'Pickguard', type: 'boolean', required: false, placeholder: '' },
      { name: 'Marka', type: 'text', required: true, placeholder: 'Fender, Gibson...' }
    ]
  }
})
</script>

<style scoped>
/* Custom styling for color input */
input[type="color"] {
  cursor: pointer;
}
</style>
