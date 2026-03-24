<script setup lang="ts">
import { login } from '@/api/backend'
import PlainLayout from '@/layouts/PlainLayout.vue'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import type { FacebookLoginResponse } from '@/types/facebookResponse'
import { Card, Button } from 'primevue'
import { onMounted } from 'vue'

const userStore = useUserStore()

const facebookLogin = () => {
  window.FB.login((response: FacebookLoginResponse) => {
    if (response.authResponse) {
      login(response.authResponse.accessToken)
    } else {
    }
  })
}

onMounted(async () => {
  if (userStore.isLoggedIn) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <PlainLayout class="container">
    <Card class="content">
      <template #title> Enter KSO </template>

      <template #content>
        <Button
          label="Enter"
          icon="pi pi-sign-in"
          variant="outlined"
          severity="info"
          @click="facebookLogin()"
        />
      </template>
    </Card>
  </PlainLayout>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 4rem 0;
}

.content {
  max-width: 720px;
  margin: 0 auto;
}
</style>
