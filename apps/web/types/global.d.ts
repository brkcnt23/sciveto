// Create this file: apps/web/types/global.d.ts

declare global {
  const $fetch: typeof import('ofetch')['$fetch']
  const useRouter: typeof import('vue-router')['useRouter']
  const useRoute: typeof import('vue-router')['useRoute']
  const useToast: typeof import('@nuxt/ui')['useToast']
  const useAuthStore: typeof import('~/stores/auth')['useAuthStore']
  const definePageMeta: typeof import('#imports')['definePageMeta']
  const reactive: typeof import('vue')['reactive']
  const ref: typeof import('vue')['ref']
  const computed: typeof import('vue')['computed']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const onMounted: typeof import('vue')['onMounted']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const nextTick: typeof import('vue')['nextTick']
  const useRuntimeConfig: typeof import('#app')['useRuntimeConfig']
  const navigateTo: typeof import('#app')['navigateTo']
  const createError: typeof import('#app')['createError']
}

export {}