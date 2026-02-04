<template>
  <div class="min-h-screen bg-neutral-950 flex">
    <!-- Left Side - Branding -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-between relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <!-- Logo & Title -->
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <span class="text-2xl font-bold text-white">S</span>
          </div>
          <span class="text-2xl font-bold text-white">Sciveto</span>
        </div>
        <h1 class="text-4xl font-bold text-white leading-tight">
          Organizasyonunuzu<br/>
          <span class="text-primary-200">oluşturun</span>
        </h1>
        <p class="text-primary-100 mt-4 text-lg max-w-md">
          Hemen başlayın, 14 gün ücretsiz deneyin. Kredi kartı gerekmez.
        </p>
      </div>
      
      <!-- Features -->
      <div class="relative z-10 space-y-4">
        <div class="flex items-center gap-3 text-white/90">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <UIcon name="i-lucide-check" class="w-4 h-4" />
          </div>
          <span>10 kullanıcıya kadar ücretsiz</span>
        </div>
        <div class="flex items-center gap-3 text-white/90">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <UIcon name="i-lucide-check" class="w-4 h-4" />
          </div>
          <span>50 proje kapasitesi</span>
        </div>
        <div class="flex items-center gap-3 text-white/90">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <UIcon name="i-lucide-check" class="w-4 h-4" />
          </div>
          <span>Sınırsız çalışan kaydı</span>
        </div>
      </div>
    </div>
    
    <!-- Right Side - Register Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 overflow-y-auto">
      <div class="w-full max-w-lg">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-6">
          <div class="inline-flex items-center gap-3">
            <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span class="text-2xl font-bold text-white">S</span>
            </div>
            <span class="text-2xl font-bold text-white">Sciveto</span>
          </div>
        </div>
        
        <!-- Success Message -->
        <div 
          v-if="registrationSuccess" 
          class="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center"
        >
          <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-green-500" />
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">Tebrikler! 🎉</h2>
          <p class="text-neutral-400 mb-4">Organizasyonunuz başarıyla oluşturuldu</p>
          
          <div class="bg-neutral-800 rounded-xl p-4 mb-6">
            <p class="text-neutral-400 text-sm mb-1">Organizasyon Kodunuz</p>
            <p class="text-3xl font-mono font-bold text-primary">{{ orgCode }}</p>
          </div>
          
          <p class="text-neutral-500 text-sm mb-4">Dashboard'a yönlendiriliyorsunuz...</p>
          
          <div class="flex justify-center">
            <UIcon name="i-lucide-loader-2" class="w-6 h-6 text-primary animate-spin" />
          </div>
        </div>
        
        <!-- Form Card -->
        <div v-else class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:p-8">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-white">Organizasyon Oluştur</h2>
            <p class="text-neutral-400 mt-2">Bilgilerinizi girin ve hemen başlayın</p>
          </div>
          
          <form @submit.prevent="handleRegister" class="space-y-4">
            <!-- Organization Name -->
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">
                Organizasyon Adı <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <UIcon 
                  name="i-lucide-building-2" 
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                />
                <input
                  v-model="form.organizationName"
                  type="text"
                  placeholder="Şirket Adı"
                  class="w-full h-12 pl-12 pr-4 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  :class="errors.organizationName ? 'border-red-500' : ''"
                />
              </div>
              <p v-if="errors.organizationName" class="text-red-400 text-sm mt-1">{{ errors.organizationName }}</p>
            </div>
            
            <!-- Name Row -->
            <div class="grid grid-cols-2 gap-4">
              <!-- First Name -->
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">
                  Adınız <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  placeholder="Adınız"
                  class="w-full h-12 px-4 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  :class="errors.firstName ? 'border-red-500' : ''"
                />
                <p v-if="errors.firstName" class="text-red-400 text-sm mt-1">{{ errors.firstName }}</p>
              </div>
              
              <!-- Last Name -->
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">
                  Soyadınız <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Soyadınız"
                  class="w-full h-12 px-4 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  :class="errors.lastName ? 'border-red-500' : ''"
                />
                <p v-if="errors.lastName" class="text-red-400 text-sm mt-1">{{ errors.lastName }}</p>
              </div>
            </div>
            
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">
                E-posta Adresi <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <UIcon 
                  name="i-lucide-mail" 
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                />
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="ornek@sirket.com"
                  class="w-full h-12 pl-12 pr-4 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  :class="errors.email ? 'border-red-500' : ''"
                />
              </div>
              <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
            </div>
            
            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">
                Şifre <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <UIcon 
                  name="i-lucide-lock" 
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                />
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="En az 6 karakter"
                  class="w-full h-12 pl-12 pr-12 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  :class="errors.password ? 'border-red-500' : ''"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="w-5 h-5" />
                </button>
              </div>
              <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
            </div>
            
            <!-- Industry -->
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">
                Sektör <span class="text-neutral-500 text-xs">(opsiyonel)</span>
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="ind in industries"
                  :key="ind.value"
                  type="button"
                  @click="form.industry = ind.value"
                  class="p-3 rounded-xl text-left transition-all border"
                  :class="form.industry === ind.value 
                    ? 'border-primary bg-primary/10 text-white' 
                    : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600'"
                >
                  <div class="flex items-center gap-2">
                    <UIcon :name="ind.icon" class="w-4 h-4" :class="form.industry === ind.value ? 'text-primary' : ''" />
                    <span class="text-sm font-medium">{{ ind.label }}</span>
                  </div>
                </button>
              </div>
            </div>
            
            <!-- General Error -->
            <div 
              v-if="errors.general" 
              class="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
            >
              <UIcon name="i-lucide-alert-circle" class="w-5 h-5 shrink-0" />
              <span class="text-sm">{{ errors.general }}</span>
            </div>
            
            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full h-12 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all mt-2"
            >
              <UIcon v-if="loading" name="i-lucide-loader-2" class="w-5 h-5 animate-spin" />
              <UIcon v-else name="i-lucide-rocket" class="w-5 h-5" />
              <span>{{ loading ? 'Oluşturuluyor...' : 'Organizasyon Oluştur' }}</span>
            </button>
          </form>
          
          <!-- Login Link -->
          <div class="text-center mt-6 pt-6 border-t border-neutral-800">
            <p class="text-neutral-400">
              Zaten hesabınız var mı?
              <NuxtLink to="/login" class="text-primary hover:underline font-semibold ml-1">
                Giriş Yapın
              </NuxtLink>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <p class="text-center text-neutral-600 text-sm mt-6">
          © 2026 Sciveto. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
  middleware: 'guest'
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

