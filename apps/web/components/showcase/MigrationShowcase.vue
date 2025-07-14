<template>
  <UCard class="bg-gradient-to-br from-primary-50 to-success-50 border-primary-200">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-primary-600" />
        <h3 class="text-lg font-bold text-primary-800">Critical Migration Showcase</h3>
        <UBadge color="success" variant="subtle">✅ Completed</UBadge>
      </div>
    </template>

    <div class="space-y-8">
      <!-- UDropdown → UDropdownMenu Migration -->
      <div class="border-l-4 border-primary-500 pl-4">
        <h4 class="font-semibold text-primary-800 mb-3">
          🔄 UDropdown → UDropdownMenu
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- v2 (OLD) -->
          <div class="bg-red-50 p-4 rounded-lg border border-red-200">
            <h5 class="text-sm font-medium text-red-800 mb-2">❌ Nuxt UI v2 (OLD)</h5>
            <pre class="text-xs text-red-700 bg-red-100 p-2 rounded overflow-x-auto"><code>&lt;UDropdown :options="items"&gt;
  &lt;UButton&gt;Options&lt;/UButton&gt;
&lt;/UDropdown&gt;</code></pre>
          </div>

          <!-- v3 (NEW) -->
          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <h5 class="text-sm font-medium text-green-800 mb-2">✅ Nuxt UI v3 (NEW)</h5>
            <pre class="text-xs text-green-700 bg-green-100 p-2 rounded overflow-x-auto"><code>&lt;UDropdownMenu :items="items"&gt;
  &lt;UButton&gt;Options&lt;/UButton&gt;
&lt;/UDropdownMenu&gt;</code></pre>
          </div>
        </div>

        <!-- Live Demo -->
        <div class="mt-4 flex gap-4">
          <UDropdownMenu :items="dropdownItems">
            <UButton color="primary" variant="outline">
              Dropdown Demo
              <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 ml-2" />
            </UButton>
          </UDropdownMenu>
        </div>
      </div>

      <!-- Props Migration: options → items -->
      <div class="border-l-4 border-secondary-500 pl-4">
        <h4 class="font-semibold text-secondary-800 mb-3">
          🔄 Props: options → items
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-red-50 p-4 rounded-lg border border-red-200">
            <h5 class="text-sm font-medium text-red-800 mb-2">❌ v2: options prop</h5>
            <pre class="text-xs text-red-700 bg-red-100 p-2 rounded"><code>&lt;USelect :options="countries" /&gt;</code></pre>
          </div>

          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <h5 class="text-sm font-medium text-green-800 mb-2">✅ v3: items prop</h5>
            <pre class="text-xs text-green-700 bg-green-100 p-2 rounded"><code>&lt;USelect :items="countries" /&gt;</code></pre>
          </div>
        </div>

        <!-- Live Demo -->
        <div class="mt-4">
          <USelect 
            :items="selectItems" 
            placeholder="Select a country"
            class="w-64"
          />
        </div>
      </div>

      <!-- Color System: gray → neutral -->
      <div class="border-l-4 border-warning-500 pl-4">
        <h4 class="font-semibold text-warning-800 mb-3">
          🎨 Color System: gray → neutral
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-red-50 p-4 rounded-lg border border-red-200">
            <h5 class="text-sm font-medium text-red-800 mb-2">❌ v2: gray colors</h5>
            <pre class="text-xs text-red-700 bg-red-100 p-2 rounded"><code>&lt;UButton color="gray" /&gt;
&lt;p class="text-gray-500" /&gt;</code></pre>
          </div>

          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <h5 class="text-sm font-medium text-green-800 mb-2">✅ v3: neutral colors</h5>
            <pre class="text-xs text-green-700 bg-green-100 p-2 rounded"><code>&lt;UButton color="neutral" /&gt;
