<!-- app.vue - GLOBAL LAYOUT WITH SIDEBAR -->
<template>
  <UApp>
    <!-- Global Layout with Sidebar -->
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Sidebar - Always visible -->
      <AppSidebar
        v-model:collapsed="sidebarCollapsed"
        :user="user"
        :notification-count="notificationCount"
        @sign-out="handleSignOut"
      />

      <!-- Main Content Area -->
      <div
        :class="[
          'transition-all duration-300 ease-in-out',
          'ml-16' // Always leave space for collapsed sidebar
        ]"
      >
        <!-- Page Content -->
        <NuxtPage />
      </div>
    </div>

    <!-- Custom Toast System -->
    <Toast />
  </UApp>
</template>

<script setup>
// App-level configuration
useHead({
  titleTemplate: '%s - Sciveto',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  htmlAttrs: {
    class: 'light' // ✅ Zorla açık mod
  }
})

// Global error handling
const handleError = (error) => {
  console.error('Global error:', error)
}

// Provide error handler
provide('error-handler', handleError)

// Global sidebar state
const sidebarCollapsed = ref(true) // Default collapsed
const notificationCount = ref(3)

// User data (should come from auth store)
const user = ref({
  name: 'John Doe',
  email: 'john@example.com'
})

// Sign out handler
const handleSignOut = () => {
  // Handle sign out logic
  console.log('Signing out...')
}
</script>

<style>
/* Global styles */
html {
  height: 100%;
}

body {
  min-height: 100%;
  font-family: 'Inter', system-ui, sans-serif;
}

/* Ensure smooth transitions for theme switching */
* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

/* Dark mode improvements */
@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

/* Focus styles for accessibility - Fixed for Tailwind v4 */
:focus-visible {
  outline: 2px solid rgb(34 197 94); /* green-500 equivalent */
  outline-offset: 2px;
}

/* Custom scrollbar - Fixed for Tailwind v4 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgb(241 245 249); /* neutral-100 equivalent */
}

::-webkit-scrollbar-thumb {
  background: rgb(203 213 225); /* neutral-300 equivalent */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(148 163 184); /* neutral-400 equivalent */
}

@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: rgb(30 41 59); /* neutral-800 equivalent */
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgb(71 85 105); /* neutral-600 equivalent */
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(100 116 139); /* neutral-500 equivalent */
  }
}

/* Ensure our custom toasts are above everything */
#top-toasts,
#bottom-toasts {
  z-index: 9999 !important;
}

/* Custom Design Tokens for Components */
:root {
  --avatar-primary-bg: rgb(34 197 94);
  --avatar-secondary-bg: rgb(59 130 246);
  --avatar-success-bg: rgb(16 185 129);
  --avatar-info-bg: rgb(59 130 246);
  --avatar-warning-bg: rgb(245 158 11);
  --avatar-error-bg: rgb(239 68 68);
  --avatar-neutral-bg: rgb(100 116 139);
}

@media (prefers-color-scheme: dark) {
  :root {
    --avatar-primary-bg: rgb(74 222 128);
    --avatar-secondary-bg: rgb(96 165 250);
    --avatar-success-bg: rgb(52 211 153);
    --avatar-info-bg: rgb(96 165 250);
    --avatar-warning-bg: rgb(251 191 36);
    --avatar-error-bg: rgb(248 113 113);
    --avatar-neutral-bg: rgb(148 163 184);
  }
}

/* Enhanced gradients for Avatar component */
.gradient-blue {
  background: linear-gradient(135deg, rgb(96 165 250), rgb(139 92 246));
}

.gradient-green {
  background: linear-gradient(135deg, rgb(52 211 153), rgb(59 130 246));
}

.gradient-purple {
  background: linear-gradient(135deg, rgb(168 85 247), rgb(236 72 153));
}

.gradient-pink {
  background: linear-gradient(135deg, rgb(244 114 182), rgb(239 68 68));
}

.gradient-orange {
  background: linear-gradient(135deg, rgb(251 146 60), rgb(245 158 11));
}

/* Status indicator animations */
@keyframes pulse-status {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.pulse-status {
  animation: pulse-status 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* Glass effect utility */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (prefers-color-scheme: dark) {
  .glass-effect {
    background: rgba(30, 41, 59, 0.3);
    border: 1px solid rgba(71, 85, 105, 0.3);
  }
}
</style>