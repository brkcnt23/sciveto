<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
    <div class="w-full max-w-md">
      <UCard class="shadow-2xl border-0 bg-white/80 backdrop-blur-xl dark:bg-neutral-900/80">
        <template #header>
          <div class="text-center">
            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Welcome back</h2>
            <p class="text-neutral-600 dark:text-neutral-400 mt-1">Sign in to your account</p>
          </div>
        </template>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <UFormGroup label="Email" required>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              icon="i-lucide-mail"
              required
            />
          </UFormGroup>

          <UFormGroup label="Password" required>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              icon="i-lucide-lock"
              required
            />
          </UFormGroup>

          <div class="flex items-center justify-between">
            <UCheckbox
              v-model="form.rememberMe"
              label="Remember me"
            />
            <NuxtLink to="/forgot-password" class="text-sm text-primary-600 hover:text-primary-500">
              Forgot password?
            </NuxtLink>
          </div>

          <UButton
            type="submit"
            block
            :loading="authStore.isLoading"
            :disabled="!form.email || !form.password"
          >
            Sign in
          </UButton>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-neutral-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-neutral-500">Don't have an account?</span>
            </div>
          </div>

          <div class="mt-6">
            <NuxtLink to="/register">
              <UButton variant="outline" block>
                Create new account
              </UButton>
            </NuxtLink>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Manual imports - sadece gerekli olanlar
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
// Page meta - Nuxt will auto-handle this
definePageMeta({
  middleware: 'guest',
  layout: false
})

// Composables - Nuxt auto-import ile gelir
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Form data
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Handle login
const handleLogin = async () => {
  const result = await authStore.login({
    email: form.email,
    password: form.password
  })

  if (result.success) {
    // Simple success notification
    console.log('Login successful')
    
    // Redirect to intended page or dashboard
    const redirect = route.query.redirect as string
    await router.push(redirect || '/dashboard')
  } else {
    // Simple error notification
    console.error('Login failed:', result.error)
    alert(result.error || 'Login failed. Please check your credentials.')
  }
}
</script>