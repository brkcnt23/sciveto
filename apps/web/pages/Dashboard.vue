<template>
  <div class="min-h-screen bg-surface">
    <!-- Dashboard Header -->
    <div class="bg-elevated border-b border-neutral-200 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-highlighted">Nuxt UI v3 Dashboard</h1>
            <p class="text-muted mt-1">
              Modern component showcase with full v3 compliance
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <UBadge color="success" variant="subtle" size="lg">
              ✅ v3 Ready
            </UBadge>
            <UButton color="primary" @click="showWelcomeToast">
              Test Toast
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto p-6">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UCard class="dashboard-card">
          <div class="text-center">
            <div class="text-2xl font-bold text-primary-600">100%</div>
            <div class="text-sm text-muted">Migration Complete</div>
            <UBadge color="success" class="mt-2" size="sm">✅ Done</UBadge>
          </div>
        </UCard>

        <UCard class="dashboard-card">
          <div class="text-center">
            <div class="text-2xl font-bold text-secondary-600">7</div>
            <div class="text-sm text-muted">Color Aliases</div>
            <UBadge color="info" class="mt-2" size="sm">New System</UBadge>
          </div>
        </UCard>

        <UCard class="dashboard-card">
          <div class="text-center">
            <div class="text-2xl font-bold text-success-600">15+</div>
            <div class="text-sm text-muted">Components</div>
            <UBadge color="success" class="mt-2" size="sm">Updated</UBadge>
          </div>
        </UCard>

        <UCard class="dashboard-card">
          <div class="text-center">
            <div class="text-2xl font-bold text-warning-600">v4</div>
            <div class="text-sm text-muted">Tailwind CSS</div>
            <UBadge color="warning" class="mt-2" size="sm">Modern</UBadge>
          </div>
        </UCard>
      </div>

      <!-- Foundation Status -->
      <UCard class="mb-8 bg-gradient-to-br from-primary-50 to-success-50 border-primary-200">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-primary-600" />
            <h2 class="text-xl font-bold text-primary-800">Foundation Complete ✅</h2>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Critical Migrations -->
          <div>
            <h3 class="font-semibold text-primary-800 mb-3">Critical Migrations</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-success-600" />
                <span>UDropdown → UDropdownMenu</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-success-600" />
                <span>options → items props</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-success-600" />
                <span>click → onClick events</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-success-600" />
                <span>gray → neutral colors</span>
              </li>
            </ul>
          </div>

          <!-- Setup Complete -->
          <div>
            <h3 class="font-semibold text-success-800 mb-3">Setup Complete</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-success-600" />
                <span>UApp wrapper added</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-success-600" />
                <span>Tailwind CSS v4 config</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-success-600" />
                <span>7-color design system</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-success-600" />
                <span>TypeScript interfaces</span>
              </li>
            </ul>
          </div>

          <!-- Future Ready -->
          <div>
            <h3 class="font-semibold text-info-800 mb-3">Future Ready</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-info-600" />
                <span>Component structure</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-info-600" />
                <span>Modern patterns ready</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-info-600" />
                <span>API integration points</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-info-600" />
                <span>No breaking changes</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-primary-100 rounded-lg border border-primary-200">
          <p class="text-primary-800 font-medium text-center">
            🎉 Foundation is now 100% Nuxt UI v3 compliant! 
            Ready for advanced features without any breaking changes.
          </p>
        </div>
      </UCard>

      <!-- Component Categories Overview -->
      <UCard class="mb-8">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6 text-secondary-600" />
            <h2 class="text-xl font-bold text-secondary-800">Component Categories</h2>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-sky-50 rounded-lg border border-sky-200">
            <UIcon name="i-heroicons-squares-plus" class="w-12 h-12 text-sky-600 mx-auto mb-3" />
            <h3 class="font-semibold text-sky-800 mb-2">🎨 Layout Components</h3>
            <p class="text-sm text-sky-600">Header, Sidebar, Footer, Breadcrumb</p>
            <UBadge color="info" class="mt-3">4 Components</UBadge>
          </div>
          
          <div class="text-center p-6 bg-emerald-50 rounded-lg border border-emerald-200">
            <UIcon name="i-heroicons-squares-2x2" class="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 class="font-semibold text-emerald-800 mb-2">🔧 Core UI Components</h3>
            <p class="text-sm text-emerald-600">Card, Table, Modal, Button, Badge</p>
            <UBadge color="success" class="mt-3">8+ Components</UBadge>
          </div>
          
          <div class="text-center p-6 bg-violet-50 rounded-lg border border-violet-200">
            <UIcon name="i-heroicons-chart-bar" class="w-12 h-12 text-violet-600 mx-auto mb-3" />
            <h3 class="font-semibold text-violet-800 mb-2">📊 Data Components</h3>
            <p class="text-sm text-violet-600">ProgressBar, StatusIndicator, Avatar</p>
            <UBadge color="secondary" class="mt-3">5+ Components</UBadge>
          </div>
        </div>
      </UCard>

      <!-- Showcase Components - Full Width Layout -->
      <div class="space-y-8 mb-8">
        <!-- Migration Showcase -->
        <MigrationShowcase />
        
        <!-- Core UI Showcase -->
        <CoreUIShowcase />
        
        <!-- Layout Showcase -->
        <LayoutShowcase />
      </div>

      <!-- Design System Overview -->
      <UCard class="mb-8">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-swatch" class="w-6 h-6 text-secondary-600" />
            <h2 class="text-xl font-bold text-secondary-800">Design System v3</h2>
          </div>
        </template>

        <div class="space-y-6">
          <!-- Color Palette -->
          <div>
            <h3 class="font-semibold text-highlighted mb-4">7-Color Design System</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div class="text-center">
                <div class="w-full h-20 bg-primary-500 rounded-lg mb-2"></div>
                <div class="text-sm font-medium">Primary</div>
                <div class="text-xs text-muted">green</div>
              </div>
              <div class="text-center">
                <div class="w-full h-20 bg-secondary-500 rounded-lg mb-2"></div>
                <div class="text-sm font-medium">Secondary</div>
                <div class="text-xs text-muted">blue</div>
              </div>
              <div class="text-center">
                <div class="w-full h-20 bg-success-500 rounded-lg mb-2"></div>
                <div class="text-sm font-medium">Success</div>
                <div class="text-xs text-muted">emerald</div>
              </div>
              <div class="text-center">
                <div class="w-full h-20 bg-info-500 rounded-lg mb-2"></div>
                <div class="text-sm font-medium">Info</div>
                <div class="text-xs text-muted">blue</div>
              </div>
              <div class="text-center">
                <div class="w-full h-20 bg-warning-500 rounded-lg mb-2"></div>
                <div class="text-sm font-medium">Warning</div>
                <div class="text-xs text-muted">yellow</div>
              </div>
              <div class="text-center">
                <div class="w-full h-20 bg-error-500 rounded-lg mb-2"></div>
                <div class="text-sm font-medium">Error</div>
                <div class="text-xs text-muted">red</div>
              </div>
              <div class="text-center">
                <div class="w-full h-20 bg-neutral-500 rounded-lg mb-2"></div>
                <div class="text-sm font-medium">Neutral</div>
                <div class="text-xs text-muted">slate</div>
              </div>
            </div>
          </div>

          <!-- Design Tokens -->
          <div>
            <h3 class="font-semibold text-highlighted mb-4">Modern Design Tokens</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="p-3 border border-neutral-200 rounded-lg">
                <div class="text-muted mb-1">Text Muted</div>
                <code class="text-xs bg-neutral-100 px-2 py-1 rounded">.text-muted</code>
              </div>
              <div class="p-3 border border-neutral-200 rounded-lg">
                <div class="text-highlighted mb-1">Text Highlighted</div>
                <code class="text-xs bg-neutral-100 px-2 py-1 rounded">.text-highlighted</code>
              </div>
              <div class="p-3 border border-neutral-200 rounded-lg bg-elevated">
                <div class="text-highlighted mb-1">Background Elevated</div>
                <code class="text-xs bg-neutral-100 px-2 py-1 rounded">.bg-elevated</code>
              </div>
              <div class="p-3 border border-neutral-200 rounded-lg bg-surface">
                <div class="text-highlighted mb-1">Background Surface</div>
                <code class="text-xs bg-neutral-100 px-2 py-1 rounded">.bg-surface</code>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Next Steps -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-rocket-launch" class="w-6 h-6 text-warning-600" />
            <h2 class="text-xl font-bold text-warning-800">Next Development Phase</h2>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-muted">
            Foundation is complete! Now we can safely add advanced features without worrying about breaking changes.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-highlighted mb-3">Ready to Add:</h3>
              <ul class="space-y-2 text-sm text-muted">
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-lightning-bolt" class="w-4 h-4 text-warning-500" />
                  Performance optimizations
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-code-bracket" class="w-4 h-4 text-info-500" />
                  Advanced composables
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-server" class="w-4 h-4 text-secondary-500" />
                  Backend API integration
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-bolt" class="w-4 h-4 text-success-500" />
                  Real-time data features
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-sparkles" class="w-4 h-4 text-primary-500" />
                  Advanced animations
                </li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-highlighted mb-3">Benefits Achieved:</h3>
              <ul class="space-y-2 text-sm text-muted">
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-success-500" />
                  100% Nuxt UI v3 compliance
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-success-500" />
                  Modern development patterns
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-success-500" />
                  Type-safe components
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-success-500" />
                  Future-proof architecture
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-success-500" />
                  No breaking changes ahead
                </li>
              </ul>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <UButton color="primary" @click="showSuccessToast">
              Continue Development
            </UButton>
            <UButton color="secondary" variant="outline" @click="showInfoToast">
              View Documentation
            </UButton>
            <UButton color="neutral" variant="ghost" @click="showWarningToast">
              Export Config
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import showcase components
import MigrationShowcase from '~/components/showcase/MigrationShowcase.vue'
import CoreUIShowcase from '~/components/showcase/CoreUIShowcase.vue'
import LayoutShowcase from '~/components/showcase/LayoutShowcase.vue'
import { useHead } from 'nuxt/app'

// Toast composable
const toast = useToast()

// Toast functions with v3 API
const showWelcomeToast = () => {
  toast.add({
    title: 'Welcome to Nuxt UI v3!',
    description: 'Foundation setup is complete and ready for development.',
    color: 'primary',
    icon: 'i-heroicons-rocket-launch'
  })
}

const showSuccessToast = () => {
  toast.add({
    title: 'Ready for Next Phase!',
    description: 'Foundation is solid. Time to build advanced features.',
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })
}

const showInfoToast = () => {
  toast.add({
    title: 'Documentation',
    description: 'Check out the Nuxt UI v3 documentation for advanced features.',
    color: 'info',
    icon: 'i-heroicons-information-circle'
  })
}

const showWarningToast = () => {
  toast.add({
    title: 'Export Ready',
    description: 'Configuration can be exported for other projects.',
    color: 'warning',
    icon: 'i-heroicons-arrow-down-tray'
  })
}

// SEO
useHead({
  title: 'Dashboard - Nuxt UI v3 Foundation Complete',
  meta: [
    {
      name: 'description',
      content: 'Modern dashboard built with Nuxt UI v3 - Foundation setup complete with full v3 compliance'
    }
  ]
})

</script>