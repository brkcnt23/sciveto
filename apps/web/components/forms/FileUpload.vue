<!-- components/forms/FileUpload.vue -->
<template>
  <UFormField 
    :label="label" 
    :name="name" 
    :description="description" 
    :help="help" 
    :required="required" 
    :size="size"
    :error="error"
  >
    <div class="space-y-4">
      <!-- File Input Area -->
      <div 
        :class="[
          'relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200',
          dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          error ? 'border-red-300 bg-red-50' : ''
        ]"
        @click="triggerFileInput"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
      >
        <!-- Hidden file input -->
        <input
          :id="uid"
          :name="name"
          ref="fileInput"
          type="file"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          class="hidden"
          @change="handleFileSelect"
        />

        <!-- Upload Content -->
        <div class="text-center">
          <!-- Upload Icon -->
          <div class="mx-auto w-12 h-12 text-gray-400 mb-4">
            <UIcon :name="uploadIcon" class="w-full h-full" />
          </div>

          <!-- Upload Text -->
          <div class="space-y-2">
            <p class="text-sm font-medium text-gray-900">
              {{ uploadText || 'Click to upload or drag and drop' }}
            </p>
            <p class="text-xs text-gray-500">
              {{ uploadSubtext || getUploadSubtext() }}
            </p>
          </div>

          <!-- Loading State -->
          <div v-if="uploading" class="mt-4">
            <div class="flex items-center justify-center space-x-2">
              <UIcon name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
              <span class="text-sm text-gray-600">Uploading...</span>
            </div>
            <div v-if="uploadProgress !== null" class="mt-2">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${uploadProgress}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- File List -->
      <div v-if="fileList.length > 0" class="space-y-2">
        <h4 class="text-sm font-medium text-gray-900">
          {{ multiple ? 'Selected Files' : 'Selected File' }}
        </h4>
        
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div
            v-for="(file, index) in fileList"
            :key="`${file.name}-${index}`"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <!-- File Icon -->
              <UIcon :name="getFileIcon(file)" class="w-5 h-5 text-gray-500 flex-shrink-0" />
              
              <!-- File Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ file.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatFileSize(file.size) }}
                </p>
              </div>
              
              <!-- Upload Status -->
              <div class="flex items-center space-x-2">
                <UIcon 
                  v-if="file.status === 'success'" 
                  name="i-lucide-check-circle" 
                  class="w-4 h-4 text-green-500" 
                />
                <UIcon 
                  v-else-if="file.status === 'error'" 
                  name="i-lucide-x-circle" 
                  class="w-4 h-4 text-red-500" 
                />
                <UIcon 
                  v-else-if="file.status === 'uploading'" 
                  name="i-lucide-loader-2" 
                  class="w-4 h-4 text-blue-500 animate-spin" 
                />
              </div>
            </div>

            <!-- Remove Button -->
            <UButton
              :name="`${name}-remove-${index}`"
              icon="i-lucide-x"
              size="xs"
              color="gray"
              variant="ghost"
              class="ml-2"
              @click="removeFile(index)"
            />
          </div>
        </div>
      </div>

      <!-- Error Messages -->
      <div v-if="fileErrors.length > 0" class="space-y-1">
        <UAlert
          v-for="(error, index) in fileErrors"
          :key="index"
          color="error"
          variant="soft"
          :description="error"
          class="text-sm"
        />
      </div>

      <!-- File Constraints Info -->
      <div v-if="showConstraints" class="text-xs text-gray-500 space-y-1">
        <p v-if="maxSize">
          Maximum file size: {{ formatFileSize(maxSize) }}
        </p>
        <p v-if="multiple && maxFiles">
          Maximum files: {{ maxFiles }}
        </p>
        <p v-if="accept">
          Accepted formats: {{ accept }}
        </p>
      </div>
    </div>
  </UFormField>
</template>

<script setup>
import { useId } from '#imports'

// Generate unique ID for accessibility
const uid = useId()

