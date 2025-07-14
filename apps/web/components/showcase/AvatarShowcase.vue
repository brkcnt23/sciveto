<!-- components/showcase/AvatarShowcase.vue -->
<template>
  <div class="space-y-8">
    <!-- Size Variations -->
    <div class="space-y-4">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Size Variations
      </h4>
      <div class="flex items-end space-x-6 justify-center">
        <div v-for="size in sizes" :key="size" class="text-center space-y-2">
          <Avatar :user="sampleUser" :size="size" />
          <p class="text-xs text-slate-600 uppercase">{{ size }}</p>
        </div>
      </div>
    </div>

    <!-- Background Color Variations (Avatar Fill) -->
    <div v-if="showBgColors" class="space-y-4">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Background Color Variations (Full Fill)
      </h4>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="red" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Red</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="blue" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Blue</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="green" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Green</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="yellow" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Yellow</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="purple" size="lg" :show-image="false" text-color="white" />
          <p class="text-xs text-slate-600">Purple</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="pink" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Pink</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="indigo" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Indigo</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="orange" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Orange</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="teal" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Teal</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="cyan" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Cyan</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="emerald" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Emerald</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="violet" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Violet</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="fuchsia" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Fuchsia</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="rose" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Rose</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="sky" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Sky</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" bg-color="amber" size="lg" :show-image="false" />
          <p class="text-xs text-slate-600">Amber</p>
        </div>
      </div>
    </div>

    <!-- Different Color Variations -->
    <div v-if="showColors" class="space-y-4">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Color Variations
      </h4>
      <div class="flex items-center space-x-6 justify-center flex-wrap gap-4">
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" color="none" size="lg" />
          <p class="text-xs text-slate-600">Default</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" color="primary" size="lg" />
          <p class="text-xs text-slate-600">Primary</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" color="secondary" size="lg" />
          <p class="text-xs text-slate-600">Secondary</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" color="success" size="lg" />
          <p class="text-xs text-slate-600">Success</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" color="info" size="lg" />
          <p class="text-xs text-slate-600">Info</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" color="warning" size="lg" />
          <p class="text-xs text-slate-600">Warning</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" color="error" size="lg" />
          <p class="text-xs text-slate-600">Error</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="sampleUser" color="neutral" size="lg" />
          <p class="text-xs text-slate-600">Neutral</p>
        </div>
      </div>
    </div>

    <!-- Different Users -->
    <div class="space-y-4">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Team Members
      </h4>
      <div class="flex items-center space-x-4 justify-center flex-wrap gap-4">
        <div v-for="user in teamMembers" :key="user.id" class="text-center space-y-2">
          <Avatar :user="user" size="lg" show-online-status />
          <div class="space-y-1">
            <p class="text-sm font-medium text-slate-700">{{ user.name }}</p>
            <p class="text-xs text-slate-500">{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- With Notifications -->
    <div v-if="showNotifications" class="space-y-4">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        With Notifications
      </h4>
      <div class="flex items-center space-x-6 justify-center">
        <div class="text-center space-y-2">
          <Avatar :user="teamMembers[0]" size="lg" :notification-count="3" />
          <p class="text-xs text-slate-600">3 notifications</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="teamMembers[1]" size="lg" :notification-count="27" />
          <p class="text-xs text-slate-600">27 notifications</p>
        </div>
        <div class="text-center space-y-2">
          <Avatar :user="teamMembers[2]" size="lg" :notification-count="150" />
          <p class="text-xs text-slate-600">99+ notifications</p>
        </div>
      </div>
    </div>

    <!-- Avatar Group -->
    <div v-if="showAvatarGroup" class="space-y-4">
      <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
        Avatar Groups
      </h4>

      <div class="space-y-6">
        <!-- Normal Group -->
        <div class="text-center space-y-2">
          <UAvatarGroup size="lg">
            <UAvatar v-for="user in teamMembers.slice(0, 3)" :key="user.id" :src="user.avatar" :alt="user.name" />
          </UAvatarGroup>
          <p class="text-xs text-slate-600">Team Collaboration</p>
        </div>

        <!-- With Max -->
        <div class="text-center space-y-2">
          <UAvatarGroup size="lg" :max="3">
            <UAvatar v-for="user in teamMembers" :key="user.id" :src="user.avatar" :alt="user.name" />
          </UAvatarGroup>
          <p class="text-xs text-slate-600">Max 3 Avatars (+1 more)</p>
        </div>

        <!-- Different Sizes -->
        <div class="flex items-center justify-center space-x-8">
          <div class="text-center space-y-2">
            <UAvatarGroup size="sm">
              <UAvatar v-for="user in teamMembers.slice(0, 3)" :key="user.id" :src="user.avatar" :alt="user.name" />
            </UAvatarGroup>
            <p class="text-xs text-slate-600">Small</p>
          </div>

          <div class="text-center space-y-2">
            <UAvatarGroup size="md">
              <UAvatar v-for="user in teamMembers.slice(0, 3)" :key="user.id" :src="user.avatar" :alt="user.name" />
            </UAvatarGroup>
            <p class="text-xs text-slate-600">Medium</p>
          </div>

          <div class="text-center space-y-2">
            <UAvatarGroup size="xl">
              <UAvatar v-for="user in teamMembers.slice(0, 3)" :key="user.id" :src="user.avatar" :alt="user.name" />
            </UAvatarGroup>
            <p class="text-xs text-slate-600">Extra Large</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toggle Controls -->
    <div v-if="showControls" class="pt-6 border-t border-slate-200">
      <h4 class="font-semibold text-slate-700 mb-4">Show/Hide Sections</h4>
      <div class="flex flex-wrap gap-2">
        <UButton :variant="showColors ? 'solid' : 'outline'" color="primary" size="sm"
          @click="showColors = !showColors">
          Border Colors
        </UButton>
        <UButton :variant="showBgColors ? 'solid' : 'outline'" color="primary" size="sm"
          @click="showBgColors = !showBgColors">
          Background Colors
        </UButton>
        <UButton :variant="showNotifications ? 'solid' : 'outline'" color="primary" size="sm"
          @click="showNotifications = !showNotifications">
          Notifications
        </UButton>
        <UButton :variant="showAvatarGroup ? 'solid' : 'outline'" color="primary" size="sm"
          @click="showAvatarGroup = !showAvatarGroup">
          Avatar Groups
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, Text } from 'vue'

