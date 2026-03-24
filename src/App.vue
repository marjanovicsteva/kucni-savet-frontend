<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingView from './views/LoadingView.vue'
import { useLoaderStore } from './stores/loader'
</script>

<template>
  <LoadingView v-if="useLoaderStore().loading" />
  <RouterView />
</template>

<style scoped></style>
