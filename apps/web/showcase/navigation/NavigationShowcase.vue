<template>
  <div class="space-y-8">
    <!-- Navigation Components Header -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-navigation" class="w-6 h-6 text-primary" />
          <h2 class="text-2xl font-bold text-highlighted">Navigation Components</h2>
        </div>
      </template>

      <p class="text-muted mb-6">
        Navigation sistem component'leri: Tabs, Breadcrumbs, Pagination ve menu yapıları.
        Nuxt UI v3 ile responsive ve accessible navigation patterns.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UCard variant="soft" color="primary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-tabs" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Tabs Component</h4>
              <p class="text-sm text-muted mt-1">Interactive tab navigation</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="secondary">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-navigation-2" class="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Breadcrumbs</h4>
              <p class="text-sm text-muted mt-1">Hierarchical navigation</p>
            </div>
          </div>
        </UCard>
        
        <UCard variant="soft" color="success">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-more-horizontal" class="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 class="font-semibold text-highlighted">Pagination</h4>
              <p class="text-sm text-muted mt-1">Data navigation controls</p>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>

    <!-- Tabs Component Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-tabs" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Tabs Component</h3>
        </div>
      </template>

      <div class="space-y-6">
        <UTabs v-model="activeTab" :items="tabItems" class="w-full">
          
          <!-- Overview Tab -->
          <template #overview="{ item }">
            <div class="space-y-4 py-4">
              <h4 class="font-semibold text-highlighted">Project Overview</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UCard variant="soft" color="primary">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary">24</div>
                    <div class="text-sm text-muted">Total Projects</div>
                  </div>
                </UCard>
                <UCard variant="soft" color="success">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-success">18</div>
                    <div class="text-sm text-muted">Completed</div>
                  </div>
                </UCard>
                <UCard variant="soft" color="warning">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-warning">6</div>
                    <div class="text-sm text-muted">In Progress</div>
                  </div>
                </UCard>
              </div>
            </div>
          </template>

          <!-- Details Tab -->
          <template #details="{ item }">
            <div class="space-y-4 py-4">
              <h4 class="font-semibold text-highlighted">Project Details</h4>
              <UCard variant="soft" color="neutral">
                <p class="text-muted">
                  Detailed project information, timelines, and specifications would be displayed here.
                </p>
                <ul class="mt-3 space-y-1 text-sm text-muted">
                  <li>• Project specifications and requirements</li>
                  <li>• Timeline and milestone tracking</li>
                  <li>• Resource allocation and planning</li>
                  <li>• Risk assessment and mitigation</li>
                </ul>
              </UCard>
            </div>
          </template>

          <!-- Team Tab -->
          <template #team="{ item }">
            <div class="space-y-4 py-4">
              <h4 class="font-semibold text-highlighted">Team Members</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UCard v-for="member in teamMembers" :key="member.id" variant="soft" color="neutral">
                  <div class="flex items-center gap-3">
                    <Avatar :user="member" size="md" />
                    <div>
                      <p class="font-medium text-highlighted">{{ member.name }}</p>
                      <p class="text-sm text-muted">{{ member.role }}</p>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </template>

          <!-- Settings Tab -->
          <template #settings="{ item }">
            <div class="space-y-4 py-4">
              <h4 class="font-semibold text-highlighted">Project Settings</h4>
              <div class="space-y-4">
                <UFormGroup label="Project Name">
                  <UInput 
                    v-model="settingsForm.name" 
                    placeholder="Enter project name"
                    icon="i-lucide-folder"
                  />
                </UFormGroup>
                
                <UFormGroup label="Description">
                  <UTextarea 
                    v-model="settingsForm.description" 
                    placeholder="Project description"
                    rows="3"
                  />
                </UFormGroup>
                
                <div class="flex gap-3">
                  <UButton color="primary" @click="saveSettings">
                    <UIcon name="i-lucide-save" class="w-4 h-4 mr-2" />
                    Save Changes
                  </UButton>
                  <UButton color="neutral" variant="outline" @click="resetSettings">
                    <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4 mr-2" />
                    Reset
                  </UButton>
                </div>
              </div>
            </div>
          </template>

        </UTabs>
      </div>
    </UCard>

    <!-- Breadcrumbs Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-navigation-2" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Breadcrumbs Component</h3>
        </div>
      </template>

      <div class="space-y-6">
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Basic Breadcrumbs</h4>
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2">
              <li class="inline-flex items-center">
                <ULink to="/" class="inline-flex items-center text-sm text-neutral-700 hover:text-primary dark:text-neutral-300">
                  <UIcon name="i-lucide-home" class="w-4 h-4 mr-2" />
                  Home
                </ULink>
              </li>
              <li>
                <div class="flex items-center">
                  <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-neutral-500" />
                  <ULink to="/projects" class="ml-1 text-sm text-neutral-700 hover:text-primary md:ml-2 dark:text-neutral-300">
                    Projects
                  </ULink>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-neutral-500" />
                  <span class="ml-1 text-sm text-primary font-medium md:ml-2">
                    Modern Website
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div>
          <h4 class="font-semibold text-highlighted mb-4">Complex Navigation</h4>
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2">
              <li class="inline-flex items-center">
                <ULink to="/dashboard" class="inline-flex items-center text-sm text-neutral-700 hover:text-primary dark:text-neutral-300">
                  <UIcon name="i-lucide-layout-dashboard" class="w-4 h-4 mr-2" />
                  Dashboard
                </ULink>
              </li>
              <li>
                <div class="flex items-center">
                  <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-neutral-500" />
                  <ULink to="/projects" class="ml-1 text-sm text-neutral-700 hover:text-primary md:ml-2 dark:text-neutral-300">
                    Projects
                  </ULink>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-neutral-500" />
                  <ULink to="/projects/web" class="ml-1 text-sm text-neutral-700 hover:text-primary md:ml-2 dark:text-neutral-300">
                    Web Development
                  </ULink>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-neutral-500" />
                  <ULink to="/projects/web/clients" class="ml-1 text-sm text-neutral-700 hover:text-primary md:ml-2 dark:text-neutral-300">
                    Client Projects
                  </ULink>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-neutral-500" />
                  <span class="ml-1 text-sm text-primary font-medium md:ml-2">
                    Current Project
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div>
          <h4 class="font-semibold text-highlighted mb-4">With Custom Separator</h4>
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2">
              <li class="inline-flex items-center">
                <ULink to="/" class="inline-flex items-center text-sm text-neutral-700 hover:text-primary dark:text-neutral-300">
                  <UIcon name="i-lucide-home" class="w-4 h-4 mr-2" />
                  Home
                </ULink>
              </li>
              <li>
                <div class="flex items-center">
                  <span class="mx-2 text-neutral-500">/</span>
                  <ULink to="/projects" class="text-sm text-neutral-700 hover:text-primary dark:text-neutral-300">
                    <UIcon name="i-lucide-folder" class="w-4 h-4 mr-2" />
                    Projects
                  </ULink>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <span class="mx-2 text-neutral-500">/</span>
                  <span class="text-sm text-primary font-medium">
                    <UIcon name="i-lucide-settings" class="w-4 h-4 mr-2" />
                    Settings
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </UCard>

    <!-- Pagination Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-more-horizontal" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Pagination Component</h3>
        </div>
      </template>

      <div class="space-y-8">
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Basic Pagination with Content</h4>
          <div class="space-y-4">
            <!-- Sample Data Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <UCard v-for="item in currentPageItems" :key="item.id" variant="outline">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h5 class="font-medium text-highlighted">{{ item.name }}</h5>
                    <p class="text-sm text-muted">{{ item.description }}</p>
                  </div>
                </div>
              </UCard>
            </div>
            
            <!-- Pagination Controls -->
            <div class="flex items-center justify-between">
              <div class="text-sm text-muted">
                Showing {{ ((currentPage - 1) * perPage) + 1 }} to {{ Math.min(currentPage * perPage, totalItems) }} of {{ totalItems }} results
              </div>
              <div class="flex items-center gap-2">
                <UButton 
                  :disabled="currentPage === 1" 
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  variant="outline"
                  size="sm"
                >
                  <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
                  Previous
                </UButton>
                
                <div class="flex items-center gap-1">
                  <UButton 
                    v-for="page in visiblePages" 
                    :key="page"
                    :variant="page === currentPage ? 'solid' : 'outline'"
                    :color="page === currentPage ? 'primary' : 'neutral'"
                    size="sm"
                    @click="currentPage = page"
                    :disabled="typeof page === 'string'"
                  >
                    {{ page }}
                  </UButton>
                </div>
                
                <UButton 
                  :disabled="currentPage === pageCount" 
                  @click="currentPage = Math.min(pageCount, currentPage + 1)"
                  variant="outline"
                  size="sm"
                >
                  Next
                  <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-highlighted mb-4">Page Size Selection</h4>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <UCard v-for="item in advancedPageItems" :key="item.id" variant="outline">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
                    <UIcon name="i-lucide-folder" class="w-5 h-5 text-success-600 dark:text-success-400" />
                  </div>
                  <div>
                    <h5 class="font-medium text-highlighted">{{ item.name }}</h5>
                    <p class="text-sm text-muted">{{ item.type }}</p>
                  </div>
                </div>
              </UCard>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-sm text-muted">Show</span>
                <USelect 
                  v-model="selectedPageSize" 
                  :options="pageSizeOptions"
                  size="sm"
                  class="w-32"
                />
                <span class="text-sm text-muted">per page</span>
              </div>
              
              <div class="flex items-center gap-2">
                <UButton 
                  :disabled="advancedPage === 1" 
                  @click="advancedPage = Math.max(1, advancedPage - 1)"
                  variant="outline"
                  size="sm"
                >
                  <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
                </UButton>
                
                <div class="flex items-center gap-1">
                  <UButton 
                    v-for="page in Math.ceil(allItems.length / selectedPageSize)" 
                    :key="page"
                    :variant="page === advancedPage ? 'solid' : 'outline'"
                    :color="page === advancedPage ? 'primary' : 'neutral'"
                    size="sm"
                    @click="advancedPage = page"
                  >
                    {{ page }}
                  </UButton>
                </div>
                
                <UButton 
                  :disabled="advancedPage === Math.ceil(allItems.length / selectedPageSize)" 
                  @click="advancedPage = Math.min(Math.ceil(allItems.length / selectedPageSize), advancedPage + 1)"
                  variant="outline"
                  size="sm"
                >
                  <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Sample Content with Original Pagination -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Sample Content</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard 
              v-for="item in paginatedItems" 
              :key="item.id"
              variant="outline"
              class="hover:shadow-lg transition-shadow"
            >
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <UIcon name="i-lucide-file-text" class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h5 class="font-semibold text-highlighted">{{ item.title }}</h5>
                  <p class="text-sm text-muted">{{ item.description }}</p>
                </div>
              </div>
            </UCard>
          </div>
          
          <div class="mt-6 flex justify-center">
            <UPagination 
              v-model="contentPage" 
              :page-count="Math.ceil(sampleContent.length / contentPerPage)" 
              :total="sampleContent.length"
              :per-page="contentPerPage"
            />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Navigation Menu Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-menu" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Navigation Menu</h3>
        </div>
      </template>

      <div class="space-y-6">
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Vertical Navigation</h4>
          <nav class="space-y-1">
            <!-- Dashboard -->
            <ULink 
              to="/dashboard" 
              class="flex items-center px-4 py-2 text-sm font-medium text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <UIcon name="i-lucide-layout-dashboard" class="w-5 h-5 mr-3 text-neutral-500" />
              Dashboard
              <UBadge color="primary" size="xs" class="ml-auto">5</UBadge>
            </ULink>

            <!-- Projects Section -->
            <div class="relative">
              <button 
                @click="toggleProjectsMenu"
                class="flex items-center w-full px-4 py-2 text-sm font-medium text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <UIcon name="i-lucide-folder" class="w-5 h-5 mr-3 text-neutral-500" />
                Projects
                <UIcon 
                  :name="isProjectsMenuOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" 
                  class="w-5 h-5 ml-auto"
                />
              </button>

              <!-- Dropdown Menu -->
              <div v-show="isProjectsMenuOpen" class="mt-1 pl-11 space-y-1">
                <ULink 
                  to="/projects"
                  class="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  All Projects
                </ULink>
                <ULink 
                  to="/projects/active"
                  class="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Active
                  <UBadge color="success" size="xs" class="ml-2">3</UBadge>
                </ULink>
                <ULink 
                  to="/projects/completed"
                  class="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Completed
                </ULink>
              </div>
            </div>

            <!-- Team -->
            <ULink 
              to="/team" 
              class="flex items-center px-4 py-2 text-sm font-medium text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <UIcon name="i-lucide-users" class="w-5 h-5 mr-3 text-neutral-500" />
              Team
            </ULink>

            <!-- Settings -->
            <ULink 
              to="/settings" 
              class="flex items-center px-4 py-2 text-sm font-medium text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <UIcon name="i-lucide-settings" class="w-5 h-5 mr-3 text-neutral-500" />
              Settings
            </ULink>
          </nav>
        </div>

        <div>
          <h4 class="font-semibold text-highlighted mb-4">Command Palette</h4>
          <UButton @click="isCommandPaletteOpen = true" variant="outline" block>
            <UIcon name="i-lucide-search" class="w-4 h-4 mr-2" />
            Open Command Palette (Ctrl+Shift+P)
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Command Palette -->
    <UCommandPalette 
      v-model="isCommandPaletteOpen"
      :groups="commandGroups"
      :fuse="{ resultLimit: 6, keys: ['label', 'suffix'] }"
      placeholder="Search for actions..."
    />

    <!-- Tooltip Showcase -->
    <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-message-square" class="w-5 h-5 text-primary" />
          <h3 class="text-xl font-bold text-highlighted">Tooltip Component</h3>
        </div>
      </template>

      <div class="space-y-8">
        <!-- Tooltip Placements -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Tooltip Placements</h4>
          <div class="grid grid-cols-3 gap-4 place-items-center">
            <!-- Top row -->
            <Tooltip name="Tooltip" content="Top start tooltip" placement="top-start">
              <UButton variant="outline" size="sm">Top Start</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Top center tooltip" placement="top">
              <UButton variant="outline" size="sm">Top</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Top end tooltip" placement="top-end">
              <UButton variant="outline" size="sm">Top End</UButton>
            </Tooltip>

            <!-- Middle row -->
            <Tooltip name="Tooltip" content="Left tooltip with more content" placement="left">
              <UButton variant="outline" size="sm">Left</UButton>
            </Tooltip>

            <div class="text-center">
              <Tooltip name="Tooltip" content="Click me tooltip" trigger="click">
                <UButton color="primary" size="sm">Click Me</UButton>
              </Tooltip>
            </div>

            <Tooltip name="Tooltip" content="Right tooltip" placement="right">
              <UButton variant="outline" size="sm">Right</UButton>
            </Tooltip>

            <!-- Bottom row -->
            <Tooltip name="Tooltip" content="Bottom start tooltip" placement="bottom-start">
              <UButton variant="outline" size="sm">Bottom Start</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Bottom center tooltip" placement="bottom">
              <UButton variant="outline" size="sm">Bottom</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Bottom end tooltip" placement="bottom-end">
              <UButton variant="outline" size="sm">Bottom End</UButton>
            </Tooltip>
          </div>
        </div>

        <!-- Tooltip Colors -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Tooltip Colors</h4>
          <div class="flex flex-wrap gap-3">
            <Tooltip name="Tooltip" content="Dark theme (default)" theme="dark">
              <UButton variant="outline" color="neutral">Dark</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Light theme tooltip" theme="light">
              <UButton variant="outline" color="neutral">Light</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Error theme tooltip" theme="error">
              <UButton variant="outline" color="red">Error</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Warning theme tooltip" theme="warning">
              <UButton variant="outline" color="amber">Warning</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Success theme tooltip" theme="success">
              <UButton variant="outline" color="green">Success</UButton>
            </Tooltip>
          </div>
        </div>

        <!-- Advanced Tooltips -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Advanced Features</h4>
          <div class="flex flex-wrap gap-3">
            <Tooltip name="Tooltip" content="Tooltip with delay" :delay="500">
              <UButton variant="outline">Delayed</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="Large tooltip text" size="lg" max-width="300px">
              <UButton variant="outline">Large</UButton>
            </Tooltip>

            <Tooltip name="Tooltip" content="This tooltip is disabled" disabled>
              <UButton variant="outline" disabled>Disabled</UButton>
            </Tooltip>
          </div>
        </div>

        <!-- Tooltip Demo -->
        <div>
          <h4 class="font-semibold text-highlighted mb-4">Interactive Demo</h4>
          <UCard variant="outline" class="bg-neutral-50 dark:bg-neutral-800/50">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h5 class="font-medium text-highlighted">Tooltip Settings</h5>
                <p class="text-sm text-muted">Hover over the button to see the tooltip</p>
              </div>
              <UTooltip :text="demoTooltipText" :color="demoTooltipColor" :popper="{ placement: demoTooltipPlacement }">
                <UButton :color="demoTooltipColor">Demo Button</UButton>
              </UTooltip>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UFormGroup label="Tooltip Text">
                <UInput v-model="demoTooltipText" placeholder="Enter tooltip text" />
              </UFormGroup>
              
              <UFormGroup label="Color">
                <USelect v-model="demoTooltipColor" :options="tooltipColorOptions" />
              </UFormGroup>
              
              <UFormGroup label="Placement">
                <USelect v-model="demoTooltipPlacement" :options="tooltipPlacementOptions" />
              </UFormGroup>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDualToast } from '~/composables/useDualToast'
