<script setup lang="ts">
import { login } from '@/api/backend'
import PlainLayout from '@/layouts/PlainLayout.vue'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import type { FacebookLoginResponse } from '@/types/facebookResponse'
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
  <PlainLayout>
    <button @click="facebookLogin()">Login with Facebook</button>
  </PlainLayout>
</template>

<style scoped>

</style>
