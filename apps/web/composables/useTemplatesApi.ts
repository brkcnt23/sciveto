// composables/useTemplatesApi.ts
import { ref, readonly } from 'vue'

export interface TemplateField {
  id: string
  name: string
  label: string
  type: string
  required: boolean
  defaultValue?: string
  options?: any
  validation?: any
  unit?: string
  sortOrder: number
}

export interface TemplateStandard {
  id: string
  name: string
  value: string
  category?: string
  sortOrder: number
}

export interface SystemTemplate {
  id: string
  name: string
  version: string
  description?: string
  industry?: string
  icon?: string
  standards: TemplateStandard[]
  fields: TemplateField[]
}

export interface TemplateListResponse {
  templates: SystemTemplate[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useTemplatesApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all templates
  const fetchTemplates = async (): Promise<SystemTemplate[]> => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<TemplateListResponse>('http://localhost:3001/api/templates', {
        method: 'GET'
      })
      
      return data.templates || []
    } catch (err: any) {
      console.error('Templates fetch error:', err)
      error.value = err.message || 'Failed to fetch templates'
      return []
    } finally {
      loading.value = false
    }
  }

  // Fetch template by ID
  const fetchTemplate = async (id: string): Promise<SystemTemplate | null> => {
    loading.value = true
    error.value = null
    
    console.log('🔍 fetchTemplate called with ID:', id)

    try {
      console.log('📡 Making API request to:', `http://localhost:3001/api/templates/${id}`)
      const data = await $fetch<SystemTemplate>(`http://localhost:3001/api/templates/${id}`, {
        method: 'GET'
      })
      console.log('✅ Template API response:', data)
      
      return data
    } catch (err: any) {
      console.error('❌ Template fetch error:', err)
      error.value = err.message || 'Failed to fetch template'
      return null
    } finally {
      loading.value = false
    }
  }

  // Create category from template
  const createCategoryFromTemplate = async (payload: {
    templateId: string
    categoryName: string
    description?: string
    color?: string
  }): Promise<{ success: boolean; category?: any; message?: string }> => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<{ success: boolean; category?: any; message?: string }>('http://localhost:3001/api/templates/create-category', {
        method: 'POST',
        body: payload
      })
      
      return data
    } catch (err: any) {
      console.error('Create category error:', err)
      error.value = err.message || 'Failed to create category'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    fetchTemplates,
    fetchTemplate,
    createCategoryFromTemplate
  }
}
