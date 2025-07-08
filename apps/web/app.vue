<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Initialize auth store on app start
const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth()
})
</script>