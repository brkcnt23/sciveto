<!-- apps/web/pages/register.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-800 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
          <Icon name="i-heroicons-building-office" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p class="text-emerald-100">Join us and start managing your projects</p>
      </div>

      <!-- Registration Form -->
      <UCard class="backdrop-blur-sm bg-white/10 border border-white/20">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <FormInput
              v-model="registerForm.firstName"
              label="First Name"
              placeholder="First name"
              leading-icon="i-heroicons-user"
              :error="errors.firstName"
              :disabled="loading"
              required
            />
            <FormInput
              v-model="registerForm.lastName"
              label="Last Name"
              placeholder="Last name"
              leading-icon="i-heroicons-user"
              :error="errors.lastName"
              :disabled="loading"
            />
          </div>

          <!-- Email Field -->
          <FormInput
            v-model="registerForm.email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            leading-icon="i-heroicons-envelope"
            :error="errors.email"
            :disabled="loading"
            required
          />

          <!-- Organization Name -->
          <FormInput
            v-model="registerForm.organizationName"
            label="Organization Name"
            placeholder="Your company name (optional)"
            leading-icon="i-heroicons-building-office"
            :error="errors.organizationName"
            :disabled="loading"
            help-text="Leave empty to join the default organization"
          />

          <!-- Industry Selection (shown when org name is provided) -->
          <div v-if="registerForm.organizationName" class="space-y-2">
            <label class="block text-sm font-medium text-white">Sektörünüz</label>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="ind in industries"
                :key="ind.value"
                @click="registerForm.industry = ind.value"
                class="p-4 rounded-lg cursor-pointer transition-all border-2"
                :class="registerForm.industry === ind.value 
                  ? 'border-emerald-400 bg-emerald-500/20' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'"
              >
                <div class="flex items-center gap-3">
                  <Icon :name="ind.icon" class="w-6 h-6 text-white" />
                  <div>
                    <div class="font-medium text-white">{{ ind.label }}</div>
                    <div class="text-xs text-white/60">{{ ind.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Password Field -->
          <FormInput
            v-model="registerForm.password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="Create a password"
            leading-icon="i-heroicons-lock-closed"
            :trailing-icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            :error="errors.password"
            :disabled="loading"
            @trailing-click="showPassword = !showPassword"
            help-text="At least 8 characters with uppercase, lowercase, and number"
            required
          />

          <!-- Confirm Password Field -->
          <FormInput
            v-model="registerForm.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirm Password"
            placeholder="Confirm your password"
            leading-icon="i-heroicons-lock-closed"
            :trailing-icon="showConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            :error="errors.confirmPassword"
            :disabled="loading"
            @trailing-click="showConfirmPassword = !showConfirmPassword"
            required
          />

          <!-- Password Strength Indicator -->
          <div v-if="registerForm.password" class="space-y-2">
            <div class="flex items-center space-x-2">
              <div class="flex-1 bg-white/20 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-300"
                  :class="passwordStrengthColor"
                  :style="{ width: `${passwordStrength}%` }"
                ></div>
              </div>
              <span class="text-xs text-white/70">{{ passwordStrengthText }}</span>
            </div>
          </div>

          <!-- Terms and Privacy -->
          <div class="space-y-3">
            <label class="flex items-start">
              <input
                v-model="registerForm.acceptTerms"
                type="checkbox"
                class="mt-1 rounded border-white/30 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0"
                :disabled="loading"
                required
              >
              <span class="ml-2 text-sm text-white">
                I agree to the
                <NuxtLink to="/terms" class="text-emerald-200 hover:text-white">Terms of Service</NuxtLink>
                and
                <NuxtLink to="/privacy" class="text-emerald-200 hover:text-white">Privacy Policy</NuxtLink>
              </span>
            </label>

            <label class="flex items-start">
              <input
                v-model="registerForm.marketingEmails"
                type="checkbox"
                class="mt-1 rounded border-white/30 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0"
                :disabled="loading"
              >
              <span class="ml-2 text-sm text-white">
                Send me product updates and marketing emails (optional)
              </span>
            </label>
          </div>

          <!-- Error Message -->
          <ErrorMessage
            v-if="errors.general"
            type="error"
            :error="errors.general"
            dismissible
            @dismiss="errors.general = ''"
          />

          <!-- Submit Button -->
          <UButton
            type="submit"
            color="neutral"
            variant="solid"
            size="lg"
            :loading="loading"
            :disabled="loading || !registerForm.acceptTerms"
            class="w-full justify-center"
          >
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </UButton>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/20"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-transparent text-white/70">Or continue with</span>
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <UButton
            variant="outline"
            color="neutral"
            size="sm"
            :disabled="loading"
            @click="handleSocialRegister('google')"
            class="justify-center"
          >
            <Icon name="i-logos-google-icon" class="w-4 h-4 mr-2" />
            Google
          </UButton>
          <UButton
            variant="outline"
            color="neutral"
            size="sm"
            :disabled="loading"
            @click="handleSocialRegister('github')"
            class="justify-center"
          >
            <Icon name="i-logos-github-icon" class="w-4 h-4 mr-2" />
            GitHub
          </UButton>
        </div>

        <!-- Sign In Link -->
        <div class="text-center mt-6">
          <p class="text-white/70">
            Already have an account?
            <NuxtLink
              to="/login"
              class="text-white font-medium hover:text-emerald-200 transition-colors"
            >
              Sign in
            </NuxtLink>
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
  middleware: 'guest'
})

