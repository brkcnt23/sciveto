<!-- app.vue - TEMİZ VE ÇALIŞAN VERSİYON -->
<template>
  <UApp>
    <!-- Ana App Content -->
    <NuxtPage />

    <!-- Custom Toast System -->
    <Toast />
  </UApp>
</template>

<script setup>
// App-level configuration
useHead({
  titleTemplate: '%s - Sciveto',
  meta: [
    { name: 'viewport', content: 'Modern dashboard built with Nuxt UI v3', content: 'width=device-width, initial-scale=1' }
  ],
  htmlAttrs: {
    class: 'light' // ✅ Zorla açık mod
  }
})
</script>

<style>
/* Global styles */
body {
  font-family: 'Inter', system-ui, sans-serif;
}

/* Ensure our custom toasts are above everything */
#top-toasts,
#bottom-toasts {
  z-index: 9999 !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>