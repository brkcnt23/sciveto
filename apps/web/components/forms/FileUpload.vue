<!-- apps/web/components/forms/FileUpload.vue -->
<template>
  <div class="space-y-2">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Drop zone -->
    <div
      :class="[
        'relative border-2 border-dashed rounded-lg transition-colors duration-200',
        isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'
      ]"
      @click="!disabled && triggerFileInput()"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Upload Area -->
      <div class="p-6 text-center">
        <!-- Icon -->
        <Icon 
          :name="uploadIcon" 
          class="w-12 h-12 mx-auto mb-4"
          :class="isDragOver ? 'text-blue-500' : 'text-gray-400'"
        />
        
        <!-- Upload Text -->
        <div class="space-y-2">
          <p class="text-gray-600 dark:text-gray-400">
            {{ uploadText }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500">
            {{ helpText }}
          </p>
          
          <!-- Browse Button -->
          <UButton
            v-if="!disabled"
            variant="outline"
            size="sm"
            @click.stop="triggerFileInput"
          >
            Browse Files
          </UButton>
        </div>
      </div>

      <!-- Hidden file input -->
      <input
        :id="inputId"
        ref="fileInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        class="hidden"
        @change="handleFileSelect"
      />

      <!-- Loading overlay -->
      <div
        v-if="uploading"
        class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg"
      >
        <div class="text-center">
          <LoadingSpinner size="lg" class="mb-2" />
          <p class="text-sm text-gray-600">Uploading...</p>
        </div>
      </div>
    </div>

    <!-- File list -->
    <div v-if="fileList.length > 0" class="space-y-2">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Selected Files ({{ fileList.length }})
      </h4>
      
      <div class="space-y-2 max-h-32 overflow-y-auto">
        <div
          v-for="(file, index) in fileList"
          :key="index"
          class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded border"
        >
          <div class="flex items-center space-x-3 flex-1 min-w-0">
            <!-- File icon -->
            <Icon 
              :name="getFileIcon(file)" 
              class="w-5 h-5 text-gray-500 flex-shrink-0" 
            />
            
            <!-- File info -->
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {{ file.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatFileSize(file.size) }}
              </p>
            </div>
          </div>

          <!-- Progress bar (if uploading) -->
          <div v-if="file.uploading" class="flex items-center space-x-2">
            <div class="w-16 bg-gray-200 rounded-full h-1">
              <div 
                class="bg-blue-500 h-1 rounded-full transition-all duration-300"
                :style="{ width: `${file.progress || 0}%` }"
              ></div>
            </div>
            <span class="text-xs text-gray-500">{{ file.progress || 0 }}%</span>
          </div>

          <!-- Status or remove button -->
          <div class="flex items-center space-x-2">
            <!-- Upload status -->
            <div v-if="file.status" class="flex items-center">
              <Icon 
                v-if="file.status === 'success'"
                name="i-heroicons-check-circle"
                class="w-4 h-4 text-green-500"
              />
              <Icon 
                v-else-if="file.status === 'error'"
                name="i-heroicons-x-circle"
                class="w-4 h-4 text-red-500"
              />
              <LoadingSpinner 
                v-else-if="file.status === 'uploading'"
                size="xs"
              />
            </div>

            <!-- Remove button -->
            <UButton
              v-if="!file.uploading"
              variant="ghost"
              size="xs"
              color="red"
              @click="removeFile(index)"
            >
              <Icon name="i-heroicons-x-mark" class="w-3 h-3" />
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Error messages -->
    <div v-if="errors.length > 0" class="space-y-1">
      <p
        v-for="(error, index) in errors"
        :key="index"
        class="text-sm text-red-600 dark:text-red-400"
      >
        {{ error }}
      </p>
    </div>

    <!-- Help text -->
    <p
      v-if="helpText && errors.length === 0"
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: String,
  helpText: String,
  accept: {
    type: String,
    default: '*/*'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  maxFiles: {
    type: Number,
    default: 10
  },
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 10MB
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'upload-success', 'upload-error', 'file-select'])

// Reactive data
const fileInput = ref(null)
const isDragOver = ref(false)
const uploading = ref(false)
const fileList = ref([...props.modelValue])
const errors = ref([])

// Computed properties
const inputId = computed(() => `file-upload-${Math.random().toString(36).substr(2, 9)}`)

const uploadIcon = computed(() => {
  if (props.multiple) {
    return 'i-heroicons-document-plus'
  }
  return props.accept.includes('image') ? 'i-heroicons-photo' : 'i-heroicons-document'
})

