// Status colors - DOĞADAN İLHAM 🌿
const getStatusColor = (status) => {
  const colors = {
    planning: 'sky',        // Gökyüzü mavisi ☁️
    reserving: 'amber',     // Bal rengi 🍯
    offering: 'violet',     // Menekşe 💜
    designing: 'indigo',    // İndigo çiçeği 🌸
    manufacturing: 'orange', // Turuncu çiçek 🌻
    collecting: 'emerald',  // Zümr<!-- apps/web/components/ProjectCard.vue -->
<template>
  <UCard class="hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4 overflow-hidden relative"
         :class="getCardBorderColor(project.status)">
    <!-- Status Gradient Background -->
    <div class="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8"
         :class="getStatusGradient(project.status)">
    </div>
    
    <div class="space-y-4 relative z-10">
      <!-- Header with Icon -->
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-3 flex-1 min-w-0">
          <!-- Project Icon -->
          <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                 :class="getStatusGradient(project.status)">
              {{ getProjectIcon(project.name) }}
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
              {{ project.name }}
            </h3>
            <div class="flex items-center space-x-2 mt-1">
              <span class="text-sm text-gray-500 font-mono">{{ project.projectCode }}</span>
              <UBadge 
                :color="getPriorityColor(project.priority)"
                size="xs"
                class="uppercase font-bold"
              >
                {{ project.priority }}
              </UBadge>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col items-end space-y-2 ml-4">
          <UBadge 
            :color="getStatusColor(project.status)"
            size="sm"
            class="uppercase font-semibold shadow-sm"
          >
            {{ project.status }}
          </UBadge>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Progress Section -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700">Project Progress</span>
          <span class="text-lg font-bold" :class="getProgressColor(project.completionPercentage)">
            {{ project.completionPercentage }}%
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div 
            class="h-3 rounded-full transition-all duration-500 shadow-sm"
            :class="getProgressBarColor(project.completionPercentage)"
            :style="{ width: `${project.completionPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Client & Manager with Icons -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-blue-50 rounded-lg p-3">
          <div class="flex items-center space-x-2 mb-1">
            <Icon name="i-heroicons-building-office" class="h-4 w-4 text-blue-600" />
            <span class="text-xs text-blue-600 font-medium uppercase tracking-wide">Client</span>
          </div>
          <span class="font-semibold text-blue-900 text-sm">{{ project.clientName }}</span>
        </div>
        <div class="bg-green-50 rounded-lg p-3">
          <div class="flex items-center space-x-2 mb-1">
            <Icon name="i-heroicons-user-circle" class="h-4 w-4 text-green-600" />
            <span class="text-xs text-green-600 font-medium uppercase tracking-wide">Manager</span>
          </div>
          <span class="font-semibold text-green-900 text-sm">{{ project.manager.name }}</span>
        </div>
      </div>

      <!-- Cost & Timeline -->
      <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="flex items-center space-x-2 mb-2">
              <Icon name="i-heroicons-currency-dollar" class="h-4 w-4 text-indigo-600" />
              <span class="text-xs text-indigo-600 font-medium uppercase tracking-wide">Budget</span>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold text-indigo-900">${{ formatCurrency(project.estimatedCost) }}</div>
              <div class="text-xs text-indigo-600">
                Spent: ${{ formatCurrency(project.actualCost) }}
              </div>
            </div>
          </div>
          
          <div>
            <div class="flex items-center space-x-2 mb-2">
              <Icon name="i-heroicons-calendar" class="h-4 w-4 text-purple-600" />
              <span class="text-xs text-purple-600 font-medium uppercase tracking-wide">Deadline</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold" :class="getDeadlineColor()">
                {{ formatDate(project.deadline) }}
              </div>
              <div class="text-xs text-purple-600">
                {{ getDaysText() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Materials & Actions -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2 text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
            <Icon name="i-heroicons-cube" class="h-4 w-4" />
            <span class="font-medium">{{ project.materialCount }} materials</span>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <UButton
            size="xs"
            variant="soft"
            color="blue"
            icon="i-heroicons-eye"
            @click.stop="$emit('view', project.id)"
          />
          <UButton
            size="xs"
            variant="soft"
            color="green"
            icon="i-heroicons-pencil"
            @click.stop="$emit('edit', project.id)"
          />
          <UButton
            size="xs"
            variant="soft"
            color="red"
            icon="i-heroicons-trash"
            @click.stop="$emit('delete', project)"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['view', 'edit', 'delete'])

// Status colors - DOĞADAN İLHAM 🌿
const getStatusColor = (status) => {
  const colors = {
    planning: 'sky',        // Gökyüzü mavisi ☁️
    reserving: 'amber',     // Bal rengi 🍯
    offering: 'violet',     // Menekşe 💜
    designing: 'indigo',    // İndigo çiçeği 🌸
    manufacturing: 'orange', // Turuncu çiçek 🌻
    collecting: 'emerald',  // Zümrüt yeşili 💎
    completed: 'green'      // Ağaç yeşili 🌳
  }
  return colors[status] || 'stone'
}

// Card border colors
const getCardBorderColor = (status) => {
  const colors = {
    planning: 'border-l-sky-500',
    reserving: 'border-l-amber-500',
    offering: 'border-l-violet-500',
    designing: 'border-l-indigo-500',
    manufacturing: 'border-l-orange-500',
    collecting: 'border-l-emerald-500',
    completed: 'border-l-green-500'
  }
  return colors[status] || 'border-l-stone-500'
}

// Status gradient backgrounds
const getStatusGradient = (status) => {
  const gradients = {
    planning: 'bg-gradient-to-br from-sky-500 to-sky-600',
    reserving: 'bg-gradient-to-br from-amber-500 to-amber-600',
    offering: 'bg-gradient-to-br from-violet-500 to-violet-600',
    designing: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    manufacturing: 'bg-gradient-to-br from-orange-500 to-orange-600',
    collecting: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    completed: 'bg-gradient-to-br from-green-500 to-green-600'
  }
  return gradients[status] || 'bg-gradient-to-br from-stone-500 to-stone-600'
}

// Project icon based on name
const getProjectIcon = (name) => {
  if (name.includes('Conveyor')) return '🏭'
  if (name.includes('Machine')) return '⚙️'
  if (name.includes('Steel') || name.includes('Frame')) return '🏗️'
  if (name.includes('Hydraulic')) return '🔧'
  return '📋'
}

// Priority colors - Doğal çiçek renkleri
const getPriorityColor = (priority) => {
  const colors = {
    LOW: 'emerald',     // Yeşil yaprak 🍃
    MEDIUM: 'amber',    // Sarı çiçek 🌼
    HIGH: 'orange',     // Turuncu çiçek 🌻
    URGENT: 'rose'      // Pembe çiçek 🌹
  }
  return colors[priority] || 'stone'
}

// Progress colors - Doğal tonlar
const getProgressColor = (percentage) => {
  if (percentage >= 90) return 'text-emerald-600'  // Yeşil yaprak
  if (percentage >= 70) return 'text-sky-600'      // Gökyüzü
  if (percentage >= 50) return 'text-amber-600'    // Bal rengi
  if (percentage >= 30) return 'text-orange-600'   // Turuncu çiçek
  return 'text-rose-600'                           // Pembe çiçek
}

// Progress bar colors - Doğal geçişler
const getProgressBarColor = (percentage) => {
  if (percentage >= 90) return 'bg-gradient-to-r from-emerald-400 to-emerald-600'  // Yeşil yaprak
  if (percentage >= 70) return 'bg-gradient-to-r from-sky-400 to-sky-600'          // Gökyüzü
  if (percentage >= 50) return 'bg-gradient-to-r from-amber-400 to-amber-600'      // Bal rengi
  if (percentage >= 30) return 'bg-gradient-to-r from-orange-400 to-orange-600'    // Turuncu çiçek
  return 'bg-gradient-to-r from-rose-400 to-rose-600'                              // Pembe çiçek
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Deadline color based on urgency - Doğal uyarı renkleri
const getDeadlineColor = () => {
  const deadline = new Date(props.project.deadline)
  const today = new Date()
  const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 0) return 'text-rose-600 font-bold'        // Pembe çiçek - gecikmiş
  if (daysUntil <= 7) return 'text-orange-600 font-bold'     // Turuncu çiçek - yakında
  if (daysUntil <= 30) return 'text-amber-600 font-semibold' // Sarı çiçek - bu ay
  return 'text-slate-700 font-semibold'                      // Normal
}

// Days text
const getDaysText = () => {
  const deadline = new Date(props.project.deadline)
  const today = new Date()
  const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`
  if (daysUntil === 0) return 'Due today! 🔥'
  if (daysUntil === 1) return 'Due tomorrow ⚡'
  if (daysUntil <= 7) return `${daysUntil} days left 🚨`
  return `${daysUntil} days remaining 📅`
}
</script>