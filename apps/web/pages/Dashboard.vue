<template>
  <!-- Dev Logout Section -->
  <div class="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800 mb-6">
    <div class="px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-code" class="w-5 h-5 text-red-600 dark:text-red-400" />
          <div>
            <p class="text-sm font-medium text-red-800 dark:text-red-200">Development Mode</p>
            <p class="text-xs text-red-600 dark:text-red-400">{{ authStore.userEmail || 'No user email' }}</p>
          </div>
        </div>
        <UButton variant="outline" color="error" size="sm" icon="i-lucide-log-out" @click="handleDevLogout"
          :loading="loggingOut">
          Test Logout
        </UButton>
      </div>
    </div>
  </div>

  <!-- Page Header -->
  <div class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg mb-6">
    <div class="px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-primary-100 dark:bg-primary-900">
          <UIcon name="i-lucide-layout-dashboard" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
            <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
              Dashboard
            </h1>
            <p class="text-neutral-600 dark:text-neutral-400 mt-1">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Stats Cards -->
        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Projects</p>
              <p class="text-2xl font-bold text-neutral-900 dark:text-white">24</p>
            </div>
            <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
              <UIcon name="i-lucide-briefcase" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Stock Items</p>
              <p class="text-2xl font-bold text-neutral-900 dark:text-white">156</p>
            </div>
            <div class="p-3 bg-success-100 dark:bg-success-900 rounded-full">
              <UIcon name="i-lucide-package" class="w-5 h-5 text-success-600 dark:text-success-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Users</p>
              <p class="text-2xl font-bold text-neutral-900 dark:text-white">12</p>
            </div>
            <div class="p-3 bg-info-100 dark:bg-info-900 rounded-full">
              <UIcon name="i-lucide-users" class="w-5 h-5 text-info-600 dark:text-info-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Revenue</p>
              <p class="text-2xl font-bold text-neutral-900 dark:text-white">$45.2K</p>
            </div>
            <div class="p-3 bg-warning-100 dark:bg-warning-900 rounded-full">
              <UIcon name="i-lucide-dollar-sign" class="w-5 h-5 text-warning-600 dark:text-warning-400" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UCard class="cursor-pointer hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                <UIcon name="i-lucide-plus" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 class="font-medium text-neutral-900 dark:text-white">Create Project</h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Start a new project</p>
              </div>
            </div>
          </UCard>

          <UCard class="cursor-pointer hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-success-100 dark:bg-success-900 rounded-full">
                <UIcon name="i-lucide-package-plus" class="w-5 h-5 text-success-600 dark:text-success-400" />
              </div>
              <div>
                <h3 class="font-medium text-neutral-900 dark:text-white">Add Stock Item</h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Manage inventory</p>
              </div>
            </div>
          </UCard>

          <UCard class="cursor-pointer hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-info-100 dark:bg-info-900 rounded-full">
                <UIcon name="i-lucide-user-plus" class="w-5 h-5 text-info-600 dark:text-info-400" />
              </div>
              <div>
                <h3 class="font-medium text-neutral-900 dark:text-white">Invite User</h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Add team member</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Recent Activity</h2>
        <UCard>
          <div class="divide-y divide-neutral-200 dark:divide-neutral-700">
            <div class="py-4 first:pt-0 last:pb-0">
              <div class="flex items-center gap-4">
                <div class="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-neutral-900 dark:text-white">Project "Website Redesign" completed</p>
                  <p class="text-xs text-neutral-600 dark:text-neutral-400">2 hours ago</p>
                </div>
              </div>
            </div>

            <div class="py-4 first:pt-0 last:pb-0">
              <div class="flex items-center gap-4">
                <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <UIcon name="i-lucide-package" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-neutral-900 dark:text-white">New stock items added to inventory</p>
                  <p class="text-xs text-neutral-600 dark:text-neutral-400">5 hours ago</p>
                </div>
              </div>
            </div>

            <div class="py-4 first:pt-0 last:pb-0">
              <div class="flex items-center gap-4">
                <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <UIcon name="i-lucide-users" class="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-neutral-900 dark:text-white">New team member joined</p>
                  <p class="text-xs text-neutral-600 dark:text-neutral-400">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useDualToast } from '../composables/useDualToast'

// Page meta
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

// SEO
useSeoMeta({
  title: 'Dashboard - Sciveto',
  description: 'Your project management dashboard'
})

// Composables
const authStore = useAuthStore()
const toast = useDualToast()

// State
const loggingOut = ref(false)

// Methods
const handleDevLogout = async () => {
  loggingOut.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
    await authStore.logout()
    toast.success('Logged Out', 'You have been logged out successfully')
  } catch (error) {
    toast.error('Logout Error', 'Failed to logout. Please try again.')
  } finally {
    loggingOut.value = false
  }
}
</script>