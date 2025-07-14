<template>
  <UCard class="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6 text-emerald-600" />
        <h3 class="text-lg font-bold text-emerald-800">Core UI Components</h3>
        <UBadge color="success" variant="subtle">Nuxt UI v3</UBadge>
      </div>
    </template>

    <div class="space-y-8">
      <!-- Button Showcase -->
      <div>
        <h4 class="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-cursor-arrow-ripple" class="w-5 h-5" />
          Buttons with New Color System
        </h4>
        
        <div class="space-y-4">
          <!-- Solid Variants -->
          <div>
            <p class="text-sm text-muted mb-2">Solid Variants:</p>
            <div class="flex flex-wrap gap-3">
              <UButton color="primary">Primary</UButton>
              <UButton color="secondary">Secondary</UButton>
              <UButton color="success">Success</UButton>
              <UButton color="warning">Warning</UButton>
              <UButton color="error">Error</UButton>
              <UButton color="neutral">Neutral</UButton>
            </div>
          </div>

          <!-- Outline Variants -->
          <div>
            <p class="text-sm text-muted mb-2">Outline Variants:</p>
            <div class="flex flex-wrap gap-3">
              <UButton color="primary" variant="outline">Primary</UButton>
              <UButton color="secondary" variant="outline">Secondary</UButton>
              <UButton color="success" variant="outline">Success</UButton>
              <UButton color="warning" variant="outline">Warning</UButton>
              <UButton color="error" variant="outline">Error</UButton>
              <UButton color="neutral" variant="outline">Neutral</UButton>
            </div>
          </div>

          <!-- Ghost Variants -->
          <div>
            <p class="text-sm text-muted mb-2">Ghost Variants:</p>
            <div class="flex flex-wrap gap-3">
              <UButton color="primary" variant="ghost">Primary</UButton>
              <UButton color="secondary" variant="ghost">Secondary</UButton>
              <UButton color="success" variant="ghost">Success</UButton>
              <UButton color="warning" variant="ghost">Warning</UButton>
              <UButton color="error" variant="ghost">Error</UButton>
              <UButton color="neutral" variant="ghost">Neutral</UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Badge Showcase -->
      <div>
        <h4 class="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-tag" class="w-5 h-5" />
          Badges & Priority System
        </h4>
        
        <div class="space-y-4">
          <!-- Standard Badges -->
          <div>
            <p class="text-sm text-muted mb-2">Standard Colors:</p>
            <div class="flex flex-wrap gap-3">
              <UBadge color="primary">Primary</UBadge>
              <UBadge color="secondary">Secondary</UBadge>
              <UBadge color="success">Success</UBadge>
              <UBadge color="warning">Warning</UBadge>
              <UBadge color="error">Error</UBadge>
              <UBadge color="neutral">Neutral</UBadge>
            </div>
          </div>

          <!-- Priority Badges -->
          <div>
            <p class="text-sm text-muted mb-2">Priority System:</p>
            <div class="flex flex-wrap gap-3">
              <UBadge class="priority-low">🔵 LOW</UBadge>
              <UBadge class="priority-medium">🟡 MEDIUM</UBadge>
              <UBadge class="priority-high">🟠 HIGH</UBadge>
              <UBadge class="priority-urgent">🔴 URGENT</UBadge>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Showcase -->
      <div>
        <h4 class="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-rectangle-stack" class="w-5 h-5" />
          Cards with Modern Design
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Basic Card -->
          <UCard>
            <template #header>
              <h5 class="font-semibold">Basic Card</h5>
            </template>
            <p class="text-muted">Simple card with header and content area.</p>
            <template #footer>
              <UButton size="sm" color="primary">Action</UButton>
            </template>
          </UCard>

          <!-- Stats Card -->
          <UCard class="dashboard-card">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600">1,234</div>
              <div class="text-sm text-muted">Total Users</div>
              <div class="text-xs text-success-600 mt-1">↗ +12.5%</div>
            </div>
          </UCard>

          <!-- Feature Card -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-rocket-launch" class="w-5 h-5 text-secondary-600" />
                <h5 class="font-semibold">Feature Card</h5>
              </div>
            </template>
            <p class="text-muted">Card with icon and feature description.</p>
            <UBadge color="success" class="mt-2">New</UBadge>
          </UCard>
        </div>
      </div>

      <!-- Form Controls -->
      <div>
        <h4 class="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
          Form Controls (v3 Components)
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-4">
            <!-- Input with FormField (was FormGroup in v2) -->
            <UFormField label="Email Address" required>
              <UInput 
                placeholder="john@example.com" 
                type="email"
                icon="i-heroicons-at-symbol"
              />
            </UFormField>

            <!-- Select with items prop (was options in v2) -->
            <UFormField label="Country">
              <USelect 
                :items="countries"
                placeholder="Select country"
              />
            </UFormField>

            <!-- Switch (was Toggle in v2) -->
            <UFormField label="Notifications">
              <USwitch v-model="notificationsEnabled" />
            </UFormField>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <!-- Textarea -->
            <UFormField label="Message">
              <UTextarea 
                placeholder="Enter your message..."
                rows="3"
              />
            </UFormField>

            <!-- Slider (was Range in v2) -->
            <UFormField label="Volume">
              <USlider v-model="volume" :min="0" :max="100" />
              <div class="text-sm text-muted mt-1">{{ volume }}%</div>
            </UFormField>
          </div>
        </div>
      </div>

      <!-- Table Showcase -->
      <div>
        <h4 class="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-table-cells" class="w-5 h-5" />
          Table with Modern Styling
        </h4>
        
        <UTable :rows="tableData" :columns="tableColumns" />
      </div>

      <!-- Modal Demo -->
      <div>
        <h4 class="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-window" class="w-5 h-5" />
          Modal & Overlays
        </h4>
        
        <div class="flex gap-3">
          <UButton @click="isModalOpen = true" color="primary">
            Open Modal
          </UButton>
          <UButton @click="isSlideoverOpen = true" color="secondary">
            Open Slideover
          </UButton>
        </div>

        <!-- Modal -->
        <UModal v-model="isModalOpen">
          <UCard>
            <template #header>
              <h3 class="font-semibold">Nuxt UI v3 Modal</h3>
            </template>
            
            <p class="text-muted">
              This modal uses the new Nuxt UI v3 API with improved accessibility 
              and modern design tokens.
            </p>
            
            <template #footer>
              <div class="flex justify-end gap-3">
                <UButton variant="ghost" @click="isModalOpen = false">Cancel</UButton>
                <UButton color="primary" @click="isModalOpen = false">Confirm</UButton>
              </div>
            </template>
          </UCard>
        </UModal>

        <!-- Slideover -->
        <USlideover v-model="isSlideoverOpen">
          <UCard>
            <template #header>
              <h3 class="font-semibold">Slideover Panel</h3>
            </template>
            
            <div class="space-y-4">
              <p class="text-muted">Slideover with modern design system.</p>
              
              <UFormField label="Name">
                <UInput placeholder="Enter name" />
              </UFormField>
              
              <UFormField label="Role">
                <USelect :items="roleItems" placeholder="Select role" />
              </UFormField>
            </div>
            
            <template #footer>
              <div class="flex justify-end gap-3">
                <UButton variant="ghost" @click="isSlideoverOpen = false">Cancel</UButton>
                <UButton color="success" @click="isSlideoverOpen = false">Save</UButton>
              </div>
            </template>
          </UCard>
        </USlideover>
      </div>

      <!-- Toast Demo -->
      <div>
        <h4 class="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-bell" class="w-5 h-5" />
          Toast Notifications (was Notification in v2)
        </h4>
        
        <div class="flex flex-wrap gap-3">
          <UButton @click="showSuccessToast" color="success" variant="outline">
            Success Toast
          </UButton>
          <UButton @click="showErrorToast" color="error" variant="outline">
            Error Toast
          </UButton>
          <UButton @click="showWarningToast" color="warning" variant="outline">
            Warning Toast
          </UButton>
          <UButton @click="showInfoToast" color="info" variant="outline">
            Info Toast
          </UButton>
        </div>
      </div>

      <!-- Component Summary -->
      <div class="bg-gradient-to-r from-emerald-100 to-blue-100 p-6 rounded-lg border border-emerald-200">
        <h4 class="font-semibold text-emerald-800 mb-3">✅ Core UI Components Status</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 class="font-medium text-emerald-700 mb-2">Migrated Components:</h5>
            <ul class="text-sm text-emerald-600 space-y-1">
              <li>✅ UButton - New color system</li>
              <li>✅ UBadge - Priority variants</li>
              <li>✅ UCard - Modern styling</li>
              <li>✅ UFormField - Was UFormGroup</li>
              <li>✅ USelect - items prop</li>
            </ul>
          </div>
          <div>
            <h5 class="font-medium text-emerald-700 mb-2">New Features:</h5>
            <ul class="text-sm text-emerald-600 space-y-1">
              <li>✅ USwitch - Was UToggle</li>
              <li>✅ USlider - Was URange</li>
              <li>✅ UToast - Was UNotification</li>
              <li>✅ 7-color design system</li>
              <li>✅ Tailwind Variants API</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { SelectItem, DropdownMenuItem } from '~/types/showcase'

