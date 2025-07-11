<!-- app.vue -->
<template>
  <UApp>
    <!-- Ana App Content -->
    <NuxtPage />
    
    <!-- Global Toast System -->
    <Toast />
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

// Global toast configuration
const appConfig = useAppConfig()

// Configure Nuxt UI v3 toaster globally if needed
if (appConfig.ui?.notifications) {
  appConfig.ui.notifications = {
    position: 'top-right', // Default position
    strategy: 'replace', // or 'add'
    timeout: 5000,
    ...appConfig.ui.notifications
  }
}
</script>

<style>
/* Global styles for our toast system */
body {
  font-family: 'Inter', system-ui, sans-serif;
}

/* Enhanced backdrop blur for toasts */
.toast-container {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Global toast enter/leave animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

/* Alert-specific animations (top toasts) */
.alert-toast-enter-from {
  opacity: 0;
  transform: translateX(100%) translateY(-20px);
}

.alert-toast-leave-to {
  opacity: 0;
  transform: translateX(100%) translateY(-20px);
}

/* Notification-specific animations (bottom toasts) */
.notification-toast-enter-from {
  opacity: 0;
  transform: translateX(100%) translateY(20px);
}

.notification-toast-leave-to {
  opacity: 0;
  transform: translateX(100%) translateY(20px);
}

/* Custom scrollbar for better aesthetics */
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

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

/* Focus management for accessibility */
.toast-item:focus {
  outline: 2px solid rgb(59 130 246);
  outline-offset: 2px;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .alert-toast-enter-from,
  .alert-toast-leave-to,
  .notification-toast-enter-from,
  .notification-toast-leave-to {
    transition: opacity 0.2s ease;
    transform: none;
  }
}
</style>