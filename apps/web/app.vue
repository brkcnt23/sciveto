<!-- app.vue -->
<template>
  <UApp>
    <!-- Ana App Content -->
    <NuxtPage />
    
    <!-- Toast Providers - Manuel positioning ile -->
    <Teleport to="body">
      <!-- Alert Toasts - Top Right -->
      <div id="alert-toaster" class="fixed top-16 right-4 z-50 pointer-events-none">
        <div class="space-y-2 pointer-events-auto max-w-sm w-full"></div>
      </div>
      
      <!-- Notification Toasts - Bottom Right -->  
      <div id="notification-toaster" class="fixed bottom-4 right-4 z-40 pointer-events-none">
        <div class="space-y-2 pointer-events-auto max-w-sm w-full"></div>
      </div>
    </Teleport>
  </UApp>
</template>

<script setup>
// App-level configuration
useHead({
  titleTemplate: '%s - Sciveto',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
/* Alert toasts styling (top) */
#alert-toaster .toast-item {
  animation: slide-in-from-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
}

/* Notification toasts styling (bottom) */
#notification-toaster .toast-item {
  animation: slide-in-from-bottom-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Animations */
@keyframes slide-in-from-right {
  from {
    opacity: 0;
    transform: translateX(100%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

@keyframes slide-in-from-bottom-right {
  from {
    opacity: 0;
    transform: translateX(100%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

/* Toast leave animations */
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>