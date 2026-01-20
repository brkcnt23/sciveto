<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <UInput
            v-model="cardData.title"
            size="lg"
            variant="none"
            placeholder="Card title"
            class="font-semibold text-xl mb-2"
          />
          <div class="text-sm text-neutral-600 dark:text-neutral-400">
            in list <span class="font-medium">{{ getStatusLabel(cardData.status) }}</span>
          </div>
        </div>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="close"
        />
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
            <UIcon name="i-lucide-align-left" class="w-4 h-4 inline" />
            Description
          </label>
          <UTextarea
            v-model="cardData.description"
            placeholder="Add a more detailed description..."
            :rows="4"
          />
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Priority
            </label>
            <USelect
              v-model="cardData.priority"
              :options="priorityOptions"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Status
            </label>
            <USelect
              v-model="cardData.status"
              :options="statusOptions"
            />
          </div>
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
            <UIcon name="i-lucide-tag" class="w-4 h-4 inline" />
            Tags
          </label>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="cardTag in cardData.tags"
              :key="cardTag.tag.id"
              :style="{ backgroundColor: cardTag.tag.color }"
              class="text-white"
            >
              {{ cardTag.tag.name }}
              <UIcon
                name="i-lucide-x"
                class="w-3 h-3 ml-1 cursor-pointer"
                @click="removeTag(cardTag.tag.id)"
              />
            </UBadge>
            <UButton
              size="xs"
              variant="outline"
              icon="i-lucide-plus"
              @click="showTagSelector = true"
            >
              Add Tag
            </UButton>
          </div>
        </div>

        <!-- Comments -->
        <div>
          <label class="block text-sm font-medium text-neutral-900 dark:text-white mb-3">
            <UIcon name="i-lucide-message-square" class="w-4 h-4 inline" />
            Comments
          </label>
          
          <!-- Add Comment -->
          <div class="mb-4">
            <UTextarea
              v-model="newComment"
              placeholder="Write a comment..."
              :rows="2"
              class="mb-2"
            />
            <UButton
              size="sm"
              @click="addComment"
              :disabled="!newComment.trim()"
            >
              Add Comment
            </UButton>
          </div>

          <!-- Comment List -->
          <div class="space-y-3">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="flex gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
            >
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {{ comment.user?.firstName?.charAt(0) || 'U' }}
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-medium text-sm text-neutral-900 dark:text-white">
                    {{ comment.user?.firstName }} {{ comment.user?.lastName }}
                  </span>
                  <span class="text-xs text-neutral-500">
                    {{ formatDate(comment.createdAt) }}
                  </span>
                </div>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ comment.content }}
                </p>
              </div>
            </div>

            <div v-if="comments.length === 0" class="text-center py-4 text-neutral-500 text-sm">
              No comments yet. Be the first to comment!
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <UButton
          color="error"
          variant="outline"
          icon="i-lucide-trash-2"
          @click="deleteCard"
        >
          Delete Card
        </UButton>
        
        <div class="flex gap-2">
          <UButton
            color="neutral"
            variant="outline"
            @click="close"
          >
            Cancel
          </UButton>
          <UButton
            color="primary"
            @click="saveCard"
          >
            Save Changes
          </UButton>
        </div>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  card: any
  comments: any[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  save: [card: any]
  delete: [cardId: string]
  addComment: [data: { cardId: string, content: string }]
  removeTag: [data: { cardId: string, tagId: string }]
}>()

const isOpen = ref(props.modelValue)
const cardData = ref({ ...props.card })
const newComment = ref('')
const showTagSelector = ref(false)

const priorityOptions = [
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
  { label: 'Urgent', value: 'URGENT' }
]

const statusOptions = [
  { label: 'To Do', value: 'TODO' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Review', value: 'REVIEW' },
  { label: 'Done', value: 'DONE' }
]

watch(() => props.modelValue, (val) => {
  isOpen.value = val
})

watch(() => props.card, (val) => {
  cardData.value = { ...val }
})

watch(isOpen, (val) => {
  emit('update:modelValue', val)
})

const getStatusLabel = (status: string) => {
  const option = statusOptions.find(opt => opt.value === status)
  return option?.label || status
}

const close = () => {
  isOpen.value = false
}

const saveCard = () => {
  emit('save', cardData.value)
  close()
}

const deleteCard = () => {
  if (confirm('Are you sure you want to delete this card?')) {
    emit('delete', cardData.value.id)
    close()
  }
}

const addComment = () => {
  if (newComment.value.trim()) {
    emit('addComment', {
      cardId: cardData.value.id,
      content: newComment.value
    })
    newComment.value = ''
  }
}

const removeTag = (tagId: string) => {
  emit('removeTag', {
    cardId: cardData.value.id,
    tagId
  })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 48) return 'Yesterday'
  return date.toLocaleDateString()
}
</script>
