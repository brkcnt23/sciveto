<!-- apps/web/components/ui/ToastContainer.vue -->
<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup
      name="toast"
      tag="div"
      class="space-y-2"
    >
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :id="toast.id"
        :type="toast.type"
        :title="toast.title"
        :message="toast.message"
        :auto-close="toast.autoClose"
        :duration="toast.duration"
        :action="toast.action"
        @close="handleClose"
        @action="handleAction"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToast } from '~/composables/useToast'

const { toasts, remove } = useToast()

const handleClose = (id) => {
  remove(id)
}

const handleAction = (action) => {
  console.log('Toast action triggered:', action)
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>