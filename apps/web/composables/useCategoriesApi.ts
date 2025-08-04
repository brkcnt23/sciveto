// composables/useCategoriesApi.ts - Real API Integration
import { ref, readonly } from 'vue'
import type { Category } from '~/types/category'

export interface ApiCategory {
  id: string
  name: string
  description?: string
  color: string
  organizationId: string
  templateId?: string
  templateVersion?: string
  isSystemBased: boolean
  customFields?: any
  createdAt: string
  updatedAt: string
  // Frontend-specific properties
  icon?: string
  itemCount?: number
  _count?: {
    stockItems: number
  }
}

export interface CreateCategoryPayload {
  name: string
  description?: string
  color?: string
  templateId?: string
  customFields?: any
}

export const useCategoriesApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Dönüştürme yardımcı fonksiyonu: API yanıtını UI'a uygun hale getiriyoruz
  const transformApiCategory = (category: ApiCategory): ApiCategory => {
    // Default ikon değeri atama
    if (!category.icon) {
      // Kategori adına göre ikon belirleme
      const iconMap: Record<string, string> = {
        'Membran': 'i-lucide-layers',
        'Halat': 'i-lucide-git-branch',
        'Profil': 'i-lucide-box',
        'Plaka': 'i-lucide-square',
        'Özel': 'i-lucide-wrench'
      };
      
      // Kategori adında başına eklenmiş sayıları temizle
      const cleanName = category.name.replace(/\s*\(\d+\)$/g, '');
      category.icon = iconMap[cleanName] || 'i-lucide-folder';
    }
    
    return {
      ...category,
      // Eğer _count yoksa itemCount değerini kullan
      _count: category._count || (category.itemCount !== undefined ? { stockItems: category.itemCount } : { stockItems: 0 })
    };
  };

  // Fetch all categories
  const fetchCategories = async (): Promise<ApiCategory[]> => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<ApiCategory[]>('/api/categories', {
        method: 'GET',
        headers: useRequestHeaders(['cookie'])
      })
      
      // API yanıtlarını dönüştür
      return Array.isArray(data) 
        ? data.map(category => transformApiCategory(category)) 
        : [];
    } catch (err: any) {
      console.error('Categories fetch error:', err)
      error.value = err.message || 'Kategoriler yüklenemedi'
      return []
    } finally {
      loading.value = false
    }
  }

  // Create new category
  const createCategory = async (payload: CreateCategoryPayload): Promise<ApiCategory | null> => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<ApiCategory>('/api/categories', {
        method: 'POST',
        body: payload,
        headers: useRequestHeaders(['cookie'])
      })
      
      return data ? transformApiCategory(data) : null
    } catch (err: any) {
      console.error('Category creation error:', err)
      error.value = err.message || 'Kategori oluşturulamadı'
      return null
    } finally {
      loading.value = false
    }
  }

  // Get single category
  const getCategory = async (id: string): Promise<ApiCategory | null> => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<ApiCategory>(`/api/categories/${id}`, {
        method: 'GET',
        headers: useRequestHeaders(['cookie'])
      })
      
      return data ? transformApiCategory(data) : null
    } catch (err: any) {
      console.error('Category fetch error:', err)
      error.value = err.message || 'Kategori bulunamadı'
      return null
    } finally {
      loading.value = false
    }
  }

  // Update category
  const updateCategory = async (id: string, payload: Partial<CreateCategoryPayload>): Promise<ApiCategory | null> => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<ApiCategory>(`/api/categories/${id}`, {
        method: 'PATCH',
        body: payload,
        headers: useRequestHeaders(['cookie'])
      })
      
      return data ? transformApiCategory(data) : null
    } catch (err: any) {
      console.error('Category update error:', err)
      error.value = err.message || 'Kategori güncellenemedi'
      return null
    } finally {
      loading.value = false
    }
  }

  // Delete category
  const deleteCategory = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      await $fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: useRequestHeaders(['cookie'])
      })
      
      return true
    } catch (err: any) {
      console.error('Category deletion error:', err)
      error.value = err.message || 'Kategori silinemedi'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    fetchCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
  }
}
