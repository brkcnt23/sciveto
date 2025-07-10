<template>
  <UApp>
    <NuxtPage />
    <ToastContainer />
  </UApp>
</template>

<script setup>

const authStore = useAuthStore()

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

onMounted(() => {
  authStore.initializeAuth()
})

</script>