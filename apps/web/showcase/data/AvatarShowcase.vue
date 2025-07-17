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

    <!-- Avatar Sizes using our enhanced Avatar component -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-users" class="w-5 h-5 text-primary" />
        <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">Avatar Sizes</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Extra Small -->
        <div class="text-center space-y-3 p-4 bg-white dark:bg-neutral-800/70 rounded-lg border border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
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
          <p class="text-xs text-neutral-600 dark:text-neutral-400">16x16px</p>
        </div>

        <!-- Small -->
        <div class="text-center space-y-3 p-4 bg-white dark:bg-neutral-800/70 rounded-lg border border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
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
          <p class="text-xs text-neutral-600 dark:text-neutral-400">24x24px</p>
        </div>

        <!-- Medium -->
        <div class="text-center space-y-3 p-4 bg-white dark:bg-neutral-800/70 rounded-lg border border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
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
          <p class="text-xs text-neutral-600 dark:text-neutral-400">32x32px</p>
        </div>

        <!-- Large -->
        <div class="text-center space-y-3 p-4 bg-white dark:bg-neutral-800/70 rounded-lg border border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
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
          <p class="text-xs text-neutral-600 dark:text-neutral-400">48x48px</p>
        </div>
      </div>
    </div>

    <!-- Status Indicators with Enhanced Dark Theme -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-activity" class="w-5 h-5 text-success" />
        <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">Status Indicators</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Online Status -->
        <div class="text-center space-y-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800/50 backdrop-blur-sm">
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
              :pulse-online="true"
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-neutral-900 dark:text-white">Sarah Wilson</p>
            <p class="text-xs text-success-600 dark:text-success-400">Available</p>
          </div>
        </div>

        <!-- Away Status -->
        <div class="text-center space-y-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800/50 backdrop-blur-sm">
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
            <p class="font-medium text-neutral-900 dark:text-white">Mike Johnson</p>
            <p class="text-xs text-warning-600 dark:text-warning-400">Back in 15 min</p>
          </div>
        </div>

        <!-- Busy Status -->
        <div class="text-center space-y-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/50 backdrop-blur-sm">
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
            <p class="font-medium text-neutral-900 dark:text-white">Alex Chen</p>
            <p class="text-xs text-error-600 dark:text-error-400">In a meeting</p>
          </div>
        </div>

        <!-- Offline Status -->
        <div class="text-center space-y-3 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
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
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-neutral-900 dark:text-white">Emma Davis</p>
            <p class="text-xs text-neutral-600 dark:text-neutral-400">Last seen 2h ago</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Fallbacks & Custom Backgrounds -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-user-circle" class="w-5 h-5 text-secondary" />
        <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">Fallbacks & Custom Styles</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Initials Fallbacks -->
        <div class="space-y-4 p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
          <h5 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
            <UIcon name="i-lucide-type" class="w-4 h-4" />
            Initials Fallback
          </h5>
          <div class="flex justify-center gap-4">
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'John Doe' }" 
                size="lg"
                bg-color="primary"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline" color="primary">Primary</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Jane Smith' }" 
                size="lg"
                bg-color="secondary"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline" color="secondary">Secondary</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Alex Johnson' }" 
                size="lg"
                bg-color="success"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline" color="success">Success</UBadge>
            </div>
          </div>
        </div>

        <!-- Gradient Backgrounds -->
        <div class="space-y-4 p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
          <h5 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
            <UIcon name="i-lucide-palette" class="w-4 h-4" />
            Gradient Backgrounds
          </h5>
          <div class="flex justify-center gap-4">
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Bob Wilson' }" 
                size="lg"
                bg-color="gradient-blue"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Blue</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'Carol Green' }" 
                size="lg"
                bg-color="gradient-green"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Green</UBadge>
            </div>
            <div class="text-center space-y-2">
              <Avatar 
                :user="{ name: 'David Purple' }" 
                size="lg"
                bg-color="gradient-purple"
                :show-image="false"
              />
              <UBadge size="xs" variant="outline">Purple</UBadge>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Role Badges with Enhanced Dark Theme -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-crown" class="w-5 h-5 text-warning" />
        <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">Role Badges</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Admin Role -->
        <div class="text-center space-y-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/50 backdrop-blur-sm">
          <UBadge color="error" variant="solid" size="xs" class="gap-1">
            <UIcon name="i-lucide-crown" class="w-3 h-3" />
            Admin
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Admin User', 
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150',
                role: 'admin'
              }" 
              size="lg"
              :show-role="true"
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-neutral-900 dark:text-white">Admin User</p>
            <p class="text-xs text-error-600 dark:text-error-400">System Administrator</p>
          </div>
        </div>

        <!-- Premium Role -->
        <div class="text-center space-y-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800/50 backdrop-blur-sm">
          <UBadge color="warning" variant="solid" size="xs" class="gap-1">
            <UIcon name="i-lucide-star" class="w-3 h-3" />
            Premium
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Premium User', 
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                role: 'premium'
              }" 
              size="lg"
              :show-role="true"
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-neutral-900 dark:text-white">Premium User</p>
            <p class="text-xs text-warning-600 dark:text-warning-400">Premium Member</p>
          </div>
        </div>

        <!-- VIP Role -->
        <div class="text-center space-y-3 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800/50 backdrop-blur-sm">
          <UBadge color="info" variant="solid" size="xs" class="gap-1">
            <UIcon name="i-lucide-gem" class="w-3 h-3" />
            VIP
          </UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'VIP User', 
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                role: 'vip'
              }" 
              size="lg"
              :show-role="true"
            />
          </div>
          <div class="text-sm">
            <p class="font-medium text-neutral-900 dark:text-white">VIP User</p>
            <p class="text-xs text-purple-600 dark:text-purple-400">VIP Member</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Groups with Enhanced Styling -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-users-2" class="w-5 h-5 text-info" />
        <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">Avatar Groups</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Team Members -->
        <div class="space-y-4 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <h5 class="text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <UIcon name="i-lucide-briefcase" class="w-4 h-4" />
              Frontend Team
            </h5>
            <UBadge color="info" variant="soft" size="xs">5 members</UBadge>
          </div>
          <UAvatarGroup size="md" :max="4">
            <Avatar 
              :user="{ 
                name: 'Sarah Wilson', 
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150',
                status: 'online'
              }" 
              :show-online-status="true"
              :interactive="true"
            />
            <Avatar 
              :user="{ 
                name: 'Mike Johnson', 
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                status: 'away'
              }" 
              :show-online-status="true"
              :interactive="true"
            />
            <Avatar 
              :user="{ 
                name: 'Alex Chen', 
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                status: 'busy'
              }" 
              :show-online-status="true"
              :interactive="true"
            />
            <Avatar 
              :user="{ 
                name: 'Emma Davis', 
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                status: 'online'
              }" 
              :show-online-status="true"
              :interactive="true"
            />
            <UAvatar text="+1" size="md" />
          </UAvatarGroup>
          <p class="text-xs text-blue-600 dark:text-blue-400">Working on dashboard redesign</p>
        </div>

        <!-- Project Contributors -->
        <div class="space-y-4 p-6 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800/50 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <h5 class="text-sm font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
              <UIcon name="i-lucide-code" class="w-4 h-4" />
              Project Alpha
            </h5>
            <UBadge color="success" variant="soft" size="xs">8 collaborators</UBadge>
          </div>
          <UAvatarGroup size="md" :max="5">
            <Avatar 
              :user="{ name: 'John Dev' }" 
              bg-color="gradient-blue"
              :show-image="false"
              :interactive="true"
            />
            <Avatar 
              :user="{ name: 'Jane Des' }" 
              bg-color="gradient-green"
              :show-image="false"
              :interactive="true"
            />
            <Avatar 
              :user="{ name: 'Bob PM' }" 
              bg-color="gradient-purple"
              :show-image="false"
              :interactive="true"
            />
            <Avatar 
              :user="{ name: 'Alice QA' }" 
              bg-color="gradient-pink"
              :show-image="false"
              :interactive="true"
            />
            <UAvatar text="+3" size="md" />
          </UAvatarGroup>
          <p class="text-xs text-green-600 dark:text-green-400">Mobile app development team</p>
        </div>
      </div>
    </div>

    <!-- Interactive Demo Section -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-zap" class="w-5 h-5 text-primary" />
        <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">Interactive Demo</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Live Status Demo -->
        <UCard class="dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
          <template #header>
            <div class="flex items-center justify-between">
              <h5 class="font-semibold text-neutral-900 dark:text-white">Live Status Demo</h5>
              <UBadge :color="getStatusBadgeColor(demoAvatar.status)" variant="soft" size="xs">
                {{ demoAvatar.status?.toUpperCase() }}
              </UBadge>
            </div>
          </template>
          
          <div class="flex flex-col items-center space-y-4">
            <Avatar 
              :user="demoAvatar" 
              size="xl"
              :show-online-status="true"
              :pulse-online="demoAvatar.status === 'online'"
            />
            <div class="text-center">
              <p class="font-medium text-neutral-900 dark:text-white">{{ demoAvatar.name }}</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Status changes every 4 seconds
              </p>
            </div>
            <div class="flex gap-2">
              <UButton 
                v-for="status in statuses" 
                :key="status"
                :variant="demoAvatar.status === status ? 'solid' : 'outline'"
                :color="getStatusBadgeColor(status)"
                size="xs"
                @click="setDemoStatus(status)"
              >
                {{ status }}
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Random Avatar Generator -->
        <UCard class="dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-600 backdrop-blur-sm">
          <template #header>
            <div class="flex items-center justify-between">
              <h5 class="font-semibold text-neutral-900 dark:text-white">Random Generator</h5>
              <UButton 
                size="xs" 
                variant="outline" 
                @click="generateRandomAvatar"
                icon="i-lucide-shuffle"
              >
                Generate
              </UButton>
            </div>
          </template>
          
          <div class="flex flex-col items-center space-y-4">
            <Avatar 
              :user="randomAvatar" 
              size="xl"
              :bg-color="randomAvatar.bgColor"
              :show-image="false"
            />
            <div class="text-center">
              <p class="font-medium text-neutral-900 dark:text-white">{{ randomAvatar.name }}</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ randomAvatar.role }}</p>
            </div>
            <div class="flex gap-2">
              <UButton size="xs" variant="outline" @click="generateRandomAvatar">
                New Name
              </UButton>
              <UButton size="xs" variant="outline" @click="resetDemo">
                Reset All
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Advanced Features -->
    <div class="space-y-6">
      <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <UIcon name="i-lucide-star" class="w-5 h-5 text-warning" />
        <h4 class="font-semibold text-neutral-900 dark:text-white text-lg">Advanced Features</h4>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Notification Badge -->
        <div class="text-center space-y-3 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800/50 backdrop-blur-sm">
          <UBadge color="warning" variant="solid" size="xs">Notifications</UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Notification User', 
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150'
              }" 
              size="lg"
              :notification-count="12"
            />
          </div>
          <p class="text-xs text-orange-600 dark:text-orange-400">12 new messages</p>
        </div>

        <!-- Activity Indicator -->
        <div class="text-center space-y-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm">
          <UBadge color="info" variant="solid" size="xs">Activity</UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Active User', 
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
              }" 
              size="lg"
              activity-type="typing"
            />
          </div>
          <p class="text-xs text-blue-600 dark:text-blue-400">Currently typing...</p>
        </div>

        <!-- Chip Border -->
        <div class="text-center space-y-3 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800/50 backdrop-blur-sm">
          <UBadge color="info" variant="solid" size="xs">Chip Border</UBadge>
          <div class="flex justify-center">
            <Avatar 
              :user="{ 
                name: 'Chip User', 
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
              }" 
              size="lg"
              chip-color="info"
            />
          </div>
          <p class="text-xs text-purple-600 dark:text-purple-400">With colored border</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import our enhanced Avatar component
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
  'gradient-blue', 'gradient-green', 'gradient-purple', 'gradient-pink', 'gradient-orange'
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