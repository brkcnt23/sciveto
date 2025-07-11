<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <!-- Header Component -->
        <Header :user="user" />

        <div class="max-w-7xl mx-auto space-y-6">
            <!-- Development Logout Button -->
            <UAlert color="error" variant="soft" icon="i-heroicons-information-circle" title="Development Mode"
                :description="`Logged in as: ${user?.email}`">
                <template #actions>
                    <UButton color="error" variant="outline" size="xs" @click="handleDevLogout" :loading="loggingOut">
                        <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-3 h-3 mr-1" />
                        Test Logout
                    </UButton>
                </template>
            </UAlert>

            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-neutral-800 mb-2 mt-12">🎨 Component Showcase</h1>
                <p class="text-neutral-600 max-w-2xl mx-auto">
                    Explore our beautiful UI components with interactive examples and demonstrations
                </p>
            </div>
        </div>

        <div class="mx-auto max-w-7xl px-6 lg:px-8 py-8 space-y-8">
            <!-- Welcome Section -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <h2 class="text-2xl font-bold text-neutral-800">🚀 Component Showcase Dashboard</h2>
                </template>

                <p class="text-neutral-600 mb-6">
                    Bu sayfada projemizde kullanacağımız tüm base component'leri görebilirsiniz.
                    Her component doğal renkler ve modern tasarım prensipleri ile oluşturulmuştur.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <UCard class="bg-primary-50 border-primary-200">
                        <template #header>
                            <h4 class="font-semibold text-primary-800">🎨 Layout Components</h4>
                        </template>
                        <p class="text-sm text-primary-600">Header, Sidebar, Footer, Breadcrumb</p>
                    </UCard>
                    <UCard class="bg-success-50 border-success-200">
                        <template #header>
                            <h4 class="font-semibold text-success-800">🔧 Core UI Components</h4>
                        </template>
                        <p class="text-sm text-success-600">Card, Table, Modal, Button, Badge</p>
                    </UCard>
                    <UCard class="bg-info-50 border-info-200">
                        <template #header>
                            <h4 class="font-semibold text-info-800">📊 Data Components</h4>
                        </template>
                        <p class="text-sm text-info-600">ProgressBar, StatusIndicator, Avatar</p>
                    </UCard>
                </div>
            </UCard>

            <!-- Priority Badge Showcase -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <h3 class="text-xl font-bold text-neutral-800">🏷️ Priority Badge (Nuxt UI v3)</h3>
                </template>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="text-center space-y-3">
                        <h4 class="font-semibold text-neutral-700">LOW Priority</h4>
                        <div class="space-y-2">
                            <UBadge color="success" variant="solid" label="LOW" />
                            <UBadge color="success" variant="soft" label="LOW" />
                            <UBadge color="success" variant="outline" label="LOW" />
                            <UBadge color="success" variant="subtle" label="LOW" />
                        </div>
                    </div>
                    <div class="text-center space-y-3">
                        <h4 class="font-semibold text-neutral-700">MEDIUM Priority</h4>
                        <div class="space-y-2">
                            <UBadge color="warning" variant="solid" label="MEDIUM" />
                            <UBadge color="warning" variant="soft" label="MEDIUM" />
                            <UBadge color="warning" variant="outline" label="MEDIUM" />
                            <UBadge color="warning" variant="subtle" label="MEDIUM" />
                        </div>
                    </div>
                    <div class="text-center space-y-3">
                        <h4 class="font-semibold text-neutral-700">HIGH Priority</h4>
                        <div class="space-y-2">
                            <UBadge color="error" variant="solid" label="HIGH" />
                            <UBadge color="error" variant="soft" label="HIGH" />
                            <UBadge color="error" variant="outline" label="HIGH" />
                            <UBadge color="error" variant="subtle" label="HIGH" />
                        </div>
                    </div>
                    <div class="text-center space-y-3">
                        <h4 class="font-semibold text-neutral-700">URGENT Priority</h4>
                        <div class="space-y-2">
                            <UBadge color="error" variant="solid" label="URGENT" />
                            <UBadge color="error" variant="soft" label="URGENT" />
                            <UBadge color="error" variant="outline" label="URGENT" />
                            <UBadge color="error" variant="subtle" label="URGENT" />
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Progress Bar Showcase -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <h3 class="text-xl font-bold text-slate-800">📊 Progress Bar (Nuxt UI v3)</h3>
                </template>

                <div class="space-y-8">
                    <!-- Project Progress Examples -->
                    <div class="space-y-6">
                        <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
                            Project Progress Examples
                        </h4>

                        <!-- Planning Phase -->
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium text-slate-700">Planning Phase</span>
                                <span class="text-xs text-slate-500">Est. 5 days remaining</span>
                            </div>
                            <UProgress :model-value="15" color="error" size="lg" status />
                            <p class="text-xs text-slate-600">Just started</p>
                        </div>

                        <!-- Development Phase -->
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium text-slate-700">Development Phase</span>
                                <span class="text-xs text-slate-500">Est. 3 days remaining</span>
                            </div>
                            <UProgress :model-value="45" color="warning" size="lg" status />
                            <p class="text-xs text-slate-600">In progress</p>
                        </div>

                        <!-- Testing Phase -->
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium text-slate-700">Testing Phase</span>
                                <span class="text-xs text-slate-500">Est. 1 day remaining</span>
                            </div>
                            <UProgress :model-value="75" color="info" size="lg" status />
                            <p class="text-xs text-slate-600">Almost done</p>
                        </div>

                        <!-- Completed Project -->
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium text-slate-700">Completed Project</span>
                                <span class="text-xs text-slate-500">Complete</span>
                            </div>
                            <UProgress :model-value="100" color="success" size="lg" status />
                            <p class="text-xs text-slate-600">Completed</p>
                        </div>
                    </div>

                    <!-- Different Sizes -->
                    <div class="space-y-6">
                        <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
                            Different Sizes
                        </h4>

                        <div class="space-y-4">
                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">2XS Size</span>
                                <UProgress :model-value="60" color="primary" size="2xs" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">XS Size</span>
                                <UProgress :model-value="60" color="primary" size="xs" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">SM Size</span>
                                <UProgress :model-value="60" color="primary" size="sm" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">MD Size (Default)</span>
                                <UProgress :model-value="60" color="primary" size="md" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">LG Size</span>
                                <UProgress :model-value="60" color="primary" size="lg" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">XL Size</span>
                                <UProgress :model-value="60" color="primary" size="xl" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">2XL Size</span>
                                <UProgress :model-value="60" color="primary" size="2xl" />
                            </div>
                        </div>
                    </div>

                    <!-- Different Colors -->
                    <div class="space-y-6">
                        <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
                            Color Variants
                        </h4>

                        <div class="space-y-4">
                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Primary (Blue)</span>
                                <UProgress :model-value="85" color="primary" size="lg" status />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Secondary</span>
                                <UProgress :model-value="70" color="secondary" size="lg" status />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Success (Green)</span>
                                <UProgress :model-value="90" color="success" size="lg" status />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Info</span>
                                <UProgress :model-value="60" color="info" size="lg" status />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Warning (Orange)</span>
                                <UProgress :model-value="40" color="warning" size="lg" status />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Error (Red)</span>
                                <UProgress :model-value="25" color="error" size="lg" status />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Neutral</span>
                                <UProgress :model-value="55" color="neutral" size="lg" status />
                            </div>
                        </div>
                    </div>

                    <!-- Multi-step Progress -->
                    <div class="space-y-6">
                        <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
                            Multi-step Progress (With Steps)
                        </h4>

                        <div class="space-y-4">
                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Frontend Development</span>
                                <UProgress :model-value="3"
                                    :max="['Planning', 'Development', 'Testing', 'Deployment', 'Review']"
                                    color="success" size="lg" status />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Backend Development</span>
                                <UProgress :model-value="2" :max="['Design', 'API Development', 'Database', 'Testing']"
                                    color="warning" size="lg" status />
                            </div>
                        </div>
                    </div>

                    <!-- Loading Animation (Indeterminate) -->
                    <div class="space-y-6">
                        <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
                            Loading Animations (Indeterminate)
                        </h4>

                        <div class="space-y-4">
                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Carousel Animation (Default)</span>
                                <UProgress animation="carousel" color="primary" size="lg" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Carousel Inverse</span>
                                <UProgress animation="carousel-inverse" color="success" size="lg" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Swing Animation</span>
                                <UProgress animation="swing" color="warning" size="lg" />
                            </div>

                            <div class="space-y-2">
                                <span class="text-sm text-slate-600">Elastic Animation</span>
                                <UProgress animation="elastic" color="error" size="lg" />
                            </div>
                        </div>
                    </div>

                    <!-- Vertical Progress -->
                    <div class="space-y-6">
                        <h4 class="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
                            Vertical Progress Bars
                        </h4>

                        <div class="flex space-x-8 justify-center">
                            <div class="text-center space-y-2">
                                <span class="text-sm text-slate-600">Frontend</span>
                                <UProgress orientation="vertical" :model-value="85" color="success" size="lg"
                                    class="h-32" />
                                <span class="text-xs text-slate-500">85%</span>
                            </div>

                            <div class="text-center space-y-2">
                                <span class="text-sm text-slate-600">Backend</span>
                                <UProgress orientation="vertical" :model-value="70" color="warning" size="lg"
                                    class="h-32" />
                                <span class="text-xs text-slate-500">70%</span>
                            </div>

                            <div class="text-center space-y-2">
                                <span class="text-sm text-slate-600">Testing</span>
                                <UProgress orientation="vertical" :model-value="45" color="info" size="lg"
                                    class="h-32" />
                                <span class="text-xs text-slate-500">45%</span>
                            </div>

                            <div class="text-center space-y-2">
                                <span class="text-sm text-slate-600">Deployment</span>
                                <UProgress orientation="vertical" :model-value="15" color="error" size="lg"
                                    class="h-32" />
                                <span class="text-xs text-slate-500">15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Status Indicator Showcase -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <h3 class="text-xl font-bold text-neutral-800">🔴 Status Indicator (Nuxt UI v3)</h3>
                </template>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="text-center space-y-3">
                        <h4 class="font-semibold text-neutral-700">Online Status</h4>
                        <div class="space-y-2">
                            <div class="flex items-center justify-center space-x-2">
                                <UIcon name="i-heroicons-signal" class="w-4 h-4 text-success-500" />
                                <UBadge color="success" variant="soft" label="Online" />
                            </div>
                            <div class="flex items-center justify-center space-x-2">
                                <UIcon name="i-heroicons-wifi" class="w-4 h-4 text-warning-500" />
                                <UBadge color="warning" variant="soft" label="Away" />
                            </div>
                            <div class="flex items-center justify-center space-x-2">
                                <UIcon name="i-heroicons-no-symbol" class="w-4 h-4 text-error-500" />
                                <UBadge color="error" variant="soft" label="Offline" />
                            </div>
                        </div>
                    </div>
                    <div class="text-center space-y-3">
                        <h4 class="font-semibold text-neutral-700">Project Status</h4>
                        <div class="space-y-2">
                            <UBadge color="info" variant="outline" label="Planning" />
                            <UBadge color="primary" variant="outline" label="In Progress" />
                            <UBadge color="success" variant="outline" label="Completed" />
                        </div>
                    </div>
                    <div class="text-center space-y-3">
                        <h4 class="font-semibold text-neutral-700">Task Status</h4>
                        <div class="space-y-2">
                            <UBadge color="neutral" variant="subtle" label="To Do" />
                            <UBadge color="warning" variant="subtle" label="In Review" />
                            <UBadge color="success" variant="subtle" label="Done" />
                        </div>
                    </div>
                    <div class="text-center space-y-3">
                        <h4 class="font-semibold text-neutral-700">System Status</h4>
                        <div class="space-y-2">
                            <div class="flex items-center justify-center space-x-2">
                                <div class="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                                <span class="text-sm text-success-600">Operational</span>
                            </div>
                            <div class="flex items-center justify-center space-x-2">
                                <div class="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></div>
                                <span class="text-sm text-warning-600">Degraded</span>
                            </div>
                            <div class="flex items-center justify-center space-x-2">
                                <div class="w-2 h-2 bg-error-500 rounded-full animate-pulse"></div>
                                <span class="text-sm text-error-600">Down</span>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Avatar Showcase -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <h3 class="text-xl font-bold text-neutral-800">👤 Avatar (Nuxt UI v3)</h3>
                </template>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="space-y-4">
                        <h4 class="font-semibold text-neutral-700">Sizes</h4>
                        <div class="flex items-center space-x-4">
                            <UAvatar :src="sampleUsers[0].avatar" :alt="sampleUsers[0].name" size="xs" />
                            <UAvatar :src="sampleUsers[0].avatar" :alt="sampleUsers[0].name" size="sm" />
                            <UAvatar :src="sampleUsers[0].avatar" :alt="sampleUsers[0].name" size="md" />
                            <UAvatar :src="sampleUsers[0].avatar" :alt="sampleUsers[0].name" size="lg" />
                            <UAvatar :src="sampleUsers[0].avatar" :alt="sampleUsers[0].name" size="xl" />
                        </div>
                    </div>
                    <div class="space-y-4">
                        <h4 class="font-semibold text-neutral-700">Team Members</h4>
                        <div class="space-y-3">
                            <div v-for="user in sampleUsers" :key="user.id" class="flex items-center space-x-3">
                                <UAvatar :src="user.avatar" :alt="user.name" size="sm" />
                                <div>
                                    <p class="font-medium text-neutral-900">{{ user.name }}</p>
                                    <p class="text-sm text-neutral-500">{{ user.email }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <h4 class="font-semibold text-neutral-700">With Badges</h4>
                        <div class="space-y-3">
                            <div class="flex items-center space-x-3">
                                <div class="relative">
                                    <UAvatar :src="sampleUsers[0].avatar" :alt="sampleUsers[0].name" size="md" />
                                    <div class="absolute -bottom-1 -right-1">
                                        <UBadge color="success" variant="solid" label="5" size="xs" />
                                    </div>
                                </div>
                                <span class="text-sm text-neutral-600">Notifications</span>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Form Components -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <h3 class="text-xl font-bold text-neutral-800">📝 Form Components (Nuxt UI v3)</h3>
                </template>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <UInput v-model="formData.name" label="Project Name" placeholder="Enter project name"
                            icon="i-heroicons-folder" />

                        <UInput v-model="formData.email" label="Email Address" placeholder="Enter email"
                            icon="i-heroicons-envelope" type="email" />

                        <USelect v-model="formData.priority" label="Priority Level" placeholder="Select priority"
                            icon="i-heroicons-flag" :options="priorityOptions" />
                    </div>

                    <div class="space-y-4">
                        <UInput v-model="formData.budget" label="Budget" placeholder="0.00"
                            icon="i-heroicons-currency-dollar" type="number" />

                        <UTextarea v-model="formData.description" label="Description" placeholder="Project description"
                            rows="3" />

                        <div class="flex space-x-2">
                            <UButton color="primary" @click="handleSave">
                                <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
                                Save Project
                            </UButton>
                            <UButton color="neutral" variant="outline" @click="handleReset">
                                Reset
                            </UButton>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Projects Grid -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-bold text-neutral-800">📊 Projects (Nuxt UI v3)</h3>
                        <UButton variant="outline" size="sm" @click="toggleProjectsLoading" :loading="projectsLoading">
                            {{ projectsLoading ? 'Loading...' : 'Toggle Loading' }}
                        </UButton>
                    </div>
                </template>

                <div v-if="projectsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <USkeleton v-for="n in 6" :key="n" class="h-32" />
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <UCard v-for="project in sampleProjects" :key="project.id"
                        class="hover:shadow-md transition-shadow">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h4 class="font-medium text-neutral-900">{{ project.name }}</h4>
                                <UDropdownMenu :items="getProjectActions(project)">
                                    <UButton color="neutral" variant="ghost" icon="i-heroicons-ellipsis-horizontal"
                                        size="xs" />
                                </UDropdownMenu>
                            </div>
                        </template>

                        <div class="space-y-3">
                            <p class="text-sm text-neutral-600">{{ project.description }}</p>

                            <div class="flex items-center space-x-2">
                                <UBadge :color="getStatusColor(project.status)" variant="soft" :label="project.status"
                                    size="xs" />
                                <UBadge :color="getPriorityColor(project.priority)" variant="outline"
                                    :label="project.priority" size="xs" />
                            </div>

                            <div class="space-y-1">
                                <div class="flex justify-between text-sm">
                                    <span class="text-neutral-600">Progress</span>
                                    <span class="text-neutral-900 font-medium">{{ project.completionPercentage
                                        }}%</span>
                                </div>
                                <UProgress :value="project.completionPercentage" />
                            </div>
                        </div>
                    </UCard>
                </div>
            </UCard>

            <!-- Toast Notifications -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <h3 class="text-xl font-bold text-neutral-800">🔔 Toast Notifications (Nuxt UI v3)</h3>
                </template>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <UButton color="success" variant="outline" @click="showSuccess">
                        <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
                        Success
                    </UButton>
                    <UButton color="error" variant="outline" @click="showError">
                        <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-2" />
                        Error
                    </UButton>
                    <UButton color="warning" variant="outline" @click="showWarning">
                        <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 mr-2" />
                        Warning
                    </UButton>
                    <UButton color="info" variant="outline" @click="showInfo">
                        <UIcon name="i-heroicons-information-circle" class="w-4 h-4 mr-2" />
                        Info
                    </UButton>
                </div>
            </UCard>

            <!-- Component Migration Summary -->
            <UCard class="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <template #header>
                    <h3 class="text-xl font-bold text-neutral-800">📚 Migration Summary</h3>
                </template>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <UCard class="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                        <template #header>
                            <h4 class="font-bold text-primary-800">✅ Migrated</h4>
                        </template>
                        <ul class="text-sm text-primary-700 space-y-1">
                            <li>🔄 PriorityBadge → UBadge</li>
                            <li>🔄 ProgressBar → UProgress</li>
                            <li>🔄 Avatar → UAvatar</li>
                            <li>🔄 FormInput → UInput</li>
                            <li>🔄 Tabs → UTabs</li>
                        </ul>
                    </UCard>

                    <UCard class="bg-gradient-to-br from-success-50 to-success-100 border-success-200">
                        <template #header>
                            <h4 class="font-bold text-success-800">🎯 Features</h4>
                        </template>
                        <ul class="text-sm text-success-700 space-y-1">
                            <li>✅ New Color System</li>
                            <li>✅ Better Performance</li>
                            <li>✅ TypeScript Support</li>
                            <li>✅ Accessibility</li>
                        </ul>
                    </UCard>

                    <UCard class="bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200">
                        <template #header>
                            <h4 class="font-bold text-warning-800">⚡ Performance</h4>
                        </template>
                        <ul class="text-sm text-warning-700 space-y-1">
                            <li>📦 Smaller Bundle</li>
                            <li>🚀 Faster Loading</li>
                            <li>⚡ Tree Shaking</li>
                            <li>📱 Mobile Optimized</li>
                        </ul>
                    </UCard>

                    <UCard class="bg-gradient-to-br from-info-50 to-info-100 border-info-200">
                        <template #header>
                            <h4 class="font-bold text-info-800">🛠️ Developer Experience</h4>
                        </template>
                        <ul class="text-sm text-info-700 space-y-1">
                            <li>🎯 Better IntelliSense</li>
                            <li>📖 Improved Docs</li>
                            <li>🔧 Easy Customization</li>
                            <li>🧪 Better Testing</li>
                        </ul>
                    </UCard>
                </div>
            </UCard>
        </div>

        <!-- Create Project Modal -->
        <UModal v-model:open="showCreateModal">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-neutral-900">Create New Project</h3>
                        <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" class="-my-1"
                            @click="showCreateModal = false" />
                    </div>
                </template>

                <div class="space-y-4">
                    <UInput v-model="modalForm.name" label="Project Name" placeholder="Enter project name"
                        icon="i-heroicons-folder" />
                    <USelect v-model="modalForm.priority" label="Priority" placeholder="Select priority"
                        :options="priorityOptions" />
                    <UTextarea v-model="modalForm.description" label="Description" placeholder="Project description"
                        rows="3" />
                </div>

                <template #footer>
                    <div class="flex justify-end space-x-2">
                        <UButton color="neutral" variant="outline" @click="showCreateModal = false">
                            Cancel
                        </UButton>
                        <UButton color="primary" @click="handleCreateProject">
                            Create Project
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
<script setup>
// Composables
const toast = useToast()

// Reactive data
const user = ref({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null
})

const formData = ref({
    name: '',
    email: '',
    password: '',
    budget: 0,
    description: '',
    priority: 'HIGH',
    category: 'web'
})

const settingsForm = ref({
    name: 'Modern Website Redesign',
    description: 'Complete website redesign project'
})

const modalForm = ref({
    name: '',
    priority: 'MEDIUM',
    description: ''
})

const paginationData = ref({
    currentPage: 1,
    totalPages: 15,
    total: 150,
    perPage: 10
})

// UI State
const activeTab = ref('overview')
const showCreateModal = ref(false)
const projectsLoading = ref(false)
const loggingOut = ref(false)
const showErrorExample = ref(false)
const showWarningExample = ref(false)
const showInfoExample = ref(false)

// Static data
const priorityOptions = [
    { value: 'LOW', label: 'Low Priority', description: 'Non-urgent tasks' },
    { value: 'MEDIUM', label: 'Medium Priority', description: 'Standard tasks' },
    { value: 'HIGH', label: 'High Priority', description: 'Important tasks' },
    { value: 'URGENT', label: 'Urgent Priority', description: 'Critical tasks' }
]

const categoryOptions = [
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'design', label: 'Design' }
]