const uploadText = computed(() => {
  if (isDragOver.value) {
    return 'Drop files here'
  }
  if (props.multiple) {
    return 'Drag and drop files here, or click to browse'
  }
  return 'Drag and drop a file here, or click to browse'
})

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  fileList.value = [...newValue]
}, { deep: true })

// Methods
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
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
  
  // Clear the input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const processFiles = (files) => {
  errors.value = []
  
  // Validate file count
  const totalFiles = fileList.value.length + files.length
  if (totalFiles > props.maxFiles) {
    errors.value.push(`Maximum ${props.maxFiles} files allowed`)
    return
  }

  // Process each file
  const validFiles = []
  for (const file of files) {
    // Validate file size
    if (file.size > props.maxSize) {
      errors.value.push(`${file.name} is too large (max ${formatFileSize(props.maxSize)})`)
      continue
    }

    // Validate file type
    if (props.accept !== '*/*' && !isFileTypeAccepted(file)) {
      errors.value.push(`${file.name} is not an accepted file type`)
      continue
    }

    // Add file with metadata
    const fileObj = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: null,
      progress: 0,
      uploading: false
    }

    validFiles.push(fileObj)
  }

  // Add valid files to list
  if (!props.multiple) {
    fileList.value = validFiles.slice(0, 1)
  } else {
    fileList.value.push(...validFiles)
  }

  // Emit file select event
  emit('file-select', validFiles)

  // Auto upload if enabled
  if (props.autoUpload && validFiles.length > 0) {
    uploadFiles(validFiles)
  }

  // Update model value
  updateModelValue()
}

const removeFile = (index) => {
  fileList.value.splice(index, 1)
  updateModelValue()
}

const updateModelValue = () => {
  emit('update:modelValue', [...fileList.value])
}

const uploadFiles = async (files = fileList.value) => {
  if (files.length === 0) return

  uploading.value = true

  for (const fileObj of files) {
    if (fileObj.status === 'success') continue

    fileObj.uploading = true
    fileObj.status = 'uploading'
    fileObj.progress = 0

    try {
      // Simulate upload progress
      const uploadPromise = simulateUpload(fileObj)
      await uploadPromise

      fileObj.status = 'success'
      fileObj.uploading = false
      fileObj.progress = 100

      emit('upload-success', { file: fileObj.file, fileObj })
    } catch (error) {
      fileObj.status = 'error'
      fileObj.uploading = false
      fileObj.progress = 0

      emit('upload-error', { file: fileObj.file, error, fileObj })
    }
  }

  uploading.value = false
}

const simulateUpload = (fileObj) => {
  return new Promise((resolve, reject) => {
    const duration = 2000 + Math.random() * 3000 // 2-5 seconds
    const interval = 100
    const steps = duration / interval
    const progressIncrement = 100 / steps

    let currentProgress = 0
    const progressInterval = setInterval(() => {
      currentProgress += progressIncrement
      fileObj.progress = Math.min(currentProgress, 100)

      if (currentProgress >= 100) {
        clearInterval(progressInterval)
        // 90% success rate simulation
        if (Math.random() > 0.1) {
          resolve()
        } else {
          reject(new Error('Upload failed'))
        }
      }
    }, interval)
  })
}

const isFileTypeAccepted = (file) => {
  const acceptedTypes = props.accept.split(',').map(type => type.trim())
  
  return acceptedTypes.some(acceptedType => {
    if (acceptedType === '*/*') return true
    if (acceptedType.endsWith('/*')) {
      const category = acceptedType.split('/')[0]
      return file.type.startsWith(category + '/')
    }
    if (acceptedType.startsWith('.')) {
      return file.name.toLowerCase().endsWith(acceptedType.toLowerCase())
    }
    return file.type === acceptedType
  })
}

const getFileIcon = (fileObj) => {
  const file = fileObj.file || fileObj
  const type = file.type || ''
  
  if (type.startsWith('image/')) return 'i-heroicons-photo'
  if (type.startsWith('video/')) return 'i-heroicons-video-camera'
  if (type.startsWith('audio/')) return 'i-heroicons-musical-note'
  if (type.includes('pdf')) return 'i-heroicons-document'
  if (type.includes('word') || type.includes('document')) return 'i-heroicons-document-text'
  if (type.includes('excel') || type.includes('spreadsheet')) return 'i-heroicons-table-cells'
  if (type.includes('powerpoint') || type.includes('presentation')) return 'i-heroicons-presentation-chart-bar'
  if (type.includes('zip') || type.includes('archive')) return 'i-heroicons-archive-box'
  
  return 'i-heroicons-document'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Expose upload method
defineExpose({
  uploadFiles
})
</script>