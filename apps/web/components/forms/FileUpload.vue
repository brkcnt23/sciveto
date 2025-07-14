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
    <!-- File Input (Hidden) -->
    <input
      ref="fileInputRef"
      :name="name"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="hidden"
      @change="handleFileSelect"
    >

    <!-- Drop Zone -->
    <div
      :class="[
        'relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer',
        'hover:border-primary-400 hover:bg-primary-50/50',
        isDragOver && 'border-primary-400 bg-primary-50 scale-[1.02]',
        disabled && 'opacity-50 cursor-not-allowed',
        sizeClasses[size]?.container || 'p-6',
        dropZoneClass
      ]"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Upload Icon and Text -->
      <div class="flex flex-col items-center justify-center text-center space-y-3">
        <UIcon 
          :name="uploadIcon" 
          :class="[
            'text-neutral-400',
            sizeClasses[size]?.icon || 'w-12 h-12'
          ]" 
        />
        
        <div class="space-y-1">
          <p :class="['font-medium text-neutral-700', sizeClasses[size]?.title || 'text-base']">
            {{ uploadText }}
          </p>
          <p :class="['text-neutral-500', sizeClasses[size]?.subtitle || 'text-sm']">
            {{ uploadSubtext }}
          </p>
        </div>

        <!-- File Restrictions -->
        <div v-if="showRestrictions" class="text-xs text-neutral-400 space-y-1">
          <p v-if="accept !== '*/*'">Accepted: {{ accept }}</p>
          <p>Max size: {{ formatFileSize(maxSize) }}</p>
          <p v-if="multiple">Max files: {{ maxFiles }}</p>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div 
        v-if="isUploading" 
        class="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center"
      >
        <div class="text-center space-y-2">
          <UIcon name="i-lucide-loader-2" class="w-8 h-8 text-primary-600 animate-spin mx-auto" />
          <p class="text-sm font-medium text-neutral-700">Uploading...</p>
        </div>
      </div>
    </div>

    <!-- File List -->
    <div v-if="fileList.length > 0" class="mt-4 space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-medium text-neutral-700">
          Selected Files ({{ fileList.length }})
        </h4>
        <UButton
          v-if="!autoUpload"
          variant="ghost"
          color="neutral"
          size="xs"
          icon="i-lucide-trash-2"
          @click="clearFiles"
        >
          Clear All
        </UButton>
      </div>

      <!-- File Items -->
      <div class="space-y-2">
        <div 
          v-for="(fileItem, index) in fileList" 
          :key="`${fileItem.name}-${index}`"
          class="flex items-center justify-between p-3 border border-neutral-200 rounded-lg bg-neutral-50"
        >
          <div class="flex items-center space-x-3 flex-1 min-w-0">
            <!-- File Icon -->
            <UIcon :name="getFileIcon(fileItem)" class="w-5 h-5 text-neutral-500 shrink-0" />
            
            <!-- File Info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-neutral-700 truncate">{{ fileItem.name }}</p>
              <p class="text-xs text-neutral-500">{{ formatFileSize(fileItem.size) }}</p>
              
              <!-- Error Message -->
              <p v-if="fileItem.error" class="text-xs text-error-600 mt-1">{{ fileItem.error }}</p>
            </div>
          </div>

          <!-- Upload Status -->
          <div class="flex items-center space-x-3 shrink-0">
            <!-- Progress Bar -->
            <div v-if="fileItem.uploading" class="flex items-center space-x-2">
              <UProgress 
                :model-value="fileItem.progress" 
                :max="100" 
                size="sm"
                class="w-16"
              />
              <span class="text-xs text-neutral-500">{{ fileItem.progress }}%</span>
            </div>

            <!-- Upload Status Icons -->
            <UIcon 
              v-else-if="fileItem.uploaded" 
              name="i-lucide-check-circle" 
              class="w-5 h-5 text-success-600" 
            />
            <UIcon 
              v-else-if="fileItem.error" 
              name="i-lucide-x-circle" 
              class="w-5 h-5 text-error-600" 
            />
            <UIcon 
              v-else 
              name="i-lucide-clock" 
              class="w-5 h-5 text-neutral-400" 
            />

            <!-- Remove Button -->
            <UButton
              variant="ghost"
              color="neutral"
              size="xs"
              icon="i-lucide-x"
              @click="removeFile(index)"
            />
          </div>
        </div>
      </div>
      
      <!-- Upload Actions -->
      <div v-if="!autoUpload && hasUnuploadedFiles" class="flex justify-end space-x-2 pt-2">
        <UButton
          variant="outline"
          color="neutral"
          size="sm"
          @click="clearFiles"
        >
          Clear All
        </UButton>
        <UButton
          size="sm"
          :loading="isUploading"
          @click="uploadFiles"
        >
          Upload Files
        </UButton>
      </div>
    </div>
  </UFormField>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // v-model
  modelValue: {
    type: [Array, File, FileList],
    default: () => []
  },
  
  // Form field props - NAME IS NOW REQUIRED
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true // This is now required for Nuxt UI v3
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
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 10MB
  },
  maxFiles: {
    type: Number,
    default: 5
  },
  disabled: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  
  // Styling props
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  
  // Text customization
  uploadText: {
    type: String,
    default: 'Click to upload or drag and drop'
  },
  uploadSubtext: {
    type: String,
    default: 'Select files to upload'
  },
  uploadIcon: {
    type: String,
    default: 'i-lucide-upload-cloud'
  },
  showRestrictions: {
    type: Boolean,
    default: true
  },
  
  // Custom classes
  dropZoneClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'upload-success', 'upload-error', 'files-added', 'file-removed'])

