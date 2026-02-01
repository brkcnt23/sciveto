<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <div class="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
      <div class="px-4 py-6 sm:px-6 lg:px-8 flex items-center gap-4">
        <UButton to="/projects" icon="i-lucide-arrow-left" variant="ghost" />
        <div>
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Create Project</h1>
          <p class="text-neutral-600 dark:text-neutral-400">Define project details and budget.</p>
        </div>
      </div>
    </div>

    <div class="px-4 py-6 sm:px-6 lg:px-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">Project Information</h2>
        </template>

        <form class="space-y-6" @submit.prevent="submit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Project Name" required>
              <UInput v-model="form.name" placeholder="Project name" />
            </UFormGroup>

            <UFormGroup label="Project Code">
              <UInput v-model="form.projectCode" placeholder="PRJ-2026-001" />
            </UFormGroup>

            <UFormGroup label="Client Name">
              <UInput v-model="form.clientName" placeholder="Client name" />
            </UFormGroup>

            <UFormGroup label="Location">
              <UInput v-model="form.location" placeholder="Location" />
            </UFormGroup>

            <UFormGroup label="Start Date">
              <UInput v-model="form.startDate" type="date" />
            </UFormGroup>

            <UFormGroup label="End Date">
              <UInput v-model="form.endDate" type="date" />
            </UFormGroup>

            <UFormGroup label="Estimated Budget">
              <UInput v-model.number="form.estimatedBudget" type="number" min="0" step="0.01" />
            </UFormGroup>

            <UFormGroup label="Status">
              <USelect v-model="form.status" :options="statusOptions" />
            </UFormGroup>

            <UFormGroup label="Priority">
              <USelect v-model="form.priority" :options="priorityOptions" />
            </UFormGroup>
          </div>

          <UFormGroup label="Description">
            <UTextarea v-model="form.description" :rows="4" placeholder="Project description" />
          </UFormGroup>

          <div class="flex justify-end gap-3">
            <UButton variant="outline" to="/projects">Cancel</UButton>
            <UButton color="primary" type="submit" :loading="saving" :disabled="!isValid">
              Create Project
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useProjects } from '~/composables/useProjects'
import { useDualToast } from '~/composables/useDualToast'

const { createProject } = useProjects()
const toast = useDualToast()
const saving = ref(false)

const form = reactive({
  name: '',
  projectCode: '',
  description: '',
  clientName: '',
  location: '',
  startDate: '',
  endDate: '',
  estimatedBudget: 0,
  status: 'PLANNING',
  priority: 'MEDIUM'
})

const statusOptions = [
  { label: 'Planning', value: 'PLANNING' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'On Hold', value: 'ON_HOLD' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Cancelled', value: 'CANCELLED' }
]

const priorityOptions = [
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
  { label: 'Urgent', value: 'URGENT' }
]

const isValid = computed(() => form.name.trim().length > 0)

const submit = async () => {
  if (!isValid.value) return
  saving.value = true
  try {
    const project = await createProject({
      name: form.name,
      projectCode: form.projectCode || undefined,
      description: form.description || undefined,
      clientName: form.clientName || undefined,
      location: form.location || undefined,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      estimatedBudget: form.estimatedBudget || undefined,
      status: form.status || undefined,
      priority: form.priority || undefined
    })
    toast.success('Project created', 'Project created successfully')
    await navigateTo(`/projects/${project.id}`)
  } catch (error) {
    console.error('Create project error:', error)
    toast.error('Create failed', 'Unable to create project')
  } finally {
    saving.value = false
  }
}

definePageMeta({
  title: 'Create Project',
  layout: 'default'
})
</script>
