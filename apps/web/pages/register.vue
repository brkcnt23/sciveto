<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your Sciveto account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>
      
      <UCard class="p-6">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <UFormGroup label="Email address" required>
              <UInput
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                :disabled="loading"
                required
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Password" required help="Minimum 6 characters">
              <UInput
                v-model="form.password"
                type="password"
                placeholder="Create a password"
                :disabled="loading"
                required
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Confirm Password" required>
              <UInput
                v-model="form.confirmPassword"
                type="password"
                placeholder="Confirm your password"
                :disabled="loading"
                required
              />
            </UFormGroup>
          </div>

          <UAlert
            v-if="error"
            icon="i-heroicons-exclamation-triangle"
            color="red"
            variant="soft"
            :title="error"
            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
            @close="error = ''"
          />

          <div>
            <UButton
              type="submit"
              block
              size="lg"
              :loading="loading"
              :disabled="loading || !isFormValid"
            >
              Create account
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'guest'
})

const authStore = useAuthStore()
const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const isFormValid = computed(() => {
  return form.email && 
         form.password && 
         form.password.length >= 6 && 
         form.password === form.confirmPassword
})

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await authStore.register({
      email: form.email,
      password: form.password
    })
  } catch (err) {
    error.value = err.data?.message || 'Failed to create account'
  } finally {
    loading.value = false
  }
}
</script>