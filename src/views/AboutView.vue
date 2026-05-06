<script setup lang="ts">
import router from "@/router";
</script>
<template>
  <div>
    <h1>Welcome to KSO</h1>
    <button @click="router.push({ name: 'enter' })">Enter</button>
  </div>
</template>

<style scoped>

</style>
