<template>
  <div class="space-y-8">
    <!-- Form Components Header -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-form-input" class="w-6 h-6 text-primary" />
          <h2 class="text-2xl font-bold text-highlighted">Form Components Showcase</h2>
        </div>
      </template>

      <p class="text-muted mb-6">
        Modern form component'leri: Input, Select, Textarea, DatePicker, FileUpload ve validation sistemi.
        Nuxt UI v3 ile UFormField, UInput, USelect ve UTextarea component'leri.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UCard variant="soft" color="primary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-keyboard" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Form Inputs</h4>
              <p class="text-sm text-muted mt-1">UInput, UTextarea, USelect</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="success">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Validation System</h4>
              <p class="text-sm text-muted mt-1">UForm, UFormField with errors</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="secondary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-upload" class="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">File Handling</h4>
              <p class="text-sm text-muted mt-1">FileUpload, DatePicker</p>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>

    <!-- Basic Form Inputs -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-edit-3" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Basic Form Inputs</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          <UFormField label="Project Name" help="Enter a descriptive project name">
            <UInput 
              v-model="formData.name" 
              placeholder="Enter project name"
              icon="i-lucide-folder"
            />
          </UFormField>

          <UFormField label="Email Address" help="Work email preferred">
            <UInput 
              v-model="formData.email" 
              placeholder="user@example.com"
              icon="i-lucide-mail"
              type="email"
            />
          </UFormField>

          <UFormField label="Budget" help="Project budget in USD">
            <UInput 
              v-model="formData.budget" 
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
            >
              <template #leading>
                <span class="text-muted">$</span>
              </template>
            </UInput>
          </UFormField>

          <UFormField label="Priority Level" help="Select project priority">
            <USelect 
              v-model="formData.priority" 
              :items="priorityOptions"
              placeholder="Select priority"
            />
          </UFormField>
        </div>

        <div class="space-y-6">
          <UFormField label="Project Description" help="Detailed project description">
            <UTextarea 
              v-model="formData.description" 
              placeholder="Describe your project..."
              ::rows="4"
            />
          </UFormField>

          <UFormField label="Project Tags" help="Comma-separated tags">
            <UInput 
              v-model="formData.tags" 
              placeholder="web, frontend, vue"
              icon="i-lucide-tag"
            />
          </UFormField>

          <UFormField label="Website URL" help="Optional project website">
            <UInput 
              v-model="formData.website" 
              placeholder="https://example.com"
              icon="i-lucide-globe"
              type="url"
            />
          </UFormField>

          <div class="flex gap-3 pt-4">
            <UButton color="primary" @click="handleSave" :loading="saving">
              <UIcon name="i-lucide-save" class="w-4 h-4" />
              Save Project
            </UButton>
            <UButton color="neutral" variant="outline" @click="handleReset">
              <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4" />
              Reset
            </UButton>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Date & Time Inputs -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-calendar" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Date & Time Components</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UFormField label="Start Date" help="Project start date">
          <UInput 
            v-model="formData.startDate" 
            type="date"
            icon="i-lucide-calendar-days"
          />
        </UFormField>

        <UFormField label="End Date" help="Project deadline">
          <UInput 
            v-model="formData.endDate" 
            type="date"
            icon="i-lucide-calendar-check"
            :min="formData.startDate"
          />
        </UFormField>

        <UFormField label="Meeting Time" help="Preferred meeting time">
          <UInput 
            v-model="formData.time" 
            type="time"
            icon="i-lucide-clock"
          />
        </UFormField>
      </div>

      <UAlert color="info" variant="soft" class="mt-6">
        <template #title>Date & Time Features</template>
        <template #description>
          <ul class="mt-2 space-y-1">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
              <span>Native HTML5 date/time inputs</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
              <span>Cross-browser compatibility</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
              <span>Min/max date validation</span>
            </li>
          </ul>
        </template>
      </UAlert>
    </UCard>

    <!-- File Upload Section -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-upload" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">File Upload Components</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Single File Upload -->
        <div class="space-y-4">
          <UFormField label="Profile Picture" help="Upload your profile picture (max 2MB)">
            <div class="border-2 border-dashed border-accented rounded-lg p-6 text-center hover:border-primary transition-colors">
              <UIcon name="i-lucide-image" class="w-8 h-8 text-muted mx-auto mb-2" />
              <p class="text-sm text-highlighted mb-2">Drop your image here or click to browse</p>
              <p class="text-xs text-muted">PNG, JPG up to 2MB</p>
              <input 
                type="file" 
                ref="singleFileInput"
                @change="handleSingleFileUpload"
                accept="image/*"
                class="hidden"
              />
              <UButton 
                size="sm" 
                color="primary" 
                variant="outline" 
                class="mt-3"
                @click="$refs.singleFileInput.click()"
              >
                <UIcon name="i-lucide-plus" class="w-4 h-4" />
                Choose File
              </UButton>
            </div>
          </UFormField>

          <div v-if="uploadedFiles.single.length" class="space-y-2">
            <div v-for="file in uploadedFiles.single" :key="file.name" 
                 class="flex items-center gap-3 p-3 bg-elevated rounded-lg border border-accented">
              <UIcon name="i-lucide-file-image" class="w-4 h-4 text-success" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-highlighted truncate">{{ file.name }}</p>
                <p class="text-xs text-muted">{{ formatFileSize(file.size) }}</p>
              </div>
              <UButton size="xs" color="error" variant="ghost" @click="removeFile('single', file)">
                <UIcon name="i-lucide-x" class="w-3 h-3" />
              </UButton>
            </div>
          </div>
        </div>

        <!-- Multiple File Upload -->
        <div class="space-y-4">
          <UFormField label="Project Documents" help="Upload multiple files (max 5 files, 10MB each)">
            <div class="border-2 border-dashed border-accented rounded-lg p-6 text-center hover:border-secondary transition-colors">
              <UIcon name="i-lucide-files" class="w-8 h-8 text-muted mx-auto mb-2" />
              <p class="text-sm text-highlighted mb-2">Drop multiple files here</p>
              <p class="text-xs text-muted">PDF, DOC, Images up to 10MB each</p>
              <input 
                type="file" 
                ref="multipleFileInput"
                @change="handleMultipleFileUpload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                multiple
                class="hidden"
              />
              <UButton 
                size="sm" 
                color="secondary" 
                variant="outline" 
                class="mt-3"
                @click="$refs.multipleFileInput.click()"
              >
                <UIcon name="i-lucide-folder-plus" class="w-4 h-4" />
                Choose Files
              </UButton>
            </div>
          </UFormField>

          <div v-if="uploadedFiles.multiple.length" class="space-y-2 max-h-40 overflow-y-auto">
            <div v-for="file in uploadedFiles.multiple" :key="file.name" 
                 class="flex items-center gap-3 p-2 bg-elevated rounded border border-accented">
              <UIcon :name="getFileIcon(file.type)" class="w-4 h-4 text-secondary" />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-highlighted truncate">{{ file.name }}</p>
                <p class="text-xs text-muted">{{ formatFileSize(file.size) }}</p>
              </div>
              <UBadge size="xs" color="success" variant="soft">✓</UBadge>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Form Validation Demo -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Form Validation System</h3>
        </div>
      </template>

      <div class="space-y-6">
        <UAlert color="warning" variant="soft">
          <template #title>Validation Features</template>
          <template #description>
            UForm ile güçlü validation: Required fields, email format, custom rules ve real-time feedback.
          </template>
        </UAlert>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Validation Examples -->
          <div class="space-y-4">
            <UFormField label="Required Field" required help="This field is required">
              <UInput 
                v-model="validationData.required" 
                placeholder="Enter required value"
                :error="validationErrors.required"
              />
            </UFormField>

            <UFormField label="Email Validation" help="Must be valid email format">
              <UInput 
                v-model="validationData.email" 
                placeholder="user@domain.com"
                type="email"
                :error="validationErrors.email"
              />
            </UFormField>

            <UFormField label="Password" help="Minimum 8 characters">
              <UInput 
                v-model="validationData.password" 
                placeholder="Enter password"
                type="password"
                :error="validationErrors.password"
              />
            </UFormField>
          </div>

          <!-- Validation Status -->
          <UCard variant="outline" color="success">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-success" />
                <h4 class="font-semibold text-highlighted">Validation Status</h4>
              </div>
            </template>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-highlighted">Required Field</span>
                <UBadge :color="validationData.required ? 'success' : 'error'" variant="soft" size="xs">
                  {{ validationData.required ? 'Valid' : 'Required' }}
                </UBadge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-highlighted">Email Format</span>
                <UBadge :color="isValidEmail ? 'success' : 'warning'" variant="soft" size="xs">
                  {{ isValidEmail ? 'Valid' : 'Invalid' }}
                </UBadge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-highlighted">Password Length</span>
                <UBadge :color="isValidPassword ? 'success' : 'error'" variant="soft" size="xs">
                  {{ isValidPassword ? 'Valid' : 'Too Short' }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Pagination Component -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-pages" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Pagination Component</h3>
        </div>
      </template>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <UCard variant="soft" color="info">
            <div class="text-center">
              <h5 class="font-semibold text-highlighted">Total Items</h5>
              <p class="text-2xl font-bold text-info">{{ paginationData.total }}</p>
            </div>
          </UCard>
          
          <UCard variant="soft" color="success">
            <div class="text-center">
              <h5 class="font-semibold text-highlighted">Per Page</h5>
              <p class="text-2xl font-bold text-success">{{ paginationData.perPage }}</p>
            </div>
          </UCard>
          
          <UCard variant="soft" color="warning">
            <div class="text-center">
              <h5 class="font-semibold text-highlighted">Current Page</h5>
              <p class="text-2xl font-bold text-warning">{{ paginationData.currentPage }}</p>
            </div>
          </UCard>
        </div>

        <!-- Pagination Controls Demo -->
        <div class="flex justify-center">
          <div class="flex items-center gap-2">
            <UButton 
              size="sm" 
              color="neutral" 
              variant="outline" 
              :disabled="paginationData.currentPage === 1"
              @click="paginationData.currentPage--"
            >
              <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
              Previous
            </UButton>
            
            <div class="flex gap-1">
              <UButton 
                v-for="page in visiblePages" 
                :key="page" 
                size="sm"
                :color="page === paginationData.currentPage ? 'primary' : 'neutral'"
                :variant="page === paginationData.currentPage ? 'solid' : 'ghost'"
                @click="paginationData.currentPage = page"
              >
                {{ page }}
              </UButton>
            </div>
            
            <UButton 
              size="sm" 
              color="neutral" 
              variant="outline" 
              :disabled="paginationData.currentPage === totalPages"
              @click="paginationData.currentPage++"
            >
              Next
              <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
// Component name for debugging
defineOptions({
  name: 'FormShowcase'
})

// Form data
const formData = reactive({
  name: '',
  email: '',
  budget: null,
  priority: null,
  description: '',
  tags: '',
  website: '',
  startDate: '',
  endDate: '',
  time: ''
})

// Validation data
const validationData = reactive({
  required: '',
  email: '',
  password: ''
})

const validationErrors = reactive({
  required: '',
  email: '',
  password: ''
})

// Upload files
const uploadedFiles = reactive({
  single: [],
  multiple: []
})

// Pagination data
const paginationData = reactive({
  currentPage: 1,
  perPage: 12,
  total: 248
})

// Loading states
const saving = ref(false)

// Priority options for USelect
const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' }
]