const sampleUsers = ref([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: null },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatar: null },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', avatar: null },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', avatar: null }
])

const sampleProjects = ref([
    {
        id: '1',
        name: 'Modern Website Redesign',
        projectCode: 'WEB-2024-001',
        description: 'Complete website redesign with modern UI/UX principles and responsive design for better user experience.',
        status: 'designing',
        priority: 'HIGH',
        completionPercentage: 65,
        clientName: 'Tech Solutions Inc.'
    },
    {
        id: '2',
        name: 'Mobile App Development',
        projectCode: 'MOB-2024-002',
        description: 'Native mobile application for iOS and Android platforms with real-time features.',
        status: 'development',
        priority: 'MEDIUM',
        completionPercentage: 40,
        clientName: 'StartupXYZ'
    },
    {
        id: '3',
        name: 'API Integration',
        projectCode: 'API-2024-003',
        description: 'RESTful API integration with third-party services and database optimization.',
        status: 'completed',
        priority: 'LOW',
        completionPercentage: 100,
        clientName: 'Enterprise Corp'
    },
    {
        id: '4',
        name: 'E-commerce Platform',
        projectCode: 'ECM-2024-004',
        description: 'Full-featured e-commerce platform with payment gateway integration.',
        status: 'planning',
        priority: 'URGENT',
        completionPercentage: 15,
        clientName: 'RetailMax'
    },
    {
        id: '5',
        name: 'Data Analytics Dashboard',
        projectCode: 'DAS-2024-005',
        description: 'Real-time data visualization and analytics dashboard for business intelligence.',
        status: 'development',
        priority: 'HIGH',
        completionPercentage: 75,
        clientName: 'DataCorp'
    },
    {
        id: '6',
        name: 'Cloud Migration',
        projectCode: 'CLD-2024-006',
        description: 'Migration of legacy systems to cloud infrastructure with scalability improvements.',
        status: 'planning',
        priority: 'MEDIUM',
        completionPercentage: 25,
        clientName: 'TechGiant'
    }
])