const props = defineProps({
  // v-model
  modelValue: {
    type: [File, FileList, Array],
    default: null
  },

  // Form field props
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  help: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: [String, Boolean],
    default: false
  },

  // File upload props
  accept: {
    type: String,
    default: '*/*'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },

  // File constraints
  maxSize: {
    type: Number,
    default: null // in bytes
  },
  maxFiles: {
    type: Number,
    default: null
  },

  // Upload behavior
  autoUpload: {
    type: Boolean,
    default: false
  },
  uploadUrl: {
    type: String,
    default: null
  },

  // UI customization
  uploadIcon: {
    type: String,
    default: 'i-lucide-upload'
  },
  uploadText: {
    type: String,
    default: ''
  },
  uploadSubtext: {
    type: String,
    default: ''
  },
  showConstraints: {
    type: Boolean,
    default: true
  },

  // Styling
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const emit = defineEmits([
  'update:modelValue', 
  'upload-success', 
  'upload-error', 
  'file-added', 
  'file-removed'
])

// State
const fileInput = ref(null)
const dragActive = ref(false)
const uploading = ref(false)
const uploadProgress = ref(null)
const fileList = ref([])
const fileErrors = ref([])

// Methods
const triggerFileInput = () => {
  if (!props.disabled) {
    fileInput.value?.click()
  }
}

const handleDragOver = (e) => {
  if (!props.disabled) {
    dragActive.value = true
  }
}

const handleDragLeave = (e) => {
  dragActive.value = false
}

const handleDrop = (e) => {
  dragActive.value = false
  if (!props.disabled) {
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }
}

const handleFileSelect = (e) => {
  const files = Array.from(e.target.files)
  processFiles(files)
}

const processFiles = (files) => {
  fileErrors.value = []
  
  // Validate file count
  if (props.multiple && props.maxFiles) {
    const totalFiles = fileList.value.length + files.length
    if (totalFiles > props.maxFiles) {
      fileErrors.value.push(`Maximum ${props.maxFiles} files allowed`)
      return
    }
  }

  const validFiles = []

  for (const file of files) {
    const errors = validateFile(file)
    if (errors.length === 0) {
      validFiles.push({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending'
      })
    } else {
      fileErrors.value.push(...errors)
    }
  }

  if (validFiles.length > 0) {
    if (props.multiple) {
      fileList.value.push(...validFiles)
    } else {
      fileList.value = [validFiles[0]]
    }

    // Emit the files
    const filesToEmit = props.multiple 
      ? fileList.value.map(f => f.file)
      : validFiles[0].file

    emit('update:modelValue', filesToEmit)
    emit('file-added', validFiles)

    // Auto upload if enabled
    if (props.autoUpload && props.uploadUrl) {
      uploadFiles(validFiles)
    }
  }
}

const validateFile = (file) => {
  const errors = []

  // Size validation
  if (props.maxSize && file.size > props.maxSize) {
    errors.push(`File "${file.name}" is too large. Maximum size: ${formatFileSize(props.maxSize)}`)
  }

  // Type validation
  if (props.accept !== '*/*') {
    const acceptedTypes = props.accept.split(',').map(t => t.trim())
    const isAccepted = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      return file.type.match(type.replace('*', '.*'))
    })

    if (!isAccepted) {
      errors.push(`File "${file.name}" type not accepted`)
    }
  }

  return errors
}

const removeFile = (index) => {
  const removedFile = fileList.value[index]
  fileList.value.splice(index, 1)

  // Update model value
  const filesToEmit = props.multiple 
    ? fileList.value.map(f => f.file)
    : (fileList.value.length > 0 ? fileList.value[0].file : null)

  emit('update:modelValue', filesToEmit)
  emit('file-removed', removedFile)
}

const uploadFiles = async (files) => {
  if (!props.uploadUrl) return

  uploading.value = true
  uploadProgress.value = 0

  try {
    for (let i = 0; i < files.length; i++) {
      const fileItem = files[i]
      fileItem.status = 'uploading'

      const formData = new FormData()
      formData.append('file', fileItem.file)

      try {
        const response = await fetch(props.uploadUrl, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          fileItem.status = 'success'
          emit('upload-success', { file: fileItem.file, response })
        } else {
          fileItem.status = 'error'
          emit('upload-error', { file: fileItem.file, error: 'Upload failed' })
        }
      } catch (error) {
        fileItem.status = 'error'
        emit('upload-error', { file: fileItem.file, error })
      }

      uploadProgress.value = ((i + 1) / files.length) * 100
    }
  } finally {
    uploading.value = false
    setTimeout(() => {
      uploadProgress.value = null
    }, 2000)
  }
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  
  return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`
}

const getFileIcon = (file) => {
  const type = file.type || file.file?.type
  
  if (type?.startsWith('image/')) return 'i-lucide-image'
  if (type?.startsWith('video/')) return 'i-lucide-video'
  if (type?.startsWith('audio/')) return 'i-lucide-music'
  if (type?.includes('pdf')) return 'i-lucide-file-text'
  if (type?.includes('word') || type?.includes('document')) return 'i-lucide-file-text'
  if (type?.includes('sheet') || type?.includes('excel')) return 'i-lucide-table'
  if (type?.includes('zip') || type?.includes('rar')) return 'i-lucide-archive'
  
  return 'i-lucide-file'
}

const getUploadSubtext = () => {
  const parts = []
  
  if (props.accept !== '*/*') {
    parts.push(props.accept.replace(/,/g, ', '))
  }
  
  if (props.maxSize) {
    parts.push(`up to ${formatFileSize(props.maxSize)}`)
  }
  
  if (props.multiple && props.maxFiles) {
    parts.push(`max ${props.maxFiles} files`)
  }
  
  return parts.length > 0 ? parts.join(' • ') : 'Any file type'
}

// Watch for external model value changes
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    fileList.value = []
  } else if (newValue !== fileList.value.map(f => f.file)) {
    // Sync external changes if needed
    const files = Array.isArray(newValue) ? newValue : [newValue]
    fileList.value = files.map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending'
    }))
  }
}, { immediate: true })
</script>