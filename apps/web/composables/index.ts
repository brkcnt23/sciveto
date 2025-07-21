// composables/index.ts - Explicit exports for better TypeScript support

// Re-export useTheme
export { useTheme } from './useTheme'
export type { ThemeConfig, ThemeState, ThemeEvents } from './useTheme'

// Global type augmentation to ensure TypeScript recognizes our composables
declare global {
  // Nuxt global types
  // const useHead: typeof import('@nuxt/kit')['useHead']
  // const useColorMode: typeof import('@nuxtjs/color-mode')['useColorMode']
  //const defineNuxtPlugin: typeof import('#app')['defineNuxtPlugin']
  //const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  //const watch: typeof import('vue')['watch']
  //const computed: typeof import('vue')['computed']
  //const ref: typeof import('vue')['ref']
  //const reactive: typeof import('vue')['reactive']
  //const onMounted: typeof import('vue')['onMounted']
  //const onUnmounted: typeof import('vue')['onUnmounted']
  //const nextTick: typeof import('vue')['nextTick']
  //const readonly: typeof import('vue')['readonly']
}

export {}