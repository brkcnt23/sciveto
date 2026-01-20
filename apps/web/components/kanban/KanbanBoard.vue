<template>
  <div class="kanban-board h-full overflow-x-auto">
    <div class="flex gap-4 h-full p-4">
      <!-- Column: To Do -->
      <div class="kanban-column flex-shrink-0 w-80">
        <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm h-full flex flex-col">
          <div class="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-neutral-900 dark:text-white">To Do</h3>
              <UBadge color="neutral" variant="soft">{{ getColumnCards('TODO').length }}</UBadge>
            </div>
            <UButton size="sm" variant="outline" icon="i-lucide-plus" class="w-full" @click="openCreateCard('TODO')">
              Add Card
            </UButton>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <div
              v-for="card in getColumnCards('TODO')"
              :key="card.id"
              class="kanban-card bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              draggable="true"
              @dragstart="handleDragStart(card, $event)"
              @dragend="handleDragEnd"
              @click="openCardDetail(card)"
            >
              <h4 class="font-medium text-neutral-900 dark:text-white mb-2">{{ card.title }}</h4>
              <p v-if="card.description" class="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                {{ card.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UBadge v-if="card.priority" :color="getPriorityColor(card.priority)" size="xs">
                    {{ card.priority }}
                  </UBadge>
                  <div v-if="card._count?.comments > 0" class="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <UIcon name="i-lucide-message-square" class="w-3 h-3" />
                    {{ card._count.comments }}
                  </div>
                </div>
                
                <div v-if="card.assignedTo" class="flex items-center gap-1">
                  <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {{ card.assignedTo.firstName?.charAt(0) || 'U' }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div v-if="card.tags?.length > 0" class="flex flex-wrap gap-1 mt-2">
                <UBadge
                  v-for="cardTag in card.tags"
                  :key="cardTag.tag.id"
                  size="xs"
                  :style="{ backgroundColor: cardTag.tag.color }"
                  class="text-white"
                >
                  {{ cardTag.tag.name }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: In Progress -->
      <div class="kanban-column flex-shrink-0 w-80">
        <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm h-full flex flex-col">
          <div class="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-neutral-900 dark:text-white">In Progress</h3>
              <UBadge color="warning" variant="soft">{{ getColumnCards('IN_PROGRESS').length }}</UBadge>
            </div>
            <UButton size="sm" variant="outline" icon="i-lucide-plus" class="w-full" @click="openCreateCard('IN_PROGRESS')">
              Add Card
            </UButton>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <div
              v-for="card in getColumnCards('IN_PROGRESS')"
              :key="card.id"
              class="kanban-card bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              draggable="true"
              @dragstart="handleDragStart(card, $event)"
              @dragend="handleDragEnd"
              @click="openCardDetail(card)"
            >
              <h4 class="font-medium text-neutral-900 dark:text-white mb-2">{{ card.title }}</h4>
              <p v-if="card.description" class="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                {{ card.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UBadge v-if="card.priority" :color="getPriorityColor(card.priority)" size="xs">
                    {{ card.priority }}
                  </UBadge>
                  <div v-if="card._count?.comments > 0" class="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <UIcon name="i-lucide-message-square" class="w-3 h-3" />
                    {{ card._count.comments }}
                  </div>
                </div>
                
                <div v-if="card.assignedTo" class="flex items-center gap-1">
                  <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {{ card.assignedTo.firstName?.charAt(0) || 'U' }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div v-if="card.tags?.length > 0" class="flex flex-wrap gap-1 mt-2">
                <UBadge
                  v-for="cardTag in card.tags"
                  :key="cardTag.tag.id"
                  size="xs"
                  :style="{ backgroundColor: cardTag.tag.color }"
                  class="text-white"
                >
                  {{ cardTag.tag.name }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: Review -->
      <div class="kanban-column flex-shrink-0 w-80">
        <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm h-full flex flex-col">
          <div class="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-neutral-900 dark:text-white">Review</h3>
              <UBadge color="info" variant="soft">{{ getColumnCards('REVIEW').length }}</UBadge>
            </div>
            <UButton size="sm" variant="outline" icon="i-lucide-plus" class="w-full" @click="openCreateCard('REVIEW')">
              Add Card
            </UButton>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <div
              v-for="card in getColumnCards('REVIEW')"
              :key="card.id"
              class="kanban-card bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              draggable="true"
              @dragstart="handleDragStart(card, $event)"
              @dragend="handleDragEnd"
              @click="openCardDetail(card)"
            >
              <h4 class="font-medium text-neutral-900 dark:text-white mb-2">{{ card.title }}</h4>
              <p v-if="card.description" class="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                {{ card.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UBadge v-if="card.priority" :color="getPriorityColor(card.priority)" size="xs">
                    {{ card.priority }}
                  </UBadge>
                  <div v-if="card._count?.comments > 0" class="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <UIcon name="i-lucide-message-square" class="w-3 h-3" />
                    {{ card._count.comments }}
                  </div>
                </div>
                
                <div v-if="card.assignedTo" class="flex items-center gap-1">
                  <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {{ card.assignedTo.firstName?.charAt(0) || 'U' }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div v-if="card.tags?.length > 0" class="flex flex-wrap gap-1 mt-2">
                <UBadge
                  v-for="cardTag in card.tags"
                  :key="cardTag.tag.id"
                  size="xs"
                  :style="{ backgroundColor: cardTag.tag.color }"
                  class="text-white"
                >
                  {{ cardTag.tag.name }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: Done -->
      <div class="kanban-column flex-shrink-0 w-80">
        <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm h-full flex flex-col">
          <div class="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-neutral-900 dark:text-white">Done</h3>
              <UBadge color="success" variant="soft">{{ getColumnCards('DONE').length }}</UBadge>
            </div>
            <UButton size="sm" variant="outline" icon="i-lucide-plus" class="w-full" @click="openCreateCard('DONE')">
              Add Card
            </UButton>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <div
              v-for="card in getColumnCards('DONE')"
              :key="card.id"
              class="kanban-card bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              draggable="true"
              @dragstart="handleDragStart(card, $event)"
              @dragend="handleDragEnd"
              @click="openCardDetail(card)"
            >
              <h4 class="font-medium text-neutral-900 dark:text-white mb-2">{{ card.title }}</h4>
              <p v-if="card.description" class="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                {{ card.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UBadge v-if="card.priority" :color="getPriorityColor(card.priority)" size="xs">
                    {{ card.priority }}
                  </UBadge>
                  <div v-if="card._count?.comments > 0" class="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <UIcon name="i-lucide-message-square" class="w-3 h-3" />
                    {{ card._count.comments }}
                  </div>
                </div>
                
                <div v-if="card.assignedTo" class="flex items-center gap-1">
                  <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {{ card.assignedTo.firstName?.charAt(0) || 'U' }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div v-if="card.tags?.length > 0" class="flex flex-wrap gap-1 mt-2">
                <UBadge
                  v-for="cardTag in card.tags"
                  :key="cardTag.tag.id"
                  size="xs"
                  :style="{ backgroundColor: cardTag.tag.color }"
                  class="text-white"
                >
                  {{ cardTag.tag.name }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  projectId: string
  cards: any[]
}>()

const emit = defineEmits<{
  openCardDetail: [card: any]
  openCreateCard: [columnId: string]
  updateCard: [card: any]
}>()

const draggedCard = ref<any>(null)

const getColumnCards = (columnId: string) => {
  return props.cards.filter(card => card.status === columnId)
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, any> = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'error',
    URGENT: 'error'
  }
  return colors[priority] || 'neutral'
}

const handleDragStart = (card: any, event: DragEvent) => {
  draggedCard.value = card
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', event.target as any)
  }
}

const handleDragEnd = () => {
  draggedCard.value = null
}

const openCardDetail = (card: any) => {
  emit('openCardDetail', card)
}

const openCreateCard = (columnId: string) => {
  emit('openCreateCard', columnId)
}
</script>

<style scoped>
.kanban-column {
  min-width: 320px;
}

.kanban-card {
  transition: all 0.2s ease;
}

.kanban-card:hover {
  transform: translateY(-2px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
