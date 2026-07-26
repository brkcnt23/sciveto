<!-- components/base/BaseModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div 
        class="modal-overlay" 
        :class="[`theme-${themeState.current}`, overlayClass]"
        @mousedown="handleOverlayMouseDown" 
        @click="handleOverlayClick"
        @keydown.esc="handleEscape"
        tabindex="-1"
        ref="modalRef"
      >
        <div 
          class="modal-content" 
          @click.stop 
          @mousedown.stop 
          :class="[sizeClass, `theme-${themeState.current}`, contentClass]"
          ref="contentRef"
        >
          <div class="modal-header">
            <div class="flex items-center gap-3">
              <UIcon v-if="icon" :name="icon" class="w-5 h-5 text-primary" />
              <h3>{{ title }}</h3>
            </div>
            <button 
              @click="handleClose" 
              class="close-btn"
              type="button"
              aria-label="Modal'ı kapat"
            >
              <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
            </button>
          </div>
          
          <div class="modal-body">
            <slot></slot>
          </div>
          
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useTheme } from '~/composables/useTheme'
import { useDualToast } from '~/composables/useDualToast'

const props = withDefaults(defineProps<{
  title: string
  size?: 'small' | 'medium' | 'large' | 'extra-large'
  preventClose?: boolean
  showCloseNotification?: boolean
  icon?: string
}>(), {
  size: 'medium',
  preventClose: false,
  showCloseNotification: false
})

const emit = defineEmits<{
  close: []
  beforeClose: []
  afterClose: []
}>()

// Custom theme system
const { state: themeState } = useTheme()
const { info } = useDualToast()

const modalRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

const sizeClass = computed(() => {
  return `modal-${props.size}`
})

const overlayClass = computed(() => {
  return themeState.value.isTransitioning ? 'transitioning' : ''
})

const contentClass = computed(() => {
  return themeState.value.isTransitioning ? 'transitioning' : ''
})

// Track where the mouse was pressed down
const mouseDownInsideModal = ref(false)

const handleOverlayMouseDown = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const modalContent = target.closest('.modal-content')
  mouseDownInsideModal.value = !!modalContent
}

const handleOverlayClick = (event: MouseEvent) => {
  if (props.preventClose) return
  
  if (event.target === event.currentTarget && !mouseDownInsideModal.value) {
    handleClose()
  }
  
  mouseDownInsideModal.value = false
}

const handleEscape = (event: KeyboardEvent) => {
  if (props.preventClose) return
  
  if (event.key === 'Escape') {
    event.preventDefault()
    handleClose()
  }
}

const handleClose = () => {
  emit('beforeClose')
  
  if (props.showCloseNotification) {
    info('Modal Closed', 'Dialog has been closed', { icon: 'i-heroicons-x-mark' })
  }
  
  emit('close')
  
  nextTick(() => {
    emit('afterClose')
  })
}

// Focus management
const focusModal = async () => {
  await nextTick()
  if (modalRef.value) {
    modalRef.value.focus()
  }
}

// Prevent body scroll when modal is open
const preventBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = '15px'
  document.body.classList.add('modal-open')
}

const restoreBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.body.classList.remove('modal-open')
}

onMounted(() => {
  preventBodyScroll()
  focusModal()
})

onUnmounted(() => {
  restoreBodyScroll()
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  outline: none;
}

/* Theme-aware overlay */
.modal-overlay.theme-dark {
  background: rgba(0, 0, 0, 0.7);
}

.modal-overlay.transitioning {
  transition: background-color 0.3s ease-in-out;
}

.modal-content {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  user-select: auto;
  color: #111827;
}

/* Dark theme content */
.modal-content.theme-dark {
  background: #1f2937;
  border-color: #374151;
  color: #f9fafb;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.4), 
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.modal-content.transitioning {
  transition: 
    background-color 0.3s ease-in-out,
    border-color 0.3s ease-in-out,
    color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.modal-small { max-width: 400px; }
.modal-medium { max-width: 600px; }
.modal-large { max-width: 800px; }
.modal-extra-large { max-width: 1200px; }

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  flex-shrink: 0;
}

.modal-content.theme-dark .modal-header {
  background: #374151;
  border-bottom-color: #4b5563;
}

.modal-header h3 {
  margin: 0;
  color: #111827;
  font-size: 1.4rem;
  font-weight: 600;
}

.modal-content.theme-dark .modal-header h3 {
  color: #f9fafb;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.close-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.modal-content.theme-dark .close-btn {
  color: #9ca3af;
}

.modal-content.theme-dark .close-btn:hover {
  background: #4b5563;
  color: #e5e7eb;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
  user-select: text;
  background: white;
}

.modal-content.theme-dark .modal-body {
  background: #1f2937;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

.modal-content.theme-dark .modal-footer {
  background: #374151;
  border-top-color: #4b5563;
}

/* Enhanced modal transitions with custom theme system */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(-20px);
}

.modal-enter-to .modal-content,
.modal-leave-from .modal-content {
  transform: scale(1) translateY(0);
}

/* Custom theme transitions */
.modal-content,
.modal-header,
.modal-body,
.modal-footer,
.close-btn {
  transition: 
    color 0.25s ease-in-out,
    background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
}

/* Responsive design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .modal-content {
    margin: 0;
    max-height: calc(100vh - 20px);
    border-radius: 8px;
  }
  
  .modal-small,
  .modal-medium,
  .modal-large,
  .modal-extra-large {
    max-width: none;
    width: 100%;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 16px;
  }
  
  .modal-header h3 {
    font-size: 1.2rem;
  }
}

/* Custom scrollbar with theme awareness */
.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.modal-content.theme-dark .modal-body::-webkit-scrollbar-track {
  background: #4b5563;
}

.modal-content.theme-dark .modal-body::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.modal-content.theme-dark .modal-body::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Enhanced focus states */
.modal-content :deep(input:focus),
.modal-content :deep(textarea:focus),
.modal-content :deep(select:focus) {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Form element theming for your custom system */
.modal-content :deep(.form-group label),
.modal-content :deep(label) {
  color: #374151 !important;
  font-weight: 500 !important;
  font-size: 0.875rem !important;
}

.modal-content.theme-dark :deep(.form-group label),
.modal-content.theme-dark :deep(label) {
  color: #d1d5db !important;
}

/* Enhanced button theming for Nuxt UI compatibility */
.modal-content :deep(.btn),
.modal-content :deep(button) {
  transition: all 0.2s ease-in-out;
}

/* Modal içerik net görünüm için */
.modal-content :deep(*) {
  color: inherit;
}

.modal-content :deep(input),
.modal-content :deep(textarea),
.modal-content :deep(select) {
  background: white !important;
  border: 1px solid #d1d5db !important;
  color: #111827 !important;
}

.modal-content.theme-dark :deep(input),
.modal-content.theme-dark :deep(textarea),
.modal-content.theme-dark :deep(select) {
  background: #374151 !important;
  border-color: #4b5563 !important;
  color: #f9fafb !important;
}

/* Global modal open class for body */
:global(body.modal-open) {
  overflow: hidden !important;
  padding-right: 15px !important;
}

/* Theme-aware selection */
.modal-content.theme-dark ::selection {
  background: #3b82f6;
  color: white;
}

.modal-content.theme-light ::selection {
  background: #dbeafe;
  color: #1e40af;
}
</style>