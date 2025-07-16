<template>
  <div class="space-y-8">
    <!-- Data Components Header -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-database" class="w-6 h-6 text-primary" />
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Data Display Components</h2>
        </div>
      </template>

      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Data gösterim component'leri: Tables, Cards, Badge ve loading states.
        Nuxt UI v3 ile UTable, UCard ve UBadge component'leri.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UCard variant="soft" color="primary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-table" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Tables</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">UTable, sorting, filtering</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="success">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-credit-card" class="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Cards</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">UCard variants, layouts</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="secondary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-tag" class="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">Badges</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">UBadge, status indicators</p>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>

    <!-- Avatar & Progress Bar Showcases using our updated components -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- Avatar Showcase Section -->
      <UCard class="border-0 shadow-xl bg-white dark:bg-gray-800 backdrop-blur-sm">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-user-circle" class="w-5 h-5 text-secondary" />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">👤 Avatar Components</h3>
          </div>
        </template>
        <AvatarShowcase />
      </UCard>

      <!-- Progress Bar Showcase Section -->
      <UCard class="border-0 shadow-xl bg-white dark:bg-gray-800 backdrop-blur-sm">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5 text-primary" />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">📊 Progress Components</h3>
          </div>
        </template>
        <ProgressBarShowcase />
      </UCard>
    </div>

    <!-- Table Components -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-table" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Table Components</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-gray-600 dark:text-gray-400">
          UTable component'i ile data tabloları oluşturun. 
          Sorting, filtering ve pagination özellikleri ile güçlü data gösterimi.
        </p>

        <!-- Sample Table -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-semibold text-gray-900 dark:text-white">Sample Data Table</h4>
            <UButton size="sm" variant="outline" @click="toggleLoading">
              {{ isLoading ? 'Stop Loading' : 'Toggle Loading' }}
            </UButton>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="space-y-3">
            <div v-for="i in 5" :key="i" class="animate-pulse">
              <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          <!-- Loaded Table -->
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="user in sampleUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <Avatar 
                        :user="user" 
                        size="sm" 
                        :show-online-status="true"
                        class="mr-3"
                      />
                      <div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <UBadge :color="getRoleColor(user.role)" variant="soft" size="sm">
                      {{ user.role }}
                    </UBadge>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <StatusIndicator 
                      variant="badge"
                      :status="user.status" 
                      :label="user.status"
                      size="sm"
                      :icon="getStatusIcon(user.status)"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-16 mr-2">
                        <ProgressBar
                          :value="user.progress"
                          :show-percentage="false"
                          size="sm"
                        />
                      </div>
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.progress }}%</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <UButton size="xs" variant="ghost" @click="viewUser(user.id)">
                        <UIcon name="i-lucide-eye" class="w-3 h-3" />
                      </UButton>
                      <UButton size="xs" variant="ghost" @click="editUser(user.id)">
                        <UIcon name="i-lucide-edit" class="w-3 h-3" />
                      </UButton>
                      <UButton size="xs" variant="ghost" color="error" @click="deleteUser(user.id)">
                        <UIcon name="i-lucide-trash-2" class="w-3 h-3" />
                      </UButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Badge Components with StatusIndicator -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-tag" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Badge & Status Components</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-gray-600 dark:text-gray-400">
          StatusIndicator ve UBadge component'leri ile status gösterimi, kategorileme ve etiketleme yapın.
          Farklı renk ve variant'larla mesaj tipini belirtin.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <!-- Priority Badges -->
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <UIcon name="i-lucide-alert-triangle" class="w-4 h-4 text-warning" />
              Priority Levels
            </h4>
            <div class="space-y-3">
              <StatusIndicator variant="badge" status="low" label="LOW" icon="i-lucide-arrow-down" />
              <StatusIndicator variant="badge" status="medium" label="MEDIUM" icon="i-lucide-minus" />
              <StatusIndicator variant="badge" status="high" label="HIGH" icon="i-lucide-arrow-up" />
              <StatusIndicator variant="badge" status="urgent" label="URGENT" icon="i-lucide-alert-triangle" pulse />
            </div>
          </div>

          <!-- Status Types -->
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <UIcon name="i-lucide-activity" class="w-4 h-4 text-primary" />
              Status Types
            </h4>
            <div class="space-y-3">
              <StatusIndicator variant="badge" status="active" label="Active" pulse />
              <StatusIndicator variant="badge" status="pending" label="Pending" />
              <StatusIndicator variant="badge" status="inactive" label="Inactive" />
              <StatusIndicator variant="badge" status="failed" label="Failed" />
            </div>
          </div>

          <!-- Project Status -->
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <UIcon name="i-lucide-folder" class="w-4 h-4 text-secondary" />
              Project Status
            </h4>
            <div class="space-y-3">
              <StatusIndicator variant="badge" status="planning" label="Planning" icon="i-lucide-calendar" />
              <StatusIndicator variant="badge" status="in-progress" label="In Progress" icon="i-lucide-play" />
              <StatusIndicator variant="badge" status="review" label="Review" icon="i-lucide-eye" />
              <StatusIndicator variant="badge" status="done" label="Completed" icon="i-lucide-check-circle" />
            </div>
          </div>

          <!-- System Status -->
          <div class="space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <UIcon name="i-lucide-server" class="w-4 h-4 text-info" />
              System Status
            </h4>
            <div class="space-y-3">
              <StatusIndicator variant="badge" status="operational" label="Operational" icon="i-lucide-check-circle" />
              <StatusIndicator variant="badge" status="maintenance" label="Maintenance" icon="i-lucide-wrench" pulse />
              <StatusIndicator variant="badge" status="degraded" label="Degraded" icon="i-lucide-alert-triangle" />
              <StatusIndicator variant="badge" status="outage" label="Outage" icon="i-lucide-x-circle" pulse />
            </div>
          </div>
        </div>

        <!-- Classic Dot Style -->
        <div class="space-y-4">
          <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <UIcon name="i-lucide-circle-dot" class="w-4 h-4 text-primary" />
            Classic Dot Style
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- User Status -->
            <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h5 class="text-sm font-medium text-gray-600 dark:text-gray-400">User Status</h5>
              <div class="space-y-2">
                <StatusIndicator status="online" label="Online" pulse />
                <StatusIndicator status="away" label="Away" />
                <StatusIndicator status="busy" label="Busy" />
                <StatusIndicator status="offline" label="Offline" />
              </div>
            </div>

            <!-- Task Status -->
            <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h5 class="text-sm font-medium text-gray-600 dark:text-gray-400">Task Status</h5>
              <div class="space-y-2">
                <StatusIndicator status="pending" label="To Do" />
                <StatusIndicator status="in-progress" label="In Progress" pulse />
                <StatusIndicator status="review" label="Review" />
                <StatusIndicator status="completed" label="Done" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Card Components -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-credit-card" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Card Components</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-gray-600 dark:text-gray-400">
          UCard component'i ile content container'ları oluşturun.
          Header, body ve footer slot'ları ile esnek yapı.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Basic Card -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-layout" class="w-4 h-4 text-primary" />
                <h4 class="font-semibold text-gray-900 dark:text-white">Basic Card</h4>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-400">
              This is a basic card with header and content. 
              Perfect for displaying information in organized sections.
            </p>
          </UCard>

          <!-- Card with Footer -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-star" class="w-4 h-4 text-warning" />
                <h4 class="font-semibold text-gray-900 dark:text-white">With Footer</h4>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-400">
              Card with footer section for actions or additional information.
            </p>
            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton size="xs" variant="outline">Cancel</UButton>
                <UButton size="xs">Save</UButton>
              </div>
            </template>
          </UCard>

          <!-- Variant Card -->
          <UCard variant="soft" color="success">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-palette" class="w-4 h-4 text-success" />
                <h4 class="font-semibold text-gray-900 dark:text-white">Variant Card</h4>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-400">
              Card with soft variant and success color.
              Great for highlighting positive information.
            </p>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Data Visualization Preview -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-bar-chart" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Data Visualization Preview</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-gray-600 dark:text-gray-400">
          Data görselleştirme component'leri ile metriklerinizi etkili şekilde sunun.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Metric Cards -->
          <div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <div class="text-2xl font-bold text-primary">1,234</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
            <UBadge color="success" variant="soft" size="xs" class="mt-2">
              +12%
            </UBadge>
          </div>

          <div class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
            <div class="text-2xl font-bold text-success">98.5%</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
            <UBadge color="success" variant="soft" size="xs" class="mt-2">
              +0.3%
            </UBadge>
          </div>

          <div class="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
            <div class="text-2xl font-bold text-warning">42</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Open Issues</div>
            <UBadge color="error" variant="soft" size="xs" class="mt-2">
              +5
            </UBadge>
          </div>

          <div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
            <div class="text-2xl font-bold text-secondary">$12.4K</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
            <UBadge color="success" variant="soft" size="xs" class="mt-2">
              +18%
            </UBadge>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
