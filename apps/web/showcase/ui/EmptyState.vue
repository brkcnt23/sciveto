@ -0,0 +1,101 @@
<!-- apps/web/components/ui/EmptyState.vue -->
<template>
    <div class="text-center py-8 px-6">
        <!-- Icon/Illustration Container -->
        <div class="mx-auto mb-6">
            <!-- Custom Icon Slot -->
            <div v-if="$slots.icon">
                <slot name="icon"></slot>
            </div>

            <!-- Default Icon -->
            <div v-else class="w-16 h-16 mx-auto rounded-full flex items-center justify-center" :class="iconBgClass">
                <Icon :name="icon" class="w-8 h-8" :class="iconColorClass" />
            </div>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold text-slate-900 mb-2">
            {{ title }}
        </h3>

        <!-- Description -->
        <p class="text-slate-600 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
            {{ description }}
        </p>

        <!-- Primary Action -->
        <div v-if="$slots.action || actionText" class="space-y-3">
            <slot name="action">
                <UButton v-if="actionText" :to="actionLink" :icon="actionIcon" @click="$emit('action')"
                    :color="actionColor" :variant="actionVariant" class="shadow-sm">
                    {{ actionText }}
                </UButton>
            </slot>
        </div>

        <!-- Secondary Actions -->
        <div v-if="$slots.secondary" class="mt-4 space-y-2">
            <slot name="secondary"></slot>
        </div>

        <!-- Help Text -->
        <div v-if="helpText" class="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p class="text-xs text-slate-600">
                {{ helpText }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    icon: {
        type: String,
        default: 'i-heroicons-inbox'
    },
    title: {
        type: String,
        default: 'No data available'
    },
    description: {
        type: String,
        default: 'There are no items to display at the moment.'
    },
    actionText: String,
    actionLink: String,
    actionIcon: String,
    actionColor: {
        type: String,
        default: 'sky'
    },
    actionVariant: {
        type: String,
        default: 'solid'
    },
    helpText: String
})

defineEmits(['action'])

const iconBgClass = computed(() => {
    const iconColorMap = {
        'i-heroicons-inbox': 'bg-slate-100',
        'i-heroicons-briefcase': 'bg-sky-100',
        'i-heroicons-cube': 'bg-emerald-100',
        'i-heroicons-users': 'bg-violet-100',
        'i-heroicons-document': 'bg-orange-100',
        'i-heroicons-folder': 'bg-amber-100',
        'i-heroicons-photo': 'bg-rose-100',
        'i-heroicons-chart-bar': 'bg-indigo-100',
        'i-heroicons-cog': 'bg-gray-100',
        'i-heroicons-bell': 'bg-yellow-100'
    }
    return iconColorMap[props.icon] || 'bg-slate-100'
})

const iconColorClass = computed(() => {
    // Map specific icons to text colors
    const iconColorMap = {
        'i-heroicons-inbox': 'text-slate-500',
        'i-heroicons-briefcase': 'text-sky-500',
        'i-heroicons-cube': 'text-emerald-500',
        'i-heroicons-users': 'text-violet-500',
        'i-heroicons-document': 'text-orange-500',
        'i-heroicons-folder': 'text-amber-500',
        'i-heroicons-photo': 'text-rose-500',
        'i-heroicons-chart-bar': 'text-indigo-500',
        'i-heroicons-cog': 'text-gray-500',
        'i-heroicons-bell': 'text-yellow-500'
    }
    return iconColorMap[props.icon] || 'text-slate-500'
})
</script>