const tabs = [
    { value: 'overview', label: 'Overview', icon: 'i-heroicons-home' },
    { value: 'team', label: 'Team', icon: 'i-heroicons-users' },
    { value: 'settings', label: 'Settings', icon: 'i-heroicons-cog-6-tooth' }
]

const sampleErrors = {
    validation: 'Please check your input and ensure all required fields are filled correctly.',
    network: 'Network connection failed. Please check your internet connection.',
    server: 'Server error occurred. Please try again later.'
}

// Methods
const getStatusColor = (status) => {
    const colors = {
        'planning': 'info',
        'designing': 'warning',
        'development': 'primary',
        'testing': 'warning',
        'completed': 'success',
        'on-hold': 'neutral'
    }
    return colors[status] || 'neutral'
}

const getPriorityColor = (priority) => {
    const colors = {
        'LOW': 'success',
        'MEDIUM': 'warning',
        'HIGH': 'error',
        'URGENT': 'error'
    }
    return colors[priority] || 'neutral'
}

const getProjectActions = (project) => [
    {
        label: 'View Details',
        icon: 'i-heroicons-eye',
        onClick: () => handleProjectView(project.id)
    },
    {
        label: 'Edit Project',
        icon: 'i-heroicons-pencil',
        onClick: () => handleProjectEdit(project.id)
    },
    {
        label: 'Delete Project',
        icon: 'i-heroicons-trash',
        onClick: () => handleProjectDelete(project.id)
    }
]

