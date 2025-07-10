<!-- apps/web/pages/login.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
          <Icon name="i-heroicons-building-office" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p class="text-blue-100">Sign in to your account to continue</p>
      </div>

      <!-- Login Form -->
      <UCard class="backdrop-blur-sm bg-white/10 border border-white/20">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <FormInput
            v-model="loginForm.email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            leading-icon="i-heroicons-envelope"
            :error="errors.email"
            :disabled="loading"
            required
          />

          <!-- Password Field -->
          <FormInput
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="Enter your password"
            leading-icon="i-heroicons-lock-closed"
            :trailing-icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            :error="errors.password"
            :disabled="loading"
            @trailing-click="showPassword = !showPassword"
            required
          />

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="loginForm.remember"
                type="checkbox"
                class="rounded border-white/30 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                :disabled="loading"
              >
              <span class="ml-2 text-sm text-white">Remember me</span>
            </label>
            <NuxtLink
              to="/forgot-password"
              class="text-sm text-blue-200 hover:text-white transition-colors"
            >
              Forgot password?
            </NuxtLink>
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
            color="white"
            variant="solid"
            size="lg"
            :loading="loading"
            :disabled="loading"
            class="w-full justify-center"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
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
            color="white"
            size="sm"
            :disabled="loading"
            @click="handleSocialLogin('google')"
            class="justify-center"
          >
            <Icon name="i-logos-google-icon" class="w-4 h-4 mr-2" />
            Google
          </UButton>
          <UButton
            variant="outline"
            color="white"
            size="sm"
            :disabled="loading"
            @click="handleSocialLogin('github')"
            class="justify-center"
          >
            <Icon name="i-logos-github-icon" class="w-4 h-4 mr-2" />
            GitHub
          </UButton>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center mt-6">
          <p class="text-white/70">
            Don't have an account?
            <NuxtLink
              to="/register"
              class="text-white font-medium hover:text-blue-200 transition-colors"
            >
              Sign up
            </NuxtLink>
          </p>
        </div>
      </UCard>

      <!-- Demo Credentials -->
      <div class="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
        <h3 class="text-white font-medium mb-2">Demo Credentials</h3>
        <div class="text-sm text-white/70 space-y-1">
          <p><strong>Email:</strong> demo@example.com</p>
          <p><strong>Password:</strong> demo123</p>
        </div>
        <UButton
          variant="outline"
          color="white"
          size="xs"
          class="mt-2"
          @click="fillDemoCredentials"
        >
          Use Demo Credentials
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
  middleware: 'guest'
})

const authStore = useAuthStore()
const router = useRouter()

// Form state
const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const loading = ref(false)
const showPassword = ref(false)

// Clear errors when user types
watch(() => loginForm.email, () => {
  errors.email = ''
  errors.general = ''
})

watch(() => loginForm.password, () => {
  errors.password = ''
  errors.general = ''
})

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.email = ''
  errors.password = ''
  
  // Email validation
  if (!loginForm.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  // Password validation
  if (!loginForm.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (loginForm.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  loading.value = true
  errors.general = ''
  
  try {
    await authStore.login({
      email: loginForm.email,
      password: loginForm.password
    })
    
    // Redirect will be handled by the store
  } catch (error) {
    console.error('Login error:', error)
    
    if (error.status === 401) {
      errors.general = 'Invalid email or password'
    } else if (error.status === 429) {
      errors.general = 'Too many login attempts. Please try again later.'
    } else {
      errors.general = error.data?.message || 'An error occurred during login. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

const handleSocialLogin = (provider) => {
  // TODO: Implement social login
  console.log(`Social login with ${provider}`)
  errors.general = `${provider} login will be implemented soon`
}

const fillDemoCredentials = () => {
  loginForm.email = 'demo@example.com'
  loginForm.password = 'demo123'
}

// Page metadata
useHead({
  title: 'Sign In - Sciveto',
  meta: [
    { name: 'description', content: 'Sign in to your Sciveto account' }
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
  background-color: #3b82f6;
  border-color: #3b82f6;
}
</style>