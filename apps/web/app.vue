<template>
  <div>
    <NuxtPage />
    <ToastContainer />
  </div>
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