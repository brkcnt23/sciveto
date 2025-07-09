<!-- apps/web/components/Header.vue -->
<template>
  <header class="bg-white/95 backdrop-blur-md shadow-lg border-b border-sky-200 sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <!-- Left Side - Logo & Navigation -->
        <div class="flex items-center space-x-6">
          <!-- Logo -->
          <NuxtLink to="/dashboard" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-cube" class="h-5 w-5 text-white" />
            </div>
            <span class="text-xl font-bold text-slate-800">Sciveto</span>
          </NuxtLink>
          
          <!-- Navigation Links -->
          <nav class="hidden md:flex space-x-6">
            <NuxtLink 
              to="/dashboard" 
              class="text-slate-600 hover:text-sky-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink 
              to="/projects" 
              class="text-slate-600 hover:text-sky-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              Projects
            </NuxtLink>
            <NuxtLink 
              to="/stock-items" 
              class="text-slate-600 hover:text-sky-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              Stock Items
            </NuxtLink>
            <NuxtLink 
              to="/categories" 
              class="text-slate-600 hover:text-sky-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              Categories
            </NuxtLink>
          </nav>
        </div>

        <!-- Right Side - Search & User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden md:block">
            <SearchBox placeholder="Search anything..." />
          </div>
          
          <!-- Notifications -->
          <button class="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
            <Icon name="i-heroicons-bell" class="h-5 w-5" />
          </button>
          
          <!-- User Menu -->
          <div class="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 rounded-lg p-2 transition-colors">
            <Avatar :user="user" size="sm" />
            <span class="hidden md:block text-sm font-medium text-slate-700">{{ user?.email }}</span>
            <Icon name="i-heroicons-chevron-down" class="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  user: Object
})
</script>