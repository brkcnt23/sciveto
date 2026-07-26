<!-- showcase/layout/LayoutShowcase.vue - Enhanced with Theme System -->
<template>
  <div class="space-y-8">
    <!-- Layout Components Header -->
    <UCard class="border-0 shadow-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-layout-dashboard" class="w-8 h-8 text-primary" />
            <div>
              <h2 class="text-2xl font-bold text-highlighted">Layout Components Showcase</h2>
              <p class="text-muted text-sm">Theme-aware layout system with responsive design</p>
            </div>
          </div>
          
          <!-- Live Theme Demo -->
          <div class="flex items-center gap-2">
            <UBadge :color="themeState.current === 'dark' ? 'info' : 'warning'" variant="soft">
              {{ themeState.current }} mode
            </UBadge>
            <ThemeToggle variant="ghost" size="sm" />
          </div>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          Modern layout sistem: Header, Sidebar, Navigation, Breadcrumb ve responsive container yapıları.
          Nuxt UI v3 design tokens ile tutarlı tema desteği ve <strong>Advanced Theme System</strong> entegrasyonu.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <UCard variant="soft" color="primary" class="theme-transition">
            <div class="flex items-start gap-3">
              <UIcon name="i-lucide-layout-template" class="w-6 h-6 text-primary mt-0.5" />
              <div>
                <h4 class="font-semibold text-highlighted">Layout Components</h4>
                <p class="text-sm text-muted mt-1">Header, Sidebar, Footer, Breadcrumb with theme support</p>
              </div>
            </div>
          </UCard>
          
          <UCard variant="soft" color="success" class="theme-transition">
            <div class="flex items-start gap-3">
              <UIcon name="i-lucide-smartphone" class="w-6 h-6 text-success mt-0.5" />
              <div>
                <h4 class="font-semibold text-highlighted">Responsive Design</h4>
                <p class="text-sm text-muted mt-1">Mobile-first, adaptive layouts with theme persistence</p>
              </div>
            </div>
          </UCard>
          
          <UCard variant="soft" color="secondary" class="theme-transition">
            <div class="flex items-start gap-3">
              <UIcon name="i-lucide-paintbrush" class="w-6 h-6 text-secondary mt-0.5" />
              <div>
                <h4 class="font-semibold text-highlighted">Theme System</h4>
                <p class="text-sm text-muted mt-1">Advanced dark/light mode with smooth transitions</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Header Component Demo -->
    <UCard class="dashboard-card">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-menu" class="w-6 h-6 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">AppHeader Component</h3>
          <UBadge color="success" variant="soft" size="xs">Enhanced</UBadge>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          AppHeader component'i artık <strong>integrated theme toggle</strong> ile geliyor.
          Logo, navigation, search, notifications, theme toggle ve user menu içerir.
        </p>

        <div class="grid gap-4">
          <UAlert color="info" variant="soft" class="theme-transition">
            <template #title>Enhanced Header Features</template>
            <template #description>
              <ul class="mt-2 space-y-1">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
                  <span>Responsive logo ve app name</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
                  <span>Global search functionality</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-sparkles" class="w-4 h-4 text-primary" />
                  <span><strong>Advanced theme toggle with dropdown</strong></span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
                  <span>Notification system integration</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-success" />
                  <span>User profile dropdown</span>
                </li>
              </ul>
            </template>
          </UAlert>

          <!-- Live Header Preview -->
          <UCard variant="outline" color="primary" class="theme-transition">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-eye" class="w-4 h-4 text-primary" />
                <h4 class="font-semibold text-highlighted">Live Header Preview</h4>
              </div>
            </template>
            
            <div class="space-y-4">
              <!-- Mini header demo -->
              <div class="p-4 bg-elevated border border-accented rounded-lg theme-transition">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-6 h-6 bg-primary rounded text-white text-xs flex items-center justify-center font-bold">S</div>
                    <span class="font-medium text-highlighted">Sciveto</span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-search" class="w-4 h-4 text-muted" />
                    <ThemeToggle size="xs" variant="ghost" />
                    <UIcon name="i-lucide-bell" class="w-4 h-4 text-muted" />
                    <div class="w-6 h-6 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div class="text-xs text-muted">
                ↑ This is a mini version of your actual header with working theme toggle
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Sidebar Component Demo -->
    <UCard class="dashboard-card">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-sidebar-open" class="w-6 h-6 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">AppSidebar Component</h3>
          <UBadge color="primary" variant="soft" size="xs">Theme Ready</UBadge>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          AppSidebar component'i artık dedicated theme section ile geliyor.
          Navigation menüsü, theme controls, user info ve collapsible yapı.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UAlert color="success" variant="soft" class="theme-transition">
            <template #title>Enhanced Sidebar Features</template>
            <template #description>
              <ul class="mt-2 space-y-1">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-layers" class="w-4 h-4 text-success" />
                  <span>Hierarchical navigation</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-sparkles" class="w-4 h-4 text-primary" />
                  <span><strong>Dedicated theme section</strong></span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-target" class="w-4 h-4 text-success" />
                  <span>Active state indicators</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-success" />
                  <span>Expandable sections</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-smartphone" class="w-4 h-4 text-success" />
                  <span>Mobile overlay mode</span>
                </li>
              </ul>
            </template>
          </UAlert>

          <UCard variant="outline" color="warning" class="theme-transition">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-tree-deciduous" class="w-4 h-4 text-warning" />
                <h4 class="font-semibold text-highlighted">Navigation Structure</h4>
              </div>
            </template>
            
            <div class="space-y-3 text-sm">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-home" class="w-4 h-4 text-primary" />
                <span class="text-highlighted">Dashboard</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-bar-chart" class="w-4 h-4 text-secondary" />
                <span class="text-highlighted">Analytics</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-folder" class="w-4 h-4 text-warning" />
                <span class="text-highlighted">Projects</span>
              </div>
              
              <!-- Theme Section Preview -->
              <div class="border-t border-accented pt-3 mt-3">
                <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Theme</div>
                <div class="flex items-center gap-2">
                  <ThemeToggle size="xs" variant="ghost" show-label />
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Theme Integration Demo -->
    <UCard class="dashboard-card">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-palette" class="w-6 h-6 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Theme System Integration</h3>
          <UBadge color="primary" variant="solid" size="xs">NEW</UBadge>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          Layout components artık advanced theme system ile tam entegre. 
          Otomatik dark/light mode detection, smooth transitions ve keyboard shortcuts dahil.
        </p>

        <!-- Theme Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard variant="soft" color="primary" class="theme-transition">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-zap" class="w-5 h-5 text-primary" />
              <div>
                <h4 class="font-medium text-highlighted">Auto Detection</h4>
                <p class="text-xs text-muted mt-1">System preference tracking</p>
              </div>
            </div>
          </UCard>

          <UCard variant="soft" color="success" class="theme-transition">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-keyboard" class="w-5 h-5 text-success" />
              <div>
                <h4 class="font-medium text-highlighted">Shortcuts</h4>
                <p class="text-xs text-muted mt-1">Ctrl+Shift+T to toggle</p>
              </div>
            </div>
          </UCard>

          <UCard variant="soft" color="secondary" class="theme-transition">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-secondary" />
              <div>
                <h4 class="font-medium text-highlighted">Transitions</h4>
                <p class="text-xs text-muted mt-1">Smooth color changes</p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Implementation Example -->
        <UAlert color="primary" variant="soft" class="theme-transition">
          <template #title>Implementation Example</template>
          <template #description>
            <div class="mt-3 space-y-2">
              <p class="text-sm">Layout components now include theme toggle automatically:</p>
              <div class="bg-elevated rounded-lg p-3 font-mono text-xs text-highlighted border border-accented">
                <div>&lt;AppHeader with-theme-toggle /&gt;</div>
                <div>&lt;AppSidebar with-theme-section /&gt;</div>
              </div>
            </div>
          </template>
        </UAlert>
      </div>
    </UCard>

    <!-- Component Status -->
    <UCard class="dashboard-card">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-trending-up" class="w-6 h-6 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Layout Component Status</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Completed Components -->
        <UCard variant="soft" color="success" class="theme-transition">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-success" />
              <h4 class="font-bold text-highlighted">Completed</h4>
            </div>
          </template>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">AppHeader.vue</span>
              <div class="flex items-center gap-2">
                <UBadge color="primary" variant="solid" size="xs">Theme Ready</UBadge>
                <UBadge color="success" variant="solid" size="xs">v3</UBadge>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">AppSidebar.vue</span>
              <div class="flex items-center gap-2">
                <UBadge color="primary" variant="solid" size="xs">Theme Ready</UBadge>
                <UBadge color="success" variant="solid" size="xs">v3</UBadge>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">ThemeToggle.vue</span>
              <div class="flex items-center gap-2">
                <UBadge color="primary" variant="solid" size="xs">NEW</UBadge>
                <UBadge color="success" variant="solid" size="xs">v3</UBadge>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">Responsive Layout</span>
              <UBadge color="success" variant="solid" size="xs">v3</UBadge>
            </div>
          </div>
        </UCard>

        <!-- Enhanced Features -->
        <UCard variant="soft" color="primary" class="theme-transition">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-primary" />
              <h4 class="font-bold text-highlighted">Theme Enhancements</h4>
            </div>
          </template>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">Auto Dark/Light Mode</span>
              <UBadge color="success" variant="solid" size="xs">✓</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">Keyboard Shortcuts</span>
              <UBadge color="success" variant="solid" size="xs">✓</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">Smooth Transitions</span>
              <UBadge color="success" variant="solid" size="xs">✓</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">Theme Persistence</span>
              <UBadge color="success" variant="solid" size="xs">✓</UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

// Theme system
const { state: themeState } = useTheme()
</script>

<style scoped>
/* Enhanced theme transitions */
.theme-transition {
  transition: 
    color 0.25s ease-in-out, 
    background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
}

/* Dashboard card hover effect with theme awareness */
.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1),
    0 0 0 1px var(--ui-border-default);
}

.dark .dashboard-card:hover {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.25),
    0 0 0 1px var(--ui-border-default);
}
</style>