import Avatar from '~/components/base/Avatar.vue'

const toast = useDualToast()

// Tabs state
const activeTab = ref(0)
const tabItems = ref([
  {
    key: 'overview',
    label: 'Overview',
    icon: 'i-lucide-chart-pie',
    badge: '24'
  },
  {
    key: 'details',
    label: 'Details', 
    icon: 'i-lucide-file-text'
  },
  {
    key: 'team',
    label: 'Team',
    icon: 'i-lucide-users',
    badge: '4'
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'i-lucide-settings'
  }
])

// Settings form
const settingsForm = ref({
  name: 'Modern Website Redesign',
  description: 'Complete website redesign with modern UI/UX principles'
})

// Team members
const teamMembers = ref([
  { id: '1', name: 'Alice Johnson', role: 'Project Manager', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', role: 'Frontend Developer', email: 'bob@example.com' },
  { id: '3', name: 'Charlie Brown', role: 'UI/UX Designer', email: 'charlie@example.com' },
  { id: '4', name: 'Diana Prince', role: 'Backend Developer', email: 'diana@example.com' }
])

// Pagination - BENİM YAPIĞIM İÇERİKLİ VERSİYON
const currentPage = ref(1)
const advancedPage = ref(1)
const perPage = ref(6)
const selectedPageSize = ref(6)
const totalItems = ref(30)
const pageCount = computed(() => Math.ceil(totalItems.value / perPage.value))

const pageSizeOptions = ref([
  { label: '3 per page', value: 3 },
  { label: '6 per page', value: 6 },
  { label: '9 per page', value: 9 },
  { label: '12 per page', value: 12 }
])

// Pagination data - BENİM EKLEDİĞİM
const allItems = ref(Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Project ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) + 1}`,
  description: `${['Web development', 'Mobile app', 'UI/UX design', 'Backend API', 'Database optimization'][i % 5]} project`,
  type: ['Development', 'Design', 'Testing', 'Deployment'][i % 4]
})))

// Computed properties for pagination - BENİM EKLEDİĞİM
const visiblePages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  
  for (let i = Math.max(2, currentPage.value - delta); 
       i <= Math.min(pageCount.value - 1, currentPage.value + delta); 
       i++) {
    range.push(i)
  }
  
  if (currentPage.value - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }
  
  rangeWithDots.push(...range)
  
  if (currentPage.value + delta < pageCount.value - 1) {
    rangeWithDots.push('...', pageCount.value)
  } else {
    if (pageCount.value > 1) {
      rangeWithDots.push(pageCount.value)
    }
  }
  
  return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index && pageCount.value > 1)
})

const currentPageItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return allItems.value.slice(start, end)
})

const advancedPageItems = computed(() => {
  const start = (advancedPage.value - 1) * selectedPageSize.value
  const end = start + selectedPageSize.value
  return allItems.value.slice(start, end)
})

// ORİJİNAL PAGINATION STATES - SENİNKİ
const compactPage = ref(1)
const contentPage = ref(1)
const contentPerPage = ref(6)

const sampleContent = ref([
  { id: 1, title: 'Project Alpha', description: 'First project in our portfolio' },
  { id: 2, title: 'Project Beta', description: 'Second project with advanced features' },
  { id: 3, title: 'Project Gamma', description: 'Third project with modern design' },
  { id: 4, title: 'Project Delta', description: 'Fourth project with responsive layout' },
  { id: 5, title: 'Project Epsilon', description: 'Fifth project with interactive elements' },
  { id: 6, title: 'Project Zeta', description: 'Sixth project with animation effects' },
  { id: 7, title: 'Project Eta', description: 'Seventh project with dark mode support' },
  { id: 8, title: 'Project Theta', description: 'Eighth project with accessibility features' },
  { id: 9, title: 'Project Iota', description: 'Ninth project with performance optimization' },
  { id: 10, title: 'Project Kappa', description: 'Tenth project with SEO improvements' },
  { id: 11, title: 'Project Lambda', description: 'Eleventh project with TypeScript' },
  { id: 12, title: 'Project Mu', description: 'Twelfth project with Vue 3 Composition API' },
  { id: 13, title: 'Project Nu', description: 'Thirteenth project with Nuxt 3' },
  { id: 14, title: 'Project Xi', description: 'Fourteenth project with TailwindCSS' },
  { id: 15, title: 'Project Omicron', description: 'Fifteenth project with Pinia state management' },
  { id: 16, title: 'Project Pi', description: 'Sixteenth project with PWA features' },
  { id: 17, title: 'Project Rho', description: 'Seventeenth project with real-time updates' },
  { id: 18, title: 'Project Sigma', description: 'Eighteenth project with GraphQL integration' }
])

const paginatedItems = computed(() => {
  const start = (contentPage.value - 1) * contentPerPage.value
  const end = start + contentPerPage.value
  return sampleContent.value.slice(start, end)
})

// Command Palette
const isCommandPaletteOpen = ref(false)
const isProjectsMenuOpen = ref(false)

// Toggle projects menu
const toggleProjectsMenu = () => {
  isProjectsMenuOpen.value = !isProjectsMenuOpen.value
}

const commandGroups = ref([
  {
    key: 'navigation',
    label: 'Navigation',
    commands: [
      { 
        id: 'dashboard', 
        label: 'Dashboard', 
        icon: 'i-lucide-layout-dashboard', 
        to: '/dashboard',
        click: () => {
          toast.info('Navigating to Dashboard')
          navigateTo('/dashboard')
          isCommandPaletteOpen.value = false
        }
      },
      { 
        id: 'projects', 
        label: 'Projects', 
        icon: 'i-lucide-folder', 
        to: '/projects',
        click: () => {
          toast.info('Navigating to Projects')
          navigateTo('/projects')
          isCommandPaletteOpen.value = false
        }
      },
      { 
        id: 'team', 
        label: 'Team', 
        icon: 'i-lucide-users', 
        to: '/team',
        click: () => {
          toast.info('Navigating to Team')
          navigateTo('/team')
          isCommandPaletteOpen.value = false
        }
      },
      { 
        id: 'showcase', 
        label: 'Showcase', 
        icon: 'i-lucide-layout', 
        to: '/showcase',
        click: () => {
          toast.info('Navigating to Showcase')
          navigateTo('/showcase')
          isCommandPaletteOpen.value = false
        }
      }
    ]
  },
  {
    key: 'actions',
    label: 'Actions',
    commands: [
      { 
        id: 'new-project', 
        label: 'New Project', 
        icon: 'i-lucide-plus', 
        click: () => {
          createProject()
          isCommandPaletteOpen.value = false
        }
      },
      { 
        id: 'export', 
        label: 'Export Data', 
        icon: 'i-lucide-download', 
        click: () => {
          exportData()
          isCommandPaletteOpen.value = false
        }
      },
      { 
        id: 'settings', 
        label: 'Settings', 
        icon: 'i-lucide-settings', 
        to: '/settings',
        click: () => {
          toast.info('Opening Settings')
          navigateTo('/settings')
          isCommandPaletteOpen.value = false
        }
      },
      { 
        id: 'theme-toggle', 
        label: 'Toggle Theme', 
        icon: 'i-lucide-palette', 
        click: () => {
          toggleTheme()
          isCommandPaletteOpen.value = false
        }
      }
    ]
  }
])

// Functions
const saveSettings = () => {
  toast.success('Settings saved successfully!')
}

const resetSettings = () => {
  settingsForm.value = {
    name: 'Modern Website Redesign',
    description: 'Complete website redesign with modern UI/UX principles'
  }
  toast.info('Settings reset to default')
}

const createProject = () => {
  toast.success('Creating new project...')
}

const exportData = () => {
  toast.info('Exporting data...')
}

const toggleTheme = () => {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
  toast.success(`Switched to ${colorMode.preference} theme`)
}

// Keyboard shortcuts - Ctrl+Shift+P olarak değiştirdim
onMounted(() => {
  const handleKeydown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
      e.preventDefault()
      isCommandPaletteOpen.value = true
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})

// Tooltip demo state
const demoTooltipText = ref('This is a demo tooltip!')
const demoTooltipColor = ref('primary')
const demoTooltipPlacement = ref('top')

const tooltipColorOptions = ref([
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Info', value: 'info' },
  { label: 'Neutral', value: 'neutral' }
])

const tooltipPlacementOptions = ref([
  { label: 'Top', value: 'top' },
  { label: 'Top Start', value: 'top-start' },
  { label: 'Top End', value: 'top-end' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Bottom Start', value: 'bottom-start' },
  { label: 'Bottom End', value: 'bottom-end' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' }
])
</script>