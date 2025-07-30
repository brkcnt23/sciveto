// types/global.d.ts - Comprehensive auto-import definitions

declare global {
  // Vue Composition API
  const ref: typeof import('vue')['ref']
  const reactive: typeof import('vue')['reactive']
  const computed: typeof import('vue')['computed']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const onMounted: typeof import('vue')['onMounted']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const nextTick: typeof import('vue')['nextTick']
  const readonly: typeof import('vue')['readonly']
  const shallowRef: typeof import('vue')['shallowRef']
  
  // Nuxt Composables - Direct paths to avoid #imports issues
  const definePageMeta: typeof import('nuxt/app')['definePageMeta']
  const useSeoMeta: typeof import('nuxt/app')['useSeoMeta'] 
  const useHead: typeof import('nuxt/app')['useHead']
  const useRouter: typeof import('nuxt/app')['useRouter']
  const useRoute: typeof import('nuxt/app')['useRoute']
  const navigateTo: typeof import('nuxt/app')['navigateTo']
  const createError: typeof import('nuxt/app')['createError']
  const useRuntimeConfig: typeof import('nuxt/app')['useRuntimeConfig']
  
  // Pinia
  const defineStore: typeof import('pinia')['defineStore']
  
  // Fetch utilities
  const $fetch: typeof import('ofetch')['$fetch']
  
  // Nuxt UI
  const useToast: typeof import('@nuxt/ui')['useToast']
  
  // Custom stores - relative paths to avoid resolution issues
  const useAuthStore: () => import('./stores/auth').AuthStore
  
  // Custom composables
  const useDualToast: typeof import('./composables/useDualToast')['useDualToast']
  const useTheme: typeof import('./composables/useTheme')['useTheme']
}

// Module declarations for better IDE support
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

export {}