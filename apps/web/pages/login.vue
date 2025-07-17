<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <UIcon name="i-lucide-rocket" class="w-12 h-12 text-primary-600" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-bold text-neutral-900">
          Sign in to Sciveto
        </h2>
        <p class="mt-2 text-center text-sm text-neutral-600">
          Welcome back! Please sign in to your account.
        </p>
      </div>

      <UCard class="p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <UFormGroup label="Email address" name="email" required>
              <UInput
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                :disabled="authStore.isLoading"
                required
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Password" name="password" required>
              <UInput
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                :disabled="authStore.isLoading"
                required
              />
            </UFormGroup>
          </div>

          <div class="flex items-center justify-between">
            <UCheckbox v-model="form.rememberMe" label="Remember me" />
            <NuxtLink to="/forgot-password" class="text-sm text-primary-600 hover:text-primary-500">
              Forgot your password?
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
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'

// Page meta - Nuxt will auto-handle this
definePageMeta({
  middleware: 'guest',
  layout: false
})

// Composables
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