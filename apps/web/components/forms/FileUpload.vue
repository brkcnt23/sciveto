<!-- components/base/FileUpload.vue -->
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
    <!-- Drop Zone -->
    <div
      :class="[
        'relative border-2 border-dashed rounded-lg transition-colors duration-200',
        isDragOver 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-300 hover:border-gray-400',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        dropZoneClass
      ]"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Hidden File Input -->
      <input
        ref="fileInputRef"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        class="hidden"
        @change="handleFileSelect"
      />
      
      <!-- Upload Area -->
      <div class="flex flex-col items-center justify-center py-8 px-6">
        <UIcon
          :name="uploadIcon"
          :class="[
            'mb-4',
            sizeClasses[size].icon,
            isDragOver ? 'text-primary-500' : 'text-gray-400'
          ]"
        />
        
        <p :class="['text-center font-medium', sizeClasses[size].title]">
          <span v-if="isDragOver" class="text-primary-600">
            Drop files here
          </span>
          <span v-else>
            {{ uploadText }}
          </span>
        </p>
        
        <p :class="['text-center text-gray-500 mt-1', sizeClasses[size].subtitle]">
          {{ uploadSubtext }}
        </p>
        
        <!-- Upload restrictions -->
        <div v-if="showRestrictions" class="mt-2 text-xs text-gray-400 text-center">
          <p v-if="accept">Accepted: {{ accept }}</p>
          <p v-if="maxSize">Max size: {{ formatFileSize(maxSize) }}</p>
          <p v-if="multiple && maxFiles">Max files: {{ maxFiles }}</p>
        </div>
      </div>
    </div>
    
    <!-- File List -->
    <div v-if="fileList.length > 0" class="mt-4 space-y-2">
      <h4 class="text-sm font-medium text-gray-700">
        {{ multiple ? 'Selected Files' : 'Selected File' }}
      </h4>
      
      <div class="space-y-2">
        <div
          v-for="(file, index) in fileList"
          :key="index"
          :class="[
            'flex items-center justify-between p-3 bg-gray-50 rounded-lg border',
            file.error ? 'border-red-200 bg-red-50' : 'border-gray-200'
          ]"
        >
          <!-- File Info -->
          <div class="flex items-center space-x-3 flex-1 min-w-0">
            <UIcon
              :name="getFileIcon(file)"
              :class="[
                'flex-shrink-0',
                file.error ? 'text-red-500' : 'text-gray-500'
              ]"
            />
            
            <div class="flex-1 min-w-0">
              <p :class="[
                'text-sm font-medium truncate',
                file.error ? 'text-red-700' : 'text-gray-900'
              ]">
                {{ file.name }}
              </p>
              
              <div class="flex items-center space-x-2 text-xs text-gray-500">
                <span>{{ formatFileSize(file.size) }}</span>
                
                <!-- Upload Progress -->
                <template v-if="file.uploading">
                  <span>•</span>
                  <span class="text-blue-600">{{ file.progress }}%</span>
                </template>
                
                <!-- Upload Status -->
                <template v-else-if="file.uploaded">
                  <span>•</span>
                  <span class="text-green-600">✓ Uploaded</span>
                </template>
                
                <template v-else-if="file.error">
                  <span>•</span>
                  <span class="text-red-600">{{ file.error }}</span>
                </template>
              </div>
              
              <!-- Progress Bar -->
              <div v-if="file.uploading" class="mt-1">
                <UProgress
                  :model-value="file.progress"
                  color="primary"
                  size="xs"
                />
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-2">
            <UButton
              v-if="!file.uploading"
              variant="ghost"
              size="sm"
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
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  // v-model
  modelValue: {
    type: [Array, File, FileList],
    default: () => []
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

// Size classes
const sizeClasses = {
  xs: { icon: 'w-8 h-8', title: 'text-xs', subtitle: 'text-xs' },
  sm: { icon: 'w-10 h-10', title: 'text-sm', subtitle: 'text-xs' },
  md: { icon: 'w-12 h-12', title: 'text-base', subtitle: 'text-sm' },
  lg: { icon: 'w-14 h-14', title: 'text-lg', subtitle: 'text-sm' },
  xl: { icon: 'w-16 h-16', title: 'text-xl', subtitle: 'text-base' }
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