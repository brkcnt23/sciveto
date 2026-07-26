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
          Üretim süreçlerinizi<br/>
          <span class="text-primary-200">dijitalleştirin</span>
        </h1>
        <p class="text-primary-100 mt-4 text-lg max-w-md">
          ERP, stok yönetimi ve üretim takibi tek platformda.
        </p>
      </div>
      
      <!-- Features -->
      <div class="relative z-10 space-y-4">
        <div class="flex items-center gap-3 text-white/90">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <UIcon name="i-lucide-factory" class="w-4 h-4" />
          </div>
          <span>Üretim Planlama & Takip</span>
        </div>
        <div class="flex items-center gap-3 text-white/90">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <UIcon name="i-lucide-package" class="w-4 h-4" />
          </div>
          <span>Depo & Stok Yönetimi</span>
        </div>
        <div class="flex items-center gap-3 text-white/90">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <UIcon name="i-lucide-users" class="w-4 h-4" />
          </div>
          <span>Çalışan & Vardiya Yönetimi</span>
        </div>
      </div>
    </div>
    
    <!-- Right Side - Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <div class="inline-flex items-center gap-3">
            <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span class="text-2xl font-bold text-white">S</span>
            </div>
            <span class="text-2xl font-bold text-white">Sciveto</span>
          </div>
        </div>
        
        <!-- Form Card -->
        <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-white">Hoş Geldiniz</h2>
            <p class="text-neutral-400 mt-2">Hesabınıza giriş yapın</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">
                E-posta Adresi
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
                  :class="error ? 'border-red-500' : ''"
                />
              </div>
            </div>
            
            <!-- Password -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-neutral-300">
                  Şifre
                </label>
                <NuxtLink to="/forgot-password" class="text-sm text-primary hover:underline">
                  Şifremi Unuttum
                </NuxtLink>
              </div>
              <div class="relative">
                <UIcon 
                  name="i-lucide-lock" 
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                />
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full h-12 pl-12 pr-12 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  :class="error ? 'border-red-500' : ''"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <!-- Error Message -->
            <div 
              v-if="error" 
              class="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
            >
              <UIcon name="i-lucide-alert-circle" class="w-5 h-5 shrink-0" />
              <span class="text-sm">{{ error }}</span>
            </div>
            
            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full h-12 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <UIcon v-if="loading" name="i-lucide-loader-2" class="w-5 h-5 animate-spin" />
              <UIcon v-else name="i-lucide-log-in" class="w-5 h-5" />
              <span>{{ loading ? 'Giriş yapılıyor...' : 'Giriş Yap' }}</span>
            </button>
          </form>
          
          <!-- Divider -->
          <div class="flex items-center gap-4 my-6">
            <div class="flex-1 h-px bg-neutral-800"></div>
            <span class="text-neutral-500 text-sm">veya</span>
            <div class="flex-1 h-px bg-neutral-800"></div>
          </div>
          
          <!-- Register Link -->
          <div class="text-center">
            <p class="text-neutral-400">
              Hesabınız yok mu?
              <NuxtLink to="/register" class="text-primary hover:underline font-semibold ml-1">
                Organizasyon Oluştur
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
const route = useRoute()
const toast = useToast()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)
const error = ref('')

// Clear error when form changes
watch(form, () => {
  error.value = ''
}, { deep: true })

const handleLogin = async () => {
  // Validation
  if (!form.value.email.trim()) {
    error.value = 'E-posta adresi gereklidir'
    return
  }
  
  if (!form.value.password) {
    error.value = 'Şifre gereklidir'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const result = await authStore.login(form.value.email.trim(), form.value.password)
    
    if (result.success) {
      toast.add({
        title: 'Hoş Geldiniz!',
        description: `${authStore.orgName} hesabına giriş yaptınız`,
        color: 'success',
        icon: 'i-lucide-check-circle'
      })
      
      // Redirect to intended page or dashboard
      const redirect = route.query.redirect as string
      router.push(redirect || '/dashboard')
    } else {
      error.value = result.error || 'E-posta veya şifre hatalı'
    }
  } catch (err: any) {
    console.error('Login error:', err)
    error.value = err.data?.message || err.message || 'Giriş başarısız. Lütfen tekrar deneyin.'
  } finally {
    loading.value = false
  }
}

// Page metadata
useHead({
  title: 'Giriş Yap - Sciveto',
  meta: [
    { name: 'description', content: 'Sciveto hesabınıza giriş yapın' }
  ]
})
</script>