// Event handlers
const handleDevLogout = async () => {
    loggingOut.value = true
    // Simulate logout process
    setTimeout(() => {
        loggingOut.value = false
        toast.add({
            title: 'Logged out successfully',
            description: 'You have been logged out of the system.',
            color: 'success',
            icon: 'i-heroicons-check'
        })
    }, 2000)
}

const handleSave = () => {
    toast.add({
        title: 'Project saved successfully!',
        description: 'Your project has been saved with all the provided information.',
        color: 'success',
        icon: 'i-heroicons-check'
    })
}

const handleReset = () => {
    formData.value = {
        name: '',
        email: '',
        password: '',
        budget: 0,
        description: '',
        priority: 'HIGH',
        category: 'web'
    }
    toast.add({
        title: 'Form reset',
        description: 'All form fields have been cleared.',
        color: 'info',
        icon: 'i-heroicons-information-circle'
    })
}

const handleCreateProject = () => {
    const newProject = {
        id: String(sampleProjects.value.length + 1),
        name: modalForm.value.name,
        projectCode: `PRJ-2024-${String(sampleProjects.value.length + 1).padStart(3, '0')}`,
        description: modalForm.value.description,
        status: 'planning',
        priority: modalForm.value.priority,
        completionPercentage: 0,
        clientName: 'New Client'
    }

    sampleProjects.value.push(newProject)
    showCreateModal.value = false
    modalForm.value = { name: '', priority: 'MEDIUM', description: '' }

    toast.add({
        title: 'Project created successfully!',
        description: `Project "${newProject.name}" has been added to your dashboard.`,
        color: 'success',
        icon: 'i-heroicons-check'
    })
}

