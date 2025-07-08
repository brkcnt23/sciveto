<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Sciveto Dashboard</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">
              Welcome, {{ authStore.user?.email }}
            </span>
            <UButton 
              variant="outline" 
              @click="handleLogout"
              :loading="logoutLoading"
            >
              Logout
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl py-6 px-6 lg:px-8">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p class="mt-1 text-sm text-gray-600">
          Manage your products and organization settings
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <UCard>
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Icon name="i-heroicons-users" class="h-8 w-8 text-blue-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    1
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Icon name="i-heroicons-cube" class="h-8 w-8 text-green-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Stock Items
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Icon name="i-heroicons-building-office" class="h-8 w-8 text-purple-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Organizations
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    1
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Icon name="i-heroicons-chart-bar" class="h-8 w-8 text-orange-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Active Projects
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Quick Actions
          </h3>
          <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <UButton
              to="/stock-items"
              icon="i-heroicons-cube"
              size="lg"
              variant="outline"
              block
            >
              Manage Stock Items
            </UButton>
            <UButton
              to="/categories"
              icon="i-heroicons-tag"
              size="lg"
              variant="outline"
              block
            >
              Manage Categories
            </UButton>
            <UButton
              to="/projects"
              icon="i-heroicons-briefcase"
              size="lg"
              variant="outline"
              block
            >
              Manage Projects
            </UButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const logoutLoading = ref(false)

// Initialize auth state
onMounted(() => {
  authStore.initializeAuth()
})

const handleLogout = async () => {
  logoutLoading.value = true
  try {
    await authStore.logout()
  } finally {
    logoutLoading.value = false
  }
}
</script>