// Reactive state
const isModalOpen = ref(false)
const isSlideoverOpen = ref(false)
const notificationsEnabled = ref(true)
const volume = ref(75)

// Toast composable
const toast = useToast()

// User menu items for demo
const userMenuItems: DropdownMenuItem[] = [
  {
    label: 'Profile',
    icon: 'i-heroicons-user',
    onClick: () => console.log('Profile')
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    onClick: () => console.log('Settings')
  },
  {
    separator: true
  },
  {
    label: 'Sign Out',
    icon: 'i-heroicons-arrow-right-start-on-rectangle',
    onClick: () => console.log('Sign Out')
  }
]

// Select data with v3 API (items instead of options)
const countries: SelectItem[] = [
  { label: 'Turkey', value: 'tr' },
  { label: 'United States', value: 'us' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Spain', value: 'es' }
]

const roleItems: SelectItem[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' }
]

// Table data
const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
]

const tableData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'Active'
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'Inactive'
  }
]

// Toast functions with v3 API (onClick instead of click)
const showSuccessToast = () => {
  toast.add({
    title: 'Success!',
    description: 'Operation completed successfully.',
    color: 'success',
    icon: 'i-heroicons-check'
  })
}

const showErrorToast = () => {
  toast.add({
    title: 'Error!',
    description: 'Something went wrong.',
    color: 'error',
    icon: 'i-heroicons-x-mark'
  })
}

const showWarningToast = () => {
  toast.add({
    title: 'Warning!',
    description: 'Please check your input.',
    color: 'warning',
    icon: 'i-heroicons-exclamation-triangle'
  })
}

const showInfoToast = () => {
  toast.add({
    title: 'Info',
    description: 'Here is some information.',
    color: 'info',
    icon: 'i-heroicons-information-circle'
  })
}
</script>