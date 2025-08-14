<!-- components/ui/PageHeader.vue -->
<template>
  <div class="page-header">
    <div class="header-content">
      <!-- Left side: Breadcrumb, Title, Description -->
      <div class="header-left">
        <!-- Breadcrumb -->
        <nav v-if="breadcrumb?.length" class="breadcrumb">
          <ol class="breadcrumb-list">
            <li v-for="(item, index) in breadcrumb" :key="index" class="breadcrumb-item">
              <NuxtLink 
                v-if="item.path && index < breadcrumb.length - 1" 
                :to="item.path"
                class="breadcrumb-link"
              >
                {{ item.name }}
              </NuxtLink>
              <span v-else class="breadcrumb-current">{{ item.name }}</span>
              <UIcon 
                v-if="index < breadcrumb.length - 1" 
                name="i-heroicons-chevron-right" 
                class="breadcrumb-separator" 
              />
            </li>
          </ol>
        </nav>

        <!-- Title and Description -->
        <div class="title-section">
          <h1 class="page-title">{{ title }}</h1>
          <p v-if="description" class="page-description">{{ description }}</p>
        </div>
      </div>

      <!-- Right side: Organization and Actions -->
      <div class="header-right">
        <!-- Organization Name -->
        <div v-if="organization" class="organization-info">
          <div class="organization-label">Organizasyon</div>
          <div class="organization-name">{{ organization }}</div>
        </div>

        <!-- Actions -->
        <div class="header-actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string
  path?: string
}

interface Props {
  title: string
  description?: string
  organization?: string
  breadcrumb?: BreadcrumbItem[]
}

withDefaults(defineProps<Props>(), {
  description: '',
  organization: '',
  breadcrumb: () => []
})
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.header-left {
  flex: 1;
  min-width: 0;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  flex-shrink: 0;
}

/* Breadcrumb Styles */
.breadcrumb {
  margin-bottom: 1rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: white;
}

.breadcrumb-current {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.breadcrumb-separator {
  width: 1rem;
  height: 1rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Title Section */
.title-section {
  space-y: 0.5rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.page-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
}

/* Organization Info */
.organization-info {
  text-align: right;
  margin-bottom: 0.5rem;
}

.organization-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.organization-name {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

/* Header Actions */
.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-header {
    padding: 1.5rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .header-right {
    width: 100%;
    align-items: stretch;
  }

  .organization-info {
    text-align: left;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .header-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 1rem;
  }

  .breadcrumb-list {
    flex-wrap: wrap;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .organization-name {
    font-size: 0.875rem;
  }
}
</style>