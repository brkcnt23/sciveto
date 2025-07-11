<!-- components/showcase/FormShowcase.vue -->
<template>
  <div class="space-y-8">
    <!-- Input Examples -->
    <div class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Input Examples
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Full Name -->
        <FormInput
          v-model="formData.fullName"
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          description="This will be displayed on your profile"
          leading-icon="i-lucide-user"
          required
        />

        <!-- Email Address -->
        <FormInput
          v-model="formData.email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          leading-icon="i-lucide-mail"
          :error="emailError"
          required
        />

        <!-- Password -->
        <FormInput
          v-model="formData.password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          leading-icon="i-lucide-lock"
          :trailing-icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          help="Password must be at least 8 characters"
        />

        <!-- Project Budget -->
        <FormInput
          v-model="formData.budget"
          name="budget"
          label="Project Budget"
          type="input-number"
          placeholder="0"
          leading-icon="i-lucide-dollar-sign"
          :min="0"
          :step="100"
        />
      </div>
    </div>

    <!-- Input States -->
    <div v-if="showStates" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Input States
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Loading State -->
        <FormInput
          v-model="formData.loading"
          name="loading"
          label="Loading State"
          placeholder="Loading example..."
          :loading="true"
        />

        <!-- Disabled Input -->
        <FormInput
          v-model="formData.disabled"
          name="disabled"
          label="Disabled Input"
          placeholder="This is disabled"
          :disabled="true"
        />

        <!-- Readonly Input -->
        <FormInput
          v-model="formData.readonly"
          name="readonly"
          label="Readonly Input"
          placeholder="This is readonly"
          :disabled="true"
          trailing-icon="i-lucide-lock"
        />

        <!-- Search Input -->
        <FormInput
          v-model="formData.search"
          name="search"
          label="Search"
          type="search"
          placeholder="Search anything..."
        />
      </div>
    </div>

    <!-- Advanced Form Components -->
    <div v-if="showAdvanced" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Advanced Form Components
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Date Picker -->
        <div class="space-y-4">
          <h5 class="font-medium text-slate-600">Date Pickers</h5>
          
          <DatePicker
            v-model="formData.startDate"
            name="startDate"
            label="Start Date"
            placeholder="Select start date"
            help="Choose project start date"
          />
          
          <DatePicker
            v-model="formData.dateRange"
            name="dateRange"
            label="Date Range"
            placeholder="Select date range"
            :range="true"
          />
          
          <DatePicker
            v-model="formData.multipleDates"
            name="multipleDates"
            label="Multiple Dates"
            placeholder="Select multiple dates"
            :multiple="true"
          />
        </div>

        <!-- Form Select Variants -->
        <div class="space-y-4">
          <h5 class="font-medium text-slate-600">Select Variants</h5>
          
          <FormSelect
            v-model="formData.basicSelect"
            name="basicSelect"
            label="Basic Select"
            type="basic"
            :options="selectOptions"
            placeholder="Choose option"
          />
          
          <FormSelect
            v-model="formData.menuSelect"
            name="menuSelect"
            label="Select Menu"
            type="menu"
            :options="selectOptions"
            placeholder="Advanced select"
            :searchable="true"
          />
          
          <FormSelect
            v-model="formData.multiSelect"
            name="multiSelect"
            label="Multi Select"
            type="combobox"
            :options="selectOptions"
            :multiple="true"
            :searchable="true"
            placeholder="Select multiple"
          />
        </div>
      </div>
      
      <!-- File Upload -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">File Upload</h5>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Single File Upload -->
          <FileUpload
            v-model="formData.singleFile"
            name="singleFile"
            label="Profile Picture"
            accept="image/*"
            :max-size="2 * 1024 * 1024"
            help="Upload profile picture (max 2MB)"
            upload-text="Click to upload image"
            upload-subtext="PNG, JPG up to 2MB"
          />

          <!-- Multiple File Upload -->
          <FileUpload
            v-model="formData.multipleFiles"
            name="multipleFiles"
            label="Project Documents"
            accept=".pdf,.doc,.docx,.txt"
            :multiple="true"
            :max-files="3"
            :max-size="5 * 1024 * 1024"
            :auto-upload="false"
            help="Upload documents (max 3 files, 5MB each)"
            upload-text="Drop files here or click to browse"
            upload-subtext="PDF, DOC, DOCX, TXT files"
          />
        </div>
      </div>
    </div>

    <!-- Textarea and Select -->
    <div v-if="showTextareaSelect" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Textarea & Select
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Project Description -->
        <FormInput
          v-model="formData.description"
          name="description"
          label="Project Description"
          type="textarea"
          placeholder="Describe your project..."
          :rows="4"
          help="Provide a detailed description"
        />

        <!-- Priority Select -->
        <div class="space-y-4">
          <FormSelect
            v-model="formData.priority"
            name="priority"
            label="Select Priority"
            type="menu"
            placeholder="Choose priority"
            :options="priorityOptions"
            required
          />

          <FormSelect
            v-model="formData.categories"
            name="categories"
            label="Multiple Categories"
            type="combobox"
            placeholder="Choose categories"
            :options="categoryOptions"
            :multiple="true"
            :searchable="true"
          />
        </div>
      </div>
    </div>

    <!-- Form Variants -->
    <div v-if="showVariants" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Form Variants & Sizes
      </h4>
      
      <!-- Variants -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Variants</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormInput
            v-model="formData.outline"
            name="outline"
            label="Outline"
            variant="outline"
            placeholder="Outline variant"
          />
          <FormInput
            v-model="formData.soft"
            name="soft"
            label="Soft"
            variant="soft"
            placeholder="Soft variant"
          />
          <FormInput
            v-model="formData.subtle"
            name="subtle"
            label="Subtle"
            variant="subtle"
            placeholder="Subtle variant"
          />
          <FormInput
            v-model="formData.ghost"
            name="ghost"
            label="Ghost"
            variant="ghost"
            placeholder="Ghost variant"
          />
        </div>
      </div>

      <!-- Sizes -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Sizes</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <FormInput
            v-model="formData.xs"
            name="xs"
            label="XS Size"
            size="xs"
            placeholder="Extra small"
          />
          <FormInput
            v-model="formData.sm"
            name="sm"
            label="SM Size"
            size="sm"
            placeholder="Small"
          />
          <FormInput
            v-model="formData.md"
            name="md"
            label="MD Size"
            size="md"
            placeholder="Medium"
          />
          <FormInput
            v-model="formData.lg"
            name="lg"
            label="LG Size"
            size="lg"
            placeholder="Large"
          />
          <FormInput
            v-model="formData.xl"
            name="xl"
            label="XL Size"
            size="xl"
            placeholder="Extra large"
          />
        </div>
      </div>

      <!-- Colors -->
      <div class="space-y-4">
        <h5 class="font-medium text-slate-600">Colors (Focus State)</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormInput
            v-model="formData.primary"
            name="primary"
            label="Primary"
            color="primary"
            placeholder="Primary color"
          />
          <FormInput
            v-model="formData.success"
            name="success"
            label="Success"
            color="success"
            placeholder="Success color"
          />
          <FormInput
            v-model="formData.warning"
            name="warning"
            label="Warning"
            color="warning"
            placeholder="Warning color"
          />
          <FormInput
            v-model="formData.error"
            name="error"
            label="Error"
            color="error"
            placeholder="Error color"
          />
        </div>
      </div>
    </div>

    <!-- Working Form Example -->
    <div v-if="showWorkingForm" class="space-y-6">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Working Form Example
      </h4>
      
      <UForm :state="projectForm" class="space-y-4" @submit="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            v-model="projectForm.name"
            name="projectName"
            label="Project Name"
            placeholder="Enter project name"
            leading-icon="i-lucide-folder"
            required
          />
          
          <FormInput
            v-model="projectForm.email"
            name="projectEmail"
            label="Contact Email"
            type="email"
            placeholder="Enter email"
            leading-icon="i-lucide-mail"
            required
          />
          
          <FormInput
            v-model="projectForm.priority"
            name="projectPriority"
            label="Priority"
            type="select"
            placeholder="Select priority"
            :options="priorityOptions"
            required
          />
        </div>

        <FormInput
          v-model="projectForm.budget"
          name="projectBudget"
          label="Budget"
          type="input-number"
          placeholder="0"
          leading-icon="i-lucide-dollar-sign"
          :min="0"
          help="Enter project budget in USD"
        />

        <FormInput
          v-model="projectForm.description"
          name="projectDescription"
          label="Project Description"
          type="textarea"
          placeholder="Describe the project..."
          :rows="4"
        />

        <div class="flex gap-3">
          <UButton type="submit" color="primary">
            Save Project
          </UButton>
          <UButton type="button" variant="outline" @click="resetForm">
            Reset
          </UButton>
        </div>
      </UForm>
    </div>

    <!-- Toggle Controls -->
    <div v-if="showControls" class="pt-6 border-t border-slate-200">
      <h4 class="font-semibold text-slate-700 mb-4">Show/Hide Sections</h4>
      <div class="flex flex-wrap gap-2">
        <UButton 
          :variant="showStates ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showStates = !showStates"
        >
          Input States
        </UButton>
        <UButton 
          :variant="showTextareaSelect ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showTextareaSelect = !showTextareaSelect"
        >
          Textarea & Select
        </UButton>
        <UButton 
          :variant="showVariants ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showVariants = !showVariants"
        >
          Variants & Sizes
        </UButton>
        <UButton 
          :variant="showWorkingForm ? 'solid' : 'outline'" 
          color="primary" 
          size="sm"
          @click="showWorkingForm = !showWorkingForm"
        >
          Working Form
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Props for controlling what sections to show
const props = defineProps({
  showControls: {
    type: Boolean,
    default: true
  },
  defaultShowStates: {
    type: Boolean,
    default: true
  },
  defaultShowTextareaSelect: {
    type: Boolean,
    default: true
  },
  defaultShowVariants: {
    type: Boolean,
    default: false
  },
  defaultShowWorkingForm: {
    type: Boolean,
    default: true
  }
})

