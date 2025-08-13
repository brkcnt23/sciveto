<!-- components/ui/PageHeader.vue -->
<template>
  <div class="page-header">
    <div class="header-left">
      <div class="flex items-center gap-4">
        <div 
          v-if="icon"
          class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-medium"
          :style="{ backgroundColor: iconColor || '#3b82f6' }"
        >
          <UIcon :name="icon" size="20" />
        </div>
        <div>
          <h1 class="page-title">{{ title }}</h1>
          <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </div>
    <div class="header-actions">
      <slot name="actions">
        <div class="flex items-center gap-3">
          <UButton
            v-if="showImportButton"
            @click="$emit('import')"
            icon="i-lucide-upload"
            color="neutral"
            variant="outline"
          >
            {{ importLabel || 'İçe Aktar' }}
          </UButton>
          <UButton
            v-if="showExportButton"
            @click="$emit('export')"
            icon="i-lucide-download"
            color="neutral"
            variant="outline"
          >
            {{ exportLabel || 'Dışa Aktar' }}
          </UButton>
          <UButton
            v-if="showAddButton"
            @click="$emit('add-item')"
            icon="i-lucide-plus"
            color="primary"
            variant="solid"
          >
            Yeni {{ itemType || 'Öğe' }} Ekle
          </UButton>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  icon?: string
  iconColor?: string
  itemType?: string
  exportLabel?: string
  importLabel?: string
  showAddButton?: boolean
  showExportButton?: boolean
  showImportButton?: boolean
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  itemType: 'Öğe',
  exportLabel: 'Dışa Aktar',
  importLabel: 'İçe Aktar',
  showAddButton: true,
  showExportButton: true,
  showImportButton: true
})

defineEmits<{
  'add-item': []
  'export': []
  'import': []
}>()
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.page-subtitle {
  color: rgb(191 219 254);
  margin-top: 0.25rem;
  font-size: 0.875rem;
  opacity: 0.9;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    text-align: center;
  }
  
  .header-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
