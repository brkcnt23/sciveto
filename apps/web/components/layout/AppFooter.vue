<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-2">
        <UButton
          v-for="social in socialLinks"
          :key="social.name"
          :to="social.url"
          target="_blank"
          variant="ghost"
          size="sm"
          :icon="social.icon"
          class="text-gray-400 hover:text-gray-500"
        />
      </div>
      <div class="mt-8 md:order-1 md:mt-0">
        <div class="flex items-center justify-center md:justify-start">
          <UIcon name="i-lucide-zap" class="h-5 w-5 text-primary-600 mr-2" />
          <span class="text-sm font-semibold">{{ appName || 'Sciveto' }}</span>
        </div>
        <p class="text-center text-xs leading-5 text-gray-500 md:text-left mt-2">
          &copy; {{ currentYear }} {{ appName || 'Sciveto' }}. All rights reserved.
        </p>
        <div class="flex justify-center md:justify-start space-x-4 mt-2">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.label"
            :to="link.to"
            class="text-xs text-gray-500 hover:text-gray-600"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Link {
  label: string
  to: string
}

interface SocialLink {
  name: string
  icon: string
  url: string
}

// Props
const props = defineProps<{
  appName?: string
}>()

// Data
const currentYear = new Date().getFullYear()

const socialLinks: SocialLink[] = [
  { name: 'Twitter', icon: 'i-lucide-twitter', url: 'https://twitter.com' },
  { name: 'GitHub', icon: 'i-lucide-github', url: 'https://github.com' },
  { name: 'LinkedIn', icon: 'i-lucide-linkedin', url: 'https://linkedin.com' }
]

const legalLinks: Link[] = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Cookies', to: '/cookies' }
]
</script>