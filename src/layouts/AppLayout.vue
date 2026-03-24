<script setup lang="ts">
import { logout } from '@/api/backend'
import { Button, Menubar } from 'primevue'

const items = [
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Features',
    icon: 'pi pi-star',
  },
]
</script>

<template>
  <div>
    <header>
      <Menubar :model="items">
        <template #end>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            variant="text"
            severity="secondary"
            @click="logout()"
          />
        </template>
      </Menubar>
    </header>

    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style>
header {
  padding: 1rem;
}

main {
  padding: 2rem;
}
</style>