const authStore = useAuthStore()
const router = useRouter()

// Form state
const registerForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  organizationName: '',
  industry: 'general',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  marketingEmails: false
})

// Industry options
const industries = [
  { 
    value: 'steel-manufacturing', 
    label: 'Demir-Çelik', 
    icon: 'i-heroicons-cube',
    description: 'Profil, plaka, yapısal çelik'
  },
  { 
    value: 'tensile-architecture', 
    label: 'Asma Gergi Mimarlık', 
    icon: 'i-heroicons-home-modern',
    description: 'Membran, halat, mapa'
  },
  { 
    value: 'electronics', 
    label: 'Elektronik', 
    icon: 'i-heroicons-cpu-chip',
    description: 'Elektronik bileşenler'
  },
  { 
    value: 'general', 
    label: 'Genel / Diğer', 
    icon: 'i-heroicons-squares-2x2',
    description: 'Özel sektör kategorileri'
  },
]

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  organizationName: '',
  password: '',
  confirmPassword: '',
  general: ''
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Password strength calculation
const passwordStrength = computed(() => {
  const password = registerForm.password
  if (!password) return 0
  
  let strength = 0
  
  // Length check
  if (password.length >= 8) strength += 25
  if (password.length >= 12) strength += 10
  
  // Character type checks
  if (/[a-z]/.test(password)) strength += 15
  if (/[A-Z]/.test(password)) strength += 15
  if (/[0-9]/.test(password)) strength += 15
  if (/[^a-zA-Z0-9]/.test(password)) strength += 20
  
  return Math.min(strength, 100)
})

const passwordStrengthText = computed(() => {
  if (passwordStrength.value < 25) return 'Weak'
  if (passwordStrength.value < 50) return 'Fair'
  if (passwordStrength.value < 75) return 'Good'
  return 'Strong'
})

const passwordStrengthColor = computed(() => {
  if (passwordStrength.value < 25) return 'bg-red-500'
  if (passwordStrength.value < 50) return 'bg-yellow-500'
  if (passwordStrength.value < 75) return 'bg-blue-500'
  return 'bg-green-500'
})

// Clear errors when user types
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    if (key !== 'general') errors[key] = ''
  })
  errors.general = ''
}

watch(() => registerForm.email, clearErrors)
watch(() => registerForm.password, clearErrors)
watch(() => registerForm.confirmPassword, clearErrors)

const validateForm = () => {
  let isValid = true
  clearErrors()
  
  // First name validation
  if (!registerForm.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }
  
  // Email validation
  if (!registerForm.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  // Password validation
  if (!registerForm.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (registerForm.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  } else if (passwordStrength.value < 50) {
    errors.password = 'Password is too weak. Please use a stronger password.'
    isValid = false
  }
  
  // Confirm password validation
  if (!registerForm.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (registerForm.password !== registerForm.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }
  
  // Terms acceptance
  if (!registerForm.acceptTerms) {
    errors.general = 'You must accept the Terms of Service and Privacy Policy'
    isValid = false
  }
  
  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return
  
  loading.value = true
  errors.general = ''
  
  try {
    const registrationData = {
      email: registerForm.email,
      password: registerForm.password,
      firstName: registerForm.firstName,
      lastName: registerForm.lastName || undefined,
      organizationName: registerForm.organizationName || undefined,
      industry: registerForm.organizationName ? registerForm.industry : undefined,
      marketingEmails: registerForm.marketingEmails
    }
    
    console.log('📝 Registration data being sent:', JSON.stringify(registrationData, null, 2))
    
    await authStore.register(registrationData)
    
    // Redirect will be handled by the store
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error.status === 409) {
      errors.email = 'An account with this email already exists'
    } else if (error.status === 422) {
      errors.general = 'Please check your information and try again'
    } else {
      errors.general = error.data?.message || 'An error occurred during registration. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

const handleSocialRegister = (provider) => {
  // TODO: Implement social registration
  console.log(`Social registration with ${provider}`)
  errors.general = `${provider} registration will be implemented soon`
}

// Page metadata
useHead({
  title: 'Create Account - Sciveto',
  meta: [
    { name: 'description', content: 'Create your Sciveto account and start managing projects' }
  ]
})
</script>

<style scoped>
/* Custom checkbox styling for dark theme */
input[type="checkbox"] {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

input[type="checkbox"]:checked {
  background-color: #10b981;
  border-color: #10b981;
}
</style>