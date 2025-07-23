// composables/useCategoryManager.ts - Category Management Logic Fixed

import { ref, computed, readonly } from 'vue'
import type { Category, CategoryTemplate, CreateCategoryData, CategoryProperty } from '~/types/stock'
import { DEFAULT_CATEGORY_TEMPLATES } from '~/types/category'

export const useCategoryManager = () => {
  // State
  const categories = ref<Category[]>([])
  const categoryTemplates = ref<CreateCategoryData[]>([...DEFAULT_CATEGORY_TEMPLATES])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const categoryOptions = computed(() => {
    return categories.value.map(category => ({
      label: category.name,
      value: category.id,
      icon: category.icon,
      color: category.color
    }))
  })

  const categoriesWithStats = computed(() => {
    return categories.value.map(category => ({
      ...category,
      itemCount: Math.floor(Math.random() * 100) + 10, // Mock data
      totalValue: Math.floor(Math.random() * 50000) + 5000,
      lowStockItems: Math.floor(Math.random() * 10),
      activeProjects: Math.floor(Math.random() * 15),
      popularItems: []
    }))
  })

  // API Functions
  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800))

      // Mock categories with default ones
      const mockCategories: Category[] = DEFAULT_CATEGORY_TEMPLATES.map((template: any, index: number) => ({
        id: `cat-${index + 1}`,
        ...template,
        isDefault: true,
        properties: template.properties.map((prop: any, propIndex: number) => ({
          id: `prop-${index}-${propIndex}`,
          ...prop
        })),
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      categories.value = mockCategories
    } catch (err) {
      error.value = 'Failed to fetch categories'
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (data: CreateCategoryData): Promise<Category | null> => {
    loading.value = true
    error.value = null

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newCategory: Category = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        color: data.color,
        icon: data.icon,
        isDefault: false,
        properties: data.properties.map((prop: any, index: number) => ({
          id: `prop-${Date.now()}-${index}`,
          ...prop
        })),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      categories.value.push(newCategory)
      return newCategory
    } catch (err) {
      error.value = 'Failed to create category'
      console.error('Error creating category:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const updateCategory = async (id: string, data: Partial<CreateCategoryData>): Promise<Category | null> => {
    loading.value = true
    error.value = null

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800))

      const index = categories.value.findIndex(cat => cat.id === id)
      if (index === -1) {
        throw new Error('Category not found')
      }

      const updatedCategory: Category = {
        ...categories.value[index],
        name: data.name || categories.value[index].name,
        description: data.description ?? categories.value[index].description,
        color: data.color || categories.value[index].color,
        icon: data.icon || categories.value[index].icon,
        properties: data.properties 
          ? data.properties.map((prop: any, propIndex: number) => ({
              id: `prop-${Date.now()}-${propIndex}`,
              ...prop
            }))
          : categories.value[index].properties,
        updatedAt: new Date()
      }

      categories.value[index] = updatedCategory
      return updatedCategory
    } catch (err) {
      error.value = 'Failed to update category'
      console.error('Error updating category:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      // Check if category has items (mock check)
      const hasItems = Math.random() > 0.7 // 30% chance of having items
      if (hasItems) {
        throw new Error('Cannot delete category with existing items')
      }

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const index = categories.value.findIndex(cat => cat.id === id)
      if (index === -1) {
        throw new Error('Category not found')
      }

      categories.value.splice(index, 1)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete category'
      console.error('Error deleting category:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const getCategoryById = (id: string): Category | undefined => {
    return categories.value.find(cat => cat.id === id)
  }

  const getCategoryTemplateById = (id: string): CreateCategoryData | undefined => {
    return categoryTemplates.value.find(template => 
      template.name.toLowerCase() === id.toLowerCase()
    )
  }

  // Template management
  const addCustomTemplate = (template: CreateCategoryData) => {
    categoryTemplates.value.push({ ...template })
  }

  const getTemplateByName = (name: string): CreateCategoryData | undefined => {
    return categoryTemplates.value.find(template => 
      template.name.toLowerCase() === name.toLowerCase()
    )
  }

  // Property helpers
  const createProperty = (
    name: string, 
    type: CategoryProperty['type'], 
    required = false,
    options?: string[],
    placeholder?: string,
    unit?: string
  ): Omit<CategoryProperty, 'id'> => {
    return {
      name,
      type,
      required,
      options: options || undefined,
      placeholder: placeholder || undefined,
      unit: unit || undefined
    }
  }

  const validateCategory = (data: CreateCategoryData): string[] => {
    const errors: string[] = []

    if (!data.name.trim()) {
      errors.push('Category name is required')
    }

    if (data.name.trim().length < 2) {
      errors.push('Category name must be at least 2 characters')
    }

    if (!data.color) {
      errors.push('Category color is required')
    }

    if (!data.icon) {
      errors.push('Category icon is required')
    }

    // Check for duplicate property names
    const propertyNames = data.properties.map(p => p.name.toLowerCase())
    const duplicates = propertyNames.filter((name, index) => 
      propertyNames.indexOf(name) !== index
    )
    
    if (duplicates.length > 0) {
      errors.push('Property names must be unique')
    }

    // Validate properties
    data.properties.forEach((property, index) => {
      if (!property.name.trim()) {
        errors.push(`Property ${index + 1}: Name is required`)
      }

      if (property.type === 'select' && (!property.options || property.options.length === 0)) {
        errors.push(`Property ${index + 1}: Select type requires options`)
      }
    })

    return errors
  }

  // Initialize
  const initialize = async () => {
    await fetchCategories()
  }

  return {
    // State
    categories: readonly(categories),
    categoryTemplates: readonly(categoryTemplates),
    loading: readonly(loading),
    error: readonly(error),

    // Computed
    categoryOptions,
    categoriesWithStats,

    // API Functions
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,

    // Helper Functions
    getCategoryById,
    getCategoryTemplateById,
    getTemplateByName,
    addCustomTemplate,
    createProperty,
    validateCategory,

    // Initialize
    initialize
  }
}