// Refs
const fileInputRef = ref(null)
const isDragOver = ref(false)
const isUploading = ref(false)

// File management
const fileList = ref([])

// Size classes for Nuxt UI v3
const sizeClasses = {
  xs: { 
    container: 'p-3', 
    icon: 'w-8 h-8', 
    title: 'text-xs', 
    subtitle: 'text-xs' 
  },
  sm: { 
    container: 'p-4', 
    icon: 'w-10 h-10', 
    title: 'text-sm', 
    subtitle: 'text-xs' 
  },
  md: { 
    container: 'p-6', 
    icon: 'w-12 h-12', 
    title: 'text-base', 
    subtitle: 'text-sm' 
  },
  lg: { 
    container: 'p-8', 
    icon: 'w-14 h-14', 
    title: 'text-lg', 
    subtitle: 'text-sm' 
  },
  xl: { 
    container: 'p-10', 
    icon: 'w-16 h-16', 
    title: 'text-xl', 
    subtitle: 'text-base' 
  }
}

// Computed
const hasUnuploadedFiles = computed(() => {
  return fileList.value.some(file => !file.uploaded && !file.uploading && !file.error)
})

// File validation
const validateFile = (file) => {
  // Check file size
  if (file.size > props.maxSize) {
    return `File too large. Max size: ${formatFileSize(props.maxSize)}`
  }
  
  // Check file type if accept is specified
  if (props.accept !== '*/*' && props.accept) {
    const acceptedTypes = props.accept.split(',').map(type => type.trim())
    const fileType = file.type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    
    const isValidType = acceptedTypes.some(acceptedType => {
      if (acceptedType.startsWith('.')) {
        return acceptedType === fileExtension
      }
      if (acceptedType.includes('*')) {
        const baseType = acceptedType.split('/')[0]
        return fileType.startsWith(baseType)
      }
      return acceptedType === fileType
    })
    
    if (!isValidType) {
      return `Invalid file type. Accepted: ${props.accept}`
    }
  }
  
  return null
}

// Methods
const triggerFileInput = () => {
  if (!props.disabled) {
    fileInputRef.value?.click()
  }
}

const handleDragOver = (event) => {
  if (!props.disabled) {
    isDragOver.value = true
  }
}

const handleDragLeave = (event) => {
  isDragOver.value = false
}

const handleDrop = (event) => {
  isDragOver.value = false
  if (props.disabled) return
  
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
  // Reset input value to allow selecting the same file again
  event.target.value = ''
}

const processFiles = (files) => {
  if (files.length === 0) return
  
  // Check max files limit
  if (props.multiple && props.maxFiles) {
    const totalFiles = fileList.value.length + files.length
    if (totalFiles > props.maxFiles) {
      emit('upload-error', `Too many files. Maximum ${props.maxFiles} files allowed.`)
      return
    }
  }
  
  // Process each file
  const newFiles = files.map(file => {
    const error = validateFile(file)
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploaded: false,
      uploading: false,
      progress: 0,
      error: error
    }
  })
  
  if (props.multiple) {
    fileList.value.push(...newFiles)
  } else {
    fileList.value = [newFiles[0]]
  }
  
  updateModelValue()
  emit('files-added', newFiles)
  
  if (props.autoUpload) {
    uploadFiles()
  }
}

const removeFile = (index) => {
  const removedFile = fileList.value.splice(index, 1)[0]
  updateModelValue()
  emit('file-removed', removedFile)
}

const clearFiles = () => {
  fileList.value = []
  updateModelValue()
}

const uploadFiles = async () => {
  const filesToUpload = fileList.value.filter(file => !file.uploaded && !file.uploading && !file.error)
  if (filesToUpload.length === 0) return
  
  isUploading.value = true
  
  for (const fileItem of filesToUpload) {
    try {
      fileItem.uploading = true
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        fileItem.progress = progress
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      fileItem.uploading = false
      fileItem.uploaded = true
      fileItem.progress = 100
      
      emit('upload-success', fileItem)
    } catch (error) {
      fileItem.uploading = false
      fileItem.error = error.message || 'Upload failed'
      emit('upload-error', error, fileItem)
    }
  }
  
  isUploading.value = false
}

const updateModelValue = () => {
  const files = fileList.value.map(item => item.file)
  if (props.multiple) {
    emit('update:modelValue', files)
  } else {
    emit('update:modelValue', files[0] || null)
  }
}

// Utility functions
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileIcon = (file) => {
  const type = file.type.toLowerCase()
  if (type.includes('image')) return 'i-lucide-image'
  if (type.includes('video')) return 'i-lucide-video'
  if (type.includes('audio')) return 'i-lucide-music'
  if (type.includes('pdf')) return 'i-lucide-file-text'
  if (type.includes('word') || type.includes('document')) return 'i-lucide-file-text'
  if (type.includes('excel') || type.includes('spreadsheet')) return 'i-lucide-file-spreadsheet'
  if (type.includes('zip') || type.includes('rar')) return 'i-lucide-archive'
  return 'i-lucide-file'
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    fileList.value = []
  }
}, { deep: true })
</script>