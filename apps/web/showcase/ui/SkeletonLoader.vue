@ -1,110 +1,122 @@
<!-- apps/web/components/ui/SkeletonLoader.vue -->
<template>
    <div class="space-y-4" :class="containerClass">
        <!-- Card Skeleton -->
        <div v-if="type === 'card'" class="bg-white rounded-lg border p-6 shadow-sm">
            <div class="space-y-4">
                <!-- Header -->
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div class="flex-1 space-y-2">
                        <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                </div>

                <!-- Content -->
                <div class="space-y-2">
                    <div class="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div class="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div class="h-3 bg-gray-200 rounded animate-pulse w-4/6"></div>
                </div>

                <!-- Progress bar -->
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <div class="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                        <div class="h-3 bg-gray-200 rounded animate-pulse w-8"></div>
                    </div>
                    <div class="h-3 bg-gray-200 rounded-full animate-pulse w-full"></div>
                </div>

                <!-- Footer buttons -->
                <div class="flex space-x-2 pt-4">
                    <div class="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                    <div class="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
            </div>
        </div>

        <!-- Table Row Skeleton -->
        <div v-else-if="type === 'table-row'" class="bg-white border-b">
            <div class="px-6 py-4 flex items-center space-x-4">
                <div class="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                    <div class="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
                </div>
                <div class="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-32 space-y-2">
                    <div class="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div class="h-2 bg-gray-200 rounded-full animate-pulse w-full"></div>
                </div>
                <div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="flex space-x-2">
                    <div class="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>

        <!-- List Item Skeleton -->
        <div v-else-if="type === 'list'" class="bg-white rounded-lg border p-4 shadow-sm">
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div class="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
                <div class="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>

        <!-- Text Lines Skeleton -->
        <div v-else-if="type === 'text'" class="space-y-3">
            <div v-for="line in lines" :key="line" class="h-4 bg-gray-200 rounded animate-pulse"
                :class="getLineWidth(line)"></div>
        </div>
        <!-- Custom/Default Skeleton -->
        <div v-else class="space-y-3">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'text',
        validator: (value) => ['card', 'table-row', 'list', 'text', 'custom'].includes(value)
    },
    lines: {
        type: Number,
        default: 3
    },
    height: {
        type: String,
        default: 'auto'
    },
    rounded: {
        type: Boolean,
        default: true
    }
})

const containerClass = computed(() => {
    return {
        'animate-pulse': true,
        [`h-${props.height}`]: props.height !== 'auto'
    }
})

const getLineWidth = (lineIndex) => {
    const widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/6', 'w-2/6']
    return widths[lineIndex % widths.length] || 'w-full'
}
</script>