// Component name for debugging
defineOptions({
  name: 'DataShowcase'
})

// Import our updated components
import Avatar from '~/components/base/Avatar.vue'
import ProgressBar from '~/components/base/ProgressBar.vue'
import StatusIndicator from '~/components/base/StatusIndicator.vue'
import AvatarShowcase from './AvatarShowcase.vue'
import ProgressBarShowcase from './ProgressBarShowcase.vue'

// Composables
const toast = useToast()

// Reactive data
const isLoading = ref(false)

// Sample data with updated user objects for Avatar component
const sampleUsers = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b03c?w=150',
    status: 'online',
    role: 'Designer',
    progress: 85,
    isOnline: true
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'away',
    role: 'Developer',
    progress: 92,
    isOnline: true
  },
  {
    id: 3,
    name: 'Carol Wilson',
    email: 'carol@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'busy',
    role: 'Manager',
    progress: 68,
    isOnline: true
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'offline',
    role: 'QA Engineer',
    progress: 45,
    isOnline: false
  }
])

// Methods
const toggleLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

const getRoleColor = (role) => {
  const colors = {
    Designer: 'secondary',
    Developer: 'primary',
    Manager: 'warning',
    'QA Engineer': 'info'
  }
  return colors[role] || 'neutral'
}

const getStatusIcon = (status) => {
  const icons = {
    online: 'i-lucide-wifi',
    away: 'i-lucide-clock',
    busy: 'i-lucide-minus-circle',
    offline: 'i-lucide-wifi-off'
  }
  return icons[status]
}

const viewUser = (id) => {
  toast.add({
    title: 'View User',
    description: `Opening user profile ${id}`,
    color: 'info',
    icon: 'i-lucide-eye'
  })
}

const editUser = (id) => {
  toast.add({
    title: 'Edit User',
    description: `Editing user ${id}`,
    color: 'primary',
    icon: 'i-lucide-edit'
  })
}

const deleteUser = (id) => {
  toast.add({
    title: 'Delete User',
    description: `User ${id} deleted successfully`,
    color: 'error',
    icon: 'i-lucide-trash-2'
  })
}

// Meta info
useHead({
  title: 'Data Components - Showcase'
})
</script>