// Form state
const form = ref({
  organizationName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  industry: 'general'
})

// Industry options
const industries = [
  { value: 'steel-manufacturing', label: 'Demir-Çelik', icon: 'i-lucide-factory' },
  { value: 'tensile-architecture', label: 'Asma Gergi', icon: 'i-lucide-tent' },
  { value: 'electronics', label: 'Elektronik', icon: 'i-lucide-cpu' },
  { value: 'general', label: 'Genel', icon: 'i-lucide-box' },
]

const errors = ref({
  organizationName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  general: ''
})

const loading = ref(false)
const showPassword = ref(false)
const registrationSuccess = ref(false)
const orgCode = ref('')

// Clear errors when form changes
watch(form, () => {
  errors.value = {
    organizationName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    general: ''
  }
}, { deep: true })

// Validate form
const validateForm = () => {
  let isValid = true
  
  if (!form.value.organizationName.trim()) {
    errors.value.organizationName = 'Organizasyon adı gereklidir'
    isValid = false
  }
  
  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'Ad gereklidir'
    isValid = false
  }
  
  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Soyad gereklidir'
    isValid = false
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'E-posta gereklidir'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Geçerli bir e-posta adresi girin'
    isValid = false
  }
  
  if (!form.value.password) {
    errors.value.password = 'Şifre gereklidir'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Şifre en az 6 karakter olmalıdır'
    isValid = false
  }
  
  return isValid
}

// Handle registration
const handleRegister = async () => {
  if (!validateForm()) return
  
  loading.value = true
  errors.value.general = ''
  
  try {
    const response = await authStore.register({
      organizationName: form.value.organizationName.trim(),
      firstName: form.value.firstName.trim(),
      lastName: form.value.lastName.trim(),
      email: form.value.email.trim(),
      password: form.value.password,
      industry: form.value.industry
    })
    
    // Show success
    registrationSuccess.value = true
    orgCode.value = response.organization?.code || 'ORG-001'
    
    // Show toast
    toast.add({
      title: 'Tebrikler! 🎉',
      description: `${response.organization?.name || form.value.organizationName} organizasyonu oluşturuldu.`,
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    
    // Redirect after showing success
    setTimeout(() => {
      router.push('/dashboard')
    }, 2500)
    
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Handle specific errors
    const message = error.data?.message || error.message || ''
    
    if (message.toLowerCase().includes('organizasyon') || message.toLowerCase().includes('organization')) {
      errors.value.organizationName = 'Bu organizasyon adı zaten kullanılıyor'
    } else if (message.toLowerCase().includes('email') || message.toLowerCase().includes('e-posta')) {
      errors.value.email = 'Bu e-posta adresi zaten kullanılıyor'
    } else {
      errors.value.general = message || 'Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.'
    }
  } finally {
    loading.value = false
  }
}

// Page metadata
useHead({
  title: 'Kayıt Ol - Sciveto',
  meta: [
    { name: 'description', content: 'Sciveto hesabınızı oluşturun ve projelerinizi yönetmeye başlayın' }
  ]
})
</script>
