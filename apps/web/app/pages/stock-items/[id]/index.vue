<template>
  <div />
</template>

<script setup>
const route = useRoute()
await navigateTo(`/inventory/${route.params.id}`)
</script>