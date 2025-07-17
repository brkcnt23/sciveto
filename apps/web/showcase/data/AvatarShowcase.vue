<!-- showcase/data/AvatarShowcase.vue -->
<template>
  <div class="space-y-8">
    <!-- Header with Modern Badge -->
    <div class="flex items-center justify-between">
      <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">
        👤 Avatar Showcase
      </h4>
      <UBadge color="secondary" variant="soft" size="sm" class="gap-1.5">
        <div class="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
        Updated Component
      </UBadge>
    </div>

    <!-- Avatar Sizes using our Avatar component -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-users" class="w-5 h-5 text-primary" />
        <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">Avatar Sizes</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Extra Small -->
        <div class="text-center space-y-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <UBadge color="neutral" variant="outline" size="xs">XS</UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'John Doe', 
                avatar: 'https://avatars.githubusercontent.com/u/739984?v=4' 
              }" 
              size="xs"
            />
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400">16x16px</p>
        </div>

        <!-- Small -->
        <div class="text-center space-y-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <UBadge color="neutral" variant="outline" size="xs">SM</UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'John Doe', 
                avatar: 'https://avatars.githubusercontent.com/u/739984?v=4' 
              }" 
              size="sm"
            />
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400">24x24px</p>
        </div>

        <!-- Medium -->
        <div class="text-center space-y-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <UBadge color="neutral" variant="outline" size="xs">MD</UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'John Doe', 
                avatar: 'https://avatars.githubusercontent.com/u/739984?v=4' 
              }" 
              size="md"
            />
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400">32x32px</p>
        </div>

        <!-- Large -->
        <div class="text-center space-y-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <UBadge color="neutral" variant="outline" size="xs">LG</UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'John Doe', 
                avatar: 'https://avatars.githubusercontent.com/u/739984?v=4' 
              }" 
              size="lg"
            />
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400">48x48px</p>
        </div>
      </div>
    </div>

    <!-- Avatar with Status Indicators -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-activity" class="w-5 h-5 text-success" />
        <h4 class="font-semibold text-highlighted text-lg">Status Indicators</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Online Status -->
        <div class="text-center space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
          <UBadge color="success" variant="solid" size="xs" class="gap-1">
            <div class="w-2 h-2 bg-white rounded-full"></div>
            Online
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Sarah Wilson', 
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150',
                status: 'online',
                isOnline: true
              }" 
              size="lg"
              :show-online-status="true"
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-highlighted">Sarah Wilson</p>
            <p class="text-xs text-success">Available</p>
          </div>
        </div>

        <!-- Away Status -->
        <div class="text-center space-y-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <UBadge color="warning" variant="solid" size="xs" class="gap-1">
            <UIcon name="i-lucide-clock" class="w-3 h-3" />
            Away
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Mike Johnson', 
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                status: 'away',
                isOnline: true
              }" 
              size="lg"
              :show-online-status="true"
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-highlighted">Mike Johnson</p>
            <p class="text-xs text-warning">Away - Back in 15 min</p>
          </div>
        </div>

        <!-- Busy Status -->
        <div class="text-center space-y-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
          <UBadge color="error" variant="solid" size="xs" class="gap-1">
            <UIcon name="i-lucide-minus-circle" class="w-3 h-3" />
            Busy
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Alex Chen', 
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                status: 'busy',
                isOnline: true
              }" 
              size="lg"
              :show-online-status="true"
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-highlighted">Alex Chen</p>
            <p class="text-xs text-error">In a meeting</p>
          </div>
        </div>

        <!-- Offline Status -->
        <div class="text-center space-y-3 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <UBadge color="neutral" variant="solid" size="xs" class="gap-1">
            <UIcon name="i-lucide-wifi-off" class="w-3 h-3" />
            Offline
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Emma Davis', 
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                status: 'offline',
                isOnline: false
              }" 
              size="lg"
              :show-online-status="true"
              avatar-class="opacity-75 neutralscale"
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-highlighted">Emma Davis</p>
            <p class="text-xs text-muted">Last seen 2h ago</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Fallbacks & Initials -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-slate-200 pb-2">
        <UIcon name="i-lucide-user-circle" class="w-5 h-5 text-secondary" />
        <h4 class="font-semibold text-slate-700 text-lg">Fallbacks & Initials</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Initials with Colors -->
        <div class="space-y-4 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h5 class="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <UIcon name="i-lucide-type" class="w-4 h-4" />
            Initial Avatars
          </h5>
          <div class="flex justify-center gap-3">
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'John Doe' }" 
                size="lg"
                bg-color="primary"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Primary</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Sarah Wilson' }" 
                size="lg"
                bg-color="success"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Success</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Mike Johnson' }" 
                size="lg"
                bg-color="warning"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Warning</UBadge>
            </div>
          </div>
        </div>

        <!-- Gradient Avatars -->
        <div class="space-y-4 p-4 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <h5 class="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <UIcon name="i-lucide-palette" class="w-4 h-4" />
            Gradient Avatars
          </h5>
          <div class="flex justify-center gap-3">
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Alice Cooper' }" 
                size="lg"
                bg-color="gradient-blue"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Blue</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Bob Dylan' }" 
                size="lg"
                bg-color="gradient-green"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Green</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Carol Evans' }" 
                size="lg"
                bg-color="gradient-pink"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Pink</UBadge>
            </div>
          </div>
        </div>

        <!-- Role Badges -->
        <div class="space-y-4 p-4 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <h5 class="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <UIcon name="i-lucide-crown" class="w-4 h-4" />
            Role Badges
          </h5>
          <div class="flex justify-center gap-3">
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ 
                  name: 'Admin User', 
                  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150',
                  role: 'admin'
                }" 
                size="lg"
                :show-role="true"
              />
              <UBadge size="xs" variant="outline">Admin</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ 
                  name: 'Premium User', 
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                  role: 'premium'
                }" 
                size="lg"
                :show-role="true"
              />
              <UBadge size="xs" variant="outline">Premium</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ 
                  name: 'VIP User', 
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                  role: 'vip'
                }" 
                size="lg"
                :show-role="true"
              />
              <UBadge size="xs" variant="outline">VIP</UBadge>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Groups -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-slate-200 pb-2">
        <UIcon name="i-lucide-users-2" class="w-5 h-5 text-warning" />
        <h4 class="font-semibold text-slate-700 text-lg">Avatar Groups</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Team Members -->
        <div class="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div class="flex items-center justify-between">
            <h5 class="text-sm font-medium text-slate-600">Frontend Team</h5>
            <UBadge color="primary" variant="soft" size="xs">5 members</UBadge>
          </div>
          <div class="flex -space-x-2">
            <Avatar 
              :user="{ 
                name: 'Sarah Wilson', 
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150' 
              }" 
              size="md"
              avatar-class="border-2 border-white shadow-sm"
            />
            <Avatar 
              :user="{ 
                name: 'Mike Johnson', 
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' 
              }" 
              size="md"
              avatar-class="border-2 border-white shadow-sm"
            />
            <Avatar 
              :user="{ 
                name: 'Alex Chen', 
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' 
              }" 
              size="md"
              avatar-class="border-2 border-white shadow-sm"
            />
            <Avatar 
              :user="{ name: 'Emma Davis' }" 
              size="md"
              bg-color="success"
              :show-image="false"
              avatar-class="border-2 border-white shadow-sm"
            />
            <Avatar 
              :user="{ name: '+1' }" 
              size="md"
              bg-color="neutral"
              :show-image="false"
              avatar-class="border-2 border-white shadow-sm"
            />
          </div>
          <p class="text-xs text-slate-600">Working on dashboard redesign</p>
        </div>

        <!-- Project Collaborators -->
        <div class="space-y-4 p-4 bg-green-50 rounded-lg border border-green-100">
          <div class="flex items-center justify-between">
            <h5 class="text-sm font-medium text-slate-600">Project Alpha</h5>
            <UBadge color="success" variant="soft" size="xs">8 collaborators</UBadge>
          </div>
          <div class="flex -space-x-2">
            <Avatar 
              :user="{ 
                name: 'User 1', 
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' 
              }" 
              size="sm"
              avatar-class="border-2 border-white"
            />
            <Avatar 
              :user="{ name: 'John Doe' }" 
              size="sm"
              bg-color="primary"
              :show-image="false"
              avatar-class="border-2 border-white"
            />
            <Avatar 
              :user="{ name: 'Anna Brown' }" 
              size="sm"
              bg-color="secondary"
              :show-image="false"
              avatar-class="border-2 border-white"
            />
            <Avatar 
              :user="{ name: 'Chris Davis' }" 
              size="sm"
              bg-color="warning"
              :show-image="false"
              avatar-class="border-2 border-white"
            />
            <Avatar 
              :user="{ name: '+4' }" 
              size="sm"
              bg-color="neutral"
              :show-image="false"
              avatar-class="border-2 border-white text-xs"
            />
          </div>
          <p class="text-xs text-slate-600">Mobile app development team</p>
        </div>
      </div>
    </div>

    <!-- Avatar with Notifications -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-slate-200 pb-2">
        <UIcon name="i-lucide-bell" class="w-5 h-5 text-error" />
        <h4 class="font-semibold text-slate-700 text-lg">Notifications & Badges</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Message Notification -->
        <div class="text-center space-y-3 p-4 bg-blue-50 rounded-lg">
          <UBadge color="primary" variant="soft" size="xs" class="gap-1">
            <UIcon name="i-lucide-message-circle" class="w-3 h-3" />
            Messages
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Sarah Wilson', 
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150' 
              }" 
              size="lg"
              :notification-count="3"
            />
          </div>
          <p class="text-xs text-slate-600">3 unread messages</p>
        </div>

        <!-- Task Notification -->
        <div class="text-center space-y-3 p-4 bg-yellow-50 rounded-lg">
          <UBadge color="warning" variant="soft" size="xs" class="gap-1">
            <UIcon name="i-lucide-calendar" class="w-3 h-3" />
            Tasks
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Mike Johnson', 
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' 
              }" 
              size="lg"
              :notification-count="7"
            />
          </div>
          <p class="text-xs text-slate-600">7 pending tasks</p>
        </div>

        <!-- High Notification Count -->
        <div class="text-center space-y-3 p-4 bg-red-50 rounded-lg">
          <UBadge color="error" variant="soft" size="xs" class="gap-1">
            <UIcon name="i-lucide-mail" class="w-3 h-3" />
            Emails
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Alex Chen', 
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' 
              }" 
              size="lg"
              :notification-count="150"
            />
          </div>
          <p class="text-xs text-slate-600">99+ unread emails</p>
        </div>

        <!-- Custom Badge Slot -->
        <div class="text-center space-y-3 p-4 bg-purple-50 rounded-lg">
          <UBadge color="secondary" variant="soft" size="xs" class="gap-1">
            <UIcon name="i-lucide-trophy" class="w-3 h-3" />
            Achievement
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Emma Davis', 
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' 
              }" 
              size="lg"
              badge-position="top-right"
            >
              <template #badge>
                <div class="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                  <UIcon name="i-lucide-crown" class="w-3 h-3 text-white" />
                </div>
              </template>
            </Avatar>
          </div>
          <p class="text-xs text-slate-600">Top performer</p>
        </div>
      </div>
    </div>

    <!-- Interactive Demo Section -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-slate-200 pb-2">
        <UIcon name="i-lucide-play" class="w-5 h-5 text-info" />
        <h4 class="font-semibold text-slate-700 text-lg">Interactive Demo</h4>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Status Simulator -->
        <div class="space-y-4 p-4 showcase-card">
          <h5 class="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <UIcon name="i-lucide-settings" class="w-4 h-4" />
            Status Simulator
          </h5>
          <div class="flex justify-center">
            <Avatar 
              :user="demoAvatar" 
              size="xl"
              :show-online-status="true"
            />
          </div>
          <div class="text-center">
            <p class="font-medium text-slate-700">{{ demoAvatar.name }}</p>
            <UBadge 
              :color="getStatusBadgeColor(demoAvatar.status)" 
              variant="soft" 
              size="xs"
              :class="{ 'animate-pulse': demoAvatar.status === 'busy' }"
            >
              {{ demoAvatar.status }}
            </UBadge>
          </div>
          <div class="flex flex-wrap gap-2 justify-center">
            <UButton size="xs" @click="setDemoStatus('online')">
              Online
            </UButton>
            <UButton size="xs" @click="setDemoStatus('away')">
              Away
            </UButton>
            <UButton size="xs" @click="setDemoStatus('busy')">
              Busy
            </UButton>
            <UButton size="xs" @click="setDemoStatus('offline')">
              Offline
            </UButton>
          </div>
        </div>

        <!-- Avatar Generator -->
        <div class="space-y-4 p-4 bg-slate-50 rounded-lg">
          <h5 class="text-sm font-medium text-slate-600 flex items-center gap-2">
            <UIcon name="i-lucide-shuffle" class="w-4 h-4" />
            Random Avatar Generator
          </h5>
          <div class="flex justify-center">
            <Avatar 
              :user="randomAvatar" 
              size="xl"
              :bg-color="randomAvatar.bgColor"
              :show-image="false"
            />
          </div>
          <div class="text-center">
            <p class="font-medium text-slate-700">{{ randomAvatar.name }}</p>
            <p class="text-xs text-slate-500">{{ randomAvatar.role }}</p>
          </div>
          <div class="flex justify-center">
            <UButton size="sm" @click="generateRandomAvatar">
              <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-1" />
              Generate New
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
      <UButton size="sm" @click="cycleStatus">
        <UIcon name="i-lucide-repeat" class="w-4 h-4 mr-1" />
        Cycle Status
      </UButton>
      
      <UButton size="sm" variant="outline" @click="generateRandomAvatar">
        <UIcon name="i-lucide-user-plus" class="w-4 h-4 mr-1" />
        Random User
      </UButton>
      
      <UButton size="sm" variant="outline" @click="resetDemo">
        <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4 mr-1" />
        Reset Demo
      </UButton>
    </div>
  </div>