// Computed
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return !validationData.email || emailRegex.test(validationData.email)
})

const isValidPassword = computed(() => {
  return validationData.password.length >= 8
})

const totalPages = computed(() => {
  return Math.ceil(paginationData.total / paginationData.perPage)
})

const visiblePages = computed(() => {
  const current = paginationData.currentPage
  const total = totalPages.value
  const pages = []
  
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const handleSave = async () => {
  saving.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  saving.value = false
  
  // Show success toast (if toast system available)
  console.log('Form saved successfully!')
}

const handleReset = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = typeof formData[key] === 'string' ? '' : null
  })
}

const handleSingleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      console.error('File size exceeds 2MB limit')
      return
    }
    uploadedFiles.single = [file]
    console.log('Single file uploaded:', file.name)
  }
}

const handleMultipleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 5) {
    console.error('Maximum 5 files allowed')
    return
  }
  
  const validFiles = files.filter(file => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      console.error(`File ${file.name} exceeds 10MB limit`)
      return false
    }
    return true
  })
  
  uploadedFiles.multiple = validFiles
  console.log('Multiple files uploaded:', validFiles.map(f => f.name))
}

const removeFile = (type, file) => {
  const index = uploadedFiles[type].findIndex(f => f.name === file.name)
  if (index > -1) {
    uploadedFiles[type].splice(index, 1)
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileIcon = (type) => {
  if (type.includes('image')) return 'i-lucide-image'
  if (type.includes('pdf')) return 'i-lucide-file-text'
  if (type.includes('document')) return 'i-lucide-file-type'
  return 'i-lucide-file'
}

// Meta info
useHead({
  title: 'Form Components - Showcase'
})
</script>