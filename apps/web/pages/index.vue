<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Logo/Brand -->
      <div class="mb-8">
        <h1 class="text-6xl font-bold text-gray-900 mb-4">
          Sciveto
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Modern product management platform for teams that want to build amazing products together.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <UButton
          to="/login"
          size="xl"
          class="w-full sm:w-auto"
          icon="i-heroicons-arrow-right-circle"
        >
          Sign In
        </UButton>
        
        <UButton
          to="/register"
          size="xl"
          variant="outline"
          class="w-full sm:w-auto"
          icon="i-heroicons-user-plus"
        >
          Create Account
        </UButton>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <UCard>
          <div class="p-6 text-center">
            <Icon name="i-heroicons-cube" class="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Product Management
            </h3>
            <p class="text-gray-600">
              Organize and manage your products with advanced categorization and search capabilities.
            </p>
          </div>
        </UCard>

        <UCard>
          <div class="p-6 text-center">
            <Icon name="i-heroicons-users" class="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Team Collaboration
            </h3>
            <p class="text-gray-600">
              Work together with your team in a secure, multi-tenant environment.
            </p>
          </div>
        </UCard>

        <UCard>
          <div class="p-6 text-center">
            <Icon name="i-heroicons-chart-bar" class="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Analytics & Insights
            </h3>
            <p class="text-gray-600">
              Get detailed insights and analytics about your products and team performance.
            </p>
          </div>
        </UCard>
      </div>

      <!-- Footer -->
      <div class="mt-16 pt-8 border-t border-gray-200">
        <p class="text-gray-500 text-sm">
          © 2025 Sciveto. Built with NestJS and Nuxt 3.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

// Redirect authenticated users to dashboard
const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth()
  
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})
</script>