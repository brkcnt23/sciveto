<template>
  <UCard class="bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-200">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-heroicons-squares-plus" class="w-6 h-6 text-sky-600" />
        <h3 class="text-lg font-bold text-sky-800">Layout Components</h3>
        <UBadge color="info" variant="subtle">Design System</UBadge>
      </div>
    </template>

    <div class="space-y-8">
      <!-- Header Component Demo -->
      <div>
        <h4 class="font-semibold text-sky-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
          Header with Navigation
        </h4>
        
        <div class="border border-neutral-200 rounded-lg overflow-hidden">
          <!-- Demo Header -->
          <header class="bg-white border-b border-neutral-200 p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <UIcon name="i-heroicons-cube" class="w-8 h-8 text-primary-600" />
                <h1 class="text-xl font-bold text-highlighted">Dashboard</h1>
              </div>
              
              <div class="flex items-center gap-3">
                <!-- Search -->
                <UInput 
                  placeholder="Search..." 
                  icon="i-heroicons-magnifying-glass"
                  class="w-64"
                />
                
                <!-- Notifications -->
                <UButton variant="ghost" size="sm" square>
                  <UIcon name="i-heroicons-bell" class="w-5 h-5" />
                </UButton>
                
                <!-- User Menu -->
                <UDropdownMenu :items="userMenuItems">
                  <UButton variant="ghost" class="flex items-center gap-2">
                    <UAvatar 
                      src="https://i.pravatar.cc/32?img=1" 
                      size="sm"
                    />
                    <span class="text-sm">John Doe</span>
                    <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
                  </UButton>
                </UDropdownMenu>
              </div>
            </div>
          </header>
        </div>
      </div>

      <!-- Sidebar Navigation Demo -->
      <div>
        <h4 class="font-semibold text-sky-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-bars-3-bottom-left" class="w-5 h-5" />
          Sidebar Navigation (UNavigationMenu)
        </h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Vertical Navigation -->
          <div class="border border-neutral-200 rounded-lg overflow-hidden">
            <div class="bg-neutral-50 p-3 border-b border-neutral-200">
              <h5 class="font-medium text-neutral-800">Vertical Navigation</h5>
            </div>
            <div class="p-4">
              <UNavigationMenu 
                :items="navigationItems" 
                orientation="vertical"
                class="w-full"
              />
            </div>
          </div>

          <!-- Horizontal Navigation -->
          <div class="border border-neutral-200 rounded-lg overflow-hidden">
            <div class="bg-neutral-50 p-3 border-b border-neutral-200">
              <h5 class="font-medium text-neutral-800">Horizontal Navigation</h5>
            </div>
            <div class="p-4">
              <UNavigationMenu 
                :items="horizontalNavItems" 
                orientation="horizontal"
                class="w-full justify-center"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Breadcrumb Demo -->
      <div>
        <h4 class="font-semibold text-sky-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
          Breadcrumb Navigation
        </h4>
        
        <div class="border border-neutral-200 rounded-lg p-4">
          <UBreadcrumb :items="breadcrumbItems" />
        </div>
      </div>

      <!-- Footer Demo -->
      <div>
        <h4 class="font-semibold text-sky-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-minus" class="w-5 h-5" />
          Footer Layout
        </h4>
        
        <div class="border border-neutral-200 rounded-lg overflow-hidden">
          <footer class="bg-neutral-50 border-t border-neutral-200 p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <!-- Company Info -->
              <div>
                <h5 class="font-semibold text-neutral-800 mb-3">Company</h5>
                <ul class="space-y-2 text-sm text-muted">
                  <li><a href="#" class="hover:text-primary-600">About Us</a></li>
                  <li><a href="#" class="hover:text-primary-600">Careers</a></li>
                  <li><a href="#" class="hover:text-primary-600">Contact</a></li>
                </ul>
              </div>
              
              <!-- Products -->
              <div>
                <h5 class="font-semibold text-neutral-800 mb-3">Products</h5>
                <ul class="space-y-2 text-sm text-muted">
                  <li><a href="#" class="hover:text-primary-600">Dashboard</a></li>
                  <li><a href="#" class="hover:text-primary-600">Analytics</a></li>
                  <li><a href="#" class="hover:text-primary-600">Reports</a></li>
                </ul>
              </div>
              
              <!-- Support -->
              <div>
                <h5 class="font-semibold text-neutral-800 mb-3">Support</h5>
                <ul class="space-y-2 text-sm text-muted">
                  <li><a href="#" class="hover:text-primary-600">Help Center</a></li>
                  <li><a href="#" class="hover:text-primary-600">Documentation</a></li>
                  <li><a href="#" class="hover:text-primary-600">API Reference</a></li>
                </ul>
              </div>
              
              <!-- Social -->
              <div>
                <h5 class="font-semibold text-neutral-800 mb-3">Follow Us</h5>
                <div class="flex gap-3">
                  <UButton variant="ghost" size="sm" square>
                    <UIcon name="i-simple-icons-twitter" class="w-4 h-4" />
                  </UButton>
                  <UButton variant="ghost" size="sm" square>
                    <UIcon name="i-simple-icons-github" class="w-4 h-4" />
                  </UButton>
                  <UButton variant="ghost" size="sm" square>
                    <UIcon name="i-simple-icons-linkedin" class="w-4 h-4" />
                  </UButton>
                </div>
              </div>
            </div>
            
            <!-- Copyright -->
            <div class="border-t border-neutral-200 mt-6 pt-6 text-center">
              <p class="text-sm text-muted">
                © 2025 Dashboard. Built with Nuxt UI v3.
              </p>
            </div>
          </footer>
        </div>
      </div>

      <!-- Responsive Layout Demo -->
      <div>
        <h4 class="font-semibold text-sky-800 mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-device-phone-mobile" class="w-5 h-5" />
          Responsive Layout System
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Mobile Layout -->
          <div class="border border-neutral-200 rounded-lg overflow-hidden">
            <div class="bg-neutral-50 p-2 border-b border-neutral-200 text-center">
              <span class="text-xs font-medium text-neutral-600">Mobile (sm)</span>
            </div>
            <div class="p-3 space-y-2">
              <div class="h-8 bg-primary-100 rounded"></div>
              <div class="h-4 bg-neutral-100 rounded"></div>
              <div class="h-4 bg-neutral-100 rounded w-3/4"></div>
              <div class="h-6 bg-success-100 rounded"></div>
            </div>
          </div>

          <!-- Tablet Layout -->
          <div class="border border-neutral-200 rounded-lg overflow-hidden">
            <div class="bg-neutral-50 p-2 border-b border-neutral-200 text-center">
              <span class="text-xs font-medium text-neutral-600">Tablet (md)</span>
            </div>
            <div class="p-3">
              <div class="grid grid-cols-2 gap-2 mb-2">
                <div class="h-8 bg-primary-100 rounded"></div>
                <div class="h-8 bg-secondary-100 rounded"></div>
              </div>
              <div class="h-4 bg-neutral-100 rounded mb-2"></div>
              <div class="h-6 bg-success-100 rounded"></div>
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="border border-neutral-200 rounded-lg overflow-hidden">
            <div class="bg-neutral-50 p-2 border-b border-neutral-200 text-center">
              <span class="text-xs font-medium text-neutral-600">Desktop (lg)</span>
            </div>
            <div class="p-3">
              <div class="grid grid-cols-3 gap-2 mb-2">
                <div class="h-6 bg-primary-100 rounded"></div>
                <div class="h-6 bg-secondary-100 rounded"></div>
                <div class="h-6 bg-warning-100 rounded"></div>
              </div>
              <div class="h-3 bg-neutral-100 rounded mb-1"></div>
              <div class="h-3 bg-neutral-100 rounded mb-2 w-2/3"></div>
              <div class="h-5 bg-success-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Layout Status -->
      <div class="bg-gradient-to-r from-sky-100 to-indigo-100 p-6 rounded-lg border border-sky-200">
        <h4 class="font-semibold text-sky-800 mb-3">✅ Layout Components Status</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 class="font-medium text-sky-700 mb-2">Available Components:</h5>
            <ul class="text-sm text-sky-600 space-y-1">
              <li>✅ Header with modern design</li>
              <li>✅ UNavigationMenu (was VerticalNavigation)</li>
              <li>✅ UBreadcrumb with items prop</li>
              <li>✅ Footer layout system</li>
              <li>✅ Responsive grid system</li>
            </ul>
          </div>
          <div>
            <h5 class="font-medium text-sky-700 mb-2">Features:</h5>
            <ul class="text-sm text-sky-600 space-y-1">
              <li>✅ Mobile-first responsive design</li>
              <li>✅ Dark mode support</li>
              <li>✅ Accessibility features</li>
              <li>✅ Modern design tokens</li>
              <li>✅ Flexible layout system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { DropdownMenuItem, SelectItem } from '~/types/showcase'

