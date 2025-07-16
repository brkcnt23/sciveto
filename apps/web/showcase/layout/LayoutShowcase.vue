<template>
  <div class="space-y-8">
    <!-- Layout Components Header -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-layout-dashboard" class="w-6 h-6 text-primary" />
          <h2 class="text-2xl font-bold text-highlighted">Layout Components Showcase</h2>
        </div>
      </template>

      <p class="text-muted mb-6">
        Modern layout sistem: Header, Sidebar, Navigation, Breadcrumb ve responsive container yapıları.
        Nuxt UI v3 design tokens ile tutarlı tema desteği.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UCard variant="soft" color="primary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-layout-template" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Layout Components</h4>
              <p class="text-sm text-muted mt-1">Header, Sidebar, Footer, Breadcrumb</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="success">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-smartphone" class="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Responsive Design</h4>
              <p class="text-sm text-muted mt-1">Mobile-first, adaptive layouts</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="secondary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-navigation" class="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Navigation</h4>
              <p class="text-sm text-muted mt-1">Intuitive navigation patterns</p>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>

    <!-- Header Component Demo -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-menu" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Header Component</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          AppHeader component'i: Logo, navigation, search, notifications ve user menu içerir.
          Nuxt UI v3 component'leri ile modern tasarım.
        </p>

        <div class="grid gap-4">
          <UAlert color="info" variant="soft">
            <template #title>Header Features</template>
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

          <!-- Header Props Demo -->
          <UCard variant="outline" color="secondary">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-code" class="w-4 h-4 text-secondary" />
                <h4 class="font-semibold text-highlighted">Header Props Example</h4>
              </div>
            </template>
            
            <div class="bg-elevated rounded-lg p-4 border border-accented">
              <pre class="text-sm text-highlighted font-mono overflow-x-auto"><code>&lt;AppHeader 
  :navigation="headerNavigation"
  :user="currentUser"  
  :notification-count="5"
  app-name="Sciveto Dashboard"
  @open-search="openSearch"
  @toggle-notifications="toggleNotifications"
/&gt;</code></pre>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Sidebar Component Demo -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-sidebar-open" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Sidebar Component</h3>
        </div>
      </template>

      <div class="space-y-6">
        <p class="text-muted">
          AppSidebar component'i: Navigation menüsü, user info ve collapsible yapı.
          UNavigationMenu ve UCollapsible component'leri kullanır.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UAlert color="success" variant="soft">
            <template #title>Sidebar Features</template>
            <template #description>
              <ul class="mt-2 space-y-1">
                <li class="flex items-center gap-2">
                  <UIcon name="i-lucide-layers" class="w-4 h-4 text-success" />
                  <span>Hierarchical navigation</span>
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

          <UCard variant="outline" color="warning">
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
              <div class="ml-6 space-y-2">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-file-text" class="w-3 h-3 text-muted" />
                  <span class="text-muted">Reports</span>
                </div>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-activity" class="w-3 h-3 text-muted" />
                  <span class="text-muted">Metrics</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-settings" class="w-4 h-4 text-neutral" />
                <span class="text-highlighted">Settings</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

    <!-- Layout Patterns -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-layout-grid" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Layout Patterns</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <!-- Fixed Header Layout -->
        <UCard variant="soft" color="info">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-layout-panel-top" class="w-4 h-4 text-info" />
              <h4 class="font-bold text-highlighted">Fixed Header Layout</h4>
            </div>
          </template>
          
          <ul class="space-y-3">
            <li class="flex items-center gap-2">
              <UBadge color="info" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Sticky header</span>
            </li>
            <li class="flex items-center gap-2">
              <UBadge color="info" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Scrollable content</span>
            </li>
            <li class="flex items-center gap-2">
              <UBadge color="info" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Mobile responsive</span>
            </li>
          </ul>
        </UCard>

        <!-- Sidebar + Content Layout -->
        <UCard variant="soft" color="success">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-layout-panel-left" class="w-4 h-4 text-success" />
              <h4 class="font-bold text-highlighted">Sidebar + Content</h4>
            </div>
          </template>
          
          <ul class="space-y-3">
            <li class="flex items-center gap-2">
              <UBadge color="success" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Collapsible sidebar</span>
            </li>
            <li class="flex items-center gap-2">
              <UBadge color="success" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Flexible content area</span>
            </li>
            <li class="flex items-center gap-2">
              <UBadge color="success" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Overlay on mobile</span>
            </li>
          </ul>
        </UCard>

        <!-- Dashboard Grid Layout -->
        <UCard variant="soft" color="warning">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-grid-3x3" class="w-4 h-4 text-warning" />
              <h4 class="font-bold text-highlighted">Dashboard Grid</h4>
            </div>
          </template>
          
          <ul class="space-y-3">
            <li class="flex items-center gap-2">
              <UBadge color="warning" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Card-based layout</span>
            </li>
            <li class="flex items-center gap-2">
              <UBadge color="warning" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Auto-responsive grid</span>
            </li>
            <li class="flex items-center gap-2">
              <UBadge color="warning" variant="soft" size="xs">✓</UBadge>
              <span class="text-sm text-muted">Showcase sections</span>
            </li>
          </ul>
        </UCard>
      </div>
    </UCard>

    <!-- Component Status -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-trending-up" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Layout Component Status</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Completed Components -->
        <UCard variant="soft" color="success">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-success" />
              <h4 class="font-bold text-highlighted">Completed</h4>
            </div>
          </template>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">AppHeader.vue</span>
              <UBadge color="success" variant="solid" size="xs">v3</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">AppSidebar.vue</span>
              <UBadge color="success" variant="solid" size="xs">v3</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">Responsive Layout</span>
              <UBadge color="success" variant="solid" size="xs">v3</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">Mobile Navigation</span>
              <UBadge color="success" variant="solid" size="xs">v3</UBadge>
            </div>
          </div>
        </UCard>

        <!-- Planned Components -->
        <UCard variant="soft" color="info">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-clock" class="w-5 h-5 text-info" />
              <h4 class="font-bold text-highlighted">Planned</h4>
            </div>
          </template>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">AppFooter.vue</span>
              <UBadge color="info" variant="outline" size="xs">Soon</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">Breadcrumb.vue</span>
              <UBadge color="info" variant="outline" size="xs">Soon</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">PageContainer.vue</span>
              <UBadge color="info" variant="outline" size="xs">Soon</UBadge>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-highlighted">SectionDivider.vue</span>
              <UBadge color="info" variant="outline" size="xs">Soon</UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>
  </div>
</template>

<script setup>
// Component name for debugging
defineOptions({
  name: 'LayoutShowcase'
})

// Meta info
useHead({
  title: 'Layout Components - Showcase'
})
</script>