</template>

<script setup>
// Import our updated component
import Avatar from '~/components/base/Avatar.vue'

// Component name for debugging
defineOptions({
  name: 'AvatarShowcase'
})

// Demo avatar state
const demoAvatar = ref({
  name: 'Sarah Wilson',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150',
  status: 'online',
  isOnline: true
})

// Random avatar state
const randomAvatar = ref({
  name: 'John Doe',
  role: 'Frontend Developer',
  bgColor: 'primary'
})

// Sample names and roles for random generation
const sampleNames = [
  'Alice Johnson', 'Bob Smith', 'Carol Wilson', 'David Brown', 'Emma Davis',
  'Frank Miller', 'Grace Taylor', 'Henry Moore', 'Ivy Chen', 'Jack Wilson'
]

const sampleRoles = [
  'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Product Manager',
  'DevOps Engineer', 'Data Scientist', 'QA Engineer', 'Marketing Specialist'
]

const backgroundColors = [
  'primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral',
  'gradient-blue', 'gradient-green', 'gradient-purple', 'gradient-pink'
]

// Status cycling
const statuses = ['online', 'away', 'busy', 'offline']
let currentStatusIndex = 0

// Methods
const setDemoStatus = (status) => {
  demoAvatar.value.status = status
  demoAvatar.value.isOnline = status !== 'offline'
}

const getStatusBadgeColor = (status) => {
  const colors = {
    online: 'success',
    away: 'warning',
    busy: 'error',
    offline: 'neutral'
  }
  return colors[status] || 'neutral'
}

const cycleStatus = () => {
  currentStatusIndex = (currentStatusIndex + 1) % statuses.length
  setDemoStatus(statuses[currentStatusIndex])
}

const generateRandomAvatar = () => {
  const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)]
  const randomRole = sampleRoles[Math.floor(Math.random() * sampleRoles.length)]
  const randomBg = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
  
  randomAvatar.value = {
    name: randomName,
    role: randomRole,
    bgColor: randomBg
  }
}

const resetDemo = () => {
  demoAvatar.value = {
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150',
    status: 'online',
    isOnline: true
  }
  
  randomAvatar.value = {
    name: 'John Doe',
    role: 'Frontend Developer',
    bgColor: 'primary'
  }
  
  currentStatusIndex = 0
}

// Auto-cycle demo every 4 seconds
onMounted(() => {
  const interval = setInterval(() => {
    cycleStatus()
  }, 4000)

  // Initialize with random avatar on mount
  generateRandomAvatar()

  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>