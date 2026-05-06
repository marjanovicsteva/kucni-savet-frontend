<script setup lang="ts">
import ContentContainer from "@/components/ContentContainer.vue";
import MenuBar from "@/components/MenuBar.vue";

const items = [
  {
    label: 'Home',
    href: { name: 'home' },
    icon: 'pi pi-home',
  },
  {
    label: 'Raw',
    href: { name: 'raw' },
    icon: 'pi pi-database'
  },
  {
    label: 'Notifications',
    icon: 'pi pi-bell',
  },
  {
    label: 'Profile',
    href: { name: 'about' },
    icon: 'pi pi-user',
  },
]
</script>

<template>
  <div class="app">
    <header>
      <MenuBar :items="items"></MenuBar>
    </header>

    <main>
      <ContentContainer>
        <slot></slot>
      </ContentContainer>
    </main>
  </div>
</template>

<style scoped>
.app {
  overflow-x: hidden;
  min-height: 100vh;
  margin-bottom: 100px;
}
header {
  padding: 1rem;
}

main {
  padding: 1rem;
}
</style>