// User menu items with v3 API (onClick instead of click)
const userMenuItems: DropdownMenuItem[] = [
  {
    label: 'Profile',
    icon: 'i-heroicons-user',
    onClick: () => console.log('Profile')
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    onClick: () => console.log('Settings')
  },
  {
    label: '', // Empty label for separator
    separator: true
  },
  {
    label: 'Sign Out',
    icon: 'i-heroicons-arrow-right-start-on-rectangle',
    onClick: () => console.log('Sign Out')
  }
]

// Navigation items for sidebar
const navigationItems = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/dashboard'
  },
  {
    label: 'Analytics',
    icon: 'i-heroicons-chart-bar',
    to: '/analytics'
  },
  {
    label: 'Users',
    icon: 'i-heroicons-users',
    to: '/users',
    badge: '12'
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/settings'
  }
]

// Horizontal navigation items
const horizontalNavItems = [
  {
    label: 'Overview',
    to: '/overview'
  },
  {
    label: 'Projects',
    to: '/projects'
  },
  {
    label: 'Team',
    to: '/team'
  },
  {
    label: 'Reports',
    to: '/reports'
  }
]

// Breadcrumb items with v3 API (items instead of links)
const breadcrumbItems = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Dashboard',
    to: '/dashboard'
  },
  {
    label: 'Components',
    to: '/dashboard/components'
  },
  {
    label: 'Layout'
  }
]
</script>