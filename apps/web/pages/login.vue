<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Sciveto
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </NuxtLink>
        </p>
      </div>
      
      <UCard class="p-6">
        <form @submit.prevent="handleLogin" class="space-y-6">
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
            <UFormGroup label="Password" required>
              <UInput
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
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
              :disabled="loading || !form.email || !form.password"
            >
              Sign in
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
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await authStore.login(form)
  } catch (err) {
    error.value = err.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>