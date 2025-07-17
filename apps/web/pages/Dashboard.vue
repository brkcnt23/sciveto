<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Page Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-xl bg-primary-100 dark:bg-primary-900">
            <UIcon name="i-lucide-layout-dashboard" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
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
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">24</p>
            </div>
            <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
              <UIcon name="i-lucide-briefcase" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Stock Items</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">156</p>
            </div>
            <div class="p-3 bg-success-100 dark:bg-success-900 rounded-full">
              <UIcon name="i-lucide-package" class="w-5 h-5 text-success-600 dark:text-success-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Tasks</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
            <div class="p-3 bg-warning-100 dark:bg-warning-900 rounded-full">
              <UIcon name="i-lucide-clock" class="w-5 h-5 text-warning-600 dark:text-warning-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">42</p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Recent Activity -->
      <div class="mt-8">
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          </template>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
              <p class="text-sm text-gray-600 dark:text-gray-400">New project "Website Redesign" created</p>
              <span class="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-success-500 rounded-full"></div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Stock item "Safety Helmet" restocked</p>
              <span class="text-xs text-gray-500 ml-auto">4 hours ago</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-warning-500 rounded-full"></div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Low stock alert for "Work Gloves"</p>
              <span class="text-xs text-gray-500 ml-auto">6 hours ago</span>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Dashboard - Sciveto'
})
</script>