&lt;p class="text-muted" /&gt;</code></pre>
          </div>
        </div>

        <!-- Live Demo -->
        <div class="mt-4 flex gap-3">
          <UButton color="neutral" variant="solid">Neutral Button</UButton>
          <UButton color="neutral" variant="outline">Neutral Outline</UButton>
          <UButton color="neutral" variant="ghost">Neutral Ghost</UButton>
        </div>
      </div>

      <!-- Event Migration: click → onClick -->
      <div class="border-l-4 border-info-500 pl-4">
        <h4 class="font-semibold text-info-800 mb-3">
          ⚡ Events: click → onClick
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-red-50 p-4 rounded-lg border border-red-200">
            <h5 class="text-sm font-medium text-red-800 mb-2">❌ v2: click function</h5>
            <pre class="text-xs text-red-700 bg-red-100 p-2 rounded overflow-x-auto"><code>const items = [{
  label: 'Edit',
  click: () => console.log('Edit')
}]</code></pre>
          </div>

          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <h5 class="text-sm font-medium text-green-800 mb-2">✅ v3: onClick function</h5>
            <pre class="text-xs text-green-700 bg-green-100 p-2 rounded overflow-x-auto"><code>const items = [{
  label: 'Edit',
  onClick: () => console.log('Edit')
}]</code></pre>
          </div>
        </div>
      </div>

      <!-- New Design System -->
      <div class="border-l-4 border-success-500 pl-4">
        <h4 class="font-semibold text-success-800 mb-3">
          🎨 New 7-Color Design System
        </h4>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div class="text-center">
            <UBadge color="primary" class="w-full">primary</UBadge>
            <p class="text-xs mt-1 text-muted">green</p>
          </div>
          <div class="text-center">
            <UBadge color="secondary" class="w-full">secondary</UBadge>
            <p class="text-xs mt-1 text-muted">blue</p>
          </div>
          <div class="text-center">
            <UBadge color="success" class="w-full">success</UBadge>
            <p class="text-xs mt-1 text-muted">emerald</p>
          </div>
          <div class="text-center">
            <UBadge color="info" class="w-full">info</UBadge>
            <p class="text-xs mt-1 text-muted">blue</p>
          </div>
          <div class="text-center">
            <UBadge color="warning" class="w-full">warning</UBadge>
            <p class="text-xs mt-1 text-muted">yellow</p>
          </div>
          <div class="text-center">
            <UBadge color="error" class="w-full">error</UBadge>
            <p class="text-xs mt-1 text-muted">red</p>
          </div>
          <div class="text-center">
            <UBadge color="neutral" class="w-full">neutral</UBadge>
            <p class="text-xs mt-1 text-muted">slate</p>
          </div>
        </div>
      </div>

      <!-- Migration Status -->
      <div class="bg-gradient-to-r from-success-100 to-primary-100 p-4 rounded-lg border border-success-200">
        <h4 class="font-semibold text-success-800 mb-2">✅ Migration Status</h4>
        <ul class="text-sm text-success-700 space-y-1">
          <li>✅ UDropdown → UDropdownMenu</li>
          <li>✅ options → items props</li>
          <li>✅ click → onClick events</li>
          <li>✅ gray → neutral colors</li>
          <li>✅ 7-color design system</li>
          <li>✅ Tailwind CSS v4 setup</li>
          <li>✅ UApp wrapper implementation</li>
        </ul>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { DropdownMenuItem, SelectItem } from '~/types/showcase'

// Dropdown items with v3 API (onClick instead of click)
const dropdownItems: DropdownMenuItem[] = [
  {
    label: 'Profile',
    icon: 'i-heroicons-user',
    onClick: () => console.log('Profile clicked')
  },
  {
    label: 'Settings', 
    icon: 'i-heroicons-cog-6-tooth',
    onClick: () => console.log('Settings clicked')
  },
  {
    label: '', // Empty label for separator
    separator: true
  },
  {
    label: 'Logout',
    icon: 'i-heroicons-arrow-right-start-on-rectangle',
    onClick: () => console.log('Logout clicked')
  }
]

// Select items with v3 API (items instead of options)
const selectItems: SelectItem[] = [
  { label: 'Turkey', value: 'tr' },
  { label: 'United States', value: 'us' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' }
]
</script>