<template>
  <div class="space-y-8">
    <!-- Feedback Components Header -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-message-circle" class="w-6 h-6 text-primary" />
          <h2 class="text-2xl font-bold text-highlighted">Feedback Components</h2>
        </div>
      </template>
    </UCard>

    <!-- Alert Components -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-alert-circle" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Alert Components</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          UAlert component'i ile önemli bilgileri vurgulayın. 
          Farklı renk ve variant'lar ile mesaj tipini belirtin.
        </p>

        <div class="grid gap-4">
          <UAlert color="success" variant="soft">
            <template #title>Success Alert</template>
            <template #description>
              Your changes have been saved successfully.
            </template>
          </UAlert>

          <UAlert color="error" variant="soft">
            <template #title>Error Alert</template>
            <template #description>
              There was an error processing your request. Please try again.
            </template>
          </UAlert>

          <UAlert color="warning" variant="soft">
            <template #title>Warning Alert</template>
            <template #description>
              This action cannot be undone. Please proceed with caution.
            </template>
          </UAlert>

          <UAlert color="info" variant="soft">
            <template #title>Information Alert</template>
            <template #description>
              New features are available. Check out the latest updates.
            </template>
          </UAlert>
        </div>

        <!-- Alert Variants -->
        <div class="space-y-4">
          <h4 class="font-semibold text-highlighted">Alert Variants</h4>
          <div class="grid gap-3">
            <UAlert color="primary" variant="solid" title="Solid Variant" description="Solid background alert" />
            <UAlert color="primary" variant="outline" title="Outline Variant" description="Outlined alert" />
            <UAlert color="primary" variant="subtle" title="Subtle Variant" description="Subtle background alert" />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Modal Components -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-square" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Modal Components</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          UModal component'i ile dialog'lar oluşturun. 
          Nuxt UI v3'te v-model:open directive kullanılır.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UButton @click="showBasicModal = true">
            <UIcon name="i-lucide-square" class="w-4 h-4 mr-2" />
            Basic Modal
          </UButton>
          
          <UButton @click="showConfirmModal = true">
            <UIcon name="i-lucide-help-circle" class="w-4 h-4 mr-2" />
            Confirm Modal
          </UButton>
          
          <UButton @click="showFormModal = true">
            <UIcon name="i-lucide-edit" class="w-4 h-4 mr-2" />
            Form Modal
          </UButton>
        </div>

        <!-- Basic Modal -->
        <UModal v-model:open="showBasicModal" title="Basic Modal" description="This is a basic modal example">
          <template #body>
            <div class="space-y-4">
              <p class="text-muted">
                This is the modal content. You can put any content here.
              </p>
              <div class="bg-neutral-50 p-4 rounded-lg">
                <h4 class="font-semibold text-highlighted mb-2">Modal Features</h4>
                <ul class="space-y-1 text-sm text-muted">
                  <li>• Overlay backdrop</li>
                  <li>• ESC key to close</li>
                  <li>• Click outside to close</li>
                  <li>• Focus management</li>
                </ul>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton variant="outline" @click="showBasicModal = false">Cancel</UButton>
              <UButton @click="showBasicModal = false">OK</UButton>
            </div>
          </template>
        </UModal>

        <!-- Confirm Modal -->
        <UModal v-model:open="showConfirmModal" title="Confirm Action" description="Are you sure you want to proceed?">
          <template #body>
            <div class="space-y-4">
              <UAlert color="warning" variant="soft">
                <template #title>Warning</template>
                <template #description>
                  This action cannot be undone. Please confirm that you want to proceed.
                </template>
              </UAlert>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton variant="outline" @click="showConfirmModal = false">Cancel</UButton>
              <UButton color="error" @click="handleConfirm">Confirm</UButton>
            </div>
          </template>
        </UModal>

        <!-- Form Modal -->
        <UModal v-model:open="showFormModal" title="Create Project" description="Fill in the project details">
          <template #body>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-highlighted mb-2">Project Name</label>
                <UInput v-model="modalForm.name" placeholder="Enter project name" />
              </div>
              <div>
                <label class="block text-sm font-medium text-highlighted mb-2">Description</label>
                <UTextarea v-model="modalForm.description" placeholder="Enter project description" />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton variant="outline" @click="showFormModal = false">Cancel</UButton>
              <UButton @click="handleFormSubmit">Create Project</UButton>
            </div>
          </template>
        </UModal>
      </div>
    </UCard>

    <!-- Loading States -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-loader" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Loading States</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          Loading state'leri ile kullanıcıya işlem durumu hakkında bilgi verin.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Button Loading States</h4>
            <div class="space-y-3">
              <UButton :loading="isLoading" @click="toggleLoading">
                {{ isLoading ? 'Loading...' : 'Click to Load' }}
              </UButton>
              
              <UButton :loading="isSubmitting" color="success" @click="simulateSubmit">
                {{ isSubmitting ? 'Submitting...' : 'Submit Form' }}
              </UButton>
              
              <UButton :loading="isDeleting" color="error" @click="simulateDelete">
                {{ isDeleting ? 'Deleting...' : 'Delete Item' }}
              </UButton>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Skeleton Loaders</h4>
            <div class="space-y-3">
              <div class="animate-pulse">
                <div class="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-neutral-200 rounded w-1/2 mb-2"></div>
                <div class="h-4 bg-neutral-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
// Component name for debugging
defineOptions({
  name: 'FeedbackShowcase'
})


// Reactive state
const showBasicModal = ref(false)
const showConfirmModal = ref(false)
const showFormModal = ref(false)
const isLoading = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)

const modalForm = ref({
  name: '',
  description: ''
})


// Modal handlers
const handleConfirm = () => {
  showConfirmModal.value = false
  toast.add({
    title: 'Confirmed',
    description: 'Action has been confirmed.',
    color: 'success',
    icon: 'i-lucide-check'
  })
}

const handleFormSubmit = () => {
  if (!modalForm.value.name) {
    toast.add({
      title: 'Validation Error',
      description: 'Project name is required.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    return
  }
  
  showFormModal.value = false
  toast.add({
    title: 'Project Created',
    description: `Project "${modalForm.value.name}" has been created.`,
    color: 'success',
    icon: 'i-lucide-check'
  })
  
  // Reset form
  modalForm.value = { name: '', description: '' }
}

// Loading state handlers
const toggleLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    toast.add({
      title: 'Loaded',
      description: 'Data has been loaded successfully.',
      color: 'success',
      icon: 'i-lucide-check'
    })
  }, 2000)
}

const simulateSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    toast.add({
      title: 'Form Submitted',
      description: 'Your form has been submitted successfully.',
      color: 'success',
      icon: 'i-lucide-check'
    })
  }, 1500)
}

const simulateDelete = () => {
  isDeleting.value = true
  setTimeout(() => {
    isDeleting.value = false
    toast.add({
      title: 'Item Deleted',
      description: 'The item has been deleted permanently.',
      color: 'success',
      icon: 'i-lucide-trash'
    })
  }, 1000)
}

// Meta info
useHead({
  title: 'Feedback Components - Showcase'
})
</script>