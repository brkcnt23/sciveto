// types/global.d.ts - Complete auto-import definitions for VSCode

declare global {
  // Fetch utilities
  const $fetch: typeof import('ofetch')['$fetch']
  
  // Vue Router
  const useRouter: typeof import('nuxt/app')['useRouter']
  const useRoute: typeof import('nuxt/app')['useRoute']
  
  // Vue composition API
  const reactive: typeof import('vue')['reactive']
  const ref: typeof import('vue')['ref']
  const computed: typeof import('vue')['computed']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const onMounted: typeof import('vue')['onMounted']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const nextTick: typeof import('vue')['nextTick']
  
  // Nuxt app composables
  const definePageMeta: typeof import('nuxt/app')['definePageMeta']
  const useRuntimeConfig: typeof import('nuxt/app')['useRuntimeConfig']
  const navigateTo: typeof import('nuxt/app')['navigateTo']
  const createError: typeof import('nuxt/app')['createError']
  const useSeoMeta: typeof import('nuxt/app')['useSeoMeta']
  const useHead: typeof import('nuxt/app')['useHead']
  
  // Nuxt UI toast (standard)
  const useToast: typeof import('@nuxt/ui')['useToast']
  
  // Custom stores
  const useAuthStore: typeof import('~/stores/auth')['useAuthStore']
  
  // Custom composables
  const useDualToast: typeof import('~/composables/useDualToast')['useDualToast']
  const useTheme: typeof import('~/composables/useTheme')['useTheme']
}

export {}