const saveSettings = () => {
    toast.add({
        title: 'Settings saved!',
        description: 'Your project settings have been updated successfully.',
        color: 'success',
        icon: 'i-heroicons-check'
    })
}

const resetSettings = () => {
    settingsForm.value = {
        name: 'Modern Website Redesign',
        description: 'Complete website redesign project'
    }
    toast.add({
        title: 'Settings reset',
        description: 'Settings have been reset to default values.',
        color: 'info',
        icon: 'i-heroicons-information-circle'
    })
}

const toggleProjectsLoading = () => {
    projectsLoading.value = !projectsLoading.value
    if (projectsLoading.value) {
        setTimeout(() => {
            projectsLoading.value = false
        }, 3000)
    }
}

const handleProjectView = (projectId) => {
    toast.add({
        title: 'Opening project details',
        description: `Viewing details for project ${projectId}`,
        color: 'info',
        icon: 'i-heroicons-eye'
    })
}

const handleProjectEdit = (projectId) => {
    toast.add({
        title: 'Opening project editor',
        description: `Editing project ${projectId}`,
        color: 'info',
        icon: 'i-heroicons-pencil'
    })
}

const handleProjectDelete = (projectId) => {
    toast.add({
        title: 'Confirm deletion',
        description: `Are you sure you want to delete project ${projectId}?`,
        color: 'warning',
        icon: 'i-heroicons-exclamation-triangle'
    })
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        toast.add({
            title: 'File uploaded',
            description: `Successfully uploaded: ${file.name}`,
            color: 'success',
            icon: 'i-heroicons-document'
        })
    }
}

const handleMultipleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
        toast.add({
            title: 'Files uploaded',
            description: `Successfully uploaded ${files.length} file(s)`,
            color: 'success',
            icon: 'i-heroicons-document-duplicate'
        })
    }
}

const handleRetryError = () => {
    showErrorExample.value = false
    toast.add({
        title: 'Retrying operation',
        description: 'Attempting to retry the failed operation...',
        color: 'info',
        icon: 'i-heroicons-arrow-path'
    })
}

const showAllErrors = () => {
    showErrorExample.value = true
    showWarningExample.value = true
    showInfoExample.value = true
}

// Toast notification methods
const showSuccess = () => {
    toast.add({
        title: 'Success!',
        description: 'This is a success message with Nuxt UI v3.',
        color: 'success',
        icon: 'i-heroicons-check'
    })
}

const showError = () => {
    toast.add({
        title: 'Error!',
        description: 'This is an error message with Nuxt UI v3.',
        color: 'error',
        icon: 'i-heroicons-x-mark'
    })
}

const showWarning = () => {
    toast.add({
        title: 'Warning!',
        description: 'This is a warning message with Nuxt UI v3.',
        color: 'warning',
        icon: 'i-heroicons-exclamation-triangle'
    })
}

const showInfo = () => {
    toast.add({
        title: 'Info!',
        description: 'This is an info message with Nuxt UI v3.',
        color: 'info',
        icon: 'i-heroicons-information-circle'
    })
}

// SEO
useHead({
    title: 'Dashboard - Nuxt UI v3 Component Showcase'
})
</script>
