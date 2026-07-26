<!-- apps/web/components/BaseCard.vue -->
<template>
  <UCard class="hover:shadow-2xl hover:bg-violet-50/30 transition-all duration-300 cursor-pointer group border-l-4 overflow-hidden relative hover:scale-[1.02]"
         :class="borderColor">
    <!-- Background Pattern -->
    <div class="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8"
         :class="backgroundGradient">
    </div>
    
    <div class="space-y-4 relative z-10">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-3 flex-1 min-w-0">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                 :class="backgroundGradient">
              <slot name="icon">{{ icon }}</slot>
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <!-- Title -->
            <h3 class="font-bold text-slate-900 text-lg group-hover:text-violet-700 transition-colors line-clamp-2">
              {{ title }}
            </h3>
            
            <!-- Subtitle with badges -->
            <div class="flex items-center space-x-2 mt-1">
              <span class="text-sm text-slate-500 font-mono">{{ subtitle }}</span>
              
              <!-- Priority/Status Badge -->
              <div v-if="badge" class="px-2 py-1 rounded-full text-xs font-bold uppercase border-2"
                   :class="badge.class">
                {{ badge.text }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Top Right Badge -->
        <div v-if="topBadge" class="ml-4">
          <UBadge 
            :color="topBadge.color"
            size="sm"
            class="uppercase font-semibold shadow-sm"
          >
            {{ topBadge.text }}
          </UBadge>
        </div>
      </div>

      <!-- Description -->
      <p v-if="description" class="text-sm text-slate-600 line-clamp-2 leading-relaxed">
        {{ description }}
      </p>

      <!-- Progress Section -->
      <div v-if="progress" class="bg-gradient-to-r from-slate-50 to-stone-100 rounded-lg p-4 space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-slate-700">{{ progress.label }}</span>
          <span class="text-lg font-bold" :class="progress.textColor">
            {{ progress.value }}%
          </span>
        </div>
        <div class="w-full bg-stone-200 rounded-full h-3 shadow-inner">
          <div 
            class="h-3 rounded-full transition-all duration-500 shadow-sm"
            :class="progress.barColor"
            :style="{ width: `${progress.value}%` }"
          ></div>
        </div>
      </div>

      <!-- Custom Content Slot -->
      <slot name="content"></slot>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-2 border-t border-stone-200">
        <!-- Footer Left -->
        <div class="flex items-center space-x-3">
          <slot name="footer-left">
            <div v-if="footerInfo" class="flex items-center space-x-2 text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
              <Icon :name="footerInfo.icon" class="h-4 w-4" />
              <span class="font-medium">{{ footerInfo.text }}</span>
            </div>
          </slot>
        </div>
        
        <!-- Actions -->
        <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <slot name="actions">
            <UButton
              v-for="action in actions"
              :key="action.name"
              size="xs"
              variant="soft"
              :color="action.color"
              :icon="action.icon"
              @click.stop="$emit(action.event, item)"
            />
          </slot>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  // Core data
  item: Object,
  title: String,
  subtitle: String,
  description: String,
  icon: String,
  
  // Styling
  borderColor: String,
  backgroundGradient: String,
  
  // Badges
  badge: Object,      // { text, class }
  topBadge: Object,   // { text, color }
  
  // Progress
  progress: Object,   // { label, value, textColor, barColor }
  
  // Footer
  footerInfo: Object, // { icon, text }
  actions: Array,     // [{ name, color, icon, event }]
})

defineEmits(['view', 'edit', 'delete'])
</script>