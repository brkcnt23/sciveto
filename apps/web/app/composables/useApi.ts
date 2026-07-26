import { useAuthStore } from '~/stores/auth'

type ApiInstance = ReturnType<typeof $fetch.create>

function isApiUrl(url: string, apiBase?: string) {
  // Sadece kendi API'nize yetki başlığı gönderin
  if (url.startsWith('/api')) return true
  try {
    if (!apiBase) return false
    const u = new URL(url, apiBase)
    const b = new URL(apiBase)
    return u.origin === b.origin
  } catch { return false }
}

export function useApi(): ApiInstance {
  // Uygulama ömrü boyunca tek instance (yeniden yaratmayı önler)
  const apiRef = useState<ApiInstance>('_api', () => {
    const config = useRuntimeConfig()
    const auth = useAuthStore()

    return $fetch.create({
      baseURL: config.public.apiBase,      // NUXT_PUBLIC_API_BASE=...
      credentials: 'include',              // gerekiyorsa
      retry: 0,                            // istersen arttır
      timeout: 15_000,

      onRequest({ request, options }) {
        const url = typeof request === 'string' ? request : String(request)
        console.log('🚀 API Request:', url)

        // Token'ı client'ta store'dan, server'da cookie'den al
        const token = process.client
          ? auth.token
          : useCookie<string | null>('auth_token').value

        console.log('🔑 Token found:', !!token, token ? `${token.substring(0, 20)}...` : 'null')

        if (token && isApiUrl(url, config.public.apiBase)) {
          // Type-safe header handling
          const headers = options.headers || {}
          if (headers instanceof Headers) {
            headers.set('Authorization', `Bearer ${token}`)
            options.headers = headers
          } else {
            // Create new Headers object
            const newHeaders = new Headers()
            
            // Copy existing headers
            if (typeof headers === 'object' && headers !== null) {
              Object.entries(headers as Record<string, string>).forEach(([key, value]) => {
                newHeaders.set(key, value)
              })
            }
            
            // Add authorization header
            newHeaders.set('Authorization', `Bearer ${token}`)
            options.headers = newHeaders
          }
        }
      },

      onResponseError({ response }) {
        if (response?.status === 401) {
          if (process.client) {
            const auth = useAuthStore()
            auth.logout()
            // login'e yönlendir
            navigateTo('/login')
          } else {
            // SSR tarafında hatayı üst kata fırlat
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
          }
        }
      },
    })
  })

  return apiRef.value
}

// İstersen yardımcı kısayollar:
export async function apiGet<T>(url: string, opts?: any) {
  return useApi()<T>(url, { method: 'GET', ...opts })
}

export async function apiPost<T>(url: string, body?: unknown, opts?: any) {
  return useApi()<T>(url, { method: 'POST', body, ...opts })
}

export async function apiPatch<T>(url: string, body?: unknown, opts?: any) {
  return useApi()<T>(url, { method: 'PATCH', body, ...opts })
}

export async function apiDelete<T>(url: string, opts?: any) {
  return useApi()<T>(url, { method: 'DELETE', ...opts })
}
