<template>
  <div class="space-y-8">
    <!-- Data Components Header -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-database" class="w-6 h-6 text-primary" />
          <h2 class="text-2xl font-bold text-highlighted">Data Display Components</h2>
        </div>
      </template>

      <p class="text-muted mb-6">
        Data gösterim component'leri: Tables, Cards, Progress, Avatar, Badge ve loading states.
        Nuxt UI v3 ile UTable, UCard, UProgressBar ve UAvatar component'leri.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <UCard variant="soft" color="primary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-table" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Tables</h4>
              <p class="text-sm text-muted mt-1">UTable, sorting, filtering</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="success">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-credit-card" class="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Cards</h4>
              <p class="text-sm text-muted mt-1">UCard variants, layouts</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="secondary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Progress</h4>
              <p class="text-sm text-muted mt-1">UProgressBar, indicators</p>
            </div>
          </div>
        </UCard>

        <UCard variant="soft" color="warning">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-user-circle" class="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Avatars</h4>
              <p class="text-sm text-muted mt-1">UAvatar, user display</p>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>

    <!-- Progress Components -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-activity" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Progress Components</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-highlighted">Project Progress</span>
              <span class="text-muted">{{ projectProgress }}%</span>
            </div>
            <div class="w-full bg-elevated rounded-full h-2">
              <div class="bg-primary h-2 rounded-full transition-all duration-500" 
                   :style="`width: ${projectProgress}%`"></div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-highlighted">Team Capacity</span>
              <span class="text-muted">{{ teamCapacity }}%</span>
            </div>
            <div class="w-full bg-elevated rounded-full h-2">
              <div class="bg-success h-2 rounded-full transition-all duration-500" 
                   :style="`width: ${teamCapacity}%`"></div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-highlighted">Budget Usage</span>
              <span class="text-muted">{{ budgetUsage }}%</span>
            </div>
            <div class="w-full bg-elevated rounded-full h-2">
              <div class="bg-warning h-2 rounded-full transition-all duration-500" 
                   :style="`width: ${budgetUsage}%`"></div>
            </div>
          </div>

          <UButton @click="updateProgress" color="primary" variant="outline" size="sm">
            <UIcon name="i-lucide-refresh-cw" class="w-4 h-4" />
            Update Progress
          </UButton>
        </div>

        <div class="space-y-4">
          <UAlert color="info" variant="soft">
            <template #title>Progress Features</template>
            <template #description>
              <ul class="mt-2 space-y-1">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
                  <span>Smooth animations</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
                  <span>Color-coded progress</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
                  <span>Percentage display</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
                  <span>Responsive design</span>
                </li>
              </ul>
            </template>
          </UAlert>

          <UCard variant="outline" color="success">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-target" class="w-4 h-4 text-success" />
                <h4 class="font-semibold text-highlighted">Progress Stats</h4>
              </div>
            </template>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-highlighted">Completed Tasks</span>
                <UBadge color="success" variant="soft" size="sm">{{ Math.round(projectProgress / 10) }}/10</UBadge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-highlighted">Team Members</span>
                <UBadge color="info" variant="soft" size="sm">{{ Math.round(teamCapacity / 20) }}/5</UBadge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-highlighted">Budget Remaining</span>
                <UBadge color="warning" variant="soft" size="sm">${{ (100 - budgetUsage) * 100 }}</UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Avatar Components -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-users" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Avatar Components</h3>
        </div>
      </template>

      <div class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Avatar Sizes -->
          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Avatar Sizes</h4>
            <div class="flex items-center gap-4">
              <div class="text-center space-y-2">
                <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span class="text-xs font-medium text-white">XS</span>
                </div>
                <span class="text-xs text-muted">xs</span>
              </div>
              <div class="text-center space-y-2">
                <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span class="text-sm font-medium text-white">SM</span>
                </div>
                <span class="text-xs text-muted">sm</span>
              </div>
              <div class="text-center space-y-2">
                <div class="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                  <span class="text-sm font-medium text-white">MD</span>
                </div>
                <span class="text-xs text-muted">md</span>
              </div>
              <div class="text-center space-y-2">
                <div class="w-16 h-16 rounded-full bg-warning flex items-center justify-center">
                  <span class="text-lg font-medium text-white">LG</span>
                </div>
                <span class="text-xs text-muted">lg</span>
              </div>
            </div>
          </div>

          <!-- Avatar States -->
          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Avatar States</h4>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <UIcon name="i-lucide-user" class="w-6 h-6 text-white" />
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                </div>
                <span class="text-sm text-highlighted">Online</span>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="relative">
                  <div class="w-12 h-12 rounded-full bg-neutral flex items-center justify-center">
                    <UIcon name="i-lucide-user" class="w-6 h-6 text-white" />
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-warning rounded-full border-2 border-white"></div>
                </div>
                <span class="text-sm text-highlighted">Away</span>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="relative">
                  <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center opacity-75">
                    <UIcon name="i-lucide-user" class="w-6 h-6 text-white" />
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-error rounded-full border-2 border-white"></div>
                </div>
                <span class="text-sm text-highlighted">Offline</span>
              </div>
            </div>
          </div>

          <!-- Avatar Groups -->
          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Avatar Groups</h4>
            <div class="flex -space-x-2">
              <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-white">
                <span class="text-sm font-medium text-white">AB</span>
              </div>
              <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-2 border-white">
                <span class="text-sm font-medium text-white">CD</span>
              </div>
              <div class="w-10 h-10 rounded-full bg-success flex items-center justify-center border-2 border-white">
                <span class="text-sm font-medium text-white">EF</span>
              </div>
              <div class="w-10 h-10 rounded-full bg-warning flex items-center justify-center border-2 border-white">
                <span class="text-sm font-medium text-white">+3</span>
              </div>
            </div>
          </div>
        </div>

        <UAlert color="success" variant="soft">
          <template #title>Avatar Best Practices</template>
          <template #description>
            Avatar component'leri kullanıcı temsili, team member'ları gösterme ve status indication için optimize edilmiştir.
          </template>
        </UAlert>
      </div>
    </UCard>

    <!-- Badge Components -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-tag" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Badge Components</h3>
        </div>
      </template>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <!-- Priority Badges -->
          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Priority Levels</h4>
            <div class="space-y-3">
              <UBadge label="LOW" color="success" variant="solid" size="sm" />
              <UBadge label="MEDIUM" color="warning" variant="solid" size="sm" />
              <UBadge label="HIGH" color="error" variant="solid" size="sm" />
              <UBadge label="URGENT" color="error" variant="solid" size="sm" class="animate-pulse" />
            </div>
          </div>

          <!-- Status Badges -->
          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Status Types</h4>
            <div class="space-y-3">
              <UBadge label="Active" color="success" variant="soft" size="sm" />
              <UBadge label="Pending" color="warning" variant="soft" size="sm" />
              <UBadge label="Inactive" color="neutral" variant="soft" size="sm" />
              <UBadge label="Error" color="error" variant="soft" size="sm" />
            </div>
          </div>

          <!-- Badge Variants -->
          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Badge Variants</h4>
            <div class="space-y-3">
              <UBadge label="Solid" color="primary" variant="solid" size="sm" />
              <UBadge label="Soft" color="primary" variant="soft" size="sm" />
              <UBadge label="Outline" color="primary" variant="outline" size="sm" />
              <UBadge label="Subtle" color="primary" variant="subtle" size="sm" />
            </div>
          </div>

          <!-- Badge Sizes -->
          <div class="space-y-4">
            <h4 class="font-semibold text-highlighted">Badge Sizes</h4>
            <div class="space-y-3">
              <UBadge label="Extra Small" color="info" variant="solid" size="xs" />
              <UBadge label="Small" color="info" variant="solid" size="sm" />
              <UBadge label="Medium" color="info" variant="solid" size="md" />
              <UBadge label="Large" color="info" variant="solid" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Loading States -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-loader" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Loading States</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Skeleton Loaders -->
        <div class="space-y-4">
          <h4 class="font-semibold text-highlighted">Skeleton Loaders</h4>
          <div class="space-y-4">
            <!-- Card Skeleton -->
            <div class="border border-accented rounded-lg p-4 space-y-3">
              <div class="flex items-center space-x-4">
                <div class="rounded-full bg-muted h-12 w-12 animate-pulse"></div>
                <div class="space-y-2 flex-1">
                  <div class="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  <div class="h-3 bg-muted rounded animate-pulse w-1/2"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-3 bg-muted rounded animate-pulse"></div>
                <div class="h-3 bg-muted rounded animate-pulse w-5/6"></div>
              </div>
            </div>

            <!-- List Skeleton -->
            <div class="space-y-2">
              <div v-for="i in 3" :key="i" class="flex items-center space-x-3 p-3 border border-accented rounded">
                <div class="rounded-full bg-muted h-8 w-8 animate-pulse"></div>
                <div class="space-y-1 flex-1">
                  <div class="h-3 bg-muted rounded animate-pulse w-2/3"></div>
                  <div class="h-2 bg-muted rounded animate-pulse w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Spinners -->
        <div class="space-y-4">
          <h4 class="font-semibold text-highlighted">Loading Spinners</h4>
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span class="text-sm text-muted">Loading...</span>
            </div>

            <div class="flex items-center gap-4">
              <div class="animate-pulse flex space-x-1">
                <div class="rounded-full bg-primary h-2 w-2"></div>
                <div class="rounded-full bg-primary h-2 w-2 animation-delay-75"></div>
                <div class="rounded-full bg-primary h-2 w-2 animation-delay-150"></div>
              </div>
              <span class="text-sm text-muted">Processing...</span>
            </div>

            <UButton :loading="isLoading" @click="toggleLoading" color="primary">
              {{ isLoading ? 'Loading...' : 'Start Loading' }}
            </UButton>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Data Table Preview -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-table" class="w-5 h-5 text-primary" />
            <h3 class="text-xl font-bold text-highlighted">Data Table Preview</h3>
          </div>
          <UBadge label="UTable Component" color="info" variant="soft" size="sm" />
        </div>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-accented">
            <tr>
              <th class="text-left py-3 px-4 font-semibold text-highlighted">User</th>
              <th class="text-left py-3 px-4 font-semibold text-highlighted">Status</th>
              <th class="text-left py-3 px-4 font-semibold text-highlighted">Role</th>
              <th class="text-left py-3 px-4 font-semibold text-highlighted">Progress</th>
              <th class="text-left py-3 px-4 font-semibold text-highlighted">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in sampleUsers" :key="user.id" class="border-b border-accented">
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span class="text-xs font-medium text-white">{{ user.initials }}</span>
                  </div>
                  <div>
                    <div class="font-medium text-highlighted">{{ user.name }}</div>
                    <div class="text-sm text-muted">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <UBadge :label="user.status" :color="getStatusColor(user.status)" variant="soft" size="xs" />
              </td>
              <td class="py-3 px-4 text-muted">{{ user.role }}</td>
              <td class="py-3 px-4">
                <div class="w-20 bg-elevated rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" :style="`width: ${user.progress}%`"></div>
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="flex gap-1">
                  <UButton size="xs" color="neutral" variant="ghost">
                    <UIcon name="i-lucide-eye" class="w-3 h-3" />
                  </UButton>
                  <UButton size="xs" color="neutral" variant="ghost">
                    <UIcon name="i-lucide-edit" class="w-3 h-3" />
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>

<script setup>
// Component name for debugging
defineOptions({
  name: 'DataShowcase'
})

// Reactive data
const projectProgress = ref(75)
const teamCapacity = ref(60)
const budgetUsage = ref(45)
const isLoading = ref(false)

// Sample data
const sampleUsers = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    initials: 'AJ',
    status: 'online',
    role: 'Designer',
    progress: 85
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    initials: 'BS',
    status: 'away',
    role: 'Developer',
    progress: 92
  },
  {
    id: 3,
    name: 'Carol Wilson',
    email: 'carol@example.com',
    initials: 'CW',
    status: 'offline',
    role: 'Manager',
    progress: 68
  }
])

// Methods
const updateProgress = () => {
  projectProgress.value = Math.floor(Math.random() * 100)
  teamCapacity.value = Math.floor(Math.random() * 100)
  budgetUsage.value = Math.floor(Math.random() * 100)
}

const toggleLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

const getStatusColor = (status) => {
  const colors = {
    online: 'success',
    away: 'warning',
    offline: 'neutral'
  }
  return colors[status] || 'neutral'
}

// Meta info
useHead({
  title: 'Data Components - Showcase'
})
</script>