// Props for controlling what sections to show
const props = defineProps({
  showControls: {
    type: Boolean,
    default: true
  },
  defaultShowColors: {
    type: Boolean,
    default: true
  },
  defaultShowBgColors: {
    type: Boolean,
    default: true
  },
  defaultShowNotifications: {
    type: Boolean,
    default: true
  },
  defaultShowAvatarGroup: {
    type: Boolean,
    default: true
  },
  textColor: {
    type: String,
    default: 'white' // varsayılan beyaz
  },
})

// Reactive state for showing/hiding sections
const showColors = ref(props.defaultShowColors)
const showBgColors = ref(props.defaultShowBgColors)
const showNotifications = ref(props.defaultShowNotifications)
const showAvatarGroup = ref(props.defaultShowAvatarGroup)

// Available sizes
const sizes = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']

// Sample user for size demonstration
const sampleUser = {
  id: 1,
  name: 'Alice Johnson',
  email: 'alice@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  isOnline: true
}

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://www.shutterstock.com/editorial/image-editorial/M2TcQex9M6jck55eNjM3MDQ=/alice-johnson-swim-school-performing-trnsmt-2023-440nw-14002564i.jpg',
    isOnline: true
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isOnline: false
  },
  {
    id: 4,
    name: 'Diana Prince',
    email: 'diana@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  }
]
</script>