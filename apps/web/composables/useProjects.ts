import { useApi } from '~/composables/useApi'

type ProjectQuery = {
  search?: string
  status?: string
  priority?: string
  managerId?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

type ProjectResponse<T> = {
  data: T[]
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

type AllocateMaterialPayload = {
  stockItemId: string
  allocatedQuantity: number
  allocatedPrice: number
  notes?: string
}

export const useProjects = () => {
  const api = useApi()

  const fetchProjects = async <T = any>(query: ProjectQuery = {}): Promise<ProjectResponse<T>> => {
    return await api('/projects', { params: query })
  }

  const fetchProject = async <T = any>(id: string): Promise<T> => {
    return await api(`/projects/${id}`)
  }

  const createProject = async <T = any>(data: Record<string, any>): Promise<T> => {
    return await api('/projects', {
      method: 'POST',
      body: data,
    })
  }

  const updateProject = async <T = any>(id: string, data: Record<string, any>): Promise<T> => {
    return await api(`/projects/${id}`, {
      method: 'PATCH',
      body: data,
    })
  }

  const deleteProject = async (id: string): Promise<void> => {
    await api(`/projects/${id}`, { method: 'DELETE' })
  }

  const fetchProjectAllocations = async <T = any>(projectId: string): Promise<T[]> => {
    return await api(`/projects/${projectId}/allocations`)
  }

  const allocateMaterial = async <T = any>(projectId: string, payload: AllocateMaterialPayload): Promise<T> => {
    return await api(`/projects/${projectId}/allocations`, {
      method: 'POST',
      body: payload,
    })
  }

  return {
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
    fetchProjectAllocations,
    allocateMaterial,
  }
}
