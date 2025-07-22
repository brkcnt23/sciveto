<!-- app.vue - Updated with Advanced Theme System -->
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { onErrorCaptured, watch } from 'vue'
import { useTheme } from '~/composables/useTheme'

// SEO and Meta
useHead({
  title: 'Sciveto - Modern Dashboard',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Modern dashboard built with Nuxt UI v3' },
    { name: 'theme-color', content: '#16a34a', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#22c55e', media: '(prefers-color-scheme: dark)' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

// Initialize theme system with global events
const { state: themeState } = useTheme({
  autoMode: 'system',
  enableTransitions: true,
  enableKeyboardShortcuts: true,
  transitionDuration: 250
}, {
  onAfterChange: (theme: 'light' | 'dark') => {
    // Update meta theme-color dynamically
    const metaTag = document.querySelector('meta[name="theme-color"]')
    if (metaTag) {
      const color = theme === 'dark' ? '#22c55e' : '#16a34a'
      metaTag.setAttribute('content', color)
    }
    
    // Update document color scheme
    document.documentElement.style.colorScheme = theme
  }
})

// Global theme state for debugging (development only)
if (process.env.NODE_ENV === 'development') {
  watch(themeState, (newState: any) => {
    console.log('[App] Theme state updated:', newState)
  }, { deep: true })
}

// Error handling
onErrorCaptured((error: Error, instance: any, info: string) => {
  console.error('[App] Error captured:', error, info)
  return false
})
</script>

<style>
/* Global styles that work with the theme system */
html {
  /* Smooth transitions for theme changes */
  transition: color-scheme 250ms ease-in-out;
  /* Remove auto scroll behavior */
}

body {
  /* Ensure body inherits the theme correctly */
  color: rgb(var(--color-gray-900) / var(--tw-text-opacity, 1));
  background-color: rgb(var(--color-white) / var(--tw-bg-opacity, 1));
  
  /* Improve font rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Dark mode body styles */
html.dark body {
  color: rgb(var(--color-gray-100) / var(--tw-text-opacity, 1));
  background-color: rgb(var(--color-gray-900) / var(--tw-bg-opacity, 1));
}

/* Ensure smooth transitions during theme changes */
*,
*::before,
*::after {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Prevent layout shift during theme transitions */
img, svg, video {
  transition: opacity 150ms ease-in-out;
}

/* Focus styles that work in both themes */
:focus-visible {
  outline: 2px solid rgb(var(--color-primary-500));
  outline-offset: 2px;
}

/* Custom scrollbar that adapts to theme */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--color-gray-100));
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--color-gray-300));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--color-gray-400));
}

/* Dark mode scrollbar */
html.dark ::-webkit-scrollbar-track {
  background: rgb(var(--color-gray-800));
}

html.dark ::-webkit-scrollbar-thumb {
  background: rgb(var(--color-gray-600));
}

html.dark ::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--color-gray-500));
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Print styles */
@media print {
  * {
    transition: none !important;
    animation: none !important;
  }
  
  html {
    color-scheme: light !important;
  }
}
</style>