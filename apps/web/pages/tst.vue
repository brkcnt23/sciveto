// pages/denDashboard.vue - Toast Integration Example

<script setup>
// Doğru toast integration için
const { success, error, warning, info } = useDualToast()

// Toast notification methods - denDashboard.vue'de kullanılan fonksiyonlar
const showSuccess = () => {
    success(
        'Success!',
        'This is a success message with Nuxt UI v3.'
    )
}

const showError = () => {
    error(
        'Error!',
        'This is an error message with Nuxt UI v3.'
    )
}

const showWarning = () => {
    warning(
        'Warning!',
        'This is a warning message with Nuxt UI v3.'
    )
}

const showInfo = () => {
    info(
        'Info!',
        'This is an info message with Nuxt UI v3.'
    )
}

// Project related functions
const addNewProject = (newProject) => {
    // Project ekleme logic'i burada...

    success(
        'Project Added',
        `Project "${newProject.name}" has been added to your dashboard.`
    )
}

const saveSettings = () => {
    success(
        'Settings saved!',
        'Your project settings have been updated successfully.'
    )
}

const resetSettings = () => {
    settingsForm.value = {
        name: 'Modern Website Redesign',
        description: 'Complete website redesign project'
    }
    info(
        'Settings reset',
        'Settings have been reset to default values.'
    )
}

const handleProjectView = (projectId) => {
    info(
        'Opening project details',
        `Viewing details for project ${projectId}`
    )
}

const handleProjectEdit = (projectId) => {
    info(
        'Opening project editor',
        `Editing project ${projectId}`
    )
}

const handleProjectDelete = (projectId) => {
    warning(
        'Confirm deletion',
        `Are you sure you want to delete project ${projectId}?`
    )
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        success(
            'File uploaded',
            `Successfully uploaded: ${file.name}`
        )
    }
}

const handleMultipleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
        success(
            'Files uploaded',
            `Successfully uploaded ${files.length} file(s)`
        )
    }
}

const handleRetryError = () => {
    showErrorExample.value = false
    info(
        'Retrying operation',
        'Attempting to retry the failed operation...'
    )
}

// SEO
useHead({
    title: 'Dashboard - Nuxt UI v3 Component Showcase'
})
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

        <UButton color="primary" variant="solid" @click="showSuccess">
            <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
            Show Success Toast
        </UButton>

        <UButton color="danger" variant="solid" @click="showError">
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-2" />
            Show Error Toast
        </UButton>

        <UButton color="warning" variant="solid" @click="showWarning">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 mr-2" />
            Show Warning Toast
        </UButton>

        <UButton color="info" variant="solid" @click="showInfo">
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4 mr-2" />
            Show Info Toast
        </UButton>
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
</template>