// Reactive state for showing/hiding sections
const showStates = ref(props.defaultShowStates)
const showTextareaSelect = ref(props.defaultShowTextareaSelect)
const showAdvanced = ref(props.defaultShowAdvanced)
const showVariants = ref(props.defaultShowVariants)
const showWorkingForm = ref(props.defaultShowWorkingForm)
const showPassword = ref(false)

// Form data for examples
const formData = reactive({
  fullName: '',
  email: 'invalid-email',
  password: '',
  budget: 0,
  loading: '',
  disabled: 'Cannot edit this',
  readonly: 'Read only value',
  search: '',
  description: '',
  priority: '',
  categories: [],
  // Advanced components
  startDate: '',
  dateRange: null,
  multipleDates: [],
  basicSelect: '',
  menuSelect: '',
  multiSelect: [],
  singleFile: null,
  multipleFiles: [],
  // Variants
  outline: '',
  soft: '',
  subtle: '',
  ghost: '',
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  primary: '',
  success: '',
  warning: '',
  error: ''
})

// Working form data
const projectForm = reactive({
  name: '',
  email: '',
  priority: '',
  budget: 0,
  description: ''
})

// Options for selects
const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' }
]

const categoryOptions = [
  { label: 'Development', value: 'development' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Support', value: 'support' }
]

const selectOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' }
]

// Email validation
const emailError = computed(() => {
  if (formData.email && !formData.email.includes('@')) {
    return 'Please enter a valid email address'
  }
  return false
})

// Form handlers
const toast = useToast()

const onSubmit = (event) => {
  console.log('Form submitted:', event.data)
  toast.add({
    title: 'Success!',
    description: 'Project saved successfully',
    color: 'success'
  })
}

const resetForm = () => {
  Object.keys(projectForm).forEach(key => {
    if (typeof projectForm[key] === 'string') {
      projectForm[key] = ''
    } else if (typeof projectForm[key] === 'number') {
      projectForm[key] = 0
    }
  })
  
  toast.add({
    title: 'Form Reset',
    description: 'All fields have been cleared',
    color: 'info'
  })
}
</script>